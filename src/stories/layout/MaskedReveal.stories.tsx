import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { MaskedReveal } from "../../remotion/library/components/layout";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof MaskedReveal> = {
  title: "Layout/MaskedReveal",
  component: MaskedReveal,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0f0f23">
        <Story />
      </RemotionWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MaskedReveal>;

const RevealContent = () => (
  <AbsoluteFill
    style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div style={{ color: "#fff", fontFamily: "system-ui", textAlign: "center" }}>
      <div style={{ fontSize: 48, fontWeight: 800 }}>REVEALED</div>
      <div style={{ fontSize: 16, opacity: 0.7, letterSpacing: 4 }}>MASKED CONTENT</div>
    </div>
  </AbsoluteFill>
);

const AnimatedCircleReveal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [0, fps * 2], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  return (
    <MaskedReveal progress={progress} type="circle">
      <RevealContent />
    </MaskedReveal>
  );
};

export const CircleReveal: Story = {
  render: () => <AnimatedCircleReveal />,
};

const AnimatedWipeReveal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [0, fps * 1.5], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  return (
    <MaskedReveal progress={progress} type="wipe">
      <RevealContent />
    </MaskedReveal>
  );
};

export const WipeReveal: Story = {
  render: () => <AnimatedWipeReveal />,
};

const AnimatedPolygonReveal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [0, fps * 2], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  return (
    <MaskedReveal progress={progress} type="polygon">
      <RevealContent />
    </MaskedReveal>
  );
};

export const DiamondReveal: Story = {
  render: () => <AnimatedPolygonReveal />,
};

const AnimatedSoftCircle = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [0, fps * 2], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  return (
    <MaskedReveal progress={progress} type="circle" softness={20} centerX={0.3} centerY={0.4}>
      <RevealContent />
    </MaskedReveal>
  );
};

export const SoftEdgeCircle: Story = {
  render: () => <AnimatedSoftCircle />,
};
