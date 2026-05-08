import React, { useId } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type ProgressStyle = "ring" | "bar";

export interface ProgressRingProps {
  /** Progress value 0-1 (or animated from 0 to this value) */
  value?: number;
  /** Visual style */
  variant?: ProgressStyle;
  /** Ring/bar size in pixels */
  size?: number;
  /** Stroke/bar thickness */
  thickness?: number;
  /** Track color (background) */
  trackColor?: string;
  /** Fill color */
  color?: string;
  /** Optional gradient end color */
  colorEnd?: string;
  /** Animation duration in seconds (0 = static) */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Show percentage text */
  showValue?: boolean;
  /** Font size for value text */
  fontSize?: number;
  /** Text color */
  textColor?: string;
  /** Round line caps */
  rounded?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated progress ring or bar.
 * Common in data-driven motion graphics.
 *
 * @example
 * <ProgressRing value={0.75} size={120} color="#4ECDC4" showValue />
 * <ProgressRing variant="bar" value={0.6} size={300} />
 */
export const ProgressRing: React.FC<ProgressRingProps> = ({
  value = 1,
  variant = "ring",
  size = 120,
  thickness = 8,
  trackColor = "rgba(255,255,255,0.15)",
  color = "#4ECDC4",
  colorEnd,
  duration = 1,
  delay = 0,
  showValue = false,
  fontSize = 24,
  textColor = "#ffffff",
  rounded = true,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gradientId = useId();

  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.max(1, Math.round(duration * fps));

  const animatedProgress =
    duration > 0
      ? interpolate(frame - delayFrames, [0, durationFrames], [0, value], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        })
      : value;

  const displayValue = Math.round(animatedProgress * 100);

  if (variant === "bar") {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: thickness,
          borderRadius: rounded ? thickness / 2 : 0,
          backgroundColor: trackColor,
          overflow: "hidden",
          ...style,
        }}
      >
        <div
          style={{
            width: `${animatedProgress * 100}%`,
            height: "100%",
            borderRadius: rounded ? thickness / 2 : 0,
            background: colorEnd
              ? `linear-gradient(90deg, ${color}, ${colorEnd})`
              : color,
          }}
        />
      </div>
    );
  }

  // Ring variant
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - animatedProgress);
  const lineCap = rounded ? "round" : "butt";

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
        ...style,
      }}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {colorEnd && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={colorEnd} />
            </linearGradient>
          </defs>
        )}
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={thickness}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colorEnd ? `url(#${gradientId})` : color}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap={lineCap}
        />
      </svg>
      {showValue && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize,
            fontWeight: 700,
            color: textColor,
            fontFamily: "system-ui, sans-serif",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {displayValue}%
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
