# OSAI — AI Smart Archive Operating System

AI-first, enterprise archival operating system blueprint for Algerian institutions.

## What is usable now
- API service with security middleware, CORS, rate limiting, and operational endpoints.
- Web UI shell with all core OS sections (dashboard, archive explorer, AI center, workflows, compliance, organization, analytics).
- Infrastructure stack with PostgreSQL, Redis, Elasticsearch, API, and Web via Docker Compose.
- API unit tests and CI validation workflow.
- One-command smoke test to verify API readiness.

## Quick start (full OS stack)
```bash
cp .env.example .env
make up
make smoke
```

Then open:
- Web: http://localhost:3000
- API: http://localhost:4000/health

## Useful commands
```bash
make logs      # tail all service logs
make down      # stop stack
npm run test   # run API tests
npm run smoke  # run API smoke checks
```

## Production-readiness upgrades included
- Security headers + CORS allowlist + API rate limiting
- Graceful shutdown handlers for API containers
- Environment validation for required JWT secrets in production
- Multi-stage Docker builds for API and Web runtime images
- Docker Compose health checks and restart policies
