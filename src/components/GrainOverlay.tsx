import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

interface GrainOverlayProps {
  opacity?: number; // default 0.08 per Group2 style
}

// Full-screen film grain overlay. Mount once at the top of the main composition.
// Per-frame SVG turbulence seed keeps the grain animated.
export const GrainOverlay: React.FC<GrainOverlayProps> = ({ opacity = 0.08 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const seed = (frame * 7) % 100;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        zIndex: 1000,
        mixBlendMode: 'multiply',
        opacity,
      }}
    >
      <svg width={width} height={height}>
        <filter id={`grain-${frame}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width={width} height={height} filter={`url(#grain-${frame})`} />
      </svg>
    </AbsoluteFill>
  );
};
