"use client";

import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react";
import type { ReactNode, Ref } from "react";
import { BookCover } from "@/components/sections/home/BookCover";
import { BookPage } from "@/components/sections/home/BookPage";
import { BookHoverTilt } from "@/components/sections/home/BookHoverTilt";
import { TwoDSpread } from "@/components/sections/home/TwoDSpread";
import { ThreeDSpread } from "@/components/sections/home/ThreeDSpread";
import { AboutScrapbookPage } from "@/components/sections/home/AboutScrapbookPage";
import { ContactBookPage } from "@/components/sections/home/ContactBookPage";
import { BackCoverPage } from "@/components/sections/home/BackCoverPage";

const OPEN_ANGLE = 160; // degrees a leaf rotates through when "opened"

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

function PageContent({ children }: { children: ReactNode }) {
  return <div className="flex h-full w-full items-center overflow-y-auto p-6 sm:p-10">{children}</div>;
}

interface BookPageSpec {
  key: string;
  front: ReactNode;
  transparentFront?: boolean;
  coverBack?: boolean;
}

// Every page in the book, in flip order. Exported as STAGE_KEYS so
// CreativePracticeBook can resolve a chapter-nav key (e.g. "about") to a
// stage index without duplicating this list.
const PAGES: BookPageSpec[] = [
  { key: "cover", front: <BookCover />, transparentFront: true, coverBack: true },
  { key: "2d", front: <PageContent><TwoDSpread /></PageContent> },
  { key: "3d", front: <PageContent><ThreeDSpread /></PageContent> },
  { key: "about", front: <PageContent><AboutScrapbookPage /></PageContent> },
  { key: "contact", front: <PageContent><ContactBookPage /></PageContent> },
  { key: "back-cover", front: <BackCoverPage />, transparentFront: true },
];
export const STAGE_COUNT = PAGES.length;
const LEAF_COUNT = STAGE_COUNT - 1; // every page but the static back cover
export const STAGE_KEYS = PAGES.map((page) => page.key);

export interface SketchbookBookHandle {
  /** Drives the flip directly from a continuous progress value
   * (0..STAGE_COUNT-1) with no easing/animation of its own — the scroll
   * gesture (real or programmatic, via `window.scrollTo`) supplies the
   * motion. This is how CreativePracticeBook keeps the open page in sync
   * with scroll position on every frame, including for an instant jump
   * (a scroll with `behavior: "auto"` still lands here on the next
   * frame's scroll event). */
  setProgress: (progress: number) => void;
}

interface SketchbookBookProps {
  /** Forwarded to the book's own root element — CreativePracticeBook uses
   * this (not the imperative handle) to fade/scale the whole book in
   * during the scroll-linked intro. */
  containerRef?: Ref<HTMLDivElement>;
  onStageChange?: (stage: number) => void;
  /** Fired when the reader clicks a page directly to turn it forward.
   * The book itself no longer decides how to get there — the parent
   * owns navigation (by scrolling the window to that stage's position),
   * since scroll position is the single source of truth for which page
   * is open. */
  onRequestStage?: (stage: number) => void;
}

/**
 * The real, interactive book — lives right in the homepage's own layout
 * (inside CreativePracticeBook's pinned scene), not a separate overlay.
 * The open page tracks scroll position directly (see `setProgress`), so
 * scrolling the pinned track turns pages exactly like scrolling a real
 * book. Clicking a page, the chapter dots/arrows, the site nav, and the
 * arrow keys don't animate the flip themselves — they all just move the
 * window's scroll position to the target stage (see CreativePracticeBook's
 * `scrollToStage`), and the resulting scroll (real or smooth-scrolled)
 * is what actually plays the flip, so every way of turning a page stays
 * perfectly in sync with the scroll track.
 */
export const SketchbookBook = forwardRef<SketchbookBookHandle, SketchbookBookProps>(function SketchbookBook(
  { containerRef, onStageChange, onRequestStage },
  ref,
) {
  const leafRefs = useRef<Array<HTMLDivElement | null>>([]);
  // A stable per-leaf callback-ref array — memoized (not stored on a ref)
  // so reading it during render to wire up each BookPage below is a plain
  // value read, not a ref access.
  const leafSetters = useMemo(
    () =>
      Array.from({ length: LEAF_COUNT }, (_, i) => (el: HTMLDivElement | null) => {
        leafRefs.current[i] = el;
      }),
    [],
  );
  const stageRef = useRef(0);
  const [stage, setStage] = useState(0);

  const apply = useCallback(
    (progress: number) => {
      for (let i = 0; i < LEAF_COUNT; i++) {
        const el = leafRefs.current[i];
        if (!el) continue;
        const t = clamp(progress - i, 0, 1);
        const eased = easeInOutCubic(t);
        // A flat rigid rotateY reads as a stiff card swinging on a hinge.
        // Real paper isn't rigid — it lifts slightly off the page beneath
        // as a hand turns it, peaking right as it passes edge-on (shade is
        // 0 at rest on either side, 1 at the midpoint) and easing back out
        // as it lands. The page is bound to the spine (the left edge,
        // where transformOrigin hinges — see BookPage), so the spine has
        // to stay exactly seamless — only the free right edge should rise.
        // skewY is the only way to do that: it shears proportionally to
        // x-distance from transform-origin, which is pinned at 0% (the
        // spine), so displacement is exactly zero right at the spine and
        // grows toward the fore-edge. (A uniform rotateX bend, tried
        // earlier, tilts the *whole* leaf including the spine edge itself
        // — that's what was breaking the seam, not this.) Applied
        // innermost (rightmost), before rotateY, since the curl is a
        // property of the paper's own material, not of how far it's
        // already swung open.
        const shade = Math.sin(eased * Math.PI);
        const skewDeg = -3 * shade;
        el.style.transform = `rotateY(${(-eased * OPEN_ANGLE).toFixed(1)}deg) skewY(${skewDeg.toFixed(2)}deg)`;
        el.style.zIndex = t > 0.5 ? "0" : String(PAGES.length - i);
        el.style.setProperty("--flip-shade", shade.toFixed(3));
        const previousCleared = i === 0 || clamp(progress - (i - 1), 0, 1) > 0.5;
        el.style.pointerEvents = previousCleared && t < 0.5 ? "auto" : "none";
      }
      const nearest = clamp(Math.round(progress), 0, STAGE_COUNT - 1);
      if (nearest !== stageRef.current) {
        stageRef.current = nearest;
        setStage(nearest);
        onStageChange?.(nearest);
      }
    },
    [onStageChange],
  );

  const setProgress = useCallback(
    (progress: number) => {
      apply(clamp(progress, 0, STAGE_COUNT - 1));
    },
    [apply],
  );

  useImperativeHandle(ref, () => ({ setProgress }), [setProgress]);

  return (
    <div
      ref={containerRef}
      className="group relative w-full max-w-[58rem]"
      style={{ perspective: "2400px", opacity: 0 }}
    >
      {/* Ground shadow — stays anchored to the meadow while the book above
          lifts on hover, so the growing gap between them is what sells
          the lift. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[10%] bottom-[-4%] h-[18%] transition-transform duration-500 ease-(--ease-soft) group-hover:scale-x-110"
        style={{
          background: "radial-gradient(ellipse, rgba(20,30,10,0.45) 0%, rgba(20,30,10,0.18) 45%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-[10%] bottom-[-4%] h-[18%] opacity-0 transition-opacity duration-500 ease-(--ease-soft) group-hover:opacity-80"
        style={{
          background: "radial-gradient(ellipse, rgba(15,22,8,0.55) 0%, rgba(15,22,8,0.2) 50%, transparent 78%)",
        }}
      />

      {/* Only the closed cover invites a pick-up — once a page has turned
          this settles back to rest. */}
      <BookHoverTilt active={stage === 0} className="relative aspect-4/3 overflow-visible">
        {PAGES.map((page, i) => (
          <BookPage
            key={page.key}
            ref={i < LEAF_COUNT ? leafSetters[i] : undefined}
            zIndex={PAGES.length - i}
            staticPage={i === LEAF_COUNT}
            transparentFront={page.transparentFront}
            coverBack={page.coverBack}
            front={page.front}
            onFrontClick={i < LEAF_COUNT ? () => onRequestStage?.(i + 1) : undefined}
          />
        ))}
      </BookHoverTilt>
    </div>
  );
});
