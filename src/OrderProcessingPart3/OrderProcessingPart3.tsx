import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { Background } from "../OrderProcessingPart1/primitives";
import { shots } from "../OrderProcessingPart1/theme";
import { shots2 } from "../OrderProcessingPart2/shared";
import { GHL_LOCATION, Rect, SCRIPT_URL_ID, SectionTitle, ShotScene, WIN_LOW, wide, WIN_FULL } from "../OrderProcessingShared/kit";
import {
  ApiQueryScene,
  AppendConceptScene,
  AppendHistoryScene,
  ClockScene,
  OperationsStepper,
  ScanWindowScene,
  TextExtractionScene,
} from "./Graphics";

const shots3 = {
  trigger: { src: "part3/trigger.png", w: 1919, h: 1032 },
  contacts: { src: "part3/contacts.png", w: 1919, h: 1029 },
  cindy: { src: "part3/cindy-contact.png", w: 1919, h: 1031 },
  details: { src: "part3/opportunity-details.png", w: 1919, h: 1038 },
};

// Privacy covers (screenshot px)
const INBOX_COVERS: Rect[] = [
  { x: 797, y: 243, w: 946, h: 22 }, // receipt subject: customer name and forwarder email
  { x: 805, y: 323, w: 938, h: 22 },
  { x: 596, y: 443, w: 1147, h: 22 }, // call recaps: caller names and emails
  { x: 596, y: 483, w: 1147, h: 22 },
  { x: 1028, y: 523, w: 715, h: 22 }, // forwarder name and email
  { x: 335, y: 594, w: 1512, h: 38 }, // GoHighLevel login code
  { x: 596, y: 683, w: 1147, h: 22 }, // shared-folder email
];
const CONTACT_COVERS: Rect[] = [
  GHL_LOCATION,
  { x: 300, y: 390, w: 222, h: 552 }, // names
  { x: 526, y: 390, w: 222, h: 552 }, // phones
  { x: 752, y: 390, w: 222, h: 552 }, // emails
];
const CARD_COVERS: Rect[] = [
  { x: 254, y: 559, w: 112, h: 23 },
  { x: 254, y: 742, w: 112, h: 23 },
  { x: 254, y: 925, w: 112, h: 23 },
  { x: 368, y: 598, w: 156, h: 23 },
  { x: 368, y: 781, w: 156, h: 23 },
  { x: 368, y: 964, w: 156, h: 23 },
];

// Scene starts follow the pauses in public/part3/voiceover.wav (87s, 2610 frames)
export const OrderProcessingPart3: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background />
      <Sequence name="Title" durationInFrames={3.5 * fps}>
        <SectionTitle eyebrow="PART 3 · BEHIND THE SCENES" title="How the code operates" exitAt={3.1} />
      </Sequence>
      <Sequence name="Apps Script trigger" from={3.3 * fps} durationInFrames={4.3 * fps}>
        <ShotScene
          shot={shots3.trigger}
          enter="scale"
          exitAt={3.9}
          camera={[wide(shots3.trigger, WIN_FULL), [0.6, 959.5, 516, WIN_FULL.width / 1919], [1.4, 960, 380, 1.25]]}
          covers={[SCRIPT_URL_ID]}
          marks={[{ r: { x: 64, y: 342, w: 1852, h: 33 }, at: 2.4 }]}
          labels={[{ x: 1000, y: 410, at: 2.6, text: "Time-driven · processAllClients" }]}
          cursor={[
            [0.4, 1500, 700],
            [2.3, 1048, 362],
          ]}
        />
      </Sequence>
      <Sequence name="Every 5–10 minutes" from={7.4 * fps} durationInFrames={3 * fps}>
        <ClockScene />
      </Sequence>
      <Sequence name="Scan window" from={10.3 * fps} durationInFrames={10.4 * fps}>
        <ScanWindowScene />
      </Sequence>
      <Sequence name="Inbox · recent receipts" from={20.6 * fps} durationInFrames={6.3 * fps}>
        <ShotScene
          shot={shots.gmail}
          enter="whip"
          exitAt={5.9}
          camera={[wide(shots.gmail, WIN_FULL), [0.5, 959, 516, WIN_FULL.width / 1918], [1.3, 1000, 430, 1.1]]}
          covers={INBOX_COVERS}
          marks={[{ r: { x: 326, y: 233, w: 1520, h: 199 }, at: 0.8 }]}
          dims={[{ r: { x: 326, y: 433, w: 1520, h: 280 }, at: 3.5 }]}
          labels={[
            { x: 1290, y: 214, at: 1.0, text: "Yesterday → today · scanned", color: "#1A73E8" },
            { x: 1430, y: 740, at: 3.7, text: "Old history · skipped", color: "#3A4660" },
          ]}
        />
      </Sequence>
      <Sequence name="1 · Text extraction" from={32.4 * fps} durationInFrames={5.9 * fps}>
        <TextExtractionScene />
      </Sequence>
      <Sequence name="2 · CRM API query" from={38.3 * fps} durationInFrames={5.7 * fps}>
        <ApiQueryScene />
      </Sequence>
      <Sequence name="2 · Contacts" from={44 * fps} durationInFrames={6.4 * fps}>
        <ShotScene
          shot={shots3.contacts}
          win={WIN_LOW}
          exitAt={6.0}
          camera={[wide(shots3.contacts, WIN_LOW), [0.2, 959.5, 514.5, WIN_LOW.width / 1919], [0.9, 960, 560, 1.15]]}
          covers={CONTACT_COVERS}
          marks={[
            { r: { x: 258, y: 391, w: 1615, h: 35 }, at: 0.4, until: 3.7 },
            { r: { x: 258, y: 428, w: 1615, h: 35 }, at: 3.7 },
          ]}
          labels={[
            { x: 1215, y: 408, at: 1.0, until: 3.7, text: "Exists → update record" },
            { x: 1215, y: 445, at: 4.4, text: "New → create contact", color: "#1E8E3E" },
          ]}
        />
      </Sequence>
      <Sequence name="3 · Append concept" from={50.4 * fps} durationInFrames={8.3 * fps}>
        <AppendConceptScene />
      </Sequence>
      <Sequence name="3 · Existing contact" from={58.7 * fps} durationInFrames={6.3 * fps}>
        <ShotScene
          shot={shots3.cindy}
          win={WIN_LOW}
          exitAt={5.9}
          camera={[wide(shots3.cindy, WIN_LOW), [0.3, 959.5, 515.5, WIN_LOW.width / 1919], [1.0, 600, 600, 1.3]]}
          covers={[GHL_LOCATION, { x: 586, y: 386, w: 170, h: 32 }, { x: 795, y: 503, w: 133, h: 22 }]}
          marks={[{ r: { x: 262, y: 606, w: 270, h: 54 }, at: 3.8 }]}
          labels={[{ x: 545, y: 633, at: 4.0, text: "New order: 73513289", color: "#1E8E3E" }]}
          cursor={[
            [0.4, 1100, 800],
            [3.6, 420, 642],
          ]}
        />
      </Sequence>
      <Sequence name="3 · Append history" from={65 * fps} durationInFrames={8.1 * fps}>
        <AppendHistoryScene />
      </Sequence>
      <Sequence name="4 · Pipeline card" from={73.1 * fps} durationInFrames={6.3 * fps}>
        <ShotScene
          shot={shots2.opportunities}
          win={WIN_LOW}
          exitAt={5.9}
          camera={[wide(shots2.opportunities, WIN_LOW), [2.4, 959.5, 518.5, WIN_LOW.width / 1919], [3.3, 560, 640, 1.4]]}
          covers={[GHL_LOCATION, ...CARD_COVERS]}
          marks={[{ r: { x: 250, y: 548, w: 288, h: 172 }, at: 3.4 }]}
          labels={[{ x: 560, y: 600, at: 3.6, text: "New pipeline card", color: "#1E8E3E" }]}
          cursor={[
            [1.0, 1200, 800],
            [5.3, 420, 610],
          ]}
          clicks={[5.6]}
        />
      </Sequence>
      <Sequence name="4 · Opportunity details" from={79.4 * fps} durationInFrames={7.6 * fps}>
        <ShotScene
          shot={shots3.details}
          win={WIN_LOW}
          camera={[wide(shots3.details, WIN_LOW), [1.0, 959.5, 519, WIN_LOW.width / 1919], [1.6, 1410, 700, 1.5]]}
          covers={[
            GHL_LOCATION,
            ...CARD_COVERS,
            { x: 1452, y: 375, w: 260, h: 26 },
            { x: 1452, y: 437, w: 260, h: 26 },
            { x: 1452, y: 499, w: 260, h: 26 },
          ]}
          marks={[
            { r: { x: 362, y: 659, w: 62, h: 22 }, at: 0.6, until: 1.3 },
            { r: { x: 1448, y: 768, w: 410, h: 50 }, at: 1.6 },
            { r: { x: 1448, y: 830, w: 410, h: 110 }, at: 2.6 },
          ]}
          labels={[
            { x: 432, y: 670, at: 0.6, until: 1.3, text: "Order value" },
            { x: 1330, y: 793, at: 1.7, text: "Order type" },
            { x: 1295, y: 885, at: 2.7, text: "Product details" },
            { x: 950, y: 640, at: 5.4, text: "+ Special instructions, e.g. engravings", color: "#1E8E3E" },
          ]}
        />
      </Sequence>
      <Sequence name="Four operations bar" from={26.9 * fps} durationInFrames={60.1 * fps}>
        <OperationsStepper />
      </Sequence>
      <Audio src={staticFile("part3/voiceover.wav")} />
    </AbsoluteFill>
  );
};
