# ADR-0006: Layered Architecture (Use Case, Service, Repository)

- **Status:** Accepted
- **Date:** 2026-07-01

## Context

The AI Engineering Portfolio Platform must demonstrate production engineering practices: testable business logic, clear separation of concerns, and maintainability as features grow (projects, articles, digital twin, admin, analytics, receipts).

Next.js App Router encourages colocation, which risks business logic leaking into pages, Server Actions, and components. Prisma access from UI layers creates tight coupling and untestable code.

The [Engineering Architecture](../01-architecture/engineering-architecture.md) brief defines a layered flow: Page → Use Case → Service → Repository → Prisma → PostgreSQL.

## Decision

Adopt a **layered architecture** inside `apps/web/features/` with shared persistence in `packages/database`:

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Page / Route Handler | `app/` | Compose UI; HTTP entry |
| Server Action | `features/*/actions/` | Validate (Zod); invoke use case; return response |
| Use Case | `features/*/use-cases/` | Orchestrate workflows across services |
| Service | `features/*/services/` | Business rules; framework-agnostic |
| Repository | `packages/database/src/repositories/` | Data access; transactions; mapping |
| Prisma | `packages/database/prisma/` | Infrastructure ORM |

**Rules:**

- UI (pages, layouts, components) never imports Prisma
- Services never import React
- Repositories contain no business rules or authorization
- Validation (Zod) runs before use cases
- AI calls only through `@repo/ai` gateway, invoked from services/use cases — never from components

## Consequences

### Positive

- Business logic unit-testable without Next.js or database
- Consistent patterns across all features for agents and humans
- Repositories reusable across future apps via `@repo/database`
- Thin pages and actions improve readability

### Negative

- More files per feature than naive colocation
- Learning curve for contributors used to "fat" Server Actions
- Read-only pages may use service/repository directly when no orchestration is needed (documented exception)

### Neutral

- `queries/` folder allowed for simple Server Component reads that call repositories without side effects

## Alternatives

### Alternative 1: Fat Server Actions + colocated Prisma

- **Pros:** Fewer files; fast prototyping
- **Cons:** Untestable logic; Prisma coupled to HTTP layer; violates portfolio quality bar
- **Why rejected:** Conflicts with engineering architecture goals

### Alternative 2: Full Clean Architecture / DDD with entities and value objects everywhere

- **Pros:** Maximum rigor
- **Cons:** Over-engineering for single-tenant portfolio v1
- **Why rejected:** Simplicity principle — layers without exhaustive DDD ceremony

### Alternative 3: tRPC or separate BFF API layer

- **Pros:** Clear API boundary
- **Cons:** Extra hop; Server Actions sufficient for this product
- **Why rejected:** Unnecessary complexity for monolithic Next.js deploy

## References

- [Engineering Architecture](../01-architecture/engineering-architecture.md)
- [Database Architecture](../01-architecture/database.md)
- [ADR-0004: Prisma](./0004-prisma.md)
