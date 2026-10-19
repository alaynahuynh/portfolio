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
      "Rebuilding a family restaurant's website so it finally works as hard as the food does.",
    description:
      "Vietnamese Noodle House is a family-owned restaurant with two physical locations and a food truck around Syracuse, NY. Their old site broke on mobile and looked nothing like the restaurant it represented. I audited it, then designed and built a new one — a warm, photography-forward identity across every page, with a clearer path to ordering from the right location. Since the July launch, the owners report mistaken orders dropping from about 8 a month to about 1.",
    statusLabel: "Shipped",
    ctaLabel: "View Live Site",
    ctaHref: "https://vietnoodlehouse.com/",
  },

  overview: {
    year: "2026",
    duration: "Ongoing client engagement",
    role: "Solo UX/UI Designer & Developer",
    featuresHeading: "What shipped",
    featuresIntro:
      "A full rebuild across Home, Menu, Locations, Food Truck, About, and Contact.",
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
    heading: "The old site was actively working against the business",
    narrative:
      "The old site wasn't mobile-responsive: on a phone the layout broke, text was unstyled, and the hero image was broken or showing a placeholder. On desktop it was usable but generic — a dated layout with a visual identity that said nothing about the food or the family behind it. For a restaurant that depends on people finding it, trusting it, and ordering from it online, that gap between the real place and its website was a real cost.",
    placeholder: false,
    principles: {
      title: "The identity I wanted the redesign to earn",
      items: [
        {
          title: "Warm, not generic",
          description:
            "A serif display face paired against a clean sans body — editorial, not templated.",
        },
        {
          title: "Photography-forward",
          description:
            "Real photography of the food and the locations carrying the page, instead of a stock-feeling layout doing the work alone.",
        },
        {
          title: "Mobile gets equal care",
          description:
            "Every page designed and refined at both breakpoints together, not shrunk down from desktop as an afterthought.",
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
      "There was no separate discovery phase to run — the old site was live, in front of real customers, and visibly failing them. So the audit doubled as the research: a heuristic review of the desktop experience, and a full pass on mobile, where the failures were worse.",
    participants:
      "Self-directed UX audit across desktop and mobile breakpoints — not participant usability testing.",
    swot: { strengths: [], weaknesses: [], opportunities: [], threats: [] },
    swotPlaceholder: true,
    findings: [],
    findingsPlaceholder: true,
    keyFindings: [
      {
        title: "Two look-alike ordering buttons",
        whatParticipantsSaid:
          "The homepage's main actions were two ordering buttons — \"Camillus\" and \"N Syracuse\" — styled identically except for border color, with no address, hours, or map beside them. A customer had to already know which town their restaurant is in.",
        whyItMatters:
          "Each button opens a different location's ordering page — and the owners told me customers were already placing orders at the wrong location.",
        designResponse:
          "Location cards with address, map, and hours, then a confirmation that repeats the address before handing off to ordering.",
      },
      {
        title: "The menu wasn't part of the website",
        whatParticipantsSaid:
          "View Menu just opened an 11-page PDF in the browser's PDF viewer. On a phone, the text ran off the right edge of the screen, and there was no way to jump to a category except paging through the document.",
        whyItMatters:
          "The menu is core content for a restaurant site, but as a PDF it couldn't match the site's identity or adapt to a phone screen.",
        designResponse:
          "Rebuilt the menu as a real page — seven categories, ~50 items — with a sticky category nav that highlights where you are.",
      },
      {
        title: "The mobile hero worked against the business priority",
        whatParticipantsSaid:
          "The heading sat directly on the brightest part of the hero photo with no scrim behind it, and a decorative callout tag crowded the headline — while online ordering, the actual business priority, wasn't the primary action.",
        whyItMatters:
          "If the highest-priority action isn't legible or isn't primary, the homepage isn't doing its one job.",
        designResponse:
          "Order Online promoted to the primary filled CTA, View Menu made secondary, a scrim added behind the heading, and the callout tag repositioned.",
      },
      {
        title: "Content gaps read as unfinished",
        whatParticipantsSaid:
          "The About page was text-only with a large empty gap on desktop, and the footer emphasized the abbreviation \"VNH\" over the restaurant's actual name.",
        whyItMatters:
          "Empty space and an unclear name both read as an unfinished site, not a considered one.",
        designResponse:
          "Added real photography to About and rebalanced the footer around the restaurant's full name.",
      },
      {
        title: "\"Message sent!\" wasn't true",
        whatParticipantsSaid:
          "The contact form displayed a success message on every submission, but the email was never actually being delivered anywhere.",
        whyItMatters:
          "A contact form that silently fails is worse than no contact form — it tells the business every message got through when none did.",
        designResponse:
          "Rebuilt the form to actually send via Resend, and to fail honestly and visibly if it's ever misconfigured again.",
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
    pullQuote: "Sometimes the better design adds a step.",
    // Two paragraphs, split on the blank line by VNHCaseStudy.
    whatILearned:
      "Good design usually means removing steps, and the location flow added one on purpose. Friction is a tool when the mistake it prevents costs more than the step — and here the owner noticed the difference.\n\nThe contact form taught me the other half: an interaction that looks like it works isn't done until it actually does.",
    nextStepsHeading: "What's next",
    nextSteps:
      "Add location-level analytics on the ordering hand-off so the owners' count has data behind it, and keep checking in with them as real usage of the new site grows.",
    proudestOf:
      "Designing the confirm step twice — inline on desktop, a bottom sheet on mobile — instead of shrinking one layout, all around ordering platforms I couldn't change.",
    placeholder: false,
  },

  whatIsComplete: [],
};
