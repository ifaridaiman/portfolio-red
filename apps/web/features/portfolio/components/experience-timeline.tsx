import { EXPERIENCE } from "../constants/portfolio-content";

export function ExperienceTimeline() {
  return (
    <section aria-labelledby="experience-heading">
      <h2
        id="experience-heading"
        className="mb-6 font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl"
      >
        Experience
      </h2>
      <ol className="relative space-y-6 border-l border-border/60 pl-6">
        {EXPERIENCE.map((item) => (
          <li key={item.id} className="relative">
            <span
              className="absolute top-1.5 -left-[calc(0.75rem+1px)] size-2.5 rounded-full border-2 border-background bg-muted-foreground"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-sm font-medium text-foreground">
                {item.role} · {item.company}
              </h3>
              <time className="text-xs text-muted-foreground">{item.period}</time>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
