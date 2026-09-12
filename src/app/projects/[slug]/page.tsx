import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/sections/case-studies/CaseStudyPage";
import { CoursePilotCaseStudy } from "@/components/sections/case-studies/coursepilot/CoursePilotCaseStudy";
import { VNHCaseStudy } from "@/components/sections/case-studies/vnh/VNHCaseStudy";
import { getProjectBySlug, projects } from "@/data/projects";
import { coursePilot } from "@/data/case-studies/course-pilot";
import { myMuseum } from "@/data/case-studies/my-museum";
import { vietnameseNoodleHouse } from "@/data/case-studies/vietnamese-noodle-house";
import type { CaseStudyData } from "@/types/case-study";

/** Every project slug maps to a full case study now — course-pilot.ts
 * and my-museum.ts have real research/flows/IA; vietnamese-noodle-house.ts
 * has real content from a completed client redesign, rendered by its own
 * bespoke layout (see VNHCaseStudy.tsx) the same way CoursePilot is. */
const CASE_STUDIES: Record<string, CaseStudyData> = {
  "case-study-01": myMuseum,
  "case-study-02": coursePilot,
  "case-study-03": vietnameseNoodleHouse,
};

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project?.title ?? "Project", description: project?.summary };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const caseStudy = CASE_STUDIES[slug];

  if (!project || !caseStudy) {
    notFound();
  }

  // CoursePilot and VNH each have their own editorial layout instead of
  // the shared generic CaseStudyPage template — see CoursePilotCaseStudy.tsx
  // and VNHCaseStudy.tsx.
  if (slug === "case-study-02") {
    return <CoursePilotCaseStudy data={caseStudy} />;
  }
  if (slug === "case-study-03") {
    return <VNHCaseStudy data={caseStudy} />;
  }

  return <CaseStudyPage data={caseStudy} />;
}
