import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ATMMachine } from '../components/ATMMachine';

const cl = (v: number) => Math.max(0, Math.min(1, v));

/* ── Confident Aminata ──────────────────────────────────────── */
const AminataConfident: React.FC<{
  x: number;
  isWalking: boolean;
  showCard: boolean;
  showSuccess: boolean;
  frame: number;
}> = ({ x, isWalking, showCard, showSuccess, frame }) => {
  const bob      = isWalking ? Math.sin(frame * 0.4) * 7 : 0;
  const legSwing = isWalking ? Math.sin(frame * 0.4) * 24 : 0;
  const armSwing = isWalking ? Math.sin(frame * 0.4) * 18 : 0;

  // When showing card, right arm extends forward (toward ATM)
  const cardArmAngle = showCard
    ? interpolate(frame, [220, 255], [0, -45], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  // Card position (moves from hand to ATM slot)
  const cardX = showCard
    ? interpolate(frame, [250, 275], [22, -110], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 22;
  const cardY = showCard
    ? interpolate(frame, [250, 275], [-100, -60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : -100;
  const cardOpacity = showCard
    ? interpolate(frame, [272, 285], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 1;

  return (
    <g transform={`translate(${x}, ${820 + bob})`}>
      <g transform="scale(-1, 1)"> {/* Facing left (toward ATM) */}
        {/* Left leg */}
        <g transform={`rotate(${legSwing}, -9, -12)`}>
          <rect x="-16" y="-58" width="14" height="58" rx="7" fill="#1F0F05" />
          <ellipse cx="-9" cy="4" rx="14" ry="6" fill="#0F0500" />
        </g>
        {/* Right leg */}
        <g transform={`rotate(${-legSwing}, 9, -12)`}>
          <rect x="2"  y="-58" width="14" height="58" rx="7" fill="#1F0F05" />
          <ellipse cx="9" cy="4" rx="14" ry="6" fill="#0F0500" />
        </g>

        {/* Body — brighter outfit (future = more vibrant) */}
        <rect x="-24" y="-130" width="48" height="72" rx="12" fill="#1B4A7A" />
        {/* Kente-inspired pattern strip */}
        <rect x="-24" y="-118" width="48" height="8" rx="0" fill="#C0392B" opacity="0.5" />
        <rect x="-24" y="-108" width="48" height="4" rx="0" fill="#F4D03F" opacity="0.4" />

        {/* Left arm (natural swing) */}
        <g transform={`rotate(${-armSwing}, -24, -125)`}>
          <rect x="-36" y="-130" width="14" height="42" rx="7" fill="#1B4A7A" />
        </g>

        {/* Right arm (card hand) — extends toward ATM */}
        <g transform={`rotate(${showCard ? cardArmAngle : armSwing}, 24, -125)`}>
          <rect x="22" y="-130" width="14" height="42" rx="7" fill="#1B4A7A" />
        </g>

        {/* Card (un-flipped so it stays visible in correct position) */}
        {showCard && !showSuccess && (
          <g transform="scale(-1,1)">
            <rect x={cardX} y={cardY} width="20" height="30" rx="4"
              fill="#FFD700" stroke="#B8860B" strokeWidth="1.5"
              opacity={cardOpacity}
            />
            <rect x={cardX + 2} y={cardY + 8} width="16" height="3" rx="1" fill="#B8860B" opacity="0.5" />
          </g>
        )}

        {/* Neck */}
        <rect x="-9" y="-143" width="18" height="15" rx="5" fill="#8B5A2B" />
        {/* Head */}
        <circle cx="0" cy="-165" r="30" fill="#8B5A2B" />
        {/* Hair */}
        <ellipse cx="0"  cy="-190" rx="30" ry="18" fill="#2C1810" />
        <ellipse cx="-20" cy="-182" rx="16" ry="12" fill="#2C1810" />
        <ellipse cx="20"  cy="-182" rx="16" ry="12" fill="#2C1810" />
        <ellipse cx="0"  cy="-197" rx="22" ry="12" fill="#2C1810" />
        {/* Eyes */}
        <circle cx="-11" cy="-166" r="4.5" fill="#2C1810" />
        <circle cx="11"  cy="-166" r="4.5" fill="#2C1810" />
        <circle cx="-10" cy="-167" r="1.8" fill="white" />
        <circle cx="12"  cy="-167" r="1.8" fill="white" />
        {/* Smile on success */}
        {showSuccess && (
          <path d="M -12 -152 Q 0 -143 12 -152"
            stroke="#5A3020" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
      </g>

      {/* Receipt in hand after success */}
      {showSuccess && (
        <g opacity={cl((frame - 300) / 25)}>
          <rect x="30" y="-130" width="18" height="40" rx="3" fill="white" stroke="#C4A882" strokeWidth="1" />
          <rect x="33" y="-126" width="12" height="2" rx="1" fill="#C4A882" />
          <rect x="33" y="-120" width="12" height="2" rx="1" fill="#C4A882" />
          <rect x="33" y="-114" width="8"  height="2" rx="1" fill="#C4A882" />
          <text x="39" y="-94" textAnchor="middle" fill="#4CAF50" fontSize="8" fontFamily="sans-serif">✓</text>
        </g>
      )}

      {/* Confidence glow (success) */}
      {showSuccess && (
        <circle cx="0" cy="-150" r="100" fill="#4CAF50" opacity="0.06" />
      )}
    </g>
  );
};

/* ── Main scene ─────────────────────────────────────────────── */

export const Scene05_Future: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase boundaries
  // 0–80   : scene fades in, ATM appears, "THE FUTURE" text
  // 80–220 : Aminata walks confidently toward ATM (x: 1700→800)
  // 220–285: Card interaction with ATM
  // 285–330: ATM success state, cash out
  // 330–500: Caption reveal ("Same Aminata…")
  // 500–570: Second caption ("Digital literacy changed…")
  // 570–640: Third caption ("So did…")
  // 620–660: Fade out

  const fadeIn  = cl(frame / 22);
  const fadeOut = 1 - cl((frame - 625) / 35);
  const opacity = Math.min(fadeIn, fadeOut);

  const atmSpring  = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 100 } });
  const atmY       = interpolate(atmSpring, [0, 1], [60, 0]);
  const atmOpacity = cl((frame - 10) / 30);

  const atmState =
    frame < 230   ? 'idle'       :
    frame < 290   ? 'processing' :
                    'success';

  // Person position
  let personX: number;
  if (frame < 80) {
    personX = 1720;
  } else if (frame < 220) {
    personX = interpolate(frame, [80, 220], [1720, 820], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
  } else {
    personX = 820;
  }

  const isWalking   = frame >= 80 && frame < 220;
  const showCard    = frame >= 220 && frame < 290;
  const showSuccess = frame >= 290;

  // Captions
  const cap1Fade = cl((frame - 330) / 40);
  const cap1Y    = interpolate(frame, [330, 375], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cap2Fade = cl((frame - 420) / 40);
  const cap2Y    = interpolate(frame, [420, 465], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cap3Fade = cl((frame - 510) / 40);
  const cap3Y    = interpolate(frame, [510, 555], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Green "success" wash over background
  const successBg = showSuccess
    ? interpolate(frame, [290, 340], [0, 0.06], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Warmer, brighter paper bg */}
      <AbsoluteFill>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <defs>
            <filter id="future-paper">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" seed="9" />
              <feDisplacementMap in="SourceGraphic" scale="5" />
            </filter>
          </defs>
          <rect width="1920" height="1080" fill="#EDE8DC" filter="url(#future-paper)" />
          <rect width="1920" height="1080" fill="#4CAF50" opacity={successBg} />
          <radialGradient id="future-vig" cx="50%" cy="60%" r="70%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="#1A2A0A" stopOpacity="0.25" />
          </radialGradient>
          <rect width="1920" height="1080" fill="url(#future-vig)" />
          {/* Ground */}
          <line x1="0" y1="820" x2="1920" y2="820" stroke="#B4A87A" strokeWidth="1.5" opacity="0.5" />
        </svg>
      </AbsoluteFill>

      {/* Era label */}
      <div style={{
        position: 'absolute', top: 60, left: 80,
        opacity: cl(frame / 25),
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        fontSize: 13, letterSpacing: 7, color: '#2A6A4A',
        textTransform: 'uppercase',
        borderLeft: '3px solid #4CAF50', paddingLeft: 18,
      }}>
        THE FUTURE · Digital Transformation Done Right
      </div>

      {/* ATM */}
      <div style={{
        position: 'absolute',
        left: 390, top: 244 + atmY,
        opacity: atmOpacity,
      }}>
        <svg width="360" height="576" viewBox="0 0 200 320">
          <ATMMachine state={atmState} scale={1} />
        </svg>
      </div>

      {/* ATM shadow */}
      <div style={{
        position: 'absolute', left: 390, top: 815,
        width: 360, height: 20,
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%)',
        opacity: atmOpacity,
      }} />

      {/* Cash note animating out of ATM */}
      {showSuccess && (
        <div style={{
          position: 'absolute',
          left: 438,
          top: interpolate(frame, [290, 330], [760, 720], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          }),
          width: 180, height: 60,
          background: '#85C17E',
          borderRadius: 6,
          opacity: cl((frame - 290) / 20),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: '"Inter", sans-serif', fontSize: 16,
            fontWeight: 700, color: '#1A3A10', letterSpacing: 1,
          }}>Le 500,000</span>
        </div>
      )}

      {/* Person */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <ellipse cx={personX} cy="824" rx="35" ry="9" fill="#000" opacity="0.12" />
          <AminataConfident
            x={personX}
            isWalking={isWalking}
            showCard={showCard}
            showSuccess={showSuccess}
            frame={frame}
          />
        </svg>
      </AbsoluteFill>

      {/* Captions — right side */}
      <div style={{
        position: 'absolute', right: 80, top: 0, width: 580, height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        gap: 32,
      }}>
        <div style={{ opacity: cap1Fade, transform: `translateY(${cap1Y}px)` }}>
          <div style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 44, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2,
            marginBottom: 8,
          }}>
            Same Aminata.<br />Same ATM.
          </div>
          <div style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 48, fontWeight: 900, color: '#2A6A40', lineHeight: 1.1,
          }}>
            Different story.
          </div>
        </div>

        <div style={{ opacity: cap2Fade, transform: `translateY(${cap2Y}px)` }}>
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: 30, color: '#2A5A3A', lineHeight: 1.5,
            borderLeft: '3px solid #4CAF50', paddingLeft: 20,
          }}>
            Digital literacy changed everything.
          </div>
        </div>

        <div style={{ opacity: cap3Fade, transform: `translateY(${cap3Y}px)` }}>
          <div style={{
            fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
            fontSize: 18, color: '#4A4A4A', lineHeight: 1.7,
          }}>
            And so did:
          </div>
          <div style={{
            fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
            fontSize: 18, color: '#4A4A4A', lineHeight: 1.7,
            marginTop: 4,
          }}>
            {['Better institutions.', 'Trusted systems.', 'Interoperable platforms.'].map((item, i) => (
              <div key={i} style={{
                opacity: cl((frame - (510 + i * 35)) / 25),
                display: 'flex', alignItems: 'center', gap: 10,
                marginBottom: 4,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4CAF50', flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
