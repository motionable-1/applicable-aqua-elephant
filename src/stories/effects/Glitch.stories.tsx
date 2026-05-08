import type { Meta, StoryObj } from "@storybook/react";
import { Glitch } from "../../remotion/library/components/effects/svg";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Glitch> = {
  title: "Effects/Glitch",
  component: Glitch,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a0a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    type: {
      control: "select",
      options: ["rgbSplit", "scanlines", "blocks", "noise", "full"],
    },
    intensity: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
    animate: { control: "boolean" },
    speed: { control: { type: "range", min: 0.5, max: 5, step: 0.5 } },
    rgbSplit: { control: { type: "range", min: 0, max: 20, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Glitch>;

const GlitchText = () => (
  <div
    style={{
      fontSize: 64,
      fontWeight: 900,
      color: "white",
      fontFamily: "system-ui",
      letterSpacing: "-2px",
    }}
  >
    GLITCH
  </div>
);

export const RGBSplit: Story = {
  args: {
    type: "rgbSplit",
    intensity: 0.6,
    rgbSplit: 5,
    animate: true,
  },
  render: (args) => (
    <Glitch {...args}>
      <GlitchText />
    </Glitch>
  ),
};

export const Scanlines: Story = {
  args: {
    type: "scanlines",
    intensity: 0.5,
    scanlineDensity: 4,
    animate: true,
  },
  render: (args) => (
    <Glitch {...args}>
      <GlitchText />
    </Glitch>
  ),
};

export const FullGlitch: Story = {
  args: {
    type: "full",
    intensity: 0.7,
    animate: true,
    speed: 2,
  },
  render: (args) => (
    <Glitch {...args}>
      <GlitchText />
    </Glitch>
  ),
};

export const StaticNoise: Story = {
  args: {
    type: "noise",
    intensity: 0.3,
    noise: 0.2,
    animate: true,
  },
  render: (args) => (
    <Glitch {...args}>
      <GlitchText />
    </Glitch>
  ),
};

export const SubtleRGB: Story = {
  args: {
    type: "rgbSplit",
    intensity: 0.3,
    rgbSplit: 2,
    animate: false,
  },
  render: (args) => (
    <Glitch {...args}>
      <GlitchText />
    </Glitch>
  ),
};
