import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, random } from "remotion";

export type ParticleType = "confetti" | "sparks" | "dust" | "snow" | "bubbles" | "stars";

export interface ParticlesProps {
  /** Number of particles */
  count?: number;
  /** Particle style */
  type?: ParticleType;
  /** Movement speed multiplier */
  speed?: number;
  /** Horizontal spread (0-1) */
  spread?: number;
  /** Color palette */
  colors?: string[];
  /** Gravity strength (positive = down, negative = up) */
  gravity?: number;
  /** Horizontal wind force */
  wind?: number;
  /** Random seed for deterministic rendering */
  seed?: string;
  /** Particle size range [min, max] */
  size?: [number, number];
  className?: string;
  style?: React.CSSProperties;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  delay: number;
  shape: number; // 0-1 for shape selection
  wobblePhase: number;
  wobbleSpeed: number;
}

const DEFAULT_COLORS: Record<ParticleType, string[]> = {
  confetti: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA", "#F472B6", "#34D399", "#60A5FA"],
  sparks: ["#FFD700", "#FFA500", "#FF6347", "#FFFFFF", "#FFE4B5"],
  dust: ["#D4C5A9", "#C4B08B", "#9E9075", "#B8A88A"],
  snow: ["#FFFFFF", "#E8F0FE", "#D1E3FF", "#F0F4FF"],
  bubbles: ["rgba(255,255,255,0.3)", "rgba(173,216,230,0.4)", "rgba(135,206,250,0.3)"],
  stars: ["#FFFFFF", "#FFD700", "#FFF8DC", "#FFFACD"],
};

const DEFAULT_SIZE: Record<ParticleType, [number, number]> = {
  confetti: [6, 14],
  sparks: [2, 5],
  dust: [1, 4],
  snow: [3, 10],
  bubbles: [8, 24],
  stars: [2, 6],
};

const GRAVITY: Record<ParticleType, number> = {
  confetti: 80,
  sparks: -120,
  dust: 10,
  snow: 30,
  bubbles: -40,
  stars: 0,
};

/**
 * Deterministic particle system for motion design.
 * Each particle's position is derived purely from frame + seed.
 *
 * @example
 * <Particles type="confetti" count={80} speed={1.5} />
 * <Particles type="snow" count={100} wind={20} />
 */
export const Particles: React.FC<ParticlesProps> = ({
  count = 50,
  type = "confetti",
  speed = 1,
  spread = 1,
  colors,
  gravity,
  wind = 0,
  seed = "particles",
  size,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = (frame / fps) * speed;

  const palette = colors ?? DEFAULT_COLORS[type];
  const [sizeMin, sizeMax] = size ?? DEFAULT_SIZE[type];
  const grav = gravity ?? GRAVITY[type];

  // Generate particles deterministically
  const particles = useMemo((): Particle[] => {
    return Array.from({ length: count }).map((_, i) => {
      const r = (key: string) => random(`${seed}-${key}-${i}`);
      return {
        x: r("x") * width,
        y: r("y") * height,
        vx: (r("vx") - 0.5) * 200 * spread,
        vy: (r("vy") - 0.5) * 200,
        size: sizeMin + r("size") * (sizeMax - sizeMin),
        color: palette[Math.floor(r("color") * palette.length)],
        rotation: r("rot") * 360,
        rotationSpeed: (r("rspd") - 0.5) * 400,
        delay: r("delay") * 2,
        shape: r("shape"),
        wobblePhase: r("wobph") * Math.PI * 2,
        wobbleSpeed: 1 + r("wobsp") * 3,
      };
    });
  }, [count, seed, width, height, spread, sizeMin, sizeMax, palette]);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        ...style,
      }}
    >
      {particles.map((p, i) => {
        const t = Math.max(0, time - p.delay);
        if (t <= 0) return null;

        // Physics: position = initial + velocity*t + 0.5*gravity*t^2
        const px = p.x + p.vx * t + wind * t + Math.sin(t * p.wobbleSpeed + p.wobblePhase) * 20;
        const py = p.y + p.vy * t + 0.5 * grav * t * t;

        // Wrap around screen edges
        const wrappedX = ((px % width) + width) % width;
        const wrappedY = ((py % height) + height) % height;

        const rot = p.rotation + p.rotationSpeed * t;

        // Fade based on type
        const fadeIn = Math.min(1, t * 3);
        const opacity = type === "sparks" ? Math.max(0, 1 - t * 0.8) * fadeIn : fadeIn;

        if (opacity <= 0) return null;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: wrappedX,
              top: wrappedY,
              width: p.size,
              height: type === "confetti" ? p.size * (0.6 + p.shape * 0.8) : p.size,
              opacity,
              transform: `translate(-50%, -50%) rotate(${rot}deg)${type === "confetti" ? ` scaleX(${Math.cos(t * 5 + p.wobblePhase)})` : ""}`,
              ...getParticleStyle(type, p),
            }}
          />
        );
      })}
    </div>
  );
};

function getParticleStyle(
  type: ParticleType,
  p: Particle,
): React.CSSProperties {
  switch (type) {
    case "confetti":
      return {
        backgroundColor: p.color,
        borderRadius: p.shape > 0.7 ? "50%" : p.shape > 0.4 ? "2px" : "0",
      };
    case "sparks":
      return {
        backgroundColor: p.color,
        borderRadius: "50%",
        boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
      };
    case "dust":
      return {
        backgroundColor: p.color,
        borderRadius: "50%",
        opacity: 0.6,
      };
    case "snow":
      return {
        backgroundColor: p.color,
        borderRadius: "50%",
        boxShadow: `0 0 ${p.size}px ${p.color}40`,
      };
    case "bubbles":
      return {
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${p.color})`,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.2)",
      };
    case "stars":
      return {
        backgroundColor: p.color,
        borderRadius: "50%",
        boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.color}80`,
      };
  }
}

export default Particles;
