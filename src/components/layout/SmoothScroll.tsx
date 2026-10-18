"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Sitewide eased scrolling (Lenis). Wheel/trackpad input glides to rest
 * instead of stepping; touch devices keep native scrolling. Lenis drives
 * the real window scroll position, so every existing `scroll` listener,
 * `scrollIntoView`, and `window.scrollTo` keeps working unchanged.
 *
 * Lenis honors `prefers-reduced-motion` on its own (smoothing off, jumps
 * instant), matching the reduced-motion rules in globals.css.
 */

/** The homepage gets a softer glide — it's a scroll-driven storybook.
 * Everywhere else (case studies, playground, etc.) is for reading and
 * scanning, so it settles faster, close to native pace.
 * Lower `lerp` = longer glide (Lenis default 0.1); `wheelMultiplier`
 * below 1 moves less per wheel notch. */
const HOME_FEEL = { lerp: 0.1, wheelMultiplier: 1 };
const DEFAULT_FEEL = { lerp: 0.15, wheelMultiplier: 1 };

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      ...DEFAULT_FEEL,
      // Measure <body>, not <html>: `h-full` pins <html> to the viewport
      // height, so Lenis's ResizeObserver on it never fires as content
      // loads in (images, reveals, expanding book pages) and scrolling
      // would stop at a stale page end. <body> grows with the content.
      content: document.body,
      autoRaf: true,
      anchors: true,
      // Let modals, book pages, and other overflow-y-auto panels scroll
      // themselves instead of the page.
      allowNestedScroll: true,
      // Don't carry momentum from one page into the next on navigation.
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;

    // The lightbox, dog modal, and mobile menu lock the page by setting
    // `body.style.overflow = "hidden"`. Lenis would otherwise still scroll
    // the window behind them, so pause it whenever that lock is on.
    const syncLock = () => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    syncLock();

    return () => {
      observer.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis reads these options on every scroll, so swapping them per route
  // needs no re-init.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    Object.assign(lenis.options, pathname === "/" ? HOME_FEEL : DEFAULT_FEEL);
  }, [pathname]);

  return null;
}
