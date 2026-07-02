import { SiteShell } from "@/components/site/site-shell";

export default function ArticlesLoading() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 md:px-8">
        <div className="mb-10 h-8 w-48 animate-pulse rounded bg-muted/50" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl border border-border/40 bg-muted/20"
            />
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
