import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

// Persistent film grain + subtle vignette baked on top of every frame.
// Opacity pulses slightly to simulate analog film variation.
export const GrainOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Flicker grain opacity very subtly each frame
  const opacity = interpolate(
    Math.sin(frame * 1.7 + Math.cos(frame * 0.9)) * 0.5 + 0.5,
    [0, 1],
    [0.28, 0.42]
  );

  // SVG turbulence seed changes per frame to animate grain
  const seed = (frame * 7) % 100;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1000,
        mixBlendMode: "multiply",
        opacity,
      }}
    >
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <filter id={`grain-${frame}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width={width}
          height={height}
          filter={`url(#grain-${frame})`}
          opacity="0.55"
        />
        {/* Vignette */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="50%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
        </radialGradient>
        <rect width={width} height={height} fill="url(#vignette)" opacity="0.8" />
      </svg>
    </div>
  );
};
