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
 * invented. `coursepilot` (CoursePilot) is sourced from a real
 * research brief and `vietnamese-noodle-house` (Vietnamese Noodle House) from a
 * completed client redesign — both render via their own bespoke
 * case-study layouts. `mymuseum` (MyMuseum) is a real, built-and-
 * tested product (see data/case-studies/my-museum.ts), now live at
 * https://mymuseum-eta.vercel.app/.
 *
 * Order is the homepage's display order — MyMuseum leads (per the
 * user's direction), followed by CoursePilot then Vietnamese Noodle
 * House.
 */
export const projects: Project[] = [
  {
    slug: "mymuseum",
    // Homepage thumbnail mat + case-study CTA fill — soft sage.
    matTint: "color-mix(in srgb, var(--color-sage) 30%, var(--color-background))",
    statusTag: "Live product",
    title: "MyMuseum",
    role: "Product Design · UX Research · Development",
    summary: "Designed and built a live platform that turns artists' uploads into walkable 3D galleries, shaped by 5 artist interviews and a 5-person usability study.",
    credibility: "Designed and built the end-to-end experience, from concept to a live product.",
    status: "in-progress",
    accent: "mauve",
    dominantColor: "var(--color-sky)",
    hasCaseStudy: true,
    // Same walkthrough clip used as the case study's own hero video —
    // see data/case-studies/my-museum.ts's `hero.video`.
    videoThumbnail: {
      src: "/videos/projects/mymuseum/walkthrough-thumb.mp4",
      poster: "/images/projects/mymuseum/posters/walkthrough.jpg",
      width: 1920,
      height: 1036,
    },
    // A still from the same walkthrough, for the "Next project" card.
    cover: {
      src: "/images/projects/mymuseum/final/cover.jpg",
      alt: "MyMuseum's landing page: a 3D gallery with visitor avatars around a sculpture, under the headline 'Create a world for your work.'",
      width: 1920,
      height: 1036,
    },
    liveUrl: "https://mymuseum-eta.vercel.app/",
  },
  {
    slug: "coursepilot",
    // Homepage thumbnail mat + case-study CTA fill — pale mist blue.
    matTint: "color-mix(in srgb, var(--color-mist-blue) 60%, var(--color-background))",
    statusTag: "Figma prototype",
    title: "CoursePilot",
    role: "Product Design · User Research · Prototyping",
    summary: "Designed an AI planning assistant inside Canvas, from 5 student interviews to a Figma prototype tested with 5 students.",
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
    // Homepage card plays the same workspace walkthrough as the case-study
    // hero, so the shared ViewTransition morphs one clip into itself.
    videoThumbnail: {
      src: "/videos/projects/coursepilot/workspace-walkthrough.mp4",
      poster: "/images/projects/coursepilot/final/workspace-walkthrough-poster.jpg",
      width: 2000,
      height: 1420,
    },
    // Still frame for the "Next project" card — the plan result from the
    // same walkthrough.
    cover: {
      src: "/images/projects/coursepilot/final/workspace-walkthrough-cover.jpg",
      alt: "CoursePilot's Plan My Night response: prioritized tasks with due dates and estimated time, a suggested 3-hour plan, and source links.",
      width: 2000,
      height: 1420,
    },
  },
  {
    slug: "vietnamese-noodle-house",
    // Homepage thumbnail mat + case-study CTA fill — warm cream / light terracotta.
    matTint: "color-mix(in srgb, var(--color-earth) 12%, var(--color-muted))",
    statusTag: "Shipped · Client work",
    title: "Vietnamese Noodle House",
    role: "Client Work · UX/UI Design · Development",
    summary: "Redesigned and built a family restaurant's live site. Since its July launch, the owners report mistaken orders fell from about 8 a month to 1.",
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
  {
    slug: "pig-lamp",
    // Homepage thumbnail mat + case-study CTA fill — soft blush.
    matTint: "color-mix(in srgb, var(--color-blush) 45%, var(--color-background))",
    statusTag: "Industrial design · Clinic collaboration",
    title: "Pig Lamp",
    role: "Industrial Design · Fabrication",
    summary: "A laser-cut wood lamp from a project creating customized lamps for autistic children.",
    status: "in-progress",
    accent: "mauve",
    dominantColor: "var(--color-blush)",
    hasCaseStudy: true,
    imageThumbnail: {
      src: "/images/projects/pig-lamp-cover.jpg",
      alt: "The pig lamp: a pink laser-cut wood pig silhouette whose body opens into a cage of curved ribs around a bulb.",
      width: 1600,
      height: 1000,
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
