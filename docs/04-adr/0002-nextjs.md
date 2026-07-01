# ADR-0002: Next.js App Router

- **Status:** Accepted
- **Date:** 2026-07-01

## Context

The platform requires SEO-friendly portfolio pages, server-side data access, streaming AI chat, and strong React ecosystem support. `apps/web` already uses Next.js 16 with the App Router.

## Decision

Use **Next.js App Router** as the sole routing and rendering framework for `apps/web`:

- Server Components by default
- Server Actions for mutations where appropriate
- `output: "standalone"` for Docker deployment
- Feature-based modules under `apps/web/features/`
- Route handlers only when Server Actions are insufficient (e.g., streaming SSE)

## Consequences

### Positive

- Integrated SSR/SSG/ISR and metadata APIs
- Colocated routing with React Server Components
- Strong Vercel/Node deployment story (standalone output already configured)
- Streaming support for digital twin

### Negative

- App Router mental model differs from Pages Router
- Client boundary discipline required to avoid bundle bloat
- Some libraries still client-only

### Neutral

- `apps/docs` may remain a thin separate app for experimentation

## Alternatives

### Alternative 1: Pages Router

- **Pros:** Mature patterns; extensive legacy docs
- **Cons:** Not the default path for new Next.js features
- **Why rejected:** Greenfield App Router aligns with long-term Next.js direction

### Alternative 2: Remix / React Router framework

- **Pros:** Strong data APIs
- **Cons:** Migration from existing Next scaffold; different deploy assumptions
- **Why rejected:** Next.js already in place with Docker pipeline

### Alternative 3: SPA (Vite + React only)

- **Pros:** Simple client deploy
- **Cons:** Poor SEO defaults; more custom SSR work for content site
- **Why rejected:** Portfolio is content- and SEO-critical

## References

- [Frontend Architecture](../01-architecture/frontend.md)
- [ADR-0001: Monorepo](./0001-monorepo.md)
