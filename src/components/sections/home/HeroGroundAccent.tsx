"use client";

import { useState } from "react";
import Image from "next/image";
import { DogInfoModal } from "@/components/sections/home/DogInfoModal";
import { HeroDog } from "@/components/sections/home/HeroDog";
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
} from "@/components/sections/home/hero-config";

type OpenDialog = "gobi" | "yoshi" | null;

function getAge(birthday: string) {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());
  if (!hasHadBirthdayThisYear) age--;
  return age;
}

/**
 * A small illustrated accent — grass, flowers, and the two dogs peeking
 * up from the bottom edge — deliberately a contained, moderately-sized
 * vignette (not the full hero-width painting) so it reads as personality
 * *entering* the editorial layout rather than becoming the layout itself
 * (see Hero.tsx's module comment for the fuller reasoning behind the
 * redesign).
 *
 * Reuses the artist's own existing hero layers (foreground/flowers PNGs)
 * and the exact same HeroDog + DogInfoModal wiring HeroArtScene uses —
 * same hover/click behavior, same real placement data from
 * hero-config.ts — no new artwork. The only difference from the full
 * hero scene is the box this all renders inside: a small fixed-aspect
 * frame instead of the full viewport. Placements in hero-config.ts are
 * percentages of the artist's original 4320×2700 canvas, so the exact
 * same bottom-anchored "cover" trick HeroArtScene/HeroBackdrop use
 * (`aspectRatio` + `minWidth/minHeight: 100%`) keeps every layer and
 * character correctly aligned here too — just cropped to a much smaller
 * window near the canvas's bottom edge. Deliberately excludes the sky/
 * cloud/distance layers and the piano: they'd either be entirely cropped
 * out of a window this size (dead weight to load) or, for the piano,
 * compete for attention in a spot meant to stay a quiet accent.
 */
export function HeroGroundAccent() {
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null);
  const gobiAge = getAge("2019-05-02");
  const yoshiAge = getAge("2021-03-15");

  return (
    <div className="relative h-full w-full overflow-visible">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          aspectRatio: "4320 / 2700",
          minWidth: "100%",
          minHeight: "100%",
        }}
      >
        <Image
          src="/images/hero/foreground.png"
          alt=""
          fill
          unoptimized
          sizes="480px"
          className="pointer-events-none absolute inset-0 object-cover"
        />
        <Image
          src="/images/hero/flowers.png"
          alt=""
          fill
          unoptimized
          sizes="480px"
          className="pointer-events-none absolute inset-0 object-cover"
          style={{
            animation:
              "hero-cloud-drift 5s ease-in-out -0.8s infinite alternate",
            ["--drift-x" as string]: "10px",
            ["--drift-y" as string]: "3px",
          }}
        />

        <div className="absolute inset-0">
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
        </div>
      </div>

      <DogInfoModal
        open={openDialog === "gobi"}
        onClose={() => setOpenDialog(null)}
        name="Gobi"
        subtitle={`Toy Poodle · ${gobiAge} years old`}
        description="Inspired by my dog, Gobi, who has the biggest personality and never says no to a belly rub."
        photos={[
          {
            src: "/images/gobi/polaroid.jpeg",
            alt: "Gobi, a Toy Poodle, looking at the camera",
          },
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
          {
            src: "/images/yoshi/yoshi-1.jpg",
            alt: "Yoshi, an American Eskimo, looking at the camera",
          },
          {
            src: "/images/yoshi/yoshi-2-loafing.jpg",
            alt: "Yoshi loafing on the floor by a window",
          },
          {
            src: "/images/yoshi/yoshi-3-smiling.jpg",
            alt: "Yoshi smiling outside next to a planter of flowers",
          },
        ]}
      />
    </div>
  );
}
