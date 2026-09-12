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
  CaseStudyBeforeAfter,
  CaseStudyFullImage,
  CaseStudyContentImage,
} from "@/components/sections/case-studies/media/CaseStudyMedia";
import {
  CaseStudySectionMobileNav,
  type CaseStudyNavSection,
} from "@/components/sections/case-studies/CaseStudySectionNav";

/**
 * CoursePilot's own editorial case study — a bespoke layout (not the
 * generic CaseStudyPage template used by other projects) built to read
 * like a product story for recruiters, not a UX-school deliverable log:
 * a handful of the strongest research findings, one clearly-told design
 * pivot, one featured flow, and a large final-solution showcase carry
 * the page — not every finding, insight, requirement, and wireframe the
 * project actually produced. That fuller record still lives in
 * course-pilot.ts (`research.findings`, `keyInsights`,
 * `productRequirements`, etc.) for reference; it deliberately isn't all
 * rendered here. No final-product screenshots exist yet (the project is
 * a Figma prototype without exported final screens), so this page uses
 * plainly-labeled reserved slots (`ReservedVisual`) instead of inventing
 * or standing in fake UI for them — see the accompanying data file's own
 * `// Needed:` / `// Once exported:` comments for exactly what's missing
 * and where it plugs in.
 */

const NAV_SECTIONS: CaseStudyNavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "decisions", label: "Decisions" },
  { id: "canvas", label: "Where it lives" },
  { id: "identity", label: "Identity" },
  { id: "mapping", label: "Mapping" },
  { id: "exploration", label: "Exploration" },
  { id: "iteration", label: "Evolution" },
  { id: "final", label: "Final solution" },
  { id: "testing", label: "Validate next" },
  { id: "reflection", label: "Reflection" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium tracking-wide text-(--project-accent) uppercase">
      {children}
    </p>
  );
}

/**
 * A reserved space for imagery that doesn't exist yet — clearly not a
 * finished screenshot (dashed border, muted icon, no shadow) but framed
 * as an intentional "more to come" note rather than a bare debug label,
 * unlike the bordered/shadowed frame real images get elsewhere on this
 * page.
 */
function ReservedVisual({
  label,
  aspect = "16/9",
  className,
}: {
  label: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-2 overflow-hidden rounded-(--radius-default) border border-dashed border-muted-foreground/25 bg-muted/30 px-6 py-8 text-center",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6 text-muted-foreground/40"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.5" />
        <path d="m4.5 17 4.5-4.5 3 3 4-4L21 16" />
      </svg>
      <p className="text-[0.65rem] font-medium tracking-wide text-muted-foreground/60 uppercase">Coming soon</p>
      <p className="max-w-[16rem] text-sm break-words text-muted-foreground/80">{label}</p>
    </div>
  );
}

function ChipFlow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-3">
          <span className="rounded-(--radius-default) border border-border bg-surface px-4 py-2 text-sm text-foreground">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="text-muted-foreground" aria-hidden="true">
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-(--radius-pill) border border-border bg-surface px-3 py-1 text-sm text-foreground">
      {children}
    </span>
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

/** Live color swatch rendered from a real CSS custom property — never an
 * invented hex value. `tint`/`shade` optionally mix the base color toward
 * white/black to show how one product color can hold a small range,
 * without inventing separate named brand colors. */
function ColorSwatch({
  label,
  cssVar,
  mix,
}: {
  label: string;
  cssVar: string;
  mix?: { toward: "white" | "black"; percent: number };
}) {
  const background = mix
    ? `color-mix(in srgb, var(${cssVar}) ${100 - mix.percent}%, ${mix.toward})`
    : `var(${cssVar})`;
  return (
    <div>
      <div className="h-16 w-full rounded-(--radius-default) border border-border" style={{ background }} />
      <p className="mt-2 text-xs font-medium text-foreground">{label}</p>
    </div>
  );
}

/** A single small "design principle" callout — used for the one AI
 * boundary line, deliberately not styled as a card or a full section. */
function BoundaryNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 max-w-xl border-l-2 border-(--project-accent) pl-4 text-sm text-muted-foreground italic">
      {children}
    </p>
  );
}

function ProblemColumn({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l border-border pl-6">
      <p className="text-sm font-medium text-muted-foreground">0{index}</p>
      <h3 className="mt-3 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-muted-foreground">{children}</p>
    </div>
  );
}

/**
 * One research finding — deliberately WHAT-was-learned only. The
 * matching design response used to render inline here, which duplicated
 * the dedicated Research → Product Decisions section below; that link is
 * now made in exactly one place (see MappingRow).
 */
function Finding({
  index,
  title,
  whatParticipantsSaid,
}: {
  index: number;
  title: string;
  whatParticipantsSaid: string;
}) {
  return (
    <div className="grid gap-3 border-t border-border py-8 first:border-t-0 first:pt-0 sm:grid-cols-[4.5rem_1fr] sm:gap-8">
      <p className="text-sm font-medium text-(--project-accent)">0{index}</p>
      <div>
        <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{title}</h3>
        <p className="mt-3 max-w-xl text-muted-foreground">{whatParticipantsSaid}</p>
      </div>
    </div>
  );
}

function MappingRow({ learned, designed }: { learned: string; designed: string }) {
  return (
    <div className="grid gap-3 border-t border-border py-6 first:border-t-0 first:pt-0 sm:grid-cols-[1fr_2rem_1fr] sm:items-center sm:gap-6">
      <p className="text-muted-foreground">{learned}</p>
      <span className="hidden text-muted-foreground sm:block" aria-hidden="true">
        →
      </span>
      <p className="font-medium text-foreground">{designed}</p>
    </div>
  );
}

/** A real screenshot when one exists; otherwise a plainly-labeled
 * reserved slot — never an invented screen. Used throughout Final
 * Experience so every moment degrades gracefully when its asset is
 * still missing. */
function MediaOrPlaceholder({
  image,
  label,
  aspect = "16/9",
  className,
}: {
  image?: CaseStudyImageSpec;
  label: string;
  aspect?: string;
  className?: string;
}) {
  return image ? (
    <CaseStudyContentImage image={image} className={className} />
  ) : (
    <ReservedVisual label={label} aspect={aspect} className={className} />
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
          <p className="text-xs font-medium tracking-wide text-(--project-accent) uppercase">{item.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function CoursePilotCaseStudy({ data }: { data: CaseStudyData }) {
  const { hero, overview, background, research, ideation, platformIntegration, brand, earlyExploration, design, testing, finalExperience, finalThoughts } = data;
  const keyFindings = research.keyFindings ?? [];
  const flows = ideation.flows;
  const planMyNight = flows.find((f) => f.name === "Plan My Night");
  const catchMeUp = flows.find((f) => f.name === "Catch Me Up");
  const askCoursePilot = flows.find((f) => f.name === "Ask CoursePilot");
  const realBeforeAfter = design.beforeAfter ?? [];
  const interactionDetails = finalExperience?.interactionDesign;
  const iterationStory = design.iterationStory;

  return (
    <div style={{ "--project-accent": data.accentColor ?? "var(--color-sage-deep)" } as React.CSSProperties}>
      {/* ---------------------------------------------------------- HERO */}
      <Section className="pt-24 pb-0 sm:pt-32">
        <Link href="/projects" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
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

        <Reveal delay={160}>
          <a
            href={hero.ctaHref}
            className="mt-6 inline-flex items-center gap-2 rounded-(--radius-default) border border-dashed border-border px-5 py-2.5 text-sm font-medium text-muted-foreground"
          >
            {hero.ctaLabel} →
          </a>
        </Reveal>

        {hero.disclosure && (
          <Reveal delay={180}>
            <p className="mt-4 max-w-xl text-xs text-muted-foreground/80">{hero.disclosure}</p>
          </Reveal>
        )}

        <Reveal delay={200}>
          <div className="mt-14">
            {/* Same `project-media-case-study-02` name as the homepage's
                ProjectPlaceholder — the browser morphs that exact video
                from its homepage position/size into this hero slot. */}
            <ViewTransition name="project-media-case-study-02">
              <CaseStudyVideo
                video={{
                  src: "/videos/projects/coursepilot/starttoend.mp4",
                  alt: "Walkthrough of the CoursePilot prototype from the Canvas dashboard through the full experience",
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
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
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
      </Section>

      {/* -------------------------------------------------------- PROBLEM */}
      <Section id="problem" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            {background.heading}
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{background.narrative}</p>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          <Reveal delay={80}>
            <ProblemColumn index={1} title="Scattered information">
              Students spend unnecessary time searching for information instead of completing coursework.
            </ProblemColumn>
          </Reveal>
          <Reveal delay={120}>
            <ProblemColumn index={2} title="Hard to prioritize">
              Students do not simply complete assignments in chronological order — due date alone doesn&rsquo;t tell them what deserves attention first.
            </ProblemColumn>
          </Reveal>
          <Reveal delay={160}>
            <ProblemColumn index={3} title="AI without trust">
              An AI assistant is only useful if students believe the information is reliable.
            </ProblemColumn>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------- RESEARCH */}
      <Section id="research" className="scroll-mt-28 bg-muted/40">
        <Reveal>
          <Eyebrow>Research</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            I talked to five students about how they actually get through Canvas.
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{research.intro}</p>
        </Reveal>

        <div className="mt-16">
          {keyFindings.map((finding, i) => (
            <Reveal key={finding.title} delay={i * 30}>
              <Finding index={i + 1} title={finding.title} whatParticipantsSaid={finding.whatParticipantsSaid} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------- FROM RESEARCH */}
      <Section id="decisions" className="scroll-mt-28 bg-muted/40">
        <Reveal>
          <Eyebrow>Research → product decisions</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            Turning what I heard into product decisions.
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <div className="mt-14 max-w-3xl">
            {data.researchToDesign?.rows.map((row) => (
              <MappingRow key={row.learned} learned={row.learned} designed={row.designed} />
            ))}
          </div>
        </Reveal>
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
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            {platformIntegration?.heading}
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{platformIntegration?.copy}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 flex flex-col gap-12">
            <div>
              <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">Canvas dashboard</p>
              {platformIntegration?.regularDashboardImage ? (
                <Image
                  src={platformIntegration.regularDashboardImage.src}
                  alt={platformIntegration.regularDashboardImage.alt}
                  width={platformIntegration.regularDashboardImage.width}
                  height={platformIntegration.regularDashboardImage.height}
                  sizes="(min-width: 640px) 80vw, 100vw"
                  className="h-auto w-full max-w-[85%] border border-border"
                />
              ) : (
                <ReservedVisual label="Regular Canvas dashboard" aspect="4/3" />
              )}
            </div>
            <div>
              <p className="mb-3 text-xs font-medium tracking-wide text-(--project-accent) uppercase">
                Canvas + CoursePilot — the added integration
              </p>
              {platformIntegration?.popupDashboardImage ? (
                <div className="relative overflow-hidden border border-border max-w-[85%]">
                  <Image
                    src={platformIntegration.popupDashboardImage.src}
                    alt={platformIntegration.popupDashboardImage.alt}
                    width={platformIntegration.popupDashboardImage.width}
                    height={platformIntegration.popupDashboardImage.height}
                    sizes="(min-width: 640px) 80vw, 100vw"
                    className="block h-auto w-full"
                  />
                  {/* Callout: the only thing actually new on this screen is the
                      CoursePilot icon dropped into Canvas's existing nav rail —
                      spotlight it directly rather than relying on the caption
                      above to carry that. Position is a hand-tuned percentage
                      box matched to where the icon sits in the source screenshot
                      (canvas-dashboard-popup.png), not derived at runtime. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute rounded-md border-2 border-(--project-accent) shadow-[0_0_0_2000px_rgba(20,20,20,0.55)]"
                    style={{ left: "1.1%", top: "55%", width: "4.6%", height: "6.4%" }}
                  />
                  <div
                    className="absolute flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-(--project-accent) bg-surface py-1.5 pr-3 pl-2.5 text-xs font-medium whitespace-nowrap text-(--project-accent) shadow-md"
                    style={{ left: "6.5%", top: "58%" }}
                  >
                    <span aria-hidden="true">←</span> New: CoursePilot in the Canvas nav
                  </div>
                </div>
              ) : (
                <ReservedVisual label="Canvas dashboard with the CoursePilot popup open" aspect="4/3" />
              )}
            </div>
          </div>
        </Reveal>

        {platformIntegration?.flowSteps && (
          <Reveal delay={120}>
            <div className="mt-14">
              <ChipFlow steps={platformIntegration.flowSteps} />
              <p className="mt-4 text-sm text-muted-foreground">
                The popup is the fast entry point; New Chat opens the full conversational workspace for deeper tasks.
              </p>
            </div>
          </Reveal>
        )}
      </Section>

      {/* ------------------------------------------------------- IDENTITY */}
      {brand && (
        <Section id="identity" className="scroll-mt-28 bg-muted/40">
          <Reveal>
            <Eyebrow>Identity</Eyebrow>
            <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
              {brand.heading}
            </Heading>
          </Reveal>
          <Reveal delay={40}>
            <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{brand.copy}</p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-14 grid gap-10 border-t border-border pt-10 sm:grid-cols-2">
              <div>
                <p className="mb-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">Logo mark</p>
                {brand.logo ? (
                  <CaseStudyContentImage image={brand.logo} className="max-w-xs" />
                ) : (
                  <ReservedVisual label="CoursePilot logo mark needed" aspect="4/3" />
                )}
              </div>
              <div>
                <p className="mb-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">Color</p>
                <div className="grid grid-cols-3 gap-4">
                  <ColorSwatch label="CoursePilot purple" cssVar="--color-coursepilot-purple" />
                  <ColorSwatch label="Tint" cssVar="--color-coursepilot-purple" mix={{ toward: "white", percent: 55 }} />
                  <ColorSwatch label="Shade" cssVar="--color-coursepilot-purple" mix={{ toward: "black", percent: 30 }} />
                </div>
                <p className="mt-6 mb-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">Type</p>
                <p className="font-heading text-2xl text-foreground">Fraunces — headings</p>
                <p className="mt-1 font-sans text-base text-muted-foreground">Instrument Sans — body &amp; UI</p>
              </div>
            </div>
          </Reveal>

          {(brand.adaptations?.length || brand.adaptationsNeededAssets?.length) && (
            <Reveal delay={120}>
              <div className="mt-14 border-t border-border pt-10">
                <p className="mb-4 text-xs font-medium tracking-wide text-(--project-accent) uppercase">
                  Conceptual institution adaptations
                </p>
                {brand.adaptations && brand.adaptations.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {brand.adaptations.map((image) => (
                      <div
                        key={image.src}
                        className="relative flex items-center justify-center overflow-hidden rounded-(--radius-default) border border-border bg-surface p-10 shadow-sm"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          sizes="(min-width: 640px) 25vw, 50vw"
                          className="h-auto w-1/2 object-contain"
                        />
                        {image.caption && (
                          <span className="absolute bottom-3 left-3 text-xs font-medium text-muted-foreground/70">
                            {image.caption}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-3">
                    {brand.adaptationsNeededAssets?.map((needed, i) => (
                      <ReservedVisual key={needed} label={`Conceptual adaptation ${i + 1}`} aspect="4/3" />
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          )}

          {brand.disclaimer && (
            <Reveal delay={140}>
              <p className="mt-8 text-xs text-muted-foreground/80">{brand.disclaimer}</p>
            </Reveal>
          )}
        </Section>
      )}

      {/* --------------------------------------------------------- FLOWS */}
      <Section id="mapping" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>Mapping the interactions</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            Mapping the interactions.
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            I mapped representative student tasks to understand how conversation, Canvas information, AI processing, and user decisions should connect.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {[
            { name: "Plan My Night", flow: planMyNight },
            { name: "Catch Me Up", flow: catchMeUp },
            { name: "Ask CoursePilot", flow: askCoursePilot },
          ].map(({ name, flow }, i) =>
            flow?.image ? (
              <Reveal key={name} delay={60 + i * 20}>
                <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">{name}</p>
                <CaseStudyContentImage image={flow.image} className="mx-auto max-w-64" />
              </Reveal>
            ) : null,
          )}
        </div>

        <Reveal delay={120}>
          <div className="mt-10">
            <FlowLegend />
          </div>
        </Reveal>
      </Section>

      {/* ----------------------------------------------------- EXPLORATION */}
      {earlyExploration && (
        <Section id="exploration" className="scroll-mt-28 bg-muted/40">
          <Reveal>
            <Eyebrow>Early exploration</Eyebrow>
            <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
              {earlyExploration.heading}
            </Heading>
          </Reveal>
          {earlyExploration.copy && (
            <Reveal delay={40}>
              <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{earlyExploration.copy}</p>
            </Reveal>
          )}
          <Reveal delay={80}>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {earlyExploration.items.map((item) =>
                item.image ? (
                  <div key={item.label}>
                    <CaseStudyContentImage image={item.image} />
                    <p className="mt-2 text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ) : (
                  <ReservedVisual key={item.label} label={item.label} aspect="4/3" />
                ),
              )}
            </div>
          </Reveal>
        </Section>
      )}

      {/* ------------------------------------------------------ ITERATION */}
      <Section id="iteration" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>Design evolution</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            {design.heading}
          </Heading>
        </Reveal>

        {design.iterationStory && (
          <Reveal delay={40}>
            <div className="mt-8 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">The problem</p>
                <p className="mt-3 max-w-md text-muted-foreground">{design.iterationStory.problem}</p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-(--project-accent) uppercase">The decision</p>
                <p className="mt-3 max-w-md text-lg font-medium text-foreground">{design.iterationStory.decision}</p>
              </div>
            </div>
          </Reveal>
        )}

        <div className="mt-14 space-y-14">
          {realBeforeAfter.map((pair, i) => (
            <Reveal key={pair.before.src} delay={80 + i * 40}>
              <CaseStudyBeforeAfter
                {...pair}
                className="grid-cols-1 gap-8 lg:grid-cols-2"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </Reveal>
          ))}
          {design.iterationStory?.pairs.map((pair, i) => (
            <Reveal key={pair.task} delay={80 + (realBeforeAfter.length + i) * 40}>
              <p className="mb-4 text-sm font-medium text-foreground">{pair.task}</p>
              {pair.before && pair.after ? (
                <CaseStudyBeforeAfter
                  before={pair.before}
                  after={pair.after}
                  beforeLabel={pair.beforeLabel}
                  afterLabel={pair.afterLabel}
                  className="grid-cols-1 gap-8 lg:grid-cols-2"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">Before</p>
                    <ReservedVisual label={pair.beforeLabel} aspect="4/3" />
                  </div>
                  <div>
                    <p className="mb-3 text-xs font-medium tracking-wide text-(--project-accent) uppercase">After</p>
                    <ReservedVisual label={pair.afterLabel} aspect="4/3" />
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        {iterationStory?.takeaway && (
          <Reveal delay={120}>
            <p className="mx-auto mt-14 max-w-2xl text-center text-lg font-medium text-foreground">
              {iterationStory.takeaway}
            </p>
          </Reveal>
        )}

        {iterationStory?.comparisonLabels && (
          <Reveal delay={140}>
            <div className="mx-auto mt-8 grid max-w-xl gap-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Early</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {iterationStory.comparisonLabels.early.map((label) => (
                    <li key={label}>{label}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-(--project-accent) uppercase">Final</p>
                <ul className="mt-2 space-y-1 text-sm text-foreground">
                  {iterationStory.comparisonLabels.final.map((label) => (
                    <li key={label}>{label}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        )}
      </Section>

      {/* -------------------------------------------------------- FINAL */}
      <Section id="final" className="scroll-mt-28 bg-muted/40">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Final experience</Eyebrow>
            <Heading level={2} className="mt-4 max-w-2xl text-4xl sm:text-6xl">
              A conversational layer that adapts to what the student needs.
            </Heading>
          </div>
          <a
            href={hero.ctaHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-(--radius-default) border border-dashed border-border px-5 py-2.5 text-sm font-medium text-muted-foreground"
          >
            {hero.ctaLabel} →
          </a>
        </Reveal>
        {finalExperience?.subheading && (
          <Reveal delay={40}>
            <p className="mt-6 max-w-[42rem] text-lg text-muted-foreground">{finalExperience.subheading}</p>
          </Reveal>
        )}

        {/* 01 — Quick access architecture (medium) */}
        {finalExperience?.architecture && (
          <div className="mt-24">
            <Reveal>
              <p className="text-sm font-medium text-(--project-accent)">01</p>
              <Heading level={3} size={3} className="mt-2 max-w-xl text-2xl sm:text-3xl">
                {finalExperience.architecture.heading}
              </Heading>
              <p className="mt-3 max-w-lg text-muted-foreground">{finalExperience.architecture.copy}</p>
            </Reveal>

            <Reveal delay={40}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                {finalExperience.architecture.steps.map((step, i, steps) => (
                  <div key={step.label} className="flex items-center gap-6">
                    <div className="w-52">
                      <MediaOrPlaceholder image={step.image} label={step.label} aspect="4/3" />
                      <p className="mt-2 text-center text-xs text-muted-foreground">{step.label}</p>
                    </div>
                    {i < steps.length - 1 && (
                      <span className="text-muted-foreground" aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <CalloutList
                items={finalExperience.architecture.callouts}
                className="mx-auto mt-10 max-w-xl sm:grid-cols-2"
              />
            </Reveal>
          </div>
        )}

        {/* 02 — Hero product moment (very large) */}
        {finalExperience?.heroMoment && (
          <div className="mt-28">
            <Reveal>
              <p className="text-sm font-medium text-(--project-accent)">02</p>
              <Heading level={3} className="mt-2 max-w-2xl text-3xl sm:text-5xl">
                {finalExperience.heroMoment.heading}
              </Heading>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">{finalExperience.heroMoment.copy}</p>
            </Reveal>

            <Reveal delay={40}>
              <p className="mx-auto mt-10 max-w-md rounded-(--radius-pill) border border-border bg-surface px-5 py-2.5 text-center text-sm text-foreground italic">
                “{finalExperience.heroMoment.prompt}”
              </p>
            </Reveal>

            <Reveal delay={60}>
              <div className="mt-8">
                {finalExperience.heroMoment.video ? (
                  <CaseStudyVideo video={finalExperience.heroMoment.video} className="mx-auto max-w-5xl" />
                ) : (
                  <MediaOrPlaceholder
                    image={finalExperience.heroMoment.image}
                    label="Plan My Night interaction needed"
                    aspect="16/9"
                    className="mx-auto max-w-5xl"
                  />
                )}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <CalloutList
                items={finalExperience.heroMoment.callouts}
                className="mx-auto mt-10 max-w-4xl sm:grid-cols-2 lg:grid-cols-5"
              />
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-10 text-center text-lg font-medium text-foreground">{finalExperience.heroMoment.principle}</p>
            </Reveal>
          </div>
        )}

        {/* 03/04 — Secondary product moments (large, then medium). A
            "large" moment only gets the wide two-column showcase once its
            screenshot exists — without one, a half-viewport empty box
            reads as broken, so it falls back to the compact centered
            treatment used for "medium" moments until the asset lands. */}
        {finalExperience?.secondaryMoments?.map((moment, i) =>
          moment.size === "large" && moment.image ? (
            <div key={moment.name} className="mt-28">
              <Reveal>
                <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                  <MediaOrPlaceholder image={moment.image} label={`${moment.name} screen`} aspect="4/3" />
                  <div>
                    <p className="text-sm font-medium text-(--project-accent)">0{i + 3}</p>
                    <Heading level={3} size={3} className="mt-2 text-2xl sm:text-3xl">
                      {moment.heading}
                    </Heading>
                    <p className="mt-3 text-muted-foreground">{moment.copy}</p>
                    <CalloutList items={moment.callouts} className="mt-8" />
                  </div>
                </div>
              </Reveal>
            </div>
          ) : (
            <div key={moment.name} className="mt-24">
              <Reveal>
                <div className="mx-auto max-w-xl text-center">
                  <p className="text-sm font-medium text-(--project-accent)">0{i + 3}</p>
                  <Heading level={3} size={3} className="mt-2 text-2xl sm:text-3xl">
                    {moment.heading}
                  </Heading>
                  <p className="mt-3 text-muted-foreground">{moment.copy}</p>
                </div>
              </Reveal>
              {moment.steps && (
                <Reveal delay={30}>
                  <div className="mt-8 flex justify-center">
                    <ChipFlow steps={moment.steps} />
                  </div>
                </Reveal>
              )}
              <Reveal delay={50}>
                <MediaOrPlaceholder
                  image={moment.image}
                  label={`${moment.name} screen`}
                  aspect="16/9"
                  className={moment.image ? "mx-auto mt-8 max-w-xl" : "mx-auto mt-8"}
                />
              </Reveal>
              <Reveal delay={70}>
                <CalloutList items={moment.callouts} className="mx-auto mt-8 max-w-xl sm:grid-cols-3" />
              </Reveal>
            </div>
          ),
        )}

        {/* Small closing synthesis row */}
        {finalExperience?.synthesis && (
          <div className="mt-24 border-t border-border pt-14">
            <Reveal>
              <p className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">System</p>
              <Heading level={3} className="mt-2 max-w-xl text-center text-2xl sm:text-3xl">
                {finalExperience.synthesis.heading}
              </Heading>
            </Reveal>
            <Reveal delay={40}>
              <div className="mx-auto mt-10 grid max-w-3xl gap-8 sm:grid-cols-3">
                {finalExperience.synthesis.items.map((item) => (
                  <div key={item.label}>
                    <MediaOrPlaceholder image={item.image} label={`${item.label} example`} aspect="4/3" />
                    <p className="mt-3 text-center text-xs font-medium tracking-wide text-(--project-accent) uppercase">
                      {item.label}
                    </p>
                    <p className="text-center text-sm text-muted-foreground">→ {item.result}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        )}

        {/* Designing for appropriate trust — a system, not another feature list */}
        {finalExperience?.trust && (
          <Reveal delay={80}>
            <div className="mt-24 border-t border-border pt-10">
              <p className="text-xs font-medium tracking-wide text-(--project-accent) uppercase">
                Designing for appropriate trust
              </p>
              <p className="mt-3 max-w-[40rem] text-lg text-foreground">{finalExperience.trust.copy}</p>
              {finalExperience.trust.items && (
                <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
                  {finalExperience.trust.items.map((item) => (
                    <div key={item.title}>
                      <MediaOrPlaceholder image={item.image} label={item.title} aspect="21/9" />
                      <p className="mt-3 text-sm font-medium text-foreground">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        )}

        {interactionDetails && (
          <Reveal delay={100}>
            <div className="mt-14 max-w-[45rem] border-t border-border pt-10">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {interactionDetails.heading ?? "Interaction details"}
              </p>
              <p className="mt-3 text-muted-foreground">{interactionDetails.copy}</p>
              {interactionDetails.videos && interactionDetails.videos.length > 0 ? (
                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  {interactionDetails.videos.map((video) => (
                    <CaseStudyVideo key={video.src} video={video} />
                  ))}
                </div>
              ) : (
                interactionDetails.details && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {interactionDetails.details.map((detail) => (
                      <Chip key={detail}>{detail}</Chip>
                    ))}
                  </div>
                )
              )}
            </div>
          </Reveal>
        )}
      </Section>

      {/* ------------------------------------------------------- TESTING */}
      <Section id="testing" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>What I&rsquo;d validate next</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
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
      <Section id="reflection" className="scroll-mt-28 bg-muted/40">
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
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {finalThoughts.nextStepsHeading ?? "Next steps"}
            </p>
            <p className="mt-3 text-muted-foreground">{finalThoughts.nextSteps}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-16">
            <CaseStudyFullImage
              image={{
                src: "/images/projects/coursepilot/iteration-plan-my-night-final.png",
                alt: "CoursePilot's final Plan My Night response: a structured card UI with top tasks, due dates, a suggested schedule, and source links.",
                width: 1440,
                height: 1024,
              }}
              className="mx-auto max-w-4xl"
            />
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
