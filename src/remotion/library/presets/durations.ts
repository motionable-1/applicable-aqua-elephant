/**
 * Standard duration presets for consistent timing across animations.
 *
 * These follow common UX patterns:
 * - Micro: Tiny feedback (button press, toggle)
 * - Fast: Quick transitions (tooltips, dropdowns)
 * - Normal: Standard animations (modals, page transitions)
 * - Slow: Emphasis animations (hero reveals, important content)
 * - Dramatic: Cinematic effects (full-screen transitions, reveals)
 *
 * @example
 * import { durations } from '../presets/durations';
 *
 * <Animate duration={durations.normal} ... />
 */

// Micro interactions (50-100ms)
export const micro = 0.05;
export const instant = 0.1;

// Fast animations (150-250ms)
export const fast = 0.15;
export const quick = 0.2;
export const snappy = 0.25;

// Normal animations (300-500ms)
export const normal = 0.3;
export const standard = 0.4;
export const medium = 0.5;

// Slow animations (600-800ms)
export const slow = 0.6;
export const relaxed = 0.7;
export const gentle = 0.8;

// Dramatic animations (1000ms+)
export const dramatic = 1.0;
export const cinematic = 1.2;
export const epic = 1.5;
export const glacial = 2.0;

/**
 * All durations as a single object.
 */
export const durations = {
  // Micro
  micro,
  instant,

  // Fast
  fast,
  quick,
  snappy,

  // Normal
  normal,
  standard,
  medium,

  // Slow
  slow,
  relaxed,
  gentle,

  // Dramatic
  dramatic,
  cinematic,
  epic,
  glacial,
} as const;

export type DurationName = keyof typeof durations;

/**
 * Get a duration value by name, or return the number if it's already a number.
 */
export function getDuration(name: DurationName | number): number {
  if (typeof name === "number") {
    return name;
  }
  return durations[name] ?? durations.normal;
}

/**
 * Stagger timing presets for sequenced animations.
 */
export const staggers = {
  /** Very tight stagger (0.02s) - Almost simultaneous */
  tight: 0.02,
  /** Fast stagger (0.05s) - Quick sequence */
  fast: 0.05,
  /** Normal stagger (0.08s) - Standard sequence */
  normal: 0.08,
  /** Medium stagger (0.1s) - Noticeable sequence */
  medium: 0.1,
  /** Relaxed stagger (0.15s) - Clear separation */
  relaxed: 0.15,
  /** Slow stagger (0.2s) - Dramatic sequence */
  slow: 0.2,
  /** Very slow stagger (0.3s) - Very deliberate */
  verySlow: 0.3,
} as const;

export type StaggerName = keyof typeof staggers;

/**
 * Get a stagger value by name, or return the number if it's already a number.
 */
export function getStagger(name: StaggerName | number): number {
  if (typeof name === "number") {
    return name;
  }
  return staggers[name] ?? staggers.normal;
}

/**
 * Delay presets for common timing patterns.
 */
export const delays = {
  /** No delay */
  none: 0,
  /** Minimal delay (0.1s) */
  minimal: 0.1,
  /** Short delay (0.2s) */
  short: 0.2,
  /** Medium delay (0.4s) */
  medium: 0.4,
  /** Long delay (0.6s) */
  long: 0.6,
  /** Very long delay (1s) */
  veryLong: 1.0,
} as const;

export type DelayName = keyof typeof delays;
