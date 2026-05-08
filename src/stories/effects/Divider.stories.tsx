import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Divider } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Divider> = {
  title: "Effects/Divider",
  component: Divider,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    dividerStyle: { control: "select", options: ["line", "gradient", "dashed", "dots", "glow"] },
    color: { control: "color" },
    thickness: { control: { type: "range", min: 1, max: 6, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const AllStyles: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
      {(["line", "gradient", "dashed", "dots", "glow"] as const).map((s, i) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#fff8", fontSize: 12, fontFamily: "system-ui", textTransform: "uppercase", letterSpacing: 2 }}>{s}</span>
          <Divider
            dividerStyle={s}
            color={["#fff", "#FF6B6B", "#4ECDC4", "#A78BFA", "#FFE66D"][i]}
            colorEnd={s === "gradient" ? "transparent" : undefined}
            length={400}
            thickness={2}
            delay={i * 0.2}
          />
        </div>
      ))}
    </AbsoluteFill>
  ),
};
