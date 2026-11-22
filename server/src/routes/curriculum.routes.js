import { Router } from 'express';
import { z } from 'zod';
import Course from '../models/Curriculum.js';
import Timetable from '../models/Timetable.js';
import Download from '../models/Download.js';
import Announcement from '../models/Announcement.js';
import { authenticate, authorize, resolveStudentId, ROLES } from '../middleware/auth.js';
import { validateBody, validateQuery, validateParams } from '../utils/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { success, created, noContent } from '../utils/response.js';

const router = Router();

const courseIdParam = z.object({ courseId: z.string().trim().min(1) });
const chapterParam = z.object({
  courseId: z.string().trim().min(1),
  chapterId: z.string().trim().min(1),
});
const timetableQuery = z.object({
  classGrade: z.string().trim().optional(),
  academicYear: z.string().trim().optional(),
});

function findChapter(course, chapterId) {
  return course.chapters.find(
    (chapter) => chapter.chapterId === chapterId || String(chapter._id) === String(chapterId),
  );
}

// Legacy endpoint kept so the original frontend contract keeps working.
router.get('/courses', asyncHandler(async (_req, res) => {
  const [grades, subjects, courses] = await Promise.all([
    Course.distinct('grade'),
    Course.distinct('subject'),
    Course.countDocuments({ isPublished: true }),
  ]);
  return success(res, {
    gradeOfferings: grades.sort(),
    subjects: subjects.sort(),
    totalCourses: courses,
    message: 'Full rural curriculum loaded',
  });
}));

router.get('/catalog', asyncHandler(async (req, res) => {
  const courses = await Course.find({ isPublished: true })
    .select('courseId grade subject title description icon color language chapters.chapterId chapters.title chapters.order')
    .sort({ grade: 1, subject: 1 })
    .lean();
  return success(res, {
    courses: courses.map((course) => ({
      ...course,
      chapterCount: course.chapters?.length || 0,
      chapters: undefined,
    })),
    grades: [...new Set(courses.map((course) => course.grade))],
    subjects: [...new Set(courses.map((course) => course.subject))],
    total: courses.length,
  });
}));

router.get('/courses/grade/:grade', asyncHandler(async (req, res) => {
  const courses = await Course.find({ grade: req.params.grade, isPublished: true }).sort({ subject: 1 }).lean();
  if (!courses.length) throw ApiError.notFound('No courses found for this grade');
  return success(res, { grade: req.params.grade, courses, total: courses.length });
}));

router.get('/courses/search', asyncHandler(async (req, res) => {
  const q = String(req.query.q || '').trim();
  if (!q) return success(res, { results: [], total: 0 });
  const results = await Course.find(
    { $text: { $search: q }, isPublished: true },
    { score: { $meta: 'textScore' } },
  )
    .sort({ score: { $meta: 'textScore' } })
    .limit(20)
    .lean();
  return success(res, { results, total: results.length });
}));

router.get('/courses/:courseId', validateParams(courseIdParam), asyncHandler(async (req, res) => {
  const course = await Course.findOne({ courseId: req.params.courseId, isPublished: true }).lean();
  if (!course) throw ApiError.notFound('Course not found');
  return success(res, { course });
}));

router.get('/courses/:courseId/chapters', validateParams(courseIdParam), asyncHandler(async (req, res) => {
  const course = await Course.findOne({ courseId: req.params.courseId, isPublished: true }).lean();
  if (!course) throw ApiError.notFound('Course not found');
  return success(res, {
    courseId: course.courseId,
    grade: course.grade,
    subject: course.subject,
    chapters: [...course.chapters].sort((a, b) => a.order - b.order),
    total: course.chapters.length,
  });
}));

router.get(
  '/courses/:courseId/chapters/:chapterId',
  validateParams(chapterParam),
  asyncHandler(async (req, res) => {
    const course = await Course.findOne({ courseId: req.params.courseId, isPublished: true }).lean();
    if (!course) throw ApiError.notFound('Course not found');
    const chapter = findChapter(course, req.params.chapterId);
    if (!chapter) throw ApiError.notFound('Chapter not found');
    return success(res, { course, chapter });
  }),
);

router.get('/chapters/:chapterId/notes', asyncHandler(async (req, res) => {
  const course = await Course.findOne({ 'chapters.chapterId': req.params.chapterId, isPublished: true }).lean();
  if (!course) throw ApiError.notFound('Chapter not found');
  const chapter = findChapter(course, req.params.chapterId);
  return success(res, {
    chapterId: chapter.chapterId,
    title: chapter.title,
    subject: course.subject,
    grade: course.grade,
    notes: chapter.notes || {},
  });
}));

router.get('/chapters/:chapterId/quiz', asyncHandler(async (req, res) => {
  const course = await Course.findOne({ 'chapters.chapterId': req.params.chapterId, isPublished: true }).lean();
  if (!course) throw ApiError.notFound('Chapter not found');
  const chapter = findChapter(course, req.params.chapterId);
  return success(res, {
    chapterId: chapter.chapterId,
    topicKey: chapter.topics?.[0] || chapter.chapterId,
    grade: course.grade,
    subject: course.subject,
    questions: chapter.quiz || [],
    total: chapter.quiz?.length || 0,
  });
}));

router.post('/courses', authenticate, authorize(ROLES.TEACHER, ROLES.ADMIN), validateBody(z.object({
  courseId: z.string().trim().min(1),
  grade: z.string().trim().min(1),
  subject: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().optional(),
  language: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);
  return created(res, { course }, 'Course created');
}));

router.put('/courses/:courseId', authenticate, authorize(ROLES.TEACHER, ROLES.ADMIN), asyncHandler(async (req, res) => {
  const course = await Course.findOneAndUpdate(
    { courseId: req.params.courseId },
    { $set: req.body },
    { returnDocument: 'after', runValidators: true },
  );
  if (!course) throw ApiError.notFound('Course not found');
  return success(res, { course }, 'Course updated');
}));

router.get('/timetable', authenticate, validateQuery(timetableQuery), asyncHandler(async (req, res) => {
  const query = req.validatedQuery;
  const classGrade = query.classGrade || req.user.classGrade || req.user.grade || 'Class 7A';
  const timetable = await Timetable.findOne({
    classGrade,
    academicYear: query.academicYear || '2026-27',
  }).lean();
  if (!timetable) throw ApiError.notFound('Timetable not found');
  return success(res, { timetable });
}));

router.put('/timetable', authenticate, authorize(ROLES.TEACHER, ROLES.ADMIN), validateBody(z.object({
  classGrade: z.string().trim().min(1),
  academicYear: z.string().trim().optional(),
  periods: z.array(z.object({
    day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    period: z.number().int().min(1).max(12),
    subject: z.string().trim().min(1),
    teacher: z.string().optional(),
    room: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })),
})), asyncHandler(async (req, res) => {
  const timetable = await Timetable.findOneAndUpdate(
    {
      classGrade: req.body.classGrade,
      academicYear: req.body.academicYear || '2026-27',
    },
    {
      $set: {
        periods: req.body.periods,
        updatedBy: req.user._id,
      },
    },
    { returnDocument: 'after', upsert: true, runValidators: true },
  );
  return success(res, { timetable }, 'Timetable saved');
}));

router.get('/downloads', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const downloads = await Download.find({ studentId }).sort({ downloadedAt: -1 }).lean();
  return success(res, {
    downloads,
    ids: downloads.map((item) => item.chapterId),
    totalKb: downloads.reduce((sum, item) => sum + (item.sizeKb || 0), 0),
  });
}));

router.post('/downloads/:chapterId', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.body.studentId);
  const course = await Course.findOne({ 'chapters.chapterId': req.params.chapterId }).lean();
  const chapter = course?.chapters?.find((item) => item.chapterId === req.params.chapterId);

  const download = await Download.findOneAndUpdate(
    { studentId, chapterId: req.params.chapterId },
    {
      $set: {
        status: 'downloaded',
        downloadedAt: new Date(),
        courseId: course?.courseId || null,
        title: chapter?.title || req.params.chapterId,
        sizeKb: chapter?.lesson?.sizeKb || 24,
        deviceId: req.body.deviceId || 'web',
      },
    },
    { returnDocument: 'after', upsert: true, runValidators: true },
  );
  return created(res, { download }, 'Lesson made available offline');
}));

router.delete('/downloads/:chapterId', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const result = await Download.updateOne(
    { studentId, chapterId: req.params.chapterId },
    { $set: { status: 'removed' } },
  );
  if (!result.matchedCount && !result.upsertedCount) throw ApiError.notFound('Download not found');
  return noContent(res);
}));

router.get('/announcements', authenticate, asyncHandler(async (req, res) => {
  const roles = [req.user.role, 'all'];
  const announcements = await Announcement.find({
    isActive: true,
    targetRoles: { $in: roles },
    $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
  })
    .sort({ publishedAt: -1 })
    .limit(20)
    .lean();
  return success(res, { announcements, total: announcements.length });
}));

export default router;
