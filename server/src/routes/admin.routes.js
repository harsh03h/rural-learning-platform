import { Router } from 'express';
import { z } from 'zod';
import User from '../models/User.js';
import SchoolSettings from '../models/SchoolSettings.js';
import AuditLog from '../models/AuditLog.js';
import SyncRecord from '../models/SyncRecord.js';
import { authenticate, authorize, ROLES } from '../middleware/auth.js';
import { validateBody, validateQuery } from '../utils/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { success, paginate, paginationMeta } from '../utils/response.js';
import { getAdminOverview, getSchoolSettings } from '../services/analyticsService.js';
import { hashPassword } from '../utils/password.js';
import { audit } from '../utils/audit.js';

const router = Router();

router.use(authenticate, authorize(ROLES.ADMIN));

router.get('/overview', asyncHandler(async (_req, res) => {
  const overview = await getAdminOverview();
  return success(res, overview);
}));

router.get('/settings', asyncHandler(async (_req, res) => {
  const settings = await getSchoolSettings();
  return success(res, { settings });
}));

router.put('/settings', validateBody(z.object({
  schoolName: z.string().trim().optional(),
  district: z.string().trim().optional(),
  edgeServer: z.object({
    status: z.enum(['online', 'offline', 'maintenance']).optional(),
    activeTablets: z.number().int().min(0).optional(),
    registeredTablets: z.number().int().min(0).optional(),
    storageUsedMb: z.number().min(0).optional(),
    storageTotalMb: z.number().min(1).optional(),
  }).optional(),
  features: z.object({
    lowDataModeDefault: z.boolean().optional(),
    aiDoubtEnabled: z.boolean().optional(),
    offlineSyncEnabled: z.boolean().optional(),
    parentSmsEnabled: z.boolean().optional(),
  }).optional(),
})), asyncHandler(async (req, res) => {
  const settings = await SchoolSettings.findOneAndUpdate(
    { schoolId: 'school-rampur-01' },
    { $set: { ...req.body, updatedBy: req.user._id } },
    { returnDocument: 'after', upsert: true, runValidators: true },
  );
  await audit(req, 'update_school_settings', 'school_settings', req.body, String(settings._id));
  return success(res, { settings }, 'School settings updated');
}));

router.post('/sync/district', validateBody(z.object({
  force: z.boolean().default(false),
})), asyncHandler(async (req, res) => {
  const pending = await SyncRecord.countDocuments({ status: 'pending' });
  const processed = await SyncRecord.countDocuments({ status: 'processed' });
  const count = pending + processed;
  const settings = await SchoolSettings.findOneAndUpdate(
    { schoolId: 'school-rampur-01' },
    {
      $set: {
        'districtSync.status': 'synced',
        'districtSync.lastSyncAt': new Date(),
        'districtSync.lastRecordCount': count,
        'edgeServer.lastHeartbeatAt': new Date(),
      },
      $inc: { 'districtSync.totalRecordCount': count },
    },
    { returnDocument: 'after', upsert: true },
  );
  await SyncRecord.updateMany({ status: 'pending' }, { $set: { status: 'processed', processedAt: new Date() } });
  await audit(req, 'district_sync', 'school_settings', { records: count, force: req.body.force }, String(settings._id));
  return success(res, {
    syncedRecords: count,
    districtSync: settings.districtSync,
  }, 'District synchronization completed');
}));

const createUserSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email().optional(),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{8,16}$/).optional(),
  password: z.string().min(6).max(128).default('demo1234'),
  role: z.enum(['student', 'teacher', 'parent', 'admin']),
  grade: z.string().trim().optional(),
  classGrade: z.string().trim().optional(),
  rollNo: z.string().trim().optional(),
  language: z.enum(['hi', 'en', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'pa', 'od']).default('hi'),
  designation: z.string().trim().optional(),
  childId: z.string().optional(),
  childName: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  isDemo: z.boolean().default(false),
});

router.get('/users', validateQuery(z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  role: z.string().optional(),
  search: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const filter = {};
  if (req.validatedQuery.role) filter.role = req.validatedQuery.role;
  if (req.validatedQuery.search) {
    filter.name = { $regex: req.validatedQuery.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
  }
  const [users, total] = await Promise.all([
    User.find(filter).select('-passwordHash').sort(sort).skip(skip).limit(limit).lean(),
    User.countDocuments(filter),
  ]);
  return success(res, { users, pagination: paginationMeta(page, limit, total) });
}));

router.post('/users', validateBody(createUserSchema), asyncHandler(async (req, res) => {
  const { password, ...data } = req.body;
  if (!data.email && !data.phone) throw ApiError.badRequest('Email or phone is required');
  const user = await User.create({
    ...data,
    passwordHash: await hashPassword(password),
    avatar: data.role === 'student' ? '🎓' : data.role === 'teacher' ? '👨‍🏫' : data.role === 'parent' ? '📱' : '🏛️',
  });
  await audit(req, 'create_user', 'user', { role: user.role }, String(user._id));
  return success(res, { user: user.toObject() }, 'User created');
}));

router.put('/users/:id', validateBody(z.object({
  name: z.string().trim().optional(),
  role: z.enum(['student', 'teacher', 'parent', 'admin']).optional(),
  grade: z.string().trim().optional(),
  classGrade: z.string().trim().optional(),
  rollNo: z.string().trim().optional(),
  language: z.string().optional(),
  isActive: z.boolean().optional(),
})), asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { returnDocument: 'after', runValidators: true }).select('-passwordHash');
  if (!user) throw ApiError.notFound('User not found');
  await audit(req, 'update_user', 'user', req.body, String(user._id));
  return success(res, { user }, 'User updated');
}));

router.delete('/users/:id', asyncHandler(async (req, res) => {
  if (String(req.params.id) === String(req.user._id)) {
    throw ApiError.badRequest('You cannot deactivate your own account');
  }
  const user = await User.findByIdAndUpdate(req.params.id, { $set: { isActive: false } }, { returnDocument: 'after' }).select('-passwordHash');
  if (!user) throw ApiError.notFound('User not found');
  await audit(req, 'deactivate_user', 'user', {}, String(user._id));
  return success(res, { user }, 'User deactivated');
}));

router.get('/logs', validateQuery(z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  action: z.string().optional(),
})), asyncHandler(async (req, res) => {
  const { page, limit, skip, sort } = paginate(req.validatedQuery);
  const filter = {};
  if (req.validatedQuery.action) filter.action = req.validatedQuery.action;
  const [logs, total] = await Promise.all([
    AuditLog.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    AuditLog.countDocuments(filter),
  ]);
  return success(res, { logs, pagination: paginationMeta(page, limit, total) });
}));

export default router;
