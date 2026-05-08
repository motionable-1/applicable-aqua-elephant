import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Callout } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Callout> = {
  title: "Effects/Callout",
  component: Callout,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Line: Story = {
  render: () => (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: "15%", top: "45%", width: 40, height: 40, borderRadius: "50%", background: "#4ECDC4" }} />
      <Callout from={[17, 50]} to={[55, 25]} color="#ffffff" dotStart arrowEnd>
        <span style={{ color: "#fff", fontSize: 18, fontFamily: "system-ui", fontWeight: 600, background: "rgba(0,0,0,0.5)", padding: "4px 12px", borderRadius: 6 }}>
          Element A
        </span>
      </Callout>
    </AbsoluteFill>
  ),
};

export const Elbow: Story = {
  render: () => (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: "10%", top: "60%", width: 60, height: 60, background: "#FF6B6B", borderRadius: 8 }} />
      <Callout from={[13, 63]} to={[60, 30]} calloutStyle="elbow" color="#FF6B6B" arrowEnd duration={0.8}>
        <span style={{ color: "#fff", fontSize: 16, fontFamily: "system-ui" }}>Annotation</span>
      </Callout>
    </AbsoluteFill>
  ),
};
