import { SERVICES } from "../constants/portfolio-content";

export function ServicesSection() {
  return (
    <section aria-labelledby="services-heading">
      <h2
        id="services-heading"
        className="mb-6 font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl"
      >
        What I Can Do for You
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {SERVICES.map((service) => (
          <li key={service.id}>
            <article className="h-full rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm sm:p-6">
              <h3 className="text-sm font-medium text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
