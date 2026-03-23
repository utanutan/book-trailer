import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export const TitleReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main title animation
  const titleScale = spring({
    fps,
    frame: frame - 20,
    config: { damping: 12, stiffness: 100 },
  });

  const titleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [70, 100], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const subtitleY = interpolate(frame, [70, 100], [20, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Horizontal line animation
  const lineWidth = interpolate(frame, [50, 80], [0, 400], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Author name
  const authorOpacity = interpolate(frame, [110, 140], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Fade out at end for overlay transition
  const fadeOut = interpolate(frame, [180, 210], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0f1a",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(26, 60, 52, 0.6) 0%, transparent 60%)",
        }}
      />

      {/* Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: 96,
            color: "#e8f0f0",
            fontFamily:
              "'Noto Serif CJK JP', 'IPA明朝', serif",
            fontWeight: 700,
            letterSpacing: 12,
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            textShadow: "0 4px 30px rgba(26, 60, 52, 0.8)",
            margin: 0,
          }}
        >
          水の国に生きる
        </h1>

        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, rgba(180, 220, 240, 0.8), transparent)",
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontSize: 36,
            color: "rgba(180, 220, 240, 0.9)",
            fontFamily:
              "'Noto Serif CJK JP', 'IPA明朝', serif",
            letterSpacing: 6,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            margin: 0,
          }}
        >
          日本人の感性と文化を育てた水の力
        </p>

        {/* Author */}
        <p
          style={{
            fontSize: 24,
            color: "rgba(180, 220, 240, 0.6)",
            fontFamily:
              "'Noto Serif CJK JP', 'IPA明朝', serif",
            letterSpacing: 4,
            opacity: authorOpacity,
            marginTop: 30,
          }}
        >
          風呂好きな猫 著
        </p>
      </div>
    </AbsoluteFill>
  );
};
