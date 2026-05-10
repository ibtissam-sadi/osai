export interface RetentionDecision {
  retentionDays: number;
  archiveAfterDays: number;
  reason: string;
}

export const predictRetentionWindow = (category: string, legalBasis: string): RetentionDecision => {
  if (legalBasis.includes('88-09')) {
    return { retentionDays: 3650, archiveAfterDays: 365, reason: 'National archive law baseline' };
  }

  if (category === 'financial') {
    return { retentionDays: 3650, archiveAfterDays: 180, reason: 'Financial traceability requirement' };
  }

  if (category === 'medical') {
    return { retentionDays: 5475, archiveAfterDays: 90, reason: 'Medical record extended preservation' };
  }

  return { retentionDays: 1825, archiveAfterDays: 180, reason: 'Default institutional policy' };
};
