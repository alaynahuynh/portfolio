"use client";

import { Fragment, useEffect, useRef } from "react";
import { motion, prefersReducedMotion } from "@/lib/motion";

interface MagneticTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  /** Scales both reaction radius and displacement (0–1). 1 = full strength (default), lower = subtler. */
  intensity?: number;
}

/**
 * Text whose characters lean subtly away from the cursor, strongest near
 * the pointer and fading out within `motion.magneticRadius * intensity`.
 * Screen readers get one clean read of `text` via a visually-hidden span;
 * the per-character spans are decorative (aria-hidden). Each word is
 * wrapped in its own `whitespace-nowrap` box so lines only break between
 * words, not mid-word between animated characters. Disabled entirely
 * under prefers-reduced-motion or on touch-only devices — the transition
 * classes stay on regardless, since without a listener `transform` never
 * changes, so no transition ever fires.
 */
export function MagneticText({ text, as: Tag = "h1", className, intensity = 1 }: MagneticTextProps) {
  const charRefs = useRef(new Map<string, HTMLSpanElement>());
  const latestPointer = useRef<{ x: number; y: number } | null>(null);
  const frameScheduled = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const chars = charRefs.current;
    const radius = motion.magneticRadius * intensity;
    const displacement = motion.magneticDisplacement * intensity;

    function applyForces(x: number, y: number) {
      for (const el of chars.values()) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(x - cx, y - cy);
        const influence = Math.max(0, 1 - dist / radius);
        if (influence <= 0) {
          el.style.transform = "";
          continue;
        }
        const lift = influence * displacement;
        const scale = 1 + influence * 0.06 * intensity;
        el.style.transform = `translateY(${(-lift).toFixed(2)}px) scale(${scale.toFixed(3)})`;
      }
    }

    function handlePointerMove(e: PointerEvent) {
      latestPointer.current = { x: e.clientX, y: e.clientY };
      if (frameScheduled.current) return;
      frameScheduled.current = true;
      requestAnimationFrame(() => {
        if (latestPointer.current) {
          applyForces(latestPointer.current.x, latestPointer.current.y);
        }
        frameScheduled.current = false;
      });
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      for (const el of chars.values()) {
        el.style.transform = "";
      }
    };
  }, [intensity]);

  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <Fragment key={wordIndex}>
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  ref={(el) => {
                    const refKey = `${wordIndex}-${charIndex}`;
                    if (el) charRefs.current.set(refKey, el);
                    else charRefs.current.delete(refKey);
                  }}
                  className="inline-block transition-transform duration-(--duration-base) ease-(--ease-spring) will-change-transform"
                >
                  {char}
                </span>
              ))}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
