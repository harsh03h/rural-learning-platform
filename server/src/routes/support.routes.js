import { Router } from 'express';
import { z } from 'zod';
import SupportTicket from '../models/SupportTicket.js';
import { authenticate, authorize, optionalAuthenticate, ROLES } from '../middleware/auth.js';
import { validateBody, validateQuery } from '../utils/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { created, success, paginate, paginationMeta } from '../utils/response.js';
import { audit } from '../utils/audit.js';

const router = Router();

const FAQS = [
  {
    id: 'faq-offline-1',
    category: 'student',
    question: 'How do I study when the internet is not available?',
    answer: 'Download chapters while online at school. Saved lessons, notes and quizzes remain available on the device; your score is queued for sync automatically.',
  },
  {
    id: 'faq-ai-1',
    category: 'student',
    question: 'Can I ask AI Doubt Saathi in my mother tongue?',
    answer: 'Yes. Choose your language in the navbar and ask a question. Replies and audio narration follow the selected language.',
  },
  {
    id: 'faq-sync-1',
    category: 'teacher',
    question: 'What happens if a tablet stays offline for a week?',
    answer: 'Quiz records are stored locally on the tablet. Use Sync Now once connectivity returns; the server de-duplicates records using the client ID.',
  },
  {
    id: 'faq-lowdata-1',
    category: 'tech',
    question: 'How much data does a chapter use?',
    answer: 'Low-data mode keeps every chapter below 40 KB by serving text and audio scripts instead of heavy media.',
  },
  {
    id: 'faq-parent-1',
    category: 'parent',
    question: 'Do parents need a smartphone or data connection?',
    answer: 'No. Progress updates are delivered as SMS to feature phones, and an automated voice call can be requested in a regional language.',
  },
  {
    id: 'faq-device-1',
    category: 'tech',
    question: 'Can one device be shared by several students?',
    answer: 'Yes. Each learner signs in with their own profile so XP, downloads and remedial assignments stay separate.',
  },
];

function nextTicketId() {
  return `GRV-UP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
}

router.get('/faqs', asyncHandler(async (req, res) => {
  const category = String(req.query.category || 'all');
  const search = String(req.query.search || '').toLowerCase();
  const faqs = FAQS.filter((faq) => (
    (category === 'all' || faq.category === category)
    && (!search || `${faq.question} ${faq.answer}`.toLowerCase().includes(search))
  ));
  return success(res, { faqs });
}));

const ticketSchema = z.object({
  role: z.enum(['student', 'teacher', 'parent', 'admin', 'guest']).default('student'),
  category: z.string().trim().max(60).default('sync'),
  name: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(20).optional(),
  school: z.string().trim().max(160).optional(),
  description: z.string().trim().min(5).max(2000),
});

router.post('/tickets', optionalAuthenticate, validateBody(ticketSchema), asyncHandler(async (req, res) => {
  const ticket = await SupportTicket.create({
    ...req.body,
    ticketId: nextTicketId(),
    createdBy: req.user?._id || null,
  });
  return created(res, { ticket }, 'Support ticket registered with the Block Resource Coordinator');
}));

router.get('/tickets', authenticate, authorize(ROLES.ADMIN), validateQuery(z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const filter = req.validatedQuery.status ? { status: req.validatedQuery.status } : {};
  const [tickets, total] = await Promise.all([
    SupportTicket.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    SupportTicket.countDocuments(filter),
  ]);
  return success(res, { tickets, pagination: paginationMeta(page, limit, total) });
}));

router.patch('/tickets/:id', authenticate, authorize(ROLES.ADMIN), validateBody(z.object({
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  assignedTo: z.string().trim().max(120).optional(),
  resolution: z.string().trim().max(1000).optional(),
})), asyncHandler(async (req, res) => {
  const ticket = await SupportTicket.findById(req.params.id);
  if (!ticket) throw ApiError.notFound('Support ticket not found');
  Object.assign(ticket, req.body, { updatedBy: req.user._id });
  await ticket.save();
  await audit(req, 'support_ticket_update', 'support_ticket', req.body, String(ticket._id));
  return success(res, { ticket }, 'Support ticket updated');
}));

export default router;
