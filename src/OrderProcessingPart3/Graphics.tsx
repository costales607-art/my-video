import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ease, Pill } from "../OrderProcessingPart1/primitives";
import { colors, font } from "../OrderProcessingPart1/theme";
import { clamp } from "../OrderProcessingPart2/shared";
import { Card, CodeGlyph, DrawPath, MailGlyph, springIn, Svg, Tag } from "../OrderProcessingShared/kit";

const exitStyle = (frame: number, fps: number, at: number): React.CSSProperties => ({
  fontFamily: font,
  opacity: interpolate(frame, [at * fps, at * fps + 0.4 * fps], [1, 0], clamp),
});

const Heading: React.FC<{ readonly at: number; readonly top?: number; readonly eyebrow: string; readonly title: string }> = ({
  at,
  top = 200,
  eyebrow,
  title,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top, width: "100%", textAlign: "center", ...springIn(frame, at, fps) }}>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 6, color: colors.sky }}>{eyebrow}</div>
      <div style={{ fontSize: 58, fontWeight: 800, color: colors.white, marginTop: 8 }}>{title}</div>
    </div>
  );
};

// 0:07.4 – 0:10.4  "…every 5 to 10 minutes to process fresh receipts."
export const ClockScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const turn = interpolate(frame, [0, 3 * fps], [0, 720]);
  return (
    <AbsoluteFill style={exitStyle(frame, fps, 2.6)}>
      <div style={{ position: "absolute", left: 420, top: 300, ...springIn(frame, 0, fps) }}>
        <svg width={420} height={420} viewBox="0 0 420 420">
          <circle cx={210} cy={210} r={190} fill={colors.card} stroke={colors.blue} strokeWidth={8} />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1={210}
              y1={40}
              x2={210}
              y2={i % 3 === 0 ? 70 : 58}
              stroke={colors.sky}
              strokeWidth={i % 3 === 0 ? 6 : 3}
              transform={`rotate(${i * 30} 210 210)`}
            />
          ))}
          <line x1={210} y1={210} x2={210} y2={95} stroke="#fff" strokeWidth={9} strokeLinecap="round" transform={`rotate(${turn} 210 210)`} />
          <line x1={210} y1={210} x2={210} y2={130} stroke={colors.sky} strokeWidth={11} strokeLinecap="round" transform={`rotate(${turn / 12} 210 210)`} />
          <circle cx={210} cy={210} r={14} fill={colors.blue} />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 960, top: 340, ...springIn(frame, 0.15, fps) }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 5, color: colors.sky }}>TIME-DRIVEN TRIGGER</div>
        <div style={{ fontSize: 84, fontWeight: 800, color: colors.white, marginTop: 10 }}>Every 5–10 min</div>
      </div>
      <div style={{ position: "absolute", left: 960, top: 520, display: "flex", gap: 18 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 18px",
              borderRadius: 12,
              background: "#fff",
              color: "#202124",
              fontSize: 22,
              fontWeight: 700,
              ...springIn(frame, 1.6 + i * 0.15, fps),
            }}
          >
            <MailGlyph size={28} color="#EA4335" />
            Receipt
          </div>
        ))}
      </div>
      <Tag x={960} y={620} at={1.9} color={colors.green}>
        Fresh receipts processed automatically
      </Tag>
    </AbsoluteFill>
  );
};

// 0:10.3 – 0:20.7  "To maintain high performance… scans emails received from yesterday through today."
export const ScanWindowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bars = [0.25, 0.35, 0.45, 0.6, 0.74, 0.9, 1.0];
  const chart = interpolate(frame, [5.6 * fps, 6.0 * fps], [1, 0], clamp);
  const days = ["Oct 26", "Oct 27", "Oct 28", "Yesterday", "Today"];
  const windowIn = interpolate(frame, [8.2 * fps, 8.6 * fps], [0, 1], { ...clamp, easing: ease });

  return (
    <AbsoluteFill style={exitStyle(frame, fps, 10.0)}>
      <Heading at={0.1} top={120} eyebrow="BUILT TO SCALE" title="Only scan what's new" />
      {/* Phase 1: inbox volume keeps growing toward processing limits */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, opacity: chart }}>
        <div style={{ position: "absolute", left: 460, top: 330, width: 1000, height: 520 }}>
          {bars.map((b, i) => {
            const grow = interpolate(frame, [(0.3 + i * 0.5) * fps, (0.8 + i * 0.5) * fps], [0, b], { ...clamp, easing: ease });
            const over = b > 0.7;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: i * 140 + 20,
                  bottom: 0,
                  width: 100,
                  height: grow * 480,
                  borderRadius: "12px 12px 0 0",
                  background: over && frame > 3.6 * fps ? "#E8615A" : colors.blue,
                }}
              />
            );
          })}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 480 - 0.7 * 480,
              borderTop: `4px dashed #FBBC04`,
              opacity: interpolate(frame, [3.2 * fps, 3.5 * fps], [0, 1], clamp),
            }}
          />
          <div style={{ position: "absolute", left: 0, top: 520 + 14, fontSize: 26, color: colors.muted, fontWeight: 600 }}>
            Inbox volume over time
          </div>
        </div>
        <Tag x={1180} y={420} at={3.5} color="#B98900" size={24}>
          Processing limits
        </Tag>
      </div>
      {/* Phase 2: the scan window covers yesterday through today */}
      <div style={{ position: "absolute", left: 210, top: 420, display: "flex", gap: 30 }}>
        {days.map((d, i) => {
          const old = i < 3;
          return (
            <div
              key={d}
              style={{
                width: 270,
                height: 300,
                borderRadius: 22,
                background: colors.card,
                border: `2px solid ${colors.cardBorder}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                ...springIn(frame, 5.9 + i * 0.12, fps),
                opacity:
                  interpolate(frame, [(5.9 + i * 0.12) * fps, (5.9 + i * 0.12) * fps + 8], [0, 1], clamp) *
                  (old ? interpolate(frame, [8.6 * fps, 9.0 * fps], [1, 0.35], clamp) : 1),
              }}
            >
              <div style={{ display: "flex", gap: 8 }}>
                {[0, 1, 2].slice(0, old ? 3 : 2).map((k) => (
                  <MailGlyph key={k} size={46} color={old ? colors.muted : "#EA4335"} />
                ))}
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: colors.white }}>{d}</div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          left: 210 + 3 * 300 - 18,
          top: 402,
          width: 2 * 270 + 30 + 36,
          height: 336,
          borderRadius: 30,
          border: `5px solid ${colors.blue}`,
          boxShadow: "0 0 40px rgba(26,115,232,0.55)",
          opacity: windowIn,
          scale: String(0.9 + 0.1 * windowIn),
        }}
      />
      <Tag x={1388} y={770} at={8.4} center color={colors.blue}>
        Scan window: yesterday → today
      </Tag>
      <Tag x={500} y={770} at={9.0} center color="#3A4660" size={24}>
        Older history skipped
      </Tag>
    </AbsoluteFill>
  );
};

const STEPS = ["Text Extraction", "Contact Management", "Smart Custom Fields", "Opportunity Creation"];
// Scene seconds (from 0:26.9) when each step becomes the active one
const ACTIVE_AT = [5.7, 11.4, 23.6, 46.3];

// 0:26.9 – 1:27.0  Four key operations: large intro, then a progress bar along the top
export const OperationsStepper: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const dock = interpolate(frame, [5.5 * fps, 6.1 * fps], [0, 1], { ...clamp, easing: ease });

  return (
    <AbsoluteFill style={{ fontFamily: font }}>
      <div
        style={{
          position: "absolute",
          top: 230,
          width: "100%",
          textAlign: "center",
          translate: springIn(frame, 0.1, fps).translate,
          opacity: (1 - dock) * springIn(frame, 0.1, fps).opacity,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
          <MailGlyph size={72} color="#EA4335" />
          <div style={{ fontSize: 40, color: colors.muted }}>→</div>
          <CodeGlyph size={72} />
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 6, color: colors.sky, marginTop: 26 }}>WHEN A RECEIPT ARRIVES</div>
        <div style={{ fontSize: 62, fontWeight: 800, color: colors.white, marginTop: 8 }}>Four key operations</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: 1920,
          top: interpolate(dock, [0, 1], [600, 40]),
          display: "flex",
          justifyContent: "center",
          gap: 28,
          scale: String(interpolate(dock, [0, 1], [1, 0.62])),
          transformOrigin: "50% 0",
        }}
      >
        {STEPS.map((label, i) => {
          const active = t >= ACTIVE_AT[i] && (i === 3 || t < ACTIVE_AT[i + 1]);
          const done = i < 3 && t >= ACTIVE_AT[i + 1];
          return (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "20px 30px",
                borderRadius: 22,
                background: active ? colors.blue : colors.card,
                border: `3px solid ${done ? colors.mint : active ? colors.sky : colors.cardBorder}`,
                boxShadow: active ? "0 0 40px rgba(26,115,232,0.6)" : undefined,
                ...springIn(frame, 3.5 + i * 0.4, fps),
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: done ? colors.green : active ? "#fff" : "rgba(138,180,248,0.15)",
                  color: done ? "#fff" : active ? colors.blue : colors.sky,
                  fontSize: 30,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {done ? "✓" : i + 1}
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: colors.white, whiteSpace: "nowrap" }}>{label}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Lines from the real parse of order 73513289; personal details masked
const PARSED: readonly (readonly [string, string | null])[] = [
  ["002", "ORDER RECEIPT"],
  ["006", null],
  ["007", "Order Number: 73513289"],
  ["009", "Order Date: 2026-10-20"],
  ["011", "Order Type: Regular"],
  ["013", null],
  ["015", "00101557 - 10/20 Waxahachie"],
  ["016", "Event:"],
  ["036", "Order Total: $353.98"],
];

// 0:32.4 – 0:38.3  "First, text extraction. It reads and parses raw text directly from the receipt."
export const TextExtractionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const beam = interpolate(frame, [1.0 * fps, 4.6 * fps], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });

  return (
    <AbsoluteFill style={exitStyle(frame, fps, 5.5)}>
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 230,
          width: 460,
          height: 640,
          borderRadius: 16,
          background: "#fff",
          overflow: "hidden",
          boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
          ...springIn(frame, 0, fps),
        }}
      >
        <div style={{ padding: "34px 36px 0", fontSize: 28, fontWeight: 800, color: "#202124" }}>ORDER RECEIPT</div>
        <div style={{ padding: "4px 36px 18px", fontSize: 18, color: "#5F6368" }}>PDF attachment</div>
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            style={{
              margin: "0 36px 14px",
              height: 12,
              borderRadius: 6,
              width: `${[70, 55, 80, 45, 62, 75, 40, 66, 52, 78, 48, 60, 72, 44, 58, 68][i]}%`,
              background: "#DADCE0",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: beam * 600,
            height: 6,
            background: colors.blue,
            boxShadow: "0 0 30px 10px rgba(26,115,232,0.45)",
            opacity: interpolate(frame, [0.9 * fps, 1.0 * fps, 4.6 * fps, 4.8 * fps], [0, 1, 1, 0], clamp),
          }}
        />
      </div>
      <Svg>
        <DrawPath d="M 740 550 L 840 550" from={0.8} to={1.2} />
        <path d="M 824 536 L 844 550 L 824 564" fill="none" stroke={colors.sky} strokeWidth={5} strokeLinecap="round" opacity={interpolate(frame, [1.1 * fps, 1.2 * fps], [0, 1], clamp)} />
      </Svg>
      <div
        style={{
          position: "absolute",
          left: 880,
          top: 230,
          width: 800,
          height: 640,
          borderRadius: 16,
          background: "#0B1324",
          border: `2px solid ${colors.cardBorder}`,
          padding: "30px 36px",
          boxSizing: "border-box",
          fontFamily: "Menlo, Consolas, monospace",
          fontSize: 25,
          lineHeight: "58px",
          ...springIn(frame, 0.3, fps),
        }}
      >
        {PARSED.map(([n, text], i) => (
          <div key={n} style={{ opacity: interpolate(frame, [(1.2 + i * 0.38) * fps, (1.2 + i * 0.38) * fps + 4], [0, 1], clamp), whiteSpace: "nowrap" }}>
            <span style={{ color: colors.sky }}>[Line {n}]:</span>{" "}
            {text === null ? (
              <span style={{ display: "inline-block", width: 260, height: 22, verticalAlign: "middle", borderRadius: 6, background: "#2A3754" }} />
            ) : (
              <span style={{ color: "#E8EAED" }}>{text}</span>
            )}
          </div>
        ))}
      </div>
      <Tag x={1280} y={900} at={4.6} center color={colors.green}>
        Raw text → numbered lines
      </Tag>
    </AbsoluteFill>
  );
};

// 0:38.3 – 0:44.0  "Second, contact management. It queries the GoHighLevel CRM API."
export const ApiQueryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={exitStyle(frame, fps, 5.3)}>
      <Card x={520} y={430} w={520} at={0.3} accent={colors.blue}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <CodeGlyph size={80} />
          <div>
            <div style={{ fontSize: 36, fontWeight: 800 }}>ReceiptFlow Engine</div>
            <div style={{ fontSize: 24, color: colors.muted, marginTop: 4 }}>Parsed receipt</div>
          </div>
        </div>
      </Card>
      <Card x={1400} y={430} w={560} at={1.1} accent={colors.mint}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width={80} height={80} viewBox="0 0 24 24">
            <rect x={2} y={2} width={20} height={20} rx={5} fill={colors.blue} />
            <circle cx={12} cy={9.5} r={3.2} fill="#fff" />
            <path d="M6 18.5 C6.8 14.8 17.2 14.8 18 18.5" fill="#fff" />
          </svg>
          <div>
            <div style={{ fontSize: 36, fontWeight: 800 }}>GoHighLevel CRM API</div>
            <div style={{ fontSize: 24, color: colors.muted, marginTop: 4 }}>Client&apos;s sub-account</div>
          </div>
        </div>
      </Card>
      <Svg>
        <DrawPath d="M 790 480 L 1110 480" from={2.7} to={3.3} />
        <DrawPath d="M 1110 560 L 790 560" from={4.3} to={4.9} color={colors.mint} />
      </Svg>
      <Tag x={950} y={392} at={3.0} center size={22}>
        Search contact by email / phone
      </Tag>
      <Tag x={950} y={586} at={4.7} center color={colors.green} size={22}>
        Found → update · Not found → create
      </Tag>
    </AbsoluteFill>
  );
};

// 0:50.4 – 0:58.7  "Third, smart custom field updates. It keeps customer records clean by dynamically appending data."
export const AppendConceptScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pick = interpolate(frame, [5.2 * fps, 5.6 * fps], [0, 1], clamp);
  const field = (good: boolean): React.CSSProperties => ({
    marginTop: 18,
    padding: "18px 22px",
    borderRadius: 14,
    background: "#0B1324",
    fontSize: 30,
    fontWeight: 700,
    color: good ? colors.white : "#F28B82",
    fontFamily: "Menlo, Consolas, monospace",
  });
  return (
    <AbsoluteFill style={exitStyle(frame, fps, 7.9)}>
      <Heading at={0.9} top={210} eyebrow="STEP 3" title="Smart custom field updates" />
      <Card x={600} y={470} w={640} at={3.4} accent="#E8615A" style={{ opacity: 1 - 0.5 * pick }}>
        <div style={{ fontSize: 30, fontWeight: 800 }}>✕ Overwrite</div>
        <div style={{ fontSize: 22, color: colors.muted, marginTop: 6 }}>Items Owned</div>
        <div style={field(false)}>73513289</div>
        <div style={{ fontSize: 22, color: "#F28B82", marginTop: 12 }}>Order history lost</div>
      </Card>
      <Card
        x={1320}
        y={470}
        w={640}
        at={3.8}
        accent={colors.mint}
        style={{ boxShadow: `0 0 ${50 * pick}px rgba(129,201,149,0.5)`, scale: String(1 + 0.04 * pick) }}
      >
        <div style={{ fontSize: 30, fontWeight: 800 }}>✓ Append</div>
        <div style={{ fontSize: 22, color: colors.muted, marginTop: 6 }}>Items Owned</div>
        <div style={field(true)}>73513289, 7668679, 7658678</div>
        <div style={{ fontSize: 22, color: colors.mint, marginTop: 12 }}>Every past order kept</div>
      </Card>
    </AbsoluteFill>
  );
};

const Chip: React.FC<{ readonly children: React.ReactNode; readonly fresh?: boolean; readonly style?: React.CSSProperties }> = ({
  children,
  fresh = false,
  style,
}) => (
  <div
    style={{
      padding: "12px 20px",
      borderRadius: 12,
      background: fresh ? colors.green : "#22304F",
      color: "#fff",
      fontSize: 32,
      fontWeight: 700,
      fontFamily: "Menlo, Consolas, monospace",
      ...style,
    }}
  >
    {children}
  </div>
);

// 1:05.0 – 1:13.1  "…updates her primary order status and appends her latest order number…"
export const AppendHistoryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const swap = interpolate(frame, [0.8 * fps, 1.1 * fps], [0, 1], clamp);
  const fly = interpolate(frame, [3.6 * fps, 4.4 * fps], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const gap = interpolate(frame, [3.7 * fps, 4.2 * fps], [0, 1], clamp);

  return (
    <AbsoluteFill style={exitStyle(frame, fps, 7.7)}>
      <Card x={960} y={210} w={1100} at={0.2} accent={colors.blue}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 22, color: colors.muted }}>Primary order status · New Order #</div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 10 }}>
              <Chip style={{ opacity: 1 - swap, position: "absolute" }}>7668679</Chip>
              <Chip fresh style={{ opacity: swap }}>
                73513289
              </Chip>
            </div>
          </div>
          <Pill color={colors.blue} style={{ position: "relative", opacity: swap }}>
            Updated
          </Pill>
        </div>
      </Card>
      <Card x={960} y={440} w={1100} at={3.0} accent={colors.mint}>
        <div style={{ fontSize: 22, color: colors.muted }}>Items Owned · order history</div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 14, height: 60 }}>
          <div style={{ width: gap * 210, overflow: "visible" }} />
          <Chip>7668679</Chip>
          <span style={{ fontSize: 34, color: colors.muted, margin: "0 10px" }}>,</span>
          <Chip>7658678</Chip>
        </div>
      </Card>
      {/* The newest order number travels from the status field into the history */}
      <div
        style={{
          position: "absolute",
          left: interpolate(fly, [0, 1], [450, 448]),
          top: interpolate(fly, [0, 1], [300, 506]) - Math.sin(fly * Math.PI) * 60,
          opacity: interpolate(frame, [3.6 * fps, 3.7 * fps], [0, 1], clamp),
          display: "flex",
          alignItems: "center",
        }}
      >
        <Chip fresh>73513289</Chip>
        <span style={{ fontSize: 34, color: colors.muted, margin: "0 10px", opacity: gap }}>,</span>
      </div>
      <Tag x={1150} y={640} at={5.2} color={colors.green}>
        Comma-separated history
      </Tag>
      <div style={{ position: "absolute", left: 410, top: 700, ...springIn(frame, 5.6, fps) }}>
        <div style={{ fontSize: 22, color: colors.muted, marginBottom: 10 }}>In GoHighLevel</div>
        <Img
          src={staticFile("part3/items-owned.png")}
          style={{ width: 315 * 1.7, height: 92 * 1.7, borderRadius: 12, boxShadow: "0 20px 50px rgba(0,0,0,0.45)" }}
        />
      </div>
      <Tag x={1150} y={760} at={6.5} color="#B3261E">
        ✕ Never overwrites past records
      </Tag>
    </AbsoluteFill>
  );
};
