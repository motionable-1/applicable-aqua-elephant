import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { ShapeAnimation } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof ShapeAnimation> = {
  title: "Effects/ShapeAnimation",
  component: ShapeAnimation,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    shape: { control: "select", options: ["circle", "ring", "square", "triangle", "hexagon", "star", "cross", "diamond", "semicircle", "arc"] },
    animation: { control: "select", options: ["rotate", "scale", "pulse", "morph", "draw", "breathe"] },
    size: { control: { type: "range", min: 40, max: 300, step: 10 } },
    color: { control: "color" },
    speed: { control: { type: "range", min: 0.1, max: 3, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof ShapeAnimation>;

export const AllShapes: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 30, padding: 40 }}>
      {(["circle", "ring", "square", "triangle", "hexagon", "star", "cross", "diamond", "semicircle", "arc"] as const).map((s, i) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <ShapeAnimation
            shape={s}
            animation="rotate"
            size={80}
            color={["#FF6B6B", "#4ECDC4", "#FFE066", "#A78BFA", "#F472B6", "#34D399", "#60A5FA", "#FB923C", "#E879F9", "#38BDF8"][i]}
            speed={0.5 + i * 0.1}
          />
          <span style={{ color: "#fff8", fontSize: 10, fontFamily: "system-ui" }}>{s}</span>
        </div>
      ))}
    </AbsoluteFill>
  ),
};

export const DrawOn: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 40, padding: 40 }}>
      {(["circle", "triangle", "hexagon", "star"] as const).map((s, i) => (
        <ShapeAnimation
          key={s}
          shape={s}
          animation="draw"
          size={120}
          color={["#FF6B6B", "#4ECDC4", "#A78BFA", "#FFE066"][i]}
          strokeWidth={3}
          delay={i * 0.3}
          duration={1}
        />
      ))}
    </AbsoluteFill>
  ),
};

export const Breathing: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 50 }}>
      <ShapeAnimation shape="circle" animation="breathe" size={150} color="#A78BFA" speed={0.5} />
      <ShapeAnimation shape="hexagon" animation="breathe" size={150} color="#F472B6" speed={0.7} />
      <ShapeAnimation shape="star" animation="breathe" size={150} color="#4ECDC4" speed={0.6} />
    </AbsoluteFill>
  ),
};
