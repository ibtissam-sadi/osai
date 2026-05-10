export interface AuditEvent {
  actorId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  ipAddress: string;
  timestamp: string;
}

export const createAuditEvent = (partial: Omit<AuditEvent, 'timestamp'>): AuditEvent => ({
  ...partial,
  timestamp: new Date().toISOString()
});
