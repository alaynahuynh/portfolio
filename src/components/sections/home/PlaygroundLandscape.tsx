"use client";

import { useState } from "react";
import Image from "next/image";
import { DogInfoModal } from "@/components/sections/home/DogInfoModal";
import { HeroDog } from "@/components/sections/home/HeroDog";
import { HeroPiano } from "@/components/sections/home/HeroPiano";
import { prefersReducedMotion } from "@/lib/motion";
import {
  HERO_BACKDROP_LAYERS,
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

const [SKY, CLOUD_1, CLOUD_2, DISTANCE, HILL, FLOWERS] = HERO_BACKDROP_LAYERS;

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

/** Drifting layer style, same keyframes the old hero clouds used. */
function drift(duration: string, delay: string, x: string, y: string) {
  return {
    animation: `hero-cloud-drift ${duration} ease-in-out ${delay} infinite alternate`,
    ["--drift-x" as string]: x,
    ["--drift-y" as string]: y,
  };
}

/**
 * The Playground's opening scene: the full painted landscape (the same
 * one framed in the homepage's Paint window), one viewport tall, before
 * the sketchbook below. Gobi and Yoshi are clickable here (DogInfoModal
 * bios), the piano plays, and the clouds drift.
 *
 * The painting box is the artist's 4320×2700 canvas, bottom-anchored and
 * at least as large as the viewport in both directions ("cover"). When
 * it's wider than the viewport (portrait/mobile), it's shifted so the
 * dogs (~67% across the canvas) stay centered instead of cropped, while
 * never revealing an edge — see the `left` clamp below. On phones (below
 * sm) the screen's right edge instead lands exactly at the piano's left
 * edge (85.2%, see PIANO_REGULAR), so the piano sits just off screen
 * rather than half-cropped — unless the screen is too narrow for that to
 * keep Gobi (54%) in view, where it falls back to the dog-centered crop
 * (which hides the piano too).
 */
export function PlaygroundLandscape() {
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null);

  function openSketchbook() {
    document
      .getElementById("sketchbook-start")
      ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  return (
    <section
      aria-label="Playground landscape"
      className="relative h-svh min-h-[520px] overflow-hidden bg-sky"
    >
      <div
        className="absolute bottom-0 left-[clamp(calc(100%_-_var(--w)),calc(50%_-_var(--w)_*_0.67),0px)] max-sm:left-[clamp(calc(100%_-_var(--w)),max(calc(100%_-_var(--w)_*_0.852),calc(50%_-_var(--w)_*_0.67)),0px)]"
        style={
          {
            "--w": "max(100%, calc(max(100svh, 520px) * 1.6))",
            width: "var(--w)",
            aspectRatio: "4320 / 2700",
          } as React.CSSProperties
        }
      >
        <Image
          src={SKY.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
        {/* Oversized so the drift never exposes the layer's edge. */}
        <div
          className="pointer-events-none absolute -inset-x-[3%] inset-y-0"
          style={drift("14s", "0s", "24px", "-6px")}
        >
          <Image
            src={CLOUD_1.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          className="pointer-events-none absolute -inset-x-[3%] inset-y-0"
          style={drift("18s", "-4s", "-20px", "4px")}
        >
          <Image
            src={CLOUD_2.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <Image
          src={DISTANCE.src}
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
        <Image
          src={HILL.src}
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
        <Image
          src={FLOWERS.src}
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover"
          style={drift("5s", "-0.8s", "10px", "3px")}
        />

        <HeroPiano regular={PIANO_REGULAR} touched={PIANO_TOUCHED} />

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

      {/* Welcome line, up in the sky under the nav */}
      <div className="pointer-events-none absolute inset-x-0 top-[18%] px-6 text-center">
        <h1 className="font-alayna-handwriting text-4xl text-foreground sm:text-6xl">
          Welcome to my playground
        </h1>
        <p className="mt-3 text-sm text-foreground/80 sm:text-base">
          Click Gobi or Yoshi to say hi.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center px-6">
        <button
          type="button"
          onClick={openSketchbook}
          className="group inline-flex items-center gap-2 rounded-full bg-background/90 px-5 py-2.5 text-sm font-medium text-foreground shadow-[0_8px_20px_-10px_rgba(46,50,42,0.45)] backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
        >
          Open my sketchbook
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-y-0.5"
          >
            ↓
          </span>
        </button>
      </div>

      <DogInfoModal
        open={openDialog === "gobi"}
        onClose={() => setOpenDialog(null)}
        name="Gobi"
        subtitle={`Toy Poodle · ${getAge("2019-05-02")} years old`}
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
        subtitle={`American Eskimo · ${getAge("2021-03-15")} years old`}
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
    </section>
  );
}
