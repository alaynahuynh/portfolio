/**
 * Reusable AH mark: a brush-like line draws the A (with its own straight
 * crossbar). A separate, smaller H then flies out to the right into its
 * resting position beside the A — the two letters never touch.
 *
 * The H draws as an actual H first (two short legs + a straight middle
 * line), holds briefly as legible initials ("AH"), then that middle
 * line droops down clear of the legs into a smile — the logo ends as a
 * small smiling face, not a straight crossbar.
 *
 * The path data below is a deliberately simple placeholder — geometry
 * only, no hand-drawn character yet. It's isolated in the constants below
 * so it can be swapped for a traced hand-drawn version later without
 * touching the animation/timing logic.
 *
 * Purely decorative: render inside a parent that supplies the accessible
 * name (e.g. a <Link aria-label="Alayna Huynh — Home">), not here.
 *
 * Under prefers-reduced-motion, the global rule in globals.css collapses
 * all animation-durations/delays to ~0, so everything jumps straight to
 * its `forwards`-filled end state — the completed logo (H already a
 * smile, already resting in place), immediately.
 */

// Isolated so a hand-drawn trace can replace these without touching timing.
const A_PATH = "M32,106 L72,18 L112,106 M46,68 L98,68";
const H_LEGS_PATH = "M127,40 L127,68 M145,40 L145,68";
// Straight crossbar, at true H mid-height — the shape the H starts as.
// Must share the same command structure (one M + one Q) as the smile
// keyframe in globals.css (@keyframes ah-crossbar-to-smile) so the
// browser can morph between them.
const H_CROSSBAR_PATH = "M127,54 Q136,54 145,54";

interface AnimatedAHLogoProps {
  className?: string;
  /**
   * Multiplies every duration/delay below, so the whole draw-in stays in
   * proportion. 1 = normal (initial mount). Header passes a higher value
   * on click-triggered replays only, so the logo's very first paint isn't
   * slowed down along with it.
   */
  speed?: number;
}

export function AnimatedAHLogo({ className, speed = 1 }: AnimatedAHLogoProps) {
  const ms = (base: number) => `${Math.round(base * speed)}ms`;

  return (
    <svg
      viewBox="20 10 150 100"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <path
        d={A_PATH}
        pathLength={1}
        stroke="currentColor"
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1,
          animation: `ah-draw ${ms(550)} var(--ease-draw) 0ms forwards`,
        }}
      />
      <g style={{ animation: `ah-fly-right ${ms(480)} var(--ease-draw) ${ms(450)} both` }}>
        <path
          d={H_LEGS_PATH}
          pathLength={1}
          stroke="currentColor"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: `ah-draw ${ms(300)} var(--ease-draw) ${ms(450)} forwards`,
          }}
        />
        <path
          d={H_CROSSBAR_PATH}
          pathLength={1}
          stroke="currentColor"
          strokeWidth={7}
          strokeLinecap="round"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            // Draws in with the legs, then holds as a legible "H" briefly
            // (the gap between the draw finishing at ~750ms and the morph
            // starting at 1250ms) before dropping.
            animation: `ah-draw ${ms(300)} var(--ease-draw) ${ms(450)} forwards, ah-crossbar-to-smile ${ms(450)} var(--ease-draw) ${ms(1250)} both`,
          }}
        />
      </g>
    </svg>
  );
}
