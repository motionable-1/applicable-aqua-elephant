import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { RetroOverlay } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof RetroOverlay> = {
  title: "Effects/RetroOverlay",
  component: RetroOverlay,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#111">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    retroStyle: { control: "select", options: ["vhs", "crt", "film", "camcorder"] },
    intensity: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    speed: { control: { type: "range", min: 0.1, max: 3, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof RetroOverlay>;

export const VHS: Story = {
  args: { retroStyle: "vhs", intensity: 0.6 },
  render: (args) => (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a1a2e, #16213e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#fff", fontSize: 64, fontWeight: 900, fontFamily: "system-ui" }}>REWIND</span>
      </div>
      <RetroOverlay {...args} />
    </AbsoluteFill>
  ),
};

export const CRT: Story = {
  render: () => (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#33ff33", fontSize: 32, fontFamily: "monospace" }}>TERMINAL_</span>
      </div>
      <RetroOverlay retroStyle="crt" intensity={0.7} />
    </AbsoluteFill>
  ),
};

export const Film: Story = {
  render: () => (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #2c1810, #1a0f0a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#d4a574", fontSize: 48, fontWeight: 300, fontFamily: "Georgia, serif", letterSpacing: 8 }}>VINTAGE</span>
      </div>
      <RetroOverlay retroStyle="film" intensity={0.5} />
    </AbsoluteFill>
  ),
};

export const Camcorder: Story = {
  render: () => (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a3a2a, #0a1a15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#fff", fontSize: 36, fontFamily: "system-ui" }}>Home Video</span>
      </div>
      <RetroOverlay retroStyle="camcorder" intensity={0.6} />
    </AbsoluteFill>
  ),
};
