import { projectRepository } from "@repo/database";

export async function getProjectBySlug(slug: string) {
  try {
    return await projectRepository.findPublishedBySlug(slug);
  } catch {
    return null;
  }
}
