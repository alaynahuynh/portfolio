"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { HoverUnderlineLabel } from "@/components/layout/HoverUnderlineLabel";

interface NavItemProps {
  href: string;
  label: string;
  active: boolean;
  /** Stagger position within the entrance sequence (see .nav-stagger-item in globals.css). */
  index: number;
  /** Override the default anchor navigation — used by Header for the "Work" link, which scrolls to an in-page section on the homepage instead of following its href as a normal route link. */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * One floating-nav text link.
 *
 * - Hover: HoverUnderlineLabel draws a brush stroke in under the label.
 * - Active: no shape, no animation — the label simply renders in
 *   meadow, the portfolio's interaction/accent color. This is a brief post-click
 *   flash, not a persistent "current page" indicator — see Header.tsx.
 * - Entrance: `.nav-stagger-item` (defined in globals.css) holds this
 *   item invisible until Header adds `.nav-ready` to the nav shell, at
 *   which point it fades/rises in on its own delay (`index`).
 */
export function NavItem({ href, label, active, index, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "nav-stagger-item group relative rounded-(--radius-pill) px-4 py-2 text-sm tracking-wide whitespace-nowrap text-muted-foreground transition-colors duration-(--duration-base) ease-(--ease-soft) hover:text-foreground",
        active && "text-meadow hover:text-meadow",
      )}
      style={{ animationDelay: `${230 + index * 55}ms` }}
    >
      <HoverUnderlineLabel label={label} />
    </Link>
  );
}
