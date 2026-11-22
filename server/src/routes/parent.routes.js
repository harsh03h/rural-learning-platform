import { Router } from 'express';
import { z } from 'zod';
import User from '../models/User.js';
import ParentMessage from '../models/ParentMessage.js';
import { authenticate, authorize, ROLES, resolveStudentId } from '../middleware/auth.js';
import { validateBody, validateQuery } from '../utils/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { success, created, paginate, paginationMeta } from '../utils/response.js';
import { getParentDashboard } from '../services/analyticsService.js';
import { parentMessageTemplate } from '../services/fallbackService.js';
import { audit } from '../utils/audit.js';

const router = Router();

router.use(authenticate, authorize(ROLES.PARENT, ROLES.ADMIN));

function parentAndChild(req) {
  const parentId = req.user.role === ROLES.PARENT ? req.user._id : req.query.parentId;
  if (!parentId) throw ApiError.badRequest('parentId is required for admin access');
  const childId = resolveStudentId(req, req.query.studentId || req.body?.studentId);
  return { parentId, childId };
}

router.get('/dashboard', asyncHandler(async (req, res) => {
  const { parentId, childId } = parentAndChild(req);
  const dashboard = await getParentDashboard(parentId, childId);
  return success(res, dashboard);
}));

router.get('/child', asyncHandler(async (req, res) => {
  const { childId } = parentAndChild(req);
  const child = await User.findById(childId).select('name grade classGrade rollNo avatar language school').lean();
  if (!child) throw ApiError.notFound('Child account not found');
  return success(res, { child });
}));

router.get('/messages', validateQuery(z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  studentId: z.string().optional(),
  parentId: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const parentId = req.user.role === ROLES.PARENT ? req.user._id : req.validatedQuery.parentId;
  if (!parentId) throw ApiError.badRequest('parentId is required for admin access');
  const childId = resolveStudentId(req, req.validatedQuery.studentId);
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const filter = { parentId, childId };
  const [messages, total] = await Promise.all([
    ParentMessage.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    ParentMessage.countDocuments(filter),
  ]);
  return success(res, { messages, pagination: paginationMeta(page, limit, total) });
}));

const messageSchema = z.object({
  studentId: z.string().optional(),
  parentId: z.string().optional(),
  category: z.enum(['progress', 'attendance', 'remedial', 'reward', 'general']).default('progress'),
  channel: z.enum(['sms', 'ivr']).default('sms'),
  language: z.enum(['hi', 'en', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'pa', 'od']).default('hi'),
  message: z.string().trim().max(500).optional(),
  sendNow: z.boolean().default(true),
});

router.post('/messages', validateBody(messageSchema), asyncHandler(async (req, res) => {
  const parentId = req.user.role === ROLES.PARENT ? req.user._id : req.body.parentId;
  if (!parentId) throw ApiError.badRequest('parentId is required for admin access');
  const childId = resolveStudentId(req, req.body.studentId);

  const [child, parent] = await Promise.all([
    User.findById(childId).lean(),
    User.findById(parentId).lean(),
  ]);
  if (!child || !parent) throw ApiError.notFound('Parent or child account not found');

  let score = 0;
  let weakTopic = '';
  try {
    const { StudentProgress } = await import('../models/StudentProgress.js');
    const progress = await StudentProgress.findOne({ studentId: childId }).lean();
    score = progress?.overallScore || 0;
    weakTopic = progress?.weakTopics?.[0] || '';
  } catch {
    // Defaults are fine if progress has not been calculated yet.
  }

  const message = req.body.message || parentMessageTemplate({
    childName: child.name.split(' ')[0],
    childScore: score,
    weakTopic,
    language: req.body.language,
    category: req.body.category,
  });

  const record = await ParentMessage.create({
    parentId,
    childId,
    channel: req.body.channel,
    language: req.body.language,
    category: req.body.category,
    message,
    phone: parent.phone || null,
    status: req.body.sendNow ? 'sent' : 'queued',
    sentAt: req.body.sendNow ? new Date() : null,
  });

  await audit(req, 'parent_message', 'parent_message', {
    channel: record.channel,
    category: record.category,
    childId,
  }, String(record._id));

  return created(res, { message: record }, req.body.sendNow ? 'SMS/IVR update sent' : 'Message queued');
}));

router.get('/summary', asyncHandler(async (req, res) => {
  const { parentId, childId } = parentAndChild(req);
  const dashboard = await getParentDashboard(parentId, childId);
  return success(res, {
    child: dashboard.child,
    score: dashboard.progress.overallScore,
    weakTopics: dashboard.progress.weakTopics,
    badges: dashboard.progress.badges,
    recentMessages: dashboard.messages.slice(0, 3),
  });
}));

export default router;
