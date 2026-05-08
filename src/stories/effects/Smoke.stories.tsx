import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Smoke } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Smoke> = {
  title: "Effects/Smoke",
  component: Smoke,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a0a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    smokeStyle: { control: "select", options: ["fog", "haze", "wisps", "thick"] },
    intensity: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    speed: { control: { type: "range", min: 0.1, max: 2, step: 0.1 } },
    color: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Smoke>;

export const Fog: Story = {
  args: { smokeStyle: "fog", intensity: 0.3, speed: 0.5, color: "#ffffff" },
  render: (args) => (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 48, fontWeight: 700, fontFamily: "system-ui" }}>
        ATMOSPHERIC
      </div>
      <Smoke {...args} />
    </AbsoluteFill>
  ),
};

export const ColoredHaze: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#0a0a1a" }}>
      <Smoke smokeStyle="haze" color="#A78BFA" intensity={0.25} speed={0.3} />
      <Smoke smokeStyle="wisps" color="#F472B6" intensity={0.2} speed={0.4} seed="smoke2" />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 36, fontFamily: "system-ui" }}>
        Layered Mood
      </div>
    </AbsoluteFill>
  ),
};

export const ThickFog: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#111" }}>
      <Smoke smokeStyle="thick" intensity={0.4} speed={0.2} color="#888" />
    </AbsoluteFill>
  ),
};
