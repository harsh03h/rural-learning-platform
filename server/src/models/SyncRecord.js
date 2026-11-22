import mongoose from 'mongoose';

const syncRecordSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['quiz', 'diagnostic', 'download', 'progress', 'doubt', 'unknown'],
      default: 'unknown',
    },
    status: {
      type: String,
      enum: ['pending', 'processed', 'duplicate', 'failed'],
      default: 'pending',
      index: true,
    },
    payload: { type: mongoose.Schema.Types.Mixed, default: {} },
    error: { type: String, default: null },
    clientTimestamp: { type: Date, default: null },
    receivedAt: { type: Date, default: Date.now },
    processedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

syncRecordSchema.index({ studentId: 1, receivedAt: -1 });

export default mongoose.model('SyncRecord', syncRecordSchema);
