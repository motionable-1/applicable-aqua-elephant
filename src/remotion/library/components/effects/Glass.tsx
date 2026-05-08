import React, { useMemo, type CSSProperties, type ReactNode } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export interface GlassProps {
  children?: ReactNode;
  /** Blur amount in pixels */
  blur?: number;
  /** Opacity of the glass background (0-1) */
  opacity?: number;
  /** Glass tint color */
  color?: string;
  /** Border opacity (0-1) */
  borderOpacity?: number;
  /** Border radius */
  borderRadius?: number;
  /** Shadow intensity (0-1) */
  shadow?: number;
  /** Enable chromatic aberration on edges */
  chromatic?: boolean;
  /** Texture noise opacity (0-1) */
  noise?: number;
  /** Animation duration in seconds (0 = no animation, instant) */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Additional CSS styles */
  style?: CSSProperties;
  className?: string;
}

/**
 * Premium frosted glass effect (Glassmorphism).
 * Includes backdrop blur, noise texture, and subtle borders.
 *
 * @example
 * // Static glass
 * <Glass blur={20} opacity={0.1}>
 *   <Content />
 * </Glass>
 *
 * @example
 * // Animated frost build-up
 * <Glass blur={20} opacity={0.1} duration={0.8}>
 *   <Content />
 * </Glass>
 */
export const Glass: React.FC<GlassProps> = ({
  children,
  blur = 16,
  opacity = 0.1,
  color = "rgba(255, 255, 255)",
  borderOpacity = 0.2,
  borderRadius = 16,
  shadow = 0.1,
  chromatic = false,
  noise = 0.05,
  duration = 0,
  delay = 0,
  style,
  className,
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

  const currentBlur = blur * progress;
  const currentOpacity = opacity * progress;
  const currentBorderOpacity = borderOpacity * progress;
  const currentShadow = shadow * progress;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        background: `${color.replace(")", `, ${currentOpacity})`).replace("rgb", "rgba").replace("rgbaa", "rgba")}`,
        backdropFilter: `blur(${currentBlur}px)`,
        WebkitBackdropFilter: `blur(${currentBlur}px)`,
        borderRadius,
        border: `1px solid rgba(255, 255, 255, ${currentBorderOpacity})`,
        boxShadow: `
          0 4px 6px -1px rgba(0, 0, 0, ${currentShadow}),
          0 2px 4px -1px rgba(0, 0, 0, ${currentShadow * 0.6}),
          inset 0 0 20px rgba(255, 255, 255, ${currentOpacity * 0.5})
        `,
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Noise Texture */}
      {noise > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: noise * progress,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            pointerEvents: "none",
            mixBlendMode: "overlay",
          }}
        />
      )}

      {/* Chromatic Aberration Border (simulated) */}
      {chromatic && (
        <div
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: borderRadius + 1,
            padding: 1,
            background: "linear-gradient(45deg, rgba(255,0,0,0.3), rgba(0,255,0,0.3), rgba(0,0,255,0.3))",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            pointerEvents: "none",
            opacity: 0.5 * progress,
          }}
        />
      )}

      {/* Shine reflection */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)",
          pointerEvents: "none",
          opacity: progress,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
};

export default Glass;
