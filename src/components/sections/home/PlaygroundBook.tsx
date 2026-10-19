"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChapterControls } from "@/components/sections/home/ChapterControls";
import { TwoDSpread } from "@/components/sections/home/TwoDSpread";
import { ThreeDSpread } from "@/components/sections/home/ThreeDSpread";
import { BackCoverPage } from "@/components/sections/home/BackCoverPage";
import { BookCover } from "@/components/sections/home/BookCover";
import { PlaygroundLandscape } from "@/components/sections/home/PlaygroundLandscape";
import {
  SketchbookBook,
  SketchbookPageContent,
  STAGE_COUNT,
  type SketchbookBookHandle,
} from "@/components/sections/home/SketchbookBook";
import { prefersReducedMotion } from "@/lib/motion";
import { consumeBookScrollPosition } from "@/lib/book-return";

// Scroll distance for the landscape → cream handoff: the painted
// landscape stays pinned while the cream page (wave edge first) rises up
// over it, carrying the intro text and book with it. Nothing else
// advances during this span — the intro only starts once the cream page
// has fully covered the screen.
const TRANSITION_VH = 120;
// Scroll room for the narrative intro (the two handwriting lines) before
// it settles and the closed book fades/rises in.
const INTRO_VH = 90;
// Scroll distance devoted to each page turn once the book itself is
// showing — the book's open page tracks scroll position directly across
// this whole span (see the scroll effect below and SketchbookBook's
// `setProgress`), so scrolling through it turns pages exactly like
// scrolling a real book.
const STAGE_VH = 50;
// Scroll past the last page closes the book again (every turned leaf
// swings back onto the cover), then CLOSED_HOLD_VH holds on the closed
// book before the sticky scene releases and the footer scrolls into view.
const CLOSE_VH = 70;
const CLOSED_HOLD_VH = 30;
// How far into the first page turn (in stages) the "Open Sketchbook" link
// takes to fade out — just as the cover starts to lift.
const CTA_FADE_STAGE = 0.12;
// The sticky scene is itself one viewport tall, so the track needs that
// much extra height for every scroll span above to actually be reachable.
const RELEASE_VH = 100;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// The organic top edge of the incoming cream page — a standalone
// WAVE_BAND_VH-tall element protruding *above* the solid page (not a clip
// carved into it), so the solid page stays fully opaque everywhere and
// there's never a transparent sliver for the landscape to show through
// once it has settled. The path is the hand-painted, slightly uneven wave
// from the old CreativePracticeBook transition.
const WAVE_BAND_VH = 16;
// The incoming panel starts a full viewport *plus* the wave's own height
// below the top, so the protruding wave starts off-screen too.
const PANEL_START_VH = 100 + WAVE_BAND_VH;
const WAVE_CLIP_ID = "playground-wave-clip";
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

// A page turn you trigger by hand (click, arrow key, chapter dot) — unlike
// a raw scroll gesture, which is the reader's own speed to control — gets
// its own slow, deliberate animated scroll instead of the browser's
// native "smooth" scroll, which is both too quick and has a
// duration/easing the browser picks, not tunable to feel like an actual
// page turning.
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

/**
 * The sketchbook itself — the page-turning book (cover → 2D Works → 3D
 * Works → back cover), pinned in its own scroll track so scrolling turns
 * pages exactly like flipping a real book. Rendered on its own
 * /playground route (see app/playground/page.tsx), reached from the nav
 * and the hero's Paint window. About/Contact are not pages inside it —
 * those are their own real `/about` route and a plain homepage section.
 * Because scroll
 * position inside it is a raw `window.scrollY` offset (see
 * book-return.ts), only one instance of this component should ever be
 * mounted at a time — it isn't meaningful to render it on two different
 * pages, since the same scroll-Y value marks a different stage on each.
 *
 * Structurally: trackRef is one tall track — TRANSITION_VH for the
 * landscape → cream wave handoff, INTRO_VH for the narrative intro, then (STAGE_COUNT - 1) * STAGE_VH for the page turns, then
 * CLOSE_VH to shut the book again and CLOSED_HOLD_VH to rest on it, then RELEASE_VH of room to release back into normal scrolling — and sceneRef
 * (`position: sticky; top: 0; h-screen`) is the pinned viewport for the
 * whole track. Inside it, PlaygroundLandscape is the pinned "previous
 * panel" (z-0, never moves), and the incoming panel — wave, solid cream
 * page, intro text and book as one unit — translates up over it as you
 * scroll through TRANSITION_VH, so the wave can't drift out of sync with
 * the content it's carrying. Two handwriting lines settle first, then the closed book
 * rises up from below the fold; after that its open page is driven
 * directly by scroll position through the rest of the pinned track.
 *
 * Every other way of turning a page (clicking the book itself, the
 * chapter dots/arrows, or the arrow keys) funnels through `scrollToStage`,
 * which just moves the window's scroll position to that stage — the
 * resulting scroll is what actually plays the flip, so every interaction
 * stays in sync with the scroll track instead of animating independently
 * of it.
 */
export function PlaygroundBook() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const incomingPanelRef = useRef<HTMLDivElement>(null);
  const previousPanelRef = useRef<HTMLDivElement>(null);
  const introLine1Ref = useRef<HTMLParagraphElement>(null);
  const introLine2Ref = useRef<HTMLParagraphElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  // Whether we're currently past the intro (i.e. the closed book is the
  // thing on screen) — tracked across scroll ticks so the highlight's
  // delay only (re)starts on the actual moment of arriving, not on every
  // tick while already here. See the highlight timer below.
  const introEnteredRef = useRef(false);
  const highlightTimeoutRef = useRef<number | undefined>(undefined);
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const bookApiRef = useRef<SketchbookBookHandle>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef(0);
  // True from the moment a click/key navigation starts an animated scroll
  // until it actually finishes — see handleStageChange below.
  const isAnimatingRef = useRef(false);
  const scrollAnimRef = useRef(0);
  const [reduced, setReduced] = useState(false);
  const [stage, setStage] = useState(0);

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
  useLayoutEffect(() => {
    const saved = savedScrollRef.current;
    if (saved === null || saved === undefined) return;
    window.scrollTo(0, saved);
    const raf = requestAnimationFrame(() => window.scrollTo(0, saved));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => () => cancelAnimationFrame(scrollAnimRef.current), []);

  function handleStageChange(next: number) {
    // While a click/key-triggered flip is animating, its own
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
    // off-screen the whole time — then, from HOLD_END to RISE_END, the
    // book rises into view while the text lingers in place before fading
    // (see TEXT_FADE_START below), so the two spend a good stretch on
    // screen together rather than just crossing paths mid-fade.
    const HOLD_END = 0.2;
    const RISE_END = 0.85;
    const TEXT_FADE_START = 0.15;
    const TEXT_FADE_END = 0.5;

    function applyIntro(progress: number, covered: boolean) {
      const transitionProgress = clamp((progress - HOLD_END) / (RISE_END - HOLD_END), 0, 1);
      const textFade = clamp((transitionProgress - TEXT_FADE_START) / (TEXT_FADE_END - TEXT_FADE_START), 0, 1);
      const textOpacity = 1 - textFade;
      const line1Y = -140 * textFade;
      const line2Y = -170 * textFade;
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

      // The "sketchbook" highlight deliberately lands a beat after the
      // intro text itself does, rather than at the exact same moment — it
      // reads as a second, separate gesture (like someone underlining the
      // word after saying it). Tied to `textOpacity` itself (still
      // substantially visible), not a flat `progress` threshold — this
      // used to key off `progress >= 1`, the moment the *whole* intro
      // sequence (book included) finishes, but by then textOpacity is
      // already all the way down to 0 (TEXT_FADE_END lands at well under
      // half of the full intro range), so the highlight was landing on
      // text that had already faded away instead of the visible, settled
      // text the comment here describes. Real-time delay, not a scroll
      // distance, still starts once this flips true — scrolling back out
      // before it fires cancels the timer and resets the highlight, so
      // arriving again later replays the same beat instead of skipping
      // straight to "already highlighted."
      const introEntered = covered && textOpacity > 0.5;
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
      return riseProgress;
    }

    function computeAndApply() {
      const rect = track!.getBoundingClientRect();
      const totalScrollable = track!.offsetHeight - window.innerHeight;
      const scrolledPx = clamp(-rect.top, 0, totalScrollable);

      // The cover transition: the incoming panel slides from
      // PANEL_START_VH (wave and all fully below the viewport) up to 0
      // (solid cream page exactly filling the screen, wave just above it).
      const transitionPx = (TRANSITION_VH / 100) * window.innerHeight;
      const coverProgress = transitionPx > 0 ? clamp(scrolledPx / transitionPx, 0, 1) : 1;
      if (incomingPanelRef.current) {
        const panelVh = (1 - coverProgress) * PANEL_START_VH;
        incomingPanelRef.current.style.transform = `translateY(${panelVh.toFixed(2)}vh)`;
      }
      // Only hidden once the opaque solid page fully covers it — a paint
      // trim, and keeps its dogs/piano from catching stray focus.
      if (previousPanelRef.current) {
        previousPanelRef.current.style.visibility = coverProgress >= 1 ? "hidden" : "visible";
      }

      // The intro can't start until the cream page has fully taken over.
      const introScrolledPx = Math.max(0, scrolledPx - transitionPx);
      const introPx = (INTRO_VH / 100) * window.innerHeight;
      const stagePx = (STAGE_VH / 100) * window.innerHeight;
      const introProgress = introPx > 0 ? clamp(introScrolledPx / introPx, 0, 1) : 1;
      // Hold the highlight back until the text is actually on screen.
      const riseProgress = applyIntro(introProgress, coverProgress >= 1);

      // The book's open page tracks this directly, frame for frame — see
      // SketchbookBook's `setProgress`. Zero for the whole intro span
      // (matches the still-closed cover), then climbs one stage per
      // `STAGE_VH` of scroll for the rest of the track.
      const stageProgress = stagePx > 0 ? clamp((introScrolledPx - introPx) / stagePx, 0, STAGE_COUNT - 1) : 0;
      const closeStartPx = introPx + (STAGE_COUNT - 1) * stagePx;
      const closePx = (CLOSE_VH / 100) * window.innerHeight;
      const closeProgress = closePx > 0 ? clamp((introScrolledPx - closeStartPx) / closePx, 0, 1) : 0;
      bookApiRef.current?.setProgress(stageProgress, closeProgress);

      // Only worth showing while the book rests closed on its cover: it
      // fades out as soon as the cover starts to lift (gone by
      // CTA_FADE_STAGE), so it never sits under a half-open page. Derived
      // from this tick's own progress rather than stageRef, which a jump
      // (chapter dot, deep link) only updates after this point. Once
      // invisible it's also hidden outright, so it can't catch a tap or
      // keyboard focus below the open book.
      if (ctaRef.current) {
        const coverResting = closeProgress === 0 ? 1 - clamp(stageProgress / CTA_FADE_STAGE, 0, 1) : 0;
        const ctaOpacity = riseProgress * coverResting;
        ctaRef.current.style.opacity = ctaOpacity.toFixed(3);
        ctaRef.current.style.visibility = ctaOpacity > 0.05 ? "visible" : "hidden";
      }
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
  // chapter dots/arrows, or the arrow keys) turns a page: move the
  // window's scroll position to that stage. Scroll position is the book's
  // source of truth (see the scroll effect above), so the resulting
  // scroll — a slow, hand-tuned animated scroll by default (see
  // animateScrollTo), instant for reduced motion — is what actually plays
  // the flip, keeping every interaction perfectly in sync with the
  // scroll-driven track.
  function scrollToStage(target: number) {
    const track = trackRef.current;
    if (!track) return;
    const clampedTarget = clamp(target, 0, STAGE_COUNT - 1);
    const rect = track.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const transitionPx = (TRANSITION_VH / 100) * window.innerHeight;
    const introPx = (INTRO_VH / 100) * window.innerHeight;
    const stagePx = (STAGE_VH / 100) * window.innerHeight;
    const targetScrollY = trackTop + transitionPx + introPx + clampedTarget * stagePx;
    const from = stageRef.current;
    stageRef.current = clampedTarget;
    setStage(clampedTarget);
    if (prefersReducedMotion()) {
      isAnimatingRef.current = false;
      cancelAnimationFrame(scrollAnimRef.current);
      window.scrollTo({ top: targetScrollY, behavior: "auto" });
      return;
    }
    animateScrollTo(targetScrollY, clampedTarget - from, scrollAnimRef, isAnimatingRef);
  }

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
        <PlaygroundLandscape />
        <section id="sketchbook" aria-label="Sketchbook" className="relative py-20 sm:py-28">
          <div id="sketchbook-start" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-(--container-max) px-6 sm:px-8">
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <p className="font-alayna-handwriting text-4xl text-foreground sm:text-5xl">
                Every design journey started somewhere.
              </p>
              <p className="font-alayna-handwriting text-4xl text-foreground sm:text-5xl">
                Mine began in a <span className="rounded-sm bg-sky/35 px-1">sketchbook</span>.
              </p>
            </div>
            <div id="practice-cover" className="group relative mx-auto aspect-[1238/879] w-full max-w-xs scroll-mt-24">
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
              {/* Same page shape as the animated book, since the spreads
                  size themselves against the page (SketchbookPageContent). */}
              {[<TwoDSpread key="2d" />, <ThreeDSpread key="3d" />].map((spread) => (
                <div
                  key={spread.key}
                  className="page-parchment page-edge-stack mx-auto aspect-4/3 w-full max-w-[58rem] rounded-lg"
                >
                  <SketchbookPageContent>{spread}</SketchbookPageContent>
                </div>
              ))}
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
    <section id="sketchbook" aria-label="Sketchbook" className="relative">
      <WaveClipDefs />
      <div
        ref={trackRef}
        style={{
          height: `${TRANSITION_VH + INTRO_VH + (STAGE_COUNT - 1) * STAGE_VH + CLOSE_VH + CLOSED_HOLD_VH + RELEASE_VH}vh`,
        }}
        className="relative"
      >
        {/* Scroll target for the landscape's "Open my sketchbook" button —
            the exact point where the cream page has finished covering the
            landscape, so scrolling there plays the whole wave on the way. */}
        <div
          id="sketchbook-start"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-px"
          style={{ top: `${TRANSITION_VH}vh` }}
        />
        <div ref={sceneRef} className="sticky top-0 h-screen overflow-hidden">
          {/* Previous panel — the real, interactive landscape (dogs,
              piano), pinned in place while the wave rises over it. */}
          <div ref={previousPanelRef} className="absolute inset-0 z-0 bg-sky">
            <PlaygroundLandscape />
          </div>

          {/* Incoming panel — wave, solid cream page, intro text and book
              as one physically-moving unit; computeAndApply drives its
              translateY from PANEL_START_VH down to 0. */}
          <div
            ref={incomingPanelRef}
            className="absolute inset-0 z-10"
            style={{ transform: `translateY(${PANEL_START_VH}vh)` }}
          >
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
            <div aria-hidden="true" className="absolute inset-0 bg-background" />

            {/* Narrative intro — flies up and clears before the closed book
                rises up from below the fold; see applyIntro. */}
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
                className="font-alayna-handwriting -translate-y-4.5 cursor-pointer text-lg text-foreground underline decoration-foreground/50 underline-offset-4 transition-colors hover:text-foreground/70 sm:text-xl"
                style={{ opacity: 0, visibility: "hidden" }}
              >
                Open Sketchbook →
              </button>
            </div>

            <ChapterControls stage={stage} onSelect={(target) => scrollToStage(target)} />
          </div>
        </div>
      </div>
    </section>
  );
}
