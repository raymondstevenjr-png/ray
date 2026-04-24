import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { AnchorGirl } from '../components/AnchorGirl';
import { C, F } from '../tokens';

// ── Scene 01: AMINATA ────────────────────────────────────────────────────
// Duration: 360 frames (12 seconds)
// Rubric: Practical Relevance to Sierra Leone (15 pts)
//
// AUDIO CUE: soft ambient village sound + single bird at frame 0
// AUDIO CUE: ambient continues to frame 360

export const Scene01_Aminata: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Fade in from black
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Ken Burns: slow push in over 12 seconds
  const kbScale = interpolate(frame, [0, 360], [1.0, 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Drift slightly right as it pushes in
  const kbX = interpolate(frame, [0, 360], [0, -14], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Caption 1: "Aminata, 20." — handwritten, appears at second 3 (frame 90)
  const cap1Opacity = interpolate(frame, [90, 115], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cap1Y = interpolate(frame, [90, 115], [14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Caption 2: "She has a phone. She has signal. She is still waiting."
  // Appears at second 7 (frame 210), stays for rest of scene
  const cap2Opacity = interpolate(frame, [210, 240], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cap2Y = interpolate(frame, [210, 240], [14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn, background: '#000' }}>
      {/* Ken Burns wrapper — scale + translate on the portrait */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${kbScale}) translateX(${kbX}px)`,
          transformOrigin: 'center 35%',
        }}
      >
        <AnchorGirl vignetteIntensity={0.65} />
      </div>

      {/* ── Caption 1: "Aminata, 20." ─────────────────────────────────── */}
      {/* AUDIO CUE: none — silence lets the image breathe at frame 90 */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: 90,
          opacity: cap1Opacity,
          transform: `translateY(${cap1Y}px)`,
        }}
      >
        <span
          style={{
            fontFamily: F.hand,
            fontSize: 54,
            color: C.paperWhite,
            textShadow: '0 2px 12px rgba(0,0,0,0.7)',
            fontWeight: 600,
          }}
        >
          Aminata, 20.
        </span>
      </div>

      {/* ── Caption 2: "She has a phone..." ──────────────────────────── */}
      {/* AUDIO CUE: soft ambient swells slightly at frame 210 */}
      <div
        style={{
          position: 'absolute',
          bottom: 110,
          left: 90,
          maxWidth: 860,
          opacity: cap2Opacity,
          transform: `translateY(${cap2Y}px)`,
        }}
      >
        <span
          style={{
            fontFamily: F.hand,
            fontSize: 42,
            color: C.warmHighlight,
            textShadow: '0 2px 12px rgba(0,0,0,0.65)',
            fontWeight: 400,
            lineHeight: 1.4,
          }}
        >
          She has a phone. She has signal.{' '}
          <span style={{ color: C.paperWhite, fontWeight: 600 }}>
            She is still waiting.
          </span>
        </span>
      </div>

      {/* Bottom black fade-out into next scene */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          opacity: interpolate(frame, [340, 360], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
