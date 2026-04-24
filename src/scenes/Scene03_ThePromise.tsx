import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { PaperBackground } from '../components/PaperBackground';
import { C, F } from '../tokens';

// ── Scene 03: THE PROMISE ────────────────────────────────────────────────
// Duration: 420 frames (14 seconds)
// Rubric: Strength of Core Argument (20 pts)
// Strategy: Acknowledge infrastructure progress fairly before Scene 4
//           shows the gap. Judges reward intellectual honesty.
//
// AUDIO CUE: soft chime at each icon spring (frames 100, 140, 180, 220)
// AUDIO CUE: warm low pad throughout frames 0–420

// ── Infrastructure icons (inline SVG) ────────────────────────────────────

const FiberCableIcon: React.FC = () => (
  <svg width="72" height="72" viewBox="0 0 72 72">
    <rect x="6" y="32" width="60" height="8" rx="4" fill={C.navyBlue} />
    <circle cx="20" cy="36" r="4" fill={C.deepRed} />
    <circle cx="36" cy="36" r="4" fill={C.deepRed} opacity="0.6" />
    <circle cx="52" cy="36" r="4" fill={C.deepRed} opacity="0.35" />
    <rect x="2" y="28" width="12" height="16" rx="3" fill={C.navyBlue} opacity="0.7" />
    <rect x="58" y="28" width="12" height="16" rx="3" fill={C.navyBlue} opacity="0.7" />
    <path d="M 32 22 Q 36 14 40 22 Q 44 30 48 22" stroke={C.navyBlue} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const CellTowerIcon: React.FC = () => (
  <svg width="72" height="72" viewBox="0 0 72 72">
    {/* Tower mast */}
    <line x1="36" y1="60" x2="36" y2="16" stroke={C.navyBlue} strokeWidth="3" strokeLinecap="round" />
    {/* Cross beams */}
    <line x1="20" y1="55" x2="52" y2="55" stroke={C.navyBlue} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="24" y1="46" x2="48" y2="46" stroke={C.navyBlue} strokeWidth="2" strokeLinecap="round" />
    {/* Diagonal supports */}
    <line x1="20" y1="55" x2="36" y2="16" stroke={C.navyBlue} strokeWidth="1.5" opacity="0.5" />
    <line x1="52" y1="55" x2="36" y2="16" stroke={C.navyBlue} strokeWidth="1.5" opacity="0.5" />
    {/* Signal arcs */}
    <path d="M 24 10 Q 36 4 48 10" stroke={C.deepRed} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M 18 16 Q 36 6 54 16" stroke={C.deepRed} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" />
  </svg>
);

const DataCenterIcon: React.FC = () => (
  <svg width="72" height="72" viewBox="0 0 72 72">
    {/* Server racks */}
    <rect x="10" y="12" width="52" height="12" rx="3" fill={C.navyBlue} />
    <rect x="10" y="28" width="52" height="12" rx="3" fill={C.navyBlue} opacity="0.8" />
    <rect x="10" y="44" width="52" height="12" rx="3" fill={C.navyBlue} opacity="0.6" />
    {/* Status lights */}
    <circle cx="54" cy="18" r="3" fill={C.deepRed} />
    <circle cx="46" cy="18" r="3" fill="#2ECC71" />
    <circle cx="54" cy="34" r="3" fill="#2ECC71" />
    <circle cx="46" cy="34" r="3" fill={C.deepRed} opacity="0.6" />
    <circle cx="54" cy="50" r="3" fill="#2ECC71" />
    {/* Drive slots */}
    <rect x="14" y="15" width="24" height="6" rx="1" fill="rgba(244,239,230,0.25)" />
    <rect x="14" y="31" width="24" height="6" rx="1" fill="rgba(244,239,230,0.25)" />
    <rect x="14" y="47" width="24" height="6" rx="1" fill="rgba(244,239,230,0.25)" />
  </svg>
);

const EnergyGridIcon: React.FC = () => (
  <svg width="72" height="72" viewBox="0 0 72 72">
    {/* Pylon structure */}
    <line x1="36" y1="8" x2="36" y2="64" stroke={C.navyBlue} strokeWidth="3" strokeLinecap="round" />
    <line x1="16" y1="28" x2="56" y2="28" stroke={C.navyBlue} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="22" y1="38" x2="50" y2="38" stroke={C.navyBlue} strokeWidth="2" strokeLinecap="round" />
    {/* Diagonal wires */}
    <line x1="16" y1="28" x2="22" y2="38" stroke={C.navyBlue} strokeWidth="1.5" />
    <line x1="56" y1="28" x2="50" y2="38" stroke={C.navyBlue} strokeWidth="1.5" />
    {/* Lightning bolt — energy */}
    <path d="M 32 14 L 28 30 L 36 30 L 32 46" stroke={C.deepRed} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Ground */}
    <line x1="26" y1="64" x2="46" y2="64" stroke={C.navyBlue} strokeWidth="2" strokeLinecap="round" />
    <line x1="30" y1="58" x2="42" y2="58" stroke={C.navyBlue} strokeWidth="1.5" />
  </svg>
);

const ICONS = [
  { Icon: FiberCableIcon, label: 'Fiber broadband', frame: 100 },
  { Icon: CellTowerIcon, label: 'Mobile coverage', frame: 140 },
  { Icon: DataCenterIcon, label: 'Data centers', frame: 180 },
  { Icon: EnergyGridIcon, label: 'Energy grid', frame: 220 },
];

const TEXT_LINES = [
  { text: 'Sierra Leone is building.', frame: 270 },
  { text: 'Broadband is expanding.', frame: 305 },
  { text: 'Signal is reaching further than ever before.', frame: 340 },
];

export const Scene03_ThePromise: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Headline
  const headlineOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [20, 50], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <PaperBackground />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          padding: '0 120px',
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontFamily: F.serif,
            fontSize: 68,
            fontWeight: 700,
            color: C.softBlack,
            textAlign: 'center',
            lineHeight: 1.15,
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            marginBottom: 70,
          }}
        >
          The promise of infrastructure.
        </div>

        {/* ── Icon row ───────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            gap: 80,
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginBottom: 72,
          }}
        >
          {ICONS.map(({ Icon, label, frame: iconFrame }) => {
            const progress = spring({
              frame: frame - iconFrame,
              fps,
              config: { damping: 11, stiffness: 260, mass: 0.65 },
              durationInFrames: 18,
            });
            const scale = interpolate(progress, [0, 1], [0, 1]);
            const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.7, 1]);
            // AUDIO CUE: soft chime at frame {iconFrame}

            return (
              <div
                key={label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                  transform: `scale(${scale})`,
                  opacity,
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 120,
                    background: C.paperWhite,
                    border: `2px solid ${C.warmMid}`,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                  }}
                >
                  <Icon />
                </div>
                <span
                  style={{
                    fontFamily: F.sans,
                    fontSize: 18,
                    color: C.navyBlue,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textAlign: 'center',
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Text lines ─────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          {TEXT_LINES.map(({ text, frame: lineFrame }) => {
            const op = interpolate(frame, [lineFrame, lineFrame + 24], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const ty = interpolate(frame, [lineFrame, lineFrame + 24], [12, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={text}
                style={{
                  fontFamily: F.serif,
                  fontSize: 36,
                  fontStyle: 'italic',
                  color: C.navyBlue,
                  opacity: op,
                  transform: `translateY(${ty}px)`,
                  textAlign: 'center',
                }}
              >
                {text}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
