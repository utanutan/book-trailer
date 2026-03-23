import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export const Climax: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dramatic zoom background
  const bgScale = interpolate(frame, [0, 300], [1, 1.3], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Pulsing glow
  const glowIntensity = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.2, 0.5]
  );

  // Main message fade in
  const mainOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const mainScale = spring({
    fps,
    frame: frame - 30,
    config: { damping: 8, stiffness: 80 },
  });

  // Sub message
  const subOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const subY = interpolate(frame, [120, 150], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Question mark particles
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const radius = interpolate(frame, [60, 200], [0, 300], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    const particleOpacity = interpolate(frame, [60, 80, 180, 200], [0, 0.4, 0.4, 0], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });
    return {
      x: Math.cos(angle + frame * 0.01) * radius,
      y: Math.sin(angle + frame * 0.01) * radius,
      opacity: particleOpacity,
    };
  });

  return (
    <AbsoluteFill
      lang="ja"
      style={{
        backgroundColor: "#0a0f1a",
      }}
    >
      {/* Dramatic background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: `scale(${bgScale})`,
          background: `radial-gradient(ellipse at 50% 50%, rgba(26, 60, 52, ${glowIntensity}) 0%, rgba(10, 15, 26, 1) 70%)`,
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "rgba(180, 220, 240, 0.8)",
            transform: `translate(${p.x}px, ${p.y}px)`,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Main climax text */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontSize: 68,
            color: "#e8f0f0",
            fontFamily:
              "'Noto Serif CJK JP', 'IPA明朝', serif",
            fontWeight: 700,
            letterSpacing: 8,
            opacity: mainOpacity,
            transform: `scale(${mainScale})`,
            textShadow:
              "0 0 40px rgba(26, 60, 52, 0.8), 0 4px 20px rgba(0, 0, 0, 0.5)",
            margin: 0,
            padding: "0 120px",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          水の文化を、
          <br />
          あなたの言葉で語れるようになる
        </h1>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
