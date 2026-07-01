import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tag = await prisma.tag.upsert({
    where: { slug: "ai-engineering" },
    update: {},
    create: {
      slug: "ai-engineering",
      name: "AI Engineering",
    },
  });

  await prisma.project.upsert({
    where: { slug: "portfolio-red" },
    update: {},
    create: {
      slug: "portfolio-red",
      title: "Portfolio Red",
      description:
        "AI-native engineering portfolio platform with RAG-powered digital twin.",
      body: "Reference implementation for modern AI engineering practices.",
      status: "PUBLISHED",
      publishedAt: new Date("2026-01-01"),
      tags: {
        create: [{ tagId: tag.id }],
      },
    },
  });

  await prisma.article.upsert({
    where: { slug: "welcome" },
    update: {},
    create: {
      slug: "welcome",
      title: "Welcome to Portfolio Red",
      excerpt: "Documentation-first platform scaffold for an AI engineering portfolio.",
      bodyMdx:
        "# Welcome\n\nThis seed article demonstrates MDX content storage for the portfolio platform.",
      status: "PUBLISHED",
      publishedAt: new Date("2026-01-15"),
      tags: {
        create: [{ tagId: tag.id }],
      },
    },
  });

  await prisma.siteSetting.upsert({
    where: { key: "site.title" },
    update: { value: "Farid — Forward Deployed Engineer" },
    create: {
      key: "site.title",
      value: "Farid — Forward Deployed Engineer",
    },
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
