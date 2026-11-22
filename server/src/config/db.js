import mongoose from 'mongoose';
import { env } from './env.js';

mongoose.set('strictQuery', true);

let connectionPromise = null;
let listenersRegistered = false;

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (connectionPromise) return connectionPromise;

  if (!listenersRegistered) {
    mongoose.connection.on('connected', () => {
      console.log('[GyanSetu] MongoDB connected');
    });
    mongoose.connection.on('disconnected', () => {
      console.warn('[GyanSetu] MongoDB disconnected');
    });
    mongoose.connection.on('error', (error) => {
      console.error('[GyanSetu] MongoDB error:', error.message);
    });
    listenersRegistered = true;
  }

  connectionPromise = mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 20,
  })
    .then((connection) => connection)
    .catch((error) => {
      connectionPromise = null;
      throw error;
    });

  return connectionPromise;
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  connectionPromise = null;
}

export function databaseHealth() {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  return {
    state: states[mongoose.connection.readyState] || 'unknown',
    name: mongoose.connection.name || null,
    host: mongoose.connection.host || null,
  };
}
