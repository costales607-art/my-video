import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, font, Shot } from "./theme";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const glide = Easing.inOut(Easing.cubic);

export const Background: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at 50% 0%, ${colors.bgTop} 0%, ${colors.bgBottom} 75%)`,
    }}
  >
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(138,180,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(138,180,248,0.05) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  </AbsoluteFill>
);

type Camera = {
  readonly focusX: number;
  readonly focusY: number;
  readonly zoom: number;
};

/**
 * A screenshot inside a floating window, viewed through a camera.
 * Children are overlays positioned in the screenshot's own pixel coordinates,
 * so they follow every pan and zoom.
 */
export const Stage: React.FC<
  {
    readonly shot: Shot;
    readonly left?: number;
    readonly top?: number;
    readonly width: number;
    readonly height: number;
    readonly children?: React.ReactNode;
    readonly style?: React.CSSProperties;
  } & Camera
> = ({ shot, left, top, width, height, focusX, focusY, zoom, children, style }) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      width,
      height,
      borderRadius: 18,
      overflow: "hidden",
      background: "#fff",
      boxShadow:
        "0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        width: shot.w,
        height: shot.h,
        transformOrigin: "0 0",
        transform: `translate(${width / 2}px, ${height / 2}px) scale(${zoom}) translate(${-focusX}px, ${-focusY}px)`,
      }}
    >
      <Img
        src={staticFile(shot.src)}
        style={{ width: shot.w, height: shot.h, display: "block" }}
      />
      {children}
    </div>
  </div>
);

/**
 * Covers a rectangle of the screenshot (in screenshot pixels) with an opaque
 * frosted fill. Always on, so the covered values can never be read on any
 * frame. `shot` names the screenshot the coordinates belong to.
 */
export const Redact: React.FC<{
  readonly shot: Shot;
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}> = ({ x, y, w, h }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      borderRadius: 4,
      // Opaque on purpose: a blurred copy of the screenshot was sometimes
      // drawn without its filter, leaking the value underneath
      background:
        "repeating-linear-gradient(90deg, #D5DAE2 0px, #E4E8EE 14px, #D9DEE6 26px, #E7EBF0 40px)",
      boxShadow: "inset 0 0 6px rgba(120,130,150,0.25)",
    }}
  />
);

export const Highlight: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly opacity: number;
}> = ({ x, y, w, h, opacity }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      borderRadius: 10,
      opacity,
      background: "rgba(26,115,232,0.10)",
      border: `3px solid ${colors.blue}`,
      boxShadow: "0 0 24px rgba(26,115,232,0.45)",
    }}
  />
);

type CursorKey = readonly [seconds: number, x: number, y: number];

/**
 * Animated pointer in screenshot coordinates. `path` keys are scene-local
 * seconds; `clicks` fire a pulse ring and a small press at those seconds.
 * `zoom` counter-scales the pointer so it keeps a constant on-screen size.
 */
export const Cursor: React.FC<{
  readonly path: readonly CursorKey[];
  readonly clicks?: readonly number[];
  readonly zoom: number;
  readonly opacity?: number;
}> = ({ path, clicks = [], zoom, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const times = path.map(([t]) => t * fps);
  const x = interpolate(frame, times, path.map(([, px]) => px), {
    ...clamp,
    easing: glide,
  });
  const y = interpolate(frame, times, path.map(([, , py]) => py), {
    ...clamp,
    easing: glide,
  });
  const press = clicks.reduce(
    (s, c) =>
      Math.min(
        s,
        interpolate(frame, [c * fps - 2, c * fps, c * fps + 4], [1, 0.82, 1], clamp),
      ),
    1,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        scale: String(1 / zoom),
        transformOrigin: "0 0",
        opacity,
      }}
    >
      {clicks.map((c) => {
        const t = interpolate(frame, [c * fps, c * fps + 0.45 * fps], [0, 1], clamp);
        return (
          <div
            key={c}
            style={{
              position: "absolute",
              left: -36,
              top: -36,
              width: 72,
              height: 72,
              borderRadius: "50%",
              border: `4px solid ${colors.blue}`,
              background: "rgba(26,115,232,0.18)",
              scale: String(0.2 + t * 1.1),
              opacity: frame < c * fps ? 0 : 1 - t,
            }}
          />
        );
      })}
      <svg
        width={44}
        height={52}
        viewBox="0 0 22 26"
        style={{
          position: "absolute",
          left: -3,
          top: -2,
          scale: String(press),
          transformOrigin: "3px 2px",
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.35))",
        }}
      >
        <path
          d="M2 1.5 L2 20 L7 15.5 L10.5 23.5 L14 22 L10.6 14.2 L17.5 14.2 Z"
          fill="#111"
          stroke="#fff"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const Pill: React.FC<{
  readonly children: React.ReactNode;
  readonly color?: string;
  readonly style?: React.CSSProperties;
}> = ({ children, color = colors.blue, style }) => (
  <div
    style={{
      position: "absolute",
      fontFamily: font,
      fontWeight: 700,
      fontSize: 26,
      color: "#fff",
      background: color,
      padding: "12px 24px",
      borderRadius: 999,
      whiteSpace: "nowrap",
      boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const SheetIcon: React.FC<{ readonly size: number; readonly color?: string }> = ({
  size,
  color = colors.green,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <rect x={3} y={2} width={18} height={20} rx={2.5} fill={color} />
    <rect x={6.5} y={8} width={11} height={10} rx={0.8} fill="#fff" />
    <path d="M6.5 11.3h11M6.5 14.6h11M11 8v10" stroke={color} strokeWidth={1.2} />
  </svg>
);
