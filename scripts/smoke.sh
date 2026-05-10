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

echo "OSAI API smoke test passed"
