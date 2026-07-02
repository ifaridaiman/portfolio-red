export type ContentTag = {
  id: string;
  slug: string;
  name: string;
};

export type ProjectSummary = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  body: string;
  publishedAt: Date | null;
  tags: ContentTag[];
};

export type ArticleSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  bodyMdx: string;
  publishedAt: Date | null;
  tags: ContentTag[];
};
