import React, { useMemo, type CSSProperties, type ReactNode } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Deterministic pseudo-random based on frame number.
 * Produces consistent output across renders for the same frame.
 */
function seededRandom(frame: number, seed: number = 0): number {
  const x = Math.sin((frame + seed) * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export interface NeonProps {
  children: ReactNode;
  /** Neon color */
  color?: string;
  /** Glow intensity (blur radius) */
  glow?: number;
  /** Flicker intensity (0-1, 0 = no flicker) */
  flicker?: number;
  /** Flicker speed multiplier */
  flickerSpeed?: number;
  /** Inner color (usually white or lighter version of color) */
  innerColor?: string;
  /** Border width (if outlining box) */
  borderWidth?: number;
  /** Border radius */
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Neon glow effect container.
 * Adds a realistic neon glow with optional flickering.
 *
 * @example
 * <Neon color="#ff0055" glow={20}>
 *   <Text>OPEN</Text>
 * </Neon>
 *
 * @example
 * // Flickering neon sign
 * <Neon color="#00ff00" glow={25} flicker={0.15} flickerSpeed={2}>
 *   <Text>OPEN</Text>
 * </Neon>
 */
export const Neon: React.FC<NeonProps> = ({
  children,
  color = "#00ff00",
  glow = 15,
  flicker = 0.05,
  flickerSpeed = 1,
  innerColor = "#ffffff",
  borderWidth = 0,
  borderRadius = 0,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Deterministic flicker: combines slow sine wave with frame-seeded noise
  // for a realistic neon tube effect (stable glow with occasional dropouts)
  const flickerOp = useMemo(() => {
    if (flicker <= 0) return 1;

    const time = frame / fps;
    // Base oscillation (slow warm hum of the tube)
    const baseOsc = Math.sin(time * flickerSpeed * 4) * 0.3 + 0.7;
    // Rapid micro-flicker (electrical noise)
    const microFlicker = seededRandom(frame, 1) * 0.4 + 0.6;
    // Occasional dropout (neon tube momentary loss)
    const dropout = seededRandom(frame, 2) > 0.97 ? 0.3 : 1;

    const combined = baseOsc * microFlicker * dropout;
    // Scale by flicker intensity: 0 = fully stable, 1 = heavy flicker
    return 1 - flicker * (1 - combined);
  }, [frame, fps, flicker, flickerSpeed]);

  const shadow = `
    0 0 ${glow * 0.2}px ${color},
    0 0 ${glow * 0.5}px ${color},
    0 0 ${glow}px ${color},
    0 0 ${glow * 2}px ${color},
    0 0 ${glow * 4}px ${color}
  `;

  const textShadow = `
    0 0 ${glow * 0.1}px ${innerColor},
    0 0 ${glow * 0.3}px ${color},
    0 0 ${glow * 0.6}px ${color},
    0 0 ${glow}px ${color}
  `;

  // Determine if we applying to text or box based on border
  const isBox = borderWidth > 0;

  return (
    <div
      className={className}
      style={{
        display: "inline-block",
        position: "relative",
        opacity: flickerOp,
        color: innerColor,
        textShadow: !isBox ? textShadow : undefined,
        boxShadow: isBox ? shadow : undefined,
        border: isBox ? `${borderWidth}px solid ${innerColor}` : undefined,
        borderRadius: isBox ? borderRadius : undefined,
        backgroundColor: isBox ? `${color}10` : "transparent",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Neon;
