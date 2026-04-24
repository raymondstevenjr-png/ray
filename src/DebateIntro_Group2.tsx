import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';

import { LocalFontLoader }      from './components/LocalFontLoader';
import { Scene01_Aminata }      from './scenes/Scene01_Aminata';
import { Scene02_ThePlan }      from './scenes/Scene02_ThePlan';
import { Scene03_ThePromise }   from './scenes/Scene03_ThePromise';
import { Scene04_TheEvidence }  from './scenes/Scene04_TheEvidence';
import { Scene05_TheThesis }    from './scenes/Scene05_TheThesis';
import { Scene06_BackToAminata } from './scenes/Scene06_BackToAminata';
import { Scene07_ThreePaths }   from './scenes/Scene07_ThreePaths';
import { Scene08_EndCard }      from './scenes/Scene08_EndCard';
import { GrainOverlay }         from './components/GrainOverlay';

// ── Timing map (absolute frames at 30 fps) ────────────────────────────────
//
//  Scene 01 — Aminata:          0     → 360    (12 s)
//  Scene 02 — The Plan:         360   → 720    (12 s)
//  Scene 03 — The Promise:      720   → 1140   (14 s)
//  Scene 04 — The Evidence:     1140  → 1680   (18 s)
//  Scene 05 — The Thesis:       1680  → 2280   (20 s)
//  Scene 06 — Back to Aminata:  2280  → 2700   (14 s)
//  Scene 07 — Three Paths:      2700  → 3240   (18 s)
//  Scene 08 — End Card:         3240  → 3600   (12 s)
//
//  Total: 3600 frames = 120 seconds
//
// ── Audio cue reference (absolute frames) ────────────────────────────────
//  frame 0:    Scene 01 — soft ambient village sound + bird
//  frame 90:   Scene 01 — first caption (Aminata, 20.)
//  frame 210:  Scene 01 — second caption (She has a phone...)
//  frame 360:  Scene 02 — cut to paper / typewriter clicks begin
//  frame 600:  Scene 02 — pen scratch on MTNDP underline
//  frame 720:  Scene 03 — warm low pad begins
//  frame 820:  Scene 03 — chime: icon 1
//  frame 860:  Scene 03 — chime: icon 2
//  frame 900:  Scene 03 — chime: icon 3
//  frame 940:  Scene 03 — chime: icon 4
//  frame 1140: Scene 04 — evidence scene begins; tick sounds on count-up
//  frame 1395: Scene 04 — silence hold (4 seconds, frames 1395–1515)
//  frame 1515: Scene 04 — piano note (38% appears)
//  frame 1610: Scene 04 — piano note (final line)
//  frame 1680: Scene 05 — piano note (thesis begins, line 1)
//  frame 1800: Scene 05 — piano note (line 2)
//  frame 1920: Scene 05 — piano note (line 3)
//  frame 2035: Scene 05 — pen scratch between lines 3 and 4
//  frame 2040: Scene 05 — piano note (line 4)
//  frame 2160: Scene 05 — thesis final line; deep piano hit
//  frame 2190: Scene 05 — silence hold to end of scene
//  frame 2280: Scene 06 — ambient village sound returns
//  frame 2635: Scene 06 — ambient fades (silence on final caption)
//  frame 2700: Scene 07 — paper texture scene; rhythmic pacing
//  frame 2800: Scene 07 — paper slam: card 1
//  frame 2900: Scene 07 — paper slam: card 2
//  frame 3010: Scene 07 — paper slam: card 3
//  frame 3125: Scene 07 — warm pad swells (final line)
//  frame 3240: Scene 08 — gentle piano resolve
//  frame 3570: Scene 08 — fade to silence with black

const S = {
  S1: { from: 0,    dur: 360  },
  S2: { from: 360,  dur: 360  },
  S3: { from: 720,  dur: 420  },
  S4: { from: 1140, dur: 540  },
  S5: { from: 1680, dur: 600  },
  S6: { from: 2280, dur: 420  },
  S7: { from: 2700, dur: 540  },
  S8: { from: 3240, dur: 360  },
} as const;

export const DebateIntro_Group2: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Sequence from={S.S1.from} durationInFrames={S.S1.dur}>
        <Scene01_Aminata />
      </Sequence>

      <Sequence from={S.S2.from} durationInFrames={S.S2.dur}>
        <Scene02_ThePlan />
      </Sequence>

      <Sequence from={S.S3.from} durationInFrames={S.S3.dur}>
        <Scene03_ThePromise />
      </Sequence>

      <Sequence from={S.S4.from} durationInFrames={S.S4.dur}>
        <Scene04_TheEvidence />
      </Sequence>

      <Sequence from={S.S5.from} durationInFrames={S.S5.dur}>
        <Scene05_TheThesis />
      </Sequence>

      <Sequence from={S.S6.from} durationInFrames={S.S6.dur}>
        <Scene06_BackToAminata />
      </Sequence>

      <Sequence from={S.S7.from} durationInFrames={S.S7.dur}>
        <Scene07_ThreePaths />
      </Sequence>

      <Sequence from={S.S8.from} durationInFrames={S.S8.dur}>
        <Scene08_EndCard />
      </Sequence>

      {/* GrainOverlay: mounted once outside all Sequences so it renders
          on every frame, keeping the grain consistent across all scenes. */}
      <GrainOverlay opacity={0.08} />

      {/* LocalFontLoader: loads fonts from /public/localFonts.css via delayRender.
          Mounted outside all Sequences — fires once per composition render. */}
      <LocalFontLoader />
    </AbsoluteFill>
  );
};
