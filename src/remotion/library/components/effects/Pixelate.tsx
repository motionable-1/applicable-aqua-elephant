import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { type EasingName } from "../../presets/easings";
import { toRemotionEasing } from "../../presets/remotionEasings";

export interface PixelateProps {
  children: React.ReactNode;
  /** Target pixel size in px (larger = more pixelated) */
  pixelSize?: number;
  /** Animation duration in seconds (0 = static) */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Easing preset */
  ease?: EasingName | string;
  /**
   * Animation direction:
   * - "in": sharp to pixelated
   * - "out": pixelated to sharp
   */
  direction?: "in" | "out";
  /** Additional CSS class names */
  className?: string;
  /** Additional CSS styles */
  style?: React.CSSProperties;
}

/**
 * Pixelation effect with optional animation.
 * Uses scale-down + pixelated upscale for a mosaic look.
 *
 * @example
 * // Static pixelation
 * <Pixelate pixelSize={10}>
 *   <Image />
 * </Pixelate>
 *
 * @example
 * // Animated reveal (pixelated to sharp)
 * <Pixelate pixelSize={20} duration={1} direction="out">
 *   <Image />
 * </Pixelate>
 *
 * @example
 * // Animated pixelation (sharp to pixelated)
 * <Pixelate pixelSize={15} duration={0.5} direction="in" ease="smooth">
 *   <Image />
 * </Pixelate>
 */
export const Pixelate: React.FC<PixelateProps> = ({
  children,
  pixelSize = 10,
  duration = 0,
  delay = 0,
  ease = "smooth",
  direction = "in",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const easing = useMemo(() => toRemotionEasing(ease), [ease]);

  const progress = useMemo(() => {
    if (duration <= 0) return 1;
    const delayFrames = Math.round(delay * fps);
    const durationFrames = Math.round(duration * fps);
    const effectiveFrame = frame - delayFrames;
    if (effectiveFrame <= 0) return 0;
    if (effectiveFrame >= durationFrames) return 1;
    return interpolate(effectiveFrame, [0, durationFrames], [0, 1], {
      easing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }, [frame, fps, duration, delay, easing]);

  // "in" = sharp to pixelated (progress 0→1 maps to size 1→pixelSize)
  // "out" = pixelated to sharp (progress 0→1 maps to size pixelSize→1)
  const currentPixelSize = direction === "out"
    ? interpolate(progress, [0, 1], [pixelSize, 1])
    : duration <= 0
      ? pixelSize
      : interpolate(progress, [0, 1], [1, pixelSize]);

  // No pixelation needed if pixel size is 1 or less
  if (currentPixelSize <= 1) {
    return (
      <div className={className} style={{ width: "100%", height: "100%", ...style }}>
        {children}
      </div>
    );
  }

  const scaleFactor = 1 / Math.max(1, currentPixelSize);

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      <div
        style={{
          width: `${100 / scaleFactor}%`,
          height: `${100 / scaleFactor}%`,
          transform: `scale(${scaleFactor})`,
          transformOrigin: "top left",
          imageRendering: "pixelated",
        }}
      >
        {children}
      </div>
    </div>
  );
};
