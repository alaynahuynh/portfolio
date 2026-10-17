import { useId } from "react";
import { cn } from "@/lib/utils";

/** Grid pitch and cluster radius in viewBox units (the SVG is 2R square). */
const PITCH = 10;
const R = 100;

/**
 * Dots on a square grid, largest at the center and shrinking toward the
 * edge — a print-style halftone falloff. Computed once at module load;
 * dots too small to render are dropped.
 */
const DOTS = (() => {
  const dots: { cx: number; cy: number; r: number }[] = [];
  for (let y = PITCH / 2; y < R * 2; y += PITCH) {
    for (let x = PITCH / 2; x < R * 2; x += PITCH) {
      const t = Math.hypot(x - R, y - R) / R;
      if (t >= 1) continue;
      const r = PITCH * 0.48 * (1 - t ** 2.2);
      if (r > 0.35) dots.push({ cx: x, cy: y, r: Number(r.toFixed(2)) });
    }
  }
  return dots;
})();

/**
 * Decorative halftone dot cluster for the hero, tinted like screen
 * light: lake blue at the center through pale sky to transparent at the
 * edge, so the cluster dissolves into the paper rather than ending. Kept
 * at low opacity so it reads as texture behind the objects, never a
 * focal point. Position, size, and opacity come from `className`.
 */
export function HeroHalftone({ className }: { className?: string }) {
  // Each instance needs its own gradient id; strip useId's punctuation
  // so it's safe inside url(#…).
  const gradientId = `halftone-${useId().replace(/[^\w-]/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${R * 2} ${R * 2}`}
      className={cn("pointer-events-none absolute aspect-square", className)}
    >
      <defs>
        <radialGradient
          id={gradientId}
          cx={R}
          cy={R}
          r={R}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--color-lake-blue)" />
          <stop
            offset="50%"
            stopColor="color-mix(in srgb, var(--color-sky) 30%, white)"
          />
          <stop
            offset="100%"
            stopColor="color-mix(in srgb, var(--color-sky) 15%, white)"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>
      <g fill={`url(#${gradientId})`}>
        {DOTS.map(({ cx, cy, r }) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>
    </svg>
  );
}
