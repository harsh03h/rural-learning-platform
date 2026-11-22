import mongoose from 'mongoose';

const { Schema } = mongoose;

const topicMasterySchema = new Schema(
  {
    score: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    attempts: { type: Number, default: 0 },
    mastery: { type: Number, default: 0, min: 0, max: 100 },
    lastAttemptAt: { type: Date, default: null },
  },
  { _id: false },
);

const badgeSchema = new Schema(
  {
    code: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String, default: '🏅' },
    earnedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const studentProgressSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    overallScore: { type: Number, default: 0, min: 0, max: 100 },
    xp: { type: Number, default: 0, min: 0 },
    level: { type: Number, default: 1, min: 1 },
    streakDays: { type: Number, default: 0 },
    lastActiveDate: { type: String, default: null },
    topicMastery: { type: Map, of: topicMasterySchema, default: () => new Map() },
    weakTopics: { type: [String], default: [] },
    strongTopics: { type: [String], default: [] },
    completedChapters: { type: [String], default: [] },
    badges: { type: [badgeSchema], default: [] },
    diagnosticSummary: {
      lastAttemptAt: { type: Date, default: null },
      topicScores: { type: Schema.Types.Mixed, default: {} },
      weakTopics: { type: [String], default: [] },
      recommendationCount: { type: Number, default: 0 },
    },
    stats: {
      quizzesAttempted: { type: Number, default: 0 },
      quizzesPassed: { type: Number, default: 0 },
      totalQuestionsAttempted: { type: Number, default: 0 },
      totalCorrectAnswers: { type: Number, default: 0 },
      totalXpEarned: { type: Number, default: 0 },
      offlineQuizzesSynced: { type: Number, default: 0 },
    },
    lastCalculatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model('StudentProgress', studentProgressSchema);
