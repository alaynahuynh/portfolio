import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SelectedWorkMedia } from "@/components/sections/home/SelectedWorkMedia";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Soft tinted mats behind each thumbnail — mixed from existing palette
 * tokens toward the cream background, in project order. */
const MAT_TINTS = [
  // MyMuseum — soft sage
  "color-mix(in srgb, var(--color-sage) 30%, var(--color-background))",
  // CoursePilot — pale mist blue
  "color-mix(in srgb, var(--color-mist-blue) 60%, var(--color-background))",
  // Vietnamese Noodle House — warm cream / light terracotta
  "color-mix(in srgb, var(--color-earth) 12%, var(--color-muted))",
];

/** Muted traffic-light dots for the browser title bar. */
const WINDOW_DOTS = ["#d98f80", "#e3c27a", "#9fbf8a"];

/**
 * Selected Work: every project inside one retro browser window (blue-gray
 * title bar, window dots, an active "Selected Work" tab) spanning the
 * full viewport width; the projects stay inside the site Container. Projects
 * alternate image-left / image-right on large screens and stack image
 * above copy on mobile, with identical 16:10 thumbnails so all three
 * carry equal weight. Plain document flow — no pinned or scroll-driven
 * effects.
 */
export function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-28 pb-20 sm:pb-28">
      <Reveal
        y={20}
        duration={500}
        className="overflow-hidden border-y border-border bg-background"
      >
        {/* Title bar + active tab */}
        <div className="flex items-end gap-4 bg-[#c8d5dc] px-4 pt-3 sm:gap-6 sm:px-5">
          <div
            aria-hidden="true"
            className="flex gap-2 self-center pt-0.5 pb-3"
          >
            {WINDOW_DOTS.map((color) => (
              <span
                key={color}
                className="size-3 rounded-full shadow-[inset_0_0_0_0.5px_rgba(46,50,42,0.2)]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <div className="flex min-w-0 items-end">
            {/* Active tab — rounded top, with the curved "flare" corners
                where a real browser tab melts into the page below. */}
            <div className="relative flex h-11 w-60 min-w-0 items-center gap-2.5 rounded-t-xl bg-background pr-2.5 pl-4 sm:w-72">
              <span
                aria-hidden="true"
                className="absolute bottom-0 -left-3 size-3 bg-[radial-gradient(circle_at_0_0,transparent_11.5px,var(--color-background)_12px)]"
              />
              <span
                aria-hidden="true"
                className="absolute -right-3 bottom-0 size-3 bg-[radial-gradient(circle_at_100%_0,transparent_11.5px,var(--color-background)_12px)]"
              />
              <span className="flex-1 truncate text-sm font-medium text-foreground">
                Selected Works
              </span>
              <span
                aria-hidden="true"
                className="flex size-6 shrink-0 items-center justify-center rounded-full text-base leading-none text-muted-foreground"
              >
                ×
              </span>
            </div>
            <span
              aria-hidden="true"
              className="mb-2.5 ml-5 hidden text-lg leading-none text-muted-foreground/70 sm:block"
            >
              +
            </span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1600px] px-6 pt-8 pb-4 sm:px-12 sm:pt-14 lg:px-20 lg:pt-20 xl:px-28">
          <div>
            <h2 className="font-heading text-3xl font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Selected Works
            </h2>

            <ol className="mt-8 divide-y divide-border sm:mt-12 lg:mt-16">
              {projects.map((project, index) => {
                const imageRight = index % 2 === 1;
                return (
                  <li
                    key={project.slug}
                    className="py-10 first:pt-0 sm:py-14 lg:py-20"
                  >
                    <Reveal
                      y={15}
                      duration={500}
                      className="group/row grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-20 xl:gap-28"
                    >
                      <div
                        className={cn(
                          "rounded-xl p-2.5 sm:p-4 lg:rounded-2xl lg:p-5",
                          imageRight && "lg:order-2",
                        )}
                        style={{
                          backgroundColor: MAT_TINTS[index % MAT_TINTS.length],
                        }}
                      >
                        <div className="rounded-md shadow-sm">
                          <SelectedWorkMedia project={project} index={index} />
                        </div>
                      </div>

                      <div
                        className={cn(
                          "max-w-md lg:max-w-lg",
                          imageRight && "lg:order-1",
                        )}
                      >
                        <h3 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                          {project.title}
                        </h3>
                        <p className="mt-4 text-base text-muted-foreground sm:text-lg lg:mt-5 lg:text-xl">
                          {project.summary}
                        </p>
                        <p className="mt-4 text-xs font-medium tracking-[0.12em] text-foreground/70 uppercase lg:mt-5 lg:text-sm">
                          {project.role}
                        </p>
                        {project.hasCaseStudy && (
                          <Link
                            href={`/projects/${project.slug}`}
                            prefetch={
                              project.videoThumbnail ? false : undefined
                            }
                            aria-label={`View case study: ${project.title}`}
                            className="group/link mt-8 inline-flex items-center gap-1.5 text-sm font-medium lg:mt-10 lg:text-base text-foreground transition-colors hover:text-sage-deep"
                          >
                            View case study
                            <ArrowRight
                              aria-hidden="true"
                              className="size-4 transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover/row:translate-x-[2.5px] group-hover/row:-translate-y-[2.5px] group-focus-visible/link:translate-x-[2.5px] group-focus-visible/link:-translate-y-[2.5px]"
                            />
                          </Link>
                        )}
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
