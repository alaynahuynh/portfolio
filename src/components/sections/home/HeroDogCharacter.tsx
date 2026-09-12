"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { prefersReducedMotion } from "@/lib/motion";

interface Placement {
  src: string;
  width: number;
  height: number;
  left: string;
  top: string;
  widthPct: string;
}

interface HeroDogCharacterProps {
  name: string;
  body: Placement;
  ears: Placement;
  /** Not every pose has a visible tail (e.g. Gobi is drawn front-on with the tail tucked out of view). */
  tail?: Placement;
  onClick: () => void;
}

/**
 * One dog from the artist's own painting, made interactive: ears sway on
 * their own (continuous, automatic) and sway further when the cursor is
 * near; the tail (where the pose shows one) swings left–right the same
 * way. Body, ears, and tail are each cropped directly from the same
 * source painting at their real position, so at rest they read as one
 * unmodified drawing — only the ears/tail pieces are ever moved.
 *
 * Idle motion runs on every device (time-based, not pointer-based) and
 * is skipped entirely under reduced motion. The hover-proximity boost
 * only attaches for precise, hover-capable pointers.
 */
export function HeroDogCharacter({ name, body, ears, tail, onClick }: HeroDogCharacterProps) {
  const wrapperRef = useRef<HTMLButtonElement>(null);
  const earsRef = useRef<HTMLImageElement>(null);
  const tailRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    let pointer: { x: number; y: number } | null = null;
    let boost = 1;
    let raf = 0;

    function handlePointerMove(e: PointerEvent) {
      pointer = { x: e.clientX, y: e.clientY };
    }
    if (fine) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    function frame(t: number) {
      let targetBoost = 1;
      if (pointer && wrapper) {
        const rect = wrapper.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(pointer.x - cx, pointer.y - cy);
        const radius = 190;
        if (dist < radius) targetBoost = 1 + (1 - dist / radius) * 2.3;
      }
      boost += (targetBoost - boost) * 0.07;

      if (earsRef.current) {
        const angle = Math.sin(t / 1100) * 10 * boost;
        earsRef.current.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      }
      if (tailRef.current) {
        const angle = Math.sin(t / 700) * 11 * boost;
        tailRef.current.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      if (fine) window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <>
      <button
        ref={wrapperRef}
        type="button"
        onClick={onClick}
        data-cursor="explore"
        aria-label={`Meet ${name}`}
        className="absolute block"
        style={{ left: body.left, top: body.top, width: body.widthPct }}
      >
        <Image
          src={body.src}
          alt=""
          width={body.width}
          height={body.height}
          unoptimized
          sizes="220px"
          className="block h-auto w-full"
          priority
        />
      </button>

      <Image
        ref={earsRef}
        src={ears.src}
        alt=""
        width={ears.width}
        height={ears.height}
        unoptimized
        sizes="120px"
        className="pointer-events-none absolute block h-auto"
        style={{ left: ears.left, top: ears.top, width: ears.widthPct, transformOrigin: "50% 92%" }}
      />

      {tail && (
        <Image
          ref={tailRef}
          src={tail.src}
          alt=""
          width={tail.width}
          height={tail.height}
          unoptimized
          sizes="120px"
          className="pointer-events-none absolute block h-auto"
          style={{ left: tail.left, top: tail.top, width: tail.widthPct, transformOrigin: "20% 85%" }}
        />
      )}
    </>
  );
}
