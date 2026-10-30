import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../OrderProcessingPart1/primitives";
import { clamp } from "../OrderProcessingPart2/shared";
import { SectionTitle, SHEET_URL_ID, ShotScene, wide, WIN_FULL } from "../OrderProcessingShared/kit";
import { CheckerChips, FieldKeysScene, MappingScene, OutroScene, TabFatigueScene } from "./Graphics";

const shots5 = {
  checker: { src: "part5/checker.png", w: 1912, h: 1035 },
  puller: { src: "part5/field-puller.png", w: 1918, h: 1032 },
};

// Rows of custom fields appear top to bottom, as if just pulled from the API
const RowReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const h = interpolate(frame, [5.0 * fps, 7.3 * fps], [645, 0], clamp);
  return <div style={{ position: "absolute", left: 41, top: 291 + 645 - h, width: 835, height: h, background: "#fff" }} />;
};

// Scene starts follow the pauses in public/part5/voiceover.wav (62s of speech + 8s outro hold = 70s)
export const OrderProcessingPart5: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background />
      <Sequence name="Tool 2 title" durationInFrames={2.8 * fps}>
        <SectionTitle eyebrow="PART 5 · TOOL 2" title="System Health Checker" exitAt={2.4} />
      </Sequence>
      <Sequence name="Tab fatigue" from={2.6 * fps} durationInFrames={8.1 * fps}>
        <TabFatigueScene />
      </Sequence>
      <Sequence name="Checker tab" from={10.6 * fps} durationInFrames={14 * fps}>
        <ShotScene
          shot={shots5.checker}
          enter="whip"
          exitAt={13.6}
          camera={[wide(shots5.checker, WIN_FULL), [4.2, 956, 517.5, WIN_FULL.width / 1912], [5.0, 560, 560, 1.6]]}
          covers={[SHEET_URL_ID, { x: 943, y: 291, w: 548, h: 566 }]}
          marks={[
            { r: { x: 223, y: 271, w: 90, h: 586 }, at: 6.9 },
            { r: { x: 314, y: 271, w: 90, h: 586 }, at: 8.5 },
            { r: { x: 405, y: 271, w: 338, h: 586 }, at: 9.4 },
            { r: { x: 744, y: 271, w: 199, h: 586 }, at: 11.2 },
          ]}
          labels={[{ x: 470, y: 975, at: 3.5, until: 4.6, text: "Dedicated Checker tab" }]}
          cursor={[
            [0.6, 1200, 700],
            [3.2, 415, 1016],
            [4.4, 415, 1016],
            [5.6, 600, 640],
          ]}
          clicks={[3.3]}
        />
      </Sequence>
      <Sequence name="Checker highlights" from={10.6 * fps} durationInFrames={14 * fps}>
        <CheckerChipsWithExit />
      </Sequence>
      <Sequence name="Field keys" from={24.6 * fps} durationInFrames={13.7 * fps}>
        <FieldKeysScene />
      </Sequence>
      <Sequence name="Custom Field Puller sheet" from={38.2 * fps} durationInFrames={10.5 * fps}>
        <ShotScene
          shot={shots5.puller}
          enter="scale"
          exitAt={10.1}
          camera={[wide(shots5.puller, WIN_FULL), [0.8, 959, 516, WIN_FULL.width / 1918], [1.6, 590, 560, 1.5]]}
          covers={[SHEET_URL_ID, { x: 131, y: 291, w: 159, h: 645 }, { x: 529, y: 291, w: 166, h: 645 }, { x: 126, y: 225, w: 140, h: 18 }]}
          marks={[
            { r: { x: 290, y: 271, w: 239, h: 665 }, at: 6.3 },
            { r: { x: 529, y: 271, w: 166, h: 665 }, at: 8.0 },
          ]}
          labels={[
            { x: 860, y: 330, at: 0.4, until: 4.8, text: "API → client's sub-account" },
            { x: 860, y: 390, at: 6.4, text: "Active custom fields" },
            { x: 860, y: 450, at: 8.1, text: "Unique Field IDs (masked)", color: "#1E8E3E" },
          ]}
        >
          <RowReveal />
        </ShotScene>
      </Sequence>
      <Sequence name="Dynamic mapping" from={48.6 * fps} durationInFrames={9.1 * fps}>
        <MappingScene />
      </Sequence>
      <Sequence name="Outro" from={57.6 * fps} durationInFrames={12.4 * fps}>
        <OutroScene />
      </Sequence>
      <Audio src={staticFile("part5/voiceover.wav")} />
    </AbsoluteFill>
  );
};

const CheckerChipsWithExit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ opacity: interpolate(frame, [13.6 * fps, 14 * fps], [1, 0], clamp) }}>
      <CheckerChips />
    </AbsoluteFill>
  );
};
