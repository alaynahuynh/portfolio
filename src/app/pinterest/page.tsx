import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { ResumeLink } from "@/components/ui/ResumeLink";
import { IndexRow, KICKER, WorkSection } from "@/components/sections/pitch/PitchWork";
import { ScrollRevealText, type Segment } from "@/components/sections/pinterest/ScrollRevealText";
import { getProjectBySlug } from "@/data/projects";
import { evolve, pitchWork } from "@/data/pitch-work";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * A one-page pitch written for Pinterest's product design internship.
 * Order: a short personal intro, what I'd bring (each point linked to its
 * proof), a scannable index of the work, then each project as its
 * Selected Works clip, a short story, and a "what feedback changed" panel
 * of real screens. The "board" idea carries through the hero collage and
 * the small masonry board of extras.
 *
 * Unlisted (not in the nav, not indexed) and shared by link. Every claim
 * comes from the résumé or the case studies (src/data/case-studies,
 * src/app/projects/nudge, src/app/projects/jurnee); nothing is invented.
 */
export const metadata: Metadata = {
  title: "Hey Pinterest",
  description: "What Alayna Huynh, a product designer who also builds, would bring to Pinterest.",
  robots: { index: false, follow: true },
};

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

/** The written pitch under the hero; fills in word by word on scroll. */
const pitch: Segment[][] = [
  [
    { text: "I'm " },
    { text: "Alayna Huynh", strong: true },
    { text: ", a product designer at the University of Michigan, and I'd love to spend " },
    { text: "Summer 2027 designing at Pinterest", strong: true },
    { text: "." },
  ],
  [
    { text: "I grew up drawing, painting, and building things with my hands. Now I make apps and websites, but I still love the moment an idea turns into something real. That's the moment Pinterest is built around." },
  ],
  [
    { text: "I talk to the people I design for, " },
    { text: "let what they tell me change the plan", strong: true },
    { text: ", and build what I design so the details make it all the way to launch." },
  ],
];

const strengths = [
  {
    title: "Feedback changes my designs.",
    body: "MyMuseum's usability study turned up four problems, and all four became shipped changes.",
    proof: [{ label: "MyMuseum", href: "#mymuseum" }],
  },
  {
    title: "I design AI people can check.",
    body: "In CoursePilot, answers show their sources, tasks explain their ranking, and nothing changes until the student approves it.",
    proof: [{ label: "CoursePilot", href: "#coursepilot" }],
  },
  {
    title: "I work well across roles, and fast.",
    body: "On Nudge, my interviews reframed what our PM, designer, and developer built. At a four-hour designathon, I was the UX designer on a team of engineers, designers, and data scientists, and our app placed 3rd.",
    proof: [
      { label: "Nudge", href: "#nudge" },
      { label: "Jurnee", href: "#jurnee" },
    ],
  },
  {
    title: "I build what I design.",
    body: "Two of these projects are live sites I built myself, so I know what's hard to build and where the details get lost.",
    proof: [{ label: "Noodle House", href: "#vietnamese-noodle-house" }],
  },
];

/** The projects, in the order this page shows them. */
const work = ["mymuseum", "coursepilot", "vietnamese-noodle-house", "nudge", "jurnee"].map((slug) => pitchWork[slug]);

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

/** A small pushpin dot, so photos read as pinned to a board. */
function Pushpin({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute z-10 size-3.5 rounded-full bg-white ring-1 ring-black/10 shadow-[0_2px_3px_rgb(0_0_0/0.25),inset_-2px_-2px_0_rgb(0_0_0/0.15)]",
        className,
      )}
    />
  );
}

/** Hero board: her photo as the main pin, with two project pins tucked
 * behind its corners. The project pins are decorative (their real media,
 * with alt text, appears further down). */
function HeroBoard() {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] pt-6 pb-10 sm:max-w-md lg:max-w-none">
      {/* Back pins */}
      <div
        aria-hidden="true"
        className="absolute top-0 -left-4 w-[42%] -rotate-6 rounded-2xl bg-white p-1.5 shadow-[0_14px_30px_-12px_rgb(80_0_10/0.5)] sm:-left-10"
      >
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            src="/images/projects/nudge/nudge-wide.jpg"
            alt=""
            fill
            sizes="200px"
            className="object-cover"
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute -right-3 bottom-0 w-[40%] rotate-6 rounded-2xl bg-white p-1.5 shadow-[0_14px_30px_-12px_rgb(80_0_10/0.5)] sm:-right-8"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
          <Image
            src="/thumbnails/mymuseum/mymuseum-tall-poster.webp"
            alt=""
            fill
            sizes="200px"
            className="object-cover object-[center_65%]"
          />
        </div>
      </div>

      {/* Main pin: her photo */}
      <figure className="relative mx-auto w-[78%] rotate-2 rounded-[22px] bg-white p-2 shadow-[0_28px_60px_-20px_rgb(80_0_10/0.6)]">
        <Pushpin className="-top-1.5 left-1/2 -translate-x-1/2" />
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
          <Image
            src="/images/about/08-cafe.jpg"
            alt="Alayna eating a treat at an outdoor café"
            fill
            priority
            sizes="(min-width: 1024px) 380px, 70vw"
            className="object-cover object-[55%_center]"
          />
        </div>
      </figure>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function PinterestPage() {
  return (
    <div className="bg-background">
      {/* Hero: Pinterest red band, big statement + her photo pinned to a board */}
      <section className="relative overflow-hidden rounded-b-[32px] bg-[#e60023] text-white sm:rounded-b-[48px]">
        <Container className="pt-28 sm:pt-32">
          <div className="mx-auto grid min-h-[calc(100svh-8rem)] max-w-6xl items-center gap-14 pb-24 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
            <div className="text-center lg:text-left">
              <p className="font-alayna-handwriting text-4xl text-white/90 sm:text-5xl">hey Pinterest,</p>
              <h1 className="mt-3 font-heading text-[3.25rem] leading-[0.95] font-semibold tracking-tight text-balance text-white sm:text-7xl lg:text-[5.75rem]">
                Save me to your design team.
              </h1>
              <p className="mx-auto mt-7 max-w-lg text-lg text-white/90 sm:text-xl lg:mx-0">
                Product designer at the University of Michigan who builds what I design.
              </p>
            </div>

            <HeroBoard />
          </div>
        </Container>

        {/* Short hand-drawn arrow, bottom center: a small loop, then an uneven head. */}
        <a
          href="#pitch"
          aria-label="Scroll to my pitch"
          className="group absolute bottom-5 left-1/2 -translate-x-1/2 text-white/90 transition-colors hover:text-white sm:bottom-7"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 32 52"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-auto transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:translate-y-1"
          >
            <path d="M16 3c-4 6 3 11 0 17-2 4-7 2-5-1 2-4 8-2 7 5-1 7-2 13-2 22" />
            <path d="M10 39.5c2.2 2.6 4.1 5.2 6 8 1.6-2.9 3.5-5.5 5.8-8.3" />
          </svg>
        </a>
      </section>

      <Container>
        {/* The written pitch, like the opening of a cover letter */}
        <section id="pitch" aria-label="About me" className="mx-auto max-w-3xl scroll-mt-28 pt-12 sm:pt-20">
          <ScrollRevealText
            paragraphs={pitch}
            className="space-y-6 text-xl leading-relaxed text-foreground sm:text-[1.5rem] sm:leading-relaxed"
          />
        </section>

        {/* What I'd bring: each point links to the project that shows it */}
        <section aria-labelledby="bring" className="mx-auto mt-20 max-w-6xl sm:mt-28">
          <Heading level={2} id="bring" className="font-heading">
            What I&apos;d bring to Pinterest
          </Heading>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {strengths.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="border-t border-border pt-5">
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-x-1.5 text-sm font-medium text-sage-deep">
                    <span>See it in</span>
                    {item.proof.map((proof, j) => (
                      <span key={proof.href} className="inline-flex items-center gap-1.5">
                        {j > 0 && <span className="text-muted-foreground">and</span>}
                        <a href={proof.href} className="group inline-flex items-center gap-1.5">
                          {proof.label}
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:translate-y-0.5"
                          >
                            ↓
                          </span>
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Index of work: what each project is and its one result, scannable before the detail */}
        <nav aria-label="Work on this page" className="mx-auto mt-20 max-w-6xl sm:mt-28">
          <p className={KICKER}>The work at a glance</p>
          <ol className="mt-4 border-t border-border">
            {work.map((entry) => (
              <IndexRow
                key={entry.slug}
                href={`#${entry.slug}`}
                year={entry.year}
                title={getProjectBySlug(entry.slug)?.title ?? entry.slug}
                type={entry.type}
                result={entry.result}
              />
            ))}
            <IndexRow href="#more" year={evolve.year} title={evolve.title} type={evolve.type} result={evolve.result} />
          </ol>
        </nav>

        {/* The work: homepage-style media cards, the story, then what feedback changed */}
        <section id="work" aria-labelledby="work-title" className="mx-auto mt-20 max-w-6xl scroll-mt-24 sm:mt-28">
          <Heading level={2} id="work-title" className="font-heading">
            Selected work
          </Heading>
          <p className="mt-2 text-lg text-muted-foreground">Click any clip for the full case study.</p>

          <div className="mt-12 space-y-24 sm:mt-16 md:space-y-[140px]">
            {work.map((entry, i) => (
              <WorkSection key={entry.slug} entry={entry} index={i} />
            ))}
          </div>
        </section>
      </Container>

      <Container className="pb-20 sm:pb-28">
        {/* Also on my board: a small masonry of extras */}
        <section id="more" aria-labelledby="more-title" className="mx-auto mt-24 max-w-6xl scroll-mt-28 sm:mt-32">
          <Heading level={2} id="more-title" className="font-heading">
            Also on my board
          </Heading>
          <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
            <Reveal className="mb-5 break-inside-avoid">
              <div className="rounded-[20px] bg-mist p-6">
                <p className={KICKER}>
                  {evolve.year} · Web & Visual Designer
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight text-foreground">
                  {evolve.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Launched a responsive site for a full-service salon and spa, and reorganized its hair, waxing, and
                  esthetics services. The owners say fewer customers call to ask what they offer. I also built a
                  visual system from the salon&apos;s own personality and space.
                </p>
              </div>
            </Reveal>

            <Reveal delay={70} className="mb-5 break-inside-avoid">
              <Link
                href="/playground"
                className="group block rounded-[20px] transition-transform duration-(--duration-base) ease-(--ease-soft) hover:-translate-y-1"
              >
                <div className="relative aspect-[1160/1600] overflow-hidden rounded-[20px] bg-muted">
                  <Image
                    src="/images/home/desk/lake-geese.jpg"
                    alt="Painting of birds on a purple-blue lake surrounded by reeds and pink flowers"
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className={cn(KICKER, "mt-3 px-1")}>Making things by hand</p>
                <p className="mt-1 px-1 leading-relaxed text-muted-foreground">
                  I still sketch, paint, and build. See more in my{" "}
                  <span className="text-foreground underline underline-offset-4 group-hover:text-sage-deep">
                    Playground ↗
                  </span>
                </p>
              </Link>
            </Reveal>

            <Reveal delay={140} className="mb-5 break-inside-avoid">
              <div className="rounded-[20px] bg-[color-mix(in_srgb,var(--color-butter)_40%,var(--color-background))] p-6 dark:bg-muted">
                <p className={KICKER}>Tools I use</p>
                <ul className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Design & research:</span> Figma, FigJam, user
                    interviews, usability testing, prototyping, information architecture
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Code & 3D:</span> Next.js, React, React Three
                    Fiber, Python, Blender
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Visual:</span> Illustrator, Photoshop, InDesign,
                    Procreate, Premiere Pro
                  </li>
                  <li>
                    <span className="font-medium text-foreground">By hand:</span> laser cutting, painting
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Closing */}
        <section
          aria-labelledby="chat"
          className="mx-auto mt-20 max-w-3xl border-t border-border pt-16 text-center sm:mt-28"
        >
          <Heading level={2} id="chat" className="font-alayna-handwriting font-normal text-4xl sm:text-5xl">
            Let&apos;s chat.
          </Heading>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            This was the short version. I&apos;d love to walk you through the full story behind any of this and show
            you why I&apos;d be a great fit for Pinterest.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Hi from Pinterest")}`}
              className="inline-flex h-11 items-center justify-center rounded-(--radius-default) bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Email me
            </a>
            <ResumeLink className="inline-flex h-11 items-center justify-center rounded-(--radius-default) bg-muted px-6 text-sm font-medium text-foreground transition-colors hover:bg-border">
              Resume ↗
            </ResumeLink>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-(--radius-default) px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              See my full portfolio
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
