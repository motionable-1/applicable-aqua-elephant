import React, { useMemo, type CSSProperties, type ReactNode } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { type EasingName } from "../../presets/easings";
import { toRemotionEasing } from "../../presets/remotionEasings";

/**
 * Item rotation mode for circle layout.
 */
export type ItemRotation = "tangent" | "radial" | "none" | number;

/**
 * Props for CircleLayout component.
 */
export interface CircleLayoutProps {
  children: ReactNode[];
  /** Radius of the circle in pixels */
  radius?: number;
  /** Starting angle in degrees (0 = top) */
  startAngle?: number;
  /** Ending angle in degrees (360 = full circle) */
  endAngle?: number;
  /** Rotation of the entire layout (animatable) */
  rotation?: number;
  /** Stagger delay between items in seconds */
  stagger?: number;
  /** Animation duration per item in seconds */
  duration?: number;
  /** Initial delay in seconds */
  delay?: number;
  /** Animate the rotation */
  animateRotation?: boolean;
  /** Rotation speed (degrees per second) */
  rotationSpeed?: number;
  /** Item rotation mode */
  itemRotation?: ItemRotation;
  /** Easing preset */
  ease?: EasingName | string;
  /** Center X position (default: center) */
  centerX?: number | string;
  /** Center Y position (default: center) */
  centerY?: number | string;
  /** Additional CSS styles */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
}


/**
 * Arrange items in a circle with optional animation.
 *
 * @example
 * // Basic circle layout
 * <CircleLayout radius={150}>
 *   {icons.map(icon => <Icon key={icon.id} />)}
 * </CircleLayout>
 *
 * @example
 * // Animated entrance
 * <CircleLayout
 *   radius={200}
 *   stagger={0.1}
 *   duration={0.5}
 *   itemRotation="tangent"
 * >
 *   {items}
 * </CircleLayout>
 *
 * @example
 * // Rotating circle
 * <CircleLayout
 *   radius={180}
 *   animateRotation
 *   rotationSpeed={30}
 * >
 *   {items}
 * </CircleLayout>
 *
 * @example
 * // Arc (half circle)
 * <CircleLayout
 *   radius={150}
 *   startAngle={-90}
 *   endAngle={90}
 * >
 *   {items}
 * </CircleLayout>
 */
export const CircleLayout: React.FC<CircleLayoutProps> = ({
  children,
  radius = 150,
  startAngle = 0,
  endAngle = 360,
  rotation = 0,
  stagger = 0,
  duration = 0.4,
  delay = 0,
  animateRotation = false,
  rotationSpeed = 30,
  itemRotation = "none",
  ease = "smooth",
  centerX = "50%",
  centerY = "50%",
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = React.Children.toArray(children);
  const easing = toRemotionEasing(ease);

  // Calculate animated rotation
  const currentRotation = useMemo(() => {
    if (!animateRotation) return rotation;
    const time = frame / fps;
    return rotation + time * rotationSpeed;
  }, [animateRotation, rotation, rotationSpeed, frame, fps]);

  // Calculate angle per item
  const totalAngle = endAngle - startAngle;
  const isFullCircle = Math.abs(totalAngle) >= 360;
  const angleStep = isFullCircle
    ? totalAngle / items.length
    : totalAngle / Math.max(items.length - 1, 1);

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
      {items.map((child, index) => {
        // Calculate item delay
        const itemDelay = delay + stagger * index;
        const itemDelayFrames = Math.round(itemDelay * fps);
        const durationFrames = Math.round(duration * fps);

        // Calculate progress
        const effectiveFrame = frame - itemDelayFrames;
        let progress = 1;

        if (stagger > 0 || duration > 0) {
          if (effectiveFrame <= 0) {
            progress = 0;
          } else if (effectiveFrame < durationFrames) {
            progress = interpolate(
              effectiveFrame,
              [0, durationFrames],
              [0, 1],
              {
                easing,
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );
          }
        }

        // Calculate angle for this item
        const itemAngle = startAngle + angleStep * index + currentRotation;
        const angleRad = (itemAngle - 90) * (Math.PI / 180); // -90 to start from top

        // Calculate position
        const x = Math.cos(angleRad) * radius * progress;
        const y = Math.sin(angleRad) * radius * progress;

        // Calculate item rotation
        let itemRotationDeg = 0;
        if (itemRotation === "tangent") {
          itemRotationDeg = itemAngle;
        } else if (itemRotation === "radial") {
          itemRotationDeg = itemAngle + 90;
        } else if (typeof itemRotation === "number") {
          itemRotationDeg = itemRotation;
        }

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: centerX,
              top: centerY,
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${itemRotationDeg}deg)`,
              opacity: progress,
              willChange: "transform, opacity",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Props for ArcLayout - items along an arc.
 */
export interface ArcLayoutProps
  extends Omit<CircleLayoutProps, "startAngle" | "endAngle"> {
  /** Arc angle in degrees (e.g., 90 for quarter circle) */
  arcAngle?: number;
  /** Center angle of the arc */
  centerAngle?: number;
}

/**
 * Arrange items along an arc.
 *
 * @example
 * <ArcLayout
 *   radius={200}
 *   arcAngle={90}
 *   centerAngle={0}
 *   stagger={0.08}
 * >
 *   {items}
 * </ArcLayout>
 */
export const ArcLayout: React.FC<ArcLayoutProps> = ({
  arcAngle = 90,
  centerAngle = 0,
  ...props
}) => {
  const startAngle = centerAngle - arcAngle / 2;
  const endAngle = centerAngle + arcAngle / 2;

  return (
    <CircleLayout {...props} startAngle={startAngle} endAngle={endAngle} />
  );
};

export default CircleLayout;
