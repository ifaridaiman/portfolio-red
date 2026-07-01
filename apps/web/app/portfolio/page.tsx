import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Portfolio — Farid",
  description: "Selected work and engineering projects.",
};

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="mb-2 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Coming soon
      </p>
      <h1 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
        Portfolio
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Case studies and shipped systems are on the way.
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
