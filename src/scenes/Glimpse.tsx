import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

const THEMES = [
  { topic: "禊", phrase: "水に身を委ねることで、穢れを流す" },
  { topic: "銭湯", phrase: "身体が溶ける場所が、共同体を作った" },
  { topic: "水琴窟", phrase: "音で味わう、日本の美意識" },
  { topic: "水利", phrase: "水を分かち合う社会の知恵" },
];

const FRAME_PER_THEME = 120;
const THEME_OVERLAP = 20;

const ThemeCard: React.FC<{
  topic: string;
  phrase: string;
  index: number;
}> = ({ topic, phrase, index }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 20, FRAME_PER_THEME - 25, FRAME_PER_THEME],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const isLeft = index % 2 === 0;

  const slideX = interpolate(frame, [0, 25], [60, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineWidth = interpolate(frame, [15, 40], [0, 80], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const phraseOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const phraseY = interpolate(frame, [30, 50], [12, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      lang="ja"
      style={{
        backgroundColor: "#0a0f1a",
        justifyContent: "center",
        alignItems: isLeft ? "flex-start" : "flex-end",
        padding: "0 200px",
      }}
    >
      {/* Subtle glow */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at ${isLeft ? "30%" : "70%"} 50%, rgba(26, 60, 52, 0.25) 0%, transparent 50%)`,
        }}
      />

      <div
        style={{
          opacity,
          transform: `translateX(${isLeft ? slideX : -slideX}px)`,
          textAlign: isLeft ? "left" : "right",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: 32,
            color: "rgba(180, 220, 240, 0.7)",
            fontFamily: "'Noto Serif CJK JP', 'IPA明朝', serif",
            letterSpacing: 10,
            margin: "0 0 12px 0",
          }}
        >
          {topic}
        </p>

        <div
          style={{
            width: lineWidth,
            height: 2,
            backgroundColor: "rgba(180, 220, 240, 0.4)",
            marginBottom: 20,
            marginLeft: isLeft ? 0 : "auto",
          }}
        />

        <p
          style={{
            fontSize: 44,
            color: "#e8f0f0",
            fontFamily: "'Noto Serif CJK JP', 'IPA明朝', serif",
            fontWeight: 500,
            margin: 0,
            opacity: phraseOpacity,
            transform: `translateY(${phraseY}px)`,
            textShadow: "0 2px 15px rgba(26, 60, 52, 0.5)",
            lineHeight: 1.6,
          }}
        >
          {phrase}
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const Glimpse: React.FC = () => {
  return (
    <AbsoluteFill>
      {THEMES.map((theme, i) => (
        <Sequence
          key={i}
          from={i * (FRAME_PER_THEME - THEME_OVERLAP)}
          durationInFrames={FRAME_PER_THEME}
        >
          <ThemeCard topic={theme.topic} phrase={theme.phrase} index={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
