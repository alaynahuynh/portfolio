export interface Project {
  /** Used in the URL: /projects/[slug] */
  slug: string;
  title: string;
  summary: string;
  /** Longer description shown on the project detail page. */
  description: string;
  coverImage: string;
  tags: string[];
  year: string;
  /** Optional external link (live site, case study, repo, etc.) */
  url?: string;
  featured?: boolean;
}
