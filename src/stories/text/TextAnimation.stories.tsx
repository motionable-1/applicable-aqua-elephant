import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import {
  TextAnimation,
  Typewriter,
} from "../../remotion/library/components/text";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof TextAnimation> = {
  title: "Text/TextAnimation",
  component: TextAnimation,
};

export default meta;
type Story = StoryObj<typeof TextAnimation>;

// ============================================
// PREMIUM CINEMATIC EXAMPLES
// ============================================

export const CinematicTitle: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#000000">
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
        gap: 8,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.4em",
          color: "#666",
          textTransform: "uppercase",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          tl.from(split.chars, {
            opacity: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: "power2.out",
          });
          return tl;
        }}
      >
        Introducing
      </TextAnimation>
      <TextAnimation
        style={{
          fontSize: 96,
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-0.02em",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          (split.chars as HTMLElement[]).forEach((char) => {
            char.style.display = "inline-block";
          });
          tl.from(
            split.chars,
            {
              opacity: 0,
              y: 80,
              rotationX: -90,
              duration: 1,
              stagger: 0.04,
              ease: "power4.out",
            },
            0.3,
          );
          return tl;
        }}
      >
        Vision Pro
      </TextAnimation>
      <TextAnimation
        style={{
          fontSize: 24,
          fontWeight: 400,
          color: "#888",
          marginTop: 16,
        }}
        createTimeline={({ textRef, tl }) => {
          tl.from(
            textRef.current,
            {
              opacity: 0,
              y: 20,
              duration: 0.8,
              ease: "power2.out",
            },
            0.8,
          );
          return tl;
        }}
      >
        Welcome to the era of spatial computing.
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const SplitReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0a0a0a">
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
        overflow: "hidden",
      }}
    >
      <TextAnimation
        style={{
          fontSize: 120,
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-0.03em",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          (split.chars as HTMLElement[]).forEach((char) => {
            char.style.display = "inline-block";
            char.style.overflow = "hidden";
          });
          tl.from(split.chars, {
            yPercent: 100,
            opacity: 0,
            duration: 0.8,
            stagger: {
              each: 0.03,
              from: "center",
            },
            ease: "power4.out",
          });
          return tl;
        }}
      >
        IMPACT
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const GradientMask: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#000">
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
      <TextAnimation
        style={{
          fontSize: 80,
          fontWeight: 700,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          const colors = [
            "#667eea",
            "#7367d4",
            "#8060be",
            "#8c59a8",
            "#9952a2",
            "#a64b9c",
            "#b34496",
            "#c03d90",
            "#cd368a",
            "#da2f84",
            "#e7287e",
            "#f093fb",
          ];
          (split.chars as HTMLElement[]).forEach((char, i) => {
            char.style.display = "inline-block";
            const colorIndex = Math.floor(
              (i / split.chars.length) * colors.length,
            );
            char.style.color = colors[Math.min(colorIndex, colors.length - 1)];
          });
          tl.from(split.chars, {
            opacity: 0,
            scale: 1.5,
            filter: "blur(20px)",
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
          });
          return tl;
        }}
      >
        Beautiful
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const ClipReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0f0f0f">
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
      <TextAnimation
        style={{
          fontSize: 72,
          fontWeight: 600,
          color: "#fff",
          overflow: "hidden",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
            word.style.overflow = "hidden";
            word.style.paddingBottom = "10px";
          });
          // Wrap each word's content in a span for the reveal
          (split.words as HTMLElement[]).forEach((word) => {
            const text = word.innerHTML;
            word.innerHTML = `<span style="display:inline-block">${text}</span>`;
          });
          const innerSpans = (split.words as HTMLElement[]).map((w) =>
            w.querySelector("span"),
          );
          tl.from(innerSpans, {
            yPercent: 110,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
          });
          return tl;
        }}
      >
        Premium Motion Design
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const StaggeredLines: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0a0a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 80,
      }}
    >
      {["Create.", "Design.", "Inspire."].map((text, i) => (
        <TextAnimation
          key={text}
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            overflow: "hidden",
          }}
          createTimeline={({ textRef, tl }) => {
            tl.from(
              textRef.current,
              {
                yPercent: 100,
                opacity: 0,
                duration: 0.9,
                ease: "power4.out",
              },
              i * 0.15,
            );
            return tl;
          }}
        >
          {text}
        </TextAnimation>
      ))}
    </AbsoluteFill>
  ),
};

export const GlitchText: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#000">
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
      <TextAnimation
        style={{
          fontSize: 80,
          fontWeight: 800,
          color: "#fff",
          textTransform: "uppercase",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          (split.chars as HTMLElement[]).forEach((char, i) => {
            char.style.display = "inline-block";
            char.style.textShadow =
              i % 2 === 0
                ? "2px 0 #ff0040, -2px 0 #00ff90"
                : "-2px 0 #ff0040, 2px 0 #00ff90";
          });
          tl.from(split.chars, {
            opacity: 0,
            scaleY: 0,
            duration: 0.1,
            stagger: {
              each: 0.02,
              from: "random",
            },
            ease: "power4.out",
          });
          tl.to(
            split.chars,
            {
              textShadow: "0 0 transparent",
              duration: 0.3,
              stagger: 0.01,
              ease: "power2.out",
            },
            0.3,
          );
          return tl;
        }}
      >
        Glitch
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const ScaleRotate: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0f172a">
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
      <TextAnimation
        style={{
          fontSize: 100,
          fontWeight: 800,
          color: "#fff",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          (split.chars as HTMLElement[]).forEach((char) => {
            char.style.display = "inline-block";
            char.style.transformOrigin = "center bottom";
          });
          tl.from(split.chars, {
            opacity: 0,
            scale: 0,
            rotation: -180,
            duration: 1,
            stagger: {
              each: 0.06,
              from: "start",
            },
            ease: "back.out(1.7)",
          });
          return tl;
        }}
      >
        SPIN
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const WordByWord: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#000">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 48,
          fontWeight: 500,
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.5,
          maxWidth: 700,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
          });
          tl.from(split.words, {
            opacity: 0,
            y: 40,
            filter: "blur(10px)",
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          });
          return tl;
        }}
      >
        Every word carefully placed to create the perfect narrative experience
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const DropShadow: Story = {
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
      <TextAnimation
        style={{
          fontSize: 90,
          fontWeight: 800,
          color: "#fff",
          textShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          (split.chars as HTMLElement[]).forEach((char) => {
            char.style.display = "inline-block";
          });
          tl.from(split.chars, {
            opacity: 0,
            y: -100,
            rotationX: 90,
            textShadow: "0 0 0 transparent",
            duration: 0.8,
            stagger: 0.04,
            ease: "power4.out",
          });
          return tl;
        }}
      >
        DEPTH
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const NumberCount: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#000">
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
        gap: 8,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 140,
          fontWeight: 800,
          color: "#fff",
          fontVariantNumeric: "tabular-nums",
        }}
        createTimeline={({ textRef, tl }) => {
          tl.from(textRef.current, {
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out",
          });
          tl.from(
            textRef.current,
            {
              scale: 0.8,
              opacity: 0,
              duration: 0.4,
              ease: "power3.out",
            },
            0,
          );
          return tl;
        }}
      >
        2024
      </TextAnimation>
      <TextAnimation
        style={{
          fontSize: 18,
          fontWeight: 500,
          color: "#666",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
        createTimeline={({ textRef, tl }) => {
          tl.from(
            textRef.current,
            {
              opacity: 0,
              y: 10,
              duration: 0.5,
              ease: "power2.out",
            },
            0.5,
          );
          return tl;
        }}
      >
        Year in Review
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const TypewriterEffect: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#1e1e1e">
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
        fontFamily: "'SF Mono', 'Fira Code', monospace",
      }}
    >
      <Typewriter
        text="$ npm install motion-primitives --save"
        speed={0.05}
        cursor
        cursorChar="|"
        cursorStyle={{ color: "#4ade80" }}
        style={{
          fontSize: 24,
          fontWeight: 400,
          color: "#4ade80",
        }}
      />
    </AbsoluteFill>
  ),
};

export const ExpandFromCenter: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#000">
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
      <TextAnimation
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          (split.chars as HTMLElement[]).forEach((char) => {
            char.style.display = "inline-block";
          });
          tl.from(split.chars, {
            opacity: 0,
            letterSpacing: "-0.5em",
            duration: 1.2,
            stagger: {
              each: 0.03,
              from: "center",
            },
            ease: "power4.out",
          });
          return tl;
        }}
      >
        EXPAND
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const StackedReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0a0a">
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
        gap: 0,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 120,
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "2px #fff",
          lineHeight: 1,
        }}
        createTimeline={({ textRef, tl }) => {
          tl.from(textRef.current, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power4.out",
          });
          return tl;
        }}
      >
        OUTLINE
      </TextAnimation>
      <TextAnimation
        style={{
          fontSize: 120,
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1,
          marginTop: -20,
        }}
        createTimeline={({ textRef, tl }) => {
          tl.from(
            textRef.current,
            {
              opacity: 0,
              y: 50,
              duration: 0.8,
              ease: "power4.out",
            },
            0.15,
          );
          return tl;
        }}
      >
        FILLED
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const BlurFocus: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0f0f0f">
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
      <TextAnimation
        style={{
          fontSize: 64,
          fontWeight: 600,
          color: "#fff",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
          });
          // Start all words blurred except first
          (split.words as HTMLElement[]).forEach((word, i) => {
            if (i > 0) word.style.filter = "blur(8px)";
          });
          tl.to(
            split.words,
            {
              filter: "blur(0px)",
              duration: 0.4,
              stagger: 0.3,
              ease: "power2.out",
            },
            0.2,
          );
          return tl;
        }}
      >
        Focus on what matters
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const PerspectiveFlip: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#000">
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
        perspective: 1000,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 80,
          fontWeight: 800,
          color: "#fff",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          (split.chars as HTMLElement[]).forEach((char) => {
            char.style.display = "inline-block";
            char.style.transformStyle = "preserve-3d";
          });
          tl.from(split.chars, {
            opacity: 0,
            rotationY: -90,
            z: -200,
            duration: 0.8,
            stagger: {
              each: 0.05,
              from: "edges",
            },
            ease: "power3.out",
          });
          return tl;
        }}
      >
        PERSPECTIVE
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const SlideLeftBlurReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a0a">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 48,
          fontWeight: 600,
          color: "white",
          textAlign: "left",
          maxWidth: 700,
          lineHeight: 1.4,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          // Initial state: all words blurred and offset
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
          });
          // Animate the container sliding left
          tl.fromTo(
            textRef.current,
            { x: 100 },
            { x: -100, duration: 4, ease: "none" },
          );
          // Words reveal with blur, staggered
          tl.from(
            split.words,
            {
              opacity: 0,
              filter: "blur(20px)",
              x: 40,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            },
            0,
          );
          return tl;
        }}
      >
        Creating beautiful motion design with smooth animations and professional
        transitions
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const CinematicTextCrawl: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={240} backgroundColor="#000">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 80,
        overflow: "hidden",
      }}
    >
      <TextAnimation
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: "white",
          whiteSpace: "nowrap",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
          });
          // Continuous left scroll
          tl.fromTo(
            textRef.current,
            { x: 800 },
            { x: -1200, duration: 7, ease: "none" },
          );
          // Each word fades in and gets sharp as it enters
          tl.from(
            split.words,
            {
              opacity: 0,
              filter: "blur(30px)",
              scale: 0.9,
              duration: 0.6,
              stagger: 0.2,
              ease: "power2.out",
            },
            0,
          );
          return tl;
        }}
      >
        Innovation starts here — Design the future today
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const FocusReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#111">
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
      <TextAnimation
        style={{
          fontSize: 44,
          fontWeight: 500,
          color: "white",
          textAlign: "center",
          maxWidth: 800,
          lineHeight: 1.5,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
          });
          // Slide entire text left slowly
          tl.to(textRef.current, {
            x: -80,
            duration: 5,
            ease: "none",
          });
          // Words come into focus one by one
          tl.from(
            split.words,
            {
              opacity: 0.1,
              filter: "blur(15px)",
              duration: 0.5,
              stagger: 0.12,
              ease: "power2.out",
            },
            0,
          );
          // After revealing, words go slightly out of focus as new ones appear
          (split.words as HTMLElement[]).forEach((word, i) => {
            tl.to(
              word,
              {
                opacity: 0.4,
                filter: "blur(4px)",
                duration: 0.4,
                ease: "power2.in",
              },
              0.5 + i * 0.12,
            );
          });
          return tl;
        }}
      >
        Every great story begins with a single word that captures the
        imagination
      </TextAnimation>
    </AbsoluteFill>
  ),
};

// ============================================
// VERTICAL GRADIENT TEXT ANIMATIONS
// ============================================

// Wrapper component for vertical gradient text
const VerticalGradientText: React.FC<{
  children: React.ReactNode;
  gradient: string;
  style?: React.CSSProperties;
}> = ({ children, gradient, style }) => (
  <div
    style={{
      background: gradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      ...style,
    }}
  >
    {children}
  </div>
);

export const VerticalGradientFade: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0a0a0a">
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
      <VerticalGradientText gradient="linear-gradient(180deg, #ffffff 0%, #ffffff 30%, #888888 70%, #444444 100%)">
        <TextAnimation
          style={{
            fontSize: 96,
            fontWeight: 800,
          }}
          createTimeline={({ textRef, tl }) => {
            tl.from(textRef.current, {
              opacity: 0,
              y: 60,
              duration: 0.9,
              ease: "power4.out",
            });
            return tl;
          }}
        >
          Elegance
        </TextAnimation>
      </VerticalGradientText>
    </AbsoluteFill>
  ),
};

export const SunsetGradient: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0f0f0f">
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
        gap: 0,
      }}
    >
      <VerticalGradientText gradient="linear-gradient(180deg, #ff6b6b 0%, #ff8a5c 25%, #feca57 50%, #ffb7d5 75%, #ff9ff3 100%)">
        <TextAnimation
          style={{
            fontSize: 110,
            fontWeight: 900,
            lineHeight: 1,
          }}
          createTimeline={({ textRef, tl }) => {
            tl.from(textRef.current, {
              opacity: 0,
              scaleY: 0,
              transformOrigin: "bottom center",
              duration: 0.7,
              ease: "back.out(1.7)",
            });
            return tl;
          }}
        >
          SUNSET
        </TextAnimation>
      </VerticalGradientText>
      <TextAnimation
        style={{
          fontSize: 20,
          fontWeight: 400,
          color: "#666",
          marginTop: 16,
          letterSpacing: "0.3em",
        }}
        createTimeline={({ textRef, tl }) => {
          tl.from(
            textRef.current,
            {
              opacity: 0,
              y: 10,
              duration: 0.6,
              ease: "power2.out",
            },
            0.6,
          );
          return tl;
        }}
      >
        GOLDEN HOUR COLLECTION
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const OceanGradient: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#000">
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
      <VerticalGradientText gradient="linear-gradient(180deg, #00d2ff 0%, #1cb8e8 35%, #3a7bd5 70%, #1e3a8a 100%)">
        <TextAnimation
          style={{
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
          createTimeline={({ textRef, tl }) => {
            tl.from(textRef.current, {
              opacity: 0,
              y: -80,
              rotationX: 90,
              duration: 1,
              ease: "power4.out",
            });
            return tl;
          }}
        >
          Deep Blue
        </TextAnimation>
      </VerticalGradientText>
    </AbsoluteFill>
  ),
};

export const NeonVerticalGradient: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0a0a0f">
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
      <VerticalGradientText
        gradient="linear-gradient(180deg, #00ff87 0%, #30f7a3 33%, #60efff 66%, #a78bfa 100%)"
        style={{
          filter:
            "drop-shadow(0 0 20px rgba(0, 255, 135, 0.5)) drop-shadow(0 0 40px rgba(96, 239, 255, 0.3))",
        }}
      >
        <TextAnimation
          style={{
            fontSize: 100,
            fontWeight: 900,
          }}
          createTimeline={({ textRef, tl }) => {
            tl.from(textRef.current, {
              opacity: 0,
              scale: 2,
              filter: "blur(20px)",
              duration: 0.6,
              ease: "power3.out",
            });
            return tl;
          }}
        >
          NEON
        </TextAnimation>
      </VerticalGradientText>
    </AbsoluteFill>
  ),
};

export const SilverGradient: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0f0f0f">
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
        gap: 4,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: "#555",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
        }}
        createTimeline={({ textRef, tl }) => {
          tl.from(textRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          });
          return tl;
        }}
      >
        Premium
      </TextAnimation>
      <VerticalGradientText gradient="linear-gradient(180deg, #f8f8f8 0%, #c8c8c8 25%, #888888 50%, #c8c8c8 75%, #f8f8f8 100%)">
        <TextAnimation
          style={{
            fontSize: 84,
            fontWeight: 800,
          }}
          createTimeline={({ textRef, tl }) => {
            tl.from(
              textRef.current,
              {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power4.out",
              },
              0.2,
            );
            return tl;
          }}
        >
          PLATINUM
        </TextAnimation>
      </VerticalGradientText>
    </AbsoluteFill>
  ),
};

export const FireGradient: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0a0000">
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
      <VerticalGradientText
        gradient="linear-gradient(180deg, #fff7ad 0%, #ffc857 25%, #ffa500 50%, #ff6a00 75%, #ff4500 100%)"
        style={{
          filter: "drop-shadow(0 0 10px rgba(255, 69, 0, 0.5))",
        }}
      >
        <TextAnimation
          style={{
            fontSize: 110,
            fontWeight: 900,
          }}
          createTimeline={({ textRef, tl }) => {
            tl.from(textRef.current, {
              opacity: 0,
              scaleY: 0,
              transformOrigin: "bottom center",
              duration: 0.5,
              ease: "power2.out",
            });
            return tl;
          }}
        >
          FLAME
        </TextAnimation>
      </VerticalGradientText>
    </AbsoluteFill>
  ),
};

export const AuroraGradient: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#050510">
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
        gap: 16,
      }}
    >
      <VerticalGradientText gradient="linear-gradient(180deg, #22d3ee 0%, #34d399 25%, #a78bfa 50%, #f472b6 75%, #fb7185 100%)">
        <TextAnimation
          style={{
            fontSize: 80,
            fontWeight: 800,
          }}
          createTimeline={({ textRef, tl }) => {
            tl.from(textRef.current, {
              opacity: 0,
              y: 100,
              rotationX: -90,
              duration: 1.2,
              ease: "power4.out",
            });
            return tl;
          }}
        >
          AURORA
        </TextAnimation>
      </VerticalGradientText>
      <TextAnimation
        style={{
          fontSize: 22,
          fontWeight: 400,
          background: "linear-gradient(180deg, #a8edea 0%, #fed6e3 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: 0.8,
        }}
        createTimeline={({ textRef, tl }) => {
          tl.from(
            textRef.current,
            {
              opacity: 0,
              y: 20,
              duration: 0.8,
              ease: "power2.out",
            },
            0.8,
          );
          return tl;
        }}
      >
        Northern Lights Experience
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const RoyalGradient: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0a12">
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
      <VerticalGradientText gradient="linear-gradient(180deg, #e0c3fc 0%, #c9a7f5 20%, #b18bee 40%, #9a6fe7 60%, #8e2de2 80%, #4a00e0 100%)">
        <TextAnimation
          style={{
            fontSize: 90,
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
          createTimeline={({ textRef, tl }) => {
            tl.from(textRef.current, {
              opacity: 0,
              scale: 0,
              rotation: -180,
              duration: 0.9,
              ease: "back.out(1.4)",
            });
            return tl;
          }}
        >
          ROYAL
        </TextAnimation>
      </VerticalGradientText>
    </AbsoluteFill>
  ),
};

export const MintGradient: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0a1210">
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
      <VerticalGradientText gradient="linear-gradient(180deg, #c6ffdd 0%, #7be2a8 35%, #44d492 65%, #0cebeb 100%)">
        <TextAnimation
          style={{
            fontSize: 72,
            fontWeight: 600,
          }}
          createTimeline={({ textRef, tl }) => {
            tl.from(textRef.current, {
              opacity: 0,
              x: -50,
              filter: "blur(10px)",
              duration: 0.7,
              ease: "power3.out",
            });
            return tl;
          }}
        >
          Fresh Mint Vibes
        </TextAnimation>
      </VerticalGradientText>
    </AbsoluteFill>
  ),
};

export const GoldGradient: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0908">
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
      }}
    >
      <VerticalGradientText
        gradient="linear-gradient(180deg, #f5e6a3 0%, #e4c868 30%, #d4a942 60%, #c9a227 100%)"
        style={{
          filter: "drop-shadow(0 2px 4px rgba(201, 162, 39, 0.3))",
        }}
      >
        <TextAnimation
          style={{
            fontSize: 100,
            fontWeight: 800,
          }}
          createTimeline={({ textRef, tl }) => {
            tl.from(textRef.current, {
              opacity: 0,
              y: 50,
              duration: 0.8,
              ease: "power4.out",
            });
            return tl;
          }}
        >
          LUXE
        </TextAnimation>
      </VerticalGradientText>
      <TextAnimation
        style={{
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.5em",
          color: "#8a7735",
          marginTop: 12,
        }}
        createTimeline={({ textRef, tl }) => {
          tl.from(
            textRef.current,
            {
              opacity: 0,
              y: 10,
              duration: 0.5,
              ease: "power2.out",
            },
            0.6,
          );
          return tl;
        }}
      >
        PREMIUM COLLECTION
      </TextAnimation>
    </AbsoluteFill>
  ),
};

// ============================================
// WORD HIGHLIGHTS
// ============================================

export const HighlightedWord: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0a0a">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 56,
          fontWeight: 600,
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.4,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
          });
          // Find and style the highlighted word
          const highlightWord = (split.words as HTMLElement[]).find(
            (w) => w.textContent === "beautiful",
          ) as HTMLElement | undefined;
          if (highlightWord) {
            highlightWord.style.background =
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
            highlightWord.style.padding = "4px 16px";
            highlightWord.style.borderRadius = "8px";
            highlightWord.style.marginLeft = "8px";
          }
          tl.from(split.words, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          });
          return tl;
        }}
      >
        Make something beautiful today
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const GradientHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#000">
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
        padding: 80,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 48,
          fontWeight: 500,
          color: "#888",
          textAlign: "center",
          lineHeight: 1.5,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["innovation", "creativity"];
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.background =
                "linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)";
              (word as HTMLElement).style.webkitBackgroundClip = "text";
              (word as HTMLElement).style.webkitTextFillColor = "transparent";
              word.style.fontWeight = "700";
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          });
          return tl;
        }}
      >
        Where innovation meets creativity and ideas come to life
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const UnderlineHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0f0f0f">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 52,
          fontWeight: 500,
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.6,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["design", "motion"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.position = "relative";
              word.style.color = "#fff";
              // Create underline element
              const underline = document.createElement("span");
              underline.style.position = "absolute";
              underline.style.bottom = "0";
              underline.style.left = "0";
              underline.style.width = "100%";
              underline.style.height = "3px";
              underline.style.background =
                "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)";
              underline.style.borderRadius = "2px";
              underline.style.transformOrigin = "left";
              underline.style.transform = "scaleX(0)";
              underline.className = "highlight-underline";
              word.appendChild(underline);
            }
          });
          // Animate words in
          tl.from(split.words, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          });
          // Animate underlines
          tl.to(
            ".highlight-underline",
            {
              scaleX: 1,
              duration: 0.4,
              stagger: 0.15,
              ease: "power2.out",
            },
            0.6,
          );
          return tl;
        }}
      >
        Premium design meets elegant motion
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const BoxHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a12">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 44,
          fontWeight: 500,
          color: "#aaa",
          textAlign: "center",
          lineHeight: 1.8,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["faster", "smarter", "better"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.color = "#fff";
              word.style.background = "#4f46e5";
              word.style.padding = "2px 10px";
              word.style.borderRadius = "6px";
              word.className = "highlight-box";
            }
          });
          // Animate all words
          tl.from(split.words, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
          });
          // Scale pop the highlight boxes (no padding change to avoid layout shift)
          tl.from(
            ".highlight-box",
            {
              scale: 0.9,
              duration: 0.3,
              stagger: 0.1,
              ease: "back.out(1.7)",
            },
            0.3,
          );
          return tl;
        }}
      >
        Work faster think smarter build better
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const GlowHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#050510">
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
      <TextAnimation
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#666",
          textAlign: "center",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWord = "magic";
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
            if (word.textContent?.toLowerCase() === highlightWord) {
              word.style.color = "#00ff88";
              word.style.textShadow =
                "0 0 20px #00ff88, 0 0 40px #00ff8866, 0 0 60px #00ff8833";
              word.className = "glow-word";
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 50,
            duration: 0.7,
            stagger: 0.12,
            ease: "power4.out",
          });
          // Pulse the glow
          tl.to(
            ".glow-word",
            {
              textShadow:
                "0 0 30px #00ff88, 0 0 60px #00ff88aa, 0 0 90px #00ff8866",
              duration: 0.5,
              yoyo: true,
              repeat: 2,
              ease: "power1.inOut",
            },
            0.8,
          );
          return tl;
        }}
      >
        Create some magic
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const MultiColorHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a0a">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 52,
          fontWeight: 600,
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.5,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const colorMap: Record<string, string> = {
            dream: "#f093fb",
            design: "#667eea",
            deliver: "#4ade80",
          };
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
            const text = word.textContent?.toLowerCase() || "";
            if (colorMap[text]) {
              word.style.color = colorMap[text];
              word.style.fontWeight = "800";
            }
          });
          tl.from(split.words, {
            opacity: 0,
            rotationX: -90,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: "power4.out",
          });
          return tl;
        }}
      >
        Dream it Design it Deliver it
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const MarkerHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#fafafa">
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
        padding: 80,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 42,
          fontWeight: 500,
          color: "#1a1a1a",
          textAlign: "center",
          lineHeight: 1.8,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["important", "remember"];
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.position = "relative";
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              // Create marker highlight behind text
              const marker = document.createElement("span");
              marker.style.position = "absolute";
              marker.style.bottom = "0";
              marker.style.left = "-4px";
              marker.style.right = "-4px";
              marker.style.height = "40%";
              marker.style.background = "#fef08a";
              marker.style.zIndex = "-1";
              marker.style.transformOrigin = "left";
              marker.style.transform = "scaleX(0)";
              marker.className = "marker-highlight";
              word.insertBefore(marker, word.firstChild);
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          });
          // Animate marker highlights
          tl.to(
            ".marker-highlight",
            {
              scaleX: 1,
              duration: 0.3,
              stagger: 0.2,
              ease: "power2.out",
            },
            0.5,
          );
          return tl;
        }}
      >
        This is important and you should remember it
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const ScaleHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0f0f0f">
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
      <TextAnimation
        style={{
          fontSize: 48,
          fontWeight: 500,
          color: "#888",
          textAlign: "center",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWord = "BIG";
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
            if (word.textContent === highlightWord) {
              word.style.color = "#fff";
              word.style.fontWeight = "900";
              word.className = "scale-word";
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          });
          // Scale up the highlight word
          tl.to(
            ".scale-word",
            {
              scale: 1.5,
              duration: 0.4,
              ease: "back.out(2)",
            },
            0.6,
          );
          return tl;
        }}
      >
        Think BIG always
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const CircleHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#fff">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 44,
          fontWeight: 500,
          color: "#333",
          textAlign: "center",
          lineHeight: 1.7,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWord = "key";
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
            word.style.position = "relative";
            if (word.textContent?.toLowerCase() === highlightWord) {
              word.style.color = "#e11d48";
              word.style.fontWeight = "700";
              // Create hand-drawn circle SVG
              const svgContainer = document.createElement("span");
              svgContainer.style.position = "absolute";
              svgContainer.style.top = "50%";
              svgContainer.style.left = "50%";
              svgContainer.style.transform = "translate(-50%, -50%)";
              svgContainer.style.width = "calc(100% + 30px)";
              svgContainer.style.height = "calc(100% + 20px)";
              svgContainer.style.pointerEvents = "none";
              // Hand-drawn wobbly circle path
              svgContainer.innerHTML = `
                <svg viewBox="0 0 100 70" style="width:100%;height:100%;overflow:visible;">
                  <path 
                    d="M50,5 C75,3 95,15 97,35 C99,55 80,65 50,67 C20,69 3,55 2,35 C1,15 20,5 50,5 C55,4 60,5 65,7" 
                    fill="none" 
                    stroke="#e11d48" 
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="hand-drawn-circle"
                    style="stroke-dasharray: 300; stroke-dashoffset: 300;"
                  />
                </svg>
              `;
              word.appendChild(svgContainer);
            }
          });
          tl.from(split.words, {
            opacity: 0,
            x: -30,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          });
          // Animate hand-drawn circle - draw it like sketching
          tl.to(
            ".hand-drawn-circle",
            {
              strokeDashoffset: 0,
              duration: 0.6,
              ease: "power2.inOut",
            },
            0.6,
          );
          return tl;
        }}
      >
        Find the key to success
      </TextAnimation>
    </AbsoluteFill>
  ),
};

// ============================================
// CREATIVE HIGHLIGHT STYLES
// ============================================

export const NeonGlowHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a0f">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 48,
          fontWeight: 600,
          color: "#666",
          textAlign: "center",
          lineHeight: 1.6,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["neon", "glow"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.color = "#0ff";
              word.style.textShadow =
                "0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff";
              word.className = "neon-word";
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          });
          tl.from(
            ".neon-word",
            {
              textShadow: "0 0 0px #0ff",
              duration: 0.4,
              stagger: 0.15,
              ease: "power2.out",
            },
            0.5,
          );
          return tl;
        }}
      >
        Add some neon glow to your text
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const SplitColorHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#fafafa">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: "#1a1a1a",
          textAlign: "center",
          lineHeight: 1.5,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const colors = ["#6366f1", "#ec4899", "#10b981", "#f59e0b"];
          (split.words as HTMLElement[]).forEach((word, i) => {
            if (i % 2 === 1) {
              word.style.color = colors[Math.floor(i / 2) % colors.length];
            }
          });
          tl.from(split.words, {
            opacity: 0,
            x: -30,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          });
          return tl;
        }}
      >
        Every other word gets colorful
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const BrushStrokeHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#fff">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 48,
          fontWeight: 600,
          color: "#1a1a1a",
          textAlign: "center",
          lineHeight: 1.8,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["creative", "brush"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.position = "relative";
              word.style.zIndex = "1";
              // Create brush stroke SVG
              const brush = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg",
              );
              brush.setAttribute("viewBox", "0 0 120 40");
              brush.style.cssText =
                "position: absolute; top: 50%; left: -8%; width: 116%; height: 120%; transform: translateY(-50%); z-index: -1; opacity: 0;";
              brush.setAttribute("class", "brush-stroke");
              brush.innerHTML = `<path d="M5 20 Q30 8, 60 22 T115 18" stroke="#fef08a" stroke-width="18" fill="none" stroke-linecap="round"/>`;
              word.appendChild(brush);
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          });
          tl.to(
            ".brush-stroke",
            {
              opacity: 1,
              duration: 0.3,
              stagger: 0.2,
              ease: "power2.out",
            },
            0.5,
          );
          return tl;
        }}
      >
        A creative brush stroke effect
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const DoubleUnderlineHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0f0f1a">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 46,
          fontWeight: 500,
          color: "#e2e8f0",
          textAlign: "center",
          lineHeight: 1.7,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["double", "emphasis"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.position = "relative";
              word.style.color = "#fff";
              // First underline
              const line1 = document.createElement("span");
              line1.style.cssText =
                "position: absolute; bottom: 2px; left: 0; width: 100%; height: 2px; background: #6366f1; transform-origin: left; transform: scaleX(0);";
              line1.className = "underline-1";
              // Second underline
              const line2 = document.createElement("span");
              line2.style.cssText =
                "position: absolute; bottom: -2px; left: 0; width: 100%; height: 2px; background: #ec4899; transform-origin: left; transform: scaleX(0);";
              line2.className = "underline-2";
              word.appendChild(line1);
              word.appendChild(line2);
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 25,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          });
          tl.to(
            ".underline-1",
            { scaleX: 1, duration: 0.3, stagger: 0.15, ease: "power2.out" },
            0.5,
          );
          tl.to(
            ".underline-2",
            { scaleX: 1, duration: 0.3, stagger: 0.15, ease: "power2.out" },
            0.6,
          );
          return tl;
        }}
      >
        Add double emphasis to words
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const GradientBoxHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#1a1a2e">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 44,
          fontWeight: 600,
          color: "#94a3b8",
          textAlign: "center",
          lineHeight: 1.7,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["gradient", "beautiful"];
          const gradients = [
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          ];
          let gradientIndex = 0;
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.color = "#fff";
              word.style.background =
                gradients[gradientIndex % gradients.length];
              word.style.padding = "4px 12px";
              word.style.borderRadius = "8px";
              word.className = "gradient-box";
              gradientIndex++;
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.07,
            ease: "power3.out",
          });
          tl.from(
            ".gradient-box",
            {
              scale: 0.8,
              duration: 0.4,
              stagger: 0.12,
              ease: "back.out(1.7)",
            },
            0.4,
          );
          return tl;
        }}
      >
        Make it gradient and beautiful
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const StrikethroughReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#fafafa">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 48,
          fontWeight: 500,
          color: "#1a1a1a",
          textAlign: "center",
          lineHeight: 1.7,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const strikeWords = ["old", "boring"];
          const newWords = ["new", "exciting"];
          (split.words as HTMLElement[]).forEach((word) => {
            const text = word.textContent?.toLowerCase() || "";
            if (strikeWords.includes(text)) {
              word.style.position = "relative";
              word.style.color = "#999";
              const strike = document.createElement("span");
              strike.style.cssText =
                "position: absolute; top: 50%; left: -4px; right: -4px; height: 3px; background: #ef4444; transform-origin: left; transform: scaleX(0);";
              strike.className = "strike-line";
              word.appendChild(strike);
            }
            if (newWords.includes(text)) {
              word.style.color = "#10b981";
              word.style.fontWeight = "700";
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          });
          tl.to(
            ".strike-line",
            { scaleX: 1, duration: 0.3, stagger: 0.15, ease: "power2.out" },
            0.6,
          );
          return tl;
        }}
      >
        Replace old boring with new exciting
      </TextAnimation>
    </AbsoluteFill>
  ),
};

// ============================================
// ADVANCED PROFESSIONAL HIGHLIGHT ANIMATIONS
// ============================================

export const GlitchHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a0a">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: "#fff",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words,chars" });
          const highlightWords = ["glitch", "system"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.position = "relative";
              word.className = "glitch-word";
              // Create RGB shift layers
              const red = document.createElement("span");
              red.textContent = word.textContent;
              red.style.cssText =
                "position: absolute; top: 0; left: 0; color: #ff0040; clip-path: inset(0 0 70% 0); transform: translateX(-3px); opacity: 0;";
              red.className = "glitch-red";
              const cyan = document.createElement("span");
              cyan.textContent = word.textContent;
              cyan.style.cssText =
                "position: absolute; top: 0; left: 0; color: #00ffff; clip-path: inset(70% 0 0 0); transform: translateX(3px); opacity: 0;";
              cyan.className = "glitch-cyan";
              word.appendChild(red);
              word.appendChild(cyan);
            }
          });
          tl.from(split.chars, {
            opacity: 0,
            y: 100,
            rotationX: -90,
            duration: 0.6,
            stagger: 0.02,
            ease: "power4.out",
          });
          // Glitch animation
          tl.to(
            ".glitch-red, .glitch-cyan",
            { opacity: 1, duration: 0.05 },
            0.8,
          );
          tl.to(
            ".glitch-red",
            { x: -4, duration: 0.05, yoyo: true, repeat: 5 },
            0.8,
          );
          tl.to(
            ".glitch-cyan",
            { x: 4, duration: 0.05, yoyo: true, repeat: 5 },
            0.8,
          );
          tl.to(
            ".glitch-word",
            { x: 2, duration: 0.03, yoyo: true, repeat: 8 },
            0.8,
          );
          tl.to(
            ".glitch-red, .glitch-cyan",
            { opacity: 0, duration: 0.1 },
            1.2,
          );
          return tl;
        }}
      >
        Enter the glitch system
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const ScanLineReveal: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0f0f0f">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: "#fff",
          textAlign: "center",
          position: "relative",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["scanning", "complete"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.position = "relative";
              word.style.overflow = "hidden";
              // Scan line
              const scanLine = document.createElement("span");
              scanLine.style.cssText =
                "position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, transparent, #00ff88, #00ff88, transparent); transform: translateY(-100%); box-shadow: 0 0 20px #00ff88;";
              scanLine.className = "scan-line";
              // Glow overlay
              const glow = document.createElement("span");
              glow.style.cssText =
                "position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,255,136,0.3) 0%, transparent 50%); opacity: 0;";
              glow.className = "scan-glow";
              word.appendChild(scanLine);
              word.appendChild(glow);
              word.style.color = "#666";
              word.className = "scan-word";
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          });
          tl.to(
            ".scan-line",
            { y: "2500%", duration: 0.6, stagger: 0.3, ease: "power2.inOut" },
            0.6,
          );
          tl.to(".scan-glow", { opacity: 1, duration: 0.2, stagger: 0.3 }, 0.8);
          tl.to(
            ".scan-word",
            { color: "#00ff88", duration: 0.2, stagger: 0.3 },
            0.9,
          );
          tl.to(".scan-glow", { opacity: 0, duration: 0.3 }, 1.4);
          return tl;
        }}
      >
        Scanning process complete
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const LiquidFillHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#1a1a2e">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 54,
          fontWeight: 700,
          color: "#4a5568",
          textAlign: "center",
          lineHeight: 1.5,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["liquid", "flow"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.position = "relative";
              word.style.display = "inline-block";
              word.style.overflow = "hidden";
              // Liquid fill layer
              const fill = document.createElement("span");
              fill.textContent = word.textContent;
              fill.style.cssText =
                "position: absolute; top: 0; left: 0; color: #06b6d4; clip-path: inset(100% 0 0 0);";
              fill.className = "liquid-fill";
              // Wave effect at top
              const wave = document.createElement("span");
              wave.style.cssText =
                "position: absolute; bottom: 100%; left: -10%; width: 120%; height: 8px; background: #06b6d4; border-radius: 50%; filter: blur(2px); opacity: 0;";
              wave.className = "liquid-wave";
              word.appendChild(fill);
              word.appendChild(wave);
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 40,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          });
          tl.to(".liquid-wave", { opacity: 1, duration: 0.1 }, 0.6);
          tl.to(
            ".liquid-fill",
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 0.8,
              stagger: 0.2,
              ease: "power2.out",
            },
            0.6,
          );
          tl.to(
            ".liquid-wave",
            { bottom: "-10%", duration: 0.8, stagger: 0.2, ease: "power2.out" },
            0.6,
          );
          tl.to(".liquid-wave", { opacity: 0, duration: 0.2 }, 1.2);
          return tl;
        }}
      >
        Watch the liquid flow effect
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const ChromeHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a0a">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 58,
          fontWeight: 800,
          color: "#666",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["chrome", "metallic"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.background =
                "linear-gradient(180deg, #f5f5f5 0%, #a8a8a8 25%, #f5f5f5 50%, #8a8a8a 75%, #d4d4d4 100%)";
              word.style.backgroundClip = "text";
              word.style.webkitBackgroundClip = "text";
              word.style.webkitTextFillColor = "transparent";
              word.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.5))";
              word.className = "chrome-word";
              // Add shine overlay
              const shine = document.createElement("span");
              shine.style.cssText =
                "position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); transform: skewX(-20deg);";
              shine.className = "chrome-shine";
              word.style.position = "relative";
              word.style.overflow = "hidden";
              word.appendChild(shine);
            }
          });
          tl.from(split.words, {
            opacity: 0,
            scale: 1.5,
            filter: "blur(10px)",
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          });
          tl.to(
            ".chrome-shine",
            { left: "150%", duration: 0.6, stagger: 0.2, ease: "power2.inOut" },
            0.8,
          );
          return tl;
        }}
      >
        Pure chrome metallic finish
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const MorphHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#fafafa">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 50,
          fontWeight: 600,
          color: "#1a1a1a",
          textAlign: "center",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words,chars" });
          const highlightWords = ["transform", "evolve"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.className = "morph-word";
              // Get chars within this word
              const wordChars = (Array.from(word.querySelectorAll("div")) as HTMLElement[]).filter(
                (el) => el.textContent && el.textContent.length === 1,
              );
              wordChars.forEach((char) => {
                char.style.display = "inline-block";
                char.className = "morph-char";
              });
            }
          });
          tl.from(split.chars, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            stagger: 0.03,
            ease: "power3.out",
          });
          tl.to(
            ".morph-char",
            {
              scale: 1.3,
              color: "#6366f1",
              fontWeight: 800,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.out",
            },
            0.7,
          );
          tl.to(
            ".morph-char",
            {
              scale: 1,
              duration: 0.3,
              stagger: 0.05,
              ease: "elastic.out(1, 0.5)",
            },
            1,
          );
          return tl;
        }}
      >
        Watch ideas transform and evolve
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const PerspectiveFlipHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#1e1e2f">
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
        padding: 60,
        perspective: "1000px",
      }}
    >
      <TextAnimation
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: "#a0aec0",
          textAlign: "center",
          transformStyle: "preserve-3d",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["flip", "dimension"];
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
            word.style.transformStyle = "preserve-3d";
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.className = "flip-word";
              word.style.color = "#fff";
              // Create back face
              const backFace = document.createElement("span");
              backFace.textContent = word.textContent;
              backFace.style.cssText =
                "position: absolute; top: 0; left: 0; color: #f472b6; transform: rotateY(180deg); backface-visibility: hidden;";
              word.style.position = "relative";
              word.style.backfaceVisibility = "hidden";
              word.appendChild(backFace);
            }
          });
          tl.from(split.words, {
            opacity: 0,
            rotationX: -90,
            y: 50,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          });
          tl.to(
            ".flip-word",
            {
              rotationY: 180,
              duration: 0.5,
              stagger: 0.15,
              ease: "power2.inOut",
            },
            0.8,
          );
          tl.to(
            ".flip-word",
            {
              rotationY: 360,
              duration: 0.5,
              stagger: 0.15,
              ease: "power2.inOut",
            },
            1.5,
          );
          return tl;
        }}
      >
        Flip into a new dimension
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const ShatterHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0a0a">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 54,
          fontWeight: 800,
          color: "#fff",
          textAlign: "center",
          textTransform: "uppercase",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words,chars" });
          const highlightWords = ["break", "rules"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.position = "relative";
              word.className = "shatter-word";
              const chars = Array.from(word.querySelectorAll("div"));
              chars.forEach((char, i) => {
                (char as HTMLElement).style.display = "inline-block";
                (char as HTMLElement).className =
                  `shatter-char shatter-char-${i % 2}`;
              });
            }
          });
          tl.from(split.chars, {
            opacity: 0,
            scale: 2,
            duration: 0.5,
            stagger: 0.02,
            ease: "power4.out",
          });
          // Shatter effect
          tl.to(
            ".shatter-char-0",
            {
              y: -20,
              x: () => Math.random() * 10 - 5,
              rotation: () => Math.random() * 20 - 10,
              duration: 0.3,
              ease: "power2.out",
            },
            0.8,
          );
          tl.to(
            ".shatter-char-1",
            {
              y: 20,
              x: () => Math.random() * 10 - 5,
              rotation: () => Math.random() * 20 - 10,
              duration: 0.3,
              ease: "power2.out",
            },
            0.8,
          );
          // Reform
          tl.to(
            ".shatter-char-0, .shatter-char-1",
            {
              y: 0,
              x: 0,
              rotation: 0,
              color: "#ef4444",
              duration: 0.4,
              ease: "elastic.out(1, 0.5)",
            },
            1.2,
          );
          return tl;
        }}
      >
        Break all the rules
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const ElectricHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0a0614">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: "#4a5568",
          textAlign: "center",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["electric", "power"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.position = "relative";
              word.style.color = "#fff";
              word.className = "electric-word";
              // Electric glow
              const glow = document.createElement("span");
              glow.textContent = word.textContent;
              glow.style.cssText =
                "position: absolute; top: 0; left: 0; color: #a855f7; filter: blur(8px); opacity: 0;";
              glow.className = "electric-glow";
              // Spark lines
              for (let i = 0; i < 4; i++) {
                const spark = document.createElement("span");
                const angle = i * 90;
                spark.style.cssText = `position: absolute; top: 50%; left: 50%; width: 30px; height: 2px; background: linear-gradient(90deg, #a855f7, transparent); transform: translate(-50%, -50%) rotate(${angle}deg); transform-origin: center; opacity: 0;`;
                spark.className = "electric-spark";
                word.appendChild(spark);
              }
              word.insertBefore(glow, word.firstChild);
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          });
          // Electric pulse
          tl.to(".electric-glow", { opacity: 0.8, duration: 0.1 }, 0.7);
          tl.to(".electric-glow", { opacity: 0, duration: 0.1 }, 0.8);
          tl.to(".electric-glow", { opacity: 1, duration: 0.1 }, 0.9);
          tl.to(
            ".electric-spark",
            { opacity: 1, scale: 2, duration: 0.2 },
            0.9,
          );
          tl.to(".electric-spark", { opacity: 0, duration: 0.3 }, 1.1);
          tl.to(
            ".electric-word",
            {
              textShadow:
                "0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 40px #a855f7",
              duration: 0.3,
            },
            0.9,
          );
          return tl;
        }}
      >
        Feel the electric power surge
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const HolographicHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={200} backgroundColor="#0a0a0f">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 50,
          fontWeight: 700,
          color: "#666",
          textAlign: "center",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["holographic", "future"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.position = "relative";
              word.style.background =
                "linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #ff0080)";
              word.style.backgroundSize = "300% 100%";
              word.style.backgroundClip = "text";
              word.style.webkitBackgroundClip = "text";
              word.style.webkitTextFillColor = "transparent";
              word.className = "holo-word";
              // Reflection
              const reflection = document.createElement("span");
              reflection.textContent = word.textContent;
              reflection.style.cssText =
                "position: absolute; top: 100%; left: 0; transform: scaleY(-1); opacity: 0.3; filter: blur(2px); background: inherit; background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; mask-image: linear-gradient(transparent 30%, black);";
              word.appendChild(reflection);
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 40,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          });
          tl.to(
            ".holo-word",
            {
              backgroundPosition: "-300% 0",
              duration: 2,
              ease: "none",
              stagger: 0.2,
            },
            0.6,
          );
          return tl;
        }}
      >
        Welcome to holographic future
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const CinematicWipeHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#111">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 48,
          fontWeight: 600,
          color: "#444",
          textAlign: "center",
          lineHeight: 1.6,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["cinematic", "reveal"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.position = "relative";
              word.style.display = "inline-block";
              // Gold fill layer
              const fill = document.createElement("span");
              fill.textContent = word.textContent;
              fill.style.cssText =
                "position: absolute; top: 0; left: 0; right: 0; bottom: 0; color: #fbbf24; clip-path: inset(0 100% 0 0);";
              fill.className = "wipe-fill";
              // Wipe line that travels across
              const wipeLine = document.createElement("span");
              wipeLine.style.cssText =
                "position: absolute; top: -10%; left: 0; width: 3px; height: 120%; background: linear-gradient(180deg, transparent 0%, #fbbf24 20%, #fbbf24 80%, transparent 100%); box-shadow: 0 0 15px #fbbf24, 0 0 30px #fbbf24; opacity: 0;";
              wipeLine.className = "wipe-line";
              word.appendChild(fill);
              word.appendChild(wipeLine);
            }
          });
          tl.from(split.words, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          });
          // Wipe animation - line travels from left to right
          tl.to(".wipe-line", { opacity: 1, duration: 0.1 }, 0.7);
          tl.to(
            ".wipe-line",
            {
              left: "100%",
              duration: 0.6,
              stagger: 0.25,
              ease: "power2.inOut",
            },
            0.7,
          );
          tl.to(
            ".wipe-fill",
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.6,
              stagger: 0.25,
              ease: "power2.inOut",
            },
            0.7,
          );
          tl.to(".wipe-line", { opacity: 0, duration: 0.15 }, 1.4);
          return tl;
        }}
      >
        A truly cinematic reveal effect
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const ParticleTrailHighlight: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0f172a">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 50,
          fontWeight: 700,
          color: "#64748b",
          textAlign: "center",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          const highlightWords = ["magic", "sparkle"];
          (split.words as HTMLElement[]).forEach((word) => {
            if (
              highlightWords.includes(word.textContent?.toLowerCase() || "")
            ) {
              word.style.position = "relative";
              word.style.color = "#f8fafc";
              word.className = "particle-word";
              // Create particles
              for (let i = 0; i < 12; i++) {
                const particle = document.createElement("span");
                const size = Math.random() * 4 + 2;
                particle.style.cssText = `position: absolute; width: ${size}px; height: ${size}px; background: ${["#fbbf24", "#f472b6", "#60a5fa", "#34d399"][i % 4]}; border-radius: 50%; top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; opacity: 0; pointer-events: none;`;
                particle.className = "magic-particle";
                word.appendChild(particle);
              }
            }
          });
          tl.from(split.words, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          });
          tl.to(
            ".magic-particle",
            {
              opacity: 1,
              scale: 1.5,
              y: () => (Math.random() - 0.5) * 60,
              x: () => (Math.random() - 0.5) * 40,
              duration: 0.4,
              stagger: 0.03,
              ease: "power2.out",
            },
            0.6,
          );
          tl.to(
            ".magic-particle",
            {
              opacity: 0,
              scale: 0,
              duration: 0.3,
              stagger: 0.02,
              ease: "power2.in",
            },
            1,
          );
          tl.to(
            ".particle-word",
            {
              textShadow: "0 0 20px rgba(251, 191, 36, 0.5)",
              duration: 0.3,
            },
            0.8,
          );
          return tl;
        }}
      >
        Add some magic sparkle dust
      </TextAnimation>
    </AbsoluteFill>
  ),
};

// ============================================
// EMOJI ANIMATIONS
// ============================================

export const EmojiPop: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0a0a">
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
      <TextAnimation
        style={{
          fontSize: 64,
          fontWeight: 600,
          color: "#fff",
          textAlign: "center",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          (split.chars as HTMLElement[]).forEach((char) => {
            char.style.display = "inline-block";
          });
          tl.from(split.chars, {
            opacity: 0,
            scale: 0,
            rotation: -180,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.7)",
          });
          return tl;
        }}
      >
        Hello World! 🚀✨🎉
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const EmojiWave: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#1a1a2e">
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
      <TextAnimation
        style={{
          fontSize: 72,
          textAlign: "center",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          (split.chars as HTMLElement[]).forEach((char) => {
            char.style.display = "inline-block";
          });
          tl.from(split.chars, {
            opacity: 0,
            y: 50,
            rotation: 20,
            duration: 0.5,
            stagger: {
              each: 0.1,
              from: "start",
            },
            ease: "back.out(2)",
          });
          // Add wave animation
          tl.to(
            split.chars,
            {
              y: -15,
              duration: 0.3,
              stagger: {
                each: 0.05,
                from: "start",
                repeat: 1,
                yoyo: true,
              },
              ease: "power1.inOut",
            },
            1,
          );
          return tl;
        }}
      >
        👋😊💫🌟⭐️💖
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const EmojiReaction: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#000">
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
        gap: 20,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 48,
          fontWeight: 600,
          color: "#fff",
        }}
        createTimeline={({ textRef, tl }) => {
          tl.from(textRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power3.out",
          });
          return tl;
        }}
      >
        That's amazing!
      </TextAnimation>
      <TextAnimation
        style={{
          fontSize: 80,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          (split.chars as HTMLElement[]).forEach((char) => {
            char.style.display = "inline-block";
          });
          tl.from(
            split.chars,
            {
              opacity: 0,
              scale: 3,
              rotation: 360,
              duration: 0.5,
              stagger: 0.15,
              ease: "back.out(1.5)",
            },
            0.4,
          );
          return tl;
        }}
      >
        🔥❤️👏
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const EmojiWithText: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0f0f0f">
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
        padding: 60,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 52,
          fontWeight: 500,
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.5,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "words" });
          (split.words as HTMLElement[]).forEach((word) => {
            word.style.display = "inline-block";
          });
          tl.from(split.words, {
            opacity: 0,
            y: 40,
            scale: 0.8,
            duration: 0.6,
            stagger: 0.12,
            ease: "back.out(1.5)",
          });
          return tl;
        }}
      >
        Build 🔨 Ship 🚀 Celebrate 🎉
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const EmojiBounce: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#fef3c7">
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
        gap: 16,
      }}
    >
      <TextAnimation
        style={{
          fontSize: 100,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          (split.chars as HTMLElement[]).forEach((char) => {
            char.style.display = "inline-block";
            char.style.transformOrigin = "bottom center";
          });
          tl.from(split.chars, {
            opacity: 0,
            y: -100,
            duration: 0.8,
            stagger: 0.2,
            ease: "bounce.out",
          });
          return tl;
        }}
      >
        🎈🎊🎁
      </TextAnimation>
      <TextAnimation
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: "#92400e",
        }}
        createTimeline={({ textRef, tl }) => {
          tl.from(
            textRef.current,
            {
              opacity: 0,
              scale: 0.5,
              duration: 0.5,
              ease: "back.out(2)",
            },
            0.8,
          );
          return tl;
        }}
      >
        Happy Birthday!
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const EmojiGradientText: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0a0a">
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
      <TextAnimation
        style={{
          fontSize: 64,
          fontWeight: 700,
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          const colors = [
            "#667eea",
            "#7367d4",
            "#8060be",
            "#9952a2",
            "#b34496",
            "#cd368a",
            "#f093fb",
          ];
          (split.chars as HTMLElement[]).forEach((char, i) => {
            char.style.display = "inline-block";
            // Emojis stay as-is, text gets gradient colors
            if (!/\p{Emoji}/u.test(char.textContent || "")) {
              const colorIndex = Math.floor(
                (i / split.chars.length) * colors.length,
              );
              char.style.color =
                colors[Math.min(colorIndex, colors.length - 1)];
            }
          });
          tl.from(split.chars, {
            opacity: 0,
            y: 30,
            rotationX: -90,
            duration: 0.7,
            stagger: 0.05,
            ease: "power4.out",
          });
          return tl;
        }}
      >
        We Love Design 💜
      </TextAnimation>
    </AbsoluteFill>
  ),
};

export const EmojiList: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={240} backgroundColor="#1e1e1e">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 80,
        gap: 20,
      }}
    >
      {[
        { emoji: "✅", text: "Fast performance" },
        { emoji: "🎨", text: "Beautiful design" },
        { emoji: "🔒", text: "Secure by default" },
        { emoji: "🚀", text: "Easy deployment" },
      ].map((item, index) => (
        <TextAnimation
          key={item.text}
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
          createTimeline={({ textRef, tl }) => {
            tl.from(
              textRef.current,
              {
                opacity: 0,
                x: -50,
                duration: 0.5,
                ease: "power3.out",
              },
              index * 0.2,
            );
            return tl;
          }}
        >
          {item.emoji} {item.text}
        </TextAnimation>
      ))}
    </AbsoluteFill>
  ),
};

export const EmojiSparkle: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#0f172a">
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
      <TextAnimation
        style={{
          fontSize: 56,
          fontWeight: 600,
          color: "#fff",
          textAlign: "center",
        }}
        createTimeline={({ textRef, tl, SplitText }) => {
          const split = new SplitText(textRef.current, { type: "chars" });
          (split.chars as HTMLElement[]).forEach((char, i) => {
            char.style.display = "inline-block";
            // Add sparkle to emojis
            if (/\p{Emoji}/u.test(char.textContent || "")) {
              char.style.filter = "drop-shadow(0 0 10px gold)";
              char.className = `emoji-${i}`;
            }
          });
          tl.from(split.chars, {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: "back.out(1.7)",
          });
          // Pulse emojis
          tl.to(
            "[class^='emoji-']",
            {
              scale: 1.2,
              filter: "drop-shadow(0 0 20px gold)",
              duration: 0.3,
              yoyo: true,
              repeat: 2,
              ease: "power1.inOut",
            },
            1,
          );
          return tl;
        }}
      >
        ✨ Magic happens here ✨
      </TextAnimation>
    </AbsoluteFill>
  ),
};
