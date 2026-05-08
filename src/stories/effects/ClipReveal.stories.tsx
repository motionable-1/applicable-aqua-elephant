import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { ClipReveal } from "../../remotion/library/components/effects";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof ClipReveal> = {
  title: "Effects/ClipReveal",
  component: ClipReveal,
  argTypes: {
    shape: {
      control: "select",
      options: ["circle", "inset", "diamond", "polygon", "diagonal", "split"],
    },
    direction: {
      control: "select",
      options: ["expand", "contract", "left", "right", "up", "down"],
    },
    duration: { control: { type: "range", min: 0.3, max: 2, step: 0.1 } },
    delay: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof ClipReveal>;

const Content = () => (
  <div
    style={{
      width: 300,
      height: 200,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 16,
    }}
  >
    <span
      style={{
        color: "white",
        fontSize: 32,
        fontWeight: 700,
        fontFamily: "Inter, system-ui",
      }}
    >
      Revealed!
    </span>
  </div>
);

// ============================================
// BASIC EXAMPLES
// ============================================

export const CircleExpand: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  args: {
    shape: "circle",
    direction: "expand",
    duration: 0.8,
  },
  render: (args) => (
    <ClipReveal {...args}>
      <Content />
    </ClipReveal>
  ),
};

export const InsetReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  args: {
    shape: "inset",
    direction: "expand",
    duration: 0.6,
  },
  render: (args) => (
    <ClipReveal {...args}>
      <Content />
    </ClipReveal>
  ),
};

export const DiamondReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  args: {
    shape: "diamond",
    direction: "expand",
    duration: 0.7,
  },
  render: (args) => (
    <ClipReveal {...args}>
      <Content />
    </ClipReveal>
  ),
};

export const DiagonalWipe: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  args: {
    shape: "diagonal",
    direction: "right",
    duration: 0.6,
  },
  render: (args) => (
    <ClipReveal {...args}>
      <Content />
    </ClipReveal>
  ),
};

export const SplitReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  args: {
    shape: "split",
    direction: "expand",
    duration: 0.8,
  },
  render: (args) => (
    <ClipReveal {...args}>
      <Content />
    </ClipReveal>
  ),
};

export const CustomOrigin: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  args: {
    shape: "circle",
    direction: "expand",
    duration: 1,
    origin: [0.2, 0.8],
  },
  render: (args) => (
    <ClipReveal {...args}>
      <Content />
    </ClipReveal>
  ),
};

// ============================================
// PROFESSIONAL COMPOSITIONS
// ============================================

export const CinematicHeroReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#000">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <ClipReveal shape="circle" direction="expand" duration={1.2} ease="smooth">
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: -2,
            textAlign: "center",
          }}
        >
          CINEMATIC
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#a78bfa",
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          Motion Design
        </div>
      </AbsoluteFill>
    </ClipReveal>
  ),
};

export const ProductImageReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#fafafa">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
        padding: 60,
      }}
    >
      {/* Product Image */}
      <ClipReveal shape="inset" direction="expand" duration={0.8}>
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: 32,
            background: "linear-gradient(145deg, #f0f0f0, #e6e6e6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: 40,
              background:
                "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
              boxShadow: "0 30px 60px rgba(99, 102, 241, 0.4)",
            }}
          />
        </div>
      </ClipReveal>
      {/* Product Info */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          maxWidth: 350,
        }}
      >
        <ClipReveal shape="inset" direction="left" duration={0.5} delay={0.3}>
          <div
            style={{
              fontSize: 14,
              color: "#6366f1",
              fontWeight: 600,
              letterSpacing: 2,
            }}
          >
            NEW RELEASE
          </div>
        </ClipReveal>
        <ClipReveal shape="inset" direction="left" duration={0.6} delay={0.4}>
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            Premium Product
          </div>
        </ClipReveal>
        <ClipReveal shape="inset" direction="left" duration={0.5} delay={0.5}>
          <div style={{ fontSize: 18, color: "#64748b", lineHeight: 1.6 }}>
            Discover the next generation of design with our flagship product.
          </div>
        </ClipReveal>
        <ClipReveal shape="inset" direction="bottom" duration={0.4} delay={0.6}>
          <div
            style={{
              padding: "16px 32px",
              background: "#0f172a",
              color: "#fff",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              width: "fit-content",
            }}
          >
            Shop Now — $299
          </div>
        </ClipReveal>
      </div>
    </AbsoluteFill>
  ),
};

export const GalleryReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0a0f">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => {
    const images = [
      { bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", delay: 0 },
      { bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", delay: 0.1 },
      { bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", delay: 0.2 },
      { bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", delay: 0.15 },
      { bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", delay: 0.25 },
      { bg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", delay: 0.3 },
    ];
    return (
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: 16,
            width: "100%",
            maxWidth: 800,
            height: 400,
          }}
        >
          {images.map((img, i) => (
            <ClipReveal
              key={i}
              shape="diamond"
              direction="expand"
              duration={0.6}
              delay={img.delay}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 16,
                  background: img.bg,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
              />
            </ClipReveal>
          ))}
        </div>
      </AbsoluteFill>
    );
  },
};

export const LogoUnveil: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#18181b">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
      }}
    >
      <ClipReveal
        shape="circle"
        direction="expand"
        duration={0.8}
        origin={[0.5, 0.5]}
      >
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: 48,
            background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 30px 60px rgba(99, 102, 241, 0.4)",
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 800, color: "#fff" }}>A</div>
        </div>
      </ClipReveal>
      <ClipReveal shape="inset" direction="expand" duration={0.6} delay={0.4}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#fff" }}>
            Acme Studio
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#71717a",
              letterSpacing: 3,
              marginTop: 8,
            }}
          >
            CREATIVE AGENCY
          </div>
        </div>
      </ClipReveal>
    </AbsoluteFill>
  ),
};

export const SplitScreenReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#000">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill>
      {/* Left side */}
      <ClipReveal shape="inset" direction="right" duration={0.8}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "50%",
            height: "100%",
            background: "#0f172a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "right", paddingRight: 60 }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: "#fff" }}>
              BEFORE
            </div>
            <div style={{ fontSize: 16, color: "#64748b", marginTop: 12 }}>
              The old way
            </div>
          </div>
        </div>
      </ClipReveal>
      {/* Right side */}
      <ClipReveal shape="inset" direction="left" duration={0.8} delay={0.2}>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "50%",
            height: "100%",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "left", paddingLeft: 60 }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: "#fff" }}>
              AFTER
            </div>
            <div
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.7)",
                marginTop: 12,
              }}
            >
              The new standard
            </div>
          </div>
        </div>
      </ClipReveal>
    </AbsoluteFill>
  ),
};

export const PortfolioCardReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#fafafa">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => {
    const projects = [
      { title: "Brand Identity", category: "Branding", color: "#6366f1" },
      { title: "Mobile App", category: "UI/UX", color: "#ec4899" },
      { title: "Web Platform", category: "Development", color: "#10b981" },
    ];
    return (
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: 60,
        }}
      >
        {projects.map((project, i) => (
          <ClipReveal
            key={i}
            shape="inset"
            direction="bottom"
            duration={0.6}
            delay={i * 0.15}
          >
            <div
              style={{
                width: 280,
                background: "#fff",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  height: 180,
                  background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}99 100%)`,
                }}
              />
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    fontSize: 12,
                    color: project.color,
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  {project.category}
                </div>
                <div
                  style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}
                >
                  {project.title}
                </div>
              </div>
            </div>
          </ClipReveal>
        ))}
      </AbsoluteFill>
    );
  },
};
