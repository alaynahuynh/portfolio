import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SelectedWorkMedia } from "@/components/sections/home/SelectedWorkMedia";
import { getProjectBySlug } from "@/data/projects";
import type { Highlight, Shot, WorkEntry } from "@/data/pitch-work";
import { cn } from "@/lib/utils";

/**
 * The project sections of the company pitch pages: an index row, and a
 * full section (Selected Works clip, short story, facts and metrics, then
 * a "what feedback changed" panel of real screens).
 */

export const KICKER = "text-xs font-medium tracking-[0.12em] text-foreground/60 uppercase";

/** Index row: what it is and the one result worth remembering, so the
 * whole body of work can be scanned before scrolling into it. */
export function IndexRow({
  href,
  year,
  title,
  type,
  result,
}: {
  href: string;
  year: string;
  title: string;
  type: string;
  result: string;
}) {
  return (
    <li className="border-b border-border">
      <a
        href={href}
        className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-4 sm:grid-cols-[4.5rem_1.1fr_1fr_auto]"
      >
        <span className="text-sm text-muted-foreground tabular-nums">{year}</span>
        <span>
          <span className="block font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-sage-deep sm:text-xl">
            {title}
          </span>
          <span className="mt-0.5 block text-sm text-muted-foreground">{type}</span>
        </span>
        <span className="col-start-2 row-start-2 text-sm font-medium text-sage-deep sm:col-start-3 sm:row-start-1 sm:text-[0.9375rem]">
          {result}
        </span>
        <span
          aria-hidden="true"
          className="col-start-3 row-start-1 text-muted-foreground transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:translate-y-0.5 group-hover:text-sage-deep sm:col-start-4"
        >
          ↓
        </span>
      </a>
    </li>
  );
}

/** `ratio` lets a before/after pair share one frame shape so captions line up. */
function ShotFigure({ shot, phone, ratio }: { shot: Shot; phone?: boolean; ratio?: string }) {
  return (
    <figure>
      <div
        className={cn(
          "relative overflow-hidden bg-white shadow-[0_10px_30px_-16px_rgb(30_35_45/0.45)] ring-1 ring-black/5",
          phone ? "aspect-[9/16] rounded-[22px]" : "rounded-xl",
        )}
        style={phone ? undefined : { aspectRatio: ratio ?? `${shot.width} / ${shot.height}` }}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={phone ? "(min-width: 1024px) 220px, 45vw" : "(min-width: 1280px) 540px, (min-width: 640px) 45vw, 90vw"}
          className={cn("object-cover", shot.position ?? "object-top")}
        />
      </div>
      <figcaption className="mt-3 text-sm leading-snug">
        <span className="font-medium text-foreground">{shot.label}</span>
        <span className="text-muted-foreground"> · {shot.caption}</span>
      </figcaption>
    </figure>
  );
}

function Principles({ items }: { items?: string[] }) {
  if (!items) return null;
  return (
    <ul className="mb-6 flex flex-wrap gap-2">
      {items.map((p) => (
        <li
          key={p}
          className="rounded-(--radius-pill) bg-background px-3.5 py-1.5 text-sm font-medium text-foreground shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
        >
          {p}
        </li>
      ))}
    </ul>
  );
}

/** "What we heard → what changed", one pair per row. */
function Rows({ h, twoUp }: { h: Highlight; twoUp?: boolean }) {
  return (
    <>
      <p className={KICKER}>{h.rowsLabel}</p>
      <ol className={cn("mt-3", twoUp && "grid gap-x-10 md:grid-cols-2")}>
        {h.rows.map((r, i) => (
          <li
            key={r.changed}
            className={cn(
              "border-t border-foreground/10 py-4",
              i === 0 && "border-t-0 pt-2",
              twoUp && i === 1 && "md:border-t-0 md:pt-2",
            )}
          >
            <p className="text-sm leading-relaxed text-muted-foreground">{r.heard}</p>
            <p className="mt-1.5 flex gap-2 font-medium text-foreground">
              <ArrowRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-sage-deep" />
              <span>{r.changed}</span>
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}

/** The "show, don't tell" panel under each project: real screens (or the
 * problem statement) before and after, then what feedback changed. */
function HighlightPanel({ h, tint }: { h: Highlight; tint: string }) {
  const wide = h.shots && !h.shots.phone;
  const ratio = h.shots && `${h.shots.before.width} / ${h.shots.before.height}`;
  return (
    <Reveal y={15} duration={500}>
      <div
        className="mt-10 rounded-[24px] bg-(--hl) p-5 sm:p-8 lg:p-10 dark:bg-muted"
        // The card colors are strong mid-tones, so the text panel uses a
        // light tint of them to keep body copy readable.
        style={{ "--hl": `color-mix(in srgb, ${tint} 16%, var(--color-background))` } as React.CSSProperties}
      >
        <p className={KICKER}>{h.kicker}</p>
        <p className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
          {h.title}
        </p>

        {wide ? (
          // Desktop-sized screens need the room: full width, then the
          // feedback rows two-up underneath.
          <>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:gap-8">
              <ShotFigure shot={h.shots!.before} ratio={ratio} />
              <ShotFigure shot={h.shots!.after} ratio={ratio} />
            </div>
            <div className="mt-10">
              <Principles items={h.principles} />
              <Rows h={h} twoUp />
            </div>
          </>
        ) : (
          <div className="mt-7 grid items-start gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
            {h.shots && (
              <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-4 sm:gap-5">
                <ShotFigure shot={h.shots.before} phone />
                <ShotFigure shot={h.shots.after} phone />
              </div>
            )}

            {h.statements && (
              <div className="grid gap-4">
                <div className="rounded-2xl bg-background/70 p-5 sm:p-6">
                  <p className={KICKER}>{h.statements.before.label}</p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{h.statements.before.text}</p>
                </div>
                <div className="rounded-2xl border-2 border-sage-deep/30 bg-background p-5 sm:p-6">
                  <p className={cn(KICKER, "text-sage-deep")}>{h.statements.after.label}</p>
                  <p className="mt-2 leading-relaxed text-foreground">{h.statements.after.text}</p>
                </div>
              </div>
            )}

            <div>
              <Principles items={h.principles} />
              <Rows h={h} />
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function WorkSection({ entry, index }: { entry: WorkEntry; index: number }) {
  const project = getProjectBySlug(entry.slug);
  if (!project?.media) return null;

  return (
    <article id={entry.slug} aria-labelledby={`${entry.slug}-title`} className="scroll-mt-28">
      <Reveal y={15} duration={500}>
        <Link
          href={`/projects/${entry.slug}`}
          prefetch={false}
          aria-label={`${project.title} case study`}
          className="group/card block rounded-[20px] outline-offset-8 focus-visible:outline-2 focus-visible:outline-mauve-deep"
        >
          <SelectedWorkMedia project={project} media={project.media} />
        </Link>
      </Reveal>

      <div className="mt-8 grid gap-8 md:grid-cols-[3fr_2fr] md:gap-12 lg:gap-16">
        <Reveal>
          <p className={KICKER}>
            <span className="text-sage-deep">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-2">·</span>
            {project.title} · {entry.type}
          </p>
          <h3
            id={`${entry.slug}-title`}
            className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2.25rem] lg:leading-tight"
          >
            {entry.headline}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{entry.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={`/projects/${entry.slug}`}
              prefetch={false}
              className="group/cta inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-sage-deep"
            >
              View case study
              <ArrowRight className="size-4 transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover/cta:translate-x-1" />
            </Link>
            {entry.liveUrl && (
              <a
                href={entry.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Live site
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={80} className="md:pt-1">
          <dl className="grid grid-cols-2 gap-4">
            {entry.facts.map((f) => (
              <div key={f.label}>
                <dt className={KICKER}>{f.label}</dt>
                <dd className="mt-1.5 text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>

          <dl className="mt-6 divide-y divide-border border-y border-border">
            {entry.metrics.map((m) => (
              <div key={m.label} className="flex items-baseline gap-4 py-3">
                <dt className="sr-only">{m.label}</dt>
                <dd className="w-24 shrink-0 font-heading text-2xl font-semibold whitespace-nowrap text-sage-deep sm:w-28 sm:text-3xl">
                  {m.value}
                </dd>
                <dd className="text-sm text-muted-foreground">{m.label}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="What I did">
            {entry.did.map((d) => (
              <li
                key={d}
                className="rounded-(--radius-pill) border border-border px-3 py-1 text-sm text-muted-foreground"
              >
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <HighlightPanel h={entry.highlight} tint={project.media.bgColor} />
    </article>
  );
}
