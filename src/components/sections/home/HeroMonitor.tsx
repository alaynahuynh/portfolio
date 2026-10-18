import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * The hero's centerpiece: a beige CRT monitor drawn in CSS (no casing
 * art exists yet). Its screen is keyed to Work's lake-blue accent (see
 * hero-destinations.ts), the same way the Playground and About windows
 * carry theirs, and the name is set in Fraunces like every other headline.
 * Text sizes use container units so the screen copy scales with the
 * monitor itself, clamped so it never drops below a readable size.
 */
export function HeroMonitor({ className }: { className?: string }) {
  return (
    <div className={cn("@container relative", className)}>
      {/* Casing */}
      <div className="relative aspect-696/510 rounded-[1.2cqw] border border-[#cfc6b0] bg-linear-to-b from-[#e3dccb] to-[#d6cdb8] shadow-[inset_0_2px_0_rgba(255,255,255,0.6),inset_0_-3px_0_rgba(0,0,0,0.06)]">
        {/* Recessed bezel */}
        <div className="absolute inset-x-[8.6%] top-[10.6%] bottom-[13.3%] rounded-[1cqw] bg-[#bdb39c] shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)]">
          {/* Screen */}
          <div className="absolute inset-x-[2.8%] top-[3.4%] bottom-[2.6%] overflow-hidden rounded-[1.6cqw] transition-[filter] duration-(--duration-base) ease-(--ease-soft) group-hover:brightness-[1.15] group-focus-visible:brightness-[1.15] bg-linear-to-br from-[color-mix(in_srgb,var(--color-mist-blue)_55%,white)] to-mist-blue shadow-[inset_0_0_2cqw_rgba(62,110,150,0.22)]">
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

        {/* Power LED + button — the LED switches to a lighter, glowing blue on
            hover/focus, like the monitor turning on. */}
        <span
          aria-hidden="true"
          className="absolute right-[18.5%] bottom-[5.5%] size-[1.3cqw] rounded-full border-[0.5px] border-lake-blue-deep bg-lake-blue-deep transition-[background-color,box-shadow] duration-(--duration-base) group-hover:bg-[#aacbe5] group-hover:shadow-[0_0_0.5cqw_#aacbe5] group-focus-visible:bg-[#aacbe5] group-focus-visible:shadow-[0_0_0.5cqw_#aacbe5]"
        />
        <span
          aria-hidden="true"
          className="absolute right-[10.3%] bottom-[2.2%] h-[5.4%] w-[5cqw] rounded-[0.4cqw] border border-[#5c574b] bg-[#ddd5c2]"
        />
      </div>

      {/* Back of the tube, swivel, and base */}
      <div aria-hidden="true" className="relative flex flex-col items-center">
        <div className="h-[4.8cqw] w-[80%] rounded-b-[1cqw] bg-linear-to-b from-[#cbc2ad] to-[#d9d1be]" />
        <div className="-mt-[0.6cqw] h-[3.2cqw] w-[30%] rounded-b-[50%] border-x border-b border-[#bdb39c] bg-[#d4cbb7]" />
        <div className="mt-[1.2cqw] h-[8.3cqw] w-[56%] rounded-[0.8cqw] bg-linear-to-b from-[#e3dccb] to-[#cfc6b0] shadow-[0_2px_0_#bdb39c]" />
      </div>
    </div>
  );
}
