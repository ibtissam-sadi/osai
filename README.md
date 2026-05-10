# OSAI — AI Smart Archive Operating System

Enterprise-grade, AI-first archival platform blueprint for Algerian institutions (ministries, municipalities, universities, hospitals, banks, national companies, and agencies).

## Stack
- Next.js + TypeScript + Tailwind + shadcn/ui
- Node.js services (REST-ready, tRPC-ready)
- Prisma + PostgreSQL
- Redis + BullMQ
- Elasticsearch (full-text + vector search)
- JWT + refresh tokens + RBAC
- Docker & Docker Compose

## Monorepo Layout
- `apps/web`: Next.js enterprise UI (dashboard, explorer, AI command center)
- `apps/api`: API gateway / BFF and auth layer
- `services/*`: microservice-ready workers (`ai-worker`, `search-worker`, `workflow-worker`)
- `prisma`: enterprise archive schema
- `infra`: docker, elasticsearch, redis setup
- `.github/workflows`: CI template
- `docs`: compliance and architecture notes

## Quick Start
1. Copy `.env.example` to `.env`.
2. Run `docker compose up -d --build`.
3. Run migrations and seed from API container.

## Compliance-by-design
The model and modules are designed to support Law 88-09, Law 18-07, ISO 15489, ISO 27001, ISO 30301 and OAIS workflows.
