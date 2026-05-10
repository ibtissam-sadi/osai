import http from 'node:http';
import jwt from 'jsonwebtoken';
import { env } from './config/env.js';
import { can } from './modules/auth/rbac.js';
import { buildArchiveSearchQuery } from './modules/search/elasticsearch.js';
import { computeAIScoring } from './modules/ai/policies.js';

const send = (res: http.ServerResponse, code: number, payload: unknown) => {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

const server = http.createServer((req, res) => {
  if (req.url === '/health') return send(res, 200, { status: 'ok', service: 'osai-api' });

  if (req.url === '/api/v1/auth/token') {
    const token = jwt.sign({ sub: 'demo-user', role: 'ORG_ADMIN' }, env.jwtAccessSecret, { expiresIn: '15m' });
    return send(res, 200, { accessToken: token, tokenType: 'Bearer' });
  }

  if (req.url === '/api/v1/ai/scoring') {
    return send(res, 200, computeAIScoring({ unusualAccessCount: 3, missingMetadataFields: 1, retentionBreachDays: 5 }));
  }

  if (req.url?.startsWith('/api/v1/search')) {
    const roleAllowed = can('ARCHIVIST', 'search:read');
    return send(res, 200, { roleAllowed, query: buildArchiveSearchQuery('budget 2025', { language: 'ar' }) });
  }

  return send(res, 404, { error: 'not_found' });
});

server.listen(env.port, () => {
  console.log(`OSAI API listening on :${env.port}`);
});
