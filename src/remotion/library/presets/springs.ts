/**
 * Physics-based spring configurations for natural motion.
 *
 * Springs create organic, lifelike animations by simulating real physics.
 * Higher tension = faster/snappier, higher friction = less overshoot.
 *
 * @example
 * import { springs } from '../presets/springs';
 *
 * // With useSpring hook
 * const value = useSpring(target, springs.bouncy);
 *
 * // With Motion component
 * <Motion spring="bouncy" ... />
 */

export interface SpringConfig {
  /** Spring tension (stiffness). Higher = faster oscillation. Range: 1-1000 */
  tension: number;
  /** Spring friction (damping). Higher = less overshoot. Range: 1-100 */
  friction: number;
  /** Mass of the object. Higher = slower, more momentum. Default: 1 */
  mass?: number;
  /** Velocity threshold to consider animation complete. Default: 0.01 */
  precision?: number;
  /** If true, prevents overshoot (no bounce past target). Default: false */
  clamp?: boolean;
}

// Snappy - Quick, responsive UI interactions
export const snappy: SpringConfig = {
  tension: 300,
  friction: 20,
  mass: 1,
};

// Smooth - General purpose, balanced motion
export const smooth: SpringConfig = {
  tension: 170,
  friction: 26,
  mass: 1,
};

// Bouncy - Playful with noticeable overshoot
export const bouncy: SpringConfig = {
  tension: 200,
  friction: 10,
  mass: 1,
  clamp: false,
};

// Gentle - Slow, elegant reveals
export const gentle: SpringConfig = {
  tension: 120,
  friction: 14,
  mass: 1,
};

// Stiff - Fast and precise, minimal overshoot
export const stiff: SpringConfig = {
  tension: 400,
  friction: 30,
  mass: 1,
};

// Wobbly - Elastic, jelly-like feel
export const wobbly: SpringConfig = {
  tension: 180,
  friction: 12,
  mass: 1,
};

// Molasses - Very slow, heavy feeling
export const molasses: SpringConfig = {
  tension: 100,
  friction: 30,
  mass: 2,
};

// Quick - Fast entrance, settles quickly
export const quick: SpringConfig = {
  tension: 250,
  friction: 25,
  mass: 1,
};

// Sluggish - Slow to start, slow to stop
export const sluggish: SpringConfig = {
  tension: 80,
  friction: 20,
  mass: 1.5,
};

// Punchy - Aggressive start with bounce
export const punchy: SpringConfig = {
  tension: 350,
  friction: 15,
  mass: 1,
};

// No bounce - Smooth without any overshoot
export const noBounce: SpringConfig = {
  tension: 200,
  friction: 26,
  mass: 1,
  clamp: true,
};

// Default spring (same as smooth)
export const defaultSpring: SpringConfig = smooth;

/**
 * All spring configurations as a single object.
 */
export const springs = {
  snappy,
  smooth,
  bouncy,
  gentle,
  stiff,
  wobbly,
  molasses,
  quick,
  sluggish,
  punchy,
  noBounce,
  default: defaultSpring,
} as const;

export type SpringName = keyof typeof springs;

/**
 * Get a spring config by name, or return the config if it's already a SpringConfig.
 */
export function getSpring(name: SpringName | SpringConfig): SpringConfig {
  if (typeof name === "string") {
    return springs[name] ?? springs.default;
  }
  return name;
}

/**
 * Create a custom spring configuration.
 */
export function createSpring(
  tension: number,
  friction: number,
  options?: { mass?: number; precision?: number; clamp?: boolean },
): SpringConfig {
  return {
    tension,
    friction,
    mass: options?.mass ?? 1,
    precision: options?.precision ?? 0.01,
    clamp: options?.clamp ?? false,
  };
}
