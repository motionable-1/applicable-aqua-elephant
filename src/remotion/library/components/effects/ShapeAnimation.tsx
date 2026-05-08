import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type ShapeType =
  | "circle"
  | "ring"
  | "square"
  | "triangle"
  | "hexagon"
  | "star"
  | "cross"
  | "diamond"
  | "semicircle"
  | "arc";

export type ShapeAnimationType =
  | "rotate"
  | "scale"
  | "pulse"
  | "morph"
  | "draw"
  | "breathe";

export interface ShapeAnimationProps {
  /** Shape type to render */
  shape?: ShapeType;
  /** Animation type */
  animation?: ShapeAnimationType;
  /** Shape size in pixels */
  size?: number;
  /** Fill color */
  color?: string;
  /** Stroke color (for outlined shapes) */
  strokeColor?: string;
  /** Stroke width — set >0 for outlined shapes */
  strokeWidth?: number;
  /** Animation speed multiplier */
  speed?: number;
  /** Opacity (0-1) */
  opacity?: number;
  /** Delay before animation starts, in seconds */
  delay?: number;
  /** Duration for one-shot animations like "draw", in seconds */
  duration?: number;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/** Half the SVG viewBox (viewBox is 0 0 100 100, center is 50,50). */
const C = 50;

/** Generate SVG content for each shape type. */
function renderShape(
  shape: ShapeType,
  color: string,
  strokeColor: string | undefined,
  strokeWidth: number,
): React.ReactElement {
  const isFilled = strokeWidth === 0;
  const fill = isFilled ? color : "none";
  const stroke = isFilled ? "none" : (strokeColor ?? color);
  const sw = isFilled ? 0 : strokeWidth;
  const inset = sw / 2;

  switch (shape) {
    case "circle":
      return (
        <circle cx={C} cy={C} r={C - inset} fill={fill} stroke={stroke} strokeWidth={sw} />
      );

    case "ring":
      return (
        <circle
          cx={C}
          cy={C}
          r={C - Math.max(inset, 4)}
          fill="none"
          stroke={strokeColor ?? color}
          strokeWidth={strokeWidth || 6}
        />
      );

    case "square": {
      const pad = inset;
      return (
        <rect
          x={pad}
          y={pad}
          width={100 - pad * 2}
          height={100 - pad * 2}
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
        />
      );
    }

    case "triangle": {
      const h = 100 - inset * 2;
      const top = `${C},${inset}`;
      const bl = `${inset},${inset + h}`;
      const br = `${100 - inset},${inset + h}`;
      return (
        <polygon points={`${top} ${br} ${bl}`} fill={fill} stroke={stroke} strokeWidth={sw} />
      );
    }

    case "hexagon": {
      const r = C - inset;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        return `${C + r * Math.cos(a)},${C + r * Math.sin(a)}`;
      }).join(" ");
      return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />;
    }

    case "star": {
      const outer = C - inset;
      const inner = outer * 0.38;
      const pts = Array.from({ length: 10 }, (_, i) => {
        const a = (Math.PI / 5) * i - Math.PI / 2;
        const r = i % 2 === 0 ? outer : inner;
        return `${C + r * Math.cos(a)},${C + r * Math.sin(a)}`;
      }).join(" ");
      return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />;
    }

    case "cross": {
      const arm = 18;
      const pad = inset;
      const o = C - arm;
      return (
        <g fill={fill} stroke={stroke} strokeWidth={sw}>
          <rect x={o} y={pad} width={arm * 2} height={100 - pad * 2} />
          <rect x={pad} y={o} width={100 - pad * 2} height={arm * 2} />
        </g>
      );
    }

    case "diamond": {
      const r = C - inset;
      const pts = `${C},${C - r} ${C + r},${C} ${C},${C + r} ${C - r},${C}`;
      return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />;
    }

    case "semicircle": {
      const r = C - inset;
      const d = `M ${C - r},${C} A ${r},${r} 0 0,1 ${C + r},${C} Z`;
      return <path d={d} fill={fill} stroke={stroke} strokeWidth={sw} />;
    }

    case "arc": {
      const r = C - Math.max(inset, 4);
      const arcSw = strokeWidth || 6;
      const startAngle = -90;
      const endAngle = 180;
      const s = (startAngle * Math.PI) / 180;
      const e = (endAngle * Math.PI) / 180;
      const x1 = C + r * Math.cos(s);
      const y1 = C + r * Math.sin(s);
      const x2 = C + r * Math.cos(e);
      const y2 = C + r * Math.sin(e);
      const largeArc = endAngle - startAngle > 180 ? 1 : 0;
      const d = `M ${x1},${y1} A ${r},${r} 0 ${largeArc},1 ${x2},${y2}`;
      return (
        <path
          d={d}
          fill="none"
          stroke={strokeColor ?? color}
          strokeWidth={arcSw}
          strokeLinecap="round"
        />
      );
    }

    default:
      return <circle cx={C} cy={C} r={C} fill={color} />;
  }
}

/**
 * Compute the total stroke length for draw animation based on shape type.
 * Returns an approximate perimeter for each shape in viewBox units.
 */
function getShapePerimeter(shape: ShapeType, strokeWidth: number): number {
  const inset = strokeWidth / 2;
  switch (shape) {
    case "circle":
    case "ring":
      return 2 * Math.PI * (C - Math.max(inset, 4));
    case "square":
      return 4 * (100 - inset * 2);
    case "triangle":
      return 3 * (100 - inset * 2) * 0.95;
    case "hexagon":
      return 6 * (C - inset);
    case "star":
      return 10 * (C - inset) * 0.75;
    case "cross":
      return 2 * (2 * (100 - inset * 2) + 2 * 36);
    case "diamond":
      return 4 * Math.SQRT2 * (C - inset);
    case "semicircle":
      return Math.PI * (C - inset) + 2 * (C - inset);
    case "arc":
      return (270 / 360) * 2 * Math.PI * (C - Math.max(inset, 4));
    default:
      return 2 * Math.PI * C;
  }
}

/**
 * Animated geometric shape element -- a core motion design primitive.
 *
 * Renders 10 distinct SVG shape types with 6 animation modes. All timing
 * props use seconds; rendering is fully deterministic (no Math.random).
 *
 * @example
 * // Rotating red circle
 * <ShapeAnimation shape="circle" animation="rotate" color="#FF6B6B" size={120} />
 *
 * @example
 * // Draw-on hexagon outline
 * <ShapeAnimation shape="hexagon" animation="draw" strokeWidth={4} duration={1.5} />
 *
 * @example
 * // Breathing star
 * <ShapeAnimation shape="star" animation="breathe" color="#FFD93D" size={80} speed={0.5} />
 */
export const ShapeAnimation: React.FC<ShapeAnimationProps> = ({
  shape = "circle",
  animation = "rotate",
  size = 100,
  color = "#FF6B6B",
  strokeColor,
  strokeWidth = 0,
  speed = 1,
  opacity = 1,
  delay = 0,
  duration = 1,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const effectiveFrame = Math.max(0, frame - delayFrames);
  const time = (effectiveFrame / fps) * speed;
  const durationFrames = Math.max(1, Math.round(duration * fps));
  const hasStarted = frame >= delayFrames;

  // Compute animation values
  const animValues = useMemo(() => {
    if (!hasStarted) {
      return {
        transform: "",
        opacity,
        dashOffset: undefined as number | undefined,
        dashArray: undefined as number | undefined,
      };
    }

    switch (animation) {
      case "rotate": {
        const angle = time * 360;
        return { transform: `rotate(${angle}deg)`, opacity, dashOffset: undefined, dashArray: undefined };
      }

      case "scale": {
        const s = 1 + 0.2 * Math.sin(time * Math.PI * 2);
        return { transform: `scale(${s})`, opacity, dashOffset: undefined, dashArray: undefined };
      }

      case "pulse": {
        const o = 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(time * Math.PI * 2));
        return { transform: "", opacity: o * opacity, dashOffset: undefined, dashArray: undefined };
      }

      case "morph": {
        // Morph via border-radius oscillation on the wrapper div
        const t = time * Math.PI * 2;
        const r1 = 30 + 20 * Math.sin(t);
        const r2 = 30 + 20 * Math.sin(t + Math.PI * 0.5);
        const r3 = 30 + 20 * Math.sin(t + Math.PI);
        const r4 = 30 + 20 * Math.sin(t + Math.PI * 1.5);
        return {
          transform: "",
          opacity,
          borderRadius: `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r4}% ${100 - r4}% ${100 - r3}%`,
          dashOffset: undefined,
          dashArray: undefined,
        };
      }

      case "draw": {
        const effectiveSw = strokeWidth > 0 ? strokeWidth : 4;
        const perim = getShapePerimeter(shape, effectiveSw);
        const progress = interpolate(
          effectiveFrame,
          [0, durationFrames],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) },
        );
        return {
          transform: "",
          opacity,
          dashArray: perim,
          dashOffset: perim * (1 - progress),
        };
      }

      case "breathe": {
        const s = 1 + 0.12 * Math.sin(time * Math.PI);
        const o = 0.85 + 0.15 * Math.sin(time * Math.PI);
        return { transform: `scale(${s})`, opacity: o * opacity, dashOffset: undefined, dashArray: undefined };
      }

      default:
        return { transform: "", opacity, dashOffset: undefined, dashArray: undefined };
    }
  }, [animation, time, opacity, hasStarted, effectiveFrame, durationFrames, shape, strokeWidth]);

  // For "draw" animation, force stroked rendering
  const isDraw = animation === "draw";
  const effectiveStrokeWidth = isDraw && strokeWidth === 0 ? 4 : strokeWidth;
  const effectiveStrokeColor = isDraw ? (strokeColor ?? color) : strokeColor;

  const shapeElement = useMemo(
    () => renderShape(shape, color, effectiveStrokeColor, effectiveStrokeWidth),
    [shape, color, effectiveStrokeColor, effectiveStrokeWidth],
  );

  // Apply stroke-dasharray / dashoffset for draw animation
  const svgStyle: React.CSSProperties | undefined =
    isDraw && animValues.dashArray != null
      ? { strokeDasharray: animValues.dashArray, strokeDashoffset: animValues.dashOffset }
      : undefined;

  const morphBorderRadius = (animValues as { borderRadius?: string }).borderRadius;

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: animValues.opacity,
        transform: animValues.transform || undefined,
        transformOrigin: "center center",
        overflow: morphBorderRadius ? "hidden" : undefined,
        borderRadius: morphBorderRadius,
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={svgStyle}
      >
        {shapeElement}
      </svg>
    </div>
  );
};

export default ShapeAnimation;
