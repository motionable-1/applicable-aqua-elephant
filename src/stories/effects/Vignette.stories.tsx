import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Vignette } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Vignette> = {
  title: "Effects/Vignette",
  component: Vignette,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#222">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    intensity: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    size: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    color: { control: "color" },
    shape: { control: "select", options: ["circle", "ellipse"] },
  },
};

export default meta;
type Story = StoryObj<typeof Vignette>;

export const Default: Story = {
  args: {
    intensity: 0.6,
    size: 0.3,
    color: "#000000",
    shape: "ellipse",
  },
  render: (args) => (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #4facfe, #00f2fe)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 48,
          fontWeight: 700,
          fontFamily: "system-ui",
        }}
      >
        VIGNETTE
      </div>
      <Vignette {...args} />
    </AbsoluteFill>
  ),
};

export const Cinematic: Story = {
  render: () => (
    <AbsoluteFill>
      <img
        src="https://picsum.photos/1920/1080"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <Vignette intensity={0.85} size={0.2} />
    </AbsoluteFill>
  ),
};

export const ColoredVignette: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#111" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 36,
          fontWeight: 600,
          fontFamily: "system-ui",
        }}
      >
        Colored Edges
      </div>
      <Vignette intensity={0.7} size={0.25} color="#1a0033" />
    </AbsoluteFill>
  ),
};
