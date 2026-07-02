import { articleRepository } from "@repo/database";

export async function getPublishedArticles() {
  try {
    return await articleRepository.findPublishedArticles();
  } catch {
    return [];
  }
}
