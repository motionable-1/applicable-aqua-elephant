import type { Meta, StoryObj } from "@storybook/react";
import { Counter, RollingCounter } from "../../remotion/library/components/text";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Counter> = {
  title: "Text/Counter",
  component: Counter,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0f0f23">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    from: { control: "number" },
    to: { control: "number" },
    duration: { control: { type: "range", min: 0.5, max: 3, step: 0.1 } },
    decimals: { control: { type: "range", min: 0, max: 4, step: 1 } },
    prefix: { control: "text" },
    suffix: { control: "text" },
    separator: { control: "text" },
    tabularNums: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

// Use a font stack with good tabular number support
// Inter, SF Pro, and Roboto all have proper tabular nums
const numberStyle: React.CSSProperties = {
  fontSize: "72px",
  fontWeight: 700,
  fontFamily: '"SF Pro Display", "Inter", "Roboto", system-ui, sans-serif',
  fontVariantNumeric: "tabular-nums",
  fontFeatureSettings: '"tnum"',
  color: "white",
};

export const Default: Story = {
  args: {
    from: 0,
    to: 1000,
    duration: 2,
  },
  render: (args) => (
    <div style={numberStyle}>
      <Counter {...args} />
    </div>
  ),
};

export const Currency: Story = {
  args: {
    from: 0,
    to: 12500,
    duration: 2,
    prefix: "$",
    separator: ",",
  },
  render: (args) => (
    <div style={{ ...numberStyle, color: "#22c55e" }}>
      <Counter {...args} />
    </div>
  ),
};

export const Percentage: Story = {
  args: {
    from: 0,
    to: 87.5,
    duration: 1.5,
    decimals: 1,
    suffix: "%",
  },
  render: (args) => (
    <div style={{ ...numberStyle, color: "#3b82f6" }}>
      <Counter {...args} />
    </div>
  ),
};

export const Countdown: Story = {
  args: {
    from: 10,
    to: 0,
    duration: 2,
  },
  render: (args) => (
    <div style={{ ...numberStyle, color: "#ef4444", fontSize: "120px" }}>
      <Counter {...args} />
    </div>
  ),
};

export const Rolling: Story = {
  render: () => (
    <div style={numberStyle}>
      <RollingCounter from={0} to={9999} duration={2} />
    </div>
  ),
};

export const TabularNumbers: Story = {
  args: {
    from: 0,
    to: 99999,
    duration: 2,
    separator: ",",
    tabularNums: true,
  },
  render: (args) => (
    <div style={numberStyle}>
      <Counter {...args} />
    </div>
  ),
};

export const CompareTabular: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <div style={{ color: "#888", fontSize: 14, marginBottom: 8 }}>
          With tabular-nums (fixed width):
        </div>
        <div style={numberStyle}>
          <Counter from={0} to={11111} duration={2} tabularNums={true} />
        </div>
      </div>
      <div>
        <div style={{ color: "#888", fontSize: 14, marginBottom: 8 }}>
          Without tabular-nums (proportional):
        </div>
        <div
          style={{
            ...numberStyle,
            fontVariantNumeric: "normal",
            fontFeatureSettings: "normal",
          }}
        >
          <Counter from={0} to={11111} duration={2} tabularNums={false} />
        </div>
      </div>
    </div>
  ),
};
