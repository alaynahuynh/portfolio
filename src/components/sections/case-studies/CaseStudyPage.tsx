import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type {
  CaseStudyData,
  CaseStudyDecision,
  CaseStudyImageSpec,
  CaseStudyVideoSpec,
  CompetitorFinding,
  IANode,
} from "@/types/case-study";
import {
  CaseStudyFullImage,
  CaseStudyContentImage,
  CaseStudyImageRow,
  CaseStudyImageWithText,
  CaseStudyBeforeAfter,
  CaseStudyFlowImage,
  CaseStudyVideo,
  CaseStudyZoomImage,
} from "@/components/sections/case-studies/media/CaseStudyMedia";
import {
  CaseStudySectionMobileNav,
  type CaseStudyNavSection,
} from "@/components/sections/case-studies/CaseStudySectionNav";

/** `accent` switches from the shared portfolio green to this project's
 * own `--project-accent` (set once on the page wrapper — see
 * CaseStudyPage below) — reserved for the handful of "detail/annotation/
 * important moment" eyebrows a project calls out, not every section. */
/** External CTAs (e.g. a live product) open in a new tab; in-page "#" ones don't. */
function externalLinkProps(href: string) {
  return /^https?:\/\//.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

function SectionEyebrow({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase before:h-px before:w-6 before:bg-current before:opacity-50",
        accent ? "text-(--project-accent)" : "text-sage-deep",
      )}
    >
      {children}
    </p>
  );
}

/**
 * Text beside media, alternating sides — the "text left / visual right"
 * and "visual left / text right" building block reused across Canvas
 * Integration, CoursePilot's final-experience features, and build
 * stories once they have real images. Stacks image-first on mobile.
 * Built on the existing Frame-based media primitives, not a new one.
 */
function MediaText({
  eyebrow,
  heading,
  children,
  media,
  mediaPosition = "right",
  accent,
}: {
  eyebrow?: string;
  heading: string;
  children: React.ReactNode;
  media: { image?: CaseStudyImageSpec; video?: CaseStudyVideoSpec };
  mediaPosition?: "left" | "right";
  accent?: boolean;
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 sm:items-center sm:gap-12">
      <div className={cn(mediaPosition === "left" && "sm:order-2")}>
        {eyebrow && (
          <p
            className={cn(
              "text-xs font-semibold tracking-[0.14em] uppercase",
              accent ? "text-(--project-accent)" : "text-sage-deep",
            )}
          >
            {eyebrow}
          </p>
        )}
        <Heading level={3} size={3} className={eyebrow ? "mt-2" : undefined}>
          {heading}
        </Heading>
        <div className="mt-3 max-w-md text-muted-foreground">{children}</div>
      </div>
      <div className={cn(mediaPosition === "left" && "sm:order-1")}>
        {media.video ? (
          <CaseStudyVideo video={media.video} />
        ) : media.image ? (
          <CaseStudyContentImage image={media.image} className="max-w-none" />
        ) : null}
      </div>
    </div>
  );
}

/**
 * Large, centered-feeling editorial statement — an eyebrow, a big
 * headline, and a narrow paragraph with generous whitespace, for the
 * "one big idea" beats (the opportunity, a research takeaway) rather
 * than another label/heading/paragraph section.
 */
function Statement({
  eyebrow,
  heading,
  children,
  accent,
  className,
}: {
  eyebrow: string;
  heading: string;
  children?: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <SectionEyebrow accent={accent}>{eyebrow}</SectionEyebrow>
      <Heading level={2} className="mt-4 max-w-xl text-3xl sm:text-5xl">
        {heading}
      </Heading>
      {children && (
        <div className="mt-6 max-w-lg text-lg text-foreground">
          {children}
        </div>
      )}
    </div>
  );
}

/** Marks a section as scaffolded with generic filler content rather than
 * real material — see each CaseStudyData section's own `placeholder`
 * flag. Kept visible in the UI (not just in the data file) so it's
 * obvious what still needs a real pass. */
function PlaceholderTag() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-(--radius-pill) border border-dashed border-muted-foreground/40 px-3 py-1 text-xs font-medium text-muted-foreground">
      Placeholder — replace before publishing
    </span>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-(--radius-pill) border border-border bg-surface px-3 py-1 text-sm text-foreground">
      {children}
    </span>
  );
}

/** Restrained capability-state label for a CaseStudyLandscape cell — plain
 * text, never a colored "win/lose" badge or check/X icon. The subject
 * product's column reads with slightly more weight than the others so
 * the table still feels objective rather than a sales comparison. */
function LandscapeValue({ value, emphasize }: { value: string; emphasize?: boolean }) {
  return (
    <span className={cn("text-sm", emphasize ? "font-medium text-foreground" : "text-muted-foreground")}>
      {value}
    </span>
  );
}

/** "A + B + C → Result" equation-style visual for an opportunity
 * section — plain chips and a final arrow, not a diagram. */
function EquationRow({ steps, result }: { steps: string[]; result: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-3">
          <Chip>{step}</Chip>
          {i < steps.length - 1 && (
            <span className="text-muted-foreground" aria-hidden="true">
              +
            </span>
          )}
        </span>
      ))}
      <span className="text-muted-foreground" aria-hidden="true">
        →
      </span>
      <span className="inline-flex items-center rounded-(--radius-pill) bg-sage-deep px-4 py-1.5 text-sm font-medium text-white">
        {result}
      </span>
    </div>
  );
}

/** Competitive discovery, one competitor at a time: a full-width,
 * zoomable research visual (when one exists) with its findings directly
 * beneath, split into what worked / what fell short / what it meant for
 * the product — then the opportunity those findings add up to. */
function CompetitorBreakdown({
  discovery,
  productName,
}: {
  discovery: NonNullable<CaseStudyData["research"]["competitiveDiscovery"]>;
  productName: string;
}) {
  return (
    <div className="mt-16">
      {discovery.narrative && (
        <Reveal>
          <p className="max-w-2xl text-lg text-foreground">{discovery.narrative}</p>
        </Reveal>
      )}

      <div className={cn("space-y-16", discovery.narrative && "mt-14")}>
        {(discovery.competitors ?? []).map((competitor, i) => (
          <CompetitorBlock key={competitor.name} competitor={competitor} index={i} productName={productName} />
        ))}
      </div>

      <Reveal className="mt-16 border-t border-border pt-12">
        {discovery.opportunityContext && (
          <p className="max-w-2xl text-muted-foreground">{discovery.opportunityContext}</p>
        )}
        <div className="mt-6 max-w-2xl border-l-2 border-sage-deep pl-6">
          <p className="text-xs font-semibold tracking-[0.14em] text-sage-deep uppercase">Opportunity</p>
          <p className="mt-2 text-xl text-foreground">{discovery.opportunity}</p>
        </div>
        {discovery.flowSteps.length > 0 && (
          <div className="mt-10">
            {discovery.flowLabel && (
              <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {discovery.flowLabel}
              </p>
            )}
            <FlowDiagram steps={discovery.flowSteps} />
          </div>
        )}
      </Reveal>
    </div>
  );
}

function CompetitorBlock({
  competitor,
  index,
  productName,
}: {
  competitor: CompetitorFinding;
  index: number;
  productName: string;
}) {
  const columns = [
    { label: "What worked", items: competitor.strengths },
    { label: "Where it fell short", items: competitor.limitations },
  ];
  return (
    <Reveal className={cn(index > 0 && "border-t border-border pt-16")}>
      <p className="font-heading text-3xl text-sage-deep/50">{String(index + 1).padStart(2, "0")}</p>
      <Heading level={3} size={3} className="mt-1">
        {competitor.name}
      </Heading>

      {competitor.image && (
        <div className="mt-8 xl:-mx-12">
          <CaseStudyZoomImage image={competitor.image} />
        </div>
      )}

      <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-10">
        {columns.map((col) => (
          <div key={col.label}>
            <Heading level={4} size={4} className="text-muted-foreground">
              {col.label}
            </Heading>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-muted-foreground marker:text-sage-deep">
              {col.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <Heading level={4} size={4} className="text-sage-deep">
            What it meant for {productName}
          </Heading>
          <p className="mt-3 text-sm text-foreground">{competitor.applied}</p>
        </div>
      </div>
    </Reveal>
  );
}

/** One key decision: header, then problem + evidence on the left and the
 * decision / tradeoff / outcome on the right, with its real product
 * visual full-width beneath. */
function DecisionBlock({ decision, index }: { decision: CaseStudyDecision; index: number }) {
  return (
    <article
      id={`decision-${index + 1}`}
      className={cn("scroll-mt-28", index > 0 && "border-t border-border pt-16 sm:pt-20")}
    >
      <Reveal>
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-(--project-accent) uppercase before:h-px before:w-6 before:bg-current before:opacity-50">
          Decision {String(index + 1).padStart(2, "0")} · {decision.tension}
        </p>
        <Heading level={3} className="mt-3 max-w-3xl text-2xl sm:text-4xl">
          {decision.title}
        </Heading>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <Reveal delay={60}>
          <Heading level={4} size={4} className="text-muted-foreground">
            The problem
          </Heading>
          <p className="mt-2 text-muted-foreground">{decision.problem}</p>

          <Heading level={4} size={4} className="mt-8 text-muted-foreground">
            Evidence
          </Heading>
          <ul className="mt-3 space-y-4">
            {decision.evidence.map((item) => (
              <li key={item.text} className="text-sm text-muted-foreground">
                <span className="mb-1 block text-xs font-semibold tracking-[0.14em] text-foreground uppercase">
                  {item.source}
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <div className="border-l-2 border-(--project-accent) pl-6">
            <Heading level={4} size={4} className="text-(--project-accent)">
              Decision
            </Heading>
            <p className="mt-2 text-lg text-foreground">{decision.decision}</p>
          </div>
          <dl className="mt-8 space-y-6 pl-6">
            <div>
              <dt className="font-medium text-foreground">Tradeoff</dt>
              <dd className="mt-1 text-muted-foreground">{decision.tradeoff}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Outcome</dt>
              <dd className="mt-1 text-muted-foreground">{decision.outcome}</dd>
            </div>
          </dl>
          {decision.status && (
            <p className="mt-6 ml-6 inline-flex items-center gap-2 rounded-(--radius-pill) border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-(--project-accent)" aria-hidden="true" />
              {decision.status}
            </p>
          )}
        </Reveal>
      </div>

      {decision.steps && decision.steps.length > 0 && (
        <Reveal delay={80} className="mt-12 rounded-(--radius-default) border border-border bg-surface p-6 sm:p-8">
          <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            The creator flow this produced
          </p>
          <FlowDiagram steps={decision.steps} />
        </Reveal>
      )}
      {decision.videos && decision.videos.length > 0 && (
        <Reveal delay={80} className="mt-12">
          <div className={cn("grid items-start gap-6", decision.videos.length > 1 && "sm:grid-cols-2 lg:grid-cols-3")}>
            {decision.videos.map((video) => (
              <CaseStudyVideo key={video.src} video={video} />
            ))}
          </div>
        </Reveal>
      )}
      {decision.images && decision.images.length > 0 && (
        <Reveal delay={80} className={decision.steps?.length ? "mt-6" : "mt-12"}>
          {/* Under the flow steps, a lone image is supporting evidence
              (e.g. a lo-fi wireframe), so it stays at content width. */}
          {decision.steps?.length && decision.images.length === 1 ? (
            <CaseStudyContentImage image={decision.images[0]} />
          ) : (
            <StoryImages images={decision.images} />
          )}
        </Reveal>
      )}
    </article>
  );
}

/** Screenshot layout sized by count: one image runs full width, three
 * lead with a full-width image over a pair, anything else is a 2-up row. */
function StoryImages({ images }: { images: CaseStudyImageSpec[] }) {
  if (images.length === 1) {
    return <CaseStudyFullImage image={images[0]} />;
  }
  if (isDevicePair(images)) {
    // Columns sized to the two aspect ratios so both screens share a height.
    return (
      <div className="grid items-start gap-6 sm:grid-cols-[minmax(0,3.4fr)_minmax(0,1fr)]">
        <CaseStudyContentImage
          image={images[0]}
          className="max-w-none"
          sizes={DEVICE_PAIR_DESKTOP_SIZES}
        />
        <CaseStudyContentImage
          image={images[1]}
          className="max-w-60 sm:max-w-none"
          sizes={DEVICE_PAIR_MOBILE_SIZES}
        />
      </div>
    );
  }
  if (images.length === 3) {
    return (
      <div className="space-y-6">
        <CaseStudyFullImage image={images[0]} />
        <CaseStudyImageRow images={images.slice(1)} columns={2} />
      </div>
    );
  }
  return <CaseStudyImageRow images={images} columns={2} />;
}

/** Device-pair columns are 3.4fr / 1fr of the content width. */
const DEVICE_PAIR_DESKTOP_SIZES = "(min-width: 1280px) 960px, (min-width: 640px) 78vw, 100vw";
const DEVICE_PAIR_MOBILE_SIZES = "(min-width: 1280px) 290px, (min-width: 640px) 23vw, 240px";

/** A landscape (desktop) screenshot followed by a portrait (mobile) one. */
function isDevicePair(images: CaseStudyImageSpec[]) {
  const [desktop, mobile] = images;
  return (
    images.length === 2 &&
    desktop.width > desktop.height &&
    mobile.height > mobile.width
  );
}

function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <span className="rounded-(--radius-default) border border-border bg-surface px-3 py-2 text-sm text-foreground">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="text-muted-foreground" aria-hidden="true">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function IATree({ node, depth = 0 }: { node: IANode; depth?: number }) {
  return (
    <li>
      <span
        className={cn(
          "inline-block rounded px-2 py-0.5 text-sm",
          depth === 0
            ? "font-semibold text-foreground"
            : "text-muted-foreground",
        )}
      >
        {node.label}
      </span>
      {node.children && (
        <ul className="mt-1 ml-4 space-y-1 border-l border-border pl-4">
          {node.children.map((child, i) => (
            <IATree
              key={`${child.label}-${i}`}
              node={child}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function StatCallout({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="rounded-(--radius-default) border border-border bg-surface p-8 text-center">
      <p className="text-4xl font-semibold text-sage-deep sm:text-5xl">
        {value}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{caption}</p>
    </div>
  );
}

function QuoteBlock({
  text,
  attribution,
}: {
  text: string;
  attribution: string;
}) {
  return (
    <blockquote className="border-l-2 border-sage-deep pl-6">
      <p className="text-lg text-foreground italic">&ldquo;{text}&rdquo;</p>
      <cite className="mt-2 block text-sm text-muted-foreground not-italic">
        {attribution}
      </cite>
    </blockquote>
  );
}

const SWOT_LABELS = [
  { key: "strengths", label: "Strengths" },
  { key: "weaknesses", label: "Weaknesses" },
  { key: "opportunities", label: "Opportunities" },
  { key: "threats", label: "Threats" },
] as const;

/**
 * Full case study page for one project, driven entirely by a
 * CaseStudyData object — the section anatomy (hero → overview →
 * background → research → define → ideation → design → testing/
 * iterations → results → final thoughts) is modeled on
 * mattfredette.com/#case-studies, expressed in this site's own cream /
 * serif / sage-blue visual language rather than that site's. Every
 * section with `placeholder: true` in its data renders a
 * `<PlaceholderTag />` so generic filler is never presented as real
 * research, testing, or results — see each src/data/case-studies/*
 * file for what's real per project.
 */
export function CaseStudyPage({ data }: { data: CaseStudyData }) {
  const {
    hero,
    overview,
    background,
    research,
    keyInsights,
    define,
    opportunity,
    ideation,
    productRequirements,
    designPrinciples,
    designPrinciplesDetailed,
    researchToDesign,
    platformIntegration,
    design,
    testing,
    finalProduct,
    finalExperience,
    results,
    finalThoughts,
    whatIsComplete,
    keyDecisions,
  } = data;

  // A project can supply a short curated nav instead — see
  // CaseStudyData.navOverride. Otherwise derived from the same data
  // driving the content below, not maintained separately: a section only
  // shows up in the default nav if it actually has something rendered.
  const navSections: CaseStudyNavSection[] =
    data.navOverride ??
    [
      overview.features.length > 0 && { id: "overview", label: "Overview" },
      background.narrative.trim().length > 0 && {
        id: "discovery",
        label: "Discovery",
      },
      define.hmw.trim().length > 0 && {
        id: "product-challenge",
        label: "Product Challenge",
      },
      ideation.flows.length > 0 && { id: "user-flows", label: "User Flows" },
      productRequirements.length > 0 && {
        id: "design-decisions",
        label: "Design Decisions",
      },
      design.processNarrative.trim().length > 0 && {
        id: "final-design",
        label: "Final Design",
      },
      testing.intro.trim().length > 0 && { id: "testing", label: "Testing" },
      results?.headline.trim().length && { id: "results", label: "Results" },
      finalThoughts.whatILearned.trim().length > 0 && {
        id: "reflection",
        label: "Reflection",
      },
    ].filter((section): section is CaseStudyNavSection => Boolean(section));

  // The testing section can sit right after the problem (when testing an
  // early prototype drove the design) or near the end; iterations marked
  // `later` render in their own section after the final design.
  const renderTesting = (t: {
    id: string;
    eyebrow: string;
    heading: string;
    intro: string;
    tasks: string[];
    iterations: CaseStudyData["testing"]["iterations"];
    validateNext?: CaseStudyData["testing"]["validateNext"];
    closing?: string;
    className?: string;
    images?: CaseStudyImageSpec[];
    changedLabel?: string;
  }) => (
        <Section id={t.id} className={cn("scroll-mt-28", t.className)}>
          <Reveal className="flex flex-wrap items-center gap-3">
            <SectionEyebrow>{t.eyebrow}</SectionEyebrow>
            {t.id === "testing" && testing.placeholder && !t.validateNext && <PlaceholderTag />}
          </Reveal>
          <Heading level={2} className="mt-2 text-3xl sm:text-5xl">
            {t.heading}
          </Heading>
          <Reveal delay={60} className="mt-4 max-w-xl text-muted-foreground">
            <p>{t.intro}</p>
          </Reveal>

          {t.validateNext && t.validateNext.length > 0 ? (
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {t.validateNext.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <p className="text-sm font-semibold text-sage-deep">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.question}
                  </p>
                </Reveal>
              ))}
            </div>
          ) : (
            <>
              {t.tasks.length > 0 && (
              <ol className="mt-6 grid list-decimal gap-2 pl-5 text-muted-foreground sm:grid-cols-2">
                {t.tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ol>
              )}
              {t.images && t.images.length > 0 && (
                <div className="mt-10 grid items-start gap-6 sm:grid-cols-2">
                  {t.images.map((image) => (
                    <CaseStudyContentImage key={image.src} image={image} className="max-w-none" sizes="(min-width: 640px) 50vw, 100vw" />
                  ))}
                </div>
              )}

              {t.iterations.filter((it) => !it.isTechnicalNote).length >
                0 && (
                <div className="mt-12 border-b border-border">
                  {t.iterations
                    .filter((it) => !it.isTechnicalNote)
                    .map((iteration, i) => (
                      <Reveal
                        key={iteration.title}
                        delay={Math.min(i * 40, 200)}
                        className="grid gap-4 border-t border-border py-8 lg:grid-cols-3 lg:gap-10"
                      >
                        <div>
                          <p className="font-heading text-2xl text-sage-deep/50">
                            {String(i + 1).padStart(2, "0")}
                          </p>
                          <Heading level={3} size={4} className="mt-1">
                            {iteration.title}
                          </Heading>
                        </div>
                        <div>
                          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                            What testing showed
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">{iteration.feedback}</p>
                        </div>
                        {iteration.finalIteration && (
                          <div>
                            <p className="text-xs font-semibold tracking-[0.14em] text-sage-deep uppercase">
                              {t.changedLabel ?? "What I changed"}
                            </p>
                            <p className="mt-2 text-sm text-foreground">{iteration.finalIteration}</p>
                          </div>
                        )}
                        {iteration.beforeAfter && (
                          <div className="mt-2 lg:col-span-3">
                            <CaseStudyBeforeAfter
                              before={iteration.beforeAfter.before}
                              after={iteration.beforeAfter.after}
                              beforeLabel={iteration.beforeAfter.beforeLabel}
                              afterLabel={iteration.beforeAfter.afterLabel}
                            />
                          </div>
                        )}
                        {iteration.videos && iteration.videos.length > 0 && (
                          <div
                            className={cn(
                              "grid items-start gap-6 lg:col-span-3",
                              iteration.videos.length > 1 && "sm:grid-cols-2 lg:grid-cols-3",
                            )}
                          >
                            {iteration.videos.map((video) => (
                              <CaseStudyVideo key={video.src} video={video} />
                            ))}
                          </div>
                        )}
                      </Reveal>
                    ))}
                </div>
              )}

              {t.iterations.filter((it) => it.isTechnicalNote).length >
                0 && (
                <div className="mt-6 space-y-3">
                  {t.iterations
                    .filter((it) => it.isTechnicalNote)
                    .map((iteration) => (
                      <div
                        key={iteration.title}
                        className="rounded-(--radius-default) border border-border bg-surface p-4 text-sm"
                      >
                        <p className="font-medium text-foreground">
                          Technical note — {iteration.title}
                        </p>
                        <p className="mt-1 text-muted-foreground">
                          {iteration.feedback} {iteration.finalIteration}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </>
          )}

          {t.closing && (
            <Reveal>
              <p className="mt-14 max-w-[45rem] text-sm text-muted-foreground">{t.closing}</p>
            </Reveal>
          )}
        </Section>
  );
  const testingEarly = testing.placement === "after-problem" || testing.placement === "before-decisions";
  const testingMain = renderTesting({
    id: "testing",
    eyebrow: testingEarly ? "Usability testing" : "Testing & iterations",
    heading: testing.heading ?? "Putting it in front of users",
    intro: testing.intro,
    tasks: testing.tasks,
    iterations: testing.iterations.filter((it) => !it.later),
    validateNext: testing.validateNext,
    closing: testing.closingStatement,
    className: testingEarly ? "cs-band" : undefined,
    images: testing.images,
    changedLabel: testing.changedLabel,
  });
  const laterIterations = testing.iterations.filter((it) => it.later);
  const testingLater =
    laterIterations.length > 0
      ? renderTesting({
          id: "iterations",
          eyebrow: "Iterations",
          heading: testing.laterHeading ?? "Iterating on the product",
          intro: testing.laterIntro ?? "",
          tasks: testing.laterTasks ?? [],
          iterations: laterIterations,
        })
      : null;

  // Flows normally sit with ideation; "after-decisions" moves them below
  // the key decisions, for when the mapped flows show the redesign.
  const flowsLate = ideation.flowsPlacement === "after-decisions";
  const flowsSection = (
        <Section id="user-flows" className="scroll-mt-28">
          <Reveal className="flex flex-wrap items-center gap-3">
            <SectionEyebrow>Ideation</SectionEyebrow>
            {ideation.flowsPlaceholder && <PlaceholderTag />}
          </Reveal>
          <Heading level={2} className="mt-2 text-3xl sm:text-5xl">
            {ideation.flowsSectionTitle ?? "User flows"}
          </Heading>
          {ideation.flowsIntro && (
            <Reveal delay={60} className="mt-4 max-w-xl text-muted-foreground">
              <p>{ideation.flowsIntro}</p>
            </Reveal>
          )}

          {ideation.flows.some((flow) => flow.layout) ? (
            <div className="mt-14 space-y-20 sm:space-y-24">
              {ideation.flows.map((flow, i) => {
                if (flow.layout === "featured" && flow.image) {
                  return (
                    <Reveal key={flow.name} delay={i * 60}>
                      <Heading level={3} size={4} className="text-center">
                        {flow.name}
                      </Heading>
                      <div className="mt-6">
                        <CaseStudyFlowImage
                          image={flow.image}
                          className="max-w-2xl"
                        />
                      </div>
                      {flow.takeaway && (
                        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted-foreground">
                          {flow.takeaway}
                        </p>
                      )}
                    </Reveal>
                  );
                }

                if (
                  (flow.layout === "text-left" || flow.layout === "text-right") &&
                  flow.image
                ) {
                  const imageFirst = flow.layout === "text-right";
                  return (
                    <Reveal key={flow.name} delay={i * 60}>
                      <div className="grid gap-8 sm:grid-cols-2 sm:items-center">
                        <div className={cn(imageFirst && "sm:order-2")}>
                          <Heading level={3} size={4}>
                            {flow.name}
                          </Heading>
                          {flow.description && (
                            <p className="mt-3 text-muted-foreground">
                              {flow.description}
                            </p>
                          )}
                        </div>
                        <div className={cn(imageFirst && "sm:order-1")}>
                          <CaseStudyFlowImage image={flow.image} />
                        </div>
                      </div>
                    </Reveal>
                  );
                }

                return (
                  <Reveal key={flow.name} delay={i * 60}>
                    <Heading
                      level={3}
                      size={4}
                      className={cn(flow.image && "text-center")}
                    >
                      {flow.name}
                    </Heading>
                    {flow.image ? (
                      <div className="mt-5">
                        <CaseStudyFlowImage image={flow.image} />
                      </div>
                    ) : (
                      <div className="mt-4">
                        <FlowDiagram steps={flow.steps} />
                      </div>
                    )}
                    {flow.takeaway && (
                      <p className="mt-4 text-sm text-muted-foreground">
                        {flow.takeaway}
                      </p>
                    )}
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div
              className={cn(
                "mt-10",
                ideation.flows.every((flow) => flow.image)
                  ? "grid gap-10 sm:grid-cols-2"
                  : "space-y-10",
              )}
            >
              {ideation.flows.map((flow, i) => (
                <Reveal key={flow.name} delay={i * 60}>
                  <Heading
                    level={3}
                    size={4}
                    className={cn(flow.image && "text-center")}
                  >
                    {flow.name}
                  </Heading>
                  {flow.image ? (
                    // Dense diagrams: open in the lightbox to read up close.
                    <div className="mt-5">
                      <CaseStudyZoomImage image={flow.image} />
                    </div>
                  ) : (
                    <div className="mt-4">
                      <FlowDiagram steps={flow.steps} />
                    </div>
                  )}
                  {flow.takeaway && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      {flow.takeaway}
                    </p>
                  )}
                </Reveal>
              ))}
            </div>
          )}

          {ideation.sketchImages && ideation.sketchImages.length > 0 && (
            <Reveal className="mt-16">
              <Heading level={3} size={4}>
                Early sketches
              </Heading>
              <div className="mt-6">
                <CaseStudyImageRow images={ideation.sketchImages} />
              </div>
            </Reveal>
          )}

          {ideation.ia && (
            <Reveal className="mt-16 border-t border-border pt-10">
              <Heading level={4} size={4} className="text-muted-foreground">
                Information architecture
              </Heading>
              <ul className="mt-4 space-y-1">
                <IATree node={ideation.ia} />
              </ul>
              {ideation.iaImage && (
                <div className="mt-6">
                  <CaseStudyContentImage image={ideation.iaImage} />
                </div>
              )}
            </Reveal>
          )}
        </Section>
  );

  return (
    <div
      className="case-study bg-background"
      style={
        {
          "--project-accent": data.accentColor ?? "var(--color-sage-deep)",
        } as React.CSSProperties
      }
    >
      <Section className="pt-24 pb-0 sm:pt-32">
        <Link
          href="/#work"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to Work
        </Link>

        <p className="mt-8 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          {hero.category}
        </p>
        <Heading level={1} className="mt-2">
          {hero.title}
        </Heading>
        <p className="mt-3 max-w-2xl text-xl text-foreground">
          {hero.tagline}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 rounded-(--radius-pill) bg-mist-blue px-3 py-1 text-xs font-medium text-sage-deep">
          <span className="size-1.5 rounded-full bg-sage-deep" />
          {hero.statusLabel}
        </span>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          {hero.description}
        </p>

        <a
          href={hero.ctaHref}
          {...externalLinkProps(hero.ctaHref)}
          className="mt-6 inline-flex items-center gap-2 rounded-(--radius-default) bg-(--project-accent) px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--project-accent)"
        >
          {hero.ctaLabel} →
        </a>

        {hero.disclosure && (
          <p className="mt-4 max-w-xl text-xs text-muted-foreground/80">{hero.disclosure}</p>
        )}

        {hero.tools && hero.tools.length > 0 && (
          <p className="mt-5 text-sm text-muted-foreground">
            <span className="text-foreground">Tools:</span>{" "}
            {hero.tools.join(", ")}
          </p>
        )}

        {hero.video ? (
          <div className="mt-10">
            <CaseStudyVideo video={hero.video} />
          </div>
        ) : hero.image ? (
          <div className="mt-10">
            <CaseStudyFullImage image={hero.image} eager />
          </div>
        ) : null}

        <dl className="mt-10 grid max-w-3xl gap-6 border-t border-border pt-6 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] sm:gap-10">
          {[
            { label: "Role", value: overview.role },
            { label: "Duration", value: overview.duration },
            { label: "Platform", value: hero.platform },
          ]
            .filter((item) => item.value)
            .map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-foreground">{item.value}</dd>
              </div>
            ))}
        </dl>
      </Section>

      <CaseStudySectionMobileNav sections={navSections} />

      {overview.features.length > 0 && (
      <Section id="overview" className="scroll-mt-28">
        <Reveal>
          <SectionEyebrow>Overview</SectionEyebrow>
          <Heading level={2} className="mt-2 text-3xl sm:text-5xl">
            {overview.featuresHeading ?? "Key features"}
          </Heading>
        </Reveal>
        {overview.featuresIntro && (
          <Reveal delay={30}>
            <p className="mt-4 max-w-xl text-muted-foreground">
              {overview.featuresIntro}
            </p>
          </Reveal>
        )}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {overview.features.map((feature, i) => (
            <Reveal
              key={feature.name}
              delay={i * 60}
              className="rounded-(--radius-default) border border-border bg-surface p-6"
            >
              <Heading level={3} size={4}>
                {feature.name}
              </Heading>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>
      )}

      <Section id="discovery" className="scroll-mt-28 cs-band">
        <Reveal className="flex flex-wrap items-center gap-3">
          <SectionEyebrow>The problem</SectionEyebrow>
          {background.placeholder && <PlaceholderTag />}
        </Reveal>
        <Heading level={2} className="mt-4 max-w-3xl text-3xl leading-tight sm:text-5xl">
          {background.heading ?? "The problem"}
        </Heading>
        <Reveal delay={60} className="mt-8 max-w-2xl space-y-4 text-lg text-muted-foreground">
          {background.narrative.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        {background.challenge && (
          <Reveal delay={100} className="mt-12 max-w-2xl border-l-2 border-sage-deep pl-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-sage-deep uppercase">
              Design challenge
            </p>
            <p className="mt-3 font-heading text-2xl leading-snug text-foreground sm:text-3xl">
              {background.challenge}
            </p>
          </Reveal>
        )}
        {background.stat && (
          <Reveal delay={100} className="mt-8 max-w-xs">
            <StatCallout
              value={background.stat.value}
              caption={background.stat.caption}
            />
          </Reveal>
        )}

        {background.principles && (
          <Reveal delay={120} className="mt-16">
            <Heading level={3} size={4}>
              {background.principles.title}
            </Heading>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {background.principles.items.map((principle, i) => (
                <div key={principle.title}>
                  <p className="text-sm font-semibold text-sage-deep">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-medium text-foreground">
                    {principle.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </Section>

      {testing.placement === "after-problem" && testingMain}

      <Section id="research" className="scroll-mt-28">
        <Reveal className="flex flex-wrap items-center gap-3">
          <SectionEyebrow>Research</SectionEyebrow>
        </Reveal>
        <Heading level={2} className="mt-2 text-3xl sm:text-5xl">
          {research.heading ?? "Leading discovery"}
        </Heading>
        <Reveal delay={60} className="mt-4 max-w-xl text-muted-foreground">
          <p>{research.intro}</p>
          {research.participants && (
            <p className="mt-2 text-sm">{research.participants}</p>
          )}
        </Reveal>

        {research.keyFindings && research.keyFindings.length > 0 ? (
          <Reveal delay={100} className="mt-12">
            <Heading level={3} size={4}>
              Key findings
            </Heading>
            {/* Same three-column row as the testing iterations: what was
                heard, then — kept visibly separate — what is and isn't built. */}
            <div className="mt-6 border-b border-border">
              {research.keyFindings.map((finding, i) => (
                <div
                  key={finding.title}
                  className="grid gap-4 border-t border-border py-8 lg:grid-cols-3 lg:gap-10"
                >
                  <div>
                    <p className="font-heading text-2xl text-sage-deep/50">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <Heading level={4} size={4} className="mt-1">
                      {finding.title}
                    </Heading>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                      What artists said
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {finding.whatParticipantsSaid}
                    </p>
                  </div>
                  {finding.designResponse && (
                    <div>
                      <p className="text-xs font-semibold tracking-[0.14em] text-sage-deep uppercase">
                        How the design responded
                      </p>
                      <p className="mt-2 text-sm text-foreground">
                        {finding.designResponse}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        ) : (
          research.findings.length > 0 && (
          <>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Heading level={3} size={4}>
                Findings
              </Heading>
              {research.findingsPlaceholder && <PlaceholderTag />}
            </div>
            <div className="mt-10 space-y-14">
              {research.findings.map((finding, i) => {
            const details = (
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    What participants said
                  </dt>
                  <dd className="mt-1 text-muted-foreground">
                    {finding.whatParticipantsSaid}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    Why this matters
                  </dt>
                  <dd className="mt-1 text-muted-foreground">
                    {finding.whyItMatters}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.14em] text-sage-deep uppercase">
                    Design response
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {finding.designResponse}
                  </dd>
                </div>
              </dl>
            );

            return (
              <Reveal
                key={finding.title}
                delay={Math.min(i * 40, 200)}
                className={cn(
                  "grid gap-6 sm:grid-cols-[auto_1fr]",
                  i > 0 && "border-t border-border pt-14",
                )}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mist-blue text-sm font-semibold text-sage-deep">
                  {i + 1}
                </div>
                <div>
                  <Heading level={4} size={4}>
                    {finding.title}
                  </Heading>
                  {finding.image ? (
                    <div className="mt-4">
                      <CaseStudyImageWithText image={finding.image}>
                        {details}
                      </CaseStudyImageWithText>
                    </div>
                  ) : (
                    <div className="mt-4">{details}</div>
                  )}
                </div>
              </Reveal>
            );
              })}
            </div>
          </>
          )
        )}

        {research.competitiveDiscovery?.competitors ? (
          <CompetitorBreakdown discovery={research.competitiveDiscovery} productName={hero.title} />
        ) : research.competitiveDiscovery ? (
          <Reveal delay={100} className="mt-16">
            <div className="flex flex-wrap items-center gap-3">
              <Heading level={3} size={4}>
                {research.competitiveDiscovery.competitor}
              </Heading>
              {research.competitiveDiscovery.placeholder && (
                <PlaceholderTag />
              )}
            </div>
            {research.competitiveDiscovery.image ? (
              <div className="mt-6">
                <CaseStudyImageWithText
                  image={research.competitiveDiscovery.image}
                >
                  <p className="text-muted-foreground">
                    {research.competitiveDiscovery.narrative}
                  </p>
                </CaseStudyImageWithText>
              </div>
            ) : (
              <p className="mt-4 max-w-xl text-muted-foreground">
                {research.competitiveDiscovery.narrative}
              </p>
            )}

            <div className="mt-8 max-w-2xl border-l-2 border-sage-deep pl-6">
              <p className="text-lg text-foreground">
                <span className="font-semibold">Opportunity:</span>{" "}
                {research.competitiveDiscovery.opportunity}
              </p>
            </div>

            <div className="mt-8">
              <FlowDiagram steps={research.competitiveDiscovery.flowSteps} />
            </div>
          </Reveal>
        ) : research.landscape ? (
          <Reveal delay={100} className="mt-16">
            <Heading level={3} size={4}>
              {research.landscape.heading ?? "Students already have tools for pieces of the problem"}
            </Heading>
            {research.landscape.intro && (
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                {research.landscape.intro}
              </p>
            )}
            <div className="mt-8 overflow-x-auto rounded-(--radius-default) border border-border/60">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="px-5 py-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                      Area
                    </th>
                    {research.landscape.columns.map((col, idx) => {
                      const isSubject = idx === research.landscape!.columns.length - 1;
                      return (
                        <th
                          key={col}
                          className={cn(
                            "px-5 py-3 text-xs font-semibold tracking-[0.14em] uppercase",
                            isSubject ? "text-foreground" : "text-muted-foreground",
                          )}
                        >
                          {col}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {research.landscape.rows.map((row, i) => (
                    <tr
                      key={row.capability}
                      className={i > 0 ? "border-t border-border/60" : undefined}
                    >
                      <td className="px-5 py-4 text-sm font-medium text-foreground">
                        {row.capability}
                      </td>
                      {row.values.map((value, j) => (
                        <td key={j} className="px-5 py-4">
                          <LandscapeValue
                            value={value}
                            emphasize={j === row.values.length - 1}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-16 max-w-xl">
              <p className="text-xs font-semibold tracking-[0.14em] text-(--project-accent) uppercase">
                {research.landscape.gap.eyebrow}
              </p>
              <Heading level={3} size={3} className="mt-4">
                {research.landscape.gap.heading}
              </Heading>
              <p className="mt-5 text-muted-foreground">
                {research.landscape.gap.body}
              </p>
            </div>
          </Reveal>
        ) : (
          <>
            <Reveal
              delay={100}
              className="mt-16 flex flex-wrap items-center gap-3"
            >
              <Heading level={3} size={4}>
                Competitive analysis
              </Heading>
              {research.swotPlaceholder && <PlaceholderTag />}
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SWOT_LABELS.map(({ key, label }) => (
                <div
                  key={key}
                  className="rounded-(--radius-default) border border-border bg-surface p-5"
                >
                  <p className="text-xs font-semibold tracking-[0.14em] text-sage-deep uppercase">
                    {label}
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {research.swot[key].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </Section>

      {keyInsights.length > 0 && (
        <Section id="insights" className="scroll-mt-28">
          <Reveal>
            <SectionEyebrow>Synthesis</SectionEyebrow>
            <Heading level={2} className="mt-2 text-3xl sm:text-5xl">
              Key insights
            </Heading>
          </Reveal>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {keyInsights.map((insight, i) => (
              <Reveal
                key={insight}
                delay={i * 40}
                className="flex gap-3 rounded-(--radius-default) border border-border bg-surface p-5"
              >
                <span className="shrink-0 text-sm font-semibold text-sage-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-foreground">{insight}</span>
              </Reveal>
            ))}
          </ol>
        </Section>
      )}

      {opportunity && (
        <Section
          id="opportunity"
          className="scroll-mt-28 py-24 sm:py-36"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--project-accent) 6%, var(--color-background))",
          }}
        >
          <Reveal>
            <Statement
              eyebrow="Opportunity"
              heading={opportunity.heading ?? "The opportunity"}
            >
              <p>{opportunity.statement}</p>
            </Statement>
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <EquationRow
              steps={opportunity.equationSteps}
              result={opportunity.resultLabel ?? hero.title}
            />
          </Reveal>
          <Reveal
            delay={140}
            className="mt-10 max-w-2xl border-l-2 border-(--project-accent) pl-6"
          >
            <p className="text-xs font-semibold tracking-[0.14em] text-(--project-accent) uppercase">
              How might we
            </p>
            <p className="mt-2 text-xl text-foreground">{define.hmw}</p>
          </Reveal>

          {researchToDesign && researchToDesign.rows.length > 0 && (
            <div className="mt-20">
              <Heading level={3} size={4}>
                {researchToDesign.heading ?? "What I learned → what I designed"}
              </Heading>
              {researchToDesign.intro && (
                <p className="mt-3 max-w-xl text-muted-foreground">
                  {researchToDesign.intro}
                </p>
              )}
              <div className="mt-8 divide-y divide-border border-t border-border">
                {researchToDesign.rows.map((row) => (
                  <div
                    key={row.learned}
                    className="grid gap-2 py-5 sm:grid-cols-2 sm:gap-8"
                  >
                    <p className="text-sm text-muted-foreground">
                      {row.learned}
                    </p>
                    <p className="text-sm text-foreground">
                      <span className="mr-2 text-sage-deep" aria-hidden="true">
                        →
                      </span>
                      {row.designed}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Section>
      )}

      {(!opportunity || define.personaName || ideation.whyThis.length > 0) && (
        <Section id="product-challenge" className="scroll-mt-28">
          <Reveal className="flex flex-wrap items-center gap-3">
            <SectionEyebrow>Define</SectionEyebrow>
            {define.personaPlaceholder && <PlaceholderTag />}
          </Reveal>
          {define.personaName && (
            <>
              <Heading level={2} className="mt-2 text-3xl sm:text-5xl">
                {define.sectionHeading ?? "Who this is for"}
              </Heading>
              <div
                className={cn(
                  "mt-8 grid gap-6",
                  define.secondaryPersona && "sm:grid-cols-2",
                )}
              >
                <div className="rounded-(--radius-default) border border-border bg-surface p-6 sm:p-8">
                  <Heading level={3} size={4}>
                    {define.personaName}
                  </Heading>
                  <p className="mt-3 text-muted-foreground">
                    {define.personaSummary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {(define.personaNeeds ?? []).map((need) => (
                      <li key={need}>
                        <Chip>{need}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
                {define.secondaryPersona && (
                  <div className="rounded-(--radius-default) border border-border bg-surface p-6 sm:p-8">
                    <Heading level={3} size={4}>
                      {define.secondaryPersona.name}
                    </Heading>
                    <p className="mt-3 text-muted-foreground">
                      {define.secondaryPersona.summary}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {define.secondaryPersona.needs.map((need) => (
                        <li key={need}>
                          <Chip>{need}</Chip>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}

          {define.tensionIntro && (
            <Reveal delay={80} className="mt-10 max-w-xl text-muted-foreground">
              <p>{define.tensionIntro}</p>
            </Reveal>
          )}

          {!opportunity && (
            <Reveal
              delay={100}
              className="mt-6 max-w-2xl border-l-2 border-sage-deep pl-6"
            >
              <p className="text-xs font-semibold tracking-[0.14em] text-sage-deep uppercase">
                How might we
              </p>
              <p className="mt-2 text-xl text-foreground">{define.hmw}</p>
            </Reveal>
          )}

          {ideation.whyThis.length > 0 && (
            <div className="mt-16">
              <div className="flex flex-wrap items-center gap-3">
                <Heading level={3} size={4}>
                  {ideation.whyThisTitle}
                </Heading>
                {ideation.whyThisPlaceholder && <PlaceholderTag />}
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {ideation.whyThis.map((item, i) => (
                  <Reveal
                    key={item.title}
                    delay={i * 60}
                    className="rounded-(--radius-default) border border-border bg-surface p-6"
                  >
                    <Heading level={4} size={4}>
                      {item.title}
                    </Heading>
                    <p className="mt-3 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Challenge:{" "}
                      </span>
                      {item.painPoint}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <span className="font-medium text-sage-deep">
                        Decision:{" "}
                      </span>
                      {item.solution}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </Section>
      )}

      {!flowsLate && flowsSection}

      {testing.placement === "before-decisions" && testingMain}

      {keyDecisions && keyDecisions.items.length > 0 && (
        <Section
          id="decisions"
          className="scroll-mt-28"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--project-accent) 5%, var(--color-background))",
          }}
        >
          <Reveal>
            <SectionEyebrow accent>Key decisions</SectionEyebrow>
            <Heading level={2} className="mt-2 max-w-3xl text-3xl sm:text-5xl">
              {keyDecisions.heading ?? "Key decisions"}
            </Heading>
            {keyDecisions.intro && (
              <p className="mt-4 max-w-xl text-muted-foreground">{keyDecisions.intro}</p>
            )}
          </Reveal>
          <div className="mt-16 space-y-16 sm:space-y-20">
            {keyDecisions.items.map((decision, i) => (
              <DecisionBlock key={decision.title} decision={decision} index={i} />
            ))}
          </div>
        </Section>
      )}

      {flowsLate && flowsSection}

      {(productRequirements.length > 0 ||
        (designPrinciplesDetailed && designPrinciplesDetailed.length > 0)) && (
        <Section id="design-decisions" className="scroll-mt-28">
          {productRequirements.length > 0 && (
            <>
              <Reveal>
                <SectionEyebrow>From insight to spec</SectionEyebrow>
                <Heading level={2} className="mt-2 text-3xl sm:text-5xl">
                  Turning the idea into product requirements
                </Heading>
              </Reveal>
              <Reveal
                delay={80}
                className="mt-10 overflow-x-auto rounded-(--radius-default) border border-border"
              >
                <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted">
                      <th className="px-5 py-3 font-medium text-foreground">
                        User need
                      </th>
                      <th className="px-5 py-3 font-medium text-foreground">
                        Product requirement
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productRequirements.map((row, i) => (
                      <tr
                        key={row.need + i}
                        className={i > 0 ? "border-t border-border" : undefined}
                      >
                        <td className="px-5 py-3 text-muted-foreground">
                          {row.need}
                        </td>
                        <td className="px-5 py-3 text-foreground">
                          {row.requirement}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            </>
          )}

          {designPrinciplesDetailed && designPrinciplesDetailed.length > 0 ? (
            <div className={productRequirements.length > 0 ? "mt-16" : undefined}>
              <Reveal>
                <SectionEyebrow>Guardrails</SectionEyebrow>
                <Heading level={2} className="mt-2 text-3xl sm:text-5xl">
                  Design principles
                </Heading>
              </Reveal>
              <div className="mt-10 grid gap-8 sm:grid-cols-3">
                {designPrinciplesDetailed.map((principle, i) => (
                  <Reveal key={principle.title} delay={i * 60}>
                    <p className="text-sm font-semibold text-sage-deep">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 font-medium text-foreground">
                      {principle.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {principle.description}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : (
            designPrinciples.length > 0 && (
              <>
                <Reveal delay={100} className="mt-16">
                  <SectionEyebrow>Guardrails</SectionEyebrow>
                  <Heading level={2} className="mt-2 text-3xl sm:text-5xl">
                    Design principles
                  </Heading>
                </Reveal>
                <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                  {designPrinciples.map((principle, i) => (
                    <Reveal
                      key={principle}
                      delay={i * 40}
                      className="flex gap-3"
                    >
                      <span
                        className="mt-1 size-1.5 shrink-0 rounded-full bg-sage-deep"
                        aria-hidden="true"
                      />
                      <span className="text-foreground">{principle}</span>
                    </Reveal>
                  ))}
                </ul>
              </>
            )
          )}
        </Section>
      )}

      <Section id="final-design" className="scroll-mt-28">
        <Reveal className="flex flex-wrap items-center gap-3">
          <SectionEyebrow>Design</SectionEyebrow>
          {design.placeholder && <PlaceholderTag />}
        </Reveal>
        <Heading level={2} className="mt-2 text-3xl sm:text-5xl">
          {design.heading ?? "From flows to a functioning product"}
        </Heading>
        <Reveal delay={60} className="mt-4 max-w-xl text-muted-foreground">
          <p>{design.processNarrative}</p>
        </Reveal>

        {design.beforeAfter && design.beforeAfter.length > 0 && (
          <div className="mt-12 space-y-10">
            <Heading level={3} size={4}>
              Early design
            </Heading>
            {design.beforeAfter.map((comparison, i) => (
              <Reveal key={i} delay={Math.min(i * 40, 200)}>
                <CaseStudyBeforeAfter
                  before={comparison.before}
                  after={comparison.after}
                  beforeLabel={comparison.beforeLabel}
                  afterLabel={comparison.afterLabel}
                />
              </Reveal>
            ))}
          </div>
        )}

        {design.wireframeScreens.length > 0 && (
          <>
            <Heading level={3} size={4} className="mt-10">
              Low-fidelity screens
            </Heading>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {design.wireframeScreens.map((screen, i) => (
                <Reveal
                  key={screen}
                  delay={Math.min(i * 25, 200)}
                  className="flex aspect-video items-center justify-center rounded-(--radius-default) border border-dashed border-border bg-surface p-4 text-center text-sm text-muted-foreground"
                >
                  {screen}
                </Reveal>
              ))}
            </div>
          </>
        )}
        {design.wireframeImages && design.wireframeImages.length > 0 && (
          <div className="mt-6">
            <CaseStudyImageRow images={design.wireframeImages} />
          </div>
        )}

        {design.highFidelityScreens.length > 0 && (
          <>
            <Heading level={3} size={4} className="mt-14">
              High-fidelity screens
            </Heading>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {design.highFidelityScreens.map((screen, i) => (
                <Reveal
                  key={screen}
                  delay={i * 40}
                  className="flex aspect-video items-center justify-center rounded-(--radius-default) border border-border bg-muted p-4 text-center text-sm font-medium text-sage-deep"
                >
                  {screen}
                </Reveal>
              ))}
            </div>
          </>
        )}
        {design.finalScreenImages &&
          design.finalScreenImages.length > 0 && (
            <div className="mt-6">
              <CaseStudyImageRow images={design.finalScreenImages} />
            </div>
          )}

        {design.buildStories && design.buildStories.length > 0 && (
          <div className="mt-14 space-y-12">
            {design.buildStories.map((story, i) => (
              <Reveal key={story.title} delay={Math.min(i * 40, 200)}>
                <Heading level={3} size={4}>
                  {story.title}
                </Heading>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  {story.description}
                </p>
                {story.images && story.images.length > 0 && (
                  <div className="mt-6">
                    <CaseStudyImageRow images={story.images} />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        )}

        {design.visualElements && (
          <Reveal delay={100} className="mt-14 grid gap-6 sm:grid-cols-3">
            <div>
              <Heading level={4} size={4}>
                Logo & color
              </Heading>
              <p className="mt-2 text-sm text-muted-foreground">
                {design.visualElements.logoAndColor}
              </p>
            </div>
            <div>
              <Heading level={4} size={4}>
                Typography
              </Heading>
              <p className="mt-2 text-sm text-muted-foreground">
                {design.visualElements.typography}
              </p>
            </div>
            <div>
              <Heading level={4} size={4}>
                UI components
              </Heading>
              <p className="mt-2 text-sm text-muted-foreground">
                {design.visualElements.components}
              </p>
            </div>
          </Reveal>
        )}

        {finalProduct && (
          // Without an intro, the stories follow the section's own
          // heading directly instead of opening a second sub-section.
          <div className={finalProduct.intro ? "mt-20 border-t border-border pt-16" : undefined}>
            {finalProduct.intro && (
              <>
                <Reveal className="flex flex-wrap items-center gap-3">
                  <SectionEyebrow>The final experience</SectionEyebrow>
                  {finalProduct.placeholder && <PlaceholderTag />}
                </Reveal>
                <Reveal
                  delay={60}
                  className="mt-4 max-w-xl text-muted-foreground"
                >
                  <p>{finalProduct.intro}</p>
                </Reveal>
              </>
            )}
            <div className="mt-12 space-y-20">
              {finalProduct.stories.map((story, i) => (
                <Reveal key={story.title} delay={Math.min(i * 40, 200)}>
                  <Heading level={3} size={3}>
                    {String(i + 1).padStart(2, "0")} — {story.title}
                  </Heading>
                  <p className="mt-2 max-w-xl text-muted-foreground">
                    {story.description}
                  </p>
                  {story.images?.length === 1 && story.videos?.length === 1 ? (
                    // One still + one clip of the same moment: side by
                    // side so the screenshot and its motion read together.
                    // Columns sized to the two aspect ratios so both render
                    // at the same height.
                    <div
                      className="mt-8 grid items-start gap-6 sm:grid-cols-(--story-cols)"
                      style={
                        {
                          "--story-cols": `minmax(0,${story.images[0].width / story.images[0].height}fr) minmax(0,${story.videos[0].width / story.videos[0].height}fr)`,
                        } as React.CSSProperties
                      }
                    >
                      <CaseStudyContentImage image={story.images[0]} className="max-w-none" />
                      <CaseStudyVideo video={story.videos[0]} />
                    </div>
                  ) : story.images && isDevicePair(story.images) ? (
                    // Desktop + mobile pair: columns sized to the two
                    // aspect ratios so both screens render at the same
                    // height, instead of the phone screen dwarfing the
                    // desktop one in equal-width columns.
                    <div className="mt-8 grid items-start gap-6 sm:grid-cols-[minmax(0,3.4fr)_minmax(0,1fr)]">
                      <CaseStudyContentImage
                        image={story.images[0]}
                        className="max-w-none"
                        sizes={DEVICE_PAIR_DESKTOP_SIZES}
                      />
                      <CaseStudyContentImage
                        image={story.images[1]}
                        className="max-w-60 sm:max-w-none"
                        sizes={DEVICE_PAIR_MOBILE_SIZES}
                      />
                    </div>
                  ) : (
                    story.images &&
                    story.images.length > 0 && (
                      <div className="mt-8">
                        <StoryImages images={story.images} />
                      </div>
                    )
                  )}
                  {!(story.images?.length === 1 && story.videos?.length === 1) &&
                    story.videos &&
                    story.videos.length > 0 && (
                    <div
                      className={cn(
                        "grid gap-6",
                        story.images?.length ? "mt-6" : "mt-8",
                        story.videos.length > 1 && "sm:grid-cols-2",
                      )}
                    >
                      {story.videos.map((video) => (
                        <CaseStudyVideo key={video.src} video={video} />
                      ))}
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </Section>

      {platformIntegration && (
        <Section id="platform-integration" className="scroll-mt-28">
          <Reveal>
            <SectionEyebrow accent>Integration</SectionEyebrow>
            <Heading level={2} className="mt-2 max-w-2xl text-3xl sm:text-5xl">
              {platformIntegration.heading ?? "Meeting people where they already work"}
            </Heading>
          </Reveal>
          <Reveal delay={60} className="mt-4 max-w-xl text-muted-foreground">
            <p>{platformIntegration.copy}</p>
          </Reveal>
          {platformIntegration.image ? (
            <div className="mt-12">
              <CaseStudyFullImage image={platformIntegration.image} />
            </div>
          ) : (
            platformIntegration.flowSteps &&
            platformIntegration.flowSteps.length > 0 && (
              <div className="mt-10">
                <FlowDiagram steps={platformIntegration.flowSteps} />
              </div>
            )
          )}
        </Section>
      )}

      {finalExperience && (
        <Section id="final-experience" className="scroll-mt-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionEyebrow>Final solution</SectionEyebrow>
              <Heading level={2} className="mt-2 max-w-2xl text-3xl sm:text-5xl">
                {finalExperience.heading ?? "The final experience"}
              </Heading>
              {finalExperience.subheading && (
                <p className="mt-4 max-w-xl text-muted-foreground">
                  {finalExperience.subheading}
                </p>
              )}
            </div>
            <a
              href={hero.ctaHref}
              {...externalLinkProps(hero.ctaHref)}
              className="inline-flex shrink-0 items-center gap-2 rounded-(--radius-default) border border-dashed border-border px-5 py-2.5 text-sm font-medium text-muted-foreground"
            >
              {hero.ctaLabel} →
            </a>
          </Reveal>

          <div className="mt-14 space-y-20">
            {finalExperience.features.map((feature, i) => {
              const featureLabel = `Feature ${String(i + 1).padStart(2, "0")}`;
              const singleImage =
                !feature.videos?.length && feature.images?.length === 1;
              const singleVideo =
                !feature.images?.length && feature.videos?.length === 1;
              const highlights = feature.highlights &&
                feature.highlights.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {feature.highlights.map((highlight) => (
                      <li key={highlight}>
                        <Chip>{highlight}</Chip>
                      </li>
                    ))}
                  </ul>
                );

              // Once a feature has exactly one final screen (or one
              // clip), it becomes a large, alternating side-by-side
              // moment rather than another stacked text block.
              if (singleImage || singleVideo) {
                return (
                  <Reveal
                    key={feature.title}
                    delay={Math.min(i * 40, 200)}
                    className={i > 0 ? "border-t border-border pt-20" : undefined}
                  >
                    <MediaText
                      eyebrow={featureLabel}
                      heading={feature.title}
                      media={
                        singleImage
                          ? { image: feature.images![0] }
                          : { video: feature.videos![0] }
                      }
                      mediaPosition={i % 2 === 0 ? "right" : "left"}
                      accent
                    >
                      <p>{feature.copy}</p>
                      {highlights}
                    </MediaText>
                  </Reveal>
                );
              }

              return (
                <Reveal
                  key={feature.title}
                  delay={Math.min(i * 40, 200)}
                  className={i > 0 ? "border-t border-border pt-20" : undefined}
                >
                  <p className="text-xs font-semibold tracking-[0.14em] text-(--project-accent) uppercase">
                    {featureLabel}
                  </p>
                  <Heading level={3} size={3} className="mt-2 max-w-xl">
                    {feature.title}
                  </Heading>
                  <p className="mt-3 max-w-xl text-muted-foreground">
                    {feature.copy}
                  </p>
                  {highlights}
                  {feature.images && feature.images.length > 0 && (
                    <div className="mt-8">
                      <CaseStudyImageRow images={feature.images} />
                    </div>
                  )}
                  {feature.videos && feature.videos.length > 0 && (
                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                      {feature.videos.map((video) => (
                        <CaseStudyVideo key={video.src} video={video} />
                      ))}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>

          {finalExperience.trust && (
            <div className="mt-20 border-t border-border pt-16">
              <Reveal>
                <SectionEyebrow accent>Trust & transparency</SectionEyebrow>
                <Heading level={2} className="mt-2 max-w-2xl text-3xl sm:text-5xl">
                  {finalExperience.trust.heading ?? "Designing AI students can verify"}
                </Heading>
              </Reveal>
              <Reveal delay={60} className="mt-4 max-w-xl text-muted-foreground">
                <p>{finalExperience.trust.copy}</p>
              </Reveal>
              {finalExperience.trust.images && finalExperience.trust.images.length > 0 ? (
                <div className="mt-8">
                  <CaseStudyImageRow images={finalExperience.trust.images} columns={3} />
                </div>
              ) : (
                finalExperience.trust.details &&
                finalExperience.trust.details.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {finalExperience.trust.details.map((detail) => (
                      <li key={detail}>
                        <Chip>{detail}</Chip>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>
          )}

          {finalExperience.interactionDesign && (
            <div className="mt-20 border-t border-border pt-16">
              <Reveal>
                <SectionEyebrow>Interaction design</SectionEyebrow>
                <Heading level={2} className="mt-2 max-w-2xl text-3xl sm:text-5xl">
                  {finalExperience.interactionDesign.heading ?? "Keeping people in context"}
                </Heading>
              </Reveal>
              <Reveal delay={60} className="mt-4 max-w-xl text-muted-foreground">
                <p>{finalExperience.interactionDesign.copy}</p>
              </Reveal>
              {finalExperience.interactionDesign.videos &&
              finalExperience.interactionDesign.videos.length > 0 ? (
                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                  {finalExperience.interactionDesign.videos.map((video) => (
                    <CaseStudyVideo key={video.src} video={video} />
                  ))}
                </div>
              ) : finalExperience.interactionDesign.images &&
                finalExperience.interactionDesign.images.length > 0 ? (
                <div className="mt-8">
                  <CaseStudyImageRow images={finalExperience.interactionDesign.images} columns={3} />
                </div>
              ) : (
                finalExperience.interactionDesign.details &&
                finalExperience.interactionDesign.details.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {finalExperience.interactionDesign.details.map((detail) => (
                      <li key={detail}>
                        <Chip>{detail}</Chip>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>
          )}
        </Section>
      )}

      {!testingEarly && testingMain}
      {testingLater}

      {results && (
      <Section id="results" className="scroll-mt-28">
        <Reveal className="flex flex-wrap items-center gap-3">
          <SectionEyebrow>Results</SectionEyebrow>
          {results.placeholder && <PlaceholderTag />}
        </Reveal>
        <Heading level={2} className="mt-2 max-w-2xl text-3xl sm:text-5xl">
          {results.headline}
        </Heading>
        <Reveal delay={60} className="mt-4 max-w-xl text-muted-foreground">
          <p>{results.summary}</p>
        </Reveal>

        {results.outcomes && results.outcomes.length > 0 && (
          <Reveal delay={80} className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {results.outcomes.map((outcome) => (
                <li key={outcome}>
                  <Chip>{outcome}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {results.evidence && results.evidence.length > 0 && (
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            {results.stat && (
              <Reveal delay={80} className="self-start">
                <StatCallout value={results.stat.value} caption={results.stat.caption} />
              </Reveal>
            )}
            <Reveal delay={120}>
              <Heading level={3} size={4}>
                What&apos;s proven, and what isn&apos;t yet
              </Heading>
              <dl className="mt-4 divide-y divide-border border-y border-border">
                {results.evidence.map((row) => (
                  <div key={row.label} className="grid gap-2 py-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
                    <dt className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-2 shrink-0 rounded-full",
                          row.open
                            ? "border border-muted-foreground"
                            : "bg-(--project-accent)",
                        )}
                      />
                      {row.label}
                    </dt>
                    <dd className="text-sm text-muted-foreground">{row.detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        )}

        {(results.quote || (results.stat && !results.evidence)) && (
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {results.stat && !results.evidence && (
            <Reveal delay={100}>
              <StatCallout
                value={results.stat.value}
                caption={results.stat.caption}
              />
            </Reveal>
          )}
          {results.quote && (
            <Reveal delay={140} className="flex items-center">
              <QuoteBlock
                text={results.quote.text}
                attribution={results.quote.attribution}
              />
            </Reveal>
          )}
        </div>
        )}
      </Section>
      )}

      <Section id="reflection" className="scroll-mt-28">
        <Reveal className="flex flex-wrap items-center gap-3">
          <SectionEyebrow>Final thoughts</SectionEyebrow>
          {finalThoughts.placeholder && <PlaceholderTag />}
        </Reveal>
        {finalThoughts.pullQuote && (
          <Reveal delay={40} className="mt-6 max-w-3xl">
            <p className="font-heading text-2xl text-foreground sm:text-3xl">
              &ldquo;{finalThoughts.pullQuote}&rdquo;
            </p>
          </Reveal>
        )}
        <div
          className={cn(
            "mt-10 grid gap-10",
            finalThoughts.proudestOf ? "sm:grid-cols-3" : "sm:grid-cols-2",
          )}
        >
          <Reveal>
            <Heading level={3} size={4}>
              What I learned
            </Heading>
            <p className="mt-2 text-sm text-muted-foreground">
              {finalThoughts.whatILearned}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <Heading level={3} size={4}>
              {finalThoughts.nextStepsHeading ?? "Next steps"}
            </Heading>
            <p className="mt-2 text-sm text-muted-foreground">
              {finalThoughts.nextSteps}
            </p>
          </Reveal>
          {finalThoughts.proudestOf && (
            <Reveal delay={100}>
              <Heading level={3} size={4}>
                What I&apos;m most proud of
              </Heading>
              <p className="mt-2 text-sm text-muted-foreground">
                {finalThoughts.proudestOf}
              </p>
            </Reveal>
          )}
        </div>
      </Section>

      {whatIsComplete.length > 0 && (
        <Section className="cs-band">
          <Reveal>
            <SectionEyebrow>Where this stands</SectionEyebrow>
            <Heading level={2} className="mt-2 text-3xl sm:text-5xl">
              Progress so far
            </Heading>
          </Reveal>
          <Reveal delay={60} className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {whatIsComplete.map((item) => (
                <li
                  key={item.label}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-(--radius-pill) border px-3 py-1 text-sm",
                    item.done
                      ? "border-transparent bg-mist-blue text-sage-deep"
                      : "border-border bg-surface text-muted-foreground",
                  )}
                >
                  <span aria-hidden="true">{item.done ? "✓" : "○"}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      )}
    </div>
  );
}
