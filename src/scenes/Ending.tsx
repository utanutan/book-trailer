import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
  Img,
  Easing,
} from "remotion";

export const Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Book cover animation - slides in from below with spring
  const coverScale = spring({
    fps,
    frame: frame - 10,
    config: { damping: 14, stiffness: 80 },
  });

  const coverOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const coverY = interpolate(frame, [10, 40], [60, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Cover shadow glow pulse
  const glowIntensity = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [20, 40]
  );

  // Title text (right side)
  const titleOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const titleX = interpolate(frame, [50, 80], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Subtitle line
  const lineWidth = interpolate(frame, [80, 110], [0, 250], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Author + CTA
  const detailsOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // CTA button
  const ctaOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const ctaY = interpolate(frame, [150, 180], [15, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Final fade out
  const fadeOut = interpolate(frame, [260, 300], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0f1a",
        opacity: fadeOut,
      }}
    >
      {/* Background glow behind cover */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 35% 50%, rgba(26, 60, 52, 0.5) 0%, transparent 50%)",
        }}
      />

      {/* Main layout: cover left, text right */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 100,
          padding: "0 120px",
        }}
      >
        {/* Book Cover */}
        <div
          style={{
            opacity: coverOpacity,
            transform: `scale(${coverScale}) translateY(${coverY}px)`,
            filter: `drop-shadow(0 0 ${glowIntensity}px rgba(26, 60, 52, 0.8)) drop-shadow(0 8px 30px rgba(0, 0, 0, 0.6))`,
            flexShrink: 0,
          }}
        >
          <Img
            src={staticFile("cover.png")}
            style={{
              height: 650,
              width: "auto",
              borderRadius: 4,
            }}
          />
        </div>

        {/* Text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: 72,
              color: "#e8f0f0",
              fontFamily:
                "'Noto Serif CJK JP', 'IPA明朝', serif",
              fontWeight: 700,
              letterSpacing: 8,
              opacity: titleOpacity,
              transform: `translateX(${titleX}px)`,
              textShadow: "0 4px 30px rgba(26, 60, 52, 0.8)",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            水の国に
            <br />
            生きる
          </h1>

          {/* Decorative line */}
          <div
            style={{
              width: lineWidth,
              height: 2,
              background:
                "linear-gradient(90deg, rgba(180, 220, 240, 0.8), transparent)",
              marginTop: 8,
            }}
          />

          {/* Subtitle */}
          <p
            style={{
              fontSize: 26,
              color: "rgba(180, 220, 240, 0.8)",
              fontFamily:
                "'Noto Serif CJK JP', 'IPA明朝', serif",
              letterSpacing: 3,
              opacity: detailsOpacity,
              margin: 0,
            }}
          >
            日本人の感性と文化を育てた水の力
          </p>

          {/* Author */}
          <p
            style={{
              fontSize: 22,
              color: "rgba(180, 220, 240, 0.5)",
              fontFamily:
                "'Noto Serif CJK JP', 'IPA明朝', serif",
              letterSpacing: 3,
              opacity: detailsOpacity,
              margin: 0,
            }}
          >
            風呂好きな猫 著
          </p>

          {/* CTA */}
          <div
            style={{
              marginTop: 30,
              opacity: ctaOpacity,
              transform: `translateY(${ctaY}px)`,
            }}
          >
            <div
              style={{
                padding: "14px 40px",
                border: "1px solid rgba(180, 220, 240, 0.4)",
                borderRadius: 4,
              }}
            >
              <p
                style={{
                  fontSize: 24,
                  color: "rgba(180, 220, 240, 0.9)",
                  fontFamily:
                    "'Noto Serif CJK JP', 'IPA明朝', serif",
                  letterSpacing: 6,
                  margin: 0,
                }}
              >
                BANSHO で読む
              </p>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
