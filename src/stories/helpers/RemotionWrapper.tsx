import React, { useState, useEffect } from "react";
import { Player } from "@remotion/player";
import { AbsoluteFill, useCurrentFrame } from "remotion";

/**
 * Props for the RemotionWrapper component.
 */
export interface RemotionWrapperProps {
  children: React.ReactNode;
  /** Width of the player */
  width?: number;
  /** Height of the player */
  height?: number;
  /** Duration in frames */
  durationInFrames?: number;
  /** Frames per second */
  fps?: number;
  /** Whether to autoplay */
  autoPlay?: boolean;
  /** Whether to loop */
  loop?: boolean;
  /** Show controls */
  controls?: boolean;
  /** Background color */
  backgroundColor?: string;
}

/**
 * Wrapper component that provides Remotion context for Storybook stories.
 *
 * This component wraps children in a Remotion Player, enabling animations
 * and frame-based rendering in Storybook.
 *
 * @example
 * // In a story file
 * export const Default: Story = {
 *   decorators: [
 *     (Story) => (
 *       <RemotionWrapper>
 *         <Story />
 *       </RemotionWrapper>
 *     ),
 *   ],
 * };
 */
export const RemotionWrapper: React.FC<RemotionWrapperProps> = ({
  children,
  width = 1280,
  height = 720,
  durationInFrames = 150,
  fps = 30,
  autoPlay = true,
  loop = true,
  controls = true,
  backgroundColor = "#ffffff",
}) => {
  // Force re-render when children change (for HMR)
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [children]);

  // Create a component that renders the children
  const StoryComponent: React.FC = () => {
    const frame = useCurrentFrame();
    console.log(frame);
    return (
      <AbsoluteFill
        style={{
          backgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </AbsoluteFill>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "20px",
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Player
        key={key}
        component={StoryComponent}
        compositionWidth={width}
        compositionHeight={height}
        durationInFrames={durationInFrames}
        fps={fps}
        autoPlay={autoPlay}
        loop={loop}
        controls={controls}
        style={{
          width: "calc(100vw - 80px)",
          maxWidth: "1200px",
          aspectRatio: `${width} / ${height}`,
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        }}
      />
      <div
        style={{
          fontSize: "12px",
          color: "#666",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {durationInFrames} frames @ {fps}fps (
        {(durationInFrames / fps).toFixed(1)}s)
      </div>
    </div>
  );
};

/**
 * Create a Storybook decorator that wraps stories in RemotionWrapper.
 */
export const withRemotion = (options?: Partial<RemotionWrapperProps>) => {
  return (Story: React.FC) => (
    <RemotionWrapper {...options}>
      <Story />
    </RemotionWrapper>
  );
};

export default RemotionWrapper;
