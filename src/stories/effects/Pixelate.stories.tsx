import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Pixelate } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Pixelate> = {
  title: "Effects/Pixelate",
  component: Pixelate,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    pixelSize: { control: { type: "range", min: 1, max: 40, step: 1 } },
    duration: { control: { type: "range", min: 0, max: 3, step: 0.1 } },
    delay: { control: { type: "range", min: 0, max: 2, step: 0.1 } },
    direction: { control: { type: "radio" }, options: ["in", "out"] },
  },
};

export default meta;
type Story = StoryObj<typeof Pixelate>;

const SampleContent = () => (
  <AbsoluteFill
    style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div style={{ color: "#fff", fontFamily: "system-ui", textAlign: "center" }}>
      <div style={{ fontSize: 48, fontWeight: 800 }}>HELLO</div>
      <div style={{ fontSize: 16, opacity: 0.7, letterSpacing: 4 }}>PIXELATED WORLD</div>
    </div>
  </AbsoluteFill>
);

export const Static: Story = {
  args: {
    pixelSize: 10,
  },
  render: (args) => (
    <Pixelate {...args} style={{ width: "100%", height: "100%" }}>
      <SampleContent />
    </Pixelate>
  ),
};

export const RevealOut: Story = {
  render: () => (
    <Pixelate pixelSize={20} duration={1.5} direction="out">
      <SampleContent />
    </Pixelate>
  ),
};

export const PixelateIn: Story = {
  render: () => (
    <Pixelate pixelSize={15} duration={1} direction="in" ease="smooth">
      <SampleContent />
    </Pixelate>
  ),
};

export const DelayedReveal: Story = {
  render: () => (
    <Pixelate pixelSize={25} duration={1} delay={0.5} direction="out">
      <SampleContent />
    </Pixelate>
  ),
};

export const HeavyPixelation: Story = {
  render: () => (
    <Pixelate pixelSize={40}>
      <SampleContent />
    </Pixelate>
  ),
};
