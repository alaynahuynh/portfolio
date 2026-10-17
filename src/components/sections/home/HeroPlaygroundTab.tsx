import Image from "next/image";
import { HeroDog } from "@/components/sections/home/HeroDog";
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
  YOSHI_HIT_BOX,
  PIANO_REGULAR,
} from "@/components/sections/home/hero-config";
import {
  HeroRetroWindow,
  RETRO_BEVEL,
  RETRO_WELL,
} from "@/components/sections/home/HeroRetroWindow";
import { cn } from "@/lib/utils";

const [SKY, CLOUD_1, CLOUD_2, DISTANCE, HILL, FLOWERS] = HERO_BACKDROP_LAYERS;

/** Decorative swatches only — real palette tokens, not new ad hoc
 * colors, standing in for a Paint-style color strip. */
const SWATCHES = [
  "var(--color-sky)",
  "var(--color-meadow)",
  "var(--color-earth)",
  "var(--color-mauve)",
  "var(--color-gold)",
];

/**
 * The hero's Playground object: a Paint-style window (sage, see
 * hero-destinations.ts) whose canvas
 * is the real painted scene (HERO_BACKDROP_LAYERS + HeroDog, not new
 * art), with a tool column and color palette around it. The dogs render
 * with no `onClick`, so HeroDog skips its hit-box button — a button
 * nested inside the hero's link would be invalid HTML; idle life (ear
 * twitches, tail wags) still plays.
 */
export function HeroPlaygroundTab({ className }: { className?: string }) {
  return (
    <HeroRetroWindow
      title="Playground"
      menu={["Art", "Doodles", "Experiments", "More"]}
      destination="playground"
      className={className}
    >
      <div className="flex gap-[1.5cqw] px-[1cqw] pt-[0.5cqw]">
        {/* Tool column */}
        <div
          aria-hidden="true"
          className="flex w-[5.5cqw] shrink-0 flex-col gap-[0.6cqw] pt-[0.5cqw]"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className={cn("aspect-square w-full", RETRO_BEVEL)} />
          ))}
        </div>

        {/* Canvas — the real painted scene, uncropped */}
        <div
          className={cn("relative flex-1 bg-background", RETRO_WELL)}
          style={{ aspectRatio: "4320 / 2700" }}
        >
          <Image
            src={SKY.src}
            alt=""
            fill
            unoptimized
            sizes="240px"
            className="pointer-events-none object-contain"
          />
          <Image
            src={CLOUD_1.src}
            alt=""
            fill
            unoptimized
            sizes="240px"
            className="pointer-events-none object-contain"
          />
          <Image
            src={CLOUD_2.src}
            alt=""
            fill
            unoptimized
            sizes="240px"
            className="pointer-events-none object-contain"
          />
          <Image
            src={DISTANCE.src}
            alt=""
            fill
            unoptimized
            sizes="240px"
            className="pointer-events-none object-contain"
          />
          <Image
            src={HILL.src}
            alt=""
            fill
            unoptimized
            sizes="240px"
            className="pointer-events-none object-contain"
          />
          <Image
            src={FLOWERS.src}
            alt=""
            fill
            unoptimized
            sizes="240px"
            className="pointer-events-none object-contain"
          />

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
            tailFrames={YOSHI_TAIL_FRAMES}
          />

          <Image
            src={PIANO_REGULAR.src}
            alt=""
            width={PIANO_REGULAR.width}
            height={PIANO_REGULAR.height}
            unoptimized
            sizes="80px"
            className="pointer-events-none absolute block h-auto w-full"
            style={{
              left: PIANO_REGULAR.left,
              top: PIANO_REGULAR.top,
              width: PIANO_REGULAR.widthPct,
            }}
          />
        </div>
      </div>

      {/* Color swatch strip */}
      <div
        aria-hidden="true"
        className="flex items-center gap-[1.2cqw] px-[1cqw] py-[1.5cqw]"
      >
        {SWATCHES.map((color) => (
          <span
            key={color}
            className="size-[3.6cqw] border border-[#a89e88]"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Status bar — a wide sunken field for the message plus a small
       * empty one at the right, as in Paint's own status bar. */}
      <div className="flex gap-[0.8cqw] px-[0.5cqw] pb-[0.3cqw] font-sans text-[clamp(0.5rem,2.4cqw,0.625rem)] leading-none text-foreground/70 select-none">
        <span
          className={cn("flex-1 truncate px-[1cqw] py-[0.8cqw]", RETRO_WELL)}
        >
          Explore my creations ↗
        </span>
        <span
          aria-hidden="true"
          className={cn("w-[14cqw] shrink-0", RETRO_WELL)}
        />
      </div>
    </HeroRetroWindow>
  );
}
