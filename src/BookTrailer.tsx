import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { ColdOpen } from "./scenes/ColdOpen";
import { TitleReveal } from "./scenes/TitleReveal";
import { ChapterFlash } from "./scenes/ChapterFlash";
import { KeyQuotes } from "./scenes/KeyQuotes";
import { Climax } from "./scenes/Climax";
import { Ending } from "./scenes/Ending";

export const BookTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0f1a" }}>
      {/* Layer 1: Cold Open - runs 0-150, overlaps with TitleReveal */}
      <Sequence from={0} durationInFrames={150}>
        <ColdOpen />
      </Sequence>

      {/* Layer 2: Title Reveal - starts at 90, overlaps cold open's end */}
      <Sequence from={90} durationInFrames={210}>
        <TitleReveal />
      </Sequence>

      {/* Layer 3: Chapter Flash - starts at 270 */}
      <Sequence from={270} durationInFrames={540}>
        <ChapterFlash />
      </Sequence>

      {/* Layer 4: Key Quotes - starts at 780, overlaps chapter flash end */}
      <Sequence from={780} durationInFrames={510}>
        <KeyQuotes />
      </Sequence>

      {/* Layer 5: Climax - starts at 1260, overlaps key quotes end */}
      <Sequence from={1230} durationInFrames={300}>
        <Climax />
      </Sequence>

      {/* Layer 6: Ending with book cover - starts at 1500 */}
      <Sequence from={1500} durationInFrames={300}>
        <Ending />
      </Sequence>
    </AbsoluteFill>
  );
};
