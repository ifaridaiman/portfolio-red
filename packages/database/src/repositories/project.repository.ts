import type { ContentStatus } from "@prisma/client";
import { prisma } from "../client";

export class ProjectRepository {
  constructor(private readonly db = prisma) {}

  findPublishedProjects() {
    return this.db.project.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: {
        tags: { include: { tag: true } },
      },
    });
  }

  findPublishedBySlug(slug: string) {
    return this.db.project.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: {
        tags: { include: { tag: true } },
      },
    });
  }

  findBySlug(slug: string) {
    return this.db.project.findUnique({
      where: { slug },
      include: {
        tags: { include: { tag: true } },
      },
    });
  }

  updateStatus(id: string, status: ContentStatus, publishedAt?: Date | null) {
    return this.db.project.update({
      where: { id },
      data: { status, publishedAt },
    });
  }
}

export const projectRepository = new ProjectRepository();
