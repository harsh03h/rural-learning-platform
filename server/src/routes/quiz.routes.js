import { Router } from 'express';
import { z } from 'zod';
import QuizAttempt from '../models/QuizAttempt.js';
import StudentProgress from '../models/StudentProgress.js';
import { authenticate, resolveStudentId, ROLES } from '../middleware/auth.js';
import { validateBody, validateQuery } from '../utils/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { success, created, paginationMeta, paginate } from '../utils/response.js';
import { recomputeStudentProgress } from '../services/progressService.js';
import { audit } from '../utils/audit.js';

const router = Router();

const quizSchema = z.object({
  clientAttemptId: z.string().trim().max(120).optional(),
  attemptId: z.string().trim().max(120).optional(),
  chapterId: z.string().trim().max(120).optional(),
  courseId: z.string().trim().max(120).optional(),
  topicKey: z.string().trim().max(120).optional(),
  score: z.number().min(0),
  total: z.number().int().min(1).max(500),
  answers: z.array(z.object({
    questionId: z.string().optional(),
    selected: z.string().optional(),
    correct: z.string().optional(),
    isCorrect: z.boolean().optional(),
  })).max(500).optional(),
  mode: z.enum(['online', 'offline']).default('online'),
  clientTimestamp: z.string().datetime().optional(),
  studentId: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

const listQuery = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  chapterId: z.string().optional(),
  topicKey: z.string().optional(),
  studentId: z.string().optional(),
});

router.post('/submit', authenticate, validateBody(quizSchema), asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.body.studentId);
  const clientAttemptId = req.body.clientAttemptId || req.body.attemptId || null;

  if (req.body.score > req.body.total) {
    throw ApiError.badRequest('Score cannot be greater than total questions');
  }

  if (clientAttemptId) {
    const existing = await QuizAttempt.findOne({ clientAttemptId }).lean();
    if (existing) {
      return success(res, {
        duplicate: true,
        earnedXP: existing.earnedXP,
        record: existing,
      }, 'Quiz result already recorded');
    }
  }

  const percentage = Math.round((req.body.score / req.body.total) * 100);
  const earnedXP = req.body.score * 20;

  const attempt = await QuizAttempt.create({
    clientAttemptId,
    studentId,
    chapterId: req.body.chapterId || null,
    courseId: req.body.courseId || null,
    topicKey: req.body.topicKey || req.body.chapterId || 'general',
    score: req.body.score,
    total: req.body.total,
    percentage,
    earnedXP,
    answers: req.body.answers || [],
    mode: req.body.mode,
    clientTimestamp: req.body.clientTimestamp ? new Date(req.body.clientTimestamp) : null,
    syncedAt: req.body.mode === 'offline' ? new Date() : null,
    metadata: req.body.metadata || {},
  });

  await recomputeStudentProgress(studentId);
  await audit(req, 'quiz_submit', 'quiz_attempt', {
    chapterId: attempt.chapterId,
    score: attempt.score,
    total: attempt.total,
    mode: attempt.mode,
  }, String(attempt._id));

  return created(res, {
    earnedXP,
    record: attempt,
    message: 'Quiz result saved to school edge database',
  }, 'Quiz result saved successfully');
}));

router.get('/attempts', authenticate, validateQuery(listQuery), asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.validatedQuery.studentId);
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const filter = { studentId };
  if (req.validatedQuery.chapterId) filter.chapterId = req.validatedQuery.chapterId;
  if (req.validatedQuery.topicKey) filter.topicKey = req.validatedQuery.topicKey;

  const [attempts, total] = await Promise.all([
    QuizAttempt.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    QuizAttempt.countDocuments(filter),
  ]);

  return success(res, {
    attempts,
    pagination: paginationMeta(page, limit, total),
  });
}));

router.get('/attempts/:attemptId', authenticate, asyncHandler(async (req, res) => {
  const attempt = await QuizAttempt.findById(req.params.attemptId).lean();
  if (!attempt) throw ApiError.notFound('Quiz attempt not found');
  resolveStudentId(req, String(attempt.studentId));
  return success(res, { attempt });
}));

router.get('/leaderboard', authenticate, asyncHandler(async (req, res) => {
  const classGrade = req.user.classGrade || req.user.grade || 'Class 7A';
  const { getStudentLeaderboard } = await import('../services/analyticsService.js');
  const leaderboard = await getStudentLeaderboard(classGrade, 20);
  return success(res, { leaderboard });
}));

router.get('/progress', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const progress = await StudentProgress.findOne({ studentId }).lean();
  if (!progress) throw ApiError.notFound('Progress record not found');
  return success(res, { progress });
}));

export default router;
