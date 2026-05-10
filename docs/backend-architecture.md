# Backend Architecture (Microservice-Ready)

## Core Services
1. API Gateway (AuthN/Z, rate-limit, tenant isolation)
2. Archive Service (documents, versions, metadata, retention)
3. Workflow Service (approvals, routing, signatures)
4. AI Service (OCR/NLP/classification/risk/compliance)
5. Search Service (Elasticsearch index + semantic vectors)
6. Compliance Service (law checks, policy drift, alerts)
7. Security Service (audit trails, SIEM forwarding, anomaly feed)

## Messaging
- Redis + BullMQ queues:
  - `ocr.jobs`
  - `semantic.indexing.jobs`
  - `retention.prediction.jobs`
  - `anomaly.monitoring.jobs`

## Security Model
- JWT access token + refresh token rotation
- RBAC with inheritance from organization -> branch -> department
- MFA-ready fields and challenge pipeline
- Audit logs on every critical action
