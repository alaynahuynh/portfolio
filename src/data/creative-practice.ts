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
  { slug: "still-life", src: "/images/home/desk/still-life.jpg", width: 585, height: 784, alt: "Still life painting of a glass bottle, apple, and pumpkins", size: "small", rotate: -3 },
  { slug: "waterfall-gorge", src: "/images/home/desk/waterfall-gorge.jpg", width: 1206, height: 1600, alt: "Painting of a waterfall running through a rocky gorge", size: "large", rotate: 2 },
  { slug: "lake-geese", src: "/images/home/desk/lake-geese.jpg", width: 1160, height: 1600, alt: "Painting of Canada geese on a lake surrounded by reeds", size: "medium", rotate: -2 },
  { slug: "sunflowers", src: "/images/home/desk/sunflowers.jpg", width: 1369, height: 1600, alt: "Still life painting of sunflowers in a mosaic vase", size: "medium", rotate: 3 },
  { slug: "garden-boat", src: "/images/home/desk/garden-boat.jpg", width: 1287, height: 1600, alt: "Painting of a garden staircase, rowboat, and lily pond", size: "large", rotate: -1 },
  { slug: "goldfish-bag", src: "/images/home/desk/goldfish-bag.jpg", width: 1600, height: 1207, alt: "Painting of a goldfish inside a bag underwater, surrounded by fish and coral", size: "medium", rotate: 2 },
];

export interface Object3D {
  slug: string;
  title: string;
  /** Transparent cutout for compositions/previews. */
  src: string;
  width: number;
  height: number;
  alt: string;
  size: "large" | "medium" | "small";
  rotate: number;
  /**
   * True while the cutout is an AI-processed (ChatGPT) image rather than a
   * traditional cutout of an original photograph — flagged so it's easy to
   * find and replace once a proper photo/cutout exists. Not shown in the UI.
   */
  temporaryAsset?: boolean;
}

export const threeDObjects: Object3D[] = [
  {
    slug: "eye-table",
    title: "Eye Table",
    src: "/creative-practice/3d/eye-table.png",
    width: 1492,
    height: 1024,
    alt: "Handmade round table with a painted blue eye across the tabletop and dark reddish wooden legs.",
    size: "large",
    rotate: -1,
    temporaryAsset: true,
  },
  {
    slug: "pig-lamp",
    title: "Pig Lamp",
    src: "/creative-practice/3d/pig-lamp.png",
    width: 1001,
    height: 719,
    alt: "Pink pig-shaped handmade lamp with a curled tail and an exposed bulb held inside a curved frame.",
    size: "medium",
    rotate: 2,
    temporaryAsset: true,
  },
  {
    slug: "monkey-sculpture",
    title: "Monkey Sculpture",
    src: "/creative-practice/3d/monkey-sculpture.png",
    width: 1024,
    height: 1515,
    alt: "Small light-colored hand-sculpted monkey seated with one finger raised near its mouth.",
    size: "small",
    rotate: -2,
    temporaryAsset: true,
  },
];
