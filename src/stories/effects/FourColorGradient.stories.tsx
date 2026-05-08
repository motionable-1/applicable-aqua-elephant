import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { FourColorGradient } from "../../remotion/library/components/effects/FourColorGradient";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof FourColorGradient> = {
  title: "Effects/FourColorGradient",
  component: FourColorGradient,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={300} fps={30} width={1280} height={720}>
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    animationType: {
      control: "select",
      options: ["rotate", "pulse", "shift", "wave"],
    },
    blend: {
      control: { type: "range", min: 30, max: 100, step: 5 },
    },
    speed: {
      control: { type: "range", min: 0.1, max: 1, step: 0.1 },
    },
    noise: {
      control: { type: "range", min: 0, max: 0.5, step: 0.05 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FourColorGradient>;

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  args: {
    topLeft: "#22d3ee",
    topRight: "#a855f7",
    bottomLeft: "#10b981",
    bottomRight: "#6366f1",
    blend: 70,
  },
};

export const Sunset: Story = {
  args: {
    topLeft: "#fb923c",
    topRight: "#f472b6",
    bottomLeft: "#fbbf24",
    bottomRight: "#f87171",
    blend: 70,
  },
};

export const Ocean: Story = {
  args: {
    topLeft: "#06b6d4",
    topRight: "#3b82f6",
    bottomLeft: "#0891b2",
    bottomRight: "#1d4ed8",
    blend: 60,
  },
};

export const Midnight: Story = {
  args: {
    topLeft: "#3b82f6",
    topRight: "#8b5cf6",
    bottomLeft: "#1e3a8a",
    bottomRight: "#4c1d95",
    blend: 70,
  },
};

export const Pastel: Story = {
  args: {
    topLeft: "#fdf4ff",
    topRight: "#f0f9ff",
    bottomLeft: "#fefce8",
    bottomRight: "#f5f3ff",
    blend: 80,
  },
};

export const Fire: Story = {
  args: {
    topLeft: "#f97316",
    topRight: "#ef4444",
    bottomLeft: "#fbbf24",
    bottomRight: "#dc2626",
    blend: 65,
  },
};

// ============================================================================
// ANIMATED EXAMPLES
// ============================================================================

export const AnimatedRotate: Story = {
  args: {
    topLeft: "#22d3ee",
    topRight: "#a855f7",
    bottomLeft: "#10b981",
    bottomRight: "#6366f1",
    animate: true,
    animationType: "rotate",
    speed: 0.3,
    blend: 70,
  },
};

export const AnimatedPulse: Story = {
  args: {
    topLeft: "#f472b6",
    topRight: "#c084fc",
    bottomLeft: "#fb7185",
    bottomRight: "#a78bfa",
    animate: true,
    animationType: "pulse",
    speed: 0.4,
    blend: 75,
  },
};

export const AnimatedShift: Story = {
  args: {
    topLeft: "#fb923c",
    topRight: "#f472b6",
    bottomLeft: "#fbbf24",
    bottomRight: "#f87171",
    animate: true,
    animationType: "shift",
    speed: 0.25,
    blend: 70,
  },
};

export const AnimatedWave: Story = {
  args: {
    topLeft: "#06b6d4",
    topRight: "#3b82f6",
    bottomLeft: "#0891b2",
    bottomRight: "#1d4ed8",
    animate: true,
    animationType: "wave",
    speed: 0.3,
    blend: 65,
  },
};

// ============================================================================
// CUSTOM POSITIONS
// ============================================================================

export const CenteredPositions: Story = {
  args: {
    topLeft: "#22d3ee",
    topRight: "#a855f7",
    bottomLeft: "#10b981",
    bottomRight: "#6366f1",
    positions: {
      topLeft: { x: 30, y: 30 },
      topRight: { x: 70, y: 30 },
      bottomLeft: { x: 30, y: 70 },
      bottomRight: { x: 70, y: 70 },
    },
    blend: 60,
  },
};

export const DiamondPositions: Story = {
  args: {
    topLeft: "#f97316",
    topRight: "#ef4444",
    bottomLeft: "#fbbf24",
    bottomRight: "#dc2626",
    positions: {
      topLeft: { x: 50, y: 10 },
      topRight: { x: 90, y: 50 },
      bottomLeft: { x: 10, y: 50 },
      bottomRight: { x: 50, y: 90 },
    },
    blend: 55,
  },
};

// ============================================================================
// BLEND COMPARISON
// ============================================================================

export const BlendComparison: Story = {
  render: () => {
    const blends = [40, 55, 70, 85, 100];

    return (
      <AbsoluteFill style={{ padding: 20 }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            height: "100%",
          }}
        >
          {blends.map((blend) => (
            <div
              key={blend}
              style={{
                flex: 1,
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <FourColorGradient
                topLeft="#fb923c"
                topRight="#f472b6"
                bottomLeft="#fbbf24"
                bottomRight="#f87171"
                blend={blend}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  fontSize: 12,
                  fontWeight: 600,
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                }}
              >
                {blend}%
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    );
  },
};

// ============================================================================
// WITH NOISE
// ============================================================================

export const WithNoise: Story = {
  args: {
    topLeft: "#3b82f6",
    topRight: "#8b5cf6",
    bottomLeft: "#1e3a8a",
    bottomRight: "#4c1d95",
    noise: 0.15,
    blend: 70,
  },
};

export const NoiseComparison: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", gap: 20, padding: 20 }}>
      <div
        style={{
          flex: 1,
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <FourColorGradient
          topLeft="#3b82f6"
          topRight="#8b5cf6"
          bottomLeft="#1e3a8a"
          bottomRight="#4c1d95"
          noise={0}
        />
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            fontSize: 12,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          No Noise
        </div>
      </div>
      <div
        style={{
          flex: 1,
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <FourColorGradient
          topLeft="#3b82f6"
          topRight="#8b5cf6"
          bottomLeft="#1e3a8a"
          bottomRight="#4c1d95"
          noise={0.15}
        />
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            fontSize: 12,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          15% Noise
        </div>
      </div>
      <div
        style={{
          flex: 1,
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <FourColorGradient
          topLeft="#3b82f6"
          topRight="#8b5cf6"
          bottomLeft="#1e3a8a"
          bottomRight="#4c1d95"
          noise={0.3}
        />
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            fontSize: 12,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          30% Noise
        </div>
      </div>
    </AbsoluteFill>
  ),
};

// ============================================================================
// WITH CONTENT
// ============================================================================

export const WithContent: Story = {
  render: () => (
    <FourColorGradient
      topLeft="#22d3ee"
      topRight="#a855f7"
      bottomLeft="#10b981"
      bottomRight="#6366f1"
      animate
      animationType="wave"
      speed={0.2}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <h1
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            textShadow: "0 4px 30px rgba(0,0,0,0.3)",
            margin: 0,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          4-Color Gradient
        </h1>
        <p
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.8)",
            margin: 0,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Fully customizable colors
        </p>
      </AbsoluteFill>
    </FourColorGradient>
  ),
};

// ============================================================================
// ANIMATION COMPARISON
// ============================================================================

export const AnimationComparison: Story = {
  render: () => {
    const animations = [
      { name: "Rotate", type: "rotate" as const },
      { name: "Pulse", type: "pulse" as const },
      { name: "Shift", type: "shift" as const },
      { name: "Wave", type: "wave" as const },
    ];

    return (
      <AbsoluteFill style={{ padding: 20 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
            height: "100%",
          }}
        >
          {animations.map(({ name, type }) => (
            <div
              key={name}
              style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <FourColorGradient
                topLeft="#f472b6"
                topRight="#c084fc"
                bottomLeft="#fb7185"
                bottomRight="#a78bfa"
                animate
                animationType={type}
                speed={0.4}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  color: "white",
                  fontSize: 14,
                  fontWeight: 600,
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {name}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    );
  },
};
