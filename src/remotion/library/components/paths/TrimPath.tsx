import React, {
  useMemo,
  useRef,
  useEffect,
  useState,
  type CSSProperties,
} from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { type EasingName } from "../../presets/easings";
import { getDuration, type DurationName } from "../../presets/durations";
import { toRemotionEasing } from "../../presets/remotionEasings";

/**
 * Props for TrimPath component.
 */
export interface TrimPathProps {
  /** SVG path data (d attribute) */
  path: string;
  /** Start point of the visible path (0-1) */
  start?: number;
  /** End point of the visible path (0-1) */
  end?: number;
  /** Animation duration in seconds */
  duration?: number | DurationName;
  /** Delay before animation in seconds */
  delay?: number;
  /** Easing preset */
  ease?: EasingName | string;
  /** Stroke color */
  stroke?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Stroke line cap */
  strokeLinecap?: "butt" | "round" | "square";
  /** Stroke line join */
  strokeLinejoin?: "miter" | "round" | "bevel";
  /** Fill color (usually "none" for path animations) */
  fill?: string;
  /** SVG viewBox */
  viewBox?: string;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Additional CSS styles */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
}


/**
 * Animated SVG path drawing using stroke-dasharray/dashoffset.
 *
 * @example
 * // Draw a path from start to end
 * <TrimPath
 *   path="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
 *   duration={1.5}
 *   stroke="#3b82f6"
 *   strokeWidth={3}
 * />
 *
 * @example
 * // Reveal from middle outward
 * <TrimPath
 *   path={circlePathData}
 *   start={0.5}
 *   end={0.5}
 *   duration={1}
 *   ease="bouncy"
 * />
 *
 * @example
 * // Custom timing
 * <TrimPath
 *   path={logoPath}
 *   duration={2}
 *   delay={0.5}
 *   stroke="#fff"
 *   strokeWidth={2}
 *   strokeLinecap="round"
 * />
 */
export const TrimPath: React.FC<TrimPathProps> = ({
  path,
  start = 0,
  end = 1,
  duration: durationProp = 1,
  delay = 0,
  ease = "smooth",
  stroke = "#000000",
  strokeWidth = 2,
  strokeLinecap = "round",
  strokeLinejoin = "round",
  fill = "none",
  viewBox = "0 0 200 200",
  width = 200,
  height = 200,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  const duration = getDuration(durationProp);
  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.round(duration * fps);
  const easing = toRemotionEasing(ease);

  // Measure path length
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [path]);

  // Calculate animated progress
  const progress = useMemo(() => {
    const effectiveFrame = frame - delayFrames;

    if (effectiveFrame <= 0) return 0;
    if (effectiveFrame >= durationFrames) return 1;

    return interpolate(effectiveFrame, [0, durationFrames], [0, 1], {
      easing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }, [frame, delayFrames, durationFrames, easing]);

  // Calculate stroke-dasharray and stroke-dashoffset
  const strokeStyles = useMemo(() => {
    if (pathLength === 0)
      return { strokeDasharray: "0", strokeDashoffset: "0" };

    // Animate from start to end
    const animatedStart = start;
    const animatedEnd = start + (end - start) * progress;

    const visibleLength = (animatedEnd - animatedStart) * pathLength;
    const offset = animatedStart * pathLength;

    return {
      strokeDasharray: `${visibleLength} ${pathLength}`,
      strokeDashoffset: -offset,
    };
  }, [pathLength, start, end, progress]);

  return (
    <svg
      className={className}
      viewBox={viewBox}
      width={width}
      height={height}
      style={style}
    >
      <path
        ref={pathRef}
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        style={{
          ...strokeStyles,
          transition: "none",
        }}
      />
    </svg>
  );
};

/**
 * Props for DrawPath - path with animated head.
 */
export interface DrawPathProps extends TrimPathProps {
  /** Element to render at the drawing head */
  head?: React.ReactNode;
  /** Trail length as percentage (0-1) */
  trail?: number;
  /** Trail opacity */
  trailOpacity?: number;
}

/**
 * Animated path drawing with optional head element and trail.
 *
 * @example
 * <DrawPath
 *   path={svgPath}
 *   duration={2}
 *   stroke="#fff"
 *   head={<circle r={4} fill="#fff" />}
 *   trail={0.3}
 * />
 */
export const DrawPath: React.FC<DrawPathProps> = ({
  path,
  duration: durationProp = 1,
  delay = 0,
  ease = "smooth",
  stroke = "#000000",
  strokeWidth = 2,
  strokeLinecap = "round",
  strokeLinejoin = "round",
  fill = "none",
  viewBox = "0 0 200 200",
  width = 200,
  height = 200,
  head,
  trail = 0,
  trailOpacity = 0.3,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [headPosition, setHeadPosition] = useState({ x: 0, y: 0, angle: 0 });

  const duration = getDuration(durationProp);
  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.round(duration * fps);
  const easing = toRemotionEasing(ease);

  // Measure path length
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [path]);

  // Calculate progress
  const progress = useMemo(() => {
    const effectiveFrame = frame - delayFrames;
    if (effectiveFrame <= 0) return 0;
    if (effectiveFrame >= durationFrames) return 1;
    return interpolate(effectiveFrame, [0, durationFrames], [0, 1], {
      easing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }, [frame, delayFrames, durationFrames, easing]);

  // Update head position
  useEffect(() => {
    if (pathRef.current && pathLength > 0) {
      const point = pathRef.current.getPointAtLength(progress * pathLength);
      const nextPoint = pathRef.current.getPointAtLength(
        Math.min(progress * pathLength + 1, pathLength),
      );
      const angle =
        Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) *
        (180 / Math.PI);
      setHeadPosition({ x: point.x, y: point.y, angle });
    }
  }, [progress, pathLength]);

  // Stroke styles
  const strokeStyles = useMemo(() => {
    if (pathLength === 0)
      return { strokeDasharray: "0", strokeDashoffset: "0" };

    const start = trail > 0 ? Math.max(0, progress - trail) : 0;
    const visibleLength = (progress - start) * pathLength;
    const offset = start * pathLength;

    return {
      strokeDasharray: `${visibleLength} ${pathLength}`,
      strokeDashoffset: -offset,
    };
  }, [pathLength, progress, trail]);

  return (
    <svg
      className={className}
      viewBox={viewBox}
      width={width}
      height={height}
      style={style}
    >
      {/* Trail (if enabled) */}
      {trail > 0 && (
        <path
          d={path}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          opacity={trailOpacity}
          style={{
            strokeDasharray: `${progress * pathLength} ${pathLength}`,
            strokeDashoffset: 0,
          }}
        />
      )}

      {/* Main path */}
      <path
        ref={pathRef}
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        style={strokeStyles}
      />

      {/* Head element */}
      {head && progress > 0 && progress < 1 && (
        <g
          transform={`translate(${headPosition.x}, ${headPosition.y}) rotate(${headPosition.angle})`}
        >
          {head}
        </g>
      )}
    </svg>
  );
};

export default TrimPath;
