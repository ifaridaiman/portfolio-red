import type { Metadata } from "next";
import { ArticleDetailPage } from "@/features/articles";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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
