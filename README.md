# OSAI — AI Smart Archive Operating System

## Backend + AI infrastructure now included
- Security-hardened API runtime with CORS, rate limits, and graceful shutdown.
- Core CRUD APIs for documents, workflows, and organizations.
- AI infrastructure APIs:
  - `GET/POST /api/v1/ai/jobs`
  - `POST /api/v1/ai/jobs/:id/run`
  - `GET /api/v1/ai/insights`
  - `GET /api/v1/ai/vectorize?q=...&compare=...`
- AI modules now include job queueing, execution, insights generation, embeddings, and similarity scoring.
- Full web OS module pages remain available and linked.

## Run
```bash
cp .env.example .env
make up
make smoke
```
