# Analytics — Technical Specification

## Purpose

Technical implementation guide for **Analytics** in the monorepo.

## Scope

Architecture, data flow, APIs, and integration points. Does not duplicate global standards — references them.

## Responsibilities

| Layer | Implementation |
|-------|----------------|
| Routes | `apps/web/app/...` |
| Feature code | `apps/web/features/analytics/` |
| Shared UI | `@repo/ui` |
| Data | `@repo/database` via Server Components / Actions |

## Routes

`/admin/analytics`

## Module Structure

```text
features/analytics/
├── components/
├── actions/          # Server Actions (if needed)
├── queries/          # Data access
├── hooks/            # Client hooks (if needed)
├── types.ts
└── utils.ts
```

## Data Model

Refer to [database.md](../../01-architecture/database.md). Feature-specific models will be added during M1/M2 implementation.

## Server vs Client

- **Server Components:** Default for pages and read-only UI
- **Client Components:** Forms with rich client validation, chat, interactive filters

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

- Export public API from `features/analytics/index.ts`
- Co-locate tests with `queries` and `utils`
- Log significant events (see [observability.md](../../08-observability/observability.md))

## Examples

See [acceptance.md](./acceptance.md) for testable technical outcomes.

## Anti-patterns

- Fetching secrets in Client Components
- Direct LLM SDK calls outside AI gateway (digital-twin)
- Duplicating Prisma queries across multiple components

## Future Improvements

Listed in [tasks.md](./tasks.md) under "Future" section.

## References

- [Frontend Architecture](../../01-architecture/frontend.md)
- [Monorepo](../../01-architecture/monorepo.md)
- [Brief](./brief.md) · [UX](./ux.md) · [Acceptance](./acceptance.md)
