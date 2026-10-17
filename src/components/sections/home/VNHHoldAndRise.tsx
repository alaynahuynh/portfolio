"use client";

import { useEffect, useRef } from "react";
import { VNHSpread } from "@/components/sections/home/ProjectPlaceholder";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { prefersReducedMotion } from "@/lib/motion";
import type { Project } from "@/types";

// How long Vietnamese Noodle House holds fully in place, pinned and
// untouched, once scrolled to — before the rising cream panel starts
// moving at all.
const HOLD_VH = 35;
// Scroll distance the rise itself plays out over, once the hold ends.
const RISE_VH = 55;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Vietnamese Noodle House's own closing beat: the section holds fully
 * in place for a stretch once you've scrolled to it, then a cream panel
 * (its leading edge the same hand-painted curve as WaveDivider) rises up
 * to cover it, handing off into the sketchbook below — the same
 * "arrive → pause → the next page rises to cover it" beat the original
 * had.
 *
 * Deliberately its own small, self-contained, bounded sticky track —
 * `100vh + HOLD_VH + RISE_VH` tall, released the instant the rise
 * finishes — rather than merging this hold-and-rise into the
 * sketchbook's own scroll track the way the original CreativePracticeBook
 * did (one giant track covering the VNH handoff *and* the book's pages
 * *and* its chapter-dot state together). That merge is exactly what the
 * dead-zone/overlap scroll bugs elsewhere in this codebase traced back
 * to; this uses the same simple, bounded-track pattern Hero.tsx and
 * PlaygroundBook already use for their own pinned sections instead, so
 * there's nothing here for this track's math to get out of sync with.
 *
 * VNHSpread itself renders completely normally underneath — real,
 * interactive content, not a static copy — and is only actually hidden
 * once the rising panel has visually finished covering it.
 */
export function VNHHoldAndRise({ project, index }: { project: Project; index: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const risingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;

    function computeAndApply() {
      const rect = track!.getBoundingClientRect();
      const totalScrollable = track!.offsetHeight - window.innerHeight;
      const scrolledPx = clamp(-rect.top, 0, totalScrollable);

      const holdPx = (HOLD_VH / 100) * window.innerHeight;
      const risePx = (RISE_VH / 100) * window.innerHeight;
      const riseProgress = risePx > 0 ? clamp((scrolledPx - holdPx) / risePx, 0, 1) : 0;

      if (risingRef.current) {
        risingRef.current.style.transform = `translateY(${(100 * (1 - riseProgress)).toFixed(2)}%)`;
      }
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        computeAndApply();
        raf = 0;
      });
    }

    computeAndApply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (prefersReducedMotion()) {
    return <VNHSpread project={project} index={index} />;
  }

  return (
    <div ref={trackRef} className="relative" style={{ height: `${100 + HOLD_VH + RISE_VH}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* VNHSpread's own section only grows to its natural content
            height (`lg:min-h-[85vh]`, matching the other project
            spreads) — shorter than this `h-screen` sticky box at most
            viewport heights. Without this wrapper supplying the same
            dominantColor across the *entire* box and centering
            VNHSpread inside it, the sticky box's own default background
            would show through below/above VNHSpread once pinned, so the
            green wouldn't actually reach the screen's edges the instant
            scroll stops here — which is the whole cue that triggers the
            hold. This is what makes that reliable regardless of
            viewport size or how tall VNHSpread's own content happens to
            render. */}
        <div
          className="absolute inset-0 flex flex-col justify-center"
          style={{ backgroundColor: project.dominantColor }}
        >
          <VNHSpread project={project} index={index} />
        </div>

        {/* The incoming cream panel — starts fully below the viewport
            (translateY(100%)) and rises to translateY(0) as the user
            scrolls through the rise phase, its own leading edge the
            wave curve. Moves as one rigid unit, so the curve always
            rides exactly at the panel's own top no matter how far it's
            risen.
            No `pointer-events-none` on this wrapper (unlike
            WaveDivider's own thin curve strip, which keeps its built-in
            one so clicks still reach VNH through its transparent part
            while only partially risen): once the solid fill below the
            curve has risen over VNH's own "View Case Study" link, clicks
            there should hit this cream panel, not an invisible link
            still sitting underneath it. */}
        <div ref={risingRef} aria-hidden="true" className="absolute inset-0" style={{ transform: "translateY(100%)" }}>
          <WaveDivider heightClassName="h-[12vh]" />
          <div className="absolute inset-x-0 top-[12vh] bottom-0 bg-background" />
        </div>
      </div>
    </div>
  );
}
