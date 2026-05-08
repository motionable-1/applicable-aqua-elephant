import React, { useId } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type StrokeShape = "rect" | "circle" | "rounded";

export interface GradientStrokeProps {
  children?: React.ReactNode;
  /** Shape of the stroke */
  shape?: StrokeShape;
  /** Width of the container */
  width?: number;
  /** Height of the container */
  height?: number;
  /** Stroke thickness */
  thickness?: number;
  /** Gradient start color */
  color?: string;
  /** Gradient end color */
  colorEnd?: string;
  /** Gradient rotation speed (degrees per second) */
  rotationSpeed?: number;
  /** Animate stroke drawing in (seconds, 0 = instant) */
  drawIn?: number;
  /** Delay in seconds */
  delay?: number;
  /** Border radius (for rounded shape) */
  borderRadius?: number;
  /** Dash array for dashed strokes */
  dash?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated gradient stroke / outline.
 * Trending Jitter-style effect — gradient outlines that rotate and draw on.
 *
 * @example
 * <GradientStroke color="#FF6B6B" colorEnd="#4ECDC4" width={300} height={200} rotationSpeed={60}>
 *   <img src="photo.jpg" />
 * </GradientStroke>
 */
export const GradientStroke: React.FC<GradientStrokeProps> = ({
  children,
  shape = "rounded",
  width = 200,
  height = 200,
  thickness = 3,
  color = "#FF6B6B",
  colorEnd = "#4ECDC4",
  rotationSpeed = 45,
  drawIn = 0.8,
  delay = 0,
  borderRadius = 16,
  dash = 0,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;
  const gradId = useId();

  const delayFrames = Math.round(delay * fps);
  const drawFrames = Math.max(1, Math.round(drawIn * fps));

  const drawProgress = interpolate(frame - delayFrames, [0, drawFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const angle = (time * rotationSpeed) % 360;

  // Calculate perimeter for dash offset animation
  let perimeter: number;
  if (shape === "circle") {
    const r = Math.min(width, height) / 2 - thickness / 2;
    perimeter = 2 * Math.PI * r;
  } else {
    perimeter = 2 * (width + height - 4 * thickness);
  }

  const dashOffset = perimeter * (1 - drawProgress);

  const renderShape = () => {
    const strokeProps = {
      fill: "none",
      stroke: `url(#${gradId})`,
      strokeWidth: thickness,
      strokeDasharray: dash > 0 ? `${dash} ${dash}` : `${perimeter}`,
      strokeDashoffset: dash > 0 ? 0 : dashOffset,
      strokeLinecap: "round" as const,
    };

    if (shape === "circle") {
      const r = Math.min(width, height) / 2 - thickness / 2;
      return <circle cx={width / 2} cy={height / 2} r={r} {...strokeProps} />;
    }

    const rx = shape === "rounded" ? borderRadius : 0;
    return (
      <rect
        x={thickness / 2}
        y={thickness / 2}
        width={width - thickness}
        height={height - thickness}
        rx={rx}
        ry={rx}
        {...strokeProps}
      />
    );
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        width,
        height,
        ...style,
      }}
    >
      {children && (
        <div
          style={{
            position: "absolute",
            inset: thickness,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: shape === "circle" ? "50%" : shape === "rounded" ? borderRadius - thickness : 0,
          }}
        >
          {children}
        </div>
      )}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <linearGradient
            id={gradId}
            gradientTransform={`rotate(${angle}, 0.5, 0.5)`}
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor={color} />
            <stop offset="50%" stopColor={colorEnd} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        {renderShape()}
      </svg>
    </div>
  );
};

export default GradientStroke;
