/**
 * Scene 05 — Closing  (480 frames / 16 s within this Sequence)
 *
 * Map of Sierra Leone centred on dark bg.
 * "Build the roads." then "And teach the drivers."
 * Hold → fade to near-black.
 * SLPPNA branding.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { SierraLeoneMap } from '../components/SierraLeoneMap';
import { HandDrawnUnderline } from '../components/HandDrawnUnderline';

const cl = (v: number) => Math.max(0, Math.min(1, v));

export const Scene05_Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn  = cl(frame / 25);

  // Map slow push-in (parallax zoom)
  const mapScale = interpolate(frame, [0, 480], [1.0, 1.12], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Text timings
  const line1S = spring({ frame: frame - 40,  fps, config: { damping: 22, stiffness: 80 } });
  const line1Y = interpolate(line1S, [0, 1], [48, 0]);
  const line1F = cl((frame - 40) / 30);

  const line2S = spring({ frame: frame - 110, fps, config: { damping: 20, stiffness: 75 } });
  const line2Y = interpolate(line2S, [0, 1], [48, 0]);
  const line2F = cl((frame - 110) / 30);

  const ruleW  = interpolate(frame, [155, 220], [0, 700], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const subF   = cl((frame - 235) / 35);
  const brandF = cl((frame - 305) / 35);

  // Fade to near-black
  const fadeOut = interpolate(frame, [420, 480], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      {/* Dark bg */}
      <AbsoluteFill style={{ background: '#0D1B2A' }} />

      {/* Map — zoomed in, centered, faded */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%, -50%) scale(${mapScale})`,
        opacity: 0.18,
      }}>
        <SierraLeoneMap
          drawProgress={1}
          showCities
          showDividers
          fillColor="#1E3A6A"
          strokeColor="#E8E4DC"
        />
      </div>

      {/* Subtle grid overlay */}
      <AbsoluteFill style={{ opacity: 0.03 }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i*90} x2="1920" y2={i*90}
              stroke="white" strokeWidth="1" />
          ))}
        </svg>
      </AbsoluteFill>

      {/* ── Main copy ────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center', width: 900,
      }}>
        {/* Line 1 */}
        <div style={{
          opacity: line1F, transform: `translateY(${line1Y}px)`,
          marginBottom: 6,
        }}>
          <div style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 80, fontWeight: 700,
            color: '#E8E4DC', lineHeight: 1.1,
          }}>
            Build the roads.
          </div>
        </div>

        {/* Line 2 */}
        <div style={{
          opacity: line2F, transform: `translateY(${line2Y}px)`,
          marginBottom: 18,
        }}>
          <div style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 80, fontWeight: 900,
            color: '#C0392B', lineHeight: 1.1,
          }}>
            And teach the drivers.
          </div>
        </div>

        {/* Animated rule */}
        <div style={{
          width: ruleW, height: 3, background: '#C0392B',
          margin: '0 auto 36px',
          transition: 'none',
        }} />

        {/* Underline on line 2 */}
        {line2F > 0.5 && (
          <div style={{ position: 'absolute', left: '50%', top: 182, transform: 'translateX(-50%)', width: 750 }}>
            <HandDrawnUnderline
              x={0} y={0} width={750} color="#C0392B"
              startFrame={135} drawDuration={50}
            />
          </div>
        )}

        {/* Sub-message */}
        <div style={{ opacity: subF, marginBottom: 32 }}>
          <div style={{
            fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
            fontSize: 20, color: '#7AAABB', lineHeight: 1.7,
            letterSpacing: 0.5,
          }}>
            Infrastructure is necessary — but not sufficient.<br />
            Skills · Institutions · Local ecosystems = Transformation.
          </div>
        </div>

        {/* Group 2 thesis line */}
        <div style={{ opacity: subF }}>
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: 28, color: '#9AAABB', lineHeight: 1.5,
          }}>
            "Infrastructure connects systems, but people,<br />
            policies, and platforms create value."
          </div>
        </div>
      </div>

      {/* ── Branding footer ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 52, left: '50%',
        transform: 'translateX(-50%)',
        opacity: brandF,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          fontSize: 13, letterSpacing: 7,
          color: '#4A6A8A', textTransform: 'uppercase',
          marginBottom: 6,
        }}>
          THE SLPPNA DEBATE · YOUNG GENERATION RETREAT · 2025
        </div>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          fontSize: 11, letterSpacing: 4,
          color: '#2A4A6A', textTransform: 'uppercase',
        }}>
          Group 2 · Opening Presentation
        </div>
      </div>

      {/* Corner marks */}
      {[[24,24],[1896,24],[24,1056],[1896,1056]].map(([lx,ly], i) => (
        <div key={i} style={{
          position: 'absolute', left: lx-6, top: ly-6,
          width: 12, height: 12,
          border: '1px solid #2A4A6A',
          opacity: brandF * 0.5,
        }} />
      ))}

      {/* Fade-to-black overlay */}
      <AbsoluteFill style={{ background: '#0A0F14', opacity: fadeOut }} />
    </AbsoluteFill>
  );
};
