"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Small hand-drawn-style desk objects (thick outline, flat pastel fill)
 * used to dress the CreativeDesk section. Purely decorative: aria-hidden,
 * with a gentle hover nudge for anyone with a fine pointer.
 */

const wobble = "transition-transform duration-(--duration-base) ease-(--ease-spring)";

export function Pencil({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 140 32"
      className={cn("hover:-rotate-3 hover:-translate-y-0.5", wobble, className)}
    >
      <path
        d="M6 20 L100 12 L128 15 L134 16 L128 19 L100 20 L6 26 Z"
        fill="#f6e8ba"
        stroke="#2b2b2b"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M100 12 L108 19 L100 20 Z" fill="#e8a87c" stroke="#2b2b2b" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 20 L2 23 L6 26 Z" fill="#7a6a55" stroke="#2b2b2b" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="30" y1="17" x2="90" y2="14" stroke="#2b2b2b" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

export function Paintbrush({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 140"
      className={cn("hover:rotate-6 hover:-translate-y-0.5", wobble, className)}
    >
      <path d="M17 8 C14 4 22 2 24 6 L27 34 L13 34 Z" fill="#c9dbe8" stroke="#2b2b2b" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="14" y="33" width="12" height="18" fill="#e8a87c" stroke="#2b2b2b" strokeWidth="1.5" />
      <rect x="12" y="50" width="16" height="60" rx="3" fill="#f6e8ba" stroke="#2b2b2b" strokeWidth="1.5" />
      <rect x="14" y="112" width="12" height="20" rx="2" fill="#d6e5d1" stroke="#2b2b2b" strokeWidth="1.5" />
    </svg>
  );
}

export function PaintTube({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 100"
      className={cn("hover:-rotate-6 hover:-translate-y-0.5", wobble, className)}
    >
      <path d="M18 6 L42 6 L40 20 L20 20 Z" fill="#8a8a8a" stroke="#2b2b2b" strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d="M14 20 L46 20 L50 70 C50 82 42 90 30 90 C18 90 10 82 10 70 Z"
        fill="#f6d4e0"
        stroke="#2b2b2b"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M16 34 L44 34" stroke="#2b2b2b" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

export function SwatchStrip({ className }: { className?: string }) {
  const colors = ["#f6d4e0", "#d6e5d1", "#e2d9f2", "#f6e8ba", "#f8dcc0", "#c9dbe8"];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 160"
      className={cn("hover:rotate-3 hover:-translate-y-0.5", wobble, className)}
    >
      <rect x="1" y="1" width="38" height="158" rx="4" fill="#fffdf9" stroke="#2b2b2b" strokeWidth="1.5" />
      {colors.map((c, i) => (
        <circle key={c} cx="20" cy={18 + i * 24} r="9" fill={c} stroke="#2b2b2b" strokeWidth="1.2" />
      ))}
    </svg>
  );
}

export function Palette({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 90"
      className={cn("hover:-rotate-3 hover:-translate-y-0.5", wobble, className)}
    >
      <path
        d="M60 4 C90 4 114 24 114 48 C114 66 100 68 88 62 C80 58 76 64 82 70 C86 74 82 82 72 82 C36 82 6 68 6 44 C6 20 30 4 60 4 Z"
        fill="#f8dcc0"
        stroke="#2b2b2b"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <ellipse cx="40" cy="30" rx="7" ry="6" fill="#f6d4e0" stroke="#2b2b2b" strokeWidth="1" />
      <ellipse cx="62" cy="24" rx="7" ry="6" fill="#d6e5d1" stroke="#2b2b2b" strokeWidth="1" />
      <ellipse cx="82" cy="34" rx="7" ry="6" fill="#e2d9f2" stroke="#2b2b2b" strokeWidth="1" />
      <ellipse cx="34" cy="52" rx="7" ry="6" fill="#f6e8ba" stroke="#2b2b2b" strokeWidth="1" />
      <ellipse cx="56" cy="60" rx="7" ry="6" fill="#c9dbe8" stroke="#2b2b2b" strokeWidth="1" />
    </svg>
  );
}

export function Eraser({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 70 34"
      className={cn("hover:rotate-3 hover:-translate-y-0.5", wobble, className)}
    >
      <rect x="2" y="2" width="66" height="30" rx="5" fill="#f6d4e0" stroke="#2b2b2b" strokeWidth="1.5" />
      <rect x="2" y="18" width="66" height="14" rx="5" fill="#fffdf9" stroke="#2b2b2b" strokeWidth="1.5" />
      <line x1="3" y1="18" x2="67" y2="18" stroke="#2b2b2b" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export function Ruler({ className }: { className?: string }) {
  const ticks = Array.from({ length: 11 }, (_, i) => i * 16 + 8);
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 28"
      className={cn("hover:-rotate-2 hover:-translate-y-0.5", wobble, className)}
    >
      <rect x="2" y="2" width="176" height="24" rx="3" fill="#f6e8ba" stroke="#2b2b2b" strokeWidth="1.5" />
      {ticks.map((x, i) => (
        <line key={x} x1={x} y1="2" x2={x} y2={i % 2 === 0 ? 15 : 10} stroke="#2b2b2b" strokeWidth="1" opacity="0.5" />
      ))}
    </svg>
  );
}

const paletteColors = ["#f6d4e0", "#d6e5d1", "#e2d9f2", "#f6e8ba", "#f8dcc0", "#c9dbe8"];

/**
 * A loose paint splash + a few trailing droplets — pure background
 * texture for the desk (aria-hidden, no hover, no interaction). Keep
 * these low-opacity and off to the sides so they read as "a desk that's
 * seen some use" rather than competing with the paintings.
 */
export function PaintSplatter({
  className,
  colorIndex = 0,
}: {
  className?: string;
  colorIndex?: number;
}) {
  const color = paletteColors[colorIndex % paletteColors.length];
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={cn("pointer-events-none", className)}>
      <path
        d="M45 8 C58 6 70 18 66 32 C79 36 83 50 71 58 C74 72 60 83 47 76 C37 86 19 80 21 66 C7 63 4 47 17 39 C11 27 24 11 39 17 C39 11 42 9 45 8 Z"
        fill={color}
      />
      <circle cx="86" cy="68" r="4.5" fill={color} />
      <circle cx="92" cy="80" r="2.5" fill={color} />
      <circle cx="8" cy="82" r="3" fill={color} />
    </svg>
  );
}

const tapeColors = paletteColors;

export function Tape({ className, colorIndex = 0 }: { className?: string; colorIndex?: number }) {
  const color = tapeColors[colorIndex % tapeColors.length];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-6 w-16 opacity-80 shadow-sm transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:-translate-y-1",
        className,
      )}
      style={{
        backgroundColor: color,
        backgroundImage:
          "repeating-linear-gradient(115deg, rgba(255,255,255,0.35) 0 4px, transparent 4px 10px)",
      }}
    />
  );
}

/**
 * Wraps a small prop (pencil, eraser, ...) to make it freely nudgeable —
 * used sparingly, for delight, not on every object. Constrained + elastic
 * so it always settles back near home rather than wandering the page. The
 * drag-release spring is a distinct animation path from whileHover/etc.,
 * so it needs its own explicit reduced-motion check rather than relying
 * on the root MotionConfig.
 */
export function DraggableProp({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const dragTransition = prefersReducedMotion
    ? { bounceStiffness: 1000, bounceDamping: 60 }
    : { bounceStiffness: 500, bounceDamping: 22 };

  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragConstraints={{ top: -24, bottom: 24, left: -32, right: 32 }}
      dragTransition={dragTransition}
      whileDrag={{ scale: 1.1 }}
      className={cn("touch-none cursor-grab active:cursor-grabbing", className)}
    >
      {children}
    </motion.div>
  );
}
