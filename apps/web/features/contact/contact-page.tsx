import { SiteShell } from "@/components/site/site-shell";
import { ContactForm } from "./components/contact-form";

export function ContactPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-lg px-4 py-10 sm:px-6 sm:py-14 md:px-8">
        <header className="mb-10">
          <p className="mb-2 text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase sm:text-[11px]">
            Get in touch
          </p>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Contact
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Have a project in mind or want to collaborate? Send me a message and
            I&apos;ll respond as soon as I can.
          </p>
        </header>

        <ContactForm />
      </div>
    </SiteShell>
  );
}
