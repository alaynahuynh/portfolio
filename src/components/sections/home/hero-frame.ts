"use client";

import { useReducedMotion, useTransform, type MotionValue } from "motion/react";

/**
 * The hero's scroll-driven "living environment → framed artwork"
 * transition, in raw page-scroll pixels (not fractions of the hero's own
 * height) — see Hero.tsx for the sticky-track structure this drives.
 *
 * - 0 → holdEndPx: Phase 1, full-screen, parallax active, nothing shrinks.
 * - holdEndPx → shrinkEndPx: Phase 2, the frame shrinks to its final size,
 *   the border fades in, the copy travels up and fades out, parallax
 *   fades back to 0.
 * - Beyond shrinkEndPx: fully framed and released — the sticky pin lets
 *   go here, so the hero scrolls away normally instead of staying pinned.
 *   Header.tsx's own scroll-shrink threshold is set to this same value
 *   so the navbar settles into its "past the hero" look in sync with the
 *   frame completing, not on some unrelated timer.
 */
export const HERO_FRAME = {
  // Raised well past a single trackpad swipe/wheel flick's worth of
  // scroll delta (previously 120/380px, which one hard swipe could blow
  // straight through) so the shrink reads as a sustained scroll gesture
  // instead of snapping through almost instantly.
  holdEndPx: 200,
  shrinkEndPx: 900,
  /** Final size — within the requested 92–94vw × 82–88vh. */
  widthPct: 93,
  heightPct: 85,
  /** Constant border geometry — only its color-alpha animates (see
   * useHeroFrameBorderColor), so the border never changes the frame's
   * own box size/layout, just becomes visible. */
  borderWidthPx: 3.5,
  borderRadiusPx: 0,
  /** Fraction of the *full* 0–1 heroTotalProgress (i.e. already past
   * holdEndPx) where the border starts fading in — tuned so it stays at
   * 0 through roughly "100vw → 97vw" and only appears once the margin
   * itself is actually noticeable, per the brief's own example. */
  borderFadeStart: 0.6,
} as const;

/** Comfortably larger than any realistic page scroll height — with a raw,
 * unbounded `scrollY` (not a 0–1 progress), the page spends the vast
 * majority of its scroll lifetime "past the domain" of a transform whose
 * meaningful range is just the first ~380px. motion/react's DOM write for
 * a style value can revert to the first keyframe once progress moves past
 * the last defined point and has to clamp, even though the underlying
 * MotionValue itself keeps reporting the correct clamped number — so
 * every domain here explicitly holds its final value out this far instead
 * of relying on useTransform's implicit clamp. The border-alpha transform
 * below is exactly this shape, so this isn't optional here. */
const SAFE_MAX_SCROLL = 1_000_000;

/** 0 → 1 across the *entire* hold+shrink range (0 → shrinkEndPx), held at
 * 1 forever after. Drives frame size, border, and hero copy — everything
 * that should end at its "fully framed" state and stay there. */
export function useHeroTotalProgress(scrollY: MotionValue<number>) {
  const reduceMotion = useReducedMotion();
  const { shrinkEndPx } = HERO_FRAME;
  // Reduced motion: never progresses past 0, so the frame simply never
  // shrinks — the hero stays at its initial full-screen composition.
  return useTransform(scrollY, [0, shrinkEndPx, SAFE_MAX_SCROLL], [0, reduceMotion ? 0 : 1, reduceMotion ? 0 : 1]);
}

/** 0 → 1 → 0 across hold (rising) then shrink (falling back out), held
 * at 0 forever after — parallax is active only while the hero reads as
 * "full-screen," and is gone by the time it's framed. Feed this directly
 * into HeroArtScene in place of the old section-relative scrollYProgress;
 * useParallaxY/useParallaxX (hero-parallax.ts) need no changes. */
export function useHeroParallaxProgress(scrollY: MotionValue<number>) {
  const reduceMotion = useReducedMotion();
  const { holdEndPx, shrinkEndPx } = HERO_FRAME;
  return useTransform(
    scrollY,
    [0, holdEndPx, shrinkEndPx, SAFE_MAX_SCROLL],
    reduceMotion ? [0, 0, 0, 0] : [0, 1, 0, 0],
  );
}

/** Frame width/height, 100% through holdEndPx, then shrinking to the
 * final vw/vh over the rest of the range. Percent strings (not vw/vh
 * units) since the frame sizes itself relative to its sticky parent,
 * which is already exactly 100vw/100vh. */
export function useHeroFrameSize(heroTotalProgress: MotionValue<number>) {
  const holdFrac = HERO_FRAME.holdEndPx / HERO_FRAME.shrinkEndPx;
  const width = useTransform(heroTotalProgress, [0, holdFrac, 1], ["100%", "100%", `${HERO_FRAME.widthPct}%`]);
  const height = useTransform(heroTotalProgress, [0, holdFrac, 1], ["100%", "100%", `${HERO_FRAME.heightPct}%`]);
  return { width, height };
}

/** Border color, animated only in alpha (via color-mix) so the border's
 * own geometry never changes — starts fully transparent, stays that way
 * through the hold and the early part of the shrink, then fades in. */
export function useHeroFrameBorderColor(heroTotalProgress: MotionValue<number>) {
  const alpha = useTransform(heroTotalProgress, [0, HERO_FRAME.borderFadeStart, 1], [0, 0, 1]);
  return useTransform(alpha, (v) => `color-mix(in srgb, var(--color-earth) ${Math.round(v * 100)}%, transparent)`);
}

/** How faded the *artwork scene* (not the copy, which stays fully crisp
 * throughout) reads as the hero moves through its own scroll range —
 * fully clear and opaque the instant the page opens, easing to a gentle
 * corner vignette by the time it's done shrinking into its frame, then
 * held there (scrolling further just carries the now-framed artwork
 * away, so there's nothing left to ease toward). The fade is a vignette,
 * not a uniform wash — the center stays essentially at full strength
 * while the corners ease toward the page background, and even at full
 * scroll the corners only ease partway (cornerOpacity), not out
 * completely. */
export const HERO_CLARITY = {
  /** Where the vignette starts easing outward from center, as a percent
   * of the ellipse's radius (0 = starts fading immediately, 100 = never
   * fades). Low enough that the eased-down ring actually reaches the
   * corners themselves, not just the exact corner pixel. */
  vignetteInnerStopPct: 25,
  /** Opacity the corners ease down to at full progress — a floor, not a
   * fade-to-nothing. */
  cornerOpacity: 0.65,
} as const;

/** A radial-gradient `mask-image` driven by heroTotalProgress — opaque
 * everywhere at 0 (no vignette), easing to a soft corner fade by 1. Feed
 * into both `maskImage` and `WebkitMaskImage` (Safari still needs the
 * prefix for gradient masks). */
export function useHeroVignetteMask(heroTotalProgress: MotionValue<number>) {
  const cornerAlpha = useTransform(heroTotalProgress, [0, 1], [1, HERO_CLARITY.cornerOpacity]);
  return useTransform(
    cornerAlpha,
    (v) =>
      `radial-gradient(ellipse at center, rgba(0,0,0,1) ${HERO_CLARITY.vignetteInnerStopPct}%, rgba(0,0,0,${v.toFixed(3)}) 100%)`,
  );
}
