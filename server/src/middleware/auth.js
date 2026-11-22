import User from '../models/User.js';
import { verifyToken } from '../utils/token.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  PARENT: 'parent',
  ADMIN: 'admin',
  GUEST: 'guest',
};

function extractBearer(req) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header || typeof header !== 'string') return null;
  const [scheme, token] = header.trim().split(/\s+/);
  if (!token || scheme.toLowerCase() !== 'bearer') return null;
  return token;
}

export const authenticate = asyncHandler(async (req, _res, next) => {
  const token = extractBearer(req);
  if (!token) throw ApiError.unauthorized('Bearer token is required');

  const payload = verifyToken(token, 'access');
  const user = await User.findById(payload.sub).select('+passwordHash');
  if (!user || !user.isActive) throw ApiError.unauthorized('Account is inactive or no longer exists');

  req.user = user;
  req.auth = payload;
  next();
});

export const optionalAuthenticate = asyncHandler(async (req, _res, next) => {
  const token = extractBearer(req);
  if (token) {
    try {
      const payload = verifyToken(token, 'access');
      const user = await User.findById(payload.sub);
      if (user && user.isActive) {
        req.user = user;
        req.auth = payload;
      }
    } catch {
      // Optional auth: invalid token is treated as anonymous.
    }
  }
  next();
});

export const authorize = (...allowedRoles) => (req, _res, next) => {
  if (!req.user) return next(ApiError.unauthorized('Authentication required'));
  if (!allowedRoles.includes(req.user.role)) {
    return next(ApiError.forbidden(`Access restricted to: ${allowedRoles.join(', ')}`));
  }
  return next();
};

export const requireStudent = authorize(ROLES.STUDENT);
export const requireTeacher = authorize(ROLES.TEACHER);
export const requireParent = authorize(ROLES.PARENT);
export const requireAdmin = authorize(ROLES.ADMIN);
export const requireStaff = authorize(ROLES.TEACHER, ROLES.ADMIN);
export const requireAuthenticated = authorize(ROLES.STUDENT, ROLES.TEACHER, ROLES.PARENT, ROLES.ADMIN);

/**
 * Resolves which student's data a request may access.
 * Students may only access their own records. Teachers/admins may access any
 * student in their school. Parents may only access their linked child.
 */
export function resolveStudentId(req, requestedId) {
  const user = req.user;
  if (!user) throw ApiError.unauthorized('Authentication required');

  if (user.role === ROLES.STUDENT) {
    const ownId = String(user._id);
    if (requestedId && String(requestedId) !== ownId) {
      throw ApiError.forbidden('Students can only access their own records');
    }
    return ownId;
  }

  if (user.role === ROLES.PARENT) {
    if (!user.childId) throw ApiError.forbidden('No child is linked to this parent account');
    const childId = String(user.childId);
    if (requestedId && String(requestedId) !== childId) {
      throw ApiError.forbidden('Parents can only access their linked child');
    }
    return childId;
  }

  if ([ROLES.TEACHER, ROLES.ADMIN].includes(user.role)) {
    if (!requestedId) throw ApiError.badRequest('studentId is required for staff access');
    return String(requestedId);
  }

  throw ApiError.forbidden('Unsupported role');
}
