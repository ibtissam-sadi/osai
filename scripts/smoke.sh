#!/usr/bin/env bash
set -euo pipefail
API_BASE="${1:-http://localhost:4000}"
curl -fsS "$API_BASE/health" >/dev/null
curl -fsS "$API_BASE/api/v1/system/status" >/dev/null
curl -fsS -X POST "$API_BASE/api/v1/ai/analyze" -H 'Content-Type: application/json' -d '{"documentId":"DOC-42","text":"Finance budget report"}' >/dev/null
JOB_ID=$(curl -fsS -X POST "$API_BASE/api/v1/ai/jobs" -H 'Content-Type: application/json' -d '{"documentId":"DOC-42","type":"embedding"}' | sed -n 's/.*"id":"\([^"]*\)".*/\1/p')
curl -fsS -X POST "$API_BASE/api/v1/ai/jobs/$JOB_ID/run" >/dev/null
curl -fsS "$API_BASE/api/v1/ai/insights" >/dev/null
curl -fsS "$API_BASE/api/v1/ai/recommendations" >/dev/null
curl -fsS "$API_BASE/api/v1/ai/vectorize?q=archive&compare=records" >/dev/null
echo "OSAI API smoke test passed"
