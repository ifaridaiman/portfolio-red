import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";

export default function ArticleNotFound() {
  return (
    <SiteShell>
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-2xl font-medium text-foreground">
          Article not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This article may be unpublished or does not exist.
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/articles" />}
          variant="outline"
          className="mt-6"
        >
          View all articles
        </Button>
      </div>
    </SiteShell>
  );
}
