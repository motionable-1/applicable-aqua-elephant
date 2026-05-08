import type { Meta, StoryObj } from "@storybook/react";
import { KineticText } from "../../remotion/library/components/text/KineticText";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof KineticText> = {
  title: "Text/KineticText",
  component: KineticText,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={300}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#111",
            color: "#fff",
          }}
        >
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof KineticText>;

export const Marquee: Story = {
  args: {
    children: "KINETIC TYPOGRAPHY • INFINITE SCROLL • ",
    type: "marquee",
    fontSize: 120,
    fontFamily: "Impact, sans-serif",
    speed: 2,
    repeat: 10,
    style: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
};

export const SkewedMarquee: Story = {
  args: {
    children: "SPEED MOTION • FAST FORWARD • ",
    type: "marquee",
    fontSize: 100,
    fontFamily: "Arial Black, sans-serif",
    speed: 4,
    repeat: 10,
    skew: -20,
    color: "#ff0055",
    style: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
};

export const Cylinder: Story = {
  args: {
    children: "ROTATING 3D TEXT",
    type: "cylinder",
    fontSize: 60,
    fontFamily: "Arial Black, sans-serif",
    color: "#00ffaa",
    speed: 1,
    radius: 150,
    repeat: 8,
  },
};

export const PathWave: Story = {
  args: {
    children: "WAVY TEXT ALONG A PATH",
    type: "path",
    path: "M0,250 Q200,100 400,250 T800,250 T1200,250",
    fontSize: 40,
    fontFamily: "Arial, sans-serif",
    speed: 1,
    repeat: 5,
    gap: 50,
  },
};
