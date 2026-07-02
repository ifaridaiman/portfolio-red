import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/content/markdown-content";
import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { getArticleSummaryBySlug } from "./use-cases/get-article-summaries";

type ArticleDetailPageProps = {
  slug: string;
};

function formatDate(date: Date | null) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export async function ArticleDetailPage({ slug }: ArticleDetailPageProps) {
  const article = await getArticleSummaryBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 md:px-8">
        <Button
          nativeButton={false}
          render={<Link href="/articles" />}
          variant="ghost"
          size="sm"
          className="mb-8 -ml-2 text-muted-foreground"
        >
          <ArrowLeft data-icon="inline-start" />
          All articles
        </Button>

        <header className="mb-8">
          {article.publishedAt && (
            <time
              dateTime={article.publishedAt.toISOString()}
              className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground uppercase"
            >
              {formatDate(article.publishedAt)}
            </time>
          )}
          <h1 className="mt-1 font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
          )}
        </header>

        <MarkdownContent content={article.bodyMdx} />
      </article>
    </SiteShell>
  );
}
