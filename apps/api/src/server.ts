import http from 'node:http';
import jwt from 'jsonwebtoken';
import { env } from './config/env.js';
import { checkRateLimit, applySecurityHeaders } from './middleware/security.js';
import { createAuditEvent } from './modules/audit/logger.js';
import { computeAIScoring } from './modules/ai/policies.js';
import { can } from './modules/auth/rbac.js';
import { predictRetentionWindow } from './modules/documents/retention.js';
import { buildArchiveSearchQuery } from './modules/search/elasticsearch.js';
import { list, create, update, remove, type Entity } from './modules/store/memory-store.js';
import { buildApprovalChain } from './modules/workflows/approval.js';
import { queueAIJob, runAIJob, getAIJobs, getAIInsights, analyzeDocument, getAIRecommendations } from './modules/ai/engine.js';
import { toVector, cosine } from './modules/ai/semantic.js';
import { listModels, getActiveModels, setActiveModel } from './modules/ai/model-registry.js';

const send = (res: http.ServerResponse, code: number, payload: unknown) => {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

const readBody = async (req: http.IncomingMessage) => {
  const chunks: Uint8Array[] = [];
  for await (const c of req) chunks.push(c as Uint8Array);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
};

const server = http.createServer(async (req, res) => {
  applySecurityHeaders(res);
  const origin = req.headers.origin;
  if (origin && env.allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    return send(res, 204, {});
  }

  const ip = req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(ip, env.rateLimitPerMin)) return send(res, 429, { error: 'rate_limit_exceeded' });

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/health') return send(res, 200, { status: 'ok', service: 'osai-api', now: new Date().toISOString() });
  if (url.pathname === '/api/v1/system/status') return send(res, 200, {
    status: 'ok',
    services: ['api','web','postgres','redis','elasticsearch','ai_worker','search_worker','workflow_worker'],
    aiJobs: getAIJobs().length,
    aiInsights: getAIInsights().length,
    documents: list('documents').length,
    workflows: list('workflows').length,
    organizations: list('organizations').length
  });
  if (url.pathname === '/api/v1/auth/token') return send(res, 200, { accessToken: jwt.sign({ sub: 'demo-user', role: url.searchParams.get('role') || 'ORG_ADMIN' }, env.jwtAccessSecret, { expiresIn: '15m' }), tokenType: 'Bearer' });
  if (url.pathname === '/api/v1/search') return send(res, 200, buildArchiveSearchQuery(url.searchParams.get('q') || 'archive', { language: url.searchParams.get('lang') || 'ar' }));
  if (url.pathname === '/api/v1/ai/scoring') return send(res, 200, computeAIScoring({ unusualAccessCount: 3, missingMetadataFields: 1, retentionBreachDays: 5 }));
  if (url.pathname === '/api/v1/workflows/chain') return send(res, 200, buildApprovalChain(url.searchParams.get('classification') || 'PUBLIC'));
  if (url.pathname === '/api/v1/retention/predict') return send(res, 200, predictRetentionWindow(url.searchParams.get('category') || 'general', url.searchParams.get('legalBasis') || '88-09'));
  if (url.pathname === '/api/v1/rbac/check') return send(res, 200, { allowed: can((url.searchParams.get('role') || 'USER') as Parameters<typeof can>[0], url.searchParams.get('permission') || 'search:read') });
  if (url.pathname === '/api/v1/audit/event') return send(res, 200, createAuditEvent({ actorId: 'demo-user', action: 'DOCUMENT_READ', resourceType: 'Document', resourceId: 'doc-001', ipAddress: ip }));

  if (url.pathname === '/api/v1/ai/jobs' && req.method === 'GET') return send(res, 200, getAIJobs());
  if (url.pathname === '/api/v1/ai/jobs' && req.method === 'POST') {
    const body = await readBody(req) as { documentId?: string; type?: 'ocr' | 'classification' | 'embedding' | 'compliance' | 'anomaly' };
    return send(res, 201, queueAIJob(body.documentId || 'DOC-001', body.type || 'ocr'));
  }
  if (url.pathname.startsWith('/api/v1/ai/jobs/') && req.method === 'POST' && url.pathname.endsWith('/run')) {
    const parts = url.pathname.split('/');
    return send(res, 200, runAIJob(parts[5]) || { error: 'not_found' });
  }
  if (url.pathname === '/api/v1/ai/insights') return send(res, 200, getAIInsights());

  if (url.pathname === '/api/v1/ai/analyze' && req.method === 'POST') {
    const body = await readBody(req) as { documentId?: string; text?: string };
    return send(res, 200, analyzeDocument(body.documentId || 'DOC-NEW', body.text || 'General archive text'));
  }
  if (url.pathname === '/api/v1/ai/recommendations' && req.method === 'GET') {
    return send(res, 200, getAIRecommendations());
  }

  if (url.pathname === '/api/v1/ai/models' && req.method === 'GET') return send(res, 200, { options: listModels(), active: getActiveModels() });
  if (url.pathname === '/api/v1/ai/models/activate' && req.method === 'POST') {
    const body = await readBody(req) as { task?: string; modelId?: string };
    const result = setActiveModel(body.task || 'chat', body.modelId || 'openai-gpt-4.1');
    return send(res, result ? 200 : 400, result || { error: 'invalid_model_for_task' });
  }
  if (url.pathname === '/api/v1/ai/vectorize') {
    const q = url.searchParams.get('q') || 'archive';
    const compare = url.searchParams.get('compare') || 'records';
    const v1 = toVector(q);
    const v2 = toVector(compare);
    return send(res, 200, { vector: v1, similarity: cosine(v1, v2) });
  }

  const bucket = url.pathname.match(/^\/api\/v1\/(documents|workflows|organizations)$/)?.[1] as 'documents' | 'workflows' | 'organizations' | undefined;
  if (bucket && req.method === 'GET') return send(res, 200, list(bucket));
  if (bucket && req.method === 'POST') return send(res, 201, create(bucket, await readBody(req) as Entity));

  const m = url.pathname.match(/^\/api\/v1\/(documents|workflows|organizations)\/([^/]+)$/);
  if (m && req.method === 'PUT') return send(res, 200, update(m[1] as any, m[2], await readBody(req)) || { error: 'not_found' });
  if (m && req.method === 'DELETE') return send(res, 200, { deleted: remove(m[1] as any, m[2]) });

  return send(res, 404, { error: 'not_found' });
});

server.listen(env.port, () => console.log(`OSAI API listening on :${env.port}`));

const shutdown = () => { server.close(() => process.exit(0)); setTimeout(() => process.exit(1), 10_000); };
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
