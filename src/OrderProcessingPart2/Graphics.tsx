import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { ease, glide, Pill, SheetIcon } from "../OrderProcessingPart1/primitives";
import { colors, font } from "../OrderProcessingPart1/theme";
import { clamp } from "./shared";

const springIn = (frame: number, at: number, fps: number) => ({
  opacity: interpolate(frame, [at * fps, at * fps + 8], [0, 1], clamp),
  translate: interpolate(frame, [at * fps, at * fps + 0.6 * fps], ["0px 40px", "0px 0px"], {
    ...clamp,
    easing: Easing.spring({ damping: 14 }),
  }),
});

const exitFade = (frame: number, from: number, to: number, fps: number) =>
  interpolate(frame, [from * fps, to * fps], [1, 0], clamp);

const Heading: React.FC<{ readonly eyebrow: string; readonly title: string }> = ({
  eyebrow,
  title,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top: 70, width: "100%", textAlign: "center", ...springIn(frame, 0.1, fps) }}>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 6, color: colors.sky }}>{eyebrow}</div>
      <div style={{ fontSize: 60, fontWeight: 800, color: colors.white, marginTop: 8 }}>{title}</div>
    </div>
  );
};

const Node: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly at: number;
  readonly accent: string;
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly children?: React.ReactNode;
}> = ({ x, y, w, at, accent, icon, title, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: x - w / 2,
        top: y,
        width: w,
        borderRadius: 24,
        background: colors.card,
        border: `3px solid ${accent}`,
        padding: "26px 30px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        gap: 22,
        ...springIn(frame, at, fps),
      }}
    >
      {icon}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 34, fontWeight: 800, color: colors.white }}>{title}</div>
        {children}
      </div>
    </div>
  );
};

const MailIcon: React.FC<{ readonly size: number; readonly color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <rect x={2} y={4.5} width={20} height={15} rx={2.5} fill={color} />
    <path d="M3 6.5 L12 13 L21 6.5" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinejoin="round" />
  </svg>
);

const CrmIcon: React.FC<{ readonly size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <rect x={2} y={2} width={20} height={20} rx={5} fill={colors.blue} />
    <circle cx={12} cy={9.5} r={3.2} fill="#fff" />
    <path d="M6 18.5 C6.8 14.8 17.2 14.8 18 18.5" fill="#fff" />
  </svg>
);

const Arrow: React.FC<{ readonly d: string; readonly from: number; readonly to: number }> = ({
  d,
  from,
  to,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <path
      d={d}
      fill="none"
      stroke={colors.sky}
      strokeWidth={5}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray="1"
      strokeDashoffset={interpolate(frame, [from * fps, to * fps], [1, 0], { ...clamp, easing: glide })}
    />
  );
};

// 0:41.0 – 0:44.4  "Adding a new client to our system is fast and simple."
export const NewClientScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        fontFamily: font,
        justifyContent: "center",
        alignItems: "center",
        opacity: exitFade(frame, 3.0, 3.4, fps),
        scale: interpolate(frame, [3.0 * fps, 3.4 * fps], [1, 1.08], clamp),
      }}
    >
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 6, color: colors.sky, ...springIn(frame, 0, fps) }}>
        PART 2 · CLIENT ONBOARDING
      </div>
      <div
        style={{
          marginTop: 40,
          display: "flex",
          alignItems: "center",
          gap: 26,
          padding: "30px 44px",
          borderRadius: 26,
          background: colors.card,
          border: `3px solid ${colors.mint}`,
          ...springIn(frame, 0.3, fps),
        }}
      >
        <SheetIcon size={88} />
        <div>
          <div style={{ fontSize: 48, fontWeight: 800, color: colors.white }}>Josh Razizer</div>
          <div style={{ fontSize: 26, color: colors.muted, marginTop: 4 }}>New client</div>
        </div>
        <div
          style={{
            marginLeft: 20,
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: colors.green,
            color: "#fff",
            fontSize: 56,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scale: String(
              interpolate(frame, [0.9 * fps, 1.2 * fps, 1.5 * fps], [0, 1.2, 1], clamp),
            ),
          }}
        >
          +
        </div>
      </div>
      <Pill style={{ position: "relative", marginTop: 46, ...springIn(frame, 1.6, fps) }}>
        Fast &amp; simple — one row in the Master File
      </Pill>
    </AbsoluteFill>
  );
};

// 0:57.9 – 1:07.5  "To link incoming order receipts to the right client… with a plus tag."
export const RoutingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const travel = interpolate(frame, [3.4 * fps, 5.8 * fps], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const tagIn = interpolate(frame, [7.0 * fps, 7.5 * fps], [0, 1], { ...clamp, easing: ease });

  return (
    <AbsoluteFill style={{ fontFamily: font, opacity: exitFade(frame, 8.7, 9.1, fps) }}>
      <Heading eyebrow="HOW RECEIPTS FIND THEIR CLIENT" title="Email Alias Routing" />
      <Node x={470} y={420} w={560} at={0.4} accent={colors.cardBorder} icon={<MailIcon size={84} color="#EA4335" />} title="Josh's inbox">
        <div style={{ fontSize: 24, color: colors.muted, marginTop: 4 }}>Receives order receipts</div>
      </Node>
      <Node x={1450} y={420} w={620} at={1.0} accent={colors.blue} icon={<MailIcon size={84} color={colors.blue} />} title="System inbox">
        <div style={{ fontSize: 28, fontWeight: 700, color: colors.sky, marginTop: 6, whiteSpace: "nowrap" }}>
          dev
          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              maxWidth: tagIn * 90,
              color: colors.white,
              background: `rgba(30,142,62,${0.9 * tagIn})`,
              borderRadius: 8,
              padding: tagIn > 0 ? "0 6px" : 0,
            }}
          >
            +josh
          </span>
          @avidvs.com
        </div>
      </Node>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <Arrow d="M 760 505 L 1130 505" from={1.6} to={2.6} />
        <path d="M 1112 490 L 1136 505 L 1112 520" fill="none" stroke={colors.sky} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={interpolate(frame, [2.5 * fps, 2.7 * fps], [0, 1], clamp)} />
      </svg>
      <Pill
        color={colors.card}
        style={{
          left: 945,
          top: 420,
          translate: "-50% 0",
          border: `2px solid ${colors.cardBorder}`,
          fontSize: 22,
          opacity: interpolate(frame, [2.2 * fps, 2.5 * fps], [0, 1], clamp),
        }}
      >
        Auto-forward
      </Pill>
      <div
        style={{
          position: "absolute",
          left: 760 + travel * 370,
          top: 505,
          translate: "-50% -50%",
          opacity: interpolate(frame, [3.3 * fps, 3.5 * fps, 5.7 * fps, 5.9 * fps], [0, 1, 1, 0], clamp),
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "#fff",
          color: "#202124",
          borderRadius: 12,
          padding: "10px 16px",
          fontSize: 22,
          fontWeight: 700,
          boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
        }}
      >
        <MailIcon size={30} color="#EA4335" />
        Order Receipt
      </div>
      <div
        style={{
          position: "absolute",
          top: 700,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          ...springIn(frame, 7.6, fps),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 34,
            color: colors.white,
            fontWeight: 600,
          }}
        >
          <Pill color={colors.green} style={{ position: "relative", fontSize: 34 }}>
            +tag
          </Pill>
          = a custom alias for each client
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 1:12.0 – 1:18.6  "This tag tells the script exactly which client… and which CRM account…"
export const AliasParseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lift = interpolate(frame, [0.6 * fps, 1.3 * fps], [0, 1], { ...clamp, easing: ease });

  return (
    <AbsoluteFill style={{ fontFamily: font, opacity: exitFade(frame, 6.5, 6.9, fps) }}>
      <Heading eyebrow="WHAT THE SCRIPT READS" title="One tag → one client" />
      <div
        style={{
          position: "absolute",
          top: 250,
          width: "100%",
          textAlign: "center",
          fontSize: 64,
          fontWeight: 800,
          color: colors.white,
          ...springIn(frame, 0.2, fps),
        }}
      >
        dev
        <span
          style={{
            color: colors.mint,
            textShadow: `0 0 ${lift * 30}px rgba(129,201,149,0.8)`,
          }}
        >
          +josh
        </span>
        @avidvs.com
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <Arrow d="M 960 345 L 960 430" from={0.8} to={1.4} />
        <Arrow d="M 960 560 C 960 640, 560 640, 560 700" from={2.3} to={3.0} />
        <Arrow d="M 960 560 C 960 640, 1360 640, 1360 700" from={4.0} to={4.7} />
      </svg>
      <Node x={960} y={430} w={700} at={1.2} accent={colors.blue} icon={<SheetIcon size={76} color={colors.blue} />} title="Master File lookup">
        <div style={{ fontSize: 26, color: colors.muted, marginTop: 4 }}>
          Client Name: <b style={{ color: colors.white }}>AVID TEST (Josh)</b>
        </div>
      </Node>
      <Node x={560} y={700} w={640} at={2.8} accent={colors.mint} icon={<SheetIcon size={76} />} title="Which client">
        <div style={{ fontSize: 24, color: colors.muted, marginTop: 4 }}>Owns the incoming receipt</div>
      </Node>
      <Node x={1360} y={700} w={640} at={4.5} accent={colors.blue} icon={<CrmIcon size={76} />} title="Which CRM account">
        <div style={{ fontSize: 24, color: colors.muted, marginTop: 4 }}>Josh&apos;s GoHighLevel sub-account</div>
      </Node>
    </AbsoluteFill>
  );
};

// Last second: "Client onboarded"
export const OnboardedPill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 110, fontFamily: font }}>
      <Pill
        color={colors.green}
        style={{
          position: "relative",
          fontSize: 40,
          padding: "18px 40px",
          opacity: interpolate(frame, [0.15 * fps, 0.3 * fps], [0, 1], clamp),
          scale: String(
            interpolate(frame, [0.15 * fps, 0.45 * fps], [0.6, 1], {
              ...clamp,
              easing: Easing.out(Easing.back(2)),
            }),
          ),
        }}
      >
        ✓ Client onboarded
      </Pill>
    </AbsoluteFill>
  );
};
