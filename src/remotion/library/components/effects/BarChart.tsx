import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type ChartOrientation = "vertical" | "horizontal";

export interface BarChartBar {
  value: number;
  label?: string;
  color?: string;
}

export interface BarChartProps {
  /** Array of bar data */
  bars: BarChartBar[];
  /** Chart width */
  width?: number;
  /** Chart height */
  height?: number;
  /** Vertical or horizontal bars */
  orientation?: ChartOrientation;
  /** Default bar color */
  color?: string;
  /** Background track color */
  trackColor?: string;
  /** Gap between bars */
  gap?: number;
  /** Bar border radius */
  borderRadius?: number;
  /** Show value labels */
  showValues?: boolean;
  /** Show bar labels */
  showLabels?: boolean;
  /** Animation duration per bar in seconds */
  duration?: number;
  /** Stagger delay between bars in seconds */
  stagger?: number;
  /** Initial delay in seconds */
  delay?: number;
  /** Font size for labels */
  fontSize?: number;
  /** Text color */
  textColor?: string;
  /** Max value (auto-calculated if not provided) */
  maxValue?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated bar chart for infographic motion graphics.
 * Supports vertical and horizontal orientations with staggered animation.
 *
 * @example
 * <BarChart bars={[
 *   { value: 80, label: "React", color: "#61DAFB" },
 *   { value: 65, label: "Vue", color: "#42B883" },
 *   { value: 45, label: "Angular", color: "#DD0031" },
 * ]} />
 */
export const BarChart: React.FC<BarChartProps> = ({
  bars,
  width = 400,
  height = 250,
  orientation = "vertical",
  color = "#4ECDC4",
  trackColor = "rgba(255,255,255,0.1)",
  gap = 8,
  borderRadius = 4,
  showValues = true,
  showLabels = true,
  duration = 0.6,
  stagger = 0.1,
  delay = 0,
  fontSize = 12,
  textColor = "#ffffff",
  maxValue,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const max = maxValue ?? Math.max(...bars.map((b) => b.value), 1);
  const isVertical = orientation === "vertical";
  const labelSpace = showLabels ? 24 : 0;
  const valueSpace = showValues ? 20 : 0;

  const chartW = isVertical ? width : width - labelSpace - valueSpace;
  const chartH = isVertical ? height - labelSpace - valueSpace : height;
  const barCount = bars.length;
  const totalGap = gap * (barCount - 1);
  const barSize = isVertical
    ? (chartW - totalGap) / barCount
    : (chartH - totalGap) / barCount;

  return (
    <div
      className={className}
      style={{
        width,
        height,
        position: "relative",
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isVertical ? "row" : "column",
          alignItems: isVertical ? "flex-end" : "flex-start",
          gap,
          width: isVertical ? chartW : undefined,
          height: isVertical ? chartH : chartH,
          marginLeft: isVertical ? 0 : labelSpace,
        }}
      >
        {bars.map((bar, i) => {
          const delayFrames = Math.round((delay + i * stagger) * fps);
          const durationFrames = Math.max(1, Math.round(duration * fps));

          const progress = interpolate(frame - delayFrames, [0, durationFrames], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          const ratio = (bar.value / max) * progress;
          const barColor = bar.color ?? color;
          const displayValue = Math.round(bar.value * progress);

          if (isVertical) {
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: barSize,
                  height: "100%",
                  justifyContent: "flex-end",
                }}
              >
                {showValues && (
                  <span
                    style={{
                      fontSize,
                      color: textColor,
                      fontFamily: "system-ui, sans-serif",
                      fontVariantNumeric: "tabular-nums",
                      marginBottom: 4,
                      opacity: progress,
                    }}
                  >
                    {displayValue}
                  </span>
                )}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: trackColor,
                    borderRadius,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: `${ratio * 100}%`,
                      backgroundColor: barColor,
                      borderRadius,
                    }}
                  />
                </div>
              </div>
            );
          }

          // Horizontal
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                height: barSize,
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: trackColor,
                  borderRadius,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: `${ratio * 100}%`,
                    backgroundColor: barColor,
                    borderRadius,
                  }}
                />
              </div>
              {showValues && (
                <span
                  style={{
                    fontSize,
                    color: textColor,
                    fontFamily: "system-ui, sans-serif",
                    fontVariantNumeric: "tabular-nums",
                    marginLeft: 8,
                    opacity: progress,
                    minWidth: valueSpace,
                  }}
                >
                  {displayValue}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Labels */}
      {showLabels && (
        <div
          style={{
            display: "flex",
            flexDirection: isVertical ? "row" : "column",
            gap,
            marginTop: isVertical ? 8 : 0,
            position: isVertical ? undefined : "absolute",
            left: 0,
            top: 0,
            height: isVertical ? undefined : chartH,
          }}
        >
          {bars.map((bar, i) => (
            <div
              key={i}
              style={{
                width: isVertical ? barSize : labelSpace,
                height: isVertical ? undefined : barSize,
                display: "flex",
                alignItems: "center",
                justifyContent: isVertical ? "center" : "flex-end",
              }}
            >
              <span
                style={{
                  fontSize: fontSize - 1,
                  color: `${textColor}99`,
                  fontFamily: "system-ui, sans-serif",
                  textAlign: isVertical ? "center" : "right",
                  paddingRight: isVertical ? 0 : 8,
                }}
              >
                {bar.label ?? ""}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BarChart;
