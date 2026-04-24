import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { GrainOverlay } from "./GrainOverlay";

// Beat 4 — 28 to 38 s (frames 840–1140 in full composition).
// Receives localFrame = frame - 840.
// Split screen: Group 1 "Build the roads" vs Group 2 "Teach the drivers."
// Grainy film flicker applied via opacity pulse.

interface Beat4Props {
  localFrame: number;
}

// ── Icon: Fiber Optic Cable ────────────────────────────────────────────────
const FiberOpticIcon: React.FC = () => (
  <svg width="120" height="120" viewBox="0 0 120 120">
    {/* Cable body */}
    <rect x="10" y="54" width="100" height="12" rx="6" fill="#F4EFE6" opacity="0.9" />
    {/* Light pulses along cable */}
    <circle cx="30" cy="60" r="5" fill="#C0392B" opacity="0.85" />
    <circle cx="60" cy="60" r="5" fill="#C0392B" opacity="0.6" />
    <circle cx="90" cy="60" r="5" fill="#C0392B" opacity="0.4" />
    {/* Connector ends */}
    <rect x="2" y="48" width="16" height="24" rx="4" fill="#F4EFE6" />
    <rect x="102" y="48" width="16" height="24" rx="4" fill="#F4EFE6" />
    {/* Signal waves */}
    <path d="M 50 38 Q 55 28 60 38 Q 65 48 70 38" stroke="#F4EFE6" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
    <path d="M 45 30 Q 52 16 60 30 Q 68 44 75 30" stroke="#F4EFE6" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
  </svg>
);

// ── Icon: Person reading on phone ─────────────────────────────────────────
const PersonPhoneIcon: React.FC = () => (
  <svg width="120" height="120" viewBox="0 0 120 120">
    {/* Head */}
    <circle cx="60" cy="22" r="14" fill="#F4EFE6" />
    {/* Body */}
    <path d="M 38 88 Q 38 58 60 58 Q 82 58 82 88" fill="#F4EFE6" opacity="0.9" />
    {/* Phone */}
    <rect x="48" y="60" width="24" height="38" rx="4" fill="#1A1A1A" />
    <rect x="51" y="63" width="18" height="30" rx="2" fill="#1B3A57" />
    {/* Screen glow lines */}
    <rect x="53" y="66" width="14" height="2" rx="1" fill="#F4EFE6" opacity="0.7" />
    <rect x="53" y="71" width="10" height="2" rx="1" fill="#F4EFE6" opacity="0.5" />
    <rect x="53" y="76" width="12" height="2" rx="1" fill="#F4EFE6" opacity="0.5" />
    {/* Arms */}
    <path d="M 38 70 Q 44 65 48 70" stroke="#F4EFE6" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M 82 70 Q 76 65 72 70" stroke="#F4EFE6" strokeWidth="5" fill="none" strokeLinecap="round" />
  </svg>
);

export const Beat4Split: React.FC<Beat4Props> = ({ localFrame }) => {
  const { fps, width, height } = useVideoConfig();

  // Divider line grows from center outward
  const dividerProgress = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 22, stiffness: 120 },
    durationInFrames: 20,
  });

  // Left panel slides in from left
  const leftX = interpolate(
    spring({
      frame: localFrame - 10,
      fps,
      config: { damping: 18, stiffness: 100 },
      durationInFrames: 24,
    }),
    [0, 1],
    [-width / 2, 0]
  );

  // Right panel slides in from right
  const rightX = interpolate(
    spring({
      frame: localFrame - 10,
      fps,
      config: { damping: 18, stiffness: 100 },
      durationInFrames: 24,
    }),
    [0, 1],
    [width / 2, 0]
  );

  // Icon bounce-in
  const leftIconScale = spring({
    frame: localFrame - 35,
    fps,
    config: { damping: 12, stiffness: 220, mass: 0.6 },
    durationInFrames: 18,
  });
  const rightIconScale = spring({
    frame: localFrame - 50,
    fps,
    config: { damping: 12, stiffness: 220, mass: 0.6 },
    durationInFrames: 18,
  });

  // Film flicker: random-ish opacity pulse
  // AUDIO CUE [~28s]: film projector click/flicker sound
  const flickerBase = Math.sin(localFrame * 3.7) * 0.5 + 0.5;
  const flickerOpacity = interpolate(flickerBase, [0, 1], [0.93, 1.0]);

  const panelStyle = (side: "left" | "right"): React.CSSProperties => ({
    position: "absolute",
    top: 0,
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    ...(side === "left"
      ? { left: 0, background: "#1A1A1A", transform: `translateX(${leftX}px)` }
      : { right: 0, background: "#1B3A57", transform: `translateX(${rightX}px)` }),
    opacity: flickerOpacity,
  });

  const groupLabelStyle: React.CSSProperties = {
    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "0.25em",
    textTransform: "uppercase" as const,
    color: "#C0392B",
    borderBottom: "2px solid #C0392B",
    paddingBottom: 6,
  };

  const headlineStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 72,
    fontWeight: 900,
    color: "#F4EFE6",
    lineHeight: 1.1,
    textAlign: "center" as const,
    maxWidth: 400,
  };

  // Text appear
  const leftTextOpacity = interpolate(localFrame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightTextOpacity = interpolate(localFrame, [25, 45], [0, 1], {
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
        background: "#1A1A1A",
      }}
    >
      {/* ── Left: Group 1 ──────────────────────────────────────────────── */}
      {/* AUDIO CUE [~28.5s]: low thud as left panel slams in */}
      <div style={panelStyle("left")}>
        <span
          style={{
            ...groupLabelStyle,
            opacity: leftTextOpacity,
          }}
        >
          Group 1
        </span>
        <div
          style={{
            transform: `scale(${leftIconScale})`,
            opacity: leftTextOpacity,
          }}
        >
          <FiberOpticIcon />
        </div>
        <div style={{ ...headlineStyle, opacity: leftTextOpacity }}>
          Build the roads.
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 24,
            color: "#F4EFE6",
            opacity: leftTextOpacity * 0.7,
            textAlign: "center",
            maxWidth: 340,
            lineHeight: 1.5,
          }}
        >
          Infrastructure first.
          <br />
          Connect the country.
        </div>
      </div>

      {/* ── Right: Group 2 ─────────────────────────────────────────────── */}
      {/* AUDIO CUE [~29s]: low thud as right panel slams in */}
      <div style={panelStyle("right")}>
        <span
          style={{
            ...groupLabelStyle,
            color: "#F4EFE6",
            borderColor: "#F4EFE6",
            opacity: rightTextOpacity,
          }}
        >
          Group 2
        </span>
        <div
          style={{
            transform: `scale(${rightIconScale})`,
            opacity: rightTextOpacity,
          }}
        >
          <PersonPhoneIcon />
        </div>
        <div style={{ ...headlineStyle, opacity: rightTextOpacity }}>
          Teach the drivers.
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 24,
            color: "#F4EFE6",
            opacity: rightTextOpacity * 0.7,
            textAlign: "center",
            maxWidth: 340,
            lineHeight: 1.5,
          }}
        >
          Literacy + Reform +<br />
          Local content.
        </div>
      </div>

      {/* ── Center divider ─────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `${(1 - dividerProgress) * 50}%`,
          bottom: `${(1 - dividerProgress) * 50}%`,
          width: 4,
          background: "#C0392B",
          transform: "translateX(-50%)",
          zIndex: 10,
          boxShadow: "0 0 12px rgba(192,57,43,0.7)",
        }}
      />

      <GrainOverlay />
    </div>
  );
};
