import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Section className="pt-24 sm:pt-32">
      <Heading level={1}>About</Heading>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Write your bio here — background, skills, and what you&apos;re
        currently focused on. Edit this in src/app/about/page.tsx.
      </p>
    </Section>
  );
}
