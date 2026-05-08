import React, { useId, useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export type KineticType = "path" | "marquee" | "cylinder";

export interface KineticTextProps {
  children: string;
  type?: KineticType;
  /** Path data for 'path' type */
  path?: string;
  /** Font size */
  fontSize?: number;
  /** Font family */
  fontFamily?: string;
  /** Font weight */
  fontWeight?: string | number;
  /** Text color */
  color?: string;
  /** Speed of movement */
  speed?: number;
  /** Reverse direction */
  reverse?: boolean;
  /** Repeat text to fill space */
  repeat?: number;
  /** Gap between repeats */
  gap?: number;
  /** Cylinder radius for 'cylinder' type */
  radius?: number;
  /** Skew X for marquee */
  skew?: number;
  /** Additional styles */
  style?: React.CSSProperties;
  className?: string;
  /** Total duration of the animation in frames (optional) */
  duration?: number;
}

/**
 * Advanced kinetic typography component.
 * Supports text along path, infinite marquee, and 3D cylinder rotation.
 */
export const KineticText: React.FC<KineticTextProps> = ({
  children,
  type = "marquee",
  path,
  fontSize = 40,
  fontFamily = "sans-serif",
  fontWeight = "bold",
  color = "currentColor",
  speed = 1,
  reverse = false,
  repeat = 1,
  gap = 20,
  radius = 100,
  skew = 0,
  style,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  duration,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const time = frame / fps;
  
  // Path Text Implementation - Deterministic ID (no Math.random in Remotion)
  const pathId = useId();

  // Cylinder Implementation - Memoize items unconditionally (or with dependency on repeat)
  const cylinderItems = useMemo(() => {
    return Array.from({ length: Math.max(1, repeat) }).map((_, i) => {
        const angleStep = (Math.PI * 2) / Math.max(1, repeat);
        return { baseAngle: i * angleStep, index: i };
    });
  }, [repeat]);

  if (type === "path" && path) {
    // Generate repeated text
    const textContent = Array.from({ length: Math.max(1, repeat) }).map(() => children).join(" ".repeat(Math.ceil(gap/10)));
    
    // Animate startOffset
    const totalLength = 2000; // Arbitrary large number
    const offset = (time * speed * 100) % totalLength;
    const startOffset = reverse ? -offset : offset;

    return (
      <div className={className} style={{ width: "100%", height: "100%", ...style }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${width}`} overflow="visible">
          <defs>
             <path id={pathId} d={path} />
          </defs>
          <text 
            fontSize={fontSize} 
            fontFamily={fontFamily} 
            fontWeight={fontWeight}
            fill={color}
            dominantBaseline="middle"
          >
            <textPath 
              href={`#${pathId}`} 
              startOffset={startOffset}
              spacing="auto"
            >
              {textContent}
            </textPath>
          </text>
        </svg>
      </div>
    );
  }

  // Cylinder / 3D Implementation
  if (type === "cylinder") {
    const rotation = (time * speed) % (Math.PI * 2);

    return (
      <div 
        className={className} 
        style={{ 
          position: "relative",
          width: "100%", 
          height: "100%", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          ...style 
        }}
      >
        <div style={{
            position: "relative",
            transformStyle: "preserve-3d",
            // We rotate the container to see the cylinder spin, or we move items?
            // Moving items individually is better for z-index sorting if we did it manually,
            // but CSS 3D preserve-3d handles z-sorting automatically if browsers support it well.
            // Let's stick to item transform logic for now.
        }}>
            {cylinderItems.map((item) => {
                const angle = item.baseAngle + (reverse ? -rotation : rotation);
                const x = Math.cos(angle) * radius; // Horizontal position
                const z = Math.sin(angle) * radius; // Depth (-radius to radius)

                // Simple CSS 3D rotation
                // Position on circle: translate3d(x, 0, z)
                // Rotate to face outward: rotateY(angle)
                // Actually, if we want them flat facing camera but arranged in circle, we just translate.
                // If we want them like a label on a can, we translate AND rotate.
                
                // Let's do "label on a can" style (rotateY)
                // angle is in radians. CSS rotateY needs degrees.
                // But wait, Math.sin/cos use radians.
                
                const angleDeg = (angle * 180) / Math.PI;
                
                // Opacity fade for back items
                const opacity = Math.max(0.2, (z + radius) / (2 * radius)); 

                return (
                    <div
                        key={item.index}
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${-angleDeg + 90}deg)`,
                            opacity,
                            fontSize,
                            fontFamily,
                            fontWeight,
                            color,
                            whiteSpace: "nowrap",
                            willChange: "transform",
                            backfaceVisibility: "hidden" // Hide back of text
                        }}
                    >
                        {children}
                    </div>
                );
            })}
        </div>
      </div>
    );
  }

  // Infinite Marquee Implementation
  const offset = (time * speed * 100) * (reverse ? 1 : -1);

  return (
    <div 
      className={className} 
      style={{ 
        overflow: "hidden", 
        whiteSpace: "nowrap",
        display: "flex",
        transform: `skewX(${skew}deg)`,
        ...style 
      }}
    >
      <div 
        style={{ 
          display: "flex",
          transform: `translateX(${offset}px)`,
          willChange: "transform",
        }}
      >
        {/* Render enough copies to cover screen width + scroll */}
        {Array.from({ length: Math.max(20, repeat) }).map((_, i) => (
          <span 
            key={i} 
            style={{ 
              fontSize, 
              fontFamily,
              fontWeight,
              color, 
              marginRight: gap,
              display: "inline-block"
            }}
          >
            {children}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KineticText;
