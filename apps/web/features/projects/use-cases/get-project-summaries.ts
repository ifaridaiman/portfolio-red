import type { ProjectSummary } from "../types";
import { getProjectBySlug } from "./get-project-by-slug";
import { getPublishedProjects } from "./get-published-projects";

type ProjectWithTags = NonNullable<Awaited<ReturnType<typeof getProjectBySlug>>>;

function mapProject(project: ProjectWithTags): ProjectSummary {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    description: project.description,
    body: project.body,
    publishedAt: project.publishedAt,
    tags: project.tags.map(({ tag }) => tag),
  };
}

export async function getPublishedProjectSummaries(): Promise<ProjectSummary[]> {
  const projects = await getPublishedProjects();
  return projects.map((project) => mapProject(project));
}

export async function getProjectSummaryBySlug(
  slug: string,
): Promise<ProjectSummary | null> {
  const project = await getProjectBySlug(slug);
  return project ? mapProject(project) : null;
}
