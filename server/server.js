import express from 'express';
import cors from 'cors';
import http from 'http';

const app = express();
const PORT = process.env.PORT || 5000;
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';

app.use(cors());
app.use(express.json());

// In-memory data store for rural school instance
const db = {
  users: [
    { id: 'stu-4', name: 'Rohan Verma', role: 'student', grade: 'Class 7A', rollNo: '24', school: 'Model Senior Secondary School Rampur', language: 'hi', avatar: '🎓' },
    { id: 'teach-1', name: 'Mr. Arvind Sharma', role: 'teacher', subject: 'Mathematics & Science', grade: 'Class 7A', school: 'Model Senior Secondary School Rampur', avatar: '👨‍🏫' },
    { id: 'par-1', name: 'Ramcharan Verma (Parent)', role: 'parent', child: 'Rohan Verma', phone: '+91 98765 43210', avatar: '📱' },
    { id: 'adm-1', name: 'Dr. Anita Deshmukh', role: 'admin', designation: 'Principal & Headmaster', school: 'Model Senior Secondary School Rampur', avatar: '🏛️' }
  ],
  students: [
    { id: 'stu-1', name: 'Rahul Kumar', rollNo: '07', classGrade: 'Class 7A', overallScore: 42, weakTopics: ['Fractions', 'Percentages'], status: 'Needs Remedial Attention' },
    { id: 'stu-2', name: 'Amit Sharma', rollNo: '12', classGrade: 'Class 7A', overallScore: 48, weakTopics: ['Percentages', 'Geometry'], status: 'Needs Remedial Attention' },
    { id: 'stu-3', name: 'Pooja Patel', rollNo: '19', classGrade: 'Class 7A', overallScore: 52, weakTopics: ['Fractions'], status: 'Average Progress' },
    { id: 'stu-4', name: 'Rohan Verma', rollNo: '24', classGrade: 'Class 7A', overallScore: 72, weakTopics: ['Fractions (In Progress)'], status: 'On Track' },
    { id: 'stu-5', name: 'Sunita Devi', rollNo: '31', classGrade: 'Class 7A', overallScore: 91, weakTopics: [], status: 'Star Performer' }
  ],
  syncedQuizzes: [],
  diagnosticRecords: {}
};

// Helper function to call Python AI Microservice
async function callAiService(endpoint, body) {
  try {
    const response = await fetch(`${AI_SERVICE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`AI Service returned status ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.warn(`[Node Backend] Warning: Python AI Microservice call to ${endpoint} failed (${err.message}). Using fallback.`);
    return null;
  }
}

// ----------------------------------------------------
// ROUTES
// ----------------------------------------------------

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    gateway: 'GyanSetu Node.js Express Gateway',
    version: '1.0.0',
    port: PORT,
    aiServiceUrl: AI_SERVICE_URL,
    totalRegisteredStudents: 40,
    timestamp: new Date().toISOString()
  });
});

// Authentication (Simulated JWT)
app.post('/api/auth/login', (req, res) => {
  const { username, role = 'student' } = req.body;
  const matchedUser = db.users.find(u => u.role === role) || {
    id: `user-${Date.now()}`,
    name: username || (role === 'student' ? 'Rohan Verma' : 'School Faculty'),
    role,
    grade: 'Class 7A',
    school: 'Model Senior Secondary School Rampur',
    avatar: role === 'student' ? '🎓' : role === 'teacher' ? '👨‍🏫' : role === 'parent' ? '📱' : '🏛️'
  };

  const fakeJwtToken = `gyansetu_jwt_${Buffer.from(JSON.stringify(matchedUser)).toString('base64')}`;

  res.json({
    success: true,
    token: fakeJwtToken,
    user: matchedUser
  });
});

// Student Registration
app.post('/api/auth/register', (req, res) => {
  const { name, grade, language, subjects } = req.body;
  const newUser = {
    id: `stu-${Date.now()}`,
    name: name || 'New Rural Learner',
    role: 'student',
    grade: grade || 'Class 7',
    language: language || 'hi',
    subjects: subjects || ['Mathematics', 'Science', 'English', 'Hindi'],
    school: 'Model Senior Secondary School Rampur',
    avatar: '🎓'
  };
  db.users.push(newUser);
  res.json({
    success: true,
    message: 'Student registered successfully',
    user: newUser
  });
});

// Courses API
app.get('/api/courses', (req, res) => {
  res.json({
    success: true,
    gradeOfferings: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    subjects: ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi', 'Digital Literacy'],
    message: 'Full rural curriculum loaded'
  });
});

// Diagnostic Assessment Evaluation & Recommendations
app.post('/api/diagnostic/submit', async (req, res) => {
  const { studentId = 'stu-4', topicScores = {}, weakTopics = [] } = req.body;
  
  // Forward to Python AI microservice for recommendations
  const aiResult = await callAiService('/ai/recommend', { weakTopics });

  const recommendations = aiResult?.recommendations || [
    {
      prerequisite: 'Fractions (Class 6/7)',
      action: 'Revise Fractions Chapter 1 & 2 before starting Percentages',
      reason: 'Fractions are the baseline foundation for understanding percentages and ratios.',
      priority: 'High'
    }
  ];

  db.diagnosticRecords[studentId] = {
    date: new Date().toISOString(),
    topicScores,
    weakTopics,
    recommendations
  };

  res.json({
    success: true,
    evaluated: true,
    weakTopics,
    recommendations
  });
});

// Submit Quiz Result
app.post('/api/quiz/submit', (req, res) => {
  const { chapterId, topicKey, score, total, studentId = 'stu-4' } = req.body;
  const earnedXP = (score || 0) * 20;

  const record = {
    id: `quiz-rec-${Date.now()}`,
    studentId,
    chapterId,
    topicKey,
    score,
    total,
    earnedXP,
    submittedAt: new Date().toISOString()
  };

  db.syncedQuizzes.push(record);

  res.json({
    success: true,
    earnedXP,
    message: 'Quiz result saved to school edge database',
    record
  });
});

// Batch Sync Queue (for offline PWA synchronization when connectivity returns)
app.post('/api/sync/batch', (req, res) => {
  const { pendingRecords = [], studentId = 'stu-4' } = req.body;
  
  if (Array.isArray(pendingRecords)) {
    pendingRecords.forEach(rec => {
      db.syncedQuizzes.push({
        ...rec,
        syncedAt: new Date().toISOString(),
        studentId
      });
    });
  }

  res.json({
    success: true,
    syncedCount: pendingRecords.length,
    message: `Successfully synchronized ${pendingRecords.length} offline records with central school server.`
  });
});

// Teacher Module Overview (Matches PDF Page 9 & 10)
app.get('/api/teacher/overview', (req, res) => {
  res.json({
    success: true,
    totalStudents: 40,
    averageClassScore: 68,
    weakTopics: ['Fractions', 'Algebra', 'Grammar'],
    studentsNeedingAttention: [
      { name: 'Rahul', score: 42, weakTopic: 'Fractions' },
      { name: 'Amit', score: 48, weakTopic: 'Percentages' },
      { name: 'Pooja', score: 52, weakTopic: 'Fractions' }
    ]
  });
});

// Teacher AI Question Generator (Relays to Python AI Microservice)
app.post('/api/teacher/generate-questions', async (req, res) => {
  const { topic = 'Fractions', grade = 'Class 6', count = 3, difficulty = 'Medium' } = req.body;
  
  const aiResult = await callAiService('/ai/generate-questions', { topic, grade, count, difficulty });

  if (aiResult && aiResult.questions) {
    return res.json(aiResult);
  }

  // Fallback if AI microservice unavailable
  res.json({
    success: true,
    topic,
    grade,
    fallback: true,
    questions: [
      {
        q: `If 4 out of 20 mangoes in a village orchard are ripe, what is the fraction of ripe mangoes?`,
        options: ['1/5', '1/4', '4/10', '2/5'],
        answer: '1/5',
        explanation: '4/20 simplified by dividing both numerator and denominator by 4 gives 1/5.'
      },
      {
        q: `A farmer sold 3/8 of his harvest in the morning and 2/8 in the afternoon. What fraction was sold?`,
        options: ['5/8', '5/16', '1/8', '6/8'],
        answer: '5/8',
        explanation: '3/8 + 2/8 = (3+2)/8 = 5/8.'
      }
    ]
  });
});

// AI Doubt Saathi Endpoint (Relays to Python AI Microservice)
app.post('/api/ai/doubt', async (req, res) => {
  const { query, language = 'hi', grade = 'Class 7' } = req.body;

  const aiResult = await callAiService('/ai/doubt', { query, language, grade });

  if (aiResult && aiResult.reply) {
    return res.json(aiResult);
  }

  // Fallback
  const reply = language === 'hi'
    ? `शानदार सवाल! गणित और विज्ञान हमारे ग्रामीण वातावरण (जैसे खेत की सिंचाई और हाट-बाज़ार) से गहराई से जुड़े हैं।`
    : `Great question! Math and science principles govern everyday rural life, such as canal irrigation and mandi market trade.`;

  res.json({
    success: true,
    query,
    reply,
    fallback: true
  });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`============================================================`);
  console.log(` GyanSetu Node.js Express Backend running on http://127.0.0.1:${PORT}`);
  console.log(` Connected to AI Microservice at: ${AI_SERVICE_URL}`);
  console.log(`============================================================`);
});
