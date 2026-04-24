import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface HandDrawnCircleProps {
  cx: number;
  cy: number;
  r: number;
  color?: string;
  startFrame: number;
  drawDuration?: number;
  strokeWidth?: number;
}

// Animates a hand-drawn circle using SVG stroke-dasharray reveal.
// A second slightly-offset ring adds the imperfect marker look.
export const HandDrawnCircle: React.FC<HandDrawnCircleProps> = ({
  cx,
  cy,
  r,
  color = '#C0392B',
  startFrame,
  drawDuration = 24,
  strokeWidth = 5,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const progress = interpolate(frame, [startFrame, startFrame + drawDuration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - progress);

  // Second ring — slightly larger, lower opacity, offset start angle
  const r2 = r + 5;
  const circ2 = 2 * Math.PI * r2;
  const dash2Offset = circ2 * (1 - Math.max(0, progress - 0.1) / 0.9);

  if (progress <= 0) return null;

  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', overflow: 'visible' }}
      width={width}
      height={height}
    >
      {/* Main circle — starts drawing from top (rotated -90°) */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {/* Second ring for hand-drawn imperfection */}
      <circle
        cx={cx + 2}
        cy={cy - 3}
        r={r2}
        stroke={color}
        strokeWidth={strokeWidth * 0.4}
        fill="none"
        strokeDasharray={circ2}
        strokeDashoffset={dash2Offset}
        strokeLinecap="round"
        opacity={0.45}
        transform={`rotate(-95 ${cx + 2} ${cy - 3})`}
      />
    </svg>
  );
};
