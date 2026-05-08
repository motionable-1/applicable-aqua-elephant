import { useCurrentFrame, interpolate, Easing } from "remotion";

export interface Keyframe {
  /** Frame number where this value applies */
  frame: number;
  /** The value at this frame */
  value: number;
  /** Easing function to use when approaching this keyframe from the previous one */
  easing?: (t: number) => number;
}

/**
 * Interpolates a value across a set of keyframes, similar to After Effects.
 * Allows different easings between different keyframes.
 *
 * @param frame The current frame number
 * @param keyframes Array of keyframes (must have at least one)
 * @param defaultValue Fallback value if keyframes array is empty
 */
export const interpolateKeyframes = (
  frame: number,
  keyframes: Keyframe[],
  defaultValue: number = 0
): number => {
  if (!keyframes || keyframes.length === 0) return defaultValue;
  
  // Sort keyframes by frame to ensure correct order
  const sorted = [...keyframes].sort((a, b) => a.frame - b.frame);

  // 1. Handle before first keyframe
  if (frame <= sorted[0].frame) {
    return sorted[0].value;
  }

  // 2. Handle after last keyframe
  if (frame >= sorted[sorted.length - 1].frame) {
    return sorted[sorted.length - 1].value;
  }

  // 3. Find the segment we are currently in
  let prevKf = sorted[0];
  let nextKf = sorted[1];

  for (let i = 0; i < sorted.length - 1; i++) {
    if (frame >= sorted[i].frame && frame < sorted[i + 1].frame) {
      prevKf = sorted[i];
      nextKf = sorted[i + 1];
      break;
    }
  }

  // 4. Interpolate between the two keyframes
  // Use the easing of the target keyframe (standard convention)
  const easing = nextKf.easing || Easing.linear;

  return interpolate(
    frame,
    [prevKf.frame, nextKf.frame],
    [prevKf.value, nextKf.value],
    {
      easing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
};

/**
 * Hook to use keyframe-based animation for a single value.
 *
 * @param keyframes Array of keyframes
 * @param defaultValue Optional default value
 * @returns The interpolated value for the current frame
 *
 * @example
 * const opacity = useKeyframes([
 *   { frame: 0, value: 0 },
 *   { frame: 30, value: 1, easing: Easing.out(Easing.cubic) },
 *   { frame: 60, value: 0 }
 * ]);
 */
export const useKeyframes = (
  keyframes: Keyframe[],
  defaultValue: number = 0
) => {
  const frame = useCurrentFrame();
  return interpolateKeyframes(frame, keyframes, defaultValue);
};
