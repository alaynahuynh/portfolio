import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * The hero's centerpiece: a beige CRT monitor drawn in CSS (no casing
 * art exists yet). Its screen is keyed to Work's lake-blue accent (see
 * hero-destinations.ts), the same way the Playground and About windows
 * carry theirs, and the name is set in the heading face like every other headline.
 * Text sizes use container units so the screen copy scales with the
 * monitor itself, clamped so it never drops below a readable size.
 */
export function HeroMonitor({ className }: { className?: string }) {
  return (
    <div className={cn("@container relative", className)}>
      {/* Hover aura: a soft white halo that blooms around the whole monitor while
          it's hovered/focused, like light spilling off the screen. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-[18%] -top-[22%] -bottom-[4%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(240,245,255,0.6)_35%,rgba(220,232,250,0.25)_65%,transparent)] opacity-0 blur-3xl transition-opacity duration-(--duration-base) ease-(--ease-soft) group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      {/* Casing — beveled like molded plastic: lit top/left edges, shaded
          bottom/right, and a soft falloff toward the chin. */}
      <div className="relative z-10 aspect-696/510 rounded-[1.2cqw] border border-[#c4bba4] bg-linear-to-b from-[#e6dfcf] via-[#ddd5c3] to-[#cfc6b0] shadow-[inset_0_0.4cqw_0_rgba(255,255,255,0.7),inset_0.35cqw_0_0_rgba(255,255,255,0.35),inset_-0.45cqw_0_0_rgba(0,0,0,0.07),inset_0_-0.8cqw_1.2cqw_rgba(0,0,0,0.12),0_30px_60px_-10px_rgba(0,0,0,0.55)]">
        {/* Recessed bezel */}
        <div className="absolute inset-x-[8.6%] top-[10.6%] bottom-[13.3%] rounded-[1cqw] bg-linear-to-b from-[#a99f88] to-[#c7bea8] shadow-[inset_0_0.8cqw_1.2cqw_rgba(0,0,0,0.35),inset_0.4cqw_0_0.6cqw_rgba(0,0,0,0.12),inset_-0.4cqw_0_0.6cqw_rgba(0,0,0,0.08),0_0.25cqw_0_rgba(255,255,255,0.55),0_-0.2cqw_0_rgba(0,0,0,0.08)]">
          {/* Screen */}
          <div className="absolute inset-x-[2.8%] top-[3.4%] bottom-[2.6%] overflow-hidden rounded-[1.6cqw] transition-[filter,box-shadow] duration-(--duration-base) ease-(--ease-soft) brightness-[1.04] saturate-[1.15] group-hover:brightness-[1.1] group-hover:saturate-[1.6] group-focus-visible:brightness-[1.1] group-focus-visible:saturate-[1.6] bg-linear-to-br from-[color-mix(in_srgb,var(--color-mist-blue)_55%,white)] to-mist-blue shadow-[0_0_40px_rgba(180,210,245,0.35),inset_0_0_30px_rgba(255,255,255,0.18)] group-hover:shadow-[0_0_70px_rgba(190,220,255,0.75),inset_0_0_40px_rgba(255,255,255,0.35)] group-focus-visible:shadow-[0_0_70px_rgba(190,220,255,0.75),inset_0_0_40px_rgba(255,255,255,0.35)]">
            {/* Photographed CRT texture, rotated to landscape to match the screen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[url('/images/hero/monitor-screen-texture.jpg')] bg-cover bg-center opacity-[0.16] mix-blend-multiply"
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
          </div>
        </div>

        {/* Seam where the front bezel meets the chin */}
        <span
          aria-hidden="true"
          className="absolute inset-x-[1.5%] bottom-[9.5%] h-[0.25cqw] bg-black/8 shadow-[0_0.2cqw_0_rgba(255,255,255,0.5)]"
        />

        {/* Power LED + button — the LED switches to a lighter, glowing blue on
            hover/focus, like the monitor turning on. */}
        <span
          aria-hidden="true"
          className="absolute right-[18.5%] bottom-[5.5%] size-[1.3cqw] rounded-full border-[0.5px] border-lake-blue-deep bg-lake-blue-deep transition-[background-color,box-shadow] duration-(--duration-base) group-hover:bg-[#aacbe5] group-hover:shadow-[0_0_0.5cqw_#aacbe5] group-focus-visible:bg-[#aacbe5] group-focus-visible:shadow-[0_0_0.5cqw_#aacbe5]"
        />
        <span
          aria-hidden="true"
          className="absolute right-[10.3%] bottom-[2.2%] h-[5.4%] w-[5cqw] rounded-[0.4cqw] border border-[#5c574b] bg-linear-to-b from-[#e6dfcf] to-[#d2c9b4] shadow-[inset_0_0.2cqw_0_rgba(255,255,255,0.7),inset_0_-0.2cqw_0_rgba(0,0,0,0.12),0_0.15cqw_0.3cqw_rgba(0,0,0,0.2)]"
        />
      </div>

      {/* Stand, modeled on a real CRT: a short neck emerging from under the
          casing (which sits above it at z-10), a swivel collar, and a base
          whose top face narrows toward the back, with a darker front edge.
          Drop shadow lives on a wrapper because clip-path would cut it off. */}
      <div aria-hidden="true" className="relative z-0 -mt-[1.6cqw] flex flex-col items-center">
        {/* Neck — shaded at the top where the casing overhangs it */}
        <div className="h-[5cqw] w-[30%] bg-linear-to-b from-[#9c9279] to-[#cbc2ab] shadow-[inset_0_1.6cqw_1.4cqw_-0.6cqw_rgba(0,0,0,0.45),inset_0.5cqw_0_0.6cqw_-0.3cqw_rgba(0,0,0,0.15),inset_-0.5cqw_0_0.6cqw_-0.3cqw_rgba(0,0,0,0.15)]" />
        {/* Swivel collar sitting on the base */}
        <div className="relative z-10 -mt-[0.4cqw] h-[2.8cqw] w-[40%] rounded-b-[50%] rounded-t-[0.4cqw] bg-linear-to-b from-[#e2dbca] to-[#c4bba4] shadow-[inset_0_0.3cqw_0_rgba(255,255,255,0.6),0_0.5cqw_0.8cqw_rgba(0,0,0,0.3)]" />
        {/* Base */}
        <div className="relative -mt-[1.2cqw] w-[58%] drop-shadow-[0_1.4cqw_1.4cqw_rgba(0,0,0,0.45)]">
          {/* Top face, in perspective */}
          <div className="h-[5cqw] bg-linear-to-b from-[#cfc6b0] to-[#e6dfcf] [clip-path:polygon(7%_0,93%_0,100%_100%,0_100%)]" />
          {/* Front edge */}
          <div className="h-[2.6cqw] rounded-b-[0.6cqw] bg-linear-to-b from-[#d3cab5] to-[#b9af97] shadow-[inset_0_0.2cqw_0_rgba(255,255,255,0.65)]" />
        </div>
      </div>
    </div>
  );
}
