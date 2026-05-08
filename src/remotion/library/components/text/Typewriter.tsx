import React, { useMemo, type CSSProperties } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Props for the Typewriter component.
 */
export interface TypewriterProps {
  /** Text to type out */
  text: string;
  /** Typing speed in seconds per character */
  speed?: number;
  /** Delay before typing starts in seconds */
  delay?: number;
  /** Show blinking cursor */
  cursor?: boolean;
  /** Cursor character */
  cursorChar?: string;
  /** Cursor blink rate in seconds */
  cursorBlinkRate?: number;
  /** Hide cursor after typing is complete */
  hideCursorOnComplete?: boolean;
  /** Additional CSS styles for the container */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
  /** CSS styles for the cursor */
  cursorStyle?: CSSProperties;
}

/**
 * Typewriter animation that reveals text character by character.
 *
 * @example
 * // Basic typewriter
 * <Typewriter text="Hello, World!" speed={0.05} />
 *
 * @example
 * // With cursor
 * <Typewriter
 *   text="Type something..."
 *   speed={0.04}
 *   cursor
 *   cursorChar="|"
 * />
 *
 * @example
 * // Styled typewriter
 * <Typewriter
 *   text="Welcome to the future"
 *   speed={0.06}
 *   delay={0.5}
 *   cursor
 *   style={{ fontSize: '32px', fontFamily: 'monospace' }}
 * />
 */
export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 0.05,
  delay = 0,
  cursor = true,
  cursorChar = "|",
  cursorBlinkRate = 0.5,
  hideCursorOnComplete = false,
  style,
  className,
  cursorStyle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const framesPerChar = Math.round(speed * fps);
  const totalTypingFrames = text.length * framesPerChar;

  // Calculate how many characters to show
  const visibleCharCount = useMemo(() => {
    const effectiveFrame = frame - delayFrames;

    if (effectiveFrame <= 0) return 0;
    if (effectiveFrame >= totalTypingFrames) return text.length;

    // Linear typing (each character takes the same time)
    const progress = effectiveFrame / totalTypingFrames;
    return Math.floor(progress * text.length);
  }, [frame, delayFrames, totalTypingFrames, text.length]);

  // Get visible text
  const visibleText = text.slice(0, visibleCharCount);

  // Is typing complete?
  const isComplete = visibleCharCount >= text.length;

  // Cursor blink state
  const showCursor = useMemo(() => {
    if (!cursor) return false;
    if (hideCursorOnComplete && isComplete) return false;

    const blinkFrames = Math.round(cursorBlinkRate * fps);
    const blinkCycle = Math.floor(frame / blinkFrames);
    return blinkCycle % 2 === 0;
  }, [cursor, hideCursorOnComplete, isComplete, cursorBlinkRate, fps, frame]);

  return (
    <span className={className} style={style}>
      {visibleText}
      {cursor && (
        <span
          style={{
            opacity: showCursor ? 1 : 0,
            ...cursorStyle,
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
};

/**
 * Multi-line typewriter that types multiple lines in sequence.
 */
export interface TypewriterLinesProps {
  /** Array of lines to type */
  lines: string[];
  /** Typing speed in seconds per character */
  speed?: number;
  /** Delay before typing starts in seconds */
  delay?: number;
  /** Delay between lines in seconds */
  lineDelay?: number;
  /** Show blinking cursor */
  cursor?: boolean;
  /** Cursor character */
  cursorChar?: string;
  /** Additional CSS styles for the container */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
  /** Styles for each line */
  lineStyle?: CSSProperties;
}

/**
 * Types multiple lines in sequence.
 *
 * @example
 * <TypewriterLines
 *   lines={[
 *     "First line appears",
 *     "Then the second line",
 *     "Finally, the third"
 *   ]}
 *   speed={0.04}
 *   lineDelay={0.3}
 *   cursor
 * />
 */
export const TypewriterLines: React.FC<TypewriterLinesProps> = ({
  lines,
  speed = 0.05,
  delay = 0,
  lineDelay = 0.5,
  cursor = true,
  cursorChar = "|",
  style,
  className,
  lineStyle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate timing for each line
  const lineTimings = useMemo(() => {
    let currentDelay = delay;
    return lines.map((line) => {
      const lineStart = currentDelay;
      const lineDuration = line.length * speed;
      currentDelay += lineDuration + lineDelay;
      return { start: lineStart, duration: lineDuration, text: line };
    });
  }, [lines, delay, speed, lineDelay]);

  const currentTime = frame / fps;

  return (
    <div
      className={className}
      style={{ ...style, display: "flex", flexDirection: "column" }}
    >
      {lineTimings.map((line, index) => {
        // Calculate if this line should be visible
        const lineProgress = (currentTime - line.start) / line.duration;

        if (lineProgress < 0) {
          // Line hasn't started yet
          return null;
        }

        const charCount = Math.min(
          Math.floor(lineProgress * line.text.length),
          line.text.length,
        );
        const isLastLine = index === lines.length - 1;
        const isLineComplete = charCount >= line.text.length;
        const showLineCursor = cursor && (isLastLine || !isLineComplete);

        // Cursor blink
        const blinkFrames = Math.round(0.5 * fps);
        const blinkCycle = Math.floor(frame / blinkFrames);
        const cursorVisible = blinkCycle % 2 === 0;

        return (
          <div key={index} style={lineStyle}>
            {line.text.slice(0, charCount)}
            {showLineCursor && (
              <span style={{ opacity: cursorVisible ? 1 : 0 }}>
                {cursorChar}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Typewriter;
