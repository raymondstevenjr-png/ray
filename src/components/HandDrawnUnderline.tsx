import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface HandDrawnUnderlineProps {
  // Top-left origin of the SVG relative to its containing element
  x?: number;
  y?: number;
  width: number;
  color?: string;
  startFrame: number;
  drawDuration?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

// Draws a wavy, hand-marker-style underline from left to right.
// Position it inside a `position: relative` container via the `style` prop.
export const HandDrawnUnderline: React.FC<HandDrawnUnderlineProps> = ({
  x = 0,
  y = 0,
  width,
  color = '#C0392B',
  startFrame,
  drawDuration = 22,
  strokeWidth = 5,
  style,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [startFrame, startFrame + drawDuration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (progress <= 0) return null;

  const svgH = 14;
  const mid = svgH / 2;

  // Wavy path with gentle sinusoidal oscillation
  const w = width;
  const wavePath = [
    `M ${x} ${mid + 1}`,
    `Q ${x + w * 0.12} ${mid - 3} ${x + w * 0.25} ${mid + 2}`,
    `Q ${x + w * 0.38} ${mid + 5} ${x + w * 0.50} ${mid + 1}`,
    `Q ${x + w * 0.62} ${mid - 3} ${x + w * 0.75} ${mid + 3}`,
    `Q ${x + w * 0.88} ${mid + 4} ${x + w} ${mid}`,
  ].join(' ');

  // Approximate wave path length ≈ width * 1.04
  const pathLength = width * 1.04;
  const dashOffset = pathLength * (1 - progress);

  return (
    <svg
      style={{
        position: 'absolute',
        overflow: 'visible',
        pointerEvents: 'none',
        ...style,
      }}
      width={width + x + 4}
      height={svgH}
    >
      <path
        d={wavePath}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={dashOffset}
      />
      {/* Second thin pass for marker overlap */}
      <path
        d={wavePath}
        stroke={color}
        strokeWidth={strokeWidth * 0.35}
        fill="none"
        strokeLinecap="round"
        opacity={0.4}
        strokeDasharray={pathLength}
        strokeDashoffset={dashOffset * 1.05}
        transform={`translate(0, 3)`}
      />
    </svg>
  );
};
