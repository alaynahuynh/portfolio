import { cn } from "@/lib/utils";
import {
  DESTINATION_COLORS,
  type HeroDestination,
} from "@/components/sections/home/hero-destinations";

interface HeroRetroWindowProps {
  title: string;
  menu: string[];
  /** Which destination this window links to — sets its title-bar accent. */
  destination: HeroDestination;
  children: React.ReactNode;
  className?: string;
}

/** Raised bevel in the monitor's warm beige rather than Windows gray, so
 * the windows share the CRT's materials. */
export const RETRO_BEVEL =
  "bg-[#ddd5c2] shadow-[inset_-1px_-1px_#5c574b,inset_1px_1px_#f6f1e6,inset_-2px_-2px_#a89e88,inset_2px_2px_#fffcf5]";

/** Sunken well (canvas, text area) — the bevel's inverse. */
export const RETRO_WELL =
  "shadow-[inset_1px_1px_#a89e88,inset_-1px_-1px_#fffcf5]";

/**
 * Shared Windows-98-style window chrome for the hero's Playground and
 * About windows: title bar with min/max/close boxes, a menu row, then
 * content. Chrome is identical for both; only the title-bar accent comes
 * from the destination (see hero-destinations.ts), deepening to solid on
 * hover/focus of the wrapping link. Sized in container units so the
 * chrome scales with the window.
 */
export function HeroRetroWindow({
  title,
  menu,
  destination,
  children,
  className,
}: HeroRetroWindowProps) {
  const { deep, soft } = DESTINATION_COLORS[destination];

  return (
    <div className={cn("@container p-[3px]", RETRO_BEVEL, className)}>
      <div
        className="flex items-center gap-1 bg-linear-to-r from-(--bar-deep) to-(--bar-soft) px-1 py-[1.5px] group-hover:to-(--bar-deep) group-focus-visible:to-(--bar-deep)"
        style={
          { "--bar-deep": deep, "--bar-soft": soft } as React.CSSProperties
        }
      >
        <span className="flex-1 truncate font-sans text-[clamp(0.5625rem,3cqw,0.75rem)] font-bold text-white select-none">
          {title}
        </span>
        <span aria-hidden="true" className="flex gap-px">
          {["_", "□", "×"].map((glyph) => (
            <span
              key={glyph}
              className={cn(
                "flex size-[clamp(0.6rem,3.4cqw,0.875rem)] items-center justify-center text-[clamp(0.5rem,2.6cqw,0.625rem)] leading-none text-foreground",
                RETRO_BEVEL,
              )}
            >
              {/* The "_" and "□" glyphs don't sit centered in the box, so
                  draw the minimize bar and maximize square instead. */}
              {glyph === "_" ? (
                <span className="h-px w-1/2 bg-current" />
              ) : glyph === "□" ? (
                <span className="size-[40%] -translate-x-[20%] border border-current" />
              ) : (
                glyph
              )}
            </span>
          ))}
        </span>
      </div>
      {/* Menu row — dropped on phones, where the windows are small enough
          that it reads as clutter rather than detail. */}
      <div
        aria-hidden="true"
        className="hidden gap-[1em] px-1.5 py-0.5 sm:flex font-sans text-[clamp(0.5rem,2.6cqw,0.6875rem)] text-foreground select-none"
      >
        {menu.map((item) => (
          <span key={item}>
            <span className="underline">{item[0]}</span>
            {item.slice(1)}
          </span>
        ))}
      </div>
      {children}
    </div>
  );
}
