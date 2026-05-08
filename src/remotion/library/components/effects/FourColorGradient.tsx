import React, { useMemo, type CSSProperties, type ReactNode } from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolateColors,
  AbsoluteFill,
} from "remotion";

/**
 * Position configuration for a color point.
 */
export interface ColorPoint {
  /** X position (0-100, percentage from left) */
  x: number;
  /** Y position (0-100, percentage from top) */
  y: number;
}

/**
 * Animation types for the gradient
 */
export type FourColorAnimationType = "rotate" | "pulse" | "shift" | "wave";

/**
 * Props for FourColorGradient component.
 */
export interface FourColorGradientProps {
  /** Top-left color */
  topLeft: string;
  /** Top-right color */
  topRight: string;
  /** Bottom-left color */
  bottomLeft: string;
  /** Bottom-right color */
  bottomRight: string;
  /** 
   * Custom positions for color points.
   * Each position has x and y values from 0-100 (percentage).
   * Default: corners (0,0), (100,0), (0,100), (100,100)
   */
  positions?: {
    topLeft?: ColorPoint;
    topRight?: ColorPoint;
    bottomLeft?: ColorPoint;
    bottomRight?: ColorPoint;
  };
  /** Blend radius/softness (higher = softer blend, default: 70) */
  blend?: number;
  /** Animate the gradient */
  animate?: boolean;
  /** Animation speed (lower = slower, default: 0.5) */
  speed?: number;
  /** Animation type */
  animationType?: FourColorAnimationType;
  /** Noise/grain overlay intensity (0-1, default: 0) */
  noise?: number;
  /** Children to render on top */
  children?: ReactNode;
  /** Additional styles */
  style?: CSSProperties;
  /** Additional class name */
  className?: string;
}

/**
 * FourColorGradient - A customizable 4-color radial gradient component
 * 
 * Creates smooth blends between 4 colors positioned at different points,
 * similar to After Effects' 4-color gradient effect.
 *
 * @example
 * // Basic usage with 4 colors
 * <FourColorGradient
 *   topLeft="#22d3ee"
 *   topRight="#a855f7"
 *   bottomLeft="#10b981"
 *   bottomRight="#6366f1"
 * />
 *
 * @example
 * // With custom positions
 * <FourColorGradient
 *   topLeft="#ff0000"
 *   topRight="#00ff00"
 *   bottomLeft="#0000ff"
 *   bottomRight="#ffff00"
 *   positions={{
 *     topLeft: { x: 25, y: 25 },
 *     topRight: { x: 75, y: 25 },
 *     bottomLeft: { x: 25, y: 75 },
 *     bottomRight: { x: 75, y: 75 },
 *   }}
 * />
 *
 * @example
 * // Animated gradient
 * <FourColorGradient
 *   topLeft="#fb923c"
 *   topRight="#f472b6"
 *   bottomLeft="#fbbf24"
 *   bottomRight="#f87171"
 *   animate
 *   animationType="rotate"
 *   speed={0.3}
 * />
 */
export const FourColorGradient: React.FC<FourColorGradientProps> = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  positions: positionsProp,
  blend = 70,
  animate = false,
  speed = 0.5,
  animationType = "rotate",
  noise = 0,
  children,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Default corner positions
  const defaultPositions = {
    topLeft: { x: 0, y: 0 },
    topRight: { x: 100, y: 0 },
    bottomLeft: { x: 0, y: 100 },
    bottomRight: { x: 100, y: 100 },
  };

  // Merge with custom positions
  const positions = {
    topLeft: positionsProp?.topLeft || defaultPositions.topLeft,
    topRight: positionsProp?.topRight || defaultPositions.topRight,
    bottomLeft: positionsProp?.bottomLeft || defaultPositions.bottomLeft,
    bottomRight: positionsProp?.bottomRight || defaultPositions.bottomRight,
  };

  // Animation calculations
  const animationProgress = useMemo(() => {
    if (!animate) return 0;
    return (frame / fps) * speed;
  }, [animate, frame, fps, speed]);

  // Calculate animated positions
  const animatedPositions = useMemo(() => {
    if (!animate) return positions;

    const t = animationProgress;

    switch (animationType) {
      case "rotate": {
        // Rotate positions around center
        const centerX = 50;
        const centerY = 50;
        const rotationAngle = t * Math.PI * 2;

        const rotatePoint = (p: ColorPoint): ColorPoint => {
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const cos = Math.cos(rotationAngle);
          const sin = Math.sin(rotationAngle);
          return {
            x: centerX + dx * cos - dy * sin,
            y: centerY + dx * sin + dy * cos,
          };
        };

        return {
          topLeft: rotatePoint(positions.topLeft),
          topRight: rotatePoint(positions.topRight),
          bottomLeft: rotatePoint(positions.bottomLeft),
          bottomRight: rotatePoint(positions.bottomRight),
        };
      }

      case "pulse": {
        // Pulse positions toward/away from center
        const scale = 0.8 + Math.sin(t * Math.PI * 2) * 0.2;
        const centerX = 50;
        const centerY = 50;

        const scalePoint = (p: ColorPoint): ColorPoint => ({
          x: centerX + (p.x - centerX) * scale,
          y: centerY + (p.y - centerY) * scale,
        });

        return {
          topLeft: scalePoint(positions.topLeft),
          topRight: scalePoint(positions.topRight),
          bottomLeft: scalePoint(positions.bottomLeft),
          bottomRight: scalePoint(positions.bottomRight),
        };
      }

      case "shift": {
        // Shift positions in a circular pattern
        const offsetX = Math.sin(t * Math.PI * 2) * 15;
        const offsetY = Math.cos(t * Math.PI * 2) * 15;

        return {
          topLeft: {
            x: positions.topLeft.x + offsetX,
            y: positions.topLeft.y + offsetY,
          },
          topRight: {
            x: positions.topRight.x - offsetX,
            y: positions.topRight.y + offsetY,
          },
          bottomLeft: {
            x: positions.bottomLeft.x + offsetX,
            y: positions.bottomLeft.y - offsetY,
          },
          bottomRight: {
            x: positions.bottomRight.x - offsetX,
            y: positions.bottomRight.y - offsetY,
          },
        };
      }

      case "wave": {
        // Wave-like motion
        const wave1 = Math.sin(t * Math.PI * 2) * 10;
        const wave2 = Math.sin(t * Math.PI * 2 + Math.PI / 2) * 10;

        return {
          topLeft: {
            x: positions.topLeft.x + wave1,
            y: positions.topLeft.y + wave2,
          },
          topRight: {
            x: positions.topRight.x + wave2,
            y: positions.topRight.y - wave1,
          },
          bottomLeft: {
            x: positions.bottomLeft.x - wave2,
            y: positions.bottomLeft.y + wave1,
          },
          bottomRight: {
            x: positions.bottomRight.x - wave1,
            y: positions.bottomRight.y - wave2,
          },
        };
      }

      default:
        return positions;
    }
  }, [animate, animationType, animationProgress, positions]);

  // Generate the gradient using radial gradients
  const gradientStyle = useMemo(() => {
    const {
      topLeft: tlPos,
      topRight: trPos,
      bottomLeft: blPos,
      bottomRight: brPos,
    } = animatedPositions;

    // Create 4 radial gradients, one for each color
    const gradients = [
      `radial-gradient(circle at ${tlPos.x}% ${tlPos.y}%, ${topLeft} 0%, transparent ${blend}%)`,
      `radial-gradient(circle at ${trPos.x}% ${trPos.y}%, ${topRight} 0%, transparent ${blend}%)`,
      `radial-gradient(circle at ${blPos.x}% ${blPos.y}%, ${bottomLeft} 0%, transparent ${blend}%)`,
      `radial-gradient(circle at ${brPos.x}% ${brPos.y}%, ${bottomRight} 0%, transparent ${blend}%)`,
    ];

    return gradients.join(", ");
  }, [animatedPositions, topLeft, topRight, bottomLeft, bottomRight, blend]);

  // Base color (average of all colors for better blending)
  const baseColor = useMemo(() => {
    return interpolateColors(0.5, [0, 1], [topLeft, bottomRight]);
  }, [topLeft, bottomRight]);

  return (
    <AbsoluteFill
      className={className}
      style={{
        background: baseColor,
        ...style,
      }}
    >
      {/* Gradient layers */}
      <AbsoluteFill
        style={{
          background: gradientStyle,
          mixBlendMode: "normal",
        }}
      />

      {/* Optional noise overlay */}
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

export default FourColorGradient;
