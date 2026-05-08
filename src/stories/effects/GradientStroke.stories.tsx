import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { GradientStroke } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof GradientStroke> = {
  title: "Effects/GradientStroke",
  component: GradientStroke,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0a1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    shape: { control: "select", options: ["rect", "circle", "rounded"] },
    thickness: { control: { type: "range", min: 1, max: 8, step: 1 } },
    rotationSpeed: { control: { type: "range", min: 0, max: 180, step: 5 } },
    color: { control: "color" },
    colorEnd: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof GradientStroke>;

export const Rounded: Story = {
  args: { color: "#FF6B6B", colorEnd: "#4ECDC4", width: 300, height: 200, thickness: 3 },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <GradientStroke {...args}>
        <div style={{ color: "#fff", fontSize: 24, fontWeight: 700, fontFamily: "system-ui" }}>
          Content
        </div>
      </GradientStroke>
    </AbsoluteFill>
  ),
};

export const Circle: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <GradientStroke shape="circle" color="#A78BFA" colorEnd="#F472B6" width={200} height={200} thickness={3} rotationSpeed={90}>
        <div style={{ color: "#fff", fontSize: 48, fontWeight: 900, fontFamily: "system-ui" }}>A</div>
      </GradientStroke>
    </AbsoluteFill>
  ),
};

export const TextFrame: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <GradientStroke color="#FFE66D" colorEnd="#FF6B6B" width={500} height={120} thickness={2} borderRadius={60} rotationSpeed={30}>
        <span style={{ color: "#fff", fontSize: 36, fontWeight: 700, fontFamily: "system-ui" }}>
          GRADIENT STROKE
        </span>
      </GradientStroke>
    </AbsoluteFill>
  ),
};
