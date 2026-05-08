import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { LiquidShape } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof LiquidShape> = {
  title: "Effects/LiquidShape",
  component: LiquidShape,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    preset: { control: "select", options: ["blob", "circle", "wave", "pill", "organic"] },
    size: { control: { type: "range", min: 100, max: 500, step: 20 } },
    speed: { control: { type: "range", min: 0.1, max: 3, step: 0.1 } },
    color: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof LiquidShape>;

export const GradientBlob: Story = {
  args: { color: "#FF6B6B", colorEnd: "#4ECDC4", size: 300, speed: 1 },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <LiquidShape {...args} />
    </AbsoluteFill>
  ),
};

export const AllPresets: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
      {(["blob", "circle", "wave", "pill", "organic"] as const).map((p, i) => (
        <div key={p} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <LiquidShape
            preset={p}
            color={["#FF6B6B", "#4ECDC4", "#A78BFA", "#FFE66D", "#F472B6"][i]}
            colorEnd={["#FFE66D", "#60A5FA", "#F472B6", "#4ECDC4", "#A78BFA"][i]}
            size={160}
            speed={0.8}
            seed={`preset-${p}`}
          />
          <span style={{ color: "#fff8", fontSize: 12, fontFamily: "system-ui" }}>{p}</span>
        </div>
      ))}
    </AbsoluteFill>
  ),
};

export const BackgroundDecoration: Story = {
  render: () => (
    <AbsoluteFill style={{ background: "#0a0a1a" }}>
      <div style={{ position: "absolute", top: "10%", left: "5%", opacity: 0.3 }}>
        <LiquidShape color="#A78BFA" colorEnd="#F472B6" size={400} speed={0.5} preset="organic" seed="bg-1" />
      </div>
      <div style={{ position: "absolute", bottom: "5%", right: "10%", opacity: 0.25 }}>
        <LiquidShape color="#4ECDC4" colorEnd="#60A5FA" size={350} speed={0.7} preset="wave" seed="bg-2" />
      </div>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 48, fontWeight: 700, fontFamily: "system-ui" }}>
        Liquid Background
      </div>
    </AbsoluteFill>
  ),
};
