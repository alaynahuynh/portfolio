"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ViewTransition } from "react";
import { ArrowRight } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectPlaceholderArt } from "@/components/sections/ProjectPlaceholderArt";
import { cn } from "@/lib/utils";
import { PROJECTS_STATUS } from "@/data/projects";
import type { Project } from "@/types";

/** Pauses/resumes a looping preview video when it scrolls off/on screen —
 * no reason to keep decoding a video the visitor isn't looking at. */
function useOffscreenPause(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play();
        else el.pause();
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

/** `accent` swaps the numeral to a sparse earth-brown highlight — used
 * by CoursePilot's olive background and VNH's meadow background, both
 * of which keep earth as their one sparse accent touch — used only for
 * this one small decorative mark. */
function IndexMark({ index, accent = false }: { index: number; accent?: "earth" | false }) {
  return (
    <p className={cn("font-mono text-sm tracking-[0.2em]", accent === "earth" ? "text-earth" : "text-foreground/70")}>
      {String(index + 1).padStart(2, "0")}
    </p>
  );
}

/** Understated case-study CTA — a text link with a small arrow nudge on
 * hover, never a button. Every spread's background is now light enough
 * for dark (`text-foreground`) copy, so this no longer needs a `light`
 * variant. */
function CaseStudyLink({ project, label = "Read the case study" }: { project: Project; label?: string }) {
  return project.hasCaseStudy ? (
    <Link
      href={`/projects/${project.slug}`}
      className="group/link mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
    >
      {label}
      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/link:translate-x-1" />
    </Link>
  ) : (
    <span
      aria-disabled="true"
      title="Case study coming soon"
      className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/50"
    >
      {PROJECTS_STATUS.pendingCtaLabel}
      <ArrowRight aria-hidden="true" className="size-4" />
    </span>
  );
}

/**
 * MyMuseum — a full-bleed sky-blue (`--color-sky`) environment, image
 * left / copy right. Renders `project.imageThumbnail` (the real landing
 * page screenshot, see projects.ts) at its own real aspect ratio, same
 * "let the one real asset dictate its own shape" approach VNHSpread's
 * photo and CoursePilotSpread's video use — falls back to the abstract
 * placeholder art only while no real asset is set. The media column gets
 * more space than the copy column and bleeds toward the viewport's left
 * edge on large screens, mirroring CoursePilotSpread's treatment (which
 * bleeds right instead, since its media sits on the right) rather than
 * sitting shrunk inside a centered, capped-width card. Dark
 * (`text-foreground`) copy throughout: sky is bright enough that white
 * text would wash out against it, so dark text is the one choice that
 * reads clearly for every line here, not just the headline.
 */
function MyMuseumSpread({ project, index }: { project: Project; index: number }) {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 lg:min-h-[85vh] lg:py-0"
      style={{ backgroundColor: project.dominantColor }}
    >
      <div className="grid gap-10 lg:min-h-[85vh] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-0">
        <Reveal className="lg:-ml-10 xl:-ml-24">
          {project.videoThumbnail ? (
            <video
              src={project.videoThumbnail.src}
              poster={project.videoThumbnail.poster}
              muted
              loop
              autoPlay
              playsInline
              aria-hidden="true"
              className="w-full rounded-md object-contain px-6 sm:px-8 lg:rounded-none lg:px-0"
              style={{ aspectRatio: `${project.videoThumbnail.width} / ${project.videoThumbnail.height}` }}
            />
          ) : project.imageThumbnail ? (
            <Image
              src={project.imageThumbnail.src}
              alt={project.imageThumbnail.alt}
              width={project.imageThumbnail.width}
              height={project.imageThumbnail.height}
              sizes="(min-width: 1024px) 60vw, (min-width: 640px) 70vw, 100vw"
              className="w-full rounded-md object-cover px-6 sm:px-8 lg:rounded-none lg:px-0"
            />
          ) : (
            <ProjectPlaceholderArt
              accent={project.accent}
              variant={(index % 3) as 0 | 1 | 2}
              className="aspect-4/5 w-full rounded-md px-6 sm:px-8 lg:rounded-none lg:px-0"
            />
          )}
          {!project.videoThumbnail && !project.imageThumbnail && (
            <p className="mt-3 px-6 text-xs text-foreground/60 sm:px-8 lg:px-0">Final gallery visual goes here.</p>
          )}
        </Reveal>

        <Reveal delay={100} className="px-6 sm:px-8 lg:px-16 xl:px-20">
          <div className="max-w-lg">
            <IndexMark index={index} />
            <Heading level={3} size={1} className="mt-3 text-5xl sm:text-6xl lg:text-7xl">
              {project.title}
            </Heading>
            <p className="mt-5 text-lg text-foreground">{project.summary}</p>
            <p className="mt-4 text-sm font-medium tracking-wide text-foreground/70 uppercase">{project.role}</p>
            <CaseStudyLink project={project} label="View Case Study" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * CoursePilot — its own full-bleed olive (`--color-olive`) environment,
 * copy left / large UI right, the real demo video allowed to bleed
 * toward the viewport's right edge on large screens rather than sitting
 * inside a bordered card. Olive is light enough to clear contrast for
 * dark text, so — like MyMuseum's sky and VNH's meadow — this uses dark
 * (`text-foreground`) copy, with the same sparse-earth accent language
 * as VNH's spread (index numeral, CTA hover).
 */
function CoursePilotSpread({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useOffscreenPause(videoRef);

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 lg:min-h-[85vh] lg:py-0"
      style={{ backgroundColor: project.dominantColor }}
    >
      <div className="grid gap-10 lg:min-h-[85vh] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-0">
        <Reveal className="order-2 px-6 sm:px-8 lg:order-1 lg:px-16 xl:pl-20">
          <div className="max-w-md">
            <IndexMark index={index} accent="earth" />
            <Heading level={3} size={1} className="mt-3 text-5xl text-foreground sm:text-6xl lg:text-7xl">
              {project.title}
            </Heading>
            <p className="mt-5 text-lg text-foreground">{project.tagline ?? project.summary}</p>
            {project.tags && (
              <p className="mt-4 text-sm font-medium tracking-wide text-foreground/70 uppercase">
                {project.tags.join(" · ")}
              </p>
            )}
            <CaseStudyLink project={project} label="View Case Study" />
          </div>
        </Reveal>

        <Reveal delay={100} className="order-1 lg:order-2 lg:-mr-10 xl:-mr-24">
          <ViewTransition name={`project-media-${project.slug}`}>
            {project.videoThumbnail ? (
              <video
                ref={videoRef}
                src={project.videoThumbnail.src}
                poster={project.videoThumbnail.poster}
                muted
                loop
                playsInline
                aria-hidden="true"
                className="w-full rounded-md object-contain px-6 sm:px-8 lg:rounded-none lg:px-0"
                style={{ aspectRatio: `${project.videoThumbnail.width} / ${project.videoThumbnail.height}` }}
              />
            ) : (
              <ProjectPlaceholderArt
                accent={project.accent}
                variant={(index % 3) as 0 | 1 | 2}
                className="aspect-video w-full rounded-md px-6 sm:px-8 lg:rounded-none lg:px-0"
              />
            )}
          </ViewTransition>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Vietnamese Noodle House — its own full-bleed environment using
 * `--color-meadow` as the dominant background, with `--color-earth` kept
 * to a couple of small, deliberate touches (the index numeral) rather
 * than any large area — "used very sparingly." Meadow is light enough to
 * clear contrast for dark text, so this uses the same dark
 * (`text-foreground`) copy as MyMuseum and CoursePilot.
 *
 * The image slot renders `project.imageThumbnail` (the real homepage
 * hero screenshot, see projects.ts) at its own real aspect ratio, the
 * same "let the one real asset dictate its own shape" approach
 * CoursePilot's video and MyMuseum's photo slot use — no overlapping
 * second card. An earlier version of this spread used two stacked,
 * overlapping placeholder boxes to hint at a future "food photo + device
 * UI" composition; that layered-card treatment was designed around
 * abstract placeholder art and didn't hold up once replaced with a real
 * screenshot, so it's gone now that there's real content to show plainly
 * instead. The media column, like MyMuseumSpread's, gets more space than
 * the copy column and bleeds toward the viewport's left edge on large
 * screens rather than sitting shrunk inside a centered, capped-width
 * card — mirrors CoursePilotSpread's right-bleeding treatment.
 *
 * Sized with the same `lg:min-h-[85vh]` as MyMuseumSpread/CoursePilotSpread
 * (not a full `min-h-screen`) so all three cards read at the same height.
 * When CreativePracticeBook renders this as its pinned "previous panel"
 * during the cover transition, that panel's own wrapper is exactly 100vh
 * (the wave transition's fixed unit — see that component's module
 * comment) — shorter than this section now renders, so that wrapper
 * gives itself the same `dominantColor` background and vertically centers
 * this section inside it, keeping the pinned view fully colored with no
 * gap rather than changing any of the transition's own math.
 *
 * This is the last project before CreativePracticeBook, so it's exported
 * (unlike MyMuseumSpread/CoursePilotSpread) — CreativePracticeBook's own
 * transition track renders a second, frozen copy of this same spread as
 * the "previous panel" backdrop behind its incoming cream page (see its
 * module comment for the full stacking story). This copy, the real one
 * in the normal page flow, is otherwise a plain full-bleed section like
 * every other project spread — no sticky pin, no scroll hijacking; it
 * just scrolls past normally, same as MyMuseum and CoursePilot.
 */
export function VNHSpread({ project, index }: { project: Project; index: number }) {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 lg:min-h-[85vh] lg:py-0"
      style={{ backgroundColor: project.dominantColor }}
    >
      <div className="grid gap-10 lg:min-h-[85vh] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-0">
        <Reveal className="pb-10 sm:pb-14 lg:order-1 lg:pb-0 lg:-ml-10 xl:-ml-24">
          {project.imageThumbnail ? (
            <Image
              src={project.imageThumbnail.src}
              alt={project.imageThumbnail.alt}
              width={project.imageThumbnail.width}
              height={project.imageThumbnail.height}
              sizes="(min-width: 1024px) 60vw, (min-width: 640px) 70vw, 100vw"
              className="w-full rounded-md object-cover px-6 sm:px-8 lg:rounded-none lg:px-0"
            />
          ) : (
            <ProjectPlaceholderArt
              accent={project.accent}
              variant={(index % 3) as 0 | 1 | 2}
              className="aspect-4/5 w-full rounded-md px-6 sm:px-8 lg:rounded-none lg:px-0"
            />
          )}
        </Reveal>

        <Reveal delay={100} className="px-6 sm:px-8 lg:order-2 lg:px-16 xl:px-20">
          <div className="max-w-lg">
            <IndexMark index={index} accent="earth" />
            <Heading level={3} size={1} className="mt-3 text-5xl sm:text-6xl lg:text-7xl">
              {project.title}
            </Heading>
            <p className="mt-5 text-lg text-foreground">{project.summary}</p>
            <p className="mt-4 text-sm font-medium tracking-wide text-foreground/70 uppercase">{project.role}</p>
            <CaseStudyLink project={project} label="View Case Study" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * One project's presentation on the homepage. Every project is now a
 * full-bleed color environment — the project's own dominant color IS
 * the section background, edge to edge, not a card sitting on the page
 * — each with a distinct asymmetrical composition rather than a
 * repeated template.
 */
export function ProjectPlaceholder({ project, index }: { project: Project; index: number }) {
  if (project.slug === "case-study-01") {
    return <MyMuseumSpread project={project} index={index} />;
  }
  if (project.slug === "case-study-02") {
    return <CoursePilotSpread project={project} index={index} />;
  }
  return <VNHSpread project={project} index={index} />;
}
