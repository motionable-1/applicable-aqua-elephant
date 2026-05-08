import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { LowerThird } from "../../remotion/library/components/text";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof LowerThird> = {
  title: "Text/LowerThird",
  component: LowerThird,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120}>
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    lowerThirdStyle: { control: "select", options: ["minimal", "boxed", "accent", "split", "gradient"] },
    color: { control: "color" },
    titleSize: { control: { type: "range", min: 16, max: 48, step: 2 } },
  },
};

export default meta;
type Story = StoryObj<typeof LowerThird>;

export const Minimal: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
      <LowerThird title="Jane Smith" subtitle="Creative Director" lowerThirdStyle="minimal" color="#4ECDC4" />
    </AbsoluteFill>
  ),
};

export const Boxed: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #2c1810, #3d2317)" }}>
      <LowerThird title="Breaking News" subtitle="Live from the studio" lowerThirdStyle="boxed" color="#FF6B6B" />
    </AbsoluteFill>
  ),
};

export const Accent: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#111" }}>
      <LowerThird title="Alex Johnson" subtitle="Lead Engineer" lowerThirdStyle="accent" color="#A78BFA" />
    </AbsoluteFill>
  ),
};

export const Split: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#0a0a1a" }}>
      <LowerThird title="TECH" subtitle="Innovation Summit 2025" lowerThirdStyle="split" color="#FFE66D" textColor="#000" />
    </AbsoluteFill>
  ),
};

export const Gradient: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #0f0c29, #302b63)" }}>
      <LowerThird title="Sarah Chen" subtitle="Head of Design" lowerThirdStyle="gradient" color="#F472B6" />
    </AbsoluteFill>
  ),
};

export const AllStyles: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#111">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill>
      {(["minimal", "boxed", "accent", "split", "gradient"] as const).map((s, i) => (
        <LowerThird
          key={s}
          title="Speaker Name"
          subtitle={s.charAt(0).toUpperCase() + s.slice(1) + " Style"}
          lowerThirdStyle={s}
          color={["#4ECDC4", "#FF6B6B", "#A78BFA", "#FFE66D", "#F472B6"][i]}
          bottom={80 + i * 70}
          delay={i * 0.3}
        />
      ))}
    </AbsoluteFill>
  ),
};
