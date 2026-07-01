# Articles — Brief

## Purpose

Technical writing and thought leadership with list and detail views, MDX rendering.

## Scope

This feature covers user-facing and admin-facing capabilities for **articles** within `apps/web`. Out-of-scope items are listed in each sibling document.

## Responsibilities

| Area | Owner |
|------|-------|
| Product behavior | Defined in this folder's `ux.md` and `acceptance.md` |
| Implementation | `apps/web/features/articles/` |
| Data model | See [database.md](../../01-architecture/database.md) |
| AI (if applicable) | See [ai.md](../../01-architecture/ai.md) |

## Problem Statement

Visitors need a clear, credible way to engage with **articles** as part of the AI Engineering Portfolio Platform. This feature must align with [engineering principles](../../00-product/engineering-principles.md): accessible, performant, and observable.

## Target Users

Engineers, learners, peers

## Key Dependencies

Database, MDX pipeline, RAG ingestion

## Success Criteria

- Meets all criteria in [acceptance.md](./acceptance.md)
- Documented in architecture and standards before implementation
- No regression to global Lighthouse/accessibility baselines

## Best Practices

- Start from `acceptance.md` when implementing.
- Keep routes thin; colocate logic under `features/articles/`.
- Reference [roadmap](../../00-product/roadmap.md) milestone for delivery timing.

## Examples

Primary user journey for **Articles** is documented in [ux.md](./ux.md).

## Anti-patterns

- Building UI before acceptance criteria are agreed.
- Hardcoding content that should be database-driven (where applicable).
- Bypassing shared design tokens from [design-system.md](../../05-standards/design-system.md).

## Future Improvements

See [technical.md](./technical.md) and [tasks.md](./tasks.md).

## References

- [Vision](../../00-product/vision.md)
- [Frontend Architecture](../../01-architecture/frontend.md)
- [UX](./ux.md) · [Technical](./technical.md) · [Acceptance](./acceptance.md) · [Tasks](./tasks.md)
