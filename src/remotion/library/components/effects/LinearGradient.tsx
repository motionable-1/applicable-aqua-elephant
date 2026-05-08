import React, { useMemo, type CSSProperties, type ReactNode } from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  interpolate,
} from "remotion";

/**
 * A color stop in the gradient
 */
export interface ColorStop {
  /** The color value (hex, rgb, hsl, etc.) */
  color: string;
  /** Position in percentage (0-100). If not provided, colors are evenly distributed */
  position?: number;
}

/**
 * Preset directions for linear gradients
 */
export type GradientDirection =
  | "to-top"
  | "to-bottom"
  | "to-left"
  | "to-right"
  | "to-top-left"
  | "to-top-right"
  | "to-bottom-left"
  | "to-bottom-right";

const directionToAngle: Record<GradientDirection, number> = {
  "to-top": 0,
  "to-top-right": 45,
  "to-right": 90,
  "to-bottom-right": 135,
  "to-bottom": 180,
  "to-bottom-left": 225,
  "to-left": 270,
  "to-top-left": 315,
};

/**
 * Animation types for the gradient
 */
export type GradientAnimationType = 
  | "shift"      // Colors shift positions
  | "rotate"     // Gradient rotates
  | "pulse"      // Colors pulse in intensity
  | "breathe"    // Smooth breathing effect on color positions
  | "wave";      // Wave-like motion in color positions

export interface LinearGradientProps {
  /** 
   * Array of colors. Can be simple strings or ColorStop objects with positions.
   * Simple strings will be evenly distributed.
   * @example ["#000000", "#4a1a7a", "#b794d4"]
   * @example [{ color: "#000", position: 0 }, { color: "#fff", position: 100 }]
   */
  colors: ColorStop[] | string[];
  /** Direction as angle (0-360) or preset direction (default: "to-bottom") */
  direction?: number | GradientDirection;
  /** Enable animation */
  animate?: boolean;
  /** Animation type */
  animationType?: GradientAnimationType;
  /** Animation speed multiplier (default: 1) */
  speed?: number;
  /** Noise/grain overlay intensity (0-1) */
  noise?: number;
  /** Additional blur on the gradient for smoother transitions */
  blur?: number;
  /** Children to render on top */
  children?: ReactNode;
  /** Additional styles */
  style?: CSSProperties;
  /** Additional class name */
  className?: string;
}

/**
 * LinearGradient - A customizable linear gradient background component
 * 
 * Creates smooth linear gradients with multiple color stops and optional animation.
 * 
 * @example
 * // Simple colors (evenly distributed)
 * <LinearGradient colors={["#000000", "#4a1a7a", "#b794d4"]} />
 * 
 * @example
 * // With custom positions
 * <LinearGradient 
 *   colors={[
 *     { color: "#000000", position: 0 },
 *     { color: "#1a0a2e", position: 25 },
 *     { color: "#4a1a7a", position: 50 },
 *     { color: "#b794d4", position: 100 },
 *   ]}
 * />
 * 
 * @example
 * // With animation
 * <LinearGradient 
 *   colors={["#000", "#4a1a7a", "#b794d4"]}
 *   animate
 *   animationType="breathe"
 *   speed={0.3}
 * />
 * 
 * @example
 * // Horizontal gradient with noise
 * <LinearGradient 
 *   colors={["#000", "#333", "#666"]}
 *   direction="to-right"
 *   noise={0.05}
 * />
 */
export const LinearGradient: React.FC<LinearGradientProps> = ({
  colors,
  direction = "to-bottom",
  animate = false,
  animationType = "breathe",
  speed = 1,
  noise = 0,
  blur = 0,
  children,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Normalize colors to ColorStop array
  const colorStops = useMemo((): ColorStop[] => {
    if (!colors || colors.length === 0) {
      return [{ color: "#000000", position: 0 }, { color: "#ffffff", position: 100 }];
    }

    // Convert simple string array to ColorStop array
    if (typeof colors[0] === "string") {
      const simpleColors = colors as string[];
      return simpleColors.map((color, index) => ({
        color,
        position: (index / (simpleColors.length - 1)) * 100,
      }));
    }

    return colors as ColorStop[];
  }, [colors]);

  // Resolve angle from direction
  const baseAngle = useMemo(() => {
    if (typeof direction === "number") {
      return direction;
    }
    return directionToAngle[direction];
  }, [direction]);

  // Animation progress
  const animProgress = useMemo(() => {
    if (!animate) return 0;
    return (frame / fps) * speed;
  }, [animate, frame, fps, speed]);

  // Calculate animated gradient
  const gradientStyle = useMemo(() => {
    let angle = baseAngle;
    let stops = colorStops;

    if (animate && animProgress > 0) {
      switch (animationType) {
        case "rotate": {
          // Rotate the gradient direction
          angle = baseAngle + animProgress * 360;
          break;
        }
        
        case "shift": {
          // Shift color positions
          const shiftAmount = Math.sin(animProgress * Math.PI * 2) * 10;
          stops = colorStops.map((stop, index) => ({
            ...stop,
            position: Math.max(0, Math.min(100, 
              (stop.position ?? (index / (colorStops.length - 1)) * 100) + shiftAmount
            )),
          }));
          break;
        }
        
        case "pulse": {
          // Pulse colors brighter/darker (via opacity overlay later)
          break;
        }
        
        case "breathe": {
          // Smooth breathing effect on positions
          const breatheProgress = Math.sin(animProgress * Math.PI * 2) * 0.5 + 0.5;
          stops = colorStops.map((stop, index) => {
            const basePos = stop.position ?? (index / (colorStops.length - 1)) * 100;
            const centerPos = 50;
            const offset = (basePos - centerPos) * interpolate(
              breatheProgress,
              [0, 1],
              [0.95, 1.05],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );
            return {
              ...stop,
              position: Math.max(0, Math.min(100, centerPos + offset)),
            };
          });
          break;
        }
        
        case "wave": {
          // Wave motion through color stops
          stops = colorStops.map((stop, index) => {
            const basePos = stop.position ?? (index / (colorStops.length - 1)) * 100;
            const waveOffset = Math.sin(animProgress * Math.PI * 2 + index * 0.5) * 5;
            return {
              ...stop,
              position: Math.max(0, Math.min(100, basePos + waveOffset)),
            };
          });
          break;
        }
      }
    }

    // Build the gradient string
    const stopStrings = stops.map((stop, index) => {
      const pos = stop.position ?? (index / (stops.length - 1)) * 100;
      return `${stop.color} ${pos}%`;
    });

    return `linear-gradient(${angle}deg, ${stopStrings.join(", ")})`;
  }, [baseAngle, colorStops, animate, animProgress, animationType]);

  // Pulse animation overlay opacity
  const pulseOpacity = useMemo(() => {
    if (!animate || animationType !== "pulse") return 0;
    return interpolate(
      Math.sin(animProgress * Math.PI * 2),
      [-1, 1],
      [0, 0.1],
      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
    );
  }, [animate, animationType, animProgress]);

  return (
    <AbsoluteFill
      className={className}
      style={{
        background: gradientStyle,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        ...style,
      }}
    >
      {/* Pulse animation overlay */}
      {animate && animationType === "pulse" && (
        <AbsoluteFill
          style={{
            background: "white",
            opacity: pulseOpacity,
            mixBlendMode: "soft-light",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Noise overlay */}
      {noise > 0 && (
        <AbsoluteFill
          style={{
            opacity: noise,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />
      )}

      {children}
    </AbsoluteFill>
  );
};

export default LinearGradient;
