import React from "react";
import { Composition } from "remotion";
import { DebateIntro, TOTAL_FRAMES } from "./DebateIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DebateIntro"
        component={DebateIntro}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
