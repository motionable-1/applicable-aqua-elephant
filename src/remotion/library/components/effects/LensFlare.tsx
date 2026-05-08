import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Color palette for flare artifact elements.
 * Each color corresponds to a different artifact along the flare line.
 */
export interface FlarePalette {
  /** Color for ring artifacts */
  ring?: string;
  /** Color for hexagonal artifacts */
  hex?: string;
  /** Color for disc artifacts */
  disc?: string;
  /** Secondary ring color */
  ringAlt?: string;
  /** Secondary disc color */
  discAlt?: string;
}

const defaultPalette: Required<FlarePalette> = {
  ring: "purple",
  hex: "cyan",
  disc: "orange",
  ringAlt: "blue",
  discAlt: "magenta",
};

export interface LensFlareProps {
  /** Opacity of the flare (0-1) */
  opacity?: number;
  /** Scale of the flare */
  scale?: number;
  /** X position (0-1) relative to container */
  x?: number;
  /** Y position (0-1) relative to container */
  y?: number;
  /** Color tint for the main glow */
  color?: string;
  /** Color palette for flare artifacts (overrides individual artifact colors) */
  palette?: FlarePalette;
  /** Animate the flare movement automatically */
  animate?: boolean;
  /** Speed of animation */
  speed?: number;
  /** Additional CSS styles */
  style?: React.CSSProperties;
  /** Additional CSS class names */
  className?: string;
}

export const LensFlare: React.FC<LensFlareProps> = ({
  opacity = 1,
  scale = 1,
  x: staticX = 0.5,
  y: staticY = 0.5,
  color = "rgba(255, 255, 255, 0.8)",
  palette: paletteProp,
  animate = false,
  speed = 1,
  style,
  className,
}) => {
  const palette = { ...defaultPalette, ...paletteProp };
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = frame / fps;

  const { cx, cy } = useMemo(() => {
    if (!animate) return { cx: staticX, cy: staticY };
    // Simple Lissajous curve for natural movement
    const t = time * speed;
    return {
      cx: 0.5 + Math.sin(t * 0.5) * 0.3,
      cy: 0.5 + Math.cos(t * 0.3) * 0.2,
    };
  }, [animate, time, speed, staticX, staticY]);

  // Center coordinates in pixels
  const centerX = cx * width;
  const centerY = cy * height;

  // Vector from center of screen to light source
  const vecX = centerX - width / 2;
  const vecY = centerY - height / 2;
  const dist = Math.sqrt(vecX * vecX + vecY * vecY);
  const angle = Math.atan2(vecY, vecX);

  // Generate flare elements along the vector
  const flares = useMemo(() => {
    return [
      // Main burst
      { type: "burst", pos: 0, size: 400, alpha: 0.6, color: "white" },
      { type: "glow", pos: 0, size: 800, alpha: 0.2, color: color },
      // Artifacts along the line
      { type: "ring", pos: -0.2, size: 100, alpha: 0.1, color: palette.ring },
      { type: "hex", pos: -0.4, size: 60, alpha: 0.2, color: palette.hex },
      { type: "ring", pos: -0.5, size: 120, alpha: 0.05, color: palette.ringAlt },
      { type: "disc", pos: -0.8, size: 40, alpha: 0.1, color: palette.disc },
      { type: "hex", pos: 0.3, size: 80, alpha: 0.1, color: palette.hex },
      { type: "disc", pos: 0.5, size: 200, alpha: 0.05, color: palette.discAlt },
      { type: "ring", pos: 1.2, size: 300, alpha: 0.05, color: "rgba(255,255,255,0.1)" },
    ];
  }, [color, palette]);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        opacity,
        mixBlendMode: "screen",
        ...style,
      }}
    >
      {flares.map((f, i) => {
        // Calculate position along the line passing through center and light source
        // pos 0 = light source
        // pos 1 = reflected across center
        const fx = centerX - vecX * f.pos;
        const fy = centerY - vecY * f.pos;
        
        // Intensity fades as light moves off screen
        const visibility = Math.max(0, 1 - dist / (Math.max(width, height) * 0.8));
        const currentAlpha = f.alpha * visibility;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: fx,
              top: fy,
              width: f.size * scale,
              height: f.size * scale,
              transform: `translate(-50%, -50%) rotate(${angle}rad)`,
              opacity: currentAlpha,
            }}
          >
            {f.type === "burst" && (
              <div style={{ 
                width: "100%", height: "100%", 
                background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)" 
              }} />
            )}
            {f.type === "glow" && (
               <div style={{ 
                width: "100%", height: "100%", 
                background: `radial-gradient(circle, ${f.color} 0%, rgba(0,0,0,0) 70%)` 
              }} />
            )}
            {f.type === "ring" && (
              <div style={{ 
                width: "100%", height: "100%", 
                borderRadius: "50%",
                border: `2px solid ${f.color}`,
                boxShadow: `0 0 10px ${f.color}`,
                opacity: 0.6
              }} />
            )}
            {f.type === "disc" && (
              <div style={{ 
                width: "100%", height: "100%", 
                borderRadius: "50%",
                background: f.color,
                filter: "blur(4px)"
              }} />
            )}
            {f.type === "hex" && (
              <div style={{
                width: "100%", height: "100%",
                background: f.color,
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                opacity: 0.8,
                filter: "blur(2px)"
              }} />
            )}
            {/* Star streaks for the main burst */}
            {f.type === "burst" && (
              <>
                 <div style={{ position: "absolute", top: "49%", left: "-50%", width: "200%", height: "2%", background: "rgba(255,255,255,0.8)", filter: "blur(1px)" }} />
                 <div style={{ position: "absolute", top: "-50%", left: "49%", width: "2%", height: "200%", background: "rgba(255,255,255,0.8)", filter: "blur(1px)" }} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
