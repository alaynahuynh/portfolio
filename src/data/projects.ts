import type { Project } from "@/types";

/**
 * Your project list. Add, remove, or reorder entries here — the
 * homepage and /projects pages read directly from this array.
 *
 * Drop cover images in /public/images/projects and reference them
 * below, e.g. "/images/projects/my-project.jpg".
 */
export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    summary: "A short, punchy one-line summary of the project.",
    description:
      "A longer description of the project: the problem, your role, the approach, and the outcome. This shows up on the project's detail page.",
    coverImage: "/images/projects/placeholder.svg",
    tags: ["Design", "Development"],
    year: "2026",
    featured: true,
  },
  {
    slug: "project-two",
    title: "Project Two",
    summary: "A short, punchy one-line summary of the project.",
    description:
      "A longer description of the project: the problem, your role, the approach, and the outcome. This shows up on the project's detail page.",
    coverImage: "/images/projects/placeholder.svg",
    tags: ["Branding"],
    year: "2025",
    featured: true,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}
