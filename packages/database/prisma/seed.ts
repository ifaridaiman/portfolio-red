import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: "ai-engineering" },
      update: {},
      create: { slug: "ai-engineering", name: "AI Engineering" },
    }),
    prisma.tag.upsert({
      where: { slug: "web-development" },
      update: {},
      create: { slug: "web-development", name: "Web Development" },
    }),
    prisma.tag.upsert({
      where: { slug: "enterprise" },
      update: {},
      create: { slug: "enterprise", name: "Enterprise" },
    }),
    prisma.tag.upsert({
      where: { slug: "automation" },
      update: {},
      create: { slug: "automation", name: "Automation" },
    }),
    prisma.tag.upsert({
      where: { slug: "gis" },
      update: {},
      create: { slug: "gis", name: "GIS" },
    }),
  ]);

  const tagBySlug = Object.fromEntries(tags.map((tag) => [tag.slug, tag]));

  await prisma.project.upsert({
    where: { slug: "ctos-credit-platform" },
    update: {},
    create: {
      slug: "ctos-credit-platform",
      title: "CTOS Credit Scoring Platform",
      description:
        "Enterprise credit scoring platform helping businesses assess customer creditworthiness with advanced analytics.",
      body: `## Overview

CTOS is a credit scoring platform that helps businesses assess the creditworthiness of their customers. It uses advanced algorithms to analyze financial history, credit scores, and other relevant data.

## Role

As a software engineer at CTOS Data Systems, I contributed to building and maintaining production web applications that power credit decisioning workflows for enterprise clients across Malaysia.

## Highlights

- Built scalable web interfaces for credit assessment workflows
- Integrated with backend APIs for real-time credit scoring
- Collaborated with cross-functional teams on enterprise-grade reliability`,
      status: "PUBLISHED",
      publishedAt: new Date("2024-06-01"),
      tags: {
        create: [
          { tagId: tagBySlug.enterprise!.id },
          { tagId: tagBySlug["web-development"]!.id },
        ],
      },
    },
  });

  await prisma.project.upsert({
    where: { slug: "esri-gis-solutions" },
    update: {},
    create: {
      slug: "esri-gis-solutions",
      title: "Esri GIS Enterprise Solutions",
      description:
        "Geospatial infrastructure modernization and ArcGIS solutions for government and enterprise clients.",
      body: `## Overview

Esri Malaysia, founded in 1983, is the exclusive distributor of Esri's ArcGIS. Based in Selangor, it delivers GIS solutions, modernises geospatial infrastructure, and supports government and enterprises with advanced spatial analytics.

## Role

Delivered web-based GIS solutions that help organizations visualize, analyze, and act on spatial data at enterprise scale.

## Highlights

- Developed interactive mapping applications using ArcGIS APIs
- Modernized geospatial infrastructure for government clients
- Built user-centered spatial analytics dashboards`,
      status: "PUBLISHED",
      publishedAt: new Date("2023-09-01"),
      tags: {
        create: [
          { tagId: tagBySlug.gis!.id },
          { tagId: tagBySlug.enterprise!.id },
        ],
      },
    },
  });

  await prisma.project.upsert({
    where: { slug: "micro-frontend-platform" },
    update: {},
    create: {
      slug: "micro-frontend-platform",
      title: "Micro Frontend Architecture",
      description:
        "Modular micro front-end architecture enabling independent deployment of UI components for enterprise applications.",
      body: `## Overview

Designed and implemented a micro front-end architecture at Aleph Labs, enabling modular, maintainable, and independent deployment of UI components for complex enterprise-scale applications.

## Highlights

- Module federation for independent team deployments
- Shared design system across micro frontends
- Performance optimization for large-scale enterprise UIs
- Cross-team collaboration on component boundaries`,
      status: "PUBLISHED",
      publishedAt: new Date("2023-03-01"),
      tags: {
        create: [{ tagId: tagBySlug["web-development"]!.id }],
      },
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
      body: `## Overview

Portfolio Red is a documentation-first platform for an AI engineering portfolio. It demonstrates modern practices: Turborepo monorepo, Next.js App Router, Prisma + PostgreSQL with pgvector, and a planned RAG-powered digital twin.

## Highlights

- Feature-based architecture with layered data access
- Content managed via seed scripts (admin UI in M4)
- Production deployment on AWS EC2 with Docker
- Designed for accessibility and performance from day one`,
      status: "PUBLISHED",
      publishedAt: new Date("2026-01-01"),
      tags: {
        create: [
          { tagId: tagBySlug["ai-engineering"]!.id },
          { tagId: tagBySlug["web-development"]!.id },
        ],
      },
    },
  });

  await prisma.article.upsert({
    where: { slug: "welcome" },
    update: {},
    create: {
      slug: "welcome",
      title: "Welcome to Portfolio Red",
      excerpt:
        "Documentation-first platform scaffold for an AI engineering portfolio.",
      bodyMdx: `# Welcome

This seed article demonstrates MDX content storage for the portfolio platform.

## What's Next

- **M2**: Core content features (you are here)
- **M3**: Digital twin with RAG-powered chat
- **M4**: Admin CMS and analytics
- **M5**: Production hardening

Built with care by Farid.`,
      status: "PUBLISHED",
      publishedAt: new Date("2026-01-15"),
      tags: {
        create: [{ tagId: tagBySlug["ai-engineering"]!.id }],
      },
    },
  });

  await prisma.article.upsert({
    where: { slug: "enterprise-ai-patterns" },
    update: {},
    create: {
      slug: "enterprise-ai-patterns",
      title: "Enterprise AI Patterns That Ship",
      excerpt:
        "Lessons from deploying AI in production environments with real compliance and adoption constraints.",
      bodyMdx: `# Enterprise AI Patterns That Ship

Forward deployed engineering means building AI that survives contact with production—not just impressive demos.

## Start with the workflow

Map the actual user journey before choosing models. The best AI feature is one that fits into existing tools and habits.

## Retrieval before generation

Ground responses in verified content. RAG pipelines with source attribution build trust with enterprise stakeholders.

## Govern from day one

Token accounting, rate limiting, and audit logs are not afterthoughts. They are table stakes for production AI.`,
      status: "PUBLISHED",
      publishedAt: new Date("2026-02-01"),
      tags: {
        create: [{ tagId: tagBySlug["ai-engineering"]!.id }],
      },
    },
  });

  await prisma.article.upsert({
    where: { slug: "micro-frontends-at-scale" },
    update: {},
    create: {
      slug: "micro-frontends-at-scale",
      title: "Micro Frontends at Scale",
      excerpt:
        "How modular UI architectures enable independent teams to ship faster without breaking the whole application.",
      bodyMdx: `# Micro Frontends at Scale

Micro front-end architecture isn't about splitting code for its own sake—it's about **team autonomy** and **deployment independence**.

## When it makes sense

- Multiple teams owning distinct product areas
- Different release cadences per feature domain
- Legacy and modern stacks coexisting

## Key practices

1. **Clear boundaries** — Define ownership per micro frontend
2. **Shared design tokens** — Maintain visual consistency
3. **Runtime integration** — Module federation or shell apps
4. **Observability** — Monitor each bundle independently`,
      status: "PUBLISHED",
      publishedAt: new Date("2025-11-15"),
      tags: {
        create: [{ tagId: tagBySlug["web-development"]!.id }],
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

  await prisma.siteSetting.upsert({
    where: { key: "portfolio.bio" },
    update: {
      value:
        "Software Engineering not only as a profession but also as a passion. I love to create and innovate, always striving to improve my skills and knowledge in the field.",
    },
    create: {
      key: "portfolio.bio",
      value:
        "Software Engineering not only as a profession but also as a passion. I love to create and innovate, always striving to improve my skills and knowledge in the field.",
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
