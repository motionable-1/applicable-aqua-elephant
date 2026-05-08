import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type LogoRevealStyle = "scale" | "blur" | "glow" | "wipe" | "bounce" | "elastic";

export interface LogoRevealProps {
  children: React.ReactNode;
  /** Reveal animation style */
  revealStyle?: LogoRevealStyle;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Glow color (for glow style) */
  glowColor?: string;
  /** Glow intensity */
  glowIntensity?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Logo reveal animation wrapper.
 * Massive category in motion graphics — animates any content with pro entrance effects.
 *
 * @example
 * <LogoReveal revealStyle="glow" glowColor="#FFD700" duration={1.2}>
 *   <img src="logo.svg" />
 * </LogoReveal>
 */
export const LogoReveal: React.FC<LogoRevealProps> = ({
  children,
  revealStyle = "scale",
  duration = 1,
  delay = 0,
  glowColor = "#ffffff",
  glowIntensity = 1,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.max(1, Math.round(duration * fps));
  const f = frame - delayFrames;

  const progress = interpolate(f, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const getRevealStyles = (): React.CSSProperties => {
    switch (revealStyle) {
      case "scale": {
        const scale = interpolate(f, [0, durationFrames], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.back(1.4)),
        });
        return {
          opacity: Math.min(1, progress * 3),
          transform: `scale(${scale})`,
        };
      }

      case "blur": {
        const blur = interpolate(f, [0, durationFrames], [30, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        const scale = interpolate(f, [0, durationFrames], [0.8, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return {
          opacity: progress,
          filter: `blur(${blur}px)`,
          transform: `scale(${scale})`,
        };
      }

      case "glow": {
        const glowBlur = interpolate(f, [0, durationFrames * 0.5, durationFrames], [0, 40 * glowIntensity, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const scale = interpolate(f, [0, durationFrames], [0.9, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        return {
          opacity: progress,
          filter: `drop-shadow(0 0 ${glowBlur}px ${glowColor})`,
          transform: `scale(${scale})`,
        };
      }

      case "wipe":
        return {
          clipPath: `inset(0 ${100 - progress * 100}% 0 0)`,
        };

      case "bounce": {
        const scale = interpolate(
          f,
          [0, durationFrames * 0.4, durationFrames * 0.6, durationFrames * 0.8, durationFrames],
          [0, 1.2, 0.9, 1.05, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return {
          opacity: Math.min(1, progress * 4),
          transform: `scale(${scale})`,
        };
      }

      case "elastic": {
        const scale = interpolate(
          f,
          [0, durationFrames * 0.3, durationFrames * 0.5, durationFrames * 0.7, durationFrames * 0.85, durationFrames],
          [0, 1.3, 0.85, 1.1, 0.95, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return {
          opacity: Math.min(1, progress * 5),
          transform: `scale(${scale})`,
        };
      }
    }
  };

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...getRevealStyles(),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default LogoReveal;
