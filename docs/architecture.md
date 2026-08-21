# Architecture notes

LedgerFlow follows a small modular-monolith shape. The goal is to keep the deployment simple while preserving boundaries that can scale with the codebase.

## Backend boundaries

- **Controllers** translate HTTP input/output.
- **Services** own reconciliation and audit business rules.
- **Data** owns EF Core mappings and database access.
- **DTOs** define the public API contract.

## Data model

`Transaction` is the aggregate root for the primary workflow. Reconciliation changes its status and creates an `AuditEvent` in the same unit of work. The audit table is append-only from the application's perspective.

## Reliability

The API exposes liveness and database readiness checks. Mutating endpoints return explicit status codes and ProblemDetails. A production deployment would add idempotency, distributed tracing, and authentication at the edge.
