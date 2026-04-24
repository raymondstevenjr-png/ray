import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { GrainOverlay } from "./GrainOverlay";
import { StaggeredChars } from "./KineticText";

// Beat 6 — 50 to 60 s (frames 1500–1800 in full composition).
// Receives localFrame = frame - 1500.
// Bold title card: "The SLPPNA Debate" + subtext, then paper texture fades
// to black over the final 3 seconds.

interface Beat6Props {
  localFrame: number;
}

export const Beat6EndCard: React.FC<Beat6Props> = ({ localFrame }) => {
  const { fps, width, height } = useVideoConfig();

  // TOTAL localDuration = 300 frames (10 s)

  // Card appears on a paper background
  const paperOpacity = interpolate(localFrame, [0, 20, 240, 300], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Black overlay for final fade
  const blackOpacity = interpolate(localFrame, [240, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "THE" — quick pop
  const theScale = spring({
    frame: localFrame - 8,
    fps,
    config: { damping: 16, stiffness: 200 },
    durationInFrames: 16,
    from: 0.5,
    to: 1,
  });

  // "SLPPNA" — big reveal
  const slppnaScale = spring({
    frame: localFrame - 20,
    fps,
    config: { damping: 12, stiffness: 160, mass: 0.8 },
    durationInFrames: 22,
    from: 0.3,
    to: 1,
  });
  const slppnaOpacity = interpolate(localFrame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "DEBATE" — kinetic staggered chars
  const debateStart = 45;

  // Subtext slides up
  const subTextY = interpolate(
    spring({
      frame: localFrame - 85,
      fps,
      config: { damping: 18, stiffness: 120 },
      durationInFrames: 22,
    }),
    [0, 1],
    [30, 0]
  );
  const subTextOpacity = interpolate(localFrame, [85, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red rule grows
  const ruleWidth = interpolate(
    spring({
      frame: localFrame - 70,
      fps,
      config: { damping: 20, stiffness: 130 },
      durationInFrames: 24,
    }),
    [0, 1],
    [0, 560]
  );

  // SLPPNA logo/monogram placeholder
  const logoOpacity = interpolate(localFrame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Paper background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#F4EFE6",
          opacity: paperOpacity,
        }}
      />

      {/* Paper texture SVG */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: paperOpacity * 0.18,
        }}
      >
        <filter id="paper-b6">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.055"
            numOctaves="5"
            seed="12"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-b6)" />
      </svg>

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          opacity: paperOpacity,
        }}
      >
        {/* "THE" */}
        <div
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            fontSize: 38,
            fontWeight: 700,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#1B3A57",
            transform: `scale(${theScale})`,
            marginBottom: 8,
          }}
        >
          The
        </div>

        {/* "SLPPNA" — hero word */}
        <div
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 168,
            fontWeight: 900,
            color: "#1A1A1A",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            transform: `scale(${slppnaScale})`,
            opacity: slppnaOpacity,
            transformOrigin: "center center",
          }}
        >
          SLPPNA
        </div>

        {/* "DEBATE" — staggered chars */}
        <div
          style={{
            marginTop: 12,
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 96,
            fontWeight: 700,
            color: "#C0392B",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {/* AUDIO CUE [~51.5s]: deep bass hit as "DEBATE" letters lock in */}
          <StaggeredChars
            text="DEBATE"
            startFrame={debateStart}
            staggerFrames={5}
            durationFrames={16}
          />
        </div>

        {/* Red rule */}
        <div
          style={{
            marginTop: 24,
            height: 5,
            background: "#C0392B",
            width: ruleWidth,
            borderRadius: 3,
          }}
        />

        {/* Subtext */}
        <div
          style={{
            marginTop: 22,
            transform: `translateY(${subTextY}px)`,
            opacity: subTextOpacity,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              fontSize: 30,
              color: "#1B3A57",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Young Generation Retreat, 2025
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 22,
              color: "#1A1A1A",
              fontStyle: "italic",
              opacity: 0.65,
            }}
          >
            Sierra Leone People's Party — North America
          </div>
        </div>

        {/* Monogram / logo placeholder */}
        {/* ASSET: public/slppna-logo.png — optional logo, transparent background */}
        <div
          style={{
            marginTop: 48,
            opacity: logoOpacity * 0.5,
            width: 64,
            height: 64,
            border: "3px solid #1B3A57",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 20,
              color: "#1B3A57",
              fontWeight: 700,
            }}
          >
            SL
          </span>
        </div>
      </div>

      {/* Final black fade */}
      {/* AUDIO CUE [~58s]: music/sfx fades to silence with this black */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#000",
          opacity: blackOpacity,
          zIndex: 5,
        }}
      />

      <GrainOverlay />
    </div>
  );
};
