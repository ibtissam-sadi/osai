export interface AIJob {
  id: string;
  documentId: string;
  type: 'ocr' | 'classification' | 'embedding' | 'compliance' | 'anomaly';
  status: 'queued' | 'running' | 'done' | 'failed';
  createdAt: string;
}

export interface AIInsight {
  documentId: string;
  summary: string;
  classification: string;
  duplicateOf?: string;
  riskScore: number;
  complianceScore: number;
}

const jobs: AIJob[] = [];
const insights: AIInsight[] = [];

export const queueAIJob = (documentId: string, type: AIJob['type']) => {
  const job: AIJob = { id: `AI-${Date.now()}`, documentId, type, status: 'queued', createdAt: new Date().toISOString() };
  jobs.push(job);
  return job;
};

export const runAIJob = (jobId: string) => {
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return null;
  job.status = 'running';
  job.status = 'done';

  const insight: AIInsight = {
    documentId: job.documentId,
    summary: `Auto summary for ${job.documentId}`,
    classification: job.type === 'compliance' ? 'LEGAL' : 'GENERAL',
    riskScore: Math.round(Math.random() * 100) / 100,
    complianceScore: Math.round((0.7 + Math.random() * 0.3) * 100) / 100,
    duplicateOf: job.type === 'embedding' ? 'DOC-001' : undefined
  };
  insights.push(insight);
  return { job, insight };
};

export const getAIJobs = () => jobs;
export const getAIInsights = () => insights;
