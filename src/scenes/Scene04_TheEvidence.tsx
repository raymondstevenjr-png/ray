import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import { PaperBackground } from '../components/PaperBackground';
import { SourceTag } from '../components/SourceTag';
import { C, F } from '../tokens';

// ── Scene 04: THE EVIDENCE ───────────────────────────────────────────────
// Duration: 540 frames (18 seconds)
// Rubric: Use of Evidence & Examples (15 pts) + Practical Relevance (15 pts)
//
// ⚠️  VERIFY BEFORE DEBATE — these statistics are placeholders.
//     Confirm current figures from these primary sources:
//     • 83% mobile coverage → GSMA Mobile Economy Sub-Saharan Africa (latest)
//     • 14% internet use   → ITU Digital Development Report (latest)
//     • 38% literacy rate  → UNESCO Institute for Statistics (latest)
//
// AUDIO CUE: soft tick per digit while counting (frames 30–180)
// AUDIO CUE: silence during the four-second hold (frames 240–360)
// AUDIO CUE: single piano note at frame 450 (38% appears)
// AUDIO CUE: single piano note at frame 490 (final line)

export const Scene04_TheEvidence: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── Counting stats (concurrent, frames 30–180) ─────────────────────
  // AUDIO CUE: tick sound per digit at frames 30–180
  const count83 = Math.round(
    interpolate(frame, [30, 180], [0, 83], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    })
  );
  const count14 = Math.round(
    interpolate(frame, [30, 180], [0, 14], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    })
  );

  // ── Question mark draws in (frames 185–215) ───────────────────────
  const qMarkProgress = interpolate(frame, [185, 215], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // SVG path length for "?" ≈ 160px
  const qMarkLength = 160;
  const qMarkDashOffset = qMarkLength * (1 - qMarkProgress);

  // ── "Coverage is not adoption." (frames 215–255) ───────────────────
  const captionOpacity = interpolate(frame, [215, 255], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── SILENCE HOLD: frames 255–375 (4 seconds) ──────────────────────
  // Nothing new appears. Caption remains visible.

  // ── "38%" appears (frames 375–480) ────────────────────────────────
  // AUDIO CUE: single piano note at frame 375
  const count38 = Math.round(
    interpolate(frame, [375, 460], [0, 38], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    })
  );
  const stat3Opacity = interpolate(frame, [375, 400], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── Final line (frames 470–510) ────────────────────────────────────
  // AUDIO CUE: single piano note at frame 470
  const finalLineOpacity = interpolate(frame, [470, 510], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalLineY = interpolate(frame, [470, 510], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── Source tags ────────────────────────────────────────────────────
  const sourcesOpacity = interpolate(frame, [160, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Show/hide phases
  const showDualStats  = frame < 375;
  const showSingleStat = frame >= 375;

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <PaperBackground />

      {/* ── Dual stats: 83% and 14% ─────────────────────────────────── */}
      {showDualStats && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Left stat: 83% */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              padding: '0 80px',
              borderRight: `2px solid ${C.warmMid}`,
            }}
          >
            <div
              style={{
                fontFamily: F.serif,
                fontSize: 180,
                fontWeight: 900,
                color: C.navyBlue,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
              }}
            >
              {count83}%
            </div>
            <div
              style={{
                fontFamily: F.sans,
                fontSize: 26,
                color: C.softBlack,
                textAlign: 'center',
                maxWidth: 380,
                lineHeight: 1.45,
                fontWeight: 500,
              }}
            >
              of Sierra Leoneans live under mobile coverage.
            </div>
            <div style={{ opacity: sourcesOpacity }}>
              <SourceTag source="GSMA Mobile Economy Report" position="bottom-left" />
            </div>
          </div>

          {/* Center question mark — draws in */}
          <div
            style={{
              width: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {qMarkProgress > 0 && (
              <svg width="70" height="120" viewBox="0 0 70 120">
                {/* Question mark path (hand-drawn style) */}
                <path
                  d="M 18 22 Q 18 8 35 8 Q 52 8 52 24 Q 52 36 35 44 L 35 68"
                  stroke={C.deepRed}
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={qMarkLength}
                  strokeDashoffset={qMarkDashOffset}
                />
                {/* Dot */}
                <circle
                  cx="35"
                  cy="85"
                  r="5"
                  fill={C.deepRed}
                  opacity={qMarkProgress > 0.85 ? 1 : 0}
                />
              </svg>
            )}
          </div>

          {/* Right stat: 14% */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              padding: '0 80px',
              borderLeft: `2px solid ${C.warmMid}`,
            }}
          >
            <div
              style={{
                fontFamily: F.serif,
                fontSize: 180,
                fontWeight: 900,
                color: C.deepRed,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
              }}
            >
              {count14}%
            </div>
            <div
              style={{
                fontFamily: F.sans,
                fontSize: 26,
                color: C.softBlack,
                textAlign: 'center',
                maxWidth: 380,
                lineHeight: 1.45,
                fontWeight: 500,
              }}
            >
              use the internet regularly.
            </div>
            <div style={{ opacity: sourcesOpacity }}>
              <SourceTag source="ITU Digital Development Report" position="bottom-right" />
            </div>
          </div>
        </div>
      )}

      {/* ── "Coverage is not adoption." ────────────────────────────── */}
      {/* SILENCE HOLD at frames 255–375 — visible but nothing moves */}
      {frame >= 215 && frame < 375 && (
        <div
          style={{
            position: 'absolute',
            bottom: 110,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: captionOpacity,
          }}
        >
          <div
            style={{
              fontFamily: F.serif,
              fontSize: 52,
              fontWeight: 700,
              color: C.softBlack,
              letterSpacing: '0.02em',
              borderBottom: `4px solid ${C.deepRed}`,
              paddingBottom: 8,
            }}
          >
            Coverage is not adoption.
          </div>
        </div>
      )}

      {/* ── Single stat: 38% literacy ──────────────────────────────── */}
      {showSingleStat && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            opacity: stat3Opacity,
          }}
        >
          <div
            style={{
              fontFamily: F.serif,
              fontSize: 220,
              fontWeight: 900,
              color: C.deepRed,
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
            }}
          >
            {count38}%
          </div>
          <div
            style={{
              fontFamily: F.sans,
              fontSize: 30,
              color: C.softBlack,
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            of adults can read and write.
          </div>
          <SourceTag source="UNESCO Institute for Statistics" position="bottom-right" />
        </div>
      )}

      {/* ── Final line ─────────────────────────────────────────────── */}
      {/* AUDIO CUE: single piano note at frame 470 */}
      {frame >= 470 && (
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: finalLineOpacity,
            transform: `translateY(${finalLineY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: F.serif,
              fontSize: 42,
              fontStyle: 'italic',
              color: C.softBlack,
              letterSpacing: '0.01em',
              textAlign: 'center',
              maxWidth: 900,
            }}
          >
            "A network means nothing to someone who cannot use it."
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
