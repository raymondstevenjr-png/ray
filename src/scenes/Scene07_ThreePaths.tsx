import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { PaperBackground } from '../components/PaperBackground';
import { C, F } from '../tokens';

// ── Scene 07: THREE PATHS ────────────────────────────────────────────────
// Duration: 540 frames (18 seconds)
// Rubric: Strategic Policy Recommendations (10 pts) + Innovation (10 pts)
//
// Three polaroid cards spring in with deliberate pacing.
// Card titles ARE the asks. Subtexts ARE the policy detail.
//
// AUDIO CUE: paper slam at frame 100 (card 1 lands)
// AUDIO CUE: paper slam at frame 200 (card 2 lands)
// AUDIO CUE: paper slam at frame 310 (card 3 lands)
// AUDIO CUE: warm pad swells at frame 425 (final line)

interface PolaroidCardData {
  title: string;
  subtext: string;
  accentColor: string;
  accentLabel: string;
  cardRotation: number;
  springStart: number;
  xOffset: number;
  yOffset: number;
}

const CARDS: PolaroidCardData[] = [
  {
    title:       'Digital literacy\nin every school.',
    subtext:     'From primary to tertiary.\nIn English and Krio.',
    accentColor: C.navyBlue,
    accentLabel: '01',
    cardRotation: -2.5,
    springStart:  100,
    xOffset:     -490,
    yOffset:      20,
  },
  {
    title:       'Institutions that\nmatch the technology.',
    subtext:     'Data protection. Regulatory reform.\nE-governance that serves citizens.',
    accentColor: C.deepRed,
    accentLabel: '02',
    cardRotation: 1.5,
    springStart:  200,
    xOffset:       0,
    yOffset:     -25,
  },
  {
    title:       'Local content by\nlocal creators.',
    subtext:     'Support for SL platforms, media,\nand innovators. Our voice.',
    accentColor: C.softBlack,
    accentLabel: '03',
    cardRotation: 3.8,
    springStart:  310,
    xOffset:      490,
    yOffset:      35,
  },
];

interface PolaroidCardProps {
  data: PolaroidCardData;
  frame: number;
  fps: number;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({ data, frame, fps }) => {
  const { title, subtext, accentColor, accentLabel, cardRotation, springStart, xOffset, yOffset } = data;

  if (frame < springStart) return null;

  // AUDIO CUE: paper slam at frame {springStart}
  const dropProgress = spring({
    frame: frame - springStart,
    fps,
    config: { damping: 9, stiffness: 200, mass: 1.2 },
    durationInFrames: 30,
    from: -520,
    to: 0,
  });
  const cardOpacity = interpolate(frame, [springStart, springStart + 5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const W = 440;
  const photoH = 200;
  const PAD = 22;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `
          translate(-50%, -50%)
          translate(${xOffset}px, ${yOffset}px)
          translateY(${dropProgress}px)
          rotate(${cardRotation}deg)
        `,
        width: W,
        opacity: cardOpacity,
        filter: 'drop-shadow(0 14px 32px rgba(0,0,0,0.30))',
        zIndex: 10,
      }}
    >
      {/* Tape strip */}
      <div
        style={{
          position: 'absolute',
          top: -14,
          left: '50%',
          transform: 'translateX(-50%) rotate(-1.5deg)',
          width: 84,
          height: 26,
          background: 'rgba(232,213,183,0.75)',
          borderRadius: 2,
          zIndex: 11,
        }}
      />

      {/* Polaroid frame */}
      <div
        style={{
          background: '#FAFAF5',
          padding: PAD,
          boxSizing: 'border-box',
          borderRadius: 2,
        }}
      >
        {/* Color photo area */}
        <div
          style={{
            width: W - PAD * 2,
            height: photoH,
            background: accentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* SVG noise texture on photo */}
          <svg style={{ position: 'absolute', inset: 0, opacity: 0.15, width: '100%', height: '100%' }}>
            <filter id={`pnoise-${accentLabel}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed={parseInt(accentLabel)} />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#pnoise-${accentLabel})`} />
          </svg>

          {/* Number label */}
          <span
            style={{
              fontFamily: F.serif,
              fontSize: 72,
              fontWeight: 900,
              color: 'rgba(244,239,230,0.25)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              zIndex: 1,
            }}
          >
            {accentLabel}
          </span>

          {/* Decorative mark */}
          <div
            style={{
              width: 48,
              height: 48,
              border: '3px solid rgba(244,239,230,0.35)',
              borderRadius: '50%',
              zIndex: 1,
            }}
          />
        </div>

        {/* Caption area */}
        <div
          style={{
            paddingTop: 16,
            paddingBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: F.serif,
              fontSize: 26,
              fontWeight: 700,
              color: C.softBlack,
              lineHeight: 1.25,
              whiteSpace: 'pre-line',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: F.sans,
              fontSize: 16,
              color: C.navyBlue,
              lineHeight: 1.5,
              opacity: 0.78,
              whiteSpace: 'pre-line',
            }}
          >
            {subtext}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene07_ThreePaths: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Headline
  const headlineOpacity = interpolate(frame, [18, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [18, 55], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Final line — MTNDP callback
  // AUDIO CUE: warm pad swells at frame 425
  const finalLineOpacity = interpolate(frame, [425, 465], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalLineY = interpolate(frame, [425, 465], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <PaperBackground />

      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          top: 72,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: F.serif,
            fontSize: 52,
            fontWeight: 700,
            color: C.softBlack,
            textAlign: 'center',
            letterSpacing: '0.01em',
          }}
        >
          Three investments Sierra Leone must make.
        </div>
      </div>

      {/* ── Polaroid cards ────────────────────────────────────────── */}
      {CARDS.map((card) => (
        <PolaroidCard key={card.accentLabel} data={card} frame={frame} fps={fps} />
      ))}

      {/* ── Final line — MTNDP callback ───────────────────────────── */}
      {/* AUDIO CUE: warm pad swells at frame 425 */}
      {frame >= 425 && (
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: finalLineOpacity,
            transform: `translateY(${finalLineY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: F.serif,
              fontSize: 32,
              fontStyle: 'italic',
              color: C.navyBlue,
              textAlign: 'center',
              maxWidth: 1000,
              lineHeight: 1.5,
              padding: '14px 32px',
              borderTop: `2px solid ${C.warmMid}`,
            }}
          >
            This is what the MTNDP asked for. This is what inclusive growth requires.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
