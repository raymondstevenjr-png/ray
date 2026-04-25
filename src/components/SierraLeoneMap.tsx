import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

const cl = (v: number) => Math.max(0, Math.min(1, v));

// ── Simplified Sierra Leone outline (560×540 viewBox) ───────────────────────
const OUTLINE_PATH =
  'M 100,12 L 268,5 L 430,52 L 522,158 L 514,290 L 476,402 L 418,490 L 304,528 L 172,514 L 76,448 L 44,382 L 36,330 L 48,268 L 56,215 L 70,155 L 86,85 Z';

// Freetown peninsula appendage
const PENINSULA_PATH =
  'M 44,338 C 28,330 8,342 2,360 C -2,378 10,395 26,398 C 38,400 46,390 46,374 Z';

// Internal province division lines (simplified)
const PROVINCE_DIVIDERS = [
  'M 268,5 C 272,175 272,360 262,528',   // rough N-S spine
  'M 44,295 C 180,290 360,286 514,290',  // rough E-W mid
];

// Key cities
const CITIES: { x: number; y: number; label: string; capital?: boolean }[] = [
  { x: 30,  y: 365, label: 'Freetown', capital: true },
  { x: 248, y: 390, label: 'Bo' },
  { x: 378, y: 335, label: 'Kenema' },
  { x: 215, y: 168, label: 'Makeni' },
  { x: 408, y: 210, label: 'Koidu' },
];

// Province label positions
const PROVINCES: { x: number; y: number; label: string }[] = [
  { x: 160, y: 140, label: 'Northern' },
  { x: 370, y: 155, label: 'Eastern' },
  { x: 165, y: 415, label: 'Southern' },
  { x: 55,  y: 300, label: 'Western' },
];

// Coverage dot positions (representative sampling)
const COVERAGE_DOTS: { x: number; y: number }[] = [
  { x: 110, y: 100 }, { x: 200, y: 80 },  { x: 300, y: 70 },
  { x: 400, y: 110 }, { x: 460, y: 190 }, { x: 450, y: 270 },
  { x: 380, y: 360 }, { x: 280, y: 420 }, { x: 180, y: 440 },
  { x: 90,  y: 390 }, { x: 70,  y: 310 }, { x: 120, y: 240 },
  { x: 220, y: 200 }, { x: 320, y: 210 }, { x: 340, y: 140 },
  { x: 180, y: 310 }, { x: 260, y: 290 }, { x: 410, y: 300 },
];

export interface SierraLeoneMapProps {
  /** 0–1: how far the outline has drawn on */
  drawProgress?: number;
  /** show province labels */
  showLabels?: boolean;
  /** show city dots */
  showCities?: boolean;
  /** show 'signal / coverage' dots */
  showCoverage?: boolean;
  /** 0 = full-country, 1 = zoomed in toward Freetown/Western Area */
  zoom?: number;
  /** 0–1 opacity for a sketch circle around the whole country */
  circleProgress?: number;
  /** tint colour for the map fill */
  fillColor?: string;
  strokeColor?: string;
  /** draw province division lines */
  showDividers?: boolean;
}

export const SierraLeoneMap: React.FC<SierraLeoneMapProps> = ({
  drawProgress = 1,
  showLabels = false,
  showCities = false,
  showCoverage = false,
  zoom = 0,
  circleProgress = 0,
  fillColor = '#1E3A5F',
  strokeColor = '#E8E4DC',
  showDividers = false,
}) => {
  const TOTAL_PATH = 1750; // estimated path length px
  const dashOffset = interpolate(drawProgress, [0, 1], [TOTAL_PATH, 0]);

  // Zoom transform: translate toward Freetown (30, 365)
  const scale = interpolate(zoom, [0, 1], [1, 1.7]);
  const tx    = interpolate(zoom, [0, 1], [0, -40]);
  const ty    = interpolate(zoom, [0, 1], [0, -100]);

  // Sketch circle around whole country
  const CIRCLE_LEN = 1320;
  const circleDash = interpolate(circleProgress, [0, 1], [CIRCLE_LEN, 0]);

  return (
    <svg
      width="560" height="540"
      viewBox="0 0 560 540"
      style={{ overflow: 'visible' }}
    >
      <g transform={`translate(${280 + tx}, ${270 + ty}) scale(${scale}) translate(-280,-270)`}>

        {/* Country fill (drawn before stroke) */}
        <path d={OUTLINE_PATH} fill={fillColor} opacity="0.85" />
        <path d={PENINSULA_PATH} fill={fillColor} opacity="0.85" />

        {/* Province dividers */}
        {showDividers && PROVINCE_DIVIDERS.map((d, i) => (
          <path key={i} d={d}
            fill="none" stroke={strokeColor} strokeWidth="1"
            strokeDasharray="6,5" opacity="0.3"
          />
        ))}

        {/* Main outline draw-on */}
        <path
          d={OUTLINE_PATH}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={TOTAL_PATH}
          strokeDashoffset={dashOffset}
        />
        <path
          d={PENINSULA_PATH}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          opacity={drawProgress}
        />

        {/* Coverage dots */}
        {showCoverage && COVERAGE_DOTS.map((dot, i) => {
          const delay = i / COVERAGE_DOTS.length;
          const localProg = cl((drawProgress - delay * 0.5) / 0.5);
          return (
            <g key={i} opacity={localProg}>
              <circle cx={dot.x} cy={dot.y} r="12" fill="#3A9AD9" opacity="0.15" />
              <circle cx={dot.x} cy={dot.y} r="5" fill="#3A9AD9" opacity="0.6" />
            </g>
          );
        })}

        {/* City dots */}
        {showCities && CITIES.map((c, i) => (
          <g key={i} opacity={cl((drawProgress - 0.6) / 0.4)}>
            {c.capital ? (
              <>
                <circle cx={c.x} cy={c.y} r="10" fill="#F4D03F" opacity="0.25" />
                <circle cx={c.x} cy={c.y} r="5"  fill="#F4D03F" />
              </>
            ) : (
              <circle cx={c.x} cy={c.y} r="4" fill="#F4D03F" opacity="0.8" />
            )}
          </g>
        ))}

        {/* City labels */}
        {showCities && CITIES.map((c, i) => (
          <text
            key={i}
            x={c.x + (c.capital ? 14 : 10)}
            y={c.y + 4}
            fill={c.capital ? '#F4D03F' : '#E8E4DC'}
            fontSize={c.capital ? 13 : 11}
            fontFamily="Inter, sans-serif"
            fontWeight={c.capital ? '700' : '400'}
            opacity={cl((drawProgress - 0.7) / 0.3)}
          >
            {c.label}
          </text>
        ))}

        {/* Province labels */}
        {showLabels && PROVINCES.map((p, i) => (
          <text
            key={i}
            x={p.x} y={p.y}
            textAnchor="middle"
            fill={strokeColor}
            fontSize="11"
            fontFamily="Inter, sans-serif"
            letterSpacing="2"
            textDecoration="none"
            opacity={0.4 * cl((drawProgress - 0.5) / 0.4)}
            style={{ textTransform: 'uppercase' } as React.CSSProperties}
          >
            {p.label.toUpperCase()}
          </text>
        ))}

        {/* Sketch circle (hand-drawn feel via dashed stroke) */}
        {circleProgress > 0 && (
          <ellipse
            cx="268" cy="272" rx="300" ry="290"
            fill="none"
            stroke="#C0392B"
            strokeWidth="3"
            strokeDasharray={CIRCLE_LEN}
            strokeDashoffset={circleDash}
            strokeLinecap="round"
            transform="rotate(-8, 268, 272)"
            opacity="0.85"
          />
        )}
      </g>
    </svg>
  );
};
