import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { PaperBackground } from '../components/PaperBackground';
import { HandDrawnUnderline } from '../components/HandDrawnUnderline';

export const Scene01_Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cl = (v: number) => Math.max(0, Math.min(1, v));

  const paperFade  = cl(frame / 20);
  const labelFade  = cl((frame - 20) / 30);
  const line1Prog  = spring({ frame: frame - 35, fps, config: { damping: 22, stiffness: 90 } });
  const line1Y     = interpolate(line1Prog, [0, 1], [50, 0]);
  const line1Fade  = cl((frame - 35) / 25);
  const line2Prog  = spring({ frame: frame - 85, fps, config: { damping: 18, stiffness: 80 } });
  const line2Y     = interpolate(line2Prog, [0, 1], [40, 0]);
  const line2Fade  = cl((frame - 85) / 25);
  const subFade    = cl((frame - 145) / 30);
  const badgeFade  = cl((frame - 210) / 30);
  const fadeOut    = 1 - cl((frame - 265) / 35);

  return (
    <AbsoluteFill style={{ opacity: Math.min(paperFade, fadeOut) }}>
      <PaperBackground />

      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 140px',
        gap: 0,
      }}>
        {/* Group label */}
        <div style={{
          opacity: labelFade,
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          fontSize: 14, letterSpacing: 8, color: '#8B6B4A',
          textTransform: 'uppercase', marginBottom: 36,
        }}>
          Group 2 · SLPPNA Young Generation Retreat 2025
        </div>

        {/* Title line 1 */}
        <div style={{
          opacity: line1Fade,
          transform: `translateY(${line1Y}px)`,
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 68, fontWeight: 700,
          color: '#1A1A1A', textAlign: 'center', lineHeight: 1.15,
          marginBottom: 6,
        }}>
          Digital infrastructure
        </div>

        {/* Title line 2 — the core claim */}
        <div style={{
          opacity: line2Fade,
          transform: `translateY(${line2Y}px)`,
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 76, fontWeight: 900,
          color: '#C0392B', textAlign: 'center', lineHeight: 1.1,
          marginBottom: 10,
          position: 'relative',
        }}>
          is not enough.
        </div>

        {/* Animated underline */}
        <div style={{ width: 620, height: 12, marginBottom: 44, opacity: line2Fade }}>
          <HandDrawnUnderline
            x={0} y={0} width={620} color="#C0392B"
            startFrame={115} drawDuration={45}
          />
        </div>

        {/* Subtitle */}
        <div style={{
          opacity: subFade,
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          fontSize: 22, color: '#5A5A5A',
          textAlign: 'center', lineHeight: 1.7, maxWidth: 720,
          marginBottom: 52,
        }}>
          Access alone does not create innovation,<br />
          productivity, or inclusive growth.
        </div>

        {/* Badge */}
        <div style={{
          opacity: badgeFade,
          padding: '14px 36px',
          border: '2px solid #1B3A57',
          borderRadius: 4,
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          fontSize: 13, letterSpacing: 5,
          color: '#1B3A57', textTransform: 'uppercase',
        }}>
          Opening Position · Group 2
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
