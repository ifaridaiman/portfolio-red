import type { Metadata } from "next";
import { ProjectsListPage } from "@/features/projects";

export const metadata: Metadata = {
  title: "Projects — Farid",
  description:
    "Selected engineering projects across enterprise platforms, GIS solutions, and modern web architectures.",
};

export default function Page() {
  return <ProjectsListPage />;
}
