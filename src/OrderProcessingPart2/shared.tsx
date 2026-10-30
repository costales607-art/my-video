import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { glide, Pill } from "../OrderProcessingPart1/primitives";
import { colors, font } from "../OrderProcessingPart1/theme";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const shots2 = {
  forwarding: { src: "part2/gmail-forwarding.png", w: 1919, h: 1030 },
  integrations: { src: "part2/private-integrations.png", w: 1919, h: 1029 },
  pipeline: { src: "part2/pipeline.png", w: 1919, h: 1032 },
  opportunities: { src: "part2/opportunities.png", w: 1919, h: 1037 },
  joshSheet: { src: "part2/josh-sheet.png", w: 964, h: 151 },
};

// Full-frame browser window, same as Part 1
export const WIN = { left: 80, top: 70, width: 1760, height: 941 };
export const FIT = WIN.width / 1919;

// GoHighLevel URL bar segments (screenshot px), measured from the screenshots
export const GHL_LOCATION_ID = { x: 362, y: 51, w: 182, h: 24 };
export const GHL_PIPELINE_ID = { x: 684, y: 51, w: 163, h: 24 };
// Customer names and order values on the Opportunities board
export const GHL_OPPORTUNITY_CARDS = { x: 248, y: 540, w: 310, h: 480 };
// Spreadsheet ID in the address bar of Josh's sheet
export const SHEET_DOC_ID = { x: 360, y: 5, w: 345, h: 22 };

export type CamKey = readonly [seconds: number, focusX: number, focusY: number, zoom: number];
export type Camera = { focusX: number; focusY: number; zoom: number };

export const useCamera = (keys: readonly CamKey[]): Camera => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (keys.length === 1) {
    const [, focusX, focusY, zoom] = keys[0];
    return { focusX, focusY, zoom };
  }
  const t = keys.map(([s]) => s * fps);
  const at = (i: 1 | 2 | 3) =>
    interpolate(frame, t, keys.map((k) => k[i]), { ...clamp, easing: glide });
  return { focusX: at(1), focusY: at(2), zoom: at(3) };
};

// Screenshot px → composition px for a Stage placed at WIN
export const toScreen = (x: number, y: number, cam: Camera) => ({
  x: WIN.left + WIN.width / 2 + (x - cam.focusX) * cam.zoom,
  y: WIN.top + WIN.height / 2 + (y - cam.focusY) * cam.zoom,
});

/**
 * A masked copy of a sensitive value: pops in at `popAt`, then flies to `to`
 * between `flyAt` and `flyEnd` (scene seconds, composition px).
 */
export const FlyingToken: React.FC<{
  readonly label: string;
  readonly from: { x: number; y: number };
  readonly to: { x: number; y: number };
  readonly popAt: number;
  readonly flyAt: number;
  readonly flyEnd: number;
}> = ({ label, from, to, popAt, flyAt, flyEnd }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [flyAt * fps, flyEnd * fps], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <div
      style={{
        position: "absolute",
        left: from.x + (to.x - from.x) * p,
        top: from.y + (to.y - from.y) * p - Math.sin(p * Math.PI) * 120,
        translate: "-50% -50%",
        opacity: interpolate(frame, [popAt * fps, popAt * fps + 4], [0, 1], clamp),
        scale: String(
          interpolate(frame, [popAt * fps, popAt * fps + 8], [0.5, 1], {
            ...clamp,
            easing: Easing.out(Easing.back(2)),
          }) *
            (1 - 0.25 * p),
        ),
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: font,
        fontWeight: 700,
        fontSize: 26,
        color: "#fff",
        background: colors.card,
        border: `2px solid ${colors.sky}`,
        borderRadius: 14,
        padding: "12px 20px",
        boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: colors.sky, fontSize: 22 }}>{label}</span>
      <span style={{ letterSpacing: 3 }}>●●●●●●●●●●</span>
    </div>
  );
};

// "⌘C" chip that pops beside the cursor (composition px)
export const CopyChip: React.FC<{
  readonly at: number;
  readonly x: number;
  readonly y: number;
}> = ({ at, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Pill
      style={{
        left: x,
        top: y,
        fontSize: 22,
        padding: "8px 16px",
        opacity: interpolate(frame, [at * fps, at * fps + 4, at * fps + 0.9 * fps, at * fps + 1.1 * fps], [0, 1, 1, 0], clamp),
        scale: String(interpolate(frame, [at * fps, at * fps + 6], [0.6, 1], clamp)),
      }}
    >
      ⌘C Copy
    </Pill>
  );
};

// Label pinned to a spot inside a Stage, kept at constant on-screen size
export const StageLabel: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly at: number;
  readonly until?: number;
  readonly zoom: number;
  readonly color?: string;
  readonly children: React.ReactNode;
}> = ({ x, y, at, until, zoom, color, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Pill
      color={color}
      style={{
        left: x,
        top: y,
        fontSize: 24,
        padding: "8px 18px",
        transformOrigin: "50% 100%",
        translate: "-50% -100%",
        scale: String(
          interpolate(frame, [at * fps, at * fps + 8], [0.6, 1], {
            ...clamp,
            easing: Easing.out(Easing.back(2)),
          }) / zoom,
        ),
        opacity:
          until === undefined
            ? interpolate(frame, [at * fps, at * fps + 4], [0, 1], clamp)
            : interpolate(frame, [at * fps, at * fps + 4, until * fps - 6, until * fps], [0, 1, 1, 0], clamp),
      }}
    >
      {children}
    </Pill>
  );
};
