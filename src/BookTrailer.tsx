import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, interpolate } from "remotion";
import { ColdOpen } from "./scenes/ColdOpen";
import { Personal } from "./scenes/Personal";
import { Question } from "./scenes/Question";
import { Glimpse } from "./scenes/Glimpse";
import { Climax } from "./scenes/Climax";
import { Ending } from "./scenes/Ending";

export const BookTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0f1a" }}>
      {/* BGM - cinematic pad, fade in/out */}
      <Audio
        src={staticFile("bgm.wav")}
        volume={(f) =>
          interpolate(f, [0, 120, 1650, 1800], [0, 0.2, 0.2, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {/* Scene 1: Hook (0:00-0:05) */}
      <Sequence from={0} durationInFrames={170}>
        <ColdOpen />
      </Sequence>

      {/* Scene 2: Personal - 自分ごと化 (0:05-0:15) */}
      <Sequence from={150} durationInFrames={350}>
        <Personal />
      </Sequence>

      {/* Scene 3: Question - 問いの深化 (0:15-0:25) */}
      <Sequence from={450} durationInFrames={330}>
        <Question />
      </Sequence>

      {/* Scene 4: Glimpse - 本の中身ちら見せ (0:25-0:43) */}
      <Sequence from={750} durationInFrames={540}>
        <Glimpse />
      </Sequence>

      {/* Scene 5: Climax (0:43-0:50) */}
      <Sequence from={1280} durationInFrames={240}>
        <Climax />
      </Sequence>

      {/* Scene 6: Ending - タイトルがオチ (0:50-1:00) */}
      <Sequence from={1500} durationInFrames={300}>
        <Ending />
      </Sequence>
    </AbsoluteFill>
  );
};
