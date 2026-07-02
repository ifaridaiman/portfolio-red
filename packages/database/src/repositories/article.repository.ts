import type { ContentStatus } from "@prisma/client";
import { prisma } from "../client";

export class ArticleRepository {
  constructor(private readonly db = prisma) {}

  findPublishedArticles() {
    return this.db.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: {
        tags: { include: { tag: true } },
      },
    });
  }

  findPublishedBySlug(slug: string) {
    return this.db.article.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: {
        tags: { include: { tag: true } },
      },
    });
  }

  findBySlug(slug: string) {
    return this.db.article.findUnique({
      where: { slug },
      include: {
        tags: { include: { tag: true } },
      },
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
