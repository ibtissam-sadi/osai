# OSAI — AI Smart Archive Operating System

AI-first, enterprise archival operating system blueprint for Algerian institutions.

## What is usable now
- API service with security middleware, CORS, rate limiting, and operational endpoints.
- Full web OS shell with all major centers fully routed:
  - Enterprise Dashboard
  - Archive Explorer (search/table UI)
  - AI Command Center (pipeline KPIs)
  - Workflow Manager (operations table)
  - Compliance Monitoring Center
  - Organization Hierarchy Manager
  - Analytics Center
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
