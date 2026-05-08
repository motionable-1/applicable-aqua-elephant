import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export interface TickerProps {
  /** Text items to scroll */
  items: string[];
  /** Scroll direction */
  direction?: "left" | "right" | "up" | "down";
  /** Scroll speed in pixels per second */
  speed?: number;
  /** Gap between items in pixels */
  gap?: number;
  /** Font size in pixels */
  fontSize?: number;
  /** Font family */
  fontFamily?: string;
  /** Text color */
  color?: string;
  /** Font weight */
  fontWeight?: number;
  /** Optional separator rendered between items (e.g. "•", "|") */
  separator?: string;
  /** Separator color, defaults to `color` */
  separatorColor?: string;
  /** Apply a fade mask at the leading/trailing edges */
  fadeEdges?: boolean;
  /** Size of the edge fade in pixels */
  fadeSize?: number;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles applied to the outer container */
  style?: React.CSSProperties;
}

/**
 * Scrolling text marquee / ticker.
 * Ideal for news tickers, social media feeds, and corporate lower-thirds.
 *
 * Items are repeated enough times to guarantee a seamless infinite-scroll
 * illusion. Translation is derived purely from the current frame and fps,
 * keeping the output fully deterministic.
 *
 * @example
 * <Ticker items={["Breaking News", "Markets Up 2%", "Weather: Sunny"]} speed={150} />
 *
 * @example
 * <Ticker
 *   items={["One", "Two", "Three"]}
 *   direction="up"
 *   separator="•"
 *   fadeEdges
 * />
 */
export const Ticker: React.FC<TickerProps> = ({
  items,
  direction = "left",
  speed = 100,
  gap = 60,
  fontSize = 24,
  fontFamily = "system-ui",
  color = "#ffffff",
  fontWeight = 700,
  separator,
  separatorColor,
  fadeEdges = true,
  fadeSize = 60,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const isHorizontal = direction === "left" || direction === "right";
  const isReversed = direction === "right" || direction === "down";

  // The viewport extent along the scrolling axis.
  const viewportSize = isHorizontal ? width : height;

  /**
   * Estimate the pixel length of a single cycle of all items (including gaps
   * and optional separators). For horizontal tickers we approximate character
   * width at 0.6 * fontSize; for vertical tickers each item occupies one
   * line-height worth of space.
   */
  const singleCycleLength = useMemo(() => {
    if (isHorizontal) {
      // Approximate total text width using a conservative character-width
      // multiplier. This does NOT need to be pixel-perfect — we only use it
      // to decide how many repetitions are necessary.
      const charWidth = fontSize * 0.6;
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        total += items[i].length * charWidth;
        // Add gap (and separator width if present)
        if (separator) {
          total += gap + separator.length * charWidth + gap;
        } else {
          total += gap;
        }
      }
      return total;
    } else {
      // Vertical: each item occupies lineHeight, plus gap
      const lineHeight = fontSize * 1.4;
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        total += lineHeight;
        if (separator) {
          total += gap + lineHeight + gap;
        } else {
          total += gap;
        }
      }
      return total;
    }
  }, [items, fontSize, gap, separator, isHorizontal]);

  // How many full copies we need so there's always content visible.
  // We want at least 3x the viewport to be safe (covers enter + visible + exit).
  const repetitions = useMemo(() => {
    if (singleCycleLength <= 0) return 3;
    return Math.max(3, Math.ceil((viewportSize * 3) / singleCycleLength) + 1);
  }, [singleCycleLength, viewportSize]);

  // Continuous offset in pixels, derived from frame.
  // We modulo by singleCycleLength so the strip loops seamlessly.
  const rawOffset = (frame / fps) * speed;
  const offset =
    singleCycleLength > 0
      ? rawOffset % singleCycleLength
      : rawOffset;

  const signedOffset = isReversed ? offset : -offset;

  // Build the repeated item elements once.
  const renderedItems = useMemo(() => {
    const elements: React.ReactNode[] = [];
    for (let rep = 0; rep < repetitions; rep++) {
      for (let i = 0; i < items.length; i++) {
        const key = `${rep}-${i}`;

        elements.push(
          <span
            key={`item-${key}`}
            style={{
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {items[i]}
          </span>,
        );

        // Separator or gap
        if (separator) {
          elements.push(
            <span
              key={`sep-${key}`}
              aria-hidden
              style={{
                whiteSpace: "nowrap",
                flexShrink: 0,
                color: separatorColor ?? color,
                padding: isHorizontal
                  ? `0 ${gap}px`
                  : `${gap}px 0`,
              }}
            >
              {separator}
            </span>,
          );
        } else {
          elements.push(
            <span
              key={`gap-${key}`}
              aria-hidden
              style={{
                flexShrink: 0,
                width: isHorizontal ? gap : undefined,
                height: isHorizontal ? undefined : gap,
                display: isHorizontal ? "inline-block" : "block",
              }}
            />,
          );
        }
      }
    }
    return elements;
  }, [items, repetitions, separator, separatorColor, color, gap, isHorizontal]);

  // Edge-fade mask using CSS mask-image.
  const maskStyle: React.CSSProperties = fadeEdges
    ? {
        WebkitMaskImage: isHorizontal
          ? `linear-gradient(to right, transparent, black ${fadeSize}px, black calc(100% - ${fadeSize}px), transparent)`
          : `linear-gradient(to bottom, transparent, black ${fadeSize}px, black calc(100% - ${fadeSize}px), transparent)`,
        maskImage: isHorizontal
          ? `linear-gradient(to right, transparent, black ${fadeSize}px, black calc(100% - ${fadeSize}px), transparent)`
          : `linear-gradient(to bottom, transparent, black ${fadeSize}px, black calc(100% - ${fadeSize}px), transparent)`,
      }
    : {};

  const transformValue = isHorizontal
    ? `translateX(${signedOffset}px)`
    : `translateY(${signedOffset}px)`;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...maskStyle,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isHorizontal ? "row" : "column",
          alignItems: isHorizontal ? "center" : "flex-start",
          justifyContent: isHorizontal ? "flex-start" : "flex-start",
          width: isHorizontal ? "max-content" : "100%",
          height: isHorizontal ? "100%" : "max-content",
          transform: transformValue,
          willChange: "transform",
          fontSize,
          fontFamily,
          fontWeight,
          color,
          lineHeight: 1.4,
        }}
      >
        {renderedItems}
      </div>
    </div>
  );
};

export default Ticker;
