import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/content/markdown-content";
import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProjectSummaryBySlug } from "./use-cases/get-project-summaries";

type ProjectDetailPageProps = {
  slug: string;
};

export async function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const project = await getProjectSummaryBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 md:px-8">
        <Button
          nativeButton={false}
          render={<Link href="/projects" />}
          variant="ghost"
          size="sm"
          className="mb-8 -ml-2 text-muted-foreground"
        >
          <ArrowLeft data-icon="inline-start" />
          All projects
        </Button>

        <header className="mb-8">
          <h1 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {project.title}
          </h1>
          {project.description && (
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          )}
          {project.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Project tags">
              {project.tags.map((tag) => (
                <li key={tag.id}>
                  <span className="inline-flex items-center rounded-full border border-border/70 bg-muted/30 px-2.5 py-0.5 text-[10px] text-muted-foreground uppercase tracking-wide">
                    {tag.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </header>

        <MarkdownContent content={project.body} />
      </article>
    </SiteShell>
  );
}
