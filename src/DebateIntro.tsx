import React from "react";
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";

import { Beat1Map } from "./components/Beat1Map";
import { Beat2TitleCard } from "./components/Beat2TitleCard";
import { Beat3Motion } from "./components/Beat3Motion";
import { Beat4Split } from "./components/Beat4Split";
import { Beat5Polaroids } from "./components/Beat5Polaroids";
import { Beat6EndCard } from "./components/Beat6EndCard";
import { FilmBurn } from "./components/FilmBurn";

// ─── Timing map (all values in frames at 30 fps) ─────────────────────────
//
//  Beat 1 — Map zoom:       0   → 180   (0–6 s)
//  Beat 2 — Title card:     180 → 450   (6–15 s)
//  Beat 3 — Motion text:    450 → 840   (15–28 s)
//  Beat 4 — Split screen:   840 → 1140  (28–38 s)
//  Beat 5 — Polaroids:      1140→ 1500  (38–50 s)
//  Beat 6 — End card:       1500→ 1800  (50–60 s)
//
// Film burns appear at each cut point.

const BEAT_STARTS = {
  b1: 0,
  b2: 180,
  b3: 450,
  b4: 840,
  b5: 1140,
  b6: 1500,
};

const TOTAL_FRAMES = 1800; // 60 s × 30 fps

export const DebateIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Active beat detection
  const activeBeat =
    frame < BEAT_STARTS.b2
      ? 1
      : frame < BEAT_STARTS.b3
      ? 2
      : frame < BEAT_STARTS.b4
      ? 3
      : frame < BEAT_STARTS.b5
      ? 4
      : frame < BEAT_STARTS.b6
      ? 5
      : 6;

  // Local frame for each beat (time relative to beat start)
  const localFrame = (beat: keyof typeof BEAT_STARTS) =>
    frame - BEAT_STARTS[beat];

  return (
    <AbsoluteFill style={{ background: "#000", width, height }}>
      {/* ── Beat 1: Map ────────────────────────────────────────────────── */}
      {activeBeat === 1 && <Beat1Map />}

      {/* ── Beat 2: Title Card ─────────────────────────────────────────── */}
      {activeBeat === 2 && (
        <Beat2TitleCard localFrame={localFrame("b2")} />
      )}

      {/* ── Beat 3: Motion Text ────────────────────────────────────────── */}
      {activeBeat === 3 && (
        <Beat3Motion localFrame={localFrame("b3")} />
      )}

      {/* ── Beat 4: Split Screen ───────────────────────────────────────── */}
      {activeBeat === 4 && (
        <Beat4Split localFrame={localFrame("b4")} />
      )}

      {/* ── Beat 5: Polaroids ──────────────────────────────────────────── */}
      {activeBeat === 5 && (
        <Beat5Polaroids localFrame={localFrame("b5")} />
      )}

      {/* ── Beat 6: End Card ───────────────────────────────────────────── */}
      {activeBeat === 6 && (
        <Beat6EndCard localFrame={localFrame("b6")} />
      )}

      {/* ── Film burns at every cut ─────────────────────────────────────── */}
      {/* AUDIO CUE [frame 180 / 6s]:   whoosh + cut */}
      <FilmBurn triggerFrame={BEAT_STARTS.b2} durationFrames={7} />
      {/* AUDIO CUE [frame 450 / 15s]:  whoosh + cut */}
      <FilmBurn triggerFrame={BEAT_STARTS.b3} durationFrames={7} />
      {/* AUDIO CUE [frame 840 / 28s]:  hard cut thud */}
      <FilmBurn triggerFrame={BEAT_STARTS.b4} durationFrames={5} />
      {/* AUDIO CUE [frame 1140 / 38s]: hard cut thud */}
      <FilmBurn triggerFrame={BEAT_STARTS.b5} durationFrames={5} />
      {/* AUDIO CUE [frame 1500 / 50s]: soft whoosh into end card */}
      <FilmBurn triggerFrame={BEAT_STARTS.b6} durationFrames={9} />
    </AbsoluteFill>
  );
};

export { TOTAL_FRAMES };
