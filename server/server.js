import express from 'express';
import path from 'path';
import { pathToFileURL } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './src/config/env.js';
import { connectDatabase, disconnectDatabase } from './src/config/db.js';
import { apiLimiter } from './src/middleware/rateLimit.js';
import { notFoundHandler, errorHandler } from './src/middleware/error.js';

import healthRoutes from './src/routes/health.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import curriculumRoutes from './src/routes/curriculum.routes.js';
import quizRoutes from './src/routes/quiz.routes.js';
import diagnosticRoutes from './src/routes/diagnostic.routes.js';
import syncRoutes from './src/routes/sync.routes.js';
import studentRoutes from './src/routes/student.routes.js';
import teacherRoutes from './src/routes/teacher.routes.js';
import parentRoutes from './src/routes/parent.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import aiRoutes from './src/routes/ai.routes.js';
import supportRoutes from './src/routes/support.routes.js';
import operationsRoutes from './src/routes/operations.routes.js';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(',').map((item) => item.trim()),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Service-Token'],
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

if (env.logRequests) {
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}

app.use('/api', apiLimiter);

// Express is imported as a Vercel serverless function, so there is no start()
// hook to open MongoDB. await the shared connection before any API route runs.
app.use('/api', async (req, _res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', curriculumRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/diagnostic', diagnosticRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/support', supportRoutes);
app.use('/api', operationsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  await connectDatabase();

  if (env.seedOnStart) {
    const { seedDatabase } = await import('./src/scripts/seed.js');
    await seedDatabase({ force: false });
  }

  const server = app.listen(env.port, env.host, () => {
    console.log('============================================================');
    console.log(` GyanSetu Backend v2.0 running at http://${env.host}:${env.port}`);
    console.log(` API base:        http://${env.host}:${env.port}/api`);
    console.log(` AI microservice: ${env.aiServiceUrl}`);
    console.log(` Environment:     ${env.nodeEnv}`);
    console.log('============================================================');
  });

  const shutdown = async (signal) => {
    console.log(`[GyanSetu] Received ${signal}, shutting down gracefully...`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

// When Vercel imports this module as a serverless function, do not call listen().
const invokedDirectly = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (invokedDirectly && !process.env.VERCEL) {
  start().catch((error) => {
    console.error('[GyanSetu] Failed to start server:', error);
    process.exit(1);
  });
}

export { app, start };
export default app;
