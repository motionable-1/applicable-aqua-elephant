import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Reflection } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Reflection> = {
  title: "Effects/Reflection",
  component: Reflection,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0f0f23">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    opacity: { control: { type: "range", min: 0, max: 0.8, step: 0.05 } },
    blur: { control: { type: "range", min: 0, max: 10, step: 1 } },
    offset: { control: { type: "range", min: 0, max: 30, step: 2 } },
    scale: { control: { type: "range", min: 0.5, max: 1.5, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Reflection>;

const Card = ({ children, bg }: { children: React.ReactNode; bg?: string }) => (
  <div
    style={{
      padding: "24px 40px",
      background: bg || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: 16,
      color: "white",
      fontSize: 28,
      fontWeight: 700,
      fontFamily: "system-ui",
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  args: {
    opacity: 0.3,
    blur: 2,
    offset: 4,
  },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Reflection {...args}>
        <Card>Reflection</Card>
      </Reflection>
    </AbsoluteFill>
  ),
};

export const AnimatedReveal: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Reflection opacity={0.3} blur={2} duration={0.8}>
        <Card>Fade In</Card>
      </Reflection>
    </AbsoluteFill>
  ),
};

export const ProductShowcase: Story = {
  render: () => (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Reflection opacity={0.2} blur={3} offset={8}>
        <div
          style={{
            width: 200,
            height: 260,
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 60px rgba(240, 147, 251, 0.3)",
          }}
        >
          <div style={{ fontSize: 48, fontWeight: 800, color: "#fff", fontFamily: "system-ui" }}>
            App
          </div>
        </div>
      </Reflection>
    </AbsoluteFill>
  ),
};

export const SharpReflection: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Reflection opacity={0.4} blur={0} offset={0} maskStart={0} maskEnd={0.6}>
        <Card bg="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">Sharp</Card>
      </Reflection>
    </AbsoluteFill>
  ),
};
