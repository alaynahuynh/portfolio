import Link from "next/link";
import type { ReactNode } from "react";
import { rememberBookScrollPosition } from "@/lib/book-return";
import { cn } from "@/lib/utils";

interface SketchbookArtworkLinkProps {
  href: string;
  /** Gallery name, used in the link's accessible name ("2D Works"). */
  gallery: string;
  /** Text color for the handwritten annotation, matching the spread. */
  accentClassName: string;
  /** Overrides the annotation's default placement (under the bottom-right). */
  annotationClassName?: string;
  children: ReactNode;
}

/**
 * Makes a sketchbook spread's featured artwork a link into its gallery,
 * alongside the spread's "Explore … Works →" text link.
 *
 * Hover/focus lifts the piece 3px (motion-safe only) and deepens its
 * drop shadow, which follows the image's own alpha so pre-styled art
 * (tape, torn edges) casts a natural shadow. A handwritten "take a
 * closer look ↗" sits beneath it at all times as a visible cue.
 *
 * Clicks on links are ignored by BookPage's page-turn handler, and
 * rememberBookScrollPosition lets the gallery's back link return here.
 */
export function SketchbookArtworkLink({
  href,
  gallery,
  accentClassName,
  annotationClassName,
  children,
}: SketchbookArtworkLinkProps) {
  return (
    <Link
      href={href}
      data-cursor="explore"
      onClick={rememberBookScrollPosition}
      aria-label={`Take a closer look: open the ${gallery} gallery`}
      className="group/art relative block cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-deep"
    >
      <div className="drop-shadow-[0_0_0_rgba(46,50,42,0)] transition-[transform,filter] duration-(--duration-base) ease-(--ease-soft) group-hover/art:drop-shadow-[0_12px_16px_rgba(46,50,42,0.22)] group-focus-visible/art:drop-shadow-[0_12px_16px_rgba(46,50,42,0.22)] motion-safe:group-hover/art:-translate-y-[3px] motion-safe:group-focus-visible/art:-translate-y-[3px]">
        {children}
      </div>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-full right-3 mt-1.5 -rotate-3 font-alayna-handwriting text-xl leading-none whitespace-nowrap",
          accentClassName,
          annotationClassName,
        )}
      >
        take a closer look ↗
      </span>
    </Link>
  );
}
