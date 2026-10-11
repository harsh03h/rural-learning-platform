// GyanSetu Client API Service
// Connects to Node.js Backend Gateway (port 5000) which relays to Python AI Microservice (port 8000)
// With automatic offline-mode fallback for rural resilience!

const API_BASE = 'http://127.0.0.1:5000/api';

/**
 * Ask AI Doubt Saathi (relayed to Python AI Microservice via Node gateway)
 */
export async function askAiDoubt({ query, language = 'hi', grade = 'Class 7' }) {
  try {
    const res = await fetch(`${API_BASE}/ai/doubt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, language, grade })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.info('[GyanSetu API] Network unavailable or offline. Falling back to local offline AI saathi engine.');
  }
  return null;
}

/**
 * Generate MCQ Questions for Teachers
 */
export async function generateTeacherQuestions({ topic, grade, count = 3, difficulty = 'Medium' }) {
  try {
    const res = await fetch(`${API_BASE}/teacher/generate-questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, grade, count, difficulty })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.info('[GyanSetu API] Network unavailable. Using local question generator fallback.');
  }
  return null;
}

/**
 * Submit Diagnostic Assessment & Fetch AI Recommendations
 */
export async function submitDiagnostic({ topicScores = {}, weakTopics = [] }) {
  try {
    const res = await fetch(`${API_BASE}/diagnostic/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicScores, weakTopics })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.info('[GyanSetu API] Offline mode: saving diagnostic result locally.');
  }
  return null;
}

/**
 * Submit Quiz Result
 */
export async function submitQuiz({ chapterId, topicKey, score, total }) {
  try {
    const res = await fetch(`${API_BASE}/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chapterId, topicKey, score, total })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.info('[GyanSetu API] Quiz recorded offline.');
  }
  return null;
}

/**
 * Batch Sync Offline Records
 */
export async function syncOfflineBatch(pendingRecords = []) {
  try {
    const res = await fetch(`${API_BASE}/sync/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pendingRecords })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('[GyanSetu API] Sync error:', err);
  }
  return null;
}

/**
 * Teacher Overview
 */
export async function getTeacherOverview() {
  try {
    const res = await fetch(`${API_BASE}/teacher/overview`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.info('[GyanSetu API] Using cached teacher stats.');
  }
  return null;
}
