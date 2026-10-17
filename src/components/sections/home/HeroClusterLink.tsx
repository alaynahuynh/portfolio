import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeroClusterLinkProps {
  href: string;
  /** Real accessible name stating the destination — screen reader users
   * never trigger hover, so this (not the visual tooltip/caption below)
   * is what actually has to carry this information. */
  label: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared wrapper for the hero's three cluster objects (monitor,
 * Playground tab, About sticky note) — no visible "Work"/"Playground"/
 * "About" caption baked into any of them individually, so this is the
 * one place that handles:
 *
 * - The accessible name (`aria-label`, since every object is purely
 *   decorative/iconographic otherwise).
 * - The destination label's two different presentations — see the
 *   `.hero-cluster-tooltip` rules in globals.css: a floating hover/focus
 *   pill on devices with real hover support, a permanent small caption
 *   on touch devices, picked via `@media (hover: hover) and
 *   (pointer: fine)` rather than guessed from viewport width (a touch
 *   laptop or a desktop with only a touchscreen would otherwise get the
 *   wrong one).
 * - The hover/focus lift + deeper shadow on the object itself (see
 *   `.hero-cluster-object`) — independent visual feedback that doesn't
 *   depend on the visitor noticing or reading the label at all.
 *
 * Each object renders its own visual content as `children`; this only
 * supplies the positioning context, the label, and the shared
 * interaction affordances around it.
 */
export function HeroClusterLink({
  href,
  label,
  children,
  className,
}: HeroClusterLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "hero-cluster-link group/cluster relative block",
        className,
      )}
    >
      <span className="hero-cluster-object block">{children}</span>
      <span aria-hidden="true" className="hero-cluster-tooltip">
        {label}
      </span>
    </Link>
  );
}
