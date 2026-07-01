# ADR-0001: Monorepo with Turborepo and pnpm

- **Status:** Accepted
- **Date:** 2026-07-01

## Context

The AI Engineering Portfolio Platform includes a public web app, optional docs app, shared UI, database access, and AI packages. We need efficient local development, cached builds, and a single repository for documentation-first workflow. The repository already exists as `portfolio-red` with Turborepo and pnpm scaffolding.

## Decision

Adopt a **monorepo** managed by **Turborepo** and **pnpm workspaces**:

- `apps/web` — production Next.js application
- `apps/docs` — secondary Next.js app (non-production)
- `packages/*` — shared libraries (`ui`, `database`, `ai`, config packages)
- Root `docs/` — project documentation (Markdown, not the `apps/docs` app)

Use `turbo build --filter=web` for production Docker builds.

## Consequences

### Positive

- Shared code without npm publishing
- Task caching and dependency-aware builds
- Single PR can update feature + package + docs
- Aligns with current repository structure

### Negative

- Learning curve for workspace protocols and filters
- CI must understand monorepo paths
- Risk of improper cross-package imports without lint rules

### Neutral

- `apps/docs` remains optional and excluded from production image

## Alternatives

### Alternative 1: Polyrepo (separate repos per app/package)

- **Pros:** Independent deploy cycles
- **Cons:** Version sync overhead; harder documentation-first workflow
- **Why rejected:** Single owner portfolio; cohesion outweighs isolation

### Alternative 2: Nx instead of Turborepo

- **Pros:** Richer plugins and graph visualization
- **Cons:** Heavier config; current scaffold is Turborepo
- **Why rejected:** Turborepo already integrated; migration cost unjustified

### Alternative 3: npm/yarn workspaces without Turborepo

- **Pros:** Simpler tooling
- **Cons:** No first-class task pipeline and caching
- **Why rejected:** Build performance matters for CI and Docker

## References

- [Monorepo Architecture](../01-architecture/monorepo.md)
- [Deployment](../07-deployment/deployment.md)
