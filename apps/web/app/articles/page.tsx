import type { Metadata } from "next";
import { ArticlesListPage } from "@/features/articles";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Articles — Farid",
  description:
    "Technical writing on enterprise AI, micro frontends, and engineering practices.",
};

export default function Page() {
  return <ArticlesListPage />;
}
