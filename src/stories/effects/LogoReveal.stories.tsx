import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { LogoReveal } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof LogoReveal> = {
  title: "Effects/LogoReveal",
  component: LogoReveal,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0a0a1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    revealStyle: { control: "select", options: ["scale", "blur", "glow", "wipe", "bounce", "elastic"] },
    duration: { control: { type: "range", min: 0.3, max: 3, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof LogoReveal>;

const Logo = () => (
  <div style={{ fontSize: 64, fontWeight: 900, color: "#fff", fontFamily: "system-ui", letterSpacing: -2 }}>
    LOGO
  </div>
);

export const AllStyles: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 50 }}>
      {(["scale", "blur", "glow", "wipe", "bounce", "elastic"] as const).map((s, i) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <LogoReveal revealStyle={s} delay={i * 0.3} duration={1} glowColor="#FFD700">
            <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", fontFamily: "system-ui" }}>
              LOGO
            </div>
          </LogoReveal>
          <span style={{ color: "#fff6", fontSize: 11, fontFamily: "system-ui" }}>{s}</span>
        </div>
      ))}
    </AbsoluteFill>
  ),
};

export const GoldenGlow: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <LogoReveal revealStyle="glow" glowColor="#FFD700" glowIntensity={1.5} duration={1.5}>
        <Logo />
      </LogoReveal>
    </AbsoluteFill>
  ),
};
