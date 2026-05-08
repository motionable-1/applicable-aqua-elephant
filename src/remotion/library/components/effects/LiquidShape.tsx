import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, random } from "remotion";

export type LiquidPreset = "blob" | "circle" | "wave" | "pill" | "organic";

export interface LiquidShapeProps {
  /** Shape preset */
  preset?: LiquidPreset;
  /** Fill color or gradient start */
  color?: string;
  /** Gradient end color */
  colorEnd?: string;
  /** Shape size in pixels */
  size?: number;
  /** Morph animation speed */
  speed?: number;
  /** Morph complexity (number of control points) */
  complexity?: number;
  /** Morph amount (how far points deviate) */
  amplitude?: number;
  /** Gradient angle in degrees */
  gradientAngle?: number;
  /** Shadow blur */
  shadow?: number;
  /** Random seed */
  seed?: string;
  className?: string;
  style?: React.CSSProperties;
}

function generateBlobPath(
  cx: number,
  cy: number,
  radius: number,
  points: number,
  time: number,
  amplitude: number,
  seed: string,
): string {
  const controlPoints: Array<{ x: number; y: number }> = [];

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const freq1 = 1 + random(`${seed}-f1-${i}`) * 2;
    const freq2 = 0.5 + random(`${seed}-f2-${i}`) * 1.5;
    const phase1 = random(`${seed}-p1-${i}`) * Math.PI * 2;
    const phase2 = random(`${seed}-p2-${i}`) * Math.PI * 2;

    const wobble =
      Math.sin(time * freq1 + phase1) * amplitude * 0.6 +
      Math.sin(time * freq2 + phase2) * amplitude * 0.4;

    const r = radius + wobble;
    controlPoints.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    });
  }

  // Smooth closed cubic bezier through points
  const n = controlPoints.length;
  let d = `M ${controlPoints[0].x} ${controlPoints[0].y}`;

  for (let i = 0; i < n; i++) {
    const p0 = controlPoints[(i - 1 + n) % n];
    const p1 = controlPoints[i];
    const p2 = controlPoints[(i + 1) % n];
    const p3 = controlPoints[(i + 2) % n];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return d + " Z";
}

const PRESET_CONFIG: Record<LiquidPreset, { points: number; amp: number }> = {
  blob: { points: 8, amp: 15 },
  circle: { points: 12, amp: 5 },
  wave: { points: 6, amp: 25 },
  pill: { points: 10, amp: 8 },
  organic: { points: 5, amp: 30 },
};

/**
 * Animated liquid / morphing blob shape.
 * Top trend in 2025-2026 motion design — organic, flowing, alive.
 *
 * @example
 * <LiquidShape color="#FF6B6B" colorEnd="#4ECDC4" size={300} speed={1} />
 */
export const LiquidShape: React.FC<LiquidShapeProps> = ({
  preset = "blob",
  color = "#FF6B6B",
  colorEnd,
  size = 200,
  speed = 1,
  complexity,
  amplitude,
  gradientAngle = 135,
  shadow = 0,
  seed = "liquid",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = (frame / fps) * speed;

  const config = PRESET_CONFIG[preset];
  const pts = complexity ?? config.points;
  const amp = amplitude ?? config.amp;

  const gradientId = useMemo(
    () => `liquid-grad-${seed}-${preset}`,
    [seed, preset],
  );

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.35;

  const path = generateBlobPath(cx, cy, radius, pts, time, amp, seed);

  const rad = (gradientAngle * Math.PI) / 180;
  const gx1 = 50 - Math.cos(rad) * 50;
  const gy1 = 50 - Math.sin(rad) * 50;
  const gx2 = 50 + Math.cos(rad) * 50;
  const gy2 = 50 + Math.sin(rad) * 50;

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {colorEnd && (
          <defs>
            <linearGradient
              id={gradientId}
              x1={`${gx1}%`}
              y1={`${gy1}%`}
              x2={`${gx2}%`}
              y2={`${gy2}%`}
            >
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={colorEnd} />
            </linearGradient>
          </defs>
        )}
        <path
          d={path}
          fill={colorEnd ? `url(#${gradientId})` : color}
          style={
            shadow > 0
              ? { filter: `drop-shadow(0 ${shadow / 2}px ${shadow}px rgba(0,0,0,0.25))` }
              : undefined
          }
        />
      </svg>
    </div>
  );
};

export default LiquidShape;
