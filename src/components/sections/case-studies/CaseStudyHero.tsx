import { ViewTransition } from "react";
import { BackToWork, CaseStudyWindow } from "@/components/sections/case-studies/CaseStudyWindow";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudyData } from "@/types/case-study";

/**
 * The one hero every case study shares. Kept short above the media so the
 * work itself shows without scrolling: category → title → tagline →
 * status + CTA, then the media, then the description and a compact
 * Role / Duration / Platform / Tools row beneath it. One typeface size
 * step per line, and the details sit under the visual rather than
 * stacking up in front of it. The media is the shared-element target for
 * page transitions (see PageTransition), opened in a CaseStudyWindow so
 * it reads as a window on the homepage desktop.
 *
 * `children` is the hero media (video, image, desktop/mobile pair), which
 * differs per project. `showDescription` is off for CoursePilot, whose
 * Overview heading restates the description directly below.
 */
export function CaseStudyHero({
  data,
  showDescription = true,
  mediaClassName,
  children,
}: {
  data: CaseStudyData;
  showDescription?: boolean;
  /** Sizes the hero media's window (e.g. a narrower centered window). */
  mediaClassName?: string;
  children?: React.ReactNode;
}) {
  const { hero, overview } = data;
  // No URL, no button — never a dead "#".
  const ctaHref = hero.ctaHref && hero.ctaHref !== "#" ? hero.ctaHref : null;
  const isExternal = ctaHref ? /^https?:\/\//.test(ctaHref) : false;
  // Durations like "Ongoing" carry no year, so lead with it.
  const duration = /\d{4}/.test(overview.duration) ? overview.duration : `${overview.year} · ${overview.duration}`;
  const meta = [
    { label: "Role", value: overview.role },
    { label: "Duration", value: duration },
    { label: "Platform", value: hero.platform },
    { label: "Tools", value: hero.tools?.join(", ") },
  ].filter((item) => item.value);
  const description = showDescription ? hero.description : undefined;

  return (
    <Section className="pt-24 pb-0 sm:pt-32">
      <BackToWork />

      <Reveal>
        <p className="mt-10 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">{hero.category}</p>
        <Heading level={1} className="mt-2 text-5xl sm:text-7xl">
          {hero.title}
        </Heading>
      </Reveal>

      <Reveal delay={60}>
        <p className="mt-5 max-w-2xl text-xl text-foreground sm:text-2xl">{hero.tagline}</p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          {ctaHref && (
            <a
              href={ctaHref}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-2 rounded-(--radius-default) bg-(--project-mat) px-5 py-2.5 text-sm font-medium text-foreground transition-[filter] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--project-accent)"
            >
              {hero.ctaLabel} →
            </a>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="size-1.5 rounded-full bg-sage-deep" />
            {hero.statusLabel}
          </span>
        </div>
      </Reveal>

      {/* Shares `project-media-<slug>` with the homepage card and the
          "Next project" card, so the browser morphs that image into this
          slot. Not wrapped in Reveal: a fade-in here would make the morph
          land on an invisible hero, then fade in a second time. */}
      {children && (
        <div className="mt-10 sm:mt-12">
          <ViewTransition name={`project-media-${data.slug}`} share="project-morph">
            <CaseStudyWindow slug={data.slug} className={mediaClassName}>
              {children}
            </CaseStudyWindow>
          </ViewTransition>
        </div>
      )}

      <Reveal delay={children ? 0 : 140}>
        <div
          className={
            description
              ? "mt-12 grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-14"
              : "mt-12"
          }
        >
          {description && (
            <div>
              <p className="text-lg text-muted-foreground">{description}</p>
              {hero.disclosure && <p className="mt-4 text-sm text-muted-foreground/80">{hero.disclosure}</p>}
            </div>
          )}
          <dl
            className={
              description
                ? "grid gap-4 text-sm"
                : "grid gap-6 border-t border-border pt-6 text-sm sm:grid-cols-2 lg:grid-cols-4"
            }
          >
            {meta.map((item) => (
              <div key={item.label} className={description ? "grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3" : undefined}>
                <dt className="font-medium text-foreground">{item.label}</dt>
                <dd className="text-muted-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
          {!description && hero.disclosure && (
            <p className="mt-4 text-sm text-muted-foreground/80">{hero.disclosure}</p>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
