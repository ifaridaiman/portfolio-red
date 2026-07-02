import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-xs font-medium tracking-wide text-foreground uppercase",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
