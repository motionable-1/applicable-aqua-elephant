/**
 * Professional easing presets for high-quality motion design.
 * These can be used with GSAP's ease property or converted to CSS timing functions.
 *
 * @example
 * import { easings } from '../presets/easings';
 *
 * // With GSAP
 * gsap.to(element, { x: 100, ease: easings.appleSwift });
 *
 * // With Animate component
 * <Animate ease="appleSwift" ... />
 */

// Apple-style: precise, elegant, professional
export const appleSwift = "power2.out";
export const appleBounce = "back.out(1.4)";
export const appleSnap = "expo.out";
export const appleGentle = "power1.inOut";

// Material Design easing curves
export const materialStandard = "power2.inOut";
export const materialDecelerate = "circ.out";
export const materialAccelerate = "power2.in";
export const materialSharp = "power4.inOut";

// Expressive/Playful - bouncy and energetic
export const bouncy = "back.out(1.7)";
export const bouncyStrong = "back.out(2.5)";
export const elastic = "elastic.out(1, 0.3)";
export const elasticGentle = "elastic.out(0.8, 0.4)";
export const rubbery = "elastic.out(0.6, 0.5)";

// Cinematic - dramatic and impactful
export const dramaticIn = "power4.in";
export const dramaticOut = "power4.out";
export const dramaticInOut = "power4.inOut";
export const slowReveal = "expo.out";
export const epicIn = "power3.in";
export const epicOut = "power3.out";

// Smooth/Natural - organic feeling
export const smooth = "power2.inOut";
export const smoothOut = "power2.out";
export const gentle = "sine.inOut";
export const gentleOut = "sine.out";
export const natural = "expo.out";
export const soft = "power1.out";

// Snappy/UI - quick and responsive
export const snappy = "power3.out";
export const quick = "power2.out";
export const instant = "power4.out";
export const responsive = "expo.out";

// Linear (for specific use cases)
export const linear = "none";

/**
 * All easings as a single object for easy access and iteration.
 */
export const easings = {
  // Apple-style
  appleSwift,
  appleBounce,
  appleSnap,
  appleGentle,

  // Material Design
  materialStandard,
  materialDecelerate,
  materialAccelerate,
  materialSharp,

  // Expressive/Playful
  bouncy,
  bouncyStrong,
  elastic,
  elasticGentle,
  rubbery,

  // Cinematic
  dramaticIn,
  dramaticOut,
  dramaticInOut,
  slowReveal,
  epicIn,
  epicOut,

  // Smooth/Natural
  smooth,
  smoothOut,
  gentle,
  gentleOut,
  natural,
  soft,

  // Snappy/UI
  snappy,
  quick,
  instant,
  responsive,

  // Linear
  linear,
} as const;

export type EasingName = keyof typeof easings;

/**
 * Get an easing value by name, with fallback to the name itself (for custom easings).
 */
export function getEasing(name: EasingName | string): string {
  if (name in easings) {
    return easings[name as EasingName];
  }
  return name;
}
