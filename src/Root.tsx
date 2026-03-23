import React from "react";
import { Composition } from "remotion";
import { BookTrailer } from "./BookTrailer";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BookTrailer"
      component={BookTrailer}
      durationInFrames={1800}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
