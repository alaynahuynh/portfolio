import { resumeUrl } from "@/lib/resume";
import { cn } from "@/lib/utils";

/**
 * Renders the resume link, or — while `resumeUrl` is still null — a
 * disabled, unfocusable label instead of a broken link. Shared by the
 * nav and the hero's secondary action so both stay in sync automatically
 * once the resume file is added. `children` lets a caller (e.g. the
 * hero's "Resume ↗" CTA) add its own arrow/affordance; defaults to plain
 * "Resume" text. The disabled state always shows plain "Resume" — no
 * arrow — since it isn't actually a working link yet.
 */
export function ResumeLink({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  if (!resumeUrl) {
    return (
      <span
        aria-disabled="true"
        tabIndex={-1}
        title="Resume coming soon"
        className={cn("cursor-default text-muted-foreground/60", className)}
      >
        Resume
      </span>
    );
  }

  return (
    // A plain <a>: the résumé is a static PDF, not a route to prefetch.
    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
      {children ?? "Resume"}
    </a>
  );
}
