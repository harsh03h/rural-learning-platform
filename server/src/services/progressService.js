import mongoose from 'mongoose';
import QuizAttempt from '../models/QuizAttempt.js';
import StudentProgress from '../models/StudentProgress.js';
import SyncRecord from '../models/SyncRecord.js';
import RemedialAssignment from '../models/RemedialAssignment.js';

const LEVEL_XP = 500;
const WEAK_THRESHOLD = 60;
const STRONG_THRESHOLD = 80;

function levelFromXp(xp) {
  return Math.max(1, Math.floor(xp / LEVEL_XP) + 1);
}

function badge(code, title, description, icon) {
  return { code, title, description, icon, earnedAt: new Date() };
}

export async function getOrCreateProgress(studentId, session = null) {
  let progress = await StudentProgress.findOne({ studentId }).session(session);
  if (!progress) {
    progress = await StudentProgress.create(
      [{ studentId }],
      session ? { session } : {},
    ).then((rows) => rows[0]);
  }
  return progress;
}

/**
 * Recompute a student's progress from durable quiz attempts.
 * This is idempotent and also used after offline batches are synchronized.
 */
export async function recomputeStudentProgress(studentId, session = null) {
  const attempts = await QuizAttempt.find({ studentId }).lean().session(session);
  const progress = await getOrCreateProgress(studentId, session);
  const masteryMap = new Map();

  for (const attempt of attempts) {
    const key = attempt.topicKey || attempt.chapterId || 'general';
    const current = masteryMap.get(key) || {
      score: 0,
      total: 0,
      attempts: 0,
      mastery: 0,
      lastAttemptAt: null,
    };
    current.score += attempt.score;
    current.total += attempt.total;
    current.attempts += 1;
    current.mastery = current.total > 0
      ? Math.round((current.score / current.total) * 100)
      : 0;
    if (!current.lastAttemptAt || attempt.submittedAt > current.lastAttemptAt) {
      current.lastAttemptAt = attempt.submittedAt;
    }
    masteryMap.set(key, current);
  }

  const values = [...masteryMap.values()];
  const weakTopics = values
    .filter((item) => item.mastery < WEAK_THRESHOLD)
    .map((item, index) => [...masteryMap.keys()][values.indexOf(item)] || `Topic ${index + 1}`);
  const strongTopics = values
    .filter((item) => item.mastery >= STRONG_THRESHOLD)
    .map((item) => [...masteryMap.keys()][values.indexOf(item)]);
  const completedChapters = [...new Set(attempts.map((a) => a.chapterId).filter(Boolean))];
  const overallScore = values.length
    ? Math.round(values.reduce((sum, item) => sum + item.mastery, 0) / values.length)
    : 0;
  const totalXpEarned = attempts.reduce((sum, item) => sum + (item.earnedXP || 0), 0);

  progress.topicMastery = masteryMap;
  progress.weakTopics = weakTopics;
  progress.strongTopics = strongTopics;
  progress.completedChapters = completedChapters;
  progress.overallScore = overallScore;
  progress.xp = totalXpEarned;
  progress.level = levelFromXp(totalXpEarned);
  progress.stats.quizzesAttempted = attempts.length;
  progress.stats.quizzesPassed = attempts.filter((a) => a.percentage >= 60).length;
  progress.stats.totalQuestionsAttempted = attempts.reduce((sum, a) => sum + (a.total || 0), 0);
  progress.stats.totalCorrectAnswers = attempts.reduce((sum, a) => sum + (a.score || 0), 0);
  progress.stats.totalXpEarned = totalXpEarned;
  progress.stats.offlineQuizzesSynced = attempts.filter((a) => a.mode === 'offline').length;
  progress.lastCalculatedAt = new Date();

  const existingBadges = new Set(progress.badges.map((item) => item.code));
  const addBadge = (item) => {
    if (!existingBadges.has(item.code)) progress.badges.push(badge(item.code, item.title, item.description, item.icon));
  };

  if (attempts.length >= 1) addBadge({ code: 'FIRST_STEP', title: 'First Step', description: 'Completed your first quiz', icon: '🌱' });
  if (attempts.some((a) => a.percentage === 100)) addBadge({ code: 'PERFECT_SCORE', title: 'Perfect Score', description: 'Scored 100% in a quiz', icon: '🎯' });
  if (totalXpEarned >= 1000) addBadge({ code: 'XP_1000', title: 'Dedicated Learner', description: 'Earned 1000 XP', icon: '⚡' });
  if (attempts.some((a) => a.mode === 'offline')) addBadge({ code: 'OFFLINE_HERO', title: 'Offline Hero', description: 'Synced an offline quiz', icon: '📶' });
  if (weakTopics.length === 0 && attempts.length >= 3) addBadge({ code: 'MASTER', title: 'Topic Master', description: 'No weak topics remaining', icon: '🏆' });

  await progress.save(session ? { session } : {});
  return progress;
}

export async function markRemedialCompleted(studentId, remedialId) {
  const remedial = await RemedialAssignment.findOne({ _id: remedialId, studentId });
  if (!remedial) return null;
  remedial.status = 'completed';
  remedial.completedAt = new Date();
  await remedial.save();
  return remedial;
}

export async function getStudentSummary(studentId) {
  const [progress, attempts, diagnostics, remedials, downloads] = await Promise.all([
    getOrCreateProgress(studentId),
    QuizAttempt.find({ studentId }).sort({ submittedAt: -1 }).limit(10).lean(),
    DiagnosticResult.find({ studentId }).sort({ evaluatedAt: -1 }).limit(5).lean(),
    RemedialAssignment.find({ studentId }).sort({ assignedAt: -1 }).lean(),
    SyncRecord.find({ studentId, status: 'processed' }).countDocuments(),
  ]);

  return {
    progress,
    recentAttempts: attempts,
    diagnostics,
    remedials,
    syncedRecords: downloads,
  };
}

// Imported lazily at module bottom to avoid circular initialization issues.
import DiagnosticResult from '../models/DiagnosticResult.js';
