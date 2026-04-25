/**
 * Scene 01 — The Hook  (0–300 frames / 10 s)
 *
 * Dark documentary opening. Sierra Leone map draws on.
 * Sketch circle annotates the country. Thesis question appears.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { SierraLeoneMap } from '../components/SierraLeoneMap';

const cl = (v: number) => Math.max(0, Math.min(1, v));

// Animated dotted connector line (Johnny Harris callout style)
const CalloutLine: React.FC<{ x1: number; y1: number; x2: number; y2: number; progress: number }> = (
  { x1, y1, x2, y2, progress }
) => {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const dash = interpolate(progress, [0, 1], [len, 0]);
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="#C0392B" strokeWidth="1.5" strokeDasharray={len}
      strokeDashoffset={dash} strokeLinecap="round" />
  );
};

export const Scene01_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── timing ───────────────────────────────────────────────────
  // 0-18   : fade in from black
  // 18-95  : map outline draws on
  // 95-165 : sketch circle draws around country
  // 120-160: callout lines + "SIERRA LEONE" label
  // 155-220: thesis question springs in
  // 220-265: group badge fades in
  // 265-300: fade out

  const bgFade      = cl(frame / 18);
  const drawProg    = cl((frame - 18) / 77);
  const circleProg  = cl((frame - 95) / 70);
  const labelFade   = cl((frame - 120) / 30);
  const calloutProg = cl((frame - 125) / 35);

  const titleProg   = spring({ frame: frame - 155, fps, config: { damping: 20, stiffness: 90 } });
  const titleY      = interpolate(titleProg, [0, 1], [48, 0]);
  const titleFade   = cl((frame - 155) / 30);

  const subtitleFade = cl((frame - 195) / 30);
  const badgeFade    = cl((frame - 225) / 30);
  const fadeOut      = 1 - cl((frame - 268) / 32);

  return (
    <AbsoluteFill style={{ background: '#0D1B2A', opacity: Math.min(bgFade, fadeOut) }}>

      {/* Subtle grid lines (documentary feel) */}
      <AbsoluteFill style={{ opacity: 0.04 }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 90} x2="1920" y2={i * 90}
              stroke="white" strokeWidth="1" />
          ))}
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 90} y1="0" x2={i * 90} y2="1080"
              stroke="white" strokeWidth="1" />
          ))}
        </svg>
      </AbsoluteFill>

      {/* ── Map + annotation layer ────────────────────────────── */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -58%)',
      }}>
        <SierraLeoneMap
          drawProgress={drawProg}
          circleProgress={circleProg}
          showCities={drawProg > 0.7}
          showLabels
          showDividers
          fillColor="#1E3A5F"
          strokeColor="#E8E4DC"
        />
      </div>

      {/* Callout lines from map to label */}
      <AbsoluteFill style={{ opacity: calloutProg }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Line from country outline to title zone */}
          <CalloutLine x1={960} y1={240} x2={960} y2={560} progress={calloutProg} />
          {/* Small dot at connection */}
          <circle cx="960" cy="243" r="5" fill="#C0392B" opacity={calloutProg} />
        </svg>
      </AbsoluteFill>

      {/* "SIERRA LEONE" label over map */}
      <div style={{
        position: 'absolute',
        top: '18%', left: '50%',
        transform: 'translateX(-50%)',
        opacity: labelFade,
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        fontSize: 12, letterSpacing: 8,
        color: '#E8E4DC', textTransform: 'uppercase',
        textAlign: 'center',
      }}>
        West Africa · Sierra Leone
      </div>

      {/* ── Thesis text ───────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: 140, left: '50%',
        transform: `translateX(-50%) translateY(${titleY}px)`,
        textAlign: 'center', width: 1000,
        opacity: titleFade,
      }}>
        <div style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 52, fontWeight: 700,
          color: '#E8E4DC', lineHeight: 1.25,
          marginBottom: 16,
        }}>
          Does digital infrastructure alone<br />
          drive transformation?
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 92, left: '50%',
        transform: 'translateX(-50%)',
        opacity: subtitleFade,
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        fontSize: 16, letterSpacing: 3,
        color: '#8AAABB', textTransform: 'uppercase',
        textAlign: 'center',
      }}>
        Group 2 argues: No.
      </div>

      {/* Group 2 badge */}
      <div style={{
        position: 'absolute', top: 52, right: 72,
        opacity: badgeFade,
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        fontSize: 12, letterSpacing: 5,
        color: '#8AAABB', textTransform: 'uppercase',
        borderBottom: '1px solid #3A5A7A',
        paddingBottom: 8,
      }}>
        SLPPNA YG Retreat · 2025
      </div>

      {/* Subtle corner marks */}
      {[[20,20],[1900,20],[20,1060],[1900,1060]].map(([cx,cy], i) => (
        <div key={i} style={{
          position: 'absolute',
          left: cx - 8, top: cy - 8,
          width: 16, height: 16,
          opacity: 0.25,
          border: '1px solid #E8E4DC',
          borderRadius: 1,
        }} />
      ))}
    </AbsoluteFill>
  );
};
