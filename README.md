# OSAI — AI Smart Archive Operating System

AI-first, enterprise archival operating system blueprint for Algerian institutions.

## What is usable now
- API service with security middleware, CORS, rate limiting, and operational endpoints.
- Full web OS shell with all major centers fully routed and linked.
- In-web CRUD interactions available now for archive/workflow/organization pages.
- API CRUD endpoints available now for:
  - `GET/POST /api/v1/documents`
  - `PUT/DELETE /api/v1/documents/:id`
  - `GET/POST /api/v1/workflows`
  - `PUT/DELETE /api/v1/workflows/:id`
  - `GET/POST /api/v1/organizations`
  - `PUT/DELETE /api/v1/organizations/:id`
- Infrastructure stack with PostgreSQL, Redis, Elasticsearch, API, and Web via Docker Compose.
- API unit tests and CI validation workflow.
- One-command smoke test to verify API readiness + CRUD.

## Quick start (full OS stack)
```bash
cp .env.example .env
make up
make smoke
```
