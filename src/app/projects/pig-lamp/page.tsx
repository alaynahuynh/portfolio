import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import {
  CaseStudyContentImage,
  CaseStudyZoomImage,
} from "@/components/sections/case-studies/media/CaseStudyMedia";
import type { CaseStudyImageSpec } from "@/types/case-study";

export const metadata: Metadata = {
  title: "Pig Lamp",
  description:
    "A laser-cut wood lamp designed and fabricated with a clinic and the Industrial Design Society, as part of a project creating customized lamps for autistic children.",
};

/**
 * A short project page, not a full case study — written only from what's
 * known (the résumé entry + the photos). The user needs, constraints, and
 * process behind the lamp aren't documented yet, so they aren't described;
 * add them here (with process photos) once they're written up.
 */

const SIDE: CaseStudyImageSpec = {
  src: "/creative-practice/3d/pig-lamp-1.jpg",
  alt: "The pig lamp from the side: a pink laser-cut wood pig silhouette with a curled tail and dark hooves, its body opened up into a cage of curved ribs around a bulb.",
  width: 1600,
  height: 1420,
};
const OTHER_SIDE: CaseStudyImageSpec = {
  src: "/creative-practice/3d/pig-lamp-2.jpg",
  alt: "The pig lamp from its other side, showing the second profile panel, the bulb inside the rib cage, and the power cord.",
  width: 1600,
  height: 1420,
};
const END: CaseStudyImageSpec = {
  src: "/creative-practice/3d/pig-lamp-3.jpg",
  alt: "End view of the pig lamp: the two profile panels joined by slotted radial ribs and a round disc holding the bulb socket, with the cord running out the back.",
  width: 1572,
  height: 1600,
};

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{children}</p>;
}

export default function PigLampPage() {
  return (
    <div className="bg-background">
      <Section className="pt-24 pb-0 sm:pt-32">
        <Link href="/creative-practice/3d" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← Back to 3D works
        </Link>

        <Reveal>
          <p className="mt-10 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Industrial Design · Clinic collaboration · Fabrication
          </p>
          <Heading level={1} className="mt-2 text-5xl sm:text-7xl">
            Pig Lamp
          </Heading>
        </Reveal>
        <Reveal delay={60}>
          <p className="mt-6 max-w-2xl text-xl text-foreground sm:text-2xl">
            A laser-cut wood lamp from a project creating customized lamps for autistic children.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <dl className="mt-10 grid max-w-3xl gap-6 border-t border-border pt-6 sm:grid-cols-3">
            <div>
              <dt><Label>Role</Label></dt>
              <dd className="mt-1 text-foreground">Industrial Designer</dd>
            </div>
            <div>
              <dt><Label>Team</Label></dt>
              <dd className="mt-1 text-foreground">A clinic + Industrial Design Society designers</dd>
            </div>
            <div>
              <dt><Label>Year</Label></dt>
              <dd className="mt-1 text-foreground">2026</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-14">
            <CaseStudyZoomImage image={SIDE} />
          </div>
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <Label>The project</Label>
            <p className="mt-3 text-lg text-muted-foreground">
              I collaborated with a clinic and fellow designers in the Industrial Design Society to develop
              customized lamps for children.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <Label>My part</Label>
            <p className="mt-3 text-lg text-muted-foreground">
              I designed and fabricated this lamp from laser-cut wood, translating user needs into physical design
              constraints.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="cs-band">
        <Reveal>
          <Label>How it&rsquo;s built</Label>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Two flat pig profiles are joined by slotted ribs that curve into a cage around the bulb, so the whole
            lamp assembles from laser-cut parts.
          </p>
        </Reveal>
        <Reveal delay={60}>
          <div className="mt-10 grid items-start gap-6 sm:grid-cols-2">
            <div>
              <CaseStudyContentImage image={OTHER_SIDE} className="max-w-none" sizes="(min-width: 640px) 50vw, 100vw" />
              <p className="mt-3 text-sm text-muted-foreground">The other side, with the bulb inside the rib cage.</p>
            </div>
            <div>
              <CaseStudyContentImage image={END} className="max-w-none" sizes="(min-width: 640px) 50vw, 100vw" />
              <p className="mt-3 text-sm text-muted-foreground">
                End view: slotted radial ribs tie the two profiles together around the socket.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <nav aria-label="More work" className="border-t border-border">
        <Section className="py-16 sm:py-20">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Link
              href="/creative-practice/3d"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← More 3D works
            </Link>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 border-b border-current pb-1 text-sm font-medium text-foreground transition-colors hover:text-sage-deep"
            >
              See my product design case studies
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Section>
      </nav>
    </div>
  );
}
