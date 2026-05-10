import test from 'node:test';
import assert from 'node:assert/strict';
import { can } from '../modules/auth/rbac.js';
import { computeAIScoring } from '../modules/ai/policies.js';
import { buildArchiveSearchQuery } from '../modules/search/elasticsearch.js';
import { create, list, update, remove } from '../modules/store/memory-store.js';
import { queueAIJob, runAIJob, getAIInsights, analyzeDocument, getAIRecommendations } from '../modules/ai/engine.js';
import { toVector, cosine } from '../modules/ai/semantic.js';

test('rbac permission check works', () => {
  assert.equal(can('ARCHIVIST', 'search:read'), true);
  assert.equal(can('USER', 'documents:manage'), false);
});

test('ai scoring boundaries are valid', () => {
  const scores = computeAIScoring({ unusualAccessCount: 10, missingMetadataFields: 2, retentionBreachDays: 4 });
  assert.ok(scores.anomalyScore >= 0 && scores.anomalyScore <= 1);
});

test('search builder has vector knn section', () => {
  const query = buildArchiveSearchQuery('finance', { language: 'fr' });
  assert.equal(query.knn.field, 'embedding');
});

test('memory store crud works', () => {
  create('documents', { id: 'DOC-T', title: 'Tmp' });
  update('documents', 'DOC-T', { title: 'Changed' });
  assert.equal(list('documents').find((d) => d.id === 'DOC-T')?.title, 'Changed');
  assert.equal(remove('documents', 'DOC-T'), true);
});

test('ai infrastructure pipeline works', () => {
  const job = queueAIJob('DOC-1', 'embedding');
  const result = runAIJob(job.id);
  assert.ok(result?.insight.documentId === 'DOC-1');
  const manual = analyzeDocument('DOC-M', 'Finance budget report for Ministry');
  assert.equal(manual.classification, 'FINANCE');
  assert.ok(getAIInsights().length > 0);
  assert.ok(getAIRecommendations().length > 0);
  const a = toVector('archive');
  const b = toVector('archival');
  assert.ok(cosine(a, b) > 0.8);
});
