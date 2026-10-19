"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HeroRetroWindow,
  RETRO_BEVEL,
  RETRO_WELL,
} from "@/components/sections/home/HeroRetroWindow";

/** Photos of Alayna alone — always shown before any group photo. */
const SOLO_PHOTOS = [
  { src: "/images/about/05-mirror.jpg", alt: "Alayna taking a photo in a car's side mirror at sunset" },
  { src: "/images/about/06-pier.jpg", alt: "Alayna on a pier at dusk" },
  { src: "/images/about/08-cafe.jpg", alt: "Alayna eating a treat at an outdoor café" },
];

/** Photos with friends — shown only after every solo photo. */
const GROUP_PHOTOS = [
  { src: "/images/about/02-concert.jpg", alt: "Alayna with friends at a concert at night" },
  { src: "/images/about/03-mountain.jpg", alt: "Alayna with friends at a mountain overlook" },
  { src: "/images/about/04-lakeshore.jpg", alt: "Alayna hugging friends by the lakeshore" },
  { src: "/images/about/07-chicago.jpg", alt: "Alayna with a friend on the Chicago Riverwalk" },
];

const PHOTO_COUNT = SOLO_PHOTOS.length + GROUP_PHOTOS.length;

/** This load's sequence: the solo photos, rotated so a different one
 * leads each load, then the group photos. */
function photoOrder(soloStart: number) {
  return [...SOLO_PHOTOS.slice(soloStart), ...SOLO_PHOTOS.slice(0, soloStart), ...GROUP_PHOTOS];
}

const STORAGE_KEY = "about-photo-solo-start";
const FADE_MS = 180;

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
 * The About photo, framed as a little retro browser. Every page load opens
 * on a photo of Alayna alone — a different solo photo each load (tracked
 * per tab in sessionStorage) — and the refresh button steps through the
 * rest of the solo photos before any group photo. No timer.
 */
export function AboutPhotoBrowser() {
  const [soloStart, setSoloStart] = useState(0);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const started = useRef(false);

  // On load, lead with the next solo photo after last load's (ref guards
  // against Strict Mode running this twice).
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const stored = readStoredIndex();
    const next = stored === null ? 0 : (stored + 1) % SOLO_PHOTOS.length;
    storeIndex(next);
    setSoloStart(next);
    setLoading(false);
  }, []);

  function refresh() {
    if (loading) return;
    const next = (index + 1) % PHOTO_COUNT;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setIndex(next);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setIndex(next);
      setLoading(false);
    }, FADE_MS);
  }

  const photo = photoOrder(soloStart)[index];

  return (
    <HeroRetroWindow title="Photos — try to reload!" menu={["File", "View"]} destination="about" className="bg-[#e3dccb] shadow-[0_2px_10px_rgba(46,50,42,0.08)]">
      <div className="flex items-center gap-1 px-1 pb-1">
        <span aria-hidden="true" className="flex gap-px text-foreground/40">
          <ArrowLeft className="size-3.5" />
          <ArrowRight className="size-3.5" />
        </span>
        <span className="relative shrink-0">
          {/* Expanding ring sits behind the button so it doesn't fight the
              bevel's box-shadow. It keeps pulsing even after clicks. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-sm border-2 border-white motion-safe:animate-[refresh-ping_1.8s_ease-out_infinite]"
          />
          <button
            type="button"
            onClick={refresh}
            aria-label="Refresh photo"
            className={cn(
              "relative flex size-6 items-center justify-center text-earth transition-[filter] hover:brightness-105 active:shadow-[inset_1px_1px_#5c574b] focus-visible:outline-2 focus-visible:outline-mauve-deep",
              RETRO_BEVEL,
              "bg-[#f3ead6]",
            )}
          >
            <RotateCw
              strokeWidth={2.75}
              className={cn(
                "size-3.5",
                loading ? "motion-safe:animate-spin" : "motion-safe:animate-[refresh-nudge_3.6s_ease-in-out_infinite]",
              )}
            />
          </button>
        </span>
        <span className={cn("min-w-0 flex-1 truncate bg-white px-1 py-px font-sans text-[0.625rem] text-foreground/70", RETRO_WELL)}>
          about:me/photo-{index + 1}
        </span>
      </div>
      <div className={cn("relative aspect-4/5 overflow-hidden lg:aspect-4/3 bg-white p-px", RETRO_WELL)}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 29rem, 13rem"
          className={cn(
            "object-cover object-[center_25%] motion-safe:transition-opacity motion-safe:duration-150",
            loading ? "opacity-0" : "opacity-100",
          )}
          priority
        />
      </div>
      <p aria-live="polite" className="sr-only">
        {loading ? "" : `Photo ${index + 1} of ${PHOTO_COUNT}`}
      </p>
    </HeroRetroWindow>
  );
}
