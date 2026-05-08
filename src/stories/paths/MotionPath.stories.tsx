import type { Meta, StoryObj } from "@storybook/react";
import {
  MotionPath,
  MotionPathWithTrail,
} from "../../remotion/library/components/paths";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof MotionPath> = {
  title: "Paths/MotionPath",
  component: MotionPath,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#1a1a2e">
        <div style={{ width: 400, height: 400, position: "relative" }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    duration: { control: { type: "range", min: 1, max: 5, step: 0.5 } },
    delay: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
    autoRotate: { control: "boolean" },
    rotateOffset: { control: { type: "range", min: -180, max: 180, step: 15 } },
    start: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
    end: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
    ease: {
      control: "select",
      options: ["smooth", "bouncy", "snappy", "gentle"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MotionPath>;

// Sample paths
const curvePath = "M20 180 C 60 20, 140 20, 180 180";
const circlePath = "M100 20 A80 80 0 1 1 99.99 20";
const figurePath = "M50 150 Q100 50 150 150 T250 150";
const wavePath = "M20 100 Q60 20 100 100 T180 100 T260 100 T340 100";

const Dot = () => (
  <div
    style={{
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.5)",
    }}
  />
);

const Arrow = () => (
  <div
    style={{
      width: 0,
      height: 0,
      borderLeft: "12px solid #22c55e",
      borderTop: "6px solid transparent",
      borderBottom: "6px solid transparent",
    }}
  />
);

export const BasicMotion: Story = {
  args: {
    path: curvePath,
    duration: 2,
    viewBox: "0 0 200 200",
  },
  render: (args) => (
    <MotionPath {...args}>
      <Dot />
    </MotionPath>
  ),
};

export const CircularPath: Story = {
  args: {
    path: circlePath,
    duration: 3,
    viewBox: "0 0 200 200",
  },
  render: (args) => (
    <MotionPath {...args}>
      <Dot />
    </MotionPath>
  ),
};

export const WithAutoRotate: Story = {
  args: {
    path: curvePath,
    duration: 2,
    autoRotate: true,
    viewBox: "0 0 200 200",
  },
  render: (args) => (
    <MotionPath {...args}>
      <Arrow />
    </MotionPath>
  ),
};

export const WavePath: Story = {
  args: {
    path: wavePath,
    duration: 3,
    viewBox: "0 0 360 200",
  },
  render: (args) => (
    <div style={{ width: "100%", height: "100%" }}>
      <MotionPath {...args}>
        <Dot />
      </MotionPath>
    </div>
  ),
};

export const PartialPath: Story = {
  args: {
    path: circlePath,
    duration: 2,
    start: 0,
    end: 0.5,
    viewBox: "0 0 200 200",
  },
  render: (args) => (
    <MotionPath {...args}>
      <Dot />
    </MotionPath>
  ),
};

export const WithTrail: Story = {
  render: () => (
    <MotionPathWithTrail
      path={curvePath}
      duration={2.5}
      viewBox="0 0 200 200"
      showPath
      drawTrail
      trailColor="#3b82f6"
      trailWidth={3}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#3b82f6",
          boxShadow: "0 0 10px #3b82f6",
        }}
      />
    </MotionPathWithTrail>
  ),
};

export const TrailWithAutoRotate: Story = {
  render: () => (
    <MotionPathWithTrail
      path={figurePath}
      duration={3}
      viewBox="0 0 300 200"
      showPath
      drawTrail
      trailColor="#ef4444"
      trailWidth={2}
      autoRotate
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "10px solid #ef4444",
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
        }}
      />
    </MotionPathWithTrail>
  ),
};

export const BouncyMotion: Story = {
  args: {
    path: curvePath,
    duration: 2,
    ease: "bouncy",
    viewBox: "0 0 200 200",
  },
  render: (args) => (
    <MotionPath {...args}>
      <Dot />
    </MotionPath>
  ),
};
