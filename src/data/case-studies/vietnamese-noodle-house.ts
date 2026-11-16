import type { CaseStudyData } from "@/types/case-study";

/**
 * Vietnamese Noodle House — a real completed website redesign (not
 * placeholder content). Rendered by its own bespoke layout,
 * VNHCaseStudy.tsx, the same way CoursePilot has its own editorial
 * layout instead of the generic CaseStudyPage template — this project's
 * real structure (a UX audit of a live broken site, then a photography-
 * forward rebuild, with one interaction-design centerpiece) doesn't map
 * cleanly onto the generic template's research/define/ideation stages
 * built for from-scratch product concepts.
 *
 * This object still satisfies the shared CaseStudyData shape (required
 * by src/app/projects/[slug]/page.tsx's CASE_STUDIES map), but several
 * fields the bespoke component doesn't render (research.swot,
 * ideation.flows, productRequirements, etc.) are left minimal/empty
 * rather than filled with invented specifics — the real content for
 * each of those beats lives directly in VNHCaseStudy.tsx alongside the
 * real screenshots it's paired with.
 */
export const vietnameseNoodleHouse: CaseStudyData = {
  slug: "vietnamese-noodle-house",

  // Earth (warm dark brown) — the accessible small-text/border accent
  // used throughout this page. Meadow green (VNH's dominant homepage
  // spread color, see projects.ts) is too light-mid to hold up as small
  // text/border color on cream, so earth is used here instead (same
  // reasoning CaseStudyPage's `--project-accent` wiring documents).
  accentColor: "var(--color-earth)",

  hero: {
    category: "Product Design · UX Audit · Website Redesign",
    title: "Vietnamese Noodle House",
    tagline:
      "Rebuilding a family restaurant's website so customers can find the menu and order from the right location.",
    description:
      "Vietnamese Noodle House is a family-owned restaurant with two physical locations and a food truck around Syracuse, NY. Their old site broke on mobile and looked nothing like the restaurant it represented. I audited it, then designed and built a new one with a warmer look built around photos of the food, and a clearer way to order from the right location. Since the July launch, the owners report mistaken orders dropping from about 8 a month to about 1.",
    statusLabel: "Shipped",
    ctaLabel: "View Live Site",
    ctaHref: "https://vietnoodlehouse.com/",
    platform: "Responsive web",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Resend", "Vercel"],
  },

  overview: {
    year: "2026",
    duration: "Ongoing client engagement",
    role: "Solo UX/UI Designer & Developer",
    featuresHeading: "What shipped",
    featuresIntro:
      "I rebuilt every page: Home, Menu, Locations, Food Truck, About and Contact.",
    features: [
      {
        name: "Two-step location ordering",
        description:
          "An explicit select-then-confirm flow so picking the wrong location's online-ordering link stops being a real risk.",
      },
      {
        name: "Sticky, scroll-spy menu nav",
        description:
          "Seven categories and roughly 50 items on one long page, with a sticky category nav that auto-highlights where you are.",
      },
      {
        name: "A site that actually works on a phone",
        description:
          "Every page rebuilt mobile-first, replacing a layout that was broken, unstyled, and effectively unusable on a phone.",
      },
    ],
  },

  background: {
    heading: "The old site was hurting the business",
    narrative:
      "The old site wasn't mobile-responsive: on a phone the layout broke, text was unstyled, and the hero image was broken or showing a placeholder. On desktop it was usable but dated, and it said nothing about the food or the family behind it. For a restaurant that takes orders online, that mattered.",
    placeholder: false,
    principles: {
      title: "The identity I wanted the redesign to earn",
      items: [
        {
          title: "Type",
          description:
            "A serif for headings and a simple sans-serif for everything else.",
        },
        {
          title: "Photography",
          description:
            "Photos of the actual food and dining rooms do most of the work on each page.",
        },
        {
          title: "Mobile",
          description:
            "I designed every page for phone and desktop at the same time, instead of shrinking the desktop version.",
        },
      ],
    },
  },

  // Not rendered as the generic SWOT/findings UI — VNHCaseStudy.tsx uses
  // `keyFindings` directly for its own "what the audit found" section.
  // `findings`/`swot` stay as empty placeholders only to satisfy the
  // shared CaseStudyData shape.
  research: {
    heading: "Auditing the live site",
    intro:
      "The old site was live and its problems were easy to see, so I started with an audit instead of a separate research phase: a heuristic review of the desktop experience, and a full pass on mobile, where the failures were worse.",
    participants:
      "",
    swot: { strengths: [], weaknesses: [], opportunities: [], threats: [] },
    swotPlaceholder: true,
    findings: [],
    findingsPlaceholder: true,
    keyFindings: [
      {
        title: "Two look-alike ordering buttons",
        whatParticipantsSaid:
          "The homepage's main actions were two ordering buttons, \"Camillus\" and \"N Syracuse\", styled identically except for border color, with no address, hours, or map beside them. A customer had to already know which town their restaurant is in.",
        whyItMatters:
          "Each button opens a different location's ordering page, and the owners told me customers were already placing orders at the wrong location.",
        designResponse:
          "I replaced them with location cards that show the address, a map and hours, plus a confirmation that repeats the address before sending you to order.",
      },
      {
        title: "The menu wasn't part of the website",
        whatParticipantsSaid:
          "View Menu just opened an 11-page PDF in the browser's PDF viewer. On a phone, the text ran off the right edge of the screen, and there was no way to jump to a category except paging through the document.",
        whyItMatters:
          "The menu is the main thing people come to a restaurant site for, and a PDF can't adapt to a phone.",
        designResponse:
          "I rebuilt it as a real page with seven categories and about 50 items, and a category bar that sticks to the top and highlights where you are.",
      },
      {
        title: "Ordering online wasn't the main button",
        whatParticipantsSaid:
          "The heading sat directly on the brightest part of the hero photo with no scrim behind it, and a decorative callout tag crowded the headline. Online ordering, the restaurant's top priority, wasn't the main button.",
        whyItMatters:
          "",
        designResponse:
          "I made Order Online the main button, moved View Menu to second, added a dark gradient behind the heading so it's readable, and moved the tag out of the way.",
      },
      {
        title: "Parts of the site looked unfinished",
        whatParticipantsSaid:
          "The About page was text-only with a large empty gap on desktop, and the footer emphasized the abbreviation \"VNH\" over the restaurant's actual name.",
        whyItMatters:
          "",
        designResponse:
          "I added photos of the dining rooms to About and rebuilt the footer around the restaurant's full name.",
      },
      {
        title: "\"Message sent!\" wasn't true",
        whatParticipantsSaid:
          "The contact form displayed a success message on every submission, but the email was never delivered anywhere.",
        whyItMatters:
          "Customers thought their messages went through, and the owners never saw them.",
        designResponse:
          "I rebuilt the form so it actually sends email through Resend, and shows a clear error if it ever fails.",
      },
    ],
  },

  keyInsights: [],

  define: {
    hmw: "How might I rebuild vietnamesenoodlehouse.com so two locations, a food truck, and online ordering all read as one trustworthy brand — on a phone just as well as a desktop?",
  },

  ideation: {
    whyThisTitle: "Why a two-step flow",
    whyThis: [
      {
        title: "Select, then confirm",
        painPoint:
          "Two locations means two different online-ordering links — picking the wrong one has a real cost, not just an inconvenience.",
        solution:
          "Split location selection into two explicit steps instead of one card that silently linked out, so the user sees which location they're about to order from before committing.",
      },
    ],
    whyThisPlaceholder: false,
    flowsSectionTitle: "The ordering flow",
    flows: [
      {
        name: "Two-location ordering flow",
        steps: [
          "Land on Locations",
          "Select a location card",
          "Review the confirmation for that specific location",
          "Continue to that location's online ordering",
        ],
      },
    ],
    flowsPlaceholder: false,
  },

  productRequirements: [],
  designPrinciples: [
    "Photography does the talking — the food and the people, not stock imagery or generic layout tricks.",
    "Order Online is the business priority, so it's always the primary action.",
    "Mobile gets the same design care as desktop, not a shrunken leftover.",
    "A feature that appears to work (like the contact form) has to actually work.",
  ],

  design: {
    heading: "From a broken site to a photography-forward rebuild",
    processNarrative:
      "I paired the audit above with iterative visual design: a warm cream, terracotta, and teal palette; a serif display face paired with a clean sans body; and a rebuild of every page around real photography instead of the old site's generic layout. Desktop and mobile were designed and refined together, not mobile as an afterthought.",
    wireframeScreens: [],
    highFidelityScreens: [],
    placeholder: false,
  },

  // Not rendered by VNHCaseStudy.tsx — what's left to validate is
  // folded into finalThoughts.nextSteps. Kept only to satisfy the shared
  // CaseStudyData shape.
  testing: {
    heading: "What I'd want to validate next",
    intro:
      "This shipped as a live client redesign rather than a tested prototype, so the open questions are about real-world behavior rather than lab findings.",
    tasks: [],
    iterations: [],
    placeholder: false,
  },

  finalThoughts: {
    pullQuote: "Adding a step was the right call here",
    whatILearned:
      "I usually try to cut steps, but this flow adds one. One extra tap was worth it to keep orders from going to the wrong kitchen, and the owners noticed.",
    nextStepsHeading: "What's next",
    nextSteps:
      "Add location-level analytics on the ordering hand-off so the owners' count has data behind it, and keep checking in with them as more customers use the new site.",
    proudestOf:
      "Designing the confirm step twice, inline on desktop and as a bottom sheet on mobile, instead of squeezing one layout onto both. All of it had to work around ordering platforms I couldn't change.",
    placeholder: false,
  },

  whatIsComplete: [],
};
