import { Router } from 'express';
import { z } from 'zod';
import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import StudentProgress from '../models/StudentProgress.js';
import { authenticate, requireAuthenticated, ROLES } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimit.js';
import { validateBody } from '../utils/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { success, created } from '../utils/response.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signAccessToken, signRefreshToken, verifyToken, hashToken } from '../utils/token.js';
import { env } from '../config/env.js';
import { audit } from '../utils/audit.js';

const router = Router();

const registerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().optional(),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{8,16}$/).optional(),
  password: z.string().min(6).max(128),
  role: z.enum(['student', 'parent']).default('student'),
  grade: z.string().trim().max(40).optional(),
  classGrade: z.string().trim().max(40).optional(),
  rollNo: z.string().trim().max(20).optional(),
  language: z.enum(['hi', 'en', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'pa', 'od']).default('hi'),
  subjects: z.array(z.string().trim()).max(12).optional(),
  school: z.string().trim().max(160).optional(),
  childId: z.string().trim().optional(),
  childName: z.string().trim().optional(),
});

const loginSchema = z.object({
  identifier: z.string().trim().max(160).optional(),
  username: z.string().trim().max(160).optional(),
  email: z.string().trim().email().optional(),
  password: z.string().min(1).max(128),
  role: z.enum(['student', 'teacher', 'parent', 'admin', 'guest']).optional(),
  rememberMe: z.boolean().optional(),
}).refine(
  (data) => Boolean(data.identifier || data.username || data.email),
  { message: 'Identifier is required', path: ['identifier'] },
);

const refreshSchema = z.object({
  refreshToken: z.string().min(10),
});

const profileSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  language: z.enum(['hi', 'en', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'pa', 'od']).optional(),
  grade: z.string().trim().max(40).optional(),
  classGrade: z.string().trim().max(40).optional(),
  rollNo: z.string().trim().max(20).optional(),
  school: z.string().trim().max(160).optional(),
  subjects: z.array(z.string().trim()).max(12).optional(),
  avatar: z.string().max(20).optional(),
  preferences: z
    .object({
      lowDataMode: z.boolean().optional(),
      offlineMode: z.boolean().optional(),
      theme: z.string().max(20).optional(),
    })
    .optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6).max(128),
});

function serializeUser(user) {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.passwordHash;
  delete obj.__v;
  return { ...obj, id: String(obj._id || obj.id) };
}

async function issueTokens(user, req) {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  const payload = verifyToken(refreshToken, 'refresh');

  await RefreshToken.create({
    userId: user._id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(payload.exp * 1000),
    userAgent: req?.get?.('user-agent') || null,
    ip: req?.ip || null,
  });

  return { accessToken, refreshToken, expiresIn: env.jwtAccessTtl };
}

async function findUserByIdentifier(identifier, role) {
  const value = String(identifier || '').trim();
  if (!value) return null;

  const query = {
    isActive: true,
    $or: [
      { email: value.toLowerCase() },
      { phone: value },
      { name: { $regex: `^${value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } },
    ],
  };
  if (role) query.role = role;

  // passwordHash is select:false in the schema; normal login must opt in.
  return User.findOne(query).select('+passwordHash');
}

router.post('/register', authLimiter, validateBody(registerSchema), asyncHandler(async (req, res) => {
  const data = req.body;
  if (!data.email && !data.phone) {
    throw ApiError.badRequest('Either email or phone is required');
  }

  const existing = await User.findOne({
    $or: [
      ...(data.email ? [{ email: data.email.toLowerCase() }] : []),
      ...(data.phone ? [{ phone: data.phone }] : []),
    ],
  });
  if (existing) throw ApiError.conflict('An account with this email or phone already exists');

  const user = await User.create({
    ...data,
    email: data.email?.toLowerCase(),
    passwordHash: await hashPassword(data.password),
    grade: data.grade || data.classGrade || 'Class 7',
    classGrade: data.classGrade || data.grade || 'Class 7',
    subjects: data.subjects || ['Mathematics', 'Science', 'English', 'Hindi'],
    avatar: data.role === 'parent' ? '📱' : '🎓',
    isDemo: false,
  });

  if (user.role === ROLES.STUDENT) {
    await StudentProgress.create({ studentId: user._id });
  }

  const tokens = await issueTokens(user, req);
  await audit(req, 'register', 'user', { role: user.role }, String(user._id));

  return created(res, {
    user: serializeUser(user),
    ...tokens,
  }, 'Account registered successfully');
}));

router.post('/login', authLimiter, validateBody(loginSchema), asyncHandler(async (req, res) => {
  const { identifier, username, email, password, role } = req.body;
  const user = await findUserByIdentifier(identifier || username || email, role);

  // No demo fallback: only a matching, active, registered account may sign in.
  if (!user) throw ApiError.unauthorized('Invalid credentials');

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) throw ApiError.unauthorized('Invalid credentials');

  user.lastLoginAt = new Date();
  await user.save();

  const tokens = await issueTokens(user, req);
  await audit(req, 'login', 'user', { mode: 'password' }, String(user._id));

  return success(res, {
    user: serializeUser(user),
    ...tokens,
  }, 'Login successful');
}));

router.post('/quick-login', authLimiter, validateBody(z.object({
  role: z.enum(['student', 'teacher', 'parent', 'admin']),
})), asyncHandler(async (req, res) => {
  const user = await User.findOne({ role: req.body.role, isActive: true, isDemo: true }).sort({ createdAt: 1 });
  if (!user) throw ApiError.notFound('No demo account configured for this role');

  user.lastLoginAt = new Date();
  await user.save();

  const tokens = await issueTokens(user, req);
  await audit(req, 'quick_login', 'user', { role: user.role }, String(user._id));

  return success(res, { user: serializeUser(user), ...tokens }, `Signed in as ${user.name}`);
}));

router.get('/demo-accounts', authLimiter, asyncHandler(async (_req, res) => {
  const users = await User.find({ isDemo: true, isActive: true })
    .select('name role grade classGrade rollNo avatar language school designation childName')
    .sort({ role: 1, createdAt: 1 })
    .lean();
  return success(res, { accounts: users.map((user) => ({ ...user, id: String(user._id) })) });
}));

router.post('/refresh', authLimiter, validateBody(refreshSchema), asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const payload = verifyToken(refreshToken, 'refresh');
  const stored = await RefreshToken.findOne({
    tokenHash: hashToken(refreshToken),
    userId: payload.sub,
    revokedAt: null,
  });
  if (!stored || stored.expiresAt < new Date()) {
    throw ApiError.unauthorized('Refresh token is invalid or expired');
  }

  const user = await User.findById(payload.sub);
  if (!user || !user.isActive) throw ApiError.unauthorized('Account is inactive');

  stored.revokedAt = new Date();
  const tokens = await issueTokens(user, req);
  stored.replacedByHash = tokens.refreshToken ? hashToken(tokens.refreshToken) : null;
  await stored.save();

  return success(res, tokens, 'Token refreshed');
}));

router.post('/logout', authenticate, asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    await RefreshToken.updateMany(
      { userId: req.user._id, tokenHash: hashToken(token), revokedAt: null },
      { $set: { revokedAt: new Date() } },
    ).catch(() => {});
  }
  await RefreshToken.updateMany(
    { userId: req.user._id, revokedAt: null },
    { $set: { revokedAt: new Date() } },
  );
  await audit(req, 'logout', 'user', {}, String(req.user._id));
  return success(res, {}, 'Logged out successfully');
}));

router.get('/me', authenticate, asyncHandler(async (req, res) => {
  let progress = null;
  if (req.user.role === ROLES.STUDENT) {
    progress = await StudentProgress.findOne({ studentId: req.user._id }).lean();
  }
  return success(res, { user: serializeUser(req.user), progress });
}));

router.put('/profile', authenticate, validateBody(profileSchema), asyncHandler(async (req, res) => {
  const user = req.user;
  const updates = { ...req.body };
  if (updates.preferences) {
    user.preferences = { ...user.preferences.toObject?.() || user.preferences, ...updates.preferences };
    delete updates.preferences;
  }
  Object.assign(user, updates);
  await user.save();
  await audit(req, 'update_profile', 'user', { fields: Object.keys(req.body) }, String(user._id));
  return success(res, { user: serializeUser(user) }, 'Profile updated');
}));

router.post('/change-password', authenticate, validateBody(passwordSchema), asyncHandler(async (req, res) => {
  const valid = await comparePassword(req.body.currentPassword, req.user.passwordHash);
  if (!valid) throw ApiError.unauthorized('Current password is incorrect');
  req.user.passwordHash = await hashPassword(req.body.newPassword);
  await req.user.save();
  await RefreshToken.updateMany(
    { userId: req.user._id, revokedAt: null },
    { $set: { revokedAt: new Date() } },
  );
  return success(res, {}, 'Password changed successfully');
}));

router.get('/permissions', authenticate, requireAuthenticated, asyncHandler(async (req, res) => {
  const permissions = {
    student: ['course:read', 'quiz:submit', 'diagnostic:submit', 'download:write', 'ai:doubt'],
    teacher: ['class:read', 'student:read', 'remedial:write', 'questions:generate'],
    parent: ['child:read', 'message:read', 'message:write'],
    admin: ['*'],
  };
  return success(res, { role: req.user.role, permissions: permissions[req.user.role] || [] });
}));

export default router;
