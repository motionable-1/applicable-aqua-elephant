import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "../../remotion/library/components/layout";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    columns: { control: { type: "range", min: 2, max: 6, step: 1 } },
    gap: { control: { type: "range", min: 8, max: 32, step: 4 } },
    stagger: { control: { type: "range", min: 0, max: 0.2, step: 0.02 } },
    animation: {
      control: "select",
      options: ["fadeIn", "scaleIn", "slideUp", "slideIn", "none"],
    },
    staggerPattern: {
      control: "select",
      options: ["start", "end", "center", "edges", "random"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Card = ({ index }: { index: number }) => (
  <div
    style={{
      width: 100,
      height: 100,
      background: `hsl(${index * 40}, 70%, 50%)`,
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: 700,
      fontSize: 24,
      fontFamily: "system-ui",
    }}
  >
    {index + 1}
  </div>
);

const items = Array.from({ length: 9 }, (_, i) => <Card key={i} index={i} />);

export const Default: Story = {
  args: {
    columns: 3,
    gap: 16,
    stagger: 0.08,
    animation: "fadeIn",
  },
  render: (args) => <Grid {...args}>{items}</Grid>,
};

export const ScaleAnimation: Story = {
  args: {
    columns: 3,
    gap: 16,
    stagger: 0.1,
    animation: "scaleIn",
  },
  render: (args) => <Grid {...args}>{items}</Grid>,
};

export const SlideUp: Story = {
  args: {
    columns: 3,
    gap: 16,
    stagger: 0.08,
    animation: "slideUp",
  },
  render: (args) => <Grid {...args}>{items}</Grid>,
};

export const CenterOutStagger: Story = {
  args: {
    columns: 3,
    gap: 16,
    stagger: 0.1,
    staggerPattern: "center",
    animation: "scaleIn",
  },
  render: (args) => <Grid {...args}>{items}</Grid>,
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    gap: 12,
    stagger: 0.06,
    animation: "fadeIn",
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 12 }, (_, i) => (
        <Card key={i} index={i} />
      ))}
    </Grid>
  ),
};

export const RandomStagger: Story = {
  args: {
    columns: 3,
    gap: 16,
    stagger: 0.15,
    staggerPattern: "random",
    animation: "scaleIn",
  },
  render: (args) => <Grid {...args}>{items}</Grid>,
};
