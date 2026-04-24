import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { PaperBackground } from '../components/PaperBackground';
import { HandDrawnUnderline } from '../components/HandDrawnUnderline';
import { C, F } from '../tokens';

// ── Scene 05: THE THESIS ─────────────────────────────────────────────────
// Duration: 600 frames (20 seconds)
// Rubric: Strength of Core Argument (20 pts) — highest rubric category.
//         Give it room. One line at a time. Slow.
//
// Thesis: "Infrastructure without people is not transformation."
//
// AUDIO CUE: single piano note at frame 0 (scene open, line 1)
// AUDIO CUE: single piano note at frame 120 (line 2)
// AUDIO CUE: single piano note at frame 240 (line 3)
// AUDIO CUE: pen scratch sound at frame 355 (between lines 3 and 4)
// AUDIO CUE: single piano note at frame 360 (line 4)
// AUDIO CUE: silence holds from frame 510 to 600 (three seconds)

const LINES = [
  { text: 'Infrastructure is the road.',               startFrame: 0   },
  { text: 'But a road without drivers is just concrete.', startFrame: 120 },
  { text: 'A signal without literacy is just noise.',  startFrame: 240 },
  { text: 'A platform without local content is empty.', startFrame: 360 },
] as const;

// Final thesis line with underline
const THESIS_LINE = 'We must build for people, not just for pipes.';
const THESIS_START = 480;
const THESIS_UNDERLINE_WIDTH = 1040;

export const Scene05_TheThesis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const finalLineOpacity = interpolate(frame, [THESIS_START, THESIS_START + 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalLineY = interpolate(frame, [THESIS_START, THESIS_START + 24], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out to black at end (subtle)
  const fadeOut = interpolate(frame, [575, 600], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <PaperBackground />

      {/* ── Main thesis lines ──────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 140px',
          gap: 24,
        }}
      >
        {LINES.map(({ text, startFrame }) => {
          // Each line: spring fade-up into place, stays visible once appeared
          const progress = spring({
            frame: frame - startFrame,
            fps,
            config: { damping: 22, stiffness: 90, mass: 1 },
            durationInFrames: 22,
          });
          const opacity = interpolate(progress, [0, 0.4, 1], [0, 0.6, 1]);
          const translateY = interpolate(progress, [0, 1], [22, 0]);

          // ── Line 3 is the pivot line — slightly brighter weight ──
          const isKeyLine = text.includes('literacy');

          return (
            <div
              key={text}
              style={{
                fontFamily: F.serif,
                fontSize: 62,
                fontWeight: isKeyLine ? 700 : 400,
                fontStyle: isKeyLine ? 'normal' : 'italic',
                color: isKeyLine ? C.softBlack : C.navyBlue,
                lineHeight: 1.25,
                textAlign: 'center',
                opacity,
                transform: `translateY(${translateY}px)`,
                letterSpacing: '-0.01em',
              }}
            >
              {text}
            </div>
          );
        })}

        {/* ── Final thesis line with underline ─────────────────────── */}
        {/* AUDIO CUE: deep piano note at frame 480 */}
        {frame >= THESIS_START && (
          <div
            style={{
              marginTop: 32,
              position: 'relative',
              display: 'inline-block',
              opacity: finalLineOpacity,
              transform: `translateY(${finalLineY}px)`,
            }}
          >
            <div
              style={{
                fontFamily: F.serif,
                fontSize: 66,
                fontWeight: 900,
                color: C.deepRed,
                textAlign: 'center',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              {THESIS_LINE}
            </div>
            {/* Hand-drawn red underline */}
            <HandDrawnUnderline
              width={THESIS_UNDERLINE_WIDTH}
              color={C.deepRed}
              startFrame={THESIS_START + 18}
              drawDuration={36}
              strokeWidth={6}
              style={{
                bottom: -18,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          </div>
        )}
      </div>

      {/* Silence hold indicator — visual quietness. Nothing moves 510–600. */}

      {/* Fade to black */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          opacity: fadeOut,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
