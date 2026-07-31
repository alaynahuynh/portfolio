import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4;

const levelClasses: Record<HeadingLevel, string> = {
  1: "text-4xl sm:text-6xl font-semibold tracking-tight",
  2: "text-3xl sm:text-4xl font-semibold tracking-tight",
  3: "text-xl sm:text-2xl font-semibold tracking-tight",
  4: "text-lg font-medium",
};

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  /** Visual size, independent of the semantic level (defaults to match level). */
  size?: HeadingLevel;
}

/**
 * Semantic + visual heading in one place. Use `level` for correct
 * document structure and `size` when you need a mismatch (e.g. an h2
 * that should look like an h4).
 */
export function Heading({ level = 2, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cn(levelClasses[size ?? level], className)} {...props} />;
}
