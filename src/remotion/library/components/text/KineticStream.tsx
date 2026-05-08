import React, { useId, useMemo } from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { toRemotionEasing } from "../../presets/remotionEasings";

// ============================================
// Shared Types
// ============================================

export interface KineticStreamProps {
  text: string;
  /** Font size */
  fontSize?: number;
  /** Font weight */
  fontWeight?: React.CSSProperties["fontWeight"];
  /** Text color */
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Duration of each word transition in seconds */
  transitionDuration?: number;
  /**
   * Total duration of the animation in seconds.
   * If not provided, it uses the composition's duration.
   */
  duration?: number;
  /**
   * Delay in seconds after the last word appears before the animation ends.
   * @default 0
   */
  delayAfterLastWord?: number;
  /** Number of words to display at once. @default 1 */
  wordsPerGroup?: number;
}

export type PushDirection = "up" | "down" | "left" | "right";

// ============================================
// Curated Easing Presets
// ============================================

const E = {
  appleSwift: toRemotionEasing("appleSwift"), // power2.out
  appleBounce: toRemotionEasing("appleBounce"), // back.out(1.4)
  appleSnap: toRemotionEasing("appleSnap"), // expo.out
  dramaticIn: toRemotionEasing("dramaticIn"), // power4.in
  dramaticOut: toRemotionEasing("dramaticOut"), // power4.out
  dramaticInOut: toRemotionEasing("dramaticInOut"), // power4.inOut
  epicIn: toRemotionEasing("epicIn"), // power3.in
  slowReveal: toRemotionEasing("slowReveal"), // expo.out
  snappy: toRemotionEasing("snappy"), // power3.out
  instant: toRemotionEasing("instant"), // power4.out
  gentle: toRemotionEasing("gentle"), // sine.inOut
} as const;

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

// ============================================
// Shared Utilities
// ============================================

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const useWords = (text: string, groupSize: number = 1): string[] => {
  return useMemo(() => {
    const allWords = text.split(/\s+/).filter(Boolean);
    if (groupSize <= 1) return allWords;
    const groups: string[] = [];
    for (let i = 0; i < allWords.length; i += groupSize) {
      groups.push(allWords.slice(i, i + groupSize).join(" "));
    }
    return groups;
  }, [text, groupSize]);
};

/**
 * Shared timing hook. Returns raw (uneased) progress — each variant applies its own easing.
 */
const useStreamTiming = (
  totalGroups: number,
  transitionDurationSec: number,
  totalDurationSecProp?: number,
  delayAfterLastWordSec: number = 0
) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const totalFrames =
    totalDurationSecProp != null
      ? Math.round(totalDurationSecProp * fps)
      : durationInFrames;
  const delayFrames = Math.round(delayAfterLastWordSec * fps);
  const transitionFrames = Math.round(transitionDurationSec * fps);

  const effectiveDuration = totalFrames - delayFrames;
  const durationPerGroup = effectiveDuration / totalGroups;
  const clampedTransitionFrames = Math.min(
    transitionFrames,
    durationPerGroup * 0.9
  );

  const currentIndex = Math.floor(frame / durationPerGroup);
  const safeCurrentIndex = Math.min(
    totalGroups - 1,
    Math.max(0, currentIndex)
  );
  const prevIndex = safeCurrentIndex - 1;

  // Fixed: absolute position instead of modulo — prevents phantom transitions during delay
  const timeInSlot = frame - safeCurrentIndex * durationPerGroup;

  const progress = interpolate(
    timeInSlot,
    [0, clampedTransitionFrames],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const isTransitioning =
    timeInSlot < clampedTransitionFrames && safeCurrentIndex > 0;

  const holdProgress = interpolate(
    timeInSlot,
    [clampedTransitionFrames, durationPerGroup],
    [0, 1],
    CLAMP
  );

  return {
    currentIndex: safeCurrentIndex,
    prevIndex,
    isTransitioning,
    progress,
    holdProgress,
    fps,
  };
};

/**
 * Compute motion blur from easing curve velocity (derivative).
 */
function getMotionBlur(
  progress: number,
  easing: (t: number) => number,
  maxBlur: number = 8
): number {
  const dt = 0.02;
  const p0 = easing(Math.max(0, progress - dt));
  const p1 = easing(Math.min(1, progress + dt));
  const velocity = Math.abs(p1 - p0) / (2 * dt);
  return Math.min(velocity * 2, 1) * maxBlur;
}

// ============================================
// StreamContainer
// ============================================

const StreamContainer: React.FC<{
  fontSize: number;
  fontWeight: React.CSSProperties["fontWeight"];
  color: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  perspective?: number;
  overflow?: "hidden" | "visible";
}> = ({
  fontSize,
  fontWeight,
  color,
  className,
  style,
  children,
  perspective,
  overflow = "hidden",
}) => (
  <div
    className={className}
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      fontSize,
      fontWeight,
      color,
      fontFamily: "inherit",
      overflow,
      ...(perspective ? { perspective: `${perspective}px` } : {}),
      ...style,
    }}
  >
    {children}
  </div>
);

// ============================================
// Stream Variants
// ============================================

/**
 * SlideStream: Alternating slide with position overshoot and velocity blur.
 */
export const SlideStream: React.FC<
  KineticStreamProps & { direction?: "left" | "right" | "alternate" }
> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.4,
  direction = "alternate",
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];
  const prevWord = words[prevIndex];

  const getDir = (i: number) => {
    if (direction === "left") return "left";
    if (direction === "right") return "right";
    return i % 2 === 0 ? "left" : "right";
  };
  const dir = getDir(currentIndex);
  const enterFrom = dir === "left" ? -100 : 100;
  const exitTo = dir === "left" ? 100 : -100;

  // Enter: position leads with overshoot
  const enterX = isTransitioning
    ? interpolate(progress, [0, 0.7], [enterFrom, 0], {
        ...CLAMP,
        easing: E.appleBounce,
      })
    : 0;
  const enterOpacity = isTransitioning
    ? interpolate(progress, [0, 0.4], [0, 1], CLAMP)
    : 1;
  const enterScale = isTransitioning
    ? interpolate(progress, [0, 0.85], [0.95, 1], {
        ...CLAMP,
        easing: E.appleSwift,
      })
    : 1;

  // Exit: accelerating out
  const exitX = isTransitioning
    ? interpolate(progress, [0, 0.6], [0, exitTo], {
        ...CLAMP,
        easing: E.dramaticIn,
      })
    : 0;
  const exitOpacity = isTransitioning
    ? interpolate(progress, [0, 0.5], [1, 0], CLAMP)
    : 1;

  const blur = isTransitioning ? getMotionBlur(progress, E.appleSwift, 6) : 0;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
    >
      {isTransitioning && prevWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            transform: `translateX(${exitX}%) scale(${interpolate(progress, [0, 0.6], [1, 0.97], CLAMP)})`,
            opacity: exitOpacity,
            filter: blur > 0.5 ? `blur(${blur}px)` : "none",
          }}
        >
          {prevWord}
        </div>
      )}
      {currentWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            transform: isTransitioning
              ? `translateX(${enterX}%) scale(${enterScale})`
              : "translateX(0)",
            opacity: isTransitioning ? enterOpacity : 1,
            filter: blur > 0.5 ? `blur(${blur * 0.7}px)` : "none",
          }}
        >
          {currentWord}
        </div>
      )}
    </StreamContainer>
  );
};

/**
 * SwipeStream: Aggressive swipe with velocity-driven skew and blur.
 */
export const SwipeStream: React.FC<KineticStreamProps> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.25,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];
  const prevWord = words[prevIndex];
  const dir = currentIndex % 2 === 0 ? 1 : -1;

  const blur = isTransitioning
    ? getMotionBlur(progress, E.dramaticInOut, 10)
    : 0;
  // Skew from velocity
  const skew = isTransitioning
    ? getMotionBlur(progress, E.dramaticInOut, 1) * 20 * dir
    : 0;

  const easedPos = isTransitioning
    ? interpolate(progress, [0, 1], [0, 1], {
        ...CLAMP,
        easing: E.dramaticInOut,
      })
    : 1;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
    >
      {isTransitioning && prevWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            transform: `translateX(${interpolate(easedPos, [0, 1], [0, -100 * dir])}%) skewX(${skew}deg) scale(${interpolate(easedPos, [0.5, 1], [1, 0.95], CLAMP)})`,
            opacity: 1 - easedPos,
            filter: blur > 0.5 ? `blur(${blur}px)` : "none",
          }}
        >
          {prevWord}
        </div>
      )}
      {currentWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            transform: isTransitioning
              ? `translateX(${interpolate(easedPos, [0, 1], [100 * dir, 0])}%) skewX(${-skew}deg)`
              : "translateX(0)",
            opacity: isTransitioning ? easedPos : 1,
            filter: blur > 0.5 ? `blur(${blur * 0.8}px)` : "none",
          }}
        >
          {currentWord}
        </div>
      )}
    </StreamContainer>
  );
};

/**
 * DynamicSizeStream: Words cycle with dynamic sizes and staggered enter.
 */
export const DynamicSizeStream: React.FC<KineticStreamProps> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.3,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];
  const prevWord = words[prevIndex];

  const getSize = (index: number) => {
    const variation = (Math.sin(index * 12345) + 1) / 2;
    return 0.7 + variation * 0.8;
  };

  const currentScale = getSize(currentIndex);
  const prevScale = getSize(prevIndex);

  // Enter: Y leads, scale bounces, opacity follows
  const enterY = isTransitioning
    ? interpolate(progress, [0, 0.6], [80, 0], {
        ...CLAMP,
        easing: E.appleSwift,
      })
    : 0;
  const enterScaleAnim = isTransitioning
    ? interpolate(progress, [0.1, 0.8], [0.5, 1], {
        ...CLAMP,
        easing: E.appleBounce,
      })
    : 1;
  const enterOpacity = isTransitioning
    ? interpolate(progress, [0, 0.4], [0, 1], CLAMP)
    : 1;

  // Exit: shrink + blur away
  const exitScale = isTransitioning
    ? interpolate(progress, [0, 0.5], [1, 0.7], {
        ...CLAMP,
        easing: E.dramaticIn,
      })
    : 1;
  const exitBlur = isTransitioning
    ? interpolate(progress, [0, 0.5], [0, 6], CLAMP)
    : 0;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
    >
      {isTransitioning && prevWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            transform: `scale(${prevScale * exitScale}) translateY(${interpolate(progress, [0, 0.5], [0, -40], CLAMP)}px)`,
            opacity: interpolate(progress, [0, 0.4], [1, 0], CLAMP),
            filter: exitBlur > 0.5 ? `blur(${exitBlur}px)` : "none",
          }}
        >
          {prevWord}
        </div>
      )}
      {currentWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            transform: isTransitioning
              ? `scale(${currentScale * enterScaleAnim}) translateY(${enterY}px)`
              : `scale(${currentScale})`,
            opacity: isTransitioning ? enterOpacity : 1,
          }}
        >
          {currentWord}
        </div>
      )}
    </StreamContainer>
  );
};

/**
 * StompStream: Text slams down with multi-frequency shake and squash-settle.
 */
export const StompStream: React.FC<KineticStreamProps> = ({
  text,
  fontSize = 80,
  fontWeight = "900",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.3,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];

  // Phase 1 (0-0.3): Slam from scale 4 to 1
  const slamScale = interpolate(progress, [0, 0.3], [4, 1], {
    ...CLAMP,
    easing: E.epicIn,
  });

  // Phase 2 (0.3-0.6): Multi-frequency shake with exponential decay
  const shakeActive = isTransitioning && progress > 0.3 && progress < 0.6;
  const shakeDecay = shakeActive ? Math.exp(-10 * (progress - 0.3)) : 0;
  const shakeX = shakeActive
    ? (Math.sin(progress * 147) * 8 +
        Math.sin(progress * 297) * 5 +
        Math.sin(progress * 573) * 3) *
      shakeDecay
    : 0;
  const shakeY = shakeActive
    ? (Math.sin(progress * 173) * 6 + Math.sin(progress * 347) * 4) *
      shakeDecay
    : 0;

  // Phase 3 (0.3-1): Squash-settle
  const settleScale = interpolate(
    progress,
    [0.3, 0.45, 0.65, 1],
    [1, 0.97, 1.01, 1],
    CLAMP
  );

  const finalScale = isTransitioning
    ? progress <= 0.3
      ? slamScale
      : settleScale
    : 1;

  // Snap opacity (instant appearance)
  const opacity = isTransitioning
    ? interpolate(progress, [0, 0.05], [0, 1], { extrapolateRight: "clamp" })
    : 1;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
    >
      {isTransitioning && prevIndex >= 0 && (
        <div
          style={{
            position: "absolute",
            opacity: interpolate(progress, [0, 0.12], [1, 0], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {words[prevIndex]}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          whiteSpace: "nowrap",
          transform: `scale(${finalScale}) translate(${shakeX}px, ${shakeY}px)`,
          opacity,
        }}
      >
        {currentWord}
      </div>
    </StreamContainer>
  );
};

/**
 * SlotMachineStream: Vertical reel snap with overshoot and velocity blur.
 */
export const SlotMachineStream: React.FC<KineticStreamProps> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.5,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];
  const prevWord = words[prevIndex];

  const blur = isTransitioning
    ? getMotionBlur(progress, E.appleSnap, 12)
    : 0;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
    >
      {isTransitioning && prevWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            transform: `translateY(${interpolate(progress, [0, 0.7], [0, 250], { ...CLAMP, easing: E.dramaticIn })}%)`,
            opacity: interpolate(progress, [0, 0.6], [1, 0], CLAMP),
            filter: blur > 0.5 ? `blur(${blur}px)` : "none",
          }}
        >
          {prevWord}
        </div>
      )}
      {currentWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            // Overshoot: slides past 0 then snaps back
            transform: isTransitioning
              ? `translateY(${interpolate(progress, [0, 0.85], [-300, 0], { ...CLAMP, easing: E.appleBounce })}%)`
              : "translateY(0)",
            opacity: isTransitioning
              ? interpolate(progress, [0, 0.3], [0, 1], CLAMP)
              : 1,
            filter:
              isTransitioning && blur > 0.5 ? `blur(${blur * 0.7}px)` : "none",
          }}
        >
          {currentWord}
        </div>
      )}
    </StreamContainer>
  );
};

/**
 * OutlineStream: Stroke-to-fill with clip-path wipe reveal.
 */
export const OutlineStream: React.FC<KineticStreamProps> = ({
  text,
  fontSize = 80,
  fontWeight = "900",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.65,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];

  // Fill wipe: left-to-right reveal via clip-path
  const fillPct = isTransitioning
    ? interpolate(progress, [0.15, 0.75], [0, 100], {
        ...CLAMP,
        easing: E.slowReveal,
      })
    : 100;

  // Micro-scale settle
  const scale = isTransitioning
    ? interpolate(progress, [0.1, 0.8], [1.02, 1], {
        ...CLAMP,
        easing: E.appleBounce,
      })
    : 1;

  // Stroke width animation
  const strokeWidth = isTransitioning
    ? interpolate(progress, [0, 0.5, 0.85], [3, 2, 0], CLAMP)
    : 0;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
      overflow="visible"
    >
      {isTransitioning && prevIndex >= 0 && (
        <div
          style={{
            position: "absolute",
            opacity: interpolate(progress, [0, 0.15], [1, 0], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {words[prevIndex]}
        </div>
      )}
      <div
        style={{
          position: "relative",
          transform: `scale(${scale})`,
        }}
      >
        {/* Outline layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            WebkitTextStroke: `${Math.max(strokeWidth, 1)}px ${color}`,
            color: "transparent",
            opacity: isTransitioning
              ? interpolate(progress, [0, 0.15], [0, 1], {
                  extrapolateRight: "clamp",
                })
              : fillPct < 100
                ? 1
                : 0,
          }}
        >
          {currentWord}
        </div>
        {/* Fill layer — clip-path wipe */}
        <div
          style={{
            position: "relative",
            color: color,
            clipPath: `inset(0 ${100 - fillPct}% 0 0)`,
          }}
        >
          {currentWord}
        </div>
      </div>
    </StreamContainer>
  );
};

/**
 * ElasticStream: Elastic pop-in with spring-out exit.
 */
export const ElasticStream: React.FC<KineticStreamProps> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.4,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];
  const prevWord = words[prevIndex];

  // Enter: elastic bounce with subtle rotation oscillation
  const elasticScale = isTransitioning
    ? interpolate(progress, [0.1, 1], [0, 1], {
        ...CLAMP,
        easing: Easing.elastic(1.5),
      })
    : 1;
  const enterRotation = isTransitioning
    ? interpolate(progress, [0.1, 0.35, 0.55, 0.75, 1], [0, 2, -1, 0.5, 0], CLAMP)
    : 0;

  // Exit: stretch then collapse
  const exitScale = isTransitioning
    ? interpolate(progress, [0, 0.12, 0.3], [1, 1.08, 0], CLAMP)
    : 1;
  const exitRotation = isTransitioning
    ? interpolate(progress, [0, 0.3], [0, -8], CLAMP)
    : 0;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
    >
      {isTransitioning && prevWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            transform: `scale(${exitScale}) rotate(${exitRotation}deg)`,
            opacity: interpolate(progress, [0.05, 0.25], [1, 0], CLAMP),
          }}
        >
          {prevWord}
        </div>
      )}
      {currentWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            transform: `scale(${elasticScale}) rotate(${enterRotation}deg)`,
            opacity: 1,
          }}
        >
          {currentWord}
        </div>
      )}
    </StreamContainer>
  );
};

/**
 * BlockStream: Solid block wipe with eased phases.
 */
export const BlockStream: React.FC<
  KineticStreamProps & { blockColor?: string }
> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "currentColor",
  blockColor = "currentColor",
  className,
  style,
  transitionDuration = 0.5,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];
  const prevWord = words[prevIndex];

  const isPhase1 = progress < 0.5;
  // Phase 1: block wipes in (accelerating)
  // Phase 2: block wipes out (decelerating)
  const blockScale = isPhase1
    ? interpolate(progress, [0, 0.5], [0, 1.05], {
        ...CLAMP,
        easing: E.dramaticIn,
      })
    : interpolate(progress, [0.5, 1], [1.05, 0], {
        ...CLAMP,
        easing: E.dramaticOut,
      });
  const blockOrigin = isPhase1 ? "left" : "right";

  // Subtle text momentum during reveal
  const textShift =
    isTransitioning && !isPhase1
      ? interpolate(progress, [0.5, 0.85], [4, 0], {
          ...CLAMP,
          easing: E.appleSwift,
        })
      : 0;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
      overflow="visible"
    >
      <div style={{ position: "relative" }}>
        <div style={{ opacity: isTransitioning ? 0 : 1 }}>
          {isTransitioning
            ? isPhase1
              ? prevWord
              : currentWord
            : currentWord}
        </div>
        {isTransitioning && (
          <>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: `translateX(${textShift}px)`,
              }}
            >
              {isPhase1 ? prevWord : currentWord}
            </div>
            <div
              style={{
                position: "absolute",
                top: -10,
                bottom: -10,
                left: -20,
                right: -20,
                backgroundColor: blockColor,
                transform: `scaleX(${blockScale})`,
                transformOrigin: blockOrigin,
                zIndex: 10,
              }}
            />
          </>
        )}
      </div>
    </StreamContainer>
  );
};

/**
 * ChromaticStream: RGB split with green channel, velocity-driven intensity, and scan lines.
 */
export const ChromaticStream: React.FC<KineticStreamProps> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.25,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];
  const frame = useCurrentFrame();

  // Velocity-driven intensity
  const intensity = isTransitioning
    ? getMotionBlur(progress, E.dramaticInOut, 1)
    : 0;

  // Deterministic per-frame jitter
  const jR = seededRandom(frame * 7 + 1) * 2 - 1;
  const jG = seededRandom(frame * 7 + 2) * 2 - 1;
  const jB = seededRandom(frame * 7 + 3) * 2 - 1;

  const redX = intensity * (10 + jR * 3);
  const redY = intensity * (2 + jR * 1.5);
  const greenX = intensity * (-2 + jG * 2);
  const greenY = intensity * (-8 + jG * 2);
  const blueX = intensity * (-10 + jB * 3);
  const blueY = intensity * (-2 + jB * 1.5);

  const opacity = isTransitioning
    ? interpolate(progress, [0, 0.5, 1], [1, 0.6, 1])
    : 1;
  const displayText =
    isTransitioning && progress < 0.5 ? words[prevIndex] : currentWord;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
      overflow="visible"
    >
      <div style={{ position: "relative" }}>
        <div style={{ opacity, filter: `blur(${intensity * 2}px)` }}>
          {displayText}
        </div>
        {intensity > 0.01 && (
          <>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: `translate(${redX}px, ${redY}px)`,
                color: "rgba(255,0,0,0.8)",
                mixBlendMode: "screen",
                opacity: intensity,
              }}
            >
              {displayText}
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: `translate(${greenX}px, ${greenY}px)`,
                color: "rgba(0,255,0,0.6)",
                mixBlendMode: "screen",
                opacity: intensity * 0.7,
              }}
            >
              {displayText}
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: `translate(${blueX}px, ${blueY}px)`,
                color: "rgba(0,0,255,0.8)",
                mixBlendMode: "screen",
                opacity: intensity,
              }}
            >
              {displayText}
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,${intensity * 0.12}) 2px, rgba(0,0,0,${intensity * 0.12}) 4px)`,
                pointerEvents: "none",
              }}
            />
          </>
        )}
      </div>
    </StreamContainer>
  );
};

/**
 * FlipTextStream: 3D flip with brightness simulation and overlapping timing.
 */
export const FlipTextStream: React.FC<KineticStreamProps> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.3,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];
  const prevWord = words[prevIndex];

  // Exit: flips out 0-0.45
  const exitRotation = isTransitioning
    ? interpolate(progress, [0, 0.45], [0, 90], {
        ...CLAMP,
        easing: E.dramaticIn,
      })
    : 0;
  // Brightness dims as face rotates away
  const exitBrightness = isTransitioning
    ? interpolate(progress, [0, 0.45], [1, 0.6], CLAMP)
    : 1;

  // Enter: flips in 0.3-1.0 (overlaps with exit)
  const enterRotation = isTransitioning
    ? interpolate(progress, [0.3, 1], [-90, 0], {
        ...CLAMP,
        easing: E.appleBounce,
      })
    : 0;
  const enterBrightness = isTransitioning
    ? interpolate(progress, [0.3, 0.7], [0.6, 1], CLAMP)
    : 1;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
      perspective={1000}
    >
      <div
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          display: "grid",
          placeItems: "center",
        }}
      >
        {isTransitioning && prevWord && (
          <div
            style={{
              position: "absolute",
              transformOrigin: "center bottom",
              transform: `rotateX(${exitRotation}deg)`,
              opacity: interpolate(progress, [0.2, 0.45], [1, 0], CLAMP),
              filter: `brightness(${exitBrightness})`,
              backfaceVisibility: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {prevWord}
          </div>
        )}
        {currentWord && (
          <div
            style={{
              position: isTransitioning ? "absolute" : "relative",
              transformOrigin: "center top",
              transform: isTransitioning
                ? `rotateX(${enterRotation}deg)`
                : "rotateX(0)",
              opacity: isTransitioning
                ? interpolate(progress, [0.3, 0.6], [0, 1], CLAMP)
                : 1,
              filter: `brightness(${enterBrightness})`,
              backfaceVisibility: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {currentWord}
          </div>
        )}
      </div>
    </StreamContainer>
  );
};

/**
 * ZoomTextStream: Fly-through zoom with S-curve depth-of-field blur and parallax.
 */
export const ZoomTextStream: React.FC<KineticStreamProps> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.5,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];
  const prevWord = words[prevIndex];

  // S-curve depth-of-field blur
  const enterBlur = isTransitioning
    ? interpolate(progress, [0, 0.3, 0.7, 1], [0, 12, 5, 0])
    : 0;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
    >
      {isTransitioning && prevWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            transform: `scale(${interpolate(progress, [0, 0.7], [1, 4], { ...CLAMP, easing: E.dramaticIn })})`,
            filter: `blur(${interpolate(progress, [0, 0.7], [0, 20], CLAMP)}px) brightness(${interpolate(progress, [0, 0.7], [1, 1.4], CLAMP)})`,
            opacity: interpolate(progress, [0, 0.6], [1, 0], CLAMP),
          }}
        >
          {prevWord}
        </div>
      )}
      {currentWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            // Scale with overshoot + subtle Y parallax
            transform: isTransitioning
              ? `scale(${interpolate(progress, [0, 0.9], [0.1, 1], { ...CLAMP, easing: E.appleBounce })}) translateY(${interpolate(progress, [0, 1], [5, 0], CLAMP)}px)`
              : "scale(1)",
            opacity: isTransitioning
              ? interpolate(progress, [0, 0.5], [0, 1], CLAMP)
              : 1,
            filter: enterBlur > 0.5 ? `blur(${enterBlur}px)` : "none",
          }}
        >
          {currentWord}
        </div>
      )}
    </StreamContainer>
  );
};

/**
 * BlurTextStream: Cinematic horizontal blur with velocity-driven motion blur.
 */
export const BlurTextStream: React.FC<KineticStreamProps> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.25,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];
  const prevWord = words[prevIndex];

  const blur = isTransitioning
    ? getMotionBlur(progress, E.dramaticInOut, 14)
    : 0;

  const easedPos = isTransitioning
    ? interpolate(progress, [0, 1], [0, 1], {
        ...CLAMP,
        easing: E.dramaticInOut,
      })
    : 1;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
    >
      {isTransitioning && prevWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            transform: `translateX(${interpolate(easedPos, [0, 1], [0, -80])}px) translateY(${interpolate(easedPos, [0.5, 1], [0, 3], CLAMP)}px) scale(${interpolate(easedPos, [0, 0.5, 1], [1, 0.95, 0.9])})`,
            opacity: interpolate(easedPos, [0, 0.5], [1, 0], CLAMP),
            filter: blur > 0.5 ? `blur(${blur}px)` : "none",
          }}
        >
          {prevWord}
        </div>
      )}
      {currentWord && (
        <div
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            transform: isTransitioning
              ? `translateX(${interpolate(easedPos, [0, 1], [80, 0])}px) scale(${interpolate(easedPos, [0, 0.5, 1], [0.95, 1.02, 1])})`
              : "scale(1)",
            opacity: isTransitioning
              ? interpolate(easedPos, [0, 0.5], [0, 1], CLAMP)
              : 1,
            filter:
              isTransitioning && blur > 0.5 ? `blur(${blur * 0.8}px)` : "none",
          }}
        >
          {currentWord}
        </div>
      )}
    </StreamContainer>
  );
};

/**
 * SlicedStream: Split halves with staggered arrival timing.
 */
export const SlicedStream: React.FC<KineticStreamProps> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.5,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];

  // Staggered: top half arrives earlier
  const topOffset = isTransitioning
    ? interpolate(progress, [0, 0.8], [100, 0], {
        ...CLAMP,
        easing: E.appleSwift,
      })
    : 0;
  const bottomOffset = isTransitioning
    ? interpolate(progress, [0.12, 0.92], [100, 0], {
        ...CLAMP,
        easing: E.appleSwift,
      })
    : 0;

  const topOpacity = isTransitioning
    ? interpolate(progress, [0, 0.2], [0, 1], CLAMP)
    : 1;
  const bottomOpacity = isTransitioning
    ? interpolate(progress, [0.12, 0.32], [0, 1], CLAMP)
    : 1;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
    >
      {isTransitioning && prevIndex >= 0 && (
        <div
          style={{
            position: "absolute",
            opacity: interpolate(progress, [0, 0.25], [1, 0], CLAMP),
            filter: `blur(${interpolate(progress, [0, 0.3], [0, 4], CLAMP)}px)`,
          }}
        >
          {words[prevIndex]}
        </div>
      )}
      <div style={{ position: "relative" }}>
        {/* Top half */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            transform: `translateX(${-topOffset}px)`,
            opacity: topOpacity,
          }}
        >
          {currentWord}
        </div>
        {/* Bottom half */}
        <div
          style={{
            position: "relative",
            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            transform: `translateX(${bottomOffset}px)`,
            opacity: bottomOpacity,
          }}
        >
          {currentWord}
        </div>
      </div>
    </StreamContainer>
  );
};

/**
 * TurbulenceStream: Organic displacement distortion.
 */
export const TurbulenceStream: React.FC<KineticStreamProps> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.65,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];
  const filterId = useId();

  // Asymmetric distortion: ramps up fast, settles slowly
  const displacement = isTransitioning
    ? interpolate(progress, [0, 0.3, 1], [0, 60, 0], {
        easing: E.gentle,
      })
    : 0;

  // Animated base frequency
  const baseFreq = isTransitioning
    ? interpolate(progress, [0, 0.3, 1], [0.03, 0.08, 0.03])
    : 0.03;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFreq}
              numOctaves={2}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacement}
            />
          </filter>
        </defs>
      </svg>
      {isTransitioning && prevIndex >= 0 && (
        <div
          style={{
            position: "absolute",
            opacity: interpolate(progress, [0, 0.4], [1, 0], CLAMP),
          }}
        >
          {words[prevIndex]}
        </div>
      )}
      <div
        style={{
          position: "relative",
          filter: displacement > 0.5 ? `url(#${filterId})` : "none",
          opacity: isTransitioning
            ? interpolate(progress, [0.1, 0.5], [0, 1], CLAMP)
            : 1,
        }}
      >
        {currentWord}
      </div>
    </StreamContainer>
  );
};

/**
 * NeonStream: Flickering neon with turn-on sequence and glow warmup.
 */
export const NeonStream: React.FC<
  KineticStreamProps & { neonColor?: string }
> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "white",
  neonColor = "#ff00ff",
  className,
  style,
  transitionDuration = 0.15,
  duration,
  delayAfterLastWord = 0,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];
  const frame = useCurrentFrame();

  // Deterministic flicker
  const flicker = 0.92 + seededRandom(frame * 3) * 0.08;

  // Turn-on sequence: flash / dim / flash / settle
  const turnOn = isTransitioning
    ? progress < 0.15
      ? interpolate(progress, [0, 0.15], [0, 0.7])
      : progress < 0.25
        ? interpolate(progress, [0.15, 0.25], [0.7, 0.15])
        : progress < 0.4
          ? interpolate(progress, [0.25, 0.4], [0.15, 0.95])
          : progress < 0.55
            ? interpolate(progress, [0.4, 0.55], [0.95, 0.8])
            : interpolate(progress, [0.55, 0.75], [0.8, 1], CLAMP)
    : 1;

  // Glow warmup
  const warmup = isTransitioning
    ? interpolate(progress, [0.3, 1], [0.3, 1], CLAMP)
    : 1;

  const glow = `0 0 ${2 + warmup * 3}px ${neonColor}, 0 0 ${5 + warmup * 5}px ${neonColor}, 0 0 ${10 + warmup * 10}px ${neonColor}, 0 0 ${20 + warmup * 20}px ${neonColor}`;

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
    >
      {isTransitioning && prevIndex >= 0 && (
        <div
          style={{
            position: "absolute",
            opacity: interpolate(progress, [0, 0.12], [1, 0], {
              extrapolateRight: "clamp",
            }),
            textShadow: glow,
          }}
        >
          {words[prevIndex]}
        </div>
      )}
      <div
        style={{
          position: "relative",
          opacity: flicker * turnOn,
          textShadow: glow,
        }}
      >
        {currentWord}
      </div>
    </StreamContainer>
  );
};

/**
 * PushStream: Directional push with velocity skew, overshoot, and momentum compression.
 */
export const PushStream: React.FC<
  KineticStreamProps & {
    direction?: PushDirection;
    /** Apply motion blur-like skew during movement */
    withSkew?: boolean;
  }
> = ({
  text,
  fontSize = 80,
  fontWeight = "bold",
  color = "currentColor",
  className,
  style,
  transitionDuration = 0.3,
  duration,
  delayAfterLastWord = 0,
  direction = "up",
  withSkew = true,
  wordsPerGroup = 1,
}) => {
  const words = useWords(text, wordsPerGroup);
  const { currentIndex, prevIndex, isTransitioning, progress } =
    useStreamTiming(
      words.length,
      transitionDuration,
      duration,
      delayAfterLastWord
    );

  const currentWord = words[currentIndex];
  const prevWord = words[prevIndex];

  // Velocity-based skew
  const velocity = isTransitioning
    ? getMotionBlur(progress, E.snappy, 1)
    : 0;
  const skewAmount = withSkew ? velocity * 18 : 0;

  // Momentum compression (scaleY for vertical, scaleX for horizontal)
  const isVertical = direction === "up" || direction === "down";
  const compression = 1 - velocity * 0.03;

  const getTransform = (type: "enter" | "exit", p: number) => {
    let x = "0",
      y = "0";
    let skewX = "0deg",
      skewY = "0deg";
    const scaleComp = isVertical
      ? `scaleY(${compression})`
      : `scaleX(${compression})`;

    if (direction === "up") {
      const val =
        type === "enter"
          ? interpolate(p, [0, 0.8], [100, 0], {
              ...CLAMP,
              easing: E.appleBounce,
            })
          : interpolate(p, [0, 0.65], [0, -100], {
              ...CLAMP,
              easing: E.dramaticIn,
            });
      y = `${val}%`;
      skewY = `${-skewAmount}deg`;
    } else if (direction === "down") {
      const val =
        type === "enter"
          ? interpolate(p, [0, 0.8], [-100, 0], {
              ...CLAMP,
              easing: E.appleBounce,
            })
          : interpolate(p, [0, 0.65], [0, 100], {
              ...CLAMP,
              easing: E.dramaticIn,
            });
      y = `${val}%`;
      skewY = `${skewAmount}deg`;
    } else if (direction === "left") {
      const val =
        type === "enter"
          ? interpolate(p, [0, 0.8], [100, 0], {
              ...CLAMP,
              easing: E.appleBounce,
            })
          : interpolate(p, [0, 0.65], [0, -100], {
              ...CLAMP,
              easing: E.dramaticIn,
            });
      x = `${val}%`;
      skewX = `${skewAmount}deg`;
    } else {
      const val =
        type === "enter"
          ? interpolate(p, [0, 0.8], [-100, 0], {
              ...CLAMP,
              easing: E.appleBounce,
            })
          : interpolate(p, [0, 0.65], [0, 100], {
              ...CLAMP,
              easing: E.dramaticIn,
            });
      x = `${val}%`;
      skewX = `${-skewAmount}deg`;
    }

    return `translate3d(${x}, ${y}, 0) skew(${skewX}, ${skewY}) ${scaleComp}`;
  };

  return (
    <StreamContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={className}
      style={style}
    >
      <div
        style={{
          position: "relative",
          textAlign: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        {isTransitioning && prevWord && (
          <div
            style={{
              position: "absolute",
              whiteSpace: "nowrap",
              transform: getTransform("exit", progress),
              opacity: interpolate(progress, [0.4, 0.65], [1, 0], CLAMP),
            }}
          >
            {prevWord}
          </div>
        )}
        {currentWord && (
          <div
            style={{
              position: isTransitioning ? "absolute" : "relative",
              whiteSpace: "nowrap",
              transform: isTransitioning
                ? getTransform("enter", progress)
                : "translate3d(0,0,0)",
              opacity: 1,
            }}
          >
            {currentWord}
          </div>
        )}
      </div>
    </StreamContainer>
  );
};
