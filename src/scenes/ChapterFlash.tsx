import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

const CHAPTERS = [
  {
    title: "第一章",
    subtitle: "水に恵まれた島",
    point: "急流、軟水、棚田——日本の水の風景が\n繊細な食文化と風土を生んだ",
  },
  {
    title: "第二章",
    subtitle: "清めの水、聖なる水",
    point: "禊・祓い・滝行——水に身を委ねることで\n穢れを流す日本独自の浄化思想",
  },
  {
    title: "第三章",
    subtitle: "湯に溶ける",
    point: "江戸の銭湯文化から現代の温泉まで\n「身体が溶ける」感覚が生む共同体",
  },
  {
    title: "第四章",
    subtitle: "台所の水音、雨の気配",
    point: "古池や蛙飛びこむ水の音——\n水琴窟に至る、音で味わう日本の美意識",
  },
  {
    title: "第五章",
    subtitle: "川と海と田",
    point: "水利共同体、水論、海女の掟——\n水を分かち合う社会の知恵と葛藤",
  },
  {
    title: "第六章",
    subtitle: "水の文化を次の世代へ",
    point: "気候変動と失われゆく水の記憶\nコモンズとしての水を未来にどう継ぐか",
  },
];

const FRAME_PER_CHAPTER = 80;
const CHAPTER_TRANSITION = 15;

const ChapterCard: React.FC<{
  title: string;
  subtitle: string;
  point: string;
  index: number;
}> = ({ title, subtitle, point, index }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 15, FRAME_PER_CHAPTER - 20, FRAME_PER_CHAPTER],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const slideX = interpolate(frame, [0, 20], [80, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineScale = interpolate(frame, [15, 40], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const pointOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const pointY = interpolate(frame, [35, 55], [15, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Alternating alignment
  const isLeft = index % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0f1a",
        justifyContent: "center",
        alignItems: isLeft ? "flex-start" : "flex-end",
        padding: "0 180px",
      }}
    >
      {/* Chapter number watermark */}
      <div
        style={{
          position: "absolute",
          fontSize: 300,
          color: "rgba(26, 60, 52, 0.15)",
          fontFamily: "'Noto Serif CJK JP', serif",
          fontWeight: 900,
          top: "50%",
          left: isLeft ? "60%" : "10%",
          transform: "translateY(-50%)",
        }}
      >
        {index + 1}
      </div>

      <div
        style={{
          opacity,
          transform: `translateX(${isLeft ? slideX : -slideX}px)`,
          textAlign: isLeft ? "left" : "right",
          zIndex: 1,
          maxWidth: 900,
        }}
      >
        <p
          style={{
            fontSize: 28,
            color: "rgba(180, 220, 240, 0.6)",
            fontFamily: "'Noto Serif CJK JP', 'IPA明朝', serif",
            letterSpacing: 8,
            margin: "0 0 10px 0",
          }}
        >
          {title}
        </p>

        <div
          style={{
            width: 60 * lineScale,
            height: 2,
            backgroundColor: "rgba(180, 220, 240, 0.5)",
            marginBottom: 20,
            marginLeft: isLeft ? 0 : "auto",
          }}
        />

        <h2
          style={{
            fontSize: 56,
            color: "#e8f0f0",
            fontFamily: "'Noto Serif CJK JP', 'IPA明朝', serif",
            fontWeight: 600,
            margin: "0 0 24px 0",
            opacity: subtitleOpacity,
            textShadow: "0 2px 20px rgba(26, 60, 52, 0.6)",
          }}
        >
          {subtitle}
        </h2>

        {/* Chapter point */}
        <p
          style={{
            fontSize: 26,
            color: "rgba(200, 230, 245, 0.75)",
            fontFamily: "'Noto Serif CJK JP', 'IPA明朝', serif",
            fontWeight: 400,
            lineHeight: 1.8,
            letterSpacing: 2,
            margin: 0,
            opacity: pointOpacity,
            transform: `translateY(${pointY}px)`,
            whiteSpace: "pre-line",
          }}
        >
          {point}
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const ChapterFlash: React.FC = () => {
  return (
    <AbsoluteFill>
      {CHAPTERS.map((chapter, i) => (
        <Sequence
          key={i}
          from={i * (FRAME_PER_CHAPTER - CHAPTER_TRANSITION)}
          durationInFrames={FRAME_PER_CHAPTER}
        >
          <ChapterCard
            title={chapter.title}
            subtitle={chapter.subtitle}
            point={chapter.point}
            index={i}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
