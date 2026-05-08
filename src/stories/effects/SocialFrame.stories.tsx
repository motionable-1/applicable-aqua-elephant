import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { SocialFrame } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof SocialFrame> = {
  title: "Effects/SocialFrame",
  component: SocialFrame,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0a0a1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    platform: { control: "select", options: ["instagram", "tiktok", "youtube", "twitter", "linkedin"] },
    username: { control: "text" },
    likes: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SocialFrame>;

export const Instagram: Story = {
  render: () => (
    <AbsoluteFill>
      <SocialFrame platform="instagram" username="@creativestudio" likes="12.4K" comments="842" verified>
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #667eea, #764ba2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 36, fontWeight: 700, fontFamily: "system-ui" }}>
          Content Here
        </div>
      </SocialFrame>
    </AbsoluteFill>
  ),
};

export const TikTok: Story = {
  render: () => (
    <AbsoluteFill>
      <SocialFrame platform="tiktok" username="@motion.design" likes="45.2K" comments="1.2K" shares="890">
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, #0a0a1a, #1a1a2e)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 36, fontWeight: 700, fontFamily: "system-ui" }}>
          Viral Content
        </div>
      </SocialFrame>
    </AbsoluteFill>
  ),
};

export const YouTube: Story = {
  render: () => (
    <AbsoluteFill>
      <SocialFrame platform="youtube" username="Motion Studio">
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a1a2e, #16213e)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 36, fontWeight: 700, fontFamily: "system-ui" }}>
          Video Content
        </div>
      </SocialFrame>
    </AbsoluteFill>
  ),
};

export const AllPlatforms: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#111">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 20 }}>
      {(["instagram", "tiktok", "youtube", "twitter", "linkedin"] as const).map((p, i) => (
        <div key={p} style={{ width: "48%", height: 200, position: "relative" }}>
          <SocialFrame platform={p} username={`@user_${p}`} likes="1.2K" comments="42" delay={i * 0.2}>
            <div style={{ width: "100%", height: "100%", background: ["linear-gradient(135deg,#833ab4,#fd1d1d)", "#000", "#FF0000", "#1DA1F2", "#0077B5"][i], display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, fontWeight: 700, fontFamily: "system-ui" }}>
              {p.toUpperCase()}
            </div>
          </SocialFrame>
        </div>
      ))}
    </AbsoluteFill>
  ),
};
