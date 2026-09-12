"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Extra transition delay in ms — use to stagger a group of Reveals. */
  delay?: number;
  /** Merged into the root element's own transition/will-change style —
   * for static values only (e.g. backgroundColor), never anything that
   * would fight the transition properties Reveal itself manages. */
  style?: React.CSSProperties;
}

/**
 * Fades and lifts its children in once they scroll into view, via
 * IntersectionObserver (not scroll-linked JS, so it's cheap). Always
 * starts from the same "hidden" state on server and client to avoid a
 * hydration mismatch — under prefers-reduced-motion the global transition
 * rule in globals.css collapses the animation to ~0ms, so content still
 * appears correctly, just without the motion.
 *
 * Durations are tuned locally rather than reusing --duration-slow (that's
 * shared by unrelated hover transitions elsewhere, so bumping it would
 * ripple beyond this) — but the easing curve itself is the shared
 * --ease-portfolio token, the one curve every scroll-reveal/large-imagery
 * entrance sitewide uses, so a fade-up here and a fade-up in a case study
 * move identically. A smaller lift distance reads as a gentle settle
 * rather than a snap into place, and opacity is given a
 * shorter duration than the transform (both set explicitly below, since
 * Tailwind's transition utilities can't express two different durations
 * on one element) so the fade completes first and the slide finishes on
 * its own, rather than both hitting their end state at the exact same
 * instant — that shared stop is what reads as mechanical/abrupt rather
 * than smooth. will-change hints the browser to composite the animating
 * layer instead of repainting it every frame, which is what actually
 * reads as "janky" on longer pages like these case studies with many
 * Reveals in flight.
 */
export function Reveal({ children, className, delay = 0, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transitionProperty: "opacity, transform",
        transitionDuration: "450ms, 750ms",
        transitionTimingFunction: "var(--ease-portfolio)",
        transitionDelay: visible ? `${delay}ms, ${delay}ms` : "0ms, 0ms",
        willChange: "opacity, transform",
      }}
      className={cn(visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3", className)}
    >
      {children}
    </div>
  );
}
