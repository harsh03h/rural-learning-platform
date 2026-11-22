import mongoose from 'mongoose';

const schoolSettingsSchema = new mongoose.Schema(
  {
    schoolId: { type: String, required: true, unique: true, default: 'school-rampur-01' },
    schoolName: {
      type: String,
      default: 'Model Senior Secondary School Rampur',
    },
    district: { type: String, default: 'Rampur' },
    edgeServer: {
      name: { type: String, default: 'GyanSetu School Edge Node 01' },
      status: { type: String, enum: ['online', 'offline', 'maintenance'], default: 'online' },
      lastHeartbeatAt: { type: Date, default: Date.now },
      activeTablets: { type: Number, default: 24 },
      registeredTablets: { type: Number, default: 30 },
      storageUsedMb: { type: Number, default: 1840 },
      storageTotalMb: { type: Number, default: 8192 },
    },
    districtSync: {
      status: { type: String, enum: ['synced', 'pending', 'failed'], default: 'synced' },
      lastSyncAt: { type: Date, default: Date.now },
      lastRecordCount: { type: Number, default: 0 },
      totalRecordCount: { type: Number, default: 0 },
    },
    features: {
      lowDataModeDefault: { type: Boolean, default: false },
      aiDoubtEnabled: { type: Boolean, default: true },
      offlineSyncEnabled: { type: Boolean, default: true },
      parentSmsEnabled: { type: Boolean, default: true },
    },
    featureFlags: {
      type: [
        {
          id: { type: String, required: true },
          name: { type: String, required: true },
          category: { type: String, default: 'learning' },
          description: { type: String, default: '' },
          targetGrade: { type: String, default: 'Class 7' },
          enabled: { type: Boolean, default: true },
          isCore: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
    accreditation: {
      code: { type: String, default: 'GS-PVT-092801' },
      isAttested: { type: Boolean, default: true },
      attestedAt: { type: Date, default: Date.now },
      documents: { type: [String], default: [] },
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

export default mongoose.model('SchoolSettings', schoolSettingsSchema);
