import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

const PHRASES = [
  "雨音で、眠れる",
  "湯船で、言葉がいらなくなる",
  "川の流れを、ずっと見ていられる",
];

const FRAME_PER_PHRASE = 85;
const PHRASE_GAP = 10;

const Phrase: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 20, FRAME_PER_PHRASE - 15, FRAME_PER_PHRASE],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const y = interpolate(frame, [0, 20], [20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      lang="ja"
      style={{
        backgroundColor: "#0a0f1a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontSize: 62,
          color: "rgba(200, 225, 240, 0.9)",
          fontFamily: "'Noto Serif CJK JP', 'IPA明朝', serif",
          letterSpacing: 6,
          opacity,
          transform: `translateY(${y}px)`,
          margin: 0,
        }}
      >
        {text}
      </p>
    </AbsoluteFill>
  );
};

export const Personal: React.FC = () => {
  return (
    <AbsoluteFill>
      {PHRASES.map((phrase, i) => (
        <Sequence
          key={i}
          from={i * (FRAME_PER_PHRASE - PHRASE_GAP)}
          durationInFrames={FRAME_PER_PHRASE}
        >
          <Phrase text={phrase} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
