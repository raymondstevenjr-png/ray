import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { GrainOverlay } from "./GrainOverlay";

// Beat 5 — 38 to 50 s (frames 1140–1500 in full composition).
// Receives localFrame = frame - 1140.
// Three polaroid cards appear in succession with a thud,
// each slightly rotated like they were tossed on a table.

interface Beat5Props {
  localFrame: number;
}

interface PolaroidCardProps {
  text: string;
  appearFrame: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  accentColor: string;
  localFrame: number;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({
  text,
  appearFrame,
  rotation,
  offsetX,
  offsetY,
  accentColor,
  localFrame,
}) => {
  const { fps } = useVideoConfig();
  const rel = localFrame - appearFrame;

  // AUDIO CUE: thud sound fires at each appearFrame in localFrame time:
  //   Card 1: localFrame 20 (~39.7s absolute)
  //   Card 2: localFrame 60 (~43s absolute)
  //   Card 3: localFrame 100 (~46.3s absolute)

  // Thud spring: drops in from above with overshoot
  const dropY = spring({
    frame: rel,
    fps,
    config: { damping: 9, stiffness: 180, mass: 1.1 },
    durationInFrames: 28,
    from: -380,
    to: 0,
  });

  const scaleIn = spring({
    frame: rel,
    fps,
    config: { damping: 11, stiffness: 200, mass: 0.9 },
    durationInFrames: 24,
    from: 0.6,
    to: 1,
  });

  const opacity = interpolate(rel, [0, 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (rel < 0) return null;

  // Polaroid dimensions
  const pW = 380;
  const pH = 440;
  const photoH = 300;
  const pad = 20;

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% + ${offsetX}px)`,
        top: `calc(50% + ${offsetY}px)`,
        transform: `translate(-50%, -50%) translateY(${dropY}px) rotate(${rotation}deg) scale(${scaleIn})`,
        opacity,
        width: pW,
        zIndex: 10,
        filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.55))",
      }}
    >
      {/* Polaroid frame */}
      <div
        style={{
          background: "#FAFAF5",
          width: pW,
          height: pH,
          padding: pad,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {/* Photo area with colored background + texture */}
        <div
          style={{
            width: "100%",
            height: photoH,
            background: accentColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle noise on photo area */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.2 }}>
            <filter id={`pnoise-${appearFrame}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed={appearFrame + 5} />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#pnoise-${appearFrame})`} />
          </svg>
          {/* Decorative mark on photo */}
          <div
            style={{
              width: 60,
              height: 60,
              border: "3px solid rgba(255,255,255,0.5)",
              borderRadius: "50%",
              opacity: 0.6,
            }}
          />
        </div>

        {/* Caption area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 8px",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 28,
              fontWeight: 700,
              color: "#1A1A1A",
              textAlign: "center",
              lineHeight: 1.3,
              fontStyle: "italic",
            }}
          >
            {text}
          </span>
        </div>
      </div>

      {/* Tape strip at top */}
      <div
        style={{
          position: "absolute",
          top: -14,
          left: "50%",
          transform: "translateX(-50%) rotate(-1deg)",
          width: 90,
          height: 28,
          background: "rgba(240,230,180,0.72)",
          borderRadius: 2,
        }}
      />
    </div>
  );
};

const CARDS = [
  {
    text: "Broadband is not enough.",
    appearFrame: 20,
    rotation: -4,
    offsetX: -280,
    offsetY: 30,
    accentColor: "#C0392B",
  },
  {
    text: "Skills unlock access.",
    appearFrame: 65,
    rotation: 2.5,
    offsetX: 0,
    offsetY: -20,
    accentColor: "#1B3A57",
  },
  {
    text: "Local voices build local futures.",
    appearFrame: 110,
    rotation: 5,
    offsetX: 280,
    offsetY: 50,
    accentColor: "#1A1A1A",
  },
];

export const Beat5Polaroids: React.FC<Beat5Props> = ({ localFrame }) => {
  const { width, height } = useVideoConfig();

  // Background — dark, moody
  const bgOpacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        height,
        background: "#111010",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Warm desk surface suggestion */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 70%, rgba(80,50,20,0.4) 0%, transparent 70%)",
          opacity: bgOpacity,
        }}
      />

      {/* Cards */}
      {CARDS.map((card) => (
        <PolaroidCard
          key={card.appearFrame}
          localFrame={localFrame}
          {...card}
        />
      ))}

      <GrainOverlay />
    </div>
  );
};
