import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type HighlightStyle = "marker" | "underline" | "box" | "circle" | "strikethrough";

export interface HighlightProps {
  children: React.ReactNode;
  /** Highlight visual style */
  highlightStyle?: HighlightStyle;
  /** Highlight color */
  color?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation in seconds */
  delay?: number;
  /** Thickness of the highlight */
  thickness?: number;
  /** Roundness for box/marker styles */
  borderRadius?: number;
  /** Padding around the content */
  padding?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated highlight effect for emphasizing content.
 * Marker, underline, box, circle, or strikethrough styles.
 *
 * @example
 * <Highlight highlightStyle="marker" color="#FFE066">Important text</Highlight>
 */
export const Highlight: React.FC<HighlightProps> = ({
  children,
  highlightStyle = "marker",
  color = "#FFE066",
  duration = 0.5,
  delay = 0,
  thickness = 0.4,
  borderRadius = 4,
  padding = 4,
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

  const getHighlightDecoration = (): React.CSSProperties => {
    switch (highlightStyle) {
      case "marker":
        return {
          backgroundImage: `linear-gradient(transparent ${(1 - thickness) * 100}%, ${color} ${(1 - thickness) * 100}%)`,
          backgroundSize: `${progress * 100}% 100%`,
          backgroundRepeat: "no-repeat",
          borderRadius,
          padding: `${padding}px ${padding * 2}px`,
        };

      case "underline":
        return {
          backgroundImage: `linear-gradient(${color}, ${color})`,
          backgroundSize: `${progress * 100}% ${Math.max(2, thickness * 10)}px`,
          backgroundPosition: "left bottom",
          backgroundRepeat: "no-repeat",
          paddingBottom: padding + thickness * 10,
        };

      case "box":
        return {
          outline: `${Math.max(2, thickness * 6)}px solid ${color}`,
          outlineOffset: padding,
          borderRadius,
          opacity: progress,
          padding: padding * 2,
        };

      case "circle": {
        const scale = 0.8 + progress * 0.2;
        return {
          border: `${Math.max(2, thickness * 6)}px solid ${color}`,
          borderRadius: "50%",
          padding: `${padding * 3}px ${padding * 5}px`,
          transform: `scale(${scale})`,
          opacity: progress,
        };
      }

      case "strikethrough":
        return {
          backgroundImage: `linear-gradient(${color}, ${color})`,
          backgroundSize: `${progress * 100}% ${Math.max(2, thickness * 6)}px`,
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
        };
    }
  };

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline",
        ...getHighlightDecoration(),
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export default Highlight;
