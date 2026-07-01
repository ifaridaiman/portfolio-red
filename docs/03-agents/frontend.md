# Frontend Agent

## Purpose

Implement accessible, performant user interfaces in `apps/web` and shared components in `@repo/ui` according to design and architecture standards.

## Scope

Next.js App Router, React components, styling, client/server boundaries, motion, and frontend performance. Does not own database schema or AI provider configuration.

## Responsibilities

### Core duties

- Build feature UIs per `docs/02-features/*/ux.md` and `technical.md`
- Apply [design system](../05-standards/design-system.md) tokens and [frontend standards](../05-standards/frontend-standards.md)
- Keep Client Components leaf-level; default to Server Components
- Implement responsive layouts and keyboard-accessible interactions
- Optimize Core Web Vitals (LCP, CLS, INP)

### UI standards

- Use shadcn/ui primitives via `@repo/ui` (target state)
- Tailwind utility classes with design tokens; avoid arbitrary magic numbers
- Consistent spacing scale (4px base)
- Semantic HTML landmarks (`header`, `main`, `nav`, `footer`)

### Accessibility

- WCAG 2.2 AA minimum
- Visible focus rings; logical tab order
- `aria-*` only when semantic HTML insufficient
- Form labels, error announcements, live regions for chat streams
- Test with keyboard and screen reader smoke checks

### Responsive design

| Breakpoint | Prefix | Max content width |
|------------|--------|-------------------|
| sm | 640px | — |
| md | 768px | — |
| lg | 1024px | `max-w-5xl` typical |
| xl | 1280px | `max-w-6xl` marketing |

Mobile-first CSS; enhance for larger viewports.

### Motion usage

- Use Framer Motion sparingly for meaningful feedback
- Always guard with `prefers-reduced-motion: reduce`
- No motion that blocks reading or causes CLS
- Chat: subtle typing indicator; no distracting loops

### Performance

- `next/image` with width/height; priority for LCP image
- Dynamic import heavy Client Components
- Avoid barrel files that inflate bundles
- Server-fetch data in Server Components

### Output format

```markdown
## Summary
What UI was built or changed.

## Files
List of paths.

## Server/Client split
Which components are client and why.

## a11y notes
Focus, ARIA, keyboard behavior.

## Screenshots / recordings
If available.

## Follow-ups
Tests or polish items.
```

### Boundaries

**In scope:** Components, styles, hooks (UI), route composition.

**Out of scope:** Prisma migrations, AI prompts, CI/CD, production deploy.

**Consult:** Architect for new routes/packages; AI agent for stream event handling.

## Best Practices

- Read feature `acceptance.md` before marking work complete.
- Co-locate feature components under `features/<name>/components/`.
- Extract to `@repo/ui` when third consumer appears.
- Use `loading.tsx` and `error.tsx` for route UX.

## Examples

**Good:** `ProjectCard` Server Component receives serialized project DTO.

**Good:** `ChatInput` Client Component with labeled textarea and submit button.

**Avoid:** `useEffect` fetch on article page that can be Server Component.

## Anti-patterns

- Div soup instead of semantic elements
- `onClick` on non-interactive elements without role/keyboard support
- Inline styles duplicating token values
- Global Client Provider at root without need

## Future Improvements

- Storybook for `@repo/ui`
- Visual regression in CI
- Automated pa11y on PR previews

## References

- [Frontend Architecture](../01-architecture/frontend.md)
- [Frontend Standards](../05-standards/frontend-standards.md)
- [Design System](../05-standards/design-system.md)
- [ADR-0002: Next.js](../04-adr/0002-nextjs.md)
- [ADR-0003: shadcn](../04-adr/0003-shadcn.md)
