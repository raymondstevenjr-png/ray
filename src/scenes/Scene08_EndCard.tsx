import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { PaperBackground } from '../components/PaperBackground';
import { AnchorGirl } from '../components/AnchorGirl';
import { C, F } from '../tokens';

// ── Scene 08: END CARD ───────────────────────────────────────────────────
// Duration: 360 frames (12 seconds)
// Rubric: Closing Impact & Persuasiveness (5 pts)
// Strategy: Give the lead speaker a line to echo live.
//
// AUDIO CUE: gentle piano resolve at frame 0
// AUDIO CUE: fade to silence starting at frame 330

export const Scene08_EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Aminata — small, centered, faded into the paper
  const aminataOpacity = interpolate(frame, [10, 50], [0, 0.22], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Main headline springs in
  const headlineProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.9 },
    durationInFrames: 26,
    from: 0.6,
    to: 1,
  });
  const headlineOpacity = interpolate(frame, [30, 52], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtext fades in
  const subtextOpacity = interpolate(frame, [120, 155], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subtextY = interpolate(frame, [120, 155], [14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fine print
  const finePrintOpacity = interpolate(frame, [185, 220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Red rule grows
  const ruleWidth = interpolate(
    spring({
      frame: frame - 90,
      fps,
      config: { damping: 20, stiffness: 120 },
      durationInFrames: 28,
    }),
    [0, 1],
    [0, 640]
  );

  // Final black fade (last 20 frames = 340–360)
  // AUDIO CUE: fade to silence at frame 330
  const blackOpacity = interpolate(frame, [340, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <PaperBackground />

      {/* ── Aminata: small, centered, faded into paper ────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: aminataOpacity,
          mixBlendMode: 'multiply',
        }}
      >
        <AnchorGirl vignetteIntensity={0.0} opacity={1} />
      </div>

      {/* ── Main content ──────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          padding: '0 120px',
        }}
      >
        {/* Main headline — the line the lead speaker will echo */}
        <div
          style={{
            fontFamily: F.serif,
            fontSize: 88,
            fontWeight: 900,
            color: C.softBlack,
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            transform: `scale(${headlineProgress})`,
            opacity: headlineOpacity,
            transformOrigin: 'center center',
          }}
        >
          Build the roads.
          <br />
          <span style={{ color: C.deepRed }}>And teach the drivers.</span>
        </div>

        {/* Red rule */}
        <div
          style={{
            marginTop: 28,
            height: 4,
            width: ruleWidth,
            background: C.deepRed,
            borderRadius: 2,
          }}
        />

        {/* Subtext */}
        <div
          style={{
            marginTop: 28,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            opacity: subtextOpacity,
            transform: `translateY(${subtextY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: F.sans,
              fontSize: 28,
              fontWeight: 600,
              color: C.navyBlue,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            The SLPPNA Debate · Young Generation Retreat · 2025
          </div>
        </div>

        {/* Fine print: "Sierra Leone." */}
        <div
          style={{
            marginTop: 22,
            fontFamily: F.serif,
            fontSize: 26,
            fontStyle: 'italic',
            color: C.softBlack,
            opacity: finePrintOpacity * 0.55,
            letterSpacing: '0.06em',
          }}
        >
          Sierra Leone.
        </div>

        {/* Group 2 label — subtle */}
        <div
          style={{
            marginTop: 48,
            fontFamily: F.sans,
            fontSize: 18,
            color: C.navyBlue,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: finePrintOpacity * 0.5,
          }}
        >
          Group 2 · Infrastructure alone is not sufficient.
        </div>
      </div>

      {/* Final fade to soft black */}
      {/* AUDIO CUE: gentle piano resolve fades to silence at frame 330 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#1A1A1A',
          opacity: blackOpacity,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
