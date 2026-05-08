import { Easing } from "remotion";
import { getEasing, type EasingName } from "./easings";

type EasingFn = (t: number) => number;

/**
 * Base GSAP easing type → Remotion easing function.
 *
 * GSAP power naming:
 *   power0 = Linear, power1 = Quad, power2 = Cubic,
 *   power3 = Quart (poly4), power4 = Quint (poly5)
 */
const BASE_EASINGS: Record<string, EasingFn> = {
  power0: Easing.linear,
  power1: Easing.quad,
  power2: Easing.cubic,
  power3: Easing.poly(4),
  power4: Easing.poly(5),
  expo: Easing.exp,
  circ: Easing.circle,
  sine: Easing.sin,
  bounce: Easing.bounce,
};

const DIRECTION_WRAPPERS: Record<string, (fn: EasingFn) => EasingFn> = {
  in: Easing.in,
  out: Easing.out,
  inOut: Easing.inOut,
};

/**
 * Pre-computed lookup for all GSAP easing strings used in the presets.
 * Covers every value in the easings preset object.
 */
const PRECOMPUTED: Record<string, EasingFn> = {
  // Linear
  none: Easing.linear,

  // Power1 (Quad)
  "power1.in": Easing.in(Easing.quad),
  "power1.out": Easing.out(Easing.quad),
  "power1.inOut": Easing.inOut(Easing.quad),

  // Power2 (Cubic)
  "power2.in": Easing.in(Easing.cubic),
  "power2.out": Easing.out(Easing.cubic),
  "power2.inOut": Easing.inOut(Easing.cubic),

  // Power3 (Quart)
  "power3.in": Easing.in(Easing.poly(4)),
  "power3.out": Easing.out(Easing.poly(4)),
  "power3.inOut": Easing.inOut(Easing.poly(4)),

  // Power4 (Quint)
  "power4.in": Easing.in(Easing.poly(5)),
  "power4.out": Easing.out(Easing.poly(5)),
  "power4.inOut": Easing.inOut(Easing.poly(5)),

  // Expo
  "expo.in": Easing.in(Easing.exp),
  "expo.out": Easing.out(Easing.exp),
  "expo.inOut": Easing.inOut(Easing.exp),

  // Circ
  "circ.in": Easing.in(Easing.circle),
  "circ.out": Easing.out(Easing.circle),
  "circ.inOut": Easing.inOut(Easing.circle),

  // Sine
  "sine.in": Easing.in(Easing.sin),
  "sine.out": Easing.out(Easing.sin),
  "sine.inOut": Easing.inOut(Easing.sin),

  // Back (with specific overshoot values used in presets)
  "back.out(1.4)": Easing.out(Easing.back(1.4)),
  "back.out(1.7)": Easing.out(Easing.back(1.7)),
  "back.out(2.5)": Easing.out(Easing.back(2.5)),
  "back.in(1.4)": Easing.in(Easing.back(1.4)),
  "back.in(1.7)": Easing.in(Easing.back(1.7)),
  "back.inOut(1.4)": Easing.inOut(Easing.back(1.4)),
  "back.inOut(1.7)": Easing.inOut(Easing.back(1.7)),

  // Elastic (Remotion elastic only takes bounciness, GSAP takes amplitude+period)
  "elastic.out(1, 0.3)": Easing.out(Easing.elastic(1)),
  "elastic.out(0.8, 0.4)": Easing.out(Easing.elastic(0.8)),
  "elastic.out(0.6, 0.5)": Easing.out(Easing.elastic(0.6)),
  "elastic.in(1, 0.3)": Easing.in(Easing.elastic(1)),
  "elastic.inOut(1, 0.3)": Easing.inOut(Easing.elastic(1)),

  // Bounce
  "bounce.in": Easing.in(Easing.bounce),
  "bounce.out": Easing.out(Easing.bounce),
  "bounce.inOut": Easing.inOut(Easing.bounce),
};

/**
 * Parse a GSAP easing string into a Remotion easing function.
 * Handles patterns like "power2.out", "back.out(1.7)", "elastic.out(1, 0.3)".
 *
 * Falls back to Easing.linear for unrecognized strings.
 */
function parseGsapEasing(gsapString: string): EasingFn {
  // Check precomputed first (fast path)
  if (gsapString in PRECOMPUTED) {
    return PRECOMPUTED[gsapString];
  }

  // Parse pattern: "<type>.<direction>(<params>)"
  const match = gsapString.match(
    /^(\w+)\.(in|out|inOut)(?:\(([^)]*)\))?$/
  );
  if (!match) return Easing.linear;

  const [, type, direction, paramsStr] = match;
  const wrap = DIRECTION_WRAPPERS[direction];
  if (!wrap) return Easing.linear;

  // Handle parameterized types
  if (type === "back") {
    const overshoot = paramsStr ? parseFloat(paramsStr) : 1.7;
    return wrap(Easing.back(overshoot));
  }
  if (type === "elastic") {
    const params = paramsStr ? paramsStr.split(",").map((s) => parseFloat(s.trim())) : [1];
    return wrap(Easing.elastic(params[0]));
  }
  if (type === "poly") {
    const power = paramsStr ? parseFloat(paramsStr) : 3;
    return wrap(Easing.poly(power));
  }

  // Handle base types
  const baseFn = BASE_EASINGS[type];
  if (baseFn) return wrap(baseFn);

  return Easing.linear;
}

/**
 * Convert an easing preset name or GSAP easing string to a Remotion easing function.
 *
 * Accepts:
 * - Preset names: "smooth", "bouncy", "appleSwift", etc.
 * - Raw GSAP strings: "power2.out", "back.out(1.7)", etc.
 *
 * @example
 * const easing = toRemotionEasing("smooth");       // preset name
 * const easing = toRemotionEasing("power2.out");    // GSAP string
 * const easing = toRemotionEasing("back.out(2.0)"); // parameterized
 *
 * interpolate(frame, [0, 30], [0, 1], { easing });
 */
export function toRemotionEasing(ease: EasingName | string): EasingFn {
  // Resolve preset name to GSAP string first
  const gsapString = getEasing(ease as EasingName);
  return parseGsapEasing(gsapString);
}
