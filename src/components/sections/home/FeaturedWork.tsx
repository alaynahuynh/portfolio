import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ProjectPlaceholder } from "@/components/sections/home/ProjectPlaceholder";
import { projects, PROJECTS_STATUS } from "@/data/projects";

/**
 * The professional centerpiece of the homepage. The intro stays compact
 * and sits on the site's light-neutral canvas (`--color-background`) —
 * the same color the hero's own frame margin fades into, so there's no
 * seam to bridge — but each project below it is its own full-bleed color
 * environment, not a card floating on this page: see ProjectPlaceholder,
 * which renders full-width `<section>`s directly, outside any
 * contained/padded wrapper, so their background genuinely reaches both
 * edges of the viewport.
 *
 * Renders every project *except* the last (Vietnamese Noodle House) —
 * that one is rendered by CreativePracticeBook instead, as the pinned
 * "previous panel" the sketchbook's incoming wavy page physically covers
 * during the scroll handoff between the two sections (see that
 * component's module comment). It's still the same VNHSpread, still
 * genuinely the final project in the list, just rendered once, by the
 * component that owns the transition, instead of twice.
 */
export function FeaturedWork() {
  const projectsBeforeTransition = projects.slice(0, -1);

  return (
    <>
      <Section id="work" className="scroll-mt-28 bg-background pt-14 pb-10 sm:pt-20 sm:pb-14">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase sm:text-sm">
            Selected Projects
          </p>
          <Heading level={2} className="mt-3">
            Selected Work
          </Heading>
          <p className="mt-3 text-lg text-muted-foreground">Products I&apos;ve researched, designed, and built.</p>
          {PROJECTS_STATUS.showInProgress && (
            <p className="mt-3 text-lg text-muted-foreground">{PROJECTS_STATUS.sectionIntro}</p>
          )}
        </div>
      </Section>

      {projectsBeforeTransition.map((project, index) => (
        <ProjectPlaceholder key={project.slug} project={project} index={index} />
      ))}
    </>
  );
}
