import http from 'node:http';
import jwt from 'jsonwebtoken';
import { env } from './config/env.js';
import { createAuditEvent } from './modules/audit/logger.js';
import { computeAIScoring } from './modules/ai/policies.js';
import { can } from './modules/auth/rbac.js';
import { predictRetentionWindow } from './modules/documents/retention.js';
import { buildArchiveSearchQuery } from './modules/search/elasticsearch.js';
import { buildApprovalChain } from './modules/workflows/approval.js';

const send = (res: http.ServerResponse, code: number, payload: unknown) => {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

const route = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/health') {
    return send(res, 200, { status: 'ok', service: 'osai-api', now: new Date().toISOString() });
  }

  if (url.pathname === '/api/v1/auth/token') {
    const role = (url.searchParams.get('role') || 'ORG_ADMIN') as jwt.JwtPayload['role'];
    const token = jwt.sign({ sub: 'demo-user', role }, env.jwtAccessSecret, { expiresIn: '15m' });
    return send(res, 200, { accessToken: token, tokenType: 'Bearer' });
  }

  if (url.pathname === '/api/v1/search') {
    const q = url.searchParams.get('q') || 'archive';
    return send(res, 200, buildArchiveSearchQuery(q, { language: url.searchParams.get('lang') || 'ar' }));
  }

  if (url.pathname === '/api/v1/ai/scoring') {
    return send(res, 200, computeAIScoring({ unusualAccessCount: 3, missingMetadataFields: 1, retentionBreachDays: 5 }));
  }

  if (url.pathname === '/api/v1/workflows/chain') {
    const classification = url.searchParams.get('classification') || 'PUBLIC';
    return send(res, 200, buildApprovalChain(classification));
  }

  if (url.pathname === '/api/v1/retention/predict') {
    const category = url.searchParams.get('category') || 'general';
    const legalBasis = url.searchParams.get('legalBasis') || '88-09';
    return send(res, 200, predictRetentionWindow(category, legalBasis));
  }

  if (url.pathname === '/api/v1/rbac/check') {
    const role = (url.searchParams.get('role') || 'USER') as Parameters<typeof can>[0];
    const permission = url.searchParams.get('permission') || 'search:read';
    return send(res, 200, { role, permission, allowed: can(role, permission) });
  }

  if (url.pathname === '/api/v1/audit/event') {
    return send(
      res,
      200,
      createAuditEvent({
        actorId: 'demo-user',
        action: 'DOCUMENT_READ',
        resourceType: 'Document',
        resourceId: 'doc-001',
        ipAddress: req.socket.remoteAddress || 'unknown'
      })
    );
  }

  return send(res, 404, { error: 'not_found' });
};

http.createServer(route).listen(env.port, () => {
  console.log(`OSAI API listening on :${env.port}`);
});
