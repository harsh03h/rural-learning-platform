import { Router } from 'express';
import { z } from 'zod';
import User from '../models/User.js';
import StudentProgress from '../models/StudentProgress.js';
import RemedialAssignment from '../models/RemedialAssignment.js';
import TeacherQuestionSet from '../models/TeacherQuestionSet.js';
import Announcement from '../models/Announcement.js';
import { authenticate, authorize, ROLES } from '../middleware/auth.js';
import { validateBody, validateQuery } from '../utils/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { success, created, paginate, paginationMeta } from '../utils/response.js';
import { getTeacherOverview } from '../services/analyticsService.js';
import { generateQuestions, analyzePerformance } from '../services/aiService.js';
import { fallbackQuestions } from '../services/fallbackService.js';
import { audit } from '../utils/audit.js';

const router = Router();

router.use(authenticate, authorize(ROLES.TEACHER, ROLES.ADMIN));

function teacherContext(req) {
  return {
    classGrade: req.query.classGrade || req.user.classGrade || req.user.grade || undefined,
    schoolId: req.user.schoolId || undefined,
  };
}

router.get('/overview', asyncHandler(async (req, res) => {
  const overview = await getTeacherOverview(teacherContext(req));

  // Keep the original frontend contract working while exposing richer analytics.
  return success(res, {
    ...overview,
    weakTopics: overview.weakTopics.map((item) => item.topic),
    weakTopicDetails: overview.weakTopics,
    studentsNeedingAttention: overview.studentsNeedingAttention.map((item) => ({
      id: item.id,
      name: item.name,
      firstName: item.firstName,
      rollNo: item.rollNo,
      score: item.score,
      weakTopic: item.weakTopic,
      status: item.status,
      assignedRemedials: item.assignedRemedials,
    })),
  });
}));

router.get('/analytics', asyncHandler(async (req, res) => {
  const overview = await getTeacherOverview(teacherContext(req));
  return success(res, {
    classAverage: overview.averageClassScore,
    weeklyTrend: overview.weeklyTrend,
    weakTopics: overview.weakTopics,
    recentActivity: overview.recentActivity,
    activeLearners: overview.activeLearners,
    quizzesAttempted: overview.quizzesAttempted,
  });
}));

router.get('/students', validateQuery(z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  classGrade: z.string().optional(),
  search: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const filter = { role: 'student', isActive: true };
  const classGrade = req.validatedQuery.classGrade || req.user.classGrade || req.user.grade;
  if (classGrade) filter.classGrade = classGrade;
  if (req.validatedQuery.search) {
    filter.name = { $regex: req.validatedQuery.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
  }

  const [students, total] = await Promise.all([
    User.find(filter).select('name rollNo classGrade grade language avatar email phone').sort(sort).skip(skip).limit(limit).lean(),
    User.countDocuments(filter),
  ]);
  const ids = students.map((student) => student._id);
  const progressDocs = await StudentProgress.find({ studentId: { $in: ids } }).lean();
  const progressMap = new Map(progressDocs.map((item) => [String(item.studentId), item]));

  return success(res, {
    students: students.map((student) => {
      const progress = progressMap.get(String(student._id));
      return {
        ...student,
        id: String(student._id),
        overallScore: progress?.overallScore || 0,
        xp: progress?.xp || 0,
        weakTopics: progress?.weakTopics || [],
        attempts: progress?.stats?.quizzesAttempted || 0,
        status: (progress?.overallScore || 0) < 55 ? 'Needs Remedial Attention' : 'On Track',
      };
    }),
    pagination: paginationMeta(page, limit, total),
  });
}));

router.get('/students/:id', asyncHandler(async (req, res) => {
  const student = await User.findOne({ _id: req.params.id, role: 'student' })
    .select('name rollNo classGrade grade language avatar email phone')
    .lean();
  if (!student) throw ApiError.notFound('Student not found');
  const [progress, remedials] = await Promise.all([
    StudentProgress.findOne({ studentId: student._id }).lean(),
    RemedialAssignment.find({ studentId: student._id }).sort({ assignedAt: -1 }).lean(),
  ]);
  return success(res, { student, progress, remedials });
}));

router.get('/weak-topics', asyncHandler(async (req, res) => {
  const overview = await getTeacherOverview(teacherContext(req));
  return success(res, { weakTopics: overview.weakTopics });
}));

const remedialSchema = z.object({
  studentId: z.string().min(1),
  topic: z.string().trim().min(1),
  title: z.string().trim().min(1).optional(),
  description: z.string().trim().optional(),
  priority: z.enum(['High', 'Medium', 'Low']).default('Medium'),
  dueAt: z.string().datetime().optional(),
});

router.post('/remedial-assign', validateBody(remedialSchema), asyncHandler(async (req, res) => {
  const student = await User.findOne({ _id: req.body.studentId, role: 'student' });
  if (!student) throw ApiError.notFound('Student not found');

  const remedial = await RemedialAssignment.create({
    studentId: student._id,
    teacherId: req.user._id,
    topic: req.body.topic,
    title: req.body.title || `Revision: ${req.body.topic}`,
    description: req.body.description || `Practice ${req.body.topic} using NCERT examples and village-based word problems.`,
    priority: req.body.priority,
    dueAt: req.body.dueAt ? new Date(req.body.dueAt) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  await audit(req, 'remedial_assign', 'remedial_assignment', {
    studentId: student._id,
    topic: remedial.topic,
  }, String(remedial._id));

  return created(res, { remedial }, 'Remedial assignment sent to student');
}));

router.get('/remedials', validateQuery(z.object({ page: z.string(), limit: z.string() })), asyncHandler(async (req, res) => {
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const [remedials, total] = await Promise.all([
    RemedialAssignment.find({ teacherId: req.user._id }).sort(sort).skip(skip).limit(limit).lean(),
    RemedialAssignment.countDocuments({ teacherId: req.user._id }),
  ]);
  return success(res, { remedials, pagination: paginationMeta(page, limit, total) });
}));

const questionSchema = z.object({
  topic: z.string().trim().min(1).max(120).default('Fractions'),
  grade: z.string().trim().min(1).max(40).default('Class 7'),
  subject: z.string().trim().max(60).optional(),
  count: z.number().int().min(1).max(10).default(3),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).default('Medium'),
});

router.post('/generate-questions', validateBody(questionSchema), asyncHandler(async (req, res) => {
  const input = req.body;
  const aiResult = await generateQuestions(input);
  const payload = aiResult.ok && Array.isArray(aiResult.data?.questions) && aiResult.data.questions.length
    ? {
        ...aiResult.data,
        success: true,
        source: 'ai',
        fallback: false,
      }
    : { ...fallbackQuestions(input), source: 'fallback' };

  await TeacherQuestionSet.create({
    teacherId: req.user._id,
    topic: input.topic,
    grade: input.grade,
    subject: input.subject || 'Mathematics',
    count: input.count,
    difficulty: input.difficulty,
    questions: payload.questions,
    source: payload.source,
  });

  await audit(req, 'generate_questions', 'teacher_question_set', {
    topic: input.topic,
    grade: input.grade,
    count: input.count,
    source: payload.source,
  });

  return success(res, payload, payload.source === 'ai' ? 'Questions generated by AI service' : 'Questions generated from offline bank');
}));

router.get('/question-sets', validateQuery(z.object({ page: z.string(), limit: z.string() })), asyncHandler(async (req, res) => {
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const [sets, total] = await Promise.all([
    TeacherQuestionSet.find({ teacherId: req.user._id }).sort(sort).skip(skip).limit(limit).lean(),
    TeacherQuestionSet.countDocuments({ teacherId: req.user._id }),
  ]);
  return success(res, { questionSets: sets, pagination: paginationMeta(page, limit, total) });
}));

router.post('/performance-analysis', asyncHandler(async (req, res) => {
  const overview = await getTeacherOverview(teacherContext(req));
  const result = await analyzePerformance({
    students: overview.students.map((student) => ({
      name: student.name,
      overallScore: student.score,
    })),
  });
  const analysis = result.ok ? result.data : {
    success: true,
    totalStudents: overview.totalStudents,
    averageClassScore: overview.averageClassScore,
    weakTopics: overview.weakTopics.map((item) => item.topic),
    studentsNeedingAttention: overview.studentsNeedingAttention.map((item) => item.name),
    source: 'local-analytics',
  };
  return success(res, analysis);
}));

router.post('/announcements', validateBody(z.object({
  title: z.string().trim().min(1),
  body: z.string().trim().min(1),
  targetRoles: z.array(z.enum(['student', 'teacher', 'parent', 'admin', 'all'])).optional(),
  classGrade: z.string().trim().optional(),
  expiresAt: z.string().datetime().optional(),
})), asyncHandler(async (req, res) => {
  const announcement = await Announcement.create({
    ...req.body,
    createdBy: req.user._id,
  });
  return created(res, { announcement }, 'Announcement published');
}));

export default router;
