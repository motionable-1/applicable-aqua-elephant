import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type LowerThirdStyle = "minimal" | "boxed" | "accent" | "split" | "gradient";

export interface LowerThirdProps {
  /** Primary title text */
  title: string;
  /** Subtitle / secondary text */
  subtitle?: string;
  /** Visual style preset */
  lowerThirdStyle?: LowerThirdStyle;
  /** Accent / primary color */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Animation in duration in seconds */
  duration?: number;
  /** Delay before animation in seconds */
  delay?: number;
  /** Position from bottom edge in pixels */
  bottom?: number;
  /** Position from left edge in pixels */
  left?: number;
  /** Title font size */
  titleSize?: number;
  /** Subtitle font size */
  subtitleSize?: number;
  /** Font family */
  fontFamily?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated lower third title card.
 * Standard motion graphics element for names, titles, locations.
 *
 * @example
 * <LowerThird title="John Smith" subtitle="CEO & Founder" lowerThirdStyle="accent" color="#FF6B6B" />
 */
export const LowerThird: React.FC<LowerThirdProps> = ({
  title,
  subtitle,
  lowerThirdStyle = "minimal",
  color = "#ffffff",
  backgroundColor = "rgba(0,0,0,0.7)",
  textColor = "#ffffff",
  duration = 0.6,
  delay = 0,
  bottom = 80,
  left = 60,
  titleSize = 28,
  subtitleSize = 16,
  fontFamily = "system-ui, sans-serif",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.max(1, Math.round(duration * fps));

  const slideIn = interpolate(frame - delayFrames, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subtitleDelay = durationFrames * 0.4;
  const subtitleIn = interpolate(
    frame - delayFrames - subtitleDelay,
    [0, durationFrames * 0.6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) },
  );

  const getStyles = () => {
    const base: React.CSSProperties = {
      position: "absolute",
      bottom,
      left,
      fontFamily,
      zIndex: 5,
    };

    switch (lowerThirdStyle) {
      case "minimal":
        return {
          container: {
            ...base,
            opacity: slideIn,
            transform: `translateY(${(1 - slideIn) * 20}px)`,
          },
          title: {
            fontSize: titleSize,
            fontWeight: 700 as const,
            color: textColor,
            lineHeight: 1.2,
          },
          subtitle: {
            fontSize: subtitleSize,
            fontWeight: 400 as const,
            color: `${textColor}99`,
            marginTop: 4,
            opacity: subtitleIn,
          },
          accent: {
            width: 30 * slideIn,
            height: 3,
            backgroundColor: color,
            marginBottom: 8,
          },
        };

      case "boxed":
        return {
          container: {
            ...base,
            clipPath: `inset(0 ${100 - slideIn * 100}% 0 0)`,
          },
          title: {
            fontSize: titleSize,
            fontWeight: 700 as const,
            color: textColor,
            backgroundColor,
            padding: "8px 20px",
            display: "inline-block" as const,
          },
          subtitle: {
            fontSize: subtitleSize,
            fontWeight: 400 as const,
            color: textColor,
            backgroundColor: `${color}CC`,
            padding: "4px 20px",
            display: "inline-block" as const,
            opacity: subtitleIn,
          },
          accent: { display: "none" as const },
        };

      case "accent":
        return {
          container: {
            ...base,
            display: "flex" as const,
            alignItems: "stretch" as const,
            gap: 12,
            opacity: slideIn,
            transform: `translateX(${(1 - slideIn) * -30}px)`,
          },
          title: {
            fontSize: titleSize,
            fontWeight: 700 as const,
            color: textColor,
          },
          subtitle: {
            fontSize: subtitleSize,
            fontWeight: 400 as const,
            color: `${textColor}99`,
            marginTop: 2,
            opacity: subtitleIn,
          },
          accent: {
            width: 4,
            backgroundColor: color,
            borderRadius: 2,
            alignSelf: "stretch" as const,
            flexShrink: 0,
          },
        };

      case "split":
        return {
          container: {
            ...base,
            display: "flex" as const,
            alignItems: "center" as const,
            gap: 16,
            opacity: slideIn,
          },
          title: {
            fontSize: titleSize,
            fontWeight: 700 as const,
            color: textColor,
            backgroundColor: color,
            padding: "6px 16px",
          },
          subtitle: {
            fontSize: subtitleSize,
            fontWeight: 500 as const,
            color: textColor,
            opacity: subtitleIn,
          },
          accent: { display: "none" as const },
        };

      case "gradient":
        return {
          container: {
            ...base,
            background: `linear-gradient(90deg, ${backgroundColor}, transparent)`,
            padding: "12px 40px 12px 20px",
            borderLeft: `4px solid ${color}`,
            opacity: slideIn,
            transform: `translateX(${(1 - slideIn) * -40}px)`,
          },
          title: {
            fontSize: titleSize,
            fontWeight: 700 as const,
            color: textColor,
          },
          subtitle: {
            fontSize: subtitleSize,
            fontWeight: 400 as const,
            color: `${textColor}BB`,
            marginTop: 2,
            opacity: subtitleIn,
          },
          accent: { display: "none" as const },
        };
    }
  };

  const s = getStyles();

  return (
    <div className={className} style={{ ...s.container, ...style }}>
      <div style={s.accent} />
      <div>
        <div style={s.title}>{title}</div>
        {subtitle && <div style={s.subtitle}>{subtitle}</div>}
      </div>
    </div>
  );
};

export default LowerThird;
