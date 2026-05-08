import React, { useMemo, type CSSProperties, type ReactNode } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { type EasingName } from "../../presets/easings";
import { toRemotionEasing } from "../../presets/remotionEasings";

/**
 * Split screen layout types.
 */
export type SplitLayout = "horizontal" | "vertical" | "diagonal";

/**
 * Props for SplitScreen component.
 */
export interface SplitScreenProps {
  children: [ReactNode, ReactNode];
  /** Layout direction */
  layout?: SplitLayout;
  /** Split ratio (0-1, default 0.5 = equal split) */
  ratio?: number;
  /** Gap between panels in pixels */
  gap?: number;
  /** Animate ratio changes */
  animated?: boolean;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation in seconds */
  delay?: number;
  /** Starting ratio for animation */
  fromRatio?: number;
  /** Easing preset */
  ease?: EasingName | string;
  /** Additional CSS styles */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Split screen layout for two content panels.
 *
 * @example
 * // Equal horizontal split
 * <SplitScreen layout="horizontal">
 *   <LeftContent />
 *   <RightContent />
 * </SplitScreen>
 *
 * @example
 * // Vertical split with custom ratio
 * <SplitScreen layout="vertical" ratio={0.7} gap={20}>
 *   <TopContent />
 *   <BottomContent />
 * </SplitScreen>
 *
 * @example
 * // Animated split
 * <SplitScreen
 *   layout="horizontal"
 *   animated
 *   fromRatio={0}
 *   ratio={0.5}
 *   duration={0.8}
 * >
 *   <Panel1 />
 *   <Panel2 />
 * </SplitScreen>
 */
export const SplitScreen: React.FC<SplitScreenProps> = ({
  children,
  layout = "horizontal",
  ratio = 0.5,
  gap = 0,
  animated = false,
  duration = 0.5,
  delay = 0,
  fromRatio = 0,
  ease = "smooth",
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.round(duration * fps);
  const easing = toRemotionEasing(ease);

  // Calculate current ratio
  const currentRatio = useMemo(() => {
    if (!animated) return ratio;

    const effectiveFrame = frame - delayFrames;
    if (effectiveFrame <= 0) return fromRatio;
    if (effectiveFrame >= durationFrames) return ratio;

    return interpolate(
      effectiveFrame,
      [0, durationFrames],
      [fromRatio, ratio],
      {
        easing,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );
  }, [animated, ratio, fromRatio, frame, delayFrames, durationFrames, easing]);

  const [first, second] = children;

  // Container styles
  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: layout === "vertical" ? "column" : "row",
    width: "100%",
    height: "100%",
    gap: `${gap}px`,
    ...style,
  };

  // Panel styles
  const firstPanelStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    ...(layout === "horizontal"
      ? { width: `${currentRatio * 100}%`, height: "100%" }
      : { width: "100%", height: `${currentRatio * 100}%` }),
  };

  const secondPanelStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    flex: 1,
  };

  // Diagonal layout uses clip-path
  if (layout === "diagonal") {
    const diagonalPercent = currentRatio * 100;

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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            clipPath: `polygon(0 0, ${diagonalPercent + 10}% 0, ${diagonalPercent - 10}% 100%, 0 100%)`,
          }}
        >
          {first}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            clipPath: `polygon(${diagonalPercent + 10}% 0, 100% 0, 100% 100%, ${diagonalPercent - 10}% 100%)`,
          }}
        >
          {second}
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      <div style={firstPanelStyle}>{first}</div>
      <div style={secondPanelStyle}>{second}</div>
    </div>
  );
};

export default SplitScreen;
