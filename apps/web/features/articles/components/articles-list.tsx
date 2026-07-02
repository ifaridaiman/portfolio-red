"use client";

import { useMemo, useState } from "react";
import type { ArticleSummary } from "../types";
import { ArticleCard } from "./article-card";

type ArticlesListProps = {
  articles: ArticleSummary[];
};

export function ArticlesList({ articles }: ArticlesListProps) {
  const allTags = useMemo(() => {
    const tagMap = new Map<string, ArticleSummary["tags"][number]>();
    for (const article of articles) {
      for (const tag of article.tags) {
        tagMap.set(tag.slug, tag);
      }
    }
    return Array.from(tagMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [articles]);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeTag) return articles;
    return articles.filter((article) =>
      article.tags.some((tag) => tag.slug === activeTag),
    );
  }, [articles, activeTag]);

  return (
    <div>
      {allTags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              activeTag === null
                ? "border-foreground bg-foreground text-background"
                : "border-border/70 bg-muted/30 text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag.slug}
              type="button"
              onClick={() => setActiveTag(tag.slug)}
              aria-pressed={activeTag === tag.slug}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeTag === tag.slug
                  ? "border-foreground bg-foreground text-background"
                  : "border-border/70 bg-muted/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No articles match this filter.
        </p>
      ) : (
        <ul className="grid gap-4" role="list">
          {filtered.map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
