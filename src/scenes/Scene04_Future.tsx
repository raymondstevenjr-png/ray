/**
 * Scene 04 — The Future  (960 frames / 32 s within this Sequence)
 *
 * Bright, hopeful. Same ATM — Aminata uses it confidently.
 * Phone UI shows Krio-language interface. Community training visual.
 * Two kinetic thesis lines: "Institutions create trust." / "Local content creates inclusion."
 * Three policy investment pillars spring in.
 */
import React from 'react';
import {
  AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig,
  Sequence, Audio, staticFile,
} from 'remotion';
import { ATMMachine }         from '../components/ATMMachine';
import { LowerThird }         from '../components/LowerThird';
import { HandDrawnUnderline } from '../components/HandDrawnUnderline';
import { MonologueCaption }   from '../components/MonologueCaption';

const cl = (v: number) => Math.max(0, Math.min(1, v));

/* ── Confident Aminata ──────────────────────────────────────── */
const AminataConfident: React.FC<{
  x: number; frame: number;
  isWalking: boolean; showSuccess: boolean;
}> = ({ x, frame, isWalking, showSuccess }) => {
  const bob      = isWalking ? Math.sin(frame * 0.4) * 7 : 0;
  const legSwing = isWalking ? Math.sin(frame * 0.4) * 24 : 0;
  const armSwing = isWalking ? Math.sin(frame * 0.4) * 18 : 0;
  const cardExtend = showSuccess ? 0 : interpolate(frame, [220, 255], [0, -38], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <g transform={`translate(${x}, ${825 + bob})`}>
      <g transform="scale(-1, 1)">
        {/* Legs */}
        <g transform={`rotate(${legSwing}, -9, -12)`}>
          <rect x="-16" y="-58" width="14" height="58" rx="7" fill="#1F0F05" />
          <ellipse cx="-9" cy="4" rx="14" ry="6" fill="#0F0500" />
        </g>
        <g transform={`rotate(${-legSwing}, 9, -12)`}>
          <rect x="2" y="-58" width="14" height="58" rx="7" fill="#1F0F05" />
          <ellipse cx="9" cy="4" rx="14" ry="6" fill="#0F0500" />
        </g>
        {/* Body — brighter outfit */}
        <rect x="-24" y="-130" width="48" height="72" rx="12" fill="#1B4A7A" />
        {/* Kente strip */}
        <rect x="-24" y="-118" width="48" height="7"  fill="#C0392B" opacity="0.55" />
        <rect x="-24" y="-109" width="48" height="3.5" fill="#F4D03F" opacity="0.45" />
        {/* Left arm */}
        <g transform={`rotate(${-armSwing}, -24, -125)`}>
          <rect x="-36" y="-130" width="14" height="42" rx="7" fill="#1B4A7A" />
        </g>
        {/* Right arm — extends forward to slot card */}
        <g transform={`rotate(${cardExtend}, 24, -125)`}>
          <rect x="22" y="-130" width="14" height="42" rx="7" fill="#1B4A7A" />
          {/* Card in hand */}
          {!showSuccess && frame >= 215 && (
            <rect x="26" y="-95" width="20" height="28" rx="4"
              fill="#FFD700" stroke="#B8860B" strokeWidth="1.5"
              opacity={cl((frame - 215) / 18)}
            />
          )}
        </g>
        {/* Receipt after success */}
        {showSuccess && (
          <g opacity={cl((frame - 290) / 22)}>
            <rect x="-30" y="-130" width="18" height="42" rx="4"
              fill="white" stroke="#C4A882" strokeWidth="1.5" />
            <rect x="-27" y="-125" width="12" height="2.5" rx="1" fill="#C4A882" />
            <rect x="-27" y="-119" width="12" height="2.5" rx="1" fill="#C4A882" />
            <rect x="-27" y="-113" width="8"  height="2.5" rx="1" fill="#C4A882" />
            <text x="-21" y="-92" textAnchor="middle" fill="#4CAF50" fontSize="10" fontFamily="sans-serif">
              ✓
            </text>
          </g>
        )}
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
        {/* Smile */}
        {showSuccess && (
          <path d="M -12,-152 Q 0,-142 12,-152"
            stroke="#5A3020" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
      </g>

      {/* Success glow */}
      {showSuccess && (
        <circle cx="0" cy="-150" r="110" fill="#4CAF50"
          opacity={interpolate(frame, [290, 340], [0, 0.09], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
        />
      )}
    </g>
  );
};

/* ── Phone with Krio UI ─────────────────────────────────────── */
const KrioPhone: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div style={{
    opacity, width: 220, height: 380,
    background: '#1A1A1A', borderRadius: 24,
    border: '3px solid #3A3A3A',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
  }}>
    {/* Status bar */}
    <div style={{
      background: '#111', padding: '6px 14px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ color: '#E8E4DC', fontSize: 10, fontFamily: 'Inter, sans-serif' }}>9:41</span>
      <span style={{ color: '#4CAF50', fontSize: 10, fontFamily: 'Inter, sans-serif' }}>▐▐▐▐ 4G</span>
    </div>
    {/* App header */}
    <div style={{
      background: '#1B3A57', padding: '12px 14px',
      fontFamily: '"Inter", sans-serif',
    }}>
      <div style={{ color: '#E8E4DC', fontSize: 13, fontWeight: 700 }}>BSL Mobile Money</div>
      <div style={{ color: '#9AAABB', fontSize: 10, marginTop: 2 }}>Wetin yu wan do?</div>
    </div>
    {/* Menu options in Krio */}
    {[
      { en: 'Send Money', kr: 'Sen moni' },
      { en: 'Withdraw',   kr: 'Tek aut moni' },
      { en: 'Pay Bills',  kr: 'Pe bil' },
      { en: 'Check Balance', kr: 'Chek moni' },
    ].map((item, i) => (
      <div key={i} style={{
        padding: '11px 14px', background: i % 2 === 0 ? '#1E2A35' : '#1A2430',
        borderBottom: '1px solid #2A3A4A',
        display: 'flex', flexDirection: 'column', gap: 2,
      }}>
        <div style={{ color: '#E8E4DC', fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
          {item.en}
        </div>
        <div style={{ color: '#6AAABB', fontSize: 13, fontFamily: '"Caveat", cursive' } as React.CSSProperties}>
          {item.kr}
        </div>
      </div>
    ))}
    {/* Footer */}
    <div style={{
      background: '#4CAF50', padding: '10px 14px', marginTop: 'auto',
      fontFamily: 'Inter, sans-serif', fontSize: 11,
      color: 'white', textAlign: 'center', fontWeight: 700,
    }}>
      Local Language Support ✓
    </div>
  </div>
);

/* ── Policy pillars ─────────────────────────────────────────── */
const PILLARS = [
  { title: 'Digital Literacy & Skills', sub: 'From primary to university\nIn English and Krio', color: '#1B3A57', startFrame: 660 },
  { title: 'Strong Institutions',        sub: 'Regulation · Governance\nTrust & accountability',   color: '#C0392B', startFrame: 720 },
  { title: 'Interoperable Systems',      sub: 'Banks · Telecoms · Gov\nSeamless integration',   color: '#2E7D32', startFrame: 780 },
];

/* ── Main scene ─────────────────────────────────────────────── */
export const Scene04_Future: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn  = cl(frame / 22);
  const fadeOut = 1 - cl((frame - 920) / 40);

  // Phases:
  // 0–80 : scene intro + ATM appears
  // 80–220 : Aminata walks to ATM
  // 220–285: card interaction
  // 285–380: success
  // 380–550: captions "Same Aminata…"
  // 550–750: Krio phone appears; two kinetic lines
  // 660–900: policy pillars
  // 900–960: fade out

  const atmS = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 100 } });
  const atmY = interpolate(atmS, [0, 1], [60, 0]);
  const atmOpacity = cl((frame - 10) / 28);
  const atmState =
    frame < 228   ? 'idle'       :
    frame < 288   ? 'processing' :
                    'success';

  const personX =
    frame < 80  ? 1750 :
    frame < 220 ? interpolate(frame, [80, 220], [1750, 820], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) :
                  820;

  const isWalking   = frame >= 80 && frame < 220;
  const showSuccess = frame >= 288;

  // Cash note
  const cashNoteY = showSuccess
    ? interpolate(frame, [288, 335], [760, 715], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 800;
  const cashNoteOp = showSuccess ? cl((frame - 288) / 22) : 0;

  // Captions
  const cap1F = cl((frame - 380) / 38);
  const cap1Y = interpolate(frame, [380, 420], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cap2F = cl((frame - 450) / 38);
  const cap2Y = interpolate(frame, [450, 490], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cap3F = cl((frame - 520) / 38);

  // Kinetic lines
  const KLINES = [
    { text: 'Institutions create trust.',       accent: false, delay: 570 },
    { text: 'Local content creates inclusion.', accent: true,  delay: 650 },
  ];

  // Krio phone
  const phoneF = cl((frame - 555) / 40);

  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      {/* Warm, bright paper background */}
      <AbsoluteFill>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <defs>
            <filter id="future-paper">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" seed="9" />
              <feDisplacementMap in="SourceGraphic" scale="4" />
            </filter>
          </defs>
          <rect width="1920" height="1080" fill="#EDE8DC" filter="url(#future-paper)" />
          {/* Success green tint after ATM success */}
          <rect width="1920" height="1080" fill="#4CAF50"
            opacity={interpolate(frame, [288, 360], [0, 0.05], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
          <radialGradient id="fut-vig" cx="50%" cy="60%" r="68%">
            <stop offset="25%" stopColor="transparent" />
            <stop offset="100%" stopColor="#0A1A0A" stopOpacity="0.28" />
          </radialGradient>
          <rect width="1920" height="1080" fill="url(#fut-vig)" />
          <line x1="0" y1="825" x2="1920" y2="825" stroke="#B4A87A" strokeWidth="1.5" opacity="0.5" />
        </svg>
      </AbsoluteFill>

      {/* Era label */}
      <div style={{
        position: 'absolute', top: 52, left: 80, opacity: cl(frame / 25),
        fontFamily: '"Inter", sans-serif', fontSize: 12, letterSpacing: 7,
        color: '#2A6A3A', textTransform: 'uppercase',
        borderLeft: '3px solid #4CAF50', paddingLeft: 16,
      }}>
        The Future · Digital Transformation Done Right
      </div>

      {/* ATM */}
      <div style={{ position: 'absolute', left: 395, top: 249 + atmY, opacity: atmOpacity }}>
        <svg width="360" height="576" viewBox="0 0 200 320">
          <ATMMachine state={atmState} scale={1} />
        </svg>
      </div>
      <div style={{
        position: 'absolute', left: 395, top: 818,
        width: 360, height: 18,
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%)',
        opacity: atmOpacity,
      }} />

      {/* Cash note */}
      {cashNoteOp > 0 && (
        <div style={{
          position: 'absolute', left: 440, top: cashNoteY,
          width: 180, height: 56, background: '#85C17E', borderRadius: 6,
          opacity: cashNoteOp, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}>
          <span style={{ fontFamily: '"Inter", sans-serif', fontSize: 16, fontWeight: 700, color: '#1A3A10' }}>
            Le 500,000
          </span>
        </div>
      )}

      {/* Person */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <ellipse cx={personX} cy="829" rx="36" ry="9" fill="#000" opacity="0.12" />
          <AminataConfident x={personX} frame={frame} isWalking={isWalking} showSuccess={showSuccess} />
        </svg>
      </AbsoluteFill>

      {/* Right-side captions */}
      <div style={{
        position: 'absolute', right: 80, top: 0, width: 560,
        height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', gap: 28,
      }}>
        <div style={{ opacity: cap1F, transform: `translateY(${cap1Y}px)` }}>
          <div style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 42, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: 6,
          }}>
            Same Aminata.<br />Same ATM.
          </div>
          <div style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 46, fontWeight: 900, color: '#2E7D32', lineHeight: 1.1,
          }}>
            Different story.
          </div>
        </div>

        <div style={{ opacity: cap2F, transform: `translateY(${cap2Y}px)` }}>
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: 30, color: '#2A5A3A', lineHeight: 1.55,
            borderLeft: '3px solid #4CAF50', paddingLeft: 20,
          }}>
            Digital literacy changed everything.
          </div>
        </div>

        {/* Krio phone */}
        <div style={{ opacity: phoneF, transform: `translateY(${cap3F * 20 - 20}px)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <KrioPhone opacity={1} />
            <div>
              <div style={{
                fontFamily: '"Inter", sans-serif', fontSize: 13,
                color: '#4CAF50', fontWeight: 700, letterSpacing: 3,
                textTransform: 'uppercase', marginBottom: 6,
              }}>
                Local Language UI
              </div>
              <div style={{
                fontFamily: '"Inter", sans-serif', fontSize: 16,
                color: '#3A3A3A', lineHeight: 1.6,
              }}>
                Services available in Krio<br />
                and other local languages.<br />
                Inclusion by design.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kinetic thesis lines */}
      <div style={{
        position: 'absolute', left: 80, bottom: 200,
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {KLINES.map((line, i) => {
          const lF = cl((frame - line.delay) / 30);
          const lS = spring({ frame: frame - line.delay, fps: 30, config: { damping: 20, stiffness: 90 } });
          const lY = interpolate(lS, [0, 1], [32, 0]);
          if (lF === 0) return null;
          return (
            <div key={i} style={{ opacity: lF, transform: `translateY(${lY}px)` }}>
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 46, fontWeight: line.accent ? 900 : 700,
                color: line.accent ? '#2E7D32' : '#1A1A1A',
                lineHeight: 1.1,
              }}>
                {line.text}
              </div>
              {i === 1 && lF > 0.8 && (
                <HandDrawnUnderline
                  x={0} y={0} width={520}
                  color="#2E7D32"
                  startFrame={line.delay + 20}
                  drawDuration={38}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Policy pillars */}
      <div style={{
        position: 'absolute', bottom: 60, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 24,
      }}>
        {PILLARS.map((p, i) => {
          const pS = spring({ frame: frame - p.startFrame, fps: 30, config: { damping: 16, stiffness: 90 } });
          const pY = interpolate(pS, [0, 1], [60, 0]);
          const pF = cl((frame - p.startFrame) / 28);
          return (
            <div key={i} style={{
              opacity: pF, transform: `translateY(${pY}px)`,
              width: 280, background: 'white',
              border: `2px solid ${p.color}`,
              borderTop: `6px solid ${p.color}`,
              padding: '16px 18px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}>
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 18, fontWeight: 700, color: p.color, lineHeight: 1.2, marginBottom: 8,
              }}>
                {p.title}
              </div>
              <div style={{
                fontFamily: '"Inter", sans-serif', fontSize: 13,
                color: '#5A5A5A', lineHeight: 1.55, whiteSpace: 'pre-line',
              }}>
                {p.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Aminata's voice — confident ATM success */}
      <Sequence from={295} durationInFrames={344}>
        <Audio src={staticFile('audio/aminata_future.mp3')} volume={0.90} />
      </Sequence>

      {/* Aminata's inner voice — ATM success moment */}
      <MonologueCaption
        words={[
          'Three', 'days', 'training.', 'Now', 'I', 'know', 'every',
          'step.', 'Card', 'in—', 'choose', 'language—', 'Krio.',
          'Select', 'amount.', 'Done.', 'Five', 'minutes.', 'My',
          'sister', 'get', 'the', 'money.',
        ]}
        startFrame={295}
        endFrame={505}
        framesPerWord={9}
        accentColor="#4CAF50"
      />

      <LowerThird
        label="The Future · Sierra Leone"
        sublabel="Literacy · Institutions · Local content = Real inclusion"
        startFrame={28}
        color="#4CAF50"
      />
    </AbsoluteFill>
  );
};
