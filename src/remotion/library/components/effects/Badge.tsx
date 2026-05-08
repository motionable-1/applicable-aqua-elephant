import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type BadgeStyle = "solid" | "outline" | "gradient" | "glass" | "neon";
export type BadgeAnimation = "fadeIn" | "scaleIn" | "slideDown" | "bounce" | "none";

export interface BadgeProps {
  children: React.ReactNode;
  /** Visual style */
  badgeStyle?: BadgeStyle;
  /** Entrance animation */
  animation?: BadgeAnimation;
  /** Primary color */
  color?: string;
  /** Text color */
  textColor?: string;
  /** Border radius */
  borderRadius?: number;
  /** Font size */
  fontSize?: number;
  /** Font weight */
  fontWeight?: number;
  /** Horizontal padding */
  paddingX?: number;
  /** Vertical padding */
  paddingY?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Icon element to show before text */
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated badge / label / tag.
 * Common for callouts, pricing, notifications.
 *
 * @example
 * <Badge badgeStyle="gradient" color="#FF6B6B" animation="bounce">NEW</Badge>
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  badgeStyle = "solid",
  animation = "scaleIn",
  color = "#FF6B6B",
  textColor = "#ffffff",
  borderRadius = 20,
  fontSize = 14,
  fontWeight = 700,
  paddingX = 16,
  paddingY = 6,
  duration = 0.4,
  delay = 0,
  icon,
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
    easing: Easing.out(Easing.back(1.5)),
  });

  const getAnimationStyle = (): React.CSSProperties => {
    if (animation === "none") return {};

    switch (animation) {
      case "fadeIn":
        return { opacity: progress };
      case "scaleIn":
        return {
          opacity: Math.min(1, progress * 2),
          transform: `scale(${0.5 + progress * 0.5})`,
        };
      case "slideDown":
        return {
          opacity: progress,
          transform: `translateY(${(1 - progress) * -20}px)`,
        };
      case "bounce": {
        const bounceProgress = interpolate(
          frame - delayFrames,
          [0, durationFrames * 0.6, durationFrames * 0.8, durationFrames],
          [0, 1.15, 0.95, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return {
          opacity: Math.min(1, progress * 3),
          transform: `scale(${bounceProgress})`,
        };
      }
    }
  };

  const getVisualStyle = (): React.CSSProperties => {
    switch (badgeStyle) {
      case "solid":
        return { backgroundColor: color };
      case "outline":
        return {
          backgroundColor: "transparent",
          border: `2px solid ${color}`,
          color,
        };
      case "gradient":
        return {
          background: `linear-gradient(135deg, ${color}, ${color}99)`,
        };
      case "glass":
        return {
          backgroundColor: `${color}33`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${color}44`,
        };
      case "neon":
        return {
          backgroundColor: "transparent",
          border: `1px solid ${color}`,
          boxShadow: `0 0 8px ${color}, 0 0 16px ${color}66, inset 0 0 8px ${color}33`,
          color,
        };
    }
  };

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: `${paddingY}px ${paddingX}px`,
        borderRadius,
        fontSize,
        fontWeight,
        fontFamily: "system-ui, sans-serif",
        color: badgeStyle === "outline" || badgeStyle === "neon" ? color : textColor,
        whiteSpace: "nowrap",
        ...getVisualStyle(),
        ...getAnimationStyle(),
        ...style,
      }}
    >
      {icon}
      {children}
    </span>
  );
};

export default Badge;
