import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    chapterId: { type: String, required: true, trim: true, index: true },
    courseId: { type: String, default: null },
    title: { type: String, default: '' },
    sizeKb: { type: Number, default: 24 },
    deviceId: { type: String, default: 'web' },
    status: { type: String, enum: ['available', 'downloaded', 'removed'], default: 'downloaded' },
    downloadedAt: { type: Date, default: Date.now },
    lastOpenedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

downloadSchema.index({ studentId: 1, chapterId: 1 }, { unique: true });

export default mongoose.model('Download', downloadSchema);
