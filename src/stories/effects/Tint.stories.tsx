import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AbsoluteFill } from "remotion";
import {
  Tint,
  WarmTint,
  CoolTint,
  SepiaTint,
  VintageTint,
  NoirTint,
  CinemaTint,
  SunsetTint,
  MoonlightTint,
  RoseTint,
  EmeraldTint,
  PurpleTint,
  GoldenTint,
} from "../../remotion/library/components/effects/Tint";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Tint> = {
  title: "Effects/Tint",
  component: Tint,
  argTypes: {
    preset: {
      control: "select",
      options: [
        "warm",
        "cool",
        "sepia",
        "vintage",
        "noir",
        "cinema",
        "sunset",
        "moonlight",
        "rose",
        "emerald",
        "purple",
        "golden",
      ],
    },
    mode: {
      control: "select",
      options: [
        "overlay",
        "gradient",
        "duotone",
        "multiply",
        "screen",
        "colorBurn",
        "softLight",
      ],
    },
    intensity: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
    brightness: { control: { type: "range", min: 0.5, max: 1.5, step: 0.05 } },
    contrast: { control: { type: "range", min: 0.5, max: 1.5, step: 0.05 } },
    saturate: { control: { type: "range", min: 0, max: 2, step: 0.1 } },
    gradientAngle: { control: { type: "range", min: 0, max: 360, step: 15 } },
  },
};

export default meta;
type Story = StoryObj<typeof Tint>;

// Sample image component
const SampleImage: React.FC<{ size?: number }> = ({ size = 300 }) => (
  <div
    style={{
      width: size,
      height: size * 0.667,
      background: `
        linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%),
        url("data:image/svg+xml,%3Csvg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23667eea' width='400' height='300'/%3E%3Ccircle cx='300' cy='80' r='60' fill='%23fbbf24'/%3E%3Cpath d='M0 200 Q100 150 200 200 T400 200 L400 300 L0 300Z' fill='%2310b981'/%3E%3Cpath d='M0 220 Q150 180 300 220 T400 220 L400 300 L0 300Z' fill='%23059669'/%3E%3Crect x='50' y='120' width='80' height='100' fill='%23f97316' rx='5'/%3E%3Crect x='55' y='130' width='30' height='30' fill='%2393c5fd'/%3E%3Crect x='95' y='130' width='30' height='30' fill='%2393c5fd'/%3E%3Crect x='70' y='180' width='20' height='40' fill='%23854d0e'/%3E%3C/svg%3E")
      `,
      backgroundSize: "cover",
      borderRadius: 12,
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    }}
  />
);

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  args: {
    color: "rgba(255, 100, 50, 0.3)",
    intensity: 1,
  },
  render: (args) => (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tint {...args}>
        <SampleImage />
      </Tint>
    </AbsoluteFill>
  ),
};

export const CustomColor: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#1a1a2e">
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
        gap: 30,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Tint color="rgba(239, 68, 68, 0.4)">
          <SampleImage size={200} />
        </Tint>
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>
          Red Tint
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Tint color="rgba(59, 130, 246, 0.4)">
          <SampleImage size={200} />
        </Tint>
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>
          Blue Tint
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Tint color="rgba(16, 185, 129, 0.4)">
          <SampleImage size={200} />
        </Tint>
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>
          Green Tint
        </div>
      </div>
    </AbsoluteFill>
  ),
};

// ============================================================================
// PRESETS
// ============================================================================

export const WarmPreset: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#1a1a2e">
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
        gap: 40,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <SampleImage size={250} />
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>
          Original
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <WarmTint>
          <SampleImage size={250} />
        </WarmTint>
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>Warm</div>
      </div>
    </AbsoluteFill>
  ),
};

export const CoolPreset: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#1a1a2e">
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
        gap: 40,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <SampleImage size={250} />
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>
          Original
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <CoolTint>
          <SampleImage size={250} />
        </CoolTint>
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>Cool</div>
      </div>
    </AbsoluteFill>
  ),
};

export const CinemaPreset: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#1a1a2e">
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
        gap: 40,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <SampleImage size={250} />
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>
          Original
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <CinemaTint>
          <SampleImage size={250} />
        </CinemaTint>
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>
          Cinema
        </div>
      </div>
    </AbsoluteFill>
  ),
};

export const SunsetPreset: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#1a1a2e">
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
        gap: 40,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <SampleImage size={250} />
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>
          Original
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <SunsetTint>
          <SampleImage size={250} />
        </SunsetTint>
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>
          Sunset
        </div>
      </div>
    </AbsoluteFill>
  ),
};

export const NoirPreset: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#1a1a2e">
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
        gap: 40,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <SampleImage size={250} />
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>
          Original
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <NoirTint>
          <SampleImage size={250} />
        </NoirTint>
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>Noir</div>
      </div>
    </AbsoluteFill>
  ),
};

export const VintagePreset: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#1a1a2e">
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
        gap: 40,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <SampleImage size={250} />
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>
          Original
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <VintageTint>
          <SampleImage size={250} />
        </VintageTint>
        <div style={{ color: "white", marginTop: 10, fontSize: 14 }}>
          Vintage
        </div>
      </div>
    </AbsoluteFill>
  ),
};

// ============================================================================
// PRESET GALLERY
// ============================================================================

export const PresetGallery: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#0f0f1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => {
    const presets = [
      { name: "Original", component: null },
      { name: "Warm", component: WarmTint },
      { name: "Cool", component: CoolTint },
      { name: "Sepia", component: SepiaTint },
      { name: "Vintage", component: VintageTint },
      { name: "Noir", component: NoirTint },
      { name: "Cinema", component: CinemaTint },
      { name: "Sunset", component: SunsetTint },
      { name: "Moonlight", component: MoonlightTint },
      { name: "Rose", component: RoseTint },
      { name: "Emerald", component: EmeraldTint },
      { name: "Purple", component: PurpleTint },
      { name: "Golden", component: GoldenTint },
    ];

    return (
      <AbsoluteFill style={{ padding: 30, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            height: "100%",
          }}
        >
          {presets.map(({ name, component: TintComponent }) => (
            <div key={name} style={{ textAlign: "center" }}>
              {TintComponent ? (
                <TintComponent>
                  <SampleImage size={150} />
                </TintComponent>
              ) : (
                <SampleImage size={150} />
              )}
              <div style={{ color: "white", marginTop: 8, fontSize: 12 }}>
                {name}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    );
  },
};

// ============================================================================
// BLEND MODES
// ============================================================================

export const BlendModes: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => {
    const modes = [
      { name: "Overlay", mode: "overlay" as const },
      { name: "Multiply", mode: "multiply" as const },
      { name: "Screen", mode: "screen" as const },
      { name: "Soft Light", mode: "softLight" as const },
    ];

    return (
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {modes.map(({ name, mode }) => (
          <div key={name} style={{ textAlign: "center" }}>
            <Tint color="rgba(255, 100, 50, 0.5)" mode={mode}>
              <SampleImage size={170} />
            </Tint>
            <div style={{ color: "white", marginTop: 10, fontSize: 13 }}>
              {name}
            </div>
          </div>
        ))}
      </AbsoluteFill>
    );
  },
};

// ============================================================================
// GRADIENT TINT
// ============================================================================

export const GradientTint: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#1a1a2e">
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
        gap: 30,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Tint
          mode="gradient"
          color="rgba(59, 130, 246, 0.4)"
          secondaryColor="rgba(236, 72, 153, 0.4)"
          gradientAngle={135}
        >
          <SampleImage size={200} />
        </Tint>
        <div style={{ color: "white", marginTop: 10, fontSize: 13 }}>
          Blue → Pink (135°)
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Tint
          mode="gradient"
          color="rgba(251, 191, 36, 0.4)"
          secondaryColor="rgba(239, 68, 68, 0.4)"
          gradientAngle={180}
        >
          <SampleImage size={200} />
        </Tint>
        <div style={{ color: "white", marginTop: 10, fontSize: 13 }}>
          Yellow → Red (180°)
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Tint
          mode="gradient"
          color="rgba(16, 185, 129, 0.4)"
          secondaryColor="rgba(6, 182, 212, 0.4)"
          gradientAngle={90}
        >
          <SampleImage size={200} />
        </Tint>
        <div style={{ color: "white", marginTop: 10, fontSize: 13 }}>
          Green → Cyan (90°)
        </div>
      </div>
    </AbsoluteFill>
  ),
};

// ============================================================================
// INTENSITY LEVELS
// ============================================================================

export const IntensityLevels: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#1a1a2e">
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
        gap: 20,
      }}
    >
      {[0.2, 0.4, 0.6, 0.8, 1.0].map((intensity) => (
        <div key={intensity} style={{ textAlign: "center" }}>
          <Tint preset="cinema" intensity={intensity}>
            <SampleImage size={140} />
          </Tint>
          <div style={{ color: "white", marginTop: 10, fontSize: 12 }}>
            {Math.round(intensity * 100)}%
          </div>
        </div>
      ))}
    </AbsoluteFill>
  ),
};

// ============================================================================
// ANIMATED TINT
// ============================================================================

export const AnimatedTint: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
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
      }}
    >
      <Tint
        preset="sunset"
        animate
        animateFrom={0}
        animateTo={1}
        animationDuration={2}
      >
        <SampleImage size={400} />
      </Tint>
    </AbsoluteFill>
  ),
};

// ============================================================================
// WITH REAL IMAGE
// ============================================================================

export const WithRealImage: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#0f0f1a">
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
        gap: 24,
        flexWrap: "wrap",
        padding: 40,
      }}
    >
      {/* Original */}
      <div style={{ textAlign: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
          alt="Mountain landscape"
          style={{
            width: 280,
            height: 180,
            objectFit: "cover",
            borderRadius: 12,
          }}
        />
        <div style={{ color: "white", marginTop: 10, fontSize: 13 }}>
          Original
        </div>
      </div>

      {/* Cinema */}
      <div style={{ textAlign: "center" }}>
        <CinemaTint>
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
            alt="Mountain landscape"
            style={{
              width: 280,
              height: 180,
              objectFit: "cover",
              borderRadius: 12,
            }}
          />
        </CinemaTint>
        <div style={{ color: "white", marginTop: 10, fontSize: 13 }}>
          Cinema
        </div>
      </div>

      {/* Sunset */}
      <div style={{ textAlign: "center" }}>
        <SunsetTint>
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
            alt="Mountain landscape"
            style={{
              width: 280,
              height: 180,
              objectFit: "cover",
              borderRadius: 12,
            }}
          />
        </SunsetTint>
        <div style={{ color: "white", marginTop: 10, fontSize: 13 }}>
          Sunset
        </div>
      </div>

      {/* Noir */}
      <div style={{ textAlign: "center" }}>
        <NoirTint>
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
            alt="Mountain landscape"
            style={{
              width: 280,
              height: 180,
              objectFit: "cover",
              borderRadius: 12,
            }}
          />
        </NoirTint>
        <div style={{ color: "white", marginTop: 10, fontSize: 13 }}>Noir</div>
      </div>

      {/* Vintage */}
      <div style={{ textAlign: "center" }}>
        <VintageTint>
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
            alt="Mountain landscape"
            style={{
              width: 280,
              height: 180,
              objectFit: "cover",
              borderRadius: 12,
            }}
          />
        </VintageTint>
        <div style={{ color: "white", marginTop: 10, fontSize: 13 }}>
          Vintage
        </div>
      </div>

      {/* Cool */}
      <div style={{ textAlign: "center" }}>
        <CoolTint>
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
            alt="Mountain landscape"
            style={{
              width: 280,
              height: 180,
              objectFit: "cover",
              borderRadius: 12,
            }}
          />
        </CoolTint>
        <div style={{ color: "white", marginTop: 10, fontSize: 13 }}>Cool</div>
      </div>
    </AbsoluteFill>
  ),
};

// Portrait Photo with Tints
export const PortraitWithTints: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#1a1a2e">
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
        gap: 30,
      }}
    >
      {/* Original */}
      <div style={{ textAlign: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=250&h=350&fit=crop"
          alt="Portrait"
          style={{
            width: 200,
            height: 280,
            objectFit: "cover",
            borderRadius: 16,
          }}
        />
        <div style={{ color: "white", marginTop: 12, fontSize: 13 }}>
          Original
        </div>
      </div>

      {/* Rose */}
      <div style={{ textAlign: "center" }}>
        <RoseTint>
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=250&h=350&fit=crop"
            alt="Portrait"
            style={{
              width: 200,
              height: 280,
              objectFit: "cover",
              borderRadius: 16,
            }}
          />
        </RoseTint>
        <div style={{ color: "white", marginTop: 12, fontSize: 13 }}>Rose</div>
      </div>

      {/* Golden */}
      <div style={{ textAlign: "center" }}>
        <GoldenTint>
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=250&h=350&fit=crop"
            alt="Portrait"
            style={{
              width: 200,
              height: 280,
              objectFit: "cover",
              borderRadius: 16,
            }}
          />
        </GoldenTint>
        <div style={{ color: "white", marginTop: 12, fontSize: 13 }}>
          Golden
        </div>
      </div>

      {/* Moonlight */}
      <div style={{ textAlign: "center" }}>
        <MoonlightTint>
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=250&h=350&fit=crop"
            alt="Portrait"
            style={{
              width: 200,
              height: 280,
              objectFit: "cover",
              borderRadius: 16,
            }}
          />
        </MoonlightTint>
        <div style={{ color: "white", marginTop: 12, fontSize: 13 }}>
          Moonlight
        </div>
      </div>
    </AbsoluteFill>
  ),
};

// ============================================================================
// WITH ADJUSTMENTS
// ============================================================================

export const WithAdjustments: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#1a1a2e">
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
        gap: 30,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <SampleImage size={180} />
        <div style={{ color: "white", marginTop: 10, fontSize: 12 }}>
          Original
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Tint color="transparent" brightness={1.2} contrast={1.1}>
          <SampleImage size={180} />
        </Tint>
        <div style={{ color: "white", marginTop: 10, fontSize: 12 }}>
          Bright + Contrast
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Tint color="transparent" saturate={1.5}>
          <SampleImage size={180} />
        </Tint>
        <div style={{ color: "white", marginTop: 10, fontSize: 12 }}>
          Saturated
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Tint color="transparent" saturate={0}>
          <SampleImage size={180} />
        </Tint>
        <div style={{ color: "white", marginTop: 10, fontSize: 12 }}>
          Desaturated
        </div>
      </div>
    </AbsoluteFill>
  ),
};
