# Engineering Principles

## Purpose

Establish shared engineering values that guide technical decisions, code review, and AI agent behavior across the AI Engineering Portfolio Platform.

## Scope

Applies to all code, infrastructure, documentation, and AI systems in this repository. Feature-specific trade-offs must still align with these principles.

## Responsibilities

| Role | Responsibility |
|------|----------------|
| All contributors | Apply principles in daily work |
| Reviewer agent / humans | Reject changes that violate principles without documented exception |
| Architect agent | Resolve conflicts between principles via ADRs |

---

## Principles

### 1. Simplicity First

Choose the simplest solution that meets requirements. Prefer boring, well-understood technology over clever abstractions.

- One clear way to do common tasks (fetch data, handle errors, style components).
- Delete code and dependencies that no longer earn their keep.

### 2. Reusable Over Duplicated

Extract shared logic into `packages/` when a second consumer appears — not before.

- `@repo/ui` for presentation primitives
- `@repo/database` for Prisma client and queries
- `@repo/ai` for gateway, prompts, and retrieval

Duplication across features is acceptable temporarily; premature abstraction is not.

### 3. Accessibility by Default

WCAG 2.2 AA is the baseline, not a retrofit.

- Semantic HTML, keyboard navigation, focus management, sufficient contrast.
- Motion respects `prefers-reduced-motion`.
- AI chat interfaces must be screen-reader friendly (live regions, labels).

### 4. Security by Default

- Validate all inputs at trust boundaries (Server Actions, API routes, webhooks).
- Secrets only in server environment; never in client bundles.
- Admin routes require authentication; default deny.
- Rate limit public AI endpoints.

### 5. Observability by Default

- Structured logging with correlation IDs.
- Metrics for latency, errors, and AI token usage.
- Traces across HTTP → AI gateway → database where feasible.

If it runs in production, it must be diagnosable without SSH guesswork.

### 6. AI Transparency

- Clearly label AI-generated UI and chat responses.
- Attribute factual claims to retrieved sources.
- Log model, token counts, and retrieval context server-side (not exposed to clients in full).

Visitors should trust the digital twin because it is grounded, not because it sounds confident.

### 7. Documentation-First

- Feature `brief.md` and `acceptance.md` before substantial implementation.
- ADRs for architectural forks.
- Update docs in the same PR as behavior changes.

Documentation is a deliverable, not a follow-up ticket.

### 8. Feature-First Architecture

Organize `apps/web` by product feature, not purely by technical type:

```
apps/web/
  features/
    landing/
    portfolio/
    projects/
    articles/
    digital-twin/
    ...
```

Shared `components/`, `lib/`, and `packages/` support features — features do not sprawl anonymously in `app/`.

### 9. Progressive Enhancement

- Core content (projects, articles, contact) renders without client JavaScript where possible.
- AI streaming and rich interactions enhance; they do not block reading.
- Graceful degradation when AI provider is unavailable.

### 10. Performance as a Feature

- Server Components by default; Client Components only when needed.
- Optimize images, fonts, and bundle size continuously.
- Set budgets: LCP < 2.5s, CLS < 0.1 on key pages.

### 11. Test What Matters

- Unit test business logic and utilities.
- Integration test API/Server Actions and database queries.
- E2E test critical user journeys (landing → project, digital twin chat).
- Do not test implementation details or framework internals.

### 12. Consistent Developer Experience

- One package manager (`pnpm`), one monorepo tool (`turbo`), one formatter (`prettier`).
- Shared ESLint and TypeScript configs from `packages/`.
- Scripts and env vars documented in `docs/07-deployment/deployment.md`.

## Best Practices

- When two principles conflict, document the trade-off in an ADR (e.g., simplicity vs. observability depth).
- Reference the relevant principle in PR descriptions for non-obvious decisions.
- Agents should cite principles when proposing architectural changes.

## Examples

| Situation | Principle applied |
|-----------|-------------------|
| Adding a third slightly different Button | Reusable over duplicated — extend `@repo/ui` |
| Shipping chat without source links | AI transparency — blocked |
| Skipping migration for "quick fix" | Simplicity first — still use Prisma migrations |
| Client-side only article list | Progressive enhancement — Server Component list first |

## Anti-patterns

- "We'll document it later" — violates documentation-first.
- Copy-pasting Prisma queries into every feature — violates reusable over duplicated.
- `any` types to silence TypeScript — violates simplicity (debt compounds).
- Unguarded public LLM endpoints — violates security by default.

## Future Improvements

- Automated PR checks that link changed routes to feature acceptance files.
- Principle-weighted lint rules (e.g., flag Client Components in server-eligible trees).

## References

- [Vision](./vision.md)
- [Code Style](../05-standards/code-style.md)
- [Frontend Standards](../05-standards/frontend-standards.md)
- [AI Standards](../05-standards/ai-standards.md)
- [ADR Index](../04-adr/README.md)
