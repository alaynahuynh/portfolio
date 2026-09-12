"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BookCover } from "@/components/sections/home/BookCover";
import { TwoDSpread } from "@/components/sections/home/TwoDSpread";
import { ThreeDSpread } from "@/components/sections/home/ThreeDSpread";
import { AboutScrapbookPage } from "@/components/sections/home/AboutScrapbookPage";
import { ContactBookPage } from "@/components/sections/home/ContactBookPage";
import { BackCoverPage } from "@/components/sections/home/BackCoverPage";
import { ChapterControls } from "@/components/sections/home/ChapterControls";
import { VNHSpread } from "@/components/sections/home/ProjectPlaceholder";
import {
  SketchbookBook,
  STAGE_COUNT,
  STAGE_KEYS,
  type SketchbookBookHandle,
} from "@/components/sections/home/SketchbookBook";
import { prefersReducedMotion } from "@/lib/motion";
import { CHAPTER_NAV_EVENT } from "@/lib/chapter-nav";
import { consumeBookScrollPosition } from "@/lib/book-return";
import { getProjectBySlug } from "@/data/projects";

// How long VNH holds fully in place, pinned, untouched, before the
// incoming panel starts rising at all (see the holdPx calc in
// computeAndApply) — the "arrive → pause → pull the next page upward"
// beat. Kept as its own constant, separate from TRANSITION_VH, so it's a
// one-line tune: bigger reads as more anticipation/resistance, smaller
// as a quicker handoff. Zero: the wave should start rising the instant
// the section is scrolled into, not after a pause.
const HOLD_VH = 0;
// Dedicated scroll distance for the VNH → cream handoff itself, *after*
// HOLD_VH — see the module comment below for the full architecture.
// Nothing else on the page advances during either span; together they
// exist purely to give the sticky viewport room to hold, then play the
// cover animation out at a deliberate pace, before the book's own intro
// sequence gets a turn.
const TRANSITION_VH = 120;
// Extra scroll room for the narrative intro (the two handwriting lines,
// flying away over the already-visible closed book) before it settles and
// the closed cover fades in.
const INTRO_VH = 90;
// Scroll distance devoted to each page turn once the book itself is
// showing — the book's open page tracks scroll position directly across
// this whole span (see the scroll effect below and SketchbookBook's
// `setProgress`), so scrolling through it turns pages exactly like
// scrolling a real book.
const STAGE_VH = 50;
const RELEASE_VH = 100; // one viewport of room for the sticky book to release into normal flow after the last page

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// The organic top edge of the incoming cream page — a standalone
// WAVE_BAND_VH-tall element (see WaveBand in the JSX below), not a clip
// carved into the top of the full-height solid page. That distinction is
// what fixes the end-of-transition snap this replaced: when the wave was
// clipped out of the *same* full-height layer as the solid fill, the
// space above the wave's own peaks (never quite reaching clip-path
// fraction 0) stayed transparent even once the panel had otherwise fully
// "arrived" — so hiding the previous panel behind it exposed a sliver of
// whatever was behind for one frame. With the wave split into its own
// element that protrudes *above* the solid page (`top: -WAVE_BAND_VH`)
// instead of being cut out of it, the solid page itself is fully opaque,
// full height, no clip-path, everywhere — there's no transparent gap left
// for anything to be visible through, ever.
//
// WAVE_PATH_D is built in two layers, both via De Casteljau subdivision
// (splitting a cubic bezier at its exact midpoint so the two halves still
// trace the *same* curve, then nudging just that midpoint — never a
// sharp corner, just a soft change in curvature) so the whole thing stays
// smooth curves throughout, no straight-line zigzags anywhere:
//
// 1. The broad silhouette — same 4 anchor points, same overall
//    rises/dips as the original — with each of its 4 segments split
//    once and that midpoint nudged by a fairly generous, unevenly-sized
//    offset. This is the "hand-painted," asymmetric large-scale wave.
// 2. A finer layer on top — each of *those* 8 segments split again and
//    nudged a second time, at roughly a third the amplitude of layer 1
//    and with its own unevenly-signed offsets (not alternating in a
//    regular pattern, so it doesn't read as a secondary ripple). This is
//    the faint, brush-like grain the broad wave alone didn't have —
//    close up it reads as "painted," at a glance it still reads as one
//    clean wave.
//
// Both layers stay deliberately tiny relative to the ~0.6 overall
// amplitude of the curve — texture, not a redesign of the shape.
const WAVE_BAND_VH = 16;
// Where the incoming panel's translateY starts (see computeAndApply) —
// 100vh (a full viewport, matching the solid page) plus the wave's own
// WAVE_BAND_VH, since the wave protrudes above the panel's own top edge
// and needs to start below the viewport too, not just the solid page.
const PANEL_START_VH = 100 + WAVE_BAND_VH;
const WAVE_CLIP_ID = "creative-practice-wave-clip";
const WAVE_PATH_D =
  "M0,0.5 C0.03,0.53 0.0562,0.5231 0.0806,0.4987" +
  " C0.105,0.4562 0.1275,0.3962 0.15,0.32" +
  " C0.1725,0.2938 0.195,0.2512 0.2194,0.2023" +
  " C0.2438,0.1794 0.27,0.15 0.3,0.15" +
  " C0.325,0.15 0.3475,0.1875 0.3686,0.2582" +
  " C0.3897,0.315 0.4094,0.405 0.4288,0.51" +
  " C0.4482,0.555 0.4672,0.615 0.487,0.6537" +
  " C0.5069,0.7125 0.5275,0.75 0.55,0.75" +
  " C0.5725,0.75 0.5931,0.7156 0.613,0.6704" +
  " C0.6328,0.6013 0.6519,0.5212 0.6712,0.43" +
  " C0.6906,0.3838 0.7103,0.3262 0.7314,0.2723" +
  " C0.7525,0.2344 0.775,0.2 0.8,0.2" +
  " C0.82,0.2 0.8387,0.2156 0.8566,0.2563" +
  " C0.8744,0.275 0.8912,0.3187 0.9075,0.375" +
  " C0.9237,0.3812 0.9394,0.4 0.9547,0.4112" +
  " C0.97,0.4344 0.985,0.45 1,0.45" +
  " L1,1 L0,1 Z";

function WaveClipDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        <clipPath id={WAVE_CLIP_ID} clipPathUnits="objectBoundingBox">
          <path d={WAVE_PATH_D} />
        </clipPath>
      </defs>
    </svg>
  );
}

// Ease-out, not ease-in-out: an ease-in-out curve's slow windup at t=0
// feels fine for one isolated flip, but a rapid second click cancels the
// tween in flight and restarts it — re-entering that same slow windup
// every time — which is what read as a lag/delay under fast clicking.
// Ease-out has its velocity already at its peak from the first frame, so
// every retarget (first click or fifth) starts moving immediately, and
// still settles smoothly into the landing rather than stopping short.
function easeOutCubic(x: number) {
  return 1 - (1 - x) ** 3;
}

// A page turn you trigger by hand (click, arrow key, nav) — unlike a raw
// scroll gesture, which is the reader's own speed to control — gets its
// own slow, deliberate animated scroll instead of the browser's native
// "smooth" scroll, which is both too quick and has a duration/easing the
// browser picks, not tunable to feel like an actual page turning.
const MS_PER_STAGE = 700;
function animateScrollTo(
  targetY: number,
  stagesMoved: number,
  cancelRef: { current: number },
  isAnimatingRef: { current: boolean },
) {
  cancelAnimationFrame(cancelRef.current);
  const startY = window.scrollY;
  const delta = targetY - startY;
  if (Math.abs(delta) < 1) {
    isAnimatingRef.current = false;
    return;
  }
  const duration = clamp(Math.abs(stagesMoved) * MS_PER_STAGE, 500, 2600);
  const startTime = performance.now();
  isAnimatingRef.current = true;
  function step(now: number) {
    const t = clamp((now - startTime) / duration, 0, 1);
    window.scrollTo(0, startY + delta * easeOutCubic(t));
    if (t < 1) {
      cancelRef.current = requestAnimationFrame(step);
    } else {
      isAnimatingRef.current = false;
    }
  }
  cancelRef.current = requestAnimationFrame(step);
}

// Reduced-motion renders each page as an independent stacked block (no
// sticky track, no animated flips), so a chapter-nav request there means a
// plain scrollIntoView on that block's own id instead of turning pages.
const REDUCED_MOTION_TARGET_IDS: Record<string, string> = {
  cover: "practice-cover",
  "2d": "practice-2d",
  "3d": "practice-3d",
  about: "practice-about",
};

/**
 * The sketchbook — the real, interactive book right in the homepage's own
 * layout (see SketchbookBook), not a separate overlay.
 *
 * The entrance from the Vietnamese Noodle House spread — the last project,
 * but rendered *here*, not by FeaturedWork (see that component's own
 * module comment for why) — is a pinned-viewport cover transition, not a
 * decorative divider bolted onto two independently-scrolling sections.
 * Structurally: trackRef is one tall track whose *first* HOLD_VH +
 * TRANSITION_VH is reserved for this handoff — HOLD_VH first (VNH just
 * sits there, pinned, nothing moving — the deliberate anticipation beat
 * before the cover animation gets going), then TRANSITION_VH for the
 * cover animation itself — and sceneRef — `position: sticky; top: 0;
 * h-screen` — is the pinned viewport for the *entire* track, hold and
 * cover transition included. Two layers sit inside it, both `absolute inset-0`:
 *
 * - The **previous panel**: VNHSpread itself — the genuine, only,
 *   interactive rendering of that project, not a decorative copy. It
 *   reads as "pinned" during the transition simply because it's
 *   untransformed at z-0 while the incoming panel (below) moves over it;
 *   there's no second element anywhere whose timing has to match this
 *   one's, because there's only the one.
 * - The **incoming panel** (z-10): a solid, *unclipped*, full-height
 *   `--color-background` page, a standalone WaveBand protruding above its
 *   own top edge (`top: -WAVE_BAND_VH`, not a clip carved into the solid
 *   page itself), and this section's real content (intro text, book) — all
 *   three as one physically-moving unit, `transform: translateY(...)`
 *   driven straight off scroll progress through TRANSITION_VH, from
 *   PANEL_START_VH (100vh + the wave's own protrusion — fully below the
 *   viewport, previous panel showing 100%) down to 0 (solid page's top
 *   exactly at the viewport top, wave now entirely above it at
 *   [−WAVE_BAND_VH, 0]). The wave moves *because* the panel moves, not on
 *   a schedule of its own, so it can't finish early or lag behind — and
 *   because the solid page is never clipped, there's no transparent gap
 *   anywhere in it for the previous panel to show through once settled
 *   (see the WAVE_BAND_VH comment for why an earlier version, which
 *   clipped the wave shape out of that same full-height layer, snapped
 *   visibly at the very end instead).
 *
 * Because both panels live inside the *same* sticky viewport, "VNH stays
 * pinned while the incoming page covers it" isn't two elements whose
 * timing has to line up — the previous panel simply doesn't move at all,
 * and the incoming one does, for exactly TRANSITION_VH of scroll, no
 * more. Only once that's exhausted does introProgress (see
 * computeAndApply) start advancing at all, so the "text settles, book
 * rises" sequence below can't begin until the cream page has already
 * fully taken over the screen.
 *
 * (This replaces an earlier version that tried to fake the same effect
 * with VNH given its own separate `position: sticky` hold and a
 * `position: fixed` wave layer animated off a *different* scroll
 * reference than the real content panel — the two timings could drift
 * apart, which is what let the sticky state end, and normal scrolling
 * resume, before the incoming panel had actually finished covering the
 * viewport.)
 *
 * After the cover transition: two handwriting lines settle, then clear
 * the way for the closed book to rise up from below the fold and settle
 * into place. After that, the book's open page is driven directly by
 * scroll position through the rest of the pinned track — the reader can
 * flip through it just by scrolling, the same way they'd flip through
 * the rest of the page.
 *
 * Every other way of turning a page (clicking the book itself, the
 * chapter dots/arrows, the arrow keys, or the site nav's About/Sketchbook
 * links) funnels through `scrollToStage`, which just moves the window's
 * scroll position to that stage — the resulting scroll is what actually
 * plays the flip, so every interaction stays in sync with the scroll
 * track instead of animating independently of it.
 *
 * Nav destinations aren't all treated the same: "About" is meant to just
 * already be open (a reader jumping there shouldn't watch it flip through
 * 2D/3D on the way), so it lands instantly — everything else (2D Works,
 * 3D Works, the cover itself) plays the real flip animation, same as
 * clicking through by hand.
 */
export function CreativePracticeBook() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const incomingPanelRef = useRef<HTMLDivElement>(null);
  const previousPanelRef = useRef<HTMLDivElement>(null);
  const introLine1Ref = useRef<HTMLParagraphElement>(null);
  const introLine2Ref = useRef<HTMLParagraphElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  // Whether we're currently past the cover transition (i.e., the intro
  // text is the thing on screen) — tracked across scroll ticks so the
  // highlight's delay only (re)starts on the actual moment of arriving,
  // not on every tick while already here. See the highlight timer below.
  const introEnteredRef = useRef(false);
  const highlightTimeoutRef = useRef<number | undefined>(undefined);
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const bookApiRef = useRef<SketchbookBookHandle>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef(0);
  // True from the moment a click/key/nav navigation starts an animated
  // scroll until it actually finishes — see handleStageChange below.
  const isAnimatingRef = useRef(false);
  const scrollAnimRef = useRef(0);
  const [reduced, setReduced] = useState(false);
  const [stage, setStage] = useState(0);

  // The data behind the "previous panel" — VNH itself, the real final
  // project, rendered by this component instead of FeaturedWork (see the
  // module comment). FeaturedWork's own project loop excludes this same
  // slug so it isn't rendered twice.
  const vnhProject = getProjectBySlug("case-study-03");

  // Read (and clear) any remembered scroll position exactly once, during
  // render rather than in an effect. `consumeBookScrollPosition` is
  // destructive (it removes the sessionStorage entry), and effects can run
  // twice on mount in development (React Strict Mode's mount → cleanup →
  // mount simulation) — an effect calling it directly would see the real
  // value on the first pass and null on the second, breaking the restore
  // in dev only. Ref mutations made during render aren't discarded the way
  // a StrictMode double-render's return value is, so this guard runs the
  // read exactly once regardless.
  const savedScrollRef = useRef<number | null | undefined>(undefined);
  if (savedScrollRef.current === undefined) {
    savedScrollRef.current = consumeBookScrollPosition();
  }

  useEffect(() => {
    // One-time client-side capability probe (matchMedia isn't available at
    // SSR time) — not a reactive sync loop, so the cascading-render concern
    // this lint rule guards against doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(prefersReducedMotion());
  }, []);

  // Restore the reader's place in the book (see the "Explore 2D/3D Works"
  // links, which remember it just before navigating away) before the
  // scroll-driven stage effect below gets a chance to compute a stage from
  // scrollY 0 and briefly render the cover. A layout effect, not a plain
  // effect, so this runs before paint instead of after — no flash of the
  // wrong page on the way to the right one.
  //
  // "Return to the book" links to `/#creative-practice`, and the App
  // Router has its own hash-scroll behavior that fires in a passive effect
  // higher up the tree — since React runs every layout effect in the tree
  // before any passive effect, stripping the hash here (so there's nothing
  // left for that later effect to act on) reliably wins the race, unlike
  // trying to out-schedule it. The rAF-deferred re-assertion is a second
  // line of defense in case something else nudges scroll after this — and
  // in dev, where this effect itself runs twice (mount → cleanup → mount),
  // it's what makes the *second* run's correction the one that survives
  // (the first run's rAF gets cancelled by the simulated cleanup below).
  useLayoutEffect(() => {
    const saved = savedScrollRef.current;
    if (saved === null || saved === undefined) return;
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, saved);
    const raf = requestAnimationFrame(() => window.scrollTo(0, saved));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => () => cancelAnimationFrame(scrollAnimRef.current), []);

  function handleStageChange(next: number) {
    // While a click/key/nav-triggered flip is animating, its own
    // scrollToStage call has already set stageRef/stage to the real
    // destination — ignore the intermediate stages the scroll passes
    // through on the way there. Without this guard, a second click fired
    // before the first flip finishes would read a rounded-but-stale
    // in-between stage here and compute its own target one step off the
    // *actual* destination instead of continuing from it, which is what
    // made rapid clicking desync the book from the buttons. Once nothing
    // is animating, this goes back to just tracking raw scroll position.
    if (isAnimatingRef.current) return;
    stageRef.current = next;
    setStage(next);
  }

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;

    // Two beats through the 0–1 intro progress: the text holds fully
    // still and readable through HOLD_END — the book stays completely
    // off-screen the whole time, so the two are always separate at the
    // start — then, from HOLD_END to RISE_END, the book rises into view
    // while the text lingers in place before fading (see TEXT_FADE_START
    // below), so the two spend a good stretch on screen together rather
    // than just crossing paths mid-fade. Just never before HOLD_END.
    const HOLD_END = 0.2;
    const RISE_END = 0.85;

    // Within the transition, the book starts rising immediately but the
    // text stays fully visible until TEXT_FADE_START, then clears out
    // over a short window — well before the book finishes rising into
    // place (RISE_END), so the two only share the screen briefly instead
    // of sitting stacked on top of each other for the whole climb.
    const TEXT_FADE_START = 0.15;
    const TEXT_FADE_END = 0.5;

    function applyIntro(progress: number) {
      const transitionProgress = clamp((progress - HOLD_END) / (RISE_END - HOLD_END), 0, 1);
      const textFade = clamp((transitionProgress - TEXT_FADE_START) / (TEXT_FADE_END - TEXT_FADE_START), 0, 1);
      const textOpacity = 1 - textFade;
      const line1Y = -140 * textFade;
      const line2Y = -170 * textFade;
      // Starts rising right at HOLD_END (ahead of the text's own fade),
      // so the book is already well into view by the time the text
      // begins leaving — maximizing how long they share the screen.
      const riseProgress = transitionProgress;

      if (introLine1Ref.current) {
        introLine1Ref.current.style.opacity = textOpacity.toFixed(3);
        introLine1Ref.current.style.transform = `translateY(${line1Y.toFixed(1)}px)`;
      }
      if (introLine2Ref.current) {
        introLine2Ref.current.style.opacity = textOpacity.toFixed(3);
        introLine2Ref.current.style.transform = `translateY(${line2Y.toFixed(1)}px)`;
      }
      if (bookContainerRef.current) {
        bookContainerRef.current.style.opacity = "1";
        // A full 100vh, not just enough to clear the book's own height —
        // guarantees it starts fully below the visible viewport (not just
        // mostly) regardless of how tall it renders at a given screen
        // size, so no sliver of it peeks in at the bottom while the text
        // is still on screen.
        bookContainerRef.current.style.transform = `translateY(${(100 * (1 - riseProgress)).toFixed(1)}vh)`;
      }
      // Only worth showing while still on the closed cover — mirrors the
      // `stage === 0` gate, reading the ref instead of React state to stay
      // accurate within this same rAF tick (state lags a render behind).
      if (ctaRef.current) {
        ctaRef.current.style.opacity =
          stageRef.current === 0 ? riseProgress.toFixed(3) : "0";
      }
    }

    function computeAndApply() {
      const rect = track!.getBoundingClientRect();
      const totalScrollable = track!.offsetHeight - window.innerHeight;
      const scrolledPx = clamp(-rect.top, 0, totalScrollable);

      // The hold: for the first HOLD_VH of scroll, VNH just sits there,
      // fully pinned, nothing moving at all — transitionScrolledPx stays
      // at 0 for this whole span (clamped, below), so coverProgress can't
      // start advancing until it's exhausted. This is the deliberate
      // "arrive → pause → pull the next page upward" beat; it doesn't
      // touch the cover animation itself, just delays when it starts.
      const holdPx = (HOLD_VH / 100) * window.innerHeight;
      // The cover transition: 0 → 1 over TRANSITION_VH of scroll *after*
      // the hold above, driving the incoming panel's own translateY from
      // PANEL_START_VH (fully below the viewport, wave included — the
      // previous panel, VNH, shows 100%) down to 0 (solid page's top
      // exactly at the viewport top). PANEL_START_VH is 100vh plus the
      // wave's own protruding WAVE_BAND_VH, not just 100vh/100% — the
      // wave sits *above* the panel's own top edge (see WaveBand in the
      // JSX below), so the starting position has to push that protruding
      // part below the viewport too, or the wave would already be
      // peeking in at progress 0. At the settled end (translateY 0), the
      // wave — still WAVE_BAND_VH above the panel's top — ends up
      // entirely above the viewport (from −WAVE_BAND_VH to 0), gone,
      // while the solid page underneath it already covers the full
      // screen. Both the wave and the real content are inside this one
      // panel (see the JSX below), so they can't drift apart — the wave
      // moves because the panel does.
      const transitionPx = (TRANSITION_VH / 100) * window.innerHeight;
      const transitionScrolledPx = Math.max(0, scrolledPx - holdPx);
      const coverProgress = transitionPx > 0 ? clamp(transitionScrolledPx / transitionPx, 0, 1) : 1;
      if (incomingPanelRef.current) {
        const panelVh = (1 - coverProgress) * PANEL_START_VH;
        incomingPanelRef.current.style.transform = `translateY(${panelVh.toFixed(2)}vh)`;
      }
      // Safe to hide only once the incoming panel has genuinely settled
      // — its solid page (no clip-path, full height, see the JSX below)
      // is what's covering the previous panel by then, not the wave, so
      // there's no transparent gap left for hiding this to expose. Purely
      // a paint-cost trim beyond that point, not load-bearing for
      // correctness.
      if (previousPanelRef.current) {
        previousPanelRef.current.style.visibility = coverProgress >= 1 ? "hidden" : "visible";
      }

      // The "sketchbook" highlight deliberately lands a beat after the
      // intro text itself does, rather than appearing at the exact same
      // moment — it reads as a second, separate gesture (like someone
      // underlining the word after saying it) instead of just being part
      // of the text's own entrance. coverProgress reaching 1 is the exact
      // moment the intro text becomes the thing on screen, so that's what
      // starts the real-time delay, not a scroll distance (scrolling fast
      // or slow through the intro shouldn't change how long the highlight
      // takes to land once you're actually looking at it). Scrolling back
      // out before it fires cancels the timer and resets the highlight,
      // so arriving again later replays the same beat instead of skipping
      // straight to "already highlighted."
      const introEntered = coverProgress >= 1;
      if (introEntered && !introEnteredRef.current) {
        introEnteredRef.current = true;
        window.clearTimeout(highlightTimeoutRef.current);
        highlightTimeoutRef.current = window.setTimeout(() => {
          highlightRef.current?.classList.add("bg-sky/35");
        }, 1000);
      } else if (!introEntered && introEnteredRef.current) {
        introEnteredRef.current = false;
        window.clearTimeout(highlightTimeoutRef.current);
        highlightRef.current?.classList.remove("bg-sky/35");
      }

      // introProgress can't start advancing until the hold *and* the
      // cover transition have both fully finished — subtracting
      // holdPx + transitionPx and clamping to 0 below that means the
      // text/book (nested inside the *same* incoming panel) stay in
      // their HOLD_END-vs-not-yet-arrived state for that entire span,
      // only beginning their own sequence once the panel is genuinely
      // done covering the screen.
      const introScrolledPx = Math.max(0, scrolledPx - holdPx - transitionPx);
      const introPx = (INTRO_VH / 100) * window.innerHeight;
      const stagePx = (STAGE_VH / 100) * window.innerHeight;
      const introProgress = introPx > 0 ? clamp(introScrolledPx / introPx, 0, 1) : 1;
      applyIntro(introProgress);

      // The book's open page tracks this directly, frame for frame — see
      // SketchbookBook's `setProgress`. Zero for the whole intro span
      // (matches the still-closed cover), then climbs one stage per
      // `STAGE_VH` of scroll for the rest of the track.
      const stageProgress =
        stagePx > 0
          ? clamp((introScrolledPx - introPx) / stagePx, 0, STAGE_COUNT - 1)
          : 0;
      bookApiRef.current?.setProgress(stageProgress);
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        computeAndApply();
        raf = 0;
      });
    }

    computeAndApply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(highlightTimeoutRef.current);
    };
  }, [reduced]);

  // True while the sticky scene itself is actually on screen — used to
  // scope the arrow-key handler below so the keys don't hijack scrolling
  // or typing anywhere else on the site.
  function isSceneInView() {
    const scene = sceneRef.current;
    if (!scene) return false;
    const rect = scene.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  // The single way every non-scroll interaction (a click on the book, the
  // chapter dots/arrows, the arrow keys, the site nav) turns a page: move
  // the window's scroll position to that stage. Scroll position is the
  // book's source of truth (see the scroll effect above), so the resulting
  // scroll — a slow, hand-tuned animated scroll by default (see
  // animateScrollTo), instant for `options.instant` or reduced motion —
  // is what actually plays the flip, keeping every interaction perfectly
  // in sync with the scroll-driven track.
  //
  // stageRef/stage are set to the destination immediately, before the
  // scroll itself has gone anywhere — not just once the animation lands
  // there (see handleStageChange's guard). ChapterControls and the arrow
  // keys both compute their next target as stage ± 1, so a second click
  // fired mid-flip has to see the real pending destination here, not a
  // stale value that only catches up once the previous flip finishes —
  // otherwise rapid clicks keep re-requesting the same next stage instead
  // of advancing further with each click.
  function scrollToStage(target: number, options?: { instant?: boolean }) {
    const track = trackRef.current;
    if (!track) return;
    const clampedTarget = clamp(target, 0, STAGE_COUNT - 1);
    const rect = track.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const holdPx = (HOLD_VH / 100) * window.innerHeight;
    const transitionPx = (TRANSITION_VH / 100) * window.innerHeight;
    const introPx = (INTRO_VH / 100) * window.innerHeight;
    const stagePx = (STAGE_VH / 100) * window.innerHeight;
    const targetScrollY = trackTop + holdPx + transitionPx + introPx + clampedTarget * stagePx;
    const from = stageRef.current;
    stageRef.current = clampedTarget;
    setStage(clampedTarget);
    if (options?.instant || prefersReducedMotion()) {
      isAnimatingRef.current = false;
      cancelAnimationFrame(scrollAnimRef.current);
      window.scrollTo({ top: targetScrollY, behavior: "auto" });
      return;
    }
    animateScrollTo(targetScrollY, clampedTarget - from, scrollAnimRef, isAnimatingRef);
  }

  // Lets the nav ("About", "Sketchbook" dropdown) turn to a page from
  // anywhere on the site — see lib/chapter-nav.ts for the shared event
  // contract. "About" lands instantly (already open); everything else
  // plays the real flip, same as scrolling there by hand.
  useEffect(() => {
    function handleGoToChapter(event: Event) {
      const key = (event as CustomEvent<{ key: string }>).detail?.key;
      if (!key) return;
      if (reduced) {
        const id = REDUCED_MOTION_TARGET_IDS[key];
        document
          .getElementById(id ?? "")
          ?.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
      const index = STAGE_KEYS.indexOf(key);
      if (index === -1) return;
      scrollToStage(index, { instant: key === "about" });
    }
    window.addEventListener(CHAPTER_NAV_EVENT, handleGoToChapter);
    return () =>
      window.removeEventListener(CHAPTER_NAV_EVENT, handleGoToChapter);
  }, [reduced]);

  // Left/right arrow keys turn the page one at a time, same as clicking
  // the book or the chapter arrows — only while the book scene is
  // actually on screen, and not while focus is in a text field, so the
  // keys never hijack typing or scrolling elsewhere on the site.
  useEffect(() => {
    if (reduced) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const active = document.activeElement as HTMLElement | null;
      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.tagName === "SELECT" ||
          active.isContentEditable)
      ) {
        return;
      }
      if (!isSceneInView()) return;
      event.preventDefault();
      scrollToStage(stageRef.current + (event.key === "ArrowRight" ? 1 : -1));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [reduced]);

  if (reduced) {
    return (
      <>
        {/* No sticky cover transition under reduced motion (see the
            non-reduced return below for that), but VNH still needs to
            render *somewhere* — FeaturedWork's own project loop excludes
            it unconditionally, not just for the sticky path, since this
            component owns rendering it either way. Plain and static
            here, same as MyMuseum/CoursePilot look under FeaturedWork. */}
        {vnhProject && <VNHSpread project={vnhProject} index={2} />}
        <section
          id="creative-practice"
          aria-label="Creative practice"
          className="relative overflow-hidden py-20 sm:py-28"
        >
          <div className="relative mx-auto w-full max-w-(--container-max) px-6 sm:px-8">
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <p className="font-alayna-handwriting text-4xl text-foreground sm:text-5xl">
                Every design journey started somewhere.
              </p>
              <p className="font-alayna-handwriting text-4xl text-foreground sm:text-5xl">
                Mine began in a <span className="rounded-sm bg-sky/35 px-1">sketchbook</span>.
              </p>
            </div>
            <div
              id="practice-cover"
              className="group relative mx-auto aspect-[1238/879] w-full max-w-xs scroll-mt-24"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-[8%] bottom-[-6%] h-[16%]"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(20,30,10,0.45) 0%, rgba(20,30,10,0.18) 45%, transparent 75%)",
                }}
              />
              <BookCover />
            </div>
            <div className="mt-16 flex flex-col gap-24 sm:gap-32">
              <TwoDSpread />
              <ThreeDSpread />
              <div id="practice-about" className="scroll-mt-24">
                <AboutScrapbookPage />
              </div>
              <ContactBookPage />
              <div className="mx-auto aspect-4/3 w-full max-w-md">
                <BackCoverPage />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <section id="creative-practice" aria-label="Creative practice" className="relative">
      <WaveClipDefs />
      <div
        ref={trackRef}
        style={{
          height: `${HOLD_VH + TRANSITION_VH + INTRO_VH + (STAGE_COUNT - 1) * STAGE_VH + RELEASE_VH}vh`,
        }}
        className="relative"
      >
        <div ref={sceneRef} className="sticky top-0 h-screen overflow-hidden">
          {/* Previous panel — the real, only Vietnamese Noodle House
              section (FeaturedWork renders every *other* project; see its
              own module comment for why this one's excluded there).
              Genuinely interactive — its "View Case Study" link works
              right up until the incoming panel has covered it — not a
              decorative copy. Untransformed and z-0: it just sits here
              for the length of the cover transition, reading as "still
              pinned" simply because nothing here ever moves it. Hidden
              (see computeAndApply) only once the incoming panel has
              genuinely finished covering it, at which point it's neither
              visible nor reachable anyway.

              This wrapper is exactly 100vh (inset-0 inside the h-screen
              scene) so VNH's own green covers the *entire* pinned
              viewport, edge to edge, with no cream showing anywhere below
              it before the wave arrives — the wave has to appear to rise
              directly off the bottom of a fully-green screen, not off a
              screen that's already partway cream. VNHSpread's own content
              still renders at its usual `lg:min-h-[85vh]` (matching
              MyMuseum/CoursePilot) rather than stretching to fill this
              taller wrapper, so this wrapper gives itself the same
              dominantColor and vertically centers that content inside
              it — the extra space above/below the image+text is still
              solid VNH green, never page background. */}
          {vnhProject && (
            <div
              ref={previousPanelRef}
              className="absolute inset-0 z-0 flex flex-col justify-center"
              style={{ backgroundColor: vnhProject.dominantColor }}
            >
              <VNHSpread project={vnhProject} index={2} />
            </div>
          )}

          {/* Incoming panel — the wave and this section's real content as
              one physically-moving unit (see the module comment). Starts
              fully below the viewport (PANEL_START_VH, not just 100vh —
              see that constant); computeAndApply drives its translateY
              down to 0 over TRANSITION_VH of scroll. */}
          <div
            ref={incomingPanelRef}
            className="absolute inset-0 z-10"
            style={{ transform: `translateY(${PANEL_START_VH}vh)` }}
          >
            {/* The wave — its own standalone WAVE_BAND_VH-tall element
                protruding *above* the solid page below, not a clip carved
                into it (see the module comment for why that split is what
                fixes the end-of-transition snap). Clipped to WAVE_PATH_D,
                the original unscaled curve, since this element's own box
                *is* the wave's full height now. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0"
              style={{
                top: `-${WAVE_BAND_VH}vh`,
                height: `${WAVE_BAND_VH}vh`,
                backgroundColor: "var(--color-background)",
                clipPath: `url(#${WAVE_CLIP_ID})`,
                WebkitClipPath: `url(#${WAVE_CLIP_ID})`,
              }}
            />

            {/* The solid incoming page — full height, no clip-path, so
                it's opaque everywhere it covers. This (not the wave) is
                what actually hides the previous panel once settled. */}
            <div aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: "var(--color-background)" }} />

            {/* Narrative intro — stands alone on the plain page background,
                flies up and clears fully before the closed book rises up from
                below the fold to take its place; see applyIntro in the
                scroll effect. */}
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 text-center sm:px-8">
              <div className="flex flex-col items-center gap-3">
                <p
                  ref={introLine1Ref}
                  className="font-alayna-handwriting text-3xl text-foreground sm:text-4xl lg:text-5xl"
                >
                  Every design journey starts somewhere.
                </p>
                <p
                  ref={introLine2Ref}
                  className="font-alayna-handwriting text-3xl text-foreground sm:text-4xl lg:text-5xl"
                >
                  Mine began in a{" "}
                  <span ref={highlightRef} className="rounded-sm px-1 transition-colors duration-500 ease-out">
                    sketchbook
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-6 pt-28 pb-10 sm:px-8 sm:pt-32">
              <SketchbookBook
                containerRef={bookContainerRef}
                ref={bookApiRef}
                onStageChange={handleStageChange}
                onRequestStage={(target) => scrollToStage(target)}
              />

              <button
                ref={ctaRef}
                type="button"
                onClick={() => scrollToStage(1)}
                className="font-handwriting -translate-y-4.5 cursor-pointer text-lg text-foreground underline decoration-foreground/50 underline-offset-4 transition-colors hover:text-foreground/70 sm:text-xl"
                style={{ opacity: 0 }}
              >
                Open Sketchbook →
              </button>
            </div>

            <ChapterControls
              stage={stage}
              onSelect={(target) => scrollToStage(target)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
