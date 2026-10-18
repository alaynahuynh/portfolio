import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SelectedWorkMedia } from "@/components/sections/home/SelectedWorkMedia";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Muted traffic-light dots for the browser title bar. */
const WINDOW_DOTS = ["#d98f80", "#e3c27a", "#9fbf8a"];

/**
 * Selected Work: every project inside one retro browser window (blue-gray
 * title bar, window dots, an active "Selected Works" tab) spanning the
 * full viewport width; the projects stay inside the site Container. The
 * chrome is kept deliberately quiet so the screenshots lead.
 *
 * Projects alternate image-left / image-right on large screens and stack
 * image above copy on mobile, with identical 16:10 thumbnails so all three
 * carry equal weight. Each row is one link (the title's anchor is
 * stretched over the whole row), so the title, thumbnail and CTA are all
 * clickable with a single tab stop; keyboard focus outlines the full row.
 * Plain document flow — no pinned or scroll-driven effects.
 */
export function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-28">
      <Reveal y={20} duration={500} className="overflow-hidden bg-background">
        {/* Title bar + active tab */}
        <div className="flex items-end gap-4 bg-[#c8d5dc]/80 px-4 pt-2.5 sm:gap-6 sm:px-5">
          <div aria-hidden="true" className="flex gap-1.5 self-center pb-2.5 opacity-80">
            {WINDOW_DOTS.map((color) => (
              <span
                key={color}
                className="size-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Active tab — rounded top, with the curved "flare" corners
              where a real browser tab melts into the page below. */}
          <div className="relative flex h-9 w-56 min-w-0 items-center gap-2 rounded-t-lg bg-background pr-2.5 pl-4 sm:w-64">
            <span
              aria-hidden="true"
              className="absolute bottom-0 -left-2.5 size-2.5 bg-[radial-gradient(circle_at_0_0,transparent_9.5px,var(--color-background)_10px)]"
            />
            <span
              aria-hidden="true"
              className="absolute -right-2.5 bottom-0 size-2.5 bg-[radial-gradient(circle_at_100%_0,transparent_9.5px,var(--color-background)_10px)]"
            />
            <span className="flex-1 truncate text-[13px] font-medium text-foreground/80">
              Selected Works
            </span>
            <span
              aria-hidden="true"
              className="text-sm leading-none text-muted-foreground/60"
            >
              ×
            </span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1600px] px-6 pt-10 pb-4 sm:px-12 sm:pt-14 lg:px-20 lg:pt-20 xl:px-28">
          <h2 className="font-heading text-3xl font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Selected Works
          </h2>

          <ol className="mt-8 divide-y divide-border/70 sm:mt-12 lg:mt-16">
            {projects.map((project, index) => {
              const imageRight = index % 2 === 1;
              const href = `/projects/${project.slug}`;
              const linkable = project.hasCaseStudy;
              return (
                <li key={project.slug} className="py-10 first:pt-0 sm:py-14 lg:py-20">
                  <Reveal
                    y={15}
                    duration={500}
                    className={cn(
                      "group/row relative grid gap-6 rounded-2xl sm:gap-8 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-24",
                      "outline-offset-8 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-mauve-deep",
                    )}
                  >
                    <div
                      className={cn(
                        "group/media rounded-xl p-1.5 sm:p-2 lg:p-2.5",
                        imageRight && "lg:order-2",
                      )}
                      style={{
                        // Shared with the case-study CTA — see `matTint` in data/projects.ts.
                        backgroundColor: project.matTint,
                      }}
                    >
                      {linkable ? (
                        // Sits above the title link's row-wide overlay so the
                        // thumbnail gets its own hover (and still navigates).
                        // Hidden from AT/tab order — the title link covers that.
                        <Link
                          href={href}
                          prefetch={project.videoThumbnail ? false : undefined}
                          tabIndex={-1}
                          aria-hidden="true"
                          className="relative z-10 block"
                        >
                          <SelectedWorkMedia project={project} index={index} />
                        </Link>
                      ) : (
                        <SelectedWorkMedia project={project} index={index} />
                      )}
                    </div>

                    <div className={cn("max-w-md lg:max-w-lg", imageRight && "lg:order-1")}>
                      {project.statusTag && (
                        <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-muted-foreground lg:mb-4">
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-sage-deep" />
                          {project.statusTag}
                        </p>
                      )}
                      <h3 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        {linkable ? (
                          <Link
                            href={href}
                            prefetch={project.videoThumbnail ? false : undefined}
                            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
                          >
                            {project.title}
                          </Link>
                        ) : (
                          project.title
                        )}
                      </h3>
                      <p className="mt-3 text-base text-muted-foreground sm:text-lg lg:mt-4 lg:text-xl">
                        {project.summary}
                      </p>
                      <p className="mt-4 text-xs font-medium tracking-[0.12em] text-foreground/60 uppercase lg:mt-5 lg:text-[13px]">
                        {project.role}
                      </p>
                      {linkable && (
                        <span
                          aria-hidden="true"
                          className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-(--duration-base) group-hover/row:text-sage-deep lg:mt-9 lg:text-base"
                        >
                          View case study
                          <ArrowRight className="size-4 transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover/row:translate-x-1 group-has-[a:focus-visible]/row:translate-x-1" />
                        </span>
                      )}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
