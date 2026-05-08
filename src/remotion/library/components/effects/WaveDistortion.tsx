import React, { useId, useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WaveType = "horizontal" | "vertical" | "circular" | "turbulent";

export interface WaveDistortionProps {
  /** Content to distort */
  children: React.ReactNode;
  /** Type of wave distortion (default "horizontal") */
  waveType?: WaveType;
  /** Wave amplitude in pixels (default 10) */
  amplitude?: number;
  /** Wave frequency (default 3) */
  frequency?: number;
  /** Animation speed multiplier (default 1) */
  speed?: number;
  /** Animate the wave over time (default true) */
  animated?: boolean;
  /** Overall effect intensity 0-1 (default 1) */
  intensity?: number;
  /** Ramp-up duration in seconds (0 = instant, default 0) */
  duration?: number;
  /** Delay in seconds before effect begins (default 0) */
  delay?: number;
  /** Additional CSS class names */
  className?: string;
  /** Additional CSS styles */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface TurbulenceConfig {
  baseFrequencyX: number;
  baseFrequencyY: number;
  numOctaves: number;
  turbulenceType: "turbulence" | "fractalNoise";
}

function getConfig(waveType: WaveType, frequency: number): TurbulenceConfig {
  const base = frequency * 0.01;

  switch (waveType) {
    case "horizontal":
      return { baseFrequencyX: base * 0.1, baseFrequencyY: base, numOctaves: 1, turbulenceType: "turbulence" };
    case "vertical":
      return { baseFrequencyX: base, baseFrequencyY: base * 0.1, numOctaves: 1, turbulenceType: "turbulence" };
    case "circular":
      return { baseFrequencyX: base, baseFrequencyY: base, numOctaves: 2, turbulenceType: "turbulence" };
    case "turbulent":
      return { baseFrequencyX: base * 0.5, baseFrequencyY: base * 0.5, numOctaves: 5, turbulenceType: "fractalNoise" };
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Sine-wave / liquid distortion overlay effect.
 * Wraps children with an SVG displacement-map filter driven by feTurbulence
 * for organic, animated distortion.
 *
 * @example
 * // Instant horizontal wave
 * <WaveDistortion amplitude={12} frequency={4}>
 *   <img src="photo.jpg" style={{ width: "100%", height: "100%" }} />
 * </WaveDistortion>
 *
 * @example
 * // Turbulent liquid effect that ramps up over 0.5s
 * <WaveDistortion waveType="turbulent" amplitude={20} duration={0.5} speed={2}>
 *   <h1>LIQUID</h1>
 * </WaveDistortion>
 */
export const WaveDistortion: React.FC<WaveDistortionProps> = ({
  children,
  waveType = "horizontal",
  amplitude = 10,
  frequency = 3,
  speed = 1,
  animated = true,
  intensity = 1,
  duration = 0,
  delay = 0,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const instanceId = useId();
  const filterId = `${instanceId}-wave`;

  const config = useMemo(() => getConfig(waveType, frequency), [waveType, frequency]);

  // Deterministic seed for animation — Math.floor keeps it integer-stepped
  const seed = animated ? Math.floor(frame * speed * 0.5) : 0;

  // Ramp-up intensity when duration > 0
  const rampedIntensity = useMemo(() => {
    if (duration <= 0) return intensity;
    const delayFrames = Math.round(delay * fps);
    const durationFrames = Math.round(duration * fps);
    const effectiveFrame = frame - delayFrames;
    if (effectiveFrame <= 0) return 0;
    if (effectiveFrame >= durationFrames) return intensity;
    return interpolate(effectiveFrame, [0, durationFrames], [0, intensity], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }, [frame, fps, duration, delay, intensity]);

  const scale = amplitude * rampedIntensity;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {/* Hidden SVG with filter definitions */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type={config.turbulenceType}
              baseFrequency={`${config.baseFrequencyX} ${config.baseFrequencyY}`}
              numOctaves={config.numOctaves}
              seed={seed}
              stitchTiles="stitch"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Content with applied filter */}
      <div
        style={{
          width: "100%",
          height: "100%",
          filter: scale > 0 ? `url(#${filterId})` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default WaveDistortion;
