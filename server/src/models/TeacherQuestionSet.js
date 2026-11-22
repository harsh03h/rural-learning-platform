import mongoose from 'mongoose';

const questionSetSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    topic: { type: String, required: true },
    grade: { type: String, default: 'Class 7' },
    subject: { type: String, default: 'Mathematics' },
    count: { type: Number, default: 3 },
    difficulty: { type: String, default: 'Medium' },
    questions: { type: [mongoose.Schema.Types.Mixed], default: [] },
    source: { type: String, enum: ['ai', 'fallback'], default: 'fallback' },
    sharedWithStudents: { type: Boolean, default: false },
  },
  { timestamps: true },
);

questionSetSchema.index({ teacherId: 1, createdAt: -1 });

export default mongoose.model('TeacherQuestionSet', questionSetSchema);
