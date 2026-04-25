import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

const cl = (v: number) => Math.max(0, Math.min(1, v));

interface MonologueCaptionProps {
  words: string[];
  startFrame: number;
  framesPerWord?: number;
  speaker?: string;
  accentColor?: string;
  endFrame?: number;
}

const WF_BASES = [0.42, 0.72, 0.55, 0.90, 0.65, 0.82, 0.48, 0.70, 0.38];

export const MonologueCaption: React.FC<MonologueCaptionProps> = ({
  words,
  startFrame,
  framesPerWord = 9,
  speaker = 'AMINATA',
  accentColor = '#F4D03F',
  endFrame,
}) => {
  const frame = useCurrentFrame();

  const fadeIn  = cl((frame - startFrame) / 20);
  const fadeOut = endFrame ? 1 - cl((frame - (endFrame - 22)) / 22) : 1;
  const opacity = fadeIn * fadeOut;

  if (opacity <= 0) return null;

  const elapsed    = frame - startFrame;
  const wordIndex  = Math.min(words.length - 1, Math.floor(elapsed / framesPerWord));
  const wordProg   = (elapsed % framesPerWord) / (framesPerWord * 0.55);

  const t = elapsed;

  return (
    <div style={{
      position: 'absolute',
      bottom: 152,
      left: '50%',
      transform: 'translateX(-50%)',
      opacity,
      maxWidth: 880,
      minWidth: 520,
      background: 'rgba(5, 8, 14, 0.88)',
      borderRadius: 6,
      padding: '15px 26px 18px',
      border: `1px solid ${accentColor}22`,
      backdropFilter: 'blur(3px)',
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
    }}>
      {/* Speaker label + waveform */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10,
      }}>
        <div style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 9, letterSpacing: 5, color: accentColor,
          fontWeight: 700,
        }}>
          {speaker}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 22 }}>
          {WF_BASES.map((base, i) => {
            const h = Math.max(3, base * 18 * (0.52 + 0.48 * Math.abs(Math.sin(t * 0.21 + i * 0.72))));
            return (
              <div key={i} style={{
                width: 3, height: h,
                background: accentColor,
                borderRadius: 2, opacity: 0.68,
                transition: 'none',
              }} />
            );
          })}
        </div>
        <div style={{
          width: 1, height: 16, background: `${accentColor}30`, marginLeft: 2,
        }} />
      </div>

      {/* Transcription text */}
      <div style={{
        fontFamily: '"Caveat", cursive',
        fontSize: 29, color: '#EBE7DF',
        lineHeight: 1.45, letterSpacing: 0.3,
        whiteSpace: 'normal',
      }}>
        {words.map((word, i) => {
          if (i > wordIndex) return null;
          const isCurrent = i === wordIndex;
          return (
            <span key={i} style={{
              opacity: isCurrent ? cl(wordProg) : 1,
              marginRight: 7,
              display: 'inline-block',
            }}>
              {word}
            </span>
          );
        })}
        {/* Blinking cursor */}
        <span style={{
          display: 'inline-block',
          width: 2, height: 21,
          background: accentColor,
          opacity: Math.floor(frame / 13) % 2 === 0 ? 0.85 : 0.08,
          marginLeft: 4,
          verticalAlign: 'middle',
        }} />
      </div>
    </div>
  );
};
