import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
} from "remotion";
import { GrainOverlay } from "./GrainOverlay";

// Beat 1 — 0 to 6 s (frames 0–180)
// Zoomed-out world map → fast push to West Africa → Sierra Leone
// with a hand-drawn red circle around Freetown and "Sierra Leone, 2024" text.

export const Beat1Map: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // ── Phase 1: world map (frames 0–40) ─────────────────────────────────────
  const worldScale = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 60, mass: 1 },
    durationInFrames: 40,
    from: 1,
    to: 3.5,
  });

  // ── Phase 2: West Africa push (frames 40–90) ─────────────────────────────
  const westAfricaProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 20, stiffness: 80, mass: 0.8 },
    durationInFrames: 50,
  });

  // ── Phase 3: Sierra Leone close-up (frames 90–150) ───────────────────────
  const slProgress = spring({
    frame: frame - 90,
    fps,
    config: { damping: 22, stiffness: 90, mass: 0.7 },
    durationInFrames: 60,
  });

  // Map layer opacities
  const worldOpacity = interpolate(frame, [0, 5, 38, 50], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const westAfricaOpacity = interpolate(frame, [38, 50, 80, 95], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slMapOpacity = interpolate(frame, [80, 95, 180], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red circle draw progress (appears around frame 100)
  const circleProgress = Math.min(Math.max((frame - 105) / 30, 0), 1);

  // "Sierra Leone, 2024" text fade in
  const textOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [120, 140], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // SVG circle stroke-dasharray trick for draw-on effect
  const circleRadius = 68;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDash = circumference * circleProgress;

  return (
    <div
      style={{
        width,
        height,
        background: "#0D1B2A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── World map layer ─────────────────────────────────────────────── */}
      {/* ASSET: public/world-map.jpg — full equirectangular world map */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: worldOpacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile("world-map.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${worldScale})`,
            transformOrigin: "48% 52%", // roughly West Africa on a mercator
          }}
        />
      </div>

      {/* ── West Africa map layer ────────────────────────────────────────── */}
      {/* ASSET: public/west-africa-map.jpg — West Africa region map */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: westAfricaOpacity,
        }}
      >
        <Img
          src={staticFile("west-africa-map.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${interpolate(
              westAfricaProgress,
              [0, 1],
              [1.4, 2.2]
            )})`,
            transformOrigin: "52% 56%",
          }}
        />
      </div>

      {/* ── Sierra Leone close-up ────────────────────────────────────────── */}
      {/* ASSET: public/sierra-leone-map.jpg — Sierra Leone detailed map with Freetown visible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: slMapOpacity,
        }}
      >
        <Img
          src={staticFile("sierra-leone-map.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${interpolate(slProgress, [0, 1], [1.1, 1])})`,
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* ── Hand-drawn red circle around Freetown ───────────────────────── */}
      {/* AUDIO CUE [~3.5s]: scratch/pen sound as circle draws */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          opacity: slMapOpacity,
          pointerEvents: "none",
        }}
        width={width}
        height={height}
      >
        {/* Freetown sits roughly at 38% x, 54% y on a Sierra Leone map */}
        <circle
          cx={width * 0.38}
          cy={height * 0.54}
          r={circleRadius}
          stroke="#C0392B"
          strokeWidth={5}
          fill="none"
          strokeDasharray={`${strokeDash} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(-90 ${width * 0.38} ${height * 0.54})`}
        />
        {/* Slight offset second ring for hand-drawn feel */}
        <circle
          cx={width * 0.38 + 3}
          cy={height * 0.54 - 2}
          r={circleRadius + 4}
          stroke="#C0392B"
          strokeWidth={2}
          fill="none"
          strokeDasharray={`${strokeDash * 0.6} ${circumference}`}
          strokeDashoffset={circumference * 0.15}
          strokeLinecap="round"
          opacity={0.5}
          transform={`rotate(-85 ${width * 0.38 + 3} ${height * 0.54 - 2})`}
        />
      </svg>

      {/* ── "Sierra Leone, 2024" overlay text ───────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div
          style={{
            background: "rgba(26,26,26,0.72)",
            backdropFilter: "blur(2px)",
            padding: "12px 40px",
            borderLeft: "4px solid #C0392B",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 52,
              color: "#F4EFE6",
              fontWeight: 700,
              letterSpacing: "0.04em",
              fontStyle: "italic",
            }}
          >
            Sierra Leone, 2024
          </span>
        </div>
      </div>

      <GrainOverlay />
    </div>
  );
};
