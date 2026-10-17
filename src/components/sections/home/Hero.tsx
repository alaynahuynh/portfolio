import Link from "next/link";
import { HeroMonitor } from "@/components/sections/home/HeroMonitor";
import { HeroPlaygroundTab } from "@/components/sections/home/HeroPlaygroundTab";
import { HeroNotepad } from "@/components/sections/home/HeroNotepad";
import { HeroGlow } from "@/components/sections/home/HeroGlow";
import { HeroWorkLink } from "@/components/sections/home/HeroWorkLink";
import { HeroHalftone } from "@/components/sections/home/HeroHalftone";
import { HintArrow } from "@/components/ui/HintArrow";
import { cn } from "@/lib/utils";

/** Shared link treatment: a gentle lift + soft drop shadow on hover/focus. */
const OBJECT_LINK =
  "group block rounded-sm transition-[transform,filter] duration-(--duration-base) ease-(--ease-soft) hover:-translate-y-1 hover:drop-shadow-[0_14px_18px_rgba(46,50,42,0.18)] focus-visible:-translate-y-1 focus-visible:drop-shadow-[0_14px_18px_rgba(46,50,42,0.18)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-deep";

/** The Paint/Notepad windows go further: a deeper shadow, and they come
 * to the front of the stack so the hovered window reads as the active
 * one. Transform, filter, and z-index only, so nothing shifts layout. */
const WINDOW_LINK =
  "hover:z-20 hover:drop-shadow-[0_18px_26px_rgba(46,50,42,0.3)] focus-visible:z-20 focus-visible:drop-shadow-[0_18px_26px_rgba(46,50,42,0.3)]";

/**
 * Small Windows-98-style tooltip naming a hero object's destination,
 * shown on hover and on keyboard focus. aria-hidden because each link
 * already carries its own aria-label.
 */
function RetroTooltip({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-full left-3 z-30 mb-2 border border-foreground bg-[#fffbe3] px-2 py-0.5 font-sans text-xs whitespace-nowrap text-foreground opacity-0 shadow-[2px_2px_0_rgba(46,50,42,0.25)] transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {children}
    </span>
  );
}

/**
 * Hero: a retro desktop — a CRT monitor (→ Work) with an MS Paint window
 * (→ Playground) overlapping its bottom-left and a Notepad window
 * (→ About) overlapping its upper-right.
 *
 * Desktop (sm+): absolutely positioned inside a fixed-aspect stage, with
 * percentages taken from the Figma mockup. Mobile: the monitor stacks
 * full width and the two windows overlap it in normal flow, so nothing
 * clips and the text stays readable.
 */
export function Hero() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-background pt-28 pb-16 sm:min-h-svh sm:pt-24 sm:pb-0">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <div className="group/hero relative sm:aspect-1100/650">
          <HeroGlow />
          {/* Halftone accent peeking out around the Notepad / monitor's
              right edge. */}
          <HeroHalftone className="-top-[6%] right-[4%] w-[42%] opacity-50 sm:-top-[14%] sm:right-auto sm:left-[60%] sm:w-[36%]" />
          {/* Warped wireframe grid on the left, balancing the halftone.
              The PNG is used as a mask so the lines take About's mauve. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[18%] left-[2%] aspect-1199/1726 w-[28%] bg-mauve-deep opacity-55 mask-[url('/images/hero/grid-texture.png')] mask-contain mask-no-repeat sm:top-[12%] sm:left-[7%] sm:w-[20%]"
          />
          <HeroWorkLink
            data-monitor
            aria-label="Alayna Huynh — view selected work"
            className={cn(
              OBJECT_LINK,
              "relative mx-auto w-[92%] sm:absolute sm:top-0 sm:left-[16%] sm:mx-0 sm:w-[64%]",
            )}
          >
            <HeroMonitor />
            <RetroTooltip>View Work</RetroTooltip>
          </HeroWorkLink>

          <Link
            href="/about"
            aria-label="About me: I turn complex problems into thoughtful, playful digital experiences"
            className={cn(
              OBJECT_LINK,
              WINDOW_LINK,
              "relative z-10 -mt-[30%] ml-auto w-[80%] sm:absolute sm:top-[10%] sm:left-[62%] sm:mt-0 sm:w-[38%]",
            )}
          >
            <HeroNotepad />
            <RetroTooltip>About Me</RetroTooltip>
          </Link>

          <Link
            href="/playground"
            aria-label="Open the Playground"
            className={cn(
              OBJECT_LINK,
              WINDOW_LINK,
              "relative z-10 -mt-[2%] w-[86%] sm:absolute sm:top-[42%] sm:left-0 lg:-left-[2.5%] sm:mt-0 sm:w-[40%]",
            )}
          >
            <HeroPlaygroundTab />
            <RetroTooltip>Explore Playground</RetroTooltip>
          </Link>

          {/* Handwritten hint (in Alayna's own hand) in the open space
              right of the monitor stand (sm+), led by a small arrow
              curving up toward the monitor.
              On mobile it sits centered below the stack. */}
          <p className="pointer-events-none mt-6 flex -rotate-3 items-center justify-center gap-1.5 font-alayna-handwriting text-[1.125rem] leading-none whitespace-nowrap text-sage-deep select-none sm:text-[1.1875rem] sm:absolute sm:top-[85%] sm:left-[69%] sm:mt-0 sm:justify-start">
            <HintArrow className="h-[1.1em] w-auto shrink-0 -translate-y-[0.3em]" />
            Click around to explore
          </p>
        </div>
      </div>
    </section>
  );
}
