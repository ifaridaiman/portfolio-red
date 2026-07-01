import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingNav() {
  return (
    <header className="relative z-10 flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 sm:px-6 sm:py-5 md:px-8">
      <Link
        href="/"
        className="text-sm font-medium tracking-tight text-foreground transition-opacity duration-300 hover:opacity-70"
        aria-label="Farid — home"
      >
        Farid
      </Link>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-0.5 sm:gap-2">
          <li>
            <Button
              nativeButton={false}
              render={<Link href="/portfolio" />}
              variant="ghost"
              size="sm"
              className="h-9 px-2.5 text-xs text-muted-foreground sm:h-9 sm:px-4 sm:text-xs"
            >
              Portfolio
            </Button>
          </li>
          <li>
            <Button
              nativeButton={false}
              render={<Link href="/assistant" />}
              variant="outline"
              size="sm"
              className="h-9 px-2.5 text-xs sm:px-4"
            >
              <span className="sm:hidden">Twin</span>
              <span className="hidden sm:inline">Digital Twin</span>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
