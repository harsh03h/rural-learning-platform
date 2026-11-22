import mongoose from 'mongoose';

const { Schema } = mongoose;

const classSectionSchema = new Schema(
  {
    schoolId: { type: String, default: 'school-rampur-01', index: true },
    grade: { type: String, required: true, trim: true },
    section: { type: String, required: true, trim: true },
    room: { type: String, trim: true, default: '' },
    teacher: { type: String, trim: true, default: '' },
    students: { type: Number, min: 0, default: 0 },
    attendance: { type: String, trim: true, default: '' },
    stream: { type: String, trim: true, default: 'General' },
    academicYear: { type: String, default: '2026-27' },
  },
  { timestamps: true },
);

classSectionSchema.index({ schoolId: 1, grade: 1, section: 1 }, { unique: true });

const facultyMemberSchema = new Schema(
  {
    schoolId: { type: String, default: 'school-rampur-01', index: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true, default: 'Teacher' },
    subject: { type: String, trim: true, default: '' },
    attendance: { type: String, trim: true, default: '' },
    syllabus: { type: String, trim: true, default: '' },
    planStatus: { type: String, enum: ['Pending', 'Approved', 'Revision Needed'], default: 'Pending' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

export const ClassSection = mongoose.model('ClassSection', classSectionSchema);
export const FacultyMember = mongoose.model('FacultyMember', facultyMemberSchema);
