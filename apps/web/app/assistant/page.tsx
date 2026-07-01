import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Digital Twin — Farid",
  description: "Talk to Farid's AI assistant.",
};

export default function AssistantPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl border border-border bg-muted/40 text-muted-foreground">
        <MessageSquare className="size-5" aria-hidden="true" />
      </div>
      <p className="mb-2 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Coming soon
      </p>
      <h1 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
        Digital Twin
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        An AI assistant that knows how I think, build, and deliver—arriving in a
        future release.
      </p>
      <Button
        nativeButton={false}
        render={<Link href="/" />}
        variant="outline"
        className="mt-8"
      >
        <ArrowLeft data-icon="inline-start" />
        Back home
      </Button>
    </div>
  );
}
