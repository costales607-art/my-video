import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { OrderProcessingPart1 } from "./OrderProcessingPart1/OrderProcessingPart1";
import { OrderProcessingPart2 } from "./OrderProcessingPart2/OrderProcessingPart2";
import { OrderProcessingPart3 } from "./OrderProcessingPart3/OrderProcessingPart3";
import { OrderProcessingPart4 } from "./OrderProcessingPart4/OrderProcessingPart4";
import { OrderProcessingPart5 } from "./OrderProcessingPart5/OrderProcessingPart5";

// Parts 1–5 back to back: 41 + 81 + 87 + 55 + 70 = 334s (10,020 frames)
export const OrderProcessingFull: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sequence name="Part 1 · Overview" durationInFrames={41 * fps}>
        <OrderProcessingPart1 />
      </Sequence>
      <Sequence name="Part 2 · Client onboarding" from={41 * fps} durationInFrames={81 * fps}>
        <OrderProcessingPart2 />
      </Sequence>
      <Sequence name="Part 3 · Backend operations" from={122 * fps} durationInFrames={87 * fps}>
        <OrderProcessingPart3 />
      </Sequence>
      <Sequence name="Part 4 · Line parser" from={209 * fps} durationInFrames={55 * fps}>
        <OrderProcessingPart4 />
      </Sequence>
      <Sequence name="Part 5 · Checker & field puller" from={264 * fps} durationInFrames={70 * fps}>
        <OrderProcessingPart5 />
      </Sequence>
    </AbsoluteFill>
  );
};
