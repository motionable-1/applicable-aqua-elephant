import React, { useId } from "react";
import { useCurrentFrame } from "remotion";

export type NoiseType = "grain" | "static" | "subtle";

export interface NoiseProps {
  /** Noise intensity 0-1 */
  intensity?: number;
  /** Animation speed (0 = static noise) */
  speed?: number;
  /** Noise style preset */
  type?: NoiseType;
  /** Overall opacity 0-1 */
  opacity?: number;
  /** CSS blend mode */
  blend?: React.CSSProperties["mixBlendMode"];
  className?: string;
  style?: React.CSSProperties;
}

const NOISE_CONFIG: Record<NoiseType, { baseFrequency: number; octaves: number }> = {
  grain: { baseFrequency: 0.65, octaves: 4 },
  static: { baseFrequency: 0.8, octaves: 2 },
  subtle: { baseFrequency: 0.5, octaves: 6 },
};

/**
 * Film grain / noise texture overlay.
 * Cinematic standard for adding texture and analog feel.
 *
 * @example
 * <Noise type="grain" intensity={0.4} speed={1} />
 */
export const Noise: React.FC<NoiseProps> = ({
  intensity = 0.5,
  speed = 1,
  type = "grain",
  opacity = 1,
  blend = "overlay",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const filterId = useId();

  const config = NOISE_CONFIG[type];
  // Animate seed deterministically for temporal variation
  const seed = speed > 0 ? Math.floor(frame * speed) : 0;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: blend,
        opacity,
        ...style,
      }}
    >
      <svg width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={config.baseFrequency}
              numOctaves={config.octaves}
              seed={seed}
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="saturate"
              values="0"
            />
            <feComponentTransfer>
              <feFuncA type="linear" slope={intensity} />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
    </div>
  );
};

export default Noise;
