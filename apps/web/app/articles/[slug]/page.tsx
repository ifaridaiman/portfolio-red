import type { Metadata } from "next";
import { ArticleDetailPage } from "@/features/articles";
import { getPublishedArticleSummaries } from "@/features/articles/use-cases/get-article-summaries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const articles = await getPublishedArticleSummaries();
    return articles.map((article) => ({ slug: article.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ")} — Articles — Farid`,
    description: "Article detail page.",
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ArticleDetailPage slug={slug} />;
}
