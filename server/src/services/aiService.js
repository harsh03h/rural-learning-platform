import { env } from '../config/env.js';

const ENDPOINTS = {
  doubt: '/ai/doubt',
  questions: '/ai/generate-questions',
  recommend: '/ai/recommend',
  performance: '/ai/student-performance-analysis',
};

async function callAi(endpoint, body) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.aiTimeoutMs);

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (env.aiServiceToken) headers['X-Service-Token'] = env.aiServiceToken;

    const response = await fetch(`${env.aiServiceUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`AI service responded with ${response.status}`);
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    const reason = error.name === 'AbortError' ? 'AI service timed out' : error.message;
    console.warn(`[GyanSetu] AI service call ${endpoint} failed: ${reason}`);
    return { ok: false, error: reason, data: null };
  } finally {
    clearTimeout(timeout);
  }
}

export async function askAi({ query, language = 'hi', grade = 'Class 7' }) {
  return callAi(ENDPOINTS.doubt, { query, language, grade });
}

export async function generateQuestions({ topic, grade, count, difficulty }) {
  return callAi(ENDPOINTS.questions, { topic, grade, count, difficulty });
}

export async function recommendRemedials({ weakTopics }) {
  return callAi(ENDPOINTS.recommend, { weakTopics });
}

export async function analyzePerformance({ students }) {
  return callAi(ENDPOINTS.performance, { students });
}

export async function aiHealth() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const response = await fetch(`${env.aiServiceUrl}/health`, { signal: controller.signal });
    return { ok: response.ok, status: response.status };
  } catch (error) {
    return { ok: false, error: error.message };
  } finally {
    clearTimeout(timeout);
  }
}
