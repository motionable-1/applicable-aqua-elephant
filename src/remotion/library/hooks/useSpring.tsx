import { useMemo } from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring as remotionSpring,
} from "remotion";
import {
  getSpring,
  type SpringConfig,
  type SpringName,
} from "../presets/springs";

/**
 * Options for the useSpring hook.
 */
export interface UseSpringOptions {
  /** Spring configuration name or custom config */
  spring?: SpringName | SpringConfig;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Initial velocity */
  velocity?: number;
  /** Duration override in seconds (converts spring to timed animation) */
  duration?: number;
  /** Starting frame for the animation (frame number, not seconds) */
  startFrame?: number;
}

/**
 * Return type for useSpring hook.
 */
export interface UseSpringReturn {
  /** Current animated value (0 to 1) */
  value: number;
  /** Whether the animation is complete */
  isComplete: boolean;
  /** Whether the animation has started */
  hasStarted: boolean;
  /** Current progress as percentage (0-100) */
  progress: number;
}

/**
 * Hook for physics-based spring animations integrated with Remotion.
 *
 * Uses Remotion's built-in spring function for frame-accurate physics simulation.
 *
 * @example
 * // Basic spring animation
 * const { value } = useSpring({ spring: 'bouncy' });
 * const translateY = interpolate(value, [0, 1], [100, 0]);
 *
 * @example
 * // With delay
 * const { value, hasStarted } = useSpring({
 *   spring: 'smooth',
 *   delay: 0.5
 * });
 *
 * @example
 * // Custom spring config
 * const { value } = useSpring({
 *   spring: { tension: 200, friction: 15 }
 * });
 */
export function useSpring(options: UseSpringOptions = {}): UseSpringReturn {
  const {
    spring: springOption = "smooth",
    delay = 0,
    startFrame,
  } = options;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const springConfig = getSpring(springOption);

  // Calculate the delay in frames
  const delayFrames = Math.round(delay * fps);

  // Determine the starting frame (frame number, not seconds)
  const animationStartFrame = startFrame ?? 0;

  // Calculate the effective frame (accounting for delay)
  const effectiveFrame = Math.max(0, frame - animationStartFrame - delayFrames);

  // Check if animation has started
  const hasStarted = frame >= animationStartFrame + delayFrames;

  // Use Remotion's spring function for physics-accurate animation
  const value = useMemo(() => {
    if (!hasStarted) return 0;

    // Remotion's spring config uses different naming
    // tension -> stiffness, friction -> damping
    const stiffness = springConfig.tension;
    const damping = springConfig.friction;
    const mass = springConfig.mass ?? 1;

    return remotionSpring({
      frame: effectiveFrame,
      fps,
      config: {
        mass,
        damping,
        stiffness,
        overshootClamping: springConfig.clamp ?? false,
      },
    });
  }, [effectiveFrame, fps, springConfig, hasStarted]);

  // Animation is complete when value is very close to 1
  const isComplete = value >= 0.999;

  return {
    value,
    isComplete,
    hasStarted,
    progress: value * 100,
  };
}

/**
 * Hook for animating between two numeric values using spring physics.
 *
 * @example
 * const opacity = useSpringValue(0, 1, { spring: 'bouncy' });
 */
export function useSpringValue(
  from: number,
  to: number,
  options: UseSpringOptions = {},
): number {
  const { value } = useSpring(options);
  return from + (to - from) * value;
}

/**
 * Hook for animating multiple spring values simultaneously.
 *
 * @example
 * const values = useMultiSpring({
 *   opacity: [0, 1],
 *   scale: [0.5, 1],
 *   y: [50, 0],
 * }, { spring: 'bouncy' });
 *
 * // values.opacity, values.scale, values.y are all animated
 */
export function useMultiSpring<T extends Record<string, [number, number]>>(
  values: T,
  options: UseSpringOptions = {},
): { [K in keyof T]: number } {
  const { value } = useSpring(options);

  return useMemo(() => {
    const result = {} as { [K in keyof T]: number };

    for (const key in values) {
      const [from, to] = values[key];
      result[key] = from + (to - from) * value;
    }

    return result;
  }, [value, values]);
}

/**
 * Create a spring animation value directly (no hook).
 * Useful for one-off calculations.
 */
export function calculateSpring(
  frame: number,
  fps: number,
  springOption: SpringName | SpringConfig = "smooth",
  delay: number = 0,
): number {
  const springConfig = getSpring(springOption);
  const delayFrames = Math.round(delay * fps);
  const effectiveFrame = Math.max(0, frame - delayFrames);

  if (effectiveFrame <= 0) return 0;

  return remotionSpring({
    frame: effectiveFrame,
    fps,
    config: {
      mass: springConfig.mass ?? 1,
      damping: springConfig.friction,
      stiffness: springConfig.tension,
      overshootClamping: springConfig.clamp ?? false,
    },
  });
}
