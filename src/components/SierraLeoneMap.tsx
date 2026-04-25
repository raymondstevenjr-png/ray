import React from 'react';
import { interpolate } from 'remotion';

const cl = (v: number) => Math.max(0, Math.min(1, v));

// ── Real Sierra Leone outline (560×540 viewBox) ─────────────────────────────
// Coordinate mapping from actual lat/lon:
//   x = 40 + (13.3 − lonW) / 3.0 × 480
//   y = 525 − (latN  − 6.9) / 3.1 × 495
//
// Key points: NW(74,53) N-peak(206,30) NE(517,189) SE(408,517)
// Freetown Peninsula rendered as a cubic-bezier notch on the west coast.
const OUTLINE_PATH =
  'M 74,53 ' +
  'L 133,48 L 206,30 L 291,42 L 363,74 ' +
  'L 451,141 L 517,189 ' +
  'L 523,253 L 496,349 L 469,429 ' +
  'L 408,517 L 336,515 L 278,496 L 224,464 ' +
  'L 168,432 L 123,373 L 96,317 ' +
  'C 80,307 58,300 44,286 C 39,270 42,253 56,246 ' +
  'L 70,242 L 70,208 L 70,168 L 70,128 L 72,88 L 74,53 Z';

// Province boundary lines
const PROVINCE_DIVIDERS = [
  'M 291,42  C 295,165 303,330 298,518',         // N–S spine (west/east provinces)
  'M 70,264  C 175,258 335,262 475,270',          // E–W mid (north/south provinces)
  'M 56,246  C 64,234 84,228 108,232 L 132,238',  // Western Area pocket
];

// Major rivers (Rokel, Moa, Jong) — faint decorative lines
const RIVERS: { d: string; width: number }[] = [
  { d: 'M 272,250 C 232,252 182,252 135,250 C 100,249 72,247 58,246', width: 1.8 },
  { d: 'M 415,242 C 410,290 402,356 382,416 C 368,462 350,500 336,515', width: 1.4 },
  { d: 'M 305,263 C 282,308 260,365 248,418 C 240,455 258,488 278,496', width: 1.4 },
];

const CITIES: {
  x: number; y: number; label: string;
  capital?: boolean; lx?: number; ly?: number;
}[] = [
  { x: 52,  y: 250, label: 'Freetown', capital: true, lx: 14, ly:  4 },
  { x: 289, y: 355, label: 'Bo',                      lx:  9, ly:  4 },
  { x: 377, y: 368, label: 'Kenema',                  lx:  9, ly:  4 },
  { x: 241, y: 208, label: 'Makeni',                  lx:  9, ly: -7 },
  { x: 412, y: 247, label: 'Koidu',                   lx:  9, ly:  4 },
];

const PROVINCES: { x: number; y: number; label: string }[] = [
  { x: 178, y: 148, label: 'Northern' },
  { x: 408, y: 192, label: 'Eastern'  },
  { x: 192, y: 385, label: 'Southern' },
  { x: 86,  y: 263, label: 'Western'  },
];

const COVERAGE_DOTS: { x: number; y: number }[] = [
  { x: 110, y: 100 }, { x: 195, y: 75  }, { x: 285, y: 60  },
  { x: 375, y: 90  }, { x: 445, y: 160 }, { x: 500, y: 228 },
  { x: 488, y: 308 }, { x: 460, y: 390 }, { x: 388, y: 448 },
  { x: 310, y: 478 }, { x: 230, y: 458 }, { x: 152, y: 415 },
  { x: 100, y: 358 }, { x: 83,  y: 290 }, { x: 122, y: 220 },
  { x: 216, y: 172 }, { x: 314, y: 175 }, { x: 398, y: 200 },
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
  drawProgress = 1,
  showLabels   = false,
  showCities   = false,
  showCoverage = false,
  zoom         = 0,
  circleProgress = 0,
  fillColor    = '#1E3A5F',
  strokeColor  = '#E8E4DC',
  showDividers = false,
  showRivers   = false,
}) => {
  const TOTAL_PATH = 2800;
  const dashOffset = interpolate(drawProgress, [0, 1], [TOTAL_PATH, 0]);

  // Zoom toward the Freetown / Western Area region
  const scale = interpolate(zoom, [0, 1], [1.0, 1.65]);
  const tx    = interpolate(zoom, [0, 1], [0, -30]);
  const ty    = interpolate(zoom, [0, 1], [0, -25]);

  const CIRCLE_LEN = 1760;
  const circleDash = interpolate(circleProgress, [0, 1], [CIRCLE_LEN, 0]);

  return (
    <svg
      width="560" height="540"
      viewBox="0 0 560 540"
      style={{ overflow: 'visible' }}
    >
      <g transform={`translate(${280 + tx}, ${270 + ty}) scale(${scale}) translate(-280,-270)`}>

        {/* Country fill */}
        <path d={OUTLINE_PATH} fill={fillColor} opacity="0.82" />

        {/* Rivers */}
        {showRivers && RIVERS.map((r, i) => (
          <path key={i} d={r.d}
            fill="none" stroke="#3A8ABB" strokeWidth={r.width}
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

        {/* Outline draw-on animation */}
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

        {/* Mobile coverage signal dots */}
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
            x={c.x + (c.lx ?? 10)} y={c.y + (c.ly ?? 4)}
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
            cx="295" cy="280" rx="272" ry="268"
            fill="none"
            stroke="#C0392B"
            strokeWidth="3"
            strokeDasharray={CIRCLE_LEN}
            strokeDashoffset={circleDash}
            strokeLinecap="round"
            transform="rotate(-6, 295, 280)"
            opacity="0.82"
          />
        )}
      </g>
    </svg>
  );
};
