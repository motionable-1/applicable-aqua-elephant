import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Wiggle } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Wiggle> = {
  title: "Effects/Wiggle",
  component: Wiggle,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    mode: { control: "select", options: ["handheld", "jitter", "earthquake", "subtle"] },
    intensity: { control: { type: "range", min: 0, max: 3, step: 0.1 } },
    speed: { control: { type: "range", min: 0.1, max: 3, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Wiggle>;

export const Handheld: Story = {
  args: { mode: "handheld", intensity: 1 },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Wiggle {...args}>
        <div style={{ width: 400, height: 250, background: "linear-gradient(135deg, #667eea, #764ba2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 32, fontWeight: 700, fontFamily: "system-ui" }}>Handheld Feel</span>
        </div>
      </Wiggle>
    </AbsoluteFill>
  ),
};

export const AllModes: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30, flexWrap: "wrap" }}>
      {(["subtle", "handheld", "jitter", "earthquake"] as const).map((m, i) => (
        <Wiggle key={m} mode={m} intensity={1}>
          <div style={{ width: 180, height: 120, background: ["#4ECDC4", "#667eea", "#FF6B6B", "#FFE66D"][i], borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: i === 3 ? "#000" : "#fff", fontSize: 16, fontWeight: 700, fontFamily: "system-ui" }}>{m}</span>
          </div>
        </Wiggle>
      ))}
    </AbsoluteFill>
  ),
};
