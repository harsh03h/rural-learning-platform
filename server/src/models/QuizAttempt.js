import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema(
  {
    questionId: String,
    selected: String,
    correct: String,
    isCorrect: Boolean,
  },
  { _id: false },
);

const quizAttemptSchema = new mongoose.Schema(
  {
    clientAttemptId: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      index: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    chapterId: { type: String, trim: true, default: null, index: true },
    courseId: { type: String, trim: true, default: null },
    topicKey: { type: String, trim: true, default: null, index: true },
    score: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 1 },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    earnedXP: { type: Number, default: 0, min: 0 },
    answers: { type: [answerSchema], default: [] },
    mode: { type: String, enum: ['online', 'offline'], default: 'online' },
    clientTimestamp: { type: Date, default: null },
    syncedAt: { type: Date, default: null },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    submittedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true },
);

quizAttemptSchema.index({ studentId: 1, submittedAt: -1 });
quizAttemptSchema.index({ studentId: 1, topicKey: 1 });

export default mongoose.model('QuizAttempt', quizAttemptSchema);
