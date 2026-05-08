import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Neon } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Neon> = {
  title: "Effects/Neon",
  component: Neon,
  argTypes: {
    color: { control: "color" },
    glow: { control: { type: "range", min: 5, max: 40, step: 5 } },
    flicker: { control: { type: "range", min: 0, max: 0.5, step: 0.05 } },
    flickerSpeed: { control: { type: "range", min: 0.5, max: 4, step: 0.5 } },
  },
};

export default meta;
type Story = StoryObj<typeof Neon>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0a0a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  args: {
    color: "#00ff00",
    glow: 15,
    flicker: 0.05,
  },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Neon {...args}>
        <div style={{ fontSize: 64, fontWeight: 700, fontFamily: "system-ui" }}>OPEN</div>
      </Neon>
    </AbsoluteFill>
  ),
};

export const FlickeringSign: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0a0a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Neon color="#ff0055" glow={25} flicker={0.15} flickerSpeed={2}>
        <div style={{ fontSize: 56, fontWeight: 800, fontFamily: "system-ui", letterSpacing: 4 }}>
          BAR
        </div>
      </Neon>
    </AbsoluteFill>
  ),
};

export const NeonBox: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0a0a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Neon color="#00ffff" glow={20} borderWidth={2} borderRadius={16} flicker={0.03}>
        <div style={{ padding: "20px 40px", fontSize: 24, fontWeight: 600, fontFamily: "system-ui" }}>
          Neon Border
        </div>
      </Neon>
    </AbsoluteFill>
  ),
};

export const MultipleColors: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0a0a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
        flexDirection: "column",
      }}
    >
      <Neon color="#ff0055" glow={20} flicker={0.1} flickerSpeed={1.5}>
        <div style={{ fontSize: 48, fontWeight: 800, fontFamily: "system-ui" }}>CASINO</div>
      </Neon>
      <div style={{ display: "flex", gap: 40 }}>
        <Neon color="#00ff88" glow={15} flicker={0.05}>
          <div style={{ fontSize: 28, fontWeight: 600, fontFamily: "system-ui" }}>SLOTS</div>
        </Neon>
        <Neon color="#ffaa00" glow={15} flicker={0.08} flickerSpeed={3}>
          <div style={{ fontSize: 28, fontWeight: 600, fontFamily: "system-ui" }}>POKER</div>
        </Neon>
        <Neon color="#aa00ff" glow={15} flicker={0.05}>
          <div style={{ fontSize: 28, fontWeight: 600, fontFamily: "system-ui" }}>ROULETTE</div>
        </Neon>
      </div>
    </AbsoluteFill>
  ),
};

export const CyberpunkSign: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#050510">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Neon color="#ff00ff" glow={30} flicker={0.2} flickerSpeed={2}>
        <div style={{ fontSize: 72, fontWeight: 900, fontFamily: "system-ui", letterSpacing: 8 }}>
          CYBER
        </div>
      </Neon>
      <Neon color="#00ffff" glow={20} flicker={0.1}>
        <div style={{ fontSize: 18, fontWeight: 500, fontFamily: "system-ui", letterSpacing: 12 }}>
          NIGHT CITY
        </div>
      </Neon>
    </AbsoluteFill>
  ),
};
