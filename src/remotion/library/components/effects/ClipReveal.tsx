import React, { useMemo, type CSSProperties, type ReactNode } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { type EasingName } from "../../presets/easings";
import { getDuration, type DurationName } from "../../presets/durations";
import { toRemotionEasing } from "../../presets/remotionEasings";

/**
 * Shape types for clip reveal.
 */
export type ClipShape =
  | "circle"
  | "ellipse"
  | "inset"
  | "diamond"
  | "polygon"
  | "diagonal"
  | "split";

/**
 * Direction for inset/diagonal reveals.
 */
export type ClipDirection =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "horizontal"
  | "vertical"
  | "forward"
  | "backward"
  | "expand"
  | "contract";

/**
 * Props for ClipReveal component.
 */
export interface ClipRevealProps {
  children: ReactNode;
  /** Shape of the clip path */
  shape?: ClipShape;
  /** Direction of the reveal */
  direction?: ClipDirection;
  /** Origin point for radial reveals [x, y] as 0-1 values */
  origin?: [number, number];
  /** Animation duration in seconds */
  duration?: number | DurationName;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Easing preset */
  ease?: EasingName | string;
  /** Number of sides for polygon shape */
  sides?: number;
  /** Rotation angle for polygon/diagonal */
  rotation?: number;
  /** Angle for diagonal reveal */
  angle?: number;
  /** Additional CSS styles */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Generate polygon points for regular polygon.
 */
function generatePolygonPoints(
  sides: number,
  progress: number,
  rotation: number = 0,
): string {
  const points: string[] = [];
  const angleStep = (Math.PI * 2) / sides;
  const rotationRad = (rotation * Math.PI) / 180;

  // Scale based on progress (0 = no polygon, 1 = full size)
  // Use 150% to ensure it covers the entire container
  const radius = progress * 150;

  for (let i = 0; i < sides; i++) {
    const angle = angleStep * i - Math.PI / 2 + rotationRad;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    points.push(`${x}% ${y}%`);
  }

  return `polygon(${points.join(", ")})`;
}

/**
 * Clip path reveal animation.
 *
 * @example
 * // Circle reveal from center
 * <ClipReveal shape="circle" direction="expand">
 *   <Image src={hero} />
 * </ClipReveal>
 *
 * @example
 * // Directional reveal
 * <ClipReveal shape="inset" direction="left" duration={0.6}>
 *   <Content />
 * </ClipReveal>
 *
 * @example
 * // Diamond reveal
 * <ClipReveal shape="diamond" direction="expand" duration={0.8}>
 *   <Logo />
 * </ClipReveal>
 *
 * @example
 * // Hexagon reveal with rotation
 * <ClipReveal shape="polygon" sides={6} rotation={30} duration={1}>
 *   <Content />
 * </ClipReveal>
 */
export const ClipReveal: React.FC<ClipRevealProps> = ({
  children,
  shape = "circle",
  direction = "expand",
  origin = [0.5, 0.5],
  duration: durationProp = 0.5,
  delay = 0,
  ease = "smooth",
  sides = 6,
  rotation = 0,
  angle = 45,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const duration = getDuration(durationProp);
  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.round(duration * fps);
  const easing = toRemotionEasing(ease);

  // Calculate progress
  const progress = useMemo(() => {
    const effectiveFrame = frame - delayFrames;

    if (effectiveFrame <= 0) return direction === "contract" ? 1 : 0;
    if (effectiveFrame >= durationFrames)
      return direction === "contract" ? 0 : 1;

    let p = interpolate(effectiveFrame, [0, durationFrames], [0, 1], {
      easing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    // Reverse for contract direction
    if (direction === "contract") {
      p = 1 - p;
    }

    return p;
  }, [frame, delayFrames, durationFrames, direction, easing]);

  // Generate clip-path based on shape
  const clipPath = useMemo(() => {
    const [originX, originY] = origin;
    const originXPercent = originX * 100;
    const originYPercent = originY * 100;

    switch (shape) {
      case "circle": {
        // Circle needs to be large enough to cover the entire container
        const maxRadius = Math.sqrt(2) * 100; // Diagonal of 100x100
        const radius = progress * maxRadius;
        return `circle(${radius}% at ${originXPercent}% ${originYPercent}%)`;
      }

      case "ellipse": {
        const radiusX = progress * 150;
        const radiusY = progress * 150;
        return `ellipse(${radiusX}% ${radiusY}% at ${originXPercent}% ${originYPercent}%)`;
      }

      case "inset": {
        switch (direction) {
          case "left":
            return `inset(0 ${(1 - progress) * 100}% 0 0)`;
          case "right":
            return `inset(0 0 0 ${(1 - progress) * 100}%)`;
          case "top":
            return `inset(0 0 ${(1 - progress) * 100}% 0)`;
          case "bottom":
            return `inset(${(1 - progress) * 100}% 0 0 0)`;
          case "horizontal": {
            const half = ((1 - progress) * 100) / 2;
            return `inset(0 ${half}% 0 ${half}%)`;
          }
          case "vertical": {
            const half = ((1 - progress) * 100) / 2;
            return `inset(${half}% 0 ${half}% 0)`;
          }
          default:
            return `inset(0 ${(1 - progress) * 100}% 0 0)`;
        }
      }

      case "diamond": {
        // Diamond is a rotated square (polygon with 4 sides at 45 degrees)
        return generatePolygonPoints(4, progress, 45);
      }

      case "polygon": {
        return generatePolygonPoints(sides, progress, rotation);
      }

      case "diagonal": {
        // Diagonal wipe using polygon
        const offset = (1 - progress) * 200 - 50;

        // Create a large polygon that moves diagonally
        if (direction === "forward" || direction === "expand") {
          return `polygon(
            ${offset}% 0%,
            ${offset + 150}% 0%,
            ${offset + 150}% 100%,
            ${offset}% 100%
          )`;
        } else {
          return `polygon(
            ${100 - offset}% 0%,
            ${100 - offset - 150}% 0%,
            ${100 - offset - 150}% 100%,
            ${100 - offset}% 100%
          )`;
        }
      }

      case "split": {
        const half = ((1 - progress) * 100) / 2;
        if (direction === "horizontal") {
          return `inset(0 ${half}% 0 ${half}%)`;
        } else {
          return `inset(${half}% 0 ${half}% 0)`;
        }
      }

      default:
        return "none";
    }
  }, [shape, direction, origin, progress, sides, rotation, angle]);

  return (
    <div
      className={className}
      style={{
        clipPath,
        WebkitClipPath: clipPath,
        willChange: "clip-path",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default ClipReveal;
