import mongoose from 'mongoose';

const { Schema } = mongoose;

const challengeCompletionSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    challengeId: { type: String, required: true, trim: true },
    awardedXp: { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

challengeCompletionSchema.index({ studentId: 1, challengeId: 1 }, { unique: true });

export default mongoose.model('ChallengeCompletion', challengeCompletionSchema);
