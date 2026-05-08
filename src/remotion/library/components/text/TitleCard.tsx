import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type TitleCardStyle =
  | "minimal"
  | "bold"
  | "cinematic"
  | "editorial"
  | "stacked"
  | "reveal";

export interface TitleCardProps {
  /** Main title text */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Animation style preset */
  titleStyle?: TitleCardStyle;
  /** Entrance animation duration in seconds */
  duration?: number;
  /** Delay before animation in seconds */
  delay?: number;
  /** Title font size in pixels */
  titleFontSize?: number;
  /** Subtitle font size in pixels */
  subtitleFontSize?: number;
  /** Title text color */
  titleColor?: string;
  /** Subtitle text color */
  subtitleColor?: string;
  /** Accent line/element color */
  accentColor?: string;
  /** Font family */
  fontFamily?: string;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/** Clamped interpolation helper to reduce boilerplate. */
function clampedInterpolate(
  input: number,
  inputRange: [number, number],
  outputRange: [number, number],
  easing?: (t: number) => number,
): number {
  return interpolate(input, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

// ---------------------------------------------------------------------------
// Style renderers
// ---------------------------------------------------------------------------

function renderMinimal(
  title: string,
  subtitle: string | undefined,
  progress: number,
  subtitleProgress: number,
  props: Required<
    Pick<
      TitleCardProps,
      | "titleFontSize"
      | "subtitleFontSize"
      | "titleColor"
      | "subtitleColor"
      | "fontFamily"
      | "align"
    >
  >,
): React.ReactNode {
  const titleOpacity = clampedInterpolate(progress, [0, 0.6], [0, 1], Easing.out(Easing.cubic));
  const titleY = clampedInterpolate(progress, [0, 0.6], [20, 0], Easing.out(Easing.cubic));
  const subOpacity = clampedInterpolate(subtitleProgress, [0, 1], [0, 1], Easing.out(Easing.quad));
  const subY = clampedInterpolate(subtitleProgress, [0, 1], [10, 0], Easing.out(Easing.quad));

  return (
    <>
      <div
        style={{
          fontSize: props.titleFontSize,
          fontWeight: 700,
          color: props.titleColor,
          fontFamily: props.fontFamily,
          textAlign: props.align,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: props.subtitleFontSize,
            fontWeight: 400,
            color: props.subtitleColor,
            fontFamily: props.fontFamily,
            textAlign: props.align,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            marginTop: 12,
          }}
        >
          {subtitle}
        </div>
      )}
    </>
  );
}

function renderBold(
  title: string,
  subtitle: string | undefined,
  progress: number,
  subtitleProgress: number,
  props: Required<
    Pick<
      TitleCardProps,
      | "titleFontSize"
      | "subtitleFontSize"
      | "titleColor"
      | "subtitleColor"
      | "fontFamily"
      | "align"
    >
  >,
): React.ReactNode {
  const scale = clampedInterpolate(progress, [0, 0.7], [1.2, 1], Easing.out(Easing.cubic));
  const clipInset = clampedInterpolate(progress, [0, 0.7], [50, 0], Easing.out(Easing.cubic));
  const subSlide = clampedInterpolate(subtitleProgress, [0, 1], [40, 0], Easing.out(Easing.cubic));
  const subOpacity = clampedInterpolate(subtitleProgress, [0, 1], [0, 1], Easing.out(Easing.quad));

  return (
    <>
      <div
        style={{
          fontSize: props.titleFontSize,
          fontWeight: 900,
          color: props.titleColor,
          fontFamily: props.fontFamily,
          textAlign: props.align,
          transform: `scale(${scale})`,
          clipPath: `inset(${clipInset}% ${clipInset}% ${clipInset}% ${clipInset}%)`,
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: props.subtitleFontSize,
            fontWeight: 400,
            color: props.subtitleColor,
            fontFamily: props.fontFamily,
            textAlign: props.align,
            opacity: subOpacity,
            transform: `translateX(${subSlide}px)`,
            marginTop: 16,
          }}
        >
          {subtitle}
        </div>
      )}
    </>
  );
}

function renderCinematic(
  title: string,
  subtitle: string | undefined,
  progress: number,
  subtitleProgress: number,
  props: Required<
    Pick<
      TitleCardProps,
      | "titleFontSize"
      | "subtitleFontSize"
      | "titleColor"
      | "subtitleColor"
      | "accentColor"
      | "fontFamily"
      | "align"
    >
  >,
): React.ReactNode {
  const lineWidth = clampedInterpolate(progress, [0, 0.3], [0, 100], Easing.out(Easing.cubic));
  const titleClip = clampedInterpolate(progress, [0.15, 0.85], [100, 0], Easing.out(Easing.cubic));
  const subOpacity = clampedInterpolate(subtitleProgress, [0, 1], [0, 1], Easing.out(Easing.quad));

  return (
    <>
      <div
        style={{
          width: `${lineWidth}%`,
          height: 2,
          backgroundColor: props.accentColor,
          marginBottom: 16,
          marginLeft: props.align === "center" ? "auto" : props.align === "right" ? "auto" : 0,
          marginRight: props.align === "center" ? "auto" : props.align === "left" ? "auto" : 0,
          maxWidth: 120,
        }}
      />
      <div
        style={{
          fontSize: props.titleFontSize,
          fontWeight: 700,
          color: props.titleColor,
          fontFamily: props.fontFamily,
          textAlign: props.align,
          textTransform: "uppercase" as const,
          letterSpacing: "0.05em",
          clipPath: `inset(0 ${titleClip}% 0 0)`,
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: props.subtitleFontSize,
            fontWeight: 300,
            color: props.subtitleColor,
            fontFamily: props.fontFamily,
            textAlign: props.align,
            letterSpacing: "0.1em",
            opacity: subOpacity,
            marginTop: 14,
          }}
        >
          {subtitle}
        </div>
      )}
    </>
  );
}

function renderEditorial(
  title: string,
  subtitle: string | undefined,
  progress: number,
  subtitleProgress: number,
  props: Required<
    Pick<
      TitleCardProps,
      | "titleFontSize"
      | "subtitleFontSize"
      | "titleColor"
      | "subtitleColor"
      | "accentColor"
      | "fontFamily"
      | "align"
    >
  >,
): React.ReactNode {
  const lineSlide = clampedInterpolate(progress, [0, 0.35], [0, 1], Easing.out(Easing.cubic));
  const words = title.split(" ");
  const wordCount = words.length;
  const subSlideY = clampedInterpolate(subtitleProgress, [0, 1], [16, 0], Easing.out(Easing.cubic));
  const subOpacity = clampedInterpolate(subtitleProgress, [0, 1], [0, 1], Easing.out(Easing.quad));

  return (
    <>
      <div
        style={{
          width: 40 * lineSlide,
          height: 3,
          backgroundColor: props.accentColor,
          marginBottom: 14,
          marginLeft: props.align === "right" ? "auto" : 0,
          marginRight: props.align === "left" ? "auto" : 0,
        }}
      />
      <div
        style={{
          fontSize: props.titleFontSize,
          fontWeight: 700,
          color: props.titleColor,
          fontFamily: props.fontFamily,
          textAlign: props.align,
          lineHeight: 1.15,
          display: "flex",
          flexWrap: "wrap" as const,
          gap: "0 0.3em",
          justifyContent:
            props.align === "center"
              ? "center"
              : props.align === "right"
                ? "flex-end"
                : "flex-start",
        }}
      >
        {words.map((word, i) => {
          const wordStart = 0.2 + (i / wordCount) * 0.5;
          const wordEnd = wordStart + 0.3;
          const clipRight = clampedInterpolate(
            progress,
            [wordStart, wordEnd],
            [100, 0],
            Easing.out(Easing.cubic),
          );
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                clipPath: `inset(0 ${clipRight}% 0 0)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: props.subtitleFontSize,
            fontWeight: 400,
            color: props.subtitleColor,
            fontFamily: props.fontFamily,
            textAlign: props.align,
            opacity: subOpacity,
            transform: `translateY(${subSlideY}px)`,
            marginTop: 12,
          }}
        >
          {subtitle}
        </div>
      )}
    </>
  );
}

function renderStacked(
  title: string,
  subtitle: string | undefined,
  progress: number,
  subtitleProgress: number,
  props: Required<
    Pick<
      TitleCardProps,
      | "titleFontSize"
      | "subtitleFontSize"
      | "titleColor"
      | "subtitleColor"
      | "fontFamily"
      | "align"
    >
  >,
): React.ReactNode {
  const letters = title.split("");
  const letterCount = letters.length;
  const subSlide = clampedInterpolate(subtitleProgress, [0, 1], [20, 0], Easing.out(Easing.cubic));
  const subOpacity = clampedInterpolate(subtitleProgress, [0, 1], [0, 1], Easing.out(Easing.quad));

  return (
    <>
      <div
        style={{
          fontSize: props.titleFontSize,
          fontWeight: 800,
          color: props.titleColor,
          fontFamily: props.fontFamily,
          textAlign: props.align,
          lineHeight: 1.15,
          display: "flex",
          justifyContent:
            props.align === "center"
              ? "center"
              : props.align === "right"
                ? "flex-end"
                : "flex-start",
          overflow: "hidden",
        }}
      >
        {letters.map((letter, i) => {
          const staggerOffset = i / letterCount;
          const letterStart = staggerOffset * 0.5;
          const letterEnd = letterStart + 0.5;
          const y = clampedInterpolate(
            progress,
            [letterStart, letterEnd],
            [110, 0],
            Easing.out(Easing.cubic),
          );
          const rotation = clampedInterpolate(
            progress,
            [letterStart, letterEnd],
            [8, 0],
            Easing.out(Easing.cubic),
          );
          const opacity = clampedInterpolate(
            progress,
            [letterStart, letterEnd],
            [0, 1],
            Easing.out(Easing.quad),
          );
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                transform: `translateY(${y}%) rotate(${rotation}deg)`,
                opacity,
                whiteSpace: letter === " " ? "pre" : undefined,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: props.subtitleFontSize,
            fontWeight: 400,
            color: props.subtitleColor,
            fontFamily: props.fontFamily,
            textAlign: props.align,
            opacity: subOpacity,
            transform: `translateY(${subSlide}px)`,
            marginTop: 14,
          }}
        >
          {subtitle}
        </div>
      )}
    </>
  );
}

function renderReveal(
  title: string,
  subtitle: string | undefined,
  progress: number,
  props: Required<
    Pick<
      TitleCardProps,
      | "titleFontSize"
      | "subtitleFontSize"
      | "titleColor"
      | "subtitleColor"
      | "accentColor"
      | "fontFamily"
      | "align"
    >
  >,
): React.ReactNode {
  // Phase 1 (0-0.45): accent rect wipes in from left
  const rectLeft = clampedInterpolate(progress, [0, 0.45], [100, 0], Easing.inOut(Easing.cubic));
  // Phase 2 (0.35-0.55): title text revealed behind rect
  const titleClip = clampedInterpolate(
    progress,
    [0.35, 0.55],
    [100, 0],
    Easing.out(Easing.cubic),
  );
  // Phase 3 (0.5-0.9): accent rect wipes away to the right
  const rectRight = clampedInterpolate(progress, [0.5, 0.9], [0, 100], Easing.inOut(Easing.cubic));
  // Phase 4 (0.7-1.0): subtitle fades in
  const subOpacity = clampedInterpolate(progress, [0.7, 1], [0, 1], Easing.out(Easing.quad));
  const subY = clampedInterpolate(progress, [0.7, 1], [8, 0], Easing.out(Easing.quad));

  return (
    <div style={{ position: "relative" }}>
      {/* Accent wipe rectangle */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: `${props.titleFontSize * 1.3}px`,
          backgroundColor: props.accentColor,
          clipPath: `inset(0 ${rectLeft}% 0 ${rectRight}%)`,
          zIndex: 1,
        }}
      />
      {/* Title text */}
      <div
        style={{
          fontSize: props.titleFontSize,
          fontWeight: 800,
          color: props.titleColor,
          fontFamily: props.fontFamily,
          textAlign: props.align,
          clipPath: `inset(0 ${titleClip}% 0 0)`,
          lineHeight: 1.3,
          position: "relative",
          zIndex: 0,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: props.subtitleFontSize,
            fontWeight: 400,
            color: props.subtitleColor,
            fontFamily: props.fontFamily,
            textAlign: props.align,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            marginTop: 14,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * Professional title card animation component with multiple distinct styles.
 * Each style uses clip-path, transform, and opacity animations driven by
 * Remotion's deterministic `interpolate`.
 *
 * @example
 * <TitleCard title="CHAPTER ONE" subtitle="The Beginning" titleStyle="cinematic" accentColor="#E63946" />
 */
export const TitleCard: React.FC<TitleCardProps> = ({
  title,
  subtitle,
  titleStyle = "minimal",
  duration = 0.8,
  delay = 0,
  titleFontSize = 72,
  subtitleFontSize = 24,
  titleColor = "#ffffff",
  subtitleColor = "#ffffff99",
  accentColor = "#FF6B6B",
  fontFamily = "system-ui",
  align = "center",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.max(1, Math.round(duration * fps));

  // Normalised overall progress [0..1]
  const progress = clampedInterpolate(
    frame - delayFrames,
    [0, durationFrames],
    [0, 1],
  );

  // Subtitle begins at 75% of the main duration window
  const subtitleDelay = durationFrames * 0.75;
  const subtitleProgress = clampedInterpolate(
    frame - delayFrames - subtitleDelay,
    [0, durationFrames * 0.35],
    [0, 1],
  );

  const sharedProps = {
    titleFontSize,
    subtitleFontSize,
    titleColor,
    subtitleColor,
    accentColor,
    fontFamily,
    align: align as "left" | "center" | "right",
  };

  const renderContent = (): React.ReactNode => {
    switch (titleStyle) {
      case "minimal":
        return renderMinimal(title, subtitle, progress, subtitleProgress, sharedProps);
      case "bold":
        return renderBold(title, subtitle, progress, subtitleProgress, sharedProps);
      case "cinematic":
        return renderCinematic(title, subtitle, progress, subtitleProgress, sharedProps);
      case "editorial":
        return renderEditorial(title, subtitle, progress, subtitleProgress, sharedProps);
      case "stacked":
        return renderStacked(title, subtitle, progress, subtitleProgress, sharedProps);
      case "reveal":
        // Reveal manages its own subtitle timing via the overall progress
        return renderReveal(title, subtitle, progress, sharedProps);
      default:
        return renderMinimal(title, subtitle, progress, subtitleProgress, sharedProps);
    }
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:
          align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        ...style,
      }}
    >
      {renderContent()}
    </div>
  );
};

export default TitleCard;
