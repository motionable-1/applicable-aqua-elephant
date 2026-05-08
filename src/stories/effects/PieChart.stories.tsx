import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { PieChart } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof PieChart> = {
  title: "Effects/PieChart",
  component: PieChart,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PieChart>;

export const Donut: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <PieChart
        slices={[
          { value: 40, color: "#FF6B6B", label: "Design" },
          { value: 30, color: "#4ECDC4", label: "Dev" },
          { value: 20, color: "#A78BFA", label: "Marketing" },
          { value: 10, color: "#FFE66D", label: "Other" },
        ]}
        size={250}
        innerRadius={0.6}
        showLabels
        duration={1.2}
      />
    </AbsoluteFill>
  ),
};

export const FullPie: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <PieChart
        slices={[
          { value: 55, color: "#4ECDC4" },
          { value: 25, color: "#FF6B6B" },
          { value: 20, color: "#A78BFA" },
        ]}
        size={220}
        gap={2}
        showLabels
        duration={1}
      />
    </AbsoluteFill>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
      <PieChart
        slices={[
          { value: 72, color: "#4ECDC4" },
          { value: 28, color: "rgba(255,255,255,0.1)" },
        ]}
        size={140}
        innerRadius={0.75}
        showLabels
        duration={0.8}
      />
      <PieChart
        slices={[
          { value: 45, color: "#FF6B6B" },
          { value: 55, color: "rgba(255,255,255,0.1)" },
        ]}
        size={140}
        innerRadius={0.75}
        showLabels
        duration={0.8}
        delay={0.2}
      />
      <PieChart
        slices={[
          { value: 88, color: "#A78BFA" },
          { value: 12, color: "rgba(255,255,255,0.1)" },
        ]}
        size={140}
        innerRadius={0.75}
        showLabels
        duration={0.8}
        delay={0.4}
      />
    </AbsoluteFill>
  ),
};
