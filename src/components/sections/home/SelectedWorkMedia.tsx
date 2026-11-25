"use client";

import { useEffect, useRef, useState, useSyncExternalStore, ViewTransition } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project, ProjectMedia } from "@/types";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Whether the element is on screen; `seen` latches true the first time,
 * so the clip only starts downloading once it's been scrolled to. */
function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [state, setState] = useState({ inView: false, seen: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setState((prev) => ({ inView: entry.isIntersecting, seen: prev.seen || entry.isIntersecting })),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return state;
}

/** Lift + soft shadow on card hover / keyboard focus (300ms). */
const LIFT =
  "transition-[translate,box-shadow] duration-(--duration-base) ease-(--ease-soft) " +
  "group-hover/card:-translate-y-1 group-hover/card:shadow-[0_14px_30px_-14px_rgb(30_35_45/0.35)] " +
  "group-has-[a:focus-visible]/card:-translate-y-1 group-has-[a:focus-visible]/card:shadow-[0_14px_30px_-14px_rgb(30_35_45/0.35)]";

/**
 * A looping thumbnail clip. The first-frame poster is a real lazy image
 * (it carries the alt text, shows before the clip loads, and is all that
 * renders under prefers-reduced-motion). The muted clip sits on top and
 * only starts downloading once the panel scrolls into view.
 */
function LoopClip({
  src,
  poster,
  alt,
  sizes,
}: {
  /** Omit to show the poster as a plain still. */
  src?: string;
  poster: string;
  alt: string;
  sizes: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { inView, seen } = useInView(videoRef);
  const reducedMotion = useMediaQuery(REDUCED_MOTION);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !seen) return;
    if (inView) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, seen]);

  return (
    <>
      <Image src={poster} alt={alt} fill sizes={sizes} className="object-cover" />
      {src && !reducedMotion && (
        <video
          ref={videoRef}
          src={seen ? src : undefined}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </>
  );
}

/**
 * Selected Works media: a wide 16:9 panel beside a tall 9:16 one on the
 * project's soft card color. Both clips loop at the same time, each on its
 * own. Flex ratios 256:81 make both panels exactly
 * the same height (wide ≈ 3.16× the tall's width). The tall panel hides
 * under 768px. Keeps the `project-media-*` view-transition name on the
 * wide panel so CoursePilot's clip still morphs into its case-study hero.
 */
export function SelectedWorkMedia({
  project,
  media,
  compact = false,
}: {
  project: Project;
  media: ProjectMedia;
  /** The smaller cards: the wide clip alone, filling the color card. */
  compact?: boolean;
}) {
  return (
    <div
      // Dark theme: a quiet tint of the project color on the navy surface.
      className="rounded-[20px] bg-(--card-bg) p-3 sm:p-4 lg:p-5 dark:bg-[color-mix(in_srgb,var(--card-bg)_14%,var(--color-surface))]"
      style={{ "--card-bg": media.bgColor } as React.CSSProperties}
    >
      <div className={cn("mx-auto flex justify-center gap-3", !compact && "md:w-[85%]")}>
        <ViewTransition name={`project-media-${project.slug}`} share="project-morph">
          <div
            className={cn(
              "relative aspect-video min-w-0 flex-[256_1_0%] overflow-hidden rounded-2xl bg-surface",
              // No phone panel: keep the same size as the other cards' wide
              // panels (so all cards match heights), centered on the color.
              !compact && !media.tallPoster && "md:max-w-[calc((100%-12px)*256/337)]",
              LIFT,
            )}
          >
            <LoopClip
              src={media.wideSrc}
              poster={media.widePoster}
              alt={media.wideAlt}
              sizes="(min-width: 1600px) 960px, (min-width: 768px) 62vw, 100vw"
            />
          </div>
        </ViewTransition>
        {!compact && media.tallPoster && (
          <div
            className={cn(
              "relative hidden aspect-9/16 min-w-0 flex-[81_1_0%] overflow-hidden rounded-2xl bg-surface md:block",
              LIFT,
            )}
          >
            <LoopClip
              src={media.tallSrc}
              poster={media.tallPoster}
              alt={media.tallAlt ?? ""}
              sizes="(min-width: 1600px) 300px, 20vw"
            />
          </div>
        )}
      </div>
    </div>
  );
}
