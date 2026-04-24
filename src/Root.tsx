import React from 'react';
import { Composition } from 'remotion';
import { DebateIntro, TOTAL_FRAMES } from './DebateIntro';
import { DebateIntro_Group2 }        from './DebateIntro_Group2';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Original DebateIntro — neutral explainer (60 s) */}
      <Composition
        id="DebateIntro"
        component={DebateIntro}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* Group 2 debate intro — 2-minute strategic video (120 s) */}
      <Composition
        id="DebateIntro-Group2"
        component={DebateIntro_Group2}
        durationInFrames={3600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
