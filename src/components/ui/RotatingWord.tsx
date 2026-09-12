"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

interface RotatingWordProps {
  words: string[];
  /** How long each word holds before the next one paints in. */
  intervalMs?: number;
  className?: string;
}

export function RotatingWord({
  words,
  intervalMs = 2500,
  className,
}: RotatingWordProps) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced || words.length <= 1) return;

    let interval: ReturnType<typeof setInterval>;

    // Wait 4 seconds before the first rotation
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setIndex((i) => (i + 1) % words.length);
      }, intervalMs);
    }, 2500);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [reduced, words.length, intervalMs]);

  if (reduced) {
    return <span className={className}>{words[words.length - 1]}</span>;
  }

  return (
    <span className={`inline-block align-bottom ${className ?? ""}`}>
      <span className="sr-only">{words.join(", ")}</span>

      <span
        key={words[index]}
        aria-hidden="true"
        className="inline-block whitespace-nowrap"
        style={{
          animation: "paint-reveal 700ms var(--ease-draw) forwards",
        }}
      >
        {words[index]}
      </span>
    </span>
  );
}