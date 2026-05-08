import { useCurrentFrame } from "remotion";
import { interpolateKeyframes, Keyframe } from "./useKeyframes";

type EasingFunction = (t: number) => number;

export type MultiKeyframe<T> = {
  frame: number;
  easing?: EasingFunction;
} & Partial<T>;

/**
 * Hook to use keyframe-based animation for multiple properties at once.
 * Similar to an After Effects timeline with multiple property lanes.
 *
 * @param keyframes Array of keyframes containing frame, easing, and any number of numeric properties
 * @param defaults Default values for properties if they are undefined in all keyframes
 * @returns Object containing the interpolated value for each property at the current frame
 *
 * @example
 * const { x, y, rotation } = useMultiKeyframes([
 *   { frame: 0, x: 0, y: 0, rotation: 0 },
 *   { frame: 30, x: 100, easing: Easing.out(Easing.cubic) },
 *   { frame: 60, y: 200, rotation: 180 }
 * ], { x: 0, y: 0, rotation: 0 });
 */
export const useMultiKeyframes = <T extends Record<string, number>>(
  keyframes: MultiKeyframe<T>[],
  defaults: T
): T => {
  const frame = useCurrentFrame();

  // Identify all properties we need to interpolate
  const properties = Object.keys(defaults) as Array<keyof T>;

  const result = {} as T;

  properties.forEach((prop) => {
    // Extract keyframes relevant to this property
    const propKeyframes: Keyframe[] = keyframes
      .filter((kf) => kf[prop] !== undefined)
      .map((kf) => ({
        frame: kf.frame,
        value: kf[prop] as number,
        easing: kf.easing,
      }));

    // Interpolate using the single-value logic
    result[prop] = interpolateKeyframes(
      frame,
      propKeyframes,
      defaults[prop]
    ) as T[keyof T];
  });

  return result;
};
