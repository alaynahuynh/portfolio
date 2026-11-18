"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type HeroTheme = "light" | "dark";

/** Random halo pulses: one every 2.5-7 s while the hero is on screen. */
const PULSE_MIN_MS = 2500;
const PULSE_MAX_MS = 7000;
const PULSE_MS = 1800;

/**
 * The hero's light/dark control: a pixel-art sun in the sky (light
 * theme) that turns into a moon (dark theme) when clicked, and back.
 *
 * - Swap: both images are stacked; the outgoing one spins away, shrinks
 *   and fades while the incoming one spins in from the other side.
 * - Glow: a soft warm halo sits behind it, and every few seconds, at
 *   random, it swells and brightens for a moment, so it reads as
 *   something to click without a label. Pulses only run while it's on
 *   screen and the tab is visible, and never under reduced motion.
 * - Hover/focus: it grows a little and the halo brightens.
 */
export function HeroSunMoon({
  theme,
  onChange,
  className,
}: {
  theme: HeroTheme;
  onChange: (theme: HeroTheme) => void;
  className?: string;
}) {
  const day = theme === "light";
  const haloRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const halo = haloRef.current;
    if (!halo || prefersReducedMotion()) return;
    let timer = 0;
    let onScreen = true;
    const schedule = () => {
      timer = window.setTimeout(
        () => {
          if (onScreen && !document.hidden) {
            const rest = Number(getComputedStyle(halo).opacity);
            const peak = 0.45 + Math.random() * 0.2;
            halo.animate(
              [
                { opacity: rest, transform: "scale(1)" },
                { opacity: Math.max(rest, peak), transform: `scale(${1.12 + Math.random() * 0.1})` },
                { opacity: rest, transform: "scale(1)" },
              ],
              { duration: PULSE_MS, easing: "ease-in-out" },
            );
          }
          schedule();
        },
        PULSE_MIN_MS + Math.random() * (PULSE_MAX_MS - PULSE_MIN_MS),
      );
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    io.observe(halo);
    schedule();
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  return (
    <button
      type="button"
      aria-pressed={!day}
      aria-label={day ? "Switch the site to dark mode" : "Switch the site to light mode"}
      title={day ? "Night mode" : "Day mode"}
      onClick={() => onChange(day ? "dark" : "light")}
      className={cn(
        "group/sun absolute z-30 size-8 cursor-pointer rounded-full opacity-90 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.45,0.64,1)] hover:scale-110 hover:opacity-100 focus-visible:scale-110 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-deep sm:size-9 motion-reduce:transition-none",
        className,
      )}
    >
      {/* Halo: resting glow, pulsed at random by the effect above */}
      <span
        ref={haloRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-[35%] rounded-full opacity-(--halo-rest) transition-[opacity,background] duration-500 group-hover/sun:opacity-60 group-focus-visible/sun:opacity-60",
          day
            ? "bg-[radial-gradient(closest-side,rgba(255,226,110,0.85),rgba(255,206,70,0.35)_55%,transparent)] [--halo-rest:0.25]"
            : "bg-[radial-gradient(closest-side,rgba(255,236,170,0.6),rgba(255,214,120,0.22)_55%,transparent)] [--halo-rest:0.22]",
        )}
      />
      <SkyImage src="/images/hero/sun.png" shown={day} />
      <SkyImage src="/images/hero/moon.png" shown={!day} />
    </button>
  );
}

/** One of the two stacked images; spins in when shown, out when hidden. */
function SkyImage({ src, shown }: { src: string; shown: boolean }) {
  return (
    <Image
      src={src}
      alt=""
      width={256}
      height={256}
      priority
      className={cn(
        "pointer-events-none absolute inset-0 size-full transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.34,1.3,0.64,1)] motion-reduce:transition-none",
        shown ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0",
      )}
    />
  );
}
