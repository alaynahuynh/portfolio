"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NavItem } from "@/components/layout/NavItem";
import { ResumeLink } from "@/components/ui/ResumeLink";
import { navLinks } from "@/lib/site-config";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Fixed scroll-pixel threshold before the pill firms up — the hero is a
 * plain static section now (see Hero.tsx), so this is just "has the
 * visitor started scrolling," not synced to any hero animation. */
const SCROLL_SHRINK_THRESHOLD = 24;

/** `/#work` → "work", used both to key each NavItem and to match it against
 * the active section/route. A plain route link (no hash, e.g. "/about")
 * keys off its own href instead. */
function keyOf(href: string) {
  return href.split("#")[1] ?? href;
}

/** "Work" and "Playground" are in-page homepage sections (`/#work`,
 * `/#sketchbook`) — "About" is the one real standalone route and
 * navigates normally. */
function isSectionAnchor(href: string) {
  return href.startsWith("/#");
}

/**
 * Floating glass nav. Fixed to the viewport, centered, and deliberately
 * narrower than the page — it reads as a piece of frosted glass hovering
 * over the page rather than a conventional edge-to-edge bar.
 *
 * Two pieces of state:
 * - `scrolled` — past a small threshold, the pill firms up (more opaque,
 *   more blur, tighter padding) and a scroll-progress stroke along its
 *   bottom edge grows. Both driven by one rAF-throttled scroll listener;
 *   the progress stroke is updated via direct style mutation (not
 *   `useState`) so it doesn't re-render on every scroll tick.
 * - `activeKey` — which nav item shows the pink "current" state: always
 *   exactly whichever item was last *clicked in the nav itself*
 *   (`clickedKey`), on any route — deliberately not pathname-matched and
 *   not scroll-spied. A pathname-matched version of this used to also
 *   light an item up whenever its route was merely open (e.g. "Work"
 *   whenever any /projects page was open, however you got there — a
 *   project card, a direct link, back/forward), independent of anything
 *   the visitor actually clicked in the nav. Click-only is simple and
 *   fully predictable: it changes exactly once per click, on the item
 *   clicked, full stop — and it's a brief flash (see
 *   `flashClicked`/`CLICK_FLASH_MS`), not a persistent "current page"
 *   indicator, since nothing here actually tracks a "current page" the
 *   rest of the time (the visitor can be scrolled or routed anywhere).
 */
export function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [clickedKey, setClickedKey] = useState<string | null>(null);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const clickFlashTimeoutRef = useRef<number | null>(null);

  // A real page load/reload should always open at the top, with the nav's
  // entrance actually visible — not wherever the browser would otherwise
  // land (a restored scroll position, or a #work/#about hash jump).
  // useLayoutEffect (not useEffect) so this runs before the browser paints,
  // avoiding a visible jump from wherever it first scrolled to. Only runs
  // once per real load since Header mounts once and persists across
  // client-side navigations.
  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Mobile menu: focus trap + Escape + scroll lock while open.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Scroll shrink + progress stroke — one listener driving both.
  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > SCROLL_SHRINK_THRESHOLD);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Clears any in-flight click-flash timer on unmount so it can't fire
  // setState after Header is gone.
  useEffect(() => {
    return () => {
      if (clickFlashTimeoutRef.current) window.clearTimeout(clickFlashTimeoutRef.current);
    };
  }, []);

  const CLICK_FLASH_MS = 400;

  /** Pink is a momentary "you clicked this" acknowledgment, not a
   * persistent "current page" indicator — there's no persistent "current
   * page" concept here to indicate, since the visitor can freely scroll
   * anywhere afterward. Re-clicking (even the same item) restarts the
   * flash rather than extending it. */
  function flashClicked(key: string) {
    setClickedKey(key);
    if (clickFlashTimeoutRef.current) window.clearTimeout(clickFlashTimeoutRef.current);
    clickFlashTimeoutRef.current = window.setTimeout(() => {
      setClickedKey(null);
      clickFlashTimeoutRef.current = null;
    }, CLICK_FLASH_MS);
  }

  /** Plain-section nav items ("Work") scroll here directly rather than
   * relying on next/link's hash-based navigation — that only scrolls
   * when the URL's hash string actually *changes*. Once a visitor has
   * clicked "Work" once (hash → "#work"), scrolling away by any other
   * means (a manual scroll) leaves the hash sitting at "#work" — so a
   * second click, with an identical target hash, silently no-ops instead
   * of scrolling back. */
  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }

  const activeKey = clickedKey;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-5 sm:pt-6">
      <div
        className={cn(
          "nav-shell pointer-events-auto relative w-full max-w-[44rem] rounded-[28px] border border-border/70 bg-background/55 shadow-[0_4px_20px_-12px_rgba(46,50,42,0.22)] backdrop-blur-sm transition-[background-color,box-shadow,backdrop-filter,border-color,padding] duration-(--duration-slow) ease-(--ease-soft) sm:w-[68%] lg:w-[56%]",
          scrolled && "border-border bg-background/85 shadow-[0_6px_22px_-10px_rgba(46,50,42,0.28)] backdrop-blur-md",
        )}
      >
        {/* One-time entrance flourish: an ink outline traces the pill's own border, then fades. */}
        <span aria-hidden="true" className="nav-trace pointer-events-none absolute inset-0 rounded-[28px] border-[1.5px] border-sage-deep/70" />

        <Container className={cn("flex items-center justify-between transition-[padding] duration-(--duration-slow) ease-(--ease-soft)", scrolled ? "py-2.5" : "py-3")}>
          {/* Name stands alone at the far left; nav + Resume cluster
              together at the far right (their own fixed, equal-spacing
              gaps internally) — the one elastic gap this leaves is
              between the logo and that cluster, reading as "name furthest
              left, everything else drawn toward the right" rather than
              splitting leftover space in the middle of the nav group. */}
          <Link
            href="/"
            onClick={(event) => {
              // Same page: next/link no-ops on a same-URL click (no
              // pathname or hash change to navigate to), so the logo
              // would otherwise do nothing if you're already home and
              // scrolled down. Scroll to the hero directly instead.
              if (pathname === "/") {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
              }
              // Immediate, not a flash: no nav item should be lit at all
              // once you're back at the hero, and any in-flight flash from
              // whatever was just clicked shouldn't reappear after this.
              if (clickFlashTimeoutRef.current) window.clearTimeout(clickFlashTimeoutRef.current);
              setClickedKey(null);
            }}
            className="nav-stagger-item group flex items-center focus-visible:outline-offset-4"
            style={{ animationDelay: "230ms" }}
          >
            {/* Re-writes itself left to right on hover/focus — see .name-write in globals.css. */}
            <span className="name-write font-alayna-handwriting text-[1.75rem] leading-none whitespace-nowrap text-foreground">
              Alayna Huynh
            </span>
          </Link>

          <div className="hidden items-center gap-8 sm:gap-10 md:flex">
            <nav aria-label="Primary" className="flex items-center gap-1">
              {navLinks.map((link, i) => {
                const key = keyOf(link.href);
                const active = activeKey === key;
                const anchor = isSectionAnchor(link.href);
                return (
                  <NavItem
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    active={active}
                    index={i + 1}
                    onClick={(event) => {
                      if (anchor && pathname === "/") {
                        event.preventDefault();
                        scrollToSection(key);
                      }
                      flashClicked(key);
                    }}
                  />
                );
              })}
            </nav>

            <span
              className="nav-stagger-item"
              style={{ animationDelay: `${230 + (navLinks.length + 1) * 55}ms` }}
            >
              <ResumeLink className="rounded-(--radius-pill) border border-meadow/25 px-4 py-2 text-sm tracking-wide text-meadow transition-colors duration-(--duration-base) ease-(--ease-soft) hover:bg-meadow/10" />
            </span>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="nav-stagger-item flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-black/5 md:hidden"
            style={{ animationDelay: `${230 + (navLinks.length + 1) * 55}ms` }}
          >
            {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </Container>

        {/* Scroll progress: a soft brush stroke along the pill's bottom edge, growing with scroll depth. */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 bottom-1.5 h-[3px] overflow-hidden rounded-full">
          <span
            ref={progressRef}
            className="block h-full w-full origin-left rounded-full opacity-70 transition-transform duration-150 ease-out"
            style={{
              transform: "scaleX(0)",
              backgroundImage:
                "linear-gradient(to right, color-mix(in srgb, var(--color-sage-deep) 50%, transparent), color-mix(in srgb, var(--color-sage-deep) 35%, transparent), color-mix(in srgb, var(--color-gold) 40%, transparent))",
            }}
          />
        </span>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="pointer-events-auto absolute inset-x-4 top-[calc(100%+0.5rem)] rounded-[24px] border border-border bg-background/95 shadow-[0_16px_40px_-14px_rgba(46,50,42,0.4)] backdrop-blur-lg md:hidden"
        >
          <div className="flex flex-col gap-1 p-3">
            {navLinks.map((link) => {
              const key = keyOf(link.href);
              const anchor = isSectionAnchor(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    if (anchor && pathname === "/") {
                      event.preventDefault();
                      scrollToSection(key);
                    }
                    flashClicked(key);
                    setMenuOpen(false);
                  }}
                  className="rounded-2xl px-4 py-3 text-base tracking-wide text-foreground transition-colors hover:bg-accent"
                >
                  {link.label}
                </Link>
              );
            })}
            <ResumeLink
              onClick={() => setMenuOpen(false)}
              className="block rounded-2xl px-4 py-3 text-base tracking-wide text-meadow transition-colors hover:bg-accent"
            />
          </div>
        </div>
      )}
    </header>
  );
}
