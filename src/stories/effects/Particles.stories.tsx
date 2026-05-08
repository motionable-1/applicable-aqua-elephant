import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Particles } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Particles> = {
  title: "Effects/Particles",
  component: Particles,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#111">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    count: { control: { type: "range", min: 10, max: 200, step: 10 } },
    type: { control: "select", options: ["confetti", "sparks", "dust", "snow", "bubbles", "stars"] },
    speed: { control: { type: "range", min: 0.1, max: 3, step: 0.1 } },
    gravity: { control: { type: "range", min: -200, max: 200, step: 10 } },
    wind: { control: { type: "range", min: -100, max: 100, step: 5 } },
  },
};

export default meta;
type Story = StoryObj<typeof Particles>;

export const Confetti: Story = {
  args: {
    count: 80,
    type: "confetti",
    speed: 1,
  },
  render: (args) => (
    <AbsoluteFill style={{ background: "#1a1a2e" }}>
      <Particles {...args} />
    </AbsoluteFill>
  ),
};

export const Sparks: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      <Particles type="sparks" count={60} speed={1.5} />
      <div
        style={{
          position: "absolute",
          bottom: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 64,
          fontWeight: 900,
          color: "#FFD700",
          fontFamily: "system-ui",
          textShadow: "0 0 30px rgba(255,215,0,0.5)",
        }}
      >
        FIRE
      </div>
    </AbsoluteFill>
  ),
};

export const Snow: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={300} backgroundColor="#1a2332">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #0f1923, #1a2332)" }}>
      <Particles type="snow" count={100} speed={0.5} wind={15} />
    </AbsoluteFill>
  ),
};

export const Dust: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #2c1810, #3d2317)" }}>
      <Particles type="dust" count={40} speed={0.3} />
    </AbsoluteFill>
  ),
};

export const Bubbles: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #006994, #003d5b)" }}>
      <Particles type="bubbles" count={30} speed={0.6} />
    </AbsoluteFill>
  ),
};

export const Starfield: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={300} backgroundColor="#000">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill style={{ background: "#000" }}>
      <Particles type="stars" count={120} speed={0.2} gravity={0} />
    </AbsoluteFill>
  ),
};
