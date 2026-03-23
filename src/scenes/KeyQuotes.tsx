import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

const QUOTES = [
  {
    text: "禊とは、水に身を委ねること",
    source: "第二章 清めの水",
  },
  {
    text: "銭湯は、身体が溶ける場所だった",
    source: "第三章 湯に溶ける",
  },
  {
    text: "古池や 蛙飛びこむ 水の音",
    source: "松尾芭蕉",
  },
  {
    text: "水は、流れることで浄化する",
    source: "第六章 次の世代へ",
  },
];

const FRAME_PER_QUOTE = 120;
const QUOTE_OVERLAP = 15;

const QuoteScene: React.FC<{
  text: string;
  source: string;
  index: number;
}> = ({ text, source, index }) => {
  const frame = useCurrentFrame();

  // Character-by-character reveal
  const chars = text.split("");
  const charsPerFrame = chars.length / 40;

  const quoteOpacity = interpolate(
    frame,
    [0, 10, FRAME_PER_QUOTE - 20, FRAME_PER_QUOTE],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const sourceOpacity = interpolate(frame, [50, 70], [0, 0.7], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Vertical decorative line
  const lineHeight = interpolate(frame, [0, 30], [0, 120], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0f1a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background shimmer */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at ${50 + Math.sin(frame * 0.02) * 10}% ${50 + Math.cos(frame * 0.015) * 10}%, rgba(26, 60, 52, 0.3) 0%, transparent 50%)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          opacity: quoteOpacity,
          zIndex: 1,
        }}
      >
        {/* Top decorative line */}
        <div
          style={{
            width: 2,
            height: lineHeight,
            background:
              "linear-gradient(180deg, transparent, rgba(180, 220, 240, 0.6), transparent)",
          }}
        />

        {/* Quote text with character reveal */}
        <p
          style={{
            fontSize: 52,
            color: "#e8f0f0",
            fontFamily:
              "'Noto Serif CJK JP', 'IPA明朝', serif",
            fontWeight: 500,
            letterSpacing: 6,
            textAlign: "center",
            maxWidth: 1200,
            lineHeight: 1.8,
            margin: 0,
            textShadow: "0 2px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          {chars.map((char, i) => {
            const charOpacity = interpolate(
              frame,
              [10 + i / charsPerFrame, 12 + i / charsPerFrame],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );
            return (
              <span key={i} style={{ opacity: charOpacity }}>
                {char}
              </span>
            );
          })}
        </p>

        {/* Source */}
        <p
          style={{
            fontSize: 24,
            color: "rgba(180, 220, 240, 0.6)",
            fontFamily:
              "'Noto Serif CJK JP', 'IPA明朝', serif",
            letterSpacing: 4,
            opacity: sourceOpacity,
            margin: 0,
          }}
        >
          -- {source}
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const KeyQuotes: React.FC = () => {
  return (
    <AbsoluteFill>
      {QUOTES.map((quote, i) => (
        <Sequence
          key={i}
          from={i * (FRAME_PER_QUOTE - QUOTE_OVERLAP)}
          durationInFrames={FRAME_PER_QUOTE}
        >
          <QuoteScene text={quote.text} source={quote.source} index={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
