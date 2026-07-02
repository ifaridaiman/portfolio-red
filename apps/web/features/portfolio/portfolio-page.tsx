import { SiteShell } from "@/components/site/site-shell";
import { CompaniesSection } from "./components/companies-section";
import { ExperienceTimeline } from "./components/experience-timeline";
import { ServicesSection } from "./components/services-section";
import { SkillsSection } from "./components/skills-section";
import { PORTFOLIO_BIO } from "./constants/portfolio-content";

export function PortfolioPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 md:px-8">
        <header className="mb-12 max-w-2xl">
          <p className="mb-2 text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase sm:text-[11px]">
            Portfolio
          </p>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Farid Aiman
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">@ifaridaiman</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {PORTFOLIO_BIO}
          </p>
        </header>

        <div className="space-y-16 sm:space-y-20">
          <CompaniesSection />
          <ServicesSection />
          <ExperienceTimeline />
          <SkillsSection />
        </div>
      </div>
    </SiteShell>
  );
}
