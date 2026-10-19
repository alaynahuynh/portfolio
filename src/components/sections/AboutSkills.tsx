interface SkillGroup {
  title: string;
  tools: string[];
  /** Soft chip fill, from the site palette. */
  tint: string;
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Product & UX design",
    tools: ["User interviews", "Usability testing", "Figma", "FigJam"],
    tint: "color-mix(in srgb, var(--color-mist-blue) 60%, var(--color-background))",
  },
  {
    title: "Building in code",
    tools: ["Next.js", "React", "React Three Fiber", "Blender"],
    tint: "color-mix(in srgb, var(--color-sage) 30%, var(--color-background))",
  },
  {
    title: "Visual & brand",
    tools: ["Illustrator", "Photoshop", "InDesign", "Procreate"],
    tint: "color-mix(in srgb, var(--color-butter) 35%, var(--color-background))",
  },
  {
    title: "By hand",
    tools: ["Industrial design", "Laser cutting", "Painting"],
    tint: "color-mix(in srgb, var(--color-blush) 45%, var(--color-background))",
  },
];

/**
 * What she does, grouped by kind of work rather than a flat software
 * list, with each group's tools as chips.
 */
export function AboutSkills() {
  return (
    <section
      aria-labelledby="about-skills"
      className="mx-auto mt-16 max-w-3xl border-t border-border pt-12 sm:mt-20 lg:max-w-5xl"
    >
      <h2 id="about-skills" className="font-alayna-handwriting text-3xl text-sage-deep sm:text-4xl">
        What I do
      </h2>
      <div className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((group) => (
          // Each column is capped by a short rule in its own tint.
          <div key={group.title} className="border-t-4 pt-3" style={{ borderColor: group.tint }}>
            <h3 className="text-sm font-medium text-foreground">{group.title}</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {group.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-(--radius-pill) px-2.5 py-0.5 text-xs text-foreground"
                  style={{ backgroundColor: group.tint }}
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
