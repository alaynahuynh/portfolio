"use client";

import { useEffect, useRef, useState } from "react";

const CURSOR_LABELS: Record<string, string> = {
  view: "View",
  open: "Open",
  turn: "Turn",
  explore: "Explore",
};

/**
 * Central custom-cursor system. Any element opts in with
 * `data-cursor="view" | "open" | "turn" | "explore"` and this renders a
 * small floating label near the pointer while that element is hovered.
 *
 * Only activates for devices with a precise pointer *and* hover support,
 * and never under reduced motion — on touch/coarse pointers/reduced motion
 * this renders nothing, the native cursor is left completely alone, and no
 * listeners are attached. Even when active, `cursor: none` is scoped to
 * `[data-cursor]` elements only (see .has-custom-cursor in globals.css),
 * so the native cursor stays visible everywhere else and is never hidden
 * before this component has confirmed it's ready to take over.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    // One-time client-side capability probe (pointer/hover/reduced-motion
    // can't be known at SSR time) — runs once on mount, not a reactive
    // sync loop, so the cascading-render concern this lint rule guards
    // against doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    let frame = 0;
    let x = 0;
    let y = 0;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          if (dotRef.current) {
            dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          }
          frame = 0;
        });
      }
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(target?.getAttribute("data-cursor") ?? null);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.body.classList.remove("has-custom-cursor");
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  // "explore" and "turn" keep the native cursor (see .has-custom-cursor
  // in globals.css) and just get a small pink tab trailing below it,
  // rather than replacing the cursor with the full label bubble "view"/
  // "open" use.
  const isSmallTab = label === "explore" || label === "turn";

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-100"
    >
      {label && CURSOR_LABELS[label] && (
        isSmallTab ? (
          <span
            className="absolute top-2.5 left-2.5 rounded-(--radius-pill) bg-blush/90 px-2.5 py-1 text-[11px] font-medium tracking-wide text-foreground shadow-sm backdrop-blur-sm"
          >
            {CURSOR_LABELS[label]}
          </span>
        ) : (
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blush/90 text-xs font-medium tracking-wide text-foreground shadow-sm backdrop-blur-sm">
            {CURSOR_LABELS[label]}
          </span>
        )
      )}
    </div>
  );
}
