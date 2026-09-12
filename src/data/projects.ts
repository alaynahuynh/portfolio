import type { Project } from "@/types";

/**
 * Single switch for all "in progress" language on the homepage/work grid.
 * Flip `showInProgress` to false once every project has real case-study
 * content — every "In Progress" badge, the section intro disclaimer, and
 * the disabled case-study CTA all read from here instead of being
 * hardcoded per-component.
 */
export const PROJECTS_STATUS = {
  showInProgress: false,
  sectionIntro:
    "Case studies are currently in progress — here's a preview of how each one will be presented once it's ready.",
  badgeLabel: "In Progress",
  pendingCtaLabel: "Case study — in progress",
};

/**
 * Three UI/UX case-study entries. All three now have a full case study
 * page (see src/app/projects/[slug]/page.tsx → CaseStudyPage, driven by
 * src/data/case-studies/*), each sourced from real material — nothing
 * invented. `case-study-02` (CoursePilot) is sourced from a real
 * research brief and `case-study-03` (Vietnamese Noodle House) from a
 * completed client redesign — both render via their own bespoke
 * case-study layouts. `case-study-01` (MyMuseum) is a real, built-and-
 * tested product (see data/case-studies/my-museum.ts) that simply
 * hasn't been deployed publicly yet — its `summary` below and the case
 * study's own `hero.disclosure` should stay honest about that until it
 * ships.
 *
 * Order is the homepage's display order — MyMuseum leads (per the
 * user's direction), followed by CoursePilot then Vietnamese Noodle
 * House.
 */
export const projects: Project[] = [
  {
    slug: "case-study-01",
    title: "MyMuseum",
    role: "Product Designer & Frontend Developer",
    summary:
      "A multiplayer 3D gallery platform where artists turn their work into personal museums — built and tested end-to-end, with the live site not yet deployed publicly.",
    status: "in-progress",
    accent: "mauve",
    dominantColor: "var(--color-sky)",
    hasCaseStudy: true,
    // The case study's own hero screenshot — the live 3D gallery behind
    // the landing page's "Create a world for your work" heading — shown
    // at its own real aspect ratio, same convention as VNH's thumbnail
    // below. See data/case-studies/my-museum.ts's `hero.image`.
    imageThumbnail: {
      src: "/images/projects/mymuseum/final/hero.png",
      alt: "MyMuseum's live 3D gallery behind its landing page, reading 'Create a world for your work' over a walkable room hung with paintings.",
      width: 1440,
      height: 900,
    },
  },
  {
    slug: "case-study-02",
    title: "CoursePilot",
    role: "Solo UX / Product Design Concept",
    summary:
      "An AI companion for Canvas that helps students prioritize coursework and build a realistic study plan — research, requirements, flows, and IA are done; screens and testing are next.",
    tagline: "Turning scattered course information into a clear plan.",
    tags: ["Product Design", "UX Research", "AI"],
    status: "in-progress",
    accent: "lake-blue-deep",
    // CoursePilot's dominant color — olive, with earth as a sparse
    // accent (see ProjectPlaceholder.tsx's CoursePilotSpread) — matches
    // data/case-studies/course-pilot.ts's `accentColor`.
    dominantColor: "var(--color-olive)",
    hasCaseStudy: true,
    // Same walkthrough clip used as the case study's own hero video —
    // see CoursePilotCaseStudy.tsx.
    videoThumbnail: { src: "/videos/projects/coursepilot/starttoend.mp4", width: 2000, height: 1422 },
  },
  {
    slug: "case-study-03",
    title: "Vietnamese Noodle House",
    role: "Product Designer",
    summary:
      "A full website redesign for a family-owned restaurant with two locations and a food truck — rebuilt as a responsive, photography-forward site with a two-step ordering flow at its center.",
    tagline: "Rebuilding a family restaurant's website so it finally works as hard as the food does.",
    tags: ["Product Design", "UX Audit", "Website Redesign"],
    status: "in-progress",
    accent: "sage-deep",
    // Dominant color is meadow green — earth (warm dark brown) is used
    // only as a sparse accent within the spread itself, not the
    // background (see ProjectPlaceholder.tsx's VNHSpread).
    dominantColor: "var(--color-meadow)",
    hasCaseStudy: true,
    // The real homepage hero screenshot (nav, heading, and the pho photo
    // together — see vietnamese-noodle-house.ts's own image sources for
    // the rest of the case study's screenshots) — shown at its own real
    // aspect ratio on both the /projects grid and the homepage spread,
    // so the thumbnail reads as an actual website rather than an
    // isolated food photo. Replaces the abstract placeholder art.
    imageThumbnail: {
      src: "/images/projects/vnh/home/desktop-hero.png",
      alt: "The redesigned Vietnamese Noodle House homepage hero: the site nav, a heading over a full-bleed photo of a bowl of pho, and an Order Online button.",
      width: 1440,
      height: 900,
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
