import { Composition } from "remotion";
import { ChickenFlipAd } from "./ChickenFlipAd/ChickenFlipAd";
import { MyComposition } from "./Composition";
import { OrderProcessingPart1 } from "./OrderProcessingPart1/OrderProcessingPart1";
import { OrderProcessingPart2 } from "./OrderProcessingPart2/OrderProcessingPart2";
import { OrderProcessingPart3 } from "./OrderProcessingPart3/OrderProcessingPart3";
import { OrderProcessingPart4 } from "./OrderProcessingPart4/OrderProcessingPart4";
import { OrderProcessingPart5 } from "./OrderProcessingPart5/OrderProcessingPart5";
import { OrderProcessingFull } from "./OrderProcessingFull";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Composition
        id="OrderProcessingPart1"
        component={OrderProcessingPart1}
        durationInFrames={1230}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="OrderProcessingPart2"
        component={OrderProcessingPart2}
        durationInFrames={2430}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="OrderProcessingPart3"
        component={OrderProcessingPart3}
        durationInFrames={2610}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="OrderProcessingPart4"
        component={OrderProcessingPart4}
        durationInFrames={1650}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="OrderProcessingPart5"
        component={OrderProcessingPart5}
        durationInFrames={2100}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="OrderProcessingFull"
        component={OrderProcessingFull}
        durationInFrames={10020}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
