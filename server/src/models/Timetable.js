import mongoose from 'mongoose';

const periodSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    period: { type: Number, required: true, min: 1, max: 12 },
    subject: { type: String, required: true },
    teacher: { type: String, default: '' },
    room: { type: String, default: '' },
    startTime: { type: String, default: '' },
    endTime: { type: String, default: '' },
  },
  { _id: false },
);

const timetableSchema = new mongoose.Schema(
  {
    classGrade: { type: String, required: true, trim: true, index: true },
    schoolId: { type: String, default: 'school-rampur-01' },
    academicYear: { type: String, default: '2026-27' },
    periods: { type: [periodSchema], default: [] },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

timetableSchema.index({ classGrade: 1, academicYear: 1 }, { unique: true });

export default mongoose.model('Timetable', timetableSchema);
