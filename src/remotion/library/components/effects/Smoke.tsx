import React, { useMemo, useId } from "react";
import { useCurrentFrame, useVideoConfig, random } from "remotion";

export type SmokeStyle = "fog" | "haze" | "wisps" | "thick";

export interface SmokeProps {
  /** Smoke visual style */
  smokeStyle?: SmokeStyle;
  /** Smoke color */
  color?: string;
  /** Overall opacity 0-1 */
  intensity?: number;
  /** Movement speed */
  speed?: number;
  /** Number of smoke layers */
  layers?: number;
  /** Direction of movement in degrees */
  direction?: number;
  /** Random seed */
  seed?: string;
  /** CSS blend mode */
  blend?: React.CSSProperties["mixBlendMode"];
  className?: string;
  style?: React.CSSProperties;
}

const STYLE_CONFIG: Record<SmokeStyle, { blur: number; scale: number; count: number }> = {
  fog: { blur: 80, scale: 2, count: 4 },
  haze: { blur: 60, scale: 1.5, count: 3 },
  wisps: { blur: 40, scale: 1, count: 5 },
  thick: { blur: 100, scale: 2.5, count: 6 },
};

/**
 * Atmospheric smoke / fog / haze overlay.
 * Top-selling element on VideoHive. Adds depth and mood.
 *
 * @example
 * <Smoke smokeStyle="fog" color="#ffffff" intensity={0.3} speed={0.5} />
 */
export const Smoke: React.FC<SmokeProps> = ({
  smokeStyle = "fog",
  color = "#ffffff",
  intensity = 0.3,
  speed = 0.5,
  layers = undefined,
  direction = 0,
  seed = "smoke",
  blend = "screen",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const filterId = useId();
  const time = (frame / fps) * speed;

  const cfg = STYLE_CONFIG[smokeStyle];
  const layerCount = layers ?? cfg.count;

  const dirRad = (direction * Math.PI) / 180;
  const dx = Math.cos(dirRad);
  const dy = Math.sin(dirRad);

  const smokeLayers = useMemo(() => {
    return Array.from({ length: layerCount }).map((_, i) => ({
      x: random(`${seed}-x-${i}`) * 100,
      y: random(`${seed}-y-${i}`) * 100,
      size: (40 + random(`${seed}-s-${i}`) * 40) * cfg.scale,
      speedMul: 0.5 + random(`${seed}-sp-${i}`) * 1,
      phase: random(`${seed}-ph-${i}`) * Math.PI * 2,
      opacity: 0.3 + random(`${seed}-op-${i}`) * 0.5,
    }));
  }, [layerCount, seed, cfg.scale]);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: blend,
        opacity: intensity,
        overflow: "hidden",
        ...style,
      }}
    >
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur stdDeviation={cfg.blur} />
          </filter>
        </defs>
        <g filter={`url(#${filterId})`}>
          {smokeLayers.map((layer, i) => {
            const t = time * layer.speedMul;
            const px = layer.x + dx * t * 10 + Math.sin(t * 0.5 + layer.phase) * 8;
            const py = layer.y + dy * t * 10 + Math.cos(t * 0.3 + layer.phase) * 5;
            // Pulse opacity
            const pulseOpacity =
              layer.opacity * (0.8 + 0.2 * Math.sin(t * 0.7 + layer.phase));

            return (
              <ellipse
                key={i}
                cx={`${((px % 120) + 120) % 120 - 10}%`}
                cy={`${((py % 120) + 120) % 120 - 10}%`}
                rx={`${layer.size}%`}
                ry={`${layer.size * 0.6}%`}
                fill={color}
                opacity={pulseOpacity}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default Smoke;
