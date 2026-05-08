import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export interface SpotlightProps {
  /** Spotlight center X as percentage (0-100) */
  x?: number;
  /** Spotlight center Y as percentage (0-100) */
  y?: number;
  /** Spotlight radius as percentage of container */
  size?: number;
  /** Edge softness (0 = hard, higher = softer) */
  softness?: number;
  /** Darkness of the area outside the spotlight */
  darkness?: number;
  /** Spotlight color tint */
  color?: string;
  /** Animate from X position (percentage) */
  fromX?: number;
  /** Animate from Y position (percentage) */
  fromY?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Animate size from this value */
  fromSize?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Spotlight / focus effect.
 * Darkens everything except a circular area, with optional animation.
 *
 * @example
 * <Spotlight x={50} y={40} size={25} softness={15} />
 * <Spotlight x={70} y={30} fromX={30} fromY={60} duration={1.5} />
 */
export const Spotlight: React.FC<SpotlightProps> = ({
  x = 50,
  y = 50,
  size = 20,
  softness = 10,
  darkness = 0.7,
  color,
  fromX,
  fromY,
  duration = 0,
  delay = 0,
  fromSize,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.max(1, Math.round(duration * fps));

  const progress =
    duration > 0
      ? interpolate(frame - delayFrames, [0, durationFrames], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.inOut(Easing.cubic),
        })
      : 1;

  const currentX = fromX !== undefined ? fromX + (x - fromX) * progress : x;
  const currentY = fromY !== undefined ? fromY + (y - fromY) * progress : y;
  const currentSize = fromSize !== undefined ? fromSize + (size - fromSize) * progress : size;

  const innerStop = Math.max(0, currentSize - softness);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: `radial-gradient(circle at ${currentX}% ${currentY}%, ${color ? `${color}00` : "transparent"} ${innerStop}%, ${color ? `${color}${Math.round(darkness * 255).toString(16).padStart(2, "0")}` : `rgba(0,0,0,${darkness})`} ${currentSize}%)`,
        zIndex: 5,
        ...style,
      }}
    />
  );
};

export default Spotlight;
