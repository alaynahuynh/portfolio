import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyFullImage } from "@/components/sections/case-studies/media/CaseStudyMedia";
import { NextCaseStudy } from "@/components/sections/case-studies/NextCaseStudy";
import type { CaseStudyImageSpec } from "@/types/case-study";
import { cn } from "@/lib/utils";

/**
 * Featured in Selected Works (see data/projects.ts). Still to update:
 * the Jam result after the Nov 18 finale, final team credits, and the
 * app screens, which should be Alayna's own Figma exports (TODO on PHONES).
 *
 * Sources: the team's weekly Jam deliverables (Week 1 Discover, Week 2
 * Validate, Week 3 Solution), the final pitch deck, and Alayna's account
 * of her role (customer interviews, app screens, deck design). Nothing
 * else is claimed. Health facts on the screens (e.g. yellow fever 10+
 * days before travel) should be re-checked against the CDC Brazil page.
 */
export const metadata: Metadata = {
  title: "Nudge",
  description:
    "A travel-health planner for first-time study abroad students, designed for the Business+Tech Innovation Jam 2026.",
};

/* ------------------------------------------------------------------ */
/* Assets                                                              */
/* ------------------------------------------------------------------ */

const img = (name: string, alt: string, width: number, height: number): CaseStudyImageSpec => ({
  src: `/images/projects/nudge/${name}`,
  alt,
  width,
  height,
});

const DECK = {
  title: img(
    "deck-title.jpg",
    "Pitch deck title slide: 'Nudge. Clear your health check before you clear security.' beside Heartie, a smiling pink heart.",
    1920,
    1080,
  ),
  josh: img(
    "deck-josh.jpg",
    "Deck slide introducing Josh, 19, studying abroad in Brazil, with the quote 'My mom has a folder.'",
    1920,
    1080,
  ),
  reasons: img("deck-reasons.jpg", "Deck slide 'Why students put it off': no deadline, no history, hard to reach.", 1920, 1080),
  features: img(
    "deck-features.jpg",
    "Deck slide 'Three features, one for each reason students stall', with each reason crossed out next to its feature.",
    1920,
    1080,
  ),
};

/** TODO before publishing: replace with Alayna's own Figma exports. */
const PHONES = {
  home: {
    src: "/images/projects/nudge/phone-home.png",
    alt: "Home screen: a 'Brazil in 42 days' countdown, Heartie greeting Josh, and today's one step, booking a yellow fever shot, with a CDC source tag.",
  },
  trip: {
    src: "/images/projects/nudge/phone-trip.png",
    alt: "Trip plan screen: steps grouped by how far before departure they're due, with MMR and tetanus marked done from a MyChart import.",
  },
  log: {
    src: "/images/projects/nudge/phone-log.png",
    alt: "Logging screen: Vaccine, Yellow fever, Booked for Jan 23, then Save to my trip.",
  },
};

/* ------------------------------------------------------------------ */
/* Content (from the Jam deliverables)                                 */
/* ------------------------------------------------------------------ */

const INSIGHTS = [
  {
    title: "Nothing forces it.",
    body: "Visa, housing, and course approvals all have hard deadlines. Health prep doesn't, so it keeps getting pushed back.",
  },
  {
    title: "The records are at home.",
    body: "Students didn't know which vaccines they'd had. Their records were with a parent or a doctor's office.",
  },
  {
    title: "Long packets get skimmed.",
    body: "When a program sent a long health packet, students skimmed it and assumed someone would flag anything important.",
  },
  {
    title: "Trusted means hard to reach.",
    body: "Students trusted their doctor most but wouldn't book an appointment just to ask about a trip. Google and TikTok were quick, but not trusted.",
  },
];

const STATEMENTS = {
  before:
    "I am an international traveler, trying to prepare for my trip and understand what vaccines and health precautions I need, but I struggle to figure out which recommendations actually apply to me, because the information is spread across different sources and is not personalized, which makes me feel confused and unprepared.",
  after:
    "I am a college student traveling abroad on my own for the first time, trying to get ready for my trip, but I keep putting it off or giving up partway, because health prep has no clear deadline, I don't know my own vaccine history, and the sources I trust are either too long and technical or need a doctor's appointment, which makes me feel unsure whether I'm actually prepared, dependent on my parents, and not ready to handle getting sick abroad.",
};

const PERSONAS = [
  {
    tag: "Primary",
    name: "Josh, 19",
    role: "First-time study abroad student",
    story:
      "Heading to Brazil next semester. It's the first trip he's planning himself, and his to-do list is full of deadlines that aren't health.",
    pains: [
      "Health prep has no deadline, so visa and housing come first",
      "Doesn't know his vaccine history",
      "Skims long, jargon-heavy pages",
      "Didn't know travel clinics existed",
    ],
    designFor: "A short checklist with due dates, and records he doesn't have to dig up.",
  },
  {
    tag: "Secondary",
    name: "Rachel, 39",
    role: "Long-distance family caregiver",
    story:
      "Helps her 68-year-old mom get ready for yearly trips to Vietnam, from another state, often learning key details the day before the flight.",
    pains: [
      "Her mom's records are scattered",
      "Conflicting info online and in the family group chat",
      "Searches for info in Vietnamese",
    ],
    designFor: "A shared checklist with her mom's consent, translations, and no medical decisions made for her mom.",
  },
  {
    tag: "Secondary",
    name: "Marcus, 41",
    role: "Study abroad health & safety coordinator",
    story:
      "Prepares hundreds of students a semester. Sends packets and CDC links, but can't see who actually finished until something goes wrong.",
    pains: [
      "Students skim pre-departure emails",
      "No way to see who's done",
      "Answers the same questions over and over",
    ],
    designFor: "A dashboard that shows done or not done, without exposing anyone's medical details.",
  },
];

/** Week 3: 7 needs → 7 features → MVP. `mvp` groups needs into the
 * three MVP features; `later` ones were kept off the MVP. */
const NEEDS = [
  { need: "A deadline and reminders", feature: "Countdown from the departure date, with push and email reminders", mvp: "Countdown timeline" },
  { need: "Vaccine history without asking mom", feature: "Import from MyChart, or a one-tap request to a parent", mvp: "Vaccine record import" },
  { need: "Plain language, not long pages", feature: "Short checklist: what to do, why, and by when", mvp: "Personalized, cited checklist" },
  { need: "Trusted answers without an appointment", feature: "Every item cites the CDC or WHO; no ads", mvp: "Personalized, cited checklist" },
  { need: "Guidance for his trip specifically", feature: "Trip profile: destination, dates, activities, allergies, meds", mvp: "Personalized, cited checklist" },
  { need: "Where to get vaccines near campus", feature: "Clinic finder for travel clinics and pharmacies", mvp: null },
  { need: "A plan if he gets sick abroad", feature: "Local clinics, insurance steps, and an allergy and med card", mvp: null },
];

type Mark = "yes" | "part" | "no";
const COMPETITORS = ["Nudge", "CDC", "Passport Health", "Intl. SOS", "GeoBlue", "Sitata"];
const MATRIX: [string, Mark[]][] = [
  ["Personalized by trip", ["yes", "part", "yes", "part", "no", "yes"]],
  ["Plain-language checklist", ["yes", "no", "part", "part", "no", "part"]],
  ["Countdown + reminders", ["yes", "no", "part", "no", "no", "part"]],
  ["Vaccine record import", ["yes", "no", "part", "no", "no", "no"]],
  ["Clinic finder near campus", ["yes", "part", "yes", "no", "no", "no"]],
  ["Cited sources, no ads", ["yes", "yes", "part", "part", "part", "part"]],
  ["Care abroad + insurance", ["yes", "part", "no", "yes", "yes", "yes"]],
  ["Family / program sharing", ["yes", "no", "no", "part", "no", "part"]],
];

const DECISIONS = [
  {
    from: "Long packets get skimmed",
    title: "One step at a time, not a list.",
    body: "Home shows a single step for today, so there's nothing to skim. The full plan is one tap away.",
  },
  {
    from: "Nothing forces it",
    title: "Every step has a due date, counted back from the flight.",
    body: "Health prep gets the same kind of deadline as the visa, so it stops slipping to the bottom.",
  },
  {
    from: "Trusted means hard to reach",
    title: "Every step shows where it came from.",
    body: "A CDC or WHO tag on each step gives the trust of a doctor's answer without booking an appointment.",
  },
  {
    from: "The records are at home",
    title: "Imported records show up as already done.",
    body: "Pulling records from MyChart clears steps before Josh even starts, so the plan opens shorter, not longer.",
  },
];

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

const ACCENT = "text-[#6249d6] dark:text-[#b8a9ff]";

function Label({ children, accent, className }: { children: React.ReactNode; accent?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "text-xs font-semibold tracking-[0.14em] uppercase",
        accent ? ACCENT : "text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase before:h-px before:w-6 before:bg-current before:opacity-50",
        ACCENT,
      )}
    >
      {children}
    </p>
  );
}

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
        {title}
      </Heading>
      {children && <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{children}</p>}
    </Reveal>
  );
}

function Phone({ phone, className, priority }: { phone: { src: string; alt: string }; className?: string; priority?: boolean }) {
  return (
    <div className={cn("relative aspect-[500/1090] drop-shadow-[0_28px_40px_rgba(60,40,140,0.22)]", className)}>
      <Image src={phone.src} alt={phone.alt} fill priority={priority} sizes="(min-width: 1024px) 320px, 33vw" className="object-contain" />
    </div>
  );
}

function MarkIcon({ mark }: { mark: Mark }) {
  const label = mark === "yes" ? "Yes" : mark === "part" ? "Partly" : "No";
  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "inline-block size-3.5 rounded-full",
        mark === "yes" && "bg-[#6249d6] dark:bg-[#b8a9ff]",
        mark === "part" && "bg-[linear-gradient(90deg,#6249d6_50%,transparent_50%)] ring-[1.5px] ring-[#6249d6] dark:bg-[linear-gradient(90deg,#b8a9ff_50%,transparent_50%)] dark:ring-[#b8a9ff]",
        mark === "no" && "ring-[1.5px] ring-muted-foreground/45",
      )}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function NudgePage() {
  return (
    <div className="case-study bg-background">
      {/* ---------------------------------------------------------- HERO */}
      <Section className="pt-24 pb-0 sm:pt-32">
        <Link href="/#work" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← Back to Work
        </Link>

        <Reveal>
          <p className="mt-10 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Product Design · Customer Research · Pitch Design
          </p>
          <Heading level={1} className="mt-2 text-5xl sm:text-7xl">
            Nudge
          </Heading>
        </Reveal>
        <Reveal delay={60}>
          <p className="mt-6 max-w-2xl text-xl text-foreground sm:text-2xl">
            Helping first-time study abroad students get their travel-health prep done before the flight, not the
            night before.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <dl className="mt-10 grid max-w-4xl gap-6 border-t border-border pt-6 sm:grid-cols-4">
            <div>
              <dt><Label>My role</Label></dt>
              <dd className="mt-1 text-foreground">UX/UI Designer</dd>
            </div>
            <div>
              <dt><Label>I did</Label></dt>
              <dd className="mt-1 text-foreground">Customer interviews, app screens, pitch deck design</dd>
            </div>
            <div>
              {/* TODO before publishing: confirm the final team list and credits. */}
              <dt><Label>Team</Label></dt>
              <dd className="mt-1 text-foreground">Product manager, two UX/UI designers, developer</dd>
            </div>
            <div>
              <dt><Label>Context</Label></dt>
              <dd className="mt-1 text-foreground">Business+Tech Innovation Jam · 6 weeks · Fall 2026</dd>
            </div>
          </dl>
        </Reveal>

        {/* Designed hero: the three screens on the deck's own palette. */}
        <Reveal delay={140}>
          <div className="relative mt-14 overflow-hidden rounded-[28px] bg-[#f1eff9] px-4 pt-12 sm:px-10 sm:pt-16">
            <span aria-hidden="true" className="absolute -top-24 -right-16 size-80 rounded-full bg-[#d8cff7] sm:size-[28rem]" />
            <span aria-hidden="true" className="absolute -bottom-40 -left-20 size-80 rounded-full bg-[#f6d3ee] sm:size-[26rem]" />
            <span aria-hidden="true" className="absolute right-[18%] -bottom-24 size-56 rounded-full bg-[#dcefeb]" />
            <div className="relative mx-auto flex max-w-4xl items-start justify-center gap-3 sm:gap-8">
              <Phone phone={PHONES.trip} className="mt-16 w-[29%] -rotate-3 sm:mt-24" />
              <Phone phone={PHONES.home} className="w-[33%]" priority />
              <Phone phone={PHONES.log} className="mt-16 w-[29%] rotate-3 sm:mt-24" />
            </div>
            <div className="h-6 sm:h-10" />
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------- AT A GLANCE */}
      <Section className="pt-12 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <Label>The problem</Label>
            <p className="mt-3 text-lg text-muted-foreground">
              Only <span className="font-semibold text-foreground">40–56% of international travelers</span>{" "}get any
              health advice before they go (Zimmermann et al., 2016). The guidance is free and public. It&rsquo;s just
              long, technical, and not personal, so people put it off until it&rsquo;s too late for vaccines that need
              lead time.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <dl className="grid grid-cols-3 divide-x divide-border border-y border-border">
              {[
                ["5", "customer interviews I ran"],
                ["7 → 3", "user needs cut down to MVP features"],
                ["6 min", "pitch, plus 7 min of judges' Q&A"],
              ].map(([value, label]) => (
                <div key={label} className="px-4 py-5 first:pl-0">
                  <dt className="sr-only">{label}</dt>
                  <dd className={cn("font-heading text-3xl font-semibold whitespace-nowrap sm:text-4xl", ACCENT)}>{value}</dd>
                  <dd className="mt-1 text-sm text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
            {/* TODO after Nov 18: add the Jam result here. */}
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------ INTERVIEWS */}
      <Section className="cs-band">
        <SectionIntro eyebrow="01 · What I heard" title={<>&ldquo;My mom has a folder.&rdquo;</>}>
          We started out designing for every international traveler. Then I ran five customer interviews. All three
          undergraduates said a parent or their program handles health prep, and that they wouldn&rsquo;t know what
          to do on their own. One didn&rsquo;t know his vaccine history because his mom keeps it in a folder.
        </SectionIntro>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INSIGHTS.map((insight, i) => (
            <Reveal key={insight.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6">
                <p className={cn("font-heading text-3xl font-semibold", ACCENT)}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{insight.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{insight.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------- REFRAME */}
      <Section>
        <SectionIntro eyebrow="02 · Reframing" title="Information wasn’t the problem. Urgency was.">
          We had assumed people skipped health prep because the information was scattered. The interviews showed it
          was really about timing and trust, so we rewrote our problem statement.
        </SectionIntro>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal delay={40}>
            <div className="h-full rounded-2xl border border-border p-6 sm:p-8">
              <Label>Week 1 · Before interviews</Label>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{STATEMENTS.before}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-2xl border-2 border-[#6249d6]/40 bg-[#f6f3ff] p-6 sm:p-8 dark:border-[#b8a9ff]/40 dark:bg-[#1d1f3d]">
              <Label accent>Week 2 · After interviews</Label>
              <p className="mt-4 text-lg leading-relaxed text-foreground">{STATEMENTS.after}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------------------------------- PERSONAS */}
      <Section className="cs-band">
        <SectionIntro eyebrow="03 · Personas" title="Built for the student. Trusted by the people around them.">
          The interviews also changed who surrounds Josh. Our employer persona became a study abroad coordinator,
          since students and parents trust their university most. Our caregiver persona gained a need for consent
          and translation.
        </SectionIntro>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_1fr_1fr]">
          {PERSONAS.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-6",
                  i === 0 ? "border-[#f4c13a] bg-[#fdf4d8] dark:border-[#f4c13a]/50 dark:bg-[#2b2716]" : "border-border bg-surface",
                )}
              >
                <Label accent={i === 0}>{p.tag}</Label>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-foreground">{p.name}</h3>
                <p className="text-sm font-medium text-foreground/70">{p.role}</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">{p.story}</p>
                <ul className="mt-4 space-y-1.5 text-[0.9375rem] text-foreground">
                  {p.pains.map((pain) => (
                    <li key={pain} className="flex gap-2">
                      <span aria-hidden="true" className="text-muted-foreground">–</span>
                      {pain}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <p className="border-t border-border/80 pt-4 text-[0.9375rem] text-foreground">
                    <span className={cn("font-semibold", ACCENT)}>Design for: </span>
                    {p.designFor}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------- NEEDS → MVP */}
      <Section>
        <SectionIntro eyebrow="04 · Scoping" title="Seven needs, three features.">
          We turned Josh&rsquo;s pain points into seven needs and a feature for each. For the MVP, we kept the three
          that answer the reasons students stall, and saved the rest for later.
        </SectionIntro>
        <Reveal delay={60}>
          {/* Mobile: stacked rows, so the MVP answer is never off-screen. */}
          <ul className="mt-10 divide-y divide-border border-y border-border sm:hidden">
            {NEEDS.map((row) => (
              <li key={row.need} className="py-4">
                <p className="font-medium text-foreground">{row.need}</p>
                <p className="mt-1 text-[0.9375rem] text-muted-foreground">{row.feature}</p>
                <p className="mt-2">
                  {row.mvp ? (
                    <span className="inline-flex rounded-full bg-[#ece8fd] px-3 py-1 text-sm font-semibold text-[#4a33b8] dark:bg-[#2a2752] dark:text-[#c9bfff]">
                      MVP · {row.mvp}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Later</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-12 hidden sm:block">
            <table className="w-full text-left text-[0.9375rem]">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-6 font-normal"><Label>Josh needs</Label></th>
                  <th className="py-3 pr-6 font-normal"><Label>Feature</Label></th>
                  <th className="py-3 font-normal"><Label accent>In the MVP?</Label></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {NEEDS.map((row) => (
                  <tr key={row.need} className={cn(!row.mvp && "text-muted-foreground")}>
                    <td className="py-4 pr-6 font-medium text-foreground">{row.need}</td>
                    <td className="py-4 pr-6">{row.feature}</td>
                    <td className="py-4">
                      {row.mvp ? (
                        <span className="inline-flex rounded-full bg-[#ece8fd] px-3 py-1 text-sm font-semibold text-[#4a33b8] dark:bg-[#2a2752] dark:text-[#c9bfff]">
                          {row.mvp}
                        </span>
                      ) : (
                        <span className="text-sm">Later</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------- COMPETITION */}
      <Section className="cs-band">
        <SectionIntro eyebrow="05 · The gap" title="Others give information. Nudge gets you to done.">
          We compared five existing tools. Several had good information, but none paired a countdown to your flight
          with your own vaccine records. That pairing became our focus.
        </SectionIntro>
        <Reveal delay={60}>
          <p className="mt-10 text-sm text-muted-foreground sm:hidden">Swipe the table to compare all six →</p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-border bg-surface sm:mt-12">
            <table className="w-full min-w-[44rem] text-center text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="sticky left-0 z-10 bg-surface p-4 text-left font-normal"><Label>Feature</Label></th>
                  {COMPETITORS.map((c, i) => (
                    <th
                      key={c}
                      className={cn("p-4 font-semibold", i === 0 ? cn("bg-[#f6f3ff] dark:bg-[#1d1f3d]", ACCENT) : "text-foreground")}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MATRIX.map(([feature, marks]) => (
                  <tr key={feature}>
                    <td className="sticky left-0 z-10 bg-surface p-4 text-left text-foreground">{feature}</td>
                    {marks.map((m, i) => (
                      <td key={i} className={cn("p-4", i === 0 && "bg-[#f6f3ff] dark:bg-[#1d1f3d]")}>
                        <MarkIcon mark={m} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><MarkIcon mark="yes" /> Yes</span>
            <span className="flex items-center gap-2"><MarkIcon mark="part" /> Partly</span>
            <span className="flex items-center gap-2"><MarkIcon mark="no" /> No</span>
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------- DESIGN */}
      <Section>
        <SectionIntro eyebrow="06 · Designing the app" title="Every screen answers: what should Josh do today?">
          I designed the screens so each research finding became a decision. Heartie, the app&rsquo;s mascot, keeps a
          health topic friendly instead of clinical.
        </SectionIntro>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal delay={40}>
            <Phone phone={PHONES.home} className="mx-auto w-[62%] max-w-[300px] lg:w-[78%]" />
          </Reveal>
          <div className="space-y-8">
            {DECISIONS.map((d, i) => (
              <Reveal key={d.title} delay={i * 60}>
                <div className="border-l-2 border-[#6249d6]/40 pl-5 dark:border-[#b8a9ff]/40">
                  <Label>Because: {d.from.toLowerCase()}</Label>
                  <h3 className="mt-1.5 text-xl font-semibold text-foreground">{d.title}</h3>
                  <p className="mt-1.5 text-muted-foreground">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-12 sm:grid-cols-2">
          <Reveal delay={40}>
            <div className="rounded-[24px] bg-[#f1eff9] px-6 pt-10 dark:bg-[#1d1f3d]">
              <Phone phone={PHONES.trip} className="mx-auto w-[64%] max-w-[260px]" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">Trip plan</h3>
            <p className="mt-1 text-muted-foreground">
              Everything grouped by how far before departure it&rsquo;s due. What&rsquo;s already done from MyChart sits
              at the bottom, so progress shows from day one.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-[24px] bg-[#fdf4d8] px-6 pt-10 dark:bg-[#2b2716]">
              <Phone phone={PHONES.log} className="mx-auto w-[64%] max-w-[260px]" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">Logging</h3>
            <p className="mt-1 text-muted-foreground">
              Big tap targets and a few taps to mark a step done or booked, so keeping the plan current never feels
              like paperwork.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------ DECK */}
      <Section className="cs-band">
        <SectionIntro eyebrow="07 · The pitch" title="Designing a deck for six minutes on stage.">
          I designed our pitch deck. Judges had six minutes with us, so I kept one idea per slide, told the whole story
          through Josh, and built a visual system around the product: a soft purple and yellow palette, Heartie, and
          handwritten notes like &ldquo;our main guy&rdquo; to keep it human.
        </SectionIntro>
        <Reveal delay={60}>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <CaseStudyFullImage image={DECK.title} />
            <CaseStudyFullImage image={DECK.josh} />
            <CaseStudyFullImage image={DECK.reasons} />
            <CaseStudyFullImage image={DECK.features} />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            The arc: open on a person, show the three reasons he stalls, then cross each one off with a feature.
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ REFLECTION */}
      <Section>
        <SectionIntro eyebrow="Reflection" title="Next, I’d put the screens in front of students." />
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          <Reveal delay={40}>
            <Label accent>What I learned</Label>
            <p className="mt-3 text-muted-foreground">
              Five conversations were enough to change our whole direction. We were about to design a better
              information site. What students needed was a reason to act now and someone else to keep track of the
              details.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <Label>What&rsquo;s next</Label>
            <ul className="mt-3 space-y-3 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Test the prototype.</span>{" "}Run usability sessions with
                students about to study abroad, starting with whether one step a day feels helpful or naggy.
              </li>
              <li>
                <span className="font-medium text-foreground">Pilot with one program.</span>{" "}The team&rsquo;s plan is
                an MVP with one U-M study abroad program before spring departures.
              </li>
            </ul>
          </Reveal>
        </div>
      </Section>

      <NextCaseStudy slug="nudge" />
    </div>
  );
}
