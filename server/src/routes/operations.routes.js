import { Router } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import Attendance from '../models/Attendance.js';
import CallbackRequest from '../models/CallbackRequest.js';
import ChallengeCompletion from '../models/ChallengeCompletion.js';
import Device from '../models/Device.js';
import ParentMessage from '../models/ParentMessage.js';
import RewardClaim from '../models/RewardClaim.js';
import SchoolSettings from '../models/SchoolSettings.js';
import User from '../models/User.js';
import StudentProgress from '../models/StudentProgress.js';
import { ClassSection, FacultyMember } from '../models/Directory.js';
import { authenticate, authorize, ROLES, resolveStudentId } from '../middleware/auth.js';
import { validateBody, validateQuery } from '../utils/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { created, success, paginate, paginationMeta } from '../utils/response.js';
import { getSchoolSettings } from '../services/analyticsService.js';
import { parentMessageTemplate } from '../services/fallbackService.js';
import { audit } from '../utils/audit.js';

const router = Router();

const LANGUAGES = ['hi', 'en', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'pa', 'od'];
const staff = authorize(ROLES.TEACHER, ROLES.ADMIN);
const adminOnly = authorize(ROLES.ADMIN);

function today() {
  return new Date().toISOString().slice(0, 10);
}

function requireObjectId(value, label) {
  if (!mongoose.isValidObjectId(value)) throw ApiError.badRequest(`Invalid ${label}`);
  return value;
}

// ---------------------------------------------------------------------------
// Daily concept challenges
// ---------------------------------------------------------------------------

const DAILY_CHALLENGES = {
  'Class 6': [
    { id: 'c6-number', question: 'What is the place value of 7 in 4,732?', options: ['7', '70', '700', '7000'], correct: 1, tip: 'Count positions from the right: ones, tens, hundreds.' },
    { id: 'c6-food', question: 'Which part of a plant makes food using sunlight?', options: ['Root', 'Leaf', 'Stem', 'Flower'], correct: 1, tip: 'Leaves contain chlorophyll and perform photosynthesis.' },
  ],
  'Class 7': [
    { id: 'c7-integers', question: 'What is the product of two negative integers: (-6) × (-4)?', options: ['-24', '24', '10', '-10'], correct: 1, tip: 'A negative times a negative gives a positive.' },
    { id: 'c7-photosynthesis', question: 'Which gas do green plants absorb from air during photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], correct: 2, tip: 'Plants use carbon dioxide and release oxygen.' },
  ],
  'Class 8': [
    { id: 'c8-rational', question: 'Which number is a rational number?', options: ['√2', 'π', '3/4', '∞'], correct: 2, tip: 'A rational number can be written as p/q.' },
    { id: 'c8-crop', question: 'Which practice helps restore soil fertility naturally?', options: ['Crop rotation', 'Over-tilling', 'Burning residue', 'Flood irrigation'], correct: 0, tip: 'Legume crop rotation fixes nitrogen in the soil.' },
  ],
  'Class 9': [
    { id: 'c9-cell', question: 'Which organelle is known as the powerhouse of the cell?', options: ['Ribosome', 'Mitochondrion', 'Nucleus', 'Golgi body'], correct: 1, tip: 'Mitochondria release energy from food.' },
    { id: 'c9-polynomial', question: 'What is the degree of the polynomial 3x² + 2x + 1?', options: ['1', '2', '3', '0'], correct: 1, tip: 'Degree is the highest power of the variable.' },
  ],
  'Class 10': [
    { id: 'c10-trig', question: 'What is sin(90°)?', options: ['0', '1', '√2/2', 'Undefined'], correct: 1, tip: 'sin(90°) equals 1 on the unit circle.' },
    { id: 'c10-reaction', question: 'Which equation is balanced: H₂ + O₂ → H₂O?', options: ['H₂ + O₂ → H₂O', '2H₂ + O₂ → 2H₂O', 'H₂ + 2O₂ → H₂O', '2H₂ + 2O₂ → H₂O'], correct: 1, tip: 'Count atoms on both sides: 4 hydrogen and 2 oxygen.' },
  ],
};

function challengeForGrade(grade) {
  const pools = DAILY_CHALLENGES[grade] || DAILY_CHALLENGES['Class 7'];
  const index = new Date().getDate() % pools.length;
  const challenge = pools[index];
  return { challengeId: challenge.id, question: challenge.question, options: challenge.options, tip: challenge.tip };
}

router.get('/daily-challenge', authenticate, validateQuery(z.object({ grade: z.string().optional() })), asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const gradeRaw = req.user.classGrade || req.user.grade || req.validatedQuery.grade || 'Class 7';
  const grade = String(gradeRaw).replace(/[A-Za-z]$/, '').trim();
  const challenge = challengeForGrade(grade);
  const completed = await ChallengeCompletion.exists({ studentId, challengeId: challenge.challengeId });
  return success(res, { grade, challenge, completed: Boolean(completed), rewardXp: 15 });
}));

router.post('/daily-challenge/answer', authenticate, validateBody(z.object({
  challengeId: z.string().trim(),
  optionIndex: z.number().int().min(0).max(3),
  grade: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.body.studentId);
  const poolKey = String(req.body.grade || req.user.classGrade || req.user.grade || 'Class 7').replace(/[A-Za-z]$/, '').trim();
  const pool = DAILY_CHALLENGES[poolKey] || DAILY_CHALLENGES['Class 7'];
  const challenge = pool.find((item) => item.id === req.body.challengeId);
  if (!challenge) throw ApiError.notFound('Daily challenge not found');

  const isCorrect = challenge.correct === req.body.optionIndex;
  let earnedXP = 0;
  if (isCorrect) {
    const existing = await ChallengeCompletion.findOne({ studentId, challengeId: challenge.id });
    if (!existing) {
      earnedXP = 15;
      const progress = await StudentProgress.findOne({ studentId });
      if (progress) {
        progress.xp += earnedXP;
        progress.stats.totalXpEarned += earnedXP;
        progress.level = Math.max(1, Math.floor(progress.xp / 500) + 1);
        await progress.save();
      }
      await ChallengeCompletion.create({ studentId, challengeId: challenge.id, awardedXp: earnedXP });
    }
  }

  return success(res, {
    isCorrect,
    earnedXP,
    correctIndex: challenge.correct,
    tip: challenge.tip,
  }, isCorrect ? (earnedXP ? '+15 XP earned' : 'Challenge already completed today') : 'Try another concept question');
}));

// ---------------------------------------------------------------------------
// Teacher attendance and parent SMS
// ---------------------------------------------------------------------------

router.get('/teacher/attendance', authenticate, staff, validateQuery(z.object({
  date: z.string().optional(),
  classGrade: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const filter = { date: req.validatedQuery.date || today() };
  if (req.validatedQuery.classGrade || req.user.classGrade) {
    filter.classGrade = req.validatedQuery.classGrade || req.user.classGrade;
  }
  const records = await Attendance.find(filter).sort({ studentId: 1 }).lean();
  return success(res, { date: filter.date, records });
}));

router.post('/teacher/attendance', authenticate, staff, validateBody(z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).default(() => today()),
  classGrade: z.string().trim().min(1),
  records: z.array(z.object({
    studentId: z.string().trim().min(1),
    status: z.enum(['present', 'absent']),
  })).min(1).max(200),
})), asyncHandler(async (req, res) => {
  const operations = req.body.records.map((record) => ({
    updateOne: {
      filter: { date: req.body.date, studentId: requireObjectId(record.studentId, 'studentId') },
      update: {
        $set: {
          date: req.body.date,
          classGrade: req.body.classGrade,
          studentId: record.studentId,
          status: record.status,
          teacherId: req.user._id,
          markedAt: new Date(),
        },
      },
      upsert: true,
    },
  }));
  await Attendance.bulkWrite(operations);
  await audit(req, 'attendance_mark', 'attendance', { count: operations.length, date: req.body.date }, req.body.classGrade);
  return success(res, { date: req.body.date, classGrade: req.body.classGrade, marked: operations.length }, 'Attendance saved');
}));

router.post('/teacher/sms-broadcast', authenticate, staff, validateBody(z.object({
  classGrade: z.string().trim().min(1),
  category: z.enum(['progress', 'attendance', 'remedial', 'reward', 'general']).default('progress'),
  language: z.enum(LANGUAGES).default('hi'),
  message: z.string().trim().max(500).optional(),
})), asyncHandler(async (req, res) => {
  const students = await User.find({ role: 'student', isActive: true, classGrade: req.body.classGrade })
    .select('name').lean();
  if (!students.length) throw ApiError.notFound('No students found for this class');

  const parents = await User.find({
    role: 'parent',
    childId: { $in: students.map((student) => student._id) },
    isActive: true,
  }).lean();

  const messages = await Promise.all(parents.map(async (parent) => {
    const child = students.find((student) => String(student._id) === String(parent.childId));
    const progress = await StudentProgress.findOne({ studentId: parent.childId }).select('overallScore weakTopics').lean();
    return ParentMessage.create({
      parentId: parent._id,
      childId: parent.childId,
      channel: 'sms',
      language: req.body.language,
      category: req.body.category,
      message: req.body.message || parentMessageTemplate({
        childName: child?.name?.split(' ')[0] || 'your child',
        childScore: progress?.overallScore || 0,
        weakTopic: progress?.weakTopics?.[0] || '',
        language: req.body.language,
        category: req.body.category,
      }),
      phone: parent.phone || null,
      status: 'sent',
      sentAt: new Date(),
    });
  }));

  await audit(req, 'sms_broadcast', 'parent_message', {
    classGrade: req.body.classGrade,
    language: req.body.language,
    recipients: messages.length,
  });

  return success(res, {
    recipients: messages.length,
    classSize: students.length,
    messages: messages.map((message) => ({ id: String(message._id), phone: message.phone, status: message.status })),
  }, `Progress SMS sent to ${messages.length} guardians`);
}));

// ---------------------------------------------------------------------------
// Rewards and certificates
// ---------------------------------------------------------------------------

const REWARD_CATALOG = [
  { key: 'cert', title: 'Academic Merit Certificate', requiredXp: 0, icon: '🏆' },
  { key: 'labPass', title: 'Digital Lab Pass', requiredXp: 250, icon: '🧪' },
  { key: 'formulaPack', title: 'Formula Quick-Reference Pack', requiredXp: 500, icon: '📘' },
];

router.get('/student/rewards', authenticate, asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.query.studentId);
  const [progress, claims] = await Promise.all([
    StudentProgress.findOne({ studentId }).select('xp level streakDays').lean(),
    RewardClaim.find({ studentId, status: 'claimed' }).lean(),
  ]);
  const claimed = new Set(claims.map((claim) => claim.key));
  return success(res, {
    xp: progress?.xp || 0,
    level: progress?.level || 1,
    streakDays: progress?.streakDays || 0,
    rewards: REWARD_CATALOG.map((reward) => ({
      ...reward,
      claimed: claimed.has(reward.key),
      eligible: (progress?.xp || 0) >= reward.requiredXp,
    })),
    claims,
  });
}));

router.post('/student/rewards/claim', authenticate, validateBody(z.object({
  key: z.string().trim(),
  title: z.string().trim().optional(),
})), asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.body.studentId);
  const reward = REWARD_CATALOG.find((item) => item.key === req.body.key);
  if (!reward) throw ApiError.notFound('Reward not found');
  const progress = await StudentProgress.findOne({ studentId }).select('xp').lean();
  if ((progress?.xp || 0) < reward.requiredXp) throw ApiError.badRequest('Not enough XP to claim this reward');

  const claim = await RewardClaim.findOneAndUpdate(
    { studentId, key: reward.key },
    {
      $set: {
        title: req.body.title || reward.title,
        xpAtClaim: progress?.xp || 0,
        status: 'claimed',
      },
      $setOnInsert: { claimedAt: new Date() },
    },
    { upsert: true, returnDocument: 'after' },
  );
  return created(res, { claim }, `Unlocked reward: ${claim.title}`);
}));

router.post('/student/certificate', authenticate, validateBody(z.object({
  language: z.enum(LANGUAGES).default('en'),
})), asyncHandler(async (req, res) => {
  const studentId = resolveStudentId(req, req.body.studentId);
  const [student, progress] = await Promise.all([
    User.findById(studentId).select('name grade classGrade rollNo school').lean(),
    StudentProgress.findOne({ studentId }).select('xp level').lean(),
  ]);
  if (!student) throw ApiError.notFound('Student not found');

  const certificateId = `GS-MERIT-2026-XP${progress?.xp || 0}-${student.rollNo || '24'}`;
  const certificate = {
    certificateId,
    studentName: student.name,
    grade: student.classGrade || student.grade,
    rollNo: student.rollNo,
    school: student.school,
    xp: progress?.xp || 0,
    level: progress?.level || 1,
    language: req.body.language,
    issuedAt: new Date().toISOString(),
    verified: true,
  };

  await RewardClaim.findOneAndUpdate(
    { studentId, key: 'cert' },
    {
      $set: {
        title: 'Academic Merit Certificate',
        xpAtClaim: certificate.xp,
        certificateId,
        status: 'claimed',
      },
      $setOnInsert: { claimedAt: new Date() },
    },
    { upsert: true, returnDocument: 'after' },
  );

  return created(res, { certificate }, 'Merit certificate generated');
}));

router.get('/certificates/:certificateId', asyncHandler(async (req, res) => {
  const claim = await RewardClaim.findOne({ certificateId: req.params.certificateId }).lean();
  if (!claim) throw ApiError.notFound('Certificate not found or invalid');
  return success(res, { verified: true, certificate: { certificateId: claim.certificateId, title: claim.title, issuedAt: claim.claimedAt, xp: claim.xpAtClaim } });
}));

// ---------------------------------------------------------------------------
// Parent callback tickets
// ---------------------------------------------------------------------------

router.get('/parent/callbacks', authenticate, authorize(ROLES.PARENT, ROLES.ADMIN), validateQuery(z.object({
  parentId: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const parentId = req.user.role === ROLES.PARENT ? req.user._id : req.validatedQuery.parentId;
  if (!parentId) throw ApiError.badRequest('parentId is required for admin access');
  const requests = await CallbackRequest.find({ parentId }).sort({ requestedAt: -1 }).lean();
  return success(res, { requests });
}));

router.post('/parent/callbacks', authenticate, authorize(ROLES.PARENT), validateBody(z.object({
  childId: z.string().optional(),
  preferredLanguage: z.enum(LANGUAGES).default('hi'),
  notes: z.string().trim().max(500).optional(),
})), asyncHandler(async (req, res) => {
  const childId = resolveStudentId(req, req.body.childId);
  const [child, parent] = await Promise.all([
    User.findById(childId).select('name classGrade grade').lean(),
    User.findById(req.user._id).lean(),
  ]);
  const request = await CallbackRequest.create({
    parentId: req.user._id,
    childId,
    childName: child?.name || req.user.childName || '',
    childGrade: child?.classGrade || child?.grade || '',
    phone: parent.phone || '',
    preferredLanguage: req.body.preferredLanguage,
    notes: req.body.notes || '',
  });
  return created(res, { request }, 'Teacher callback requested');
}));

// ---------------------------------------------------------------------------
// Admin directory, fleet, feature flags and accreditation
// ---------------------------------------------------------------------------

router.get('/admin/classes', authenticate, adminOnly, validateQuery(z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const [classes, total] = await Promise.all([
    ClassSection.find().sort(sort).skip(skip).limit(limit).lean(),
    ClassSection.countDocuments(),
  ]);
  return success(res, { classes, pagination: paginationMeta(page, limit, total) });
}));

router.post('/admin/classes', authenticate, adminOnly, validateBody(z.object({
  grade: z.string().trim().min(1),
  section: z.string().trim().min(1),
  room: z.string().trim().optional(),
  teacher: z.string().trim().optional(),
  students: z.number().int().min(0).optional(),
  attendance: z.string().trim().optional(),
  stream: z.string().trim().optional(),
})), asyncHandler(async (req, res) => {
  const classSection = await ClassSection.findOneAndUpdate(
    { schoolId: 'school-rampur-01', grade: req.body.grade, section: req.body.section },
    { $set: req.body },
    { upsert: true, returnDocument: 'after', runValidators: true },
  );
  return created(res, { classSection }, 'Class section saved');
}));

router.delete('/admin/classes/:id', authenticate, adminOnly, asyncHandler(async (req, res) => {
  const classSection = await ClassSection.findByIdAndDelete(requireObjectId(req.params.id, 'class id'));
  if (!classSection) throw ApiError.notFound('Class section not found');
  return success(res, {}, 'Class section deleted');
}));

router.get('/admin/faculty', authenticate, adminOnly, validateQuery(z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const [faculty, total] = await Promise.all([
    FacultyMember.find().sort(sort).skip(skip).limit(limit).lean(),
    FacultyMember.countDocuments(),
  ]);
  return success(res, { faculty, pagination: paginationMeta(page, limit, total) });
}));

router.post('/admin/faculty', authenticate, adminOnly, validateBody(z.object({
  name: z.string().trim().min(2),
  role: z.string().trim().optional(),
  subject: z.string().trim().optional(),
  attendance: z.string().trim().optional(),
  syllabus: z.string().trim().optional(),
  planStatus: z.enum(['Pending', 'Approved', 'Revision Needed']).optional(),
})), asyncHandler(async (req, res) => {
  const member = await FacultyMember.create(req.body);
  return created(res, { member }, 'Faculty member added');
}));

router.put('/admin/faculty/:id', authenticate, adminOnly, validateBody(z.object({
  name: z.string().trim().min(2).optional(),
  role: z.string().trim().optional(),
  subject: z.string().trim().optional(),
  attendance: z.string().trim().optional(),
  syllabus: z.string().trim().optional(),
  planStatus: z.enum(['Pending', 'Approved', 'Revision Needed']).optional(),
})), asyncHandler(async (req, res) => {
  const member = await FacultyMember.findByIdAndUpdate(
    requireObjectId(req.params.id, 'faculty id'),
    { $set: req.body },
    { returnDocument: 'after', runValidators: true },
  );
  if (!member) throw ApiError.notFound('Faculty member not found');
  return success(res, { member }, 'Faculty member updated');
}));

router.get('/admin/fleet', authenticate, adminOnly, validateQuery(z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const filter = req.validatedQuery.status ? { status: req.validatedQuery.status } : {};
  const [devices, total] = await Promise.all([
    Device.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Device.countDocuments(filter),
  ]);
  return success(res, { devices, pagination: paginationMeta(page, limit, total) });
}));

router.post('/admin/fleet/:deviceId/command', authenticate, adminOnly, validateBody(z.object({
  command: z.enum(['ping', 'force_sync', 'lock', 'unlock']),
})), asyncHandler(async (req, res) => {
  const device = await Device.findOne({ deviceId: req.params.deviceId });
  if (!device) throw ApiError.notFound('Device not found');
  device.commands.push({ command: req.body.command, issuedBy: req.user._id, status: 'delivered' });
  if (req.body.command === 'ping') device.lastPingAt = new Date();
  if (req.body.command === 'lock') device.locked = true;
  if (req.body.command === 'unlock') device.locked = false;
  await device.save();
  await audit(req, 'device_command', 'device', { command: req.body.command }, String(device._id));
  return success(res, { device }, `Device ${req.body.command.replace('_', ' ')} dispatched`);
}));

router.get('/admin/feature-flags', authenticate, adminOnly, asyncHandler(async (_req, res) => {
  const settings = await getSchoolSettings();
  return success(res, { featureFlags: settings.featureFlags || [] });
}));

router.put('/admin/feature-flags', authenticate, adminOnly, validateBody(z.object({
  featureFlags: z.array(z.object({
    id: z.string(),
    name: z.string(),
    category: z.string().optional(),
    description: z.string().optional(),
    targetGrade: z.string().optional(),
    enabled: z.boolean().optional(),
    isCore: z.boolean().optional(),
  })),
})), asyncHandler(async (req, res) => {
  const settings = await SchoolSettings.findOneAndUpdate(
    { schoolId: 'school-rampur-01' },
    { $set: { featureFlags: req.body.featureFlags, updatedBy: req.user._id } },
    { upsert: true, returnDocument: 'after' },
  );
  return success(res, { featureFlags: settings.featureFlags }, 'Feature controls saved');
}));

router.post('/admin/edge/sync', authenticate, adminOnly, validateBody(z.object({
  type: z.enum(['cloud', 'curriculum']).default('cloud'),
  recordCount: z.number().int().min(0).optional(),
})), asyncHandler(async (req, res) => {
  const recordCount = req.body.recordCount || 0;
  const settings = await SchoolSettings.findOneAndUpdate(
    { schoolId: 'school-rampur-01' },
    {
      $set: {
        'edgeServer.lastHeartbeatAt': new Date(),
        'districtSync.status': 'synced',
        'districtSync.lastSyncAt': new Date(),
        'districtSync.lastRecordCount': recordCount,
        updatedBy: req.user._id,
      },
      $inc: { 'districtSync.totalRecordCount': recordCount },
    },
    { upsert: true, returnDocument: 'after' },
  );
  await audit(req, 'edge_sync', 'school_settings', { type: req.body.type }, String(settings._id));
  return success(res, { edgeServer: settings.edgeServer, districtSync: settings.districtSync }, 'Edge sync completed');
}));

router.get('/admin/accreditation', authenticate, adminOnly, asyncHandler(async (_req, res) => {
  const settings = await getSchoolSettings();
  return success(res, { accreditation: settings.accreditation, schoolName: settings.schoolName });
}));

router.put('/admin/accreditation', authenticate, adminOnly, validateBody(z.object({
  isAttested: z.boolean(),
  documents: z.array(z.string()).optional(),
})), asyncHandler(async (req, res) => {
  const set = {
    'accreditation.isAttested': req.body.isAttested,
    'accreditation.attestedAt': new Date(),
    updatedBy: req.user._id,
  };
  if (req.body.documents) set['accreditation.documents'] = req.body.documents;
  const settings = await SchoolSettings.findOneAndUpdate(
    { schoolId: 'school-rampur-01' },
    { $set: set },
    { upsert: true, returnDocument: 'after' },
  );
  return success(res, { accreditation: settings.accreditation }, 'Accreditation attestation updated');
}));

export default router;
