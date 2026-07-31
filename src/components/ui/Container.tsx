import { cn } from "@/lib/utils";

type ContainerTag = "div" | "section" | "main" | "article" | "header" | "footer";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: ContainerTag;
}

/**
 * Centers content and caps its width (see --container-max in globals.css).
 * Wrap page sections in this instead of repeating max-width/padding classes.
 */
export function Container({
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-(--container-max) px-6 sm:px-8", className)}
      {...props}
    />
  );
}
