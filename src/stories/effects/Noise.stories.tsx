import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Noise } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Noise> = {
  title: "Effects/Noise",
  component: Noise,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    intensity: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    speed: { control: { type: "range", min: 0, max: 5, step: 0.5 } },
    opacity: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    type: { control: "select", options: ["grain", "static", "subtle"] },
  },
};

export default meta;
type Story = StoryObj<typeof Noise>;

export const Default: Story = {
  args: {
    intensity: 0.5,
    speed: 1,
    type: "grain",
    opacity: 1,
  },
  render: (args) => (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #667eea, #764ba2)",
        }}
      />
      <Noise {...args} />
    </AbsoluteFill>
  ),
};

export const FilmGrain: Story = {
  render: () => (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 48,
          fontWeight: 700,
          fontFamily: "system-ui",
        }}
      >
        CINEMATIC
      </div>
      <Noise type="grain" intensity={0.4} speed={2} blend="overlay" />
    </AbsoluteFill>
  ),
};

export const StaticTV: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#000">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill>
      <Noise type="static" intensity={0.8} speed={3} blend="normal" />
    </AbsoluteFill>
  ),
};

export const SubtleTexture: Story = {
  render: () => (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #ffecd2, #fcb69f)",
        }}
      />
      <Noise type="subtle" intensity={0.3} speed={0} blend="multiply" opacity={0.5} />
    </AbsoluteFill>
  ),
};
