import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Duotone } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Duotone> = {
  title: "Effects/Duotone",
  component: Duotone,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120}>
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    preset: { control: "select", options: ["midnight", "sunset", "neon", "vintage", "ocean", "fire", "forest", "candy", "monochrome"] },
    intensity: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    shadowColor: { control: "color" },
    highlightColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Duotone>;

const SampleContent = () => (
  <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", fontFamily: "system-ui" }}>
      COLOR GRADE
    </div>
  </div>
);

export const AllPresets: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#111">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 20 }}>
      {(["midnight", "sunset", "neon", "vintage", "ocean", "fire", "forest", "candy", "monochrome"] as const).map((p) => (
        <div key={p} style={{ width: "31%", position: "relative" }}>
          <Duotone preset={p} style={{ width: "100%", height: 100 }}>
            <div style={{ width: "100%", height: 100, background: "linear-gradient(135deg, #667eea, #764ba2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "system-ui" }}>{p}</span>
            </div>
          </Duotone>
        </div>
      ))}
    </AbsoluteFill>
  ),
};

export const AnimatedBlend: Story = {
  render: () => (
    <AbsoluteFill>
      <Duotone preset="neon" intensity={1} animated duration={1}>
        <SampleContent />
      </Duotone>
    </AbsoluteFill>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <AbsoluteFill>
      <Duotone shadowColor="#1a0033" highlightColor="#ff6b6b" intensity={0.8}>
        <SampleContent />
      </Duotone>
    </AbsoluteFill>
  ),
};
