import { useGsapTimeline } from "../../hooks/useGsapTimeline";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import {
  useRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

gsap.registerPlugin(SplitText);

/**
 * Timeline creation context passed to createTimeline function.
 */
export interface TimelineContext {
  /** Reference to the text container element */
  textRef: RefObject<HTMLDivElement | null>;
  /** GSAP timeline to add animations to */
  tl: gsap.core.Timeline;
  /** SplitText utility for splitting text into chars/words/lines */
  SplitText: typeof SplitText;
}

/**
 * Props for TextAnimation component.
 */
export interface TextAnimationProps {
  /** Content to animate - can be text or any React elements */
  children: ReactNode;
  /** Function to create the GSAP timeline animation */
  createTimeline: (ctx: TimelineContext) => gsap.core.Timeline;
  /** Additional CSS class names */
  className?: string;
  /** Additional CSS styles */
  style?: CSSProperties;
  /** Enable 3D perspective */
  perspective?: number;
  /** Starting frame for the animation (default: 0) */
  startFrom?: number;
}

/**
 * GSAP-powered text animation component.
 * Provides access to SplitText for character, word, and line-based animations.
 * Children should not contain react components, only text and html elements.
 *
 * @example
 * // Fade in characters one by one
 * <TextAnimation
 *   createTimeline={({ textRef, tl, SplitText }) => {
 *     const split = new SplitText(textRef.current, { type: "chars" });
 *     tl.from(split.chars, { opacity: 0, y: 20, stagger: 0.03, ease: "power2.out" });
 *     return tl;
 *   }}
 * >
 *   Hello World
 * </TextAnimation>
 */
export const TextAnimation: React.FC<TextAnimationProps> = ({
  children,
  createTimeline,
  className,
  style,
  perspective = 1000,
  startFrom = 0,
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  const animationContainerRef = useGsapTimeline<HTMLDivElement>(
    () => {
      const tl = gsap.timeline();
      return createTimeline({
        textRef,
        tl,
        SplitText,
      });
    },
    [],
    { startFrom },
  );

  return (
    <div
      ref={animationContainerRef}
      className={className}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      <div ref={textRef} style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
};

// ============================================
// Pre-built animation presets
// ============================================

/**
 * Props for preset text animations.
 */
export interface TextAnimationPresetProps {
  children: ReactNode;
  /** Stagger delay between elements in seconds */
  stagger?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** GSAP easing */
  ease?: string;
  /** Additional CSS class names */
  className?: string;
  /** Additional CSS styles */
  style?: CSSProperties;
  /** Starting frame for the animation (default: 0) */
  startFrom?: number;
}

/**
 * Fade in text character by character from below.
 */
export const FadeInChars: React.FC<TextAnimationPresetProps> = ({
  children,
  stagger = 0.03,
  duration = 0.5,
  ease = "power2.out",
  className,
  style,
  startFrom,
}) => (
  <TextAnimation
    className={className}
    style={style}
    startFrom={startFrom}
    createTimeline={({ textRef, tl, SplitText }) => {
      const split = new SplitText(textRef.current, { type: "chars" });
      tl.from(split.chars, { opacity: 0, y: 20, duration, stagger, ease });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

/**
 * Fade in text word by word.
 */
export const FadeInWords: React.FC<TextAnimationPresetProps> = ({
  children,
  stagger = 0.1,
  duration = 0.5,
  ease = "power2.out",
  className,
  style,
  startFrom,
}) => (
  <TextAnimation
    className={className}
    style={style}
    startFrom={startFrom}
    createTimeline={({ textRef, tl, SplitText }) => {
      const split = new SplitText(textRef.current, { type: "words" });
      tl.from(split.words, { opacity: 0, y: 15, duration, stagger, ease });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

/**
 * Reveal text line by line.
 */
export const RevealLines: React.FC<TextAnimationPresetProps> = ({
  children,
  stagger = 0.15,
  duration = 0.6,
  ease = "power3.out",
  className,
  style,
  startFrom,
}) => (
  <TextAnimation
    className={className}
    style={style}
    startFrom={startFrom}
    createTimeline={({ textRef, tl, SplitText }) => {
      const split = new SplitText(textRef.current, { type: "lines" });
      tl.from(split.lines, { opacity: 0, y: 30, duration, stagger, ease });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

/**
 * Scramble/decode text effect - characters appear to scramble before revealing.
 */
export const ScrambleText: React.FC<TextAnimationPresetProps> = ({
  children,
  stagger = 0.02,
  duration = 0.8,
  ease = "none",
  className,
  style,
  startFrom,
}) => (
  <TextAnimation
    className={className}
    style={style}
    startFrom={startFrom}
    createTimeline={({ textRef, tl, SplitText }) => {
      const split = new SplitText(textRef.current, { type: "chars" });
      tl.from(split.chars, {
        opacity: 0,
        scale: 0,
        rotationX: -90,
        duration,
        stagger,
        ease,
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

/**
 * Elastic bounce in effect for each character.
 */
export const BounceChars: React.FC<TextAnimationPresetProps> = ({
  children,
  stagger = 0.04,
  duration = 0.8,
  ease = "elastic.out(1, 0.3)",
  className,
  style,
  startFrom,
}) => (
  <TextAnimation
    className={className}
    style={style}
    startFrom={startFrom}
    createTimeline={({ textRef, tl, SplitText }) => {
      const split = new SplitText(textRef.current, { type: "chars" });
      tl.from(split.chars, {
        opacity: 0,
        y: -50,
        scale: 0.5,
        duration,
        stagger,
        ease,
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

/**
 * 3D Flip in characters (rotate X).
 */
export const FlipInChars: React.FC<TextAnimationPresetProps> = ({
  children,
  stagger = 0.03,
  duration = 0.6,
  ease = "back.out(1.7)",
  className,
  style,
  startFrom,
}) => (
  <TextAnimation
    className={className}
    style={style}
    perspective={800}
    startFrom={startFrom}
    createTimeline={({ textRef, tl, SplitText }) => {
      const split = new SplitText(textRef.current, { type: "chars" });
      tl.from(split.chars, {
        opacity: 0,
        rotationX: -90,
        transformOrigin: "50% 50% -50",
        duration,
        stagger,
        ease,
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

/**
 * 3D Rotate in words (rotate Y).
 */
export const RotateInWords: React.FC<TextAnimationPresetProps> = ({
  children,
  stagger = 0.1,
  duration = 0.7,
  ease = "power2.out",
  className,
  style,
  startFrom,
}) => (
  <TextAnimation
    className={className}
    style={style}
    perspective={1000}
    startFrom={startFrom}
    createTimeline={({ textRef, tl, SplitText }) => {
      const split = new SplitText(textRef.current, { type: "words" });
      tl.from(split.words, {
        opacity: 0,
        rotationY: 90,
        transformOrigin: "0% 50% -50",
        duration,
        stagger,
        ease,
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

/**
 * Wave animation - characters animate in with a wave-like stagger pattern.
 */
export const WaveText: React.FC<
  TextAnimationPresetProps & { amplitude?: number }
> = ({
  children,
  stagger = 0.04,
  duration = 0.5,
  ease = "back.out(1.7)",
  amplitude = 30,
  className,
  style,
  startFrom,
}) => (
  <TextAnimation
    className={className}
    style={style}
    startFrom={startFrom}
    createTimeline={({ textRef, tl, SplitText }) => {
      const split = new SplitText(textRef.current, { type: "chars" });
      tl.from(split.chars, {
        y: amplitude,
        opacity: 0,
        scale: 0.8,
        duration,
        stagger: {
          each: stagger,
          from: "start",
        },
        ease,
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

/**
 * Slide in text from a direction.
 */
export const SlideInText: React.FC<
  TextAnimationPresetProps & {
    direction?: "left" | "right" | "top" | "bottom";
    distance?: number;
  }
> = ({
  children,
  stagger = 0.05,
  duration = 0.6,
  ease = "power3.out",
  direction = "left",
  distance = 100,
  className,
  style,
  startFrom,
}) => {
  const getOffset = () => {
    switch (direction) {
      case "left":
        return { x: -distance, y: 0 };
      case "right":
        return { x: distance, y: 0 };
      case "top":
        return { x: 0, y: -distance };
      case "bottom":
        return { x: 0, y: distance };
    }
  };

  const offset = getOffset();

  return (
    <TextAnimation
      className={className}
      style={style}
      startFrom={startFrom}
      createTimeline={({ textRef, tl, SplitText }) => {
        const split = new SplitText(textRef.current, { type: "chars" });
        tl.from(split.chars, {
          ...offset,
          opacity: 0,
          duration,
          stagger,
          ease,
        });
        return tl;
      }}
    >
      {children}
    </TextAnimation>
  );
};

/**
 * Deterministic pseudo-random for consistent renders.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Matrix / Hacker effect - Cycles random characters before resolving.
 */
export const HackerText: React.FC<
  TextAnimationPresetProps & {
    /** Character set to cycle through */
    chars?: string;
    /** Initial color before resolving (e.g., "#0f0" for matrix green) */
    initialColor?: string;
  }
> = ({
  children,
  stagger = 0.02,
  duration = 1,
  chars = "01",
  initialColor = "#0f0",
  className,
  style,
  startFrom,
}) => (
  <TextAnimation
    className={className}
    style={style}
    startFrom={startFrom}
    createTimeline={({ textRef, tl, SplitText }) => {
      const split = new SplitText(textRef.current, { type: "chars" });
      const charsArray = chars.split("");

      // Animate each character
      split.chars.forEach((el, i) => {
        const char = el as HTMLElement;
        const originalText = char.innerText;
        const charDuration = duration;
        const startTime = i * stagger;

        // Track a seed counter for deterministic cycling
        let updateCount = 0;

        // Random character cycling
        tl.to(
          char,
          {
            duration: charDuration,
            onUpdate: function () {
              // Only update random char during the first 80% of duration
              if (this.progress() < 0.8) {
                // Deterministic: seed from char index + update count
                const rand = seededRandom(i * 1000 + updateCount);
                char.innerText =
                  charsArray[Math.floor(rand * charsArray.length)];
                updateCount++;
              } else {
                char.innerText = originalText;
              }
            },
            ease: "none",
          },
          startTime,
        );

        // Reveal opacity/color alongside
        tl.fromTo(
          char,
          { opacity: 0, color: initialColor },
          {
            opacity: 1,
            color: "inherit",
            duration: 0.2,
            delay: charDuration * 0.8,
          },
          startTime,
        );
      });

      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

/**
 * Props for TypewriterText component.
 */
export interface TypewriterTextProps {
  children: ReactNode;
  /** Time per character reveal in seconds */
  speed?: number;
  /** Show blinking cursor */
  cursor?: boolean;
  /** Cursor character */
  cursorChar?: string;
  /** Cursor color */
  cursorColor?: string;
  /** Additional CSS class names */
  className?: string;
  /** Additional CSS styles */
  style?: CSSProperties;
}

/**
 * Typewriter effect - reveals text character by character like typing.
 */
export const TypewriterText: React.FC<TypewriterTextProps> = ({
  children,
  speed = 0.05,
  cursor = true,
  cursorChar = "|",
  cursorColor = "currentColor",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const text = typeof children === "string" ? children : String(children);
  const charsToShow = Math.floor(frame / (speed * fps));
  const visibleText = text.slice(0, Math.min(charsToShow, text.length));

  const cursorVisible = Math.floor(frame / (fps * 0.4)) % 2 === 0;

  return (
    <span className={className} style={style}>
      {visibleText}
      {cursor && (
        <span
          style={{
            color: cursorColor,
            opacity: cursorVisible ? 1 : 0,
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
};

/**
 * Blur reveal effect - characters come into focus from a blur.
 */
export const BlurReveal: React.FC<TextAnimationPresetProps> = ({
  children,
  stagger = 0.05,
  duration = 0.8,
  ease = "power2.out",
  className,
  style,
  startFrom,
}) => (
  <TextAnimation
    className={className}
    style={style}
    startFrom={startFrom}
    createTimeline={({ textRef, tl, SplitText }) => {
      const split = new SplitText(textRef.current, { type: "chars" });
      tl.from(split.chars, {
        opacity: 0,
        filter: "blur(10px)",
        scale: 1.2,
        duration,
        stagger,
        ease,
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

/**
 * Glitch text effect - erratic scale and opacity before settling.
 */
export const GlitchText: React.FC<TextAnimationPresetProps> = ({
  children,
  stagger = 0.02,
  duration = 0.6,
  ease = "rough({ strength: 2, points: 10, template: none, taper: none, randomize: true, clamp: false })",
  className,
  style,
  startFrom,
}) => (
  <TextAnimation
    className={className}
    style={style}
    startFrom={startFrom}
    createTimeline={({ textRef, tl, SplitText }) => {
      const split = new SplitText(textRef.current, { type: "chars" });
      tl.from(split.chars, {
        opacity: 0,
        x: () => (Math.random() - 0.5) * 20,
        y: () => (Math.random() - 0.5) * 20,
        scale: 0,
        duration,
        stagger,
        ease,
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

export default TextAnimation;
