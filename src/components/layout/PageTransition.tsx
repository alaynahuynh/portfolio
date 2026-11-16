"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";

/**
 * Animates every route change: keyed by pathname, so a navigation exits
 * the old page and enters the new one (classes `page-exit` / `page-enter`,
 * styled in globals.css). `default="none"` keeps it still for anything
 * that isn't a route change. Shared elements inside (the project media
 * named `project-media-<slug>`) morph on top of this on their own.
 *
 * Hash-only changes keep the same pathname, so in-page jumps like
 * `/#work` from the homepage don't animate.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
