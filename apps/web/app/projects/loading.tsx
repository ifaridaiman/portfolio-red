import { SiteShell } from "@/components/site/site-shell";

export default function ProjectsLoading() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 md:px-8">
        <div className="mb-10 h-8 w-48 animate-pulse rounded bg-muted/50" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl border border-border/40 bg-muted/20"
            />
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
