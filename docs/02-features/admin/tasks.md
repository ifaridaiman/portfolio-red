# Admin Dashboard — Tasks

## Purpose

Actionable work breakdown for implementing **Admin Dashboard**.

## Scope

Engineering tasks for this feature. Milestone: **M4** per [roadmap](../../00-product/roadmap.md).

## Responsibilities

| Role | Responsibility |
|------|----------------|
| Implementing agent | Execute tasks in order where dependencies exist |
| Architect | Unblock cross-cutting decisions via ADRs |

## Prerequisites

- [ ] Read [brief.md](./brief.md), [ux.md](./ux.md), [technical.md](./technical.md), [acceptance.md](./acceptance.md)
- [ ] Dependent platform work for milestone M4 is complete

## Implementation Tasks

### Setup

- [ ] Create `apps/web/features/admin/` module structure
- [ ] Add route(s) under `apps/web/app/`
- [ ] Add navigation entry if public-facing

### Core

- [ ] Implement primary UI per ux.md
- [ ] Implement data layer (queries, actions) per technical.md
- [ ] Wire shared components from `@repo/ui`
- [ ] Add metadata and SEO tags

### Quality

- [ ] Unit tests for validation and utilities
- [ ] Integration tests for data mutations/queries
- [ ] E2E test for primary user flow
- [ ] a11y audit (axe/Lighthouse)
- [ ] Verify all [acceptance.md](./acceptance.md) criteria

### Documentation

- [ ] Update technical.md if implementation diverges
- [ ] Add env vars to `.env.example` if new

## Dependencies

Auth, database, all content features

## Future Tasks

- Enhancements post-v1 (deferred):
  - Advanced filtering / search (if applicable)
  - Internationalization
  - Enhanced analytics hooks

## Best Practices

- One PR per vertical slice when possible
- Mark tasks done in PR descriptions for traceability

## Examples

Task order: route shell → Server Component data → UI → Client interactivity → tests.

## Anti-patterns

- Large PR implementing multiple features at once
- Tasks without link to acceptance criteria

## References

- [Development Workflow](../../06-development/workflow.md)
- [Checklist](../../06-development/checklist.md)
- [Brief](./brief.md)
