"use client";

import { useEffect, useRef } from "react";

/** Where the clickable things sit in the painting box (percent of the
 * 4320×2700 canvas; see hero-config). The piano's height comes from its
 * image aspect (464/483) times the canvas aspect (4320/2700). */
export const SPOTS = [
  { key: "gobi", left: 54.097, top: 73.074, width: 5.833, height: 12.444 },
  { key: "yoshi", left: 65.394, top: 67.778, width: 14.096, height: 21.592 },
  { key: "piano", left: 85.231, top: 64.074, width: 11.181, height: 11.181 * 1.6 * (464 / 483) },
] as const;

/** How far (px) from a spot its hover hint starts. */
const REACH = 170;

/**
 * Hover hints for the Playground painting. As the pointer nears Gobi, Yoshi
 * or the piano, writes how near it is (0-1) to `--near-gobi`,
 * `--near-yoshi` and `--near-piano` on the section. PlaygroundLandscape
 * uses those (see .near-hint in globals.css) to lift the night off
 * the thing itself, so its own painted colors come back, and add a thin
 * warm rim around its outline.
 * Pointer-only (no hover on touch); written straight to CSS variables, so
 * moving never re-renders.
 */
export function PlaygroundGlow() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = ref.current?.parentElement;
    const section = box?.closest("section");
    if (!box || !section || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let px = -9999;
    let py = -9999;

    function paint() {
      frame = 0;
      const b = box!.getBoundingClientRect();
      for (const s of SPOTS) {
        const l = b.left + (s.left / 100) * b.width;
        const t = b.top + (s.top / 100) * b.height;
        const w = (s.width / 100) * b.width;
        const h = (s.height / 100) * b.height;
        // Distance from the pointer to the spot's core (the middle 60%).
        const cx = Math.max(l + w * 0.2, Math.min(px, l + w * 0.8));
        const cy = Math.max(t + h * 0.2, Math.min(py, t + h * 0.8));
        const near = Math.max(0, 1 - Math.hypot(px - cx, py - cy) / REACH);
        // On the section, so the cursor glow (outside the painting box) can
        // read them too.
        section!.style.setProperty(`--near-${s.key}`, (near * near * (3 - 2 * near)).toFixed(3));
      }
    }

    function onMove(e: PointerEvent) {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    }
    function onLeave() {
      px = py = -9999;
      if (!frame) frame = requestAnimationFrame(paint);
    }

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={ref} aria-hidden="true" hidden />;
}

/** Points a `.near-hint` wrapper (see globals.css) at one spot's nearness. */
export function nearVar(key: (typeof SPOTS)[number]["key"]) {
  return { "--n": `var(--near-${key}, 0)` } as React.CSSProperties;
}
