import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudyData } from "@/types/case-study";

/**
 * The one hero every case study shares, so they all read in the same
 * order: category → title → tagline → status → description → CTA →
 * disclosure → tools → Role / Duration / Platform → media.
 *
 * `children` is the hero media (video, image, desktop/mobile pair), which
 * differs per project. `showDescription` is off for CoursePilot, whose
 * Overview heading restates the description directly below.
 */
export function CaseStudyHero({
  data,
  showDescription = true,
  children,
}: {
  data: CaseStudyData;
  showDescription?: boolean;
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
  ].filter((item) => item.value);

  return (
    <Section className="pt-24 pb-0 sm:pt-32">
      <Link href="/#work" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
        ← Back to Work
      </Link>

      <Reveal>
        <p className="mt-10 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">{hero.category}</p>
        <Heading level={1} className="mt-2 text-5xl sm:text-7xl">
          {hero.title}
        </Heading>
      </Reveal>

      <Reveal delay={60}>
        <p className="mt-6 max-w-2xl text-xl text-foreground sm:text-2xl">{hero.tagline}</p>
      </Reveal>

      <Reveal delay={100}>
        <span className="mt-6 inline-flex items-center gap-1.5 rounded-(--radius-pill) bg-mist-blue px-3 py-1 text-xs font-medium text-sage-deep">
          <span className="size-1.5 rounded-full bg-sage-deep" />
          {hero.statusLabel}
        </span>
      </Reveal>

      {showDescription && hero.description && (
        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{hero.description}</p>
        </Reveal>
      )}

      {ctaHref && (
        <Reveal delay={160}>
          <a
            href={ctaHref}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-6 inline-flex items-center gap-2 rounded-(--radius-default) bg-(--project-mat) px-5 py-2.5 text-sm font-medium text-foreground transition-[filter] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--project-accent)"
          >
            {hero.ctaLabel} →
          </a>
        </Reveal>
      )}

      {hero.disclosure && (
        <Reveal delay={180}>
          <p className="mt-4 max-w-xl text-xs text-muted-foreground/80">{hero.disclosure}</p>
        </Reveal>
      )}

      {hero.tools && hero.tools.length > 0 && (
        <Reveal delay={180}>
          <p className="mt-5 text-sm text-muted-foreground">
            <span className="text-foreground">Tools:</span> {hero.tools.join(", ")}
          </p>
        </Reveal>
      )}

      <Reveal delay={200}>
        <dl className="mt-10 grid max-w-3xl gap-6 border-t border-border pt-6 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] sm:gap-10">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{item.label}</dt>
              <dd className="mt-1.5 text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {children && (
        <Reveal delay={220}>
          <div className="mt-14">{children}</div>
        </Reveal>
      )}
    </Section>
  );
}
