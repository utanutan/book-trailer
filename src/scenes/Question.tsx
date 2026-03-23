import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

export const Question: React.FC = () => {
  const frame = useCurrentFrame();

  // First question
  const q1Opacity = interpolate(frame, [0, 30, 120, 140], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const q1Scale = interpolate(frame, [0, 30], [0.97, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Second line - the answer hint
  const q2Opacity = interpolate(frame, [160, 200, 270, 300], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const q2Y = interpolate(frame, [160, 200], [25, 0], {
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
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(26, 60, 52, 0.35) 0%, transparent 55%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 60,
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: 52,
            color: "#e8f0f0",
            fontFamily: "'Noto Serif CJK JP', 'IPA明朝', serif",
            fontWeight: 500,
            letterSpacing: 6,
            opacity: q1Opacity,
            transform: `scale(${q1Scale})`,
            margin: 0,
            textAlign: "center",
            textShadow: "0 2px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          なぜ日本人は、水にこれほど
          <br />
          心を動かされるのか
        </p>

        <p
          style={{
            fontSize: 40,
            color: "rgba(180, 220, 240, 0.9)",
            fontFamily: "'Noto Serif CJK JP', 'IPA明朝', serif",
            letterSpacing: 5,
            opacity: q2Opacity,
            transform: `translateY(${q2Y}px)`,
            margin: 0,
            textAlign: "center",
          }}
        >
          その答えは、千年の文化の中にあった
        </p>
      </div>
    </AbsoluteFill>
  );
};
