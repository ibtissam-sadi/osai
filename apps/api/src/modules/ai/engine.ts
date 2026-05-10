import { toVector, cosine } from './semantic.js';
import { getActiveModels } from './model-registry.js';

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
  entities: string[];
  modelsUsed: Record<string, string>;
}

const jobs: AIJob[] = [];
const insights: AIInsight[] = [];

const classify = (text: string) => {
  if (/finance|budget|invoice/i.test(text)) return 'FINANCE';
  if (/patient|medical|hospital/i.test(text)) return 'MEDICAL';
  if (/personnel|staff|hr/i.test(text)) return 'HR';
  return 'GENERAL';
};

export const analyzeDocument = (documentId: string, text: string) => {
  const vector = toVector(text);
  const cls = classify(text);
  const duplicate = insights.find((i) => cosine(vector, toVector(i.summary)) > 0.93);
  const insight: AIInsight = {
    documentId,
    summary: text.slice(0, 120),
    classification: cls,
    duplicateOf: duplicate?.documentId,
    riskScore: Math.round((cls === 'MEDICAL' ? 0.35 : 0.2) * 100) / 100,
    complianceScore: Math.round((cls === 'GENERAL' ? 0.96 : 0.88) * 100) / 100,
    entities: Array.from(new Set((text.match(/[A-Z][a-z]+/g) || []).slice(0, 5))),
    modelsUsed: getActiveModels()
  };
  insights.push(insight);
  return insight;
};

export const queueAIJob = (documentId: string, type: AIJob['type']) => {
  const job: AIJob = { id: `AI-${Date.now()}-${Math.floor(Math.random()*1000)}`, documentId, type, status: 'queued', createdAt: new Date().toISOString() };
  jobs.push(job);
  return job;
};

export const runAIJob = (jobId: string) => {
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return null;
  job.status = 'running';
  const sample = `${job.type} analysis for ${job.documentId} in Algerian archive context`;
  const insight = analyzeDocument(job.documentId, sample);
  job.status = 'done';
  return { job, insight };
};

export const getAIJobs = () => jobs;
export const getAIInsights = () => insights;

export const getAIRecommendations = () => insights.map((i) => ({
  documentId: i.documentId,
  recommendation: i.complianceScore < 0.9 ? 'Route to compliance officer' : 'Auto-archive eligible',
  retentionPolicy: i.classification === 'MEDICAL' ? '15y' : i.classification === 'FINANCE' ? '10y' : '5y'
}));
