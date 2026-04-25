import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { HandDrawnUnderline } from '../components/HandDrawnUnderline';
import { SourceTag } from '../components/SourceTag';

const cl = (v: number) => Math.max(0, Math.min(1, v));

export const Scene04_TheGap: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn  = cl(frame / 20);
  const fadeOut = 1 - cl((frame - 390) / 30);

  // Left stat: 80% mobile coverage
  const leftPct = interpolate(
    frame,
    [30, 150],
    [0, 80],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Right stat: 13% internet users
  const rightPct = interpolate(
    frame,
    [60, 180],
    [0, 13],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Divider line grows
  const dividerH = interpolate(frame, [20, 60], [0, 340], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const cap1Fade   = cl((frame - 195) / 35);
  const cap1Y      = interpolate(frame, [195, 235], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cap2Fade   = cl((frame - 255) / 35);
  const cap2Y      = interpolate(frame, [255, 295], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sourcesFade = cl((frame - 330) / 30);

  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      {/* Clean paper bg */}
      <AbsoluteFill>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <defs>
            <filter id="gap-paper">
              <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="3" />
              <feDisplacementMap in="SourceGraphic" scale="4" />
            </filter>
          </defs>
          <rect width="1920" height="1080" fill="#F4EFE6" filter="url(#gap-paper)" />
          <radialGradient id="gap-vig" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="#2A1A0A" stopOpacity="0.22" />
          </radialGradient>
          <rect width="1920" height="1080" fill="url(#gap-vig)" />
        </svg>
      </AbsoluteFill>

      {/* Scene header */}
      <div style={{
        position: 'absolute', top: 60, left: '50%',
        transform: 'translateX(-50%)',
        opacity: cl(frame / 20),
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        fontSize: 13, letterSpacing: 7, color: '#8B6B4A',
        textTransform: 'uppercase', textAlign: 'center',
      }}>
        The Usage Gap · West Africa
      </div>

      {/* Stats row */}
      <div style={{
        position: 'absolute',
        top: 140, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 0, height: 420,
      }}>
        {/* Left stat */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          opacity: cl((frame - 30) / 25),
        }}>
          <div style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 148, fontWeight: 900,
            color: '#1B3A57', lineHeight: 1,
            letterSpacing: -4,
          }}>
            {Math.round(leftPct)}%
          </div>
          <div style={{
            fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
            fontSize: 18, color: '#3A5A7A',
            textAlign: 'center', lineHeight: 1.5, maxWidth: 340,
            marginTop: 12,
          }}>
            of West Africans live under<br />
            <strong>mobile network coverage</strong>
          </div>
          <div style={{
            marginTop: 24, width: 280, height: 8, borderRadius: 4,
            background: '#D4E4F0', overflow: 'hidden',
          }}>
            <div style={{
              width: `${leftPct * 1.25}%`, height: '100%',
              background: '#1B3A57', borderRadius: 4,
              transition: 'none',
            }} />
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{
          width: 3, height: dividerH,
          background: 'linear-gradient(to bottom, transparent, #C4A882, transparent)',
          borderRadius: 2, flexShrink: 0,
        }} />

        {/* Right stat */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          opacity: cl((frame - 60) / 25),
        }}>
          <div style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 148, fontWeight: 900,
            color: '#C0392B', lineHeight: 1,
            letterSpacing: -4,
          }}>
            {Math.round(rightPct)}%
          </div>
          <div style={{
            fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
            fontSize: 18, color: '#8B3A3A',
            textAlign: 'center', lineHeight: 1.5, maxWidth: 340,
            marginTop: 12,
          }}>
            actively use the internet<br />
            <strong>for productive services</strong>
          </div>
          <div style={{
            marginTop: 24, width: 280, height: 8, borderRadius: 4,
            background: '#F0D4D4', overflow: 'hidden',
          }}>
            <div style={{
              width: `${rightPct * 7.7}%`, height: '100%',
              background: '#C0392B', borderRadius: 4,
            }} />
          </div>
        </div>
      </div>

      {/* Arrow pointing to the gap */}
      <div style={{
        position: 'absolute', top: 570, left: '50%',
        transform: 'translateX(-50%)',
        opacity: cl((frame - 175) / 25),
      }}>
        <svg width="200" height="30" viewBox="0 0 200 30">
          <line x1="20" y1="15" x2="180" y2="15" stroke="#C0392B" strokeWidth="2" strokeDasharray="6,4" />
          <polygon points="180,8 195,15 180,22" fill="#C0392B" />
          <polygon points="20,8 5,15 20,22" fill="#C0392B" />
        </svg>
        <div style={{
          fontFamily: '"Caveat", cursive',
          fontSize: 22, color: '#C0392B',
          textAlign: 'center', marginTop: 4,
        }}>
          67 percentage points apart
        </div>
      </div>

      {/* Bottom captions */}
      <div style={{
        position: 'absolute', bottom: 130, left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center', width: 900,
      }}>
        <div style={{
          opacity: cap1Fade, transform: `translateY(${cap1Y}px)`,
          marginBottom: 16,
        }}>
          <div style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 34, fontWeight: 700, color: '#1A1A1A',
          }}>
            This is not a technology problem.
          </div>
        </div>

        <div style={{ opacity: cap2Fade, transform: `translateY(${cap2Y}px)` }}>
          <div style={{
            fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
            fontSize: 20, color: '#5A5A5A', lineHeight: 1.6,
          }}>
            It is a <strong>skills</strong>, <strong>trust</strong>, and <strong>systems</strong> problem.
          </div>
        </div>

        {/* Underline on key message */}
        {frame > 260 && (
          <div style={{ width: 680, margin: '8px auto 0', opacity: cap2Fade }}>
            <HandDrawnUnderline
              x={0} y={0} width={680} color="#C0392B"
              startFrame={265} drawDuration={40}
            />
          </div>
        )}
      </div>

      {/* Sources */}
      <SourceTag source="ITU · GSMA · World Bank Digital Development Report" color="#8B6B4A" startFrame={330} position="bottom-right" />
    </AbsoluteFill>
  );
};
