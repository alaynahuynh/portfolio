"use client";

import Image from "next/image";
import { motion, type MotionValue } from "motion/react";
import { HERO_BACKDROP_LAYERS } from "@/components/sections/home/hero-config";
import { HERO_PARALLAX_DEPTH, useParallaxX, useParallaxY } from "@/components/sections/home/hero-parallax";

const [SKY, CLOUD_1, CLOUD_2, DISTANCE, HILL, FLOWERS] = HERO_BACKDROP_LAYERS;

/** A slow back-and-forth sway on the hill/flowers layers — a breeze, distinct from the sky/clouds' slow zoom. */
const FLOWER_DRIFT = { duration: "5s", delay: "-0.8s", x: "16px", y: "5px" };

interface HeroBackdropProps {
  scrollYProgress: MotionValue<number>;
}

/**
 * The painted hillside itself: sky, two clouds, the distant hills, the
 * foreground hill rise, and the flower/grass detail pass — all full crops
 * of the artist's own 4320×2700 canvas, so a plain `object-cover` fill
 * keeps every layer pixel-aligned with the character layers rendered on
 * top in HeroArtScene.
 *
 * Each depth band is wrapped in its own `absolute inset-0` motion.div
 * driven by `scrollYProgress` (see hero-parallax.ts for the signed px
 * values) — an outer translate layered on top of, not replacing, each
 * band's own existing idle animation (the sky/cloud zoom, the
 * hill/flower breeze drift). Sky and clouds get their own parallax
 * bands, both still running the identical `hero-sky-zoom` keyframe —
 * two elements sharing one CSS animation declaration stay in lockstep
 * on the compositor without any JS timing, so splitting them can't
 * introduce the seam the shared-wrapper trick originally guarded
 * against. The flowers layer runs its own `hero-cloud-drift` breeze
 * (`FLOWER_DRIFT` timing); the hill (grass) layer underneath sits
 * static — only its scroll-driven parallax offset (`hillY`) moves it.
 * Clouds also get a small independent horizontal drift (`cloudsDriftX`)
 * on top of their vertical depth offset.
 */
export function HeroBackdrop({ scrollYProgress }: HeroBackdropProps) {
  const skyY = useParallaxY(scrollYProgress, HERO_PARALLAX_DEPTH.sky);
  const cloudsY = useParallaxY(scrollYProgress, HERO_PARALLAX_DEPTH.clouds);
  const cloudsX = useParallaxX(scrollYProgress, HERO_PARALLAX_DEPTH.cloudsDriftX);
  const distanceY = useParallaxY(scrollYProgress, HERO_PARALLAX_DEPTH.distance);
  const hillY = useParallaxY(scrollYProgress, HERO_PARALLAX_DEPTH.hill);
  const flowersY = useParallaxY(scrollYProgress, HERO_PARALLAX_DEPTH.flowers);

  return (
    <>
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: skyY }}>
        <div
          className="absolute inset-0"
          style={{ animation: "hero-sky-zoom 6s ease-in-out infinite", transformOrigin: "50% 50%" }}
        >
          <Image
            src={SKY.src}
            alt="A hand-painted hillside with two dogs, Gobi and Yoshi, and a piano in the grass"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="pointer-events-none absolute inset-0 object-cover"
          />
        </div>
      </motion.div>

      <motion.div className="pointer-events-none absolute inset-0" style={{ x: cloudsX, y: cloudsY }}>
        <div
          className="absolute inset-0"
          style={{ animation: "hero-sky-zoom 6s ease-in-out infinite", transformOrigin: "50% 50%" }}
        >
          <Image
            src={CLOUD_1.src}
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="pointer-events-none absolute inset-0 object-cover"
          />
          <Image
            src={CLOUD_2.src}
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="pointer-events-none absolute inset-0 object-cover"
          />
        </div>
      </motion.div>

      <motion.div className="pointer-events-none absolute inset-0" style={{ y: distanceY }}>
        <Image
          src={DISTANCE.src}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="pointer-events-none absolute inset-0 object-cover"
        />
      </motion.div>

      <motion.div className="pointer-events-none absolute inset-0" style={{ y: hillY }}>
        <Image
          src={HILL.src}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="pointer-events-none absolute inset-0 object-cover"
        />
      </motion.div>

      <motion.div className="pointer-events-none absolute inset-0" style={{ y: flowersY }}>
        <Image
          src={FLOWERS.src}
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="pointer-events-none absolute inset-0 object-cover"
          style={{
            animation: `hero-cloud-drift ${FLOWER_DRIFT.duration} ease-in-out ${FLOWER_DRIFT.delay} infinite alternate`,
            ["--drift-x" as string]: FLOWER_DRIFT.x,
            ["--drift-y" as string]: FLOWER_DRIFT.y,
          }}
        />
      </motion.div>
    </>
  );
}
