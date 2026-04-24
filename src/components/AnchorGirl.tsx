import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { C, F } from '../tokens';

interface AnchorGirlProps {
  // Ken Burns scale — apply externally via a wrapper transform
  vignetteIntensity?: number; // 0–1, default 0.6
  opacity?: number;
}

// ─── ASSET INSTRUCTIONS ───────────────────────────────────────────────────
// DROP IN: public/aminata.jpg
//   • Portrait orientation: 1080 × 1920 px (or any 9:16 crop)
//   • Subject: young Sierra Leonean woman (~20), holding a phone
//   • Lighting: warm, natural outdoor/village light
//   • Expression: neutral, thoughtful — she is looking slightly off-camera
//   • Phone: visible in hand, screen facing her or slightly toward camera
//
// To swap in the real photo:
//   1. Copy aminata.jpg into the /public/ folder
//   2. Replace the placeholder <div> below with:
//      <Img src={staticFile('aminata.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//   3. Import: import { Img, staticFile } from 'remotion';
// ──────────────────────────────────────────────────────────────────────────

export const AnchorGirl: React.FC<AnchorGirlProps> = ({
  vignetteIntensity = 0.6,
  opacity = 1,
}) => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* ── Placeholder portrait ────────────────────────────────────────── */}
      {/* Replace this entire block with <Img> once aminata.jpg is in /public/ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            170deg,
            #4A2C0A 0%,
            #7A4E2A 25%,
            #A06A3A 45%,
            #5C3A1A 75%,
            #2A1A0A 100%
          )`,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Stylized silhouette */}
        <svg
          width={width}
          height={height}
          viewBox="0 0 1920 1080"
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Background trees / village shapes */}
          <ellipse cx="300" cy="900" rx="180" ry="350" fill="rgba(20,40,10,0.35)" />
          <ellipse cx="1620" cy="880" rx="200" ry="380" fill="rgba(20,40,10,0.3)" />
          <rect x="280" y="820" width="40" height="260" fill="rgba(30,20,5,0.5)" />
          <rect x="1590" y="800" width="44" height="280" fill="rgba(30,20,5,0.5)" />
          {/* Ground line */}
          <rect x="0" y="980" width="1920" height="100" fill="rgba(40,25,5,0.6)" />

          {/* ── Silhouette of young woman ─────────────────────────────── */}
          {/* Head */}
          <ellipse cx="960" cy="260" rx="88" ry="102" fill="#2A1A0A" />
          {/* Natural hair — fuller afro */}
          <ellipse cx="960" cy="218" rx="115" ry="105" fill="#1A0E04" />
          <ellipse cx="870" cy="250" rx="50" ry="80" fill="#1A0E04" />
          <ellipse cx="1050" cy="250" rx="50" ry="80" fill="#1A0E04" />
          {/* Neck */}
          <rect x="930" y="355" width="60" height="60" rx="8" fill="#3D2210" />
          {/* Shoulders / body */}
          <path
            d="M 780 420 Q 820 390 930 415 L 960 850 L 990 415 Q 1100 390 1140 420 L 1160 880 L 760 880 Z"
            fill="#1B3A57"
          />
          {/* Left arm — extends slightly, holding phone */}
          <path
            d="M 790 430 Q 750 500 730 580 L 760 600 Q 778 520 820 455 Z"
            fill="#3D2210"
          />
          {/* Right arm — held out with phone */}
          <path
            d="M 1130 430 Q 1200 500 1240 580 L 1200 620 Q 1160 530 1095 455 Z"
            fill="#3D2210"
          />
          {/* Phone in right hand */}
          <rect x="1190" y="560" width="52" height="88" rx="7" fill="#111" />
          <rect x="1195" y="566" width="42" height="72" rx="4" fill="#1B3A57" />
          {/* Screen glow */}
          <rect x="1198" y="570" width="36" height="5" rx="2" fill="rgba(244,239,230,0.6)" />
          <rect x="1198" y="580" width="28" height="5" rx="2" fill="rgba(244,239,230,0.4)" />
          <rect x="1198" y="590" width="32" height="5" rx="2" fill="rgba(244,239,230,0.4)" />
        </svg>

        {/* Development label — remove once real photo is in place */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(26,26,26,0.7)',
            padding: '8px 24px',
            fontFamily: F.sans,
            fontSize: 18,
            color: C.warmHighlight,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          AMINATA PORTRAIT — add public/aminata.jpg
        </div>
      </div>

      {/* ── Warm vignette ───────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(
            ellipse at 50% 40%,
            transparent 30%,
            rgba(26,16,4,${vignetteIntensity * 0.85}) 100%
          )`,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
