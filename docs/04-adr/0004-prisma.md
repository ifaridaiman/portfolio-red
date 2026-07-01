# ADR-0004: Prisma with PostgreSQL

- **Status:** Accepted
- **Date:** 2026-07-01

## Context

The platform stores projects, articles, contact submissions, chat sessions, AI usage, receipts, and admin data. We need relational integrity, migrations, type-safe access from TypeScript, and compatibility with pgvector for RAG.

## Decision

Use **PostgreSQL** as the primary database and **Prisma** as the ORM in `packages/database`:

- Single `schema.prisma` as schema source of truth
- Prisma Migrate for versioned migrations
- `DATABASE_URL` for runtime; `DIRECT_URL` for migrations when using poolers
- Export singleton Prisma client from `@repo/database`
- Enable `pgvector` extension via migration (see ADR-0005)

## Consequences

### Positive

- Strong TypeScript types generated from schema
- Mature migration workflow
- PostgreSQL supports relational data and vector extension in one DB
- Prisma works well with Next.js Server Components and Server Actions

### Negative

- Prisma bundle size and cold start considerations
- Complex raw SQL (vector search) may bypass Prisma query API
- Schema changes require migration discipline

### Neutral

- SQLite considered only for local quickstart; production remains PostgreSQL

## Alternatives

### Alternative 1: Drizzle ORM

- **Pros:** Lighter; SQL-close API
- **Cons:** Team familiarity; less codegen ergonomics for some
- **Why rejected:** Prisma specified; excellent DX for monorepo client sharing

### Alternative 2: MongoDB

- **Pros:** Flexible documents
- **Cons:** Weaker relational modeling; separate vector DB likely needed
- **Why rejected:** Relational content model fits portfolio CMS

### Alternative 3: Supabase client only (no Prisma)

- **Pros:** Auth + DB + storage integrated
- **Cons:** Tighter vendor coupling; less portable SQL migrations in repo
- **Why rejected:** Self-hosted EC2/Docker path favors portable Prisma + Postgres

## References

- [Database Architecture](../01-architecture/database.md)
- [ADR-0005: RAG](./0005-rag.md)
- [Deployment](../07-deployment/deployment.md)
