import React, { useId } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export interface PieSlice {
  value: number;
  color: string;
  label?: string;
}

export interface PieChartProps {
  /** Array of slice data */
  slices: PieSlice[];
  /** Chart size in pixels */
  size?: number;
  /** Inner radius for donut chart (0 = full pie) */
  innerRadius?: number;
  /** Gap between slices in degrees */
  gap?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Start angle in degrees */
  startAngle?: number;
  /** Stroke width between slices */
  strokeWidth?: number;
  /** Stroke color */
  strokeColor?: string;
  /** Show percentage labels */
  showLabels?: boolean;
  /** Label font size */
  fontSize?: number;
  /** Label color */
  textColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number,
): string {
  const sweep = endAngle - startAngle;
  const largeArc = sweep > 180 ? 1 : 0;

  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);

  if (innerR <= 0) {
    // Full pie slice
    return [
      `M ${cx} ${cy}`,
      `L ${outerStart.x} ${outerStart.y}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
      "Z",
    ].join(" ");
  }

  // Donut slice
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

/**
 * Animated pie / donut chart for infographic motion graphics.
 * Slices animate in with sweeping reveal.
 *
 * @example
 * <PieChart slices={[
 *   { value: 40, color: "#FF6B6B", label: "Design" },
 *   { value: 30, color: "#4ECDC4", label: "Dev" },
 *   { value: 30, color: "#A78BFA", label: "Marketing" },
 * ]} size={200} innerRadius={0.6} />
 */
export const PieChart: React.FC<PieChartProps> = ({
  slices,
  size = 200,
  innerRadius = 0,
  gap = 1,
  duration = 1,
  delay = 0,
  startAngle = 0,
  strokeWidth = 0,
  strokeColor = "#000",
  showLabels = false,
  fontSize = 12,
  textColor = "#ffffff",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clipId = useId();

  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.max(1, Math.round(duration * fps));

  const progress = interpolate(frame - delayFrames, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 2;
  const innerR = outerR * innerRadius;

  // Build slices
  let currentAngle = startAngle;
  const sliceData = slices.map((slice) => {
    const sweepDeg = (slice.value / total) * 360;
    const start = currentAngle + gap / 2;
    const end = currentAngle + sweepDeg - gap / 2;
    const mid = currentAngle + sweepDeg / 2;
    currentAngle += sweepDeg;
    return { ...slice, start, end, mid };
  });

  // Animate as a single sweep
  const visibleAngle = startAngle + 360 * progress;

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: "relative",
        ...style,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          {/* Clip mask for sweep animation */}
          <clipPath id={clipId}>
            {progress >= 1 ? (
              <rect x={0} y={0} width={size} height={size} />
            ) : (
              <path
                d={arcPath(cx, cy, outerR + 5, 0, startAngle, visibleAngle)}
              />
            )}
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          {sliceData.map((s, i) => (
            <path
              key={i}
              d={arcPath(cx, cy, outerR, innerR, s.start, s.end)}
              fill={s.color}
              stroke={strokeWidth > 0 ? strokeColor : "none"}
              strokeWidth={strokeWidth}
            />
          ))}
        </g>
      </svg>

      {/* Labels */}
      {showLabels &&
        sliceData.map((s, i) => {
          const labelR = innerR > 0 ? (outerR + innerR) / 2 : outerR * 0.65;
          const pos = polarToCartesian(cx, cy, labelR, s.mid);
          const pct = Math.round((s.value / total) * 100);
          const labelProgress = interpolate(
            frame - delayFrames,
            [durationFrames * 0.5, durationFrames],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: pos.x,
                top: pos.y,
                transform: "translate(-50%, -50%)",
                fontSize,
                fontWeight: 700,
                color: textColor,
                fontFamily: "system-ui, sans-serif",
                opacity: labelProgress,
                pointerEvents: "none",
              }}
            >
              {pct}%
            </div>
          );
        })}
    </div>
  );
};

export default PieChart;
