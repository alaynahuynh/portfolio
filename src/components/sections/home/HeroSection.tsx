"use client";

import { useEffect, useState } from "react";
import { HeroPendantLight, type HeroTheme } from "@/components/sections/home/HeroPendantLight";

/** Fired on window whenever the hero theme changes, so the Header can
 * restyle the nav without waiting for a scroll. */
export const HERO_THEME_EVENT = "hero-theme-change";

/**
 * The hero's <section>, plus the pendant light that switches it between
 * light and dark. Starts light. The theme is written to `data-hero-theme`,
 * and the colors it controls live as CSS variables in globals.css (see
 * "Hero theme"), so the server-rendered hero content doesn't need to know
 * about it.
 *
 * The navy backdrop is its own layer that fades in and out over the white
 * base, since CSS can't transition between gradients directly.
 */
export function HeroSection({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<HeroTheme>("light");

  useEffect(() => {
    window.dispatchEvent(new Event(HERO_THEME_EVENT));

    // Mark the page while the hero is dark so the Footer can turn navy to
    // match. Cleared on unmount, so every other route keeps the white footer.
    const root = document.documentElement;
    root.toggleAttribute("data-hero-dark", theme === "dark");
    return () => root.removeAttribute("data-hero-dark");
  }, [theme]);

  return (
    <section
      data-hero
      data-hero-theme={theme}
      className="relative flex flex-col justify-center overflow-hidden border-b border-(--hero-border) bg-background pt-28 pb-16 transition-[border-color] duration-500 sm:min-h-svh sm:pt-24 sm:pb-0"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#0E1424] via-[#121B30] via-60% to-[#1A2742] opacity-(--hero-navy) transition-opacity duration-500 ease-(--ease-soft)"
      />
      {children}
      <HeroPendantLight theme={theme} onChange={setTheme} className="right-3 sm:right-[7%] md:right-[2.5%] lg:right-[7%]" />
    </section>
  );
}
