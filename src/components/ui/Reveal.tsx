"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Extra transition delay in ms — use to stagger a group of Reveals. */
  delay?: number;
}

/**
 * Fades and lifts its children in once they scroll into view, via
 * IntersectionObserver (not scroll-linked JS, so it's cheap). Always
 * starts from the same "hidden" state on server and client to avoid a
 * hydration mismatch — under prefers-reduced-motion the global transition
 * rule in globals.css collapses the animation to ~0ms, so content still
 * appears correctly, just without the motion.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-[opacity,transform] duration-(--duration-slow) ease-(--ease-soft)",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
