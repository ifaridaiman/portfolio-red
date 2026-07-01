# Receipt Tracking — Technical Specification

## Purpose

Technical implementation guide for **Receipt Tracking** in the monorepo.

## Scope

Architecture, data flow, APIs, and integration points. Does not duplicate global standards — references them.

## Responsibilities

| Layer | Implementation |
|-------|----------------|
| Routes | `apps/web/app/...` |
| Feature code | `apps/web/features/receipt/` |
| Shared UI | `@repo/ui` |
| Data | `@repo/database` via Server Components / Actions |

## Routes

`/admin/receipts`

## Module Structure

Per [engineering-architecture.md](../../01-architecture/engineering-architecture.md):

```text
features/receipt/
├── components/       # Organisms+ (business UI)
├── services/         # Business rules
├── use-cases/        # Application orchestration
├── hooks/            # Client interaction
├── schemas/          # Zod validation
├── actions/          # Thin Server Actions
├── types/
├── constants/
├── utils/
├── tests/
└── assets/
```

## Data Model

Repositories in `@repo/database`; services consume repositories. See [database.md](../../01-architecture/database.md).

## Layer Flow

```text
Page → Use Case → Service → Repository → Prisma
```

## Server vs Client

- **Server Components:** Default; call use cases for data
- **Client Components:** Interaction only — no business logic or Prisma

## API / Server Actions

- Mutations via Server Actions with `zod` validation
- Rate limiting on public mutations (contact, chat)
- Structured error returns: `{ success: false, error: string }`

## Performance

- Target LCP < 2.5s on key pages
- Image optimization via `next/image`
- Minimize client bundle for this feature (analyze with `@next/bundle-analyzer`)

## Security

- Validate all inputs server-side
- Sanitize user-generated HTML output
- Admin-only routes behind auth middleware

## Best Practices

- Export public API from `features/receipt/index.ts`
- Co-locate tests with `queries` and `utils`
- Log significant events (see [observability.md](../../08-observability/observability.md))

## Examples

See [acceptance.md](./acceptance.md) for testable technical outcomes.

## Anti-patterns

- Fetching secrets in Client Components
- Direct LLM SDK calls outside AI gateway (digital-twin)
- Prisma or business logic in components
- Duplicating business logic across features

## Future Improvements

Listed in [tasks.md](./tasks.md) under "Future" section.

## References

- [Engineering Architecture](../../01-architecture/engineering-architecture.md)
- [Frontend Architecture](../../01-architecture/frontend.md)
- [Monorepo](../../01-architecture/monorepo.md)
- [Brief](./brief.md) · [UX](./ux.md) · [Acceptance](./acceptance.md)
