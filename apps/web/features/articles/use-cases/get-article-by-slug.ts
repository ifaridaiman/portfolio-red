import { articleRepository } from "@repo/database";

export async function getArticleBySlug(slug: string) {
  try {
    return await articleRepository.findPublishedBySlug(slug);
  } catch {
    return null;
  }
}
