export interface Painting2D {
  slug: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Curated size tier for the homepage workspace composition. */
  size: "large" | "medium" | "small";
  /** Base rotation (deg) for the "loose paper" look. */
  rotate: number;
}

export const paintings: Painting2D[] = [
  {
    slug: "still-life",
    src: "/images/home/desk/still-life.jpg",
    width: 585,
    height: 784,
    alt: "Still life painting of a glass bottle, apple, and pumpkins",
    size: "small",
    rotate: -3,
  },
  {
    slug: "waterfall-gorge",
    src: "/images/home/desk/waterfall-gorge.jpg",
    width: 1206,
    height: 1600,
    alt: "Painting of a waterfall running through a rocky gorge",
    size: "large",
    rotate: 2,
  },
  {
    slug: "lake-geese",
    src: "/images/home/desk/lake-geese.jpg",
    width: 1160,
    height: 1600,
    alt: "Painting of Canada geese on a lake surrounded by reeds",
    size: "medium",
    rotate: -2,
  },
  {
    slug: "sunflowers",
    src: "/images/home/desk/sunflowers.jpg",
    width: 1369,
    height: 1600,
    alt: "Still life painting of sunflowers in a mosaic vase",
    size: "medium",
    rotate: 3,
  },
  {
    slug: "garden-boat",
    src: "/images/home/desk/garden-boat.jpg",
    width: 1287,
    height: 1600,
    alt: "Painting of a garden staircase, rowboat, and lily pond",
    size: "large",
    rotate: -1,
  },
  {
    slug: "goldfish-bag",
    src: "/images/home/desk/goldfish-bag.jpg",
    width: 1600,
    height: 1207,
    alt: "Painting of a goldfish inside a bag underwater, surrounded by fish and coral",
    size: "medium",
    rotate: 2,
  },
  {
    slug: "portrait-boy",
    src: "/images/home/desk/portrait-boy.jpg",
    width: 1383,
    height: 1600,
    alt: "Colored pencil portrait of a young boy smiling in front of the ocean",
    size: "medium",
    rotate: -2,
  },
  {
    slug: "duckette-comic",
    src: "/images/home/desk/duckette-comic.jpg",
    width: 1600,
    height: 1402,
    alt: "Six-panel watercolor comic strip about a duck named Duckette",
    size: "medium",
    rotate: 2,
  },
  {
    slug: "ah-ma",
    src: "/images/home/desk/ah-ma.jpg",
    width: 1254,
    height: 1600,
    alt: "Charcoal portrait of a grandmother",
    size: "medium",
    rotate: -1,
  },
  {
    slug: "australopithecus-sediba",
    src: "/images/home/desk/australopithecus-sediba.jpg",
    width: 1200,
    height: 1600,
    alt: "Graphite anatomical study of Australopithecus sediba, full figure and eye detail",
    size: "medium",
    rotate: 3,
  },
  {
    slug: "patchwork-portrait",
    src: "/images/home/desk/patchwork-portrait.jpg",
    width: 1246,
    height: 1600,
    alt: "Pen and ink portrait built from a patchwork of hand-drawn textures and patterns",
    size: "medium",
    rotate: -3,
  },
];

export interface Object3DImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Short view name shown on the main photo, e.g. "Back". */
  label?: string;
}

export interface Object3D {
  slug: string;
  title: string;
  /**
   * All photos of this piece, different angles — the first is the cover
   * image used for previews/compositions, the full collection is shown
   * as main photo + thumbnails on the full 3D works page.
   */
  images: Object3DImage[];
  size: "large" | "medium" | "small";
  rotate: number;
}

export const threeDObjects: Object3D[] = [
  {
    slug: "eye-table",
    title: "Eye Table",
    images: [
      {
        src: "/creative-practice/3d/eye-table-1.jpg",
        label: "Three-quarter view",
        width: 1600,
        height: 1200,
        alt: "Handmade round table with a painted blue eye across the tabletop and dark reddish wooden legs, three-quarter view",
      },
      {
        src: "/creative-practice/3d/eye-table-2.jpg",
        label: "Tabletop",
        width: 1200,
        height: 1600,
        alt: "Top-down view of the eye table's painted tabletop, showing the iris and pupil detail",
      },
      {
        src: "/creative-practice/3d/eye-table-3.jpg",
        label: "Tabletop, angled",
        width: 1200,
        height: 1600,
        alt: "Top-down view of the eye table's painted tabletop from a slightly different angle",
      },
      {
        src: "/creative-practice/3d/eye-table-4.jpg",
        label: "Leg detail",
        width: 1200,
        height: 1600,
        alt: "Close-up detail of the eye table's carved wooden legs",
      },
    ],
    size: "large",
    rotate: -1,
  },
  {
    slug: "pig-lamp",
    title: "Pig Lamp",
    images: [
      {
        src: "/creative-practice/3d/pig-lamp-1.jpg",
        label: "Front",
        width: 1600,
        height: 1420,
        alt: "Pink pig-shaped handmade lamp with a curled tail and an exposed bulb held inside a curved frame, front view",
      },
      {
        src: "/creative-practice/3d/pig-lamp-2.jpg",
        label: "Front, lit",
        width: 1600,
        height: 1420,
        alt: "Pig lamp viewed from the front at a slightly different angle, lit bulb visible inside the frame",
      },
      {
        src: "/creative-practice/3d/pig-lamp-3.jpg",
        label: "Back",
        width: 1572,
        height: 1600,
        alt: "Back view of the pig lamp showing the wooden support structure and cord",
      },
    ],
    size: "medium",
    rotate: 2,
  },
  {
    slug: "monkey-sculpture",
    title: "Monkey Sculpture",
    images: [
      {
        src: "/creative-practice/3d/monkey-sculpture-1.jpg",
        label: "Front",
        width: 1200,
        height: 1600,
        alt: "Small light-colored hand-sculpted monkey seated with one finger raised near its mouth, front view",
      },
      {
        src: "/creative-practice/3d/monkey-sculpture-2.jpg",
        label: "Side",
        width: 1200,
        height: 1600,
        alt: "Side view of the hand-sculpted monkey sculpture",
      },
      {
        src: "/creative-practice/3d/monkey-sculpture-3.jpg",
        label: "Back",
        width: 1200,
        height: 1600,
        alt: "Back view of the hand-sculpted monkey sculpture",
      },
    ],
    size: "small",
    rotate: -2,
  },
];
