import { Container } from "@/components/ui/Container";

/**
 * The narrative hinge between the UX work and the creative workspace —
 * explains *why* the workspace exists before the visitor arrives at it.
 */
export function CreativeTransition() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-2xl text-center">
        <p className="text-xl text-foreground sm:text-2xl">
          Every interface begins somewhere. Mine often starts with a sketch,
          a painting, or a physical prototype.
        </p>
      </Container>
    </section>
  );
}
