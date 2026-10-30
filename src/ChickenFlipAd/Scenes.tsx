import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Background } from "./Background";
import { body, colors, headline } from "./theme";

const center: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
};

// 1. Hook — words slam in, drumstick bounces up
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background from="#5A2207" to={colors.roast} rayColor="rgba(255,122,0,0.18)" />
      <AbsoluteFill style={center}>
        <Interactive.Div
          name="Hook question"
          style={{
            fontFamily: body,
            fontWeight: 800,
            fontSize: 64,
            color: colors.cream,
            letterSpacing: 2,
            opacity: interpolate(frame, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [0, 12], ["0px 40px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          NAGHAHANAP KA BA NG
        </Interactive.Div>
        <Interactive.Div
          name="Hook CHICKEN"
          style={{
            fontFamily: headline,
            fontSize: 250,
            lineHeight: 1,
            marginTop: 20,
            color: colors.gold,
            textShadow: `0 12px 0 ${colors.red}`,
            opacity: interpolate(frame, [10, 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [10, 22], [2.4, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 12 }),
              output: "perceptual-scale",
            }),
          }}
        >
          CHICKEN
        </Interactive.Div>
        <Interactive.Div
          name="Hook BREAST"
          style={{
            fontFamily: headline,
            fontSize: 250,
            lineHeight: 1,
            color: colors.cream,
            textShadow: `0 12px 0 ${colors.red}`,
            opacity: interpolate(frame, [20, 24], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [20, 32], [2.4, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 12 }),
              output: "perceptual-scale",
            }),
          }}
        >
          BREAST?
        </Interactive.Div>
        <Interactive.Div
          name="Drumstick"
          style={{
            fontSize: 300,
            marginTop: 60,
            translate: interpolate(frame, [34, 54], ["0px 900px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 10 }),
            }),
            rotate: `${Math.sin(frame / 5) * 10}deg`,
          }}
        >
          🍗
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// 2. Brand — logo flips in on the X axis with a gold glow
export const BrandScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background from="#3A2405" to="#000000" rayColor="rgba(255,194,61,0.16)" />
      <AbsoluteFill style={{ ...center, perspective: 1400 }}>
        <Interactive.Div
          name="Logo glow"
          style={{
            position: "absolute",
            width: 1100,
            height: 1100,
            top: 260,
            borderRadius: "50%",
            background: "radial-gradient(circle, #000000 0%, #000000 34%, rgba(255,194,61,0.35) 48%, transparent 68%)",
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Logo"
          style={{
            rotate: `x ${interpolate(frame, [0, 22], [-100, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 9 }),
            })}deg`,
          }}
        >
          <CanvasImage
            src={staticFile("chicken-flip-logo.png")}
            style={{ width: 900, height: 917 }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Tagline"
          style={{
            marginTop: 40,
            padding: "22px 44px",
            borderRadius: 999,
            backgroundColor: colors.gold,
            color: "#000000",
            fontFamily: body,
            fontWeight: 800,
            fontSize: 46,
            opacity: interpolate(frame, [24, 36], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [24, 40], ["0px 60px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          MAIN SUPPLIER OF CHICKEN BREAST 💎🔥
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Feature: React.FC<{
  readonly name: string;
  readonly delay: number;
  readonly icon: string;
  readonly title: string;
  readonly sub: string;
}> = ({ name, delay, icon, title, sub }) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 36,
        width: 900,
        padding: "36px 44px",
        borderRadius: 40,
        backgroundColor: colors.cream,
        boxShadow: `0 14px 0 ${colors.red}`,
        textAlign: "left",
        opacity: interpolate(frame, [delay, delay + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [delay, delay + 18], ["-1200px 0px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 14 }),
        }),
      }}
    >
      <div
        style={{
          width: 150,
          height: 150,
          flexShrink: 0,
          borderRadius: "50%",
          backgroundColor: colors.gold,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 86,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: headline, fontSize: 70, color: colors.red, lineHeight: 1.05 }}>
          {title}
        </div>
        <div style={{ fontFamily: body, fontWeight: 600, fontSize: 36, color: colors.roast, marginTop: 8 }}>
          {sub}
        </div>
      </div>
    </Interactive.Div>
  );
};

// 3. Why us — three cards slide in one after another
export const WhyScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background from="#5A2207" to={colors.roast} rayColor="rgba(255,122,0,0.15)" />
      <AbsoluteFill style={{ ...center, gap: 56 }}>
        <Interactive.Div
          name="Why title"
          style={{
            fontFamily: headline,
            fontSize: 120,
            color: colors.gold,
            marginBottom: 20,
            opacity: interpolate(frame, [0, 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          BAKIT CHICKEN FLIP?
        </Interactive.Div>
        <Feature
          name="Feature fresh"
          delay={10}
          icon="🍗"
          title="FRESH & QUALITY CUTS"
          sub="Juicy chicken breast, every order"
        />
        <Feature
          name="Feature bulk"
          delay={28}
          icon="📦"
          title="BULK & WHOLESALE"
          sub="For restos, resellers & kusina"
        />
        <Feature
          name="Feature delivery"
          delay={46}
          icon="🛵"
          title="DELIVERY SA MANILA"
          sub="Hanggang NAIA, ihahatid namin!"
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// 4. Hours — Mon–Sat chips light up, Sunday dims as rest day
export const HoursScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background from={colors.gold} to={colors.flame} rayColor="rgba(255,255,255,0.22)" />
      <AbsoluteFill style={center}>
        <Interactive.Div
          name="OPEN"
          style={{
            fontFamily: headline,
            fontSize: 360,
            lineHeight: 1,
            color: colors.roast,
            scale: interpolate(frame, [0, 14], [0.4, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 11 }),
              output: "perceptual-scale",
            }),
          }}
        >
          OPEN
        </Interactive.Div>
        <Interactive.Div
          name="Open days"
          style={{
            fontFamily: headline,
            fontSize: 110,
            color: colors.red,
            opacity: interpolate(frame, [8, 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          MONDAY – SATURDAY
        </Interactive.Div>
        <div style={{ display: "flex", gap: 14, marginTop: 60 }}>
          {days.map((day, i) => {
            const isSunday = day === "SUN";
            const start = 20 + i * 5;
            return (
              <div
                key={day}
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: 28,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: body,
                  fontWeight: 800,
                  fontSize: 36,
                  backgroundColor: isSunday ? "rgba(30,14,5,0.25)" : colors.roast,
                  color: isSunday ? "rgba(30,14,5,0.55)" : colors.gold,
                  textDecoration: isSunday ? "line-through" : "none",
                  scale: interpolate(frame, [start, start + 10], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.spring({ damping: 10 }),
                    output: "perceptual-scale",
                  }),
                }}
              >
                {day}
              </div>
            );
          })}
        </div>
        <Interactive.Div
          name="Hours note"
          style={{
            marginTop: 60,
            fontFamily: body,
            fontWeight: 800,
            fontSize: 48,
            color: colors.roast,
            opacity: interpolate(frame, [58, 70], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Bukas anytime, Mon–Sat 💙
          <div style={{ marginTop: 8 }}>Sunday = Rest Day 🙏</div>
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// 5. Faith + CTA — Psalm 91, then pulsing order button with phone number
export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background from={colors.red} to={colors.roast} rayColor="rgba(255,194,61,0.16)" />
      <AbsoluteFill style={{ ...center, padding: "0 80px" }}>
        <Interactive.Div
          name="CTA logo"
          style={{
            marginBottom: 40,
            opacity: interpolate(frame, [0, 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CanvasImage
            src={staticFile("chicken-flip-logo.png")}
            style={{ width: 280, height: 285 }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Psalm verse"
          style={{
            fontFamily: body,
            fontWeight: 600,
            fontSize: 44,
            lineHeight: 1.4,
            color: colors.cream,
            opacity: interpolate(frame, [0, 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          “He who dwells in the secret place of the Most High will rest in the
          shadow of the Almighty.”
          <div style={{ color: colors.gold, fontWeight: 800, marginTop: 16 }}>
            — Psalm 91:1 🤍🙌🙏
          </div>
        </Interactive.Div>
        <Interactive.Div
          name="ORDER NA"
          style={{
            marginTop: 70,
            fontFamily: headline,
            fontSize: 220,
            whiteSpace: "nowrap",
            lineHeight: 1,
            color: colors.gold,
            textShadow: `0 12px 0 ${colors.flame}`,
            opacity: interpolate(frame, [36, 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [36, 50], [2, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 12 }),
              output: "perceptual-scale",
            }),
          }}
        >
          ORDER NA!
        </Interactive.Div>
        <Interactive.Div
          name="Phone button"
          style={{
            marginTop: 50,
            padding: "34px 64px",
            borderRadius: 999,
            backgroundColor: colors.gold,
            boxShadow: `0 14px 0 ${colors.flame}`,
            fontFamily: headline,
            fontSize: 96,
            color: colors.roast,
            opacity: interpolate(frame, [50, 58], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [50, 66], ["0px 120px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            scale: frame > 70 ? 1 + Math.sin((frame - 70) / 5) * 0.04 : 1,
          }}
        >
          📞 0910 955 1052
        </Interactive.Div>
        <Interactive.Div
          name="Facebook line"
          style={{
            marginTop: 70,
            fontFamily: body,
            fontWeight: 800,
            fontSize: 44,
            color: colors.cream,
            opacity: interpolate(frame, [66, 78], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Message us on Facebook
          <div style={{ fontFamily: headline, fontWeight: 400, fontSize: 80, color: colors.gold, marginTop: 8 }}>
            CHICKEN FLIP · MANILA
          </div>
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
