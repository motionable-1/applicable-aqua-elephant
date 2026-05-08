import React, { useMemo, type CSSProperties, type ReactNode } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Shape types for glossy shapes.
 */
export type GlossyShapeType =
  | "circle"
  | "square"
  | "rounded"
  | "pill"
  | "blob1"
  | "blob2"
  | "blob3"
  | "blob4"
  | "hexagon"
  | "diamond"
  | "star"
  | "organic";

/**
 * Glossy style presets.
 */
export type GlossyStyle =
  | "glass"
  | "plastic"
  | "metallic"
  | "neon"
  | "soft"
  | "frosted";

/**
 * Props for GlossyShape component.
 */
export interface GlossyShapeProps {
  /** Shape type */
  shape?: GlossyShapeType;
  /** Glossy style preset */
  glossStyle?: GlossyStyle;
  /** Base color */
  color?: string;
  /** Secondary color for gradients */
  secondaryColor?: string;
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** Border radius (for square/rounded) */
  borderRadius?: number;
  /** Show highlight reflection */
  highlight?: boolean;
  /** Highlight intensity (0-1) */
  highlightIntensity?: number;
  /** Shadow intensity (0-1) */
  shadowIntensity?: number;
  /** Blur amount for frosted effect */
  blur?: number;
  /** Animation - "none", "float", "pulse", "rotate", "breathe" */
  animation?: "none" | "float" | "pulse" | "rotate" | "breathe" | "glow";
  /** Animation speed multiplier */
  animationSpeed?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Content inside the shape */
  children?: ReactNode;
  /** Additional styles */
  style?: CSSProperties;
  className?: string;
}

/**
 * Organic blob SVG paths using cubic beziers for perfectly smooth closed curves.
 * Each path starts and ends at the same point with matching tangent directions.
 */
const blobPaths = {
  // Smooth rounded blob
  blob1:
    "M50,5 C70,5 90,25 90,50 C90,75 70,95 45,95 C20,95 0,75 0,50 C0,25 20,5 45,5 C47,5 50,5 50,5",
  // Wider horizontal blob
  blob2:
    "M45,10 C70,5 95,25 95,50 C95,75 75,95 50,95 C25,95 5,80 5,55 C5,30 20,10 45,10",
  // Asymmetric organic blob
  blob3:
    "M55,8 C80,8 95,30 92,55 C89,80 65,95 40,92 C15,89 0,65 5,40 C10,15 35,8 55,8",
  // Rounded square-ish blob
  blob4:
    "M50,5 C75,5 95,20 95,45 C95,70 80,95 55,95 C30,95 5,75 5,50 C5,25 25,5 50,5",
  // Amoeba-like organic shape
  organic:
    "M48,8 C75,3 98,25 95,52 C92,79 68,98 42,95 C16,92 -2,70 2,45 C6,20 25,10 48,8",
};

/**
 * Get clip path for shape.
 */
function getShapePath(shape: GlossyShapeType): string | undefined {
  switch (shape) {
    case "hexagon":
      return "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
    case "diamond":
      return "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
    case "star": {
      const points = 5;
      const outerRadius = 50;
      const innerRadius = 20;
      const starPoints = Array.from({ length: points * 2 }, (_, i) => {
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        return `${50 + r * Math.cos(angle)}% ${50 + r * Math.sin(angle)}%`;
      }).join(", ");
      return `polygon(${starPoints})`;
    }
    case "blob1":
    case "blob2":
    case "blob3":
    case "blob4":
    case "organic":
      // These use SVG path, handled separately
      return undefined;
    default:
      return undefined;
  }
}

/**
 * Check if shape is a blob type.
 */
function isBlobShape(shape: GlossyShapeType): boolean {
  return ["blob1", "blob2", "blob3", "blob4", "organic"].includes(shape);
}

/**
 * Get border radius for shape.
 */
function getShapeBorderRadius(
  shape: GlossyShapeType,
  width: number,
  height: number,
  customRadius?: number,
): string {
  switch (shape) {
    case "circle":
      return "50%";
    case "square":
      return customRadius ? `${customRadius}px` : "0";
    case "rounded":
      return customRadius
        ? `${customRadius}px`
        : `${Math.min(width, height) * 0.2}px`;
    case "pill":
      return `${Math.min(width, height) / 2}px`;
    case "blob1":
    case "blob2":
    case "blob3":
    case "blob4":
    case "organic":
      // Blobs use SVG, no border radius needed
      return "0";
    default:
      return "0";
  }
}

/**
 * Get style preset.
 */
function getGlossyStyles(
  glossStyle: GlossyStyle,
  color: string,
  secondaryColor: string,
  highlightIntensity: number,
  shadowIntensity: number,
): CSSProperties {
  switch (glossStyle) {
    case "glass":
      return {
        background: `linear-gradient(135deg, ${color}dd 0%, ${secondaryColor}aa 100%)`,
        boxShadow: `
          0 ${8 * shadowIntensity}px ${32 * shadowIntensity}px rgba(0,0,0,${0.2 * shadowIntensity}),
          inset 0 1px 0 rgba(255,255,255,${0.4 * highlightIntensity}),
          inset 0 -1px 0 rgba(0,0,0,0.1)
        `,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: `1px solid rgba(255,255,255,${0.2 * highlightIntensity})`,
      };

    case "plastic":
      return {
        background: `linear-gradient(180deg, ${color} 0%, ${secondaryColor} 100%)`,
        boxShadow: `
          0 ${10 * shadowIntensity}px ${40 * shadowIntensity}px rgba(0,0,0,${0.25 * shadowIntensity}),
          inset 0 2px 4px rgba(255,255,255,${0.5 * highlightIntensity}),
          inset 0 -2px 4px rgba(0,0,0,0.15)
        `,
      };

    case "metallic":
      return {
        background: `linear-gradient(180deg, 
          ${color} 0%, 
          ${secondaryColor} 45%, 
          ${color} 50%, 
          ${secondaryColor} 55%, 
          ${color} 100%
        )`,
        boxShadow: `
          0 ${8 * shadowIntensity}px ${24 * shadowIntensity}px rgba(0,0,0,${0.3 * shadowIntensity}),
          inset 0 1px 2px rgba(255,255,255,${0.6 * highlightIntensity}),
          inset 0 -1px 2px rgba(0,0,0,0.2)
        `,
      };

    case "neon":
      return {
        background: color,
        boxShadow: `
          0 0 ${20 * shadowIntensity}px ${color},
          0 0 ${40 * shadowIntensity}px ${color},
          0 0 ${60 * shadowIntensity}px ${color}80,
          inset 0 0 ${20 * highlightIntensity}px rgba(255,255,255,0.2)
        `,
        border: `2px solid ${color}`,
      };

    case "soft":
      return {
        background: `linear-gradient(135deg, ${color} 0%, ${secondaryColor} 100%)`,
        boxShadow: `
          0 ${20 * shadowIntensity}px ${60 * shadowIntensity}px rgba(0,0,0,${0.15 * shadowIntensity}),
          0 ${5 * shadowIntensity}px ${15 * shadowIntensity}px rgba(0,0,0,${0.1 * shadowIntensity})
        `,
      };

    case "frosted":
      return {
        background: `linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)`,
        boxShadow: `
          0 ${8 * shadowIntensity}px ${32 * shadowIntensity}px rgba(0,0,0,${0.1 * shadowIntensity}),
          inset 0 1px 0 rgba(255,255,255,${0.5 * highlightIntensity}),
          inset 0 -1px 0 rgba(255,255,255,0.1)
        `,
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.3)",
      };

    default:
      return {
        background: color,
      };
  }
}

/**
 * Glossy shape component with various styles and animations.
 *
 * @example
 * // Basic glass circle
 * <GlossyShape shape="circle" glossStyle="glass" color="#667eea" width={200} height={200} />
 *
 * @example
 * // Animated neon pill
 * <GlossyShape
 *   shape="pill"
 *   glossStyle="neon"
 *   color="#00ff88"
 *   width={300}
 *   height={80}
 *   animation="glow"
 * />
 *
 * @example
 * // Metallic hexagon with content
 * <GlossyShape shape="hexagon" glossStyle="metallic" color="#c0c0c0" width={150} height={150}>
 *   <span>Icon</span>
 * </GlossyShape>
 */
export const GlossyShape: React.FC<GlossyShapeProps> = ({
  shape = "rounded",
  glossStyle = "glass",
  color = "#667eea",
  secondaryColor,
  width = 200,
  height = 200,
  borderRadius,
  highlight = true,
  highlightIntensity = 1,
  shadowIntensity = 1,
  blur = 0,
  animation = "none",
  animationSpeed = 1,
  delay = 0,
  children,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate secondary color if not provided
  const effectiveSecondaryColor = secondaryColor || adjustColor(color, -20);

  // Get animation progress
  const delayFrames = Math.round(delay * fps);
  const effectiveFrame = Math.max(0, frame - delayFrames);
  const time = (effectiveFrame / fps) * animationSpeed;

  // Animation styles
  const animationStyles = useMemo((): CSSProperties => {
    switch (animation) {
      case "float":
        const floatY = Math.sin(time * 2) * 10;
        const floatRotate = Math.sin(time * 1.5) * 3;
        return {
          transform: `translateY(${floatY}px) rotate(${floatRotate}deg)`,
        };

      case "pulse":
        const pulseScale = 1 + Math.sin(time * 3) * 0.05;
        return {
          transform: `scale(${pulseScale})`,
        };

      case "rotate":
        return {
          transform: `rotate(${time * 30}deg)`,
        };

      case "breathe":
        const breatheScale = 1 + Math.sin(time * 1.5) * 0.08;
        const breatheOpacity = 0.8 + Math.sin(time * 1.5) * 0.2;
        return {
          transform: `scale(${breatheScale})`,
          opacity: breatheOpacity,
        };

      case "glow":
        const glowIntensity = 0.5 + Math.sin(time * 2) * 0.5;
        return {
          filter: `brightness(${1 + glowIntensity * 0.3})`,
        };

      default:
        return {};
    }
  }, [animation, time]);

  // Get shape styles
  const clipPath = getShapePath(shape);
  const shapeBorderRadius = getShapeBorderRadius(
    shape,
    width,
    height,
    borderRadius,
  );
  const glossyStyles = getGlossyStyles(
    glossStyle,
    color,
    effectiveSecondaryColor,
    highlightIntensity,
    shadowIntensity,
  );

  // Check if this is a blob shape
  const isBlob = isBlobShape(shape);
  const blobPath = isBlob ? blobPaths[shape as keyof typeof blobPaths] : null;

  // Highlight overlay styles
  const highlightStyles: CSSProperties = highlight
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "50%",
        background: `linear-gradient(180deg, rgba(255,255,255,${0.4 * highlightIntensity}) 0%, rgba(255,255,255,0) 100%)`,
        borderRadius: isBlob
          ? "50%"
          : `${shapeBorderRadius} ${shapeBorderRadius} 50% 50% / ${shapeBorderRadius} ${shapeBorderRadius} 20% 20%`,
        pointerEvents: "none",
      }
    : {};

  // For blob shapes, render with SVG clip path
  if (isBlob && blobPath) {
    const svgId = `blob-${shape}-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div
        className={className}
        style={{
          position: "relative",
          width,
          height,
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
          ...animationStyles,
          ...style,
        }}
      >
        <svg
          viewBox="-5 -5 110 110"
          width={width}
          height={height}
          style={{ position: "absolute", top: 0, left: 0 }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id={svgId}>
              <path d={blobPath} />
            </clipPath>
            {/* Gradient for fill */}
            <linearGradient
              id={`${svgId}-gradient`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={effectiveSecondaryColor} />
            </linearGradient>
            {/* Highlight gradient */}
            <linearGradient
              id={`${svgId}-highlight`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={`rgba(255,255,255,${0.5 * highlightIntensity})`}
              />
              <stop offset="50%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* Main blob shape - using path directly with fill for smooth edges */}
          <path
            d={blobPath}
            fill={glossStyle === "neon" ? color : `url(#${svgId}-gradient)`}
            style={{
              filter:
                glossStyle === "neon"
                  ? `drop-shadow(0 0 ${20 * shadowIntensity}px ${color}) drop-shadow(0 0 ${40 * shadowIntensity}px ${color})`
                  : `drop-shadow(0 ${8 * shadowIntensity}px ${20 * shadowIntensity}px rgba(0,0,0,0.2))`,
            }}
          />

          {/* Highlight overlay clipped to blob shape */}
          {highlight && glossStyle !== "neon" && (
            <g clipPath={`url(#${svgId})`}>
              <ellipse
                cx="50"
                cy="25"
                rx="55"
                ry="35"
                fill={`url(#${svgId}-highlight)`}
              />
            </g>
          )}
        </svg>

        {/* Content positioned in center */}
        {children && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            {children}
          </div>
        )}
      </div>
    );
  }

  // Standard shapes (non-blob)
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width,
        height,
        borderRadius: shapeBorderRadius,
        clipPath,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        ...glossyStyles,
        ...animationStyles,
        ...style,
      }}
    >
      {/* Highlight overlay */}
      {highlight && glossStyle !== "neon" && glossStyle !== "frosted" && (
        <div style={highlightStyles as CSSProperties} />
      )}

      {/* Content */}
      {children && (
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      )}
    </div>
  );
};

/**
 * Adjust color brightness.
 */
function adjustColor(hex: string, percent: number): string {
  // Remove # if present
  hex = hex.replace("#", "");

  // Parse RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Adjust
  r = Math.min(255, Math.max(0, r + (r * percent) / 100));
  g = Math.min(255, Math.max(0, g + (g * percent) / 100));
  b = Math.min(255, Math.max(0, b + (b * percent) / 100));

  // Convert back
  return `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g).toString(16).padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`;
}

/**
 * Pre-built glossy shape presets.
 */
export const GlossyCircle: React.FC<Omit<GlossyShapeProps, "shape">> = (
  props,
) => <GlossyShape {...props} shape="circle" />;

export const GlossyPill: React.FC<Omit<GlossyShapeProps, "shape">> = (
  props,
) => <GlossyShape {...props} shape="pill" />;

export const GlossyCard: React.FC<Omit<GlossyShapeProps, "shape">> = (
  props,
) => (
  <GlossyShape
    {...props}
    shape="rounded"
    borderRadius={props.borderRadius ?? 24}
  />
);

export const GlossyBlob: React.FC<Omit<GlossyShapeProps, "shape">> = (
  props,
) => <GlossyShape {...props} shape="blob1" />;

export default GlossyShape;
