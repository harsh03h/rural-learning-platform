import mongoose from 'mongoose';

const parentMessageSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    channel: { type: String, enum: ['sms', 'ivr'], default: 'sms' },
    language: { type: String, default: 'hi' },
    category: {
      type: String,
      enum: ['progress', 'attendance', 'remedial', 'reward', 'general'],
      default: 'progress',
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['queued', 'sent', 'delivered', 'failed'],
      default: 'sent',
      index: true,
    },
    phone: { type: String, default: null },
    sentAt: { type: Date, default: Date.now },
    deliveredAt: { type: Date, default: null },
    providerId: { type: String, default: null },
  },
  { timestamps: true },
);

parentMessageSchema.index({ parentId: 1, sentAt: -1 });

export default mongoose.model('ParentMessage', parentMessageSchema);
