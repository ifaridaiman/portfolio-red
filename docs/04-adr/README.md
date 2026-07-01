# Architecture Decision Records (ADR)

## Purpose

Index and process for recording significant architectural decisions in the AI Engineering Portfolio Platform.

## Scope

All ADRs live in `docs/04-adr/`. New decisions use [template.md](./template.md).

## Responsibilities

| Role | Responsibility |
|------|----------------|
| Architect agent / tech lead | Author and maintain ADRs |
| All engineers | Read relevant ADRs before implementing |
| Reviewer | Ensure ADR exists when PR introduces architectural forks |

---

## ADR Index

| ID | Title | Status |
|----|-------|--------|
| [0001](./0001-monorepo.md) | Monorepo with Turborepo and pnpm | Accepted |
| [0002](./0002-nextjs.md) | Next.js App Router for web application | Accepted |
| [0003](./0003-shadcn.md) | shadcn/ui + Tailwind for design system | Accepted |
| [0004](./0004-prisma.md) | Prisma with PostgreSQL | Accepted |
| [0005](./0005-rag.md) | RAG with pgvector in PostgreSQL | Accepted |
| [0006](./0006-layered-architecture.md) | Layered architecture (use case, service, repository) | Accepted |

---

## Status Definitions

| Status | Meaning |
|--------|---------|
| **Proposed** | Under discussion; do not implement as standard yet |
| **Accepted** | Active decision; implementations should conform |
| **Deprecated** | Superseded; do not use for new work |
| **Superseded** | Replaced by another ADR (link included) |

---

## When to Write an ADR

Write an ADR when a decision:

- Is hard to reverse (database, auth provider, deployment target)
- Affects multiple packages or features
- Has meaningful trade-offs worth preserving
- Will confuse future contributors if undocumented

Skip ADRs for routine feature work that follows existing patterns.

---

## Process

1. Copy [template.md](./template.md) to `NNNN-short-title.md`
2. Fill Context, Decision, Consequences, Alternatives
3. Set status to Proposed; discuss in PR
4. Merge with status Accepted when agreed
5. Update this README index

Number sequentially with zero padding (`0006-...`).

---

## Best Practices

- Keep ADRs concise (1–2 pages)
- Link to related docs instead of duplicating
- Date and author optional but encouraged
- Do not delete ADRs; mark Deprecated/Superseded

## Examples

Adding Redis for caching → new ADR 0006.

Bump Next.js minor version → no ADR unless breaking App Router patterns.

## Anti-patterns

- ADRs without alternatives section
- Implementing before ADR is Accepted (for major forks)
- Stale Accepted ADRs that no longer match code (update or supersede)

## Future Improvements

- ADR lint in CI (index matches files)
- Link ADRs from `package.json` or codegen comments

## References

- [Template](./template.md)
- [Engineering Principles](../00-product/engineering-principles.md)
- [Architect Agent](../03-agents/architect.md)
