import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import {
  GridBackground,
  PaperGrid,
  TechGrid,
  DotGrid,
  BlueprintGrid,
} from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof GridBackground> = {
  title: "Effects/GridBackground",
  component: GridBackground,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120}>
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    style: {
      control: "select",
      options: ["lines", "dots", "dashed", "crosses"],
    },
    cellSize: { control: { type: "range", min: 10, max: 100, step: 5 } },
    lineWidth: { control: { type: "range", min: 0.5, max: 3, step: 0.5 } },
    opacity: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
    majorGridEvery: { control: { type: "range", min: 0, max: 10, step: 1 } },
    animate: { control: "boolean" },
    fadeEdges: { control: "boolean" },
    perspective: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof GridBackground>;

// Content overlay for demos
const ContentOverlay = ({
  title,
  dark = false,
}: {
  title?: string;
  dark?: boolean;
}) => (
  <AbsoluteFill
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 12,
    }}
  >
    <div
      style={{
        fontSize: 48,
        fontWeight: 700,
        color: dark ? "#fff" : "#1a1a1a",
      }}
    >
      {title || "Content"}
    </div>
    <div
      style={{
        fontSize: 18,
        color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
      }}
    >
      Subtle grid background
    </div>
  </AbsoluteFill>
);

// === BASIC STYLES ===

export const SubtleLines: Story = {
  args: {
    style: "lines",
    cellSize: 50,
    color: "rgba(0, 0, 0, 0.04)",
    backgroundColor: "#f8f8fa",
    majorGridEvery: 4,
    majorGridColor: "rgba(0, 0, 0, 0.08)",
  },
  render: (args) => (
    <>
      <GridBackground {...args} />
      <ContentOverlay title="Subtle Lines" />
    </>
  ),
};

export const DotPattern: Story = {
  args: {
    style: "dots",
    cellSize: 24,
    color: "rgba(0, 0, 0, 0.12)",
    backgroundColor: "#ffffff",
    lineWidth: 1.5,
  },
  render: (args) => (
    <>
      <GridBackground {...args} />
      <ContentOverlay title="Dot Grid" />
    </>
  ),
};

export const DashedGrid: Story = {
  args: {
    style: "dashed",
    cellSize: 40,
    color: "rgba(0, 0, 0, 0.08)",
    backgroundColor: "#fafafa",
  },
  render: (args) => (
    <>
      <GridBackground {...args} />
      <ContentOverlay title="Dashed" />
    </>
  ),
};

export const CrossPattern: Story = {
  args: {
    style: "crosses",
    cellSize: 32,
    color: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f5f5f5",
  },
  render: (args) => (
    <>
      <GridBackground {...args} />
      <ContentOverlay title="Crosses" />
    </>
  ),
};

// === PRESETS ===

export const Paper: Story = {
  render: () => (
    <>
      <PaperGrid />
      <ContentOverlay title="Paper Grid" />
    </>
  ),
};

export const Tech: Story = {
  render: () => (
    <>
      <TechGrid />
      <ContentOverlay title="Tech Grid" dark />
    </>
  ),
};

export const Dots: Story = {
  render: () => (
    <>
      <DotGrid backgroundColor="#ffffff" />
      <ContentOverlay title="Dot Grid" />
    </>
  ),
};

export const Blueprint: Story = {
  render: () => (
    <>
      <BlueprintGrid />
      <ContentOverlay title="Blueprint" dark />
    </>
  ),
};

// === SPECIAL EFFECTS ===

export const Animated: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={300}>
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <>
      <GridBackground
        style="lines"
        cellSize={40}
        color="rgba(0, 0, 0, 0.05)"
        backgroundColor="#f8f8fa"
        majorGridEvery={5}
        majorGridColor="rgba(0, 0, 0, 0.1)"
        animate
        velocity={20}
      />
      <ContentOverlay title="Animated" />
    </>
  ),
};

export const FadedEdges: Story = {
  render: () => (
    <>
      <GridBackground
        style="lines"
        cellSize={35}
        color="rgba(0, 0, 0, 0.06)"
        backgroundColor="#f5f5f7"
        majorGridEvery={4}
        majorGridColor="rgba(0, 0, 0, 0.12)"
        fadeEdges
      />
      <ContentOverlay title="Faded Edges" />
    </>
  ),
};

export const PerspectiveGrid: Story = {
  render: () => (
    <>
      <GridBackground
        style="lines"
        cellSize={40}
        color="rgba(100, 150, 255, 0.15)"
        backgroundColor="#0a0a15"
        majorGridEvery={5}
        majorGridColor="rgba(100, 150, 255, 0.3)"
        perspective={0.4}
        fadeEdges
      />
      <ContentOverlay title="Perspective" dark />
    </>
  ),
};

// === COLOR VARIATIONS ===

export const WarmGrid: Story = {
  render: () => (
    <>
      <GridBackground
        style="lines"
        cellSize={45}
        color="rgba(200, 150, 100, 0.08)"
        backgroundColor="#fdf8f4"
        majorGridEvery={4}
        majorGridColor="rgba(200, 150, 100, 0.15)"
      />
      <ContentOverlay title="Warm" />
    </>
  ),
};

export const CoolGrid: Story = {
  render: () => (
    <>
      <GridBackground
        style="lines"
        cellSize={45}
        color="rgba(100, 150, 200, 0.08)"
        backgroundColor="#f4f8fd"
        majorGridEvery={4}
        majorGridColor="rgba(100, 150, 200, 0.15)"
      />
      <ContentOverlay title="Cool" />
    </>
  ),
};

export const NeonGrid: Story = {
  render: () => (
    <>
      <GridBackground
        style="lines"
        cellSize={50}
        color="rgba(0, 255, 150, 0.1)"
        backgroundColor="#0a0a0a"
        majorGridEvery={5}
        majorGridColor="rgba(0, 255, 150, 0.2)"
        lineWidth={0.5}
        majorGridWidth={1}
      />
      <ContentOverlay title="Neon" dark />
    </>
  ),
};

// === DENSE/SPARSE ===

export const DenseGrid: Story = {
  render: () => (
    <>
      <GridBackground
        style="lines"
        cellSize={20}
        color="rgba(0, 0, 0, 0.03)"
        backgroundColor="#fafafa"
        majorGridEvery={5}
        majorGridColor="rgba(0, 0, 0, 0.08)"
        lineWidth={0.5}
      />
      <ContentOverlay title="Dense" />
    </>
  ),
};

export const SparseGrid: Story = {
  render: () => (
    <>
      <GridBackground
        style="lines"
        cellSize={80}
        color="rgba(0, 0, 0, 0.06)"
        backgroundColor="#f8f8f8"
        majorGridEvery={2}
        majorGridColor="rgba(0, 0, 0, 0.12)"
        lineWidth={1}
      />
      <ContentOverlay title="Sparse" />
    </>
  ),
};

// === GALLERY ===

export const StyleGallery: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#e8e8e8">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => {
    const styles = [
      { style: "lines" as const, label: "Lines" },
      { style: "dots" as const, label: "Dots" },
      { style: "dashed" as const, label: "Dashed" },
      { style: "crosses" as const, label: "Crosses" },
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 16,
          padding: 16,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {styles.map(({ style, label }) => (
          <div
            key={style}
            style={{
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <GridBackground
              style={style}
              cellSize={style === "dots" ? 20 : 30}
              color="rgba(0, 0, 0, 0.08)"
              backgroundColor="#ffffff"
              lineWidth={style === "dots" ? 1.5 : 1}
            />
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 12,
                fontSize: 14,
                fontWeight: 600,
                color: "#333",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
