/**
 * Shadow presets for professional motion design.
 * Includes soft, hard, layered, glow, and dramatic shadow styles.
 */

/**
 * Shadow preset names.
 */
export type ShadowName =
  // Subtle shadows
  | "subtle"
  | "soft"
  | "medium"
  // Elevated shadows (Material-style)
  | "elevated-1"
  | "elevated-2"
  | "elevated-3"
  | "elevated-4"
  | "elevated-5"
  // Soft diffused shadows
  | "diffused"
  | "dreamy"
  | "cloud"
  // Sharp shadows
  | "sharp"
  | "hard"
  | "crisp"
  // Layered shadows (multiple layers for depth)
  | "layered"
  | "layered-soft"
  | "layered-color"
  // Glow effects
  | "glow"
  | "glow-soft"
  | "glow-intense"
  | "neon"
  // Colored shadows
  | "color-blue"
  | "color-purple"
  | "color-pink"
  | "color-orange"
  | "color-green"
  | "color-cyan"
  // Dramatic shadows
  | "dramatic"
  | "cinematic"
  | "noir"
  // Long shadows
  | "long"
  | "long-soft"
  // Inner shadows
  | "inner"
  | "inner-soft"
  // Special effects
  | "float"
  | "hover"
  | "pressed"
  | "card"
  | "modal"
  | "dropdown"
  | "button"
  | "text"
  | "none";

/**
 * Shadow preset definitions.
 */
export const shadows: Record<ShadowName, string> = {
  // No shadow
  none: "none",

  // Subtle shadows - barely visible, great for subtle depth
  subtle: "0 1px 2px rgba(0, 0, 0, 0.05)",
  soft: "0 2px 8px rgba(0, 0, 0, 0.08)",
  medium: "0 4px 12px rgba(0, 0, 0, 0.1)",

  // Elevated shadows - Material Design inspired, progressive elevation
  "elevated-1": "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  "elevated-2": "0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)",
  "elevated-3": "0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)",
  "elevated-4":
    "0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)",
  "elevated-5": "0 20px 40px rgba(0, 0, 0, 0.2)",

  // Soft diffused shadows - very blurry, modern look
  diffused: "0 8px 30px rgba(0, 0, 0, 0.12)",
  dreamy: "0 15px 50px rgba(0, 0, 0, 0.1)",
  cloud: "0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.06)",

  // Sharp shadows - minimal blur, retro/bold look
  sharp: "4px 4px 0 rgba(0, 0, 0, 0.2)",
  hard: "6px 6px 0 rgba(0, 0, 0, 0.25)",
  crisp: "2px 2px 0 rgba(0, 0, 0, 0.15)",

  // Layered shadows - multiple layers for realistic depth
  layered: `
    0 1px 1px rgba(0, 0, 0, 0.08),
    0 2px 2px rgba(0, 0, 0, 0.08),
    0 4px 4px rgba(0, 0, 0, 0.08),
    0 8px 8px rgba(0, 0, 0, 0.08),
    0 16px 16px rgba(0, 0, 0, 0.08)
  `
    .trim()
    .replace(/\s+/g, " "),
  "layered-soft": `
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 8px 16px rgba(0, 0, 0, 0.04),
    0 16px 32px rgba(0, 0, 0, 0.04),
    0 32px 64px rgba(0, 0, 0, 0.04)
  `
    .trim()
    .replace(/\s+/g, " "),
  "layered-color": `
    0 2px 4px rgba(99, 102, 241, 0.1),
    0 4px 8px rgba(99, 102, 241, 0.1),
    0 8px 16px rgba(99, 102, 241, 0.1),
    0 16px 32px rgba(99, 102, 241, 0.05)
  `
    .trim()
    .replace(/\s+/g, " "),

  // Glow effects - light emanating from element
  glow: "0 0 20px rgba(255, 255, 255, 0.3)",
  "glow-soft": "0 0 40px rgba(255, 255, 255, 0.2)",
  "glow-intense":
    "0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3)",
  neon: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor",

  // Colored shadows - modern colored shadow effects
  "color-blue": "0 10px 40px rgba(59, 130, 246, 0.4)",
  "color-purple": "0 10px 40px rgba(139, 92, 246, 0.4)",
  "color-pink": "0 10px 40px rgba(236, 72, 153, 0.4)",
  "color-orange": "0 10px 40px rgba(249, 115, 22, 0.4)",
  "color-green": "0 10px 40px rgba(34, 197, 94, 0.4)",
  "color-cyan": "0 10px 40px rgba(6, 182, 212, 0.4)",

  // Dramatic shadows - bold, cinematic look
  dramatic: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  cinematic:
    "0 30px 60px -15px rgba(0, 0, 0, 0.4), 0 10px 20px -10px rgba(0, 0, 0, 0.2)",
  noir: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 0, 0, 0.1)",

  // Long shadows - extended directional shadows
  long: "8px 8px 0 rgba(0, 0, 0, 0.15), 16px 16px 0 rgba(0, 0, 0, 0.1), 24px 24px 0 rgba(0, 0, 0, 0.05)",
  "long-soft":
    "4px 4px 8px rgba(0, 0, 0, 0.1), 8px 8px 16px rgba(0, 0, 0, 0.08), 16px 16px 32px rgba(0, 0, 0, 0.05)",

  // Inner shadows - inset effects
  inner: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
  "inner-soft": "inset 0 4px 8px rgba(0, 0, 0, 0.06)",

  // Component-specific shadows
  float: "0 12px 28px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)",
  hover: "0 14px 32px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)",
  pressed: "0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.1)",
  card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  modal: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
  dropdown:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  button: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
  text: "0 2px 4px rgba(0, 0, 0, 0.3)",
};

/**
 * Get a shadow preset by name.
 *
 * @example
 * const shadow = getShadow("elevated-3");
 * // Returns: "0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)"
 */
export function getShadow(name: ShadowName): string {
  return shadows[name] ?? shadows.medium;
}

/**
 * Create a colored shadow with custom color.
 *
 * @example
 * const shadow = createColorShadow("#ff0080", 0.4, 40);
 * // Returns: "0 10px 40px rgba(255, 0, 128, 0.4)"
 */
export function createColorShadow(
  color: string,
  opacity: number = 0.4,
  blur: number = 40,
  offsetY: number = 10,
): string {
  // Convert hex to RGB if needed
  let r = 0,
    g = 0,
    b = 0;

  if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
  } else if (color.startsWith("rgb")) {
    const match = color.match(/\d+/g);
    if (match) {
      [r, g, b] = match.map(Number);
    }
  }

  return `0 ${offsetY}px ${blur}px rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Create a layered shadow with custom depth.
 *
 * @example
 * const shadow = createLayeredShadow(5, 0.08);
 * // Returns multi-layer shadow string
 */
export function createLayeredShadow(
  layers: number = 5,
  baseOpacity: number = 0.08,
): string {
  const shadowLayers: string[] = [];

  for (let i = 0; i < layers; i++) {
    const size = Math.pow(2, i + 1);
    const opacity = baseOpacity * (1 - i * 0.1);
    shadowLayers.push(
      `0 ${size}px ${size}px rgba(0, 0, 0, ${opacity.toFixed(3)})`,
    );
  }

  return shadowLayers.join(", ");
}

/**
 * Create a glow effect with custom color.
 *
 * @example
 * const glow = createGlow("#3b82f6", 0.5, 30);
 * // Returns: "0 0 30px rgba(59, 130, 246, 0.5)"
 */
export function createGlow(
  color: string,
  opacity: number = 0.5,
  blur: number = 30,
): string {
  // Reuse color parsing from createColorShadow
  let r = 0,
    g = 0,
    b = 0;

  if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
  } else if (color.startsWith("rgb")) {
    const match = color.match(/\d+/g);
    if (match) {
      [r, g, b] = match.map(Number);
    }
  }

  return `0 0 ${blur}px rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Create a neon glow effect with multiple layers.
 *
 * @example
 * const neon = createNeonGlow("#ff00ff");
 * // Returns multi-layer neon glow
 */
export function createNeonGlow(color: string): string {
  let r = 0,
    g = 0,
    b = 0;

  if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
  }

  return `0 0 5px rgba(${r}, ${g}, ${b}, 0.8), 0 0 10px rgba(${r}, ${g}, ${b}, 0.6), 0 0 20px rgba(${r}, ${g}, ${b}, 0.4), 0 0 40px rgba(${r}, ${g}, ${b}, 0.2)`;
}

export default shadows;
