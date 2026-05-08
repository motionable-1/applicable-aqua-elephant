import React, { useMemo, type CSSProperties } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

const ALPHABET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!?-:";

/**
 * Props for the SplitFlap component.
 */
export interface SplitFlapProps {
  /** Target text to display */
  text: string;
  /** Width per character cell in pixels */
  charWidth?: number;
  /** Height per character cell in pixels */
  charHeight?: number;
  /** Duration per character flip in seconds */
  flipDuration?: number;
  /** Stagger between characters in seconds */
  stagger?: number;
  /** Initial delay in seconds */
  delay?: number;
  /** Font size in pixels */
  fontSize?: number;
  /** Font family */
  fontFamily?: string;
  /** Text color */
  textColor?: string;
  /** Card background color */
  backgroundColor?: string;
  /** Horizontal split line color */
  dividerColor?: string;
  /** Gap between character cells in pixels */
  gap?: number;
  /** Additional CSS class names */
  className?: string;
  /** Additional CSS styles */
  style?: CSSProperties;
}

/**
 * Deterministic character resolver. Given a progress value 0..1, cycles through
 * intermediate characters before settling on the target character.
 */
function resolveCharacter(
  progress: number,
  targetChar: string,
): string {
  if (progress >= 1) return targetChar;
  if (progress <= 0) return " ";

  const targetIndex = ALPHABET.indexOf(targetChar.toUpperCase());
  const target = targetIndex >= 0 ? targetIndex : 0;

  // Number of intermediate characters to cycle through (8-12 range based on target)
  const cycleCount = 8 + (target % 5);

  // Map progress to a cycling index
  const cycleProgress = interpolate(progress, [0, 1], [0, cycleCount], {
    extrapolateRight: "clamp",
  });

  const currentStep = Math.floor(cycleProgress);

  // On the last step, land on the target character
  if (currentStep >= cycleCount - 1) return ALPHABET[target];

  // Otherwise, cycle deterministically through the alphabet
  const charIndex = (currentStep * 7 + target) % ALPHABET.length;
  return ALPHABET[charIndex];
}

/**
 * A single flap cell displaying one character.
 */
const FlapCell: React.FC<{
  char: string;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
  dividerColor: string;
}> = ({ char, width, height, fontSize, fontFamily, textColor, backgroundColor, dividerColor }) => {
  const cellStyle: CSSProperties = {
    width,
    height,
    position: "relative",
    borderRadius: 2,
    backgroundColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    boxShadow: `0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
  };

  const charStyle: CSSProperties = {
    fontSize,
    fontFamily,
    color: textColor,
    fontWeight: 700,
    lineHeight: 1,
    userSelect: "none",
    letterSpacing: 0,
  };

  const dividerStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: dividerColor,
    transform: "translateY(-50%)",
    boxShadow: `0 1px 1px rgba(0,0,0,0.3)`,
    zIndex: 1,
  };

  return (
    <div style={cellStyle}>
      <span style={charStyle}>{char}</span>
      <div style={dividerStyle} />
    </div>
  );
};

/**
 * Mechanical split-flap / airport departure board display.
 *
 * Each character cell cycles through intermediate characters before landing
 * on the target, creating the classic retro-mechanical flipping effect.
 *
 * @example
 * // Basic departure board
 * <SplitFlap text="FLIGHT 742" />
 *
 * @example
 * // Custom styling
 * <SplitFlap
 *   text="DEPARTING"
 *   charWidth={56}
 *   charHeight={72}
 *   flipDuration={0.12}
 *   stagger={0.08}
 *   backgroundColor="#222"
 *   textColor="#f0c040"
 * />
 */
export const SplitFlap: React.FC<SplitFlapProps> = ({
  text,
  charWidth = 48,
  charHeight = 64,
  flipDuration = 0.08,
  stagger = 0.05,
  delay = 0,
  fontSize = 40,
  fontFamily = "monospace",
  textColor = "#ffffff",
  backgroundColor = "#1a1a1a",
  dividerColor = "#000000",
  gap = 4,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const flipFrames = Math.max(Math.round(flipDuration * fps), 1);
  const staggerFrames = Math.round(stagger * fps);

  const characters = useMemo(() => {
    const upperText = text.toUpperCase();
    return Array.from(upperText).map((targetChar, index) => {
      const charStartFrame = delayFrames + index * staggerFrames;
      const effectiveFrame = frame - charStartFrame;

      const progress = interpolate(effectiveFrame, [0, flipFrames], [0, 1], {
        easing: Easing.out(Easing.quad),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      return resolveCharacter(progress, targetChar);
    });
  }, [frame, text, delayFrames, flipFrames, staggerFrames]);

  const containerStyle: CSSProperties = {
    display: "inline-flex",
    gap,
    perspective: 600,
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {characters.map((char, i) => (
        <FlapCell
          key={i}
          char={char}
          width={charWidth}
          height={charHeight}
          fontSize={fontSize}
          fontFamily={fontFamily}
          textColor={textColor}
          backgroundColor={backgroundColor}
          dividerColor={dividerColor}
        />
      ))}
    </div>
  );
};

export default SplitFlap;
