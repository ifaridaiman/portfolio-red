import Link from "next/link";
import type { ProjectSummary } from "../types";

type ProjectCardProps = {
  project: ProjectSummary;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-colors hover:bg-card/60 sm:p-6">
      <Link
        href={`/projects/${project.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <h2 className="font-heading text-lg font-medium tracking-tight text-foreground group-hover:underline sm:text-xl">
          {project.title}
        </h2>
        {project.description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        )}
      </Link>
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
    </article>
  );
}
