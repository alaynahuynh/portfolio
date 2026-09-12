import type { CaseStudyData } from "@/types/case-study";

interface PlaceholderCaseStudyConfig {
  slug: string;
  title: string;
  category: string;
  role: string;
}

/**
 * Builds a fully placeholder-content case study for projects that do not
 * yet have their own dedicated case-study data file.
 *
 * All content stays intentionally generic so unfinished projects never
 * inherit content from another project such as MyMuseum.
 */
export function makePlaceholderCaseStudy({
  slug,
  title,
  category,
  role,
}: PlaceholderCaseStudyConfig): CaseStudyData {
  return {
    slug,

    hero: {
      category,
      title,
      tagline: "Placeholder — add a one-line description of the project.",
      description:
        "Placeholder — describe the problem this project solves and the core solution.",
      statusLabel: "Concept — details coming soon",
      ctaLabel: "View Prototype",
      ctaHref: "#",
    },

    overview: {
      year: "2026",
      duration: "Placeholder",
      role,
      features: [
        {
          name: "Placeholder feature 1",
          description: "Placeholder — describe this feature.",
        },
        {
          name: "Placeholder feature 2",
          description: "Placeholder — describe this feature.",
        },
        {
          name: "Placeholder feature 3",
          description: "Placeholder — describe this feature.",
        },
      ],
    },

    background: {
      narrative:
        "Placeholder — describe the problem this project addresses and who it affects.",
      stat: {
        value: "—",
        caption: "Placeholder — add a real supporting statistic here.",
      },
      placeholder: true,
    },

    research: {
      intro:
        "Placeholder — describe the research approach (interviews, surveys, competitive analysis) once conducted.",
      participants: "Placeholder — number and description of participants.",

      swot: {
        strengths: ["Placeholder strength"],
        weaknesses: ["Placeholder weakness"],
        opportunities: ["Placeholder opportunity"],
        threats: ["Placeholder threat"],
      },

      swotPlaceholder: true,

      findings: [1, 2, 3].map((n) => ({
        title: `Placeholder finding ${n}`,
        whatParticipantsSaid:
          "Placeholder — add what participants said here.",
        whyItMatters: "Placeholder — explain why this matters.",
        designResponse:
          "Placeholder — describe the resulting design decision.",
      })),

      findingsPlaceholder: true,
    },

    keyInsights: [
      "Placeholder key insight 1",
      "Placeholder key insight 2",
      "Placeholder key insight 3",
    ],

    define: {
      personaName: "Placeholder persona",
      personaSummary:
        "Placeholder — describe the primary user persona here.",
      personaNeeds: [
        "Placeholder need 1",
        "Placeholder need 2",
        "Placeholder need 3",
      ],
      personaPlaceholder: true,
      hmw: "Placeholder — How might we solve [problem] for [user]?",
    },

    ideation: {
      whyThisTitle: "Why this approach?",

      whyThis: [
        {
          title: "Placeholder pain point",
          painPoint: "Placeholder — describe the pain point.",
          solution: "Placeholder — describe the solution.",
        },
      ],

      whyThisPlaceholder: true,

      flows: [
        {
          name: "Placeholder flow",
          steps: [
            "Placeholder step 1",
            "Placeholder step 2",
            "Placeholder step 3",
          ],
        },
      ],

      flowsPlaceholder: true,

      ia: {
        label: "Home",
        children: [
          { label: "Placeholder section A" },
          { label: "Placeholder section B" },
        ],
      },
    },

    productRequirements: [
      {
        need: "Placeholder need",
        requirement: "Placeholder requirement",
      },
      {
        need: "Placeholder need",
        requirement: "Placeholder requirement",
      },
    ],

    designPrinciples: [
      "Placeholder design principle 1",
      "Placeholder design principle 2",
      "Placeholder design principle 3",
    ],

    design: {
      processNarrative:
        "Placeholder — describe the design process once it happens.",

      wireframeScreens: [
        "Placeholder screen 1",
        "Placeholder screen 2",
        "Placeholder screen 3",
      ],

      highFidelityScreens: [
        "Placeholder screen 1",
        "Placeholder screen 2",
        "Placeholder screen 3",
      ],

      visualElements: {
        logoAndColor:
          "Placeholder — define a logo mark and color palette once visual direction is set.",
        typography:
          "Placeholder — choose a typeface pairing once visual direction is set.",
        components:
          "Placeholder — document the core UI components once designed.",
      },

      placeholder: true,
    },

    testing: {
      intro:
        "Placeholder — describe the usability testing plan once a prototype exists.",

      tasks: [
        "Placeholder task 1",
        "Placeholder task 2",
        "Placeholder task 3",
      ],

      iterations: [1, 2].map((n) => ({
        title: `Placeholder iteration ${n}`,
        feedback:
          "Placeholder — summarize what a participant said or struggled with.",
        finalIteration:
          "Placeholder — describe what changed in response.",
      })),

      placeholder: true,
    },

    results: {
      headline:
        "Placeholder — write the results headline once usability testing is complete.",

      summary:
        "Placeholder — summarize outcomes once usability testing and iteration are complete.",

      stat: {
        value: "—",
        caption: "Placeholder — add a real usability testing metric here.",
      },

      quote: {
        text: "Placeholder — add a real participant quote here.",
        attribution: "Placeholder — usability test participant",
      },

      placeholder: true,
    },

    finalThoughts: {
      whatILearned:
        "Placeholder — reflect on what you learned once the project is further along.",

      nextSteps:
        "Placeholder — outline the next steps for this project.",

      proudestOf:
        "Placeholder — call out what you're most proud of once there's a finished piece to point to.",

      placeholder: true,
    },

    whatIsComplete: [
      { label: "Research plan", done: false },
      { label: "User interviews", done: false },
      { label: "Key findings", done: false },
      { label: "Product requirements", done: false },
      { label: "User flows", done: false },
      { label: "Information architecture", done: false },
      { label: "Low-fidelity wireframes", done: false },
      { label: "Visual direction", done: false },
      { label: "High-fidelity screens", done: false },
      { label: "Clickable prototype", done: false },
      { label: "Usability testing", done: false },
      { label: "Iterations", done: false },
    ],
  };
}