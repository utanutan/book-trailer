import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

const PHRASES = [
  "雨の音に名前をつけた",
  "川に祈りを捧げた",
];

const LANDING = "日本人の暮らしには、いつも水が寄り添っていた";

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
          textAlign: "center",
          padding: "0 100px",
        }}
      >
        {text}
      </p>
    </AbsoluteFill>
  );
};

const Landing: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const scale = interpolate(frame, [30, 60], [0.96, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const fadeOut = interpolate(frame, [140, 170], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      lang="ja"
      style={{
        backgroundColor: "#0a0f1a",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(26, 60, 52, 0.4) 0%, transparent 55%)",
        }}
      />
      <p
        style={{
          fontSize: 62,
          color: "#e8f0f0",
          fontFamily: "'Noto Serif CJK JP', 'IPA明朝', serif",
          fontWeight: 500,
          letterSpacing: 5,
          opacity,
          transform: `scale(${scale})`,
          margin: 0,
          textAlign: "center",
          textShadow: "0 2px 20px rgba(26, 60, 52, 0.8)",
          padding: "0 100px",
        }}
      >
        {LANDING}
      </p>
    </AbsoluteFill>
  );
};

export const Question: React.FC = () => {
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
      <Sequence
        from={PHRASES.length * (FRAME_PER_PHRASE - PHRASE_GAP) + 20}
        durationInFrames={170}
      >
        <Landing />
      </Sequence>
    </AbsoluteFill>
  );
};
