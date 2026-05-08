import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { AudioBars } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof AudioBars> = {
  title: "Effects/AudioBars",
  component: AudioBars,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a0a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    count: { control: { type: "range", min: 8, max: 64, step: 4 } },
    layout: { control: "select", options: ["bars", "wave", "mirror"] },
    speed: { control: { type: "range", min: 0.1, max: 3, step: 0.1 } },
    smoothing: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof AudioBars>;

export const Default: Story = {
  args: { count: 32, color: "#4ECDC4", colorEnd: "#44B09E", speed: 1.5 },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AudioBars {...args} />
    </AbsoluteFill>
  ),
};

export const Mirror: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AudioBars count={40} layout="mirror" color="#FF6B6B" colorEnd="#FFE66D" height={300} width={600} speed={2} />
    </AbsoluteFill>
  ),
};

export const Minimal: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 60 }}>
      <AudioBars count={16} color="#ffffff" height={80} width={200} gap={4} speed={1} smoothing={0.8} />
    </AbsoluteFill>
  ),
};
