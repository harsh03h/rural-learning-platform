import mongoose from 'mongoose';
import { pathToFileURL } from 'url';
import { connectDatabase, disconnectDatabase } from '../config/db.js';
import { env } from '../config/env.js';
import { hashPassword } from '../utils/password.js';
import { recomputeStudentProgress } from '../services/progressService.js';

import User from '../models/User.js';
import Course from '../models/Curriculum.js';
import Timetable from '../models/Timetable.js';
import StudentProgress from '../models/StudentProgress.js';
import QuizAttempt from '../models/QuizAttempt.js';
import DiagnosticResult from '../models/DiagnosticResult.js';
import RemedialAssignment from '../models/RemedialAssignment.js';
import Announcement from '../models/Announcement.js';
import SchoolSettings from '../models/SchoolSettings.js';
import { ClassSection, FacultyMember } from '../models/Directory.js';
import Device from '../models/Device.js';
import SupportTicket from '../models/SupportTicket.js';
import RewardClaim from '../models/RewardClaim.js';
import Attendance from '../models/Attendance.js';
import CallbackRequest from '../models/CallbackRequest.js';
import ChallengeCompletion from '../models/ChallengeCompletion.js';

// Frontend content banks are reused so the API serves exactly what the UI shows.
import { sampleCourses } from '../../../src/data/coursesData.js';
import { chapterQuizBank, getQuestionsForChapter } from '../../../src/data/chapterQuizBank.js';
import { getNotesForChapter } from '../../../src/data/chapterNotesBank.js';

const SCHOOL_ID = 'school-rampur-01';
const SCHOOL_NAME = 'Model Senior Secondary School Rampur';

// Kept local (mirrors src/data/mockData.js) because that frontend module uses
// extensionless imports which Node's ESM loader cannot resolve directly.
const diagnosticQuestions = [
  { id: 'diag-1', topic: 'Fractions', question: 'Which fraction represents half of an object?', options: ['1/4', '1/2', '3/4', '2/1'], correct: 1 },
  { id: 'diag-2', topic: 'Fractions', question: 'Calculate: 1/4 + 2/4 = ?', options: ['3/8', '3/4', '1/2', '2/4'], correct: 1 },
  { id: 'diag-3', topic: 'Percentages', question: 'How would you write 50% as a fraction?', options: ['50/10', '1/4', '1/2', '5/100'], correct: 2 },
  { id: 'diag-4', topic: 'Percentages', question: 'A student scored 40 out of 50. What is the percentage?', options: ['40%', '75%', '80%', '90%'], correct: 2 },
  { id: 'diag-5', topic: 'Decimals', question: 'Which number is greater: 0.7 or 0.07?', options: ['0.07', '0.7', 'Both equal', 'Cannot say'], correct: 1 },
  { id: 'diag-6', topic: 'Geometry', question: 'Perimeter of a square with side 5 cm?', options: ['10 cm', '20 cm', '25 cm', '15 cm'], correct: 1 },
];

const mockStudents = [
  { id: 'stu-1', name: 'Rahul Kumar', rollNo: '07', classGrade: 'Class 7A', overallScore: 42, weakTopics: ['Fractions', 'Percentages'], status: 'Needs Remedial Attention' },
  { id: 'stu-2', name: 'Amit Sharma', rollNo: '12', classGrade: 'Class 7A', overallScore: 48, weakTopics: ['Percentages', 'Geometry'], status: 'Needs Remedial Attention' },
  { id: 'stu-3', name: 'Pooja Patel', rollNo: '19', classGrade: 'Class 7A', overallScore: 52, weakTopics: ['Fractions'], status: 'Average Progress' },
  { id: 'stu-4', name: 'Rohan Verma (You)', rollNo: '24', classGrade: 'Class 7A', overallScore: 72, weakTopics: ['Fractions (In Progress)'], status: 'On Track' },
  { id: 'stu-5', name: 'Sunita Devi', rollNo: '31', classGrade: 'Class 7A', overallScore: 91, weakTopics: [], status: 'Star Performer' },
];

function localized(value, lang = 'en') {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value.en || '';
}

function normalizeQuestion(question, index) {
  const options = Array.isArray(question.options) ? question.options : [];
  const correctIndex = Number.isInteger(question.correct) ? question.correct : 0;
  return {
    questionId: question.id || `q-${index + 1}`,
    q: localized(question.question, 'en'),
    options,
    answer: options[correctIndex] ?? options[0] ?? '',
    explanation: localized(question.explanation, 'en'),
    difficulty: 'Medium',
    topic: null,
  };
}

function buildCourseDocs() {
  return sampleCourses.map((course) => ({
    courseId: course.id,
    grade: course.classGrade,
    subject: course.subject,
    title: localized(course.title, 'en'),
    description: localized(course.summary, 'en') || `${course.classGrade} ${course.subject} curriculum`,
    icon: course.icon || '📘',
    color: course.color || '#2563eb',
    language: 'hi',
    isPublished: true,
    chapters: (course.chapters || []).map((chapter, chapterIndex) => {
      const quiz = chapterQuizBank[chapter.id] || getQuestionsForChapter(chapter, 'en');
      const notes = getNotesForChapter({ ...chapter, courseGrade: course.classGrade, courseSubject: course.subject }, 'en');
      return {
        chapterId: chapter.id,
        title: localized(chapter.title, 'en'),
        description: localized(chapter.summary, 'en'),
        order: chapterIndex + 1,
        topics: chapter.topicKey ? [chapter.topicKey] : [],
        prerequisites: [],
        lesson: {
          title: localized(chapter.title, 'en'),
          durationMinutes: 12,
          sizeKb: chapter.sizeKB || 24,
          content: JSON.stringify(chapter.lowDataContent || {}),
          blocks: chapter.lowDataContent || {},
        },
        notes: {
          title: notes?.title || localized(chapter.title, 'en'),
          content: JSON.stringify(notes || {}),
          sections: notes || {},
          formulas: notes?.keyFormulas || [],
        },
        quiz: (quiz || []).map(normalizeQuestion),
        isPublished: true,
      };
    }),
  }));
}

const DEMO_USERS = [
  {
    email: 'rohan.verma@gyansetu.local',
    name: 'Rohan Verma',
    role: 'student',
    legacyId: 'stu-4',
    grade: 'Class 7A',
    classGrade: 'Class 7A',
    rollNo: '24',
    language: 'hi',
    avatar: '🎓',
    subjects: ['Mathematics', 'Science', 'English', 'Hindi'],
    isDemo: true,
  },
  {
    email: 'teacher.sharma@gyansetu.local',
    name: 'Mr. Arvind Sharma',
    role: 'teacher',
    grade: 'Class 7A',
    classGrade: 'Class 7A',
    language: 'hi',
    avatar: '👨‍🏫',
    designation: 'Mathematics & Science Teacher',
    subjects: ['Mathematics', 'Science'],
    isDemo: true,
  },
  {
    email: 'parent.ramcharan@gyansetu.local',
    name: 'Ramcharan Verma',
    role: 'parent',
    language: 'hi',
    avatar: '📱',
    phone: '+91 98765 43210',
    childName: 'Rohan Verma',
    isDemo: true,
  },
  {
    email: 'principal@gyansetu.local',
    name: 'Dr. Anita Deshmukh',
    role: 'admin',
    language: 'hi',
    avatar: '🏛️',
    designation: 'Principal & Headmaster',
    isDemo: true,
  },
];

function mockStudentUser(student) {
  const isRohan = student.name.includes('Rohan');
  const name = isRohan ? 'Rohan Verma' : student.name;
  const email = `${name.toLowerCase().replace(/[^a-z]+/g, '.')}@gyansetu.local`;
  return {
    email,
    name,
    role: 'student',
    legacyId: student.id,
    grade: student.classGrade,
    classGrade: student.classGrade,
    rollNo: student.rollNo,
    language: 'hi',
    avatar: '🎓',
    subjects: ['Mathematics', 'Science', 'English', 'Hindi'],
    isDemo: isRohan,
    progress: {
      overallScore: student.overallScore,
      weakTopics: student.weakTopics || [],
    },
  };
}

const TIMETABLE_DAYS = [
  { day: 'Monday', p1: 'Integers & Real-world Debits/Credits (Math)', p2: 'Nutrition in Plants & Photosynthesis (Science)', p3: 'Three Questions (English Honeycomb)' },
  { day: 'Tuesday', p1: 'Fractions & Roti Division Model (Math)', p2: 'Nutrition in Animals & Digestive System (Science)', p3: 'हम पंछी उन्मुक्त गगन के (Hindi)' },
  { day: 'Wednesday', p1: 'Decimals Multiplication (Math)', p2: 'Tracing Changes Through a Thousand Years (History)', p3: 'Word Processing & Typing Skills (Digital)' },
  { day: 'Thursday', p1: 'Heat & Clinical Thermometers (Science)', p2: 'On Equality & Democracy (Civics)', p3: 'A Gift of Chappals (English)' },
  { day: 'Friday', p1: 'Data Handling & Village Census (Math)', p2: 'Acids, Bases & Village Soil Testing (Science)', p3: 'दादी माँ - कहानी (Hindi)' },
  { day: 'Saturday', p1: 'Our Environment & Ecosystems (Geography)', p2: 'AI Diagnostic Practice Quiz & Remedial Check', p3: 'Spreadsheets & Data Entry Basics (Digital)' },
];

function buildTimetablePeriods() {
  const periods = [];
  TIMETABLE_DAYS.forEach((entry, dayIndex) => {
    [1, 2, 3].forEach((periodNumber) => {
      const value = entry[`p${periodNumber}`];
      const [subject, ...teacherParts] = value.split('(');
      periods.push({
        day: entry.day,
        period: periodNumber,
        subject: subject.trim(),
        teacher: teacherParts.join('(').replace(')', '').trim() || 'Class Teacher',
        room: `Room ${101 + dayIndex}`,
        startTime: ['09:00', '10:15', '11:30'][periodNumber - 1],
        endTime: ['10:00', '11:15', '12:30'][periodNumber - 1],
      });
    });
  });
  return periods;
}

async function upsertUser(data, passwordHash) {
  const filter = { email: data.email };
  const update = {
    $set: {
      ...data,
      school: SCHOOL_NAME,
      schoolId: SCHOOL_ID,
      passwordHash,
      isActive: true,
    },
    $setOnInsert: { createdAt: new Date() },
  };
  await User.findOneAndUpdate(filter, update, { upsert: true, returnDocument: 'after', runValidators: true });
  return User.findOne(filter);
}

export async function seedDatabase({ force = false } = {}) {
  if (mongoose.connection.readyState !== 1) await connectDatabase();

  if (force) {
    await Promise.all([
      Course.deleteMany({}),
      User.deleteMany({}),
      Timetable.deleteMany({}),
      StudentProgress.deleteMany({}),
      QuizAttempt.deleteMany({}),
      DiagnosticResult.deleteMany({}),
      RemedialAssignment.deleteMany({}),
      Announcement.deleteMany({}),
      ClassSection.deleteMany({}),
      FacultyMember.deleteMany({}),
      Device.deleteMany({}),
      SupportTicket.deleteMany({}),
      RewardClaim.deleteMany({}),
      Attendance.deleteMany({}),
      CallbackRequest.deleteMany({}),
      ChallengeCompletion.deleteMany({}),
    ]);
    console.log('[GyanSetu Seed] Existing data cleared.');
  }

  const courseDocs = buildCourseDocs();
  await Course.bulkWrite(
    courseDocs.map((course) => ({
      updateOne: {
        filter: { courseId: course.courseId },
        update: { $set: course },
        upsert: true,
      },
    })),
  );
  console.log(`[GyanSetu Seed] ${courseDocs.length} courses with ${courseDocs.reduce((sum, c) => sum + c.chapters.length, 0)} chapters synchronized.`);

  const passwordHash = await hashPassword(env.defaultDemoPassword);
  const allUsers = [
    ...DEMO_USERS,
    ...mockStudents.filter((student) => !student.name.includes('Rohan')).map(mockStudentUser),
  ];
  const uniqueUsers = [...new Map(allUsers.map((user) => [user.email, user])).values()];

  for (const data of uniqueUsers) {
    await upsertUser(data, passwordHash);
  }
  const demoRohan = await User.findOne({ email: 'rohan.verma@gyansetu.local' });
  const teacher = await User.findOne({ email: 'teacher.sharma@gyansetu.local' });
  const parent = await User.findOne({ email: 'parent.ramcharan@gyansetu.local' });

  if (parent && demoRohan) {
    parent.childId = demoRohan._id;
    parent.childName = demoRohan.name;
    await parent.save();
  }
  console.log(`[GyanSetu Seed] ${uniqueUsers.length} users ready (demo password: ${env.defaultDemoPassword}).`);

  const studentUsers = await User.find({ role: 'student' });
  const studentByLegacy = new Map(studentUsers.map((student) => [student.legacyId, student]));
  const studentByName = new Map(studentUsers.map((student) => [student.name, student]));

  for (const student of studentUsers) {
    const mock = mockStudents.find(
      (item) => item.id === student.legacyId || item.name.replace(' (You)', '') === student.name,
    );
    const score = mock?.overallScore ?? 72;
    const weak = mock?.weakTopics?.map((topic) => topic.replace(' (In Progress)', '')) || [];

    await StudentProgress.findOneAndUpdate(
      { studentId: student._id },
      {
        $set: {
          overallScore: score,
          weakTopics: weak,
          xp: Math.round(score * 18),
          level: Math.max(1, Math.floor((score * 18) / 500) + 1),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true, returnDocument: 'after' },
    );
  }

  // Representative quiz history so teacher analytics has real data on first run.
  const attemptSeeds = [
    ['stu-1', 'math-c7-ch1', 'Fractions', 4, 10],
    ['stu-1', 'math-c7-ch2', 'Percentages', 3, 10],
    ['stu-2', 'math-c7-ch2', 'Percentages', 5, 10],
    ['stu-2', 'math-c7-ch3', 'Geometry', 6, 10],
    ['stu-3', 'math-c7-ch1', 'Fractions', 6, 10],
    ['stu-4', 'math-c7-ch1', 'Fractions', 7, 10],
    ['stu-4', 'math-c7-ch2', 'Percentages', 9, 10],
    ['stu-5', 'math-c7-ch1', 'Fractions', 10, 10],
    ['stu-5', 'math-c7-ch2', 'Percentages', 9, 10],
  ];

  for (const [legacyId, chapterId, topicKey, score, total] of attemptSeeds) {
    const student = studentByLegacy.get(legacyId);
    if (!student) continue;
    const clientAttemptId = `seed-quiz-${legacyId}-${chapterId}`;
    await QuizAttempt.findOneAndUpdate(
      { clientAttemptId },
      {
        $setOnInsert: {
          clientAttemptId,
          studentId: student._id,
          chapterId,
          courseId: chapterId.split('-').slice(0, 2).join('-'),
          topicKey,
          score,
          total,
          percentage: Math.round((score / total) * 100),
          earnedXP: score * 20,
          mode: 'online',
          submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      { upsert: true },
    );
  }

  for (const student of studentUsers) {
    await recomputeStudentProgress(student._id);
  }
  console.log('[GyanSetu Seed] Student progress computed from quiz history.');

  if (demoRohan) {
    const topicScores = {};
    diagnosticQuestions.forEach((question) => {
      topicScores[question.topic] = topicScores[question.topic] || { correct: 0, total: 0 };
      topicScores[question.topic].total += 1;
    });
    topicScores.Fractions.correct = 0;
    topicScores.Percentages.correct = 2;
    topicScores.Decimals.correct = 1;
    topicScores.Geometry.correct = 1;

    await DiagnosticResult.findOneAndUpdate(
      { clientId: 'seed-diagnostic-rohan' },
      {
        $setOnInsert: {
          clientId: 'seed-diagnostic-rohan',
          studentId: demoRohan._id,
          topicScores,
          weakTopics: ['Fractions'],
          answers: [],
          recommendations: [
            {
              prerequisite: 'Fractions (Class 6/7)',
              action: 'Revise Fractions Chapters 1 & 2 before starting Percentages',
              reason: 'Fractions are the baseline foundation for percentages and ratios.',
              priority: 'High',
            },
          ],
          source: 'manual',
          mode: 'online',
          evaluatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
      },
      { upsert: true },
    );
  }

  if (teacher) {
    const struggling = ['stu-1', 'stu-2', 'stu-3']
      .map((legacyId) => studentByLegacy.get(legacyId))
      .filter(Boolean);
    for (const student of struggling) {
      const topic = (await StudentProgress.findOne({ studentId: student._id }))?.weakTopics?.[0] || 'Fractions';
      await RemedialAssignment.findOneAndUpdate(
        { studentId: student._id, topic, teacherId: teacher._id },
        {
          $setOnInsert: {
            studentId: student._id,
            teacherId: teacher._id,
            topic,
            title: `Revision: ${topic}`,
            description: `Practice ${topic} using NCERT examples and village-based word problems.`,
            priority: 'High',
            dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: 'assigned',
            assignedAt: new Date(),
          },
        },
        { upsert: true },
      );
    }
  }

  await Timetable.findOneAndUpdate(
    { classGrade: 'Class 7A', academicYear: '2026-27' },
    {
      $set: {
        classGrade: 'Class 7A',
        academicYear: '2026-27',
        schoolId: SCHOOL_ID,
        periods: buildTimetablePeriods(),
        updatedBy: teacher?._id || null,
      },
    },
    { upsert: true, returnDocument: 'after' },
  );

  await Announcement.findOneAndUpdate(
    { title: 'Welcome to GyanSetu Digital Learning' },
    {
      $setOnInsert: {
        title: 'Welcome to GyanSetu Digital Learning',
        body: 'Download your lessons at school, study offline, and sync your progress when you reconnect. AI Doubt Saathi is available in your own language.',
        targetRoles: ['student', 'parent'],
        schoolId: SCHOOL_ID,
        createdBy: teacher?._id || null,
        isActive: true,
        publishedAt: new Date(),
      },
    },
    { upsert: true },
  );

  await SchoolSettings.findOneAndUpdate(
    { schoolId: SCHOOL_ID },
    {
      $setOnInsert: {
        schoolId: SCHOOL_ID,
        schoolName: SCHOOL_NAME,
        district: 'Rampur',
      },
      $set: {
        features: {
          lowDataModeDefault: true,
          aiDoubtEnabled: true,
          offlineSyncEnabled: true,
          parentSmsEnabled: true,
        },
        featureFlags: [
          { id: 'low-data', name: 'Low-Data Mode', category: 'connectivity', description: 'Text-first lessons under 40 KB', targetGrade: 'All', enabled: true, isCore: true },
          { id: 'offline-sync', name: 'Offline Sync Queue', category: 'connectivity', description: 'Retry queued quiz and progress records', targetGrade: 'All', enabled: true, isCore: true },
          { id: 'ai-doubt', name: 'AI Doubt Saathi', category: 'learning', description: 'Vernacular doubt answering', targetGrade: 'Class 6-10', enabled: true, isCore: false },
          { id: 'diagnostic', name: 'AI Diagnostic Path', category: 'learning', description: 'Prerequisite mapping and remedials', targetGrade: 'Class 6-10', enabled: true, isCore: false },
          { id: 'sms-alerts', name: 'Parent SMS Alerts', category: 'communication', description: 'Feature-phone progress messages', targetGrade: 'All', enabled: true, isCore: true },
          { id: 'timetable', name: 'Weekly Timetable', category: 'learning', description: 'Printable class schedule', targetGrade: 'Class 6-10', enabled: true, isCore: false },
          { id: 'rewards', name: 'XP Rewards & Certificates', category: 'motivation', description: 'Achievement badges and merit certificate', targetGrade: 'All', enabled: true, isCore: false },
        ],
        accreditation: {
          code: 'GS-PVT-092801',
          isAttested: true,
          attestedAt: new Date(),
          documents: ['Affiliation Certificate', 'Academic Council Attestation'],
        },
      },
    },
    { upsert: true },
  );

  const classSeed = [
    ['Class 7', 'A', 'Room 101', 'Mr. Arvind Sharma', 38, '94%'],
    ['Class 7', 'B', 'Room 102', 'Mrs. Kavita Nair', 36, '91%'],
    ['Class 8', 'A', 'Room 201', 'Mr. Sanjay Yadav', 40, '89%'],
    ['Class 6', 'A', 'Room 103', 'Mrs. Meera Singh', 35, '95%'],
    ['Class 9', 'A', 'Room 301', 'Mr. Rajesh Rao', 42, '88%'],
    ['Class 10', 'A', 'Room 401', 'Dr. Sunita Deshmukh', 39, '92%'],
  ];
  await ClassSection.bulkWrite(classSeed.map(([grade, section, room, teacher, students, attendance]) => ({
    updateOne: {
      filter: { schoolId: SCHOOL_ID, grade, section },
      update: { $set: { room, teacher, students, attendance, stream: 'General', academicYear: '2026-27' } },
      upsert: true,
    },
  })));

  const facultySeed = [
    ['Mr. Arvind Sharma', 'Senior TGT', 'Mathematics', '96%', 'Class 7 NCERT', 'Approved'],
    ['Mrs. Kavita Nair', 'TGT', 'Science', '93%', 'Class 7 NCERT', 'Approved'],
    ['Mr. Sanjay Yadav', 'TGT', 'English', '90%', 'Class 8 Grammar', 'Pending'],
    ['Mrs. Meera Singh', 'PRT', 'Hindi', '97%', 'Class 6 Hindi', 'Approved'],
    ['Mr. Rajesh Rao', 'PGT', 'Social Science', '88%', 'Class 9 Civics', 'Revision Needed'],
  ];
  await FacultyMember.bulkWrite(facultySeed.map(([name, role, subject, attendance, syllabus, planStatus]) => ({
    updateOne: {
      filter: { schoolId: SCHOOL_ID, name, subject },
      update: { $set: { role, attendance, syllabus, planStatus } },
      upsert: true,
    },
  })));

  await Device.bulkWrite(studentUsers.slice(0, 12).map((student, index) => ({
    updateOne: {
      filter: { deviceId: `TAB-${String(index + 1).padStart(3, '0')}` },
      update: {
        $set: {
          label: `Class Tablet ${index + 1}`,
          studentId: student._id,
          grade: student.classGrade || student.grade,
          rollNo: student.rollNo,
          battery: 55 + (index * 7) % 40,
          charging: index % 4 === 0,
          status: index === 5 ? 'Offline' : 'Online',
          cacheMb: 24 + (index * 6) % 80,
          locked: index === 8,
          lastPingAt: new Date(Date.now() - index * 15 * 60 * 1000),
        },
      },
      upsert: true,
    },
  })));

  console.log('[GyanSetu Seed] Timetable, diagnostic, remedials, settings, classes, faculty and tablets ready.');
  console.log('[GyanSetu Seed] Database seeding complete.');
  return {
    courses: courseDocs.length,
    chapters: courseDocs.reduce((sum, course) => sum + course.chapters.length, 0),
    users: uniqueUsers.length,
    students: studentUsers.length,
  };
}

const invokedDirectly = process.argv[1]
  && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) {
  seedDatabase({ force: process.argv.includes('--force') })
    .then(async () => {
      await disconnectDatabase();
      process.exit(0);
    })
    .catch(async (error) => {
      console.error('[GyanSetu Seed] Failed:', error);
      await disconnectDatabase();
      process.exit(1);
    });
}
