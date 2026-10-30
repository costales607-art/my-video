import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { Background } from "../OrderProcessingPart1/primitives";
import { AliasParseScene, NewClientScene, OnboardedPill, RoutingScene } from "./Graphics";
import { MasterFileScene } from "./MasterFile";
import {
  ForwardingScene,
  GhlSettingsScene,
  IntegrationsScene,
  LocationUrlScene,
  OpportunitiesScene,
  PipelineScene,
  SheetUrlScene,
} from "./Screens";
import { FIT } from "./shared";

// Scene starts follow the pauses in public/part2/voiceover.wav (81s, 2430 frames).
// MasterFileScene's sceneStart must equal its Sequence's start in seconds.
export const OrderProcessingPart2: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background />
      <Sequence name="New client" durationInFrames={3.4 * fps}>
        <NewClientScene />
      </Sequence>
      <Sequence name="Master File · Col A & B" from={3.2 * fps} durationInFrames={13.8 * fps}>
        <MasterFileScene
          sceneStart={3.2}
          enter="scale"
          camera={[
            [0, 959.5, 515, FIT],
            [5.1, 959.5, 515, FIT],
            [5.9, 463, 330, 1.9],
          ]}
          badgesAt={1.6}
          cues={[
            { col: "A", at: 5.3, until: 9.6, label: "Client Name" },
            { col: "B", at: 9.9, label: "Gmail Routing Identifier" },
          ]}
          cursor={[
            [0.6, 960, 600],
            [1.6, 112, 292],
            [4.3, 1305, 292],
            [5.5, 700, 450],
            [7.2, 112, 313],
            [10.3, 112, 313],
            [11.2, 293, 313],
          ]}
          clicks={[7.3, 11.3]}
        />
      </Sequence>
      <Sequence name="Alias routing graphic" from={16.9 * fps} durationInFrames={9.1 * fps}>
        <RoutingScene />
      </Sequence>
      <Sequence name="Gmail forwarding example" from={25.9 * fps} durationInFrames={4.7 * fps}>
        <ForwardingScene />
      </Sequence>
      <Sequence name="Alias lookup graphic" from={30.5 * fps} durationInFrames={6.9 * fps}>
        <AliasParseScene />
      </Sequence>
      <Sequence name="Master File · Col C" from={37.3 * fps} durationInFrames={3.5 * fps}>
        <MasterFileScene
          sceneStart={37.3}
          camera={[
            [0, 463, 330, 1.9],
            [0.7, 600, 330, 1.6],
          ]}
          cues={[{ col: "C", at: 0.4, label: "Spreadsheet ID" }]}
        />
      </Sequence>
      <Sequence name="Client sheet URL" from={40.7 * fps} durationInFrames={5.9 * fps}>
        <SheetUrlScene />
      </Sequence>
      <Sequence name="Master File · Col D" from={46.5 * fps} durationInFrames={4.5 * fps}>
        <MasterFileScene
          sceneStart={46.5}
          camera={[
            [0, 600, 330, 1.6],
            [0.5, 600, 330, 1.6],
            [1.3, 880, 330, 1.6],
          ]}
          cues={[{ col: "D", at: 1.3, label: "CRM Private API Key" }]}
        />
      </Sequence>
      <Sequence name="GoHighLevel · Settings" from={50.9 * fps} durationInFrames={4.6 * fps}>
        <GhlSettingsScene />
      </Sequence>
      <Sequence name="GoHighLevel · Private Integrations" from={55.4 * fps} durationInFrames={1.9 * fps}>
        <IntegrationsScene />
      </Sequence>
      <Sequence name="Master File · Col E" from={57.2 * fps} durationInFrames={3.5 * fps}>
        <MasterFileScene
          sceneStart={57.2}
          camera={[
            [0, 880, 330, 1.6],
            [0.4, 880, 330, 1.6],
            [1.2, 1130, 330, 1.6],
          ]}
          cues={[{ col: "E", at: 1.3, label: "Location ID" }]}
        />
      </Sequence>
      <Sequence name="GoHighLevel · Location ID" from={60.6 * fps} durationInFrames={6.6 * fps}>
        <LocationUrlScene />
      </Sequence>
      <Sequence name="Master File · Col F" from={67 * fps} durationInFrames={4.4 * fps}>
        <MasterFileScene
          sceneStart={67}
          camera={[
            [0, 1130, 330, 1.6],
            [0.5, 1130, 330, 1.6],
            [1.3, 1305, 330, 1.6],
          ]}
          cues={[{ col: "F", at: 1.3, label: "Pipeline ID" }]}
        />
      </Sequence>
      <Sequence name="GoHighLevel · Opportunities" from={71.3 * fps} durationInFrames={3.9 * fps}>
        <OpportunitiesScene />
      </Sequence>
      <Sequence name="GoHighLevel · Pipeline ID" from={75.1 * fps} durationInFrames={5 * fps}>
        <PipelineScene />
      </Sequence>
      <Sequence name="Onboarded" from={80 * fps} durationInFrames={1 * fps}>
        <MasterFileScene sceneStart={80} camera={[[0, 959.5, 515, FIT]]} checksAt={0.15} />
        <OnboardedPill />
      </Sequence>
      <Audio src={staticFile("part2/voiceover.wav")} />
    </AbsoluteFill>
  );
};
