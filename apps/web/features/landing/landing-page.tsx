import { ExploreSection } from "./components/explore-section";
import { LandingHero } from "./components/landing-hero";
import { LandingNav } from "./components/landing-nav";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <main>
        <LandingHero />
        <ExploreSection />
      </main>
      <footer className="border-t border-border/50 px-4 py-6 text-center text-[11px] text-muted-foreground sm:px-6 sm:py-8 sm:text-xs md:px-8">
        <p>© {new Date().getFullYear()} Farid. Built with care.</p>
      </footer>
    </div>
  );
}
