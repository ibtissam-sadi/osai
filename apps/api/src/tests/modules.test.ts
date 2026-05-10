import test from 'node:test';
import assert from 'node:assert/strict';
import { can } from '../modules/auth/rbac.js';
import { computeAIScoring } from '../modules/ai/policies.js';
import { buildArchiveSearchQuery } from '../modules/search/elasticsearch.js';
import { create, list, update, remove } from '../modules/store/memory-store.js';

test('rbac permission check works', () => {
  assert.equal(can('ARCHIVIST', 'search:read'), true);
  assert.equal(can('USER', 'documents:manage'), false);
});

test('ai scoring boundaries are valid', () => {
  const scores = computeAIScoring({ unusualAccessCount: 10, missingMetadataFields: 2, retentionBreachDays: 4 });
  assert.ok(scores.anomalyScore >= 0 && scores.anomalyScore <= 1);
  assert.ok(scores.riskScore >= 0 && scores.riskScore <= 1);
  assert.ok(scores.complianceScore >= 0 && scores.complianceScore <= 1);
});

test('search builder has vector knn section', () => {
  const query = buildArchiveSearchQuery('finance', { language: 'fr' });
  assert.equal(query.knn.field, 'embedding');
  assert.equal(query.index, 'documents');
});

test('memory store crud works', () => {
  create('documents', { id: 'DOC-T', title: 'Tmp' });
  assert.equal(list('documents').some((d) => d.id === 'DOC-T'), true);
  update('documents', 'DOC-T', { title: 'Changed' });
  assert.equal(list('documents').find((d) => d.id === 'DOC-T')?.title, 'Changed');
  assert.equal(remove('documents', 'DOC-T'), true);
});
