import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { C } from '../tokens';

interface PaperBackgroundProps {
  tint?: string;  // override base color
  noiseOpacity?: number;
}

// Warm off-white paper with SVG fiber texture via feTurbulence + feDisplacementMap.
// Use as the base of any scene that needs the documentary paper look.
export const PaperBackground: React.FC<PaperBackgroundProps> = ({
  tint = C.paperWhite,
  noiseOpacity = 0.14,
}) => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: tint }}>
      <svg
        style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
        width={width}
        height={height}
      >
        <defs>
          <filter id="paper-fiber" x="0%" y="0%" width="100%" height="100%">
            {/* Fine grain */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65 0.55"
              numOctaves="4"
              seed="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended" />
            {/* Subtle surface displacement */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.024"
              numOctaves="3"
              seed="7"
              result="dispNoise"
            />
            <feDisplacementMap
              in="blended"
              in2="dispNoise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <rect
          width={width}
          height={height}
          fill={tint}
          filter="url(#paper-fiber)"
          opacity={noiseOpacity}
        />
        {/* Subtle vignette — darkens edges slightly */}
        <defs>
          <radialGradient id="paper-vignette" cx="50%" cy="50%" r="75%">
            <stop offset="55%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(26,26,26,0.12)" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#paper-vignette)" />
      </svg>
    </AbsoluteFill>
  );
};
