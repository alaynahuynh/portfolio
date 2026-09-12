import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
};

export default function ProjectsPage() {
  return (
    <Section className="pt-24 sm:pt-32">
      <Heading level={1}>Work</Heading>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} variant={(index % 3) as 0 | 1 | 2} />
        ))}
      </div>
    </Section>
  );
}
