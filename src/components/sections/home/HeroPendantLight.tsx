"use client";

import { useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type HeroTheme = "light" | "dark";

/**
 * A small pendant bulb hanging from the top of the hero on a cord: the
 * hero's light/dark control. Lit (warm glow) while the hero is light;
 * clicking switches it off and the hero goes dark, clicking again turns it
 * back on. Hover/focus lowers it a little on its cord, and each click sets
 * it swinging gently.
 *
 * The cord starts above the section's top edge (the section clips it), so
 * lowering the bulb never shows the cord's end.
 */

/** A damped pendulum: equal time per swing (like a real pendulum), each
 * swing smaller than the last, easing in and out at every turnaround.
 * Offsets follow the timing — a quarter swing out, five half swings, a
 * quarter swing back to rest — so the motion never speeds up or stalls. */
const SWING: Keyframe[] = [
  { transform: "rotate(0deg)", offset: 0, easing: "cubic-bezier(0.33, 1, 0.68, 1)" },
  { transform: "rotate(7deg)", offset: 1 / 12, easing: "cubic-bezier(0.37, 0, 0.63, 1)" },
  { transform: "rotate(-5deg)", offset: 3 / 12, easing: "cubic-bezier(0.37, 0, 0.63, 1)" },
  { transform: "rotate(3.4deg)", offset: 5 / 12, easing: "cubic-bezier(0.37, 0, 0.63, 1)" },
  { transform: "rotate(-2.2deg)", offset: 7 / 12, easing: "cubic-bezier(0.37, 0, 0.63, 1)" },
  { transform: "rotate(1.2deg)", offset: 9 / 12, easing: "cubic-bezier(0.37, 0, 0.63, 1)" },
  { transform: "rotate(-0.5deg)", offset: 11 / 12, easing: "cubic-bezier(0.37, 0, 0.63, 1)" },
  { transform: "rotate(0deg)", offset: 1 },
];
const SWING_MS = 3000;
export function HeroPendantLight({
  theme,
  onChange,
  className,
}: {
  theme: HeroTheme;
  onChange: (theme: HeroTheme) => void;
  className?: string;
}) {
  const lit = theme === "light";
  const swingRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  /** Starts (or smoothly restarts) the swing with the Web Animations API,
   * so the bulb's elements are never remounted and keep hover/focus. */
  function startSwing() {
    const el = swingRef.current;
    if (!el || prefersReducedMotion()) return;
    animationRef.current?.cancel();
    animationRef.current = el.animate(SWING, { duration: SWING_MS });
  }

  return (
    <div className={cn("pointer-events-none absolute -top-10 z-30", className)}>
      <div ref={swingRef} className="origin-top will-change-transform">
        <button
          type="button"
          aria-pressed={!lit}
          aria-label={lit ? "Turn off the light (dark background)" : "Turn on the light (light background)"}
          title={lit ? "Lights off" : "Lights on"}
          onClick={() => {
            onChange(lit ? "dark" : "light");
            startSwing();
          }}
          className="pointer-events-auto flex cursor-pointer flex-col items-center rounded-full px-2 pb-1 opacity-55 transition-[translate,opacity] duration-700 ease-[cubic-bezier(0.34,1.35,0.64,1)] hover:opacity-100 focus-visible:opacity-100 hover:translate-y-5 focus-visible:translate-y-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep motion-reduce:transition-none"
        >
          {/* Cord */}
          <span
            aria-hidden="true"
            className={cn(
              "h-[8.5rem] w-px transition-colors duration-500 sm:h-[4.75rem]",
              lit ? "bg-[#5c574b]" : "bg-[#E8E1CF]/55",
            )}
          />
          {/* Bulb — a thin line drawing in the cord's color, kept quiet so
              it never competes with the hero's objects. Lit, it gets only a
              faint warm wash inside the glass. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 28 44"
            fill="none"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "-mt-px h-7 w-auto transition-[color,filter] duration-500 sm:h-8",
              lit
                ? "text-[#5c574b] drop-shadow-[0_0_6px_rgba(255,215,130,0.35)]"
                : "text-[#E8E1CF]/70 drop-shadow-none",
            )}
          >
            {/* Socket */}
            <rect x="9.5" y="0.75" width="9" height="8" rx="1.5" stroke="currentColor" />
            <path d="M9.5 4.75h9" stroke="currentColor" strokeWidth="0.9" />
            {/* Glass */}
            <path
              d="M10 9h8v2.5c0 3 7.5 6.5 7.5 15a11.5 11.5 0 0 1-23 0c0-8.5 7.5-12 7.5-15Z"
              stroke="currentColor"
              fill={lit ? "rgba(255,236,185,0.3)" : "transparent"}
              className="transition-[fill] duration-500"
            />
            {/* Filament */}
            <path d="M11.5 27l1.25-4 1.25 4 1.25-4 1.25 4" stroke="currentColor" strokeWidth="0.9" />
          </svg>
        </button>
      </div>
    </div>
  );
}
