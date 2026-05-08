import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { ChromaticAberration } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof ChromaticAberration> = {
  title: "Effects/ChromaticAberration",
  component: ChromaticAberration,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#000000">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    intensity: { control: { type: "range", min: 1, max: 20, step: 1 } },
    direction: { control: "select", options: ["horizontal", "vertical", "diagonal", "radial"] },
  },
};

export default meta;
type Story = StoryObj<typeof ChromaticAberration>;

export const Horizontal: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <ChromaticAberration intensity={6} direction="horizontal">
        <div style={{ fontSize: 72, fontWeight: 900, color: "#fff", fontFamily: "system-ui", letterSpacing: -2 }}>
          GLITCH
        </div>
      </ChromaticAberration>
    </AbsoluteFill>
  ),
};

export const AnimatedRadial: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <ChromaticAberration intensity={8} direction="radial" animated animationSpeed={1.5}>
        <div style={{ fontSize: 64, fontWeight: 900, color: "#fff", fontFamily: "system-ui" }}>
          MOTION
        </div>
      </ChromaticAberration>
    </AbsoluteFill>
  ),
};

export const SubtleDiagonal: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <ChromaticAberration intensity={3} direction="diagonal">
        <div style={{ width: 300, height: 200, background: "linear-gradient(135deg, #667eea, #764ba2)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 24, fontWeight: 700, fontFamily: "system-ui" }}>
          RGB SPLIT
        </div>
      </ChromaticAberration>
    </AbsoluteFill>
  ),
};
