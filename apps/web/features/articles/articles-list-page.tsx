import { SiteShell } from "@/components/site/site-shell";
import { ArticlesList } from "./components/articles-list";
import { getPublishedArticleSummaries } from "./use-cases/get-article-summaries";

export async function ArticlesListPage() {
  const articles = await getPublishedArticleSummaries();

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 md:px-8">
        <header className="mb-10 max-w-2xl">
          <p className="mb-2 text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase sm:text-[11px]">
            Writing
          </p>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Articles
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Technical writing on enterprise AI, micro frontends, and engineering
            practices.
          </p>
        </header>

        <ArticlesList articles={articles} />
      </div>
    </SiteShell>
  );
}
