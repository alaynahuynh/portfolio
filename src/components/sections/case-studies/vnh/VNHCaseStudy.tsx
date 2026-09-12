import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { CaseStudyData, CaseStudyImageSpec } from "@/types/case-study";
import {
  CaseStudyContentImage,
  CaseStudyFullImage,
} from "@/components/sections/case-studies/media/CaseStudyMedia";
import {
  CaseStudySectionMobileNav,
  type CaseStudyNavSection,
} from "@/components/sections/case-studies/CaseStudySectionNav";

/**
 * Vietnamese Noodle House's own editorial case study — a bespoke layout
 * (not the generic CaseStudyPage template), same pattern as
 * CoursePilotCaseStudy.tsx. This project's real shape is Problem →
 * Process → Solution → Outcome, built around a live UX audit and a
 * completed rebuild, not a from-scratch product's research/define/
 * ideation stages — so it doesn't reuse the generic template.
 *
 * Every screenshot path/dimension below is hardcoded directly (the same
 * convention CoursePilotCaseStudy uses for its hero video and reflection
 * image) rather than routed through the shared CaseStudyData image
 * fields, since the real per-section pairings here (a hero pair, a
 * before pair, a locations quad, etc.) don't match that shape either.
 * The narrative copy still comes from vietnamese-noodle-house.ts.
 */

const NAV_SECTIONS: CaseStudyNavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "process", label: "Process" },
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "locations", label: "Locations" },
  { id: "about", label: "About" },
  { id: "food-truck", label: "Food Truck" },
  { id: "supporting", label: "Supporting pages" },
  { id: "reflection", label: "Reflection" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium tracking-wide text-(--project-accent) uppercase">
      {children}
    </p>
  );
}

const img = (
  src: string,
  alt: string,
  width: number,
  height: number,
  caption?: string,
): CaseStudyImageSpec => ({ src: `/images/projects/vnh/${src}`, alt, width, height, caption });

// ---------------------------------------------------------------- IMAGES

const HERO_DESKTOP = img(
  "home/desktop-hero.png",
  "The redesigned Vietnamese Noodle House homepage hero on desktop: a full-bleed food photograph with a legible heading, a filled Order Online button, and a secondary View Menu button.",
  1440,
  900,
);
const HERO_MOBILE = img(
  "home/mobile-hero.png",
  "The redesigned homepage hero on mobile: the same food photography, a scrim behind the heading for legibility, and Order Online as the primary filled button.",
  780,
  1688,
);

const BEFORE_DESKTOP = img(
  "before/old-site-desktop.png",
  "The old Vietnamese Noodle House website on desktop: a plain gray box standing in for a hero, and dated ordering buttons.",
  1440,
  1200,
);
const BEFORE_MOBILE = img(
  "before/old-site-mobile.png",
  "The old website on mobile: an overflowing header, a broken gray placeholder where the hero image should be, and unstyled ordering buttons.",
  1226,
  2340,
);

const HOME_DESKTOP_FAVORITES = img(
  "home/desktop-favorites.png",
  "The 'Customer Favorites' section of the redesigned homepage on desktop, with real photography for each dish.",
  1440,
  460,
);
const HOME_MOBILE_FAVORITES = img(
  "home/mobile-favorites.png",
  "The 'Customer Favorites' section on mobile.",
  780,
  1980,
);
const HOME_DESKTOP_GALLERY = img(
  "home/desktop-gallery.png",
  "The 'A Look Inside Our Restaurants' photo gallery on desktop.",
  1440,
  1120,
);
const HOME_MOBILE_GALLERY = img(
  "home/mobile-gallery.png",
  "The 'A Look Inside Our Restaurants' photo gallery on mobile.",
  780,
  900,
);
const HOME_DESKTOP_LOCATIONS_BAND = img(
  "home/desktop-locations-band.png",
  "The 'Two Locations' teal band on the homepage, on desktop.",
  1440,
  640,
);
const HOME_MOBILE_LOCATIONS_BAND = img(
  "home/mobile-locations-band.png",
  "The 'Two Locations' teal band on the homepage, on mobile.",
  780,
  1710,
);

const MENU_DESKTOP_TOP = img(
  "menu/desktop-top.png",
  "The top of the redesigned menu page on desktop: the Appetizers category with a real photo for Fried Eggrolls.",
  1440,
  950,
);
const MENU_MOBILE_TOP = img(
  "menu/mobile-top.png",
  "The top of the redesigned menu page on mobile, before scrolling into the category list.",
  780,
  1688,
);
const MENU_MOBILE_STICKY = img(
  "menu/mobile-sticky-nav.png",
  "The menu page on mobile mid-scroll, with the sticky category nav pinned at the top and the current category auto-highlighted by scroll-spy.",
  780,
  1688,
);

const ABOUT_DESKTOP = img(
  "about/desktop.png",
  "The redesigned About page on desktop, with photography filling the space that used to be an empty gap beside the text.",
  1440,
  1159,
);
const ABOUT_MOBILE = img(
  "about/mobile.png",
  "The redesigned About page on mobile.",
  780,
  3160,
);

const LOCATIONS_DESKTOP_CARDS = img(
  "locations/desktop-cards.png",
  "Step 1 on desktop: two location cards, North Syracuse and Camillus, side by side.",
  1440,
  1061,
);
const LOCATIONS_DESKTOP_CONFIRM = img(
  "locations/desktop-confirmation.png",
  "Step 2 on desktop: a confirmation panel for the selected location shown inline below the card grid, before continuing to that location's online ordering.",
  1440,
  1313,
);
const LOCATIONS_MOBILE_CARDS = img(
  "locations/mobile-cards.png",
  "Step 1 on mobile: the North Syracuse location card, the first of two stacked cards.",
  780,
  1360,
);
const LOCATIONS_MOBILE_SHEET = img(
  "locations/mobile-bottom-sheet.png",
  "Step 2 on mobile: a bottom sheet covering the list with the confirmation for the selected location, instead of a second card stacked underneath.",
  780,
  1688,
);

const FOOD_TRUCK_DESKTOP_TOP = img(
  "food-truck/desktop-top.png",
  "The top of the new Food Truck page on desktop: a teal hero and the 'Where We'll Be' schedule.",
  1440,
  1500,
);
const FOOD_TRUCK_MOBILE_TOP = img(
  "food-truck/mobile-top.png",
  "The top of the new Food Truck page on mobile.",
  780,
  3120,
);
const FOOD_TRUCK_DESKTOP_GALLERY = img(
  "food-truck/desktop-gallery.png",
  "The 'Truck In Action' photo gallery on the Food Truck page, on desktop.",
  1440,
  540,
);
const FOOD_TRUCK_MOBILE_GALLERY = img(
  "food-truck/mobile-gallery.png",
  "The 'Truck In Action' photo gallery on the Food Truck page, on mobile.",
  780,
  1200,
);

const CONTACT_DESKTOP = img(
  "contact/desktop.png",
  "The redesigned Contact page on desktop.",
  1440,
  1651,
);
const CONTACT_MOBILE = img(
  "contact/mobile.png",
  "The redesigned Contact page on mobile, showing the location info and the message form.",
  780,
  3240,
);
const MOBILE_NAV_OPEN = img(
  "nav/mobile-nav-open.png",
  "The mobile navigation menu open, showing the site's full page list on small screens.",
  780,
  1688,
);

// --------------------------------------------------------------- HELPERS

/** Two images side by side, sized by their real aspect ratios instead of
 * an even split — used for the hero (wide desktop + tall mobile) and
 * every other desktop/mobile pairing on this page so a portrait phone
 * screenshot never gets stretched into a landscape column. */
function DesktopMobilePair({
  desktop,
  mobile,
  desktopLabel = "Desktop",
  mobileLabel = "Mobile",
}: {
  desktop: CaseStudyImageSpec;
  mobile: CaseStudyImageSpec;
  desktopLabel?: string;
  mobileLabel?: string;
}) {
  return (
    <div className="grid items-start gap-8 sm:grid-cols-3">
      <div className="sm:col-span-2">
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">{desktopLabel}</p>
        <CaseStudyContentImage image={desktop} className="mx-auto max-w-none" />
      </div>
      <div className="sm:col-span-1">
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">{mobileLabel}</p>
        <CaseStudyContentImage image={mobile} className="mx-auto max-w-xs" />
      </div>
    </div>
  );
}

function ProblemColumn({ index, title, children }: { index: number; title: string; children: React.ReactNode }) {
  return (
    <div className="border-l border-border pl-6">
      <p className="text-sm font-medium text-muted-foreground">0{index}</p>
      <h3 className="mt-3 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-muted-foreground">{children}</p>
    </div>
  );
}

export function VNHCaseStudy({ data }: { data: CaseStudyData }) {
  const { hero, overview, background, research, ideation, testing, finalThoughts, whatIsComplete } = data;
  const keyFindings = research.keyFindings ?? [];
  const orderingFlow = ideation.flows[0];

  return (
    <div style={{ "--project-accent": data.accentColor ?? "var(--color-sage-deep)" } as React.CSSProperties}>
      {/* ---------------------------------------------------------- HERO */}
      <Section className="pt-24 pb-0 sm:pt-32">
        <Link href="/projects" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← Back to Work
        </Link>

        <Reveal>
          <p className="mt-10 text-sm font-medium tracking-wide text-muted-foreground uppercase">{hero.category}</p>
          <Heading level={1} className="mt-2 text-5xl sm:text-7xl">
            {hero.title}
          </Heading>
        </Reveal>

        <Reveal delay={60}>
          <p className="mt-6 max-w-2xl text-xl text-foreground sm:text-2xl">{hero.tagline}</p>
        </Reveal>

        <Reveal delay={100}>
          <span className="mt-6 inline-flex items-center gap-1.5 rounded-(--radius-pill) bg-mist-blue px-3 py-1 text-xs font-medium text-sage-deep">
            <span className="size-1.5 rounded-full bg-sage-deep" />
            {hero.statusLabel}
          </span>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{hero.description}</p>
        </Reveal>

        <Reveal delay={180}>
          <a
            href={hero.ctaHref}
            className="mt-6 inline-flex items-center gap-2 rounded-(--radius-default) border border-dashed border-border px-5 py-2.5 text-sm font-medium text-muted-foreground"
          >
            {hero.ctaLabel} →
          </a>
        </Reveal>

        <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Year</dt>
            <dd className="mt-1 text-foreground">{overview.year}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Duration</dt>
            <dd className="mt-1 text-foreground">{overview.duration}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Role</dt>
            <dd className="mt-1 text-foreground">{overview.role}</dd>
          </div>
        </dl>

        <Reveal delay={200}>
          <div className="mt-14">
            <DesktopMobilePair desktop={HERO_DESKTOP} mobile={HERO_MOBILE} />
            <p className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground">
              Ordering online is the business priority, so Order Online is the primary filled action on both
              breakpoints. On mobile specifically, I fixed a contrast issue where the heading sat directly on the
              brightest part of the photo with no scrim behind it, and repositioned a decorative callout tag that was
              crowding the headline.
            </p>
          </div>
        </Reveal>
      </Section>

      <CaseStudySectionMobileNav sections={NAV_SECTIONS} />

      {/* ------------------------------------------------------- OVERVIEW */}
      <Section id="overview" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>Overview</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            {overview.featuresIntro}
          </Heading>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {overview.features.map((feature, i) => (
            <Reveal
              key={feature.name}
              delay={i * 60}
              className="rounded-(--radius-default) border border-border bg-surface p-6"
            >
              <Heading level={3} size={4}>
                {feature.name}
              </Heading>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------- PROBLEM */}
      <Section id="problem" className="scroll-mt-28 bg-muted/40">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            {background.heading}
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{background.narrative}</p>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          <Reveal delay={80}>
            <ProblemColumn index={1} title="Not mobile-responsive">
              The layout broke, text was unstyled, and the hero image was broken or showing a placeholder.
            </ProblemColumn>
          </Reveal>
          <Reveal delay={120}>
            <ProblemColumn index={2} title="Generic, dated identity">
              A templated look on desktop that said nothing about the food or the family behind it.
            </ProblemColumn>
          </Reveal>
          <Reveal delay={160}>
            <ProblemColumn index={3} title="Hosted on HostGator">
              Legacy hosting with no real path to the responsive, photography-forward site the brand needed.
            </ProblemColumn>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-16">
            <DesktopMobilePair
              desktop={BEFORE_DESKTOP}
              mobile={BEFORE_MOBILE}
              desktopLabel="Old site — Desktop"
              mobileLabel="Old site — Mobile"
            />
            <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
              The desktop version was merely generic. The mobile version — the version most customers actually
              encounter first — was broken and effectively unusable. That gap was the strongest evidence for why this
              needed a redesign.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* -------------------------------------------------------- PROCESS */}
      <Section id="process" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>Process</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            {research.heading}
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{research.intro}</p>
          <p className="mt-2 max-w-[45rem] text-sm text-muted-foreground">{research.participants}</p>
        </Reveal>

        <div className="mt-14">
          {keyFindings.map((finding, i) => (
            <Reveal key={finding.title} delay={i * 30}>
              <div className="grid gap-3 border-t border-border py-8 first:border-t-0 first:pt-0 sm:grid-cols-[4.5rem_1fr] sm:gap-8">
                <p className="text-sm font-medium text-(--project-accent)">0{i + 1}</p>
                <div>
                  <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{finding.title}</h3>
                  <p className="mt-3 max-w-xl text-muted-foreground">{finding.whatParticipantsSaid}</p>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground italic">{finding.whyItMatters}</p>
                  <p className="mt-2 max-w-xl text-sm font-medium text-foreground">→ {finding.designResponse}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {background.principles && (
          <Reveal delay={80}>
            <div className="mt-16 border-t border-border pt-12">
              <Heading level={3} size={4}>
                {background.principles.title}
              </Heading>
              <div className="mt-8 grid gap-8 sm:grid-cols-3">
                {background.principles.items.map((principle, i) => (
                  <div key={principle.title}>
                    <p className="text-sm font-semibold text-(--project-accent)">{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-2 font-medium text-foreground">{principle.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </Section>

      {/* ----------------------------------------------------------- HOME */}
      <Section id="home" className="scroll-mt-28 bg-muted/40">
        <Reveal>
          <Eyebrow>Solution</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            The homepage, rebuilt around photography
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            {data.designPrinciples[0]} The hero already shown above carries into every section below it — real
            photography of the food, the space, and the two locations, on both breakpoints.
          </p>
        </Reveal>
        <div className="mt-14 space-y-16">
          <Reveal>
            <p className="mb-4 text-sm font-medium text-foreground">Customer Favorites</p>
            <DesktopMobilePair desktop={HOME_DESKTOP_FAVORITES} mobile={HOME_MOBILE_FAVORITES} />
          </Reveal>
          <Reveal delay={40}>
            <p className="mb-4 text-sm font-medium text-foreground">A Look Inside Our Restaurants</p>
            <DesktopMobilePair desktop={HOME_DESKTOP_GALLERY} mobile={HOME_MOBILE_GALLERY} />
          </Reveal>
          <Reveal delay={80}>
            <p className="mb-4 text-sm font-medium text-foreground">Two Locations</p>
            <DesktopMobilePair desktop={HOME_DESKTOP_LOCATIONS_BAND} mobile={HOME_MOBILE_LOCATIONS_BAND} />
          </Reveal>
        </div>
      </Section>

      {/* ----------------------------------------------------------- MENU */}
      <Section id="menu" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>Solving long-menu navigation</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            Seven categories, ~50 items, one page — with a nav that keeps up
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            The menu is long by nature — I didn&rsquo;t want to paginate it or hide items behind extra clicks. Instead
            I added a sticky category nav with scroll-spy auto-highlighting, so the current section is always visible
            no matter how far down the page a customer has scrolled.
          </p>
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">Desktop — top of the menu</p>
            <CaseStudyFullImage image={MENU_DESKTOP_TOP} className="mx-auto max-w-3xl" />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <Reveal delay={40}>
            <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">Mobile — top of page</p>
            <CaseStudyContentImage image={MENU_MOBILE_TOP} className="mx-auto max-w-xs" />
          </Reveal>
          <Reveal delay={80}>
            <p className="mb-3 text-xs font-medium tracking-wide text-(--project-accent) uppercase">
              Mobile — sticky nav mid-scroll
            </p>
            <CaseStudyContentImage image={MENU_MOBILE_STICKY} className="mx-auto max-w-xs" />
            <p className="mt-3 max-w-xs text-xs text-muted-foreground">
              This is a designed behavior, not just a static screen: as the page scrolls, the nav pins to the top and
              the active category updates on its own.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------ LOCATIONS */}
      <Section id="locations" className="scroll-mt-28 bg-muted/40">
        <Reveal>
          <Eyebrow>Centerpiece — interaction design</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-4xl sm:text-6xl">
            Designing the two-step confirmation flow
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            With two physical locations and two different online-ordering links, picking the wrong one has a real
            cost — an order placed at the wrong place, not just a wrong click. I designed an explicit{" "}
            <span className="font-medium text-foreground">select, then confirm</span> flow so a customer always sees
            which location they&rsquo;re about to order from before committing.
          </p>
        </Reveal>

        {orderingFlow && (
          <Reveal delay={60}>
            <p className="mt-4 max-w-[45rem] text-sm text-muted-foreground italic">{orderingFlow.takeaway}</p>
          </Reveal>
        )}

        <div className="mt-16 space-y-4">
          <Reveal delay={80}>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Desktop</p>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal delay={100}>
              <p className="mb-3 text-sm font-medium text-foreground">Step 1 — Select a location</p>
              <CaseStudyContentImage image={LOCATIONS_DESKTOP_CARDS} className="max-w-none" />
            </Reveal>
            <Reveal delay={140}>
              <p className="mb-3 text-sm font-medium text-(--project-accent)">Step 2 — Confirm</p>
              <CaseStudyContentImage image={LOCATIONS_DESKTOP_CONFIRM} className="max-w-none" />
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Desktop has room to show the confirmation inline, right below the card grid — a natural next step in the
              same view.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-4 border-t border-border pt-14">
          <Reveal delay={80}>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Mobile</p>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2">
            <Reveal delay={100}>
              <p className="mb-3 text-sm font-medium text-foreground">Step 1 — Select a location</p>
              <CaseStudyContentImage image={LOCATIONS_MOBILE_CARDS} className="mx-auto max-w-xs" />
            </Reveal>
            <Reveal delay={140}>
              <p className="mb-3 text-sm font-medium text-(--project-accent)">Step 2 — Confirm</p>
              <CaseStudyContentImage image={LOCATIONS_MOBILE_SHEET} className="mx-auto max-w-xs" />
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              On mobile, a second full card stacked underneath read as duplicated information rather than a next
              step. So I redesigned this step as a bottom sheet that covers the list instead of extending it — the
              same information, but a sequence that&rsquo;s actually clear on a small screen.
            </p>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <p className="mx-auto mt-16 max-w-2xl text-center text-lg font-medium text-foreground">
            Same problem, same two steps — two breakpoint-appropriate solutions instead of one pattern forced to work
            everywhere.
          </p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------ ABOUT */}
      <Section id="about" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>Filling content gaps</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            An About page that was more empty space than story
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            The old About page was text-only, with a large empty gap on desktop where nothing else lived. I added
            real photography so the page reads as considered rather than unfinished.
          </p>
        </Reveal>
        <div className="mt-14">
          <Reveal>
            <DesktopMobilePair desktop={ABOUT_DESKTOP} mobile={ABOUT_MOBILE} />
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------- FOOD TRUCK */}
      <Section id="food-truck" className="scroll-mt-28 bg-muted/40">
        <Reveal>
          <Eyebrow>Expanding scope</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            Giving the food truck a web presence it never had
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            The food truck travels around the Syracuse area but had no page on the old site at all. As part of the
            redesign I built one from scratch, matching the same visual identity as the rest of the site instead of
            treating it as an afterthought.
          </p>
        </Reveal>
        <div className="mt-14 space-y-16">
          <Reveal>
            <DesktopMobilePair desktop={FOOD_TRUCK_DESKTOP_TOP} mobile={FOOD_TRUCK_MOBILE_TOP} />
          </Reveal>
          <Reveal delay={40}>
            <p className="mb-4 text-sm font-medium text-foreground">Truck In Action</p>
            <DesktopMobilePair desktop={FOOD_TRUCK_DESKTOP_GALLERY} mobile={FOOD_TRUCK_MOBILE_GALLERY} />
          </Reveal>
        </div>
      </Section>

      {/* ----------------------------------------------------- SUPPORTING */}
      <Section id="supporting" className="scroll-mt-28">
        <Reveal>
          <Eyebrow>Supporting pages</Eyebrow>
          <Heading level={2} className="mt-4 max-w-2xl text-3xl sm:text-5xl">
            Reliability over appearance
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">
            The contact form isn&rsquo;t visually different from the old one, but it used to show &ldquo;Message
            sent!&rdquo; on every submission without ever actually delivering email anywhere. I rebuilt it to send
            through Resend, and to fail honestly and visibly if it&rsquo;s ever misconfigured again, rather than
            silently dropping messages.
          </p>
        </Reveal>
        <div className="mt-14">
          <Reveal>
            <DesktopMobilePair desktop={CONTACT_DESKTOP} mobile={CONTACT_MOBILE} />
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-16 border-t border-border pt-12">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Mobile-first details</p>
            <div className="mt-6 grid max-w-xs gap-6">
              <div>
                <CaseStudyContentImage image={MOBILE_NAV_OPEN} className="max-w-xs" />
                <p className="mt-2 text-xs text-muted-foreground">The mobile navigation menu, open.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ REFLECTION */}
      <Section id="reflection" className="scroll-mt-28 bg-muted/40">
        <Reveal>
          <Eyebrow>Outcome</Eyebrow>
          <Heading level={2} className="mt-4 max-w-3xl text-3xl sm:text-5xl">
            {finalThoughts.pullQuote}
          </Heading>
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-[45rem] text-lg text-muted-foreground">{finalThoughts.whatILearned}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <Reveal delay={80}>
            <p className="text-xs font-medium tracking-wide text-(--project-accent) uppercase">Most proud of</p>
            <p className="mt-3 text-muted-foreground">{finalThoughts.proudestOf}</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Next steps</p>
            <p className="mt-3 text-muted-foreground">{finalThoughts.nextSteps}</p>
          </Reveal>
        </div>

        {testing.validateNext && (
          <Reveal delay={140}>
            <div className="mt-16 border-t border-border pt-10">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {testing.heading}
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-3">
                {testing.validateNext.map((item) => (
                  <div key={item.title}>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.question}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={180}>
          <ul className="mt-16 flex flex-wrap gap-2 border-t border-border pt-10">
            {whatIsComplete.map((item) => (
              <li
                key={item.label}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-(--radius-pill) border px-3 py-1 text-sm",
                  item.done
                    ? "border-transparent bg-mist-blue text-sage-deep"
                    : "border-border bg-surface text-muted-foreground",
                )}
              >
                <span aria-hidden="true">{item.done ? "✓" : "○"}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </div>
  );
}
