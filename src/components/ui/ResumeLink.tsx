import Link from "next/link";
import { resumeUrl } from "@/lib/resume";
import { cn } from "@/lib/utils";

/**
 * Renders the resume link, or — while `resumeUrl` is still null — a
 * disabled, unfocusable label instead of a broken link. Shared by the
 * nav and the hero's secondary action so both stay in sync automatically
 * once the resume file is added.
 */
export function ResumeLink({ className, onClick }: { className?: string; onClick?: () => void }) {
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
    <Link href={resumeUrl} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
      Resume
    </Link>
  );
}
