import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { ResumeLink } from "@/components/ui/ResumeLink";
import {
  IndexRow,
  KICKER,
  WorkSection,
} from "@/components/sections/pitch/PitchWork";
import {
  ScrollRevealText,
  type Segment,
} from "@/components/sections/pinterest/ScrollRevealText";
import { getProjectBySlug } from "@/data/projects";
import { evolve, pitchWork } from "@/data/pitch-work";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * A one-page pitch for McDonald's Experience Design (UX) Intern role in the
 * Global Technology Internship Program (Chicago, hybrid, June to August
 * 2027). Same bones as /pinterest and /duolingo: a short intro, how I match
 * the posting, a scannable index, then each project with a "what feedback
 * changed" panel.
 *
 * The role works on the mobile app and in-restaurant ordering kiosks, so
 * Vietnamese Noodle House (an ordering flow that cut wrong-location orders)
 * leads, then the two solo projects, then the two team projects. The hero
 * is an order receipt whose line items are the projects.
 *
 * Brand nods are limited to red, golden yellow, and the receipt: no arches,
 * logo, or McDonald's artwork. Unlisted (not in the nav, not indexed).
 * Every claim comes from the case studies; nothing is invented.
 */
export const metadata: Metadata = {
  title: "Hey McDonald's",
  description:
    "Why Alayna Huynh, a product designer who also builds, would love to design at McDonald's.",
  robots: { index: false, follow: true },
};

/** Receipt type for the hero ticket only. */
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"] });

/** McDonald's-style golden yellow (with near-black text) and red (with white text). */
const YELLOW = "#FFC72C";
const RED = "#DA291C";
const INK = "#27251F";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const pitch: Segment[][] = [
  [
    { text: "I'm " },
    { text: "Alayna Huynh", strong: true },
    {
      text: ", a product designer at the University of Michigan, and I'd love to spend ",
    },
    { text: "Summer 2027 designing at McDonald's", strong: true },
    { text: "." },
  ],
  [
    {
      text: "One of my favorite design problems so far was about ordering. A family restaurant's customers kept ordering from the wrong location, so I added ",
    },
    { text: "one extra tap, on purpose", strong: true },
    {
      text: ": pick a location, then confirm it. The owners say wrong-location orders went from about eight a month to about one.",
    },
  ],
  [
    {
      text: "At McDonald's, moments like that happen at every kiosk and in every mobile order. That's the kind of small, feel-good detail I want to get right.",
    },
  ],
  [
    { text: "I talk to the people I design for, " },
    { text: "let what they tell me change the plan", strong: true },
    {
      text: ", and build what I design so the details make it all the way to launch.",
    },
  ],
];

/** The posting's responsibilities, each answered with something on this page. */
const fit = [
  {
    ask: "Customer-facing products, like the app and kiosks",
    answer:
      "Vietnamese Noodle House: I redesigned how customers pick a location and hand off to online ordering, on desktop and as a mobile bottom sheet.",
    href: "#vietnamese-noodle-house",
  },
  {
    ask: "Discovery: interviews, research, competitive analysis",
    answer:
      "15 interviews across MyMuseum, CoursePilot, and Nudge, plus a competitive review of New Art City for MyMuseum.",
    href: "#mymuseum",
  },
  {
    ask: "Turning research and feedback into design improvements",
    answer:
      "MyMuseum's usability study turned up four problems, and all four became shipped changes.",
    href: "#mymuseum",
  },
  {
    ask: "Wireframes, user flows, and prototypes in Figma",
    answer:
      "CoursePilot's clickable prototype, Jurnee's six-screen prototype, and Nudge's app screens, all in Figma.",
    href: "#coursepilot",
  },
  {
    ask: "Working with product managers, engineers, and researchers",
    answer:
      "On Nudge, my interviews reframed what our PM, designer, and developer built. On Jurnee, I was the UX designer on a team of engineers, designers, and data scientists.",
    href: "#nudge",
  },
  {
    ask: "Presenting with clarity and confidence",
    answer:
      "We pitched Jurnee to a panel of School of Information professors after four hours and placed 3rd. I also designed Nudge's pitch deck.",
    href: "#jurnee",
  },
];

/** The ordering flow first, then the solo projects, then the team projects. */
const work = [
  "vietnamese-noodle-house",
  "mymuseum",
  "coursepilot",
  "nudge",
  "jurnee",
].map((slug) => pitchWork[slug]);

/** Hero receipt line items, each linking to its section below. */
const order = [
  { name: "Noodle House", note: "Ordering flow", href: "#vietnamese-noodle-house" },
  { name: "MyMuseum", note: "Live product", href: "#mymuseum" },
  { name: "CoursePilot", note: "AI prototype", href: "#coursepilot" },
  { name: "Nudge", note: "Team project", href: "#nudge" },
  { name: "Jurnee", note: "3rd place", href: "#jurnee" },
];

/** Totals, all from the case studies: 5 + 5 + 5 interviews, 5 + 5 usability sessions. */
const totals = [
  { label: "Interviews I ran", value: "15" },
  { label: "Usability sessions", value: "10" },
  { label: "Test findings shipped", value: "4/4" },
];

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

/** A dashed rule, like the tear lines on a printed receipt. */
function Rule() {
  return <hr className="my-4 border-0 border-t-2 border-dashed border-[#27251F]/25" />;
}

/** The hero ticket: her projects as an order. Line items jump to each
 * project below. The torn bottom edge is a CSS mask; the shadow sits on
 * the wrapper so the mask doesn't clip it. */
function OrderTicket() {
  return (
    <div className="mx-auto w-full max-w-[22rem] rotate-[1.5deg] drop-shadow-[0_24px_30px_rgb(80_40_0/0.35)] sm:max-w-sm lg:mr-0">
      <div
        className={cn(
          mono.className,
          "bg-[#FFFDF8] px-6 pt-7 pb-10 text-[0.8125rem] leading-relaxed text-[#27251F] sm:px-7 sm:text-sm",
        )}
        style={{
          mask: "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 18px 100%",
          WebkitMask:
            "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 18px 100%",
        }}
      >
        <div className="text-center">
          <p className="font-semibold tracking-[0.2em] uppercase">Order #2027</p>
          <p className="mt-1 text-[#27251F]/70">UX Intern · Chicago, IL</p>
          <p className="text-[#27251F]/70">Jun–Aug 2027 · Hybrid</p>
        </div>

        <Rule />

        <ul className="space-y-1">
          {order.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group -mx-2 flex items-baseline gap-2 rounded px-2 py-0.5 transition-colors hover:bg-[#FFC72C]/40"
              >
                <span className="text-[#27251F]/60">1</span>
                <span className="font-semibold group-hover:underline group-hover:underline-offset-4">
                  {item.name}
                </span>
                <span
                  aria-hidden="true"
                  className="min-w-4 flex-1 translate-y-[-0.2em] border-b border-dotted border-[#27251F]/30"
                />
                <span className="text-right text-[#27251F]/70">{item.note}</span>
              </a>
            </li>
          ))}
        </ul>

        <Rule />

        <dl className="space-y-1">
          {totals.map((t) => (
            <div key={t.label} className="flex justify-between gap-4">
              <dt className="text-[#27251F]/70">{t.label}</dt>
              <dd className="font-semibold tabular-nums">{t.value}</dd>
            </div>
          ))}
        </dl>

        <Rule />

        <div className="flex items-baseline justify-between gap-4 text-base font-semibold uppercase sm:text-lg">
          <span>Total</span>
          <span className="text-right">1 designer who builds</span>
        </div>

        <p className="mt-6 text-center font-alayna-handwriting text-3xl text-[#DA291C] normal-case">
          ready for pickup!
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function McDonaldsPage() {
  return (
    <div className="bg-background">
      {/* Hero: golden yellow band, big statement + her work as an order receipt */}
      <section
        className="relative overflow-hidden rounded-b-[32px] sm:rounded-b-[48px]"
        style={{ backgroundColor: YELLOW, color: INK }}
      >
        <Container className="pt-28 sm:pt-32">
          <div className="mx-auto grid min-h-[calc(100svh-8rem)] max-w-6xl items-center gap-14 pb-24 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
            <div className="text-center lg:text-left">
              <p className="font-alayna-handwriting text-4xl text-[#27251F]/80 sm:text-5xl">
                hey McDonald&apos;s,
              </p>
              <h1 className="mt-3 text-[3.25rem] leading-[0.95] font-extrabold tracking-tight text-balance sm:text-7xl lg:text-[5.25rem]">
                Can I take your order?
              </h1>
              <p className="mx-auto mt-7 max-w-lg text-lg sm:text-xl lg:mx-0">
                I&apos;d love to join the Global Experience Design team as a UX
                intern. Here&apos;s what I&apos;d bring to the counter.
              </p>
            </div>

            <OrderTicket />
          </div>
        </Container>

        {/* Short hand-drawn arrow, bottom center (same as /pinterest). */}
        <a
          href="#pitch"
          aria-label="Scroll to my pitch"
          className="group absolute bottom-5 left-1/2 -translate-x-1/2 text-[#27251F]/70 transition-colors hover:text-[#DA291C] sm:bottom-7"
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
        {/* The written pitch */}
        <section
          id="pitch"
          aria-label="About me"
          className="mx-auto max-w-3xl scroll-mt-28 pt-12 sm:pt-20"
        >
          <ScrollRevealText
            paragraphs={pitch}
            className="space-y-6 text-xl leading-relaxed text-foreground sm:text-[1.5rem] sm:leading-relaxed"
          />
        </section>

        {/* How I match the posting: its responsibilities, answered */}
        <section
          aria-labelledby="fit"
          className="mx-auto mt-20 max-w-6xl sm:mt-28"
        >
          <Heading level={2} id="fit" className="font-heading">
            How I fit the UX internship
          </Heading>
          <p className="mt-2 text-lg text-muted-foreground">
            What the role asks for, and where to see it here.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fit.map((item, i) => (
              <li key={item.ask} className="h-full">
                <Reveal delay={i * 60} className="h-full">
                  <a
                    href={item.href}
                    className="flex h-full gap-4 rounded-[20px] border border-border bg-background p-5 transition-[translate,border-color] duration-(--duration-base) ease-(--ease-soft) hover:-translate-y-0.5 hover:border-[#DA291C]/50"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: YELLOW, color: INK }}
                    >
                      <Check className="size-5" strokeWidth={3} />
                    </span>
                    <span>
                      <span className={cn(KICKER, "block")}>{item.ask}</span>
                      <span className="mt-2 block leading-relaxed text-foreground">
                        {item.answer}
                      </span>
                      <span className="mt-2 inline-block text-sm font-medium text-sage-deep">
                        See it below ↓
                      </span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        {/* Index of work */}
        <nav
          aria-label="Work on this page"
          className="mx-auto mt-20 max-w-6xl sm:mt-28"
        >
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
            <IndexRow
              href="#more"
              year={evolve.year}
              title={evolve.title}
              type={evolve.type}
              result={evolve.result}
            />
          </ol>
        </nav>

        {/* The work */}
        <section
          id="work"
          aria-labelledby="work-title"
          className="mx-auto mt-20 max-w-6xl scroll-mt-24 sm:mt-28"
        >
          <Heading level={2} id="work-title" className="font-heading">
            Selected work
          </Heading>
          <p className="mt-2 text-lg text-muted-foreground">
            An ordering flow first, then two products I drove myself and two
            team projects. Click any clip for the full case study.
          </p>

          <div className="mt-12 space-y-24 sm:mt-16 md:space-y-[140px]">
            {work.map((entry, i) => (
              <WorkSection key={entry.slug} entry={entry} index={i} />
            ))}
          </div>
        </section>
      </Container>

      <Container className="pb-20 sm:pb-28">
        {/* A few sides: extras */}
        <section
          id="more"
          aria-labelledby="more-title"
          className="mx-auto mt-24 max-w-6xl scroll-mt-28 sm:mt-32"
        >
          <Heading level={2} id="more-title" className="font-heading">
            A few sides
          </Heading>
          <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
            <Reveal className="mb-5 break-inside-avoid">
              <div className="rounded-[20px] bg-mist p-6">
                <p className={KICKER}>{evolve.year} · Web & Visual Designer</p>
                <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight text-foreground">
                  {evolve.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Launched a responsive site for a full-service salon and spa,
                  and reorganized its hair, waxing, and esthetics services. The
                  owners say fewer customers call to ask what they offer.
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
                    <span className="font-medium text-foreground">
                      Design & research:
                    </span>{" "}
                    Figma, FigJam, user interviews, usability testing,
                    prototyping, information architecture
                  </li>
                  <li>
                    <span className="font-medium text-foreground">
                      Code & 3D:
                    </span>{" "}
                    Next.js, React, React Three Fiber, Python, Blender
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Visual:</span>{" "}
                    Illustrator, Photoshop, InDesign, Procreate, Premiere Pro
                  </li>
                  <li>
                    <span className="font-medium text-foreground">
                      By hand:
                    </span>{" "}
                    laser cutting, painting
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
          <Heading
            level={2}
            id="chat"
            className="font-alayna-handwriting font-normal text-4xl sm:text-5xl"
          >
            Let&apos;s chat.
          </Heading>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Thanks for reading. I&apos;d love to walk you through any of these
            projects and talk about designing feel-good experiences at
            McDonald&apos;s.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Hi from McDonald's")}`}
              className="inline-flex h-11 items-center justify-center rounded-(--radius-default) px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: RED }}
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
