/**
 * Shared shape for a full case study page — modeled on the section
 * anatomy at mattfredette.com/#case-studies (hero → overview → background
 * → research → define → ideation → design → testing/iterations →
 * results → final thoughts), reused by every entry in
 * src/data/case-studies/ and rendered by CaseStudyPage.tsx. Each project
 * fills in what's actually real; anything without real material yet sets
 * its section's `placeholder: true` so CaseStudyPage can tag it
 * in the UI instead of presenting invented specifics as fact.
 */

export interface CaseStudyFeature {
  name: string;
  description: string;
}

/**
 * One image used inside a case study (process photo, screenshot, sketch,
 * flowchart, Figma frame, final screen, etc.). `width`/`height` are the
 * image's real intrinsic pixel dimensions — required by next/image for
 * non-statically-imported sources so it can reserve the correct aspect
 * ratio and never stretch or crop. See
 * src/components/sections/case-studies/media/CaseStudyMedia.tsx for the
 * components that render these.
 */
export interface CaseStudyImageSpec {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional small caption rendered under the image. */
  caption?: string;
}

export interface CaseStudyBeforeAfterSpec {
  before: CaseStudyImageSpec;
  after: CaseStudyImageSpec;
  beforeLabel?: string;
  afterLabel?: string;
}

/**
 * A muted, looping video clip (a short prototype interaction — an
 * overlay opening, a confirmation toast, etc.) — the video equivalent of
 * CaseStudyImageSpec. See CaseStudyVideo in
 * src/components/sections/case-studies/media/CaseStudyMedia.tsx.
 */
export interface CaseStudyVideoSpec {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional poster frame shown before the video loads/plays. */
  poster?: string;
  caption?: string;
  /** Optional hold time (ms) on the final frame before the clip replays,
   * instead of looping back to the start immediately. */
  pauseAtEndMs?: number;
}

export interface CaseStudyFinding {
  title: string;
  whatParticipantsSaid: string;
  whyItMatters: string;
  designResponse: string;
  /** Optional research artifact/interview photo shown beside this finding. */
  image?: CaseStudyImageSpec;
}

export interface UserFlow {
  name: string;
  steps: string[];
  /** Optional flowchart image shown below the step diagram. */
  image?: CaseStudyImageSpec;
  /** Optional one-line takeaway shown under this flow's diagram. */
  takeaway?: string;
  /** Optional short 1-2 sentence explanation shown beside the flowchart
   * image in a "text-left" / "text-right" layout. */
  description?: string;
  /** Visual treatment when this flow renders as an image flowchart:
   * "featured" is large, full-width, and centered (the primary flow);
   * "text-left" / "text-right" are two-column, with the flowchart image
   * on the side opposite the name given. Omit to keep the default
   * stacked/grid layout used when flows don't specify one. */
  layout?: "featured" | "text-left" | "text-right";
}

/** One "01 — Title" style principle/tension card: a short title plus a
 * one- or two-sentence description. Reused for experience principles,
 * build-story captions, and final-product story captions so those
 * sections share one shape instead of three near-duplicate ones. */
export interface CaseStudyPrinciple {
  title: string;
  description: string;
}

/** A labeled group of real images with supporting text — "early
 * structure", "building the creator experience", "walk through the
 * collection", etc. `images` is left empty until real screenshots
 * exist; the section simply renders no imagery for that story rather
 * than a fake placeholder box. */
export interface CaseStudyVisualStory {
  title: string;
  description: string;
  images?: CaseStudyImageSpec[];
  /** Optional short muted/looping clips (a gameplay/prototype moment) shown alongside this story's images. */
  videos?: CaseStudyVideoSpec[];
}

/** One outcome-oriented feature in a `finalExperience` section — led by
 * what it lets someone do, not just a screen name. `highlights` are the
 * short labeled details worth calling out on the screen (e.g. "deadline",
 * "Why this?", "Sources") — rendered as plain chips, not annotations
 * pinned to specific pixel coordinates. */
export interface CaseStudyFinalFeature {
  title: string;
  copy: string;
  highlights?: string[];
  images?: CaseStudyImageSpec[];
  videos?: CaseStudyVideoSpec[];
  /** When no real screen exists yet, the exact asset path still needed —
   * rendered as a plainly-labeled reserved slot instead of inventing UI. */
  neededAsset?: string;
}

/**
 * The large, outcomes-organized "final experience" showcase — distinct
 * from the plainer `finalProduct` story list other projects use. Optional
 * `trust` and `interactionDesign` sub-sections render only when set.
 */
export interface CaseStudyFinalExperience {
  heading?: string;
  subheading?: string;
  /** Legacy per-feature list — kept for other/simpler case studies using
   * the generic CaseStudyPage template. A project using the richer
   * `architecture` / `heroMoment` / `secondaryMoments` story below
   * instead can just pass `[]`. */
  features: CaseStudyFinalFeature[];
  /** "Designing AI/trust students (or users) can verify" — small UI
   * details (labels, crops) that expose reasoning/sourcing. */
  trust?: {
    heading?: string;
    copy: string;
    images?: CaseStudyImageSpec[];
    /** Plain labels to show when no crops exist yet, e.g. "Why this?". */
    details?: string[];
    /** Preferred over `details`/`images` when set — one real cropped UI
     * example per trust mechanism, so this reads as inspectable evidence
     * rather than a list of feature names. Falls back to a plainly
     * labeled reserved slot when a given mechanism has no crop yet
     * (never an invented screen, e.g. an uncertainty state that was
     * never designed). */
    items?: { title: string; description: string; image?: CaseStudyImageSpec; neededAsset?: string }[];
  };
  /** Lightweight in-context interactions (overlays, confirmations) —
   * kept intentionally sparse, not every prototype state. */
  interactionDesign?: {
    heading?: string;
    copy: string;
    images?: CaseStudyImageSpec[];
    videos?: CaseStudyVideoSpec[];
    /** Plain labels to show when no media exists yet. */
    details?: string[];
  };

  /**
   * "Start where students already are" — a compact product-architecture
   * sequence (e.g. Canvas dashboard → popup → full workspace), each step
   * a small screenshot with a short label, plus a couple of short
   * callouts. A medium-weight opener, not a feature deep-dive.
   */
  architecture?: {
    heading: string;
    copy: string;
    steps: { label: string; image?: CaseStudyImageSpec; neededAsset?: string }[];
    callouts: CaseStudyPrinciple[];
  };

  /**
   * The single hero product moment — the one interaction shown largest
   * and given the most explanation. Prefers a video/motion clip or an
   * annotated composition over simply re-showing a static screen already
   * used elsewhere in the case study at the same size.
   */
  heroMoment?: {
    heading: string;
    copy: string;
    /** The example student prompt shown above the visual, e.g. "I have 3 hours tonight. What should I work on?" */
    prompt: string;
    video?: CaseStudyVideoSpec;
    image?: CaseStudyImageSpec;
    neededAsset?: string;
    /** A handful of meaningful callouts — not an annotation for every UI element. */
    callouts: CaseStudyPrinciple[];
    /** A short product-principle line, e.g. "AI recommends. Students decide." */
    principle: string;
  };

  /**
   * Secondary product moments after the hero (e.g. Catch Me Up, a
   * sourced Q&A answer) — each smaller than the hero, with a `size` that
   * drives layout rhythm instead of every moment getting equal weight.
   * `steps` optionally renders a short input → output sequence (e.g.
   * "Question → Answer → Source → View in syllabus") alongside/instead
   * of a screenshot.
   */
  secondaryMoments?: {
    /** Short name used only for the reserved-slot placeholder label
     * (e.g. "Catch Me Up") — kept separate from the longer editorial `heading`. */
    name: string;
    heading: string;
    copy: string;
    image?: CaseStudyImageSpec;
    neededAsset?: string;
    steps?: string[];
    callouts: CaseStudyPrinciple[];
    size: "large" | "medium";
  }[];

  /**
   * A small closing synthesis row demonstrating that the response format
   * adapts to the question — a few tiny cropped examples, not a fourth
   * round of full-size screenshots.
   */
  synthesis?: {
    heading: string;
    items: { label: string; result: string; image?: CaseStudyImageSpec; neededAsset?: string }[];
  };
}

/** Where a product is designed to live/appear inside an existing tool a
 * user already uses (Canvas, Slack, a browser toolbar, ...) rather than
 * as a new standalone destination. */
export interface CaseStudyPlatformIntegration {
  heading?: string;
  copy: string;
  image?: CaseStudyImageSpec;
  /** The two side-by-side dashboard screenshots — Canvas as students
   * normally see it, and the same dashboard with the CoursePilot popup
   * open. Renders as reserved placeholders until both are supplied. */
  regularDashboardImage?: CaseStudyImageSpec;
  popupDashboardImage?: CaseStudyImageSpec;
  flowSteps?: string[];
}

/** One open validation question for a not-yet-tested product — framed as
 * a question to answer, never as a completed-testing finding. */
export interface CaseStudyValidationItem {
  title: string;
  question: string;
}

/** A lightweight user group ("Artist / Creator", "Visitor") — not
 * presented as a research-backed persona, just who the product is
 * designed for and what they need. */
export interface CaseStudyPersonaGroup {
  name: string;
  summary: string;
  needs: string[];
}

export interface IANode {
  label: string;
  children?: IANode[];
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

/** One capability row in a CaseStudyLandscape comparison table — a
 * restrained "Yes / Partial / Not core / Requires context" style state
 * per competitor, not a visual "we win" scorecard. */
export interface CaseStudyLandscapeRow {
  capability: string;
  /** One value per entry in CaseStudyLandscape.columns, same order. */
  values: string[];
}

/**
 * A multi-tool "current landscape" comparison (this product vs. the
 * general-purpose tools people already reach for) — distinct from
 * `research.competitiveDiscovery`, which is a single named competitor's
 * narrative + resulting flow. When set, this renders instead of the SWOT
 * grid (same precedence rule as competitiveDiscovery: at most one of
 * competitiveDiscovery / landscape / the SWOT grid renders).
 */
export interface CaseStudyLandscape {
  heading?: string;
  intro?: string;
  /** Column headers, e.g. ["Canvas", "ChatGPT", "Motion", "CoursePilot"]. */
  columns: string[];
  rows: CaseStudyLandscapeRow[];
  /** Editorial "gap" takeaway rendered below the table — replaces the
   * older single-sentence `conclusion` line with a short eyebrow +
   * heading + body treatment that reads as a standalone insight. */
  gap: {
    eyebrow: string;
    heading: string;
    body: string;
  };
}

/** A short "what I learned → what I designed" mapping row — makes the
 * link between a specific research finding and a specific design
 * decision explicit, without repeating the full finding writeup. */
export interface CaseStudyResearchToDesignRow {
  learned: string;
  designed: string;
}

export interface PainPointMapping {
  title: string;
  painPoint: string;
  solution: string;
}

export interface CaseStudyIteration {
  title: string;
  feedback: string;
  finalIteration: string;
  /** Optional before/after comparison illustrating this iteration. */
  beforeAfter?: CaseStudyBeforeAfterSpec;
  /** Marks this as a smaller technical note (e.g. a dev bugfix) rather
   * than a major product-design iteration — renders more compactly and
   * without a numbered badge. */
  isTechnicalNote?: boolean;
}

export interface CaseStudyStat {
  /** The big highlighted number/phrase, e.g. "9/10" or "3 in 4". */
  value: string;
  caption: string;
}

export interface CaseStudyQuote {
  text: string;
  attribution: string;
}

export interface ProgressItem {
  label: string;
  done: boolean;
}

export interface CaseStudyData {
  slug: string;

  /**
   * Optional per-project accent color (any CSS color value, e.g.
   * "var(--color-coursepilot-purple)" or "var(--color-mauve-deep)") —
   * layered on top of the shared sage-green portfolio identity for a
   * handful of that project's own eyebrows/annotations/detail moments
   * (see CaseStudyPage.tsx's `--project-accent` wiring and
   * SectionEyebrow's `accent` prop). Falls back to the portfolio green
   * when unset — most projects don't need this.
   */
  accentColor?: string;

  hero: {
    category: string;
    title: string;
    tagline: string;
    description: string;
    statusLabel: string;
    ctaLabel: string;
    ctaHref: string;
    /** Optional full-width hero image/major visual. */
    image?: CaseStudyImageSpec;
    /** Optional full-width hero video — shown instead of `image` when set. */
    video?: CaseStudyVideoSpec;
    /** Optional "Platform: Web" style line. */
    platform?: string;
    /** Optional tool list, e.g. ["Figma", "Next.js"]. */
    tools?: string[];
    /** Optional small disclosure line (e.g. "conceptual, not an official
     * product") — rendered subtly near the hero metadata, not as a
     * disclaimer banner. */
    disclosure?: string;
  };

  overview: {
    year: string;
    duration: string;
    role: string;
    /** Optional 30-second "at a glance" summary — rendered in place of
     * the features grid when set, so the problem, role, solution, and
     * outcome are readable before any scrolling. */
    summary?: { problem: string; role: string; solution: string; outcome: string };
    /** Optional heading override for the features grid (defaults to "Key features"). */
    featuresHeading?: string;
    /** Optional intro copy shown under the heading, above the grid. */
    featuresIntro?: string;
    features: CaseStudyFeature[];
  };

  background: {
    /** Optional heading override (defaults to "The problem"). */
    heading?: string;
    narrative: string;
    stat?: CaseStudyStat;
    placeholder: boolean;
    /** Optional "the experience I wanted to create" principles, shown
     * right after the narrative as a short, concise moment. */
    principles?: { title: string; items: CaseStudyPrinciple[] };
  };

  research: {
    intro: string;
    participants: string;
    /** Optional heading override for this section (defaults to
     * "Leading discovery"). */
    heading?: string;
    swot: SwotAnalysis;
    swotPlaceholder: boolean;
    findings: CaseStudyFinding[];
    findingsPlaceholder: boolean;
    /**
     * Optional competitive-discovery narrative: a single named
     * competitor, an annotated screenshot if one exists, the resulting
     * opportunity statement, and the resulting product flow. When
     * present this renders instead of the SWOT grid and finding cards
     * above (which stay in place for projects like CoursePilot that
     * have real participant-research findings), so a project with only
     * competitive discovery never implies participant research it
     * hasn't done.
     */
    competitiveDiscovery?: {
      competitor: string;
      narrative: string;
      image?: CaseStudyImageSpec;
      /** Optional per-competitor breakdown (observed → learned → applied).
       * When set, it replaces the single `competitor` / `narrative` /
       * `image` block with one full-width, zoomable visual per competitor
       * and short scannable findings beneath it; `narrative` becomes the
       * section's lead-in. */
      competitors?: CompetitorFinding[];
      /** Optional line tying the competitor findings to the opportunity. */
      opportunityContext?: string;
      opportunity: string;
      /** Optional label above the flow (e.g. whether it's proposed or built). */
      flowLabel?: string;
      flowSteps: string[];
      placeholder: boolean;
    };
    /**
     * Optional multi-tool "current landscape" comparison table — see
     * CaseStudyLandscape. When present it renders instead of the SWOT
     * grid, same precedence as competitiveDiscovery (checked first).
     */
    landscape?: CaseStudyLandscape;
    /**
     * Optional small set of elevated findings (e.g. the 4 most
     * decision-relevant of a larger real research set) rendered as a
     * concise numbered layout instead of the full `findings` write-ups
     * below — used when a project has more raw findings than are useful
     * to show at equal weight. `findings` above still holds the complete
     * real research record.
     */
    keyFindings?: CaseStudyFinding[];
  };

  keyInsights: string[];

  define: {
    /** Optional heading override (defaults to "Who this is for"). */
    sectionHeading?: string;
    /** Persona fields are optional so a project can rely purely on
     * `opportunity` below (see CaseStudyData.opportunity) instead of a
     * persona card — set all three together, or omit all three. */
    personaName?: string;
    personaSummary?: string;
    personaNeeds?: string[];
    personaPlaceholder?: boolean;
    /** Optional second user group — renders alongside the primary one
     * as two lightweight "who this is for" groups instead of a single
     * research-backed persona. */
    secondaryPersona?: CaseStudyPersonaGroup;
    /** Optional paragraph explaining the tension being weighed, shown
     * just above the HMW. */
    tensionIntro?: string;
    hmw: string;
  };

  /**
   * Optional "the opportunity" section — a synthesized statement plus a
   * short equation-style visual (inputs → product), shown as its own
   * section ahead of `define`/`ideation`. When set, it also takes over
   * displaying `define.hmw`, and the legacy persona/"why this" section
   * (`define`'s persona card + `ideation.whyThis`) is skipped entirely
   * for projects that have no persona and no whyThis pairs to show —
   * projects that still use those keep them exactly as before.
   */
  opportunity?: {
    heading?: string;
    statement: string;
    /** Inputs combined into the product, e.g. ["Course context", "Natural-language questions", ...] — rendered with "+" between them and an arrow to the product name. */
    equationSteps: string[];
    /** Defaults to hero.title. */
    resultLabel?: string;
  };

  ideation: {
    whyThisTitle: string;
    whyThis: PainPointMapping[];
    whyThisPlaceholder: boolean;
    /** Optional heading override for this section (defaults to
     * "User flows"). */
    flowsSectionTitle?: string;
    /** Optional short intro shown above the user flows. */
    flowsIntro?: string;
    flows: UserFlow[];
    flowsPlaceholder: boolean;
    /** Optional — omit to skip the "Information architecture" text tree
     * entirely (e.g. when the flows above already show real flowchart
     * diagrams and a separate IA tree would be redundant clutter). */
    ia?: IANode;
    /** Optional site map / IA diagram image, shown below the IA tree. */
    iaImage?: CaseStudyImageSpec;
    /** Optional row of early exploration sketches. */
    sketchImages?: CaseStudyImageSpec[];
  };

  /** Optional "key decisions" section — the few product decisions the
   * case study is really about, each tied to the evidence behind it, the
   * tradeoff it accepted, and an honest status line. */
  keyDecisions?: {
    heading?: string;
    intro?: string;
    items: CaseStudyDecision[];
  };

  productRequirements: { need: string; requirement: string }[];
  designPrinciples: string[];
  /** Optional richer "title + description" design principles — renders
   * instead of the plain `designPrinciples` string list when present. */
  designPrinciplesDetailed?: CaseStudyPrinciple[];
  /** Optional "what I learned → what I designed" mapping — renders
   * instead of the plain `productRequirements` table when present, in
   * the same section. Makes the research → decision link explicit. */
  researchToDesign?: {
    heading?: string;
    intro?: string;
    rows: CaseStudyResearchToDesignRow[];
  };
  /** Optional single-sentence AI-boundary design principle (what the
   * assistant helps with vs. refuses to do) — a small inline note, not a
   * dedicated ethics section. */
  aiBoundary?: string;

  /** Optional "where this lives" section — e.g. integrated into an
   * existing platform (Canvas, Slack, ...) rather than a new standalone
   * destination. Renders as its own block when present. */
  platformIntegration?: CaseStudyPlatformIntegration;

  /** Optional compact product-identity/branding board — one visual
   * section, not a full brand-guidelines writeup. Color and type are
   * meant to be rendered live from the site's own design tokens (real,
   * not invented); `logo`/`adaptations` are real assets once exported,
   * and render as plainly-labeled reserved slots naming the exact file
   * still needed until then. */
  brand?: {
    heading?: string;
    copy: string;
    logo?: CaseStudyImageSpec;
    /** Exact asset path still needed, shown in the reserved slot when `logo` is unset. */
    logoNeededAsset?: string;
    adaptations?: CaseStudyImageSpec[];
    /** Exact asset paths still needed for conceptual institution adaptations. */
    adaptationsNeededAssets?: string[];
    disclaimer?: string;
  };

  /** Optional small "before polishing the interface" section — real
   * early sketches/lo-fi screens once exported; until then each item
   * renders as a plainly-labeled reserved slot naming the exact asset
   * still needed, never an invented sketch. */
  earlyExploration?: {
    heading?: string;
    copy?: string;
    items: { label: string; image?: CaseStudyImageSpec; neededAsset?: string }[];
  };

  design: {
    /** Optional heading override (defaults to "From flows to a functioning product"). */
    heading?: string;
    processNarrative: string;
    wireframeScreens: string[];
    highFidelityScreens: string[];
    /** Optional — omit until there's something real (and specific) to
     * say about the logo/color, typography, and component decisions
     * rather than filling this with generic-sounding placeholder text. */
    visualElements?: { logoAndColor: string; typography: string; components: string };
    placeholder: boolean;
    /** Optional "early design" low-fidelity vs. final comparisons — the
     * interface-evolution beat between wireframes and final screens.
     * Renders via the existing CaseStudyBeforeAfter component. */
    beforeAfter?: CaseStudyBeforeAfterSpec[];
    /** Optional real wireframe photos/screenshots, shown below the labeled placeholder boxes above. */
    wireframeImages?: CaseStudyImageSpec[];
    /** Optional real final/high-fidelity screens, shown below the labeled placeholder boxes above. */
    finalScreenImages?: CaseStudyImageSpec[];
    /** Optional real build-process stories ("early structure",
     * "building the creator experience", ...) — each renders its real
     * images only, never an invented placeholder screenshot. */
    buildStories?: CaseStudyVisualStory[];
    /**
     * Optional "before → problem → decision → after" narrative for the
     * single specific moment a product's interaction model changed
     * (e.g. "conversational responses" → "structured UI") — distinct
     * from the general `processNarrative` above. `pairs` names which
     * before/after comparisons illustrate the decision; the actual
     * images for each pair live in `beforeAfter` above once exported —
     * until then, the page renders labeled placeholders from `pairs`
     * instead of inventing screens.
     */
    iterationStory?: {
      problem: string;
      decision: string;
      /** Each pair renders as labeled placeholders until its own
       * `before`/`after` images are supplied — real assets can land
       * per-pair as they're exported, without waiting on every pair. */
      pairs: {
        task: string;
        beforeLabel: string;
        afterLabel: string;
        before?: CaseStudyImageSpec;
        after?: CaseStudyImageSpec;
      }[];
      /** One-sentence synthesis shown below the before/after pairs — the
       * "what this shift actually was" takeaway. */
      takeaway?: string;
      /** Optional short supporting labels contrasting the early vs. final
       * approach (kept intentionally brief — a few words each, not a
       * re-explanation of the takeaway). */
      comparisonLabels?: { early: string[]; final: string[] };
    };
  };

  testing: {
    /** Optional heading override (defaults to "Putting it in front of users"). */
    heading?: string;
    intro: string;
    tasks: string[];
    iterations: CaseStudyIteration[];
    placeholder: boolean;
    /** Optional forward-looking validation questions — renders instead
     * of the `tasks`/`iterations` blocks when present, for a project
     * that hasn't run usability testing yet but has concrete questions
     * it would test. Framed as open questions, never as findings. */
    validateNext?: CaseStudyValidationItem[];
    /** Optional short closing line shown below `validateNext` — a single
     * forward-looking sentence (e.g. pointing at implementation
     * feasibility) rather than a second write-up. */
    closingStatement?: string;
  };

  /** Optional "the final experience" section: the strongest real final
   * screenshots, organized as product stories. Renders nothing extra
   * for projects that don't set it. */
  finalProduct?: {
    intro: string;
    stories: CaseStudyVisualStory[];
    placeholder: boolean;
  };

  /** Optional large, outcomes-organized final showcase — see
   * CaseStudyFinalExperience. Distinct from (and independent of)
   * `finalProduct` above so existing projects using the plainer story
   * list are completely unaffected. */
  finalExperience?: CaseStudyFinalExperience;

  /** Optional — omit entirely (rather than setting placeholder copy)
   * until real usability-testing results exist. No Results section
   * renders at all when this is unset. */
  results?: {
    headline: string;
    summary: string;
    /** Optional factual outcome chips (capabilities shipped), shown
     * before the stat/quote — the concise "what actually exists now"
     * list rather than leading with a single metric. */
    outcomes?: string[];
    stat?: CaseStudyStat;
    quote?: CaseStudyQuote;
    /** Optional evidence ledger separating what's built, what's been
     * functionally tested, what users have said, and what's still an
     * assumption — so none of them reads as another. */
    evidence?: { label: string; detail: string; open?: boolean }[];
    placeholder: boolean;
  };

  finalThoughts: {
    /** Optional large pull-quote shown above the three-column reflection. */
    pullQuote?: string;
    whatILearned: string;
    nextSteps: string;
    /** Optional heading override for the nextSteps column (defaults to "Next steps"). */
    nextStepsHeading?: string;
    /** Optional — omit rather than invent a "proudest of" line that
     * wasn't actually supplied; the column simply doesn't render. */
    proudestOf?: string;
    placeholder: boolean;
  };

  whatIsComplete: ProgressItem[];

  /**
   * Optional override for the sticky section nav — a short, curated
   * list of {id, label} pairs (ids must match real section element ids
   * rendered by CaseStudyPage) used verbatim instead of the default
   * per-subsection nav computed from which fields are populated. Use
   * this when a project's real structure (e.g. one combined "Design"
   * section covering several sub-parts) reads better as fewer, broader
   * nav entries than the default one-entry-per-subsection list.
   */
  navOverride?: { id: string; label: string }[];
}

/** One competitor in a competitive-discovery breakdown. */
export interface CompetitorFinding {
  name: string;
  /** Annotated screenshot, if one exists — shown full-width and zoomable. */
  image?: CaseStudyImageSpec;
  strengths: string[];
  limitations: string[];
  /** How the finding shaped the product. */
  applied: string;
  /** 1-based numbers of the keyDecisions this finding fed into. */
  shaped?: number[];
}

/** One key product decision: tension → evidence → decision → tradeoff → outcome. */
export interface CaseStudyDecision {
  title: string;
  /** Short "X vs. Y" label for the tension being resolved. */
  tension: string;
  problem: string;
  /** Each piece of evidence names its source (e.g. "Competitive analysis",
   * "My own testing", "Design intent") so its weight is clear. */
  evidence: { source: string; text: string }[];
  decision: string;
  tradeoff: string;
  outcome: string;
  /** Plain status line, e.g. "Built · functionally tested · not yet tested with artists". */
  status: string;
  /** Optional step chips shown as this decision's visual. */
  steps?: string[];
  images?: CaseStudyImageSpec[];
}
