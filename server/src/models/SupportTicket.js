import mongoose from 'mongoose';

const { Schema } = mongoose;

const supportTicketSchema = new Schema(
  {
    ticketId: { type: String, required: true, unique: true, trim: true, index: true },
    role: { type: String, enum: ['student', 'teacher', 'parent', 'admin', 'guest'], default: 'student' },
    category: { type: String, default: 'sync' },
    name: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    school: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed'],
      default: 'open',
      index: true,
    },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    assignedTo: { type: String, trim: true, default: 'Block Resource Coordinator' },
    resolution: { type: String, trim: true, default: '' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

export default mongoose.model('SupportTicket', supportTicketSchema);
