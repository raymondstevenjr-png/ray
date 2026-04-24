import { useCurrentFrame, interpolate } from "remotion";

interface FilmBurnProps {
  // Frame at which to flash the burn (cut transition flash)
  triggerFrame: number;
  durationFrames?: number;
}

// Flashes a warm orange/white film burn at cut transitions.
export const FilmBurn: React.FC<FilmBurnProps> = ({
  triggerFrame,
  durationFrames = 6,
}) => {
  const frame = useCurrentFrame();
  const rel = frame - triggerFrame;

  if (rel < 0 || rel > durationFrames) return null;

  const opacity = interpolate(rel, [0, 2, durationFrames], [0, 0.85, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 999,
        background:
          "radial-gradient(ellipse at 30% 40%, rgba(255,220,120,0.9) 0%, rgba(220,120,30,0.6) 40%, transparent 80%)",
        opacity,
        mixBlendMode: "screen",
      }}
    />
  );
};
