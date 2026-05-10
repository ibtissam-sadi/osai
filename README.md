# OSAI — AI Smart Archive Operating System

AI-first, enterprise archival operating system blueprint for Algerian institutions.

## Implemented foundation
- Multi-tenant archival data model via Prisma + PostgreSQL
- JWT auth primitives + RBAC matrix
- AI scoring primitives (risk/compliance/anomaly)
- Elasticsearch query builder (full text + metadata + vector `knn`)
- Workflow approval chain engine scaffolding
- Retention prediction utility scaffolding
- Full web shell modules: dashboard, archive explorer, AI center, workflows, compliance, organization, analytics
- Dockerized platform services (web, api, postgres, redis, elasticsearch)

## Run
```bash
cp .env.example .env
docker compose up -d --build
```

## Main paths
- `prisma/schema.prisma` — enterprise data model
- `apps/api/src` — API and domain modules
- `apps/web/app` — Next.js enterprise UI modules
- `services/*` — worker services (AI/search/workflow)
- `docs/*` — architecture and AI design notes
