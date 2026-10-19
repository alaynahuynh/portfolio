import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SelectedWorkMedia } from "@/components/sections/home/SelectedWorkMedia";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Selected Work: the project list, straight after the hero with no
 * visible section title (the heading is screen-reader only).
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
        <div className="mx-auto w-full max-w-[1600px] px-6 pt-10 pb-4 sm:px-12 sm:pt-14 lg:px-20 lg:pt-20 xl:px-28">
          <h2 className="sr-only">Selected Works</h2>

          <ol className="divide-y divide-border/70">
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
