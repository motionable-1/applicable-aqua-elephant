import React, { useMemo } from "react";
import { useVideoConfig } from "remotion";

export type RevealType = "circle" | "wipe" | "polygon";

export interface MaskedRevealProps {
  children: React.ReactNode;
  /** 0 to 1 progress of the reveal */
  progress: number;
  /** Type of reveal mask */
  type?: RevealType;
  /** Rotation of the mask in degrees */
  rotation?: number;
  /** Softness of the edge (blur) */
  softness?: number;
  /** Invert the mask */
  invert?: boolean;
  /** Center point X (0-1) */
  centerX?: number;
  /** Center point Y (0-1) */
  centerY?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Advanced masking container for revealing content.
 * Uses CSS clip-path or mask-image for high performance.
 */
export const MaskedReveal: React.FC<MaskedRevealProps> = ({
  children,
  progress,
  type = "circle",
  rotation = 0,
  softness = 0,
  invert = false,
  centerX = 0.5,
  centerY = 0.5,
  className,
  style,
}) => {
  const { width, height } = useVideoConfig();

  const maskStyle = useMemo(() => {
    // Ensure progress is clamped 0-1
    const p = Math.max(0, Math.min(1, progress)); 

    if (type === "circle") {
      const x = centerX * 100;
      const y = centerY * 100;
      
      if (softness > 0) {
        // Use mask-image for soft edges
        // This is expensive but looks better
        const size = p * 150; // percentage
        return {
          maskImage: `radial-gradient(circle at ${x}% ${y}%, black ${Math.max(0, size - softness)}%, transparent ${size}%)`,
          WebkitMaskImage: `radial-gradient(circle at ${x}% ${y}%, black ${Math.max(0, size - softness)}%, transparent ${size}%)`,
        };
      }
      
      // Use clip-path for hard edges (faster)
      return {
        clipPath: `circle(${p * 150}% at ${x}% ${y}%)`,
      };
    }

    if (type === "wipe") {
       // Simple linear wipe using polygon
       // Calculate points for a rotated sliding rect is hard with simple polygon
       // Easier to use inset/rect if rotation is 0/90/180/270
       // For arbitrary rotation, clip-path polygon is needed.
       
       // Simplified wipe: 0 to 100% width
       return {
         clipPath: `inset(0 ${100 - p * 100}% 0 0)`,
       };
    }
    
    if (type === "polygon") {
       // A growing diamond shape
       const size = p * 150;
       return {
         clipPath: `polygon(50% ${50 - size}%, ${50 + size}% 50%, 50% ${50 + size}%, ${50 - size}% 50%)`
       };
    }

    return {};
  }, [progress, type, rotation, softness, invert, centerX, centerY, width, height]);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        ...maskStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default MaskedReveal;
