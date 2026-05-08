import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Spotlight } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Spotlight> = {
  title: "Effects/Spotlight",
  component: Spotlight,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    x: { control: { type: "range", min: 0, max: 100, step: 1 } },
    y: { control: { type: "range", min: 0, max: 100, step: 1 } },
    size: { control: { type: "range", min: 5, max: 60, step: 1 } },
    softness: { control: { type: "range", min: 0, max: 30, step: 1 } },
    darkness: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
  },
};

export default meta;
type Story = StoryObj<typeof Spotlight>;

export const Default: Story = {
  args: { x: 50, y: 45, size: 25, softness: 12, darkness: 0.75 },
  render: (args) => (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 48, fontWeight: 700, fontFamily: "system-ui" }}>
        SPOTLIGHT
      </div>
      <Spotlight {...args} />
    </AbsoluteFill>
  ),
};

export const AnimatedPan: Story = {
  render: () => (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #667eea, #764ba2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 60 }}>
          <span style={{ color: "#fff", fontSize: 48, fontWeight: 900, fontFamily: "system-ui" }}>A</span>
          <span style={{ color: "#fff", fontSize: 48, fontWeight: 900, fontFamily: "system-ui" }}>B</span>
          <span style={{ color: "#fff", fontSize: 48, fontWeight: 900, fontFamily: "system-ui" }}>C</span>
        </div>
      </div>
      <Spotlight x={70} y={48} fromX={30} fromY={48} size={15} softness={10} darkness={0.8} duration={2} />
    </AbsoluteFill>
  ),
};

export const Reveal: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#111" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 36, fontFamily: "system-ui" }}>
        Hidden Content
      </div>
      <Spotlight x={50} y={50} size={30} fromSize={2} softness={15} darkness={0.9} duration={1.5} />
    </AbsoluteFill>
  ),
};
