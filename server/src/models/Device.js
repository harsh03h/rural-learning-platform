import mongoose from 'mongoose';

const { Schema } = mongoose;

const deviceCommandSchema = new Schema(
  {
    command: { type: String, enum: ['ping', 'force_sync', 'lock', 'unlock'], required: true },
    issuedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    issuedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['queued', 'delivered', 'failed'], default: 'queued' },
  },
  { _id: false },
);

const deviceSchema = new Schema(
  {
    deviceId: { type: String, required: true, unique: true, trim: true, index: true },
    label: { type: String, trim: true, default: '' },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    grade: { type: String, trim: true, default: '' },
    rollNo: { type: String, trim: true, default: '' },
    battery: { type: Number, min: 0, max: 100, default: 80 },
    charging: { type: Boolean, default: false },
    status: { type: String, enum: ['Online', 'Offline', 'Maintenance'], default: 'Online', index: true },
    cacheMb: { type: Number, min: 0, default: 42 },
    locked: { type: Boolean, default: false },
    lastPingAt: { type: Date, default: Date.now },
    commands: { type: [deviceCommandSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model('Device', deviceSchema);
