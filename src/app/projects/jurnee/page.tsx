import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { NextCaseStudy } from "@/components/sections/case-studies/NextCaseStudy";
import { cn } from "@/lib/utils";

/**
 * Jurnee: team entry for the Fall 2026 Designathon, placed 3rd.
 *
 * Sources: the team's final deck ("Jurnee — Find Your Jurnee", 11 slides)
 * and the Figma file's six "Screens" frames (exported at 3x, 1170×2532,
 * corners rounded to match the phone shape). The Figma screens are newer
 * than the deck's: Home shows Up next / Completed, checkpoints complete
 * with a photo, and Profile has a photo feed. Copy follows the Figma.
 *
 * Voice: plain sentence headings, short prose, no section labels. Nothing
 * here goes beyond the deck and the Figma file.
 *
 * TODO before publishing:
 *  - Fill in Alayna's role and the team (hero <dl>).
 *  - Optional: a short closing section in her own words (what she'd do
 *    differently, what the judges asked). Not written here because none
 *    of it is in the source material.
 */
export const metadata: Metadata = {
  title: "Jurnee",
  description:
    "A weekly set of experiences picked just for you, gone in seven days. 3rd place, Fall 2026 Designathon.",
};

/* ------------------------------------------------------------------ */
/* Assets                                                              */
/* ------------------------------------------------------------------ */

const D = "/images/projects/jurnee";

const SCREENS = {
  onboarding: {
    src: `${D}/onboarding@3x.webp`,
    alt: "Onboarding, question 3 of 5: 'Would you rather explore the ocean or the sky?' with illustrated cards for each, the sky selected.",
    label: "Onboarding",
    caption: "Five “Would you rather?” questions, like ocean or sky.",
  },
  compass: {
    src: `${D}/compass@3x.webp`,
    alt: "Weekly Compass: 'What kind of energy do you want this week?' with Outdoorsy and Creative selected, a distance slider set to about 5 miles, and a card offering to bring back a skipped open mic night.",
    label: "Weekly Compass",
    caption: "Saturday’s check-in. It can also bring back something you skipped.",
  },
  home: {
    src: `${D}/home@3x.webp`,
    alt: "Home: 'Week 46 Jurnee' with the hand-drawn tree inside a countdown ring showing 4 days 6 hrs left and 2 of 4 done, then Up next (pottery class, a new café, each with a camera button) and Completed (sunrise at Gallup Park, pickup basketball, each with its photo).",
    label: "Home",
    caption: "Time left at the top, then what’s next and what’s done.",
  },
  ascent: {
    src: `${D}/ascent@3x.webp`,
    alt: "Ascent: a purple mountain with checkpoints along a trail. Sunrise at Gallup and Pickup basketball are green and done, the avatar sits above them, and the Drop-in pottery class sheet is open with its reason and an Add photo to complete button.",
    label: "Ascent",
    caption: "The week as a mountain, one checkpoint per experience.",
  },
  leaderboard: {
    src: `${D}/leaderboard@3x.webp`,
    alt: "Leaderboard: weekly, annual and friends tabs, a podium with Maya R. crowned first, and a ranked list with the user in 6th at 2 of 4.",
    label: "Leaderboard",
    caption: "Weekly, annual and friends rankings. You can hide your age.",
  },
  profile: {
    src: `${D}/profile@3x.webp`,
    alt: "Profile for Joshua John: past Jurnees for weeks 45, 44 and 43, then the Jurnee feed with a completed post, a sunrise photo from Gallup Park.",
    label: "Profile",
    caption: "Past weeks, and a photo from everything you finished.",
  },
};

const LOGO = {
  src: `${D}/logo.jpg`,
  alt: "The Jurnee logo: a hand-painted purple letter J whose top branches into a tree, with green spring leaves and pink blossoms on the left, orange autumn leaves on the right, and bare winter branches at the edges.",
};

const PALETTE = [
  { name: "Lavender", hex: "#A38DD9" },
  { name: "Deep violet", hex: "#7A66B9" },
  { name: "Lilac", hex: "#DBD3F0" },
  { name: "Mist", hex: "#F7F4FB" },
  { name: "Ink", hex: "#29213E" },
  { name: "Leaf", hex: "#8AB66C" },
  { name: "Sun", hex: "#F8E8B6" },
];

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <Heading level={2} className="max-w-3xl text-3xl sm:text-[2.75rem] sm:leading-[1.1]">
      {children}
    </Heading>
  );
}

/** Body copy column: short paragraphs, comfortable measure. */
function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mt-6 max-w-[42rem] space-y-4 text-lg leading-relaxed text-muted-foreground", className)}>{children}</div>;
}

/** Screens are 1170×2532 (390×844 @3x) with rounded corners baked in. */
function Phone({
  screen,
  className,
  priority,
  sizes = "(min-width: 1024px) 300px, 33vw",
}: {
  screen: { src: string; alt: string };
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative aspect-[390/844] drop-shadow-[0_24px_36px_rgba(60,42,122,0.22)]", className)}>
      <Image src={screen.src} alt={screen.alt} fill priority={priority} sizes={sizes} className="object-contain" />
    </div>
  );
}

/** Layered mountain silhouette from the deck's title slide. */
function Mountains({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1456 300" preserveAspectRatio="none" className={className}>
      <path d="M0 180 L197 60 L355 172 L546 0 L742 180 L895 84 L1076 202 L1251 46 L1456 166 V300 H0 Z" fill="#DBD3F0" />
      <path d="M0 242 L227 136 L424 242 L651 106 L864 249 L1076 144 L1288 242 L1456 196 V300 H0 Z" fill="#c9bdea" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function JurneePage() {
  return (
    <div className="case-study bg-background">
      {/* ---------------------------------------------------------- HERO */}
      <Section className="pt-24 pb-0 sm:pt-32">
        <Link href="/#work" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← Back to Work
        </Link>

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Heading level={1} className="text-5xl sm:text-7xl">
              Jurnee
            </Heading>
            <span className="inline-flex items-center gap-1.5 self-center rounded-full bg-[#F8E8B6] px-3 py-1 text-xs font-semibold text-[#5b4a12] dark:bg-[#3a3218] dark:text-[#f3dd94]">
              <span aria-hidden="true">🏆</span> 3rd place
            </span>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <p className="mt-6 max-w-2xl text-xl text-foreground sm:text-2xl">
            An app that gives you a few things to go do each week, and takes them back if you don&rsquo;t.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <dl className="mt-10 grid max-w-4xl gap-6 border-t border-border pt-6 sm:grid-cols-4">
            <div>
              <dt><Label>Event</Label></dt>
              <dd className="mt-1 text-foreground">Fall 2026 Designathon, University of Michigan</dd>
            </div>
            <div>
              <dt><Label>Role</Label></dt>
              <dd className="mt-1 text-foreground">UX, on a team of five</dd>
            </div>
            <div>
              <dt><Label>We made</Label></dt>
              <dd className="mt-1 text-foreground">The concept, brand, a Figma prototype and the pitch deck</dd>
            </div>
            <div>
              <dt><Label>Toolkit</Label></dt>
              <dd className="mt-1 text-foreground">Figma, Procreate, Claude Code for Figma</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={140}>
          <div className="relative mt-14 overflow-hidden rounded-[28px] bg-[#F7F4FB] px-4 pt-12 sm:px-10 sm:pt-16 dark:bg-[#1f1a30]">
            <span aria-hidden="true" className="absolute -top-24 -right-16 size-80 rounded-full bg-[#DBD3F0] sm:size-[28rem] dark:bg-[#2c2445]" />
            <span aria-hidden="true" className="absolute top-10 left-[8%] size-16 rounded-full bg-[#F8E8B6] sm:size-24 dark:bg-[#4a4126]" />
            <Mountains className="absolute inset-x-0 bottom-0 h-[38%] w-full opacity-80 dark:opacity-25" />
            <div className="relative mx-auto flex max-w-4xl items-start justify-center gap-3 sm:gap-8">
              <Phone screen={SCREENS.compass} className="mt-16 w-[29%] -rotate-3 sm:mt-24" />
              <Phone screen={SCREENS.home} className="w-[33%]" priority />
              <Phone screen={SCREENS.ascent} className="mt-16 w-[29%] rotate-3 sm:mt-24" />
            </div>
            <div className="h-6 sm:h-10" />
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------- INTRO */}
      <Section className="pt-12 sm:pt-16">
        <Reveal>
          <Prose className="mt-0">
            <p>
              Jurnee is the app my team designed for the Fall 2026 Designathon at the University of Michigan, and it
              placed 3rd.
            </p>
            <p>
              We had four hours. I worked on UX alongside four teammates, a mix of engineers, designers and data
              scientists. When time was up, every team presented its slides to a panel of judges, professors from the
              School of Information.
            </p>
            <p>
              Every Sunday you get three to five things to do that week, picked from your interests, where you live,
              and what you&rsquo;ve done before. A sunrise at the park, a pottery class, pickup basketball. You do them
              in any order. On Saturday night the week ends, whatever you didn&rsquo;t get to disappears, and a new set
              shows up.
            </p>
          </Prose>
        </Reveal>
      </Section>

      {/* -------------------------------------------------------- THE LOOP */}
      <Section className="cs-band">
        <Reveal>
          <H2>We gave the list an expiration date</H2>
          <Prose>
            <p>
              The deadline is why it works. A list of things you&rsquo;d like to do someday is easy to keep putting
              off. A list that&rsquo;s gone in seven days isn&rsquo;t.
            </p>
            <p>
              Before your first week, a short onboarding asks a few &ldquo;Would you rather?&rdquo; questions to get a
              sense of you. After that, every week runs the same way:
            </p>
          </Prose>
          <ol className="mt-6 max-w-[42rem] list-decimal space-y-3 pl-6 text-lg leading-relaxed text-muted-foreground marker:font-semibold marker:text-foreground">
            <li>
              <span className="font-medium text-foreground">Saturday,</span>{" "}the Weekly Compass asks about your mood, how
              much energy you have, and how far you&rsquo;re willing to go.
            </li>
            <li>
              <span className="font-medium text-foreground">Sunday,</span>{" "}your Jurnee for the week appears.
            </li>
            <li>
              <span className="font-medium text-foreground">During the week,</span>{" "}you do them in whatever order you
              want. Your avatar climbs a little each time.
            </li>
            <li>
              <span className="font-medium text-foreground">When the week ends,</span>{" "}unfinished picks fade away and
              finished ones are kept as memories.
            </li>
            <li>
              <span className="font-medium text-foreground">Next week</span>{" "}is shaped by what you finished and what you
              skipped.
            </li>
          </ol>
        </Reveal>
      </Section>

      {/* ----------------------------------------------------- METAPHORS */}
      <Section>
        <Reveal>
          <H2>One picture for progress, one for time</H2>
          <Prose>
            <p>
              We kept these two apart on purpose. The mountain shows how much you&rsquo;ve done: each experience is a
              checkpoint, your photo moves up the trail as you finish them, and the summit means you did the whole week.
            </p>
            <p>
              The tree shows how much time is left. Its leaves fall with the clock, not with your progress, so it keeps
              counting down whether or not you&rsquo;ve done anything yet.
            </p>
          </Prose>
        </Reveal>
        <div className="mt-12 grid max-w-4xl grid-cols-2 gap-6 sm:gap-10">
          {[
            { screen: SCREENS.ascent, caption: "The mountain: how much you’ve done." },
            { screen: SCREENS.home, caption: "The tree, inside the countdown ring: how much time is left." },
          ].map((m, i) => (
            <Reveal key={m.caption} delay={i * 60}>
              <figure>
                <div className="rounded-[24px] bg-[#F7F4FB] px-6 py-8 sm:px-10 sm:py-10 dark:bg-[#1f1a30]">
                  <Phone screen={m.screen} className="mx-auto max-w-[260px]" sizes="(min-width: 640px) 260px, 40vw" />
                </div>
                <figcaption className="mt-3 text-sm text-muted-foreground">{m.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------- BRAND */}
      <Section className="cs-band">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <H2>The logo is a J with all four seasons in it</H2>
            <Prose>
              <p>
                It was hand-drawn in Procreate. The J grows into a tree with spring and summer leaves on one side, fall
                leaves on the other, and bare winter branches at the edges. The hook at the bottom curves back up, the
                way one week ends and the next one starts.
              </p>
              <p>The same tree sits inside the countdown ring on the home screen.</p>
            </Prose>
          </Reveal>
          <Reveal delay={60}>
            <figure>
              <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-[24px] bg-white ring-1 ring-black/5">
                <Image src={LOGO.src} alt={LOGO.alt} fill sizes="(min-width: 1024px) 420px, 90vw" className="object-contain" />
              </div>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={40}>
          <div className="mt-20 max-w-[42rem]">
            <h3 className="text-xl font-semibold text-foreground">Lavender, and almost nothing else</h3>
            <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
              We wanted it to feel soft enough to be friendly but grown-up enough for anyone from 16 to 60. Green shows up
              only when something is done, so it always means progress. Yellow is saved for the summit sun and the
              leaderboard crown.
            </p>
          </div>
          <ul className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-7">
            {PALETTE.map((c) => (
              <li key={c.hex}>
                <span aria-hidden="true" className="block aspect-square rounded-xl ring-1 ring-black/10 ring-inset" style={{ background: c.hex }} />
                <p className="mt-2 text-sm font-medium text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.hex}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ PROTOTYPE */}
      <Section>
        <Reveal>
          <H2>Six screens, from the first question to your profile</H2>
          <Prose>
            <p>We built the main flow in Figma.</p>
          </Prose>
        </Reveal>
        <ol className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {Object.values(SCREENS).map((s, i) => (
            <li key={s.src}>
              <Reveal delay={(i % 3) * 60}>
                <Phone screen={s} sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw" />
                <h3 className="mt-4 font-semibold text-foreground">{s.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.caption}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------------------------------------------------------- ASCENT */}
      <Section className="cs-band">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal className="order-last lg:order-first">
            <div className="rounded-[24px] bg-[#DBD3F0] px-6 py-10 dark:bg-[#2c2445]">
              <Phone screen={SCREENS.ascent} className="mx-auto w-[70%] max-w-[300px]" sizes="300px" />
            </div>
          </Reveal>
          <Reveal delay={60}>
            <H2>Every pick says why it&rsquo;s there</H2>
            <Prose>
              <p>
                The mountain is the screen with the most going on. Finished checkpoints turn green, your photo marks
                where you are, and the flag waits at the top.
              </p>
              <p>
                Tap a checkpoint and a card tells you why it was picked: &ldquo;Picked because you chose Creative and
                haven&rsquo;t tried working with your hands yet.&rdquo;
              </p>
              <p>
                To mark it done, you add a photo. That photo goes to the feed on your profile, so the week leaves
                something behind.
              </p>
            </Prose>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------- EXPANSION */}
      <Section>
        <Reveal>
          <H2>Where it could go next</H2>
          <Prose>
            <p>
              We pitched a few ideas past the app itself. Local studios, cafés and trailheads could host checkpoints and
              offer perks for reaching the summit, which also gives Jurnee a way to make money while keeping picks local.
            </p>
            <p>
              Universities could run shared mountains for first-years and clubs. Companies could sponsor team mountains
              with their own leaderboards. And each season could bring a special mountain, like winter firsts or summer
              outdoors.
            </p>
          </Prose>
          <p className="mt-12 max-w-[42rem] border-t border-border pt-5 text-sm text-muted-foreground">
            Some of the app screens were first generated with Claude Code for Figma, then designed and refined by our
            team. The logo was drawn by hand in Procreate.
          </p>
        </Reveal>
      </Section>

      <NextCaseStudy slug="jurnee" />
    </div>
  );
}
