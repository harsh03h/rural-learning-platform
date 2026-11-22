import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    targetRoles: {
      type: [String],
      enum: ['student', 'teacher', 'parent', 'admin', 'all'],
      default: ['all'],
    },
    schoolId: { type: String, default: 'school-rampur-01' },
    classGrade: { type: String, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    isActive: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true },
);

announcementSchema.index({ isActive: 1, publishedAt: -1 });

export default mongoose.model('Announcement', announcementSchema);
