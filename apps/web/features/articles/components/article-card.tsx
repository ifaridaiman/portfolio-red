import Link from "next/link";
import type { ArticleSummary } from "../types";

type ArticleCardProps = {
  article: ArticleSummary;
};

function formatDate(date: Date | null) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-colors hover:bg-card/60 sm:p-6">
      <Link
        href={`/articles/${article.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {article.publishedAt && (
          <time
            dateTime={article.publishedAt.toISOString()}
            className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground uppercase"
          >
            {formatDate(article.publishedAt)}
          </time>
        )}
        <h2 className="mt-1 font-heading text-lg font-medium tracking-tight text-foreground group-hover:underline sm:text-xl">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
        )}
      </Link>
    </article>
  );
}
