import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Glass } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Glass> = {
  title: "Effects/Glass",
  component: Glass,
  argTypes: {
    blur: { control: { type: "range", min: 0, max: 40, step: 2 } },
    opacity: { control: { type: "range", min: 0, max: 0.5, step: 0.05 } },
    borderOpacity: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
    borderRadius: { control: { type: "range", min: 0, max: 32, step: 2 } },
    noise: { control: { type: "range", min: 0, max: 0.2, step: 0.01 } },
    chromatic: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Glass>;

const GradientBg = ({ children }: { children: React.ReactNode }) => (
  <AbsoluteFill
    style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* Decorative circles behind the glass */}
    <div style={{ position: "absolute", top: 80, left: 200, width: 200, height: 200, borderRadius: "50%", background: "#ff6b6b", opacity: 0.6 }} />
    <div style={{ position: "absolute", bottom: 100, right: 200, width: 150, height: 150, borderRadius: "50%", background: "#48dbfb", opacity: 0.6 }} />
    <div style={{ position: "absolute", top: 200, right: 350, width: 100, height: 100, borderRadius: "50%", background: "#feca57", opacity: 0.6 }} />
    {children}
  </AbsoluteFill>
);

export const Default: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  args: {
    blur: 16,
    opacity: 0.1,
    borderRadius: 16,
    noise: 0.05,
  },
  render: (args) => (
    <GradientBg>
      <Glass {...args} style={{ width: 350, padding: 32 }}>
        <div style={{ color: "#fff", fontFamily: "system-ui" }}>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Glass Card</div>
          <div style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.6 }}>
            Frosted glass effect with backdrop blur, noise texture, and subtle borders.
          </div>
        </div>
      </Glass>
    </GradientBg>
  ),
};

export const AnimatedFrost: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <GradientBg>
      <Glass blur={20} opacity={0.15} duration={1} borderRadius={20} style={{ width: 350, padding: 32 }}>
        <div style={{ color: "#fff", fontFamily: "system-ui" }}>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Animated Frost</div>
          <div style={{ fontSize: 14, opacity: 0.8 }}>Blur builds up over 1 second.</div>
        </div>
      </Glass>
    </GradientBg>
  ),
};

export const ChromaticBorder: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <GradientBg>
      <Glass blur={20} opacity={0.1} chromatic borderRadius={16} style={{ width: 300, padding: 28 }}>
        <div style={{ color: "#fff", fontFamily: "system-ui", textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Chromatic Edge</div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Rainbow border effect</div>
        </div>
      </Glass>
    </GradientBg>
  ),
};

export const DarkGlass: Story = {
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
        background: "radial-gradient(circle at 30% 40%, #1a1a4e, #0a0a0a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "absolute", top: 100, left: 250, width: 180, height: 180, borderRadius: "50%", background: "#6366f1", opacity: 0.3, filter: "blur(40px)" }} />
      <Glass blur={24} opacity={0.08} color="rgba(255,255,255)" noise={0.03} borderRadius={20} style={{ width: 320, padding: 32 }}>
        <div style={{ color: "#fff", fontFamily: "system-ui" }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Dark Mode</div>
          <div style={{ fontSize: 13, opacity: 0.6, lineHeight: 1.5 }}>Subtle glass on dark backgrounds.</div>
        </div>
      </Glass>
    </AbsoluteFill>
  ),
};
