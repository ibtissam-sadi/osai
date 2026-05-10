export const predictRetentionWindow = (category: string, legalBasis: string): number => {
  if (legalBasis.includes('88-09')) return 3650;
  if (category === 'financial') return 3650;
  if (category === 'medical') return 5475;
  return 1825;
};
