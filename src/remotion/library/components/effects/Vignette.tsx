import React from "react";

export type VignetteShape = "circle" | "ellipse";

export interface VignetteProps {
  /** Darkness intensity 0-1 */
  intensity?: number;
  /** Size of the clear center area 0-1 (0 = fully dark, 1 = very subtle) */
  size?: number;
  /** Vignette color */
  color?: string;
  /** Shape of the vignette */
  shape?: VignetteShape;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Cinematic vignette overlay — darkens edges for depth and focus.
 *
 * @example
 * <Vignette intensity={0.8} size={0.4} />
 */
export const Vignette: React.FC<VignetteProps> = ({
  intensity = 0.6,
  size = 0.3,
  color = "#000000",
  shape = "ellipse",
  className,
  style,
}) => {
  // Convert hex/named color to rgba for gradient transparency
  const shapeFunc = shape === "circle" ? "circle" : "ellipse";
  const innerStop = Math.round(size * 100);
  const outerStop = Math.round((size + (1 - size) * 0.5) * 100);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: `radial-gradient(${shapeFunc} at 50% 50%, transparent ${innerStop}%, ${color} ${outerStop}%)`,
        opacity: intensity,
        ...style,
      }}
    />
  );
};

export default Vignette;
