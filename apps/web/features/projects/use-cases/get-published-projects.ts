import { projectRepository } from "@repo/database";

export async function getPublishedProjects() {
  try {
    return await projectRepository.findPublishedProjects();
  } catch {
    return [];
  }
}
