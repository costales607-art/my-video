import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Cursor, ease, glide, Highlight, Pill, Redact, Stage } from "../OrderProcessingPart1/primitives";
import { colors, font, Shot } from "../OrderProcessingPart1/theme";
import { CamKey, clamp, useCamera } from "../OrderProcessingPart2/shared";

export type Rect = { x: number; y: number; w: number; h: number };
export type Win = { left: number; top: number; width: number; height: number };

// Full-frame window (as in Parts 1–2) and a smaller one that leaves room for a top bar
export const WIN_FULL: Win = { left: 80, top: 70, width: 1760, height: 941 };
export const WIN_LOW: Win = { left: 200, top: 175, width: 1520, height: 813 };

export const wide = (shot: Shot, win: Win): CamKey => [0, shot.w / 2, shot.h / 2, win.width / shot.w];

// GoHighLevel URL bar: location ID (same position in every GHL screenshot)
export const GHL_LOCATION: Rect = { x: 362, y: 51, w: 182, h: 24 };
// Google Sheets URL bar: document ID (Josh's sheet and the Master File)
export const SHEET_URL_ID: Rect = { x: 324, y: 51, w: 390, h: 24 };
// Apps Script URL bar: project ID
export const SCRIPT_URL_ID: Rect = { x: 364, y: 51, w: 442, h: 24 };

export const springIn = (frame: number, at: number, fps: number) => ({
  opacity: interpolate(frame, [at * fps, at * fps + 8], [0, 1], clamp),
  translate: interpolate(frame, [at * fps, at * fps + 0.6 * fps], ["0px 40px", "0px 0px"], {
    ...clamp,
    easing: Easing.spring({ damping: 14 }),
  }),
});

export const fadeWindow = (frame: number, fps: number, from: number, to: number) =>
  interpolate(frame, [from * fps, from * fps + 6, to * fps - 6, to * fps], [0, 1, 1, 0], clamp);

type Mark = { r: Rect; at: number; until?: number };
type Label = { x: number; y: number; at: number; until?: number; text: string; color?: string };

/**
 * A screenshot in a window with camera moves, always-on privacy covers,
 * timed highlights, dimmed regions, labels and a cursor. All coordinates are
 * screenshot pixels; times are scene seconds.
 */
export const ShotScene: React.FC<{
  readonly shot: Shot;
  readonly win?: Win;
  readonly camera: readonly CamKey[];
  readonly covers?: readonly Rect[];
  readonly marks?: readonly Mark[];
  readonly dims?: readonly Mark[];
  readonly labels?: readonly Label[];
  readonly cursor?: React.ComponentProps<typeof Cursor>["path"];
  readonly clicks?: readonly number[];
  readonly enter?: "whip" | "fade" | "scale";
  readonly exitAt?: number;
  readonly children?: React.ReactNode;
}> = ({
  shot,
  win = WIN_FULL,
  camera,
  covers = [],
  marks = [],
  dims = [],
  labels = [],
  cursor,
  clicks,
  enter = "fade",
  exitAt,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cam = useCamera(camera);
  const blur = enter === "whip" ? interpolate(frame, [0, 0.3 * fps, 0.45 * fps], [10, 4, 0], clamp) : 0;
  const exit = exitAt === undefined ? 1 : interpolate(frame, [exitAt * fps, exitAt * fps + 0.4 * fps], [1, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        opacity: (enter === "whip" ? 1 : interpolate(frame, [0, 0.35 * fps], [0, 1], clamp)) * exit,
        translate:
          enter === "whip"
            ? interpolate(frame, [0, 0.45 * fps], ["1920px 0px", "0px 0px"], { ...clamp, easing: ease })
            : undefined,
        scale: enter === "scale" ? interpolate(frame, [0, 0.6 * fps], [0.85, 1], { ...clamp, easing: ease }) : undefined,
        // Never leave a blur(0px) filter behind: it washes out overlays
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
      }}
    >
      <Stage shot={shot} {...win} {...cam}>
        {dims.map(({ r, at, until }, i) => (
          <div
            key={`dim-${i}`}
            style={{
              position: "absolute",
              left: r.x,
              top: r.y,
              width: r.w,
              height: r.h,
              background: "rgba(6,11,24,0.55)",
              opacity: until === undefined ? interpolate(frame, [at * fps, at * fps + 8], [0, 1], clamp) : fadeWindow(frame, fps, at, until),
            }}
          />
        ))}
        {covers.map((r, i) => (
          <Redact key={`cover-${i}`} shot={shot} {...r} />
        ))}
        {marks.map(({ r, at, until }, i) => (
          <Highlight
            key={`mark-${i}`}
            x={r.x - 3}
            y={r.y - 3}
            w={r.w + 6}
            h={r.h + 6}
            opacity={until === undefined ? interpolate(frame, [at * fps, at * fps + 5], [0, 1], clamp) : fadeWindow(frame, fps, at, until)}
          />
        ))}
        {children}
        {labels.map(({ x, y, at, until, text, color }, i) => (
          <Pill
            key={`label-${i}`}
            color={color}
            style={{
              left: x,
              top: y,
              fontSize: 24,
              padding: "8px 18px",
              transformOrigin: "0 50%",
              translate: "0 -50%",
              scale: String(
                interpolate(frame, [at * fps, at * fps + 8], [0.6, 1], {
                  ...clamp,
                  easing: Easing.out(Easing.back(2)),
                }) / cam.zoom,
              ),
              opacity: until === undefined ? interpolate(frame, [at * fps, at * fps + 4], [0, 1], clamp) : fadeWindow(frame, fps, at, until),
            }}
          >
            {text}
          </Pill>
        ))}
        {cursor ? <Cursor zoom={cam.zoom} path={cursor} clicks={clicks} /> : null}
      </Stage>
    </AbsoluteFill>
  );
};

export const SectionTitle: React.FC<{
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly exitAt?: number;
}> = ({ eyebrow, title, subtitle, exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        fontFamily: font,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        opacity: exitAt === undefined ? 1 : interpolate(frame, [exitAt * fps, exitAt * fps + 0.4 * fps], [1, 0], clamp),
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 6, color: colors.sky, ...springIn(frame, 0, fps) }}>
        {eyebrow}
      </div>
      <div
        style={{
          marginTop: 20,
          fontSize: 88,
          fontWeight: 800,
          letterSpacing: -2,
          color: colors.white,
          ...springIn(frame, 0.15, fps),
          filter: `blur(${interpolate(frame, [0.15 * fps, 0.6 * fps], [12, 0], clamp)}px)`,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 30,
          height: 6,
          borderRadius: 3,
          background: `linear-gradient(90deg, ${colors.blue}, ${colors.mint})`,
          width: interpolate(frame, [0.5 * fps, 1.2 * fps], [0, 360], { ...clamp, easing: ease }),
        }}
      />
      {subtitle ? (
        <div style={{ marginTop: 30, fontSize: 34, color: colors.muted, ...springIn(frame, 0.8, fps) }}>{subtitle}</div>
      ) : null}
    </AbsoluteFill>
  );
};

/** Dark rounded card used in every diagram */
export const Card: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h?: number;
  readonly at: number;
  readonly accent?: string;
  readonly dashed?: boolean;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({ x, y, w, h, at, accent = colors.cardBorder, dashed = false, style, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: x - w / 2,
        top: y,
        width: w,
        height: h,
        borderRadius: 22,
        background: colors.card,
        border: `3px ${dashed ? "dashed" : "solid"} ${accent}`,
        padding: "22px 28px",
        boxSizing: "border-box",
        fontFamily: font,
        color: colors.white,
        ...style,
        // Entrance always applies; a style opacity only dims the card further
        translate: springIn(frame, at, fps).translate,
        opacity: springIn(frame, at, fps).opacity * (typeof style?.opacity === "number" ? style.opacity : 1),
      }}
    >
      {children}
    </div>
  );
};

/** An SVG path that draws itself between two scene times */
export const DrawPath: React.FC<{
  readonly d: string;
  readonly from: number;
  readonly to: number;
  readonly color?: string;
  readonly width?: number;
}> = ({ d, from, to, color = colors.sky, width = 5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray="1"
      strokeDashoffset={interpolate(frame, [from * fps, to * fps], [1, 0], { ...clamp, easing: glide })}
    />
  );
};

export const Svg: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => (
  <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
    {children}
  </svg>
);

/** Pill that springs in at a composition position (not inside a Stage) */
export const Tag: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly at: number;
  readonly until?: number;
  readonly color?: string;
  readonly center?: boolean;
  readonly size?: number;
  readonly children: React.ReactNode;
}> = ({ x, y, at, until, color, center = false, size = 26, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        translate: center ? "-50% 0" : undefined,
        opacity: until === undefined ? interpolate(frame, [at * fps, at * fps + 5], [0, 1], clamp) : fadeWindow(frame, fps, at, until),
        scale: String(interpolate(frame, [at * fps, at * fps + 8], [0.6, 1], { ...clamp, easing: Easing.out(Easing.back(2)) })),
      }}
    >
      <Pill color={color} style={{ position: "relative", fontSize: size }}>
        {children}
      </Pill>
    </div>
  );
};

export const MailGlyph: React.FC<{ readonly size: number; readonly color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <rect x={2} y={4.5} width={20} height={15} rx={2.5} fill={color} />
    <path d="M3 6.5 L12 13 L21 6.5" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinejoin="round" />
  </svg>
);

export const CodeGlyph: React.FC<{ readonly size: number; readonly color?: string }> = ({ size, color = colors.sky }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <rect x={1.5} y={2.5} width={21} height={19} rx={4} fill={colors.card} stroke={color} strokeWidth={1.6} />
    <path d="M9 9 L6 12 L9 15 M15 9 L18 12 L15 15" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Masked placeholder for a value that must not be shown */
export const Masked: React.FC<{ readonly n?: number }> = ({ n = 10 }) => (
  <span style={{ letterSpacing: 3, color: colors.muted }}>{"●".repeat(n)}</span>
);
