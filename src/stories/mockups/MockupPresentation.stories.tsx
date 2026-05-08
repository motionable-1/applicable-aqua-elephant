import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { MockupPresentation } from "../../remotion/library/components/mockups/MockupPresentation";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof MockupPresentation> = {
  title: "Mockups/MockupPresentation",
  component: MockupPresentation,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0f0f23">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    rotateX: { control: { type: "range", min: -30, max: 30, step: 1 } },
    rotateY: { control: { type: "range", min: -45, max: 45, step: 1 } },
    rotateZ: { control: { type: "range", min: -15, max: 15, step: 1 } },
    float: { control: { type: "range", min: 0, max: 30, step: 2 } },
    floatSpeed: { control: { type: "range", min: 0.5, max: 3, step: 0.25 } },
    shadow: { control: "boolean" },
    reflection: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof MockupPresentation>;

const MockCard = ({ color, label }: { color: string; label: string }) => (
  <div
    style={{
      width: 300,
      height: 200,
      background: color,
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: 24,
      fontWeight: 700,
      fontFamily: "system-ui",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    }}
  >
    {label}
  </div>
);

export const Default: Story = {
  args: {
    rotateY: -15,
    float: 10,
    shadow: true,
  },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <MockupPresentation {...args}>
        <MockCard color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" label="3D Card" />
      </MockupPresentation>
    </AbsoluteFill>
  ),
};

export const FloatingCard: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <MockupPresentation rotateX={10} rotateY={-20} float={20} floatSpeed={1} shadow>
        <MockCard color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" label="Floating" />
      </MockupPresentation>
    </AbsoluteFill>
  ),
};

export const WithReflection: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <MockupPresentation rotateY={-12} shadow reflection>
        <MockCard color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" label="Reflection" />
      </MockupPresentation>
    </AbsoluteFill>
  ),
};

export const FlatPresentation: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <MockupPresentation rotateX={25} rotateY={0} float={15} shadow>
        <div
          style={{
            width: 400,
            height: 250,
            background: "#1e1e1e",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ height: 32, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", padding: "0 12px", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
          </div>
          <div style={{ padding: 16, color: "#c9d1d9", fontFamily: "monospace", fontSize: 13 }}>
            <span style={{ color: "#ff7b72" }}>const</span> app = <span style={{ color: "#d2a8ff" }}>createApp</span>();
          </div>
        </div>
      </MockupPresentation>
    </AbsoluteFill>
  ),
};
