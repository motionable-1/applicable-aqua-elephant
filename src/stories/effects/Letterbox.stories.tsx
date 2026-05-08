import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Letterbox } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Letterbox> = {
  title: "Effects/Letterbox",
  component: Letterbox,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120}>
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    size: { control: { type: "range", min: 0, max: 0.3, step: 0.01 } },
    color: { control: "color" },
    animateIn: { control: { type: "range", min: 0, max: 2, step: 0.1 } },
    delay: { control: { type: "range", min: 0, max: 2, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Letterbox>;

export const Default: Story = {
  args: { size: 0.1, animateIn: 0.8 },
  render: (args) => (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 48, fontWeight: 700, fontFamily: "system-ui" }}>
        CINEMATIC
      </div>
      <Letterbox {...args} />
    </AbsoluteFill>
  ),
};

export const WideScreen: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#111" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 32, fontFamily: "system-ui" }}>
        2.39:1 Aspect Ratio
      </div>
      <Letterbox size={0.13} animateIn={1.2} color="#000" />
    </AbsoluteFill>
  ),
};
