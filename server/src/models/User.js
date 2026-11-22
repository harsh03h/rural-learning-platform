import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      match: [/^\+?[0-9\s-]{8,16}$/, 'Invalid phone number'],
    },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      required: true,
      enum: ['student', 'teacher', 'parent', 'admin', 'guest'],
      default: 'student',
      index: true,
    },
    avatar: { type: String, default: '🎓' },
    school: {
      type: String,
      default: 'Model Senior Secondary School Rampur',
      trim: true,
    },
    schoolId: { type: String, default: 'school-rampur-01', index: true },
    grade: { type: String, trim: true, default: null },
    classGrade: { type: String, trim: true, default: null },
    rollNo: { type: String, trim: true, default: null },
    legacyId: { type: String, trim: true, default: null, index: true },
    language: {
      type: String,
      default: 'hi',
      enum: ['hi', 'en', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'pa', 'od'],
    },
    subjects: { type: [String], default: [] },
    designation: { type: String, trim: true, default: null },
    childId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    childName: { type: String, trim: true, default: null },
    isActive: { type: Boolean, default: true, index: true },
    isDemo: { type: Boolean, default: false },
    lastLoginAt: { type: Date, default: null },
    preferences: {
      lowDataMode: { type: Boolean, default: false },
      offlineMode: { type: Boolean, default: false },
      theme: { type: String, default: 'light' },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

userSchema.virtual('displayGrade').get(function displayGrade() {
  return this.classGrade || this.grade || null;
});

userSchema.methods.toPublicJSON = function toPublicJSON() {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.__v;
  return obj;
};

userSchema.index({ role: 1, schoolId: 1 });
userSchema.index({ classGrade: 1, role: 1 });

export default mongoose.model('User', userSchema);
