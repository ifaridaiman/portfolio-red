# Design System

## Purpose

Define visual language, tokens, and component guidelines for a cohesive portfolio experience with dark mode support.

## Scope

Design tokens and component usage for `apps/web` and `@repo/ui`. Implementation via Tailwind + shadcn/ui per [ADR-0003](../04-adr/0003-shadcn.md).

## Responsibilities

| Role | Responsibility |
|------|----------------|
| Frontend agent | Apply tokens; extend `@repo/ui` |
| Designer / owner | Approve brand colors and typography |
| All contributors | Avoid one-off styles outside tokens |

---

## Typography

| Token | Font | Usage |
|-------|------|-------|
| `--font-sans` | Geist Sans (current) | Body, UI |
| `--font-mono` | Geist Mono | Code, technical labels |

### Scale (Tailwind)

| Class | Size | Use |
|-------|------|-----|
| `text-xs` | 12px | Captions, meta |
| `text-sm` | 14px | Secondary body |
| `text-base` | 16px | Body |
| `text-lg` | 18px | Lead paragraphs |
| `text-xl`–`text-4xl` | — | Headings |

- Max line length ~65ch for article body
- Heading hierarchy: one `h1` per page; no skipped levels

---

## Color Tokens

Use CSS variables (shadcn pattern) for theme switching:

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background` | near white | near black | Page bg |
| `--foreground` | near black | near white | Primary text |
| `--primary` | brand accent | adjusted accent | CTAs, links |
| `--muted` | gray surface | dark surface | Cards, subtle bg |
| `--muted-foreground` | gray text | gray text | Secondary text |
| `--border` | light border | dark border | Dividers |
| `--destructive` | red | red | Errors |
| `--ring` | focus ring | focus ring | Focus visible |

**Brand direction:** Professional engineering portfolio — restrained accent (e.g., deep blue or teal); avoid neon clutter.

Contrast ratio ≥ 4.5:1 for body text (WCAG AA).

---

## Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius` | `0.5rem` (8px) | Base |
| `rounded-sm` | calc(var(--radius) - 4px) | Chips |
| `rounded-md` | calc(var(--radius) - 2px) | Inputs |
| `rounded-lg` | var(--radius) | Cards |
| `rounded-full` | — | Avatars, pills |

---

## Spacing

- Base unit: **4px** (Tailwind default)
- Section vertical rhythm: `py-16` md:`py-24`
- Card padding: `p-6`
- Stack gaps: `gap-4` (tight), `gap-8` (sections)

---

## Icons

- Library: **Lucide React** (shadcn default)
- Size: `h-4 w-4` inline; `h-5 w-5` buttons
- Decorative icons: `aria-hidden="true"`
- Icon-only buttons: require `aria-label`

---

## Motion

| Duration | Easing | Use |
|----------|--------|-----|
| 150ms | ease-out | Hovers, toggles |
| 200–300ms | ease-in-out | Modals, drawers |

- Disable non-essential motion when `prefers-reduced-motion: reduce`

---

## Components

Core set via shadcn in `@repo/ui`:

| Component | Usage |
|-----------|-------|
| Button | Primary/secondary/ghost/destructive variants |
| Card | Project/article tiles |
| Input, Textarea | Forms, chat input |
| Dialog | Modals |
| Dropdown Menu | Admin actions |
| Tabs | Admin sections |
| Toast | Success/error feedback |
| Badge | Tags, tech stack |
| Skeleton | Loading states |

Extend with compound components in features, not forks of primitives.

---

## Layout

| Container | Width |
|-----------|-------|
| Content | `max-w-3xl` articles |
| Marketing | `max-w-5xl` / `max-w-6xl` |
| Admin | full width with `max-w-7xl` inner |

- Header: sticky optional; clear nav + theme toggle
- Footer: links, social, copyright
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for project cards

---

## Dark Mode

- Strategy: `class="dark"` on `html` (shadcn default)
- Toggle persists in `localStorage` with no flash (script in layout or `next-themes`)
- Test all pages in both modes before release
- Images/screenshots: subtle border in dark mode if needed

---

## Best Practices

- Use tokens only; no hardcoded hex in components
- Document new tokens in this file when added
- Pair visual design with a11y checks

## Examples

**CTA:** Primary `Button` with sufficient contrast on `--primary`.

**Article:** Prose plugin or typography utilities for MDX content.

## Anti-patterns

- Mixing multiple accent colors without semantic meaning
- 10 different border radii on one page
- Light-mode-only screenshots in marketing

## Future Improvements

- Figma token sync
- Brand theme variants (e.g., high contrast)

## References

- [Frontend Standards](./frontend-standards.md)
- [ADR-0003: shadcn](../04-adr/0003-shadcn.md)
- [shadcn/ui theming](https://ui.shadcn.com/docs/theming)
