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
 * A one-page pitch written for Pinterest's product design internship.
 * Order: a short personal intro, what I'd bring (each point linked to its
 * proof), a scannable index of the work, then each project as its
 * Selected Works clip, a short story, and a "what feedback changed" panel
 * of real screens. The "board" idea carries through the hero collage and
 * the small masonry board of extras.
 *
 * Unlisted (not in the nav, not indexed) and shared by link. Every claim
 * comes from the résumé or the case studies (src/data/case-studies,
 * src/app/projects/nudge); nothing is invented.
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
    proof: { label: "MyMuseum", href: "#mymuseum" },
  },
  {
    title: "I design AI people can check.",
    body: "In CoursePilot, answers show their sources, tasks explain their ranking, and nothing changes until the student approves it.",
    proof: { label: "CoursePilot", href: "#coursepilot" },
  },
  {
    title: "I work well across roles.",
    body: "On a team with a PM, another designer, and a developer, my interviews reframed what we built. With clients, I design inside the tools they already run on.",
    proof: { label: "Nudge", href: "#nudge" },
  },
  {
    title: "I build what I design.",
    body: "Two of these projects are live sites I built myself, so I know what's hard to build and where the details get lost.",
    proof: { label: "Noodle House", href: "#vietnamese-noodle-house" },
  },
];

type Shot = { src: string; alt: string; label: string; caption: string; width: number; height: number; position?: string };

type Highlight = {
  kicker: string;
  title: string;
  /** Before → after screens. `phone` lays them out as two tall frames. */
  shots?: { before: Shot; after: Shot; phone?: boolean };
  /** Before → after text (used where the change was the problem itself). */
  statements?: { before: { label: string; text: string }; after: { label: string; text: string } };
  /** Short design rules, shown as chips above the rows. */
  principles?: string[];
  rowsLabel: string;
  rows: { heard: string; changed: string }[];
};

type WorkEntry = {
  slug: string;
  year: string;
  /** Short label for the index, e.g. "Live product". */
  type: string;
  /** The one result a recruiter should leave with. */
  result: string;
  headline: string;
  summary: string;
  facts: { label: string; value: string }[];
  did: string[];
  metrics: { value: string; label: string }[];
  highlight: Highlight;
  liveUrl?: string;
};

const work: WorkEntry[] = [
  {
    slug: "mymuseum",
    year: "2026",
    type: "Live product",
    result: "4 of 4 test findings shipped",
    headline: "Turning online art portfolios into galleries you can walk through.",
    summary:
      "Artists share their work as flat grids that lose its scale and order. After interviewing 5 artists, I designed and built a live platform that turns their uploads into a walkable 3D museum they can share by link.",
    facts: [
      { label: "Role", value: "Solo designer & developer" },
      { label: "Format", value: "Live web product" },
    ],
    did: ["User interviews", "Usability testing", "Interaction design", "3D web", "Next.js", "React Three Fiber"],
    metrics: [
      { value: "5", label: "artist interviews" },
      { value: "5", label: "usability participants" },
      { value: "4 / 4", label: "findings shipped as changes" },
    ],
    highlight: {
      kicker: "What testing changed",
      title: "Five testers, four problems, four shipped fixes.",
      shots: {
        before: {
          src: "/images/projects/mymuseum/history/aug-one-room.jpg",
          alt: "An early MyMuseum room: a visitor's humanoid avatar alone in one large, dark room.",
          label: "Before",
          caption: "One big room for every collection",
          width: 2940,
          height: 1520,
        },
        after: {
          src: "/images/projects/mymuseum/final/grid-view.png",
          alt: "MyMuseum's Grid View: a museum's full collection as cards with thumbnails, titles, and View artwork links, with an Enter 3D Gallery button.",
          label: "After",
          caption: "Grid View, so no piece is 3D-only",
          width: 2940,
          height: 1592,
          position: "object-left-top",
        },
      },
      rowsLabel: "What testers said → what shipped",
      rows: [
        { heard: "“A huge room was given for only 5 pieces of art.”", changed: "Rooms that size themselves to the collection" },
        { heard: "Walking through a room, visitors “would end up missing some.”", changed: "A Grid View of the whole collection" },
        { heard: "The avatars felt basic, with no theme of their own.", changed: "Simple shape avatars you can customize" },
        { heard: "Testers wanted to comment on a piece privately.", changed: "Museum Mail: private messages to the artist" },
      ],
    },
    liveUrl: "https://mymuseum-eta.vercel.app/",
  },
  {
    slug: "coursepilot",
    year: "2026",
    type: "AI product · Figma prototype",
    result: "Tested with 5 students",
    headline: "Turning scattered Canvas information into answers students can act on.",
    summary:
      "Students miss announcements and struggle to decide what to do first. From 5 student interviews, I designed an AI planning assistant inside Canvas that turns scattered course information into plans students can check and change.",
    facts: [
      { label: "Role", value: "Solo product designer" },
      { label: "Format", value: "Figma prototype" },
    ],
    did: ["User interviews", "Usability testing", "AI interaction design", "Figma prototyping"],
    metrics: [
      { value: "5", label: "student interviews" },
      { value: "5", label: "usability sessions" },
      { value: "5", label: "issues found to redesign next" },
    ],
    highlight: {
      kicker: "Designing the AI",
      title: "From a chat paragraph to a plan you can check.",
      shots: {
        before: {
          src: "/images/projects/coursepilot/iteration/plan-my-night-early.png",
          alt: "Early CoursePilot answer to 'I have 3 hours tonight. What should I work on?': a plain paragraph listing a schedule as text.",
          label: "Early",
          caption: "A chat-style paragraph, hard to scan",
          width: 990,
          height: 750,
        },
        after: {
          src: "/images/projects/coursepilot/iteration/plan-my-night-final.png",
          alt: "Final CoursePilot answer: ranked tasks with due dates, time estimates and 'Why this?' links, a 3-hour plan, Add to My Calendar and Adjust Plan buttons, and source links.",
          label: "Final",
          caption: "Ranked tasks, a plan, sources, and controls",
          width: 990,
          height: 750,
        },
      },
      principles: ["Sources on every answer", "“Why this?” on every task", "Nothing changes until you approve"],
      rowsLabel: "What testing showed → what I'm changing next",
      rows: [
        { heard: "P1: “Wait, why is this assignment first?”", changed: "Show the deciding factor on the task itself, not behind a click" },
        { heard: "P4 found the source, but: “I'd still want to know if it's missing anything.”", changed: "Show each grade calculation's assumptions and missing inputs" },
      ],
    },
  },
  {
    slug: "vietnamese-noodle-house",
    year: "2026",
    type: "Shipped client site",
    result: "Wrong-location orders ~8 → ~1 a month",
    headline: "Helping a family restaurant's customers order from the right location.",
    summary:
      "A family restaurant with two locations and a food truck kept getting orders at the wrong one. I audited the old site, then redesigned and built a new one that works inside the restaurant's existing ordering platforms.",
    facts: [
      { label: "Role", value: "Solo designer & developer" },
      { label: "Worked with", value: "The restaurant's owners" },
    ],
    did: ["UX audit", "Information architecture", "Responsive design", "Next.js", "Client work"],
    metrics: [
      { value: "~8 → ~1", label: "wrong-location orders a month, per the owners" },
      { value: "~50", label: "menu items, moved out of an 11-page PDF" },
    ],
    highlight: {
      kicker: "Working with the owners",
      title: "One extra tap, on purpose.",
      shots: {
        phone: true,
        before: {
          src: "/images/projects/vnh/before/old-site-mobile.png",
          alt: "The old site on a phone: a gray banner and one separate ordering button per location.",
          label: "Before",
          caption: "One ordering button per location",
          width: 1226,
          height: 2340,
          position: "object-top",
        },
        after: {
          src: "/images/projects/vnh/locations/mobile-bottom-sheet.png",
          alt: "The new site on a phone: after choosing Camillus, a sheet slides up saying 'You're ordering from Camillus' with Continue to order and Change location.",
          label: "After",
          caption: "Pick a location, then confirm it",
          width: 780,
          height: 1688,
          position: "object-bottom",
        },
      },
      rowsLabel: "What I heard and found → what shipped",
      rows: [
        { heard: "The owners: customers kept ordering from the wrong location.", changed: "A select-then-confirm step before checkout" },
        { heard: "The menu was an 11-page PDF.", changed: "One responsive menu page with a sticky category nav" },
        { heard: "The contact form said “Message sent!” but never sent anything.", changed: "A form that actually reaches the owners" },
      ],
    },
    liveUrl: "https://vietnoodlehouse.com/",
  },
  {
    slug: "nudge",
    year: "2026",
    type: "Team project",
    result: "My interviews reframed the problem",
    headline: "Helping first-time study abroad students get their travel-health prep done on time.",
    summary:
      "For the Business+Tech Innovation Jam, my team set out to help travelers find the vaccines and health steps they need. I ran our customer interviews, designed the app screens in Figma, and designed our pitch deck.",
    facts: [
      { label: "Role", value: "UX/UI designer" },
      { label: "Team", value: "PM, 2 designers, developer" },
    ],
    did: ["Customer interviews", "Personas", "Figma", "Pitch deck design"],
    metrics: [
      { value: "5", label: "customer interviews I ran" },
      { value: "7 → 3", label: "user needs cut down to MVP features" },
    ],
    highlight: {
      kicker: "What my interviews changed for the team",
      title: "Information wasn't the problem. Urgency was.",
      statements: {
        before: {
          label: "Week 1 · Before interviews",
          text: "Travelers can't tell which health advice applies to them, because it's scattered and not personalized.",
        },
        after: {
          label: "Week 2 · After interviews",
          text: "First-time study abroad students keep putting prep off: there's no clear deadline, their records are with their parents, and trusted sources feel too technical.",
        },
      },
      rowsLabel: "What students said → what the team changed",
      rows: [
        { heard: "Students had the information, but nothing pushed them to act.", changed: "A planner built around one small step a day" },
        { heard: "Students and parents trust the university most.", changed: "Our employer persona became a study abroad coordinator" },
      ],
    },
  },
];

/** Index row with no section of its own (no case study yet). */
const evolve = { year: "2025", title: "Evolve Salon & Spa", type: "Launched client site", result: "Fewer “what do you offer?” calls" };

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

/** Index row: what it is and the one result worth remembering, so the
 * whole body of work can be scanned before scrolling into it. */
function IndexRow({
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
        style={{ "--hl": tint } as React.CSSProperties}
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
                  <a
                    href={item.proof.href}
                    className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-sage-deep"
                  >
                    See it in {item.proof.label}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:translate-y-0.5"
                    >
                      ↓
                    </span>
                  </a>
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
