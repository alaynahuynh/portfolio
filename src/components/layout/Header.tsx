"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimatedAHLogo } from "@/components/ui/AnimatedAHLogo";
import { NavItem } from "@/components/layout/NavItem";
import { CreativePracticeNavItem } from "@/components/layout/CreativePracticeNavItem";
import { ResumeLink } from "@/components/ui/ResumeLink";
import { navLinks } from "@/lib/site-config";
import { prefersReducedMotion } from "@/lib/motion";
import { CHAPTER_NAV_EVENT, creativePracticeChapters } from "@/lib/chapter-nav";
import { cn } from "@/lib/utils";
import { HERO_FRAME } from "@/components/sections/home/hero-frame";

/** Fixed scroll-pixel threshold before the pill firms up — set to the
 * exact same value as HERO_FRAME.shrinkEndPx (hero-frame.ts) so the
 * navbar settles into its "past the hero" look in sync with the hero
 * itself finishing its shrink-to-frame transition, not on some
 * unrelated timer. Not viewport-relative anymore: the hero's own scroll
 * ranges are fixed pixel amounts too (see hero-frame.ts), so this stays
 * a plain constant. */
const SCROLL_SHRINK_THRESHOLD = HERO_FRAME.shrinkEndPx;

/** `/#work` → "work", used both to key each NavItem and to match it against the active section/route. */
function keyOf(href: string) {
  return href.split("#")[1] ?? href;
}

/**
 * Floating glass nav. Fixed to the viewport, centered, and deliberately
 * narrower than the page — it reads as a piece of frosted glass hovering
 * over the painted hero rather than a conventional edge-to-edge bar.
 *
 * Three pieces of state:
 * - `scrolled` — past a small threshold, the pill firms up (more opaque,
 *   more blur, tighter padding) and a scroll-progress stroke along its
 *   bottom edge grows. Both driven by one rAF-throttled scroll listener;
 *   the progress stroke is updated via direct style mutation (not
 *   `useState`) so it doesn't re-render on every scroll tick.
 * - `ready` — gates the one-time entrance choreography (see .nav-shell /
 *   .nav-trace / .nav-stagger-item in globals.css) so it plays as a real
 *   transition right after mount instead of the nav just appearing
 *   already-visible.
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
  const [logoPlay, setLogoPlay] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [ready, setReady] = useState(false);
  const [clickedKey, setClickedKey] = useState<string | null>(null);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const clickFlashTimeoutRef = useRef<number | null>(null);
  // Remounting AnimatedAHLogo (via the `key={logoPlay}` bump below) swaps
  // the SVG DOM node out from under a stationary cursor, which makes the
  // browser fire a spurious native mouseover/mouseenter on the
  // replacement node even though the pointer never moved — without this
  // guard, that retriggers another remount, which triggers another
  // mouseenter, forever, for as long as the mouse holds still: the logo
  // would perpetually reset and never finish drawing while genuinely
  // hovered. Set on the real entry, cleared on mouseleave (which never
  // fires spuriously the way mouseenter does), so exactly one replay
  // happens per real hover no matter how many spurious re-enters the
  // remount itself causes.
  const isHoveringLogoRef = useRef(false);
  // A chapter picked from the "Creative Practice" dropdown while on a
  // different route — Header persists across client-side navigations
  // (see the scrollRestoration effect below), so it holds onto the
  // choice and fires it once pathname actually becomes "/" and the
  // book has had a chance to mount.
  const pendingChapterRef = useRef<string | null>(null);

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

  // Entrance: there's no loading screen to gate this on anymore, so just
  // let the one-time nav-fade-up/nav-trace/nav-stagger-item choreography
  // (see globals.css) play right after mount. The rAF tick still matters —
  // it lets the initial "not ready" (opacity: 0) state actually paint
  // first, so flipping to ready produces a real transition instead of the
  // nav just appearing already-visible.
  useEffect(() => {
    if (prefersReducedMotion()) {
      // One-time client-side capability probe (matchMedia isn't available at
      // SSR time) — not a reactive sync loop, so the cascading-render concern
      // this lint rule guards against doesn't apply here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(true);
      return;
    }

    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
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

  // Flushes a chapter picked while on another route, once navigation
  // back to "/" has actually landed. requestAnimationFrame gives
  // CreativePracticeBook a tick to mount and lay out its (CSS-vh-sized)
  // track before it computes a scroll target off of it.
  useEffect(() => {
    if (pathname !== "/" || !pendingChapterRef.current) return;
    const key = pendingChapterRef.current;
    pendingChapterRef.current = null;
    const raf = requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent(CHAPTER_NAV_EVENT, { detail: { key } }));
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  /** Shared by the desktop dropdown and the mobile submenu — see lib/chapter-nav.ts.
   * `key` here is a page inside the book (cover/2d/3d/about). The pink
   * click-flash targets whatever was actually clicked: "about" and the
   * dropdown's own "2d"/"3d" each flash themselves (so a dropdown item
   * behaves exactly like any other nav button), while "cover" — the
   * trigger word "Sketchbook" itself, not a dropdown item — flashes the
   * top-level "creative-practice" nav key instead. */
  function handleSelectChapter(key: string) {
    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent(CHAPTER_NAV_EVENT, { detail: { key } }));
    } else {
      pendingChapterRef.current = key;
    }
    flashClicked(key === "cover" ? "creative-practice" : key);
    setMenuOpen(false);
  }

  /** Plain-section nav items ("Work") scroll here directly rather than
   * relying on next/link's hash-based navigation — that only scrolls
   * when the URL's hash string actually *changes*. Once a visitor has
   * clicked "Work" once (hash → "#work"), scrolling away by any other
   * means (a manual scroll, or the scrollToStage/CHAPTER_NAV_EVENT paths
   * above, neither of which touch the hash) leaves the hash sitting at
   * "#work" — so a second click, with an identical target hash, silently
   * no-ops instead of scrolling back. */
  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }

  const activeKey = clickedKey;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-5 sm:pt-6">
      <div
        className={cn(
          "nav-shell pointer-events-auto relative w-full max-w-[44rem] rounded-[28px] border border-sky/25 bg-white/45 shadow-[0_4px_20px_-12px_rgba(46,50,42,0.22)] backdrop-blur-sm transition-[background-color,box-shadow,backdrop-filter,border-color,padding] duration-(--duration-slow) ease-(--ease-soft) sm:w-[68%] lg:w-[56%]",
          scrolled && "border-border bg-white/70 shadow-[0_6px_22px_-10px_rgba(46,50,42,0.28)] backdrop-blur-md",
          ready && "nav-ready",
        )}
      >
        {/* One-time entrance flourish: an ink outline traces the pill's own border, then fades. */}
        <span aria-hidden="true" className="nav-trace pointer-events-none absolute inset-0 rounded-[28px] border-[1.5px] border-sage-deep/70" />

        <Container className={cn("flex items-center justify-between transition-[padding] duration-(--duration-slow) ease-(--ease-soft)", scrolled ? "py-2.5" : "py-3")}>
          {/* Logo stands alone at the far left; nav + Resume cluster
              together at the far right (their own fixed, equal-spacing
              gaps internally) — the one elastic gap this leaves is
              between the logo and that cluster, reading as "logo furthest
              left, everything else drawn toward the right" rather than
              splitting leftover space in the middle of the nav group. */}
          <Link
            href="/"
            onMouseEnter={() => {
              if (isHoveringLogoRef.current) return;
              isHoveringLogoRef.current = true;
              setLogoPlay((n) => n + 1);
            }}
            onMouseLeave={() => {
              isHoveringLogoRef.current = false;
            }}
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
            className="nav-stagger-item flex items-center gap-2.5 text-[#648F5E] transition-opacity duration-(--duration-base) hover:opacity-75"
            style={{ animationDelay: "230ms" }}
          >
            <AnimatedAHLogo
              key={logoPlay}
              className="h-[34px] w-auto"
              speed={logoPlay > 0 ? 1.5 : 1}
            />
            <span className="font-heading text-lg whitespace-nowrap text-foreground">
              Alayna Huynh
            </span>
          </Link>

          <div className="hidden items-center gap-8 sm:gap-10 md:flex">
            <nav aria-label="Primary" className="flex items-center gap-1">
              {navLinks.map((link, i) => {
                const key = keyOf(link.href);
                const active = activeKey === key;
                if (key === "creative-practice") {
                  return (
                    <CreativePracticeNavItem
                      key={link.href}
                      href={link.href}
                      label={link.label}
                      active={active}
                      activeKey={activeKey}
                      index={i + 1}
                      onSelectChapter={handleSelectChapter}
                      scrolled={scrolled}
                    />
                  );
                }
                if (key === "about") {
                  return (
                    <NavItem
                      key={link.href}
                      href={link.href}
                      label={link.label}
                      active={active}
                      index={i + 1}
                      onClick={(event) => {
                        if (pathname === "/") event.preventDefault();
                        handleSelectChapter("about");
                      }}
                    />
                  );
                }
                return (
                  <NavItem
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    active={active}
                    index={i + 1}
                    onClick={(event) => {
                      if (pathname === "/") {
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
          className="pointer-events-auto absolute inset-x-4 top-[calc(100%+0.5rem)] rounded-[24px] border border-white/60 bg-white/90 shadow-[0_16px_40px_-14px_rgba(46,50,42,0.4)] backdrop-blur-lg md:hidden"
        >
          <div className="flex flex-col gap-1 p-3">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={(event) => {
                    const key = keyOf(link.href);
                    if (key === "about" || key === "creative-practice") {
                      if (pathname === "/") event.preventDefault();
                      handleSelectChapter(key === "about" ? "about" : "cover");
                      return;
                    }
                    if (pathname === "/") {
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
                {keyOf(link.href) === "creative-practice" && (
                  <div className="ml-4 flex flex-col gap-0.5 border-l border-border pl-3">
                    {creativePracticeChapters.map((chapter) => (
                      <Link
                        key={chapter.key}
                        href={link.href}
                        onClick={(event) => {
                          if (pathname === "/") event.preventDefault();
                          handleSelectChapter(chapter.key);
                        }}
                        className="rounded-xl px-4 py-2 text-left text-sm tracking-wide text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        {chapter.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
