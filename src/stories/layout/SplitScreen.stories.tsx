import type { Meta, StoryObj } from "@storybook/react";
import { SplitScreen } from "../../remotion/library/components/layout";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof SplitScreen> = {
  title: "Layout/SplitScreen",
  component: SplitScreen,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0f0f23">
        <div style={{ width: 600, height: 400 }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    layout: {
      control: "select",
      options: ["horizontal", "vertical", "diagonal"],
    },
    ratio: { control: { type: "range", min: 0.2, max: 0.8, step: 0.1 } },
    gap: { control: { type: "range", min: 0, max: 20, step: 2 } },
    animated: { control: "boolean" },
    fromRatio: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof SplitScreen>;

const Panel = ({ color, label }: { color: string; label: string }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: 24,
      fontWeight: 700,
      fontFamily: "system-ui",
    }}
  >
    {label}
  </div>
);

export const Horizontal: Story = {
  args: {
    layout: "horizontal",
    ratio: 0.5,
  },
  render: (args) => (
    <SplitScreen {...args}>
      <Panel color="#667eea" label="Left" />
      <Panel color="#764ba2" label="Right" />
    </SplitScreen>
  ),
};

export const Vertical: Story = {
  args: {
    layout: "vertical",
    ratio: 0.6,
  },
  render: (args) => (
    <SplitScreen {...args}>
      <Panel color="#22c55e" label="Top" />
      <Panel color="#16a34a" label="Bottom" />
    </SplitScreen>
  ),
};

export const Diagonal: Story = {
  args: {
    layout: "diagonal",
    ratio: 0.5,
  },
  render: (args) => (
    <SplitScreen {...args}>
      <Panel color="#ef4444" label="Left" />
      <Panel color="#f59e0b" label="Right" />
    </SplitScreen>
  ),
};

export const AnimatedSplit: Story = {
  args: {
    layout: "horizontal",
    animated: true,
    fromRatio: 0,
    ratio: 0.5,
    duration: 0.8,
  },
  render: (args) => (
    <SplitScreen {...args}>
      <Panel color="#3b82f6" label="Reveals" />
      <Panel color="#1d4ed8" label="Animated" />
    </SplitScreen>
  ),
};

export const WithGap: Story = {
  args: {
    layout: "horizontal",
    ratio: 0.5,
    gap: 16,
  },
  render: (args) => (
    <SplitScreen {...args}>
      <Panel color="#a855f7" label="Panel 1" />
      <Panel color="#7c3aed" label="Panel 2" />
    </SplitScreen>
  ),
};

export const CustomRatio: Story = {
  args: {
    layout: "horizontal",
    ratio: 0.3,
  },
  render: (args) => (
    <SplitScreen {...args}>
      <Panel color="#ec4899" label="30%" />
      <Panel color="#db2777" label="70%" />
    </SplitScreen>
  ),
};
