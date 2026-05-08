import React, { useId } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export type LightLeakStyle = "warm" | "cool" | "prismatic" | "flare" | "soft";

export interface LightLeakProps {
  /** Leak visual style */
  leakStyle?: LightLeakStyle;
  /** Animation speed */
  speed?: number;
  /** Overall intensity 0-1 */
  intensity?: number;
  /** CSS blend mode */
  blend?: React.CSSProperties["mixBlendMode"];
  className?: string;
  style?: React.CSSProperties;
}

const LEAK_PALETTES: Record<LightLeakStyle, string[]> = {
  warm: ["#FF6B35", "#FFB347", "#FF4500", "#FFD700"],
  cool: ["#4FC3F7", "#81D4FA", "#B39DDB", "#80DEEA"],
  prismatic: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA", "#F472B6"],
  flare: ["#FFFFFF", "#FFF8E1", "#FFE082", "#FFFFFF"],
  soft: ["#FFCCBC", "#F8BBD0", "#E1BEE7", "#C5CAE9"],
};

/**
 * Animated light leak overlay — cinematic glow / bokeh effect.
 * Very popular in professional video editing.
 *
 * @example
 * <LightLeak leakStyle="warm" intensity={0.6} speed={0.5} />
 */
export const LightLeak: React.FC<LightLeakProps> = ({
  leakStyle = "warm",
  speed = 0.5,
  intensity = 0.5,
  blend = "screen",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = (frame / fps) * speed;
  const gradId = useId();

  const palette = LEAK_PALETTES[leakStyle];

  // Create 3-4 animated radial gradients that drift across the frame
  const blobs = palette.map((color, i) => {
    const phase = (i / palette.length) * Math.PI * 2;
    const x = 30 + Math.sin(time * 0.7 + phase) * 40;
    const y = 30 + Math.cos(time * 0.5 + phase * 1.3) * 30;
    const size = 40 + Math.sin(time * 0.3 + i * 2) * 15;
    return { color, x, y, size };
  });

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: blend,
        opacity: intensity,
        ...style,
      }}
    >
      <svg width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <filter id={`${gradId}-blur`}>
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>
        <g filter={`url(#${gradId}-blur)`}>
          {blobs.map((blob, i) => (
            <ellipse
              key={i}
              cx={`${blob.x}%`}
              cy={`${blob.y}%`}
              rx={`${blob.size}%`}
              ry={`${blob.size * 0.7}%`}
              fill={blob.color}
              opacity={0.6}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default LightLeak;
