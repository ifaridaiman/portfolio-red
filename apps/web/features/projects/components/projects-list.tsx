"use client";

import { useMemo, useState } from "react";
import type { ProjectSummary } from "../types";
import { ProjectCard } from "./project-card";

type ProjectsListProps = {
  projects: ProjectSummary[];
};

export function ProjectsList({ projects }: ProjectsListProps) {
  const allTags = useMemo(() => {
    const tagMap = new Map<string, ProjectSummary["tags"][number]>();
    for (const project of projects) {
      for (const tag of project.tags) {
        tagMap.set(tag.slug, tag);
      }
    }
    return Array.from(tagMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [projects]);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeTag) return projects;
    return projects.filter((project) =>
      project.tags.some((tag) => tag.slug === activeTag),
    );
  }, [projects, activeTag]);

  return (
    <div>
      {allTags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              activeTag === null
                ? "border-foreground bg-foreground text-background"
                : "border-border/70 bg-muted/30 text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag.slug}
              type="button"
              onClick={() => setActiveTag(tag.slug)}
              aria-pressed={activeTag === tag.slug}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeTag === tag.slug
                  ? "border-foreground bg-foreground text-background"
                  : "border-border/70 bg-muted/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No projects match this filter.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2" role="list">
          {filtered.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
