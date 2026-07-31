import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-default) bg-muted">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Heading level={3} size={4}>
            {project.title}
          </Heading>
          <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>
        </div>
        <span className="shrink-0 text-sm text-muted-foreground">{project.year}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </Link>
  );
}
