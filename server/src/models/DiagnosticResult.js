import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema(
  {
    prerequisite: String,
    action: String,
    reason: String,
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  },
  { _id: false },
);

const diagnosticSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    topicScores: { type: mongoose.Schema.Types.Mixed, default: {} },
    weakTopics: { type: [String], default: [] },
    answers: { type: mongoose.Schema.Types.Mixed, default: [] },
    recommendations: { type: [recommendationSchema], default: [] },
    source: { type: String, enum: ['ai', 'fallback', 'manual'], default: 'manual' },
    mode: { type: String, enum: ['online', 'offline'], default: 'online' },
    clientId: { type: String, trim: true, default: null, index: true },
    syncedAt: { type: Date, default: null },
    notes: { type: String, default: '' },
    evaluatedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true },
);

diagnosticSchema.index({ studentId: 1, evaluatedAt: -1 });

export default mongoose.model('DiagnosticResult', diagnosticSchema);
