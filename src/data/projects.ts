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
 * tested product (see data/case-studies/my-museum.ts), now live at
 * https://mymuseum-eta.vercel.app/.
 *
 * Order is the homepage's display order — MyMuseum leads (per the
 * user's direction), followed by CoursePilot then Vietnamese Noodle
 * House.
 */
export const projects: Project[] = [
  {
    slug: "case-study-01",
    title: "MyMuseum",
    role: "Product Design · UX Research · Development",
    summary: "A multiplayer 3D platform for artists to create and share explorable galleries.",
    credibility: "Designed and built the end-to-end experience from concept to a working multiplayer product.",
    status: "in-progress",
    accent: "mauve",
    dominantColor: "var(--color-sky)",
    hasCaseStudy: true,
    // Same walkthrough clip used as the case study's own hero video —
    // see data/case-studies/my-museum.ts's `hero.video`.
    videoThumbnail: { src: "/videos/projects/mymuseum/walkthrough.mp4", width: 1920, height: 1036 },
    liveUrl: "https://mymuseum-eta.vercel.app/",
  },
  {
    slug: "case-study-02",
    title: "CoursePilot",
    role: "Product Design · User Research · Prototyping",
    summary: "Helping students turn scattered course information into an actionable plan.",
    credibility:
      "Designed from student research around deadlines, planning behavior, Canvas friction, and trust in AI.",
    tags: ["Product Design", "User Research", "Prototyping"],
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
    role: "Client Work · UX/UI Design · Development",
    summary: "Redesigning a restaurant's digital ordering experience within existing POS constraints.",
    credibility:
      "Designed and built for a real restaurant while working within existing MenuDrive/Lavu platform constraints.",
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
    // The real, live site — CoursePilot (concept stage) has no live link.
    liveUrl: "https://vietnoodlehouse.com/",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
