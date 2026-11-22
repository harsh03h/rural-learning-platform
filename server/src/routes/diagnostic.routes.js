import { Router } from 'express';
import { z } from 'zod';
import DiagnosticResult from '../models/DiagnosticResult.js';
import StudentProgress from '../models/StudentProgress.js';
import { authenticate, resolveStudentId } from '../middleware/auth.js';
import { validateBody, validateQuery } from '../utils/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { success, created, paginate, paginationMeta } from '../utils/response.js';
import { recommendRemedials } from '../services/aiService.js';
import { fallbackRecommendations } from '../services/fallbackService.js';
import { getOrCreateProgress } from '../services/progressService.js';
import { audit } from '../utils/audit.js';

const router = Router();

const diagnosticSchema = z.object({
  studentId: z.string().optional(),
  clientId: z.string().trim().max(150).optional(),
  topicScores: z.record(z.string(), z.any()).default({}),
  weakTopics: z.array(z.string().trim().min(1)).default([]),
  answers: z.any().optional(),
  mode: z.enum(['online', 'offline']).default('online'),
  notes: z.string().max(2000).optional(),
});

router.post('/submit', authenticate, validateBody(diagnosticSchema), asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.body.studentId);

  if (req.body.clientId) {
    const existing = await DiagnosticResult.findOne({ clientId: req.body.clientId }).lean();
    if (existing) {
      return success(res, {
        duplicate: true,
        weakTopics: existing.weakTopics,
        recommendations: existing.recommendations,
        record: existing,
      }, 'Diagnostic result already recorded');
    }
  }

  const weakTopics = [...new Set(req.body.weakTopics)];
  const aiResult = await recommendRemedials({ weakTopics });
  const recommendations = aiResult.ok && Array.isArray(aiResult.data?.recommendations) && aiResult.data.recommendations.length
    ? aiResult.data.recommendations
    : fallbackRecommendations(weakTopics);

  const record = await DiagnosticResult.create({
    clientId: req.body.clientId || null,
    studentId,
    topicScores: req.body.topicScores,
    weakTopics,
    answers: req.body.answers || [],
    recommendations,
    source: aiResult.ok ? 'ai' : 'fallback',
    mode: req.body.mode,
    syncedAt: req.body.mode === 'offline' ? new Date() : null,
    notes: req.body.notes || '',
  });

  const progress = await getOrCreateProgress(studentId);
  progress.diagnosticSummary = {
    lastAttemptAt: new Date(),
    topicScores: req.body.topicScores,
    weakTopics,
    recommendationCount: recommendations.length,
  };
  await progress.save();

  await audit(req, 'diagnostic_submit', 'diagnostic_result', {
    weakTopics,
    source: record.source,
    recommendationCount: recommendations.length,
  }, String(record._id));

  return created(res, {
    evaluated: true,
    weakTopics,
    recommendations,
    record,
    source: record.source,
  }, 'Diagnostic assessment evaluated');
}));

router.get('/history', authenticate, validateQuery(z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  studentId: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.validatedQuery.studentId);
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const [results, total] = await Promise.all([
    DiagnosticResult.find({ studentId }).sort(sort).skip(skip).limit(limit).lean(),
    DiagnosticResult.countDocuments({ studentId }),
  ]);
  return success(res, {
    results,
    pagination: paginationMeta(page, limit, total),
  });
}));

router.get('/latest', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const result = await DiagnosticResult.findOne({ studentId }).sort({ evaluatedAt: -1 }).lean();
  return success(res, { result });
}));

router.get('/:id', authenticate, asyncHandler(async (req, res) => {
  const result = await DiagnosticResult.findById(req.params.id).lean();
  if (!result) throw ApiError.notFound('Diagnostic result not found');
  resolveStudentId(req, String(result.studentId));
  return success(res, { result });
}));

export default router;
