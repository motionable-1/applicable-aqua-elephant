/**
 * Presets barrel export.
 *
 * @example
 * import { easings, springs, durations, shadows } from './presets';
 */

export {
  appleSwift,
  appleBounce,
  appleSnap,
  appleGentle,
  materialStandard,
  materialDecelerate,
  materialAccelerate,
  materialSharp,
  bouncy as bouncyEasing,
  bouncyStrong,
  elastic,
  elasticGentle,
  rubbery,
  dramaticIn,
  dramaticOut,
  dramaticInOut,
  slowReveal,
  epicIn,
  epicOut,
  smooth as smoothEasing,
  smoothOut,
  gentle as gentleEasing,
  gentleOut,
  natural,
  soft,
  snappy as snappyEasing,
  quick as quickEasing,
  instant,
  responsive,
  linear,
  easings,
  type EasingName,
  getEasing,
} from "./easings";
export {
  type SpringConfig,
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
  defaultSpring,
  springs,
  type SpringName,
  getSpring,
  createSpring,
} from "./springs";
export * from "./durations";
export * from "./shadows";
export { toRemotionEasing } from "./remotionEasings";
