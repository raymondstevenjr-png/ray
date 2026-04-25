/**
 * Scene 02 — The Past  (300 frames / 26 s within this Sequence)
 *
 * Map zooms into Sierra Leone with "2010" annotation, then
 * cross-dissolves to a desaturated sepia bank-queue scene.
 * Documentary lower-thirds and hand-drawn annotations.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { SierraLeoneMap }     from '../components/SierraLeoneMap';
import { LowerThird }         from '../components/LowerThird';
import { HandDrawnCircle }    from '../components/HandDrawnCircle';
import { MonologueCaption }   from '../components/MonologueCaption';

const cl = (v: number) => Math.max(0, Math.min(1, v));

// ── Bank / queue illustration ────────────────────────────────
const BankScene: React.FC<{ frame: number }> = ({ frame }) => {
  const people = [
    { x: 155, color: '#6A7A5A', hasDoc: true,  delay: 0  },
    { x: 245, color: '#8B5A40', hasDoc: false, delay: 18 },
    { x: 330, color: '#4A6A7A', hasDoc: true,  delay: 36 },
    { x: 415, color: '#7A5030', hasDoc: false, delay: 54 },
    { x: 498, color: '#5A5A4A', hasDoc: false, delay: 72 },
  ];

  return (
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <filter id="sepia-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="14" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
          <feBlend in="SourceGraphic" in2="gray" mode="multiply" result="blend" />
          <feColorMatrix type="matrix"
            values="0.393 0.769 0.189 0 0
                    0.349 0.686 0.168 0 0
                    0.272 0.534 0.131 0 0
                    0     0     0     1 0"
            in="blend"
          />
        </filter>
        {/* Vignette */}
        <radialGradient id="past-vig" cx="50%" cy="50%" r="70%">
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor="#2A1A00" stopOpacity="0.65" />
        </radialGradient>
      </defs>

      {/* Sepia-toned background */}
      <rect width="1920" height="1080" fill="#C8A87A" />
      <rect width="1920" height="1080" fill="#8B6A3A" opacity="0.25" />

      {/* Sky */}
      <rect x="0" y="0" width="1920" height="480" fill="#D4B880" opacity="0.4" />

      {/* ── Bank building ── */}
      <g filter="url(#sepia-grain)" opacity="0.95">
        {/* Foundation */}
        <rect x="840" y="830" width="620" height="30" fill="#8A7A5A" />
        {/* Main body */}
        <rect x="860" y="240" width="580" height="600" fill="#C4A870" />
        {/* Pediment */}
        <polygon points="820,245 1150,155 1480,245" fill="#B89850" />
        <polygon points="840,245 1150,162 1460,245" fill="#C4A870" />
        {/* Frieze */}
        <rect x="860" y="244" width="580" height="34" fill="#A89050" />

        {/* Columns ×5 */}
        {[0,1,2,3,4].map(i => (
          <g key={i}>
            <rect x={880 + i*100} y="278" width="26" height="555" rx="2" fill="#D4B880" />
            <rect x={876 + i*100} y="272" width="34" height="12" rx="2" fill="#B8A060" />
            <rect x={876 + i*100} y="828" width="34" height="14" rx="2" fill="#B8A060" />
          </g>
        ))}

        {/* Bank sign */}
        <rect x="910" y="295" width="440" height="46" rx="4" fill="#2A3A28" />
        <text x="1130" y="326" textAnchor="middle" fill="#D4B880"
          fontSize="18" fontFamily="serif" fontWeight="700" letterSpacing="2">
          BANK OF SIERRA LEONE
        </text>

        {/* Windows ×6 */}
        {[0,1].map(row => [0,1,2].map(col => (
          <g key={`${row}-${col}`}>
            <rect x={900+col*160} y={380+row*200} width="110" height="140" rx="5" fill="#7A8A90" opacity="0.55" />
            <ellipse cx={955+col*160} cy={380+row*200} rx="55" ry="24" fill="#7A8A90" opacity="0.35" />
            <line x1={900+col*160} x2={1010+col*160} y1={450+row*200} y2={450+row*200} stroke="#6A7A80" strokeWidth="2" />
            <line x1={955+col*160} x2={955+col*160} y1={380+row*200} y2={520+row*200} stroke="#6A7A80" strokeWidth="2" />
          </g>
        )))}

        {/* Entrance / teller window */}
        <rect x="1060" y="680" width="180" height="162" rx="3" fill="#8A9AAB" />
        <rect x="1064" y="684" width="172" height="154" rx="2" fill="#AABBC8" />
        <rect x="1060" y="760" width="180" height="16" fill="#7A8A9B" />
        {/* Teller */}
        <circle cx="1150" cy="730" r="16" fill="#8B5A2B" />
        <rect x="1135" y="736" width="30" height="25" rx="4" fill="#2A3A28" />
        {/* Cash being passed */}
        <rect x="1134" y="772" width="36" height="8" rx="3" fill="#85C17E" opacity="0.8" />

        {/* Queue rope posts */}
        {[200,370,540,710].map((px, i) => (
          <g key={i}>
            <rect x={px} y="790" width="10" height="50" rx="5" fill="#8B7355" />
            <circle cx={px+5} cy="790" r="8" fill="#A08050" />
          </g>
        ))}
        {/* Rope lines */}
        {[200,370,540].map((px, i) => (
          <path key={i}
            d={`M ${px+5},804 Q ${px+90},820 ${px+175},804`}
            stroke="#8B7355" strokeWidth="3" fill="none" opacity="0.55" />
        ))}
      </g>

      {/* ── People in queue ── */}
      <g filter="url(#sepia-grain)">
        {people.map((p, i) => {
          const fade = cl((frame - p.delay) / 22);
          return (
            <g key={i} opacity={fade} transform={`translate(${p.x}, 790)`}>
              {/* Legs */}
              <rect x="-10" y="0" width="9" height="38" rx="4" fill="#1F0F05" />
              <rect x="1"  y="0" width="9" height="38" rx="4" fill="#1F0F05" />
              <ellipse cx="-6" cy="40" rx="9" ry="4" fill="#111" />
              <ellipse cx="5"  cy="40" rx="9" ry="4" fill="#111" />
              {/* Body */}
              <rect x="-16" y="-55" width="32" height="55" rx="7" fill={p.color} />
              {/* Head */}
              <circle cx="0" cy="-72" r="18" fill="#8B5A2B" />
              {/* Hair */}
              <ellipse cx="0" cy="-87" rx="18" ry="10" fill="#2C1810" />
              {/* Arms */}
              <rect x="-26" y="-52" width="12" height="30" rx="5" fill={p.color} />
              <rect x="14"  y="-52" width="12" height="30" rx="5" fill={p.color} />
              {/* Paper doc */}
              {p.hasDoc && (
                <g transform="translate(14, -36)">
                  <rect x="0" y="0" width="24" height="30" rx="3"
                    fill="#F4EFE6" stroke="#C4A882" strokeWidth="1.5" />
                  {[0,1,2,3].map(li => (
                    <rect key={li} x="3" y={6+li*6} width={li===3?10:18} height="2.5"
                      rx="1" fill="#C4A882" />
                  ))}
                </g>
              )}
            </g>
          );
        })}
      </g>

      {/* Ledger / paper stacks on desk */}
      <g opacity={cl((frame - 55) / 25)}>
        <rect x="68" y="630" width="80" height="105" rx="5" fill="#F4EFE6" stroke="#C4A882" strokeWidth="2" />
        {[0,1,2,3,4,5].map(i => (
          <rect key={i} x="78" y={645+i*14} width={i%2===0?60:40} height="4" rx="2" fill="#C4A882" />
        ))}
        <text x="108" y="748" textAnchor="middle" fill="#8B7355" fontSize="10" fontFamily="serif">LEDGER</text>
      </g>

      {/* Clock */}
      <g opacity={cl((frame - 100) / 25)} transform="translate(1820, 200)">
        <circle cx="0" cy="0" r="38" fill="#F4EFE6" stroke="#C4A882" strokeWidth="2.5" />
        <line x1="0" y1="0" x2="0" y2="-26" stroke="#2A1A0A" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="22" y2="12" stroke="#2A1A0A" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="0" cy="0" r="4" fill="#2A1A0A" />
        <text x="0" y="56" textAnchor="middle" fill="#8B7355" fontSize="11" fontFamily="serif">2 hr wait</text>
      </g>

      {/* Ground */}
      <rect x="0" y="870" width="1920" height="210" fill="#B8A070" opacity="0.5" />

      {/* Vignette overlay */}
      <rect width="1920" height="1080" fill="url(#past-vig)" />
    </svg>
  );
};

// ── Main scene component ──────────────────────────────────────
export const Scene02_Past: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0–90): dark map view with "2010" annotation
  // Phase 2 (90–180): cross-dissolve from map to bank scene
  // Phase 3 (180–780): bank scene with captions
  const mapOpacity  = 1 - cl((frame - 90) / 80);
  const sceneOpacity = cl((frame - 90) / 80);

  const fadeOut = 1 - cl((frame - 740) / 40);

  // Map annotations
  const mapDrawProg  = cl(frame / 45);
  const dotProg      = cl((frame - 40) / 35);
  const yearFade     = cl((frame - 55) / 30);
  const circProg     = cl((frame - 60) / 40);

  // Bank scene captions
  const era       = cl((frame - 95)  / 28);
  const cap1Fade  = cl((frame - 130) / 32);
  const cap1Y     = interpolate(frame, [130, 172], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cap2Fade  = cl((frame - 230) / 32);
  const cap2Y     = interpolate(frame, [230, 272], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cap3Fade  = cl((frame - 360) / 32);
  const cap3Y     = interpolate(frame, [360, 402], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const quoteProg = spring({ frame: frame - 510, fps, config: { damping: 22, stiffness: 80 } });
  const quoteY    = interpolate(quoteProg, [0, 1], [36, 0]);
  const quoteFade = cl((frame - 510) / 35);

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>

      {/* ── MAP PHASE ─────────────────────────────────────────── */}
      <AbsoluteFill style={{ background: '#0D1B2A', opacity: mapOpacity }}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -52%)',
          opacity: mapDrawProg,
        }}>
          <SierraLeoneMap
            drawProgress={mapDrawProg}
            showCities
            showLabels
            showDividers
            fillColor="#1B3A6A"
            strokeColor="#E8E4DC"
          />
        </div>

        {/* Freetown circle annotation (Freetown at SVG 52,250 → scene ~732,509) */}
        {frame > 60 && (
          <div style={{ position: 'absolute', left: 690, top: 467 }}>
            <HandDrawnCircle
              cx={42} cy={42} r={38}
              color="#C0392B"
              startFrame={60}
              drawDuration={40}
            />
          </div>
        )}

        {/* "2010" year label callout */}
        <div style={{
          position: 'absolute', left: 860, top: 478,
          opacity: yearFade,
          fontFamily: '"Caveat", cursive',
          fontSize: 28, color: '#C0392B',
        }}>
          ← 2010
        </div>

        {/* Dotted arrow from label to Freetown area */}
        <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          width="1920" height="1080" viewBox="0 0 1920 1080">
          <line
            x1="858" y1="496" x2="740" y2="496"
            stroke="#C0392B" strokeWidth="1.5"
            strokeDasharray="6,5"
            opacity={dotProg}
          />
        </svg>

        {/* Lower-third: era context */}
        <div style={{
          position: 'absolute', bottom: 72, left: 80,
          opacity: yearFade,
        }}>
          <div style={{
            background: 'rgba(10,10,10,0.8)',
            padding: '10px 22px',
            borderLeft: '4px solid #C0392B',
          }}>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 17, fontWeight: 700, color: 'white',
            }}>
              Sierra Leone · Before Digital Infrastructure
            </div>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 12, color: '#AAA', marginTop: 3,
            }}>
              Financial services were entirely manual
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── BANK SCENE PHASE ───────────────────────────────────── */}
      <AbsoluteFill style={{ opacity: sceneOpacity }}>
        <BankScene frame={Math.max(0, frame - 90)} />

        {/* Era label top-left */}
        <div style={{
          position: 'absolute', top: 52, left: 80,
          opacity: era,
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          fontSize: 12, letterSpacing: 7, color: '#D4C4A0',
          textTransform: 'uppercase',
          borderLeft: '3px solid #8B7355', paddingLeft: 16,
        }}>
          The Past · Sierra Leone · Pre-Digital Era
        </div>

        {/* Right-side caption panel */}
        <div style={{
          position: 'absolute', right: 72, top: 0, width: 520,
          height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', gap: 30,
        }}>
          <div style={{ opacity: cap1Fade, transform: `translateY(${cap1Y}px)` }}>
            <div style={{
              background: 'rgba(10,8,4,0.72)',
              padding: '20px 24px',
              borderLeft: '4px solid #8B7355',
            }}>
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 36, fontWeight: 700,
                color: '#E8D5B0', lineHeight: 1.25,
              }}>
                Financial services were entirely manual.
              </div>
            </div>
          </div>

          <div style={{ opacity: cap2Fade, transform: `translateY(${cap2Y}px)` }}>
            <div style={{
              background: 'rgba(10,8,4,0.65)',
              padding: '18px 24px',
            }}>
              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: 30, color: '#D4B880', lineHeight: 1.55,
              }}>
                Long queues.<br />
                Paper forms.<br />
                Cash only.
              </div>
            </div>
          </div>

          <div style={{ opacity: cap3Fade, transform: `translateY(${cap3Y}px)` }}>
            <div style={{
              background: 'rgba(10,8,4,0.6)',
              padding: '16px 24px',
            }}>
              <div style={{
                fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                fontSize: 17, color: '#C4B49A', lineHeight: 1.7,
              }}>
                No digital access. No digital tools.<br />
                People waited hours for simple transactions.
              </div>
            </div>
          </div>

          <div style={{
            opacity: quoteFade,
            transform: `translateY(${quoteY}px)`,
          }}>
            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 24, fontWeight: 700,
              color: '#D4B880', fontStyle: 'italic',
              borderLeft: '4px solid #C0392B',
              paddingLeft: 20,
              background: 'rgba(10,8,4,0.55)',
              padding: '14px 24px',
            }}>
              "Access itself was the barrier."
            </div>
          </div>
        </div>

        {/* Aminata's internal monologue — standing in the queue */}
        <MonologueCaption
          words={[
            'Two', 'hours', 'in', 'this', 'queue...', 'I', 'only',
            'want', 'to', 'send', 'money', 'to', 'my', 'sister',
            'in', 'Bo.', 'Na', 'why', 'this', 'so', 'hard?',
          ]}
          startFrame={165}
          endFrame={390}
          framesPerWord={10}
          accentColor="#D4B880"
        />

        {/* Lower-third label */}
        <LowerThird
          label="The Past · Sierra Leone"
          sublabel="Manual banking · Paper records · No digital infrastructure"
          startFrame={100}
          color="#8B7355"
        />
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
