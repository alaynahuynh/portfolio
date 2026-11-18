"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useHeroWindow } from "@/components/sections/home/HeroWindow";
import { RETRO_BEVEL, RETRO_BEVEL_PRESSED } from "@/components/sections/home/retro-styles";
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

/**
 * Shared Windows-98-style window chrome for the hero's Playground and
 * About windows: title bar with min/max/close boxes, a menu row, then
 * content. Chrome is identical for both; only the title-bar accent comes
 * from the destination (see hero-destinations.ts), deepening to solid on
 * hover/focus. Sized in container units so the chrome scales with the
 * window.
 *
 * Inside a HeroWindow the controls are live: the title bar drags the
 * window and the boxes minimize, maximize and close it, while the menu
 * row and content form the link to the window's page. (Buttons can't sit
 * inside a link, so the title bar stays outside it.)
 */
export function HeroRetroWindow({
  title,
  menu,
  destination,
  children,
  className,
}: HeroRetroWindowProps) {
  const { deep, soft } = DESTINATION_COLORS[destination];
  const controls = useHeroWindow();

  const body = (
    <>
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
    </>
  );

  return (
    <div className={cn("keep-light @container p-[3px]", RETRO_BEVEL, className)}>
      <div
        {...controls?.titleBarProps}
        className={cn(
          "flex items-center gap-1 bg-linear-to-r from-(--bar-deep) to-(--bar-soft) px-1 py-[1.5px] select-none group-hover:to-(--bar-deep) group-has-[a:focus-visible]:to-(--bar-deep)",
          controls?.draggable && "cursor-grab touch-none active:cursor-grabbing",
        )}
        style={
          { "--bar-deep": deep, "--bar-soft": soft } as React.CSSProperties
        }
      >
        <span className="flex-1 truncate font-sans text-[clamp(0.5625rem,3cqw,0.75rem)] font-bold text-white">
          {title}
        </span>
        <span className="flex gap-px">
          <TitleButton label={`Minimize ${title}`} onClick={controls?.minimize}>
            <span className="h-px w-1/2 translate-y-[0.15em] bg-current" />
          </TitleButton>
          <TitleButton
            label={`${controls?.maximized ? "Restore" : "Maximize"} ${title}`}
            onClick={controls?.toggleMaximize}
          >
            {controls?.maximized ? (
              // Restore: two overlapping windows
              <span className="relative size-[46%]">
                <span className="absolute top-0 right-0 size-[75%] border border-t-2 border-current" />
                <span className="absolute bottom-0 left-0 size-[75%] border border-t-2 border-current bg-[#c3c0b8]" />
              </span>
            ) : (
              <span className="size-[48%] border border-t-2 border-current" />
            )}
          </TitleButton>
          <TitleButton label={`Close ${title}`} onClick={controls?.close} className="ml-[2px]">
            ×
          </TitleButton>
        </span>
      </div>
      {controls ? (
        <Link
          href={controls.href}
          aria-label={controls.ariaLabel}
          draggable={false}
          className="block focus-visible:outline-none"
        >
          {body}
        </Link>
      ) : (
        body
      )}
    </div>
  );
}

/** A title-bar box. Real buttons inside a HeroWindow, with a slight
 * brighten on hover and the bevel pressing in on click; decorative
 * otherwise. */
function TitleButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(
    "group/btn relative flex size-[clamp(0.6rem,3.4cqw,0.875rem)] items-center justify-center text-[clamp(0.5rem,2.6cqw,0.625rem)] leading-none text-foreground",
    RETRO_BEVEL,
    className,
  );
  const glyph = (
    <span className="flex size-full items-center justify-center group-active/btn:translate-px">
      {children}
    </span>
  );

  if (!onClick) {
    return (
      <span aria-hidden="true" className={classes}>
        {glyph}
      </span>
    );
  }
  return (
    <button
      type="button"
      aria-label={label}
      title={label.split(" ")[0]}
      onClick={onClick}
      className={cn(
        classes,
        RETRO_BEVEL_PRESSED,
        // Bigger touch target than the tiny box itself
        "cursor-default transition-[filter] duration-100 before:absolute before:-inset-1 hover:brightness-[1.06] focus-visible:outline-1 focus-visible:-outline-offset-3 focus-visible:outline-dotted focus-visible:outline-foreground",
      )}
    >
      {glyph}
    </button>
  );
}
