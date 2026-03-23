import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

const Ripple: React.FC<{
  delay: number;
  x: number;
  y: number;
}> = ({ delay, x, y }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  const scale = interpolate(adjustedFrame, [0, 60], [0, 8], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const opacity = interpolate(adjustedFrame, [0, 15, 60], [0, 0.6, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: 100,
        height: 100,
        borderRadius: "50%",
        border: "2px solid rgba(180, 220, 240, 0.8)",
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
      }}
    />
  );
};

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade out at the end so next layer shows through
  const fadeOut = interpolate(frame, [120, 150], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const textOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textY = interpolate(frame, [10, 30], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0f1a",
        opacity: fadeOut,
      }}
    >
      {/* Ripple effects */}
      <Ripple delay={0} x={50} y={50} />
      <Ripple delay={15} x={50} y={50} />
      <Ripple delay={30} x={50} y={50} />
      <Ripple delay={45} x={45} y={45} />
      <Ripple delay={60} x={55} y={55} />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(26, 60, 52, 0.4) 0%, transparent 70%)",
        }}
      />

      {/* Opening text */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: 56,
            color: "rgba(180, 220, 240, 0.9)",
            fontFamily:
              "'Noto Serif CJK JP', 'IPA明朝', serif",
            letterSpacing: 8,
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          あなたは、水の声を聴いたことがあるだろうか
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
