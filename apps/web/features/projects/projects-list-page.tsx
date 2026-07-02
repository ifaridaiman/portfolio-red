import { SiteShell } from "@/components/site/site-shell";
import { ProjectsList } from "./components/projects-list";
import { getPublishedProjectSummaries } from "./use-cases/get-project-summaries";

export async function ProjectsListPage() {
  const projects = await getPublishedProjectSummaries();

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 md:px-8">
        <header className="mb-10 max-w-2xl">
          <p className="mb-2 text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase sm:text-[11px]">
            Work
          </p>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Projects
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Selected engineering work across enterprise platforms, GIS solutions,
            and modern web architectures.
          </p>
        </header>

        <ProjectsList projects={projects} />
      </div>
    </SiteShell>
  );
}
