import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { C, F } from '../tokens';

interface SourceTagProps {
  source: string;
  color?: string;
  startFrame?: number;
  position?: 'bottom-right' | 'bottom-left';
}

// Small citation tag rendered in the corner of a data scene.
// Fades in gently at startFrame.
export const SourceTag: React.FC<SourceTagProps> = ({
  source,
  color = C.navyBlue,
  startFrame = 0,
  position = 'bottom-right',
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 0.72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const side = position === 'bottom-right'
    ? { right: 60, left: undefined }
    : { left: 60, right: undefined };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 36,
        ...side,
        fontFamily: F.sans,
        fontSize: 17,
        fontWeight: 500,
        color,
        letterSpacing: '0.04em',
        opacity,
        borderBottom: `1.5px solid ${color}`,
        paddingBottom: 3,
        pointerEvents: 'none',
      }}
    >
      {source}
    </div>
  );
};
