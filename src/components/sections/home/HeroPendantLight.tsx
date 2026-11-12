"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type HeroTheme = "light" | "dark";

/**
 * A small pendant bulb hanging from the top of the hero on a cord: the
 * hero's light/dark control. Lit (warm glow) while the hero is light;
 * clicking switches it off and the site goes dark, clicking again turns it
 * back on. It hangs like a real pendulum: the pointer brushing past pushes
 * it the way the pointer is moving (entering, sweeping across, leaving),
 * a click sets it swinging harder, and every swing dies down on its own.
 * Hover/focus also lowers it a little on its cord.
 *
 * The cord starts above the section's top edge (the section clips it), so
 * lowering the bulb never shows the cord's end.
 */

/** Pendulum tuning. Angles in degrees, time in seconds.
 * STIFFNESS sets the swing period (2π/√40 ≈ 1s per full swing);
 * DAMPING sets how fast swings die down (about 2s to settle). */
const STIFFNESS = 40;
const DAMPING = 1.6;
const MAX_ANGLE = 14;
/** Push from the pointer entering the bulb, from its side. ≈1.5° swing. */
const ENTER_KICK = 10;
/** Push per pixel of pointer movement while sweeping across the bulb. */
const MOVE_KICK = 0.5;
/** Largest push a single pointer-move event can add (fast flicks). */
const MOVE_KICK_MAX = 4;
/** Push from a click. ≈7° swing, like the old click swing. */
const CLICK_KICK = 46;
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pendulum = useRef({ angle: 0, velocity: 0, frame: 0, last: 0 });

  useEffect(() => () => cancelAnimationFrame(pendulum.current.frame), []);

  /** One animation frame of the damped pendulum (semi-implicit Euler),
   * written straight to the element's transform so nothing re-renders. */
  function step(now: number) {
    const p = pendulum.current;
    const el = swingRef.current;
    if (!el) return;
    const dt = Math.min((now - p.last) / 1000, 1 / 30);
    p.last = now;
    p.velocity += (-STIFFNESS * p.angle - DAMPING * p.velocity) * dt;
    p.angle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, p.angle + p.velocity * dt));
    if (Math.abs(p.angle) < 0.02 && Math.abs(p.velocity) < 0.05) {
      p.angle = 0;
      p.velocity = 0;
      p.frame = 0;
      el.style.transform = "";
      return;
    }
    el.style.transform = `rotate(${p.angle.toFixed(3)}deg)`;
    p.frame = requestAnimationFrame(step);
  }

  /** Adds angular velocity (deg/s; positive swings the bulb to the right). */
  function push(velocity: number) {
    if (prefersReducedMotion()) return;
    const p = pendulum.current;
    p.velocity += velocity;
    if (!p.frame) {
      p.last = performance.now();
      p.frame = requestAnimationFrame(step);
    }
  }

  /** +1 if the pointer is left of the bulb's center (so it gets pushed
   * right), -1 if right of it. */
  function sideOf(clientX: number) {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return 1;
    return clientX < rect.left + rect.width / 2 ? 1 : -1;
  }

  return (
    <div className={cn("pointer-events-none absolute -top-10 z-30", className)}>
      <div ref={swingRef} className="origin-top will-change-transform">
        <button
          ref={buttonRef}
          type="button"
          aria-pressed={!lit}
          aria-label={lit ? "Turn off the light (switch the site to dark mode)" : "Turn on the light (switch the site to light mode)"}
          title={lit ? "Lights off" : "Lights on"}
          onClick={() => {
            onChange(lit ? "dark" : "light");
            // Keep going the way it's already swinging, or right from rest.
            push(pendulum.current.velocity < 0 ? -CLICK_KICK : CLICK_KICK);
          }}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") push(sideOf(event.clientX) * ENTER_KICK);
          }}
          onPointerMove={(event) => {
            if (event.pointerType !== "mouse" || !event.movementX) return;
            push(Math.max(-MOVE_KICK_MAX, Math.min(MOVE_KICK_MAX, event.movementX * MOVE_KICK)));
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") push(-sideOf(event.clientX) * ENTER_KICK * 0.6);
          }}
          onFocus={(event) => {
            if (event.currentTarget.matches(":focus-visible")) push(ENTER_KICK * 0.7);
          }}
          className="pointer-events-auto flex cursor-pointer flex-col items-center rounded-full px-2 pb-1 opacity-55 transition-[translate,opacity] duration-700 ease-[cubic-bezier(0.34,1.35,0.64,1)] hover:opacity-100 focus-visible:opacity-100 hover:translate-y-3 focus-visible:translate-y-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep motion-reduce:transition-none"
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
