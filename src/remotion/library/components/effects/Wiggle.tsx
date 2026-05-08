import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export type WiggleMode = "handheld" | "jitter" | "earthquake" | "subtle";

export interface WiggleProps {
  children: React.ReactNode;
  /** Wiggle preset */
  mode?: WiggleMode;
  /** Intensity multiplier */
  intensity?: number;
  /** Animation speed */
  speed?: number;
  /** Include rotation wiggle */
  rotate?: boolean;
  /** Include scale wiggle */
  scale?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MODE_CONFIG: Record<WiggleMode, { x: number; y: number; rot: number; scl: number; freq: number }> = {
  handheld: { x: 3, y: 2, rot: 0.3, scl: 0.002, freq: 2 },
  jitter: { x: 1.5, y: 1.5, rot: 0.5, scl: 0, freq: 8 },
  earthquake: { x: 12, y: 8, rot: 1.5, scl: 0.01, freq: 15 },
  subtle: { x: 0.5, y: 0.5, rot: 0.1, scl: 0, freq: 1.5 },
};

/**
 * Frame wiggle / shake wrapper.
 * Adds handheld camera feel, jitter, or earthquake shake to children.
 *
 * @example
 * <Wiggle mode="handheld" intensity={1}>
 *   <YourContent />
 * </Wiggle>
 */
export const Wiggle: React.FC<WiggleProps> = ({
  children,
  mode = "handheld",
  intensity = 1,
  speed = 1,
  rotate = true,
  scale = false,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = (frame / fps) * speed;

  const cfg = MODE_CONFIG[mode];

  // Multi-frequency noise for organic motion
  const wx =
    Math.sin(time * cfg.freq * 1.0) * 0.5 +
    Math.sin(time * cfg.freq * 2.3 + 1.2) * 0.3 +
    Math.sin(time * cfg.freq * 4.1 + 3.7) * 0.2;

  const wy =
    Math.cos(time * cfg.freq * 1.1 + 0.5) * 0.5 +
    Math.cos(time * cfg.freq * 2.7 + 2.1) * 0.3 +
    Math.cos(time * cfg.freq * 3.8 + 4.2) * 0.2;

  const wrot =
    Math.sin(time * cfg.freq * 0.8 + 1.7) * 0.6 +
    Math.sin(time * cfg.freq * 1.9 + 3.3) * 0.4;

  const wscl =
    Math.sin(time * cfg.freq * 1.3 + 2.5) * 0.5 +
    Math.sin(time * cfg.freq * 2.1 + 0.8) * 0.5;

  const tx = wx * cfg.x * intensity;
  const ty = wy * cfg.y * intensity;
  const tr = rotate ? wrot * cfg.rot * intensity : 0;
  const ts = scale ? 1 + wscl * cfg.scl * intensity : 1;

  return (
    <div
      className={className}
      style={{
        transform: `translate(${tx}px, ${ty}px) rotate(${tr}deg) scale(${ts})`,
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Wiggle;
