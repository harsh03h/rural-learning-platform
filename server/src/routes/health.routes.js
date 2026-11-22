import { Router } from 'express';
import User from '../models/User.js';
import { databaseHealth } from '../config/db.js';
import { env } from '../config/env.js';
import { aiHealth } from '../services/aiService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { success } from '../utils/response.js';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  let totalRegisteredStudents = 0;
  try {
    totalRegisteredStudents = await User.countDocuments({ role: 'student' });
  } catch {
    // Health endpoint should remain responsive even if DB is temporarily down.
  }
  return res.json({
    status: 'healthy',
    gateway: 'GyanSetu Node.js Express Gateway',
    version: '2.0.0',
    port: env.port,
    totalRegisteredStudents,
    database: databaseHealth(),
    timestamp: new Date().toISOString(),
  });
}));

router.get('/ready', asyncHandler(async (_req, res) => {
  const db = databaseHealth();
  const ai = await aiHealth();
  const ready = db.state === 'connected';
  return res.status(ready ? 200 : 503).json({
    success: ready,
    database: db,
    aiService: ai,
    timestamp: new Date().toISOString(),
  });
}));

export default router;
