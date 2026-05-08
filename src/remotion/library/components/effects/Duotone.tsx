import React, { useId, useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DuotonePreset =
  | "midnight"
  | "sunset"
  | "neon"
  | "vintage"
  | "ocean"
  | "fire"
  | "forest"
  | "candy"
  | "monochrome";

export interface DuotoneProps {
  /** Content to apply duotone effect to */
  children: React.ReactNode;
  /** Dark tone color (default "#1a1a2e") */
  shadowColor?: string;
  /** Light tone color (default "#e94560") */
  highlightColor?: string;
  /** Named preset — overrides shadowColor and highlightColor */
  preset?: DuotonePreset;
  /** Blend intensity 0-1 (default 1) */
  intensity?: number;
  /** Animate the blend-in (default false) */
  animated?: boolean;
  /** Animation duration in seconds (default 0.5) */
  duration?: number;
  /** Delay before animation in seconds (default 0) */
  delay?: number;
  /** Additional CSS class names */
  className?: string;
  /** Additional CSS styles */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Preset definitions
// ---------------------------------------------------------------------------

const PRESETS: Record<DuotonePreset, { shadow: string; highlight: string }> = {
  midnight:   { shadow: "#0d1b2a", highlight: "#415a77" },
  sunset:     { shadow: "#2d0b41", highlight: "#ff6b35" },
  neon:       { shadow: "#0a0a2e", highlight: "#00ff88" },
  vintage:    { shadow: "#3d2b1f", highlight: "#d4a574" },
  ocean:      { shadow: "#0b132b", highlight: "#3a86ff" },
  fire:       { shadow: "#1a0000", highlight: "#ff4500" },
  forest:     { shadow: "#0a1a0a", highlight: "#4ade80" },
  candy:      { shadow: "#2d1b4e", highlight: "#f472b6" },
  monochrome: { shadow: "#111111", highlight: "#cccccc" },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Parse a hex color string (#RGB or #RRGGBB) into normalised [r, g, b] (0-1). */
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  let r: number;
  let g: number;
  let b: number;

  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
  } else {
    r = parseInt(clean.slice(0, 2), 16);
    g = parseInt(clean.slice(2, 4), 16);
    b = parseInt(clean.slice(4, 6), 16);
  }

  return [r / 255, g / 255, b / 255];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Duotone / split-tone color grading effect.
 *
 * Converts children to grayscale then maps dark values to `shadowColor` and
 * bright values to `highlightColor` using an SVG `feComponentTransfer` filter.
 *
 * @example
 * // Static duotone with custom colors
 * <Duotone shadowColor="#1a1a2e" highlightColor="#e94560">
 *   <img src="photo.jpg" style={{ width: "100%" }} />
 * </Duotone>
 *
 * @example
 * // Using a preset with animated blend-in
 * <Duotone preset="neon" animated duration={0.8}>
 *   <video src="footage.mp4" />
 * </Duotone>
 */
export const Duotone: React.FC<DuotoneProps> = ({
  children,
  shadowColor: shadowColorProp = "#1a1a2e",
  highlightColor: highlightColorProp = "#e94560",
  preset,
  intensity = 1,
  animated = false,
  duration = 0.5,
  delay = 0,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const instanceId = useId();
  const filterId = `${instanceId}-duotone`;

  // Resolve colours — preset wins over explicit props
  const shadowColor = preset ? PRESETS[preset].shadow : shadowColorProp;
  const highlightColor = preset ? PRESETS[preset].highlight : highlightColorProp;

  // Animated intensity
  const effectiveIntensity = useMemo(() => {
    if (!animated) return intensity;
    const delayFrames = Math.round(delay * fps);
    const durationFrames = Math.max(1, Math.round(duration * fps));
    return interpolate(frame - delayFrames, [0, durationFrames], [0, intensity], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    });
  }, [animated, intensity, frame, fps, delay, duration]);

  // Parse colours and build feComponentTransfer table values
  const { tableR, tableG, tableB } = useMemo(() => {
    const [sr, sg, sb] = hexToRgb(shadowColor);
    const [hr, hg, hb] = hexToRgb(highlightColor);
    return {
      tableR: `${sr} ${hr}`,
      tableG: `${sg} ${hg}`,
      tableB: `${sb} ${hb}`,
    };
  }, [shadowColor, highlightColor]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {/* Inline SVG filter definition */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            {/* Step 1: convert to luminance grayscale */}
            <feColorMatrix
              type="matrix"
              values="0.2126 0.7152 0.0722 0 0
                      0.2126 0.7152 0.0722 0 0
                      0.2126 0.7152 0.0722 0 0
                      0      0      0      1 0"
            />
            {/* Step 2: remap grayscale to duotone via table lookup */}
            <feComponentTransfer>
              <feFuncR type="table" tableValues={tableR} />
              <feFuncG type="table" tableValues={tableG} />
              <feFuncB type="table" tableValues={tableB} />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* Filtered layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: `url(#${filterId})`,
          opacity: effectiveIntensity,
        }}
      >
        {children}
      </div>

      {/* Original layer underneath — visible when intensity < 1 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 1 - effectiveIntensity,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Duotone;
