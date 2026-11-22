import AuditLog from '../models/AuditLog.js';

export async function audit(req, action, resource, metadata = {}, resourceId = null) {
  try {
    await AuditLog.create({
      actorId: req?.user?._id || null,
      actorRole: req?.user?.role || null,
      action,
      resource,
      resourceId,
      metadata,
      ip: req?.ip || req?.socket?.remoteAddress || null,
      userAgent: req?.get?.('user-agent') || null,
    });
  } catch (error) {
    console.warn('[GyanSetu] Audit log write failed:', error.message);
  }
}
