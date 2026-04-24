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
import { SourceTag } from '../components/SourceTag';
import { C, F } from '../tokens';

// ── Scene 02: THE PLAN ───────────────────────────────────────────────────
// Duration: 360 frames (12 seconds)
// Rubric: Understanding of the Motion & MTNDP Alignment (15 pts)
//
// AUDIO CUE: typewriter clicks at frames 40–140 (word-by-word typing)
// AUDIO CUE: pen scratch on underline at frame 240

const QUOTE = '"human capital, governance systems,\nand innovation ecosystems."';
const QUOTE_UNDERLINE_WIDTH = 860;

export const Scene02_ThePlan: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // MTNDP document card zooms in slightly over first 2 seconds
  const docScale = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 80, mass: 1 },
    durationInFrames: 60,
    from: 0.88,
    to: 1,
  });

  // Headline "Sierra Leone's national plan." — types letter by letter
  // AUDIO CUE: typewriter clicks at frame 40
  const headline = "Sierra Leone's national plan.";
  const headlineReveal = Math.floor(
    interpolate(frame, [30, 130], [0, headline.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Subtitle fades in
  const subtitleOpacity = interpolate(frame, [140, 165], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Quote fades in word by word starting at frame 170
  const quoteWords = QUOTE.replace('\n', ' ').split(' ');
  const quoteWordCount = Math.floor(
    interpolate(frame, [170, 250], [0, quoteWords.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Underline draws at frame 240 — over the full quote
  // AUDIO CUE: pen scratch at frame 240

  // Source tag appears at frame 150
  const sourceOpacity = interpolate(frame, [150, 170], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <PaperBackground />

      {/* ── MTNDP document card ────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${docScale})`,
          width: 960,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {/* Document header bar — government navy */}
        <div
          style={{
            width: '100%',
            background: C.navyBlue,
            padding: '18px 40px',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
          }}
        >
          {/* Coat of arms placeholder */}
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              border: `2px solid rgba(244,239,230,0.6)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: F.serif, fontSize: 14, color: C.paperWhite, fontWeight: 700 }}>
              SL
            </span>
          </div>
          <span
            style={{
              fontFamily: F.sans,
              fontSize: 18,
              color: C.paperWhite,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 600,
              opacity: 0.88,
            }}
          >
            Government of Sierra Leone
          </span>
        </div>

        {/* Main document body */}
        <div
          style={{
            width: '100%',
            background: C.paperWhite,
            padding: '44px 52px 48px',
            borderLeft: `5px solid ${C.deepRed}`,
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          }}
        >
          {/* ── Headline types in ──────────────────────────────────────── */}
          <div
            style={{
              fontFamily: F.serif,
              fontSize: 48,
              fontWeight: 700,
              color: C.softBlack,
              lineHeight: 1.15,
              marginBottom: 14,
              minHeight: 58,
            }}
          >
            {headline.slice(0, headlineReveal)}
            {/* Blinking cursor while typing */}
            {headlineReveal < headline.length && (
              <span
                style={{
                  opacity: Math.round(frame / 4) % 2 === 0 ? 1 : 0,
                  color: C.deepRed,
                }}
              >
                |
              </span>
            )}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: F.sans,
              fontSize: 20,
              color: C.navyBlue,
              letterSpacing: '0.06em',
              marginBottom: 36,
              opacity: subtitleOpacity,
              fontWeight: 500,
            }}
          >
            Medium-Term National Development Plan · 2024–2030
          </div>

          {/* Divider */}
          <div
            style={{
              width: '100%',
              height: 1,
              background: C.warmMid,
              marginBottom: 32,
              opacity: subtitleOpacity,
            }}
          />

          {/* ── MTNDP Quote ─────────────────────────────────────────────── */}
          <div
            style={{
              fontFamily: F.serif,
              fontSize: 28,
              fontStyle: 'italic',
              color: C.softBlack,
              lineHeight: 1.6,
              position: 'relative',
              paddingLeft: 24,
              borderLeft: `3px solid ${C.navyBlue}`,
            }}
          >
            {/* Word-by-word reveal */}
            {quoteWords.map((word, i) => (
              <span
                key={i}
                style={{
                  opacity: i < quoteWordCount ? 1 : 0,
                  display: 'inline',
                }}
              >
                {word.replace('\\n', ' ')}{' '}
              </span>
            ))}

            {/* Hand-drawn underline over the full quote */}
            {/* AUDIO CUE: pen scratch at frame 240 */}
            <HandDrawnUnderline
              width={QUOTE_UNDERLINE_WIDTH}
              color={C.deepRed}
              startFrame={240}
              drawDuration={30}
              style={{ bottom: -16, left: 24 }}
            />
          </div>

          {/* Context label */}
          <div
            style={{
              marginTop: 40,
              fontFamily: F.sans,
              fontSize: 16,
              color: C.navyBlue,
              opacity: subtitleOpacity * 0.7,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Priority pillars identified alongside digital infrastructure
          </div>
        </div>
      </div>

      {/* Source tag */}
      <div style={{ opacity: sourceOpacity, position: 'absolute', inset: 0 }}>
        <SourceTag
          source="Government of Sierra Leone, MTNDP 2024–2030"
          color={C.navyBlue}
          position="bottom-right"
        />
      </div>
    </AbsoluteFill>
  );
};
