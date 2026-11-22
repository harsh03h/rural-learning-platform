import bcrypt from 'bcryptjs';
import { ApiError } from './apiError.js';

const SALT_ROUNDS = 12;

export async function hashPassword(plain) {
  if (typeof plain !== 'string' || plain.length < 6) {
    throw ApiError.badRequest('Password must be at least 6 characters long');
  }
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function comparePassword(plain, hash) {
  if (!plain || !hash) return false;
  return bcrypt.compare(plain, hash);
}

export function validatePasswordStrength(plain) {
  if (typeof plain !== 'string' || plain.length < 6) return false;
  return true;
}
