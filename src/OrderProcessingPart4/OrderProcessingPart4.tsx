import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { Background } from "../OrderProcessingPart1/primitives";
import { Rect, SCRIPT_URL_ID, SHEET_URL_ID, ShotScene, Tag, Win, wide, WIN_FULL } from "../OrderProcessingShared/kit";
import { FallbackLadderScene, LadderPanel, LayoutsScene, ToolsIntroScene } from "./Graphics";

const shots4 = {
  code: { src: "part4/code.png", w: 1919, h: 1034 },
  cond1: { src: "part4/receipt-cond1.png", w: 1916, h: 1035 },
  cond2: { src: "part4/receipt-cond2.png", w: 1915, h: 1035 },
  cond3: { src: "part4/receipt-cond3.png", w: 1919, h: 1034 },
};

// Receipt screenshots sit left of the condition panel
const WIN_LEFT: Win = { left: 50, top: 170, width: 1380, height: 745 };

/** Rect for "[Line n]" text in column S, given line 1's center and the line pitch */
const line = (first: number, pitch: number, n: number, x = 1038, w = 735): Rect => ({
  x,
  y: first + (n - 1) * pitch - 7.5,
  w,
  h: 15,
});
/** Covers the content (not the "[Line n]:" label) of the given lines */
const lineCovers = (first: number, pitch: number, ns: number[]): Rect[] => ns.map((n) => line(first, pitch, n, 1097, 676));

// Columns I–P hold names, emails, phones and addresses
const PEOPLE_COLUMNS: Rect = { x: 41, y: 271, w: 722, h: 718 };

const COND1_COVERS = [SHEET_URL_ID, PEOPLE_COLUMNS, ...lineCovers(416, 14.38, [5, 7, 9, 12, 14, 19, 20, 21, 22])];
const COND2_COVERS = [SHEET_URL_ID, PEOPLE_COLUMNS, ...lineCovers(391, 14.39, [6, 8, 10, 13, 14, 21, 23, 25, 26])];
const COND3_COVERS = [SHEET_URL_ID, { ...PEOPLE_COLUMNS, y: 291, h: 697 }, ...lineCovers(299, 14.4, [7, 8, 9, 10, 11, 12, 13, 14, 15])];

const fit = (w: number) => WIN_LEFT.width / w;

// Scene starts follow the pauses in public/part4/voiceover.wav (55s, 1650 frames)
export const OrderProcessingPart4: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background />
      <Sequence name="Three utility tools" durationInFrames={9.6 * fps}>
        <ToolsIntroScene />
      </Sequence>
      <Sequence name="Line parser code" from={9.5 * fps} durationInFrames={4.1 * fps}>
        <ShotScene
          shot={shots4.code}
          enter="scale"
          exitAt={3.7}
          camera={[wide(shots4.code, WIN_FULL), [0.4, 959.5, 517, WIN_FULL.width / 1919], [1.2, 600, 400, 1.5]]}
          covers={[SCRIPT_URL_ID, { x: 594, y: 339, w: 350, h: 19 }]}
          marks={[{ r: { x: 62, y: 266, w: 224, h: 30 }, at: 1.2 }]}
          labels={[{ x: 300, y: 281, at: 1.4, text: "Dynamic Line Parser · fallback conditions" }]}
          cursor={[
            [0.2, 900, 700],
            [1.0, 140, 281],
          ]}
          clicks={[1.1]}
        />
        <Tag x={960} y={6} at={0.3} center>
          Tool 1 · Dynamic Line Parser
        </Tag>
      </Sequence>
      <Sequence name="Different layouts" from={13.6 * fps} durationInFrames={5.1 * fps}>
        <LayoutsScene />
      </Sequence>
      <Sequence name="Three-tier fallback" from={18.7 * fps} durationInFrames={5.8 * fps}>
        <FallbackLadderScene />
      </Sequence>
      <Sequence name="Condition 1 · Line 11" from={24.4 * fps} durationInFrames={7 * fps}>
        <ShotScene
          shot={shots4.cond1}
          win={WIN_LEFT}
          exitAt={6.6}
          camera={[wide(shots4.cond1, WIN_LEFT), [0.6, 958, 517.5, fit(1916)], [1.4, 1300, 560, 1.7]]}
          covers={COND1_COVERS}
          marks={[
            { r: line(416, 14.38, 11), at: 1.5, until: 2.8 },
            { r: line(416, 14.38, 11, 1097, 40), at: 2.8, until: 4.6 },
            { r: line(416, 14.38, 11, 1137, 165), at: 4.6 },
          ]}
          labels={[
            { x: 1310, y: 533, at: 1.6, until: 4.6, text: "Line 11" },
            { x: 1310, y: 533, at: 4.8, text: "Event → 00094280 - Annapolis Sailboat", color: "#1E8E3E" },
          ]}
        />
      </Sequence>
      <Sequence name="Condition 2 · Lines 15–20" from={31.4 * fps} durationInFrames={14.9 * fps}>
        <ShotScene
          shot={shots4.cond2}
          win={WIN_LEFT}
          exitAt={14.5}
          camera={[wide(shots4.cond2, WIN_LEFT), [0.4, 957.5, 517.5, fit(1915)], [1.2, 1300, 545, 1.7]]}
          covers={COND2_COVERS}
          marks={[
            { r: line(391, 14.39, 11), at: 1.6, until: 3.9 },
            { r: { ...line(391, 14.39, 15), h: 6 * 14.39 }, at: 4.0, until: 8.8 },
            { r: line(391, 14.39, 16), at: 8.8, until: 12.0 },
            { r: line(391, 14.39, 15), at: 12.0 },
          ]}
          labels={[
            { x: 1310, y: 508, at: 2.0, until: 3.9, text: "Line 11 isn't “Event” ✕", color: "#B3261E" },
            { x: 1350, y: 572, at: 4.3, until: 8.8, text: "Scan lines 15–20" },
            { x: 1250, y: 621, at: 9.0, until: 12.0, text: "“Event” found on line 16" },
            { x: 1310, y: 572, at: 13.3, text: "↑ Line 15 → 00101557 - 10/20 Waxahachie", color: "#1E8E3E" },
          ]}
        />
      </Sequence>
      <Sequence name="Condition 3 · No match" from={46.3 * fps} durationInFrames={8.7 * fps}>
        <ShotScene
          shot={shots4.cond3}
          win={WIN_LEFT}
          camera={[wide(shots4.cond3, WIN_LEFT), [0.4, 959.5, 517, fit(1919)], [1.2, 1300, 470, 1.7]]}
          covers={COND3_COVERS}
          marks={[
            { r: line(299, 14.4, 11), at: 1.5 },
            { r: { ...line(299, 14.4, 15), h: 6 * 14.4 }, at: 2.5 },
          ]}
          labels={[{ x: 1420, y: 340, at: 2.8, text: "No “Event” in range ✕", color: "#B3261E" }]}
        />
        <Tag x={740} y={930} at={5.2} center color="#3A4660">
          Event Name = “” (clean blank)
        </Tag>
        <Tag x={740} y={1000} at={7.2} center color="#B98900">
          ⚠ Logged for review · order 73513035
        </Tag>
      </Sequence>
      <Sequence name="Condition panel" from={24.4 * fps} durationInFrames={30.6 * fps}>
        <LadderPanel />
      </Sequence>
      <Audio src={staticFile("part4/voiceover.wav")} />
    </AbsoluteFill>
  );
};
