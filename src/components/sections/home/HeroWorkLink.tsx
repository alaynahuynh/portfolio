"use client";

import { prefersReducedMotion } from "@/lib/motion";

interface HeroWorkLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

/**
 * The hero monitor's link down to Selected Work. Split out of Hero.tsx
 * (a plain server component) since this one link is the only piece of
 * the hero that needs client-side JS — the "already at #work" edge case
 * Header.tsx's own scrollToSection solves for the nav's Work link: a
 * plain `href="#work"` would silently no-op if the hash is already
 * "#work" from an earlier click.
 */
export function HeroWorkLink({ children, onClick, ...props }: HeroWorkLinkProps) {
  function scrollToWork(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    const target = document.getElementById("work");
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <a href="#work" onClick={scrollToWork} {...props}>
      {children}
    </a>
  );
}
