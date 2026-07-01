# Database Architecture

## Purpose

Define the data layer: Prisma ORM, PostgreSQL, pgvector extension, schema organization, and migration strategy.

## Scope

Covers `packages/database` (planned) and PostgreSQL usage across the platform. AI-specific retrieval tables are shared with [rag.md](./rag.md).

## Responsibilities

| Component | Responsibility |
|-----------|----------------|
| Prisma schema | Single source of truth for models and relations |
| Migrations | Versioned SQL applied in order |
| Prisma Client | Type-safe queries from apps and packages |
| PostgreSQL | Primary datastore |
| pgvector | Vector similarity for RAG |
| Seed scripts | Development and demo data |

---

## Technology Stack

| Tool | Version / Notes |
|------|-----------------|
| PostgreSQL | 16+ recommended |
| pgvector | Extension for `vector` columns |
| Prisma | Latest stable compatible with Next.js |
| Connection | `DATABASE_URL` via connection pooler in production (e.g., PgBouncer) |

---

## Package Layout (target)

```text
packages/database/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── client.ts          # Singleton Prisma client
│   ├── queries/           # Shared query modules (optional)
│   └── index.ts
└── package.json
```

Export `@repo/database` for use in `apps/web` and `packages/ai`.

---

## Schema Organization

Models grouped by domain in `schema.prisma` using comments or multiple files (Prisma multi-file schema when enabled):

### Content

- `Project` — Portfolio projects (slug, title, body, status, publishedAt)
- `Article` — Blog posts / articles (MDX source, metadata)
- `Tag`, `ProjectTag`, `ArticleTag` — Tagging

### Contact & engagement

- `ContactSubmission` — Contact form entries
- `AnalyticsEvent` — Page views, custom events (privacy-conscious)

### AI / RAG

- `KnowledgeChunk` — Text chunks + `embedding` vector + source metadata
- `ChatSession` — Anonymous or identified sessions
- `ChatMessage` — Role, content, chunkIds used
- `AiUsage` — Token counts and cost per request

### Admin & ops

- `User` — Admin users (auth provider linkage)
- `Receipt` — Receipt tracking for portfolio owner operations
- `SiteSetting` — Key-value configuration

### Example (abbreviated)

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  extensions = [vector]
}

model Project {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String?
  body        String
  status      ContentStatus @default(DRAFT)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model KnowledgeChunk {
  id         String   @id @default(cuid())
  sourceType String
  sourceId   String
  sourceUrl  String
  title      String
  chunkIndex Int
  content    String
  embedding  Unsupported("vector(1536)")?
  createdAt  DateTime @default(now())

  @@index([sourceType, sourceId])
}

enum ContentStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

> **Note:** pgvector fields may use `Unsupported` type or native Prisma vector support as it evolves. Create indexes via raw SQL migration:

```sql
CREATE INDEX ON knowledge_chunks USING ivfflat (embedding vector_cosine_ops);
```

---

## Migration Strategy

### Rules

1. **Never** edit applied migrations — add new migration instead
2. Name migrations descriptively: `20250101_add_knowledge_chunks`
3. Review SQL for destructive changes before production
4. Run `prisma migrate deploy` in CI/CD before app rollout
5. Keep migrations backward-compatible when rolling deploys (expand-contract pattern)

### Workflows

| Environment | Command |
|-------------|---------|
| Local dev | `pnpm prisma migrate dev` |
| CI / staging / prod | `pnpm prisma migrate deploy` |
| Reset local only | `pnpm prisma migrate reset` |

### pgvector setup

First migration enables extension:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

---

## Access Patterns

| Pattern | Location |
|---------|----------|
| Simple CRUD in one feature | `features/*/queries/*.ts` calling Prisma |
| Shared complex queries | `packages/database/src/queries/` |
| Transactions | `prisma.$transaction()` in Server Actions |
| Vector search | Raw SQL via `$queryRaw` with parameterized embeddings |

### Client singleton

```typescript
// packages/database/src/client.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["error", "warn"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `DIRECT_URL` | Direct connection for migrations (bypass pooler) |

Document all vars in `.env.example` at repo root.

---

## Best Practices

- Use `cuid()` or `uuid()` for public IDs; slugs for URLs with unique constraints.
- Index foreign keys and frequent filter columns (`status`, `publishedAt`, `slug`).
- Soft-delete via `status` enum where audit trail matters.
- Never expose Prisma client to Client Components.
- Use `select` and `include` intentionally to avoid over-fetching.

## Examples

**Publish article:** Update `status` and `publishedAt`, trigger RAG ingestion job.

**Contact form:** Insert `ContactSubmission` in Server Action with rate limit check.

## Anti-patterns

- Raw SQL string concatenation (SQL injection risk).
- Storing embeddings as JSON blobs without pgvector indexes.
- Multiple Prisma schema files diverging across apps.
- Running `migrate dev` in production.

## Future Improvements

- Read replicas for analytics queries
- Prisma multi-schema or domain-split schemas if model count grows large
- Automated migration lint in CI
- Field-level encryption for sensitive receipt data

## References

- [ADR-0004: Prisma + PostgreSQL](../04-adr/0004-prisma.md)
- [ADR-0005: RAG with pgvector](../04-adr/0005-rag.md)
- [RAG Architecture](./rag.md)
- [Monorepo](./monorepo.md)
- [Deployment](../07-deployment/deployment.md)
