import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Cursor,
  ease,
  glide,
  Highlight,
  Pill,
  Redact,
  SheetIcon,
  Stage,
} from "./primitives";
import { colors, font, shots } from "./theme";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Full-frame browser window: 1760 wide keeps the ~1.87 screenshot aspect
const WIN = { left: 80, top: 70, width: 1760, height: 941 };
const FIT = WIN.width / 1919;

// 0:00 – 0:06  "Hello everyone. Today, I am going to walk you through…"
export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const steps = ["Gmail", "Sheets", "CRM"];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontFamily: font,
        opacity: interpolate(frame, [5.4 * fps, 6 * fps], [1, 0], clamp),
        scale: interpolate(frame, [5.4 * fps, 6 * fps], [1, 0.9], {
          ...clamp,
          easing: ease,
        }),
      }}
    >
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 6,
          color: colors.sky,
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], clamp),
        }}
      >
        PART 1 · SYSTEM OVERVIEW
      </div>
      <div
        style={{
          marginTop: 22,
          fontSize: 92,
          fontWeight: 800,
          color: colors.white,
          letterSpacing: -2,
          textAlign: "center",
          lineHeight: 1.05,
          opacity: interpolate(frame, [0.1 * fps, 0.6 * fps], [0, 1], clamp),
          translate: interpolate(frame, [0.1 * fps, 0.7 * fps], ["0px 40px", "0px 0px"], {
            ...clamp,
            easing: ease,
          }),
          filter: `blur(${interpolate(frame, [0.1 * fps, 0.6 * fps], [12, 0], clamp)}px)`,
        }}
      >
        Automated Order
        <br />
        Processing System
      </div>
      <div
        style={{
          marginTop: 34,
          height: 6,
          borderRadius: 3,
          background: `linear-gradient(90deg, ${colors.blue}, ${colors.mint})`,
          width: interpolate(frame, [0.5 * fps, 1.2 * fps], [0, 360], {
            ...clamp,
            easing: ease,
          }),
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 60 }}>
        {steps.map((s, i) => {
          const start = (1.6 + i * 0.25) * fps;
          return (
            <React.Fragment key={s}>
              {i > 0 ? (
                <div
                  style={{
                    color: colors.muted,
                    fontSize: 34,
                    opacity: interpolate(frame, [start - 4, start + 4], [0, 1], clamp),
                  }}
                >
                  →
                </div>
              ) : null}
              <div
                style={{
                  padding: "14px 30px",
                  borderRadius: 14,
                  background: colors.card,
                  border: `2px solid ${colors.cardBorder}`,
                  color: colors.white,
                  fontSize: 30,
                  fontWeight: 600,
                  opacity: interpolate(frame, [start, start + 8], [0, 1], clamp),
                  translate: interpolate(frame, [start, start + 12], ["0px 20px", "0px 0px"], {
                    ...clamp,
                    easing: ease,
                  }),
                }}
              >
                {s}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 0:05.4 – 0:13.6  "Currently, we are looking at our dedicated backend Gmail account…"
export const GmailScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = interpolate(frame, [0, 8 * fps], [FIT, 1.0], { ...clamp, easing: glide });

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], clamp),
        scale: interpolate(frame, [0, 0.6 * fps], [0.85, 1], { ...clamp, easing: ease }),
      }}
    >
      <Stage
        shot={shots.gmail}
        {...WIN}
        zoom={zoom}
        focusX={interpolate(frame, [0, 8 * fps], [959, 1000], { ...clamp, easing: glide })}
        focusY={interpolate(frame, [0, 8 * fps], [516, 430], { ...clamp, easing: glide })}
      >
        {/* GoHighLevel one-time login code row */}
        <Redact shot={shots.gmail} x={335} y={594} w={1512} h={38} />
        <Highlight
          x={1852}
          y={127}
          w={52}
          h={52}
          opacity={interpolate(frame, [5.5 * fps, 5.8 * fps], [0, 1], clamp)}
        />
        <Pill
          style={{
            left: 1890,
            top: 196,
            transformOrigin: "100% 0",
            translate: "-100% 0",
            scale: String(
              interpolate(frame, [5.6 * fps, 6 * fps], [0.6, 1], { ...clamp, easing: ease }) /
                zoom,
            ),
            opacity: interpolate(frame, [5.6 * fps, 5.9 * fps], [0, 1], clamp),
          }}
        >
          dev@avidvs.com · Backend Gmail
        </Pill>
        <Cursor
          zoom={zoom}
          path={[
            [0.6, 1500, 960],
            [3.1, 118, 24],
            [4.3, 118, 24],
            [5.5, 1878, 153],
          ]}
          clicks={[5.7]}
          opacity={interpolate(frame, [0.6 * fps, 1 * fps], [0, 1], clamp)}
        />
      </Stage>
    </AbsoluteFill>
  );
};

// 0:13.2 – 0:18.7  "Inside Google Drive, we have our primary folder named Order Processing File,"
export const DriveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = interpolate(frame, [2 * fps, 3.8 * fps], [FIT, 1.3], { ...clamp, easing: glide });

  return (
    <AbsoluteFill
      style={{
        translate: interpolate(frame, [0, 0.45 * fps], ["1920px 0px", "0px 0px"], {
          ...clamp,
          easing: ease,
        }),
        filter: `blur(${interpolate(frame, [0, 0.3 * fps, 0.45 * fps], [10, 4, 0], clamp)}px)`,
      }}
    >
      <Stage
        shot={shots.drive}
        {...WIN}
        zoom={zoom}
        focusX={interpolate(frame, [2 * fps, 3.8 * fps], [959, 760], { ...clamp, easing: glide })}
        focusY={interpolate(frame, [2 * fps, 3.8 * fps], [513, 600], { ...clamp, easing: glide })}
      >
        <Highlight
          x={18}
          y={376}
          w={222}
          h={32}
          opacity={interpolate(frame, [0.8 * fps, 1 * fps, 1.6 * fps, 1.9 * fps], [0, 1, 1, 0], clamp)}
        />
        <Highlight
          x={277}
          y={598}
          w={1566}
          h={48}
          opacity={interpolate(frame, [2.6 * fps, 2.9 * fps], [0, 1], clamp)}
        />
        <Cursor
          zoom={zoom}
          path={[
            [0, 1150, 520],
            [0.8, 95, 392],
            [1.3, 95, 392],
            [2.6, 410, 622],
          ]}
          clicks={[0.85, 4.4, 4.58]}
        />
      </Stage>
    </AbsoluteFill>
  );
};

const FileLabel: React.FC<{
  readonly at: number;
  readonly top: number;
  readonly color: string;
  readonly zoom: number;
  readonly children: React.ReactNode;
}> = ({ at, top, color, zoom, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Pill
      color={color}
      style={{
        left: 700,
        top,
        fontSize: 22,
        padding: "8px 18px",
        transformOrigin: "0 50%",
        translate: "0 -50%",
        scale: String(1 / zoom),
        opacity: interpolate(frame, [at * fps, at * fps + 6], [0, 1], clamp),
        marginLeft: interpolate(frame, [at * fps, at * fps + 10], [40, 0], {
          ...clamp,
          easing: ease,
        }),
      }}
    >
      {children}
    </Pill>
  );
};

// 0:18.5 – 0:23.6  "…which contains all the necessary components for this automation…"
export const FolderScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Opens on the same framing the Drive scene ended on (match cut)
  const zoom = 1.3;
  const rowOpacity = (from: number, to: number) =>
    interpolate(frame, [from * fps, from * fps + 4, to * fps - 4, to * fps], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, 0.3 * fps, 4.6 * fps, 5.1 * fps], [0, 1, 1, 0], clamp),
        filter: `blur(${interpolate(frame, [4.6 * fps, 5.1 * fps], [0, 14], clamp)}px)`,
      }}
    >
      <Stage
        shot={shots.folder}
        {...WIN}
        zoom={zoom}
        focusX={interpolate(frame, [0.3 * fps, 1 * fps], [760, 880], { ...clamp, easing: glide })}
        focusY={interpolate(frame, [0.3 * fps, 1 * fps], [600, 650], { ...clamp, easing: glide })}
      >
        <div
          style={{
            position: "absolute",
            left: 285,
            top: 305,
            width: 1545,
            height: 235,
            borderRadius: 12,
            background: "rgba(6,11,24,0.55)",
            opacity: interpolate(frame, [0.3 * fps, 0.8 * fps], [0, 1], clamp),
          }}
        />
        <Highlight x={273} y={598} w={1567} h={48} opacity={rowOpacity(1.0, 2.0)} />
        <Highlight x={273} y={646} w={1567} h={48} opacity={rowOpacity(2.0, 3.0)} />
        <Highlight x={273} y={694} w={1567} h={48} opacity={rowOpacity(3.0, 4.4)} />
        <FileLabel at={1.0} top={622} color={colors.green} zoom={zoom}>
          Client sheet
        </FileLabel>
        <FileLabel at={2.0} top={670} color={colors.blue} zoom={zoom}>
          Control dashboard
        </FileLabel>
        <FileLabel at={3.0} top={718} color="#9334E6" zoom={zoom}>
          Script engine
        </FileLabel>
        <Cursor
          zoom={zoom}
          path={[
            [0, 410, 622],
            [1.0, 480, 622],
            [2.0, 420, 670],
            [3.0, 470, 718],
          ]}
        />
      </Stage>
    </AbsoluteFill>
  );
};

const springIn = (frame: number, at: number, fps: number) => ({
  opacity: interpolate(frame, [at * fps, at * fps + 8], [0, 1], clamp),
  translate: interpolate(frame, [at * fps, at * fps + 0.6 * fps], ["0px 40px", "0px 0px"], {
    ...clamp,
    easing: Easing.spring({ damping: 14 }),
  }),
});

const ClientCard: React.FC<{
  readonly at: number;
  readonly fillAt: number;
  readonly centerX: number;
  readonly title: string;
  readonly subtitle: string;
  readonly ghost?: boolean;
}> = ({ at, fillAt, centerX, title, subtitle, ghost = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: centerX - 200,
        top: 600,
        width: 400,
        height: 170,
        borderRadius: 22,
        background: colors.card,
        border: `2px ${ghost ? "dashed" : "solid"} ${ghost ? colors.cardBorder : colors.mint}`,
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "0 28px",
        boxSizing: "border-box",
        ...springIn(frame, at, fps),
        opacity: interpolate(frame, [at * fps, at * fps + 8], [0, ghost ? 0.55 : 1], clamp),
      }}
    >
      <div
        style={{
          scale: String(
            interpolate(frame, [fillAt * fps, fillAt * fps + 5, fillAt * fps + 12], [1, 1.25, 1], clamp),
          ),
        }}
      >
        <SheetIcon size={70} color={ghost ? colors.muted : colors.green} />
      </div>
      <div>
        <div style={{ fontSize: 32, fontWeight: 700, color: colors.white }}>{title}</div>
        <div style={{ fontSize: 22, color: colors.muted, marginTop: 4 }}>{subtitle}</div>
      </div>
    </div>
  );
};

// 0:23.4 – 0:41.0  Two-tier architecture diagram (the Master File cutaway plays over it)
export const ArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = interpolate(frame, [10 * fps, 10.8 * fps], [1, 0], { ...clamp, easing: glide });
  const targets = [500, 960, 1420];

  return (
    <AbsoluteFill
      style={{
        fontFamily: font,
        opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], clamp),
        translate: interpolate(frame, [15.4 * fps, 16 * fps], ["0px 0px", "-470px 40px"], {
          ...clamp,
          easing: ease,
        }),
        scale: interpolate(frame, [15.4 * fps, 16 * fps], [1, 0.62], { ...clamp, easing: ease }),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 70,
          width: "100%",
          textAlign: "center",
          ...springIn(frame, 0.2, fps),
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 6, color: colors.sky }}>
          HOW IT&apos;S ORGANIZED
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, color: colors.white, marginTop: 8 }}>
          Two-Tier Spreadsheet Architecture
        </div>
      </div>

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {targets.map((x) => (
          <path
            key={x}
            d={`M 960 440 C 960 520, ${x} 520, ${x} 600`}
            fill="none"
            stroke={colors.sky}
            strokeWidth={4}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={draw}
          />
        ))}
      </svg>

      {/* Tier 1 */}
      <div
        style={{
          position: "absolute",
          left: 960 - 330,
          top: 250,
          width: 660,
          height: 190,
          borderRadius: 26,
          background: colors.card,
          border: `3px solid ${colors.blue}`,
          boxShadow: `0 0 ${interpolate(frame, [3.5 * fps, 4.5 * fps, 6 * fps], [0, 50, 24], clamp)}px rgba(26,115,232,0.55)`,
          display: "flex",
          alignItems: "center",
          gap: 28,
          padding: "0 36px",
          boxSizing: "border-box",
          ...springIn(frame, 3.5, fps),
        }}
      >
        <SheetIcon size={96} color={colors.blue} />
        <div>
          <div style={{ fontSize: 44, fontWeight: 800, color: colors.white }}>Master File</div>
          <div style={{ fontSize: 26, color: colors.muted, marginTop: 6 }}>
            Centralized control dashboard
          </div>
        </div>
        <Pill style={{ top: -22, right: 30, fontSize: 20, padding: "6px 16px" }}>TIER 1</Pill>
        <Pill
          color={colors.green}
          style={{
            bottom: -24,
            right: 30,
            fontSize: 20,
            padding: "6px 16px",
            opacity: interpolate(frame, [7.8 * fps, 8 * fps], [0, 1], clamp),
          }}
        >
          Client Onboarding
        </Pill>
      </div>

      {/* Tier 2 */}
      <ClientCard at={10.4} fillAt={13.0} centerX={500} title="Josh Razizer" subtitle="Automation Request" />
      <ClientCard at={10.55} fillAt={13.15} centerX={960} title="Client B" subtitle="Spreadsheet" ghost />
      <ClientCard at={10.7} fillAt={13.3} centerX={1420} title="Client C" subtitle="Spreadsheet" ghost />
      <div
        style={{
          position: "absolute",
          top: 810,
          width: "100%",
          textAlign: "center",
          fontSize: 34,
          fontWeight: 700,
          color: colors.white,
          ...springIn(frame, 10.2, fps),
        }}
      >
        <span style={{ color: colors.mint }}>TIER 2</span> · Client Spreadsheet Files
      </div>
      <div
        style={{
          position: "absolute",
          top: 880,
          width: "100%",
          textAlign: "center",
          ...springIn(frame, 13.0, fps),
        }}
      >
        <Pill color={colors.green} style={{ position: "relative", display: "inline-block" }}>
          1 client = 1 spreadsheet
        </Pill>
      </div>
      {/* Ties the Josh card to the live example once the layout splits */}
      <div
        style={{
          position: "absolute",
          left: 290,
          top: 590,
          width: 420,
          height: 190,
          borderRadius: 28,
          border: `4px solid ${colors.mint}`,
          opacity: interpolate(frame, [16.3 * fps, 16.6 * fps], [0, 1], clamp),
          scale: interpolate(frame, [16.3 * fps, 16.8 * fps], [1.15, 1], {
            ...clamp,
            easing: ease,
          }),
        }}
      />
    </AbsoluteFill>
  );
};

// 0:30.9 – 0:33.4  "…where we manage client onboarding." — zoom into the real Master File
export const MasterFileCutaway: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = 1.25;
  const inOut = interpolate(frame, [0, 0.4 * fps, 2.1 * fps, 2.5 * fps], [0, 1, 1, 0], {
    ...clamp,
    easing: ease,
  });

  return (
    <AbsoluteFill style={{ fontFamily: font }}>
      <AbsoluteFill style={{ background: "rgba(6,11,24,0.7)", opacity: inOut }} />
      <Stage
        shot={shots.master}
        width={1700}
        height={560}
        zoom={zoom}
        focusX={715}
        focusY={300}
        style={{
          left: 110,
          top: 300,
          opacity: inOut,
          scale: String(0.4 + 0.6 * inOut),
          transformOrigin: "50% 0%",
        }}
      >
        {/* B2 reads the same routing alias as the voiceover */}
        <div
          style={{
            position: "absolute",
            left: 181,
            top: 303,
            width: 224,
            height: 20,
            background: "#fff",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 13.3,
            lineHeight: "20px",
            paddingLeft: 3,
            color: "#000",
          }}
        >
          dev+josh@avidvs.com
        </div>
        {/* CRM API Key, Spreadsheet ID, Location ID, Pipeline ID (C2:F2) */}
        <Redact shot={shots.master} x={405} y={302} w={984} h={23} />
        <Highlight
          x={44}
          y={280}
          w={interpolate(frame, [0.45 * fps, 2 * fps], [136, 1344], { ...clamp, easing: glide })}
          h={24}
          opacity={interpolate(frame, [0.35 * fps, 0.5 * fps], [0, 1], clamp)}
        />
      </Stage>
      <Pill
        color={colors.green}
        style={{
          left: 960,
          top: 220,
          translate: "-50% 0",
          opacity: inOut,
          scale: String(0.8 + 0.2 * inOut),
        }}
      >
        Master File → Client Onboarding
      </Pill>
    </AbsoluteFill>
  );
};

// 0:38.8 – 0:41.0  "…generated for each specific client." — the real client sheet
export const ClientExampleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = 1.1;

  return (
    <AbsoluteFill
      style={{
        fontFamily: font,
        translate: interpolate(frame, [0, 0.6 * fps], ["900px 0px", "0px 0px"], {
          ...clamp,
          easing: ease,
        }),
        opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], clamp),
      }}
    >
      <Pill color={colors.green} style={{ left: 1040, top: 300 }}>
        Live example
      </Pill>
      <Stage
        shot={shots.folder}
        width={820}
        height={400}
        zoom={zoom}
        focusX={640}
        focusY={660}
        style={{ left: 1040, top: 380 }}
      >
        <Highlight
          x={273}
          y={598}
          w={1567}
          h={48}
          opacity={interpolate(frame, [1 * fps, 1.2 * fps], [0, 1], clamp)}
        />
        <Cursor
          zoom={zoom}
          path={[
            [0, 900, 760],
            [0.9, 470, 622],
          ]}
          clicks={[1.0]}
        />
      </Stage>
    </AbsoluteFill>
  );
};
