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
 * Every project, in homepage display order. Projects with `media` are the
 * featured case studies; the rest (Pig Lamp) are listed under "Other"
 * (see FeaturedWork.tsx).
 *
 * Order: MyMuseum leads (designed, built and live), then Vietnamese Noodle
 * House (real client, measured result), CoursePilot (deepest research,
 * concept stage), Nudge (6-week team jam) and Jurnee (4-hour designathon).
 * Thumbnail card colors (`media.bgColor`) come from the hero's own scene
 * and windows (see hero-destinations.ts), so the list reads as part of
 * the desktop above it: sky, grass, the Work window's lake blue, the
 * About window's mauve, the Playground window's sage.
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
    media: {
      bgColor: "#3CB5FC",
      // The live site's hero (first 9s of the case-study walkthrough,
      // before the camera turns into a wall), cropped to 16:9.
      wideSrc: "/thumbnails/mymuseum/mymuseum-hero-wide.mp4",
      widePoster: "/thumbnails/mymuseum/mymuseum-hero-wide-poster.webp",
      wideAlt:
        "MyMuseum's landing page: 'Create a world for your work' over a 3D gallery, with shape avatars gathered around a sculpture.",
      tallSrc: "/thumbnails/mymuseum/mymuseum-tall.mp4",
      tallPoster: "/thumbnails/mymuseum/mymuseum-tall-poster.webp",
      tallAlt: "MyMuseum's Grid View on a phone, scrolling from 'My Little World' down to the artwork 'Out of Water'.",
    },
  },
  {
    slug: "vietnamese-noodle-house",
    // Homepage thumbnail mat + case-study CTA fill — warm cream / light terracotta.
    matTint: "color-mix(in srgb, var(--color-earth) 12%, var(--color-muted))",
    statusTag: "Shipped · Client work",
    title: "Vietnamese Noodle House",
    role: "Client Work · UX/UI Design · Development",
    summary: "Redesigned and built a family restaurant's live site. Since its July launch, the owners report mistaken orders fell from about 8 a month to about 1.",
    credibility:
      "Designed and built for a real restaurant while working within existing MenuDrive/Lavu platform constraints.",
    tagline: "Rebuilding a family restaurant's website so customers can find the menu and order from the right location.",
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
    media: {
      bgColor: "#779F3D",
      wideSrc: "/thumbnails/noodle-house/noodle-house-wide.mp4",
      widePoster: "/thumbnails/noodle-house/noodle-house-wide-poster.webp",
      wideAlt:
        "The Vietnamese Noodle House homepage hero zooms in on Order Online, then the Locations page shows Camillus selected and ready to order.",
      tallSrc: "/thumbnails/noodle-house/noodle-house-tall.mp4",
      tallPoster: "/thumbnails/noodle-house/noodle-house-tall-poster.webp",
      tallAlt: "On a phone: the homepage, then the locations list, then the 'You're ordering from Camillus' sheet sliding up.",
    },
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
    media: {
      bgColor: "#93BAD9",
      wideSrc: "/thumbnails/coursepilot/coursepilot-wide.mp4",
      widePoster: "/thumbnails/coursepilot/coursepilot-wide-poster.webp",
      wideAlt:
        "CoursePilot's answer to 'I have 3 hours tonight. What should I work on?': prioritized tasks and a 3-hour schedule, which the student adds to their calendar.",
    },
  },
  {
    slug: "nudge",
    // Homepage thumbnail mat + case-study CTA fill — Nudge's soft lavender.
    matTint: "color-mix(in srgb, #d8cff7 45%, var(--color-background))",
    statusTag: "Team project · Business+Tech Innovation Jam",
    title: "Nudge",
    role: "Product Design · Customer Research · Pitch Design",
    summary:
      "Designed a travel-health planner for first-time study abroad students, after five interviews showed the real problem was that nothing made them start.",
    status: "in-progress",
    accent: "mauve",
    dominantColor: "#d8cff7",
    hasCaseStudy: true,
    // Still for the "Next project" card — the same three-phone image as
    // the homepage card. Standalone page: src/app/projects/nudge/page.tsx.
    cover: {
      src: "/images/projects/nudge/nudge-wide.jpg",
      alt: "Three Nudge app screens on a lavender background: the trip plan, today's nudge to book a yellow fever shot, and the logging screen.",
      width: 1920,
      height: 1080,
    },
    // Animated thumbnails: Nudge's screens with Heartie, the mascot,
    // floating and beating (scripts/thumbnails: nudge_scene.py, then
    // build_thumbnails.py nudge).
    media: {
      bgColor: "#C38FAD",
      wideSrc: "/thumbnails/nudge/nudge-wide.mp4",
      widePoster: "/thumbnails/nudge/nudge-wide-poster.webp",
      wideAlt:
        "Two Nudge screens, today's nudge to book a yellow fever shot and the trip plan grouped by weeks before departure, beside a big Heartie, the smiling pink heart mascot, floating and beating on a lavender backdrop.",
      tallSrc: "/thumbnails/nudge/nudge-tall.mp4",
      tallPoster: "/thumbnails/nudge/nudge-tall-poster.webp",
      tallAlt: "Nudge's home screen on a phone, with Heartie floating beside \"Morning, Josh! One thing today keeps your trip on track.\"",
    },
  },
  {
    slug: "jurnee",
    // Homepage thumbnail mat + case-study CTA fill — light leaf green
    // (Jurnee's "done" green), so it doesn't blur into Nudge's lilac.
    matTint: "color-mix(in srgb, #8AB66C 30%, var(--color-background))",
    statusTag: "3rd place · Fall 2026 Designathon",
    title: "Jurnee",
    role: "Product Design · Branding · Prototyping",
    summary:
      "Asked to design something whose value comes from being temporary, we made a weekly set of experiences picked just for you, gone in seven days, so you actually go do them. Placed 3rd at the Fall 2026 Designathon.",
    status: "in-progress",
    accent: "mauve",
    dominantColor: "#8AB66C",
    hasCaseStudy: true,
    // Standalone page: src/app/projects/jurnee/page.tsx. Images built
    // from the team's final deck PDF.
    cover: {
      src: "/images/projects/jurnee/jurnee-cover-wide.jpg",
      alt: "Three Jurnee app screens on a lavender background: the leaderboard, the home screen's Tree of Time countdown, and the weekly mountain.",
      width: 1920,
      height: 1080,
    },
    // Animated thumbnails built like the others (scripts/thumbnails:
    // jurnee_strip.py, then build_thumbnails.py jurnee).
    media: {
      bgColor: "#9BB27B",
      wideSrc: "/thumbnails/jurnee/jurnee-wide.mp4",
      widePoster: "/thumbnails/jurnee/jurnee-wide-poster.webp",
      wideAlt:
        "Jurnee's six screens in order on a lilac mountain backdrop, panning from the 'Would you rather?' onboarding and the Weekly Compass to the home screen's tree countdown, the weekly mountain, the leaderboard, and the profile.",
      tallSrc: "/thumbnails/jurnee/jurnee-tall.mp4",
      tallPoster: "/thumbnails/jurnee/jurnee-tall-poster.webp",
      tallAlt:
        "Jurnee on a phone: the home screen's 4-days-left tree countdown, then the weekly mountain with the pottery class card and Add photo to complete being tapped, then the profile's photo feed.",
    },
  },
  {
    slug: "pig-lamp",
    // Homepage thumbnail mat + case-study CTA fill — soft blush.
    matTint: "color-mix(in srgb, var(--color-blush) 45%, var(--color-background))",
    statusTag: "Industrial design · Clinic collaboration",
    title: "Pig Lamp",
    role: "Industrial Design · Fabrication",
    summary:
      "A laser-cut wood lamp made for a clinic's autistic children. The clinic said it made the room feel more welcoming and gave the kids something fun to focus on.",
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
    // No `media`: a smaller side project, so it's listed under "Other"
    // below the featured case studies (see FeaturedWork.tsx), using
    // `imageThumbnail` as its small cover.
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
