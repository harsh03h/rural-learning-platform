import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

function normalizeMongooseError(error) {
  if (error instanceof mongoose.Error.ValidationError) {
    const details = Object.values(error.errors).map((item) => ({
      field: item.path,
      message: item.message,
    }));
    return ApiError.badRequest('Validation failed', details);
  }
  if (error instanceof mongoose.Error.CastError) {
    return ApiError.badRequest(`Invalid value for ${error.path}`);
  }
  if (error?.code === 11000) {
    const fields = Object.keys(error.keyPattern || {}).join(', ') || 'field';
    return ApiError.conflict(`Duplicate value for ${fields}`);
  }
  return null;
}

export function notFoundHandler(req, _res, next) {
  const error = ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(error, req, res, _next) {
  const normalized = error instanceof ApiError ? error : normalizeMongooseError(error);
  const statusCode = normalized?.statusCode || 500;
  const message = normalized?.message || 'Internal server error';

  if (statusCode >= 500) {
    console.error(`[GyanSetu] ${req.method} ${req.originalUrl} ->`, error);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: normalized?.code || 'INTERNAL_ERROR',
      message,
      ...(normalized?.details ? { details: normalized.details } : {}),
      ...(env.nodeEnv === 'development' && !normalized ? { stack: error.stack } : {}),
    },
  });
}
