# OSAI — AI Smart Archive Operating System

## AI backend fully configurable (API + pretrained models)
- AI Analysis API: `POST /api/v1/ai/analyze`
- AI Jobs: `GET/POST /api/v1/ai/jobs`, `POST /api/v1/ai/jobs/:id/run`
- AI Outputs: `GET /api/v1/ai/insights`, `GET /api/v1/ai/recommendations`
- Semantic API: `GET /api/v1/ai/vectorize`
- Model Registry APIs:
  - `GET /api/v1/ai/models` (all model options + active mapping)
  - `POST /api/v1/ai/models/activate` (switch model per task)

Supported model modes now:
- `api` models (e.g. OpenAI)
- `pretrained` models (e.g. local/HuggingFace)

## Web AI Command Center
- Includes model/task selectors to activate API or pretrained models per task.
- Includes live analysis and job execution against backend APIs.

## Run
```bash
cp .env.example .env
make up
make smoke
```
