import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { TitleCard } from "../../remotion/library/components/text";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof TitleCard> = {
  title: "Text/TitleCard",
  component: TitleCard,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0a0a1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    titleStyle: { control: "select", options: ["minimal", "bold", "cinematic", "editorial", "stacked", "reveal"] },
    titleFontSize: { control: { type: "range", min: 32, max: 120, step: 4 } },
    titleColor: { control: "color" },
    accentColor: { control: "color" },
    align: { control: "select", options: ["left", "center", "right"] },
  },
};

export default meta;
type Story = StoryObj<typeof TitleCard>;

export const AllStyles: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={240} backgroundColor="#0a0a1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill style={{ display: "flex", flexWrap: "wrap", gap: 40, padding: 40, alignItems: "center", justifyContent: "center" }}>
      {(["minimal", "bold", "cinematic", "editorial", "stacked", "reveal"] as const).map((s, i) => (
        <div key={s} style={{ width: "45%", height: 180, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TitleCard
            title="MOTION"
            subtitle={`${s} style`}
            titleStyle={s}
            titleFontSize={48}
            delay={i * 0.4}
            accentColor={["#4ECDC4", "#FF6B6B", "#FFE066", "#A78BFA", "#F472B6", "#34D399"][i]}
          />
        </div>
      ))}
    </AbsoluteFill>
  ),
};

export const Cinematic: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <TitleCard
        title="THE DOCUMENTARY"
        subtitle="A Story Worth Telling"
        titleStyle="cinematic"
        titleFontSize={64}
        accentColor="#FFE066"
        duration={1.2}
      />
    </AbsoluteFill>
  ),
};

export const Editorial: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <TitleCard
        title="Design Systems"
        subtitle="Building for Scale"
        titleStyle="editorial"
        titleFontSize={56}
        accentColor="#A78BFA"
        align="left"
      />
    </AbsoluteFill>
  ),
};

export const BoldReveal: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <TitleCard
        title="BOLD"
        subtitle="Make a Statement"
        titleStyle="bold"
        titleFontSize={96}
        accentColor="#FF6B6B"
      />
    </AbsoluteFill>
  ),
};
