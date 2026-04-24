import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { GrainOverlay } from "./GrainOverlay";

// Beat 2 — 6 to 15 s (frames 180–450 in the full composition).
// Receives localFrame = frame - 180.
// Paper textured title card — "The Digital Question" typed word by word.

interface Beat2Props {
  localFrame: number;
}

// Each word pops in with a spring + subtle upward reveal
const WORDS = ["The", "Digital", "Question"];

export const Beat2TitleCard: React.FC<Beat2Props> = ({ localFrame }) => {
  const { fps, width, height } = useVideoConfig();

  // Words appear at: 0, 30, 60 (local frames)
  const WORD_STARTS = [8, 36, 64];

  // Subtle paper fold-line that sweeps across on entry
  const foldOpacity = interpolate(localFrame, [0, 8, 30, 50], [0, 0.6, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card slides up from slightly below
  const cardY = interpolate(localFrame, [0, 20], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardOpacity = interpolate(localFrame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        height,
        background: "#F4EFE6",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Paper texture via SVG filter noise */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <filter id="paper-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.06" numOctaves="5" seed="3" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-texture)" opacity="0.22" />
        {/* Subtle horizontal paper lines */}
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={60 + i * 42}
            x2={width}
            y2={60 + i * 42}
            stroke="#C8BCA8"
            strokeWidth="0.8"
            opacity="0.35"
          />
        ))}
      </svg>

      {/* Paper fold flash */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.85) 50%, transparent 70%)",
          opacity: foldOpacity,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Main card content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
        }}
      >
        {/* AUDIO CUE [~6s]: typewriter/stamp sound for each word */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          {WORDS.map((word, i) => {
            const wordStart = WORD_STARTS[i];
            const progress = spring({
              frame: localFrame - wordStart,
              fps,
              config: { damping: 12, stiffness: 260, mass: 0.5 },
              durationInFrames: 16,
            });
            const scale = interpolate(progress, [0, 1], [0.4, 1]);
            const opacity = interpolate(progress, [0, 0.2, 1], [0, 0.7, 1]);
            const translateY = interpolate(progress, [0, 1], [40, 0]);

            // Make "Digital" larger — the key word
            const isKeyWord = word === "Digital";
            const fontSize = isKeyWord ? 148 : 100;
            const color = isKeyWord ? "#1A1A1A" : "#1B3A57";
            const letterSpacing = isKeyWord ? "-0.02em" : "0.1em";
            const fontWeight = 900;

            // Stamp-style transform — scale from center, slight overshoot via spring
            const extraScale = isKeyWord
              ? interpolate(progress, [0, 0.7, 1], [1.3, 0.93, 1])
              : 1;

            return (
              <div
                key={word}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize,
                  fontWeight,
                  color,
                  letterSpacing,
                  lineHeight: 1,
                  transform: `scale(${scale * extraScale}) translateY(${translateY}px)`,
                  opacity,
                  textTransform: "uppercase",
                  transformOrigin: "center center",
                }}
              >
                {word}
              </div>
            );
          })}
        </div>

        {/* Thin red rule beneath */}
        {(() => {
          const ruleProgress = interpolate(localFrame, [75, 95], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              style={{
                marginTop: 24,
                height: 4,
                background: "#C0392B",
                width: `${ruleProgress * 520}px`,
                borderRadius: 2,
                transition: "width 0s",
              }}
            />
          );
        })()}

        {/* Subtitle */}
        {(() => {
          const subOpacity = interpolate(localFrame, [100, 125], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              style={{
                marginTop: 20,
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                fontSize: 28,
                color: "#1B3A57",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                opacity: subOpacity,
                fontWeight: 500,
              }}
            >
              SLPPNA YG Retreat · 2025
            </div>
          );
        })()}
      </div>

      <GrainOverlay />
    </div>
  );
};
