import { Router } from 'express';
import { z } from 'zod';
import DoubtMessage from '../models/DoubtMessage.js';
import { optionalAuthenticate, authenticate, resolveStudentId, ROLES } from '../middleware/auth.js';
import { aiLimiter } from '../middleware/rateLimit.js';
import { validateBody, validateQuery } from '../utils/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { success, paginate, paginationMeta } from '../utils/response.js';
import { askAi, aiHealth } from '../services/aiService.js';
import { fallbackDoubtReply } from '../services/fallbackService.js';
import { audit } from '../utils/audit.js';

const router = Router();

const doubtSchema = z.object({
  query: z.string().trim().min(1).max(2000),
  language: z.enum(['hi', 'en', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'pa', 'od']).default('hi'),
  grade: z.string().trim().max(40).default('Class 7'),
  studentId: z.string().optional(),
  conversationId: z.string().optional(),
});

router.post('/doubt', optionalAuthenticate, aiLimiter, validateBody(doubtSchema), asyncHandler(async (req, res) => {
  const result = await askAi(req.body);

  let payload;
  if (result.ok && result.data?.reply) {
    payload = {
      ...result.data,
      success: true,
      source: result.data.source || 'ai-service',
      isFallback: false,
    };
  } else {
    payload = {
      ...fallbackDoubtReply(req.body.query, req.body.language),
      success: true,
      query: req.body.query,
      language: req.body.language,
      grade: req.body.grade,
      isFallback: true,
    };
  }

  let studentId = null;
  if (req.user) {
    try {
      studentId = resolveStudentId(req, req.body.studentId);
    } catch {
      studentId = req.user.role === ROLES.STUDENT ? String(req.user._id) : null;
    }
  }

  if (req.user) {
    await DoubtMessage.create({
      userId: req.user._id,
      studentId,
      query: req.body.query,
      language: req.body.language,
      grade: req.body.grade,
      reply: payload.reply || '',
      analogy: payload.analogy || '',
      practicalTip: payload.practicalTip || '',
      source: payload.source || 'unknown',
      isFallback: Boolean(payload.isFallback),
      metadata: { conversationId: req.body.conversationId || null },
    });
    await audit(req, 'ai_doubt', 'doubt_message', {
      language: req.body.language,
      source: payload.source,
      isFallback: payload.isFallback,
    });
  }

  return success(res, payload, payload.isFallback ? 'Answered from offline knowledge bank' : 'AI answer generated');
}));

router.get('/history', authenticate, validateQuery(z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const filter = { userId: req.user._id };
  const [messages, total] = await Promise.all([
    DoubtMessage.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    DoubtMessage.countDocuments(filter),
  ]);
  return success(res, { messages, pagination: paginationMeta(page, limit, total) });
}));

router.post('/feedback', authenticate, validateBody(z.object({
  messageId: z.string().min(1),
  helpful: z.boolean(),
})), asyncHandler(async (req, res) => {
  const message = await DoubtMessage.findOne({ _id: req.body.messageId, userId: req.user._id });
  if (!message) throw ApiError.notFound('Message not found');
  message.helpful = req.body.helpful;
  await message.save();
  return success(res, { message }, 'Feedback recorded');
}));

router.get('/health', asyncHandler(async (_req, res) => {
  const health = await aiHealth();
  return success(res, health, health.ok ? 'AI service reachable' : 'AI service unavailable');
}));

export default router;
