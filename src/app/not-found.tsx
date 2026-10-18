import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";

export default function NotFound() {
  return (
    <Section className="pt-32 sm:pt-44">
      <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">404</p>
      <Heading level={1} className="mt-3 text-4xl sm:text-6xl">
        This page wandered off.
      </Heading>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        The link may be old or mistyped. My case studies are a click away.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
        <Link href="/#work" className="text-sage-deep underline underline-offset-4 hover:text-foreground">
          View selected work →
        </Link>
        <Link href="/" className="text-muted-foreground underline underline-offset-4 hover:text-foreground">
          Back home
        </Link>
      </div>
    </Section>
  );
}
