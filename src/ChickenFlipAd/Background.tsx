import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  readonly from: string;
  readonly to: string;
  readonly rayColor: string;
};

// Radial glow with slowly turning sunburst rays behind each scene
export const Background: React.FC<Props> = ({ from, to, rayColor }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 45%, ${from} 0%, ${to} 75%)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          width: 3200,
          height: 3200,
          marginLeft: -1600,
          marginTop: -1600,
          background: `repeating-conic-gradient(${rayColor} 0deg 9deg, transparent 9deg 22.5deg)`,
          maskImage: "radial-gradient(circle, black 0%, transparent 60%)",
          rotate: `${interpolate(frame, [0, durationInFrames], [0, 25])}deg`,
        }}
      />
    </AbsoluteFill>
  );
};
