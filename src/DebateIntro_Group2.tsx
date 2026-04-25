import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';

import { LocalFontLoader } from './components/LocalFontLoader';
import { GrainOverlay }    from './components/GrainOverlay';
import { Scene01_Intro }   from './scenes/Scene01_Intro';
import { Scene02_Past }    from './scenes/Scene02_Past';
import { Scene03_Present } from './scenes/Scene03_Present';
import { Scene04_Future }  from './scenes/Scene04_Future';
import { Scene05_Closing } from './scenes/Scene05_Closing';

// ── Timing map (absolute frames @ 30 fps) ────────────────────────────────
//
//  Scene 01 — Intro / Hook:       0 →  300  (10 s)  — map draws on, thesis question
//  Scene 02 — The Past:         300 → 1080  (26 s)  — manual banking, sepia era
//  Scene 03 — The Present:     1080 → 2160  (36 s)  — ATM exists, hesitation, data gap
//  Scene 04 — The Future:      2160 → 3120  (32 s)  — confident use, Krio UI, pillars
//  Scene 05 — Closing:         3120 → 3600  (16 s)  — "Build the roads. And teach the drivers."
//
//  Total: 3600 frames = 120 seconds

const S = {
  S1: { from: 0,    dur: 300  },
  S2: { from: 300,  dur: 780  },
  S3: { from: 1080, dur: 1080 },
  S4: { from: 2160, dur: 960  },
  S5: { from: 3120, dur: 480  },
} as const;

export const DebateIntro_Group2: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#0D1B2A' }}>

      <Sequence from={S.S1.from} durationInFrames={S.S1.dur}>
        <Scene01_Intro />
      </Sequence>

      <Sequence from={S.S2.from} durationInFrames={S.S2.dur}>
        <Scene02_Past />
      </Sequence>

      <Sequence from={S.S3.from} durationInFrames={S.S3.dur}>
        <Scene03_Present />
      </Sequence>

      <Sequence from={S.S4.from} durationInFrames={S.S4.dur}>
        <Scene04_Future />
      </Sequence>

      <Sequence from={S.S5.from} durationInFrames={S.S5.dur}>
        <Scene05_Closing />
      </Sequence>

      <GrainOverlay opacity={0.055} />
      <LocalFontLoader />
    </AbsoluteFill>
  );
};
