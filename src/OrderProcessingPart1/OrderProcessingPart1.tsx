import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { Background } from "./primitives";
import {
  ArchitectureScene,
  ClientExampleScene,
  DriveScene,
  FolderScene,
  GmailScene,
  MasterFileCutaway,
  TitleScene,
} from "./Scenes";

// Scene starts follow the pauses in public/part1/voiceover.wav (41s, 1230 frames)
export const OrderProcessingPart1: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background />
      <Sequence name="Title" durationInFrames={6 * fps}>
        <TitleScene />
      </Sequence>
      <Sequence name="Gmail backend" from={5.4 * fps} durationInFrames={8.2 * fps}>
        <GmailScene />
      </Sequence>
      <Sequence name="Google Drive" from={13.2 * fps} durationInFrames={5.5 * fps}>
        <DriveScene />
      </Sequence>
      <Sequence name="Order Processing File" from={18.5 * fps} durationInFrames={5.1 * fps}>
        <FolderScene />
      </Sequence>
      <Sequence name="Two-tier diagram" from={23.4 * fps} durationInFrames={17.6 * fps}>
        <ArchitectureScene />
      </Sequence>
      <Sequence name="Master File cutaway" from={30.9 * fps} durationInFrames={2.5 * fps}>
        <MasterFileCutaway />
      </Sequence>
      <Sequence name="Client file example" from={38.8 * fps} durationInFrames={2.2 * fps}>
        <ClientExampleScene />
      </Sequence>
      <Audio src={staticFile("part1/voiceover.wav")} />
    </AbsoluteFill>
  );
};
