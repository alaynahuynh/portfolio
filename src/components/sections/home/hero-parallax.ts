"use client";

import { useReducedMotion, useTransform, type MotionValue } from "motion/react";

/**
 * Signed depth-plane offsets (px) by the end of the hero's own scroll
 * range (see useScroll in Hero.tsx) — 0 at the top of the page, the full
 * value once the hero's bottom edge reaches the top of the viewport.
 *
 * The page itself already scrolls upward as the visitor scrolls down, so
 * this models a camera moving through depth rather than "everything
 * drifts the same way": far planes carry a small POSITIVE value that
 * partially counteracts the page's own upward motion (they lag behind,
 * reading as farther away), while near planes carry a NEGATIVE value
 * that adds to it (they slip past slightly faster, reading as closer).
 * `cloudsDriftX` is a separate horizontal nudge on the cloud plane only.
 *
 * Kept deliberately small and monotonically increasing toward the
 * viewer — depth that's felt, not an obvious effect. Dogs/piano still
 * always move together as one `characters` plane (see HeroArtScene.tsx)
 * — nothing in the parallax system animates an individual object, so the
 * scene keeps reading as one painting.
 *
 * `sky` is pinned at 0 — almost stationary, the farthest plane. Each
 * plane after it moves a little more than the last: clouds (very slow) →
 * distance (slow) → hill (moderate) → characters (slightly closer) →
 * flowers (strongest movement, nearest to the viewer).
 */
export const HERO_PARALLAX_DEPTH = {
  sky: 0,
  clouds: 6,
  cloudsDriftX: 5,
  distance: 11,
  hill: -14,
  characters: -20,
  flowers: -32,
} as const;

/** Signed vertical depth-plane offset for one hero layer. Collapses to a fixed 0 under prefers-reduced-motion. */
export function useParallaxY(progress: MotionValue<number>, depthPx: number) {
  const reduceMotion = useReducedMotion();
  return useTransform(progress, [0, 1], [0, reduceMotion ? 0 : depthPx]);
}

/** Signed horizontal drift for one hero layer (only the clouds use this today). Collapses to a fixed 0 under prefers-reduced-motion. */
export function useParallaxX(progress: MotionValue<number>, depthPx: number) {
  const reduceMotion = useReducedMotion();
  return useTransform(progress, [0, 1], [0, reduceMotion ? 0 : depthPx]);
}

