import type { CaseStudyData } from "@/types/case-study";

export const myMuseum: CaseStudyData = {
  slug: "case-study-01",

  // MyMuseum's case-study accent — the accessible deep-blue variant
  // (not the brighter `--color-sky` used as the homepage spread's
  // full-bleed background) since this is used as small text/border
  // color throughout the hero and major sections, which sky itself
  // doesn't have enough contrast for on cream (see CaseStudyPage's
  // `--project-accent` wiring).
  accentColor: "var(--color-lake-blue-deep)",

  hero: {
    category:
      "Product Design · Interaction Design · 3D Web · Frontend Development",
    title: "MyMuseum",
    tagline:
      "Turning online art portfolios into spaces people can actually explore together.",
    description:
      "I designed and built a multiplayer 3D gallery platform where artists can turn their work into personal museums and invite visitors to explore them together.",
    statusLabel: "Live",
    ctaLabel: "Build Your Own Museum",
    ctaHref: "https://mymuseum-eta.vercel.app/",
    platform: "Web",
    tools: ["Figma", "Next.js", "React Three Fiber", "Claude Code", "Blender"],
    video: {
      src: "/videos/projects/mymuseum/walkthrough.mp4",
      alt: "Walkthrough of MyMuseum's live 3D gallery experience.",
      width: 1920,
      height: 1036,
    },
  },

  overview: {
    year: "2026",
    duration: "3 months",
    role: "Solo Product Designer + Developer",
    features: [
      {
        name: "Automatic 3D Galleries",
        description:
          "Creators upload their work and MyMuseum automatically arranges it into a navigable gallery while preserving each artwork's proportions.",
      },
      {
        name: "Persistent Creator Tools",
        description:
          "Creators can return to edit museum details, add or remove artwork, control visibility, and share a permanent museum link.",
      },
      {
        name: "Multiplayer Exploration",
        description:
          "Visitors can occupy the same museum together, explore artwork spatially, or switch to an accessible grid-based experience.",
      },
    ],
  },

  background: {
    heading: "What if an art portfolio felt like entering someone's world?",
    narrative:
      "Online art portfolios are usually viewed, not explored. Traditional portfolio platforms are effective at displaying work, but creative projects are often reduced to grids of thumbnails and scrolling feeds. I wanted to explore whether viewing someone's artwork could instead feel more personal, spatial, and social — closer to walking through a gallery than browsing a profile. I also wanted artists to have a place to share work without introducing the pressures of traditional social platforms: likes, follower counts, engagement metrics, and constant posting. This became MyMuseum: a platform where artists upload their work and receive a walkable, personal gallery they can share with others.",
    placeholder: false,
    principles: {
      title: "The experience I wanted to create",
      items: [
        {
          title: "Discover, don't just scroll",
          description:
            "Visitors should encounter artwork spatially rather than moving through a conventional feed.",
        },
        {
          title: "Make every museum feel personal",
          description:
            "Artists should have enough control over their artwork, visual style, identity, and museum to feel ownership over the space.",
        },
        {
          title: "Make exploration feel shared",
          description:
            "Visitors should feel that they are exploring alongside real people rather than entering an empty static website.",
        },
      ],
    },
  },

  research: {
    heading: "Competitive discovery",
    intro:
      "I reviewed existing virtual-gallery products to understand where MyMuseum could offer something meaningfully different, and paired that with repeated end-to-end product testing as the platform evolved.",
    participants:
      "Discovery so far includes competitive analysis and manual product testing. Structured usability sessions with artists and visitors are the next research step.",

    competitiveDiscovery: {
      competitor: "New Art City",
      narrative:
        "New Art City proved that expressive, browser-based exhibitions were possible: the whole platform is built around creating and exploring shows, Recent Exhibitions and Events & Openings give visitors two different ways to discover artists, and built-in chat gives the space a real sense of social presence. But its open-ended building tools gave creators significant creative freedom at the cost of visitor navigation — locating a specific piece could take real exploration — and the tool itself felt more like a professional creative workspace than somewhere to just upload work. KunstMatrix showed the same trade-off from the opposite direction: polished, professional virtual galleries built for institutions rather than for an individual artist. Neither felt like something an artist of any age or skill level could pick up and use in a few minutes, which is the gap I wanted MyMuseum to fill.",
      image: {
        src: "/images/projects/mymuseum/research/new-art-city-comparison.png",
        alt: "Annotated teardown of New Art City's homepage and 3D exhibition view: callouts note that the platform centers on creating and exploring exhibitions, that Recent Exhibitions and Events & Openings give two paths to discovery, that creators get significant creative freedom to design immersive spaces, that open-ended navigation can make specific artwork harder to locate, and that built-in chat supports social presence.",
        width: 1924,
        height: 1356,
      },
      opportunity:
        "Make creating a virtual gallery feel less like designing an exhibition and more like uploading a portfolio.",
      flowSteps: ["Upload artwork", "Choose a style", "Museum generated", "Share"],
      placeholder: false,
    },

    // Unused while competitiveDiscovery is set above — kept only to satisfy
    // the shared CaseStudyData shape other projects (e.g. CoursePilot) rely
    // on for real SWOT/participant findings.
    swot: { strengths: [], weaknesses: [], opportunities: [], threats: [] },
    swotPlaceholder: true,
    findings: [],
    findingsPlaceholder: true,
  },

  keyInsights: [],

  define: {
    sectionHeading: "Designing for both sides of the museum",
    personaName: "Artist / Creator",
    personaSummary:
      "Someone who wants a distinctive way to share a collection of work but does not want to learn 3D modeling, level design, or professional exhibition software.",
    personaNeeds: [
      "Turn artwork into a polished gallery quickly",
      "Personalize the museum without manually constructing a 3D environment",
      "Share one reliable link",
      "Return later to update their collection",
    ],
    personaPlaceholder: false,
    secondaryPersona: {
      name: "Visitor",
      summary: "Someone exploring an artist's museum.",
      needs: [
        "Understand how to navigate",
        "Discover artwork without getting lost",
        "Inspect individual work up close",
        "Access artwork when 3D interaction is impractical",
        "Feel the presence of others without social-media clutter",
      ],
    },
    tensionIntro:
      "Giving artists complete control over walls, room layouts, and artwork placement could create highly expressive museums, but it could also force creators to understand exhibition design and result in confusing spaces for visitors. Automatically making every museum identical would simplify creation, but would remove the individuality that makes the idea interesting.",
    hmw:
      "How might I give artists enough freedom to make a museum feel like their own without sacrificing navigation and accessibility for visitors?",
  },

  ideation: {
    whyThisTitle: "Three tensions shaped the product",

    whyThis: [
      {
        title: "Freedom vs. structure",
        painPoint:
          "Complete spatial freedom could create highly personal museums, but it could also result in confusing layouts and force creators to learn exhibition design.",
        solution:
          "Automatically generate the underlying spatial structure while creators control artwork, gallery style, museum information, publication state, and identity.",
      },
      {
        title: "Immersion vs. accessibility",
        painPoint:
          "Keyboard-controlled 3D exploration works well on desktop but does not translate naturally to every device.",
        solution:
          "Pair the 3D gallery with Grid View. On touch-oriented devices, make Grid View the easier starting point while keeping 3D optional.",
      },
      {
        title: "Social presence vs. social pressure",
        painPoint:
          "Multiplayer could make galleries feel alive, but likes, follower counts, chat clutter, or engagement mechanics could turn the experience into another social feed.",
        solution:
          "Keep multiplayer presence subtle and environmental so visitors can occupy the same gallery without social metrics becoming the focus.",
      },
    ],

    whyThisPlaceholder: false,

    flowsSectionTitle: "Mapping the two experiences",
    flowsIntro:
      "MyMuseum had two core journeys that needed to work together: creating a museum and exploring one.",

    flows: [
      {
        name: "Creator flow",
        layout: "featured",
        steps: [
          "Discover MyMuseum",
          "Create account",
          "Add museum details",
          "Upload artwork",
          "Add artwork information",
          "Choose gallery style",
          "Generate museum",
          "Preview",
          "Publish",
          "Copy link",
          "Share",
        ],
        image: {
          src: "/images/projects/mymuseum/flow-creator.png",
          alt: "Flowchart of the MyMuseum creator flow: landing page into sign up, museum details, artwork upload, gallery style selection, generating and previewing the museum, then editing or publishing with a visibility choice and share link.",
          width: 2472,
          height: 3640,
        },
        takeaway:
          "The creator experience needed to minimize the distance between uploading artwork and having something polished enough to share.",
      },
      {
        name: "Visitor flow",
        layout: "featured",
        steps: [
          "Open a shared link or discover a museum",
          "Enter museum",
          "Choose 3D Gallery or Grid View",
          "Explore artwork",
          "Open artwork details",
          "Explore alongside other visitors",
        ],
        image: {
          src: "/images/projects/mymuseum/flow-visitor.png",
          alt: "Flowchart of the MyMuseum visitor flow: a shared link or Explore page into museum entry, choosing 3D Game View or Grid View, browsing and selecting artwork, viewing artwork details, then continuing to explore.",
          width: 2120,
          height: 2424,
        },
        takeaway:
          "The visitor experience needed to preserve spatial discovery without requiring every visitor to rely on 3D navigation.",
      },
    ],

    flowsPlaceholder: false,
  },

  productRequirements: [
    {
      need: "Create an immersive portfolio without 3D expertise",
      requirement:
        "Automatically generate a navigable museum from uploaded artwork.",
    },
    {
      need: "Make each museum feel personal",
      requirement:
        "Guided customization of gallery style, museum information, artwork metadata, and avatar identity.",
    },
    {
      need: "Explore comfortably on desktop",
      requirement: "WASD + arrow-key navigation.",
    },
    {
      need: "Inspect individual artwork",
      requirement: "Focused artwork viewer.",
    },
    {
      need: "Return and update a museum",
      requirement: "Persistent creator ownership and editing.",
    },
    {
      need: "Share work easily",
      requirement: "Stable museum URL with View Museum and Copy Link actions.",
    },
    {
      need: "Support different devices and interaction preferences",
      requirement: "Grid View alternative to the 3D gallery.",
    },
    {
      need: "Make museums feel inhabited",
      requirement: "Subtle multiplayer presence without social metrics.",
    },
  ],

  designPrinciples: [
    "Creating a museum should not require 3D expertise.",
    "Customization should never compromise navigation.",
    "Multiplayer should make the gallery feel alive without turning it into social media.",
    "The experience should work fully on both desktop and mobile, not just degrade gracefully on one of them.",
  ],

  design: {
    processNarrative:
      "I began by mapping the creator and visitor journeys and exploring how uploading artwork could translate into a spatial experience. I then built the 3D gallery and progressively expanded it into a persistent creator product, auditing and redesigning the interface as functionality grew.",

    wireframeScreens: [],
    highFidelityScreens: [],

    buildStories: [
      {
        title: "Early structure",
        description:
          "Before any 3D or visual design work began, I blocked out the three core pages in low fidelity — creating a museum, exploring other people's museums, and viewing one — to settle the content and layout each page needed before deciding how it should look.",
        images: [
          {
            src: "/images/projects/mymuseum/early/create-museum.png",
            alt: "Low-fidelity wireframe of the Create Museum page: a museum name field, an Upload Artwork section with three image slots, and a Gallery Style section with three style options.",
            width: 1440,
            height: 900,
          },
          {
            src: "/images/projects/mymuseum/early/explore-art.png",
            alt: "Low-fidelity wireframe of the Explore page: a grid of example museum cards, each a thumbnail with a caption, browsable beneath an Explore art heading.",
            width: 1440,
            height: 900,
          },
          {
            src: "/images/projects/mymuseum/early/view-museum.png",
            alt: "Low-fidelity wireframe of a single museum page: a gallery title banner, artwork thumbnails with artist labels along each side, and a placeholder avatar figure standing in the gallery.",
            width: 1440,
            height: 900,
          },
        ],
      },
      {
        title: "Building the creator experience",
        description:
          "The upload, gallery-style selection, dashboard, editing, and publishing flow that turns a collection of artwork into a shareable museum.",
      },
      {
        title: "Building the visitor experience",
        description:
          "The 3D gallery, artwork viewer, Grid View, and multiplayer presence that let a visitor explore a museum on their own terms.",
      },
    ],

    visualElements: {
      logoAndColor:
        "A warm museum-inspired palette uses canvas neutrals, terracotta, sage, dusty blue, and restrained accent colors so the interface supports rather than competes with uploaded artwork.",
      typography:
        "Fraunces provides an editorial, gallery-like display voice while Inter keeps navigation, forms, and product controls highly readable.",
      components:
        "Reusable page headers, fields, save states, museum cards, publication badges, artwork rows, and museum-label details create consistency across the creator and visitor experiences.",
    },

    placeholder: false,
  },

  finalProduct: {
    intro:
      "The strongest real screens from MyMuseum today, organized around what each one lets someone do — each paired with its mobile equivalent where the flow carries over.",
    stories: [
      {
        title: "Give every visitor an identity",
        description:
          "A drag-to-rotate avatar builder — shape, body color, expression, and decoration — so exploring a museum never feels anonymous, on desktop or mobile.",
        images: [
          {
            src: "/images/projects/mymuseum/final/avatar-editor.png",
            alt: "MyMuseum avatar editor showing a rounded-cube character with glasses and a sprout decoration, with body color, expression, and decoration controls beside it.",
            width: 1440,
            height: 900,
          },
          {
            src: "/images/projects/mymuseum/final/avatar-editor-mobile.png",
            alt: "The same avatar editor stacked into a single mobile column, with the character preview above its customization controls.",
            width: 390,
            height: 844,
          },
        ],
      },
      {
        title: "Browse an artist's collection",
        description:
          "A public profile lists every museum an artist has published, each opening straight into that museum.",
        images: [
          {
            src: "/images/projects/mymuseum/final/artist-profile.png",
            alt: "Artist profile page for Alayna showing an avatar, bio, and three published museum cards with Enter museum links.",
            width: 1440,
            height: 900,
          },
          {
            src: "/images/projects/mymuseum/final/artist-profile-mobile.png",
            alt: "The same artist profile reflowed into a single mobile column, museum cards stacked vertically.",
            width: 390,
            height: 844,
          },
        ],
      },
      {
        title: "Start building, gated behind an account",
        description:
          "The create flow leads with what it does before asking for anything — an account only appears once someone is ready to make a museum their own.",
        images: [
          {
            src: "/images/projects/mymuseum/final/create-signin.png",
            alt: "Build your own gallery screen prompting sign-in, with Sign in and Create an account buttons before any museum is created.",
            width: 1440,
            height: 900,
          },
          {
            src: "/images/projects/mymuseum/final/create-signin-mobile.png",
            alt: "The same sign-in prompt on mobile, with the primary Create action highlighted in the bottom navigation bar.",
            width: 390,
            height: 844,
          },
        ],
      },
      {
        title: "Walk through the gallery",
        description:
          "Third-person navigation between rooms, arriving at a threshold, glancing down a wing, and getting a contextual prompt the moment artwork is close enough to view.",
        images: [
          {
            src: "/images/projects/mymuseum/final/gallery-threshold.png",
            alt: "Symmetrical museum threshold framed by white columns, leading into a room labeled THE FAIR ROOM with a sculpture on a plinth ahead.",
            width: 1440,
            height: 900,
          },
          {
            src: "/images/projects/mymuseum/final/gallery-west-wing.png",
            alt: "Wide view down the west wing of the museum, showing a framed portrait, a sculpture, and a second gallery visible through an archway.",
            width: 1440,
            height: 900,
          },
          {
            src: "/images/projects/mymuseum/final/gallery-entrance-hall.png",
            alt: "Museum entrance hall with a potted plant, a bench, and an avatar standing at the threshold to the next gallery.",
            width: 1440,
            height: 900,
          },
          {
            src: "/images/projects/mymuseum/final/artwork-prompt.png",
            alt: "An avatar standing beside a hung painting with a 'Press E to view Adrift' interaction prompt at the bottom of the screen.",
            width: 1440,
            height: 900,
          },
        ],
      },
      {
        title: "Inspect a piece up close",
        description:
          "Stepping up to a piece opens a focused viewer with its full details, and Previous/Next carries that same viewer through the rest of the collection.",
        images: [
          {
            src: "/images/projects/mymuseum/final/artwork-viewer.png",
            alt: "Focused artwork viewer showing 'The Watcher,' a carved side table with a painted eye, its title, medium, and description, numbered 1 of 15.",
            width: 1440,
            height: 900,
          },
          {
            src: "/images/projects/mymuseum/final/artwork-viewer-next.png",
            alt: "The same viewer after clicking Next, now showing 'Grape Study,' an ink wash drawing, numbered 2 of 15.",
            width: 1440,
            height: 900,
          },
        ],
      },
      {
        title: "Browse an accessible grid instead",
        description:
          "A grid view mirrors the same collection for anyone who'd rather browse than navigate a 3D space, with a one-click toggle back into the museum.",
        images: [
          {
            src: "/images/projects/mymuseum/final/grid-view.png",
            alt: "Accessible grid view of a museum's full collection as cards with thumbnails, titles, and View artwork links, with an Enter 3D Gallery button.",
            width: 1440,
            height: 900,
          },
          {
            src: "/images/projects/mymuseum/final/grid-view-controls.png",
            alt: "The same grid view with its Controls menu open, showing a Return to 3D museum option alongside movement instructions.",
            width: 1440,
            height: 900,
          },
        ],
      },
      {
        title: "Feel other visitors in the room",
        description:
          "Live visitor counts and labeled avatars moving through the same museum in real time — two separate sessions in the same live room.",
        images: [
          {
            src: "/images/projects/mymuseum/final/multiplayer-a.png",
            alt: "Two visitor avatars, one labeled Visitor 965, standing together in a gallery doorway with a live visitor count in the corner.",
            width: 1024,
            height: 660,
          },
          {
            src: "/images/projects/mymuseum/final/multiplayer-b.png",
            alt: "The same shared museum from a second live session, with a different visitor avatar labeled Visitor 354.",
            width: 1024,
            height: 660,
          },
        ],
      },
    ],
    placeholder: false,
  },

  testing: {
    intro:
      "I repeatedly tested MyMuseum as it evolved from a 3D prototype into a persistent product, focusing on whether complete creator and visitor workflows worked with real accounts, stored artwork, publication states, sharing, and multiple users.",

    tasks: [
      "Create, edit, publish, and share a museum using a real creator account.",
      "Open the same museum anonymously and from a second authenticated account to verify visibility and ownership behavior.",
      "Test creation, editing, sharing, 3D exploration, and Grid View across desktop and mobile-oriented interaction states.",
    ],

    iterations: [
      {
        title: "From a one-time creation flow to a persistent creator tool",
        feedback:
          "Manual testing showed that once a museum was generated, creators had no way back in — there was no way to fix a typo, swap out a piece, or change a museum from private to public after the fact.",
        finalIteration:
          "Expanded MyMuseum from a single create-and-done flow into a persistent creator tool: creators can edit museum details, control publish/private visibility, and manage individual artworks at any time. Adding or removing a piece reuses the same automatic gallery-layout system rather than a second placement model, so the 3D space stays consistent as a collection evolves.",
      },
      {
        title: "Making sharing discoverable",
        feedback:
          "Permanent museum URLs technically existed but creators did not have an obvious way to retrieve and reuse them.",
        finalIteration:
          "Added View Museum and Copy Link actions to the dashboard and editing flow.",
        // To add a before/after comparison for this iteration, save the two
        // screenshots to /public/images/projects/mymuseum/before-sharing.jpg
        // and after-sharing.jpg, then set:
        // beforeAfter: {
        //   before: { src: "/images/projects/mymuseum/before-sharing.jpg", alt: "...", width, height },
        //   after: { src: "/images/projects/mymuseum/after-sharing.jpg", alt: "...", width, height },
        // },
      },
      {
        title: "Reducing artwork editing overload",
        feedback:
          "As collections grew, displaying every artwork's full metadata form created an increasingly long and difficult-to-scan editing experience.",
        finalIteration:
          "Redesigned artwork management as compact summary rows with expandable editing.",
      },
      {
        title: "Designing around mobile interaction limits",
        feedback:
          "The interface could be responsive while the actual keyboard-based 3D interaction still had no natural touch equivalent.",
        finalIteration:
          "Made Grid View the initial mobile experience while retaining an optional Enter 3D Gallery path.",
      },
      {
        title: "Fixing a share link that looked correct but failed",
        feedback:
          "The generated URL was using a placeholder domain rather than the browser's real origin.",
        finalIteration:
          "Separated relative internal navigation from browser-resolved absolute sharing URLs so copied links work consistently across environments.",
        isTechnicalNote: true,
      },
    ],

    placeholder: false,
  },

  results: {
    headline: "From a 3D experiment to a functioning creator platform",
    summary:
      "MyMuseum now supports creator accounts, museum ownership, artwork storage, editing, publication controls, stable sharing, responsive viewing modes, and realtime multiplayer infrastructure.",

    outcomes: [
      "Persistent creator accounts",
      "Editable museums",
      "Publishing + sharing",
      "3D + Grid View",
      "Realtime multiplayer",
    ],

    stat: {
      value: "23/23",
      caption:
        "Functional checks passed during the latest authenticated end-to-end verification.",
    },

    quote: {
      text: "Structured usability testing with artists and visitors.",
      attribution: "Next validation step",
    },

    placeholder: false,
  },

  finalThoughts: {
    pullQuote:
      "Building an exciting interaction and building a usable product are different problems.",

    whatILearned:
      "The original challenge was making a 3D museum work. As the product evolved, the harder questions became how creators would manage museums, how visitors would access them across devices, how sharing should behave with persistent data, and how multiplayer presence could support rather than distract from the artwork.",

    nextSteps:
      "Structured artist/visitor usability testing, public multiplayer deployment, improved museum discovery, improved live presence, and continued refinement of the avatar system.",

    proudestOf:
      "I'm most proud of turning an unusual interaction concept into something creators can actually return to, manage, update, and share rather than stopping at a visually impressive prototype.",

    placeholder: false,
  },

  whatIsComplete: [
    { label: "Museum metadata editing", done: true },
    { label: "Publish / private visibility", done: true },
    { label: "Stable, shareable museum URLs", done: true },
    { label: "Copy Link action", done: true },
    { label: "Artwork editing", done: true },
    { label: "Artwork addition / removal", done: true },
    { label: "Automatic gallery relayout", done: true },
    { label: "Cross-account authorization checks", done: true },
  ],
};
