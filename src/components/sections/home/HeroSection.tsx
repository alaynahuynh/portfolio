"use client";

import { useEffect, useRef } from "react";
import { HeroScene } from "@/components/sections/home/HeroScene";
import { HeroSunMoon } from "@/components/sections/home/HeroSunMoon";
import { setTheme, useTheme } from "@/lib/theme";

/**
 * The hero's <section>, plus the sun/moon (HeroSunMoon) that switches the whole
 * site between light and dark (see src/lib/theme.ts). The hero's colors
 * live as CSS variables in globals.css (see "Hero theme") keyed off
 * `<html data-theme>`, so the server-rendered hero needs no client state
 * and a saved dark theme is already applied on first paint.
 *
 * The backdrop is HeroScene (a living hill-and-sky scene), anchored to the
 * bottom so the monitor's stand always rests on the grass. The navy
 * night layer fades in over it for the dark theme (mostly opaque, so the
 * hill still reads as a dim silhouette), since CSS can't transition
 * between gradients directly.
 */
export function HeroSection({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const ref = useRef<HTMLElement>(null);

  // Sticky, but only within app/page.tsx's hero + taskbar wrapper: it
  // holds while the taskbar rises over its bottom edge, then scrolls on
  // normally once the taskbar is fully visible. A hero taller
  // than the screen (short viewports) pins at a negative top equal to the
  // overflow, so it still scrolls fully into view before it holds.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={ref}
      data-hero
      className="sticky top-0 flex flex-col justify-center overflow-hidden bg-background pt-28 pb-20 sm:min-h-svh sm:pt-24 sm:pb-0"
    >
      <HeroScene />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#0E1424] via-[#121B30] via-60% to-[#1A2742] opacity-(--hero-navy) transition-opacity duration-500 ease-(--ease-soft)"
      />
      {/* Stars, only in the dark theme (they fade with the navy layer) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-(--hero-navy) transition-opacity duration-500">
        {STARS.map(([x, y, size, delay], i) => (
          <span
            key={i}
            className="hero-scene-anim absolute rounded-full bg-[#fdf8e6]"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              animation: `hero-star-twinkle 3.6s ease-in-out ${delay}s infinite`,
            }}
          />
        ))}
      </div>
      {children}
      {/* Small, in the corner of the sky: level with the nav bar where
          there's room beside it (sm, lg+), just under it where the bar is
          nearly full width (phones, md). */}
      <HeroSunMoon theme={theme} onChange={setTheme} className="top-[6.25rem] right-5 sm:top-[2.4rem] sm:right-[6%] md:top-[6.25rem] md:right-[3%] lg:top-[2.4rem] lg:right-[6%]" />
    </section>
  );
}

/** [left %, top %, size px, twinkle delay s], fixed for a stable render. */
const STARS: [number, number, number, number][] = (() => {
  let s = 91;
  const r = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: 46 }, () => [
    +(r() * 100).toFixed(2),
    +(r() * 100).toFixed(2),
    r() < 0.2 ? 2.5 : 1.5,
    -+(r() * 3.6).toFixed(2),
  ]);
})();
