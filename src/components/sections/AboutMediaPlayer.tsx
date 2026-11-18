"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HeroRetroWindow } from "@/components/sections/home/HeroRetroWindow";
import { RETRO_WELL } from "@/components/sections/home/retro-styles";

/** A photo in the collage; `pos` frames one whose subject isn't near the
 * top (the default crop favors faces, at center 25%). */
type Photo = { src: string; alt: string; pos?: string };

/** Photos of Alayna alone — always shown before any group photo. */
const SOLO_PHOTOS: Photo[] = [
  { src: "/images/about/05-mirror.jpg", alt: "Alayna taking a photo in a car's side mirror at sunset" },
  { src: "/images/about/06-pier.jpg", alt: "Alayna on a pier at dusk" },
  { src: "/images/about/08-cafe.jpg", alt: "Alayna eating a treat at an outdoor café" },
];

/** Photos with friends, family and the dogs — shown only after every solo
 * photo. Ordered so look-alike shots sit far apart (the two Chicago
 * Riverwalk photos, the two lake photos, the two dogs). With the solo
 * photos this makes 16, each with its own spot (see SLOTS). */
const GROUP_PHOTOS: Photo[] = [
  { src: "/images/about/02-concert.jpg", alt: "Alayna with friends at a concert at night" },
  { src: "/images/about/13-game-day.jpg", alt: "Alayna taking a selfie with friends at a Michigan football game" },
  { src: "/images/about/03-mountain.jpg", alt: "Alayna with friends at a mountain overlook" },
  { src: "/images/about/09-boba.jpg", alt: "Alayna and a friend posing at a boba shop" },
  { src: "/images/about/07-chicago.jpg", alt: "Alayna with a friend on the Chicago Riverwalk" },
  { src: "/images/about/10-tractor.jpg", alt: "Alayna and friends sitting on a green tractor" },
  { src: "/images/about/16-white-dog.jpg", alt: "A fluffy white dog lying in the grass, smiling", pos: "center 72%" },
  { src: "/images/about/04-lakeshore.jpg", alt: "Alayna hugging friends by the lakeshore" },
  { src: "/images/about/12-bonfire.jpg", alt: "Alayna with a group of friends around a campfire at dusk" },
  { src: "/images/about/15-poodle.jpg", alt: "A small poodle wearing a teddy-bear hat", pos: "center 62%" },
  { src: "/images/about/11-lake-bench.jpg", alt: "Alayna and friends on a bench looking out over a lake" },
  { src: "/images/about/14-chicago-skyline.jpg", alt: "Alayna with a friend on the Chicago Riverwalk, skyline behind them", pos: "center 70%" },
  { src: "/images/about/17-birthday.jpg", alt: "Alayna with family at a 70th birthday party" },
];

const PHOTO_COUNT = SOLO_PHOTOS.length + GROUP_PHOTOS.length;

/** This load's sequence: the solo photos, rotated so a different one
 * leads each load, then the group photos. */
function photoOrder(soloStart: number) {
  return [...SOLO_PHOTOS.slice(soloStart), ...SOLO_PHOTOS.slice(0, soloStart), ...GROUP_PHOTOS];
}

/** Where each photo lands in the collage, by position in the sequence,
 * as % of the screen (left, top, width, height): one distinct spot per
 * photo. Only the first fills the whole screen (so the frame is never
 * black); every later one is a smaller, straight, borderless rectangle
 * that lands over part of the pile, so the collage keeps building all
 * the way through and only clears when the loop restarts. */
const SLOTS = [
  { x: 0, y: 0, w: 100, h: 100 },
  { x: 40, y: 4, w: 60, h: 50 },
  { x: 0, y: 48, w: 50, h: 52 },
  { x: 38, y: 42, w: 62, h: 58 },
  { x: 14, y: 16, w: 50, h: 48 },
  { x: 54, y: 0, w: 46, h: 44 },
  { x: 6, y: 54, w: 54, h: 46 },
  { x: 30, y: 24, w: 46, h: 50 },
  { x: 0, y: 0, w: 48, h: 46 },
  { x: 52, y: 30, w: 48, h: 48 },
  { x: 20, y: 58, w: 56, h: 42 },
  { x: 60, y: 56, w: 40, h: 44 },
  { x: 8, y: 26, w: 44, h: 46 },
  { x: 46, y: 8, w: 50, h: 46 },
  { x: 2, y: 40, w: 44, h: 56 },
  { x: 26, y: 18, w: 52, h: 56 },
];

const STORAGE_KEY = "about-photo-solo-start";
/** Time between photos while playing: quick, like a GIF's frames. */
const DROP_MS = 350;
/** How long the finished collage rests before it starts over: barely
 * longer than a normal step, so the loop keeps its pace. */
const HOLD_MS = 450;

function readStoredIndex() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const value = Number(raw);
    return raw !== null && Number.isInteger(value) ? value : null;
  } catch {
    return null;
  }
}

function storeIndex(index: number) {
  try {
    sessionStorage.setItem(STORAGE_KEY, String(index));
  } catch {}
}

/**
 * The About photos as a collage that builds itself, played in a little
 * Windows 98 media player. One photo shows first; every DROP_MS the next
 * one cuts in on top (increasing z-index) at its own spot and size
 * (SLOTS), straight and borderless, so the earlier photos stay visible
 * underneath around it. Every photo cuts in instantly, no fade. Once all
 * are down the collage rests only a beat, then cuts straight back to the first
 * photo and builds again, like a looping GIF. A faint film grain sits
 * over the frame.
 *
 * Just the title bar and the screen, no menu, controls or caption: it always
 * plays. Under reduced motion it shows the finished collage, still.
 *
 * Every page load opens on a photo of Alayna alone — a different solo
 * photo each load (tracked per tab in sessionStorage) — and the order
 * runs through the rest of the solo photos before any group photo.
 */
export function AboutMediaPlayer() {
  const [soloStart, setSoloStart] = useState(0);
  /** How many photos are showing while playing (1..PHOTO_COUNT). */
  const [count, setCount] = useState(1);
  /** "playing", or "still" under reduced motion (the finished collage). */
  const [mode, setMode] = useState<"idle" | "playing" | "still">("idle");
  const playing = mode === "playing";
  const started = useRef(false);

  // On load, lead with the next solo photo after last load's (ref guards
  // against Strict Mode running this twice), and start playing.
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const stored = readStoredIndex();
    const next = stored === null ? 0 : (stored + 1) % SOLO_PHOTOS.length;
    storeIndex(next);
    setSoloStart(next);
    setMode(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "still" : "playing");
  }, []);

  // Add the next photo; once the collage is complete, rest, then start over.
  useEffect(() => {
    if (!playing) return;
    const done = count >= PHOTO_COUNT;
    const id = window.setTimeout(() => setCount(done ? 1 : count + 1), done ? HOLD_MS : DROP_MS);
    return () => window.clearTimeout(id);
  }, [playing, count]);

  const photos = photoOrder(soloStart);
  const shown = mode === "still" ? PHOTO_COUNT : count;

  return (
    <HeroRetroWindow
      title="Media Player"
      destination="about"
      className="bg-[#c3c0b8] shadow-[0_2px_10px_rgba(46,50,42,0.08)]"
    >
      <div className={cn("m-1 bg-black p-px", RETRO_WELL)}>
        {/* Screen: the collage builds up here */}
        <div className="relative aspect-4/5 overflow-hidden bg-black lg:aspect-4/3">
          <div className="absolute inset-0">
            {photos.map((photo, i) => {
              const down = i < shown;
              const top = i === shown - 1;
              const { x, y, w, h } = SLOTS[i % SLOTS.length];
              return (
                <div
                  key={photo.src}
                  aria-hidden={!top}
                  className={cn(
                    "absolute overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.25),0_4px_12px_-4px_rgba(0,0,0,0.5)]",
                    down ? "visible" : "invisible",
                  )}
                  style={{ zIndex: i + 1, left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
                >
                  <Image
                    src={photo.src}
                    alt={top ? photo.alt : ""}
                    fill
                    // The first photo fills the whole screen; the rest are smaller.
                    sizes={i === 0 ? "(min-width: 1024px) 30rem, 14rem" : "(min-width: 1024px) 20rem, 10rem"}
                    priority={i === 0}
                    loading={i === 0 ? undefined : "eager"}
                    className="object-cover"
                    style={{ objectPosition: photo.pos ?? "center 25%" }}
                  />
                </div>
              );
            })}
          </div>
          {/* Faint film grain over the whole frame */}
          <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0 z-20 opacity-[0.22] mix-blend-overlay" />
        </div>
      </div>
    </HeroRetroWindow>
  );
}
