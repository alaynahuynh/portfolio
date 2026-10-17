"use client";

import { useRef } from "react";
import Image from "next/image";
import { ViewTransition } from "react";
import { useLazyVideo } from "@/components/sections/home/ProjectPlaceholder";
import { ProjectPlaceholderArt } from "@/components/sections/ProjectPlaceholderArt";
import type { Project } from "@/types";

/**
 * A project's thumbnail inside its Selected Work frame: the preview video
 * (lazy-loaded, see useLazyVideo), the still image, or the placeholder
 * art — always cropped to the same 16:10 box so all three projects read
 * at equal size. Keeps the `project-media-*` view-transition name so
 * CoursePilot's media still morphs into its case-study hero.
 */
export function SelectedWorkMedia({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoReady = useLazyVideo(videoRef);

  return (
    <ViewTransition name={`project-media-${project.slug}`}>
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-md border border-border bg-surface">
        {project.videoThumbnail ? (
          <video
            ref={videoRef}
            src={videoReady ? project.videoThumbnail.src : undefined}
            poster={project.videoThumbnail.poster}
            muted
            loop
            autoPlay
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover object-top transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover/row:scale-[1.02]"
          />
        ) : project.imageThumbnail ? (
          <Image
            src={project.imageThumbnail.src}
            alt={project.imageThumbnail.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-top transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover/row:scale-[1.02]"
          />
        ) : (
          <ProjectPlaceholderArt
            accent={project.accent}
            variant={(index % 3) as 0 | 1 | 2}
            className="absolute inset-0 size-full transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover/row:scale-[1.02]"
          />
        )}
      </div>
    </ViewTransition>
  );
}
