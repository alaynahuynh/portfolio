"use client";

import { useState } from "react";
import { motion, type MotionValue } from "motion/react";
import { HeroBackdrop } from "@/components/sections/home/HeroBackdrop";
import { HeroDog } from "@/components/sections/home/HeroDog";
import { HeroPiano } from "@/components/sections/home/HeroPiano";
import { DogInfoModal } from "@/components/sections/home/DogInfoModal";
import { HERO_PARALLAX_DEPTH, useParallaxY } from "@/components/sections/home/hero-parallax";
import {
  GOBI_BODY,
  GOBI_EARS_REST,
  GOBI_EARS_ALERT,
  GOBI_FACE_NORMAL,
  GOBI_FACE_HAPPY,
  GOBI_HIT_BOX,
  YOSHI_BODY,
  YOSHI_EARS_REST,
  YOSHI_EARS_ALERT,
  YOSHI_FACE_NEUTRAL,
  YOSHI_FACE_SMILE,
  YOSHI_FACE_TONGUE,
  YOSHI_TAIL_FRAMES,
  YOSHI_WAG_SEQUENCE,
  YOSHI_HIT_BOX,
  PIANO_REGULAR,
  PIANO_TOUCHED,
} from "@/components/sections/home/hero-config";

type OpenDialog = "gobi" | "yoshi" | null;

function getAge(birthday: string) {
  const birthDate = new Date(birthday);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
}

/**
 * The hero background: the artist's own hand-painted hillside, built
 * from independent layers (see HeroBackdrop) with Gobi, Yoshi, and the
 * piano layered on top as interactive characters (see HeroDog,
 * HeroPiano). Everything shares one aspect-ratio-locked wrapper so the
 * whole scene scales and crops together as one unit with no seams, at
 * any viewport size — see the `aspect-ratio` + `min-width/min-height:
 * 100%` trick used to emulate `object-cover` for a stack of layers
 * instead of a single image.
 */
interface HeroArtSceneProps {
  /** 0→1 progress through the hero's own scroll range — see useScroll in Hero.tsx. Drives every layer's parallax depth (hero-parallax.ts). */
  scrollYProgress: MotionValue<number>;
}

export function HeroArtScene({ scrollYProgress }: HeroArtSceneProps) {
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null);
  const gobiAge = getAge("2019-05-02");
  const yoshiAge = getAge("2021-03-15");
  const charactersY = useParallaxY(scrollYProgress, HERO_PARALLAX_DEPTH.characters);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          aspectRatio: "4320 / 2700",
          minWidth: "100%",
          minHeight: "100%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <HeroBackdrop scrollYProgress={scrollYProgress} />

        <motion.div className="absolute inset-0" style={{ y: charactersY }}>
          <HeroDog
            name="Gobi"
            hitBox={GOBI_HIT_BOX}
            body={GOBI_BODY}
            earsRest={GOBI_EARS_REST}
            earsAlert={GOBI_EARS_ALERT}
            earTwitch={false}
            bodyShift
            restFace={GOBI_FACE_NORMAL}
            idleFaces={[GOBI_FACE_HAPPY]}
            hoverFace={GOBI_FACE_HAPPY}
            onClick={() => setOpenDialog("gobi")}
          />
          <HeroDog
            name="Yoshi"
            hitBox={YOSHI_HIT_BOX}
            body={YOSHI_BODY}
            earsRest={YOSHI_EARS_REST}
            earsAlert={YOSHI_EARS_ALERT}
            restFace={YOSHI_FACE_NEUTRAL}
            idleFaces={[YOSHI_FACE_SMILE, YOSHI_FACE_TONGUE]}
            hoverFace={YOSHI_FACE_SMILE}
            clickFace={YOSHI_FACE_TONGUE}
            tailFrames={YOSHI_TAIL_FRAMES}
            wagSequence={YOSHI_WAG_SEQUENCE}
            onClick={() => setOpenDialog("yoshi")}
          />
          <HeroPiano regular={PIANO_REGULAR} touched={PIANO_TOUCHED} />
        </motion.div>
      </div>

      <DogInfoModal
        open={openDialog === "gobi"}
        onClose={() => setOpenDialog(null)}
        name="Gobi"
        subtitle={`Toy Poodle · ${gobiAge} years old`}
        description="Inspired by my dog, Gobi, who has the biggest personality and never says no to a belly rub."
        photos={[
          { src: "/images/gobi/polaroid.jpeg", alt: "Gobi, a Toy Poodle, looking at the camera" },
          { src: "/images/gobi/santa.jpeg", alt: "Gobi wearing a costume" },
          { src: "/images/gobi/smile.jpeg", alt: "Gobi in the grass" },
        ]}
      />
      <DogInfoModal
        open={openDialog === "yoshi"}
        onClose={() => setOpenDialog(null)}
        name="Yoshi"
        subtitle={`American Eskimo · ${yoshiAge} years old`}
        description="Inspired by my dog, Yoshi, who is the sweetest dog ever and wouldn’t hurt a fly."
        photos={[
          { src: "/images/yoshi/yoshi-1.jpg", alt: "Yoshi, an American Eskimo, looking at the camera" },
          { src: "/images/yoshi/yoshi-2-loafing.jpg", alt: "Yoshi loafing on the floor by a window" },
          { src: "/images/yoshi/yoshi-3-smiling.jpg", alt: "Yoshi smiling outside next to a planter of flowers" },
        ]}
      />
    </div>
  );
}
