import React, { useMemo, type CSSProperties } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { type EasingName } from "../../presets/easings";
import { getDuration, type DurationName } from "../../presets/durations";
import { toRemotionEasing } from "../../presets/remotionEasings";

/**
 * Props for the Counter component.
 */
export interface CounterProps {
  /** Starting value */
  from: number;
  /** Ending value */
  to: number;
  /** Animation duration in seconds */
  duration?: number | DurationName;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Number of decimal places */
  decimals?: number;
  /** Text before the number */
  prefix?: string;
  /** Text after the number */
  suffix?: string;
  /** Thousands separator (e.g., ",") */
  separator?: string;
  /** Decimal separator (e.g., ".") */
  decimalSeparator?: string;
  /** Use tabular (fixed-width) numbers */
  tabularNums?: boolean;
  /** Abbreviate large numbers (K, M, B) */
  abbreviate?: boolean;
  /** Easing preset */
  ease?: EasingName | string;
  /** Reserve width for final value to prevent layout shift */
  fixedWidth?: boolean;
  /** Text alignment when using fixedWidth */
  align?: "left" | "center" | "right";
  /** Additional CSS styles */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Format a number with separators.
 */
function formatNumber(
  value: number,
  decimals: number,
  separator: string,
  decimalSeparator: string,
  abbreviate: boolean,
): string {
  if (abbreviate && Math.abs(value) >= 1000) {
    const suffixes = ["", "K", "M", "B", "T"];
    let tier = Math.floor(Math.log10(Math.abs(value)) / 3);
    tier = Math.min(tier, suffixes.length - 1);
    const scaled = value / Math.pow(1000, tier);
    return scaled.toFixed(decimals) + suffixes[tier];
  }

  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");

  // Add thousand separators
  const withSeparators = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return decPart
    ? `${withSeparators}${decimalSeparator}${decPart}`
    : withSeparators;
}

/**
 * Animated number counter with tabular numbers.
 *
 * @example
 * // Basic counter
 * <Counter from={0} to={1000} duration={2} />
 *
 * @example
 * // Currency with formatting
 * <Counter
 *   from={0}
 *   to={99.99}
 *   duration={1.5}
 *   decimals={2}
 *   prefix="$"
 *   separator=","
 * />
 *
 * @example
 * // Percentage
 * <Counter from={0} to={100} suffix="%" ease="smooth" />
 *
 * @example
 * // Large number with abbreviation
 * <Counter from={0} to={1500000} abbreviate decimals={1} />
 */
export const Counter: React.FC<CounterProps> = ({
  from,
  to,
  duration: durationProp = 1,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  decimalSeparator = ".",
  tabularNums = true,
  abbreviate = false,
  ease = "smooth",
  fixedWidth = true,
  align = "right",
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const duration = getDuration(durationProp);
  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.round(duration * fps);

  const easing = toRemotionEasing(ease);

  // Calculate current value
  const currentValue = useMemo(() => {
    const effectiveFrame = frame - delayFrames;

    if (effectiveFrame <= 0) return from;
    if (effectiveFrame >= durationFrames) return to;

    const progress = interpolate(effectiveFrame, [0, durationFrames], [0, 1], {
      easing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return from + (to - from) * progress;
  }, [frame, delayFrames, durationFrames, from, to, easing]);

  // Format the number
  const formattedValue = formatNumber(
    currentValue,
    decimals,
    separator,
    decimalSeparator,
    abbreviate,
  );

  // Calculate final value width for fixed width mode
  const finalFormattedValue = useMemo(() => {
    return formatNumber(to, decimals, separator, decimalSeparator, abbreviate);
  }, [to, decimals, separator, decimalSeparator, abbreviate]);

  const containerStyle: CSSProperties = {
    fontVariantNumeric: tabularNums ? "tabular-nums" : undefined,
    fontFeatureSettings: tabularNums ? '"tnum"' : undefined,
    display: fixedWidth ? "inline-block" : undefined,
    textAlign: fixedWidth ? align : undefined,
    ...style,
  };

  // For fixed width, we render a hidden version with the final value to establish width
  if (fixedWidth) {
    return (
      <span
        className={className}
        style={{ ...containerStyle, position: "relative" }}
      >
        {/* Hidden placeholder to establish width */}
        <span style={{ visibility: "hidden" }}>
          {prefix}
          {finalFormattedValue}
          {suffix}
        </span>
        {/* Actual value positioned absolutely */}
        <span
          style={{
            position: "absolute",
            top: 0,
            left: align === "left" ? 0 : undefined,
            right: align === "right" ? 0 : undefined,
            width: align === "center" ? "100%" : undefined,
            textAlign: align,
          }}
        >
          {prefix}
          {formattedValue}
          {suffix}
        </span>
      </span>
    );
  }

  return (
    <span className={className} style={containerStyle}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

/**
 * Rolling digit counter that animates each digit separately.
 */
export interface RollingCounterProps
  extends Omit<CounterProps, "animation" | "fixedWidth" | "align"> {
  /** Stagger delay between digits in seconds */
  stagger?: number;
}

/**
 * Counter with rolling digit animation.
 *
 * @example
 * <RollingCounter from={0} to={9999} duration={2} stagger={0.1} />
 */
export const RollingCounter: React.FC<RollingCounterProps> = ({
  from,
  to,
  duration: durationProp = 1,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = "",
  tabularNums = true,
  stagger = 0.1,
  ease = "smooth",
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const duration = getDuration(durationProp);
  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.round(duration * fps);
  const staggerFrames = Math.round(stagger * fps);

  const easing = toRemotionEasing(ease);

  // Get the final formatted number
  const finalFormatted = to.toFixed(decimals);

  // Calculate current value with per-digit stagger
  const digits = useMemo(() => {
    const result: string[] = [];
    const fromStr = from.toFixed(decimals).padStart(finalFormatted.length, "0");
    const toStr = to.toFixed(decimals).padStart(finalFormatted.length, "0");

    let digitIndex = 0;
    for (let i = 0; i < toStr.length; i++) {
      const char = toStr[i];

      if (char === "." || char === separator) {
        result.push(char);
        continue;
      }

      // Calculate staggered progress for this digit
      const digitDelay = delayFrames + digitIndex * staggerFrames;
      const effectiveFrame = frame - digitDelay;

      if (effectiveFrame <= 0) {
        result.push(fromStr[i] || "0");
      } else if (effectiveFrame >= durationFrames) {
        result.push(toStr[i]);
      } else {
        const progress = interpolate(
          effectiveFrame,
          [0, durationFrames],
          [0, 1],
          {
            easing,
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const fromDigit = parseInt(fromStr[i] || "0", 10);
        const toDigit = parseInt(toStr[i], 10);
        const currentDigit = Math.round(
          fromDigit + (toDigit - fromDigit) * progress,
        );
        result.push(String(currentDigit));
      }

      digitIndex++;
    }

    return result;
  }, [
    frame,
    from,
    to,
    decimals,
    delayFrames,
    durationFrames,
    staggerFrames,
    easing,
    separator,
    finalFormatted.length,
  ]);

  const containerStyle: CSSProperties = {
    fontVariantNumeric: tabularNums ? "tabular-nums" : undefined,
    fontFeatureSettings: tabularNums ? '"tnum"' : undefined,
    display: "inline-flex",
    ...style,
  };

  return (
    <span className={className} style={containerStyle}>
      {prefix}
      {digits.map((digit, i) => (
        <span key={i}>{digit}</span>
      ))}
      {suffix}
    </span>
  );
};

export default Counter;
