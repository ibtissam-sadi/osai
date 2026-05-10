# OSAI — AI Smart Archive Operating System

## AI backend infrastructure (fully wired)
- AI Analysis API: `POST /api/v1/ai/analyze`
- AI Job orchestration: `GET/POST /api/v1/ai/jobs`, `POST /api/v1/ai/jobs/:id/run`
- AI outputs: `GET /api/v1/ai/insights`, `GET /api/v1/ai/recommendations`
- Semantic/vector API: `GET /api/v1/ai/vectorize?q=...&compare=...`
- AI internals include classification, summary generation, duplicate hinting, risk/compliance scoring, entities extraction, and recommendation generation.

## Web AI center
- `app/ai-command-center` now executes live analyze and queue/run operations against API and displays real results.

## Run
```bash
cp .env.example .env
make up
make smoke
```
