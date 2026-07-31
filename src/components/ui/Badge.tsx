import { cn } from "@/lib/utils";

/** Small pill used for project tags/categories. */
export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
