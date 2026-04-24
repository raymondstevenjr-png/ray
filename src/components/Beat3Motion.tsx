import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { GrainOverlay } from "./GrainOverlay";
import { ShakeWrapper } from "./KineticText";

// Beat 3 — 15 to 28 s (frames 450–840 in full composition).
// Receives localFrame = frame - 450.
// Shows the full debate motion; red underline on "digital infrastructure alone",
// then blue underline on "digital literacy, institutional reform, and local
// content development". Zoom+shake when each underline appears.

interface Beat3Props {
  localFrame: number;
}

// Underline "draw" helper using an SVG rect that grows in width
interface UnderlineProps {
  color: string;
  startFrame: number;
  durationFrames?: number;
  width: number;
  offsetX?: number;
}
const Underline: React.FC<UnderlineProps> = ({
  color,
  startFrame,
  durationFrames = 20,
  width,
  offsetX = 0,
}) => {
  const frame = useCurrentFrame();
  const progress = Math.min(Math.max((frame - startFrame) / durationFrames, 0), 1);
  const drawWidth = width * progress;
  const h = 7;

  // Slightly wobbly path
  const y1 = h * 0.6;
  const y2 = h * 0.3;
  const y3 = h * 0.8;
  const pathD =
    drawWidth < 2
      ? ""
      : `M ${offsetX} ${y1} C ${offsetX + drawWidth * 0.25} ${y2} ${
          offsetX + drawWidth * 0.6
        } ${y3} ${offsetX + drawWidth} ${y1 + 1}`;

  return (
    <svg
      style={{
        position: "absolute",
        bottom: -10,
        left: 0,
        overflow: "visible",
        pointerEvents: "none",
      }}
      width={width + offsetX + 20}
      height={h + 14}
    >
      <path
        d={pathD}
        stroke={color}
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
      {/* Second, thinner pass for a real marker feel */}
      <path
        d={pathD}
        stroke={color}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        opacity={0.4}
        transform="translate(0, 4)"
      />
    </svg>
  );
};

export const Beat3Motion: React.FC<Beat3Props> = ({ localFrame }) => {
  const { fps, width, height } = useVideoConfig();

  // ── Motion text phases ─────────────────────────────────────────────────
  // Motion fades in over frames 0–30
  const motionOpacity = interpolate(localFrame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Is expanding…" block
  const block1Scale = spring({
    frame: localFrame,
    fps,
    config: { damping: 20, stiffness: 80 },
    durationInFrames: 24,
    from: 0.92,
    to: 1,
  });

  // Red underline triggers at localFrame 50 (≈ 21.7 s absolute)
  // AUDIO CUE [~21.7s]: marker-squeak / red underline sound
  const redUnderlineTrigger = 50;
  const redZoomTrigger = redUnderlineTrigger;

  // Blue underline triggers at localFrame 130 (≈ 24.3 s absolute)
  // AUDIO CUE [~24.3s]: marker-squeak / blue underline sound
  const blueUnderlineTrigger = 130;
  const blueZoomTrigger = blueUnderlineTrigger;

  // Slight zoom-in when red underline draws
  const zoomR = spring({
    frame: localFrame - redZoomTrigger,
    fps,
    config: { damping: 14, stiffness: 280, mass: 0.5 },
    durationInFrames: 14,
    from: 1,
    to: 1.025,
  });

  // Slight zoom-in when blue underline draws
  const zoomB = spring({
    frame: localFrame - blueZoomTrigger,
    fps,
    config: { damping: 14, stiffness: 280, mass: 0.5 },
    durationInFrames: 14,
    from: 1,
    to: 1.025,
  });

  const zoomScale = zoomR * zoomB;

  const baseStyle: React.CSSProperties = {
    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    fontSize: 38,
    color: "#1A1A1A",
    lineHeight: 1.55,
    fontWeight: 400,
  };

  const highlightRed: React.CSSProperties = {
    ...baseStyle,
    color: "#C0392B",
    fontWeight: 700,
    position: "relative",
    display: "inline",
  };

  const highlightBlue: React.CSSProperties = {
    ...baseStyle,
    color: "#1B3A57",
    fontWeight: 700,
    position: "relative",
    display: "inline",
  };

  // Red underline dimensions (over "digital infrastructure alone")
  // Approx width for phrase at 38px bold ~= 570px
  const redUnderlineWidth = 562;
  // Blue underline over "digital literacy, institutional reform, and local content development"
  // Long phrase at 38px bold: spans 2 lines. We'll underline a fixed-width block.
  const blueUnderlineWidth = 840;

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
      {/* Paper texture */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <filter id="paper-b3">
          <feTurbulence type="fractalNoise" baseFrequency="0.045 0.07" numOctaves="4" seed="8" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-b3)" opacity="0.18" />
      </svg>

      {/* Motion text block — centered, max-width for readability */}
      <ShakeWrapper
        triggerFrame={redUnderlineTrigger}
        durationFrames={7}
        intensity={8}
        style={{ position: "relative", zIndex: 2 }}
      >
        <ShakeWrapper
          triggerFrame={blueUnderlineTrigger}
          durationFrames={7}
          intensity={8}
        >
          <div
            style={{
              opacity: motionOpacity,
              transform: `scale(${block1Scale * zoomScale})`,
              transformOrigin: "center center",
              maxWidth: 1060,
              padding: "0 60px",
              textAlign: "center",
            }}
          >
            {/* ── Preamble ─────────────────────────────────────────── */}
            <span style={baseStyle}>
              "Is expanding{" "}
            </span>

            {/* ── RED HIGHLIGHT: "digital infrastructure alone" ────── */}
            <span style={{ position: "relative", display: "inline" }}>
              <span style={highlightRed}>digital infrastructure alone</span>
              {localFrame >= redUnderlineTrigger && (
                <Underline
                  color="#C0392B"
                  startFrame={redUnderlineTrigger}
                  durationFrames={22}
                  width={redUnderlineWidth}
                />
              )}
            </span>

            <span style={baseStyle}>
              {" "}sufficient to drive innovation and inclusive growth, or must
              national efforts prioritize deliberate investments in{" "}
            </span>

            {/* ── BLUE HIGHLIGHT: "digital literacy, institutional reform, and local content development" */}
            <span style={{ position: "relative", display: "inline" }}>
              <span style={highlightBlue}>
                digital literacy, institutional reform, and local content
                development
              </span>
              {localFrame >= blueUnderlineTrigger && (
                <Underline
                  color="#1B3A57"
                  startFrame={blueUnderlineTrigger}
                  durationFrames={30}
                  width={blueUnderlineWidth}
                />
              )}
            </span>

            <span style={baseStyle}>?"</span>
          </div>
        </ShakeWrapper>
      </ShakeWrapper>

      {/* Top label */}
      {(() => {
        const labelOpacity = interpolate(localFrame, [0, 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            style={{
              position: "absolute",
              top: 64,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              opacity: labelOpacity,
              zIndex: 3,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 22,
                color: "#1B3A57",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 600,
                borderBottom: "2px solid #1B3A57",
                paddingBottom: 4,
              }}
            >
              The Debate Motion
            </span>
          </div>
        );
      })()}

      <GrainOverlay />
    </div>
  );
};
