import React, { type CSSProperties, type ReactNode } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { type EasingName } from "../../presets/easings";
import { useStagger, type StaggerPattern } from "../../hooks/useStagger";
import { toRemotionEasing } from "../../presets/remotionEasings";

/**
 * Props for Grid component.
 */
export interface GridProps {
  children: ReactNode[];
  /** Number of columns */
  columns?: number;
  /** Number of rows (auto-calculated if not specified) */
  rows?: number;
  /** Gap between items in pixels */
  gap?: number;
  /** Horizontal gap (overrides gap) */
  columnGap?: number;
  /** Vertical gap (overrides gap) */
  rowGap?: number;
  /** Stagger animation delay between items in seconds */
  stagger?: number;
  /** Stagger pattern */
  staggerPattern?: StaggerPattern;
  /** Animation duration per item in seconds */
  duration?: number;
  /** Initial delay before animations start in seconds */
  delay?: number;
  /** Animation type for items */
  animation?: "fadeIn" | "scaleIn" | "slideUp" | "slideIn" | "none";
  /** Easing preset */
  ease?: EasingName | string;
  /** Additional CSS styles */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Animated grid layout with staggered item entrance.
 *
 * @example
 * // Basic grid
 * <Grid columns={3} gap={20}>
 *   {items.map(item => <Card key={item.id} />)}
 * </Grid>
 *
 * @example
 * // With staggered animation
 * <Grid
 *   columns={4}
 *   gap={16}
 *   stagger={0.1}
 *   staggerPattern="wave"
 *   animation="scaleIn"
 * >
 *   {items.map(item => <Card key={item.id} />)}
 * </Grid>
 *
 * @example
 * // Center-out stagger
 * <Grid columns={3} stagger={0.08} staggerPattern="center">
 *   {items}
 * </Grid>
 */
export const Grid: React.FC<GridProps> = ({
  children,
  columns = 3,
  rows,
  gap = 16,
  columnGap,
  rowGap,
  stagger = 0,
  staggerPattern = "start",
  duration = 0.4,
  delay = 0,
  animation = "fadeIn",
  ease = "smooth",
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = React.Children.toArray(children);

  const easing = toRemotionEasing(ease);
  const calculatedRows = rows ?? Math.ceil(items.length / columns);

  // Use stagger hook
  const { getDelay } = useStagger({
    amount: stagger * items.length,
    pattern: staggerPattern,
    grid: [columns, calculatedRows],
    axis: "both",
  });

  // Grid container style
  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: rows ? `repeat(${rows}, 1fr)` : undefined,
    gap: `${rowGap ?? gap}px ${columnGap ?? gap}px`,
    ...style,
  };

  return (
    <div className={className} style={gridStyle}>
      {items.map((child, index) => {
        // Calculate item delay
        const itemDelay =
          delay + (stagger > 0 ? getDelay(index, items.length) : 0);
        const itemDelayFrames = Math.round(itemDelay * fps);
        const durationFrames = Math.round(duration * fps);

        // Calculate progress
        const effectiveFrame = frame - itemDelayFrames;
        let progress = 0;

        if (effectiveFrame > 0) {
          progress = interpolate(effectiveFrame, [0, durationFrames], [0, 1], {
            easing,
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
        }

        // Calculate animation values
        let transform = "";
        let opacity = 1;

        switch (animation) {
          case "fadeIn":
            opacity = progress;
            break;
          case "scaleIn":
            transform = `scale(${0.5 + progress * 0.5})`;
            opacity = progress;
            break;
          case "slideUp":
            transform = `translateY(${(1 - progress) * 30}px)`;
            opacity = progress;
            break;
          case "slideIn":
            transform = `translateX(${(1 - progress) * 30}px)`;
            opacity = progress;
            break;
          case "none":
            break;
        }

        return (
          <div
            key={index}
            style={{
              opacity,
              transform,
              willChange:
                animation !== "none" ? "transform, opacity" : undefined,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
