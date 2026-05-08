import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export interface LetterboxProps {
  /** Bar size as fraction of height (0-0.5) */
  size?: number;
  /** Bar color */
  color?: string;
  /** Animate bars in over this many seconds (0 = instant) */
  animateIn?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Cinematic letterbox bars (top + bottom).
 * Standard for widescreen / cinematic framing.
 *
 * @example
 * <Letterbox size={0.12} animateIn={0.8} />
 */
export const Letterbox: React.FC<LetterboxProps> = ({
  size = 0.1,
  color = "#000000",
  animateIn = 0,
  delay = 0,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const barHeight = height * Math.min(0.5, Math.max(0, size));
  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.round(animateIn * fps);

  const progress =
    durationFrames > 0
      ? interpolate(frame - delayFrames, [0, durationFrames], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        })
      : 1;

  const currentHeight = barHeight * progress;

  const barStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    width: "100%",
    height: currentHeight,
    backgroundColor: color,
    pointerEvents: "none",
  };

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
        ...style,
      }}
    >
      <div style={{ ...barStyle, top: 0 }} />
      <div style={{ ...barStyle, bottom: 0 }} />
    </div>
  );
};

export default Letterbox;
