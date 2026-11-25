"use client";

import { HeroSunMoon } from "@/components/sections/home/HeroSunMoon";
import { setTheme, useTheme } from "@/lib/theme";

/**
 * The hero's sun/moon theme toggle, for pages other than the homepage
 * (About, Playground). Sits in the same corner as on the hero: level with
 * the nav bar where there's room beside it (sm, lg+), just under it where
 * the bar is nearly full width (phones, md). Place it inside a `relative`
 * wrapper at the top of the page.
 */
export function PageSunMoon() {
  const theme = useTheme();
  return (
    <HeroSunMoon
      theme={theme}
      onChange={setTheme}
      className="top-[6.25rem] right-5 sm:top-[2.4rem] sm:right-[6%] md:top-[6.25rem] md:right-[3%] lg:top-[2.4rem] lg:right-[6%]"
    />
  );
}
