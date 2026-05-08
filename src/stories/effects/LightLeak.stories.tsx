import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { LightLeak } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof LightLeak> = {
  title: "Effects/LightLeak",
  component: LightLeak,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#111">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    leakStyle: { control: "select", options: ["warm", "cool", "prismatic", "flare", "soft"] },
    speed: { control: { type: "range", min: 0.1, max: 2, step: 0.1 } },
    intensity: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
  },
};

export default meta;
type Story = StoryObj<typeof LightLeak>;

export const Warm: Story = {
  args: { leakStyle: "warm", intensity: 0.5, speed: 0.5 },
  render: (args) => (
    <AbsoluteFill style={{ background: "#111" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 48, fontWeight: 700, fontFamily: "system-ui" }}>
        LIGHT LEAK
      </div>
      <LightLeak {...args} />
    </AbsoluteFill>
  ),
};

export const Prismatic: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      <LightLeak leakStyle="prismatic" intensity={0.6} speed={0.3} />
    </AbsoluteFill>
  ),
};

export const Cool: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#0f0f1a" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 36, fontFamily: "system-ui" }}>
        Moody
      </div>
      <LightLeak leakStyle="cool" intensity={0.4} speed={0.4} />
    </AbsoluteFill>
  ),
};
