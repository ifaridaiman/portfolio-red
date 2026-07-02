import type { ArticleSummary } from "../types";
import { getPublishedArticles } from "./get-published-articles";
import { getArticleBySlug } from "./get-article-by-slug";

function mapArticle(
  article: NonNullable<Awaited<ReturnType<typeof getArticleBySlug>>>,
): ArticleSummary {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    bodyMdx: article.bodyMdx,
    publishedAt: article.publishedAt,
    tags: article.tags.map(({ tag }) => tag),
  };
}

export async function getPublishedArticleSummaries(): Promise<ArticleSummary[]> {
  const articles = await getPublishedArticles();
  return articles.map((article) => mapArticle(article));
}

export async function getArticleSummaryBySlug(
  slug: string,
): Promise<ArticleSummary | null> {
  const article = await getArticleBySlug(slug);
  return article ? mapArticle(article) : null;
}
