# ADR-0003: shadcn/ui with Tailwind CSS

- **Status:** Accepted
- **Date:** 2026-07-01

## Context

The platform needs a consistent, accessible component library with full styling control, dark mode, and fast iteration. The current scaffold uses minimal CSS Modules in `@repo/ui` with stub components. Production UI requires a cohesive design system.

## Decision

Adopt **Tailwind CSS** for styling and **shadcn/ui** (Radix primitives + copy-paste components) housed primarily in `packages/ui`:

- Configure Tailwind in `apps/web` with shared preset exportable to packages
- Add shadcn components to `@repo/ui` for reuse
- Use CSS variables for design tokens (see [design-system.md](../05-standards/design-system.md))
- Support dark mode via `class` strategy on `html`

## Consequences

### Positive

- Accessible primitives (Radix) with customizable styling
- No opaque npm UI kit lock-in — components are owned source
- Tailwind speeds responsive layout and token consistency
- Strong community alignment with Next.js stack

### Negative

- Migration effort from current CSS Modules starter
- Tailwind class verbosity without discipline
- shadcn updates require manual merges

### Neutral

- Framer Motion used selectively for motion (not part of shadcn)

## Alternatives

### Alternative 1: Continue custom CSS Modules only

- **Pros:** No new dependencies; current state
- **Cons:** Slower to build cohesive system; a11y primitives manual
- **Why rejected:** Does not meet design system goals for v1

### Alternative 2: Material UI / Chakra

- **Pros:** All-in-one component sets
- **Cons:** Heavier bundle; harder brand customization
- **Why rejected:** shadcn offers lighter, Tailwind-native approach

### Alternative 3: Headless UI only

- **Pros:** Minimal styling opinions
- **Cons:** More build time for base components
- **Why rejected:** shadcn already builds on Radix with sensible defaults

## References

- [Design System](../05-standards/design-system.md)
- [Frontend Standards](../05-standards/frontend-standards.md)
- [ADR-0002: Next.js](./0002-nextjs.md)
