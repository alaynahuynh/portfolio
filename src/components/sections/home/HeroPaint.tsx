"use client";

import { useEffect, useRef } from "react";
import { motion, prefersReducedMotion } from "@/lib/motion";

interface Blob {
  color: string;
  size: number;
  /** Base position as a percentage of the container, blob stays centered here at rest. */
  baseX: number;
  baseY: number;
  /** How strongly this blob leans toward the cursor (0–1). */
  cursorWeight: number;
  /** Radius in px of its own idle wandering, independent of the cursor. */
  driftRadius: number;
  /** Offsets the idle drift cycle so blobs don't move in sync. */
  phase: number;
}

const blobs: Blob[] = [
  { color: "#f6d4e0", size: 440, baseX: 16, baseY: 30, cursorWeight: 0.1, driftRadius: 34, phase: 0 }, // blush pink
  { color: "#d6e5d1", size: 400, baseX: 80, baseY: 40, cursorWeight: 0.16, driftRadius: 44, phase: 2.1 }, // sage
  { color: "#e2d9f2", size: 380, baseX: 40, baseY: 78, cursorWeight: 0.2, driftRadius: 40, phase: 4.3 }, // lavender
  { color: "#f6e8ba", size: 300, baseX: 66, baseY: 12, cursorWeight: 0.14, driftRadius: 28, phase: 1.4 }, // butter yellow
  { color: "#f8dcc0", size: 320, baseX: 10, baseY: 70, cursorWeight: 0.18, driftRadius: 36, phase: 3.2 }, // peach
  { color: "#c9dbe8", size: 340, baseX: 90, baseY: 78, cursorWeight: 0.12, driftRadius: 30, phase: 5.0 }, // muted blue
];

/**
 * Cursor-reactive pastel blobs behind the hero content — idle drift on
 * their own, lean gently toward the pointer, layered with multiply blend
 * for a "wet paint" feel. A soft "ink bloom" follows the cursor closely
 * and intensifies while it's moving, fading over ~1.5s at rest, so color
 * feels like it's concentrating where you touch rather than just
 * position tracking. Fully static (no JS) under reduced motion.
 */
export function HeroPaint() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<Array<HTMLDivElement | null>>([]);
  const bloomRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const offsets = useRef(blobs.map(() => ({ x: 0, y: 0 })));
  const bloom = useRef({ x: 0, y: 0, intensity: 0 });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const container = containerRef.current;
    if (!container) return;

    let raf = 0;
    let active = true;

    function handlePointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function handlePointerLeave() {
      pointer.current = null;
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave);

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
    });
    observer.observe(container);

    function frame(t: number) {
      if (active) {
        const rect = container!.getBoundingClientRect();

        blobs.forEach((blob, i) => {
          const angle = t / 5000 + blob.phase;
          const idleX = Math.cos(angle) * blob.driftRadius;
          const idleY = Math.sin(angle * 1.3) * blob.driftRadius;

          let targetX = idleX;
          let targetY = idleY;

          if (pointer.current) {
            const baseXpx = (blob.baseX / 100) * rect.width;
            const baseYpx = (blob.baseY / 100) * rect.height;
            targetX += (pointer.current.x - baseXpx) * blob.cursorWeight;
            targetY += (pointer.current.y - baseYpx) * blob.cursorWeight;
          }

          const offset = offsets.current[i];
          offset.x += (targetX - offset.x) * motion.lerp;
          offset.y += (targetY - offset.y) * motion.lerp;

          const el = blobRefs.current[i];
          if (el) {
            el.style.transform = `translate(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px)`;
          }
        });

        // Ink bloom: chase the cursor closely, brighten on movement, decay at rest.
        const b = bloom.current;
        if (pointer.current) {
          b.x += (pointer.current.x - b.x) * 0.18;
          b.y += (pointer.current.y - b.y) * 0.18;
          b.intensity = Math.min(1, b.intensity + 0.06);
        } else {
          b.intensity = Math.max(0, b.intensity - 0.015);
        }
        const bloomEl = bloomRef.current;
        if (bloomEl) {
          bloomEl.style.transform = `translate(${b.x.toFixed(1)}px, ${b.y.toFixed(1)}px)`;
          bloomEl.style.opacity = b.intensity.toFixed(3);
        }
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          ref={(el) => {
            blobRefs.current[i] = el;
          }}
          className="absolute rounded-full opacity-70 mix-blend-multiply blur-3xl will-change-transform"
          style={{
            width: blob.size,
            height: blob.size,
            left: `${blob.baseX}%`,
            top: `${blob.baseY}%`,
            marginLeft: -blob.size / 2,
            marginTop: -blob.size / 2,
            backgroundColor: blob.color,
          }}
        />
      ))}

      <div
        ref={bloomRef}
        className="absolute size-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 mix-blend-soft-light blur-2xl will-change-transform"
        style={{
          left: 0,
          top: 0,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent-hover) 70%, white) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
