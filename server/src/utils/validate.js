import { ZodError } from 'zod';
import { ApiError } from './apiError.js';

export function parseSchema(schema, data) {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const details = error.issues.map((issue) => ({
        field: issue.path.join('.') || 'body',
        message: issue.message,
        code: issue.code,
      }));
      throw ApiError.badRequest('Validation failed', details);
    }
    throw error;
  }
}

export function validateBody(schema) {
  return (req, _res, next) => {
    try {
      req.body = parseSchema(schema, req.body || {});
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function validateQuery(schema) {
  return (req, _res, next) => {
    try {
      req.validatedQuery = parseSchema(schema, req.query || {});
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function validateParams(schema) {
  return (req, _res, next) => {
    try {
      req.validatedParams = parseSchema(schema, req.params || {});
      next();
    } catch (error) {
      next(error);
    }
  };
}
