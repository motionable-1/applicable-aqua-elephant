import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { GradientBlur } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof GradientBlur> = {
  title: "Effects/GradientBlur",
  component: GradientBlur,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90}>
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    direction: { control: "select", options: ["top", "bottom", "left", "right", "radial", "edges"] },
    blur: { control: { type: "range", min: 2, max: 40, step: 2 } },
    size: { control: { type: "range", min: 0.1, max: 1, step: 0.05 } },
  },
};

export default meta;
type Story = StoryObj<typeof GradientBlur>;

export const BottomBlur: Story = {
  args: { direction: "bottom", blur: 15, size: 0.4 },
  render: (args) => (
    <AbsoluteFill>
      <GradientBlur {...args} style={{ width: "100%", height: "100%" }}>
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #667eea, #764ba2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 48, fontWeight: 700, fontFamily: "system-ui" }}>
          DEPTH OF FIELD
        </div>
      </GradientBlur>
    </AbsoluteFill>
  ),
};

export const RadialFocus: Story = {
  render: () => (
    <AbsoluteFill>
      <GradientBlur direction="radial" blur={20} size={0.5} style={{ width: "100%", height: "100%" }}>
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, #1a1a2e, #16213e)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 36, fontFamily: "system-ui" }}>
          Focus Center
        </div>
      </GradientBlur>
    </AbsoluteFill>
  ),
};
