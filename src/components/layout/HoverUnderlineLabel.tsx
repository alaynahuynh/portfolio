"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HoverUnderlineLabelProps {
  label: string;
  /** Left-offset class for the underline SVG. Defaults to centering under
   * the label itself — correct when the label is the link's only content.
   * Pass e.g. "left-4" (matching the link's own left padding) when the
   * link has trailing content after the label (a chevron, say), so the
   * stroke still sits under just the text and not the extra content too. */
  leftClassName?: string;
}

/**
 * The nav's shared hover affordance: a light, hand-drawn brush stroke
 * that draws in under a label on hover/focus. Used by every clickable
 * label in the floating nav (NavItem, the Sketchbook trigger and its
 * dropdown items) so they read as one cohesive set of controls rather
 * than several near-identical hand-rolled copies drifting apart.
 *
 * Requires an ancestor with the `group` class (the parent link) — the
 * stroke's reveal is driven by `group-hover`/`group-focus-visible`, not
 * its own hover state, so hovering anywhere on the link triggers it.
 *
 * The stroke's width is measured off the label's own rendered width via
 * ResizeObserver — not approximated from padding — so it always matches
 * the word exactly, never longer.
 */
export function HoverUnderlineLabel({ label, leftClassName }: HoverUnderlineLabelProps) {
  const gradientId = useId();
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const update = () => setTextWidth(el.offsetWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <span ref={textRef} className="relative z-10">
        {label}
      </span>

      <svg
        aria-hidden="true"
        viewBox="0 0 100 16"
        preserveAspectRatio="none"
        className={cn("pointer-events-none absolute bottom-0.5 h-3", leftClassName ?? "left-1/2 -translate-x-1/2")}
        style={{ width: textWidth ?? "auto", visibility: textWidth ? "visible" : "hidden" }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--color-sage-deep)" stopOpacity="0" />
            <stop offset="18%" stopColor="var(--color-sage-deep)" stopOpacity="0.4" />
            <stop offset="82%" stopColor="var(--color-sage-deep)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-sage-deep)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M1,10 C 19,4 32,13 50,7 C 65,2 80,12 99,6"
          pathLength={1}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={1.75}
          strokeLinecap="round"
          className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-(--duration-slow) ease-(--ease-draw) group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]"
        />
      </svg>
    </>
  );
}
