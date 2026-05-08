import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type DividerStyle = "line" | "gradient" | "dashed" | "dots" | "glow";
export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  /** Visual style */
  dividerStyle?: DividerStyle;
  /** Horizontal or vertical */
  orientation?: DividerOrientation;
  /** Length (percentage or px) */
  length?: string | number;
  /** Line thickness */
  thickness?: number;
  /** Line color */
  color?: string;
  /** Second color for gradient style */
  colorEnd?: string;
  /** Animation duration in seconds (0 = instant) */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Dot count for dots style */
  dotCount?: number;
  /** Glow blur radius */
  glowRadius?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated divider / separator line.
 * Draws itself on with various styles.
 *
 * @example
 * <Divider dividerStyle="gradient" color="#FF6B6B" colorEnd="#4ECDC4" length="80%" />
 */
export const Divider: React.FC<DividerProps> = ({
  dividerStyle = "line",
  orientation = "horizontal",
  length = "100%",
  thickness = 2,
  color = "#ffffff",
  colorEnd,
  duration = 0.5,
  delay = 0,
  dotCount = 20,
  glowRadius = 8,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.max(1, Math.round(duration * fps));

  const progress = interpolate(frame - delayFrames, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const isH = orientation === "horizontal";
  const lengthVal = typeof length === "number" ? `${length}px` : length;

  const getContent = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: isH ? lengthVal : thickness,
      height: isH ? thickness : lengthVal,
    };

    switch (dividerStyle) {
      case "line":
        return {
          ...base,
          backgroundColor: color,
          transform: isH
            ? `scaleX(${progress})`
            : `scaleY(${progress})`,
          transformOrigin: isH ? "left center" : "center top",
        };

      case "gradient":
        return {
          ...base,
          background: isH
            ? `linear-gradient(90deg, ${color}, ${colorEnd ?? "transparent"})`
            : `linear-gradient(180deg, ${color}, ${colorEnd ?? "transparent"})`,
          transform: isH
            ? `scaleX(${progress})`
            : `scaleY(${progress})`,
          transformOrigin: isH ? "left center" : "center top",
        };

      case "dashed":
        return {
          ...base,
          backgroundImage: isH
            ? `repeating-linear-gradient(90deg, ${color} 0px, ${color} 8px, transparent 8px, transparent 16px)`
            : `repeating-linear-gradient(180deg, ${color} 0px, ${color} 8px, transparent 8px, transparent 16px)`,
          transform: isH
            ? `scaleX(${progress})`
            : `scaleY(${progress})`,
          transformOrigin: isH ? "left center" : "center top",
        };

      case "glow":
        return {
          ...base,
          backgroundColor: color,
          boxShadow: `0 0 ${glowRadius}px ${color}`,
          transform: isH
            ? `scaleX(${progress})`
            : `scaleY(${progress})`,
          transformOrigin: isH ? "left center" : "center top",
        };

      case "dots":
        return {
          ...base,
          display: "flex",
          flexDirection: isH ? "row" : "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 0,
        };
    }
    return base;
  };

  if (dividerStyle === "dots") {
    const visibleDots = Math.round(progress * dotCount);
    return (
      <div
        className={className}
        style={{
          display: "flex",
          flexDirection: isH ? "row" : "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: isH ? lengthVal : "auto",
          height: isH ? "auto" : lengthVal,
          ...style,
        }}
      >
        {Array.from({ length: dotCount }).map((_, i) => (
          <div
            key={i}
            style={{
              width: thickness * 2,
              height: thickness * 2,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: i < visibleDots ? 1 : 0,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        display: "inline-block",
        ...getContent(),
        ...style,
      }}
    />
  );
};

export default Divider;
