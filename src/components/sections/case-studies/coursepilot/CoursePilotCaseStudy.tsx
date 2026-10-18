import Link from "next/link";
import Image from "next/image";
import { ViewTransition } from "react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { CaseStudyData, CaseStudyImageSpec } from "@/types/case-study";
import {
  CaseStudyVideo,
  CaseStudyContentImage,
  CaseStudyFullImage,
  CaseStudyZoomImage,
} from "@/components/sections/case-studies/media/CaseStudyMedia";
import {
  CaseStudySectionMobileNav,
  type CaseStudyNavSection,
} from "@/components/sections/case-studies/CaseStudySectionNav";

/**
 * CoursePilot's own editorial case study — a bespoke layout (not the
 * generic CaseStudyPage template used by other projects) built to read
 * like a product story for recruiters, not a UX-school deliverable log:
 * the strongest research findings (each paired with what it changed),
 * one clearly-told design pivot, and a final-solution showcase. The
 * fuller record still lives in course-pilot.ts (`research.findings`,
 * `keyInsights`, `productRequirements`, `brand`, etc.) for reference; it
 * deliberately isn't all rendered here.
 *
 * Every screen shown is a real state of the Figma prototype (exported
 * frames or stills from its recorded walkthroughs). Anything without a
 * real visual is simply not rendered — never a "coming soon" slot — and
 * `projectStatus` says plainly what is prototyped vs. still future work.
 */

const NAV_SECTIONS: CaseStudyNavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "canvas", label: "Where it lives" },
  { id: "mapping", label: "Mapping" },
  { id: "exploration", label: "Exploration" },
  { id: "iteration", label: "Evolution" },
  { id: "final", label: "Final solution" },
  { id: "testing", label: "Validate next" },
  { id: "reflection", label: "Reflection" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase before:h-px before:w-6 before:bg-current before:opacity-50 text-(--project-accent)">
      {children}
    </p>
  );
}

function Label({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <p
      className={cn(
        "text-xs font-semibold tracking-[0.14em] uppercase",
        accent ? "text-(--project-accent)" : "text-muted-foreground",
      )}
    >
      {children}
    </p>
  );
}

const LEGEND = [
  { color: "#8ecdfb", label: "Student" },
  { color: "#fcd888", label: "AI / System" },
  { color: "#a7e3ad", label: "Start / Result" },
  { color: "#c9c9c9", label: "Decision" },
];

function FlowLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {LEGEND.map((item) => (
        <span key={item.label} className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2.5 rounded-sm" style={{ backgroundColor: item.color }} aria-hidden="true" />
          {item.label}
        </span>
      ))}
    </div>
  );
}

/** A single small "design principle" callout — used for the one AI
 * boundary line, deliberately not styled as a card or a full section. */
function BoundaryNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-10 max-w-xl border-l-2 border-(--project-accent) pl-4 text-sm text-muted-foreground italic">
      {children}
    </p>
  );
}

/**
 * One research finding and the design response it led to — the
 * research → decision link is made here, once, instead of in a separate
 * mapping section that restated the same findings.
 */
function Finding({
  index,
  title,
  whatParticipantsSaid,
  designResponse,
}: {
  index: number;
  title: string;
  whatParticipantsSaid: string;
  designResponse: string;
}) {
  return (
    <div className="grid gap-4 border-t border-border py-8 first:border-t-0 first:pt-0 lg:grid-cols-[3rem_minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
      <p className="text-sm font-medium text-(--project-accent)">0{index}</p>
      <div>
        <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{title}</h3>
        <p className="mt-3 text-muted-foreground">{whatParticipantsSaid}</p>
      </div>
      <div className="lg:pt-1">
        <Label accent>What I designed</Label>
        <p className="mt-2 text-foreground">{designResponse}</p>
      </div>
    </div>
  );
}

/** A short "title + one line" callout — used for the handful of
 * meaningful annotations under each Final Experience moment, instead of
 * labeling every button on the screen. */
function CalloutList({
  items,
  className,
}: {
  items: { title: string; description: string }[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6", className)}>
      {items.map((item) => (
        <div key={item.title}>
          <Label accent>{item.title}</Label>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

/** The Canvas dashboard with CoursePilot's new nav-rail icon spotlit —
 * the only thing actually new on that screen. */
function CanvasEntryImage({ image }: { image: CaseStudyImageSpec }) {
  return (
    <div className="relative overflow-hidden rounded-(--radius-default) border border-border">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 1024px) 400px, 100vw"
        quality={90}
        className="block h-auto w-full"
      />
      {/* Position is a hand-tuned percentage box matched to where the icon
          sits in the source screenshot (canvas-dashboard-popup.png), not
          derived at runtime. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-md border-2 border-(--project-accent) shadow-[0_0_0_2000px_rgba(20,20,20,0.55)]"
        style={{ left: "1.1%", top: "55%", width: "4.6%", height: "6.4%" }}
      />
      <div
        className="absolute flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-(--project-accent) bg-surface py-1 pr-2.5 pl-2 text-xs font-medium whitespace-nowrap text-(--project-accent) shadow-md"
        style={{ left: "6.5%", top: "58%" }}
      >
        <span aria-hidden="true">←</span> New: CoursePilot in the Canvas nav
      </div>
    </div>
  );
}

export function CoursePilotCaseStudy({ data }: { data: CaseStudyData }) {
  const { hero, overview, background, research, ideation, platformIntegration, earlyExploration, design, testing, finalExperience, finalThoughts } = data;
  const keyFindings = research.keyFindings ?? [];
  const iterationStory = design.iterationStory;
  const architecture = finalExperience?.architecture;
  const heroMoment = finalExperience?.heroMoment;
  const actionImages = finalExperience?.interactionDesign?.images ?? [];
  // The prototype link is optional — no URL, no button (never a dead "#").
  const prototypeHref = /^https?:\/\//.test(hero.ctaHref) ? hero.ctaHref : null;

  return (
    <div className="case-study bg-background" style={{ "--project-accent": data.accentColor ?? "var(--color-sage-deep)" } as React.CSSProperties}>
      {/* ---------------------------------------------------------- HERO */}
      <Section className="pt-24 pb-0 sm:pt-32">
        <Link href="/#work" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← Back to Work
        </Link>

        <Reveal>
          <Heading level={1} className="mt-10 text-6xl sm:text-8xl">
            {hero.title}
          </Heading>
        </Reveal>

        <Reveal delay={60}>
          <p className="mt-6 max-w-2xl text-xl text-foreground sm:text-2xl">{hero.tagline}</p>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
            {hero.category} · Figma · Solo Project · {overview.year} · {overview.duration}
          </p>
        </Reveal>

        <Reveal delay={140}>
          <span className="mt-6 inline-flex items-center gap-1.5 rounded-(--radius-pill) bg-mist-blue px-3 py-1 text-xs font-medium text-sage-deep">
            <span className="size-1.5 rounded-full bg-sage-deep" />
            {hero.statusLabel}
          </span>
        </Reveal>

        {prototypeHref && (
          <Reveal delay={160}>
            <a
              href={prototypeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-(--radius-default) bg-(--project-accent) px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--project-accent)"
            >
              {hero.ctaLabel} →
            </a>
          </Reveal>
        )}

        {hero.disclosure && (
          <Reveal delay={180}>
            <p className="mt-4 max-w-xl text-xs text-muted-foreground/80">{hero.disclosure}</p>
          </Reveal>
        )}

        <Reveal delay={200}>
          <div className="mt-14">
            {/* Same `project-media-coursepilot` name as the homepage's
                ProjectPlaceholder — the browser morphs that exact video
                from its homepage position/size into this hero slot. */}
            <ViewTransition name="project-media-coursepilot">
              <CaseStudyVideo
                video={{
                  src: "/videos/projects/coursepilot/starttoend.mp4",
                  alt: "Walkthrough of the CoursePilot prototype, starting from its popup open inside Canvas through the full experience",
                  width: 2000,
                  height: 1422,
                }}
                className="mx-auto max-w-5xl"
              />
            </ViewTransition>
          </div>
        </Reveal>
      </Section>

      <CaseStudySectionMobileNav sections={NAV_SECTIONS} />

      {/* ------------------------------------------------------- OVERVIEW */}
      <Section id="overview" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>Overview</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            {hero.description}
          </Heading>
        </Reveal>

        {overview.features.length > 0 && (
          <>
            {overview.featuresIntro && (
              <Reveal delay={90}>
                <p className="mt-12 max-w-2xl text-sm text-muted-foreground">{overview.featuresIntro}</p>
              </Reveal>
            )}
            <div className="mt-6 grid gap-x-10 gap-y-8 border-t border-border pt-8 sm:grid-cols-2">
              {overview.features.map((feature, i) => (
                <Reveal key={feature.name} delay={120 + i * 20}>
                  <div>
                    <p className="font-heading text-lg text-foreground italic">{feature.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {data.projectStatus && (
          <Reveal delay={160}>
            <div className="mt-16 grid gap-8 rounded-(--radius-default) border border-border bg-surface p-6 sm:grid-cols-3 sm:p-8">
              {data.projectStatus.map((group, i) => (
                <div key={group.label}>
                  <Label accent={i === 0}>{group.label}</Label>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </Section>

      {/* -------------------------------------------------------- PROBLEM */}
      <Section id="problem" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            {background.heading}
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{background.narrative}</p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------- RESEARCH */}
      <Section id="research" className="scroll-mt-28 cs-band">
        <Reveal>
          <Eyebrow>Research → product decisions</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            I talked to five students about how they actually get through Canvas.
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{research.intro}</p>
        </Reveal>

        <div className="mt-16">
          {keyFindings.map((finding, i) => (
            <Reveal key={finding.title} delay={i * 30}>
              <Finding
                index={i + 1}
                title={finding.title}
                whatParticipantsSaid={finding.whatParticipantsSaid}
                designResponse={finding.designResponse}
              />
            </Reveal>
          ))}
        </div>

        {data.aiBoundary && (
          <Reveal delay={80}>
            <BoundaryNote>{data.aiBoundary}</BoundaryNote>
          </Reveal>
        )}
      </Section>

      {/* --------------------------------------------------- INSIDE CANVAS */}
      <Section id="canvas" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>Where it lives</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            {platformIntegration?.heading}
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{architecture?.copy ?? platformIntegration?.copy}</p>
        </Reveal>

        {architecture && (
          <>
            <Reveal delay={80}>
              <ol className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6">
                {architecture.steps.map((step, i) => {
                  const image = i === 0 ? platformIntegration?.popupDashboardImage ?? step.image : step.image;
                  if (!image) return null;
                  return (
                    <li key={step.label}>
                      <p className="mb-3 flex items-baseline gap-2 text-sm font-medium text-foreground">
                        <span className="text-(--project-accent)">0{i + 1}</span> {step.label}
                      </p>
                      {i === 0 ? <CanvasEntryImage image={image} /> : <CaseStudyZoomImage image={image} />}
                    </li>
                  );
                })}
              </ol>
            </Reveal>
            <Reveal delay={120}>
              <CalloutList items={architecture.callouts} className="mt-10 max-w-2xl sm:grid-cols-2" />
            </Reveal>
          </>
        )}
      </Section>

      {/* --------------------------------------------------------- FLOWS */}
      <Section id="mapping" className="scroll-mt-28 cs-band">
        <Reveal>
          <Eyebrow>Mapping the interactions</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            Three representative tasks, mapped end to end.
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            I mapped how conversation, Canvas information, AI processing, and student decisions connect — including where a student can push back and regenerate.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-10">
            <FlowLegend />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {ideation.flows.map((flow, i) =>
            flow.image ? (
              <Reveal key={flow.name} delay={80 + i * 20}>
                <Label>{flow.name}</Label>
                <CaseStudyZoomImage image={flow.image} className="mt-3" />
              </Reveal>
            ) : null,
          )}
        </div>
      </Section>

      {/* ----------------------------------------------------- EXPLORATION */}
      {earlyExploration && (
        <Section id="exploration" className="scroll-mt-28">
          <Reveal>
            <Eyebrow>Early exploration</Eyebrow>
            <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
              {earlyExploration.heading}
            </Heading>
          </Reveal>
          {earlyExploration.copy && (
            <Reveal delay={40}>
              <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{earlyExploration.copy}</p>
            </Reveal>
          )}
          <Reveal delay={80}>
            <div className="mt-12 grid max-w-4xl gap-x-8 gap-y-10 sm:grid-cols-2">
              {earlyExploration.items.map((item) =>
                item.image ? (
                  <div key={item.label}>
                    <CaseStudyContentImage
                      image={item.image}
                      className="max-w-none"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                    <p className="mt-3 text-sm text-muted-foreground">{item.label}</p>
                  </div>
                ) : null,
              )}
            </div>
          </Reveal>
        </Section>
      )}

      {/* ------------------------------------------------------ ITERATION */}
      <Section id="iteration" className="scroll-mt-28 cs-band">
        <Reveal>
          <Eyebrow>Design evolution</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            {design.heading}
          </Heading>
        </Reveal>

        {iterationStory && (
          <Reveal delay={40}>
            <div className="mt-10 grid gap-8 border-t border-border pt-8 sm:grid-cols-2 sm:gap-12">
              <div>
                <Label>The problem</Label>
                <p className="mt-3 max-w-lg text-muted-foreground">{iterationStory.problem}</p>
              </div>
              <div>
                <Label accent>The decision</Label>
                <p className="mt-3 max-w-lg text-xl font-medium text-foreground">{iterationStory.decision}</p>
              </div>
            </div>
          </Reveal>
        )}

        <div className="mt-16 space-y-16">
          {iterationStory?.pairs.map((pair, i) =>
            pair.before && pair.after ? (
              <Reveal key={pair.task} delay={80 + i * 40}>
                <h3 className="font-heading text-2xl text-foreground">{pair.task}</h3>
                <div className="mt-5 grid gap-6 lg:grid-cols-2">
                  <div>
                    <Label>{pair.beforeLabel}</Label>
                    <CaseStudyZoomImage image={pair.before} className="mt-3" />
                  </div>
                  <div>
                    <Label accent>{pair.afterLabel}</Label>
                    <CaseStudyZoomImage image={pair.after} className="mt-3" />
                  </div>
                </div>
              </Reveal>
            ) : null,
          )}
        </div>

        {iterationStory?.comparisonLabels && (
          <Reveal delay={120}>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:gap-6">
              <ul className="space-y-1 text-sm text-muted-foreground">
                {iterationStory.comparisonLabels.early.map((label) => (
                  <li key={label}>— {label}</li>
                ))}
              </ul>
              <ul className="space-y-1 text-sm text-foreground">
                {iterationStory.comparisonLabels.final.map((label) => (
                  <li key={label}>+ {label}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {iterationStory?.takeaway && (
          <Reveal delay={140}>
            <p className="mx-auto mt-16 max-w-2xl text-center font-heading text-2xl text-foreground sm:text-3xl">
              {iterationStory.takeaway}
            </p>
          </Reveal>
        )}
      </Section>

      {/* -------------------------------------------------------- FINAL */}
      <Section id="final" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>Final experience</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-4xl sm:text-6xl">
            A conversational layer that adapts to what the student needs.
          </Heading>
        </Reveal>
        {finalExperience?.subheading && (
          <Reveal delay={40}>
            <p className="mt-6 max-w-[42rem] text-lg text-muted-foreground">{finalExperience.subheading}</p>
          </Reveal>
        )}

        {/* 01 — Plan My Night: the full response, then acting on it */}
        {heroMoment && (
          <div className="mt-24">
            <Reveal>
              <p className="text-sm font-medium text-(--project-accent)">01 · Plan My Night</p>
              <Heading level={3} className="mt-2 max-w-2xl text-3xl sm:text-5xl">
                {heroMoment.heading}
              </Heading>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">{heroMoment.copy}</p>
            </Reveal>

            <Reveal delay={40}>
              <p className="mt-10 inline-block rounded-(--radius-pill) border border-border bg-surface px-5 py-2.5 text-sm text-foreground italic">
                “{heroMoment.prompt}”
              </p>
            </Reveal>

            <Reveal delay={60}>
              <CaseStudyFullImage
                image={{
                  src: "/images/projects/coursepilot/final/plan-my-night-2000.png",
                  alt: "CoursePilot's Plan My Night response: top tasks with due dates, estimated time, and Why this? links; a suggested 3-hour schedule; Add to My Calendar and Adjust Plan buttons; and source links.",
                  width: 2000,
                  height: 1422,
                }}
                className="mt-6"
              />
            </Reveal>

            <Reveal delay={80}>
              <CalloutList items={heroMoment.callouts} className="mt-10 sm:grid-cols-2 lg:grid-cols-5" />
            </Reveal>

            {actionImages.length > 0 && (
              <Reveal delay={100}>
                <div className="mt-16 border-t border-border pt-10">
                  <Label>{finalExperience?.interactionDesign?.heading ?? "Acting on the plan"}</Label>
                  <p className="mt-3 max-w-xl text-muted-foreground">{finalExperience?.interactionDesign?.copy}</p>
                  <div className="mt-8 grid items-start gap-6 sm:grid-cols-2">
                    {actionImages.map((image) => (
                      <CaseStudyContentImage
                        key={image.src}
                        image={image}
                        className="max-w-none"
                        sizes="(min-width: 640px) 50vw, 100vw"
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={120}>
              <p className="mt-14 text-center font-heading text-2xl text-foreground">{heroMoment.principle}</p>
            </Reveal>
          </div>
        )}

        {/* 02/03 — Secondary moments, alternating sides */}
        {finalExperience?.secondaryMoments?.map((moment, i) =>
          moment.image ? (
            <div key={moment.name} className="mt-28 border-t border-border pt-16">
              <Reveal>
                <div
                  className={cn(
                    "grid gap-10 lg:items-center lg:gap-14",
                    i % 2 === 1
                      ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]"
                      : "lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]",
                  )}
                >
                  <div className={cn(i % 2 === 1 && "lg:order-2")}>
                    <CaseStudyZoomImage image={moment.image} />
                  </div>
                  <div className={cn(i % 2 === 1 && "lg:order-1")}>
                    <p className="text-sm font-medium text-(--project-accent)">
                      0{i + 2} · {moment.name}
                    </p>
                    <Heading level={3} size={3} className="mt-2 text-2xl sm:text-3xl">
                      {moment.heading}
                    </Heading>
                    <p className="mt-3 text-muted-foreground">{moment.copy}</p>
                    <CalloutList items={moment.callouts} className="mt-8" />
                  </div>
                </div>
              </Reveal>
            </div>
          ) : null,
        )}

        {/* Designing for appropriate trust — a system, not another feature list */}
        {finalExperience?.trust && (
          <Reveal delay={80}>
            <div className="mt-28 border-t border-border pt-16">
              <Label accent>Designing for appropriate trust</Label>
              <p className="mt-3 max-w-[40rem] font-heading text-2xl text-foreground sm:text-3xl">{finalExperience.trust.copy}</p>
              {finalExperience.trust.items && (
                <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2">
                  {finalExperience.trust.items.map((item) =>
                    item.image ? (
                      <div key={item.title}>
                        <CaseStudyContentImage image={item.image} className="max-w-none" sizes="(min-width: 640px) 50vw, 100vw" />
                        <p className="mt-4 text-sm font-medium text-foreground">{item.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ) : null,
                  )}
                </div>
              )}
            </div>
          </Reveal>
        )}
      </Section>

      {/* ------------------------------------------------------- TESTING */}
      <Section id="testing" className="scroll-mt-28 cs-band">
        <Reveal>
          <Eyebrow>Validation</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            {testing.heading}
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{testing.intro}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {testing.validateNext?.map((item) => (
              <div key={item.title} className="border-t border-border pt-6">
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-muted-foreground">{item.question}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {testing.closingStatement && (
          <Reveal delay={120}>
            <p className="mt-14 max-w-[45rem] text-sm text-muted-foreground">{testing.closingStatement}</p>
          </Reveal>
        )}
      </Section>

      {/* -------------------------------------------------------- REFLECTION */}
      <Section id="reflection" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>Reflection</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            Designing an AI product wasn&rsquo;t primarily about designing a chat interface.
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{finalThoughts.whatILearned}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 max-w-[45rem] border-t border-border pt-8">
            <Label>{finalThoughts.nextStepsHeading ?? "Next steps"}</Label>
            <p className="mt-3 text-muted-foreground">{finalThoughts.nextSteps}</p>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
