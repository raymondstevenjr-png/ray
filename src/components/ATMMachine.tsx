import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export type ATMState = 'idle' | 'warning' | 'processing' | 'success';

interface ATMMachineProps {
  state: ATMState;
  scale?: number;
}

export const ATMMachine: React.FC<ATMMachineProps> = ({ state, scale = 1 }) => {
  const frame = useCurrentFrame();

  const screenColor =
    state === 'idle'       ? '#1B3A57' :
    state === 'warning'    ? '#8B1A1A' :
    state === 'processing' ? '#1B4A2A' :
                             '#1B5A30';

  const screenPulse = state === 'warning' ? 0.85 + 0.15 * Math.sin(frame * 0.2) : 1;

  const progressWidth = state === 'processing'
    ? interpolate(frame, [0, 60], [0, 130], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : state === 'success' ? 130 : 0;

  const cashHeight = state === 'success'
    ? interpolate(frame, [0, 40], [0, 36], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  return (
    <g transform={`scale(${scale})`}>
      {/* Drop shadow */}
      <ellipse cx="100" cy="322" rx="92" ry="14" fill="#000" opacity="0.18" />

      {/* Outer body */}
      <rect x="10" y="8" width="180" height="308" rx="14" fill="#7A8D9E" />
      <rect x="14" y="12" width="172" height="300" rx="12" fill="#A8BAC8" />

      {/* Top panel inset */}
      <rect x="20" y="18" width="160" height="190" rx="8" fill="#98AABB" />

      {/* Screen bezel */}
      <rect x="28" y="26" width="144" height="108" rx="7" fill="#111" />
      {/* Screen */}
      <rect x="31" y="29" width="138" height="102" rx="5" fill={screenColor}
        opacity={screenPulse} />

      {/* ── Screen content ── */}
      {state === 'idle' && (
        <>
          <text x="100" y="58" textAnchor="middle" fill="white" fontSize="11"
            fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="2">WELCOME</text>
          <text x="100" y="74" textAnchor="middle" fill="#9DB8CC" fontSize="8"
            fontFamily="Inter, sans-serif">Insert your card to begin</text>
          <rect x="68" y="82" width="64" height="13" rx="6" fill="#2196F3" opacity="0.9" />
          <text x="100" y="92" textAnchor="middle" fill="white" fontSize="7"
            fontFamily="Inter, sans-serif" fontWeight="600">PROCEED</text>
          <text x="100" y="118" textAnchor="middle" fill="#4A7A9A" fontSize="7"
            fontFamily="Inter, sans-serif">BANK OF SIERRA LEONE</text>
        </>
      )}

      {state === 'warning' && (
        <>
          <polygon points="100,42 82,74 118,74" fill="#FF8C00" />
          <rect x="97" y="55" width="6" height="12" rx="2" fill="white" />
          <circle cx="100" cy="71" r="3" fill="white" />
          <text x="100" y="92" textAnchor="middle" fill="#FF9999" fontSize="8"
            fontFamily="Inter, sans-serif" fontWeight="700">Is this safe?</text>
          <text x="100" y="105" textAnchor="middle" fill="#CC6666" fontSize="7"
            fontFamily="Inter, sans-serif">I don't know how...</text>
          <text x="100" y="118" textAnchor="middle" fill="#AA4444" fontSize="7"
            fontFamily="Inter, sans-serif">What if it's a scam?</text>
        </>
      )}

      {state === 'processing' && (
        <>
          <text x="100" y="66" textAnchor="middle" fill="#7DFFB3" fontSize="9"
            fontFamily="Inter, sans-serif" fontWeight="600">Processing...</text>
          <rect x="35" y="76" width="130" height="10" rx="5" fill="#0A2A18" />
          <rect x="35" y="76" width={progressWidth} height="10" rx="5" fill="#4CAF50" />
          <text x="100" y="104" textAnchor="middle" fill="#6A9A7A" fontSize="7"
            fontFamily="Inter, sans-serif">Please wait</text>
          <text x="100" y="118" textAnchor="middle" fill="#4A7A5A" fontSize="7"
            fontFamily="Inter, sans-serif">Verifying credentials...</text>
        </>
      )}

      {state === 'success' && (
        <>
          <circle cx="100" cy="66" r="24" fill="#4CAF50" opacity="0.2" />
          <circle cx="100" cy="66" r="18" fill="#4CAF50" opacity="0.15" />
          <path d="M88,66 L97,75 L114,54" stroke="#4CAF50" strokeWidth="4.5"
            fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="100" y="100" textAnchor="middle" fill="white" fontSize="8"
            fontFamily="Inter, sans-serif" fontWeight="700">TRANSACTION COMPLETE</text>
          <text x="100" y="113" textAnchor="middle" fill="#7DFFB3" fontSize="9"
            fontFamily="Inter, sans-serif" fontWeight="600">Le 500,000</text>
          <text x="100" y="124" textAnchor="middle" fill="#5A9A7A" fontSize="7"
            fontFamily="Inter, sans-serif">Thank you, Aminata</text>
        </>
      )}

      {/* Keypad area */}
      <rect x="28" y="144" width="144" height="94" rx="6" fill="#8A9DAE" />
      {[0, 1, 2].map(row =>
        [0, 1, 2].map(col => (
          <rect key={`${row}-${col}`}
            x={34 + col * 47} y={150 + row * 28}
            width="39" height="21" rx="4" fill="#7A8D9E" />
        ))
      )}
      <rect x="34" y="234" width="39" height="21" rx="4" fill="#4A6A7A" />
      <rect x="81" y="234" width="39" height="21" rx="4" fill="#7A8D9E" />
      <rect x="128" y="234" width="39" height="21" rx="4" fill="#4A6A7A" />

      {/* Card slot */}
      <rect x="28" y="262" width="144" height="13" rx="4" fill="#7A8D9E" />
      <rect x="32" y="265" width="136" height="7" rx="3" fill="#5A6D7E" />

      {/* Cash dispenser */}
      <rect x="28" y="281" width="144" height="20" rx="5" fill="#7A8D9E" />
      <rect x="32" y="284" width="136" height="14" rx="3" fill="#5A6D7E" />

      {/* Cash note */}
      {cashHeight > 0 && (
        <rect x="50" y={290 - cashHeight} width="100" height={cashHeight} rx="3"
          fill="#85C17E" opacity="0.95" />
      )}

      {/* BSL logo disc */}
      <circle cx="100" cy="308" r="15" fill="#1B3A57" />
      <text x="100" y="313" textAnchor="middle" fill="white" fontSize="8"
        fontFamily="Inter, sans-serif" fontWeight="700">BSL</text>

      {/* Status indicator */}
      <circle cx="170" cy="308" r="9"
        fill={state === 'success' ? '#4CAF50' : state === 'warning' ? '#FF6B00' : '#5A7A9A'} />
      <circle cx="170" cy="308" r="6"
        fill={state === 'success' ? '#7DFFB3' : state === 'warning' ? '#FFBB77' : '#8AACBB'} />
    </g>
  );
};
