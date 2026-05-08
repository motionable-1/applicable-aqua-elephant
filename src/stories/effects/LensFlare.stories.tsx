import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { LensFlare } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof LensFlare> = {
  title: "Effects/LensFlare",
  component: LensFlare,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#000000">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    opacity: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
    scale: { control: { type: "range", min: 0.3, max: 3, step: 0.1 } },
    x: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    y: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    color: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof LensFlare>;

export const Default: Story = {
  args: {
    opacity: 1,
    scale: 1,
    x: 0.3,
    y: 0.3,
  },
  render: (args) => (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)" }}>
      <LensFlare {...args} />
    </AbsoluteFill>
  ),
};

export const AnimatedFlare: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #0a0a2e 0%, #000000 100%)" }}>
      <LensFlare animate speed={0.5} scale={1.2} />
    </AbsoluteFill>
  ),
};

export const CustomPalette: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#000" }}>
      <LensFlare
        x={0.35}
        y={0.35}
        scale={1.5}
        color="rgba(255, 200, 100, 0.8)"
        palette={{
          ring: "#ff8800",
          hex: "#ffcc00",
          disc: "#ff4400",
          ringAlt: "#ff6600",
          discAlt: "#ffaa00",
        }}
      />
    </AbsoluteFill>
  ),
};

export const CinematicScene: Story = {
  render: () => (
    <AbsoluteFill>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #1a0a2e 0%, #0a0a15 60%, #000 100%)",
        }}
      />
      <LensFlare x={0.7} y={0.2} scale={0.8} opacity={0.9} animate speed={0.3} />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 80,
          color: "#fff",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: -1 }}>CINEMATIC</div>
        <div style={{ fontSize: 14, opacity: 0.5, letterSpacing: 4 }}>LENS FLARE EFFECT</div>
      </div>
    </AbsoluteFill>
  ),
};
