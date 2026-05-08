import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { CountdownTimer } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof CountdownTimer> = {
  title: "Effects/CountdownTimer",
  component: CountdownTimer,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    from: { control: { type: "range", min: 1, max: 10, step: 1 } },
    countdownStyle: { control: "select", options: ["flip", "slide", "fade", "minimal"] },
    fontSize: { control: { type: "range", min: 40, max: 200, step: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof CountdownTimer>;

export const Fade: Story = {
  args: { from: 3, countdownStyle: "fade", fontSize: 120 },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CountdownTimer {...args} />
    </AbsoluteFill>
  ),
};

export const Flip: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CountdownTimer from={5} countdownStyle="flip" fontSize={100} accentColor="#4ECDC4" />
    </AbsoluteFill>
  ),
};

export const Slide: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CountdownTimer from={3} countdownStyle="slide" fontSize={80} />
    </AbsoluteFill>
  ),
};
