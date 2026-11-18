import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CaseStudyTaskbar } from "@/components/sections/case-studies/CaseStudyTaskbar";
import { TASKBAR_ICONS } from "@/components/sections/home/taskbar-icons";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";

/**
 * The end of every case study: the homepage's Selected Works taskbar
 * (CaseStudyTaskbar), which rises from the bottom of the screen once the
 * reader reaches the end, so each case study closes on the same desktop
 * the site opens on. Each featured project is a task button, the one
 * being read is pressed, and the Start button returns to the homepage
 * list.
 *
 * Task buttons hide under 768px (as on the homepage), so phones get a
 * plain previous / next row above it instead. Both wrap around, so
 * nobody hits a dead end.
 */
export function CaseStudyEnd({ slug }: { slug: string }) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const tasks = projects
    // The homepage's five Selected Works (Pig Lamp sits under "Other").
    .filter((p) => p.media && p.hasCaseStudy)
    .map((p) => ({
      id: p.slug,
      title: p.title,
      icon: TASKBAR_ICONS[p.slug],
      href: `/projects/${p.slug}`,
      current: p.slug === slug,
    }));

  return (
    <>
      <nav aria-label="More case studies" className="border-t border-border md:hidden">
        <Container className="flex items-center justify-between gap-4 py-8 text-sm">
          <Link
            href={`/projects/${prev.slug}`}
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span>
              <span className="sr-only">Previous project: </span>
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="inline-flex items-center gap-2 text-right text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>
              <span className="sr-only">Next project: </span>
              {next.title}
            </span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Container>
      </nav>
      {/* The taskbar rises once this end marker scrolls into view. */}
      <div id="case-study-end" aria-hidden="true" className="h-px" />
      {/* A sibling, not inside a short wrapper: sticky needs the whole
          page as its parent (see CaseStudyTaskbar). */}
      <CaseStudyTaskbar tasks={tasks} />
    </>
  );
}
