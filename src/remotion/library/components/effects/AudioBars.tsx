import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, random } from "remotion";

export type AudioBarsLayout = "bars" | "wave" | "mirror";

export interface AudioBarsProps {
  /** Number of bars/segments */
  count?: number;
  /** Layout style */
  layout?: AudioBarsLayout;
  /** Width of the visualizer */
  width?: number;
  /** Height of the visualizer */
  height?: number;
  /** Bar color */
  color?: string;
  /** Optional gradient end color */
  colorEnd?: string;
  /** Animation speed multiplier */
  speed?: number;
  /** Gap between bars in px */
  gap?: number;
  /** Round bar caps */
  rounded?: boolean;
  /** Minimum bar height fraction (0-1) */
  minHeight?: number;
  /** Smoothing factor (0 = jagged, 1 = very smooth) */
  smoothing?: number;
  /** Random seed for deterministic animation */
  seed?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Audio visualizer bars — simulated frequency spectrum.
 * Deterministic animation derived from frame number.
 *
 * @example
 * <AudioBars count={32} color="#FF6B6B" colorEnd="#4ECDC4" layout="mirror" />
 */
export const AudioBars: React.FC<AudioBarsProps> = ({
  count = 24,
  layout = "bars",
  width = 400,
  height = 200,
  color = "#ffffff",
  colorEnd,
  speed = 1,
  gap = 2,
  rounded = true,
  minHeight = 0.05,
  smoothing = 0.5,
  seed = "audiobars",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = (frame / fps) * speed;

  // Pre-compute per-bar frequency and phase for deterministic animation
  const barConfig = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      freq1: 0.8 + random(`${seed}-f1-${i}`) * 3,
      freq2: 1.5 + random(`${seed}-f2-${i}`) * 4,
      freq3: 0.3 + random(`${seed}-f3-${i}`) * 1.5,
      phase1: random(`${seed}-p1-${i}`) * Math.PI * 2,
      phase2: random(`${seed}-p2-${i}`) * Math.PI * 2,
      phase3: random(`${seed}-p3-${i}`) * Math.PI * 2,
      amp1: 0.3 + random(`${seed}-a1-${i}`) * 0.7,
      amp2: 0.1 + random(`${seed}-a2-${i}`) * 0.3,
      amp3: 0.05 + random(`${seed}-a3-${i}`) * 0.15,
    }));
  }, [count, seed]);

  const barWidth = (width - gap * (count - 1)) / count;

  // Compute bar heights
  const barHeights = barConfig.map((cfg) => {
    const raw =
      cfg.amp1 * (0.5 + 0.5 * Math.sin(time * cfg.freq1 + cfg.phase1)) +
      cfg.amp2 * (0.5 + 0.5 * Math.sin(time * cfg.freq2 + cfg.phase2)) +
      cfg.amp3 * (0.5 + 0.5 * Math.sin(time * cfg.freq3 + cfg.phase3));
    return Math.max(minHeight, Math.min(1, raw));
  });

  // Apply smoothing between neighbors
  const smoothed = barHeights.map((h, i) => {
    if (smoothing <= 0) return h;
    const prev = barHeights[Math.max(0, i - 1)];
    const next = barHeights[Math.min(barHeights.length - 1, i + 1)];
    const avg = (prev + h + next) / 3;
    return h * (1 - smoothing) + avg * smoothing;
  });

  const getBarGradient = () => {
    if (!colorEnd) return color;
    return `linear-gradient(to top, ${color}, ${colorEnd})`;
  };

  const renderBars = (heights: number[], yOrigin: "bottom" | "center") => {
    return heights.map((h, i) => {
      const barH = h * (yOrigin === "center" ? height / 2 : height);
      const x = i * (barWidth + gap);
      const y = yOrigin === "center" ? height / 2 - barH : height - barH;

      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: barWidth,
            height: barH,
            background: getBarGradient(),
            borderRadius: rounded ? barWidth / 2 : 0,
          }}
        />
      );
    });
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        ...style,
      }}
    >
      {layout === "bars" && renderBars(smoothed, "bottom")}
      {layout === "wave" && renderBars(smoothed, "bottom")}
      {layout === "mirror" && (
        <>
          {renderBars(smoothed, "center")}
          {smoothed.map((h, i) => {
            const barH = h * (height / 2);
            const x = i * (barWidth + gap);
            return (
              <div
                key={`m-${i}`}
                style={{
                  position: "absolute",
                  left: x,
                  top: height / 2,
                  width: barWidth,
                  height: barH,
                  background: getBarGradient(),
                  borderRadius: rounded ? barWidth / 2 : 0,
                  opacity: 0.6,
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default AudioBars;
