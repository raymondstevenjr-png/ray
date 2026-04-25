/**
 * Scene 03 — The Present  (1 080 frames / 36 s within this Sequence)
 *
 * Acts 1-3:
 *  0– 90 : Map with coverage-dot overlay, "Today" annotation
 *  90–220 : Cross-dissolve to street / ATM scene
 * 220–560 : Aminata approaches ATM → hesitates → walks away
 * 560–750 : Data overlay (80 % vs 13 %)
 * 750–980 : Four kinetic thesis lines animate in one by one
 * 980–1080: Fade out
 */
import React from 'react';
import {
  AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig,
} from 'remotion';
import { SierraLeoneMap } from '../components/SierraLeoneMap';
import { ATMMachine }     from '../components/ATMMachine';
import { LowerThird }     from '../components/LowerThird';
import { HandDrawnCircle } from '../components/HandDrawnCircle';

const cl = (v: number) => Math.max(0, Math.min(1, v));

/* ── Animated person (Aminata) ─────────────────────────────── */
const Aminata: React.FC<{
  x: number; frame: number;
  isWalking: boolean; facingLeft: boolean; showThought: boolean;
}> = ({ x, frame, isWalking, facingLeft, showThought }) => {
  const bob       = isWalking ? Math.sin(frame * 0.38) * 7 : 0;
  const legSwing  = isWalking ? Math.sin(frame * 0.38) * 24 : 0;
  const armSwing  = isWalking ? Math.sin(frame * 0.38) * 18 : 0;
  const flipX     = facingLeft ? -1 : 1;
  const thoughtOp = showThought ? cl((frame - 230) / 22) : cl(1 - (frame - 348) / 14);

  return (
    <g transform={`translate(${x}, ${825 + bob})`}>
      <g transform={`scale(${flipX}, 1)`}>
        {/* Legs */}
        <g transform={`rotate(${legSwing}, -9, -12)`}>
          <rect x="-16" y="-58" width="14" height="58" rx="7" fill="#1F0F05" />
          <ellipse cx="-9" cy="4" rx="14" ry="6" fill="#0F0500" />
        </g>
        <g transform={`rotate(${-legSwing}, 9, -12)`}>
          <rect x="2" y="-58" width="14" height="58" rx="7" fill="#1F0F05" />
          <ellipse cx="9" cy="4" rx="14" ry="6" fill="#0F0500" />
        </g>
        {/* Body */}
        <rect x="-24" y="-130" width="48" height="72" rx="12" fill="#1B3A57" />
        {/* Arms */}
        <g transform={`rotate(${-armSwing}, -24, -125)`}>
          <rect x="-36" y="-130" width="14" height="42" rx="7" fill="#1B3A57" />
        </g>
        <g transform={`rotate(${armSwing}, 24, -125)`}>
          <rect x="22" y="-130" width="14" height="42" rx="7" fill="#1B3A57" />
          <rect x="26" y="-100" width="10" height="16" rx="2" fill="#111" />
          <rect x="28" y="-98" width="6" height="10" rx="1" fill="#3A7ABB" opacity="0.8" />
        </g>
        {/* Neck */}
        <rect x="-9" y="-143" width="18" height="15" rx="5" fill="#8B5A2B" />
        {/* Head */}
        <circle cx="0" cy="-165" r="30" fill="#8B5A2B" />
        {/* Hair */}
        <ellipse cx="0"  cy="-190" rx="30" ry="18" fill="#2C1810" />
        <ellipse cx="-20" cy="-183" rx="16" ry="12" fill="#2C1810" />
        <ellipse cx="20"  cy="-183" rx="16" ry="12" fill="#2C1810" />
        <ellipse cx="0"  cy="-197" rx="22" ry="12" fill="#2C1810" />
        {/* Eyes */}
        <circle cx="-11" cy="-166" r="4.5" fill="#2C1810" />
        <circle cx="11"  cy="-166" r="4.5" fill="#2C1810" />
        <circle cx="-10" cy="-167" r="1.8" fill="white" />
        <circle cx="12"  cy="-167" r="1.8" fill="white" />
      </g>

      {/* Thought bubble (un-flipped so warning text is always readable) */}
      <g opacity={thoughtOp}>
        <circle cx={facingLeft ? -50 : 50} cy="-202" r="6"  fill="white" stroke="#C0392B" strokeWidth="1.5" />
        <circle cx={facingLeft ? -64 : 64} cy="-219" r="9"  fill="white" stroke="#C0392B" strokeWidth="1.5" />
        <circle cx={facingLeft ? -92 : 92} cy="-258" r="38" fill="white" stroke="#C0392B" strokeWidth="2.5" />
        {/* Warning triangle */}
        <polygon
          points={`${facingLeft ? -92 : 92},-282 ${facingLeft ? -110 : 74},-252 ${facingLeft ? -74 : 110},-252`}
          fill="#FF8C00"
        />
        <rect x={facingLeft ? -95 : 89} y="-275" width="6" height="14" rx="2" fill="white" />
        <circle cx={facingLeft ? -92 : 92} cy="-254" r="3.5" fill="white" />
        <text x={facingLeft ? -92 : 92} y="-234"
          textAnchor="middle" fill="#C0392B"
          fontSize="11" fontFamily="Inter, sans-serif" fontWeight="700">
          Scam?
        </text>
        <text x={facingLeft ? -92 : 92} y="-220"
          textAnchor="middle" fill="#A03020"
          fontSize="9" fontFamily="Inter, sans-serif">
          I don't know how
        </text>
      </g>
    </g>
  );
};

/* ── Street / ATM background scene ──────────────────────────── */
const StreetScene: React.FC = () => (
  <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
    <defs>
      <filter id="present-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="6" result="n" />
        <feColorMatrix type="saturate" values="0" in="n" result="g" />
        <feComposite in="SourceGraphic" in2="g" operator="arithmetic" k1="0" k2="1" k3="0.03" k4="0" />
      </filter>
      <radialGradient id="pres-vig" cx="50%" cy="55%" r="68%">
        <stop offset="20%" stopColor="transparent" />
        <stop offset="100%" stopColor="#1A1208" stopOpacity="0.55" />
      </radialGradient>
    </defs>

    {/* Sky */}
    <rect width="1920" height="520" fill="#7AABCC" opacity="0.35" />
    <rect width="1920" height="520" fill="#B0C8DC" opacity="0.25" />

    {/* Buildings in background */}
    {[
      { x: 0,    w: 210, h: 460, fill: '#8A9AAA' },
      { x: 220,  w: 180, h: 380, fill: '#7A8A9A' },
      { x: 1520, w: 200, h: 420, fill: '#8A9AA8' },
      { x: 1730, w: 190, h: 350, fill: '#7A8890' },
    ].map((b, i) => (
      <rect key={i} x={b.x} y={540-b.h} width={b.w} height={b.h} fill={b.fill} opacity="0.5" />
    ))}

    {/* Road / pavement */}
    <rect x="0" y="860" width="1920" height="220" fill="#8A8880" />
    <rect x="0" y="858" width="1920" height="6"   fill="#6A6860" />
    {/* Road marking */}
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={i*170+40} y="910" width="100" height="10" rx="5" fill="white" opacity="0.18" />
    ))}

    {/* Pavement / sidewalk */}
    <rect x="0" y="830" width="1920" height="32" fill="#AAA8A0" />

    {/* Cell tower (right bg) */}
    <g opacity="0.55" transform="translate(1750, 350)">
      <line x1="0" y1="0" x2="0" y2="300" stroke="#7A8A9A" strokeWidth="6" />
      <line x1="-55" y1="80"  x2="0" y2="50"  stroke="#7A8A9A" strokeWidth="3" />
      <line x1="55"  y1="80"  x2="0" y2="50"  stroke="#7A8A9A" strokeWidth="3" />
      <line x1="-45" y1="140" x2="0" y2="110" stroke="#7A8A9A" strokeWidth="3" />
      <line x1="45"  y1="140" x2="0" y2="110" stroke="#7A8A9A" strokeWidth="3" />
      <rect x="-8" y="-12" width="16" height="24" rx="4" fill="#6A7A8A" />
      <circle cx="0" cy="-16" r="5" fill="#FF6B00" opacity="0.8" />
    </g>

    {/* Signal bars icon near ATM */}
    <g transform="translate(720, 200)" opacity="0.7">
      {[0,1,2,3].map(i => (
        <rect key={i} x={i*14} y={-i*8} width="10" height={16+i*8} rx="2"
          fill={i < 2 ? '#4CAF50' : '#9A9A9A'}
        />
      ))}
      <text x="28" y="20" fill="#E8E4DC" fontSize="12" fontFamily="sans-serif">4G</text>
    </g>

    {/* Ground grain + vignette */}
    <rect width="1920" height="1080" filter="url(#present-grain)" fill="transparent" opacity="0.4" />
    <rect width="1920" height="1080" fill="url(#pres-vig)" />
  </svg>
);

/* ── Kinetic thesis lines ─────────────────────────────────────  */
const KINETIC_LINES = [
  { text: 'Infrastructure creates access.',     accent: false, delay: 750 },
  { text: 'But skills create use.',             accent: true,  delay: 840 },
];

/* ── Main scene ─────────────────────────────────────────────── */
export const Scene03_Present: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = 1 - cl((frame - 1042) / 38);

  // Phase 1: Map (0–90)
  const mapOpacity   = 1 - cl((frame - 90) / 80);
  const mapDrawProg  = cl(frame / 55);
  const covProg      = cl((frame - 50) / 40);
  const mapCircProg  = cl((frame - 60) / 38);

  // Phase 2+: street scene
  const streetOpacity = cl((frame - 90) / 80);

  // ATM spring
  const atmS       = spring({ frame: frame - 100, fps, config: { damping: 18, stiffness: 100 } });
  const atmY       = interpolate(atmS, [0, 1], [70, 0]);
  const atmOpacity = cl((frame - 100) / 28);
  const atmState   = frame >= 230 && frame < 375 ? 'warning' : 'idle';

  // Person X (approaches from right, hesitates, leaves)
  const personX =
    frame < 100 ? 1750 :
    frame < 230 ? interpolate(frame, [100, 230], [1750, 820], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) :
    frame < 370 ? 820 :
    frame < 490 ? interpolate(frame, [370, 490], [820, 1750], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) :
                  1750;

  const isWalking    = (frame >= 100 && frame < 230) || (frame >= 370 && frame < 490);
  const isHesitating = frame >= 230 && frame < 370;

  // Captions
  const capEra    = cl((frame - 105) / 28);
  const capAtm    = cl((frame - 125) / 28);
  const capAtmOut = 1 - cl((frame - 215) / 25);
  const capHes    = cl((frame - 238) / 28);
  const capHesOut = 1 - cl((frame - 358) / 22);
  const capFinal  = cl((frame - 498) / 35);
  const capFinal2 = cl((frame - 560) / 35);

  // Data overlay (frames 560–750)
  const dataFade  = cl((frame - 570) / 40);
  const dataOut   = 1 - cl((frame - 735) / 30);
  const leftPct   = interpolate(frame, [580, 680], [0, 80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightPct  = interpolate(frame, [600, 700], [0, 13], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>

      {/* ── MAP PHASE ─────────────────────────────────────────── */}
      <AbsoluteFill style={{ background: '#0D1B2A', opacity: mapOpacity }}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -52%)',
        }}>
          <SierraLeoneMap
            drawProgress={mapDrawProg}
            showCoverage
            showCities
            showDividers
            fillColor="#1B3A6A"
            strokeColor="#E8E4DC"
          />
        </div>

        {/* Circle annotation on Freetown */}
        {frame > 60 && (
          <div style={{ position: 'absolute', left: 488, top: 423 }}>
            <HandDrawnCircle cx={42} cy={42} r={38} color="#F4D03F"
              startFrame={60} drawDuration={40} />
          </div>
        )}

        <div style={{
          position: 'absolute', bottom: 72, left: 80,
          opacity: cl((frame - 45) / 28),
        }}>
          <div style={{
            background: 'rgba(10,10,10,0.82)',
            padding: '10px 22px',
            borderLeft: '4px solid #3A9AD9',
          }}>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 17, fontWeight: 700, color: 'white' }}>
              Today — Coverage Is Widespread
            </div>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 12, color: '#AAA', marginTop: 3 }}>
              80%+ of West Africa lives under mobile network coverage
            </div>
          </div>
        </div>

        <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Coverage legend */}
          <circle cx="1750" cy="200" r="12" fill="#3A9AD9" opacity={covProg * 0.3} />
          <circle cx="1750" cy="200" r="5"  fill="#3A9AD9" opacity={covProg * 0.8} />
          <text x="1768" y="205" fill="#E8E4DC" fontSize="13" fontFamily="Inter, sans-serif" opacity={covProg}>
            Mobile coverage
          </text>
        </svg>
      </AbsoluteFill>

      {/* ── STREET / ATM PHASE ───────────────────────────────── */}
      <AbsoluteFill style={{ opacity: streetOpacity }}>
        <StreetScene />

        {/* ATM */}
        <div style={{ position: 'absolute', left: 395, top: 252 + atmY, opacity: atmOpacity }}>
          <svg width="360" height="576" viewBox="0 0 200 320">
            <ATMMachine state={atmState} scale={1} />
          </svg>
        </div>
        <div style={{
          position: 'absolute', left: 395, top: 822,
          width: 360, height: 18,
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.22) 0%, transparent 70%)',
          opacity: atmOpacity,
        }} />

        {/* Aminata */}
        <AbsoluteFill style={{ overflow: 'hidden' }}>
          <svg width="1920" height="1080" viewBox="0 0 1920 1080">
            <ellipse cx={personX} cy="829" rx="36" ry="9" fill="#000" opacity="0.14" />
            <Aminata
              x={personX} frame={frame}
              isWalking={isWalking}
              facingLeft={frame < 370}
              showThought={isHesitating}
            />
          </svg>
        </AbsoluteFill>

        {/* Era label */}
        <div style={{
          position: 'absolute', top: 52, left: 80, opacity: capEra,
          fontFamily: '"Inter", sans-serif', fontSize: 12, letterSpacing: 7,
          color: '#DDCCAA', textTransform: 'uppercase',
          borderLeft: '3px solid #3A9AD9', paddingLeft: 16,
        }}>
          Today · Digital Infrastructure Exists
        </div>

        {/* ATM caption */}
        <div style={{
          position: 'absolute', left: 80, bottom: 100, maxWidth: 480,
          opacity: Math.min(capAtm, capAtmOut),
        }}>
          <div style={{
            background: 'rgba(10,8,4,0.75)', padding: '18px 22px',
            borderLeft: '4px solid #3A9AD9',
          }}>
            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 36, fontWeight: 700, color: '#E8E4DC', lineHeight: 1.2,
            }}>
              The ATM is here.
            </div>
            <div style={{
              fontFamily: '"Inter", sans-serif', fontSize: 18,
              color: '#AABBCC', marginTop: 8, lineHeight: 1.5,
            }}>
              Mobile banking exists. Infrastructure has arrived.
            </div>
          </div>
        </div>

        {/* Hesitation caption */}
        <div style={{
          position: 'absolute', right: 80, top: '50%',
          transform: 'translateY(-50%)', maxWidth: 440,
          opacity: Math.min(capHes, capHesOut),
        }}>
          <div style={{
            background: 'rgba(10,8,4,0.78)', padding: '22px 24px',
            borderLeft: '4px solid #C0392B',
          }}>
            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 40, fontWeight: 900, color: '#C0392B', lineHeight: 1.2, marginBottom: 14,
            }}>
              But Aminata walks away.
            </div>
            <div style={{
              fontFamily: '"Caveat", cursive',
              fontSize: 26, color: '#D4AAAA', lineHeight: 1.55,
            }}>
              Fear of scams.<br />
              "I don't know how to use it."<br />
              Low trust. No guidance.
            </div>
          </div>
        </div>

        {/* Final caption pair */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center', opacity: capFinal,
          background: 'rgba(10,8,4,0.72)', padding: '32px 48px',
        }}>
          <div style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 54, fontWeight: 700, color: '#E8E4DC', lineHeight: 1.15, marginBottom: 8,
          }}>
            Infrastructure exists.
          </div>
          <div style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 54, fontWeight: 900, color: '#C0392B', lineHeight: 1.15,
            opacity: capFinal2,
          }}>
            Adoption does not.
          </div>
        </div>

        {/* ── DATA OVERLAY ────────────────────────────────────── */}
        <AbsoluteFill style={{ opacity: Math.min(dataFade, dataOut) }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
            background: 'rgba(13,27,42,0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0,
          }}>
            {/* Left stat */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 130, fontWeight: 900, color: '#E8E4DC',
                lineHeight: 1, letterSpacing: -4,
              }}>
                {Math.round(leftPct)}%
              </div>
              <div style={{
                fontFamily: '"Inter", sans-serif', fontSize: 18, color: '#8AABCC',
                textAlign: 'center', lineHeight: 1.5, maxWidth: 320, marginTop: 8,
              }}>
                Mobile network<br /><strong style={{ color: '#E8E4DC' }}>coverage</strong>
              </div>
              {/* Bar */}
              <div style={{
                width: 260, height: 8, borderRadius: 4,
                background: '#1E3A5F', marginTop: 18, overflow: 'hidden',
              }}>
                <div style={{ width: `${leftPct * 1.25}%`, height: '100%', background: '#3A9AD9', borderRadius: 4 }} />
              </div>
            </div>

            {/* Divider */}
            <div style={{
              width: 2, height: 280,
              background: 'linear-gradient(to bottom, transparent, #4A6A8A, transparent)',
            }} />

            {/* Right stat */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 130, fontWeight: 900, color: '#C0392B',
                lineHeight: 1, letterSpacing: -4,
              }}>
                {Math.round(rightPct)}%
              </div>
              <div style={{
                fontFamily: '"Inter", sans-serif', fontSize: 18, color: '#CC8888',
                textAlign: 'center', lineHeight: 1.5, maxWidth: 320, marginTop: 8,
              }}>
                Active internet<br /><strong style={{ color: '#E8E4DC' }}>users</strong>
              </div>
              <div style={{
                width: 260, height: 8, borderRadius: 4,
                background: '#3A1010', marginTop: 18, overflow: 'hidden',
              }}>
                <div style={{ width: `${rightPct * 7.7}%`, height: '100%', background: '#C0392B', borderRadius: 4 }} />
              </div>
            </div>
          </div>

          {/* Source */}
          <div style={{
            position: 'absolute', bottom: 50, right: 72,
            fontFamily: '"Inter", sans-serif', fontSize: 11,
            color: '#4A6A8A', letterSpacing: 2,
          }}>
            SOURCE: ITU · GSMA · World Bank, 2023
          </div>
        </AbsoluteFill>

        {/* ── KINETIC TEXT LINES ──────────────────────────────── */}
        <AbsoluteFill style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 28,
          background: 'rgba(13,27,42,0)',
          pointerEvents: 'none',
        }}>
          {KINETIC_LINES.map((line, i) => {
            const lFade = cl((frame - line.delay) / 32);
            const lS    = spring({ frame: frame - line.delay, fps: 30, config: { damping: 20, stiffness: 90 } });
            const lY    = interpolate(lS, [0, 1], [36, 0]);
            if (lFade === 0) return null;
            return (
              <div key={i} style={{
                opacity: lFade, transform: `translateY(${lY}px)`,
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 60, fontWeight: line.accent ? 900 : 700,
                  color: line.accent ? '#C0392B' : '#E8E4DC',
                  lineHeight: 1.1,
                  background: 'rgba(13,27,42,0.8)',
                  padding: '8px 36px',
                }}>
                  {line.text}
                </div>
              </div>
            );
          })}
        </AbsoluteFill>

        <LowerThird
          label="Today · Sierra Leone"
          sublabel="Infrastructure without literacy creates a usage gap"
          startFrame={108}
          color="#3A9AD9"
        />
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
