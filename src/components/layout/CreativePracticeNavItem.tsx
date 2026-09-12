"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { creativePracticeChapters } from "@/lib/chapter-nav";
import { HoverUnderlineLabel } from "@/components/layout/HoverUnderlineLabel";

interface CreativePracticeNavItemProps {
  href: string;
  label: string;
  active: boolean;
  /** Which nav/chapter key was last clicked (see Header.tsx) — read here
   * so each dropdown item can independently show its own brief pink
   * click-flash, the same way the trigger and every other NavItem does. */
  activeKey: string | null;
  index: number;
  /** Fires (with a page key from `creativePracticeChapters`) when a dropdown item is chosen — see Header.tsx for what it does depending on the current route. */
  onSelectChapter: (key: string) => void;
  /** Mirrors the nav pill's own scrolled state so the dropdown panel's
   * background/blur reads as part of the same piece of glass rather than
   * a separately-styled popover. */
  scrolled: boolean;
}

/**
 * The one nav item with a dropdown — hovering or focusing "Sketchbook"
 * reveals direct links to specific pages inside the sketchbook (2D
 * Works / 3D Works), rather than only the book's cover. Pure CSS for the
 * reveal (named group, matching NavItem's own hover-driven styling
 * elsewhere in this nav) so no extra open/close state is needed —
 * `group-focus-within` covers keyboard use, since these are plain
 * focusable links.
 *
 * Every clickable label here — the trigger and both dropdown items —
 * shares NavItem's exact hover-underline (HoverUnderlineLabel) and
 * click-flash pink (`active`/`activeKey`) treatment, and the dropdown
 * panel matches the nav pill's own background/blur (`scrolled`) — this
 * needs to read as one cohesive control, not a visually distinct popover
 * bolted onto the side of it. The gap between the trigger and the panel
 * (`pt-*` below) is also keyed to `scrolled`, not a single fixed value —
 * the pill's own vertical padding shrinks when scrolled (see Header.tsx),
 * so a fixed gap would sit flush in one state and visibly gap or overlap
 * in the other.
 *
 * The trigger itself is still a real link to `href` (the book's cover)
 * — the dropdown adds destinations, it doesn't replace the default one.
 * Clicking it (like the dropdown items, and like "About" in Header.tsx)
 * routes through `onSelectChapter("cover")` rather than a plain anchor
 * jump: `href` only points at the *section*, and that section now opens
 * with a scroll-driven narrative intro before the book itself fades in,
 * so a plain hash jump would land a visitor on the intro text instead
 * of the book. `onSelectChapter` triggers CreativePracticeBook's own
 * scrollToStage(0) instead, landing exactly on the (already-visible)
 * cover.
 */
export function CreativePracticeNavItem({
  href,
  label,
  active,
  activeKey,
  index,
  onSelectChapter,
  scrolled,
}: CreativePracticeNavItemProps) {
  const pathname = usePathname();

  return (
    <div className="group/cp nav-stagger-item relative" style={{ animationDelay: `${230 + index * 55}ms` }}>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        onClick={(event) => {
          if (pathname === "/") event.preventDefault();
          onSelectChapter("cover");
          // The click leaves this link focused, and group-focus-within
          // alone would keep the dropdown open indefinitely — until
          // something else takes focus — with the mouse nowhere near it.
          event.currentTarget.blur();
        }}
        className={cn(
          "group relative flex items-center gap-1 rounded-(--radius-pill) px-4 py-2 text-sm tracking-wide whitespace-nowrap text-muted-foreground transition-colors duration-(--duration-base) ease-(--ease-soft) hover:text-foreground",
          active && "text-meadow",
        )}
      >
        <HoverUnderlineLabel label={label} leftClassName="left-4" />
        <ChevronDown aria-hidden="true" className="size-3.5 transition-transform duration-(--duration-base) group-hover/cp:rotate-180 group-focus-within/cp:rotate-180" />
      </Link>

      {/* Sits flush against the pill's own bottom edge (tuned to its
          padding, not the trigger's — the trigger sits well above the
          pill's actual edge once centered against its taller siblings),
          centered under the trigger, sized to fit just its two links.
          The two pt- values below are measured, not guessed: the pill's
          Container padding is py-3 at rest / py-2.5 scrolled (Header.tsx),
          a 2px difference the trigger's own centering only partly
          absorbs, so the offset needed to land exactly on the pill's
          edge differs by that same amount between the two states. */}
      <div
        className={cn(
          "invisible absolute top-full left-1/2 z-10 -translate-x-1/2 opacity-0 transition-[opacity,visibility] duration-(--duration-base) ease-(--ease-soft) group-hover/cp:visible group-hover/cp:opacity-100 group-focus-within/cp:visible group-focus-within/cp:opacity-100",
          scrolled ? "pt-[11px]" : "pt-[13px]",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-1 rounded-t-none rounded-b-2xl border-x border-b p-2 shadow-[0_10px_20px_-12px_rgba(46,50,42,0.25)] transition-[background-color,backdrop-filter,border-color] duration-(--duration-slow) ease-(--ease-soft)",
            scrolled ? "border-border bg-mist/90 backdrop-blur-md" : "border-sky/25 bg-white/45 backdrop-blur-sm",
          )}
        >
          {creativePracticeChapters.map((chapter) => (
            <Link
              key={chapter.key}
              href={href}
              onClick={(event) => {
                // Same page: our own precise scrollToStage takes over —
                // letting the native hash-scroll also run would land it
                // on the section's top (the intro text) a tick later and
                // clobber this. Cross-page: let it navigate normally,
                // onSelectChapter queues the chapter for after landing.
                if (pathname === "/") event.preventDefault();
                onSelectChapter(chapter.key);
                // Same reasoning as the trigger's onClick above: don't
                // let lingering focus keep the dropdown open with the
                // mouse no longer anywhere near it.
                event.currentTarget.blur();
              }}
              className={cn(
                "group relative rounded-xl px-3 py-2 text-center text-sm whitespace-nowrap text-muted-foreground transition-colors duration-(--duration-base) ease-(--ease-soft) hover:text-foreground",
                activeKey === chapter.key && "text-mauve-deep hover:text-mauve-deep",
              )}
            >
              <HoverUnderlineLabel label={chapter.label} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
