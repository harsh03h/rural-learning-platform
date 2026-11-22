import mongoose from 'mongoose';

const { Schema } = mongoose;

const attendanceSchema = new Schema(
  {
    date: { type: String, required: true, trim: true, index: true },
    classGrade: { type: String, required: true, trim: true, index: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    status: { type: String, enum: ['present', 'absent'], default: 'present' },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    markedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

attendanceSchema.index({ date: 1, studentId: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);
