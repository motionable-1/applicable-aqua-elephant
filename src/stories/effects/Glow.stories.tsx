import type { Meta, StoryObj } from "@storybook/react";
import { Glow, AnimatedGlow } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Glow> = {
  title: "Effects/Glow",
  component: Glow,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0f0f23">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    color: { control: "color" },
    intensity: { control: { type: "range", min: 5, max: 50, step: 5 } },
    pulsate: { control: "boolean" },
    pulseDuration: { control: { type: "range", min: 0.5, max: 3, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Glow>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "30px 50px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: 16,
      color: "white",
      fontSize: 24,
      fontWeight: 600,
      fontFamily: "system-ui",
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  args: {
    color: "#667eea",
    intensity: 20,
  },
  render: (args) => (
    <Glow {...args}>
      <Box>Glowing Box</Box>
    </Glow>
  ),
};

export const Pulsating: Story = {
  args: {
    color: "#22c55e",
    intensity: 30,
    pulsate: true,
    pulseDuration: 1.5,
  },
  render: (args) => (
    <Glow {...args}>
      <Box>Pulsating Glow</Box>
    </Glow>
  ),
};

export const AnimatedGlowIn: Story = {
  render: () => (
    <AnimatedGlow color="#f59e0b" intensity={25} duration={0.8}>
      <Box>Animated Glow</Box>
    </AnimatedGlow>
  ),
};

export const NeonText: Story = {
  render: () => (
    <Glow color="#ff00ff" intensity={15} pulsate pulseDuration={2}>
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#ff00ff",
          fontFamily: "system-ui",
        }}
      >
        NEON
      </div>
    </Glow>
  ),
};

export const MultipleColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 40 }}>
      <Glow color="#ef4444" intensity={20}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#ef4444",
          }}
        />
      </Glow>
      <Glow color="#22c55e" intensity={20}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#22c55e",
          }}
        />
      </Glow>
      <Glow color="#3b82f6" intensity={20}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#3b82f6",
          }}
        />
      </Glow>
    </div>
  ),
};
