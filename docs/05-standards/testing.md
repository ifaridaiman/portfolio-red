# Testing Standards

## Purpose

Define testing strategy, tools, and quality gates for unit, integration, E2E, accessibility, and performance testing.

## Scope

All application and package code in the monorepo. QA agent uses this document for validation workflows.

## Responsibilities

| Role | Responsibility |
|------|----------------|
| Feature implementers | Write tests for new behavior |
| QA agent | Maintain suites and sign-off against acceptance |
| CI | Block merge on failing required checks |

---

## Unit Testing

**Tool:** Vitest (target)

**Scope:**

- Pure functions (formatters, slugify, token budget helpers)
- Zod schemas and validation logic
- Prompt builder string assembly (snapshot or assertion)
- React hooks with `@testing-library/react` (client hooks only)

**Conventions:**

- Files: `*.test.ts` / `*.test.tsx` colocated
- No network or database in unit tests
- Mock dates and IDs for determinism

```typescript
import { describe, it, expect } from "vitest";
import { truncateHistory } from "./truncate-history";

describe("truncateHistory", () => {
  it("drops oldest messages when over token budget", () => {
    // ...
  });
});
```

---

## Integration Testing

**Tool:** Vitest + test PostgreSQL (Docker) or ephemeral DB

**Scope:**

- Prisma queries and Server Actions
- RAG ingestion writing chunks
- Contact form persistence
- Auth middleware on admin routes

**Conventions:**

- Reset DB between tests (`prisma migrate reset` or transactions)
- Seed minimal fixtures per test file
- Use test `DATABASE_URL` only

---

## End-to-End Testing

**Tool:** Playwright

**Critical paths (minimum):**

1. Landing → Projects → Project detail
2. Landing → Articles → Article detail
3. Contact form submission success
4. Digital twin: send message → receive streamed reply (mock provider in CI)
5. Admin login → edit project → visible on public site (when implemented)

**Conventions:**

- `tests/e2e/` in `apps/web` or root
- Run against `pnpm build && pnpm start` in CI
- Prefer `getByRole` selectors
- Record traces on failure

---

## Accessibility Testing

| Method | When |
|--------|------|
| axe-core (Playwright or jest-axe) | CI on changed routes |
| Lighthouse a11y | Release checklist |
| Manual keyboard + SR smoke | Major UI changes |

**Thresholds:**

- Zero **critical** axe violations
- Lighthouse accessibility ≥ 95 on landing, content detail, chat

---

## Performance Testing

| Method | When |
|--------|------|
| Lighthouse CI (lab) | PR on `apps/web` |
| Bundle analysis | Dependency upgrades |
| k6 or artillery (optional) | Chat endpoint load before high-traffic launch |

**Budgets (lab):**

- Performance score ≥ 90 on landing
- LCP < 2.5s
- CLS < 0.1

---

## AI / Eval Testing

- Golden dataset: questions + expected source IDs
- Assert citations present for factual questions
- Assert refusal when question outside corpus
- Run separately from unit tests (may call provider or use recordings)

---

## CI Integration (target)

```yaml
# Conceptual pipeline jobs
- lint
- check-types
- unit + integration (Vitest)
- e2e (Playwright)
- lighthouse (optional on main)
```

---

## Best Practices

- Test behavior, not implementation
- One assertion focus per test when possible
- Fix flaky tests immediately — do not retry blindly
- Add regression test for every production bug fix

## Examples

**Unit:** `contactSchema` rejects empty email.

**E2E:** Submit contact form → see thank you message.

**a11y:** Chat input has accessible name.

## Anti-patterns

- 100% coverage mandate on trivial getters
- E2E testing every edge case (use unit/integration instead)
- Live OpenAI calls on every PR without mocks

## Future Improvements

- Visual regression (Chromatic / Percy)
- Contract tests for AI stream events
- Mutation testing on critical utils

## References

- [QA Agent](../03-agents/qa.md)
- [Feature Acceptance](../02-features/)
- [Development Checklist](../06-development/checklist.md)
- [Observability](../08-observability/observability.md)
