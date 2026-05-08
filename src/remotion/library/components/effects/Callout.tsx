import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type CalloutStyle = "line" | "bracket" | "arrow" | "elbow";

export interface CalloutProps {
  children?: React.ReactNode;
  /** Start point [x, y] as percentage (0-100) */
  from: [number, number];
  /** End point [x, y] as percentage (0-100) */
  to: [number, number];
  /** Visual style of the connector */
  calloutStyle?: CalloutStyle;
  /** Line/stroke color */
  color?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Dot size at endpoints (0 = no dot) */
  dotSize?: number;
  /** Show dot at start */
  dotStart?: boolean;
  /** Show dot at end */
  dotEnd?: boolean;
  /** Arrowhead at end */
  arrowEnd?: boolean;
  /** Label position along the line (0-1) */
  labelPosition?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated callout line with optional label.
 * Points from one element to another with various connector styles.
 *
 * @example
 * <Callout from={[20, 50]} to={[80, 20]} calloutStyle="arrow" arrowEnd>
 *   <span>Label here</span>
 * </Callout>
 */
export const Callout: React.FC<CalloutProps> = ({
  children,
  from,
  to,
  calloutStyle = "line",
  color = "#ffffff",
  strokeWidth = 2,
  duration = 0.6,
  delay = 0,
  dotSize = 6,
  dotStart = true,
  dotEnd = false,
  arrowEnd = false,
  labelPosition = 0.5,
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
    easing: Easing.out(Easing.cubic),
  });

  const labelOpacity = interpolate(
    frame - delayFrames,
    [durationFrames * 0.6, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const getPath = (): string => {
    const [x1, y1] = from;
    const [x2, y2] = to;

    switch (calloutStyle) {
      case "line":
        return `M ${x1} ${y1} L ${x2} ${y2}`;
      case "elbow": {
        const midX = x2;
        return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2}`;
      }
      case "bracket": {
        const midY = (y1 + y2) / 2;
        return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
      }
      case "arrow":
        return `M ${x1} ${y1} L ${x2} ${y2}`;
    }
  };

  const pathD = getPath();

  // Label position
  const lx = from[0] + (to[0] - from[0]) * labelPosition;
  const ly = from[1] + (to[1] - from[1]) * labelPosition;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          {arrowEnd && (
            <marker
              id="callout-arrow"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill={color} />
            </marker>
          )}
        </defs>

        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 0.3}
          strokeDasharray="1000"
          strokeDashoffset={1000 * (1 - drawProgress)}
          markerEnd={arrowEnd ? "url(#callout-arrow)" : undefined}
          vectorEffect="non-scaling-stroke"
        />

        {/* Start dot */}
        {dotStart && drawProgress > 0 && (
          <circle
            cx={from[0]}
            cy={from[1]}
            r={dotSize * 0.15}
            fill={color}
            opacity={drawProgress}
          />
        )}

        {/* End dot */}
        {dotEnd && drawProgress >= 0.9 && (
          <circle
            cx={to[0]}
            cy={to[1]}
            r={dotSize * 0.15}
            fill={color}
            opacity={interpolate(drawProgress, [0.9, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        )}
      </svg>

      {/* Label */}
      {children && (
        <div
          style={{
            position: "absolute",
            left: `${lx}%`,
            top: `${ly}%`,
            transform: "translate(-50%, -50%)",
            opacity: labelOpacity,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Callout;
