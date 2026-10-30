import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Cursor, ease, Highlight, Redact, Stage } from "../OrderProcessingPart1/primitives";
import { colors, shots } from "../OrderProcessingPart1/theme";
import { CamKey, clamp, StageLabel, useCamera, WIN } from "./shared";

type Col = "A" | "B" | "C" | "D" | "E" | "F";

// Column bounds in masterfile.png
const COLS: Record<Col, { x: number; w: number }> = {
  A: { x: 46, w: 134 },
  B: { x: 181, w: 225 },
  C: { x: 408, w: 322 },
  D: { x: 732, w: 301 },
  E: { x: 1035, w: 187 },
  F: { x: 1224, w: 162 },
};
const HEADER_Y = 282;
const ROW2_Y = 303;
const ROW_H = 20;

export const colCenter = (col: Col) => COLS[col].x + COLS[col].w / 2;

/**
 * When each Row 2 cell gets its value, in Part 2 seconds. A and B are typed,
 * C–F are pasted (and stay blurred).
 */
const TYPED: Partial<Record<Col, { start: number; end: number; text: string; bold?: boolean }>> = {
  A: { start: 10.6, end: 12.4, text: "AVID TEST (Josh)", bold: true },
  // Covers the real cell so it reads the same as the voiceover
  B: { start: 14.6, end: 16.3, text: "dev+josh@avidvs.com" },
};
const PASTED: Partial<Record<Col, number>> = { C: 46.6, D: 57.3, E: 67.1, F: 80.1 };

const sheetText: React.CSSProperties = {
  position: "absolute",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: 13.3,
  lineHeight: `${ROW_H}px`,
  color: "#000",
  paddingLeft: 3,
  whiteSpace: "nowrap",
  overflow: "hidden",
  background: "#fff",
};

const Row2: React.FC<{ readonly sceneStart: number }> = ({ sceneStart }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps + sceneStart;

  return (
    <>
      {(Object.keys(COLS) as Col[]).map((col) => {
        const { x, w } = COLS[col];
        const typed = TYPED[col];
        const pasted = PASTED[col];
        if (typed) {
          // A keeps the screenshot's own text once typed; B keeps the cover
          if (col === "A" && t >= typed.end) {
            return null;
          }
          const n = Math.round(
            interpolate(t, [typed.start, typed.end], [0, typed.text.length], clamp),
          );
          const typing = t >= typed.start && t < typed.end + 0.4;
          return (
            <div
              key={col}
              style={{
                ...sheetText,
                left: x,
                top: ROW2_Y,
                width: w - 1,
                height: ROW_H,
                fontWeight: typed.bold ? 700 : 400,
              }}
            >
              {typed.text.slice(0, n)}
              {typing && Math.floor(frame / 8) % 2 === 0 ? (
                <span style={{ borderLeft: "1.5px solid #000", marginLeft: 1 }} />
              ) : null}
            </div>
          );
        }
        if (pasted !== undefined && t < pasted) {
          return (
            <div
              key={col}
              style={{ ...sheetText, left: x, top: ROW2_Y, width: w - 1, height: ROW_H }}
            />
          );
        }
        return null;
      })}
      {(Object.keys(PASTED) as Col[]).map((col) => {
        const at = PASTED[col] as number;
        return (
          <div
            key={`flash-${col}`}
            style={{
              position: "absolute",
              left: COLS[col].x - 2,
              top: ROW2_Y - 2,
              width: COLS[col].w + 3,
              height: ROW_H + 4,
              border: `3px solid ${colors.green}`,
              background: "rgba(30,142,62,0.18)",
              opacity: interpolate(t, [at, at + 0.1, at + 0.8], [0, 1, 0], clamp),
            }}
          />
        );
      })}
    </>
  );
};

export type HeaderCue = { col: Col; at: number; until?: number; label?: string };

/**
 * The Master File screenshot with Row 2 filling in over Part 2, the sensitive
 * cells (C2:F2) and the spreadsheet ID in the URL always blurred.
 */
export const MasterFileScene: React.FC<{
  readonly sceneStart: number;
  readonly camera: readonly CamKey[];
  readonly cues?: readonly HeaderCue[];
  readonly badgesAt?: number;
  readonly checksAt?: number;
  readonly cursor?: React.ComponentProps<typeof Cursor>["path"];
  readonly clicks?: readonly number[];
  readonly enter?: "scale" | "cut";
}> = ({ sceneStart, camera, cues = [], badgesAt, checksAt, cursor, clicks, enter = "cut" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cam = useCamera(camera);
  const cols = Object.keys(COLS) as Col[];

  return (
    <AbsoluteFill
      style={
        enter === "scale"
          ? {
              opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], clamp),
              scale: interpolate(frame, [0, 0.6 * fps], [0.85, 1], { ...clamp, easing: ease }),
            }
          : { opacity: interpolate(frame, [0, 3], [0, 1], clamp) }
      }
    >
      <Stage shot={shots.master} {...WIN} {...cam}>
        <Row2 sceneStart={sceneStart} />
        {/* Spreadsheet ID in the URL bar */}
        <Redact shot={shots.master} x={318} y={47} w={392} h={22} />
        {/* Spreadsheet ID, CRM API Key, Location ID, Pipeline ID */}
        <Redact shot={shots.master} x={405} y={302} w={984} h={23} />
        {cues.map(({ col, at, until }) => (
          <Highlight
            key={`${col}-${at}`}
            x={COLS[col].x - 2}
            y={HEADER_Y - 2}
            w={COLS[col].w + 3}
            h={ROW_H + 4}
            opacity={interpolate(
              frame,
              until === undefined
                ? [at * fps, at * fps + 5]
                : [at * fps, at * fps + 5, until * fps - 5, until * fps],
              until === undefined ? [0, 1] : [0, 1, 1, 0],
              clamp,
            )}
          />
        ))}
        {cues
          .filter((c) => c.label)
          .map(({ col, at, label }) => (
            <StageLabel key={`label-${col}`} x={colCenter(col)} y={HEADER_Y - 30} at={at} zoom={cam.zoom}>
              {label}
            </StageLabel>
          ))}
        {badgesAt === undefined
          ? null
          : cols.map((col, i) => (
              <StageLabel
                key={`badge-${col}`}
                x={colCenter(col)}
                y={HEADER_Y - 26}
                at={badgesAt + i * 0.45}
                until={badgesAt + 3.4}
                zoom={cam.zoom}
              >
                {col}
              </StageLabel>
            ))}
        {checksAt === undefined
          ? null
          : cols.map((col, i) => (
              <StageLabel
                key={`check-${col}`}
                x={colCenter(col)}
                y={HEADER_Y - 26}
                at={checksAt + i * 0.06}
                zoom={cam.zoom}
                color={colors.green}
              >
                ✓
              </StageLabel>
            ))}
        {cursor ? <Cursor zoom={cam.zoom} path={cursor} clicks={clicks} /> : null}
      </Stage>
    </AbsoluteFill>
  );
};
