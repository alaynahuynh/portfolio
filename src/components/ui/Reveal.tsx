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
  /** Lift distance in px. Omit for the default (Tailwind translate-y-3). */
  y?: number;
  /** One duration in ms for both fade and lift. Omit for the default split
   * 450ms fade / 750ms lift. */
  duration?: number;
}

/**
 * Fades and lifts its children in once they scroll into view, primarily
 * via IntersectionObserver (not scroll-linked JS, so it's cheap) — but
 * backed by a rAF-throttled scroll/resize fallback that runs the same
 * geometry check directly, because the observer alone isn't reliable
 * when the page arrives at a deep scroll position in one jump rather
 * than gradually: a hash link (e.g. `/#sketchbook`), a scroll position
 * restored via `window.scrollTo` (see PlaygroundBook's "return to where
 * you left off"), or anything similar. In that situation this content
 * could otherwise stay stuck at opacity:0 indefinitely, with no further
 * natural scroll ever occurring to retrigger the observer — confirmed
 * via Chrome itself failing to re-fire the observer after a
 * programmatic `scrollTo()` landed an already-mounted Reveal deep inside
 * its target range, even many seconds later with no other scrolling.
 * The fallback listener is removed the instant either mechanism reveals
 * the content, so it only ever runs against Reveals that are still
 * hidden, not every Reveal on the page for its whole lifetime. Always
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
 *
 * Once `visible`, both the `translate-y-*` class and `transform` in
 * will-change are dropped rather than left sitting at their resting
 * values — a `transform` of exactly `translateY(0)` and a bare
 * `will-change: transform` each independently make this element a new
 * containing block for any `position: fixed` descendant (per spec), so
 * leaving either one in place after the reveal finishes silently breaks
 * a fixed-position modal/overlay rendered anywhere inside: it ends up
 * positioned relative to this div's own box instead of the viewport.
 * (This is how the hero's dog-info popup ended up pinned over whatever
 * section happens to be revealed, instead of covering the whole screen.)
 */
export function Reveal({ children, className, delay = 0, style, y, duration }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Same rough threshold as the observer's own `rootMargin` below —
    // true once this element is at or past where it should reveal.
    function pastThreshold() {
      return el!.getBoundingClientRect().top < window.innerHeight * 0.92;
    }

    let raf = 0;
    function cleanup() {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    }
    function reveal() {
      setVisible(true);
      cleanup();
    }
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (pastThreshold()) reveal();
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    if (pastThreshold()) {
      reveal();
      return;
    }

    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return cleanup;
  }, []);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transitionProperty: "opacity, transform",
        transitionDuration: duration ? `${duration}ms, ${duration}ms` : "450ms, 750ms",
        transitionTimingFunction: "var(--ease-portfolio)",
        transitionDelay: visible ? `${delay}ms, ${delay}ms` : "0ms, 0ms",
        willChange: visible ? "opacity" : "opacity, transform",
        ...(y !== undefined && !visible && { transform: `translateY(${y}px)` }),
      }}
      className={cn(
        visible ? "opacity-100" : cn("opacity-0", y === undefined && "translate-y-3"),
        className,
      )}
    >
      {children}
    </div>
  );
}
