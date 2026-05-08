import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Badge } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Badge> = {
  title: "Effects/Badge",
  component: Badge,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    badgeStyle: { control: "select", options: ["solid", "outline", "gradient", "glass", "neon"] },
    animation: { control: "select", options: ["fadeIn", "scaleIn", "slideDown", "bounce", "none"] },
    color: { control: "color" },
    fontSize: { control: { type: "range", min: 10, max: 32, step: 2 } },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Solid: Story = {
  args: { badgeStyle: "solid", color: "#FF6B6B", animation: "bounce" },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Badge {...args}>NEW</Badge>
    </AbsoluteFill>
  ),
};

export const AllStyles: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
      {(["solid", "outline", "gradient", "glass", "neon"] as const).map((s, i) => (
        <Badge
          key={s}
          badgeStyle={s}
          color={["#FF6B6B", "#4ECDC4", "#A78BFA", "#60A5FA", "#FFE66D"][i]}
          delay={i * 0.15}
          animation="scaleIn"
          fontSize={16}
        >
          {s.toUpperCase()}
        </Badge>
      ))}
    </AbsoluteFill>
  ),
};
