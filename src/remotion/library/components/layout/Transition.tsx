import {
  TransitionSeries as RemotionTransitionSeries,
  linearTiming as remotionLinearTiming,
  springTiming as remotionSpringTiming,
  type TransitionPresentation,
  type TransitionTiming,
} from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";

import {
  blurDissolve,
  flashBlack,
  flashWhite,
  glitch,
  push,
  slideOver,
  whipPan,
  zoomIn,
  zoomOut,
  maskReveal,
  clockWipe,
  directionalWarp,
  morph,
} from "./transitions/presentations";
import { flip } from "./transitions/presentations/flip";

// Re-export with explicit assignment to avoid react-docgen parsing issues
export const TransitionSeries = RemotionTransitionSeries;
export const linearTiming = remotionLinearTiming;
export const springTiming = remotionSpringTiming;

export type TransitionType =
  | "slideLeft"
  | "slideRight"
  | "slideUp"
  | "slideDown"
  | "wipeLeft"
  | "wipeRight"
  | "wipeUp"
  | "wipeDown"
  | "blurDissolve"
  | "zoomIn"
  | "zoomOut"
  | "pushLeft"
  | "pushRight"
  | "slideOverLeft"
  | "slideOverRight"
  | "slideOverUp"
  | "slideOverDown"
  | "whipPan"
  | "flashWhite"
  | "flashBlack"
  | "glitch"
  | "flipHorizontal"
  | "flipVertical"
  | "maskReveal"
  | "clockWipe"
  | "warpLeft"
  | "warpRight"
  | "morphCircle"
  | "morphRounded";

export type TimingType = "linear" | "spring" | "smooth" | "snappy" | "expo";

export function createTiming(
  type: TimingType,
  durationInFrames: number,
): TransitionTiming {
  switch (type) {
    case "spring":
      return springTiming({ config: { damping: 200 }, durationInFrames });
    case "smooth":
      return springTiming({
        config: { damping: 20, stiffness: 80 },
        durationInFrames,
      });
    case "snappy":
      return springTiming({
        config: { damping: 30, stiffness: 300 },
        durationInFrames,
      });
    case "expo":
      return springTiming({
        config: { damping: 15, stiffness: 100 },
        durationInFrames,
      });
    case "linear":
    default:
      return linearTiming({ durationInFrames });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPresentation = TransitionPresentation<any>;

export function getPresentation(type: TransitionType): AnyPresentation {
  switch (type) {
    case "wipeLeft":
      return wipe({ direction: "from-right" });
    case "wipeRight":
      return wipe({ direction: "from-left" });
    case "wipeUp":
      return wipe({ direction: "from-bottom" });
    case "wipeDown":
      return wipe({ direction: "from-top" });
    case "slideLeft":
      return slide({ direction: "from-right" });
    case "slideRight":
      return slide({ direction: "from-left" });
    case "slideUp":
      return slide({ direction: "from-bottom" });
    case "slideDown":
      return slide({ direction: "from-top" });
    case "blurDissolve":
      return blurDissolve();
    case "zoomIn":
      return zoomIn();
    case "zoomOut":
      return zoomOut();
    case "pushLeft":
      return push("left");
    case "pushRight":
      return push("right");
    case "slideOverLeft":
      return slideOver("left");
    case "slideOverRight":
      return slideOver("right");
    case "slideOverUp":
      return slideOver("top");
    case "slideOverDown":
      return slideOver("bottom");
    case "whipPan":
      return whipPan();
    case "flashWhite":
      return flashWhite();
    case "flashBlack":
      return flashBlack();
    case "glitch":
      return glitch();
    case "flipHorizontal":
      return flip({ direction: "horizontal" });
    case "flipVertical":
      return flip({ direction: "vertical" });
    case "maskReveal":
      return maskReveal();
    case "clockWipe":
      return clockWipe();
    case "warpLeft":
      return directionalWarp("left");
    case "warpRight":
      return directionalWarp("right");
    case "morphCircle":
      return morph({ shape: "circle" });
    case "morphRounded":
      return morph({ shape: "rounded" });
    default:
      throw new Error(`Invalid transition type: ${type}`);
  }
}

export const TRANSITION_TYPES: TransitionType[] = [
  "slideLeft",
  "slideRight",
  "slideUp",
  "slideDown",
  "wipeLeft",
  "wipeRight",
  "wipeUp",
  "wipeDown",
  "blurDissolve",
  "zoomIn",
  "zoomOut",
  "pushLeft",
  "pushRight",
  "slideOverLeft",
  "slideOverRight",
  "slideOverUp",
  "slideOverDown",
  "whipPan",
  "flashWhite",
  "flashBlack",
  "glitch",
  "flipHorizontal",
  "flipVertical",
  "maskReveal",
  "clockWipe",
  "warpLeft",
  "warpRight",
  "morphCircle",
  "morphRounded",
];

export const TIMING_TYPES: TimingType[] = [
  "linear",
  "spring",
  "smooth",
  "snappy",
  "expo",
];
