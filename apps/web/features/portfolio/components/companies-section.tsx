import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { COMPANIES } from "../constants/portfolio-content";

export function CompaniesSection() {
  return (
    <section aria-labelledby="companies-heading">
      <h2
        id="companies-heading"
        className="mb-6 font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl"
      >
        Companies I Work With
      </h2>
      <ul className="grid gap-4" role="list">
        {COMPANIES.map((company) => (
          <li key={company.id}>
            <article className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-colors hover:bg-card/60 sm:p-6">
              <Link
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-describedby={`desc-${company.id}`}
              >
                <h3 className="text-base font-medium text-foreground group-hover:underline">
                  {company.name}
                </h3>
                <ExternalLink
                  className="size-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
              </Link>
              <p
                id={`desc-${company.id}`}
                className="mt-2 text-sm leading-relaxed text-muted-foreground"
              >
                {company.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
