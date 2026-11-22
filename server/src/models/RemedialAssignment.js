import mongoose from 'mongoose';

const remedialSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    topic: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
    dueAt: { type: Date, default: null },
    status: {
      type: String,
      enum: ['assigned', 'in-progress', 'completed'],
      default: 'assigned',
      index: true,
    },
    completedAt: { type: Date, default: null },
    assignedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

remedialSchema.index({ studentId: 1, status: 1 });

export default mongoose.model('RemedialAssignment', remedialSchema);
