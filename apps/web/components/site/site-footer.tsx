import Link from "next/link";
import { SOCIAL_LINKS } from "@/features/portfolio/constants/portfolio-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 px-4 py-6 sm:px-6 sm:py-8 md:px-8">
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <p className="text-[11px] text-muted-foreground sm:text-xs">
          © {new Date().getFullYear()} Farid. Built with care.
        </p>
        <nav aria-label="Social media links">
          <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-[11px] sm:text-xs">
            {SOCIAL_LINKS.map(({ label, href }, index) => (
              <li key={href} className="flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-muted-foreground/50" aria-hidden="true">
                    |
                  </span>
                )}
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
