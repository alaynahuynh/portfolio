/**
 * The hero's backdrop: a clear blue sky over a low band of grass.
 *
 * - Sky: a plain gradient, deeper blue overhead and paler toward the
 *   horizon, with no clouds, so it stays quiet behind the monitor and
 *   windows.
 * - Land (scene-land.webp): the rolling grass photo with its sky cut out,
 *   pushed down (translate-y) so the horizon sits low and the grass fills
 *   only the bottom of the hero, just enough for the monitor to stand in.
 * - On the grass, masked to the land's own shape: a faint band of wind
 *   light sweeping across.
 *
 * The land box has the photo's aspect ratio, sized to cover the hero
 * (like background-size: cover) and anchored to the bottom, so the grass
 * always meets the hero's bottom edge. Motion is transform-only and
 * stops under prefers-reduced-motion.
 */
export function HeroScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden [container-type:size]">
      {/* Clear sky */}
      <div className="absolute inset-0 bg-linear-to-b from-[#2f86e6] via-[#6fb1ef] via-55% to-[#b9dcf7]" />
      {/* The land, lowered so less of it shows. Mobile: a fixed 14%.
          sm+: lowered so the valley's dip (48.5% up from the photo's
          bottom) lands ~50px above the monitor's base, at any viewport
          shape. The base sits at 50cqh + 48px (half the hero's top
          padding) + 0.2825 × the stage width (the stage is centered,
          650/1100 as tall as it is wide, base 97.8% down it); the box is
          max(56.28cqw, 100cqh) tall. Solving for the offset gives the
          calc below. */}
      <div className="absolute bottom-0 left-1/2 aspect-1672/941 w-[max(100cqw,177.68cqh)] -translate-x-1/2 translate-y-[14%] sm:translate-y-[calc(0.2825*min(100cqw_-_48px,1100px)_+_0.485*max(56.28cqw,100cqh)_-_50cqh_-_2px)]">
        <div className="absolute inset-0 bg-[url('/images/hero/scene-land.webp')] bg-size-[100%_100%]" />

        {/* Wind light moving over the grass, kept to the land's shape */}
        <div className="absolute inset-0 mask-[url('/images/hero/scene-land.webp')] mask-size-[100%_100%]">
          <div className="absolute inset-x-0 top-[50%] bottom-0 overflow-hidden">
            <div className="hero-scene-anim absolute inset-y-0 left-0 w-[60%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,250,200,0.16),rgba(255,250,200,0.06)_60%,transparent)] will-change-transform [animation:hero-wind-sweep_19s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      {/* Film treatment, over the photo only (the monitor and windows sit
          above it): faint blend modes, no blur, no color wash. */}
      {/* A barely-there vignette that settles the eye on the monitor. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_95%_at_50%_45%,transparent_55%,rgba(52,38,14,0.16))] mix-blend-multiply" />
      {/* Fine static grain (a tiled noise texture, not animated). */}
      <div className="hero-grain absolute inset-0 opacity-[0.16] mix-blend-overlay" />
    </div>
  );
}
