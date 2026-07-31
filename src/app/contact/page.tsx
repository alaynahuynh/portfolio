import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <Section className="pt-24 sm:pt-32">
      <Heading level={1}>Contact</Heading>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        The best way to reach me is by email. Edit this in
        src/app/contact/page.tsx.
      </p>
      <div className="mt-8">
        <Button href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Button>
      </div>
    </Section>
  );
}
