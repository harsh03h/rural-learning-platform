import mongoose from 'mongoose';

const { Schema } = mongoose;

const callbackRequestSchema = new Schema(
  {
    parentId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    childId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    childName: { type: String, trim: true, default: '' },
    childGrade: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    preferredLanguage: { type: String, default: 'hi' },
    status: {
      type: String,
      enum: ['requested', 'scheduled', 'completed', 'cancelled'],
      default: 'requested',
      index: true,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    notes: { type: String, trim: true, default: '' },
    requestedAt: { type: Date, default: Date.now },
    scheduledAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export default mongoose.model('CallbackRequest', callbackRequestSchema);
