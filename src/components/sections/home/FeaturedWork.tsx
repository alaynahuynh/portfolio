import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SelectedWorkMedia } from "@/components/sections/home/SelectedWorkMedia";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Muted traffic-light dots for the browser title bar. */
const WINDOW_DOTS = ["#d98f80", "#e3c27a", "#9fbf8a"];

/** Projects with Selected Works media get the full-size card, in data
 * order. Smaller projects without media (e.g. Pig Lamp) are listed
 * underneath as compact "Other" rows. */
const featured = projects.filter((p) => p.media);
const other = projects.filter((p) => !p.media && p.hasCaseStudy);

function ViewCaseStudy({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center gap-1.5 font-medium text-foreground transition-colors duration-(--duration-base) group-hover/card:text-sage-deep",
        "text-sm lg:text-base",
        className,
      )}
    >
      View case study
      <ArrowRight className="size-4 transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover/card:translate-x-1 group-has-[a:focus-visible]/card:translate-x-1" />
    </span>
  );
}

/**
 * Selected Work: every project inside one retro browser window (blue-gray
 * title bar, window dots, an active "Selected Works" tab) spanning the
 * full viewport width. The tab acts as the visible title, so the heading
 * itself is screen-reader only.
 *
 * Featured projects follow the motion brief's card: media first (a wide
 * 16:9 loop beside a tall 9:16 one on a soft project color, see
 * SelectedWorkMedia), then title, one-line result and CTA on the left with
 * role + meta on the right (stacked under 768px). Each card is one link (the title's anchor is stretched over the
 * whole card), so everything is clickable with a single tab stop; hover
 * or keyboard focus lifts the media.
 */
export function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-28">
      <Reveal y={20} duration={500} className="overflow-hidden bg-background">
        {/* Title bar + active tab */}
        <div className="flex items-end gap-4 bg-[#c8d5dc]/80 px-4 pt-2.5 sm:gap-6 sm:px-5 dark:bg-[#1a2742]">
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

        <div className="mx-auto w-full max-w-[1600px] px-6 pt-10 pb-16 sm:px-12 sm:pt-14 sm:pb-20 lg:px-20 lg:pt-20 lg:pb-24 xl:px-28">
          <h2 className="sr-only">Selected Works</h2>

          <ol className="space-y-16 sm:space-y-20 md:space-y-[120px]">
            {featured.map((project) => {
              const href = `/projects/${project.slug}`;
              const linkable = project.hasCaseStudy;
              return (
                <li key={project.slug}>
                  <Reveal
                    y={15}
                    duration={500}
                    className={cn(
                      "group/card relative rounded-[20px]",
                      "outline-offset-8 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-mauve-deep",
                    )}
                  >
                    <SelectedWorkMedia project={project} media={project.media!} />

                    {/* Two columns from 768px: story on the left (~60%),
                        role + meta top-aligned on the right (~40%). */}
                    <div className="mt-6 grid gap-4 sm:mt-7 md:grid-cols-[3fr_2fr] md:gap-10 lg:gap-16">
                      <div>
                        <h3 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                          {linkable ? (
                            // Stretched over the whole card: media, copy and
                            // CTA are one link with one tab stop.
                            <Link
                              href={href}
                              prefetch={project.videoThumbnail ? false : undefined}
                              className="after:absolute after:inset-0 after:z-10 after:rounded-[20px] focus-visible:outline-none"
                            >
                              {project.title}
                            </Link>
                          ) : (
                            project.title
                          )}
                        </h3>
                        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                          {project.summary}
                        </p>
                        {linkable && <ViewCaseStudy className="mt-5 hidden md:inline-flex" />}
                      </div>
                      <div className="md:pt-3 lg:pt-4">
                        <p className="text-xs font-medium tracking-[0.12em] text-foreground/60 uppercase md:whitespace-nowrap lg:text-[13px]">
                          {project.role}
                        </p>
                        {project.meta && (
                          <p className="mt-2 text-sm text-muted-foreground">{project.meta}</p>
                        )}
                      </div>
                      {/* Mobile: the CTA closes the stacked column. */}
                      {linkable && <ViewCaseStudy className="md:hidden" />}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          {other.length > 0 && (
            <div className="mt-20 border-t border-border pt-10 sm:mt-24 md:mt-[120px]">
              <h3 className="font-sans text-xs font-medium tracking-[0.12em] text-foreground/60 uppercase lg:text-[13px]">
                Other
              </h3>
              <ul className="mt-6 grid gap-6 md:grid-cols-2">
                {other.map((project) => {
                  const thumb = project.imageThumbnail ?? project.cover;
                  return (
                    <li key={project.slug}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group/card flex items-center gap-5 rounded-[20px] p-2 outline-offset-4 transition-colors duration-(--duration-base) hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-mauve-deep sm:gap-6"
                      >
                        {thumb && (
                          <div
                            className="relative aspect-4/3 w-32 shrink-0 overflow-hidden rounded-2xl bg-(--mat) sm:w-44"
                            style={{ "--mat": project.matTint ?? "var(--color-muted)" } as React.CSSProperties}
                          >
                            <Image
                              src={thumb.src}
                              alt={thumb.alt}
                              fill
                              sizes="176px"
                              className="object-cover transition-transform duration-(--duration-slow) ease-(--ease-soft) group-hover/card:scale-[1.03]"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs tracking-[0.12em] text-foreground/60 uppercase">{project.role}</p>
                          <p className="mt-1 font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                            {project.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground sm:text-[0.9375rem]">
                            {project.summary}
                          </p>
                          <ViewCaseStudy className="mt-2 text-sm lg:text-sm" />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
