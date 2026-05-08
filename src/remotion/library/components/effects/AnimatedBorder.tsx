import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type BorderStyle = "solid" | "dashed" | "gradient" | "glow";

export interface AnimatedBorderProps {
  children?: React.ReactNode;
  /** Border visual style */
  borderStyle?: BorderStyle;
  /** Border color */
  color?: string;
  /** Second color for gradient style */
  colorEnd?: string;
  /** Border thickness */
  thickness?: number;
  /** Border radius */
  borderRadius?: number;
  /** Animation duration in seconds (0 = static) */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Dash length for dashed style */
  dashLength?: number;
  /** Dash animation speed (pixels per second) */
  dashSpeed?: number;
  /** Glow blur radius */
  glowRadius?: number;
  /** Padding inside the border */
  padding?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated border / frame effect.
 * Draws itself on with various styles.
 *
 * @example
 * <AnimatedBorder borderStyle="gradient" color="#FF6B6B" colorEnd="#4ECDC4">
 *   <img src="photo.jpg" />
 * </AnimatedBorder>
 */
export const AnimatedBorder: React.FC<AnimatedBorderProps> = ({
  children,
  borderStyle = "solid",
  color = "#ffffff",
  colorEnd,
  thickness = 2,
  borderRadius = 0,
  duration = 0.8,
  delay = 0,
  dashLength = 10,
  dashSpeed = 50,
  glowRadius = 10,
  padding = 0,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.max(1, Math.round(duration * fps));

  const drawProgress = interpolate(frame - delayFrames, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const getBorderStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      inset: 0,
      borderRadius,
      pointerEvents: "none",
    };

    switch (borderStyle) {
      case "solid":
        return {
          ...base,
          border: `${thickness}px solid ${color}`,
          clipPath: `inset(0 ${100 - drawProgress * 100}% 0 0)`,
        };

      case "dashed": {
        const offset = time * dashSpeed;
        return {
          ...base,
          border: `${thickness}px dashed ${color}`,
          opacity: drawProgress,
          // Simulate dash animation via outline offset
          backgroundImage: `repeating-linear-gradient(90deg, ${color} 0px, ${color} ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength * 2}px)`,
          backgroundSize: "100% 100%",
          backgroundPosition: `${offset}px 0`,
          // Override with actual border
          borderColor: color,
        };
      }

      case "gradient": {
        const angle = (time * 60) % 360;
        const endColor = colorEnd ?? color;
        return {
          ...base,
          border: `${thickness}px solid transparent`,
          backgroundImage: `linear-gradient(var(--bg, #000), var(--bg, #000)), linear-gradient(${angle}deg, ${color}, ${endColor})`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          opacity: drawProgress,
        };
      }

      case "glow":
        return {
          ...base,
          border: `${thickness}px solid ${color}`,
          boxShadow: `0 0 ${glowRadius}px ${color}, inset 0 0 ${glowRadius * 0.5}px ${color}40`,
          opacity: drawProgress,
        };
    }
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        padding: padding + thickness,
        ...style,
      }}
    >
      {children}
      <div style={getBorderStyles()} />
    </div>
  );
};

export default AnimatedBorder;
