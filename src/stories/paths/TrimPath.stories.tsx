import type { Meta, StoryObj } from "@storybook/react";
import { TrimPath, DrawPath } from "../../remotion/library/components/paths";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof TrimPath> = {
  title: "Paths/TrimPath",
  component: TrimPath,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    duration: { control: { type: "range", min: 0.5, max: 3, step: 0.1 } },
    delay: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
    stroke: { control: "color" },
    strokeWidth: { control: { type: "range", min: 1, max: 10, step: 1 } },
    ease: {
      control: "select",
      options: ["smooth", "bouncy", "snappy", "gentle"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TrimPath>;

// Sample paths
const curvePath = "M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80";
// Proper heart shape with two lobes at top and point at bottom
const heartPath =
  "M100 40 C100 40 80 20 55 20 C20 20 20 60 20 60 C20 100 50 130 100 170 C150 130 180 100 180 60 C180 60 180 20 145 20 C120 20 100 40 100 40 Z";
const starPath =
  "M100 10 L120 80 L190 80 L135 125 L155 195 L100 150 L45 195 L65 125 L10 80 L80 80 Z";
const checkPath = "M20 100 L45 130 L80 60";

export const SimpleCurve: Story = {
  args: {
    path: curvePath,
    duration: 1.5,
    stroke: "#667eea",
    strokeWidth: 3,
    viewBox: "0 0 200 200",
    width: 300,
    height: 300,
  },
  render: (args) => <TrimPath {...args} />,
};

export const HeartDraw: Story = {
  args: {
    path: heartPath,
    duration: 2,
    stroke: "#ef4444",
    strokeWidth: 3,
    viewBox: "0 0 200 240",
    width: 250,
    height: 300,
  },
  render: (args) => <TrimPath {...args} />,
};

export const StarOutline: Story = {
  args: {
    path: starPath,
    duration: 1.5,
    stroke: "#fbbf24",
    strokeWidth: 2,
    viewBox: "0 0 200 200",
    width: 300,
    height: 300,
  },
  render: (args) => <TrimPath {...args} />,
};

export const Checkmark: Story = {
  args: {
    path: checkPath,
    duration: 0.6,
    stroke: "#22c55e",
    strokeWidth: 8,
    strokeLinecap: "round",
    viewBox: "0 0 100 160",
    width: 150,
    height: 200,
  },
  render: (args) => <TrimPath {...args} />,
};

export const DrawWithHead: Story = {
  render: () => (
    <DrawPath
      path={curvePath}
      duration={2}
      stroke="#3b82f6"
      strokeWidth={3}
      viewBox="0 0 200 200"
      width={300}
      height={300}
      head={<circle r={6} fill="#3b82f6" />}
      trail={0.3}
    />
  ),
};

export const BouncyEase: Story = {
  args: {
    path: heartPath,
    duration: 1.5,
    stroke: "#a855f7",
    strokeWidth: 3,
    ease: "bouncy",
    viewBox: "0 0 200 240",
    width: 250,
    height: 300,
  },
  render: (args) => <TrimPath {...args} />,
};
