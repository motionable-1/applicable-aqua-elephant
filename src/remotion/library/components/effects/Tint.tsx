import React, { useMemo, type CSSProperties, type ReactNode } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

/**
 * Tint mode types.
 */
export type TintMode =
  | "overlay" // Solid color overlay
  | "gradient" // Gradient overlay
  | "duotone" // Two-tone color mapping
  | "multiply" // Multiply blend
  | "screen" // Screen blend
  | "colorBurn" // Color burn blend
  | "softLight"; // Soft light blend

/**
 * Preset tint styles.
 */
export type TintPreset =
  | "warm" // Warm orange/yellow tint
  | "cool" // Cool blue tint
  | "sepia" // Classic sepia
  | "vintage" // Vintage film look
  | "noir" // Black and white with contrast
  | "cinema" // Cinematic teal/orange
  | "sunset" // Golden hour look
  | "moonlight" // Blue night look
  | "rose" // Pink/rose tint
  | "emerald" // Green tint
  | "purple" // Purple/violet tint
  | "golden"; // Golden/champagne tint

/**
 * Props for Tint component.
 */
export interface TintProps {
  /** Content to apply tint to */
  children: ReactNode;
  /** Tint color (for overlay, multiply, etc.) */
  color?: string;
  /** Secondary color (for gradient or duotone) */
  secondaryColor?: string;
  /** Gradient angle in degrees (for gradient mode) */
  gradientAngle?: number;
  /** Tint mode/blend mode */
  mode?: TintMode;
  /** Use a preset tint style */
  preset?: TintPreset;
  /** Intensity of the tint (0-1) */
  intensity?: number;
  /** Animate the tint intensity */
  animate?: boolean;
  /** Animation duration in seconds */
  animationDuration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Animate from this intensity */
  animateFrom?: number;
  /** Animate to this intensity */
  animateTo?: number;
  /** Additional filter effects (brightness, contrast, saturate) */
  brightness?: number;
  contrast?: number;
  saturate?: number;
  /** Additional styles */
  style?: CSSProperties;
  className?: string;
}

/**
 * Get preset configuration.
 */
function getPresetConfig(preset: TintPreset): {
  color: string;
  secondaryColor?: string;
  mode: TintMode;
  brightness?: number;
  contrast?: number;
  saturate?: number;
  filter?: string;
} {
  switch (preset) {
    case "warm":
      return {
        color: "rgba(255, 166, 77, 0.3)",
        mode: "overlay",
        brightness: 1.05,
        saturate: 1.1,
      };
    case "cool":
      return {
        color: "rgba(77, 166, 255, 0.25)",
        mode: "overlay",
        brightness: 1,
        contrast: 1.05,
      };
    case "sepia":
      return {
        color: "rgba(112, 66, 20, 0.4)",
        mode: "overlay",
        saturate: 0.8,
        filter: "sepia(0.3)",
      };
    case "vintage":
      return {
        color: "rgba(255, 235, 205, 0.2)",
        secondaryColor: "rgba(50, 30, 60, 0.15)",
        mode: "gradient",
        brightness: 0.95,
        contrast: 1.1,
        saturate: 0.85,
      };
    case "noir":
      return {
        color: "rgba(0, 0, 0, 0)",
        mode: "overlay",
        saturate: 0,
        contrast: 1.3,
        brightness: 0.95,
      };
    case "cinema":
      return {
        color: "rgba(0, 128, 128, 0.15)",
        secondaryColor: "rgba(255, 140, 0, 0.1)",
        mode: "gradient",
        contrast: 1.1,
        saturate: 0.9,
      };
    case "sunset":
      return {
        color: "rgba(255, 140, 0, 0.25)",
        secondaryColor: "rgba(255, 80, 120, 0.2)",
        mode: "gradient",
        brightness: 1.05,
        saturate: 1.15,
      };
    case "moonlight":
      return {
        color: "rgba(100, 149, 237, 0.3)",
        mode: "overlay",
        brightness: 0.9,
        contrast: 1.15,
        saturate: 0.7,
      };
    case "rose":
      return {
        color: "rgba(255, 105, 180, 0.2)",
        mode: "overlay",
        brightness: 1.02,
        saturate: 1.05,
      };
    case "emerald":
      return {
        color: "rgba(16, 185, 129, 0.2)",
        mode: "overlay",
        saturate: 1.1,
      };
    case "purple":
      return {
        color: "rgba(139, 92, 246, 0.25)",
        mode: "overlay",
        contrast: 1.05,
      };
    case "golden":
      return {
        color: "rgba(255, 215, 0, 0.2)",
        secondaryColor: "rgba(255, 180, 100, 0.15)",
        mode: "gradient",
        brightness: 1.05,
        saturate: 1.1,
      };
    default:
      return { color: "transparent", mode: "overlay" };
  }
}

/**
 * Get blend mode CSS value.
 */
function getBlendMode(mode: TintMode): CSSProperties["mixBlendMode"] {
  switch (mode) {
    case "multiply":
      return "multiply";
    case "screen":
      return "screen";
    case "colorBurn":
      return "color-burn";
    case "softLight":
      return "soft-light";
    case "overlay":
    case "gradient":
    case "duotone":
    default:
      return "normal";
  }
}

/**
 * Tint component for applying color overlays and effects.
 *
 * @example
 * // Simple color overlay
 * <Tint color="rgba(255, 100, 50, 0.3)">
 *   <img src="photo.jpg" />
 * </Tint>
 *
 * @example
 * // Using a preset
 * <Tint preset="cinema" intensity={0.8}>
 *   <video src="footage.mp4" />
 * </Tint>
 *
 * @example
 * // Animated tint
 * <Tint preset="sunset" animate animateFrom={0} animateTo={1}>
 *   <div>Content</div>
 * </Tint>
 */
export const Tint: React.FC<TintProps> = ({
  children,
  color: colorProp,
  secondaryColor: secondaryColorProp,
  gradientAngle = 180,
  mode: modeProp = "overlay",
  preset,
  intensity = 1,
  animate = false,
  animationDuration = 1,
  delay = 0,
  animateFrom = 0,
  animateTo = 1,
  brightness: brightnessProp,
  contrast: contrastProp,
  saturate: saturateProp,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Get preset config if using preset
  const presetConfig = preset ? getPresetConfig(preset) : null;

  const color = colorProp || presetConfig?.color || "rgba(0, 0, 0, 0.2)";
  const secondaryColor = secondaryColorProp || presetConfig?.secondaryColor;
  const mode = preset ? presetConfig?.mode || modeProp : modeProp;
  const brightness = brightnessProp ?? presetConfig?.brightness ?? 1;
  const contrast = contrastProp ?? presetConfig?.contrast ?? 1;
  const saturate = saturateProp ?? presetConfig?.saturate ?? 1;
  const extraFilter = presetConfig?.filter || "";

  // Animation
  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.round(animationDuration * fps);

  const animatedIntensity = useMemo(() => {
    if (!animate) return intensity;
    return interpolate(
      frame - delayFrames,
      [0, durationFrames],
      [animateFrom, animateTo],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.cubic),
      },
    );
  }, [
    animate,
    frame,
    delayFrames,
    durationFrames,
    animateFrom,
    animateTo,
    intensity,
  ]);

  const effectiveIntensity = animate ? animatedIntensity : intensity;

  // Build tint overlay background
  const getTintBackground = (): string => {
    if (mode === "gradient" && secondaryColor) {
      return `linear-gradient(${gradientAngle}deg, ${color}, ${secondaryColor})`;
    }
    if (mode === "duotone") {
      // Duotone uses a gradient from shadows to highlights
      return `linear-gradient(${gradientAngle}deg, ${color} 0%, ${secondaryColor || color} 100%)`;
    }
    return color;
  };

  // Build filter string
  const filterString = useMemo(() => {
    const filters: string[] = [];
    if (brightness !== 1) filters.push(`brightness(${brightness})`);
    if (contrast !== 1) filters.push(`contrast(${contrast})`);
    if (saturate !== 1) filters.push(`saturate(${saturate})`);
    if (extraFilter) filters.push(extraFilter);
    return filters.length > 0 ? filters.join(" ") : "none";
  }, [brightness, contrast, saturate, extraFilter]);

  const blendMode = getBlendMode(mode);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        ...style,
      }}
    >
      {/* Content with filter */}
      <div
        style={{
          filter: filterString,
        }}
      >
        {children}
      </div>

      {/* Tint overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: getTintBackground(),
          mixBlendMode: blendMode,
          opacity: effectiveIntensity,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

// ============================================================================
// Preset Components
// ============================================================================

export const WarmTint: React.FC<Omit<TintProps, "preset">> = (props) => (
  <Tint {...props} preset="warm" />
);

export const CoolTint: React.FC<Omit<TintProps, "preset">> = (props) => (
  <Tint {...props} preset="cool" />
);

export const SepiaTint: React.FC<Omit<TintProps, "preset">> = (props) => (
  <Tint {...props} preset="sepia" />
);

export const VintageTint: React.FC<Omit<TintProps, "preset">> = (props) => (
  <Tint {...props} preset="vintage" />
);

export const NoirTint: React.FC<Omit<TintProps, "preset">> = (props) => (
  <Tint {...props} preset="noir" />
);

export const CinemaTint: React.FC<Omit<TintProps, "preset">> = (props) => (
  <Tint {...props} preset="cinema" />
);

export const SunsetTint: React.FC<Omit<TintProps, "preset">> = (props) => (
  <Tint {...props} preset="sunset" />
);

export const MoonlightTint: React.FC<Omit<TintProps, "preset">> = (props) => (
  <Tint {...props} preset="moonlight" />
);

export const RoseTint: React.FC<Omit<TintProps, "preset">> = (props) => (
  <Tint {...props} preset="rose" />
);

export const EmeraldTint: React.FC<Omit<TintProps, "preset">> = (props) => (
  <Tint {...props} preset="emerald" />
);

export const PurpleTint: React.FC<Omit<TintProps, "preset">> = (props) => (
  <Tint {...props} preset="purple" />
);

export const GoldenTint: React.FC<Omit<TintProps, "preset">> = (props) => (
  <Tint {...props} preset="golden" />
);

export default Tint;
