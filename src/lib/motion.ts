/**
 * Shared tuning for the site's JS-driven interactions (cursor-reactive
 * hero paint, magnetic type). Kept in one place so they read as one
 * interaction language rather than each component inventing its own feel.
 */
export const motion = {
  /** How strongly elements ease toward a moving target each frame (0–1, higher = snappier). */
  lerp: 0.06,
  /** Magnetic type: pixel radius within which a character reacts to the cursor. */
  magneticRadius: 140,
  /** Magnetic type: max vertical displacement at the cursor's exact position. */
  magneticDisplacement: 8,
};

/** True if the user has requested reduced motion — check before attaching any rAF/pointer-tracking loop. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
