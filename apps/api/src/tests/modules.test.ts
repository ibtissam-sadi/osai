import test from 'node:test';
import assert from 'node:assert/strict';
import { can } from '../modules/auth/rbac.js';
import { computeAIScoring } from '../modules/ai/policies.js';
import { buildArchiveSearchQuery } from '../modules/search/elasticsearch.js';

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
