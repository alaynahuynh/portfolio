import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";

/**
 * End-of-case-study navigation: one large "Next project" card (title,
 * one-line summary, cover image — the whole card is a single link), plus
 * a quiet previous / all-work row beneath it. Wraps around, so the last
 * case study leads back to the first and nobody hits a dead end.
 */
export function NextCaseStudy({ slug }: { slug: string }) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1 || projects.length < 2) return null;

  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const cover = next.cover ?? next.imageThumbnail;
  const position = `${String(((index + 1) % projects.length) + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;

  return (
    <nav aria-label="More case studies" className="border-t border-border bg-background">
      <Container className="py-20 sm:py-28">
        <Link
          href={`/projects/${next.slug}`}
          className="group grid gap-10 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-sage-deep lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16"
        >
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase before:h-px before:w-6 before:bg-current before:opacity-50">
              Next project <span className="font-normal tracking-normal text-muted-foreground/70">{position}</span>
            </p>
            <h2 className="mt-5 font-heading text-5xl leading-[1.02] tracking-tight text-foreground sm:text-7xl">
              {next.title}
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">{next.summary}</p>
            <span className="mt-8 inline-flex items-center gap-2 border-b border-current pb-1 text-sm font-medium text-foreground transition-colors group-hover:text-sage-deep">
              View case study
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:translate-x-1"
              />
            </span>
          </div>

          {cover && (
            <div
              className="rounded-xl p-3 sm:p-5"
              style={{
                background: `color-mix(in srgb, ${next.dominantColor ?? "var(--color-sage)"} 22%, var(--color-background))`,
              }}
            >
              <div className="relative aspect-16/10 overflow-hidden rounded-lg ring-1 ring-black/5">
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes="(min-width: 1024px) 680px, 100vw"
                  quality={90}
                  className="object-cover object-top transition-transform duration-(--duration-slow) ease-(--ease-soft) group-hover:scale-[1.03]"
                />
              </div>
            </div>
          )}
        </Link>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm">
          <Link
            href={`/projects/${prev.slug}`}
            className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4 transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:-translate-x-1"
            />
            <span>
              <span className="sr-only">Previous project: </span>
              {prev.title}
            </span>
          </Link>
          <Link href="/#work" className="text-muted-foreground transition-colors hover:text-foreground">
            All work
          </Link>
        </div>
      </Container>
    </nav>
  );
}
