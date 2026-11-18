import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SelectedWorkMedia } from "@/components/sections/home/SelectedWorkMedia";
import { RetroTaskbar, type TaskbarTask } from "@/components/sections/home/RetroTaskbar";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Projects with Selected Works media get the full-size card, in data
 * order. Smaller projects without media (e.g. Pig Lamp) are listed
 * underneath as compact "Other" rows. */
const featured = projects.filter((p) => p.media);
const other = projects.filter((p) => !p.media && p.hasCaseStudy);

/** One taskbar button per featured project, linking to its card. */
const cardId = (slug: string) => `work-${slug}`;
/** Each project's taskbar icon (see public/images/home/taskbar). */
const TASK_ICONS: Record<string, string> = {
  mymuseum: "/images/home/taskbar/mymuseum.png",
  "vietnamese-noodle-house": "/images/home/taskbar/vnh.png",
  coursepilot: "/images/home/taskbar/coursepilot.png",
  nudge: "/images/home/taskbar/nudge.png",
  jurnee: "/images/home/taskbar/jurnee.png",
};
const tasks: TaskbarTask[] = featured.map((p) => ({
  id: cardId(p.slug),
  title: p.title,
  icon: TASK_ICONS[p.slug],
}));

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
 * Selected Work: every project under a Windows 98 taskbar spanning the
 * full viewport width (see RetroTaskbar): its Start button ("Selected
 * Works") is the visible title, so the heading itself is
 * screen-reader only, and its task buttons jump to each project.
 *
 * Featured projects follow the motion brief's card: media first (a wide
 * 16:9 loop beside a tall 9:16 one on a soft project color, see
 * SelectedWorkMedia), then title, one-line result and CTA on the left with
 * role + meta on the right (stacked under 768px). Each card is one link (the title's anchor is stretched over the
 * whole card), so everything is clickable with a single tab stop; hover
 * or keyboard focus lifts the media.
 */
/**
 * Selected Works' header: the Windows 98 taskbar (see RetroTaskbar). Rendered by the
 * homepage beside the hero rather than inside FeaturedWork, so the two
 * share a container: the sticky hero holds while the taskbar rises into
 * view, and releases once it's fully visible (see app/page.tsx). It
 * carries the #work anchor so "View selected work" and the nav land here.
 */
export function FeaturedWorkTaskbar() {
  return (
    <div id="work" className="relative z-10 scroll-mt-28">
      <RetroTaskbar tasks={tasks} />
    </div>
  );
}

export function FeaturedWork() {
  return (
    <section aria-labelledby="work-heading" className="bg-background">
      {/* Opens on a faint warm grey (the taskbar's own grey, lightened)
          that fades to the page over ~180px, so the grey taskbar settles
          into the white page instead of stopping on a hard edge. */}
      <div className="overflow-hidden bg-background bg-[linear-gradient(to_bottom,#ebe8e1,var(--color-background)_180px)] dark:bg-[linear-gradient(to_bottom,#1a2742,var(--color-background)_180px)]">
        <div className="mx-auto w-full max-w-[1600px] px-6 pt-10 pb-16 sm:px-12 sm:pt-14 sm:pb-20 lg:px-20 lg:pt-20 lg:pb-24 xl:px-28">
          <h2 id="work-heading" className="sr-only">Selected Works</h2>

          <ol className="space-y-16 sm:space-y-20 md:space-y-[120px]">
            {featured.map((project) => {
              const href = `/projects/${project.slug}`;
              const linkable = project.hasCaseStudy;
              return (
                <li key={project.slug} id={cardId(project.slug)} className="scroll-mt-28">
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
      </div>
    </section>
  );
}
