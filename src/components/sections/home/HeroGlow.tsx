"use client";

import { useEffect, useRef } from "react";
import { motion, prefersReducedMotion } from "@/lib/motion";

/** Max drift in px at the hero's edges — noticeable as the glow
 * follows the cursor, but still well short of parallax. */
const MAX_SHIFT = 24;

/**
 * Soft glow behind the monitor — faint mist-blue "screen light" fading
 * into the paper; brightens a touch while the monitor is hovered/focused.
 * Drifts noticeably toward the cursor anywhere over the hero section,
 * eased with the shared `motion.lerp` and settling back to center when
 * the pointer leaves. Disabled under prefers-reduced-motion and on
 * touch-only devices. Purely decorative.
 */
export function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    function tick() {
      current.x += (target.x - current.x) * motion.lerp;
      current.y += (target.y - current.y) * motion.lerp;
      const settled =
        Math.abs(target.x - current.x) < 0.01 &&
        Math.abs(target.y - current.y) < 0.01;
      if (settled) {
        current.x = target.x;
        current.y = target.y;
      }
      el!.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      frame = settled ? 0 : requestAnimationFrame(tick);
    }

    function start() {
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = section!.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      target.x = Math.max(-1, Math.min(1, nx)) * MAX_SHIFT;
      target.y = Math.max(-1, Math.min(1, ny)) * MAX_SHIFT;
      start();
    }

    function handlePointerLeave() {
      target.x = 0;
      target.y = 0;
      start();
    }

    section.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    section.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(frame);
      el.style.transform = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute top-[30%] left-1/2 aspect-4/3 w-[150%] -translate-1/2 rounded-full opacity-90 blur-3xl transition-opacity duration-(--duration-base) ease-(--ease-soft) will-change-transform group-has-[[data-monitor]:hover]/hero:opacity-100 group-has-[[data-monitor]:focus-visible]/hero:opacity-100 sm:top-[40%] sm:left-[48%] sm:w-[118%]"
      style={{
        background:
          "radial-gradient(closest-side, color-mix(in srgb, var(--color-mist-blue) 55%, white) 0%, color-mix(in srgb, color-mix(in srgb, var(--color-mist-blue) 55%, white) 70%, transparent) 45%, color-mix(in srgb, color-mix(in srgb, var(--color-mist-blue) 55%, white) 30%, transparent) 75%, transparent 100%)",
      }}
    />
  );
}
