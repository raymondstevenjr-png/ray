import React from 'react';
import { interpolate } from 'remotion';

const cl = (v: number) => Math.max(0, Math.min(1, v));

// ── Real Sierra Leone outline extracted from Natural Earth 50 m data ────────
// Projection: x = 40 + (13.38 − |lonW|) / 3.13 × 480
//             y = 525 − (latN  −  6.87) / 3.20 × 475
// Two rings: main body (116 pts) + southern coastal polygon (10 pts)
const OUTLINE_RINGS = [
  // Ring 0 — main country body (116 points, real Natural Earth geometry)
  'M 515,285.5 L 514.5,289.5 L 510,311 L 503.5,329.5 L 499,334 L 479,338.5 L 470.5,346.5 L 463.5,372.5 L 459,393 L 452.5,396.5 L 424,426 L 405,437 L 391.5,446.5 L 379.5,459 L 364,471 L 347,492 L 335.5,513 L 327,519.5 L 321,513.5 L 292.5,492.5 L 262.5,478.5 L 198.5,455 L 177,448.5 L 178,440 L 185.5,425 L 173,407 L 178,394 L 173,394 L 164.5,402 L 144.5,399.5 L 131.5,388 L 121,384.5 L 116.5,378.5 L 109.5,349 L 104.5,335.5 L 95.5,327.5 L 75.5,325.5 L 67,307.5 L 56.5,293.5 L 58.5,285 L 67,285.5 L 74.5,291.5 L 85.5,294 L 99,279 L 112,271 L 114.5,263.5 L 113,260 L 105,266 L 85,264.5 L 80,270 L 70.5,271.5 L 63.5,254 L 64,243.5 L 66.5,232 L 87.5,230 L 89,226.5 L 75,224 L 56.5,210.5 L 53.5,201.5 L 62,198.5 L 71,200 L 78,202 L 86.5,198.5 L 94,193.5 L 98.5,187 L 104.5,169.5 L 124,164 L 135.5,153.5 L 146.5,137 L 151.5,125.5 L 156,119.5 L 159.5,115 L 161,109 L 166,104 L 171.5,92 L 175,80.5 L 186,75.5 L 209,70.5 L 230,79 L 263.5,72 L 265.5,61.5 L 296,61 L 332.5,61 L 363,61 L 373.5,63.5 L 377.5,71.5 L 387.5,83.5 L 398,92 L 410.5,110.5 L 426,132.5 L 442,151.5 L 452.5,162 L 453.5,166 L 453,170 L 447.5,180 L 443,191 L 443.5,194.5 L 447,196.5 L 464,200 L 465,212 L 465.5,228.5 L 473.5,244 L 481.5,255 L 481,259.5 L 462,278.5 L 454.5,297.5 L 451,303 L 449,307.5 L 453,309.5 L 458,308.5 L 465.5,310 L 473,310.5 L 482.5,303.5 L 497.5,286 L 503.5,284 L 515,285.5 Z',
  // Ring 1 — southern coastal polygon (10 points)
  'M 171,441 L 168.5,445 L 159,435.5 L 106,421 L 120.5,413.5 L 157,411 L 168,415.5 L 173,419.5 L 175,426.5 L 171,441 Z',
];

// Total stroke path length estimate for dash animation
const TOTAL_PATH = 3200;

// Province boundaries (Natural Earth projection)
const PROVINCE_DIVIDERS = [
  // N–S spine (Western/Northern vs Eastern)  lon ≈ 11.5°W → x ≈ 328
  'M 328,62 C 328,200 325,362 322,516',
  // E–W mid (Northern vs Southern)  lat ≈ 8.5°N → y ≈ 283
  'M 58,283 C 175,278 340,280 480,283',
  // Western Area pocket
  'M 62,268 C 72,255 92,248 118,252 L 142,258',
];

// Major rivers
const RIVERS: { d: string; w: number }[] = [
  // Rokel / Seli River (flows NW toward Freetown estuary)
  { d: 'M 248,228 C 205,240 168,258 130,266 C 102,272 78,272 65,268', w: 1.8 },
  // Moa River (flows south to Liberia)
  { d: 'M 415,248 C 410,295 400,360 378,420 C 362,462 345,498 335,513', w: 1.4 },
  // Jong / Taia River (flows southwest)
  { d: 'M 328,282 C 295,315 268,368 248,418 C 238,452 255,488 278,496', w: 1.4 },
];

// Cities — positions computed from real lat/lon
// x = 40 + (13.38 − |lonW|) / 3.13 × 480   y = 525 − (latN − 6.87) / 3.20 × 475
const CITIES: { x: number; y: number; label: string; capital?: boolean; lx: number; ly: number }[] = [
  { x: 63,  y: 275, label: 'Freetown', capital: true, lx: 12, ly:  4 }, // 8.49°N 13.23°W
  { x: 291, y: 363, label: 'Bo',                      lx:  8, ly:  4 }, // 7.96°N 11.74°W
  { x: 376, y: 375, label: 'Kenema',                  lx:  8, ly:  4 }, // 7.88°N 11.19°W
  { x: 245, y: 227, label: 'Makeni',                  lx:  8, ly: -7 }, // 8.88°N 12.04°W
  { x: 410, y: 262, label: 'Koidu',                   lx:  8, ly:  4 }, // 8.64°N 10.97°W
];

const PROVINCES: { x: number; y: number; label: string }[] = [
  { x: 200, y: 158, label: 'Northern' },
  { x: 415, y: 208, label: 'Eastern'  },
  { x: 210, y: 408, label: 'Southern' },
  { x: 88,  y: 262, label: 'Western'  },
];

// Coverage dots spread across the country interior
const COVERAGE_DOTS: { x: number; y: number }[] = [
  { x: 120, y: 100 }, { x: 200, y: 80  }, { x: 290, y: 75  },
  { x: 375, y: 98  }, { x: 445, y: 165 }, { x: 495, y: 238 },
  { x: 480, y: 312 }, { x: 455, y: 392 }, { x: 385, y: 450 },
  { x: 308, y: 480 }, { x: 228, y: 460 }, { x: 152, y: 418 },
  { x: 102, y: 358 }, { x: 88,  y: 292 }, { x: 128, y: 224 },
  { x: 220, y: 176 }, { x: 318, y: 180 }, { x: 400, y: 205 },
];

export interface SierraLeoneMapProps {
  drawProgress?: number;
  showLabels?: boolean;
  showCities?: boolean;
  showCoverage?: boolean;
  zoom?: number;
  circleProgress?: number;
  fillColor?: string;
  strokeColor?: string;
  showDividers?: boolean;
  showRivers?: boolean;
}

export const SierraLeoneMap: React.FC<SierraLeoneMapProps> = ({
  drawProgress   = 1,
  showLabels     = false,
  showCities     = false,
  showCoverage   = false,
  zoom           = 0,
  circleProgress = 0,
  fillColor      = '#1E3A5F',
  strokeColor    = '#E8E4DC',
  showDividers   = false,
  showRivers     = false,
}) => {
  const dashOffset = interpolate(drawProgress, [0, 1], [TOTAL_PATH, 0]);

  // Zoom toward Freetown / Western Area
  const scale = interpolate(zoom, [0, 1], [1.0, 1.65]);
  const tx    = interpolate(zoom, [0, 1], [0, -30]);
  const ty    = interpolate(zoom, [0, 1], [0, -25]);

  const CIRCLE_LEN = 1780;
  const circleDash = interpolate(circleProgress, [0, 1], [CIRCLE_LEN, 0]);

  return (
    <svg
      width="560" height="540"
      viewBox="0 0 560 540"
      style={{ overflow: 'visible' }}
    >
      <g transform={`translate(${280 + tx}, ${270 + ty}) scale(${scale}) translate(-280,-270)`}>

        {/* Country fills — both rings */}
        {OUTLINE_RINGS.map((d, i) => (
          <path key={i} d={d} fill={fillColor} opacity="0.82" />
        ))}

        {/* Rivers */}
        {showRivers && RIVERS.map((r, i) => (
          <path key={i} d={r.d}
            fill="none" stroke="#3A8ABB" strokeWidth={r.w}
            strokeLinecap="round"
            opacity={0.38 * cl((drawProgress - 0.4) / 0.4)}
          />
        ))}

        {/* Province dividers */}
        {showDividers && PROVINCE_DIVIDERS.map((d, i) => (
          <path key={i} d={d}
            fill="none" stroke={strokeColor} strokeWidth="1"
            strokeDasharray="6,5" opacity="0.28"
          />
        ))}

        {/* Outline draw-on stroke (main ring only — the one with the peninsula) */}
        <path
          d={OUTLINE_RINGS[0]}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={TOTAL_PATH}
          strokeDashoffset={dashOffset}
        />
        {/* Secondary ring draws on after main ring */}
        <path
          d={OUTLINE_RINGS[1]}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={cl((drawProgress - 0.85) / 0.15)}
        />

        {/* Coverage signal dots */}
        {showCoverage && COVERAGE_DOTS.map((dot, i) => {
          const delay = i / COVERAGE_DOTS.length;
          const p     = cl((drawProgress - delay * 0.5) / 0.5);
          return (
            <g key={i} opacity={p}>
              <circle cx={dot.x} cy={dot.y} r="13" fill="#3A9AD9" opacity="0.13" />
              <circle cx={dot.x} cy={dot.y} r="5"  fill="#3A9AD9" opacity="0.55" />
            </g>
          );
        })}

        {/* City markers */}
        {showCities && CITIES.map((c, i) => (
          <g key={i} opacity={cl((drawProgress - 0.6) / 0.4)}>
            {c.capital ? (
              <>
                <circle cx={c.x} cy={c.y} r="11" fill="#F4D03F" opacity="0.22" />
                <circle cx={c.x} cy={c.y} r="5.5" fill="#F4D03F" />
              </>
            ) : (
              <circle cx={c.x} cy={c.y} r="4" fill="#F4D03F" opacity="0.78" />
            )}
          </g>
        ))}

        {/* City labels */}
        {showCities && CITIES.map((c, i) => (
          <text
            key={i}
            x={c.x + c.lx} y={c.y + c.ly}
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
            opacity={0.38 * cl((drawProgress - 0.5) / 0.4)}
            style={{ textTransform: 'uppercase' } as React.CSSProperties}
          >
            {p.label.toUpperCase()}
          </text>
        ))}

        {/* Sketch annotation circle around whole country */}
        {circleProgress > 0 && (
          <ellipse
            cx="290" cy="290" rx="268" ry="262"
            fill="none"
            stroke="#C0392B"
            strokeWidth="3"
            strokeDasharray={CIRCLE_LEN}
            strokeDashoffset={circleDash}
            strokeLinecap="round"
            transform="rotate(-5, 290, 290)"
            opacity="0.82"
          />
        )}
      </g>
    </svg>
  );
};
