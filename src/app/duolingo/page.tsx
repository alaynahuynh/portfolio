import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nunito } from "next/font/google";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DuoPath, DuoProfileCard } from "@/components/sections/duolingo/DuoHero";
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
 * A one-page pitch for Duolingo's Product Designer, Thrive internship
 * (Pittsburgh, Summer 2027; posting deadline Dec 9, 2026). Same bones as
 * /pinterest: a short intro, how I match the posting, a scannable index,
 * then each project with a "what feedback changed" panel.
 *
 * The posting asks for a portfolio of "one to two projects you've
 * independently driven", so MyMuseum and CoursePilot (both solo) lead,
 * then Nudge (it also values a team project) and the client site.
 *
 * Brand nods are limited to a color and a rounded, chunky style: no owl,
 * logo, or Duolingo artwork. Unlisted (not in the nav, not indexed).
 * Every claim comes from the case studies; nothing is invented.
 */
export const metadata: Metadata = {
  title: "Hey Duolingo",
  description:
    "Why Alayna Huynh, a sophomore product designer who also builds, would love to design at Duolingo.",
  robots: { index: false, follow: true },
};

/** Rounded, heavy display face for the hero headline only. */
const rounded = Nunito({ subsets: ["latin"], weight: ["800", "900"] });

/** Duolingo-style green, with dark green text (white on this green fails contrast). */
const GREEN = "#58CC02";
const INK = "#123300";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const pitch: Segment[][] = [
  [
    { text: "I'm " },
    { text: "Alayna Huynh", strong: true },
    {
      text: ", a sophomore studying UX design at the University of Michigan, and I'd love to spend ",
    },
    { text: "Summer 2027 designing at Duolingo", strong: true },
    { text: "." },
  ],
  [
    {
      text: "Without planning it, most of what I design ends up being about learning. CoursePilot helps students decide what to study tonight. Nudge turns a stressful to-do list into ",
    },
    { text: "one small step a day", strong: true },
    {
      text: ". MyMuseum gives artists a better way to show what they've made.",
    },
  ],
  [
    {
      text: "I talk to the people I design for, let what they tell me change the plan, and build what I design so the details make it all the way to launch.",
    },
  ],
];

/** The posting's asks, each answered with something on this page. */
const fit = [
  {
    ask: "A second-year student graduating in 2029",
    answer:
      "Sophomore at the University of Michigan, studying UX Design with an Industrial Design minor.",
  },
  {
    ask: "One to two projects you've independently driven",
    answer:
      "MyMuseum and CoursePilot: I ran the research, designed them, and tested them myself.",
    href: "#mymuseum",
  },
  {
    ask: "Designing screens in Figma",
    answer:
      "CoursePilot's clickable prototype and Nudge's app screens, both in Figma.",
    href: "#coursepilot",
  },
  {
    ask: "Existing UI projects",
    answer:
      "Two live sites I designed and built: MyMuseum and Vietnamese Noodle House.",
    href: "#vietnamese-noodle-house",
  },
  {
    ask: "Experience on a group project",
    answer:
      "Nudge, with a PM, another designer, and a developer. My interviews reframed what we built.",
    href: "#nudge",
  },
];

/** Solo projects first, as the posting asks. */
const work = [
  "mymuseum",
  "coursepilot",
  "nudge",
  "vietnamese-noodle-house",
].map((slug) => pitchWork[slug]);

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function DuolingoPage() {
  return (
    <div className="bg-background">
      {/* Hero: white like the app, with her own path drawn as Duolingo-style steps */}
      <section className="relative overflow-hidden rounded-b-[32px] border-b-2 border-[#E5E5E5] bg-white text-[#4B4B4B] sm:rounded-b-[48px] dark:border-[#37464F] dark:bg-[#131F24] dark:text-[#DCE6EC]">
        <Container className="pt-32">
          <div className="mx-auto grid min-h-[calc(100svh-8rem)] max-w-6xl items-center gap-12 pb-24 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
            <div className="text-center lg:text-left">
              <p className="font-alayna-handwriting text-4xl text-[#777] sm:text-5xl dark:text-[#AFC0C9]">
                hey Duolingo,
              </p>
              <h1
                className={cn(
                  rounded.className,
                  "mt-3 text-[3.25rem] leading-[0.95] font-black tracking-tight text-balance text-[#58A700] sm:text-7xl lg:text-[5.25rem] dark:text-[#58CC02]",
                )}
              >
                Let&apos;s start a streak.
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
                I&apos;ve been learning with Duolingo since 2017. Now I&apos;d
                love to design for it, as a Product Designer, Thrive intern.
              </p>
              <div className="mt-8">
                <DuoProfileCard fontClassName={rounded.className} />
              </div>
            </div>

            <DuoPath />
          </div>
        </Container>

        {/* Short hand-drawn arrow, bottom center (same as /pinterest). */}
        <a
          href="#pitch"
          aria-label="Scroll to my pitch"
          className="group absolute bottom-5 left-1/2 -translate-x-1/2 text-[#AFAFAF] transition-colors hover:text-[#58A700] sm:bottom-7"
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

        {/* How I match the posting: its asks, answered */}
        <section
          aria-labelledby="fit"
          className="mx-auto mt-20 max-w-6xl sm:mt-28"
        >
          <Heading level={2} id="fit" className="font-heading">
            How I fit the Thrive internship
          </Heading>
          <p className="mt-2 text-lg text-muted-foreground">
            What the role asks for, and where to see it here.
          </p>
          {/* Two wide tiles over three (6-col grid), so five tiles leave no gap. */}
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {fit.map((item, i) => {
              const body = (
                <>
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full shadow-[0_3px_0_rgb(0_0_0/0.15)]"
                    style={{ backgroundColor: GREEN, color: INK }}
                  >
                    <Check className="size-5" strokeWidth={3} />
                  </span>
                  <span>
                    <span className={cn(KICKER, "block")}>{item.ask}</span>
                    <span className="mt-2 block leading-relaxed text-foreground">
                      {item.answer}
                    </span>
                    {item.href && (
                      <span className="mt-2 inline-block text-sm font-medium text-sage-deep">
                        See it below ↓
                      </span>
                    )}
                  </span>
                </>
              );
              const tile =
                "flex h-full gap-4 rounded-[20px] border-2 border-border bg-background p-5 shadow-[0_5px_0_var(--color-border)]";
              return (
                <li
                  key={item.ask}
                  className={cn(
                    "h-full",
                    i === 0 && "sm:col-span-2 lg:col-span-3",
                    i === 1 && "lg:col-span-3",
                    i > 1 && "lg:col-span-2",
                  )}
                >
                  <Reveal delay={i * 60} className="h-full">
                    {item.href ? (
                      <a
                        href={item.href}
                        className={cn(
                          tile,
                          "transition-[translate,box-shadow] duration-(--duration-base) ease-(--ease-soft) hover:translate-y-[2px] hover:shadow-[0_3px_0_var(--color-border)]",
                        )}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={tile}>{body}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
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
            Two projects I drove myself, then a team project and a client site.
            Click any clip for the full case study.
          </p>

          <div className="mt-12 space-y-24 sm:mt-16 md:space-y-[140px]">
            {work.map((entry, i) => (
              <WorkSection key={entry.slug} entry={entry} index={i} />
            ))}
          </div>
        </section>
      </Container>

      <Container className="pb-20 sm:pb-28">
        {/* A little more: extras */}
        <section
          id="more"
          aria-labelledby="more-title"
          className="mx-auto mt-24 max-w-6xl scroll-mt-28 sm:mt-32"
        >
          <Heading level={2} id="more-title" className="font-heading">
            A little more about me
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
            projects and talk about designing for learners at Duolingo.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Hi from Duolingo")}`}
              className={cn(
                rounded.className,
                "inline-flex h-12 items-center justify-center rounded-2xl px-7 text-base font-extrabold tracking-wide uppercase shadow-[0_4px_0_#46A302] transition-[translate,box-shadow] hover:translate-y-[2px] hover:shadow-[0_2px_0_#46A302]",
              )}
              style={{ backgroundColor: GREEN, color: INK }}
            >
              Email me
            </a>
            <ResumeLink className="inline-flex h-12 items-center justify-center rounded-2xl border-2 border-border bg-background px-6 text-sm font-medium text-foreground shadow-[0_4px_0_var(--color-border)] transition-[translate,box-shadow] hover:translate-y-[2px] hover:shadow-[0_2px_0_var(--color-border)]">
              Resume ↗
            </ResumeLink>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-2xl px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              See my full portfolio
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
