import Link from "next/link";
import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { ProjectPlaceholderArt } from "@/components/sections/ProjectPlaceholderArt";
import { ACCENT_CLASSES } from "@/lib/project-accent";
import { cn } from "@/lib/utils";
import { PROJECTS_STATUS } from "@/data/projects";
import type { Project } from "@/types";

export function ProjectCard({ project, variant = 0 }: { project: Project; variant?: 0 | 1 | 2 }) {
  const accent = ACCENT_CLASSES[project.accent];
  const thumbnail = project.videoThumbnail ?? project.imageThumbnail;

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div
        className={cn(
          "relative overflow-hidden rounded-(--radius-default) border-2 border-border bg-muted transition-shadow duration-(--duration-base) ease-(--ease-soft) group-hover:shadow-[0_16px_32px_-16px_rgba(46,50,42,0.35)]",
          !thumbnail && "aspect-4/3",
        )}
        style={thumbnail ? { aspectRatio: `${thumbnail.width} / ${thumbnail.height}` } : undefined}
      >
        {project.videoThumbnail ? (
          <video
            src={project.videoThumbnail.src}
            poster={project.videoThumbnail.poster}
            autoPlay
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
