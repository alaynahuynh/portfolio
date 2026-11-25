import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SelectedWorkMedia } from "@/components/sections/home/SelectedWorkMedia";
import { RetroTaskbar, type TaskbarTask } from "@/components/sections/home/RetroTaskbar";
import { TASKBAR_ICONS } from "@/components/sections/home/taskbar-icons";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Projects with Selected Works media, in data order. Pig Lamp has no
 * media, so it isn't featured here (its case study is linked from the
 * Playground's 3D page). */
const featured = projects.filter((p) => p.media);
/** The two strongest projects keep the full-size card; the rest sit
 * below as a row of smaller cards, so the list has a clear lead. */
const LEAD_COUNT = 2;
const leads = featured.slice(0, LEAD_COUNT);
const supporting = featured.slice(LEAD_COUNT);

/** One taskbar button per featured project, linking to its card. */
const cardId = (slug: string) => `work-${slug}`;
const tasks: TaskbarTask[] = featured.map((p) => ({
  id: cardId(p.slug),
  title: p.title,
  icon: TASKBAR_ICONS[p.slug],
}));

/**
 * Selected Work: every project under a Windows 98 taskbar spanning the
 * full viewport width (see RetroTaskbar): its Start button ("Selected
 * Works") is the visible title, so the heading itself is
 * screen-reader only, and its task buttons jump to each project.
 *
 * Featured projects follow the motion brief's card: media first (a wide
 * 16:9 loop beside a tall 9:16 one on a soft project color, see
 * SelectedWorkMedia), then title and one-line result. Each card is one link (the title's anchor is stretched over the
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
            {leads.map((project) => {
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

                    {/* No discipline tags here: each case study lists its
                        own, and repeating a shorter set on the card only
                        disagreed with them. */}
                    <div className="mt-6 max-w-3xl sm:mt-7">
                      <h3 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                        {linkable ? (
                          // Stretched over the whole card: media and copy
                          // are one link with one tab stop.
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
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          {/* Supporting projects: same color card, type and hover, at a
              smaller scale with the wide clip only. Three across from
              768px, stacked on phones. */}
          {supporting.length > 0 && (
            <ul className="mt-16 grid gap-12 sm:mt-20 md:mt-[120px] md:grid-cols-3 md:gap-x-6 lg:gap-x-10">
              {supporting.map((project) => (
                <li key={project.slug} id={cardId(project.slug)} className="scroll-mt-28">
                  <Reveal
                    y={15}
                    duration={500}
                    className="group/card relative flex h-full flex-col rounded-[20px] outline-offset-8 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-mauve-deep"
                  >
                    <SelectedWorkMedia project={project} media={project.media!} compact />
                    <h3 className="mt-5 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {project.hasCaseStudy ? (
                        <Link
                          href={`/projects/${project.slug}`}
                          prefetch={project.videoThumbnail ? false : undefined}
                          className="after:absolute after:inset-0 after:z-10 after:rounded-[20px] focus-visible:outline-none"
                        >
                          {project.title}
                        </Link>
                      ) : (
                        project.title
                      )}
                    </h3>
                    <p className="mt-2 text-base text-muted-foreground">{project.summary}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
