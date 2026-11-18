import { HeroMonitor } from "@/components/sections/home/HeroMonitor";
import { HeroPlaygroundTab } from "@/components/sections/home/HeroPlaygroundTab";
import { HeroNotepad } from "@/components/sections/home/HeroNotepad";
import { HeroGlow } from "@/components/sections/home/HeroGlow";
import { HeroCursorGlow } from "@/components/sections/home/HeroCursorGlow";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { HeroWorkLink } from "@/components/sections/home/HeroWorkLink";
import { HeroDesktop } from "@/components/sections/home/HeroDesktop";
import { HeroWindow } from "@/components/sections/home/HeroWindow";
import { HintArrow } from "@/components/ui/HintArrow";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/** Shared link treatment: a gentle lift + soft drop shadow on hover/focus.
 * Objects rest slightly dimmed and come back to full color when hovered or
 * focused. The dim only applies on devices that can hover, so touch
 * screens always see full color. */
const OBJECT_LINK =
  "group block rounded-sm transition-[transform,filter] duration-(--duration-base) ease-(--ease-soft) [@media(hover:hover)]:brightness-(--hero-dim) hover:brightness-100 focus-visible:brightness-100 hover:-translate-y-1 hover:drop-shadow-[0_14px_18px_rgba(46,50,42,0.18)] focus-visible:-translate-y-1 focus-visible:drop-shadow-[0_14px_18px_rgba(46,50,42,0.18)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-deep";

/**
 * Small Windows-98-style tooltip naming a hero object's destination,
 * shown on hover and on keyboard focus. aria-hidden because each link
 * already carries its own aria-label.
 */
function RetroTooltip({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-full left-3 z-30 mb-2 border border-foreground bg-[#fffbe3] px-2 py-0.5 font-sans text-xs whitespace-nowrap text-foreground opacity-0 shadow-[2px_2px_0_rgba(46,50,42,0.25)] transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-has-[a:focus-visible]:opacity-100 group-data-dragging:invisible group-data-maximized:hidden"
    >
      {children}
    </span>
  );
}

/**
 * Hero: a retro desktop — a CRT monitor (→ Work) with an MS Paint window
 * (→ Playground) overlapping its bottom-left and a Notepad window
 * (→ About) overlapping its upper-right. The two windows behave like real
 * Windows 98 windows (drag, minimize, maximize, close, reopen from the
 * taskbar); see HeroDesktop.tsx and HeroWindow.tsx.
 *
 * Absolutely positioned inside a fixed-aspect stage at every size, so
 * the windows always overlap the monitor the same way. Desktop (sm+) uses
 * percentages taken from the Figma mockup; mobile uses a taller stage
 * with smaller windows tucked over the monitor's upper-right and
 * lower-left corners, keeping the same composition on a narrow screen.
 *
 * Both windows get a dark frame and --hero-window-shadow (globals.css:
 * the Win98 bevel plus layered drop shadows), so they lift off the sky —
 * especially the Playground, whose own painted sky and hill would
 * otherwise melt into the photo behind it.
 */
export function Hero() {
  return (
    <HeroSection>
      {/* Cursor light — first child so the stage paints above it. */}
      <HeroCursorGlow />
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <HeroDesktop className="group/hero relative mx-auto aspect-300/330 w-[84%] sm:aspect-1100/650 sm:w-full">
          <HeroGlow />
          <HeroWorkLink
            data-monitor
            aria-label="Alayna Huynh — view selected work"
            className={cn(
              OBJECT_LINK,
              "absolute top-0 left-[5%] w-[88%] sm:left-[16%] sm:w-[64%]",
            )}
          >
            <HeroMonitor />
            <RetroTooltip>View Work</RetroTooltip>
          </HeroWorkLink>

          <HeroWindow
            id="about"
            title="About Me"
            destination="about"
            href="/about"
            ariaLabel={`About me: ${siteConfig.positioningStatement}`}
            tooltip={<RetroTooltip>About Me</RetroTooltip>}
            className="top-[30%] -right-[6%] w-[48%] sm:top-[10%] sm:right-auto sm:left-[62%] sm:w-[33%]"
          >
            <HeroNotepad className="hero-intro-about shadow-(--hero-window-shadow) outline outline-[#5f5c55]" />
          </HeroWindow>

          <HeroWindow
            id="playground"
            title="Playground"
            destination="playground"
            href="/playground"
            ariaLabel="Open the Playground"
            tooltip={<RetroTooltip>Explore Playground</RetroTooltip>}
            className="top-[58%] -left-[6%] w-[56%] sm:top-[42%] sm:left-0 sm:w-[37%] lg:-left-[2.5%]"
          >
            <HeroPlaygroundTab className="hero-intro-playground shadow-(--hero-window-shadow) outline outline-[#5f5c55]" />
          </HeroWindow>

          {/* Handwritten hint (in Alayna's own hand), led by a small arrow
              curving up toward the monitor. md+: in the open sky right of
              the monitor, under the About Me window (anchored to the stage's
              right edge so it never runs off narrower screens), in a deep sky-navy
              (--hero-hint-sky) that reads on the blue. Below md (where the
              About window fills that space): centered
              just below the stage, white with a shadow over the grass. */}
          <p className="hero-intro-hint pointer-events-none absolute inset-x-0 top-full mt-5 flex -rotate-3 items-center justify-center gap-1.5 font-alayna-handwriting text-[1.125rem] leading-none whitespace-nowrap text-(--hero-hint) [text-shadow:0_1px_3px_rgba(0,0,0,0.5)] transition-colors duration-500 select-none sm:text-[1.1875rem] md:inset-x-auto md:top-[50%] md:-right-[2%] md:mt-0 md:justify-start md:text-(--hero-hint-sky) md:[text-shadow:none]">
            <HintArrow className="h-[1.1em] w-auto shrink-0 -translate-y-[0.3em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] md:drop-shadow-none" />
            Click around to explore
          </p>
        </HeroDesktop>
      </div>
    </HeroSection>
  );
}
