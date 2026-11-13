import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { ResumeLink } from "@/components/ui/ResumeLink";
import { SelectedWorkMedia } from "@/components/sections/home/SelectedWorkMedia";
import { ScrollRevealText, type Segment } from "@/components/sections/pinterest/ScrollRevealText";
import { getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * A one-page pitch written for Pinterest. Structure follows a written
 * cover letter: a long-form intro, an index of the work, then each
 * project told in a few lines with its numbers, using the homepage's
 * Selected Works media cards. The "board" idea carries through as a pin
 * collage beside the intro and a small masonry board of extras.
 *
 * Unlisted (not in the nav, not indexed) and shared by link. Every claim
 * comes from the résumé or the case studies; nothing is invented.
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
    { text: ". Honestly, getting to work on a product I already care this much about would be a dream." },
  ],
  [
    { text: "I've always loved making things. Growing up, that meant drawing, painting, and building whatever I could with my hands. Now it's apps and websites, but the feeling hasn't changed: I love the moment an idea turns into something real. Pinterest is built around that exact moment, when someone sees an idea and decides to make it their own. That's why it's the place I most want to be." },
  ],
  [
    { text: "I design products and build them, from user research to shipped code. I talk to the people I'm designing for, test my work with them, and then build it myself so the little details make it all the way to the live product." },
  ],
  [
    { text: "And I've seen that work help real people. After I rebuilt a family restaurant's website, the owners told me " },
    { text: "wrong-location orders dropped from about 8 a month to about 1", strong: true },
    { text: ". I'm also drawn to projects where art and technology meet, so I designed and built MyMuseum, a platform that turns an artist's uploads into a 3D gallery you can walk through." },
  ],
];

type WorkEntry = {
  slug: string;
  year: string;
  role: string;
  /** Plain-language one-liner shown as the section headline. */
  headline: string;
  paragraphs: string[];
  did: string[];
  metrics: { value: string; label: string }[];
  quote?: string;
  liveUrl?: string;
};

const work: WorkEntry[] = [
  {
    slug: "mymuseum",
    year: "2026",
    role: "Product Designer & Developer",
    headline: "Turning online art portfolios into galleries you can walk through.",
    paragraphs: [
      "Artists share their work as flat grids of thumbnails, which loses the scale and order they care about. I interviewed 5 artists about how they want their work seen, then designed and built a live platform that turns their uploads into a walkable 3D museum they can share by link.",
      "A 5-person usability study found 4 problems, and each one became a shipped change: rooms that size themselves to the collection, a Grid View so no piece is 3D-only, simpler avatars, and private messages to the artist.",
    ],
    did: ["User interviews", "Usability testing", "Interaction design", "3D web", "Next.js", "React Three Fiber"],
    metrics: [
      { value: "5", label: "artist interviews" },
      { value: "5", label: "usability participants" },
      { value: "4 / 4", label: "findings shipped as changes" },
    ],
    liveUrl: "https://mymuseum-eta.vercel.app/",
  },
  {
    slug: "coursepilot",
    year: "2026",
    role: "Product Designer",
    headline: "Turning scattered Canvas information into answers students can act on.",
    paragraphs: [
      "Students miss announcements and struggle to decide what to work on first. From 5 student interviews about deadlines, planning, and trust in AI, I designed an AI planning assistant that lives inside Canvas.",
      "Instead of chat-style paragraphs, it gives answers shaped for the task: study plans, weekly summaries, sourced syllabus answers, and grade calculations. Every answer shows its sources and a “Why this?” explanation, so students can check it before they trust it.",
    ],
    did: ["User interviews", "Usability testing", "AI interaction design", "Figma prototyping"],
    metrics: [
      { value: "5", label: "student interviews" },
      { value: "5", label: "usability sessions" },
      { value: "5", label: "issues found to redesign next" },
    ],
  },
  {
    slug: "vietnamese-noodle-house",
    year: "2026",
    role: "Contract UX/UI Designer & Developer",
    headline: "Helping a family restaurant's customers order from the right location.",
    paragraphs: [
      "The restaurant has two locations and a food truck, and customers kept placing orders at the wrong one. I audited the old site, then redesigned and built a new one: a select-then-confirm location flow, and the 11-page PDF menu rebuilt as one responsive page with a sticky category nav.",
      "I worked inside the restaurant's existing ordering platforms, and fixed a contact form that said “Message sent!” without ever sending anything.",
    ],
    did: ["UX audit", "Information architecture", "Responsive design", "Next.js", "Client work"],
    metrics: [
      { value: "~8 → ~1", label: "wrong-location orders a month, per the owners" },
      { value: "~50", label: "menu items, moved out of an 11-page PDF" },
    ],
    liveUrl: "https://vietnoodlehouse.com/",
  },
  {
    slug: "pig-lamp",
    year: "2025",
    role: "Industrial Designer",
    headline: "A lamp for a clinic's autistic children, where the body is the lampshade.",
    paragraphs: [
      "With a clinic and the Industrial Design Society, I designed and made a custom lamp for children at the clinic. I sketched the parts with real dimensions, drew the cut files in Illustrator, and tested the slot fit on raw-wood prototypes before painting the final lamp.",
    ],
    did: ["Sketching", "Illustrator", "Laser cutting", "Prototyping"],
    metrics: [],
    quote: "The clinic said the kids found it “very comforting and cute.”",
  },
];

/** Index row with no section of its own (no case study yet). */
const evolve = { year: "2025", title: "Evolve Salon & Spa", role: "Web & Visual Designer" };

const strengths = [
  {
    title: "I design for people who collect things.",
    body: "Saving, sorting, and sharing what inspires you is what MyMuseum is about, and it's what Pinterest does best.",
  },
  {
    title: "I care about what happens after the save.",
    body: "Inspiration matters most when people can act on it. I like designing the step between finding something and doing something with it.",
  },
  {
    title: "I make recommendations people can trust.",
    body: "When software suggests something, I show why, so people can check it and change it.",
  },
  {
    title: "I build what I design.",
    body: "I prototype in real code, so I know what's hard to build and can work closely with engineers.",
  },
]

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

const KICKER = "text-xs font-medium tracking-[0.12em] text-foreground/60 uppercase";

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
            src="/images/projects/pig-lamp/lit-glow.jpg"
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

function IndexRow({ href, year, title, role }: { href: string; year: string; title: string; role: string }) {
  return (
    <li className="border-b border-border">
      <a
        href={href}
        className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 py-4 sm:grid-cols-[5rem_1fr_1fr_auto]"
      >
        <span className="text-sm text-muted-foreground tabular-nums">{year}</span>
        <span className="font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-sage-deep sm:text-xl">
          {title}
        </span>
        <span className="hidden text-sm text-muted-foreground sm:block">{role}</span>
        <span
          aria-hidden="true"
          className="text-muted-foreground transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:translate-y-0.5 group-hover:text-sage-deep"
        >
          ↓
        </span>
      </a>
    </li>
  );
}

function WorkSection({ entry, index }: { entry: WorkEntry; index: number }) {
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
            {project.title} · {entry.year}
          </p>
          <h3
            id={`${entry.slug}-title`}
            className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2.25rem] lg:leading-tight"
          >
            {entry.headline}
          </h3>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {entry.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

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
          <p className={KICKER}>Role</p>
          <p className="mt-2 text-foreground">{entry.role}</p>

          {entry.metrics.length > 0 && (
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
          )}
          {entry.quote && (
            <blockquote className="mt-6 border-l-2 border-mauve pl-4 text-muted-foreground italic">
              {entry.quote}
            </blockquote>
          )}

          <p className={cn(KICKER, "mt-6")}>What I did</p>
          <ul className="mt-3 flex flex-wrap gap-2">
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
    </article>
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

        {/* What I'd bring: right after the pitch, before the work */}
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
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Index of work, newest first (like a table of contents), leading straight into the work */}
        <nav aria-label="Work on this page" className="mx-auto mt-20 max-w-6xl sm:mt-28">
          <p className={KICKER}>The work</p>
          <ol className="mt-4 border-t border-border">
            {work.map((entry) => (
              <IndexRow
                key={entry.slug}
                href={`#${entry.slug}`}
                year={entry.year}
                title={getProjectBySlug(entry.slug)?.title ?? entry.slug}
                role={entry.role}
              />
            ))}
            <IndexRow href="#more" year={evolve.year} title={evolve.title} role={evolve.role} />
          </ol>
        </nav>

        {/* The work: homepage-style media cards with the story beneath,
            on the same column as every other section so edges line up. */}
        <section id="work" aria-labelledby="work-title" className="mx-auto mt-20 max-w-6xl scroll-mt-24 sm:mt-28">
          <Heading level={2} id="work-title" className="font-heading">
            Selected work
          </Heading>
          <p className="mt-2 text-lg text-muted-foreground">Newest first. Click any clip for the full case study.</p>

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
                  {evolve.year} · {evolve.role}
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
