import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { WaveDistortion } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof WaveDistortion> = {
  title: "Effects/WaveDistortion",
  component: WaveDistortion,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    waveType: { control: "select", options: ["horizontal", "vertical", "circular", "turbulent"] },
    amplitude: { control: { type: "range", min: 1, max: 40, step: 1 } },
    frequency: { control: { type: "range", min: 1, max: 10, step: 0.5 } },
    speed: { control: { type: "range", min: 0.1, max: 3, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof WaveDistortion>;

export const Horizontal: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <WaveDistortion waveType="horizontal" amplitude={12} frequency={3} speed={1}>
        <div style={{ fontSize: 64, fontWeight: 900, color: "#fff", fontFamily: "system-ui" }}>
          LIQUID
        </div>
      </WaveDistortion>
    </AbsoluteFill>
  ),
};

export const Turbulent: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <WaveDistortion waveType="turbulent" amplitude={8} speed={0.5}>
        <div style={{ width: 400, height: 250, background: "linear-gradient(135deg, #667eea, #764ba2)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 36, fontWeight: 700, fontFamily: "system-ui" }}>
          DISTORTED
        </div>
      </WaveDistortion>
    </AbsoluteFill>
  ),
};

export const SubtleCircular: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <WaveDistortion waveType="circular" amplitude={5} frequency={4} speed={0.8}>
        <div style={{ fontSize: 48, fontWeight: 900, color: "#4ECDC4", fontFamily: "system-ui" }}>
          UNDERWATER
        </div>
      </WaveDistortion>
    </AbsoluteFill>
  ),
};
