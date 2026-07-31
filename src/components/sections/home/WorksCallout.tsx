import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

/**
 * Stand-in for a full "Featured UX Work" section (that needs real case
 * studies — a later phase) — for now, a clean CTA into /projects. The old
 * UI/UX·3D·2D category tabs were removed: now that 2D and 3D work live
 * together in the CreativeDesk workspace instead of being split into
 * separate categories, those tabs no longer matched the site's structure.
 */
export function WorksCallout() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col items-center text-center">
        <p className="font-handwriting text-2xl text-muted-foreground sm:text-3xl">
          From sketchbook to screen
        </p>
        <Heading level={2} className="mt-2">
          Explore my UX work
        </Heading>

        <Link
          href="/projects"
          className="group mt-8 inline-flex items-center gap-2 rounded-(--radius-pill) bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-transform duration-(--duration-base) ease-(--ease-soft) hover:-translate-y-0.5"
        >
          View my works
          <ArrowRight className="size-4 transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:translate-x-1" />
        </Link>
      </Container>
    </section>
  );
}
