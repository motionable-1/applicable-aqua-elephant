import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { SpeedLines } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof SpeedLines> = {
  title: "Effects/SpeedLines",
  component: SpeedLines,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#111111">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    count: { control: { type: "range", min: 5, max: 80, step: 5 } },
    color: { control: "color" },
    length: { control: { type: "range", min: 0.1, max: 1, step: 0.05 } },
    innerRadius: { control: { type: "range", min: 0, max: 0.5, step: 0.05 } },
    speed: { control: { type: "range", min: 0, max: 20, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof SpeedLines>;

export const Default: Story = {
  args: {
    count: 30,
    color: "#ffffff",
    length: 0.5,
    innerRadius: 0.2,
    speed: 10,
  },
  render: (args) => (
    <AbsoluteFill>
      <SpeedLines {...args} />
    </AbsoluteFill>
  ),
};

export const ActionImpact: Story = {
  render: () => (
    <AbsoluteFill>
      <SpeedLines count={50} color="#ff4444" length={0.7} innerRadius={0.1} speed={15} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 72,
          fontWeight: 900,
          color: "#fff",
          fontFamily: "system-ui",
          textShadow: "0 0 20px rgba(255,68,68,0.8)",
        }}
      >
        BOOM!
      </div>
    </AbsoluteFill>
  ),
};

export const SubtleBackground: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}>
      <SpeedLines count={20} color="rgba(255,255,255,0.15)" length={0.3} innerRadius={0.3} speed={3} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 36,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "system-ui",
        }}
      >
        Speed Lines
      </div>
    </AbsoluteFill>
  ),
};

export const AnimeStyle: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#000000">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill>
      <SpeedLines count={60} color="#ffffff" length={0.8} innerRadius={0.05} speed={20} />
    </AbsoluteFill>
  ),
};
