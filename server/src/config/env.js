import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..');

dotenv.config({ path: path.join(rootDir, '.env') });
dotenv.config({ path: path.join(rootDir, 'server', '.env') });

function number(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: number(process.env.PORT, 5000),
  host: process.env.HOST || '127.0.0.1',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gyansetu',
  jwtSecret: process.env.JWT_SECRET || 'gyansetu-development-secret-change-me',
  jwtAccessTtl: process.env.JWT_ACCESS_TTL || '2h',
  jwtRefreshTtlDays: number(process.env.JWT_REFRESH_TTL_DAYS, 7),
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000',
  aiServiceToken: process.env.AI_SERVICE_TOKEN || '',
  aiTimeoutMs: number(process.env.AI_TIMEOUT_MS, 8000),
  corsOrigin: process.env.CORS_ORIGIN || 'http://127.0.0.1:5173',
  rateLimitWindowMs: number(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitMax: number(process.env.RATE_LIMIT_MAX, 300),
  aiRateLimitMax: number(process.env.AI_RATE_LIMIT_MAX, 30),
  defaultDemoPassword: process.env.DEFAULT_DEMO_PASSWORD || 'demo1234',
  seedOnStart: process.env.SEED_ON_START === 'true',
  logRequests: process.env.LOG_REQUESTS !== 'false',
};

export const isProduction = env.nodeEnv === 'production';

if (isProduction && env.jwtSecret.includes('change-me')) {
  console.warn('[GyanSetu] WARNING: JWT_SECRET is still the default development secret.');
}
