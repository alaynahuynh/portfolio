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

/** Add more photos here — the browser cycles through them in order. */
const PHOTOS = [
  { src: "/images/about/02-concert.jpg", alt: "Alayna with friends at a concert at night" },
  { src: "/images/about/03-mountain.jpg", alt: "Alayna with friends at a mountain overlook" },
  { src: "/images/about/04-lakeshore.jpg", alt: "Alayna hugging friends by the lakeshore" },
  { src: "/images/about/05-mirror.jpg", alt: "Alayna taking a photo in a car's side mirror at sunset" },
  { src: "/images/about/06-pier.jpg", alt: "Alayna on a pier at dusk" },
  { src: "/images/about/07-chicago.jpg", alt: "Alayna with a friend on the Chicago Riverwalk" },
  { src: "/images/about/08-cafe.jpg", alt: "Alayna eating a treat at an outdoor café" },
];

const STORAGE_KEY = "about-photo-index";
const FADE_MS = 180;

function readStoredIndex() {
  try {
    const value = Number(sessionStorage.getItem(STORAGE_KEY));
    return Number.isInteger(value) ? value : null;
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
 * The About photo, framed as a little retro browser. Its refresh button
 * "reloads" to the next photo, and each real page load starts one photo
 * further along (tracked per tab in sessionStorage). No timer.
 */
export function AboutPhotoBrowser() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const started = useRef(false);

  // On load, advance past the photo shown last time (ref guards against
  // Strict Mode running this twice).
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const stored = readStoredIndex();
    const next = stored === null ? 0 : (stored + 1) % PHOTOS.length;
    storeIndex(next);
    setIndex(next);
    setLoading(false);
  }, []);

  function refresh() {
    if (loading) return;
    const next = (index + 1) % PHOTOS.length;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    storeIndex(next);
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

  const photo = PHOTOS[index];

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
        {loading ? "" : `Photo ${index + 1} of ${PHOTOS.length}`}
      </p>
    </HeroRetroWindow>
  );
}
