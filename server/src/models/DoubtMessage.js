import mongoose from 'mongoose';

const doubtSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    query: { type: String, required: true, trim: true, maxlength: 2000 },
    language: { type: String, default: 'hi' },
    grade: { type: String, default: 'Class 7' },
    reply: { type: String, default: '' },
    analogy: { type: String, default: '' },
    practicalTip: { type: String, default: '' },
    source: { type: String, default: 'unknown' },
    isFallback: { type: Boolean, default: false },
    helpful: { type: Boolean, default: null },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

doubtSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('DoubtMessage', doubtSchema);
