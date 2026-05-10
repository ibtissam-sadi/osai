#!/usr/bin/env bash
set -euo pipefail

API_BASE="${1:-http://localhost:4000}"

curl -fsS "$API_BASE/health" >/dev/null
curl -fsS "$API_BASE/api/v1/auth/token" >/dev/null
curl -fsS "$API_BASE/api/v1/search?q=budget&lang=ar" >/dev/null
curl -fsS "$API_BASE/api/v1/ai/scoring" >/dev/null
curl -fsS "$API_BASE/api/v1/workflows/chain?classification=SECRET" >/dev/null
curl -fsS "$API_BASE/api/v1/retention/predict?category=financial&legalBasis=88-09" >/dev/null
curl -fsS "$API_BASE/api/v1/rbac/check?role=ARCHIVIST&permission=search:read" >/dev/null
curl -fsS "$API_BASE/api/v1/audit/event" >/dev/null

curl -fsS "$API_BASE/api/v1/documents" >/dev/null
curl -fsS -X POST "$API_BASE/api/v1/documents" -H 'Content-Type: application/json' -d '{"id":"DOC-999","title":"Test","department":"IT","status":"Active","language":"EN"}' >/dev/null
curl -fsS -X PUT "$API_BASE/api/v1/documents/DOC-999" -H 'Content-Type: application/json' -d '{"status":"Archived"}' >/dev/null
curl -fsS -X DELETE "$API_BASE/api/v1/documents/DOC-999" >/dev/null

echo "OSAI API smoke test passed"
