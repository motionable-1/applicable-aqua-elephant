import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { SplitFlap } from "../../remotion/library/components/text";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof SplitFlap> = {
  title: "Text/SplitFlap",
  component: SplitFlap,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0a0a1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    text: { control: "text" },
    charWidth: { control: { type: "range", min: 24, max: 80, step: 4 } },
    charHeight: { control: { type: "range", min: 32, max: 100, step: 4 } },
    fontSize: { control: { type: "range", min: 20, max: 72, step: 2 } },
    textColor: { control: "color" },
    backgroundColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof SplitFlap>;

export const DepartureBoard: Story = {
  args: { text: "DEPARTING 14:30" },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#111" }}>
      <SplitFlap {...args} fontSize={36} charWidth={44} charHeight={56} />
    </AbsoluteFill>
  ),
};

export const Countdown: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a1a" }}>
      <SplitFlap
        text="00:30:00"
        fontSize={48}
        charWidth={52}
        charHeight={68}
        textColor="#4ECDC4"
        stagger={0.03}
      />
    </AbsoluteFill>
  ),
};

export const StaggeredReveal: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, background: "#111" }}>
      <SplitFlap text="HELLO" fontSize={40} delay={0} stagger={0.08} textColor="#FF6B6B" />
      <SplitFlap text="WORLD" fontSize={40} delay={0.5} stagger={0.08} textColor="#4ECDC4" />
    </AbsoluteFill>
  ),
};
