import type { Meta, StoryObj } from "@storybook/react";
import {
  shadows,
  createColorShadow,
  createNeonGlow,
} from "../../remotion/library/presets/shadows";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const ShadowBox = ({
  shadow,
  label,
  dark = false,
}: {
  shadow: string;
  label: string;
  dark?: boolean;
}) => (
  <div style={{ textAlign: "center" }}>
    <div
      style={{
        width: 120,
        height: 120,
        background: dark ? "#1a1a2e" : "#ffffff",
        borderRadius: 16,
        boxShadow: shadow,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 12px",
      }}
    />
    <div
      style={{
        fontSize: 11,
        color: dark ? "#fff" : "#666",
        fontFamily: "monospace",
      }}
    >
      {label}
    </div>
  </div>
);

const meta: Meta = {
  title: "Presets/Shadows",
};

export default meta;
type Story = StoryObj;

export const SubtleShadows: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={60} backgroundColor="#f8fafc">
        <div style={{ width: "100%", height: "100%", overflow: "auto", padding: 20 }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <ShadowBox shadow={shadows.subtle} label="subtle" />
      <ShadowBox shadow={shadows.soft} label="soft" />
      <ShadowBox shadow={shadows.medium} label="medium" />
    </div>
  ),
};

export const ElevatedShadows: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={60} backgroundColor="#f8fafc">
        <div style={{ width: "100%", height: "100%", overflow: "auto", padding: 20 }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <ShadowBox shadow={shadows["elevated-1"]} label="elevated-1" />
      <ShadowBox shadow={shadows["elevated-2"]} label="elevated-2" />
      <ShadowBox shadow={shadows["elevated-3"]} label="elevated-3" />
      <ShadowBox shadow={shadows["elevated-4"]} label="elevated-4" />
      <ShadowBox shadow={shadows["elevated-5"]} label="elevated-5" />
    </div>
  ),
};

export const DiffusedShadows: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={60} backgroundColor="#f8fafc">
        <div style={{ width: "100%", height: "100%", overflow: "auto", padding: 20 }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <ShadowBox shadow={shadows.diffused} label="diffused" />
      <ShadowBox shadow={shadows.dreamy} label="dreamy" />
      <ShadowBox shadow={shadows.cloud} label="cloud" />
    </div>
  ),
};

export const SharpShadows: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={60} backgroundColor="#f8fafc">
        <div style={{ width: "100%", height: "100%", overflow: "auto", padding: 20 }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <ShadowBox shadow={shadows.sharp} label="sharp" />
      <ShadowBox shadow={shadows.hard} label="hard" />
      <ShadowBox shadow={shadows.crisp} label="crisp" />
    </div>
  ),
};

export const LayeredShadows: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={60} backgroundColor="#f8fafc">
        <div style={{ width: "100%", height: "100%", overflow: "auto", padding: 20 }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <ShadowBox shadow={shadows.layered} label="layered" />
      <ShadowBox shadow={shadows["layered-soft"]} label="layered-soft" />
      <ShadowBox shadow={shadows["layered-color"]} label="layered-color" />
    </div>
  ),
};

export const GlowEffects: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={60} backgroundColor="#0f0f23">
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            padding: 20,
          }}
        >
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <ShadowBox shadow={shadows.glow} label="glow" dark />
      <ShadowBox shadow={shadows["glow-soft"]} label="glow-soft" dark />
      <ShadowBox shadow={shadows["glow-intense"]} label="glow-intense" dark />
    </div>
  ),
};

export const ColoredShadows: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={60} backgroundColor="#f8fafc">
        <div style={{ width: "100%", height: "100%", overflow: "auto", padding: 20 }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <ShadowBox shadow={shadows["color-blue"]} label="color-blue" />
      <ShadowBox shadow={shadows["color-purple"]} label="color-purple" />
      <ShadowBox shadow={shadows["color-pink"]} label="color-pink" />
      <ShadowBox shadow={shadows["color-orange"]} label="color-orange" />
      <ShadowBox shadow={shadows["color-green"]} label="color-green" />
      <ShadowBox shadow={shadows["color-cyan"]} label="color-cyan" />
    </div>
  ),
};

export const DramaticShadows: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={60} backgroundColor="#f8fafc">
        <div style={{ width: "100%", height: "100%", overflow: "auto", padding: 20 }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <ShadowBox shadow={shadows.dramatic} label="dramatic" />
      <ShadowBox shadow={shadows.cinematic} label="cinematic" />
      <ShadowBox shadow={shadows.noir} label="noir" />
    </div>
  ),
};

export const LongShadows: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={60} backgroundColor="#f8fafc">
        <div style={{ width: "100%", height: "100%", overflow: "auto", padding: 20 }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 48,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <ShadowBox shadow={shadows.long} label="long" />
      <ShadowBox shadow={shadows["long-soft"]} label="long-soft" />
    </div>
  ),
};

export const ComponentShadows: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={60} backgroundColor="#f8fafc">
        <div style={{ width: "100%", height: "100%", overflow: "auto", padding: 20 }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <ShadowBox shadow={shadows.card} label="card" />
      <ShadowBox shadow={shadows.modal} label="modal" />
      <ShadowBox shadow={shadows.dropdown} label="dropdown" />
      <ShadowBox shadow={shadows.button} label="button" />
      <ShadowBox shadow={shadows.float} label="float" />
      <ShadowBox shadow={shadows.hover} label="hover" />
    </div>
  ),
};

export const NeonGlows: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={60} backgroundColor="#0a0a0a">
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            padding: 20,
          }}
        >
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 40,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {["#ff00ff", "#00ffff", "#ff0080", "#00ff88", "#ffff00"].map((color) => (
        <div key={color} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 100,
              height: 100,
              background: "#1a1a1a",
              borderRadius: 16,
              boxShadow: createNeonGlow(color),
              border: `1px solid ${color}40`,
              margin: "0 auto 12px",
            }}
          />
          <div style={{ fontSize: 11, color: "#888", fontFamily: "monospace" }}>
            {color}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const CustomColorShadows: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={60} backgroundColor="#f8fafc">
        <div style={{ width: "100%", height: "100%", overflow: "auto", padding: 20 }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {[
        { color: "#ef4444", label: "Red" },
        { color: "#f97316", label: "Orange" },
        { color: "#eab308", label: "Yellow" },
        { color: "#22c55e", label: "Green" },
        { color: "#3b82f6", label: "Blue" },
        { color: "#8b5cf6", label: "Violet" },
      ].map(({ color, label }) => (
        <div key={color} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 120,
              height: 120,
              background: "#ffffff",
              borderRadius: 16,
              boxShadow: createColorShadow(color, 0.5, 50),
              margin: "0 auto 12px",
            }}
          />
          <div style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  ),
};
