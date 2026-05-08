import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Scribble } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Scribble> = {
  title: "Effects/Scribble",
  component: Scribble,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    shape: { control: "select", options: ["circle", "underline", "arrow", "cross", "box", "checkmark", "highlight"] },
    color: { control: "color" },
    wobble: { control: { type: "range", min: 0, max: 12, step: 1 } },
    strokeWidth: { control: { type: "range", min: 1, max: 8, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Scribble>;

export const AllShapes: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 30, padding: 40 }}>
      {(["circle", "underline", "arrow", "cross", "box", "checkmark", "highlight"] as const).map((s, i) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Scribble
            shape={s}
            color={["#FF6B6B", "#FFE066", "#4ECDC4", "#F472B6", "#A78BFA", "#34D399", "#60A5FA"][i]}
            width={s === "arrow" ? 200 : 160}
            height={s === "underline" || s === "highlight" ? 30 : 80}
            wobble={4}
            strokeWidth={3}
            delay={i * 0.2}
            seed={`shape-${s}`}
          />
          <span style={{ color: "#fff8", fontSize: 11, fontFamily: "system-ui" }}>{s}</span>
        </div>
      ))}
    </AbsoluteFill>
  ),
};

export const AnnotatedText: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <span style={{ fontSize: 48, fontWeight: 700, color: "#fff", fontFamily: "system-ui" }}>
          Important
        </span>
        <div style={{ position: "absolute", inset: -15, top: -10 }}>
          <Scribble shape="circle" color="#FF6B6B" width={260} height={85} wobble={5} strokeWidth={3} passes={2} duration={0.6} />
        </div>
      </div>
    </AbsoluteFill>
  ),
};
