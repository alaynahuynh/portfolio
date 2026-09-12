"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { prefersReducedMotion } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { MagneticText } from "@/components/ui/MagneticText";
import { HeroArtScene } from "@/components/sections/home/HeroArtScene";
import {
  HERO_FRAME,
  useHeroFrameBorderColor,
  useHeroFrameSize,
  useHeroParallaxProgress,
  useHeroTotalProgress,
  useHeroVignetteMask,
} from "@/components/sections/home/hero-frame";

function HeroCopy({ onDownArrowClick }: { onDownArrowClick: (event: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <>
      <div className="pointer-events-none relative z-10 flex h-full items-center">
        <div className="w-full">
          <Container>
            <div className="mx-auto max-w-xl text-center sm:mx-0 sm:text-left">
              <p className="text-sm font-semibold tracking-[0.3em] text-foreground/70 uppercase sm:text-base">
                Product Designer
              </p>

              <MagneticText
                text={siteConfig.name}
                as="h1"
                className="font-heading mt-3 text-5xl font-semibold tracking-wide text-foreground sm:text-6xl lg:text-7xl"
              />

              <p className="mx-auto mt-5 max-w-md text-lg text-foreground/90 sm:mx-0 sm:text-xl lg:text-2xl">
                {siteConfig.positioningStatement}
              </p>

              <p className="mt-4 text-sm tracking-wide text-muted-foreground">{siteConfig.description}</p>
            </div>
          </Container>
        </div>
      </div>

      <a
        href="#work"
        onClick={onDownArrowClick}
        className="group absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs tracking-[0.2em] text-foreground/70 uppercase transition-colors hover:text-meadow"
      >
        <span className="inline-block transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:translate-y-0.5">
          ↓
        </span>{" "}
        Selected Work
      </a>
    </>
  );
}

/**
 * Hero composition: the artist's own hand-painted meadow scene, with
 * calm, editorial copy anchored left of center so the dogs/piano/hill
 * balance the right side of the frame rather than everything stacking
 * dead-center. The name is the focal point and leans subtly toward the
 * cursor via MagneticText; the scene's trees/flowers and the interactive
 * dog animate independently (see HeroArtScene).
 *
 * The hero is also a scroll-driven transition from a living, full-screen
 * environment into a framed piece of artwork — see hero-frame.ts for the
 * exact scroll-pixel ranges and hero-parallax.ts for the depth-plane
 * timeline. Structurally: a tall "track" div (100vh + the shrink range)
 * containing a `position: sticky` section — scrolling through the track
 * keeps the hero pinned to the viewport while it shrinks, then releases
 * it to scroll away normally the instant it's fully framed (see
 * `HERO_FRAME.shrinkEndPx`, which Header.tsx's own scroll-shrink
 * threshold is set to match, so the navbar settles in sync with it). The
 * name/tagline copy stays in place and fully crisp/opaque throughout —
 * only the artwork scene itself (not the copy) eases from fully clear at
 * the instant the page opens to a gentle corner vignette as that scroll
 * range plays out (see useHeroVignetteMask in hero-frame.ts), holding
 * there once fully framed.
 *
 * Under prefers-reduced-motion this collapses to a plain, non-sticky,
 * non-shrinking full-screen section — see the early return below.
 */
export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const heroTotalProgress = useHeroTotalProgress(scrollY);
  const parallaxProgress = useHeroParallaxProgress(scrollY);
  const { width: frameWidth, height: frameHeight } = useHeroFrameSize(heroTotalProgress);
  const borderColor = useHeroFrameBorderColor(heroTotalProgress);
  const vignetteMask = useHeroVignetteMask(heroTotalProgress);

  /** Same "already at this hash" edge case Header.tsx's own scrollToSection
   * solves for the nav's Work link — a plain `href="#work"` would silently
   * no-op if the hash is already "#work" from an earlier nav click. */
  function scrollToWork(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    document.getElementById("work")?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }

  if (reduceMotion) {
    return (
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <HeroArtScene scrollYProgress={parallaxProgress} />
        <HeroCopy onDownArrowClick={scrollToWork} />
      </section>
    );
  }

  return (
    <div ref={trackRef} className="relative" style={{ height: `calc(100vh + ${HERO_FRAME.shrinkEndPx}px)` }}>
      <section
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 overflow-hidden"
          style={{
            width: frameWidth,
            height: frameHeight,
            x: "-50%",
            y: "-50%",
            borderRadius: HERO_FRAME.borderRadiusPx,
            borderStyle: "solid",
            borderWidth: HERO_FRAME.borderWidthPx,
            borderColor,
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ maskImage: vignetteMask, WebkitMaskImage: vignetteMask }}
          >
            <HeroArtScene scrollYProgress={parallaxProgress} />
          </motion.div>
          <HeroCopy onDownArrowClick={scrollToWork} />
        </motion.div>
      </section>
    </div>
  );
}
