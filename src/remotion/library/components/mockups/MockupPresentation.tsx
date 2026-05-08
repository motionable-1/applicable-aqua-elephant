import React, { CSSProperties, ReactNode } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export interface MockupPresentationProps {
  children: ReactNode;
  /** Rotate X (tilt) in degrees */
  rotateX?: number;
  /** Rotate Y (turn) in degrees */
  rotateY?: number;
  /** Rotate Z (spin) in degrees */
  rotateZ?: number;
  /** Float animation intensity */
  float?: number;
  /** Float speed */
  floatSpeed?: number;
  /** Shadow intensity */
  shadow?: boolean;
  /** Reflection intensity */
  reflection?: boolean;
  style?: CSSProperties;
  className?: string;
}

/**
 * 3D presentation container for mockups.
 * Adds perspective, floating animation, and elegant shadowing.
 * 
 * @example
 * <MockupPresentation rotateY={-15} float={20}>
 *   <PhoneMockup />
 * </MockupPresentation>
 */
export const MockupPresentation: React.FC<MockupPresentationProps> = ({
  children,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  float = 0,
  floatSpeed = 1,
  shadow = true,
  reflection = false,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Float animation
  const floatY = float > 0 
    ? Math.sin(time * floatSpeed) * float 
    : 0;
    
  // Subtle rotation wiggles if floating
  const wiggleY = float > 0 
    ? Math.cos(time * floatSpeed * 0.5) * 2 
    : 0;

  return (
    <div
      className={className}
      style={{
        perspective: "2000px",
        transformStyle: "preserve-3d",
        display: "inline-block",
        ...style,
      }}
    >
      <div
        style={{
          transform: `
            translateY(${floatY}px)
            rotateX(${rotateX}deg) 
            rotateY(${rotateY + wiggleY}deg) 
            rotateZ(${rotateZ}deg)
          `,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s linear", // Smooth if props change
        }}
      >
        {children}
        
        {/* Contact Shadow */}
        {shadow && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "10%",
              width: "80%",
              height: "20px",
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, transparent 70%)",
              filter: "blur(10px)",
              transform: `translateY(${50 + floatY * -0.5}px) rotateX(90deg) scale(${1 - floatY * 0.005})`,
              opacity: 1 - floatY * 0.01,
              pointerEvents: "none",
              zIndex: -1,
            }}
          />
        )}
        
        {/* Reflection (Simplified) */}
        {reflection && (
           <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              height: "100%",
              transform: `scaleY(-1) translateY(${0}px)`,
              opacity: 0.1,
              maskImage: "linear-gradient(to bottom, white, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, white, transparent)",
              pointerEvents: "none",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default MockupPresentation;
