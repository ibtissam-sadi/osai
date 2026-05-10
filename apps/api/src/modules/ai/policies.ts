export interface AIScoring {
  riskScore: number;
  complianceScore: number;
  anomalyScore: number;
}

export const computeAIScoring = (signals: {
  unusualAccessCount: number;
  missingMetadataFields: number;
  retentionBreachDays: number;
}): AIScoring => {
  const anomalyScore = Math.min(1, signals.unusualAccessCount / 20);
  const riskScore = Math.min(1, (signals.missingMetadataFields * 0.2) + (signals.retentionBreachDays * 0.03));
  const complianceScore = Math.max(0, 1 - ((signals.missingMetadataFields * 0.15) + (signals.retentionBreachDays * 0.02)));
  return { riskScore, complianceScore, anomalyScore };
};
