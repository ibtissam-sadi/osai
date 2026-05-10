# OSAI — AI Smart Archive Operating System

AI-first, enterprise archival operating system blueprint for Algerian institutions.

## Production-readiness upgrades
- Security headers + CORS controls + in-memory API rate limiting
- Graceful shutdown handlers for API containers
- Environment validation for production secrets
- Multi-stage Docker builds for API and Web runtime images
- Docker Compose health checks and restart policies
- CI execution for API test workflow

## Implemented foundation
- Multi-tenant archival data model via Prisma + PostgreSQL
- JWT auth primitives + RBAC matrix
- AI scoring primitives (risk/compliance/anomaly)
- Elasticsearch query builder (full text + metadata + vector `knn`)
- Workflow approval chain engine scaffolding
- Retention prediction utility scaffolding
- Full web shell modules: dashboard, archive explorer, AI center, workflows, compliance, organization, analytics

## Run
```bash
cp .env.example .env
docker compose up -d --build
```
