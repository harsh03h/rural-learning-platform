import mongoose from 'mongoose';

const { Schema } = mongoose;

const rewardClaimSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    key: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    xpAtClaim: { type: Number, default: 0 },
    certificateId: { type: String, trim: true, default: null },
    status: { type: String, enum: ['claimed', 'revoked'], default: 'claimed' },
    claimedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

rewardClaimSchema.index({ studentId: 1, key: 1 }, { unique: true });

export default mongoose.model('RewardClaim', rewardClaimSchema);
