import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type CountdownStyle = "flip" | "slide" | "fade" | "minimal";

export interface CountdownTimerProps {
  /** Start value (counts down to 0) */
  from?: number;
  /** Countdown style */
  countdownStyle?: CountdownStyle;
  /** Font size */
  fontSize?: number;
  /** Text color */
  color?: string;
  /** Background color (for flip/slide styles) */
  backgroundColor?: string;
  /** Accent color */
  accentColor?: string;
  /** Show "GO" at the end */
  showGo?: boolean;
  /** Font family */
  fontFamily?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated countdown timer.
 * Staple motion graphics element for intros and transitions.
 *
 * @example
 * <CountdownTimer from={5} countdownStyle="flip" />
 */
export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  from = 3,
  countdownStyle = "fade",
  fontSize = 120,
  color = "#ffffff",
  backgroundColor = "rgba(0,0,0,0.6)",
  accentColor = "#FF6B6B",
  showGo = true,
  fontFamily = "system-ui, sans-serif",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Each number gets 1 second
  const totalDuration = from + (showGo ? 1 : 0);
  const currentSecond = Math.floor(time);
  const fractional = time - currentSecond;

  // Current display number
  const displayNumber = from - currentSecond;
  const isGo = showGo && displayNumber <= 0;
  const isFinished = time >= totalDuration;

  if (isFinished) return null;

  const displayText = isGo ? "GO" : String(Math.max(0, displayNumber));

  const getAnimation = (): React.CSSProperties => {
    switch (countdownStyle) {
      case "flip": {
        const rotateX = interpolate(fractional, [0, 0.15], [90, 0], {
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.back(1.2)),
        });
        const exitRotate = interpolate(fractional, [0.8, 1], [0, -90], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const rot = fractional < 0.5 ? rotateX : exitRotate;
        return {
          transform: `perspective(400px) rotateX(${rot}deg)`,
          backfaceVisibility: "hidden",
        };
      }
      case "slide": {
        const enterY = interpolate(fractional, [0, 0.15], [100, 0], {
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        const exitY = interpolate(fractional, [0.8, 1], [0, -100], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = fractional < 0.5 ? enterY : exitY;
        return { transform: `translateY(${y}%)` };
      }
      case "fade": {
        const enterOpacity = interpolate(fractional, [0, 0.1], [0, 1], {
          extrapolateRight: "clamp",
        });
        const exitOpacity = interpolate(fractional, [0.7, 1], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const enterScale = interpolate(fractional, [0, 0.15], [1.5, 1], {
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        return {
          opacity: Math.min(enterOpacity, exitOpacity),
          transform: `scale(${enterScale})`,
        };
      }
      case "minimal": {
        const opacity = interpolate(fractional, [0, 0.05, 0.8, 1], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return { opacity };
      }
    }
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {(countdownStyle === "flip" || countdownStyle === "slide") && (
        <div
          style={{
            backgroundColor,
            borderRadius: fontSize * 0.15,
            padding: `${fontSize * 0.2}px ${fontSize * 0.4}px`,
            overflow: "hidden",
          }}
        >
          <div style={getAnimation()}>
            <span
              style={{
                fontSize,
                fontWeight: 900,
                color: isGo ? accentColor : color,
                fontFamily,
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
                display: "block",
              }}
            >
              {displayText}
            </span>
          </div>
        </div>
      )}

      {(countdownStyle === "fade" || countdownStyle === "minimal") && (
        <div style={getAnimation()}>
          <span
            style={{
              fontSize,
              fontWeight: 900,
              color: isGo ? accentColor : color,
              fontFamily,
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
            }}
          >
            {displayText}
          </span>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
