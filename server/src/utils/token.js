import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../config/env.js';
import { ApiError } from './apiError.js';

export function signAccessToken(user) {
  return jwt.sign(
    {
      sub: String(user._id || user.id),
      role: user.role,
      name: user.name,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtAccessTtl,
      issuer: 'gyansetu-api',
      audience: 'gyansetu-client',
      jwtid: crypto.randomUUID(),
    },
  );
}

export function signRefreshToken(user) {
  return jwt.sign(
    {
      sub: String(user._id || user.id),
      role: user.role,
      type: 'refresh',
    },
    env.jwtSecret,
    {
      expiresIn: `${env.jwtRefreshTtlDays}d`,
      issuer: 'gyansetu-api',
      audience: 'gyansetu-client',
      jwtid: crypto.randomUUID(),
    },
  );
}

export function verifyToken(token, expectedType = 'access') {
  try {
    const payload = jwt.verify(token, env.jwtSecret, {
      issuer: 'gyansetu-api',
      audience: 'gyansetu-client',
    });
    if (expectedType === 'refresh' && payload.type !== 'refresh') {
      throw ApiError.unauthorized('Refresh token required');
    }
    if (expectedType === 'access' && payload.type === 'refresh') {
      throw ApiError.unauthorized('Access token required');
    }
    return payload;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error.name === 'TokenExpiredError') {
      throw ApiError.unauthorized('Token has expired');
    }
    throw ApiError.unauthorized('Invalid authentication token');
  }
}

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
