# Monorepo Architecture

## Purpose

Describe how the AI Engineering Portfolio Platform is organized as a Turborepo monorepo, including workspace layout, package boundaries, and build strategy.

## Scope

Covers repository structure, Turborepo configuration, and inter-package dependencies. **Primary architecture reference:** [engineering-architecture.md](./engineering-architecture.md). Application-specific frontend patterns are in [frontend.md](./frontend.md).

## Responsibilities

| Package / App | Responsibility |
|---------------|----------------|
| `apps/web` | Production portfolio application |
| `apps/docs` | Internal or public documentation site (optional) |
| `packages/ui` | Shared React components and design primitives |
| `packages/database` | Prisma schema, client, repositories (planned) |
| `packages/ai` | AI gateway, prompts, retrieval (planned) |
| `packages/analytics` | Shared analytics utilities (planned) |
| `packages/content` | MDX parsing, content helpers (planned) |
| `packages/config` | Shared env and app configuration (planned) |
| `packages/types` | Shared domain types (planned) |
| `packages/eslint-config` | Shared ESLint configuration |
| `packages/typescript-config` | Shared TypeScript configuration |
| Root | Workspace scripts, Turborepo pipeline, Docker build |

---

## Turborepo

[Turborepo](https://turbo.build/) orchestrates tasks across workspaces with caching and dependency-aware execution.

### Root configuration

```json
// turbo.json (simplified)
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": { "dependsOn": ["^lint"] },
    "check-types": { "dependsOn": ["^check-types"] },
    "dev": { "cache": false, "persistent": true }
  }
}
```

### Workspace definition

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

**Package manager:** `pnpm@11.9.0` with workspace protocol (`workspace:*`) for internal dependencies.

---

## Workspace Structure

```text
portfolio-red/
├── apps/
│   ├── web/                 # Primary Next.js app (production)
│   └── docs/                # Secondary Next.js app (dev/docs)
├── packages/
│   ├── ui/                  # @repo/ui
│   ├── database/            # @repo/database (planned)
│   ├── ai/                  # @repo/ai (planned)
│   ├── analytics/           # @repo/analytics (planned)
│   ├── content/             # @repo/content (planned)
│   ├── config/              # @repo/config (planned)
│   ├── types/               # @repo/types (planned)
│   ├── eslint-config/       # @repo/eslint-config
│   └── typescript-config/   # @repo/typescript-config
├── docs/                    # Project documentation (this tree)
├── deploy/                  # EC2 Docker Compose + deploy script
├── Dockerfile               # Multi-stage build for apps/web
├── turbo.json
└── pnpm-workspace.yaml
```

---

## Package Responsibilities

### `apps/web`

- Public portfolio, digital twin, contact, and admin (when implemented)
- Next.js App Router, feature-based folders
- Consumes `@repo/ui`, `@repo/database`, `@repo/ai`
- **Production Docker target** (`turbo build --filter=web`)

### `apps/docs`

- Optional documentation or design reference site
- Not included in production Docker image today
- May mirror or link to root `docs/` markdown in future

### `packages/ui`

- shadcn/ui-based components (target state)
- Design tokens, primitives, compound components
- No business logic or data fetching

### `packages/database` (planned)

- Prisma schema and generated client
- **Repositories** for intent-based data access
- Migration history as source of truth for PostgreSQL schema

### `packages/ai` (planned)

- Provider abstraction (OpenAI, Anthropic, etc.)
- Prompt builder, RAG retrieval, streaming helpers
- Token accounting hooks

### `packages/analytics` (planned)

- Event types, aggregation helpers
- Privacy-conscious analytics utilities

### `packages/content` (planned)

- MDX compilation and content parsing
- Shared content transformers for articles/projects

### `packages/config` (planned)

- Validated environment configuration (Zod)
- Shared constants across apps

### `packages/types` (planned)

- Shared domain types not tied to Prisma models

### `packages/eslint-config` & `packages/typescript-config`

- Single source for lint and TS rules across all packages
- Apps extend `next-js` / `nextjs` presets respectively

---

## Dependency Boundaries

```mermaid
flowchart BT
    subgraph apps
        web[apps/web]
        docs[apps/docs]
    end
    subgraph packages
        ui[@repo/ui]
        db[@repo/database]
        ai[@repo/ai]
        eslint[@repo/eslint-config]
        ts[@repo/typescript-config]
    end
    web --> ui
    web --> db
    web --> ai
    docs --> ui
    ui --> ts
    web --> eslint
    db --> ts
    ai --> db
```

| Rule | Enforcement |
|------|-------------|
| `packages/ui` must not import from `apps/*` | ESLint import boundaries |
| `packages/database` must not import from `apps/*` or `packages/ai` | Layering |
| Feature code in `apps/web` must not import Prisma directly | Use repositories |
| `packages/ai` may import `packages/database` for retrieval metadata | Documented exception |
| Apps may import packages; packages never import apps | Strict |
| No circular dependencies between packages | `pnpm` + manual review |

---

## Build Strategy

### Local development

```bash
pnpm install
pnpm dev          # Runs all apps: web :3000, docs :3001
pnpm build        # Builds all packages and apps
pnpm lint
pnpm check-types
```

### Filtered builds

```bash
pnpm exec turbo build --filter=web
pnpm exec turbo dev --filter=web
```

### Production Docker build

1. **deps** — `pnpm install --frozen-lockfile`
2. **builder** — `pnpm turbo build --filter=web`
3. **runner** — Copy Next.js `standalone` output; run `node apps/web/server.js`

`apps/web/next.config.js` sets `output: "standalone"` and `outputFileTracingRoot` to the monorepo root for correct file tracing.

### Caching

- Turborepo caches `build` outputs locally and in CI (when remote cache configured)
- `.env*` files are build inputs — changing env may invalidate cache
- `dev` is never cached

---

## Best Practices

- Add new shared code to `packages/` only when two consumers exist.
- Keep `web` as the only production deploy artifact unless explicitly expanding.
- Run `turbo build --filter=web...` to build web and its dependencies.
- Version internal packages with `workspace:*`; avoid publishing to npm unless open-sourcing.

## Examples

**Adding a shared hook used only in web:** Place in `apps/web/features/.../hooks/` until a second app needs it.

**Adding Prisma:** Create `packages/database`, export `@repo/database`, add as dependency of `web` and `ai`.

## Anti-patterns

- Importing from `apps/web` inside `packages/ui`.
- Duplicating `tsconfig` or ESLint config per app without extending shared presets.
- Building entire monorepo in Docker when only `web` is deployed (use `--filter=web`).

## Future Improvements

- Turborepo remote cache in CI
- `packages/database` and `packages/ai` packages
- Import boundary ESLint plugin (`eslint-plugin-boundaries`)
- Changesets for versioned internal packages if publishing

## References

- [Engineering Architecture](./engineering-architecture.md)
- [ADR-0001: Monorepo with Turborepo](../04-adr/0001-monorepo.md)
- [Frontend Architecture](./frontend.md)
- [Deployment](../07-deployment/deployment.md)
- [Turborepo documentation](https://turbo.build/repo/docs)
