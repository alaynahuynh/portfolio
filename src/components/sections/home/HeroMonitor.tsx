import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** For the grass and ground shadows: the monitor's link lifts 4px on
 * hover/focus (OBJECT_LINK in Hero.tsx, -translate-y-1); these move back
 * down by the same amount on the same timing, so they stay planted on
 * the ground while only the monitor rises. */
const STAY_GROUNDED =
  "transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:translate-y-1 group-focus-visible:translate-y-1";

/**
 * The hero's centerpiece: a photographed beige CRT (monitor-cutout.webp,
 * cut out with its screen glass punched through) standing in the grass.
 * The live screen sits underneath the photo, so the real bezel and dark
 * rim frame it. The screen is keyed to Work's lake-blue accent (see
 * hero-destinations.ts), the same way the Playground and About windows
 * carry theirs, and the name is set in the heading face like every other
 * headline. Text sizes use container units so the screen copy scales
 * with the monitor, clamped so it never drops below a readable size.
 *
 * Positions below are the photo's own pixel measurements (683×628),
 * as percentages.
 */
export function HeroMonitor({ className }: { className?: string }) {
  return (
    <div className={cn("@container relative aspect-683/628", className)}>
      {/* Hover aura: a soft white halo that blooms around the whole monitor while
          it's hovered/focused, like light spilling off the screen. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-[18%] -top-[22%] -bottom-[4%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(240,245,255,0.6)_35%,rgba(220,232,250,0.25)_65%,transparent)] opacity-0 blur-3xl transition-opacity duration-(--duration-base) ease-(--ease-soft) group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      {/* Shadow the monitor casts on the grass around its base */}
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute -inset-x-[9%] top-[83%] -bottom-[5%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(6,26,4,0.62),rgba(6,26,4,0.3)_60%,transparent)] blur-[1.2cqw]", STAY_GROUNDED)}
      />
      {/* Contact shadow: the tight, dark line where the base meets the
          ground (the base's own edge is at 98.2% down, 10%–90% across),
          so the monitor sits in the grass instead of hovering on it. */}
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute top-[95.6%] right-[8.6%] -bottom-[1.6%] left-[8.4%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(6,20,3,0.72),rgba(6,20,3,0.35)_55%,transparent)] blur-[0.35cqw]", STAY_GROUNDED)}
      />

      {/* Screen, under the photo's punched-out glass */}
      <div data-monitor-screen className="hero-intro-screen absolute top-[14.81%] right-[12%] bottom-[22.29%] left-[11.42%] overflow-hidden rounded-[1cqw] transition-[filter,box-shadow] duration-(--duration-base) ease-(--ease-soft) brightness-[1.04] saturate-[1.15] group-hover:brightness-[1.1] group-hover:saturate-[1.6] group-focus-visible:brightness-[1.1] group-focus-visible:saturate-[1.6] bg-linear-to-br from-[color-mix(in_srgb,var(--color-mist-blue)_55%,#fffaf0)] to-mist-blue shadow-[inset_0_0_30px_rgba(255,255,255,0.18)] group-hover:shadow-[inset_0_0_40px_rgba(255,255,255,0.35)] group-focus-visible:shadow-[inset_0_0_40px_rgba(255,255,255,0.35)]">
          {/* Photographed CRT texture, rotated to landscape to match the screen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[url('/images/hero/monitor-screen-texture.jpg')] bg-cover bg-center opacity-[0.16] mix-blend-multiply"
          />
          {/* Phosphor glow: a soft bloom in the middle of the tube */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_65%_at_50%_42%,rgba(255,255,255,0.22),transparent_70%)]"
          />
          {/* Scanlines: 1px lines every 3px, barely there. Under the text
              (which paints after these), so the type stays crisp. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(24,40,70,0.04)_0_1px,transparent_1px_3px)]"
          />
          {/* Curved-glass falloff: corners and edges dim slightly, like a
              real tube */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(130%_125%_at_50%_45%,transparent_58%,rgba(28,42,70,0.13))] shadow-[inset_0_0_2.4cqw_rgba(30,45,70,0.22),inset_0_0_0.5cqw_rgba(0,0,0,0.25)]"
          />
          <div className="relative px-[6%] pt-[8%]">
            {/* The homepage's one h1 — styling unchanged. */}
            <h1 className="font-heading text-[clamp(1.5rem,7.6cqw,3.5rem)] leading-none font-medium tracking-tight text-foreground">
              {siteConfig.name}
              <span
                aria-hidden="true"
                className="hero-monitor-cursor ml-[0.08em] inline-block h-[0.82em] w-[0.06em] translate-y-[0.04em] bg-lake-blue-deep"
              />
            </h1>
            <p className="mt-[0.7em] font-sans text-[clamp(0.6875rem,2cqw,1rem)] font-medium text-lake-blue-deep">
              {siteConfig.heroScreenSubtitle}
            </p>
          </div>
          {/* A visible way into the work, in the screen's lower-right —
              the one corner the Notepad and Playground windows never
              overlap on desktop. */}
          <div className="absolute right-[5%] bottom-[7%] hidden text-right @md:block">
            <p className="inline-flex items-center gap-[0.4em] border-b border-current pb-[0.1em] font-sans text-[clamp(0.75rem,2.1cqw,1.0625rem)] font-semibold text-lake-blue-deep">
              View selected work <span aria-hidden="true">↓</span>
            </p>
          </div>
          {/* Power-on intro (first load only, see hero-intro-script.ts):
              the dark, switched-off glass, and the CRT beam that opens
              from a line to the full screen. Hidden unless
              <html data-hero-intro> is set. */}
          <span aria-hidden="true" className="hero-intro-off pointer-events-none absolute inset-0 z-20 hidden" />
          <span aria-hidden="true" className="hero-intro-beam pointer-events-none absolute inset-0 z-30 hidden" />
      </div>

      {/* The monitor itself */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/hero/monitor-cutout.webp')] bg-size-[100%_100%]"
      />

      {/* Screen light spilling faintly onto the bezel around the glass */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[14.81%] right-[12%] bottom-[22.29%] left-[11.42%] rounded-[1cqw] shadow-[0_0_2.6cqw_0.4cqw_rgba(200,222,255,0.2)] mix-blend-screen"
      />

      {/* Foreground grass: blades cut from the scene's own grass
          (monitor-grass.webp) overlapping the base's bottom edge, then
          fading into the lawn below, in the scene's own full color... */}
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute top-[93.3%] left-[0.85%] h-[9.5%] w-[98%] bg-[url('/images/hero/monitor-grass.webp')] bg-size-[100%_100%]", STAY_GROUNDED)}
      />
      {/* ...and the same night tint the lawn gets in the dark theme
          (HeroSection.tsx), kept to the blades' shape. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[93.3%] left-[0.85%] h-[9.5%] w-[98%] bg-[#1A2742] opacity-(--hero-navy) mask-[url('/images/hero/monitor-grass.webp')] mask-size-[100%_100%] [transition:opacity_500ms,transform_var(--duration-base)_var(--ease-soft)] group-hover:translate-y-1 group-focus-visible:translate-y-1"
      />

      {/* Power LED, over the photo's own — lights up blue on hover/focus,
          like the monitor turning on. */}
      <span
        aria-hidden="true"
        className="hero-intro-led absolute top-[90.29%] left-[73.06%] size-[1cqw] -translate-1/2 rounded-full bg-lake-blue-deep shadow-[inset_0_0.1cqw_0.15cqw_rgba(0,0,0,0.4)] transition-[background-color,box-shadow] duration-(--duration-base) group-hover:bg-[#aacbe5] group-hover:shadow-[0_0_0.6cqw_#aacbe5] group-focus-visible:bg-[#aacbe5] group-focus-visible:shadow-[0_0_0.6cqw_#aacbe5]"
      />
    </div>
  );
}
