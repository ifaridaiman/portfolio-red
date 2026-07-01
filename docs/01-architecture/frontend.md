# Frontend Architecture

## Purpose

Define the Next.js frontend architecture for `apps/web`, including rendering strategy, routing conventions, and feature organization.

## Scope

Covers `apps/web` only. Shared UI primitives live in `@repo/ui`; see [Frontend Standards](../05-standards/frontend-standards.md) and [Design System](../05-standards/design-system.md).

## Responsibilities

| Layer | Responsibility |
|-------|----------------|
| App Router (`app/`) | Routes, layouts, loading/error boundaries |
| Feature modules (`features/`) | Colocated UI, hooks, actions, and types per product feature |
| `@repo/ui` | Reusable, stateless presentation components |
| Server Components | Default data fetching and static rendering |
| Client Components | Interactivity, browser APIs, AI streaming UI |

---

## Next.js Architecture

- **Framework:** Next.js 16+ with App Router
- **React:** React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS + shadcn/ui (target); CSS Modules during scaffold phase
- **Fonts:** `next/font` (Geist via local files today)

---

## App Router

### Directory layout (target)

```text
apps/web/
├── app/
│   ├── layout.tsx              # Root layout, providers, fonts
│   ├── page.tsx                # Landing (or redirect)
│   ├── (marketing)/            # Route group: public marketing pages
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── articles/
│   ├── contact/
│   ├── chat/                   # Digital twin
│   ├── admin/                  # Protected admin
│   └── api/                    # Route handlers (minimal; prefer Server Actions)
├── features/
│   ├── landing/
│   ├── portfolio/
│   ├── projects/
│   ├── articles/
│   ├── digital-twin/
│   ├── analytics/
│   ├── receipt/
│   ├── admin/
│   └── contact/
├── components/                 # App-wide layout components (header, footer)
└── lib/                        # App utilities (auth helpers, constants)
```

### Conventions

| Convention | Rule |
|------------|------|
| Route files | Thin — compose feature components, minimal logic |
| Data fetching | Server Components and Server Actions by default |
| Metadata | `export const metadata` or `generateMetadata` per route |
| Loading | `loading.tsx` for route-level suspense |
| Errors | `error.tsx` with recovery actions |

---

## Server Components

Default choice for:

- Page shells and static content
- Database reads via `@repo/database`
- SEO-critical HTML

```tsx
// app/projects/page.tsx (example)
import { ProjectList } from "@/features/projects/components/project-list";
import { getProjects } from "@/features/projects/queries";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectList projects={projects} />;
}
```

**Rules:**

- No `useState`, `useEffect`, or event handlers in Server Components
- Pass serializable props to Client Components
- Use `cache()` and `React.cache` for deduplicated reads within a request

---

## Client Components

Required for:

- Digital twin chat (streaming, input state)
- Interactive filters, modals, theme toggle
- Framer Motion animations (with reduced-motion guard)

Mark with `"use client"` at the top of the file. Keep Client Components **leaf-level** — push the boundary as deep as possible.

```tsx
"use client";

import { useChat } from "@/features/digital-twin/hooks/use-chat";

export function ChatPanel() {
  const { messages, send, isStreaming } = useChat();
  // ...
}
```

---

## Rendering Strategy

| Page type | Strategy |
|-----------|----------|
| Landing, portfolio | Static generation (SSG) or ISR with revalidation |
| Project/article detail | SSG/ISR from slug; `generateStaticParams` where feasible |
| Admin | Dynamic, authenticated |
| Digital twin chat | Dynamic; Client Component for stream consumption |
| Contact form | Server Action POST; static shell |

```mermaid
flowchart LR
    Request[HTTP Request] --> Router[App Router]
    Router --> SC[Server Component]
    SC --> DB[(PostgreSQL)]
    Router --> CC[Client Component]
    CC --> API[Server Action / Route Handler]
    API --> AI[AI Gateway]
```

### Caching

- Use Next.js `fetch` cache and `revalidate` tags for content pages
- `revalidatePath` / `revalidateTag` after admin content updates
- Do not cache personalized or authenticated responses at CDN without Vary headers

---

## Routing Conventions

| Path | Feature |
|------|---------|
| `/` | Landing |
| `/portfolio` | Portfolio overview |
| `/projects`, `/projects/[slug]` | Projects |
| `/articles`, `/articles/[slug]` | Articles |
| `/chat` | Digital twin |
| `/contact` | Contact |
| `/admin/*` | Admin (auth required) |

- Use kebab-case for URLs
- One primary layout per section; nested layouts for admin
- Redirect legacy paths via `next.config.js` when renaming

---

## Feature Organization

Each feature under `features/<name>/` may contain:

```text
features/projects/
├── components/       # Feature-specific components
├── hooks/            # Client hooks
├── actions/          # Server Actions
├── queries/          # Data access (calls @repo/database)
├── types.ts
└── utils.ts
```

**Colocation principle:** Everything needed to understand "projects" lives under `features/projects/` except shared primitives in `@repo/ui`.

Cross-feature imports should go through public feature APIs (`features/projects/index.ts`), not deep paths.

---

## Best Practices

- Prefer Server Components; add `"use client"` only when necessary.
- Co-locate feature code; avoid a global `services/` dumping ground.
- Use `next/image` for all content images with explicit dimensions.
- Implement `generateMetadata` for all public content pages.
- Test keyboard navigation on every interactive feature.

## Examples

**Good:** `features/articles/components/article-body.tsx` is a Server Component rendering MDX.

**Good:** `features/digital-twin/components/chat-input.tsx` is a small Client Component at the leaf.

**Avoid:** Making `app/layout.tsx` a Client Component to avoid prop drilling — use composition instead.

## Anti-patterns

- Fetching in `useEffect` what could be fetched in a Server Component.
- Giant `components/` folder with no feature affiliation.
- Importing admin code into public bundles (split routes and use dynamic imports).
- Client-side-only rendering of article content (hurts SEO and a11y).

## Future Improvements

- Partial Prerendering (PPR) for hybrid static + dynamic regions
- View Transitions API for page navigations
- Shared `@repo/features` package if features are reused across `web` and `docs`

## References

- [ADR-0002: Next.js App Router](../04-adr/0002-nextjs.md)
- [ADR-0003: shadcn/ui](../04-adr/0003-shadcn.md)
- [Monorepo](./monorepo.md)
- [Frontend Standards](../05-standards/frontend-standards.md)
- [Next.js App Router docs](https://nextjs.org/docs/app)
