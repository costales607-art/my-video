import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Cursor, ease, Highlight, Pill, Redact, Stage } from "../OrderProcessingPart1/primitives";
import { colors } from "../OrderProcessingPart1/theme";
import {
  CamKey,
  clamp,
  CopyChip,
  FIT,
  FlyingToken,
  GHL_LOCATION_ID,
  GHL_OPPORTUNITY_CARDS,
  GHL_PIPELINE_ID,
  SHEET_DOC_ID,
  shots2,
  StageLabel,
  toScreen,
  useCamera,
  WIN,
} from "./shared";

const WIDE: CamKey = [0, 959.5, 515, FIT];

const whipIn = (frame: number, fps: number): React.CSSProperties => {
  const blur = interpolate(frame, [0, 0.3 * fps, 0.45 * fps], [10, 4, 0], clamp);
  return {
    translate: interpolate(frame, [0, 0.45 * fps], ["1920px 0px", "0px 0px"], { ...clamp, easing: ease }),
    // A lingering blur(0px) filter washes out the tokens drawn on top
    filter: blur > 0 ? `blur(${blur}px)` : undefined,
  };
};

const fadeIn = (frame: number, fps: number): React.CSSProperties => ({
  opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], clamp),
});

// Blur layers shared by every GoHighLevel screenshot
const GhlRedactions: React.FC<{ readonly shot: (typeof shots2)[keyof typeof shots2] }> = ({ shot }) => (
  <>
    <Redact shot={shot} {...GHL_LOCATION_ID} />
    {shot === shots2.opportunities ? <Redact shot={shot} {...GHL_OPPORTUNITY_CARDS} /> : null}
    {shot === shots2.pipeline ? <Redact shot={shot} {...GHL_PIPELINE_ID} /> : null}
  </>
);

// Frame drawn around a blurred URL segment while it is being "copied"
const IdFrame: React.FC<{
  readonly box: { x: number; y: number; w: number; h: number };
  readonly at: number;
}> = ({ box, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Highlight
      x={box.x - 4}
      y={box.y - 2}
      w={box.w + 8}
      h={box.h + 4}
      opacity={interpolate(frame, [at * fps, at * fps + 5], [0, 1], clamp)}
    />
  );
};

// 1:07.4 – 1:12.1  "For example, dev+josh@avidvs.com."
export const ForwardingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cam = useCamera([WIDE, [0.5, 959.5, 515, FIT], [1.2, 960, 600, 1.8]]);
  const text = "dev+josh@avidvs.com";
  const n = Math.round(interpolate(frame, [1.2 * fps, 4.3 * fps], [0, text.length], clamp));
  const typed = text.slice(0, n);
  const tag = interpolate(frame, [3.4 * fps, 3.7 * fps], [0, 1], clamp);

  return (
    <AbsoluteFill style={whipIn(frame, fps)}>
      <Stage shot={shots2.forwarding} {...WIN} {...cam}>
        {/* Retype the address in time with the voiceover */}
        <div
          style={{
            position: "absolute",
            left: 712,
            top: 566,
            width: 496,
            height: 34,
            background: "#fff",
            fontFamily: "Roboto, Arial, sans-serif",
            fontSize: 17,
            lineHeight: "34px",
            paddingLeft: 7,
            color: "#202124",
            whiteSpace: "nowrap",
          }}
        >
          {typed.slice(0, 3)}
          <span
            style={{
              borderRadius: 4,
              background: `rgba(30,142,62,${0.22 * tag})`,
              boxShadow: tag > 0 ? `0 2px 0 rgba(30,142,62,${tag})` : undefined,
            }}
          >
            {typed.slice(3, 8)}
          </span>
          {typed.slice(8)}
          {Math.floor(frame / 8) % 2 === 0 ? (
            <span style={{ borderLeft: "1.5px solid #202124", marginLeft: 1 }} />
          ) : null}
        </div>
        <StageLabel x={795} y={548} at={3.5} zoom={cam.zoom} color={colors.green}>
          +josh = Josh&apos;s routing tag
        </StageLabel>
        <Cursor
          zoom={cam.zoom}
          path={[
            [0.3, 1300, 820],
            [0.9, 1000, 584],
          ]}
          clicks={[1.0]}
        />
      </Stage>
    </AbsoluteFill>
  );
};

// 1:32.4 – 1:37.0  "…generated inside the client's GoHighLevel sub-account under Settings,"
export const GhlSettingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cam = useCamera([WIDE, [1.0, 959.5, 515, FIT], [2.4, 704, 640, 1.25]]);
  const shot = shots2.opportunities;

  return (
    <AbsoluteFill style={whipIn(frame, fps)}>
      <Stage shot={shot} {...WIN} {...cam}>
        <GhlRedactions shot={shot} />
        <StageLabel x={170} y={196} at={0.5} zoom={cam.zoom}>
          Josh&apos;s sub-account
        </StageLabel>
        <Highlight
          x={6}
          y={984}
          w={200}
          h={32}
          opacity={interpolate(frame, [3.7 * fps, 3.9 * fps], [0, 1], clamp)}
        />
        <Cursor
          zoom={cam.zoom}
          path={[
            [0.2, 1100, 640],
            [1.2, 170, 214],
            [1.8, 170, 214],
            [3.7, 60, 999],
          ]}
          clicks={[3.8]}
        />
      </Stage>
    </AbsoluteFill>
  );
};

// 1:36.9 – 1:38.8  "Private Integrations."
export const IntegrationsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cam = useCamera([[0, 959.5, 515, FIT]]);
  const shot = shots2.integrations;
  const menu = toScreen(1814, 577, cam);

  return (
    <AbsoluteFill style={fadeIn(frame, fps)}>
      <Stage shot={shot} {...WIN} {...cam}>
        <GhlRedactions shot={shot} />
        <Highlight
          x={246}
          y={200}
          w={350}
          h={50}
          opacity={interpolate(frame, [0.2 * fps, 0.35 * fps], [0, 1], clamp)}
        />
        <Highlight
          x={262}
          y={484}
          w={1610}
          h={186}
          opacity={interpolate(frame, [0.7 * fps, 0.85 * fps], [0, 1], clamp)}
        />
        <Cursor
          zoom={cam.zoom}
          path={[
            [0, 900, 400],
            [0.8, 1814, 577],
          ]}
          clicks={[0.85]}
        />
      </Stage>
      <FlyingToken
        label="API Key"
        from={{ x: menu.x - 260, y: menu.y + 80 }}
        to={{ x: menu.x - 260, y: 1200 }}
        popAt={0.95}
        flyAt={1.35}
        flyEnd={1.9}
      />
    </AbsoluteFill>
  );
};

// 1:42.1 – 1:48.7  "…location ID found directly in their GoHighLevel dashboard URL."
export const LocationUrlScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cam = useCamera([WIDE, [0.5, 959.5, 515, FIT], [2.2, 480, 200, 2.4]]);
  const shot = shots2.opportunities;
  const id = GHL_LOCATION_ID;
  const idMid = { x: id.x + id.w / 2, y: id.y + id.h / 2 };
  const start = toScreen(idMid.x, idMid.y + 90, cam);

  return (
    <AbsoluteFill style={whipIn(frame, fps)}>
      <Stage shot={shot} {...WIN} {...cam}>
        <GhlRedactions shot={shot} />
        <Highlight
          x={316}
          y={51}
          w={48}
          h={24}
          opacity={interpolate(frame, [2.3 * fps, 2.4 * fps, 2.9 * fps, 3.0 * fps], [0, 1, 1, 0], clamp)}
        />
        <IdFrame box={id} at={2.7} />
        <StageLabel x={idMid.x} y={id.y + id.h + 52} at={2.9} zoom={cam.zoom}>
          Location ID
        </StageLabel>
        <Cursor
          zoom={cam.zoom}
          path={[
            [0.3, 1100, 600],
            [2.4, 700, 160],
            [3.9, idMid.x, idMid.y + 2],
          ]}
          clicks={[4.1, 4.25]}
        />
      </Stage>
      <CopyChip at={4.5} x={start.x + 40} y={start.y - 60} />
      <FlyingToken label="Location ID" from={start} to={{ x: start.x + 300, y: 1200 }} popAt={4.7} flyAt={5.5} flyEnd={6.5} />
    </AbsoluteFill>
  );
};

// 1:52.8 – 1:56.7  "This is located under Opportunities, then Pipelines."
export const OpportunitiesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cam = useCamera([WIDE, [0.4, 959.5, 515, FIT], [1.4, 760, 420, 1.15]]);
  const shot = shots2.opportunities;

  return (
    <AbsoluteFill style={whipIn(frame, fps)}>
      <Stage shot={shot} {...WIN} {...cam}>
        <GhlRedactions shot={shot} />
        <Highlight
          x={4}
          y={484}
          w={204}
          h={34}
          opacity={interpolate(frame, [1.9 * fps, 2.0 * fps], [0, 1], clamp)}
        />
        <Highlight
          x={556}
          y={170}
          w={76}
          h={38}
          opacity={interpolate(frame, [3.2 * fps, 3.3 * fps], [0, 1], clamp)}
        />
        <Cursor
          zoom={cam.zoom}
          path={[
            [0.3, 1200, 700],
            [1.8, 90, 500],
            [2.2, 90, 500],
            [3.1, 594, 188],
          ]}
          clicks={[1.9, 3.2]}
        />
      </Stage>
    </AbsoluteFill>
  );
};

// 1:56.6 – 2:01.6  "Opening the target pipeline, like Cutco Orders, reveals its unique ID in the URL bar."
export const PipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cam = useCamera([WIDE, [3.0, 959.5, 515, FIT], [3.7, 720, 200, 2.0]]);
  const shot = shots2.pipeline;
  const id = GHL_PIPELINE_ID;
  const idMid = { x: id.x + id.w / 2, y: id.y + id.h / 2 };
  const start = toScreen(idMid.x, idMid.y + 90, cam);

  return (
    <AbsoluteFill style={fadeIn(frame, fps)}>
      <Stage shot={shot} {...WIN} {...cam}>
        <GhlRedactions shot={shot} />
        <Highlight
          x={278}
          y={234}
          w={140}
          h={30}
          opacity={interpolate(frame, [2.1 * fps, 2.2 * fps, 3.0 * fps, 3.2 * fps], [0, 1, 1, 0], clamp)}
        />
        <IdFrame box={id} at={3.8} />
        <StageLabel x={idMid.x} y={id.y + id.h + 52} at={3.9} zoom={cam.zoom}>
          Pipeline ID
        </StageLabel>
        <Cursor
          zoom={cam.zoom}
          path={[
            [0, 594, 188],
            [2.0, 337, 249],
            [3.0, 337, 249],
            [4.1, idMid.x, idMid.y + 2],
          ]}
          clicks={[2.3, 4.25, 4.4]}
        />
      </Stage>
      <CopyChip at={4.5} x={start.x + 40} y={start.y - 60} />
      <FlyingToken label="Pipeline ID" from={start} to={{ x: start.x + 300, y: 1200 }} popAt={4.55} flyAt={4.65} flyEnd={5.0} />
    </AbsoluteFill>
  );
};

// A shorter window for the cropped screenshot of Josh's sheet (address bar + title)
const SHEET_WIN = { left: 80, top: 380, width: 1760, height: 276 };

// 1:21.7 – 1:27.6  "…the unique document ID extracted directly from the client's individual Google Sheet URL."
export const SheetUrlScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shot = shots2.joshSheet;
  const fit = SHEET_WIN.width / shot.w;
  const cam = useCamera([
    [0, 482, 75.5, fit],
    [0.6, 482, 75.5, fit],
    [1.5, 532, 63, 2.2],
  ]);
  const id = SHEET_DOC_ID;
  const idMid = { x: id.x + id.w / 2, y: id.y + id.h / 2 };
  const onScreen = (x: number, y: number) => ({
    x: SHEET_WIN.left + SHEET_WIN.width / 2 + (x - cam.focusX) * cam.zoom,
    y: SHEET_WIN.top + SHEET_WIN.height / 2 + (y - cam.focusY) * cam.zoom,
  });
  const idScreen = onScreen(idMid.x, idMid.y);
  const tokenStart = { x: idScreen.x, y: SHEET_WIN.top + SHEET_WIN.height + 150 };

  return (
    <AbsoluteFill style={whipIn(frame, fps)}>
      <Stage shot={shot} {...SHEET_WIN} {...cam}>
        <Redact shot={shot} {...id} />
        <IdFrame box={id} at={1.3} />
        <Cursor
          zoom={cam.zoom}
          path={[
            [0.4, 800, 120],
            [2.0, idMid.x, idMid.y + 2],
          ]}
          clicks={[2.15, 2.3]}
        />
      </Stage>
      <StageLabelOnScreen x={idScreen.x} y={SHEET_WIN.top + SHEET_WIN.height + 30} at={1.4}>
        Spreadsheet ID
      </StageLabelOnScreen>
      <CopyChip at={2.6} x={idScreen.x + 60} y={SHEET_WIN.top - 70} />
      <FlyingToken label="Spreadsheet ID" from={tokenStart} to={{ x: tokenStart.x + 60, y: 1200 }} popAt={2.8} flyAt={4.6} flyEnd={5.7} />
    </AbsoluteFill>
  );
};

const StageLabelOnScreen: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly at: number;
  readonly children: React.ReactNode;
}> = ({ x, y, at, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        translate: "-50% 0",
        opacity: interpolate(frame, [at * fps, at * fps + 4], [0, 1], clamp),
      }}
    >
      <Pill style={{ position: "relative" }}>{children}</Pill>
    </div>
  );
};
