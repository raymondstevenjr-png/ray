import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

// ─── StaggeredChars ────────────────────────────────────────────────────────
// Animates each character sliding up + fading in with a stagger offset.
interface StaggeredCharsProps {
  text: string;
  startFrame: number;
  staggerFrames?: number;   // delay between each character
  durationFrames?: number;  // spring duration per char
  style?: React.CSSProperties;
  charStyle?: React.CSSProperties;
}

export const StaggeredChars: React.FC<StaggeredCharsProps> = ({
  text,
  startFrame,
  staggerFrames = 2,
  durationFrames = 12,
  style,
  charStyle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <span style={{ display: "inline-block", ...style }}>
      {text.split("").map((char, i) => {
        const charFrame = startFrame + i * staggerFrames;
        const progress = spring({
          frame: frame - charFrame,
          fps,
          config: { damping: 18, stiffness: 140, mass: 0.7 },
          durationInFrames: durationFrames,
        });
        const translateY = interpolate(progress, [0, 1], [28, 0]);
        const opacity = interpolate(progress, [0, 0.4, 1], [0, 0.6, 1]);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${translateY}px)`,
              opacity,
              whiteSpace: char === " " ? "pre" : undefined,
              ...charStyle,
            }}
          >
            {char === " " ? " " : char}
          </span>
        );
      })}
    </span>
  );
};

// ─── WordByWord ─────────────────────────────────────────────────────────────
// Types words in one at a time with a spring pop.
interface WordByWordProps {
  words: string[];
  startFrame: number;
  framesPerWord?: number;
  style?: React.CSSProperties;
  wordStyle?: React.CSSProperties;
}

export const WordByWord: React.FC<WordByWordProps> = ({
  words,
  startFrame,
  framesPerWord = 18,
  style,
  wordStyle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25em", ...style }}>
      {words.map((word, i) => {
        const wordFrame = startFrame + i * framesPerWord;
        const progress = spring({
          frame: frame - wordFrame,
          fps,
          config: { damping: 14, stiffness: 200, mass: 0.6 },
          durationInFrames: 14,
        });
        const scale = interpolate(progress, [0, 1], [0.6, 1]);
        const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.8, 1]);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `scale(${scale})`,
              transformOrigin: "left center",
              opacity,
              ...wordStyle,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// ─── HandDrawnUnderline ──────────────────────────────────────────────────────
// Draws an SVG underline that "grows" left-to-right, slightly wobbly.
interface HandDrawnUnderlineProps {
  startFrame: number;
  durationFrames?: number;
  color?: string;
  width?: number;
  thickness?: number;
  wobble?: number;
}

export const HandDrawnUnderline: React.FC<HandDrawnUnderlineProps> = ({
  startFrame,
  durationFrames = 18,
  color = "#C0392B",
  width = 400,
  thickness = 5,
  wobble = 4,
}) => {
  const frame = useCurrentFrame();
  const progress = Math.min(Math.max((frame - startFrame) / durationFrames, 0), 1);

  // Build an SVG path that looks hand-drawn (slight wave)
  const h = thickness + wobble * 2;
  const mid = h / 2;
  const drawWidth = width * progress;

  // Rough path with a couple of control points
  const path =
    drawWidth < 2
      ? ""
      : `M 0 ${mid + wobble * 0.3} C ${drawWidth * 0.3} ${mid - wobble} ${drawWidth * 0.6} ${mid + wobble * 0.8} ${drawWidth} ${mid - wobble * 0.2}`;

  return (
    <svg
      width={width}
      height={h}
      style={{ display: "block", overflow: "visible" }}
    >
      <path
        d={path}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ─── ShakeWrapper ────────────────────────────────────────────────────────────
// Quick camera-shake effect for a few frames after a trigger.
interface ShakeWrapperProps {
  children: React.ReactNode;
  triggerFrame: number;
  durationFrames?: number;
  intensity?: number;
  style?: React.CSSProperties;
}

export const ShakeWrapper: React.FC<ShakeWrapperProps> = ({
  children,
  triggerFrame,
  durationFrames = 8,
  intensity = 10,
  style,
}) => {
  const frame = useCurrentFrame();
  const rel = frame - triggerFrame;
  let tx = 0;
  let ty = 0;

  if (rel >= 0 && rel < durationFrames) {
    const decay = 1 - rel / durationFrames;
    // Deterministic pseudo-random using frame index
    tx = Math.sin(rel * 5.3) * intensity * decay;
    ty = Math.cos(rel * 7.1) * intensity * decay;
  }

  return (
    <div style={{ transform: `translate(${tx}px, ${ty}px)`, ...style }}>
      {children}
    </div>
  );
};
