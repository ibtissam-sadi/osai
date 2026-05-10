# OSAI — AI Smart Archive Operating System

## Completed platform scope in this repo
- API backend with security, CRUD, AI analysis, AI jobs, AI recommendations, semantic vector similarity, and system status.
- Full web module shell with dashboard, archive explorer, AI command center, workflows, compliance, organization, analytics.
- Worker layer stubs now actively runnable:
  - `ai_worker` (AI pipeline processing loop)
  - `search_worker` (Elasticsearch/vector sync loop)
  - `workflow_worker` (workflow escalation/notification loop)
- Docker Compose orchestration for API, Web, PostgreSQL, Redis, Elasticsearch, and all workers.
- Smoke validation includes health + system status + AI flow checks.

## Key backend endpoints
- `GET /api/v1/system/status`
- `POST /api/v1/ai/analyze`
- `GET/POST /api/v1/ai/jobs`
- `POST /api/v1/ai/jobs/:id/run`
- `GET /api/v1/ai/insights`
- `GET /api/v1/ai/recommendations`
- `GET /api/v1/ai/vectorize?q=...&compare=...`

## Run
```bash
cp .env.example .env
make up
make smoke
```
