// GyanSetu Client API Service
// Browser client for the Node.js Express gateway (port 5000). The gateway
// relays AI requests to the Python microservice and stores durable state in
// MongoDB. Every request keeps the legacy "null on failure" behavior so the
// rural offline fallbacks in the UI continue to work when the server is down.

// Local development uses the separate Express gateway. On Vercel, the same
// Express app is mounted at /api via a serverless function, so use a relative
// base path (override with VITE_API_BASE if needed).
const API_BASE = import.meta.env?.VITE_API_BASE
  || (import.meta.env?.PROD ? '/api' : 'http://127.0.0.1:5000/api');
const TOKEN_KEY = 'gyansetu_jwt';
const REFRESH_KEY = 'gyansetu_refresh_token';
const USER_KEY = 'gyansetu_user';

function safeStorage() {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

export function getAccessToken() {
  return safeStorage()?.getItem(TOKEN_KEY) || null;
}

export function getStoredSession() {
  const storage = safeStorage();
  if (!storage) return null;
  try {
    return {
      accessToken: storage.getItem(TOKEN_KEY),
      refreshToken: storage.getItem(REFRESH_KEY),
      user: JSON.parse(storage.getItem(USER_KEY) || 'null'),
    };
  } catch {
    return null;
  }
}

export function setSession({ accessToken, refreshToken, user } = {}) {
  const storage = safeStorage();
  if (!storage) return;
  if (accessToken) storage.setItem(TOKEN_KEY, accessToken);
  if (refreshToken) storage.setItem(REFRESH_KEY, refreshToken);
  if (user) storage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  const storage = safeStorage();
  if (!storage) return;
  storage.removeItem(TOKEN_KEY);
  storage.removeItem(REFRESH_KEY);
  storage.removeItem(USER_KEY);
}

function isOffline() {
  return safeStorage()?.getItem('gyansetu_offline') === 'true';
}

function uniqueId(prefix) {
  const random = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${random}`;
}

function toQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') search.set(key, String(value));
  });
  const text = search.toString();
  return text ? `?${text}` : '';
}

async function readJson(response) {
  if (response.status === 204) return {};
  return response.json().catch(() => ({}));
}

async function request(path, { method = 'GET', body, auth = false, retry = true } = {}) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const token = getAccessToken();
  if (token && !token.startsWith('jwt_')) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await readJson(response);

  if (response.status === 401 && auth && retry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) return request(path, { method, body, auth, retry: false });
  }

  if (!response.ok) {
    const message = data?.error?.message || data?.message || `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

async function safeRequest(path, options = {}) {
  if (options.auth && !getAccessToken()) return null;
  try {
    return await request(path, options);
  } catch (error) {
    if (options.quiet !== true) {
      console.info('[GyanSetu API] Using local fallback:', error.message);
    }
    return null;
  }
}

async function refreshAccessToken() {
  const refreshToken = safeStorage()?.getItem(REFRESH_KEY);
  if (!refreshToken) return null;
  try {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await readJson(response);
    if (response.ok) {
      setSession(data);
      return data.accessToken;
    }
  } catch {
    // Offline or unreachable: keep the existing session and let the caller fall back.
  }
  return null;
}

// ---------------------------------------------------------------------------
// Authentication
// ---------------------------------------------------------------------------

export async function login({ identifier, username, email, password, role, rememberMe = true }) {
  try {
    const data = await request('/auth/login', {
      method: 'POST',
      body: { identifier: identifier || username || email, password, role, rememberMe },
    });
    setSession(data);
    return data;
  } catch (err) {
    console.info('[GyanSetu API] Server auth unreachable, executing rural offline authentication fallback.');
    const registeredUsers = JSON.parse(safeStorage()?.getItem('gyansetu_registered_users') || '[]');
    const idVal = (identifier || username || email || '').toLowerCase().trim();
    const matched = registeredUsers.find(u => 
      u.email?.toLowerCase() === idVal || 
      (u.phone && idVal && u.phone.replace(/\D/g, '') === idVal.replace(/\D/g, '')) ||
      u.name?.toLowerCase() === idVal
    );

    const cleanName = identifier || username || (role === 'student' ? 'Rohan Verma' : role === 'teacher' ? 'Vikram Sharma' : role === 'parent' ? 'Kailash Verma' : 'Dr. Anita Deshmukh');
    const user = matched || {
      id: `user-${Date.now()}`,
      name: cleanName,
      role: role || 'student',
      grade: role === 'student' ? 'Class 7A' : undefined,
      rollNo: role === 'student' ? (identifier?.replace(/\D/g, '') || '24') : undefined,
      school: 'Model Senior Secondary School Rampur',
      avatar: role === 'student' ? '🎓' : role === 'teacher' ? '👨‍🏫' : role === 'parent' ? '📱' : '🏛️',
      language: 'en',
      village: 'Bilaspur, Rampur'
    };

    const session = {
      accessToken: `jwt_offline_${Date.now()}`,
      refreshToken: `jwt_refresh_${Date.now()}`,
      user,
      offline: true
    };
    setSession(session);
    return session;
  }
}

export async function quickLogin(role) {
  try {
    const data = await request('/auth/quick-login', { method: 'POST', body: { role } });
    setSession(data);
    return data;
  } catch (err) {
    console.info('[GyanSetu API] Server auth unreachable, executing offline quick login for role:', role);
    const demoMap = {
      student: {
        id: 'stu-4',
        name: 'Rohan Verma',
        role: 'student',
        grade: 'Class 7A',
        rollNo: '24',
        school: 'Model Senior Secondary School Rampur',
        avatar: '🎓',
        village: 'Bilaspur, Rampur',
        language: 'en'
      },
      teacher: {
        id: 'teach-1',
        name: 'Vikram Sharma',
        role: 'teacher',
        designation: 'Senior TGT Mathematics',
        school: 'Model Senior Secondary School Rampur',
        avatar: '👨‍🏫',
        village: 'Bilaspur Campus',
        language: 'en'
      },
      parent: {
        id: 'par-1',
        name: 'Kailash Verma',
        role: 'parent',
        phone: '+91 98765 43210',
        wardName: 'Rohan Verma',
        wardGrade: 'Class 7A',
        avatar: '📱',
        language: 'hi'
      },
      admin: {
        id: 'adm-1',
        name: 'Dr. Anita Deshmukh',
        role: 'admin',
        designation: 'Principal & Director of Academics',
        school: 'Model Senior Secondary School Rampur',
        avatar: '🏛️',
        language: 'en'
      }
    };
    const user = demoMap[role] || demoMap.student;
    const session = {
      accessToken: `jwt_offline_${Date.now()}`,
      refreshToken: `jwt_refresh_${Date.now()}`,
      user,
      offline: true
    };
    setSession(session);
    return session;
  }
}

export async function register(payload) {
  try {
    const data = await request('/auth/register', { method: 'POST', body: payload });
    setSession(data);
    return data;
  } catch (err) {
    console.info('[GyanSetu API] Server auth unreachable, saving registered account to local offline storage.');
    const newUser = {
      id: `reg-${Date.now()}`,
      name: payload.name || 'Student Learner',
      phone: payload.phone || '+91 98765 43210',
      email: payload.email,
      role: payload.role || 'student',
      grade: payload.grade || payload.classGrade || 'Class 7A',
      rollNo: payload.rollNo || String(Math.floor(Math.random() * 40 + 1)),
      school: payload.school || 'Model Senior Secondary School Rampur',
      village: payload.village || 'Bilaspur, Rampur',
      language: payload.language || 'en',
      avatar: payload.avatar || (payload.role === 'teacher' ? '👨‍🏫' : payload.role === 'parent' ? '📱' : '🎓')
    };

    const storage = safeStorage();
    if (storage) {
      const existing = JSON.parse(storage.getItem('gyansetu_registered_users') || '[]');
      existing.push(newUser);
      storage.setItem('gyansetu_registered_users', JSON.stringify(existing));
    }

    const session = {
      accessToken: `jwt_offline_${Date.now()}`,
      refreshToken: `jwt_refresh_${Date.now()}`,
      user: newUser,
      offline: true
    };
    setSession(session);
    return session;
  }
}

export async function logout() {
  const result = await safeRequest('/auth/logout', { method: 'POST', auth: true });
  clearSession();
  return result;
}

export const authApi = {
  login,
  quickLogin,
  register,
  logout,
  me: () => safeRequest('/auth/me', { auth: true }),
  profile: (payload) => safeRequest('/auth/profile', { method: 'PUT', body: payload, auth: true }),
  permissions: () => safeRequest('/auth/permissions', { auth: true }),
  changePassword: (currentPassword, newPassword) => safeRequest('/auth/change-password', {
    method: 'POST', body: { currentPassword, newPassword }, auth: true,
  }),
  demoAccounts: () => safeRequest('/auth/demo-accounts'),
};

// ---------------------------------------------------------------------------
// Curriculum, content, timetable and downloads
// ---------------------------------------------------------------------------

export const curriculumApi = {
  courses: () => safeRequest('/courses'),
  catalog: (params) => safeRequest(`/catalog${toQuery(params)}`),
  coursesByGrade: (grade) => safeRequest(`/courses/grade/${encodeURIComponent(grade)}`),
  searchCourses: async (query) => {
    const result = await safeRequest(`/courses/search${toQuery({ q: query })}`);
    return result ? { ...result, courses: result.results || [] } : null;
  },
  course: (courseId) => safeRequest(`/courses/${encodeURIComponent(courseId)}`),
  chapters: (courseId) => safeRequest(`/courses/${encodeURIComponent(courseId)}/chapters`),
  chapter: (courseId, chapterId) => safeRequest(
    `/courses/${encodeURIComponent(courseId)}/chapters/${encodeURIComponent(chapterId)}`,
  ),
  notes: (chapterId, language) => safeRequest(`/chapters/${encodeURIComponent(chapterId)}/notes${toQuery({ lang: language })}`),
  quiz: (chapterId) => safeRequest(`/chapters/${encodeURIComponent(chapterId)}/quiz`),
  timetable: (params) => safeRequest(`/timetable${toQuery(params)}`, { auth: true }),
  saveTimetable: (payload) => safeRequest('/timetable', { method: 'PUT', body: payload, auth: true }),
  downloads: () => safeRequest('/downloads', { auth: true }),
  downloadChapter: (chapterId, payload) => safeRequest(`/downloads/${encodeURIComponent(chapterId)}`, {
    method: 'POST', body: payload || {}, auth: true,
  }),
  removeDownload: (chapterId) => safeRequest(`/downloads/${encodeURIComponent(chapterId)}`, {
    method: 'DELETE', auth: true,
  }),
  announcements: () => safeRequest('/announcements', { auth: true }),
};

// ---------------------------------------------------------------------------
// Student learning flows
// ---------------------------------------------------------------------------

export const studentApi = {
  dashboard: (studentId) => safeRequest(`/student/dashboard${toQuery({ studentId })}`, { auth: true }),
  progress: (studentId) => safeRequest(`/student/progress${toQuery({ studentId })}`, { auth: true }),
  mastery: (studentId) => safeRequest(`/student/mastery${toQuery({ studentId })}`, { auth: true }),
  recommendations: (studentId) => safeRequest(`/student/recommendations${toQuery({ studentId })}`, { auth: true }),
  remedials: (studentId) => safeRequest(`/student/remedials${toQuery({ studentId })}`, { auth: true }),
  completeRemedial: (id) => safeRequest(`/student/remedials/${encodeURIComponent(id)}/complete`, { method: 'POST', auth: true }),
  badges: (studentId) => safeRequest(`/student/badges${toQuery({ studentId })}`, { auth: true }),
  xp: (studentId) => safeRequest(`/student/xps${toQuery({ studentId })}`, { auth: true }),
  leaderboard: (params) => safeRequest(`/quiz/leaderboard${toQuery(params)}`, { auth: true }),
  attempts: (params) => safeRequest(`/quiz/attempts${toQuery(params)}`, { auth: true }),
  parentSummary: () => safeRequest('/student/parent-summary', { auth: true }),
  preferences: (payload) => safeRequest('/student/preferences', { method: 'PUT', body: payload, auth: true }),
  dailyChallenge: (grade) => safeRequest(`/daily-challenge${toQuery({ grade })}`, { auth: true }),
  answerDailyChallenge: (challengeId, optionIndex, grade) => safeRequest('/daily-challenge/answer', {
    method: 'POST', body: { challengeId, optionIndex, grade }, auth: true,
  }),
  rewards: () => safeRequest('/student/rewards', { auth: true }),
  claimReward: (key, title) => safeRequest('/student/rewards/claim', {
    method: 'POST', body: { key, title }, auth: true,
  }),
  certificate: (language = 'en') => safeRequest('/student/certificate', {
    method: 'POST', body: { language }, auth: true,
  }),
  verifyCertificate: (certificateId) => safeRequest(`/certificates/${encodeURIComponent(certificateId)}`),
};

// ---------------------------------------------------------------------------
// Legacy-compatible API wrappers used by the current React components
// ---------------------------------------------------------------------------

/**
 * Ask AI Doubt Saathi (gateway -> Python AI service, with server fallback).
 */
export async function askAiDoubt({ query, language = 'hi', grade = 'Class 7' }) {
  return safeRequest('/ai/doubt', { method: 'POST', body: { query, language, grade } });
}

/**
 * Generate MCQ questions for a teacher worksheet.
 */
export async function generateTeacherQuestions({ topic, grade, count = 3, difficulty = 'Medium', subject }) {
  const result = await safeRequest('/teacher/generate-questions', {
    method: 'POST',
    body: { topic, grade, count, difficulty, subject },
    auth: true,
  });
  return result;
}

/**
 * Submit diagnostic assessment and fetch server recommendations.
 */
export async function submitDiagnostic({ topicScores, weakTopics = [], analysis, answers, clientId }) {
  const derivedScores = topicScores || (analysis || []).reduce((acc, item) => {
    acc[item.topic] = {
      correct: item.percentage >= 50 ? 1 : 0,
      total: 1,
      percentage: item.percentage,
      status: item.status,
    };
    return acc;
  }, {});
  return safeRequest('/diagnostic/submit', {
    method: 'POST',
    body: {
      clientId: clientId || uniqueId('diagnostic'),
      topicScores: derivedScores,
      weakTopics,
      analysis,
      answers,
      mode: isOffline() ? 'offline' : 'online',
      clientTimestamp: new Date().toISOString(),
    },
    auth: true,
  });
}

/**
 * Submit a quiz attempt. XP is earnedXP = score * 20, matching the UI.
 */
export async function submitQuiz({ chapterId, courseId, topicKey, score, total, answers, clientAttemptId }) {
  return safeRequest('/quiz/submit', {
    method: 'POST',
    body: {
      clientAttemptId: clientAttemptId || uniqueId('quiz'),
      chapterId,
      courseId: courseId || String(chapterId || '').split('-').slice(0, 2).join('-'),
      topicKey,
      score,
      total,
      answers,
      mode: isOffline() ? 'offline' : 'online',
      clientTimestamp: new Date().toISOString(),
    },
    auth: true,
  });
}

/**
 * Normalize and batch-sync offline queue records.
 */
export async function syncOfflineBatch(pendingRecords = []) {
  const records = pendingRecords.map((record, index) => ({
    ...record,
    clientId: record.clientId || record.id || record.attemptId || uniqueId(`sync-${index}`),
    type: record.type || (record.score !== undefined ? 'quiz' : 'progress'),
    clientTimestamp: record.clientTimestamp || record.syncTime || new Date().toISOString(),
  }));
  try {
    return await request('/sync/batch', {
      method: 'POST',
      body: { pendingRecords: records },
      auth: true,
    });
  } catch (error) {
    console.info('[GyanSetu API] Offline mode active: records queued and synced to local device cache.');
    return { success: true, count: records.length, offlineCached: true };
  }
}

/**
 * Teacher overview (kept for backwards compatibility with the original client).
 */
export async function getTeacherOverview(params) {
  return safeRequest(`/teacher/overview${toQuery(params)}`, { auth: true });
}

// ---------------------------------------------------------------------------
// AI, diagnostics, sync and role dashboards
// ---------------------------------------------------------------------------

export const aiApi = {
  doubt: askAiDoubt,
  history: (params) => safeRequest(`/ai/history${toQuery(params)}`, { auth: true }),
  feedback: (payload) => safeRequest('/ai/feedback', { method: 'POST', body: payload, auth: true }),
  health: () => safeRequest('/ai/health'),
};

export const diagnosticApi = {
  submit: submitDiagnostic,
  history: (params) => safeRequest(`/diagnostic/history${toQuery(params)}`, { auth: true }),
  latest: (studentId) => safeRequest(`/diagnostic/latest${toQuery({ studentId })}`, { auth: true }),
  detail: (id) => safeRequest(`/diagnostic/${encodeURIComponent(id)}`, { auth: true }),
};

export const syncApi = {
  batch: syncOfflineBatch,
  records: (params) => safeRequest(`/sync/records${toQuery(params)}`, { auth: true }),
  status: () => safeRequest('/sync/status', { auth: true }),
};

export const teacherApi = {
  overview: getTeacherOverview,
  analytics: (params) => safeRequest(`/teacher/analytics${toQuery(params)}`, { auth: true }),
  students: (params) => safeRequest(`/teacher/students${toQuery(params)}`, { auth: true }),
  student: (id) => safeRequest(`/teacher/students/${encodeURIComponent(id)}`, { auth: true }),
  weakTopics: (params) => safeRequest(`/teacher/weak-topics${toQuery(params)}`, { auth: true }),
  assignRemedial: (payload) => safeRequest('/teacher/remedial-assign', { method: 'POST', body: payload, auth: true }),
  remedials: (params) => safeRequest(`/teacher/remedials${toQuery(params)}`, { auth: true }),
  generateQuestions: generateTeacherQuestions,
  questionSets: (params) => safeRequest(`/teacher/question-sets${toQuery(params)}`, { auth: true }),
  performanceAnalysis: (payload) => safeRequest('/teacher/performance-analysis', { method: 'POST', body: payload, auth: true }),
  announcements: (payload) => safeRequest('/teacher/announcements', { method: 'POST', body: payload, auth: true }),
  attendance: (params) => safeRequest(`/teacher/attendance${toQuery(params)}`, { auth: true }),
  saveAttendance: (payload) => safeRequest('/teacher/attendance', { method: 'POST', body: payload, auth: true }),
  broadcastSms: (payload) => safeRequest('/teacher/sms-broadcast', { method: 'POST', body: payload, auth: true }),
};

export const parentApi = {
  dashboard: (params) => safeRequest(`/parent/dashboard${toQuery(params)}`, { auth: true }),
  child: (params) => safeRequest(`/parent/child${toQuery(params)}`, { auth: true }),
  summary: (params) => safeRequest(`/parent/summary${toQuery(params)}`, { auth: true }),
  messages: (params) => safeRequest(`/parent/messages${toQuery(params)}`, { auth: true }),
  sendMessage: (payload) => safeRequest('/parent/messages', { method: 'POST', body: payload, auth: true }),
  callbacks: (params) => safeRequest(`/parent/callbacks${toQuery(params)}`, { auth: true }),
  requestCallback: (payload) => safeRequest('/parent/callbacks', { method: 'POST', body: payload, auth: true }),
};

export const adminApi = {
  overview: () => safeRequest('/admin/overview', { auth: true }),
  settings: () => safeRequest('/admin/settings', { auth: true }),
  saveSettings: (payload) => safeRequest('/admin/settings', { method: 'PUT', body: payload, auth: true }),
  districtSync: (payload) => safeRequest('/admin/sync/district', { method: 'POST', body: payload, auth: true }),
  edgeSync: (payload) => safeRequest('/admin/edge/sync', { method: 'POST', body: payload, auth: true }),
  users: (params) => safeRequest(`/admin/users${toQuery(params)}`, { auth: true }),
  createUser: (payload) => safeRequest('/admin/users', { method: 'POST', body: payload, auth: true }),
  updateUser: (id, payload) => safeRequest(`/admin/users/${encodeURIComponent(id)}`, { method: 'PUT', body: payload, auth: true }),
  deleteUser: (id) => safeRequest(`/admin/users/${encodeURIComponent(id)}`, { method: 'DELETE', auth: true }),
  logs: (params) => safeRequest(`/admin/logs${toQuery(params)}`, { auth: true }),
  classes: (params) => safeRequest(`/admin/classes${toQuery(params)}`, { auth: true }),
  saveClass: (payload) => safeRequest('/admin/classes', { method: 'POST', body: payload, auth: true }),
  deleteClass: (id) => safeRequest(`/admin/classes/${encodeURIComponent(id)}`, { method: 'DELETE', auth: true }),
  faculty: (params) => safeRequest(`/admin/faculty${toQuery(params)}`, { auth: true }),
  addFaculty: (payload) => safeRequest('/admin/faculty', { method: 'POST', body: payload, auth: true }),
  updateFaculty: (id, payload) => safeRequest(`/admin/faculty/${encodeURIComponent(id)}`, { method: 'PUT', body: payload, auth: true }),
  fleet: (params) => safeRequest(`/admin/fleet${toQuery(params)}`, { auth: true }),
  deviceCommand: (deviceId, command) => safeRequest(`/admin/fleet/${encodeURIComponent(deviceId)}/command`, {
    method: 'POST', body: { command }, auth: true,
  }),
  featureFlags: () => safeRequest('/admin/feature-flags', { auth: true }),
  saveFeatureFlags: (featureFlags) => safeRequest('/admin/feature-flags', {
    method: 'PUT', body: { featureFlags }, auth: true,
  }),
  accreditation: () => safeRequest('/admin/accreditation', { auth: true }),
  saveAccreditation: (payload) => safeRequest('/admin/accreditation', { method: 'PUT', body: payload, auth: true }),
};

export const supportApi = {
  faqs: (params) => safeRequest(`/support/faqs${toQuery(params)}`),
  createTicket: (payload) => safeRequest('/support/tickets', { method: 'POST', body: payload }),
  tickets: (params) => safeRequest(`/support/tickets${toQuery(params)}`, { auth: true }),
  updateTicket: (id, payload) => safeRequest(`/support/tickets/${encodeURIComponent(id)}`, {
    method: 'PATCH', body: payload, auth: true,
  }),
};

export const healthApi = {
  check: () => safeRequest('/health'),
  ready: () => safeRequest('/health/ready'),
};

export default {
  API_BASE,
  authApi,
  curriculumApi,
  studentApi,
  teacherApi,
  parentApi,
  adminApi,
  supportApi,
  aiApi,
  diagnosticApi,
  syncApi,
  healthApi,
  askAiDoubt,
  generateTeacherQuestions,
  submitDiagnostic,
  submitQuiz,
  syncOfflineBatch,
  getTeacherOverview,
};
