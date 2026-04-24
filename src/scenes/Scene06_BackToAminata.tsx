import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { AnchorGirl } from '../components/AnchorGirl';
import { C, F } from '../tokens';

// ── Scene 06: BACK TO AMINATA ────────────────────────────────────────────
// Duration: 420 frames (14 seconds)
// Rubric: Practical Relevance (15 pts) — bridges thesis to recommendations.
//
// We return to the same portrait. The stats were abstract. Aminata is real.
//
// AUDIO CUE: soft ambient village sound returns, very low, at frame 0
// AUDIO CUE: ambient fades slightly at frame 360 (silence on final line)

const CAPTIONS = [
  { text: 'Aminata can open an app.',               start: 30,  end: 115 },
  { text: 'But the app is not in Krio.',             start: 115, end: 200 },
  { text: 'The service is not designed for her.',   start: 200, end: 285 },
  { text: 'The training never reached her village.', start: 285, end: 370 },
];
const FINAL_CAPTION = { text: 'She is connected. She is not included.', start: 370 };

export const Scene06_BackToAminata: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Slightly tighter Ken Burns than Scene01 — we're closer now
  const kbScale = interpolate(frame, [0, 420], [1.0, 1.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const kbX = interpolate(frame, [0, 420], [0, 8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Active caption logic — transitions between captions
  const activeCaption = (() => {
    for (const cap of [...CAPTIONS].reverse()) {
      if (frame >= cap.start) return cap;
    }
    return null;
  })();

  const showFinal = frame >= FINAL_CAPTION.start;

  // Current caption text & opacity
  const captionText = showFinal
    ? FINAL_CAPTION.text
    : activeCaption?.text ?? '';

  // Each caption gets its own opacity — fades in when it starts
  const getCaptionOpacity = (start: number) =>
    interpolate(frame, [start, start + 20], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const captionOpacity = showFinal
    ? getCaptionOpacity(FINAL_CAPTION.start)
    : activeCaption
    ? getCaptionOpacity(activeCaption.start)
    : 0;

  // AUDIO CUE: ambient fades at frame 360 (silence on final line)
  const ambientOpacity = interpolate(frame, [355, 375], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  void ambientOpacity; // referenced only in audio cue comment

  return (
    <AbsoluteFill style={{ opacity: fadeIn, background: '#000' }}>
      {/* Ken Burns push */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${kbScale}) translateX(${kbX}px)`,
          transformOrigin: 'center 38%',
        }}
      >
        <AnchorGirl vignetteIntensity={0.7} />
      </div>

      {/* ── Handwritten caption ───────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 160,
          left: 100,
          right: 100,
          opacity: captionOpacity,
        }}
      >
        {/* Caption card — soft dark translucent background */}
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(26,26,26,0.62)',
            padding: '14px 28px',
            backdropFilter: 'blur(2px)',
          }}
        >
          <span
            style={{
              fontFamily: F.hand,
              fontSize: showFinal ? 52 : 46,
              color: showFinal ? C.paperWhite : C.warmHighlight,
              fontWeight: showFinal ? 700 : 400,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              letterSpacing: showFinal ? '0.02em' : '0',
            }}
          >
            {captionText}
          </span>
        </div>
      </div>

      {/* Left accent bar — marks this as our evidence */}
      <div
        style={{
          position: 'absolute',
          left: 70,
          top: '25%',
          bottom: '25%',
          width: 4,
          background: C.deepRed,
          opacity: interpolate(frame, [15, 35], [0, 0.8], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          borderRadius: 2,
        }}
      />
    </AbsoluteFill>
  );
};
