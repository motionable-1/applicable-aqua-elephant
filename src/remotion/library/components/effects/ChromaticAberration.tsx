import React, { useId, useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChromaticAberrationProps {
  /** Content to apply the chromatic aberration effect to */
  children: React.ReactNode;
  /** Offset intensity in pixels (default 4) */
  intensity?: number;
  /** Direction of the RGB channel split (default "horizontal") */
  direction?: "horizontal" | "vertical" | "diagonal" | "radial";
  /** Animate the intensity over time (default false) */
  animated?: boolean;
  /** Oscillation speed in Hz when animated (default 2) */
  animationSpeed?: number;
  /** Custom red channel offset — overrides direction */
  redOffset?: { x: number; y: number };
  /** Custom blue channel offset — overrides direction */
  blueOffset?: { x: number; y: number };
  /** CSS mix-blend-mode for the colour layers (default "screen") */
  blendMode?: string;
  /** Additional CSS class names */
  className?: string;
  /** Additional CSS styles */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Compute directional offsets for the red and blue channels given a base
 * `intensity` value and a named direction.
 *
 * For the "radial" direction we derive the angle deterministically from the
 * current frame and fps so the offset smoothly rotates.
 */
function getDirectionOffsets(
  direction: "horizontal" | "vertical" | "diagonal" | "radial",
  intensity: number,
  frame: number,
  fps: number,
): { red: { x: number; y: number }; blue: { x: number; y: number } } {
  switch (direction) {
    case "horizontal":
      return {
        red: { x: -intensity, y: 0 },
        blue: { x: intensity, y: 0 },
      };
    case "vertical":
      return {
        red: { x: 0, y: -intensity },
        blue: { x: 0, y: intensity },
      };
    case "diagonal":
      // 45-degree split — divide by sqrt(2) to maintain perceived magnitude
      {
        const diag = intensity / Math.SQRT2;
        return {
          red: { x: -diag, y: -diag },
          blue: { x: diag, y: diag },
        };
      }
    case "radial":
      // Rotate the offset vector smoothly based on frame time
      {
        const angle = (frame / fps) * Math.PI * 2; // one full rotation per second
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return {
          red: { x: -intensity * cos, y: -intensity * sin },
          blue: { x: intensity * cos, y: intensity * sin },
        };
      }
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Chromatic aberration / RGB channel-split overlay effect.
 *
 * Renders children three times — red, green (original) and blue layers —
 * stacked with absolute positioning. Red and blue layers are offset and
 * isolated via inline SVG `feColorMatrix` filters, then composited with
 * `mix-blend-mode: screen` (default) on a black background so additive
 * blending reconstructs the original image in the centre while the edges
 * show the characteristic colour fringing.
 *
 * @example
 * // Static horizontal chromatic aberration
 * <ChromaticAberration intensity={6}>
 *   <img src="photo.jpg" style={{ width: "100%", height: "100%" }} />
 * </ChromaticAberration>
 *
 * @example
 * // Animated diagonal split
 * <ChromaticAberration intensity={8} direction="diagonal" animated animationSpeed={3}>
 *   <h1>GLITCH</h1>
 * </ChromaticAberration>
 *
 * @example
 * // Custom offsets
 * <ChromaticAberration redOffset={{ x: -6, y: 2 }} blueOffset={{ x: 4, y: -3 }}>
 *   <div>Content</div>
 * </ChromaticAberration>
 */
export const ChromaticAberration: React.FC<ChromaticAberrationProps> = ({
  children,
  intensity = 4,
  direction = "horizontal",
  animated = false,
  animationSpeed = 2,
  redOffset: redOffsetProp,
  blueOffset: blueOffsetProp,
  blendMode = "screen",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Unique IDs for inline SVG filters so multiple instances don't collide
  const instanceId = useId();
  const redFilterId = `${instanceId}-ca-red`;
  const blueFilterId = `${instanceId}-ca-blue`;

  // Resolve effective intensity (may be modulated by animation)
  const effectiveIntensity = useMemo(() => {
    if (!animated) return intensity;
    // Oscillate between 0 and intensity at the given Hz
    const t = (frame / fps) * animationSpeed * Math.PI * 2;
    return Math.abs(Math.sin(t)) * intensity;
  }, [animated, intensity, frame, fps, animationSpeed]);

  // Resolve per-channel offsets
  const { redOff, blueOff } = useMemo(() => {
    if (redOffsetProp || blueOffsetProp) {
      // When custom offsets are provided, scale them by the animation
      // modulator (effectiveIntensity / intensity) so animation still works.
      const scale = intensity !== 0 ? effectiveIntensity / intensity : 1;
      return {
        redOff: redOffsetProp
          ? { x: redOffsetProp.x * scale, y: redOffsetProp.y * scale }
          : { x: 0, y: 0 },
        blueOff: blueOffsetProp
          ? { x: blueOffsetProp.x * scale, y: blueOffsetProp.y * scale }
          : { x: 0, y: 0 },
      };
    }

    const offsets = getDirectionOffsets(
      direction,
      effectiveIntensity,
      frame,
      fps,
    );
    return { redOff: offsets.red, blueOff: offsets.blue };
  }, [
    redOffsetProp,
    blueOffsetProp,
    direction,
    effectiveIntensity,
    intensity,
    frame,
    fps,
  ]);

  // Shared absolute-fill style for the channel layers
  const layerBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    // Prevent clipped edges when the layer is translated
    overflow: "hidden",
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        // Black background is essential for additive (screen) blending to
        // reconstruct the original colours correctly.
        backgroundColor: "#000",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Inline SVG filter definitions (hidden, zero-size) */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <defs>
          {/* Isolate the red channel: keep R, zero out G & B */}
          <filter id={redFilterId} colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          {/* Isolate the blue channel: zero out R & G, keep B */}
          <filter id={blueFilterId} colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      {/* ---- Green / base layer (original colours, no filter) ---- */}
      <div
        style={{
          ...layerBase,
          // Green channel isolation — keeps only G
          // We use a filter here too so it blends correctly with the other two
          // additive layers. Without this, the green layer would contribute
          // its full RGB and the composite would be over-bright.
          // However, a dedicated green filter is only necessary when using
          // additive blending (screen). When the user picks a different blend
          // mode the green layer acts as the unfiltered base.
          mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
        }}
      >
        {children}
      </div>

      {/* ---- Red layer ---- */}
      <div
        style={{
          ...layerBase,
          filter: `url(#${redFilterId})`,
          transform: `translate(${redOff.x}px, ${redOff.y}px)`,
          mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
        }}
      >
        {children}
      </div>

      {/* ---- Blue layer ---- */}
      <div
        style={{
          ...layerBase,
          filter: `url(#${blueFilterId})`,
          transform: `translate(${blueOff.x}px, ${blueOff.y}px)`,
          mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ChromaticAberration;
