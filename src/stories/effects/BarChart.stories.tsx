import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { BarChart } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof BarChart> = {
  title: "Effects/BarChart",
  component: BarChart,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const Vertical: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <BarChart
        bars={[
          { value: 85, label: "React", color: "#61DAFB" },
          { value: 72, label: "Vue", color: "#42B883" },
          { value: 58, label: "Angular", color: "#DD0031" },
          { value: 45, label: "Svelte", color: "#FF3E00" },
          { value: 38, label: "Solid", color: "#4F88C6" },
        ]}
        width={400}
        height={280}
        stagger={0.12}
      />
    </AbsoluteFill>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <BarChart
        bars={[
          { value: 92, label: "Q1", color: "#4ECDC4" },
          { value: 78, label: "Q2", color: "#44B09E" },
          { value: 65, label: "Q3", color: "#3B8C82" },
          { value: 88, label: "Q4", color: "#4ECDC4" },
        ]}
        orientation="horizontal"
        width={400}
        height={200}
        stagger={0.15}
        borderRadius={6}
      />
    </AbsoluteFill>
  ),
};
