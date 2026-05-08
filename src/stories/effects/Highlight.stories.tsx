import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Highlight } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Highlight> = {
  title: "Effects/Highlight",
  component: Highlight,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120}>
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    highlightStyle: { control: "select", options: ["marker", "underline", "box", "circle", "strikethrough"] },
    color: { control: "color" },
    duration: { control: { type: "range", min: 0.1, max: 2, step: 0.1 } },
    thickness: { control: { type: "range", min: 0.1, max: 1, step: 0.05 } },
  },
};

export default meta;
type Story = StoryObj<typeof Highlight>;

export const Marker: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 48, fontWeight: 700, color: "#fff", fontFamily: "system-ui" }}>
        This is <Highlight highlightStyle="marker" color="#FFE066" duration={0.8}>important</Highlight> text
      </span>
    </AbsoluteFill>
  ),
};

export const Underline: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 48, fontWeight: 700, color: "#fff", fontFamily: "system-ui" }}>
        <Highlight highlightStyle="underline" color="#FF6B6B" duration={0.6}>Underlined</Highlight> word
      </span>
    </AbsoluteFill>
  ),
};

export const AllStyles: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#1a1a2e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
      {(["marker", "underline", "box", "circle", "strikethrough"] as const).map((s, i) => (
        <span key={s} style={{ fontSize: 36, fontWeight: 600, color: "#fff", fontFamily: "system-ui" }}>
          <Highlight highlightStyle={s} color={["#FFE066", "#FF6B6B", "#4ECDC4", "#A78BFA", "#F472B6"][i]} delay={i * 0.3} duration={0.5}>
            {s}
          </Highlight>
        </span>
      ))}
    </AbsoluteFill>
  ),
};
