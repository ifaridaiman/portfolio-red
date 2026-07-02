import { ExploreSection } from "./components/explore-section";
import { LandingHero } from "./components/landing-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <LandingHero />
        <ExploreSection />
      </main>
      <SiteFooter />
    </div>
  );
}
