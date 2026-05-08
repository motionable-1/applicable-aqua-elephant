import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import {
  Camera,
  Zoom,
  Pan,
  PushIn,
  PullOut,
  Shake,
  cameraEasings,
} from "../../remotion/library/components/layout/Camera";
import { TextAnimation } from "../../remotion/library/components/text/TextAnimation";
import { TypewriterText } from "../../remotion/library/components/text/TextAnimation";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Camera> = {
  title: "Layout/Camera",
  component: Camera,
  argTypes: {
    origin: {
      control: "select",
      options: [
        "center",
        "top left",
        "top right",
        "bottom left",
        "bottom right",
        "50% 30%",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Camera>;

// Sample scene component
const SampleScene: React.FC<{ dark?: boolean }> = ({ dark = false }) => (
  <AbsoluteFill
    style={{
      background: dark
        ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    }}
  >
    {/* Grid pattern */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
    {/* Center marker */}
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 0 20px rgba(255,255,255,0.5)",
      }}
    />
    {/* Corner markers */}
    {[
      { top: 40, left: 40 },
      { top: 40, right: 40 },
      { bottom: 40, left: 40 },
      { bottom: 40, right: 40 },
    ].map((pos, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          ...pos,
          width: 60,
          height: 60,
          borderRadius: 12,
          background: "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 24,
        }}
      >
        {["◆", "★", "●", "■"][i]}
      </div>
    ))}
    {/* Text label */}
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: "50%",
        transform: "translateX(-50%)",
        color: "white",
        fontSize: 24,
        fontWeight: 600,
        textShadow: "0 2px 10px rgba(0,0,0,0.3)",
      }}
    >
      Sample Scene
    </div>
  </AbsoluteFill>
);

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  args: {
    scale: 1.2,
    origin: "center",
  },
  render: (args) => (
    <Camera {...args}>
      <SampleScene />
    </Camera>
  ),
};

export const StaticZoom: Story = {
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
        background: "#0f0f1a",
        padding: 20,
      }}
    >
      <div style={{ textAlign: "center", color: "white" }}>
        <div
          style={{
            width: 200,
            height: 150,
            overflow: "hidden",
            borderRadius: 12,
          }}
        >
          <Camera scale={1}>
            <SampleScene />
          </Camera>
        </div>
        <div style={{ marginTop: 8, fontSize: 12 }}>1x (Original)</div>
      </div>
      <div style={{ textAlign: "center", color: "white" }}>
        <div
          style={{
            width: 200,
            height: 150,
            overflow: "hidden",
            borderRadius: 12,
          }}
        >
          <Camera scale={1.5} origin="center">
            <SampleScene />
          </Camera>
        </div>
        <div style={{ marginTop: 8, fontSize: 12 }}>1.5x Zoom</div>
      </div>
      <div style={{ textAlign: "center", color: "white" }}>
        <div
          style={{
            width: 200,
            height: 150,
            overflow: "hidden",
            borderRadius: 12,
          }}
        >
          <Camera scale={2} origin="top left">
            <SampleScene />
          </Camera>
        </div>
        <div style={{ marginTop: 8, fontSize: 12 }}>2x (Top Left)</div>
      </div>
    </AbsoluteFill>
  ),
};

// ============================================================================
// KEYFRAME ANIMATIONS
// ============================================================================

export const KeyframeZoom: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <Camera
      keyframes={[
        { frame: 0, scale: 1 },
        { frame: 60, scale: 1.8, easing: cameraEasings.pushIn },
        { frame: 120, scale: 1, easing: cameraEasings.pullOut },
      ]}
      origin="center"
    >
      <SampleScene />
    </Camera>
  ),
};

export const KeyframePanAndZoom: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <Camera
      keyframes={[
        { frame: 0, x: 0, y: 0, scale: 1 },
        {
          frame: 45,
          x: -150,
          y: -80,
          scale: 1.6,
          easing: cameraEasings.smooth,
        },
        { frame: 90, x: 150, y: -80, scale: 1.6, easing: cameraEasings.smooth },
        { frame: 135, x: 0, y: 80, scale: 1.4, easing: cameraEasings.smooth },
        { frame: 180, x: 0, y: 0, scale: 1, easing: cameraEasings.smooth },
      ]}
      origin="center"
    >
      <SampleScene />
    </Camera>
  ),
};

export const KeyframeRotation: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <Camera
      keyframes={[
        { frame: 0, rotation: 0, scale: 1 },
        { frame: 50, rotation: 5, scale: 1.2, easing: cameraEasings.smooth },
        { frame: 100, rotation: -5, scale: 1.2, easing: cameraEasings.smooth },
        { frame: 150, rotation: 0, scale: 1, easing: cameraEasings.smooth },
      ]}
      origin="center"
    >
      <SampleScene />
    </Camera>
  ),
};

// ============================================================================
// PRESET COMPONENTS
// ============================================================================

export const ZoomEffect: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <Zoom from={1} to={1.5} origin="center" easing={cameraEasings.smooth}>
      <SampleScene />
    </Zoom>
  ),
};

export const KenBurnsEffect: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <Zoom from={1} to={1.3} origin="30% 40%" easing={cameraEasings.linear}>
      <SampleScene dark />
    </Zoom>
  ),
};

export const PanEffect: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <Pan fromX={-100} fromY={0} toX={100} toY={0} easing={cameraEasings.smooth}>
      <SampleScene />
    </Pan>
  ),
};

export const PushInEffect: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <PushIn
      targetScale={1.8}
      targetX={-100}
      targetY={-50}
      duration={3}
      origin="center"
    >
      <SampleScene />
    </PushIn>
  ),
};

export const PullOutEffect: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <PullOut
      startScale={2}
      startX={50}
      startY={-30}
      duration={3}
      origin="center"
    >
      <SampleScene />
    </PullOut>
  ),
};

export const ShakeEffect: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <Shake intensity={10} speed={2} startFrame={30} duration={2}>
      <SampleScene />
    </Shake>
  ),
};

const FloatScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Use sine waves with different frequencies for organic motion
  const time = frame / fps;
  const x = Math.sin(time * 0.8) * 12 + Math.sin(time * 1.3) * 5;
  const y = Math.cos(time * 0.6) * 8 + Math.cos(time * 1.1) * 4;
  const rotation = Math.sin(time * 0.5) * 0.4;
  const scale = 1.15 + Math.sin(time * 0.7) * 0.02;

  return (
    <Camera
      x={x}
      y={y}
      rotation={rotation}
      scale={scale}
      origin="center"
      constrainToBounds
      minScale={1.1}
    >
      <AbsoluteFill
        style={{
          background: "linear-gradient(135deg, #1a1a3e 0%, #0d1b2a 50%, #1b263b 100%)",
        }}
      >
        {/* Subtle stars */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`,
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              borderRadius: "50%",
              background: `rgba(255,255,255,${0.3 + (i % 5) * 0.1})`,
            }}
          />
        ))}
        {/* Floating content */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              textShadow: "0 0 40px rgba(99, 102, 241, 0.5)",
              marginBottom: 16,
            }}
          >
            Floating
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Gentle Motion
          </div>
        </div>
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(40px)",
          }}
        />
      </AbsoluteFill>
    </Camera>
  );
};

export const FloatEffect: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={300} backgroundColor="#0a0a1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => <FloatScene />,
};

// ============================================================================
// EASING COMPARISON
// ============================================================================

export const EasingComparison: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0f0f1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => {
    const easings = [
      { name: "smooth", fn: cameraEasings.smooth },
      { name: "pushIn", fn: cameraEasings.pushIn },
      { name: "snappy", fn: cameraEasings.snappy },
      { name: "gentle", fn: cameraEasings.gentle },
    ];

    return (
      <AbsoluteFill
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          padding: 30,
        }}
      >
        {easings.map(({ name, fn }) => (
          <div key={name} style={{ position: "relative" }}>
            <div
              style={{
                overflow: "hidden",
                borderRadius: 12,
                height: "100%",
              }}
            >
              <Camera
                keyframes={[
                  { frame: 0, scale: 1 },
                  { frame: 75, scale: 1.5, easing: fn },
                  { frame: 150, scale: 1, easing: fn },
                ]}
                origin="center"
              >
                <SampleScene dark />
              </Camera>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                background: "rgba(0,0,0,0.5)",
                padding: "4px 10px",
                borderRadius: 6,
              }}
            >
              {name}
            </div>
          </div>
        ))}
      </AbsoluteFill>
    );
  },
};

// ============================================================================
// PRACTICAL EXAMPLES
// ============================================================================

export const TextRevealWithZoom: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <Camera
      keyframes={[
        { frame: 0, scale: 1.4 },
        { frame: 50, scale: 1, easing: cameraEasings.smooth },
        { frame: 120, scale: 1.1, easing: cameraEasings.gentle },
      ]}
      origin="center"
    >
      <AbsoluteFill
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Sequence from={5}>
          <TextAnimation
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              textShadow: "0 4px 30px rgba(0,0,0,0.3)",
            }}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.from(split.chars, {
                opacity: 0,
                y: 40,
                duration: 0.6,
                stagger: 0.04,
                ease: "power3.out",
              });
              return tl;
            }}
          >
            DRAMATIC
          </TextAnimation>
        </Sequence>
      </AbsoluteFill>
    </Camera>
  ),
};

export const CinematicSequence: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={240} backgroundColor="#0a0a0f">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <Camera
      keyframes={[
        // Start zoomed in on center
        { frame: 0, x: 0, y: 0, scale: 2 },
        // Pull out reveal
        { frame: 60, x: 0, y: 0, scale: 1, easing: cameraEasings.dramatic },
        // Hold
        { frame: 90, x: 0, y: 0, scale: 1 },
        // Pan to top left
        {
          frame: 140,
          x: -150,
          y: -100,
          scale: 1.3,
          easing: cameraEasings.smooth,
        },
        // Pan to bottom right
        {
          frame: 190,
          x: 150,
          y: 100,
          scale: 1.3,
          easing: cameraEasings.smooth,
        },
        // Return to center
        { frame: 240, x: 0, y: 0, scale: 1, easing: cameraEasings.gentle },
      ]}
      origin="center"
    >
      <SampleScene dark />
    </Camera>
  ),
};

export const FocusOnElement: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <Camera
      keyframes={[
        { frame: 0, x: 0, y: 0, scale: 1 },
        // Focus on top-left element
        {
          frame: 45,
          x: -280,
          y: -130,
          scale: 2.5,
          easing: cameraEasings.pushIn,
        },
        // Focus on top-right element
        {
          frame: 90,
          x: 280,
          y: -130,
          scale: 2.5,
          easing: cameraEasings.smooth,
        },
        // Focus on bottom elements
        { frame: 135, x: 0, y: 130, scale: 2, easing: cameraEasings.smooth },
        // Back to full view
        { frame: 180, x: 0, y: 0, scale: 1, easing: cameraEasings.pullOut },
      ]}
      origin="center"
    >
      <SampleScene />
    </Camera>
  ),
};

// ============================================================================
// FOLLOW TEXT WHILE TYPING
// ============================================================================

const FollowTypewriterScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const text = "Hello, welcome to our product!";
  const secondsPerChar = 0.06;
  const totalChars = text.length;
  const typingDurationFrames = totalChars * secondsPerChar * fps;

  // Approximate character width in pixels (monospace font at 32px)
  const charWidth = 19;

  // Text starts at center of screen
  const textStartX = width / 2 - 100;

  // Smooth continuous camera movement - linear interpolation for perfect tracking
  const cameraX = interpolate(
    frame,
    [0, typingDurationFrames],
    [0, totalChars * charWidth],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const gridSize = 40;

  return (
    <AbsoluteFill style={{ background: "#1a1a2e", overflow: "hidden" }}>
      {/* Camera follows the cursor */}
      <Camera x={cameraX} y={0} scale={1.2} origin="center">
        <AbsoluteFill>
          {/* Grid background */}
          <div
            style={{
              position: "absolute",
              inset: -1000,
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: `${gridSize}px ${gridSize}px`,
            }}
          />

          {/* Typewriter content */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: textStartX,
              transform: "translateY(-50%)",
            }}
          >
            <TypewriterText
              speed={secondsPerChar}
              cursor
              cursorChar="|"
              cursorColor="#60a5fa"
              style={{
                fontSize: 32,
                fontWeight: 600,
                color: "white",
                fontFamily: "monospace",
                whiteSpace: "nowrap",
              }}
            >
              {text}
            </TypewriterText>
          </div>
        </AbsoluteFill>
      </Camera>
    </AbsoluteFill>
  );
};

export const FollowTypewriter: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#1a1a2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => <FollowTypewriterScene />,
};

// Multi-line typing with camera following each line
const FollowMultilineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = [
    "First line of code...",
    "Second line appears here",
    "And the final conclusion!",
  ];

  const secondsPerChar = 0.05; // 20 chars per second
  const lineDelayFrames = 20; // frames between lines

  // Calculate which line we're on and camera position
  const line1DurationFrames = lines[0].length * secondsPerChar * fps;
  const line2Start = line1DurationFrames + lineDelayFrames;
  const line2DurationFrames = lines[1].length * secondsPerChar * fps;
  const line3Start = line2Start + line2DurationFrames + lineDelayFrames;

  // Camera Y follows which line is being typed
  const cameraY = interpolate(
    frame,
    [0, line2Start - 10, line2Start + 10, line3Start - 10, line3Start + 10],
    [-40, -40, 0, 0, 40],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Slight zoom as we progress
  const scale = interpolate(frame, [0, line3Start + 60], [1.6, 1.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Camera x={0} y={cameraY} scale={scale} origin="center">
      <AbsoluteFill
        style={{
          background: "#0d1117",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: 40,
        }}
      >
        {lines.map((line, index) => {
          const startFrame =
            index === 0 ? 0 : index === 1 ? line2Start : line3Start;
          return (
            <Sequence key={index} from={startFrame}>
              <TypewriterText
                speed={secondsPerChar}
                cursor={index === lines.length - 1}
                cursorChar="█"
                cursorColor={index === 2 ? "#4ade80" : "#60a5fa"}
                style={{
                  fontSize: 28,
                  fontWeight: 500,
                  color: index === 2 ? "#4ade80" : "#e2e8f0",
                  fontFamily: "'SF Mono', 'Fira Code', monospace",
                }}
              >
                {line}
              </TypewriterText>
            </Sequence>
          );
        })}
      </AbsoluteFill>
    </Camera>
  );
};

export const FollowMultilineTyping: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={240} backgroundColor="#0d1117">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => <FollowMultilineScene />,
};

// Code editor style with camera following
const CodeEditorFollowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const codeLines = [
    { text: "const greeting = () => {", color: "#c792ea" },
    { text: '  return "Hello World!";', color: "#c3e88d" },
    { text: "};", color: "#c792ea" },
    { text: "", color: "transparent" },
    { text: "greeting();", color: "#82aaff" },
  ];

  const secondsPerChar = 0.04; // 25 chars per second
  const lineDelayFrames = 12;

  // Calculate cumulative timings
  let currentFrame = 0;
  const lineTimings = codeLines.map((line) => {
    const start = currentFrame;
    const durationFrames =
      line.text.length > 0 ? line.text.length * secondsPerChar * fps : 10;
    currentFrame = start + durationFrames + lineDelayFrames;
    return { start, duration: durationFrames };
  });

  // Smooth camera Y that follows active line
  const smoothCameraY = interpolate(
    frame,
    lineTimings.map((t) => t.start),
    lineTimings.map((_, i) => i * 36 - 72),
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <Camera x={0} y={smoothCameraY} scale={2} origin="center">
      <AbsoluteFill
        style={{
          background: "#1e1e2e",
          padding: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#11111b",
            borderRadius: 12,
            padding: 24,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 18,
            lineHeight: "36px",
            minWidth: 400,
          }}
        >
          {/* Line numbers */}
          <div style={{ display: "flex" }}>
            <div
              style={{
                color: "#6c7086",
                paddingRight: 20,
                textAlign: "right",
                userSelect: "none",
              }}
            >
              {codeLines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              {codeLines.map((line, index) => (
                <Sequence key={index} from={lineTimings[index].start}>
                  {line.text.length > 0 ? (
                    <TypewriterText
                      speed={secondsPerChar}
                      cursor={index === codeLines.length - 1}
                      cursorChar="|"
                      cursorColor="#f5e0dc"
                      style={{
                        color: line.color,
                        display: "block",
                        height: 36,
                      }}
                    >
                      {line.text}
                    </TypewriterText>
                  ) : (
                    <div style={{ height: 36 }} />
                  )}
                </Sequence>
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Camera>
  );
};

export const CodeEditorFollow: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={200} backgroundColor="#1e1e2e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => <CodeEditorFollowScene />,
};

// ============================================================================
// CAMERA WRAPPED SCENE EXAMPLES
// ============================================================================

// Hero Section with Cinematic Zoom
const HeroSceneWithCamera: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 1.3, y: 30 },
        { frame: 60, scale: 1.1, y: 10, easing: cameraEasings.smooth },
        { frame: 120, scale: 1, y: 0, easing: cameraEasings.gentle },
      ]}
      origin="center"
    >
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
            top: -100,
            right: -100,
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
            bottom: -50,
            left: -50,
            filter: "blur(50px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: 60,
            textAlign: "center",
          }}
        >
          <TextAnimation
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#818cf8",
              textTransform: "uppercase",
              letterSpacing: 4,
              marginBottom: 20,
            }}
            createTimeline={({ textRef, tl }) => {
              tl.from(textRef.current, { opacity: 0, y: 10, duration: 0.5 });
              return tl;
            }}
          >
            Introducing
          </TextAnimation>

          <TextAnimation
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "white",
              letterSpacing: -2,
              lineHeight: 1.1,
              marginBottom: 24,
            }}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.from(split.chars, {
                opacity: 0,
                y: 50,
                rotationX: -90,
                duration: 0.6,
                stagger: 0.02,
                ease: "power3.out",
                delay: 0.3,
              });
              return tl;
            }}
          >
            The Future of Design
          </TextAnimation>

          <TextAnimation
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 500,
              lineHeight: 1.6,
            }}
            createTimeline={({ textRef, tl }) => {
              tl.from(textRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                delay: 0.8,
              });
              return tl;
            }}
          >
            Create stunning visuals with our AI-powered design platform
          </TextAnimation>

          {/* CTA Button */}
          <div
            style={{
              marginTop: 40,
              padding: "16px 40px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: 12,
              color: "white",
              fontWeight: 600,
              fontSize: 16,
              opacity: interpolate(frame, [50, 65], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `translateY(${interpolate(frame, [50, 65], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
            }}
          >
            Get Started Free →
          </div>
        </div>
      </AbsoluteFill>
    </Camera>
  );
};

export const HeroWithCinematicZoom: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0f0f23">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => <HeroSceneWithCamera />,
};

// Landing Page Ken Burns Effect
const LandingKenBurnsScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 1.15, x: -30, y: 20 },
        { frame: 180, scale: 1, x: 20, y: -10, easing: cameraEasings.gentle },
      ]}
      origin="center"
    >
      <AbsoluteFill>
        {/* Background image simulation */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
          }}
        />

        {/* Decorative shapes */}
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.1)",
            top: 50,
            right: 100,
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(236, 72, 153, 0.08)",
            bottom: 100,
            left: 150,
            filter: "blur(30px)",
          }}
        />

        {/* Content overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            padding: 80,
          }}
        >
          <div style={{ maxWidth: 500 }}>
            <TextAnimation
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: "white",
                lineHeight: 1.2,
                marginBottom: 24,
              }}
              createTimeline={({ textRef, tl, SplitText }) => {
                const split = new SplitText(textRef.current, { type: "lines" });
                tl.from(split.lines, {
                  opacity: 0,
                  y: 40,
                  duration: 0.6,
                  stagger: 0.12,
                  ease: "power3.out",
                  delay: 0.3,
                });
                return tl;
              }}
            >
              Build faster, ship smarter
            </TextAnimation>

            <TextAnimation
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                marginBottom: 32,
              }}
              createTimeline={({ textRef, tl }) => {
                tl.from(textRef.current, {
                  opacity: 0,
                  y: 20,
                  duration: 0.5,
                  delay: 0.8,
                });
                return tl;
              }}
            >
              The all-in-one platform for modern teams. Collaborate, build, and
              deploy with confidence.
            </TextAnimation>

            <div
              style={{
                display: "flex",
                gap: 16,
                opacity: interpolate(frame, [50, 70], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${interpolate(frame, [50, 70], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
              }}
            >
              <div
                style={{
                  padding: "14px 28px",
                  background: "white",
                  borderRadius: 10,
                  color: "#111",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Start Free Trial
              </div>
              <div
                style={{
                  padding: "14px 28px",
                  background: "transparent",
                  borderRadius: 10,
                  color: "white",
                  fontWeight: 600,
                  fontSize: 15,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Watch Demo
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Camera>
  );
};

export const LandingWithKenBurns: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0f0f23">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => <LandingKenBurnsScene />,
};

// ============================================================================
// MORE CAMERA SCENE EXAMPLES
// ============================================================================

// Feature Cards with Staggered Zoom
const FeatureCardsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      desc: "Built for speed",
      color: "#fbbf24",
    },
    { icon: "🔒", title: "Secure", desc: "Enterprise-grade", color: "#10b981" },
    { icon: "🎨", title: "Beautiful", desc: "Pixel perfect", color: "#ec4899" },
  ];

  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 1.4, y: 50 },
        { frame: 40, scale: 1.15, y: 0, easing: cameraEasings.smooth },
        { frame: 100, scale: 1, y: -10, easing: cameraEasings.gentle },
        { frame: 150, scale: 1.05, y: 0, easing: cameraEasings.smooth },
      ]}
      origin="center"
    >
      <AbsoluteFill style={{ background: "#0a0a0f" }}>
        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            top: -100,
            left: "20%",
            filter: "blur(60px)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: 50,
            gap: 40,
          }}
        >
          <TextAnimation
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "white",
              textAlign: "center",
            }}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.from(split.words, {
                opacity: 0,
                y: 30,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
              });
              return tl;
            }}
          >
            Why teams love us
          </TextAnimation>

          <div style={{ display: "flex", gap: 24 }}>
            {features.map((feature, i) => {
              const delay = 25 + i * 15;
              const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const y = interpolate(frame, [delay, delay + 20], [30, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              });
              const scale = interpolate(frame, [delay, delay + 20], [0.9, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={feature.title}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 20,
                    padding: "36px 32px",
                    width: 200,
                    textAlign: "center",
                    opacity,
                    transform: `translateY(${y}px) scale(${scale})`,
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: 16 }}>
                    {feature.icon}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "white",
                      marginBottom: 8,
                    }}
                  >
                    {feature.title}
                  </div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
                    {feature.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </Camera>
  );
};

export const FeatureCardsWithCamera: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a0f">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => <FeatureCardsScene />,
};

// Quote Reveal with Dramatic Push-In
const QuoteRevealScene: React.FC = () => {
  const frame = useCurrentFrame();

  const quoteOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 2, y: 0 },
        { frame: 50, scale: 1.2, easing: cameraEasings.smooth },
        { frame: 100, scale: 1, easing: cameraEasings.gentle },
        { frame: 150, scale: 1.02, y: -5, easing: cameraEasings.smooth },
      ]}
      origin="center"
    >
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            filter: "blur(80px)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: 60,
            textAlign: "center",
            opacity: quoteOpacity,
          }}
        >
          <div
            style={{
              fontSize: 50,
              color: "rgba(168, 85, 247, 0.4)",
              fontFamily: "Georgia, serif",
              marginBottom: 10,
            }}
          >
            "
          </div>

          <TextAnimation
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: "white",
              maxWidth: 650,
              lineHeight: 1.6,
            }}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.from(split.words, {
                opacity: 0,
                y: 20,
                duration: 0.4,
                stagger: 0.03,
                ease: "power2.out",
                delay: 0.8,
              });
              return tl;
            }}
          >
            Design is not just what it looks like. Design is how it works.
          </TextAnimation>

          <div
            style={{
              marginTop: 30,
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              fontWeight: 500,
              opacity: interpolate(frame, [80, 100], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            — Steve Jobs
          </div>
        </div>
      </AbsoluteFill>
    </Camera>
  );
};

export const QuoteWithDramaticZoom: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0f0f1a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => <QuoteRevealScene />,
};

// Logo Reveal with Cinematic Scale
const LogoRevealScene: React.FC = () => {
  const frame = useCurrentFrame();

  const logoScale = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });
  const logoOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 2.5 },
        { frame: 40, scale: 1.3, easing: cameraEasings.smooth },
        { frame: 80, scale: 1, easing: cameraEasings.gentle },
        { frame: 150, scale: 1.02, easing: cameraEasings.smooth },
      ]}
      origin="center"
    >
      <AbsoluteFill style={{ background: "#000" }}>
        {/* Radial gradient background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, #1a1a2e 0%, #000 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 30,
              background:
                "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 60,
              boxShadow: "0 20px 60px rgba(99, 102, 241, 0.4)",
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
              marginBottom: 30,
            }}
          >
            ✦
          </div>

          {/* Brand name */}
          <TextAnimation
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "white",
              letterSpacing: -1,
              opacity: logoOpacity,
            }}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.from(split.chars, {
                opacity: 0,
                y: 30,
                duration: 0.4,
                stagger: 0.03,
                ease: "power3.out",
                delay: 0.5,
              });
              return tl;
            }}
          >
            Stellar
          </TextAnimation>

          {/* Tagline */}
          <div
            style={{
              marginTop: 16,
              fontSize: 16,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: taglineOpacity,
            }}
          >
            Design Beyond Limits
          </div>
        </div>
      </AbsoluteFill>
    </Camera>
  );
};

export const LogoRevealWithCamera: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#000">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => <LogoRevealScene />,
};

// App Interface with Focus Shift
const AppInterfaceScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 1.3, x: -80, y: 40 },
        { frame: 50, scale: 1.1, x: 0, y: 0, easing: cameraEasings.smooth },
        { frame: 100, scale: 1.2, x: 60, y: -30, easing: cameraEasings.gentle },
        { frame: 150, scale: 1, x: 0, y: 0, easing: cameraEasings.smooth },
      ]}
      origin="center"
    >
      <AbsoluteFill style={{ background: "#0f172a" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: 40,
          }}
        >
          {/* App mockup */}
          <div
            style={{
              width: 700,
              height: 400,
              background: "#1e293b",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Header */}
            <div
              style={{
                height: 50,
                background: "#0f172a",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#ef4444",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#fbbf24",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              />
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 13,
                }}
              >
                Dashboard — Analytics
              </div>
            </div>

            {/* Content */}
            <div style={{ display: "flex", height: "calc(100% - 50px)" }}>
              {/* Sidebar */}
              <div
                style={{
                  width: 200,
                  background: "#0f172a",
                  borderRight: "1px solid rgba(255,255,255,0.1)",
                  padding: 16,
                }}
              >
                {["Overview", "Analytics", "Reports", "Settings"].map(
                  (item, i) => {
                    const itemOpacity = interpolate(
                      frame,
                      [20 + i * 10, 30 + i * 10],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                    );
                    return (
                      <div
                        key={item}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 8,
                          marginBottom: 4,
                          background:
                            i === 1 ? "rgba(99, 102, 241, 0.2)" : "transparent",
                          color: i === 1 ? "#818cf8" : "rgba(255,255,255,0.6)",
                          fontSize: 13,
                          fontWeight: i === 1 ? 600 : 400,
                          opacity: itemOpacity,
                        }}
                      >
                        {item}
                      </div>
                    );
                  },
                )}
              </div>

              {/* Main content */}
              <div style={{ flex: 1, padding: 24 }}>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "white",
                    marginBottom: 20,
                    opacity: interpolate(frame, [40, 55], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  Performance Overview
                </div>

                {/* Chart bars */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 12,
                    height: 200,
                  }}
                >
                  {[60, 80, 45, 90, 70, 85, 55, 95].map((h, i) => {
                    const barDelay = 50 + i * 5;
                    const barHeight = interpolate(
                      frame,
                      [barDelay, barDelay + 20],
                      [0, h],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                        easing: Easing.out(Easing.cubic),
                      },
                    );
                    return (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: `${barHeight}%`,
                          background:
                            "linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)",
                          borderRadius: 6,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Camera>
  );
};

export const AppInterfaceWithCamera: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0f172a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => <AppInterfaceScene />,
};

// Announcement Banner with Zoom Out
const AnnouncementScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 2.5 },
        { frame: 30, scale: 1.5, easing: cameraEasings.smooth },
        { frame: 70, scale: 1, easing: cameraEasings.gentle },
        { frame: 120, scale: 1.05, easing: cameraEasings.smooth },
      ]}
      origin="center"
    >
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
        }}
      >
        {/* Pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            style={{
              padding: "8px 20px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: 20,
              color: "white",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 24,
              opacity: interpolate(frame, [40, 55], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            🎉 NEW RELEASE
          </div>

          <TextAnimation
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.from(split.chars, {
                opacity: 0,
                scale: 0,
                duration: 0.4,
                stagger: 0.02,
                ease: "back.out(1.7)",
                delay: 0.6,
              });
              return tl;
            }}
          >
            Version 2.0
          </TextAnimation>

          <TextAnimation
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.9)",
              maxWidth: 450,
              lineHeight: 1.5,
            }}
            createTimeline={({ textRef, tl }) => {
              tl.from(textRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                delay: 1.2,
              });
              return tl;
            }}
          >
            Faster, smarter, and more powerful than ever before
          </TextAnimation>

          {/* CTA */}
          <div
            style={{
              marginTop: 36,
              padding: "16px 36px",
              background: "white",
              borderRadius: 12,
              color: "#6366f1",
              fontWeight: 700,
              fontSize: 16,
              opacity: interpolate(frame, [80, 95], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `translateY(${interpolate(frame, [80, 95], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
            }}
          >
            Upgrade Now
          </div>
        </div>
      </AbsoluteFill>
    </Camera>
  );
};

export const AnnouncementWithCamera: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#6366f1">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => <AnnouncementScene />,
};
