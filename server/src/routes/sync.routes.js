import { Router } from 'express';
import { z } from 'zod';
import SyncRecord from '../models/SyncRecord.js';
import QuizAttempt from '../models/QuizAttempt.js';
import DiagnosticResult from '../models/DiagnosticResult.js';
import Download from '../models/Download.js';
import StudentProgress from '../models/StudentProgress.js';
import { authenticate, resolveStudentId } from '../middleware/auth.js';
import { validateBody, validateQuery } from '../utils/validate.js';
import { syncLimiter } from '../middleware/rateLimit.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { success, paginate, paginationMeta } from '../utils/response.js';
import { recomputeStudentProgress } from '../services/progressService.js';
import { audit } from '../utils/audit.js';

const router = Router();

const recordSchema = z.object({
  clientId: z.string().trim().min(1).max(150).optional(),
  id: z.string().trim().min(1).max(150).optional(),
  attemptId: z.string().trim().min(1).max(150).optional(),
  type: z.string().trim().max(40).optional(),
  chapterId: z.string().trim().max(150).optional(),
  topicKey: z.string().trim().max(150).optional(),
  score: z.number().min(0).optional(),
  total: z.number().int().min(0).optional(),
  weakTopics: z.array(z.string()).optional(),
  topicScores: z.record(z.string(), z.any()).optional(),
  clientTimestamp: z.string().optional(),
  payload: z.record(z.string(), z.any()).optional(),
});

const batchSchema = z.object({
  studentId: z.string().optional(),
  pendingRecords: z.array(recordSchema).max(500),
});

function inferType(record) {
  if (record.type) return record.type.toLowerCase();
  if (record.score !== undefined && record.total !== undefined) return 'quiz';
  if (record.weakTopics || record.topicScores) return 'diagnostic';
  if (record.chapterId) return 'download';
  return 'unknown';
}

function normalizeType(type) {
  const allowed = ['quiz', 'diagnostic', 'download', 'progress', 'doubt', 'unknown'];
  return allowed.includes(type) ? type : 'unknown';
}

router.post('/batch', authenticate, syncLimiter, validateBody(batchSchema), asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.body.studentId);
  const results = [];
  let processedCount = 0;
  let duplicateCount = 0;
  let failedCount = 0;

  for (const record of req.body.pendingRecords) {
    const clientId = record.clientId || record.id || record.attemptId;
    if (!clientId) {
      failedCount += 1;
      results.push({ clientId: null, status: 'failed', error: 'Missing clientId' });
      continue;
    }

    const type = normalizeType(inferType(record));
    let status = 'processed';
    let error = null;

    try {
      const existingSync = await SyncRecord.findOne({ clientId }).lean();
      if (existingSync) {
        status = 'duplicate';
        duplicateCount += 1;
        results.push({ clientId, type, status: 'duplicate' });
        continue;
      }

      if (type === 'quiz' && record.total > 0 && record.score <= record.total) {
        const existingAttempt = await QuizAttempt.findOne({ clientAttemptId: clientId }).lean();
        if (!existingAttempt) {
          const percentage = Math.round((record.score / record.total) * 100);
          await QuizAttempt.create({
            clientAttemptId: clientId,
            studentId,
            chapterId: record.chapterId || null,
            topicKey: record.topicKey || record.chapterId || 'general',
            score: record.score,
            total: record.total,
            percentage,
            earnedXP: record.score * 20,
            mode: 'offline',
            clientTimestamp: record.clientTimestamp ? new Date(record.clientTimestamp) : null,
            syncedAt: new Date(),
          });
        }
      }

      if (type === 'diagnostic') {
        const existing = await DiagnosticResult.findOne({ clientId }).lean();
        if (!existing) {
          await DiagnosticResult.create({
            clientId,
            studentId,
            topicScores: record.topicScores || {},
            weakTopics: record.weakTopics || [],
            source: 'manual',
            mode: 'offline',
            syncedAt: new Date(),
          });
        }
      }

      if (type === 'download' && record.chapterId) {
        await Download.findOneAndUpdate(
          { studentId, chapterId: record.chapterId },
          {
            $set: {
              status: 'downloaded',
              downloadedAt: new Date(),
              title: record.chapterId,
              deviceId: record.payload?.deviceId || 'web',
            },
          },
          { upsert: true, returnDocument: 'after' },
        );
      }

      await SyncRecord.create({
        clientId,
        studentId,
        type,
        status,
        payload: record.payload || record,
        clientTimestamp: record.clientTimestamp ? new Date(record.clientTimestamp) : null,
        processedAt: new Date(),
      });
      processedCount += 1;
    } catch (recordError) {
      status = 'failed';
      error = recordError.message;
      failedCount += 1;
      try {
        await SyncRecord.create({
          clientId,
          studentId,
          type,
          status: 'failed',
          error,
          payload: record.payload || record,
        });
      } catch {
        // Ignore secondary persistence failure for a single record.
      }
    }

    results.push({ clientId, type, status, ...(error ? { error } : {}) });
  }

  if (processedCount > 0) await recomputeStudentProgress(studentId);
  await audit(req, 'batch_sync', 'sync_record', {
    received: req.body.pendingRecords.length,
    processedCount,
    duplicateCount,
    failedCount,
  });

  return success(res, {
    syncedCount: processedCount,
    receivedCount: req.body.pendingRecords.length,
    duplicateCount,
    failedCount,
    results,
    message: `Successfully synchronized ${processedCount} offline record(s) with the school server.`,
  });
}));

router.get('/records', authenticate, validateQuery(z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.enum(['pending', 'processed', 'duplicate', 'failed']).optional(),
  studentId: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.validatedQuery.studentId);
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const filter = { studentId };
  if (req.validatedQuery.status) filter.status = req.validatedQuery.status;

  const [records, total] = await Promise.all([
    SyncRecord.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    SyncRecord.countDocuments(filter),
  ]);

  return success(res, {
    records,
    pagination: paginationMeta(page, limit, total),
  });
}));

router.get('/status', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const [pending, processed, failed, progress] = await Promise.all([
    SyncRecord.countDocuments({ studentId, status: 'pending' }),
    SyncRecord.countDocuments({ studentId, status: 'processed' }),
    SyncRecord.countDocuments({ studentId, status: 'failed' }),
    StudentProgress.findOne({ studentId }).select('stats.offlineQuizzesSynced').lean(),
  ]);
  return success(res, {
    pending,
    processed,
    failed,
    offlineQuizzesSynced: progress?.stats?.offlineQuizzesSynced || 0,
    lastSyncAt: new Date(),
  });
}));

export default router;
