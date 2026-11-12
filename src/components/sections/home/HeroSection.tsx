"use client";

import { HeroPendantLight } from "@/components/sections/home/HeroPendantLight";
import { setTheme, useTheme } from "@/lib/theme";

/**
 * The hero's <section>, plus the pendant light that switches the whole
 * site between light and dark (see src/lib/theme.ts). The hero's colors
 * live as CSS variables in globals.css (see "Hero theme") keyed off
 * `<html data-theme>`, so the server-rendered hero needs no client state
 * and a saved dark theme is already applied on first paint.
 *
 * The navy backdrop is its own layer that fades in and out over the white
 * base, since CSS can't transition between gradients directly.
 */
export function HeroSection({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <section
      data-hero
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
