import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import {
  GlossyShape,
  GlossyCircle,
  GlossyPill,
  GlossyCard,
  GlossyBlob,
} from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof GlossyShape> = {
  title: "Effects/GlossyShape",
  component: GlossyShape,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0f0f23">
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Story />
        </AbsoluteFill>
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    shape: {
      control: "select",
      options: [
        "circle",
        "square",
        "rounded",
        "pill",
        "blob1",
        "blob2",
        "blob3",
        "blob4",
        "organic",
        "hexagon",
        "diamond",
        "star",
      ],
    },
    glossStyle: {
      control: "select",
      options: ["glass", "plastic", "metallic", "neon", "soft", "frosted"],
    },
    color: { control: "color" },
    secondaryColor: { control: "color" },
    width: { control: { type: "range", min: 50, max: 400, step: 10 } },
    height: { control: { type: "range", min: 50, max: 400, step: 10 } },
    highlightIntensity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
    },
    shadowIntensity: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
    animation: {
      control: "select",
      options: ["none", "float", "pulse", "rotate", "breathe", "glow"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlossyShape>;

// === BASIC SHAPES ===

export const GlassCircle: Story = {
  args: {
    shape: "circle",
    glossStyle: "glass",
    color: "#667eea",
    width: 200,
    height: 200,
    animation: "breathe",
  },
};

export const PlasticRounded: Story = {
  args: {
    shape: "rounded",
    glossStyle: "plastic",
    color: "#f093fb",
    secondaryColor: "#f5576c",
    width: 250,
    height: 150,
    borderRadius: 32,
  },
};

export const MetallicHexagon: Story = {
  args: {
    shape: "hexagon",
    glossStyle: "metallic",
    color: "#c0c0c0",
    secondaryColor: "#808080",
    width: 180,
    height: 180,
    animation: "rotate",
    animationSpeed: 0.2,
  },
};

export const NeonPill: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a0a">
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Story />
        </AbsoluteFill>
      </RemotionWrapper>
    ),
  ],
  args: {
    shape: "pill",
    glossStyle: "neon",
    color: "#00ff88",
    width: 300,
    height: 80,
    animation: "glow",
  },
};

export const SoftBlob: Story = {
  args: {
    shape: "blob1",
    glossStyle: "soft",
    color: "#ffecd2",
    secondaryColor: "#fcb69f",
    width: 220,
    height: 220,
    animation: "float",
  },
};

export const FrostedCard: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#667eea">
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 30%),
                               radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 40%)`,
            }}
          />
          <Story />
        </AbsoluteFill>
      </RemotionWrapper>
    ),
  ],
  args: {
    shape: "rounded",
    glossStyle: "frosted",
    width: 300,
    height: 200,
    borderRadius: 24,
  },
  render: (args) => (
    <GlossyShape {...args}>
      <div style={{ padding: 24, color: "#fff", textAlign: "center" }}>
        <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
          Frosted Glass
        </div>
        <div style={{ fontSize: 14, opacity: 0.8 }}>Beautiful blur effect</div>
      </div>
    </GlossyShape>
  ),
};

// === SPECIAL SHAPES ===

export const DiamondGlass: Story = {
  args: {
    shape: "diamond",
    glossStyle: "glass",
    color: "#4facfe",
    secondaryColor: "#00f2fe",
    width: 180,
    height: 180,
    animation: "pulse",
  },
};

export const StarNeon: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a0a">
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Story />
        </AbsoluteFill>
      </RemotionWrapper>
    ),
  ],
  args: {
    shape: "star",
    glossStyle: "neon",
    color: "#ff0080",
    width: 200,
    height: 200,
    animation: "glow",
  },
};

// === PRESETS ===

export const PresetCircle: Story = {
  render: () => (
    <GlossyCircle
      glossStyle="glass"
      color="#a18cd1"
      secondaryColor="#fbc2eb"
      width={180}
      height={180}
      animation="breathe"
    />
  ),
};

export const PresetPill: Story = {
  render: () => (
    <GlossyPill
      glossStyle="plastic"
      color="#43e97b"
      secondaryColor="#38f9d7"
      width={280}
      height={70}
    >
      <span style={{ color: "#fff", fontWeight: 600, fontSize: 18 }}>
        Subscribe
      </span>
    </GlossyPill>
  ),
};

export const PresetCard: Story = {
  render: () => (
    <GlossyCard
      glossStyle="soft"
      color="#667eea"
      secondaryColor="#764ba2"
      width={320}
      height={180}
      borderRadius={20}
    >
      <div style={{ padding: 24, color: "#fff" }}>
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 8 }}>
          PREMIUM
        </div>
        <div style={{ fontSize: 28, fontWeight: 700 }}>$99/mo</div>
      </div>
    </GlossyCard>
  ),
};

export const PresetBlob: Story = {
  render: () => (
    <GlossyBlob
      glossStyle="soft"
      color="#ff9a9e"
      secondaryColor="#fecfef"
      width={250}
      height={250}
      animation="float"
    />
  ),
};

// === COLLECTIONS ===

export const NeonCollection: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a0a">
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
          }}
        >
          <Story />
        </AbsoluteFill>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <>
      <GlossyShape
        shape="circle"
        glossStyle="neon"
        color="#00ff88"
        width={100}
        height={100}
        animation="glow"
        delay={0}
      />
      <GlossyShape
        shape="rounded"
        glossStyle="neon"
        color="#ff0080"
        width={120}
        height={100}
        borderRadius={20}
        animation="glow"
        delay={0.2}
      />
      <GlossyShape
        shape="hexagon"
        glossStyle="neon"
        color="#00d4ff"
        width={110}
        height={110}
        animation="glow"
        delay={0.4}
      />
      <GlossyShape
        shape="diamond"
        glossStyle="neon"
        color="#ffd700"
        width={100}
        height={100}
        animation="glow"
        delay={0.6}
      />
    </>
  ),
};

export const GlassCollection: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#1a1a2e">
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          }}
        >
          <Story />
        </AbsoluteFill>
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <>
      <GlossyShape
        shape="circle"
        glossStyle="glass"
        color="#667eea"
        width={120}
        height={120}
        animation="float"
        delay={0}
      />
      <GlossyShape
        shape="rounded"
        glossStyle="glass"
        color="#f093fb"
        width={140}
        height={100}
        borderRadius={24}
        animation="float"
        delay={0.15}
      />
      <GlossyShape
        shape="blob1"
        glossStyle="glass"
        color="#4facfe"
        width={130}
        height={130}
        animation="float"
        delay={0.3}
      />
      <GlossyShape
        shape="pill"
        glossStyle="glass"
        color="#43e97b"
        width={180}
        height={60}
        animation="float"
        delay={0.45}
      />
    </>
  ),
};

export const BlobVariants: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={240} backgroundColor="#0f0f23">
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
            padding: 40,
          }}
        >
          <Story />
        </AbsoluteFill>
      </RemotionWrapper>
    ),
  ],
  render: () => {
    const blobs = ["blob1", "blob2", "blob3", "blob4", "organic"] as const;
    const colors = ["#667eea", "#f093fb", "#4facfe", "#43e97b", "#f59e0b"];

    return (
      <>
        {blobs.map((blob, i) => (
          <div
            key={blob}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <GlossyShape
              shape={blob}
              glossStyle="soft"
              color={colors[i]}
              width={120}
              height={120}
              animation="breathe"
              delay={i * 0.1}
            />
            <span style={{ color: "#888", fontSize: 11 }}>{blob}</span>
          </div>
        ))}
      </>
    );
  },
};

export const StyleComparison: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <AbsoluteFill
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: 24,
            padding: 40,
          }}
        >
          <Story />
        </AbsoluteFill>
      </RemotionWrapper>
    ),
  ],
  render: () => {
    const styles = [
      "glass",
      "plastic",
      "metallic",
      "neon",
      "soft",
      "frosted",
    ] as const;
    const colors = [
      "#667eea",
      "#f093fb",
      "#c0c0c0",
      "#00ff88",
      "#ffecd2",
      "#ffffff",
    ];

    return (
      <>
        {styles.map((glossStyle, i) => (
          <div
            key={glossStyle}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <GlossyShape
              shape="rounded"
              glossStyle={glossStyle}
              color={colors[i]}
              width={120}
              height={80}
              borderRadius={16}
            />
            <span
              style={{
                color: "#888",
                fontSize: 12,
                textTransform: "capitalize",
              }}
            >
              {glossStyle}
            </span>
          </div>
        ))}
      </>
    );
  },
};

export const AnimationShowcase: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={240} backgroundColor="#0f0f23">
        <AbsoluteFill
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: 24,
            padding: 40,
          }}
        >
          <Story />
        </AbsoluteFill>
      </RemotionWrapper>
    ),
  ],
  render: () => {
    const animations = [
      "none",
      "float",
      "pulse",
      "rotate",
      "breathe",
      "glow",
    ] as const;

    return (
      <>
        {animations.map((animation) => (
          <div
            key={animation}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <GlossyShape
              shape="circle"
              glossStyle={animation === "glow" ? "neon" : "glass"}
              color={animation === "glow" ? "#00ff88" : "#667eea"}
              width={80}
              height={80}
              animation={animation}
            />
            <span
              style={{
                color: "#888",
                fontSize: 12,
                textTransform: "capitalize",
              }}
            >
              {animation}
            </span>
          </div>
        ))}
      </>
    );
  },
};
