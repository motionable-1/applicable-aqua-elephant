import React, { useMemo, type CSSProperties, type ReactNode } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export interface ReflectionProps {
  children: ReactNode;
  /** Opacity of the reflection (0-1) */
  opacity?: number;
  /** Blur of the reflection in pixels */
  blur?: number;
  /** Distance from the object in pixels */
  offset?: number;
  /** Vertical scale of the reflection */
  scale?: number;
  /** Gradient mask fade start (0-1) */
  maskStart?: number;
  /** Gradient mask fade end (0-1) */
  maskEnd?: number;
  /** Animation duration in seconds (0 = no animation, instant) */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Creates a realistic floor reflection for the content.
 *
 * @example
 * // Static reflection
 * <Reflection opacity={0.3} blur={4} offset={10}>
 *   <ProductCard />
 * </Reflection>
 *
 * @example
 * // Animated reflection reveal
 * <Reflection opacity={0.3} blur={2} duration={0.6}>
 *   <Logo />
 * </Reflection>
 */
export const Reflection: React.FC<ReflectionProps> = ({
  children,
  opacity = 0.3,
  blur = 2,
  offset = 0,
  scale = 1,
  maskStart = 0.2,
  maskEnd = 1,
  duration = 0,
  delay = 0,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = useMemo(() => {
    if (duration <= 0) return 1;
    const delayFrames = Math.round(delay * fps);
    const durationFrames = Math.round(duration * fps);
    const effectiveFrame = frame - delayFrames;
    if (effectiveFrame <= 0) return 0;
    if (effectiveFrame >= durationFrames) return 1;
    return interpolate(effectiveFrame, [0, durationFrames], [0, 1], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }, [frame, fps, duration, delay]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        ...style,
      }}
    >
      {/* Original Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>

      {/* Reflection */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          marginTop: offset,
          transform: `scaleY(-${scale})`,
          transformOrigin: "top",
          opacity: opacity * progress,
          filter: `blur(${blur}px)`,
          zIndex: 1,
          pointerEvents: "none",
          userSelect: "none",
          maskImage: `linear-gradient(to bottom, rgba(0,0,0,1) ${maskStart * 100}%, rgba(0,0,0,0) ${maskEnd * 100}%)`,
          WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,1) ${maskStart * 100}%, rgba(0,0,0,0) ${maskEnd * 100}%)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Reflection;
