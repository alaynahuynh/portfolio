"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { ProjectPlaceholderArt } from "@/components/sections/ProjectPlaceholderArt";
import { ACCENT_CLASSES } from "@/lib/project-accent";
import { cn } from "@/lib/utils";
import { PROJECTS_STATUS } from "@/data/projects";
import type { Project } from "@/types";

/** Defers a looping preview video's `src` (and thus its download) until it
 * first scrolls into view, then pauses/resumes it on later scrolls off/on
 * screen — see the matching hook in ProjectPlaceholder.tsx's
 * CoursePilotSpread, which this grid card mirrors. */
function useLazyVideo(ref: React.RefObject<HTMLVideoElement | null>) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasLoadedRef.current) {
            hasLoadedRef.current = true;
            setShouldLoad(true);
          } else {
            void el.play();
          }
        } else if (hasLoadedRef.current) {
          el.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return shouldLoad;
}

export function ProjectCard({ project, variant = 0 }: { project: Project; variant?: 0 | 1 | 2 }) {
  const accent = ACCENT_CLASSES[project.accent];
  const thumbnail = project.videoThumbnail ?? project.imageThumbnail;
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoReady = useLazyVideo(videoRef);

  return (
    <Link
      href={`/projects/${project.slug}`}
      prefetch={project.videoThumbnail ? false : undefined}
      className="group block"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-(--radius-default) border-2 border-border bg-muted transition-shadow duration-(--duration-base) ease-(--ease-soft) group-hover:shadow-[0_16px_32px_-16px_rgba(46,50,42,0.35)]",
          !thumbnail && "aspect-4/3",
        )}
        style={thumbnail ? { aspectRatio: `${thumbnail.width} / ${thumbnail.height}` } : undefined}
      >
        {project.videoThumbnail ? (
          <video
            ref={videoRef}
            // Withheld until useLazyVideo confirms this card has actually
            // scrolled into view — see the matching note in
            // ProjectPlaceholder.tsx's CoursePilotSpread.
            src={videoReady ? project.videoThumbnail.src : undefined}
            poster={project.videoThumbnail.poster}
            preload={videoReady ? undefined : "none"}
            autoPlay={videoReady}
            muted
            loop
            playsInline
            aria-hidden="true"
            className="h-full w-full object-contain transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:scale-[1.01]"
          />
        ) : project.imageThumbnail ? (
          <Image
            src={project.imageThumbnail.src}
            alt={project.imageThumbnail.alt}
            width={project.imageThumbnail.width}
            height={project.imageThumbnail.height}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:scale-[1.01]"
          />
        ) : (
          <ProjectPlaceholderArt
            accent={project.accent}
            variant={variant}
            className="h-full w-full transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:scale-[1.01]"
          />
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Heading level={3} size={4}>
            {project.title}
          </Heading>
          <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>
        </div>
        {PROJECTS_STATUS.showInProgress && (
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-(--radius-pill) px-3 py-1 text-xs font-medium",
              accent.pillBg,
              accent.pillText,
            )}
          >
            <span className={cn("size-1.5 rounded-full", accent.pillDot)} />
            {PROJECTS_STATUS.badgeLabel}
          </span>
        )}
      </div>
    </Link>
  );
}
