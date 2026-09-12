import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Set false for sections that shouldn't be horizontally padded/centered internally. */
  contained?: boolean;
}

/**
 * Vertical rhythm wrapper for page sections (hero, projects grid, about, etc.).
 * Handles consistent top/bottom spacing and, by default, wraps children in Container.
 */
export function Section({
  className,
  contained = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-20 sm:py-28", className)} {...props}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
