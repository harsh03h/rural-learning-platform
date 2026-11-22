import { Router } from 'express';
import { z } from 'zod';
import User from '../models/User.js';
import StudentProgress from '../models/StudentProgress.js';
import QuizAttempt from '../models/QuizAttempt.js';
import DiagnosticResult from '../models/DiagnosticResult.js';
import RemedialAssignment from '../models/RemedialAssignment.js';
import Announcement from '../models/Announcement.js';
import { authenticate, resolveStudentId } from '../middleware/auth.js';
import { validateBody, validateQuery } from '../utils/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { success } from '../utils/response.js';
import { fallbackRecommendations } from '../services/fallbackService.js';
import { getStudentLeaderboard, getParentDashboard } from '../services/analyticsService.js';
import { markRemedialCompleted } from '../services/progressService.js';
import { audit } from '../utils/audit.js';

const router = Router();

async function getRecommendations(studentId) {
  const [progress, latestDiagnostic] = await Promise.all([
    StudentProgress.findOne({ studentId }).lean(),
    DiagnosticResult.findOne({ studentId }).sort({ evaluatedAt: -1 }).lean(),
  ]);
  const weakTopics = [
    ...new Set([
      ...(latestDiagnostic?.weakTopics || []),
      ...(progress?.weakTopics || []),
    ]),
  ];
  const fromDiagnostic = latestDiagnostic?.recommendations || [];
  const generated = fallbackRecommendations(weakTopics);
  const existingPrerequisites = new Set(fromDiagnostic.map((item) => item.prerequisite));
  return [...fromDiagnostic, ...generated.filter((item) => !existingPrerequisites.has(item.prerequisite))];
}

router.get('/dashboard', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const student = await User.findById(studentId).select('name grade classGrade rollNo avatar language school subjects').lean();
  if (!student) throw ApiError.notFound('Student not found');

  const [progress, recentAttempts, remedials, latestDiagnostic, leaderboard, announcements] = await Promise.all([
    StudentProgress.findOne({ studentId }).lean(),
    QuizAttempt.find({ studentId }).sort({ submittedAt: -1 }).limit(5).lean(),
    RemedialAssignment.find({ studentId, status: { $ne: 'completed' } }).sort({ assignedAt: -1 }).lean(),
    DiagnosticResult.findOne({ studentId }).sort({ evaluatedAt: -1 }).lean(),
    getStudentLeaderboard(student.classGrade || student.grade, 10),
    Announcement.find({
      isActive: true,
      targetRoles: { $in: ['student', 'all'] },
      $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
    }).sort({ publishedAt: -1 }).limit(5).lean(),
  ]);

  const rank = leaderboard.find((item) => item.studentId === studentId)?.rank || null;

  return success(res, {
    student,
    progress: progress || {
      overallScore: 0,
      xp: 0,
      level: 1,
      topicMastery: {},
      weakTopics: [],
      badges: [],
    },
    stats: progress?.stats || {},
    recentAttempts,
    remedials,
    latestDiagnostic,
    recommendations: await getRecommendations(studentId),
    leaderboard: leaderboard.slice(0, 5),
    rank,
    announcements,
  });
}));

router.get('/progress', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const progress = await StudentProgress.findOne({ studentId }).lean();
  if (!progress) throw ApiError.notFound('Progress not found');
  return success(res, { progress });
}));

router.get('/mastery', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const progress = await StudentProgress.findOne({ studentId }).lean();
  const mastery = progress?.topicMastery || {};
  return success(res, {
    mastery,
    topics: Object.entries(mastery).map(([topic, value]) => ({
      topic,
      score: value.score,
      total: value.total,
      attempts: value.attempts,
      mastery: value.mastery,
      lastAttemptAt: value.lastAttemptAt,
    })),
    weakTopics: progress?.weakTopics || [],
    strongTopics: progress?.strongTopics || [],
  });
}));

router.get('/recommendations', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  return success(res, {
    recommendations: await getRecommendations(studentId),
  });
}));

router.get('/remedials', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const remedials = await RemedialAssignment.find({ studentId }).sort({ assignedAt: -1 }).lean();
  return success(res, { remedials, total: remedials.length });
}));

router.post('/remedials/:id/complete', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.body.studentId);
  const remedial = await markRemedialCompleted(studentId, req.params.id);
  if (!remedial) throw ApiError.notFound('Remedial assignment not found');
  await audit(req, 'remedial_complete', 'remedial_assignment', {}, String(remedial._id));
  return success(res, { remedial }, 'Remedial assignment marked complete');
}));

router.get('/badges', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const progress = await StudentProgress.findOne({ studentId }).select('badges xp level streakDays').lean();
  return success(res, {
    badges: progress?.badges || [],
    xp: progress?.xp || 0,
    level: progress?.level || 1,
    streakDays: progress?.streakDays || 0,
  });
}));

router.get('/xps', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const [progress, history] = await Promise.all([
    StudentProgress.findOne({ studentId }).select('xp level stats').lean(),
    QuizAttempt.find({ studentId }).select('earnedXP percentage chapterId topicKey submittedAt').sort({ submittedAt: -1 }).limit(20).lean(),
  ]);
  return success(res, { xp: progress?.xp || 0, level: progress?.level || 1, history });
}));

router.get('/parent-summary', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const parentId = req.user._id;
  const dashboard = await getParentDashboard(parentId, studentId);
  return success(res, dashboard);
}));

router.put('/preferences', authenticate, validateBody(z.object({
  language: z.enum(['hi', 'en', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'pa', 'od']).optional(),
  lowDataMode: z.boolean().optional(),
  offlineMode: z.boolean().optional(),
  theme: z.string().max(20).optional(),
})), asyncHandler(async (req, res) => {
  const updates = {};
  if (req.body.language) updates.language = req.body.language;
  const preferences = {};
  if (req.body.lowDataMode !== undefined) preferences.lowDataMode = req.body.lowDataMode;
  if (req.body.offlineMode !== undefined) preferences.offlineMode = req.body.offlineMode;
  if (req.body.theme) preferences.theme = req.body.theme;
  if (Object.keys(preferences).length) updates.preferences = preferences;

  const user = await User.findByIdAndUpdate(req.user._id, { $set: updates }, { returnDocument: 'after' });
  return success(res, { user }, 'Preferences saved');
}));

export default router;
