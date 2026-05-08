import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Ticker } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Ticker> = {
  title: "Effects/Ticker",
  component: Ticker,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={300} backgroundColor="#0a0a1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    direction: { control: "select", options: ["left", "right", "up", "down"] },
    speed: { control: { type: "range", min: 20, max: 400, step: 10 } },
    fontSize: { control: { type: "range", min: 12, max: 72, step: 2 } },
    gap: { control: { type: "range", min: 10, max: 200, step: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof Ticker>;

export const NewsTicker: Story = {
  args: {
    items: ["BREAKING NEWS", "Markets rally 3% on trade deal", "Tech earnings exceed expectations", "Weather alert: storms expected Friday"],
    speed: 120,
    fontSize: 28,
    color: "#ffffff",
    separator: "•",
    separatorColor: "#FF6B6B",
  },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", background: "rgba(0,0,0,0.6)", padding: "12px 0" }}>
        <Ticker {...args} />
      </div>
    </AbsoluteFill>
  ),
};

export const BrandScroll: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Ticker
        items={["DESIGN", "MOTION", "CREATIVE", "STUDIO", "BRAND"]}
        speed={80}
        fontSize={64}
        fontWeight={900}
        color="#ffffff22"
        gap={100}
        fadeEdges={false}
      />
    </AbsoluteFill>
  ),
};

export const VerticalScroll: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ height: 200, overflow: "hidden" }}>
        <Ticker
          items={["React", "TypeScript", "Remotion", "Motion Design", "Animation"]}
          direction="up"
          speed={60}
          fontSize={24}
          color="#A78BFA"
        />
      </div>
    </AbsoluteFill>
  ),
};
