import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Pill } from "../OrderProcessingPart1/primitives";
import { colors, font } from "../OrderProcessingPart1/theme";
import { clamp } from "../OrderProcessingPart2/shared";
import { Card, DrawPath, Masked, springIn, Svg, Tag } from "../OrderProcessingShared/kit";

const exitStyle = (frame: number, fps: number, at: number): React.CSSProperties => ({
  fontFamily: font,
  opacity: interpolate(frame, [at * fps, at * fps + 0.4 * fps], [1, 0], clamp),
});

const Heading: React.FC<{ readonly at: number; readonly eyebrow: string; readonly title: string; readonly top?: number }> = ({
  at,
  eyebrow,
  title,
  top = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top, width: "100%", textAlign: "center", ...springIn(frame, at, fps) }}>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 6, color: colors.sky }}>{eyebrow}</div>
      <div style={{ fontSize: 64, fontWeight: 800, color: colors.white, marginTop: 8 }}>{title}</div>
    </div>
  );
};

const TABS = ["CRM · Contacts", "CRM · Opportunities", "CRM · Custom Fields", "Receipt PDF"];

// 0:02.6 – 0:10.7  "Instead of manually cross-checking multiple CRM tabs… window-switching fatigue,"
export const TabFatigueScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = Math.floor(interpolate(frame, [0.4 * fps, 7.6 * fps], [0, 20], clamp)) % TABS.length;
  const loading = frame > 4.3 * fps;
  const spin = (frame * 12) % 360;
  return (
    <AbsoluteFill style={exitStyle(frame, fps, 7.7)}>
      <Heading at={0} eyebrow="THE OLD WAY" title="Cross-checking tab after tab" />
      <div
        style={{
          position: "absolute",
          left: 360,
          top: 330,
          width: 1200,
          height: 520,
          borderRadius: 18,
          background: "#fff",
          overflow: "hidden",
          boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
          ...springIn(frame, 0.2, fps),
        }}
      >
        <div style={{ display: "flex", gap: 6, padding: "12px 12px 0", background: "#DEE1E6" }}>
          {TABS.map((t, i) => (
            <div
              key={t}
              style={{
                padding: "12px 22px",
                borderRadius: "12px 12px 0 0",
                background: i === active ? "#fff" : "transparent",
                fontSize: 22,
                fontWeight: 600,
                color: "#3C4043",
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", inset: "64px 0 0 0", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
          {loading ? (
            <>
              <svg width={90} height={90} viewBox="0 0 50 50" style={{ rotate: `${spin}deg` }}>
                <circle cx={25} cy={25} r={20} fill="none" stroke="#DADCE0" strokeWidth={5} />
                <path d="M25 5 A20 20 0 0 1 45 25" fill="none" stroke={colors.blue} strokeWidth={5} strokeLinecap="round" />
              </svg>
              <div style={{ fontSize: 30, color: "#5F6368", fontWeight: 600 }}>Loading {TABS[active]}…</div>
            </>
          ) : (
            <div style={{ fontSize: 40, color: "#202124", fontWeight: 700 }}>{TABS[active]}</div>
          )}
        </div>
      </div>
      <Tag x={960} y={890} at={4.4} center color="#3A4660">
        Slow load times
      </Tag>
      <Tag x={960} y={960} at={6.0} center color="#B3261E">
        Window-switching fatigue
      </Tag>
    </AbsoluteFill>
  );
};

// 0:10.6 – 0:24.6  Checker tab chips along the bottom
export const CheckerChips: React.FC = () => {
  const items = [
    { t: "Dates", at: 6.9 },
    { t: "Order types", at: 8.5 },
    { t: "Monetary values", at: 9.4 },
    { t: "Event tags", at: 11.2 },
  ];
  return (
    <AbsoluteFill style={{ fontFamily: font }}>
      {items.map(({ t, at }, i) => (
        <Tag key={t} x={[170, 450, 760, 1110][i]} y={930} at={at} color={colors.green} size={26}>
          ✓ {t}
        </Tag>
      ))}
      <Tag x={1410} y={930} at={12.5} color={colors.blue} size={26}>
        One unified view
      </Tag>
    </AbsoluteFill>
  );
};

const FieldRow: React.FC<{ readonly name: string; readonly hot?: number; readonly fade?: boolean }> = ({ name, hot, fade }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const h = hot === undefined ? 0 : interpolate(frame, [hot * fps, hot * fps + 6], [0, 1], clamp);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 18px",
        marginTop: 10,
        borderRadius: 12,
        background: `rgba(26,115,232,${0.1 + 0.4 * h})`,
        outline: h > 0 ? `3px solid rgba(138,180,248,${h})` : undefined,
        opacity: fade ? 0.6 : 1,
      }}
    >
      <span style={{ fontSize: 28, fontWeight: 700 }}>{name}</span>
      <span style={{ fontSize: 20, fontFamily: "Menlo, Consolas, monospace" }}>
        <Masked n={8} />
      </span>
    </div>
  );
};

// 0:24.6 – 0:38.3  "Third, a Custom Field Puller… Customer Hash, while another uses Customer Number."
export const FieldKeysScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={exitStyle(frame, fps, 13.3)}>
      <Heading at={0.6} eyebrow="TOOL 3" title="Custom Field Puller" top={90} />
      <Card x={520} y={330} w={620} at={3.3} accent={colors.blue}>
        <div style={{ fontSize: 22, color: colors.muted }}>SUB-ACCOUNT · CLIENT A</div>
        <FieldRow name="Order Number" fade />
        <FieldRow name="Customer Hash" hot={10.1} />
        <FieldRow name="Event Name" fade />
      </Card>
      <Card x={1400} y={330} w={620} at={3.6} accent={colors.blue}>
        <div style={{ fontSize: 22, color: colors.muted }}>SUB-ACCOUNT · CLIENT B</div>
        <FieldRow name="Order Number" fade />
        <FieldRow name="Customer Number" hot={12.3} />
        <FieldRow name="Event Name" fade />
      </Card>
      <Tag x={960} y={270} at={4.4} center color="#3A4660" size={24}>
        Every sub-account has its own unique field keys
      </Tag>
      <Card x={960} y={760} w={520} at={10.6} accent={colors.mint} style={{ textAlign: "center" }}>
        <div style={{ fontSize: 22, color: colors.muted }}>RECEIPT VALUE</div>
        <div style={{ fontSize: 34, fontWeight: 800, marginTop: 6 }}>Customer #</div>
      </Card>
      <Svg>
        <DrawPath d="M 760 800 C 600 800, 520 700, 520 640" from={10.8} to={11.4} color={colors.mint} />
        <DrawPath d="M 1160 800 C 1320 800, 1400 700, 1400 640" from={12.5} to={13.1} color={colors.mint} />
      </Svg>
    </AbsoluteFill>
  );
};

const RECEIPT_FIELDS = ["Order Number", "Event Name", "Customer #"];

// 0:48.6 – 0:57.7  "This allows our automation to dynamically map receipt data… without manual code adjustments."
export const MappingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={exitStyle(frame, fps, 8.7)}>
      <Heading at={0} eyebrow="DYNAMIC MAPPING" title="Receipt data → the right field, any client" top={90} />
      {RECEIPT_FIELDS.map((f, i) => (
        <Card key={f} x={360} y={330 + i * 170} w={420} at={0.2 + i * 0.15} accent={colors.mint}>
          <div style={{ fontSize: 30, fontWeight: 800 }}>{f}</div>
        </Card>
      ))}
      {["Client A", "Client B"].map((c, k) => (
        <React.Fragment key={c}>
          <div style={{ position: "absolute", left: 1060 + k * 430, top: 270, fontSize: 24, fontWeight: 700, color: colors.sky, ...springIn(frame, 0.4, fps) }}>
            {c.toUpperCase()}
          </div>
          {RECEIPT_FIELDS.map((f, i) => (
            <Card key={f} x={1230 + k * 430} y={330 + i * 170} w={380} at={0.5 + i * 0.15 + k * 0.2} accent={colors.blue}>
              <div style={{ fontSize: 20, color: colors.muted }}>Field ID</div>
              <div style={{ fontSize: 24, marginTop: 4, fontFamily: "Menlo, Consolas, monospace" }}>
                <Masked n={12} />
              </div>
            </Card>
          ))}
        </React.Fragment>
      ))}
      <Svg>
        {RECEIPT_FIELDS.map((f, i) => (
          <React.Fragment key={f}>
            <DrawPath d={`M 572 ${385 + i * 170} L 1038 ${385 + i * 170}`} from={0.8 + i * 0.5} to={1.4 + i * 0.5} color={colors.mint} width={4} />
            <DrawPath
              d={`M 572 ${385 + i * 170} C 800 ${385 + i * 170}, 900 ${300 + i * 170}, 1050 ${300 + i * 170} L 1468 ${300 + i * 170}`}
              from={1.2 + i * 0.5}
              to={1.9 + i * 0.5}
              color={colors.sky}
              width={3}
            />
          </React.Fragment>
        ))}
      </Svg>
      <Tag x={960} y={850} at={6.0} center color={colors.blue}>
        Works across any client account
      </Tag>
      <Tag x={960} y={930} at={7.4} center color={colors.green}>
        ✓ No manual code changes
      </Tag>
    </AbsoluteFill>
  );
};

const PARTS = ["System Overview", "Client Onboarding", "Core Backend Operations", "Dynamic Line Parser", "Health Checker & Field Puller"];

// 0:57.6 – 1:10.0  "And that completes the full architecture of our order-processing automation system."
export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ fontFamily: font, opacity: interpolate(frame, [11.4 * fps, 12.4 * fps], [1, 0], clamp) }}>
      <Heading at={0.2} eyebrow="ORDER-PROCESSING AUTOMATION" title="The full architecture" top={90} />
      {PARTS.map((p, i) => {
        const check = interpolate(frame, [(1.2 + i * 0.6) * fps, (1.2 + i * 0.6) * fps + 8], [0, 1], {
          ...clamp,
          easing: Easing.out(Easing.back(2)),
        });
        return (
          <div
            key={p}
            style={{
              position: "absolute",
              left: 560,
              top: 290 + i * 110,
              width: 800,
              height: 90,
              borderRadius: 20,
              background: colors.card,
              border: `3px solid ${check > 0.5 ? colors.mint : colors.cardBorder}`,
              display: "flex",
              alignItems: "center",
              gap: 26,
              padding: "0 30px",
              boxSizing: "border-box",
              ...springIn(frame, 0.5 + i * 0.15, fps),
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 800, color: colors.sky, width: 90 }}>PART {i + 1}</div>
            <div style={{ fontSize: 34, fontWeight: 700, color: colors.white, flex: 1 }}>{p}</div>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: colors.green,
                color: "#fff",
                fontSize: 32,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                scale: String(check),
              }}
            >
              ✓
            </div>
          </div>
        );
      })}
      <div style={{ position: "absolute", top: 870, width: "100%", display: "flex", justifyContent: "center" }}>
        <Pill
          color={colors.green}
          style={{
            position: "relative",
            fontSize: 42,
            padding: "20px 44px",
            opacity: interpolate(frame, [4.3 * fps, 4.5 * fps], [0, 1], clamp),
            scale: String(
              interpolate(frame, [4.3 * fps, 4.7 * fps], [0.6, 1], { ...clamp, easing: Easing.out(Easing.back(2)) }) *
                (1 + 0.02 * Math.sin(frame / 12)),
            ),
            boxShadow: "0 0 50px rgba(30,142,62,0.55)",
          }}
        >
          ✓ Automation Architecture Complete
        </Pill>
      </div>
    </AbsoluteFill>
  );
};
