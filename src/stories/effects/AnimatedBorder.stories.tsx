import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { AnimatedBorder } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof AnimatedBorder> = {
  title: "Effects/AnimatedBorder",
  component: AnimatedBorder,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    borderStyle: { control: "select", options: ["solid", "dashed", "gradient", "glow"] },
    color: { control: "color" },
    thickness: { control: { type: "range", min: 1, max: 8, step: 1 } },
    borderRadius: { control: { type: "range", min: 0, max: 30, step: 2 } },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedBorder>;

export const Solid: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AnimatedBorder borderStyle="solid" color="#4ECDC4" thickness={3} borderRadius={12} padding={20}>
        <div style={{ width: 200, height: 120, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 24, fontFamily: "system-ui" }}>
          Content
        </div>
      </AnimatedBorder>
    </AbsoluteFill>
  ),
};

export const GlowBorder: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AnimatedBorder borderStyle="glow" color="#A78BFA" thickness={2} borderRadius={16} padding={24} glowRadius={15}>
        <div style={{ width: 250, height: 150, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 28, fontWeight: 700, fontFamily: "system-ui" }}>
          GLOW
        </div>
      </AnimatedBorder>
    </AbsoluteFill>
  ),
};

export const GradientBorder: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AnimatedBorder borderStyle="gradient" color="#FF6B6B" colorEnd="#4ECDC4" thickness={3} borderRadius={12} padding={20}>
        <div style={{ width: 200, height: 120, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontFamily: "system-ui" }}>
          Gradient
        </div>
      </AnimatedBorder>
    </AbsoluteFill>
  ),
};
