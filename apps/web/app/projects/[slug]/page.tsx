import type { Metadata } from "next";
import { ProjectDetailPage } from "@/features/projects";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ")} — Projects — Farid`,
    description: "Project detail page.",
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectDetailPage slug={slug} />;
}
