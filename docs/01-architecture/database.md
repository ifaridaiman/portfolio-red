# Database Architecture

## Purpose

Define the data layer: Prisma ORM, PostgreSQL, pgvector extension, schema organization, and migration strategy.

## Scope

Covers `packages/database` (planned) and PostgreSQL usage across the platform. **Layering rules:** [engineering-architecture.md](./engineering-architecture.md). AI-specific retrieval tables are shared with [rag.md](./rag.md).

## Responsibilities

| Component | Responsibility |
|-----------|----------------|
| Prisma schema | Single source of truth for models and relations |
| Migrations | Versioned SQL applied in order |
| Repositories | Intent-based data access; isolate Prisma from features |
| Prisma Client | Type-safe queries — used only inside repositories |
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
│   ├── client.ts              # Singleton Prisma client
│   ├── repositories/
│   │   ├── project.repository.ts
│   │   ├── article.repository.ts
│   │   ├── chat.repository.ts
│   │   └── ...
│   └── index.ts
└── package.json
```

Export `@repo/database` for use in feature **services** (via repositories). **Never** export Prisma client for direct use in `apps/web` pages or components.

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

## Repository Pattern

Repositories are the **only** layer that imports Prisma (except infrastructure utilities in `@repo/ai` for vector search).

### Repository responsibilities

- Intent-based query methods (`findPublishedProjects`, `createConversation`)
- Transactions spanning multiple tables
- Mapping Prisma models to domain types when they differ

### Repository prohibitions

- Business rules (e.g., "can publish" — belongs in service)
- Zod validation
- Authorization decisions
- AI prompt construction

```typescript
// packages/database/src/repositories/project.repository.ts
export class ProjectRepository {
  constructor(private readonly db = prisma) {}

  findPublishedProjects() {
    return this.db.project.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    });
  }
}
```

---

## Access Patterns

| Pattern | Location |
|---------|----------|
| Business logic | `features/*/services/` |
| Orchestration | `features/*/use-cases/` |
| Data access | `packages/database/src/repositories/` |
| Transactions | Repository methods or `prisma.$transaction()` inside repositories |
| Vector search | Repository or `@repo/ai` retriever via `$queryRaw` |

**Prohibited:** Prisma imports in `apps/web` pages, components, layouts, or hooks.

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
- Never expose Prisma client to `apps/web` UI layers or Client Components.
- Repositories expose intent-based APIs, not raw Prisma passthrough.
- Use `select` and `include` intentionally to avoid over-fetching.

## Examples

**Publish article:** `PublishArticleUseCase` → `ArticleService.publish()` → `ArticleRepository.updateStatus()` → trigger ingestion.

**Contact form:** `SubmitContactUseCase` → `ContactService` → `ContactRepository.create()` (validation in action before use case).

## Anti-patterns

- Prisma calls in Server Actions beyond passing to use case (action should not query directly)
- Business rules in repositories

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

- [Engineering Architecture](./engineering-architecture.md)
- [ADR-0004: Prisma + PostgreSQL](../04-adr/0004-prisma.md)
- [ADR-0006: Layered Architecture](../04-adr/0006-layered-architecture.md)
- [ADR-0005: RAG with pgvector](../04-adr/0005-rag.md)
- [RAG Architecture](./rag.md)
- [Monorepo](./monorepo.md)
- [Deployment](../07-deployment/deployment.md)
