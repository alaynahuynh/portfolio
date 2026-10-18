import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import {
  CaseStudyContentImage,
  CaseStudyZoomImage,
} from "@/components/sections/case-studies/media/CaseStudyMedia";
import { NextCaseStudy } from "@/components/sections/case-studies/NextCaseStudy";
import type { CaseStudyImageSpec } from "@/types/case-study";

export const metadata: Metadata = {
  title: "Pig Lamp",
  description:
    "A laser-cut wood pig lamp — hand-dimensioned sketches, Illustrator cut files, raw-wood prototypes, and a painted final — from a project creating customized lamps for autistic children.",
};

/**
 * Short case study built from two sources only: the résumé entry (the
 * clinic collaboration, role) and Alayna's own process deck "Pendant
 * Light Project" (sketches + dimensions, Illustrator cut files, raw-wood
 * prototypes, final photos, and her written takeaways). Nothing else —
 * e.g. the specific children's needs — is documented, so it isn't stated.
 */

const img = (name: string, alt: string, width: number, height: number): CaseStudyImageSpec => ({
  src: `/images/projects/pig-lamp/${name}`,
  alt,
  width,
  height,
});

const HERO = img(
  "lit-glow.jpg",
  "The pink pig lamp switched on in a dim room, glowing warm yellow through the cage of ribs that forms its body.",
  2000,
  1754,
);
const SKETCH_PARTS = img(
  "sketch-parts.jpg",
  "Pencil sketch of every part with dimensions: eight arc-shaped ribs, slotted front and back rings, two socket plates, the head silhouette, and front and back legs.",
  1065,
  1539,
);
const SKETCH_PIECES = img(
  "sketch-pieces.jpg",
  "Pencil sketch grouping the pieces — rings, ribs, legs, and silhouette — with an arrow down to a small drawing of the assembled pig lamp.",
  1132,
  1583,
);
const CUT_FILE = img(
  "cut-file.png",
  "Illustrator laser-cut file: four arc-shaped ribs with tabbed ends, the pig silhouette with its curled tail, two slotted rings, and two leg panels with hooves marked in blue.",
  2420,
  1490,
);
const CUT_FILE_RIBS = img(
  "cut-file-ribs.png",
  "A second cut file with two arc-shaped ribs and two small example pieces cut to test that the slots fit into the disc.",
  1770,
  1080,
);
const DRAFT_PARTS = img(
  "draft-parts.jpg",
  "Draft laser-cut parts on a table: several slotted rings and a curved silhouette piece in raw wood.",
  1769,
  2000,
);
const PROTOTYPE_SIDE = img(
  "prototype-side.jpg",
  "The unpainted raw-wood version assembled on a workbench, its rib cage holding a bulb.",
  2000,
  1894,
);
const PROTOTYPE_LIT = img(
  "prototype-lit.jpg",
  "The raw-wood version switched on in the workshop, light glowing through the ribs.",
  1500,
  2000,
);
const IN_CONTEXT = img(
  "in-context.jpg",
  "The finished pink pig lamp on a table in front of a wall painted with flowers and butterflies.",
  2000,
  1206,
);
const FINAL_SIDE = img("final-side.jpg", "The finished lamp painted pink with dark hooves, seen from the side.", 2000, 1734);
const FINAL_END = img(
  "final-end.jpg",
  "End view of the finished lamp: the slotted ring and ribs tying the two leg panels together around the bulb.",
  2000,
  1979,
);
const LIT_DIM = img("lit-dim.jpg", "The finished lamp switched on in low light, glowing through its ribs.", 1500, 2000);

const PARTS = [
  ["Ribs", "8 · 12″ × 1.5″, arc-shaped"],
  ["Front + back rings", "Slots ¼″ wide"],
  ["Socket plates", "2 · 4″ diameter, 1.5″ hole"],
  ["Head silhouette", "17″ × 4″"],
  ["Front + back legs", "15″ × 3″ each"],
];

function Label({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <p
      className={`text-xs font-semibold tracking-[0.14em] uppercase ${accent ? "text-mauve-deep" : "text-muted-foreground"}`}
    >
      {children}
    </p>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-mauve-deep uppercase before:h-px before:w-6 before:bg-current before:opacity-50">
      {children}
    </p>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm text-muted-foreground">{children}</p>;
}

export default function PigLampPage() {
  return (
    <div className="case-study bg-background">
      {/* ---------------------------------------------------------- HERO */}
      <Section className="pt-24 pb-0 sm:pt-32">
        <Link href="/#work" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← Back to Work
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
            A laser-cut wood lamp whose body is the lampshade — from a project creating customized lamps for
            autistic children.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <dl className="mt-10 grid max-w-4xl gap-6 border-t border-border pt-6 sm:grid-cols-4">
            <div>
              <dt><Label>Role</Label></dt>
              <dd className="mt-1 text-foreground">Industrial Designer</dd>
            </div>
            <div>
              <dt><Label>Team</Label></dt>
              <dd className="mt-1 text-foreground">A clinic + Industrial Design Society designers</dd>
            </div>
            <div>
              <dt><Label>Tools</Label></dt>
              <dd className="mt-1 text-foreground">Illustrator, wood laser cutter</dd>
            </div>
            <div>
              <dt><Label>Year</Label></dt>
              <dd className="mt-1 text-foreground">2025</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-14">
            <CaseStudyZoomImage image={HERO} />
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ OVERVIEW */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
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
              I designed and fabricated this lamp — sketching and sizing every part, drawing the cut files in
              Illustrator, then cutting, test-fitting, and painting it — translating user needs into physical design
              constraints.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------------------------------- CONCEPT */}
      <Section className="cs-band">
        <Reveal>
          <Eyebrow>01 · Concept</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            The pig&rsquo;s body is the lampshade.
          </Heading>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            Instead of a pig holding a lamp, the pig <em>is</em> the lamp: flat silhouettes joined by a cage of
            arc-shaped ribs, with the bulb held where the body would be. I sketched every part and sized it by hand
            before drawing anything digitally.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal delay={40}>
            <div className="grid grid-cols-2 items-start gap-4 sm:gap-6">
              <CaseStudyZoomImage image={SKETCH_PARTS} />
              <CaseStudyZoomImage image={SKETCH_PIECES} />
            </div>
            <Caption>Left: every part, sized by hand. Right: how the pieces add up to the product.</Caption>
          </Reveal>
          <Reveal delay={80}>
            <Label accent>Parts list, from the sketches</Label>
            <dl className="mt-4 divide-y divide-border border-y border-border">
              {PARTS.map(([part, spec]) => (
                <div key={part} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-4 py-3 text-sm">
                  <dt className="font-medium text-foreground">{part}</dt>
                  <dd className="text-muted-foreground">{spec}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------------------------------- CUT FILES */}
      <Section>
        <Reveal>
          <Eyebrow>02 · Cut files</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            From pencil to laser-ready lines.
          </Heading>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            I drew every piece in Illustrator for the wood laser cutter. I struggled with Illustrator at first, but
            once I became more familiar with it, the work went much more smoothly. Before cutting the full set, I
            cut a small example piece to make sure the slots would fit into the disc.
          </p>
        </Reveal>
        <Reveal delay={60}>
          <div className="mt-12 grid items-start gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <CaseStudyZoomImage image={CUT_FILE} />
            <CaseStudyZoomImage image={CUT_FILE_RIBS} />
          </div>
          <Caption>
            Left: the main cut file — tabbed ribs, the silhouette, slotted rings, and leg panels. Right: more ribs, plus
            the small example piece I cut first to make sure the slots would fit into the disc.
          </Caption>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ PROTOTYPE */}
      <Section className="cs-band">
        <Reveal>
          <Eyebrow>03 · Prototyping</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            Getting the pieces to fit took a couple of tries.
          </Heading>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            The hardest part was adjusting for the kerf — the sliver of wood the laser burns away — so the slots and
            ribs actually fit together. It took a couple of tries to get everything aligned just right. I worked it
            out in raw wood before the painted final.
          </p>
        </Reveal>
        <Reveal delay={60}>
          <div className="mt-12 grid items-start gap-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <CaseStudyZoomImage image={DRAFT_PARTS} />
              <Caption>Draft parts: slotted rings and a silhouette.</Caption>
            </div>
            <div>
              <CaseStudyZoomImage image={PROTOTYPE_SIDE} />
              <Caption>The raw-wood version, assembled.</Caption>
            </div>
            <div>
              <CaseStudyZoomImage image={PROTOTYPE_LIT} />
              <Caption>Lit up, still unpainted.</Caption>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------- FINAL */}
      <Section>
        <Reveal>
          <Eyebrow>04 · Final</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            Painted, assembled, and lit.
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <div className="mt-12">
            <CaseStudyZoomImage image={IN_CONTEXT} />
          </div>
        </Reveal>
        <Reveal delay={60}>
          <div className="mt-6 grid items-start gap-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <CaseStudyContentImage image={FINAL_SIDE} className="max-w-none" sizes="(min-width: 640px) 33vw, 100vw" />
              <Caption>Side.</Caption>
            </div>
            <div>
              <CaseStudyContentImage image={FINAL_END} className="max-w-none" sizes="(min-width: 640px) 33vw, 100vw" />
              <Caption>End: rings and ribs tie the two sides together.</Caption>
            </div>
            <div>
              <CaseStudyContentImage image={LIT_DIM} className="max-w-none" sizes="(min-width: 640px) 33vw, 100vw" />
              <Caption>On, in low light.</Caption>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ----------------------------------------------------- REFLECTION */}
      <Section className="cs-band">
        <Reveal>
          <Eyebrow>Reflection</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            Precision decides whether it holds together.
          </Heading>
        </Reveal>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          <Reveal delay={40}>
            <Label accent>What I learned</Label>
            <p className="mt-3 text-muted-foreground">
              Working through the kerf and the fit taught me a lot about precision and design: in a slot-together
              object, small measurement choices decide whether the whole thing works.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <Label>What I&rsquo;d do differently</Label>
            <ul className="mt-3 space-y-3 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Test fit before anything else.</span> The small example
                piece saved me from a full bad cut. Next time I&rsquo;d cut a kerf test on day one and size every slot
                from it, instead of adjusting after the fact.
              </li>
              <li>
                <span className="font-medium text-foreground">Prototype the scale, not just the fit.</span> I&rsquo;d make
                the pig a little smaller so it looks more proportional — something a quick cardboard mockup at full
                size would have shown before cutting wood.
              </li>
              <li>
                <span className="font-medium text-foreground">Check it with the people it&rsquo;s for.</span> The next
                step is putting the lamp in front of the clinic and the child to see how the light and the form
                actually land.
              </li>
            </ul>
          </Reveal>
        </div>
      </Section>

      <NextCaseStudy slug="pig-lamp" />
    </div>
  );
}
