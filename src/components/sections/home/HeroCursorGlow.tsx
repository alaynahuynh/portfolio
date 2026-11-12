"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Soft light that follows the cursor across the hero, brightening the
 * navy around the pointer like a small lamp. Sits behind the hero's
 * objects, fades in when the pointer enters the section and out when it
 * leaves. Only on devices with a fine pointer (no cursor on touch).
 * Position is written straight to CSS variables in a rAF, so moving the
 * mouse never re-renders React.
 */
export function HeroCursorGlow({
  core = "var(--hero-cursor-core)",
  edge = "var(--hero-cursor-edge)",
  className,
}: {
  /** Glow colors; default to the homepage hero's per-theme variables. */
  core?: string;
  edge?: string;
  className?: string;
} = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    function paint() {
      frame = 0;
      el!.style.setProperty("--glow-x", `${x}px`);
      el!.style.setProperty("--glow-y", `${y}px`);
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = section!.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      el!.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(paint);
    }

    function handlePointerLeave() {
      el!.style.opacity = "0";
    }

    section.addEventListener("pointermove", handlePointerMove, { passive: true });
    section.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-(--duration-slow) ease-(--ease-soft)",
        className,
      )}
      style={{
        background: `radial-gradient(200px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${core}, ${edge} 45%, transparent 75%)`,
      }}
    />
  );
}
