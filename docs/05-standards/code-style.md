# Code Style

## Purpose

Define TypeScript and general code conventions for the AI Engineering Portfolio Platform monorepo.

## Scope

All `apps/*` and `packages/*` TypeScript/JavaScript code. **Architecture layering** is defined in [engineering-architecture.md](../01-architecture/engineering-architecture.md). Frontend-specific UI rules extend [frontend-standards.md](./frontend-standards.md).

## Responsibilities

| Role | Responsibility |
|------|----------------|
| All contributors | Follow these rules in new code |
| Reviewer agent | Enforce in PR review |
| ESLint/Prettier | Automate formatting and selected rules |

---

## TypeScript Rules

- **Strict mode** enabled via `@repo/typescript-config`
- Prefer `interface` for object shapes; `type` for unions/intersections
- Avoid `any`; use `unknown` and narrow with type guards
- Use `satisfies` for const objects needing literal inference
- Explicit return types on exported functions and Server Actions
- Enable `noUncheckedIndexedAccess` (already in base config)

```typescript
// Good — service uses repository, not Prisma in app code
export async function getProject(slug: string): Promise<Project | null> {
  return projectRepository.findBySlug(slug);
}

// Avoid — Prisma in apps/web
export async function getProject(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}
```

---

## Naming Conventions

| Entity | Convention | Example |
|--------|------------|---------|
| Files (components) | kebab-case | `project-card.tsx` |
| Files (utils) | kebab-case | `format-date.ts` |
| React components | PascalCase | `ProjectCard` |
| Files (use cases) | kebab-case + suffix | `publish-project.use-case.ts` |
| Files (services) | kebab-case + suffix | `project.service.ts` |
| Services | PascalCase + Service | `ProjectService` |
| Repositories | PascalCase + Repository | `ProjectRepository` |
| Use cases | camelCase functions | `publishProjectUseCase` |
| Constants | SCREAMING_SNAKE or camelCase for config objects | `MAX_MESSAGE_LENGTH` |
| Types/interfaces | PascalCase | `ProjectSummary` |
| DB tables (Prisma) | PascalCase models, camelCase fields | `Project.publishedAt` |
| Env vars | SCREAMING_SNAKE | `DATABASE_URL` |

---

## Imports

Order (separated by blank lines):

1. Node built-ins
2. External packages
3. Internal packages (`@repo/*`)
4. Absolute app imports (`@/`)
5. Relative imports

Use `import type` for type-only imports. Prefer named exports over default exports except Next.js `page.tsx` / `layout.tsx` defaults.

```typescript
import type { Project } from "@prisma/client";

import { cache } from "react";

import { prisma } from "@repo/database";

import { ProjectCard } from "@/features/projects/components/project-card";
```

---

## Folder Organization

- Feature code under `apps/web/features/<feature>/` (see [engineering-architecture.md](../01-architecture/engineering-architecture.md))
- Repositories under `packages/database/src/repositories/`
- Shared app utilities in `apps/web/lib/`
- Cross-app shared code in `packages/`
- Tests colocated: `*.test.ts` next to source or in `__tests__/`

---

## Error Handling

- Fail fast on programmer errors; handle user errors gracefully
- Server Actions return typed results; delegate to use cases after Zod validation
- Log unexpected errors with context (request ID); never log secrets
- Use custom error classes sparingly (`NotFoundError`, `ValidationError`)
- Zod for input validation at boundaries

```typescript
const parsed = contactSchema.safeParse(input);
if (!parsed.success) {
  return { success: false, error: "Invalid input" };
}
```

---

## Logging

- Structured JSON logs in production (`level`, `message`, `requestId`, `feature`)
- `console.log` only in development
- PII redaction before logging contact messages
- AI logs: model, tokens, latency — not full prompts in production info logs

---

## Validation Flow

Per [engineering-architecture.md](../01-architecture/engineering-architecture.md):

```text
Request → Zod (schemas/) → Use Case → Service → Repository → Prisma
```

- Schemas in `features/<name>/schemas/`
- Validate in Server Actions and route handlers before use cases
- Services assume validated input

---

## Prohibited Practices

Never (see engineering architecture for full list):

- Business logic in components, pages, or layouts
- Prisma imports in `apps/web`
- Feature code imported by `packages/*`
- Duplicated business logic across features
- Direct LLM SDK usage outside `@repo/ai`

---

## Comments

- Code should be self-explanatory; comment **why**, not **what**
- JSDoc on exported package APIs
- TODO comments require issue link: `// TODO(#123): ...`
- No commented-out dead code in merged PRs

---

## Documentation

- Public package APIs documented in package README or TSDoc
- Behavior changes update relevant `docs/` files
- Complex algorithms: link to ADR or architecture doc

---

## Best Practices

- Run `pnpm format` before commit
- Keep functions small and single-purpose
- Prefer immutability (`const`, spread over mutation)
- Use early returns to reduce nesting

## Examples

**Good:** Validated Server Action with typed return.

**Avoid:** 200-line component with mixed data fetching, formatting, and UI.

## Anti-patterns

- `@ts-ignore` without explanation
- Deep relative imports (`../../../../`)
- Catching errors and swallowing silently
- Default export barrels re-exporting entire feature trees

## Future Improvements

- Biome or oxlint evaluation
- Enforce import order via ESLint plugin

## References

- [Engineering Architecture](../01-architecture/engineering-architecture.md)
- [Frontend Standards](./frontend-standards.md)
- [Testing](./testing.md)
- [Engineering Principles](../00-product/engineering-principles.md)
- `@repo/eslint-config` / `@repo/typescript-config`
