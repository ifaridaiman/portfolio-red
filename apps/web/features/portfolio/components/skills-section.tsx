import { SKILLS } from "../constants/portfolio-content";

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading">
      <h2
        id="skills-heading"
        className="mb-4 font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl"
      >
        Skills & Technologies
      </h2>
      <ul className="flex flex-wrap gap-2" role="list">
        {SKILLS.map((skill) => (
          <li key={skill}>
            <span className="inline-flex items-center rounded-full border border-border/70 bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
              {skill}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
