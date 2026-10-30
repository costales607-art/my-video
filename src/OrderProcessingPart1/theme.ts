import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily: font } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export const colors = {
  bgTop: "#0E1A33",
  bgBottom: "#060B18",
  blue: "#1A73E8",
  sky: "#8AB4F8",
  green: "#1E8E3E",
  mint: "#81C995",
  white: "#FFFFFF",
  muted: "#9AA7BD",
  card: "#16233F",
  cardBorder: "rgba(138,180,248,0.35)",
};

// Pixel sizes of the source screenshots in public/part1
export const shots = {
  gmail: { src: "part1/gmail-inbox.png", w: 1918, h: 1032 },
  drive: { src: "part1/drive.jpg", w: 1919, h: 1026 },
  folder: { src: "part1/folder.jpg", w: 1915, h: 1031 },
  master: { src: "part1/masterfile.png", w: 1918, h: 1031 },
};

export type Shot = (typeof shots)[keyof typeof shots];
