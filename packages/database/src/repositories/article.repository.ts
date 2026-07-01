import type { ContentStatus } from "@prisma/client";
import { prisma } from "../client";

export class ArticleRepository {
  constructor(private readonly db = prisma) {}

  findPublishedArticles() {
    return this.db.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    });
  }

  findBySlug(slug: string) {
    return this.db.article.findUnique({
      where: { slug },
    });
  }

  updateStatus(id: string, status: ContentStatus, publishedAt?: Date | null) {
    return this.db.article.update({
      where: { id },
      data: { status, publishedAt },
    });
  }
}

export const articleRepository = new ArticleRepository();
