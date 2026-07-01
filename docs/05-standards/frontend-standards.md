# Frontend Standards

## Purpose

Standards for React components, hooks, styling, and frontend quality in `apps/web` and `@repo/ui`.

## Scope

UI implementation. Complements [design-system.md](./design-system.md), [frontend architecture](../01-architecture/frontend.md), and [engineering architecture](../01-architecture/engineering-architecture.md).

## Responsibilities

Frontend agent and human contributors implement UI per these standards.

---

## Component Rules

### Layer separation

- **No business logic** in components — UI rendering only
- **No Prisma or repository** imports in components
- **No AI provider** imports in components
- Components receive data via props from pages or hooks that call Server Actions

### File conventions

- **One component per file** (except colocated small subcomponents)
- Server Component by default; `"use client"` only when needed
- Props interfaces named `{ComponentName}Props`
- Destructure props in function signature
- No business logic in presentational `@repo/ui` components

```tsx
type ProjectCardProps = {
  title: string;
  slug: string;
  excerpt: string;
};

export function ProjectCard({ title, slug, excerpt }: ProjectCardProps) {
  return (/* ... */);
}
```

### Composition

- Prefer composition over prop drilling (>3 levels → context or server fetch at boundary)
- Use slots/children for flexible layouts
- Extract hooks when stateful logic exceeds ~15 lines

---

## Hooks

- Prefix custom hooks with `use`
- Hooks only in Client Components or other hooks
- Return stable shapes; memoize callbacks passed to heavy children when profiled
- Data fetching hooks are rare — prefer Server Components + use cases

---

## Atomic Design

Follow [engineering-architecture.md](../01-architecture/engineering-architecture.md):

| Location | Level | Examples |
|----------|-------|----------|
| `@repo/ui` | Atoms, molecules | Button, Input, Form Field, Tag, Metric Card |
| `features/*/components/` | Organisms+ | ProjectHero, ChatWindow, ConversationPanel |

**Rule:** If a component requires business knowledge to render, it belongs in the feature — not `@repo/ui`.

```tsx
"use client";

export function useChat(sessionId: string) {
  // stream handling, message state
}
```

---

## Styling

- **Tailwind CSS** (target) with design tokens
- No inline `style={{}}` except dynamic values (e.g., progress width)
- Use `cn()` utility for conditional classes
- CSS Modules acceptable during migration only

---

## Tailwind

- Use theme tokens from `tailwind.config` / CSS variables
- Responsive: mobile-first (`md:`, `lg:`)
- Avoid arbitrary values (`w-[437px]`) without design justification
- Group related utilities: layout → spacing → typography → color → state

---

## shadcn/ui

- Install components into `packages/ui` via shadcn CLI configured for monorepo
- Do not edit `node_modules`; components are copied source
- Extend variants via `cva` patterns shadcn uses
- Wrap shadcn primitives in app components when adding business context

---

## Motion

- Library: Framer Motion (when needed)
- Respect `prefers-reduced-motion`
- Animate `opacity` and `transform` only when possible (GPU-friendly)
- No autoplay carousels without pause control

---

## Accessibility

- Button vs link: buttons for actions, links for navigation
- `alt` text on informative images; decorative `alt=""`
- Focus trap in modals; restore focus on close
- Chat: `aria-live="polite"` for new assistant messages

---

## Performance

- `next/image` for images; `next/font` for fonts
- Lazy load below-fold Client Components (`dynamic()`)
- Avoid hydration mismatch (no random IDs on server without sync)
- Minimize client state on content-heavy pages

---

## Best Practices

- Test keyboard path for every interactive feature
- Use semantic HTML before ARIA
- Keep client bundles small — analyze when adding dependencies

## Examples

**Good:** `Dialog` from `@repo/ui` with titled header and focus trap.

**Avoid:** `div` with `onClick` for navigation (use `Link`).

## Anti-patterns

- Giant Client Component pages
- Tailwind class strings duplicated 10+ times (extract component)
- Disabling ESLint a11y rules without fix

## Future Improvements

- Storybook with a11y addon
- ESLint plugin for Server/Client import boundaries

## References

- [Engineering Architecture](../01-architecture/engineering-architecture.md)
- [Design System](./design-system.md)
- [Frontend Architecture](../01-architecture/frontend.md)
- [ADR-0003: shadcn](./../04-adr/0003-shadcn.md)
- [Frontend Agent](../03-agents/frontend.md)
