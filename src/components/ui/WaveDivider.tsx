import { forwardRef, useId, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * The organic "torn page" curve that used to mark the scroll-driven
 * handoff from Vietnamese Noodle House's green into the sketchbook, in
 * the original CreativePracticeBook (see this repo's git history). Built
 * in two layers, both via De Casteljau subdivision (splitting a cubic
 * bezier at its exact midpoint so the two halves still trace the *same*
 * curve, then nudging just that midpoint — never a sharp corner, just a
 * soft change in curvature) so the whole thing stays smooth curves
 * throughout, no straight-line zigzags anywhere:
 *
 * 1. The broad silhouette — 4 anchor points, each of its 4 segments split
 *    once and that midpoint nudged by a fairly generous, unevenly-sized
 *    offset. This is the "hand-painted," asymmetric large-scale wave.
 * 2. A finer layer on top — each of *those* 8 segments split again and
 *    nudged a second time, at roughly a third the amplitude of layer 1.
 *    This is the faint, brush-like grain the broad wave alone didn't
 *    have — close up it reads as "painted," at a glance it still reads
 *    as one clean wave.
 */
export const WAVE_PATH_D =
  "M0,0.5 C0.03,0.53 0.0562,0.5231 0.0806,0.4987" +
  " C0.105,0.4562 0.1275,0.3962 0.15,0.32" +
  " C0.1725,0.2938 0.195,0.2512 0.2194,0.2023" +
  " C0.2438,0.1794 0.27,0.15 0.3,0.15" +
  " C0.325,0.15 0.3475,0.1875 0.3686,0.2582" +
  " C0.3897,0.315 0.4094,0.405 0.4288,0.51" +
  " C0.4482,0.555 0.4672,0.615 0.487,0.6537" +
  " C0.5069,0.7125 0.5275,0.75 0.55,0.75" +
  " C0.5725,0.75 0.5931,0.7156 0.613,0.6704" +
  " C0.6328,0.6013 0.6519,0.5212 0.6712,0.43" +
  " C0.6906,0.3838 0.7103,0.3262 0.7314,0.2723" +
  " C0.7525,0.2344 0.775,0.2 0.8,0.2" +
  " C0.82,0.2 0.8387,0.2156 0.8566,0.2563" +
  " C0.8744,0.275 0.8912,0.3187 0.9075,0.375" +
  " C0.9237,0.3812 0.9394,0.4 0.9547,0.4112" +
  " C0.97,0.4344 0.985,0.45 1,0.45" +
  " L1,1 L0,1 Z";

/**
 * Edge for the top of a section — fills with `--color-background`
 * everywhere below the wave's curve and is fully transparent above it,
 * so whatever sits directly behind it (the section before this one)
 * shows through the transparent part.
 *
 * Purely presentational and uncontrolled on its own: the caller drives
 * its position via `style.transform` on the forwarded ref. See
 * VNHHoldAndRise, which uses this as the leading edge of the cream panel
 * that rises to cover Vietnamese Noodle House — that component owns its
 * own small, self-contained, bounded sticky track for the hold-then-rise
 * motion (same pattern Hero.tsx and PlaygroundBook already use for their
 * own pinned sections), rather than merging it into some other
 * component's scroll math the way the original CreativePracticeBook did
 * (where the dead-zone/overlap scroll bugs elsewhere in this codebase
 * traced back to exactly that kind of merged, cross-component track).
 *
 * `clipPathUnits="objectBoundingBox"` needs a document-unique `id` for
 * its `<clipPath>` — generated per-instance via `useId()` rather than a
 * shared constant, so two WaveDividers on the same page never collide.
 */
export const WaveDivider = forwardRef<
  HTMLDivElement,
  { className?: string; heightClassName?: string; style?: CSSProperties }
>(function WaveDivider({ className, heightClassName = "h-[12vh]", style }, ref) {
  const clipId = useId();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-x-0 top-0 z-10", heightClassName, className)}
      style={style}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={WAVE_PATH_D} />
          </clipPath>
        </defs>
      </svg>
      <div
        className="absolute inset-0 bg-background"
        style={{ clipPath: `url(#${clipId})`, WebkitClipPath: `url(#${clipId})` }}
      />
    </div>
  );
});
