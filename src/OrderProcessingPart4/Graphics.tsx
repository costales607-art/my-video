import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, font } from "../OrderProcessingPart1/theme";
import { clamp } from "../OrderProcessingPart2/shared";
import { Card, springIn, Tag } from "../OrderProcessingShared/kit";

const exitStyle = (frame: number, fps: number, at: number): React.CSSProperties => ({
  fontFamily: font,
  opacity: interpolate(frame, [at * fps, at * fps + 0.4 * fps], [1, 0], clamp),
});

export const TOOLS = ["Dynamic Line Parser", "System Health Checker", "Custom Field Puller"];

export const ToolCards: React.FC<{ readonly at: number; readonly focus?: number; readonly top?: number }> = ({
  at,
  focus,
  top = 520,
}) => (
  <>
    {TOOLS.map((t, i) => (
      <Card
        key={t}
        x={430 + i * 530}
        y={top}
        w={480}
        at={at + i * 0.3}
        accent={focus === i ? colors.sky : colors.cardBorder}
        style={{
          textAlign: "center",
          opacity: focus === undefined || focus === i ? undefined : 0.4,
          boxShadow: focus === i ? "0 0 50px rgba(26,115,232,0.55)" : undefined,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 4, color: colors.sky }}>TOOL {i + 1}</div>
        <div style={{ fontSize: 36, fontWeight: 800, marginTop: 8 }}>{t}</div>
      </Card>
    ))}
  </>
);

const MiniReceipt: React.FC<{
  readonly x: number;
  readonly at: number;
  readonly title: string;
  readonly eventLine: number | null;
  readonly markAt: number;
  readonly rows?: number;
}> = ({ x, at, title, eventLine, markAt, rows = 20 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mark = interpolate(frame, [markAt * fps, markAt * fps + 6], [0, 1], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: x - 210,
        top: 300,
        width: 420,
        borderRadius: 16,
        background: "#fff",
        padding: "22px 26px",
        boxSizing: "border-box",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
        fontFamily: "Menlo, Consolas, monospace",
        ...springIn(frame, at, fps),
      }}
    >
      <div style={{ fontFamily: font, fontSize: 26, fontWeight: 800, color: "#202124", marginBottom: 12 }}>{title}</div>
      {Array.from({ length: rows }).map((_, i) => {
        const n = i + 1;
        const isEvent = n === eventLine;
        return (
          <div
            key={n}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: 25,
              fontSize: 17,
              color: "#5F6368",
              borderRadius: 6,
              background: isEvent ? `rgba(26,115,232,${0.18 * mark})` : undefined,
              outline: isEvent ? `3px solid rgba(26,115,232,${mark})` : undefined,
            }}
          >
            <span style={{ width: 28, textAlign: "right" }}>{String(n).padStart(2, "0")}</span>
            {isEvent ? (
              <span style={{ color: colors.blue, fontWeight: 700 }}>Event</span>
            ) : (
              <span style={{ height: 9, borderRadius: 5, background: "#DADCE0", width: `${35 + ((n * 37) % 50)}%` }} />
            )}
          </div>
        );
      })}
      {eventLine === null ? (
        <div style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: "#B3261E", marginTop: 8, opacity: mark }}>No “Event” line</div>
      ) : null}
    </div>
  );
};

// 0:00 – 0:09.6  "To ensure 100 percent accuracy… I engineered three specialized utility tools."
export const ToolsIntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const receipts = interpolate(frame, [6.8 * fps, 7.2 * fps], [1, 0], clamp);
  return (
    <AbsoluteFill style={exitStyle(frame, fps, 9.2)}>
      <div style={{ position: "absolute", top: 140, width: "100%", textAlign: "center", ...springIn(frame, 0.1, fps) }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 6, color: colors.sky }}>PART 4 · UTILITY TOOLS</div>
        <div style={{ fontSize: 76, fontWeight: 800, color: colors.white, marginTop: 10 }}>100% accuracy, easier testing</div>
      </div>
      <div style={{ opacity: receipts }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 520 + i * 300,
              top: 380 + (i % 2) * 30,
              width: 260,
              height: 340,
              borderRadius: 14,
              background: "#fff",
              rotate: `${[-8, 3, 10][i]}deg`,
              padding: 22,
              boxSizing: "border-box",
              boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
              ...springIn(frame, 3.4 + i * 0.3, fps),
            }}
          >
            {Array.from({ length: [9, 7, 10][i] }).map((_, k) => (
              <div
                key={k}
                style={{
                  height: 10,
                  borderRadius: 5,
                  marginBottom: [18, 26, 14][i],
                  marginLeft: [0, 30, 10][i] * (k % 2),
                  width: `${40 + ((k * 23 + i * 17) % 55)}%`,
                  background: k === [3, 5, 8][i] ? colors.blue : "#DADCE0",
                }}
              />
            ))}
          </div>
        ))}
        <Tag x={960} y={790} at={4.4} center color="#3A4660">
          Inconsistent receipt formats
        </Tag>
      </div>
      <ToolCards at={7.4} top={460} />
    </AbsoluteFill>
  );
};

// 0:13.6 – 0:18.7  "Because different vendors use different receipt layouts, data isn't always on the same line."
export const LayoutsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={exitStyle(frame, fps, 4.7)}>
      <div style={{ position: "absolute", top: 150, width: "100%", textAlign: "center", ...springIn(frame, 0, fps) }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 6, color: colors.sky }}>THE PROBLEM</div>
        <div style={{ fontSize: 60, fontWeight: 800, color: colors.white, marginTop: 8 }}>Different layouts, different lines</div>
      </div>
      <MiniReceipt x={480} at={0.3} title="Layout A" eventLine={11} markAt={2.7} />
      <MiniReceipt x={960} at={0.5} title="Layout B" eventLine={16} markAt={3.0} />
      <MiniReceipt x={1440} at={0.7} title="Layout C" eventLine={null} markAt={3.3} />
    </AbsoluteFill>
  );
};

const CONDITIONS = [
  { title: "Condition 1", rule: "Line 11 starts with “Event”", result: "Take the text after it" },
  { title: "Condition 2", rule: "Scan lines 15–20 for “Event”", result: "Take the line above it" },
  { title: "Condition 3", rule: "No “Event” anywhere", result: "Blank value + log for review" },
];

// 0:18.7 – 0:24.5  "…a three-tier fallback mechanism to catch event names reliably."
export const FallbackLadderScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={exitStyle(frame, fps, 5.4)}>
      <div style={{ position: "absolute", top: 110, width: "100%", textAlign: "center", ...springIn(frame, 0.2, fps) }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 6, color: colors.sky }}>DYNAMIC LINE PARSER</div>
        <div style={{ fontSize: 60, fontWeight: 800, color: colors.white, marginTop: 8 }}>Three-tier fallback</div>
      </div>
      {CONDITIONS.map((c, i) => (
        <Card key={c.title} x={960} y={300 + i * 200} w={1000} at={2.0 + i * 0.4} accent={i === 2 ? "#E8615A" : colors.blue}>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: i === 2 ? "#B3261E" : colors.blue,
                fontSize: 36,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div>
              <div style={{ fontSize: 34, fontWeight: 800 }}>{c.rule}</div>
              <div style={{ fontSize: 26, color: colors.muted, marginTop: 4 }}>→ {c.result}</div>
            </div>
          </div>
        </Card>
      ))}
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 940,
            top: 440 + i * 200,
            fontSize: 40,
            color: colors.muted,
            opacity: interpolate(frame, [(2.3 + i * 0.4) * fps, (2.5 + i * 0.4) * fps], [0, 1], clamp),
          }}
        >
          ↓
        </div>
      ))}
      <Tag x={960} y={920} at={3.6} center color={colors.green}>
        Event names caught reliably
      </Tag>
    </AbsoluteFill>
  );
};

// Ladder in compact form beside the receipt screenshots; seconds are from 0:24.4
const ACTIVE = [1.5, 7.0, 21.9];
const DONE_AT = [5.5, 20.4, 29.6];

export const LadderPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ fontFamily: font }}>
      {CONDITIONS.map((c, i) => {
        const active = t >= ACTIVE[i] && (i === 2 || t < ACTIVE[i + 1]);
        const done = t >= DONE_AT[i];
        return (
          <div
            key={c.title}
            style={{
              position: "absolute",
              left: 1470,
              top: 210 + i * 230,
              width: 400,
              borderRadius: 20,
              padding: "20px 24px",
              boxSizing: "border-box",
              background: active ? "#14305E" : colors.card,
              border: `3px solid ${active ? colors.sky : done ? colors.mint : colors.cardBorder}`,
              boxShadow: active ? "0 0 40px rgba(26,115,232,0.5)" : undefined,
              translate: springIn(frame, 0.2 + i * 0.15, fps).translate,
              opacity: (active || done ? 1 : 0.55) * springIn(frame, 0.2 + i * 0.15, fps).opacity,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: colors.sky }}>{c.title.toUpperCase()}</div>
              <div style={{ fontSize: 28, color: i === 2 ? "#F28B82" : colors.mint, opacity: done ? 1 : 0 }}>{i === 2 ? "⚠" : "✓"}</div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: colors.white, marginTop: 8 }}>{c.rule}</div>
            <div style={{ fontSize: 22, color: colors.muted, marginTop: 6 }}>→ {c.result}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
