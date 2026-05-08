import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { ProgressRing } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof ProgressRing> = {
  title: "Effects/ProgressRing",
  component: ProgressRing,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    size: { control: { type: "range", min: 40, max: 300, step: 10 } },
    thickness: { control: { type: "range", min: 2, max: 20, step: 1 } },
    variant: { control: "select", options: ["ring", "bar"] },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressRing>;

export const Ring: Story = {
  args: { value: 0.75, size: 150, showValue: true, color: "#4ECDC4" },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <ProgressRing {...args} />
    </AbsoluteFill>
  ),
};

export const Bar: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <ProgressRing variant="bar" value={0.8} size={400} thickness={8} color="#FF6B6B" colorEnd="#FFE66D" />
      <ProgressRing variant="bar" value={0.6} size={400} thickness={8} color="#4ECDC4" colorEnd="#44B09E" delay={0.3} />
      <ProgressRing variant="bar" value={0.45} size={400} thickness={8} color="#A78BFA" colorEnd="#F472B6" delay={0.6} />
    </AbsoluteFill>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
      <ProgressRing value={0.92} size={120} color="#4ECDC4" showValue fontSize={20} />
      <ProgressRing value={0.67} size={120} color="#FF6B6B" showValue fontSize={20} delay={0.2} />
      <ProgressRing value={0.45} size={120} color="#A78BFA" showValue fontSize={20} delay={0.4} />
    </AbsoluteFill>
  ),
};
