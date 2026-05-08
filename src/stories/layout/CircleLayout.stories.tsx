import type { Meta, StoryObj } from "@storybook/react";
import { CircleLayout, ArcLayout } from "../../remotion/library/components/layout";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof CircleLayout> = {
  title: "Layout/CircleLayout",
  component: CircleLayout,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#1a1a2e">
        <div style={{ width: 500, height: 500, position: "relative" }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    radius: { control: { type: "range", min: 50, max: 200, step: 10 } },
    startAngle: { control: { type: "range", min: 0, max: 360, step: 15 } },
    endAngle: { control: { type: "range", min: 0, max: 360, step: 15 } },
    stagger: { control: { type: "range", min: 0, max: 0.2, step: 0.02 } },
    animateRotation: { control: "boolean" },
    rotationSpeed: { control: { type: "range", min: 10, max: 60, step: 5 } },
    itemRotation: { control: "select", options: ["none", "tangent", "radial"] },
  },
};

export default meta;
type Story = StoryObj<typeof CircleLayout>;

const Dot = ({ color }: { color: string }) => (
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: color,
      boxShadow: `0 4px 20px ${color}66`,
    }}
  />
);

const items = [
  <Dot key={0} color="#ef4444" />,
  <Dot key={1} color="#f59e0b" />,
  <Dot key={2} color="#22c55e" />,
  <Dot key={3} color="#3b82f6" />,
  <Dot key={4} color="#a855f7" />,
  <Dot key={5} color="#ec4899" />,
];

export const Default: Story = {
  args: {
    radius: 150,
    stagger: 0.1,
  },
  render: (args) => <CircleLayout {...args}>{items}</CircleLayout>,
};

export const RotatingCircle: Story = {
  args: {
    radius: 150,
    animateRotation: true,
    rotationSpeed: 30,
  },
  render: (args) => <CircleLayout {...args}>{items}</CircleLayout>,
};

export const TangentRotation: Story = {
  args: {
    radius: 150,
    stagger: 0.1,
    itemRotation: "tangent",
  },
  render: (args) => (
    <CircleLayout {...args}>
      {items.map((_, i) => (
        <div
          key={i}
          style={{
            width: 60,
            height: 30,
            background: `hsl(${i * 60}, 70%, 50%)`,
            borderRadius: 8,
          }}
        />
      ))}
    </CircleLayout>
  ),
};

export const HalfCircle: Story = {
  args: {
    radius: 150,
    startAngle: -90,
    endAngle: 90,
    stagger: 0.1,
  },
  render: (args) => <CircleLayout {...args}>{items.slice(0, 5)}</CircleLayout>,
};

export const ArcLayoutStory: Story = {
  render: () => (
    <ArcLayout radius={150} arcAngle={120} centerAngle={0} stagger={0.1}>
      {items.slice(0, 5)}
    </ArcLayout>
  ),
};

export const ManyItems: Story = {
  args: {
    radius: 180,
    stagger: 0.05,
  },
  render: (args) => (
    <CircleLayout {...args}>
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: `hsl(${i * 30}, 70%, 50%)`,
          }}
        />
      ))}
    </CircleLayout>
  ),
};
