"use client";

import { useLayoutEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { MagneticText } from "@/components/ui/MagneticText";
import { HeroPaint } from "@/components/sections/home/HeroPaint";
import { ScrollIndicator } from "@/components/sections/home/ScrollIndicator";
import { prefersReducedMotion } from "@/lib/motion";

export function Hero() {
  const nameRef = useRef<HTMLDivElement>(null);
  const restRef = useRef<HTMLDivElement>(null);

  // Imperative (not React state) on purpose: the default, no-JS/SSR/
  // reduced-motion appearance is already the correct final layout, and
  // this only ever *adds* a starting transform/opacity before the first
  // paint, then releases it. That means there's no state to get out of
  // sync between server and client, and no risk of a stuck "giant name"
  // or "invisible subtitle" if the effect never ran.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const nameEl = nameRef.current;
    const restEl = restRef.current;
    if (!nameEl || !restEl) return;

    nameEl.style.transform = "scale(2.15)";
    restEl.style.opacity = "0";

    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nameEl.style.transition = "transform 900ms var(--ease-soft)";
        restEl.style.transition = "opacity 700ms var(--ease-soft) 150ms";
        nameEl.style.transform = "";
        restEl.style.opacity = "";
      });
    });

    return () => cancelAnimationFrame(raf1);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <HeroPaint />

      <Container className="text-center">
        <div ref={nameRef} className="will-change-transform">
          <MagneticText
            text={siteConfig.name}
            as="h1"
            className="font-heading text-6xl font-semibold tracking-tight sm:text-8xl"
          />
        </div>
        <div ref={restRef}>
          <p className="font-handwriting mt-5 text-2xl text-foreground sm:text-3xl">
            I look for design everywhere.
          </p>
          <MagneticText
            text={siteConfig.description}
            as="p"
            intensity={0.4}
            className="mt-3 text-lg text-muted-foreground sm:text-xl"
          />
        </div>
      </Container>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
