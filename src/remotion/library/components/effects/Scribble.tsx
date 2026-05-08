import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing, random } from "remotion";

export type ScribbleShape = "circle" | "underline" | "arrow" | "cross" | "box" | "checkmark" | "highlight";

export interface ScribbleProps {
  /** Shape to draw */
  shape?: ScribbleShape;
  /** Stroke color */
  color?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Width of the scribble area */
  width?: number;
  /** Height of the scribble area */
  height?: number;
  /** Draw-on duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Hand-drawn wobble amount (0 = clean, higher = messier) */
  wobble?: number;
  /** Number of passes (1 = single line, 2+ = sketchy overdraw) */
  passes?: number;
  /** Random seed */
  seed?: string;
  className?: string;
  style?: React.CSSProperties;
}

function wobblePath(
  points: Array<[number, number]>,
  wobbleAmount: number,
  seed: string,
): string {
  if (points.length < 2) return "";
  const wobbled = points.map(([x, y], i) => {
    const wx = x + (random(`${seed}-wx-${i}`) - 0.5) * wobbleAmount;
    const wy = y + (random(`${seed}-wy-${i}`) - 0.5) * wobbleAmount;
    return [wx, wy] as [number, number];
  });

  let d = `M ${wobbled[0][0]} ${wobbled[0][1]}`;
  for (let i = 1; i < wobbled.length; i++) {
    const prev = wobbled[i - 1];
    const curr = wobbled[i];
    // Quadratic bezier for hand-drawn feel
    const cpx = (prev[0] + curr[0]) / 2 + (random(`${seed}-cpx-${i}`) - 0.5) * wobbleAmount * 1.5;
    const cpy = (prev[1] + curr[1]) / 2 + (random(`${seed}-cpy-${i}`) - 0.5) * wobbleAmount * 1.5;
    d += ` Q ${cpx} ${cpy} ${curr[0]} ${curr[1]}`;
  }
  return d;
}

function getShapePoints(shape: ScribbleShape, w: number, h: number): Array<[number, number]> {
  const cx = w / 2;
  const cy = h / 2;
  const rx = w * 0.42;
  const ry = h * 0.42;

  switch (shape) {
    case "circle": {
      const pts: Array<[number, number]> = [];
      const steps = 24;
      for (let i = 0; i <= steps + 2; i++) {
        const angle = (i / steps) * Math.PI * 2 - Math.PI / 2;
        pts.push([cx + Math.cos(angle) * rx, cy + Math.sin(angle) * ry]);
      }
      return pts;
    }
    case "underline":
      return [
        [w * 0.05, h * 0.85],
        [w * 0.25, h * 0.83],
        [w * 0.5, h * 0.86],
        [w * 0.75, h * 0.82],
        [w * 0.95, h * 0.84],
      ];
    case "arrow":
      return [
        [w * 0.1, cy],
        [w * 0.3, cy],
        [w * 0.5, cy],
        [w * 0.7, cy],
        [w * 0.88, cy],
        // arrowhead up
        [w * 0.75, cy - h * 0.25],
        [w * 0.88, cy],
        // arrowhead down
        [w * 0.75, cy + h * 0.25],
      ];
    case "cross":
      return [
        [w * 0.2, h * 0.2],
        [w * 0.5, h * 0.5],
        [w * 0.8, h * 0.8],
        // lift pen (big jump = visual break)
        [w * 0.8, h * 0.2],
        [w * 0.5, h * 0.5],
        [w * 0.2, h * 0.8],
      ];
    case "box":
      return [
        [w * 0.1, h * 0.1],
        [w * 0.9, h * 0.1],
        [w * 0.9, h * 0.9],
        [w * 0.1, h * 0.9],
        [w * 0.1, h * 0.12],
      ];
    case "checkmark":
      return [
        [w * 0.15, h * 0.5],
        [w * 0.35, h * 0.75],
        [w * 0.85, h * 0.2],
      ];
    case "highlight":
      return [
        [w * 0.03, h * 0.55],
        [w * 0.25, h * 0.52],
        [w * 0.5, h * 0.56],
        [w * 0.75, h * 0.51],
        [w * 0.97, h * 0.54],
      ];
  }
}

/**
 * Hand-drawn scribble / annotation overlay.
 * THE trending motion graphics element in 2025-2026.
 * Draw-on animated circles, underlines, arrows, crosses, checkmarks.
 *
 * @example
 * <Scribble shape="circle" color="#FF6B6B" width={200} height={80} wobble={4} />
 * <Scribble shape="underline" color="#FFE066" width={300} height={30} />
 */
export const Scribble: React.FC<ScribbleProps> = ({
  shape = "circle",
  color = "#FF6B6B",
  strokeWidth = 3,
  width = 200,
  height = 100,
  duration = 0.5,
  delay = 0,
  wobble = 4,
  passes = 1,
  seed = "scribble",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.max(1, Math.round(duration * fps));

  const drawProgress = interpolate(frame - delayFrames, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const paths = useMemo(() => {
    return Array.from({ length: passes }).map((_, pass) => {
      const points = getShapePoints(shape, width, height);
      return wobblePath(points, wobble, `${seed}-pass-${pass}`);
    });
  }, [shape, width, height, wobble, passes, seed]);

  // Estimate total path length for dash animation
  const pathLength = useMemo(() => {
    const points = getShapePoints(shape, width, height);
    let len = 0;
    for (let i = 1; i < points.length; i++) {
      const dx = points[i][0] - points[i - 1][0];
      const dy = points[i][1] - points[i - 1][1];
      len += Math.sqrt(dx * dx + dy * dy);
    }
    return len * 1.5; // Extra for curves
  }, [shape, width, height]);

  return (
    <div
      className={className}
      style={{
        display: "inline-block",
        width,
        height,
        position: "relative",
        ...style,
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - drawProgress)}
            opacity={i > 0 ? 0.5 : 1}
          />
        ))}
      </svg>
    </div>
  );
};

export default Scribble;
