import type { CaseStudyData } from "@/types/case-study";

export const myMuseum: CaseStudyData = {
  slug: "mymuseum",

  // MyMuseum's case-study accent — the accessible deep-blue variant
  // (not the brighter `--color-sky` used as the homepage spread's
  // full-bleed background) since this is used as small text/border
  // color throughout the hero and major sections, which sky itself
  // doesn't have enough contrast for on cream (see CaseStudyPage's
  // `--project-accent` wiring).
  accentColor: "var(--color-lake-blue-deep)",

  navOverride: [
    { id: "discovery", label: "Problem" },
    { id: "research", label: "Research" },
    { id: "user-flows", label: "Flows" },
    { id: "decisions", label: "Key decisions" },
    { id: "final-design", label: "Final design" },
    { id: "testing", label: "Testing" },
    { id: "reflection", label: "Reflection" },
  ],

  hero: {
    category:
      "Product Design · Interaction Design · 3D Web · Frontend Development",
    title: "MyMuseum",
    tagline:
      "Turning online art portfolios into spaces people can actually walk through.",
    description:
      "I designed and built a web platform that turns an artist's uploads into a walkable 3D museum, with a Grid View so every visitor can reach the work. Shared multiplayer presence is built and in testing.",
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
    // Dropped: a features grid here restated the hero; Museum Mail and
    // the rest are shown in context in the final product stories.
    features: [],
  },

  background: {
    heading:
      "Online portfolios flatten art into grids and feeds, losing the scale, depth, and sequence the work depends on.",
    narrative:
      "I built MyMuseum to test whether an artist's work could be walked through like a gallery instead — then asked five artists whether that's something they actually want.",
    challenge: "What if an art portfolio felt like entering someone's world?",
    placeholder: false,
  },

  research: {
    heading: "Testing the idea with artists, after the first build",
    intro:
      "In September 2026, after the first build, I interviewed five artists remotely (30–45 minutes each): three professionals reached through Instagram and Cara (P1, oil painter; P2, concept artist; P3, 3D sculptor) and two U-M Stamps students (P4, narrative illustrator; P5, ceramicist). Each session covered how they show their work today, then their reactions to concept wireframes of 3D vs. grid navigation and automatic room setup.",
    participants:
      "No one used the live product, so these interviews aren't usability tests of MyMuseum.",

    keyFindings: [
      {
        title: "Flat images lose what makes the work matter",
        whatParticipantsSaid:
          "On a phone, P1's six-foot canvas looks the same size as a ten-inch sketch, without its texture or varnish. P3 loses a sculpture's depth and silhouette in a single JPEG. P4 watches feeds scramble a continuous series.",
        whyItMatters: "",
        designResponse:
          "Confirmed: a walkable gallery that hangs each piece at its original proportions. Gap: real-world scale, 3D model viewing, and a creator-set order.",
      },
      {
        title: "Immersion can't cost access",
        whatParticipantsSaid:
          "P1 expects older collectors to close the tab if they meet game-style controls. P2 wants no virtual building at all — an art director gives a portfolio about thirty seconds. Even P3, the strongest case for 3D, worries a slow gallery on a midrange phone makes the work look broken.",
        whyItMatters: "",
        designResponse:
          "Confirmed: Grid View with the same artwork viewer, first on touch devices. Gap: artwork zoom and measured load performance.",
      },
      {
        title: "Publishing has to take minutes, not an afternoon",
        whatParticipantsSaid:
          "P2 hadn't updated their site in about nine months — if publishing takes more than a couple of minutes, it doesn't happen. P5 cancelled a paid site builder; the monthly fee made no sense for occasional pottery sales.",
        whyItMatters: "",
        designResponse:
          "Confirmed: upload, pick a theme, and the gallery lays itself out. Gap: mobile-first creator tools and links to existing shops.",
      },
    ],

    competitiveDiscovery: {
      competitor: "New Art City",
      narrative:
        "I also reviewed New Art City, an existing virtual-gallery platform.",
      competitors: [
        {
          name: "New Art City",
          image: {
            src: "/images/projects/mymuseum/research/new-art-city-comparison.png",
            alt: "Annotated teardown of New Art City's homepage and 3D exhibition view: callouts note that the platform centers on creating and exploring exhibitions, that Recent Exhibitions and Events & Openings give two paths to discovery, that creators get significant creative freedom to design immersive spaces, that open-ended navigation can make specific artwork harder to locate, and that built-in chat supports social presence.",
            width: 1924,
            height: 1356,
          },
          strengths: [
            "Recent Exhibitions and Events & Openings give visitors two ways to discover artists.",
            "Built-in chat gives exhibitions a sense of social presence.",
          ],
          limitations: [
            "Open-ended building tools trade visitor navigation for creator freedom — finding a specific piece can take real exploration.",
            "Feels more like a professional creative workspace than a place to just upload work.",
          ],
          applied:
            "Social, browser-based exhibitions work — but creator freedom shouldn't cost visitors the ability to find the work.",
        },
      ],
      opportunity:
        "Make creating a virtual gallery feel less like designing an exhibition and more like uploading a portfolio.",
      // The creator flow is shown with Decision 01 instead (see keyDecisions).
      flowSteps: [],
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
    personaName: "Artists (P1–P5)",
    personaSummary:
      "Want people to experience their work as it really is, without building a website to get there.",
    personaNeeds: [
      "Show scale, surface, and depth (P1, P3)",
      "Keep a series in sequence (P4)",
      "Publish in minutes (P2)",
      "Free to run, managed from a phone (P5)",
    ],
    personaPlaceholder: false,
    secondaryPersona: {
      name: "Their visitors",
      summary:
        "Collectors and art directors, as the artists described them. I haven't interviewed visitors directly.",
      needs: [
        "No game-style controls (P1)",
        "Judge work in about thirty seconds (P2)",
        "Crisp detail, fast loading (P2, P3)",
        "An obvious way to reach the artist (P2)",
      ],
    },
    tensionIntro:
      "The interviews pulled in two directions: P3 and P4 wanted more atmosphere, P2 wanted none, and P1 wanted both — a painting's presence without the controls.",
    hmw:
      "How might I give artists enough freedom to make a museum feel like their own without sacrificing navigation and accessibility for visitors?",
  },

  // The three tensions now live in `keyDecisions` below, with their
  // evidence and tradeoffs, instead of as short cards here.
  ideation: {
    whyThisTitle: "",
    whyThis: [],
    whyThisPlaceholder: false,

    flowsSectionTitle: "Mapping the two experiences",
    flowsIntro:
      "Two journeys had to work together: creating a museum and exploring one.",

    flows: [
      {
        name: "Creator flow",
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
          width: 2040,
          height: 3208,
        },
        takeaway:
          "Goal: as little distance as possible between uploading artwork and having something worth sharing.",
      },
      {
        name: "Visitor flow",
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
          width: 1688,
          height: 1992,
        },
        takeaway:
          "Goal: keep spatial discovery without making 3D navigation a requirement.",
      },
    ],

    flowsPlaceholder: false,
  },

  keyDecisions: {
    heading: "Three decisions that shaped MyMuseum",
    intro:
      "Each resolves part of the HMW above, and each gave something up. The core of all three was built before the interviews, so artists' comments appear as later evidence, not as their origin.",
    items: [
      {
        title: "Make creating a museum feel like uploading a portfolio",
        tension: "Freedom vs. structure",
        problem:
          "Full spatial freedom means learning exhibition design, and risks layouts visitors can't navigate.",
        evidence: [
          {
            source: "Competitive analysis",
            text: "New Art City's open-ended building tools cost visitors navigation and felt like a professional workspace.",
          },
          {
            source: "My own testing",
            text: "Once a museum was generated, creators had no way back in to fix a typo, swap a piece, or change its visibility.",
          },
          {
            source: "Artist interviews · after build",
            text: "Publishing speed was the clearest shared need (P2, P5) — the work automatic layout already removes.",
          },
        ],
        decision:
          "Generate the spatial layout automatically. Creators control their artwork, gallery style, museum details, visibility, and identity — and can come back to edit any of it. Adding or removing a piece re-runs the layout instead of asking them to place it.",
        tradeoff:
          "Artists can't hand-place work or design their own rooms. I gave up some expressiveness so every museum stays navigable and no one has to learn exhibition design.",
        outcome:
          "Built: creators never place anything by hand, and the gallery re-lays itself out whenever artwork is added or removed.",
        steps: [
          "Add museum details",
          "Upload artwork",
          "Choose gallery style",
          "Generate museum",
          "Preview",
          "Publish & copy link",
        ],
        images: [
          {
            src: "/images/projects/mymuseum/early/create-museum.png",
            alt: "Lo-fi wireframe of Create Museum: a museum name field, an Upload Artwork area, and a Gallery Style picker — no step for placing artwork by hand.",
            width: 1440,
            height: 900,
            caption: "Early lo-fi wireframe of Create Museum: name, upload, pick a style. There's deliberately no placement step.",
          },
        ],
      },
      {
        title: "Make 3D an option, not a requirement",
        tension: "Immersion vs. accessibility",
        problem:
          "3D exploration is MyMuseum's hook, but it shouldn't be the only way to see someone's work.",
        evidence: [
          {
            source: "My own testing",
            text: "The interface could be responsive while keyboard-based 3D movement still had no natural touch equivalent.",
          },
          {
            source: "Competitive analysis",
            text: "In New Art City, finding one specific piece could take real exploration.",
          },
          {
            source: "Artist interviews · after build",
            text: "P1 and P2 put clarity ahead of immersion — support for never making 3D the only way in.",
          },
        ],
        decision:
          "Pair the 3D gallery with a Grid View of the same collection and the same artwork viewer. On touch devices, Grid View is the starting point and Enter 3D Gallery stays one tap away.",
        tradeoff:
          "Mobile visitors don't start in the immersive experience that makes MyMuseum distinctive. I chose reliable access to every artwork over a first impression that might not work on their device.",
        outcome:
          "Built: no artwork is 3D-only. Grid View was checked at 390px wide, and the artwork viewer with keyboard only.",
        images: [
          {
            src: "/images/projects/mymuseum/final/grid-view.png",
            alt: "Accessible grid view of a museum's full collection as cards with thumbnails, titles, and View artwork links, with an Enter 3D Gallery button.",
            width: 2940,
            height: 1592,
            caption: "Grid View: the full collection with the same artwork viewer, no 3D required. Enter 3D Gallery stays one tap away.",
          },
          {
            src: "/images/projects/mymuseum/final/mobile-grid.jpg",
            alt: "Grid View on a phone: the museum title, an Enter 3D Gallery button, and a single column of artwork cards with View artwork links.",
            width: 1206,
            height: 2136,
            caption: "On touch devices, Grid View is the starting point.",
          },
        ],
      },
      {
        title: "Design for presence, not engagement",
        tension: "Social presence vs. social pressure",
        problem:
          "Multiplayer could make galleries feel alive — or, with likes, follower counts, and chat, turn them into another social feed.",
        evidence: [
          {
            source: "Competitive analysis",
            text: "New Art City's built-in chat showed that social presence was worth keeping.",
          },
          {
            source: "Design intent",
            text: "I wanted artists to share work without likes, follower counts, or pressure to post. This started as my own goal; in later interviews, P4 described feeds reducing a series to scroll, double-tap, and forget.",
          },
        ],
        decision:
          "Show other visitors as labeled avatars and a live count — no chat, likes, or follower counts. For anything more personal, visitors can leave the artist an async note through Museum Mail, which artists can switch off.",
        tradeoff:
          "Visitors can't talk to each other in real time the way they can in a chat-first space. I traded spontaneous conversation for a calmer room where the artwork stays the focus.",
        outcome:
          "Built: realtime presence, verified across two live sessions, and Museum Mail. Public multiplayer deployment is still to come.",
        images: [
          {
            src: "/images/projects/mymuseum/final/multiplayer-a.png",
            alt: "Two visitor avatars, one labeled Visitor 965, standing together in a gallery doorway with a live visitor count in the corner.",
            width: 1024,
            height: 660,
            caption: "Session A: Visitor 965 sees a second visitor arrive, with the live count in the corner.",
          },
          {
            src: "/images/projects/mymuseum/final/multiplayer-b.png",
            alt: "The same shared museum from a second live session, with a different visitor avatar labeled Visitor 354.",
            width: 1024,
            height: 660,
            caption: "Session B: the same room from the other visitor's screen.",
          },
        ],
      },
    ],
  },

  // Dropped: the need → requirement table restated the decisions above.
  productRequirements: [],

  // Dropped: these restated the three key decisions above.
  designPrinciples: [],

  design: {
    heading: "The final product",
    processNarrative:
      "Organized around what each screen lets someone do, with mobile versions where the flow carries over.",

    wireframeScreens: [],
    highFidelityScreens: [],

    placeholder: false,
  },

  finalProduct: {
    intro: "",
    stories: [
      {
        title: "Walk through the gallery",
        description:
          "Third-person navigation between rooms, with a prompt the moment artwork is close enough to view.",
        images: [
          {
            src: "/images/projects/mymuseum/final/gallery-threshold.png",
            alt: "Symmetrical museum threshold framed by white columns, leading into a room labeled THE FAIR ROOM with a sculpture on a plinth ahead.",
            width: 1440,
            height: 900,
            caption: "Arriving at a room threshold.",
          },
          {
            src: "/images/projects/mymuseum/final/gallery-west-wing.png",
            alt: "Wide view down the west wing of the museum, showing a framed portrait, a sculpture, and a second gallery visible through an archway.",
            width: 1440,
            height: 900,
            caption: "Looking down the west wing into the next gallery.",
          },
          {
            src: "/images/projects/mymuseum/final/artwork-prompt.png",
            alt: "An avatar standing beside a hung painting with a 'Press E to view Adrift' interaction prompt at the bottom of the screen.",
            width: 1440,
            height: 900,
            caption: "Artwork opens on a deliberate action, not just by walking past it.",
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
            caption: "Title, medium, and description, with Previous/Next through all 15 pieces.",
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
        title: "Write to the artist",
        description:
          "Museum Mail lets a visitor leave the artist a private note about a museum or a specific piece — from the artwork viewer, the in-museum menu, or the artist's profile. It works like email, not chat: no typing indicators or live replies; artists answer from a dashboard inbox on their own time. Artists can switch off new notes, but conversations already underway stay open. Recipients can block a sender entirely, and any message can be reported.",
        images: [
          {
            src: "/images/projects/mymuseum/final/mail-composer-dialog.png",
            alt: "Museum Mail composer, titled 'Leave a note for the artist': 'About My Little World. This goes straight to them, privately.', a note field with a 0/2000 character count, and Cancel and Send note buttons.",
            width: 720,
            height: 570,
            caption: "Leaving a note from inside the museum.",
          },
        ],
        videos: [
          {
            src: "/videos/projects/mymuseum/mail.mp4",
            alt: "A visitor opens Museum Mail from the artwork viewer for \"Still Life\" and writes a private note to the artist of My Little World.",
            width: 1920,
            height: 1040,
            caption: "Or about a specific piece, from the artwork viewer.",
          },
        ],
      },
    ],
    placeholder: false,
  },

  testing: {
    heading: "Self-testing the product loop",
    intro:
      "This isn't usability testing with users — that's the next step. As MyMuseum grew from a 3D prototype into a persistent product, I ran the full creator and visitor workflows myself, with real accounts, stored artwork, publication states, sharing, and multiple users. Two findings shaped Decisions 01 and 02 above; the rest are below.",

    tasks: [
      "Create, edit, publish, and share a museum using a real creator account.",
      "Open the same museum anonymously and from a second account to check visibility and ownership.",
      "Run creation, editing, sharing, 3D, and Grid View on desktop and mobile.",
    ],

    iterations: [
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

  finalThoughts: {
    nextStepsHeading: "Opportunities & next steps",
    pullQuote:
      "Building an exciting interaction and building a usable product are different problems.",

    whatILearned:
      "The original challenge was making a 3D museum work. The harder questions came later: how creators manage museums, how visitors reach them on any device, how sharing behaves with persistent data, and how presence supports the artwork instead of distracting from it.",

    nextSteps:
      "First, task-based usability sessions with artists and visitors on the live product — the step the interviews didn't cover. Then the two gaps the interviews made clearest: artwork zoom with measured load times (P2, P3), and showing a painting's real-world scale (P1).",

    proudestOf:
      "Turning an unusual interaction concept into something creators can actually return to, manage, and share — not just a visually impressive prototype.",

    placeholder: false,
  },

  whatIsComplete: [],
};
