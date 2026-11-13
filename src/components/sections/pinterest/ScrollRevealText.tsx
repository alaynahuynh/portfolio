"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** False on the server and during hydration (so markup matches), then
 * the real preference — same pattern as SelectedWorkMedia. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/** A run of text; `strong` runs render bold in the foreground color. */
export type Segment = { text: string; strong?: boolean };

type Word = { text: string; strong?: boolean };

function Word({
  word,
  progress,
  range,
}: {
  word: Word;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={word.strong ? "font-semibold text-foreground" : undefined}>
      {word.text}
    </motion.span>
  );
}

/**
 * Paragraphs whose words fill in from faint to full as the reader
 * scrolls, tied to scroll position (scrolling back up fades them again).
 * The whole block reads in from when its top reaches 85% of the viewport
 * to when its bottom reaches 55%. Under prefers-reduced-motion the text
 * just renders at full opacity.
 */
export function ScrollRevealText({ paragraphs, className }: { paragraphs: Segment[][]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });

  // Split into words (keeping trailing spaces) and number them across all
  // paragraphs so the fill runs as one continuous sweep.
  const words = paragraphs.map((segments) =>
    segments.flatMap((seg) =>
      (seg.text.match(/\S+\s*|\s+/g) ?? []).map((text) => ({ text, strong: seg.strong })),
    ),
  );
  const total = words.reduce((n, p) => n + p.length, 0);
  let index = 0;

  return (
    <div ref={ref} className={className}>
      {words.map((paragraph, p) => (
        <p key={p}>
          {paragraph.map((word, w) => {
            const i = index++;
            if (reducedMotion) {
              return (
                <span key={w} className={word.strong ? "font-semibold text-foreground" : undefined}>
                  {word.text}
                </span>
              );
            }
            const start = i / total;
            return (
              <Word key={w} word={word} progress={scrollYProgress} range={[start, Math.min(1, start + 3 / total)]} />
            );
          })}
        </p>
      ))}
    </div>
  );
}
