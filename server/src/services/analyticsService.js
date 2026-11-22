import mongoose from 'mongoose';
import User from '../models/User.js';
import StudentProgress from '../models/StudentProgress.js';
import QuizAttempt from '../models/QuizAttempt.js';
import DiagnosticResult from '../models/DiagnosticResult.js';
import RemedialAssignment from '../models/RemedialAssignment.js';
import DoubtMessage from '../models/DoubtMessage.js';
import SyncRecord from '../models/SyncRecord.js';
import SchoolSettings from '../models/SchoolSettings.js';
import ParentMessage from '../models/ParentMessage.js';

function round(value, digits = 0) {
  const factor = 10 ** digits;
  return Math.round((Number(value) || 0) * factor) / factor;
}

async function getSchoolSettings() {
  let settings = await SchoolSettings.findOne({ schoolId: 'school-rampur-01' }).lean();
  if (!settings) {
    settings = await SchoolSettings.create({ schoolId: 'school-rampur-01' });
    settings = settings.toObject();
  }
  return settings;
}

export async function getTeacherOverview({ classGrade = null, schoolId = null } = {}) {
  const studentFilter = { role: 'student', isActive: true };
  if (classGrade) studentFilter.classGrade = classGrade;
  if (schoolId) studentFilter.schoolId = schoolId;

  const students = await User.find(studentFilter).select('name rollNo classGrade avatar language').lean();
  const studentIds = students.map((student) => student._id);
  const [progressDocs, remedials, recentAttempts, lastWeekAttempts] = await Promise.all([
    StudentProgress.find({ studentId: { $in: studentIds } }).lean(),
    RemedialAssignment.find({ studentId: { $in: studentIds }, status: { $ne: 'completed' } }).lean(),
    QuizAttempt.find({ studentId: { $in: studentIds } }).sort({ submittedAt: -1 }).limit(8).lean(),
    QuizAttempt.find({
      studentId: { $in: studentIds },
      submittedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    }).lean(),
  ]);

  const progressByStudent = new Map(progressDocs.map((item) => [String(item.studentId), item]));
  const weakTopicCounts = new Map();
  for (const item of progressDocs) {
    for (const topic of item.weakTopics || []) {
      weakTopicCounts.set(topic, (weakTopicCounts.get(topic) || 0) + 1);
    }
  }

  const attention = students
    .map((student) => {
      const progress = progressByStudent.get(String(student._id));
      const score = progress?.overallScore ?? 0;
      const weakTopic = progress?.weakTopics?.[0] || 'General revision';
      const assigned = remedials.filter((item) => String(item.studentId) === String(student._id));
      return {
        id: String(student._id),
        name: student.name,
        firstName: student.name.split(' ')[0],
        rollNo: student.rollNo,
        score,
        weakTopic,
        status: score < 55 ? 'Needs Remedial Attention' : score < 75 ? 'Average Progress' : 'On Track',
        assignedRemedials: assigned.length,
      };
    })
    .filter((student) => student.score < 60)
    .sort((a, b) => a.score - b.score);

  const averageClassScore = students.length
    ? round(progressDocs.reduce((sum, item) => sum + (item.overallScore || 0), 0) / students.length)
    : 0;

  const trend = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000);
    const key = day.toISOString().slice(0, 10);
    const dayAttempts = lastWeekAttempts.filter((a) => a.submittedAt.toISOString().slice(0, 10) === key);
    return {
      date: key,
      attempts: dayAttempts.length,
      averageScore: dayAttempts.length
        ? round(dayAttempts.reduce((sum, a) => sum + a.percentage, 0) / dayAttempts.length)
        : 0,
    };
  });

  return {
    success: true,
    totalStudents: students.length,
    averageClassScore,
    activeLearners: progressDocs.filter((p) => p.stats?.quizzesAttempted > 0).length,
    quizzesAttempted: lastWeekAttempts.length,
    weakTopics: [...weakTopicCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([topic, count]) => ({ topic, affectedStudents: count })),
    studentsNeedingAttention: attention,
    students: students.map((student) => {
      const progress = progressByStudent.get(String(student._id));
      return {
        id: String(student._id),
        name: student.name,
        rollNo: student.rollNo,
        classGrade: student.classGrade,
        score: progress?.overallScore || 0,
        xp: progress?.xp || 0,
        weakTopics: progress?.weakTopics || [],
        status: progress?.overallScore < 55 ? 'Needs Remedial Attention' : 'On Track',
      };
    }),
    recentActivity: recentAttempts.map((attempt) => ({
      studentId: String(attempt.studentId),
      chapterId: attempt.chapterId,
      topicKey: attempt.topicKey,
      score: attempt.score,
      total: attempt.total,
      submittedAt: attempt.submittedAt,
    })),
    weeklyTrend: trend,
  };
}

export async function getAdminOverview() {
  const settings = await getSchoolSettings();
  const [roleCounts, totalQuizzes, totalDiagnostics, totalDoubts, pendingSync, recentSync] = await Promise.all([
    User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
    QuizAttempt.countDocuments(),
    DiagnosticResult.countDocuments(),
    DoubtMessage.countDocuments(),
    SyncRecord.countDocuments({ status: 'pending' }),
    SyncRecord.find().sort({ receivedAt: -1 }).limit(10).lean(),
  ]);

  const counts = Object.fromEntries(roleCounts.map((item) => [item._id, item.count]));

  return {
    success: true,
    school: {
      id: settings.schoolId,
      name: settings.schoolName,
      district: settings.district,
    },
    users: counts,
    totalStudents: counts.student || 0,
    edgeServer: settings.edgeServer,
    districtSync: settings.districtSync,
    content: {
      totalQuizzes,
      totalDiagnostics,
      totalAiDoubts: totalDoubts,
      pendingSyncRecords: pendingSync,
    },
    recentSync: recentSync.map((item) => ({
      clientId: item.clientId,
      type: item.type,
      status: item.status,
      receivedAt: item.receivedAt,
    })),
  };
}

export async function getParentDashboard(parentId, childId) {
  const [child, progress, recentAttempts, messages, remedials, diagnostics] = await Promise.all([
    User.findById(childId).select('name grade classGrade rollNo language avatar').lean(),
    StudentProgress.findOne({ studentId: childId }).lean(),
    QuizAttempt.find({ studentId: childId }).sort({ submittedAt: -1 }).limit(5).lean(),
    ParentMessage.find({ parentId, childId }).sort({ sentAt: -1 }).limit(10).lean(),
    RemedialAssignment.find({ studentId: childId, status: { $ne: 'completed' } }).lean(),
    DiagnosticResult.find({ studentId: childId }).sort({ evaluatedAt: -1 }).limit(1).lean(),
  ]);

  return {
    success: true,
    child,
    progress: progress || {
      overallScore: 0,
      xp: 0,
      weakTopics: [],
      badges: [],
      topicMastery: {},
    },
    recentAttempts,
    messages,
    remedials,
    latestDiagnostic: diagnostics[0] || null,
  };
}

export async function getStudentLeaderboard(classGrade = null, limit = 10) {
  const studentFilter = { role: 'student', isActive: true };
  if (classGrade) studentFilter.classGrade = classGrade;
  const students = await User.find(studentFilter).select('name rollNo classGrade avatar').lean();
  const ids = students.map((student) => student._id);
  const progressDocs = await StudentProgress.find({ studentId: { $in: ids } }).lean();
  const map = new Map(progressDocs.map((item) => [String(item.studentId), item]));

  return students
    .map((student) => {
      const progress = map.get(String(student._id));
      return {
        studentId: String(student._id),
        name: student.name,
        rollNo: student.rollNo,
        avatar: student.avatar,
        score: progress?.overallScore || 0,
        xp: progress?.xp || 0,
      };
    })
    .sort((a, b) => b.xp - a.xp || b.score - a.score)
    .slice(0, limit)
    .map((item, index) => ({ ...item, rank: index + 1 }));
}

export { getSchoolSettings, round };
