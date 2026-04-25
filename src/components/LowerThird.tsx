import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface LowerThirdProps {
  label: string;
  sublabel?: string;
  startFrame?: number;
  color?: string;
  position?: 'left' | 'center';
}

const cl = (v: number) => Math.max(0, Math.min(1, v));

export const LowerThird: React.FC<LowerThirdProps> = ({
  label,
  sublabel,
  startFrame = 0,
  color = '#C0392B',
  position = 'left',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const prog = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 22, stiffness: 120, mass: 0.8 },
  });

  const x    = interpolate(prog, [0, 1], [-320, 0]);
  const fade = cl((frame - startFrame) / 20);

  const align: React.CSSProperties =
    position === 'center'
      ? { left: '50%', transform: `translateX(calc(-50% + ${x}px))` }
      : { left: 80, transform: `translateX(${x}px)` };

  return (
    <div style={{
      position: 'absolute', bottom: 72,
      opacity: fade,
      ...align,
      display: 'flex', flexDirection: 'column', gap: 0,
    }}>
      {/* Colour accent bar */}
      <div style={{ width: 4, height: sublabel ? 52 : 36, background: color, marginBottom: 0 }} />
      <div style={{
        background: 'rgba(10,10,10,0.82)',
        padding: sublabel ? '10px 20px 12px' : '8px 20px',
        backdropFilter: 'blur(4px)',
        marginTop: -52,
        marginLeft: 4,
      }}>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          fontSize: 18, fontWeight: 700,
          color: 'white', letterSpacing: 0.5,
          lineHeight: 1.2,
        }}>
          {label}
        </div>
        {sublabel && (
          <div style={{
            fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
            fontSize: 13, fontWeight: 400,
            color: '#CCCCCC', marginTop: 3,
            letterSpacing: 0.3,
          }}>
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
};
