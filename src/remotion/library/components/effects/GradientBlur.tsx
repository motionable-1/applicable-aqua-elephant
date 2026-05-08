import React from "react";

export type BlurDirection = "top" | "bottom" | "left" | "right" | "radial" | "edges";

export interface GradientBlurProps {
  children?: React.ReactNode;
  /** Blur direction */
  direction?: BlurDirection;
  /** Maximum blur amount in pixels */
  blur?: number;
  /** Size of the blur region as fraction (0-1) */
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

function getMaskGradient(direction: BlurDirection, size: number): string {
  const stop = Math.round(size * 100);
  switch (direction) {
    case "top":
      return `linear-gradient(to bottom, white 0%, transparent ${stop}%)`;
    case "bottom":
      return `linear-gradient(to top, white 0%, transparent ${stop}%)`;
    case "left":
      return `linear-gradient(to right, white 0%, transparent ${stop}%)`;
    case "right":
      return `linear-gradient(to left, white 0%, transparent ${stop}%)`;
    case "radial":
      return `radial-gradient(circle, transparent ${Math.max(0, 100 - stop)}%, white 100%)`;
    case "edges":
      return `linear-gradient(to right, white 0%, transparent ${stop / 2}%, transparent ${100 - stop / 2}%, white 100%)`;
  }
}

/**
 * Gradient blur / depth of field effect.
 * Cinematic standard for guiding viewer focus.
 *
 * @example
 * <GradientBlur direction="bottom" blur={20} size={0.4}>
 *   <img src="photo.jpg" />
 * </GradientBlur>
 */
export const GradientBlur: React.FC<GradientBlurProps> = ({
  children,
  direction = "bottom",
  blur = 15,
  size = 0.4,
  className,
  style,
}) => {
  const maskGradient = getMaskGradient(direction, size);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        ...style,
      }}
    >
      {children}
      {/* Blur overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          maskImage: maskGradient,
          WebkitMaskImage: maskGradient,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default GradientBlur;
