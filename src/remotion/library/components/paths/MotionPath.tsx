import React, {
  useMemo,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { type EasingName } from "../../presets/easings";
import { getDuration, type DurationName } from "../../presets/durations";
import { toRemotionEasing } from "../../presets/remotionEasings";

/**
 * Props for MotionPath component.
 */
export interface MotionPathProps {
  children: ReactNode;
  /** SVG path data (d attribute) */
  path: string;
  /** Animation duration in seconds */
  duration?: number | DurationName;
  /** Delay before animation in seconds */
  delay?: number;
  /** Easing preset */
  ease?: EasingName | string;
  /** Auto-rotate element to follow path tangent */
  autoRotate?: boolean;
  /** Additional rotation offset in degrees */
  rotateOffset?: number;
  /** Start position on path (0-1) */
  start?: number;
  /** End position on path (0-1) */
  end?: number;
  /** SVG viewBox for path calculations */
  viewBox?: string;
  /** Offset from path center */
  offset?: { x?: number; y?: number };
  /** Additional CSS styles for the moving element */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Calculate point and angle on SVG path at given progress.
 * Returns coordinates as percentage of viewBox dimensions.
 */
function getPointOnPath(
  pathElement: SVGPathElement | null,
  progress: number,
  autoRotate: boolean,
  rotateOffset: number,
  offsetX: number,
  offsetY: number,
  vbWidth: number,
  vbHeight: number,
): { xPercent: number; yPercent: number; angle: number } {
  if (!pathElement || vbWidth === 0 || vbHeight === 0) {
    return { xPercent: 50, yPercent: 50, angle: 0 };
  }

  const pathLength = pathElement.getTotalLength();
  if (pathLength === 0) {
    return { xPercent: 50, yPercent: 50, angle: 0 };
  }

  const length = progress * pathLength;
  const point = pathElement.getPointAtLength(length);

  let angle = 0;
  if (autoRotate) {
    const delta = 0.1;
    const prevLength = Math.max(length - delta, 0);
    const nextLength = Math.min(length + delta, pathLength);
    const prevPoint = pathElement.getPointAtLength(prevLength);
    const nextPoint = pathElement.getPointAtLength(nextLength);
    angle =
      Math.atan2(nextPoint.y - prevPoint.y, nextPoint.x - prevPoint.x) *
      (180 / Math.PI);
  }

  // Convert to percentage of viewBox
  const xPercent = ((point.x + offsetX) / vbWidth) * 100;
  const yPercent = ((point.y + offsetY) / vbHeight) * 100;

  return {
    xPercent,
    yPercent,
    angle: angle + rotateOffset,
  };
}

/**
 * Animate children along an SVG path.
 *
 * @example
 * // Basic motion along a curve
 * <MotionPath
 *   path="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
 *   duration={2}
 * >
 *   <div className="dot" />
 * </MotionPath>
 *
 * @example
 * // Auto-rotating element following path
 * <MotionPath
 *   path={curvePath}
 *   duration={3}
 *   autoRotate
 *   ease="smooth"
 * >
 *   <Arrow />
 * </MotionPath>
 */
export const MotionPath: React.FC<MotionPathProps> = ({
  children,
  path,
  duration: durationProp = 2,
  delay = 0,
  ease = "smooth",
  autoRotate = false,
  rotateOffset = 0,
  start = 0,
  end = 1,
  viewBox = "0 0 200 200",
  offset = {},
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pathRef = useRef<SVGPathElement>(null);

  const duration = getDuration(durationProp);
  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.round(duration * fps);
  const easing = useMemo(() => toRemotionEasing(ease), [ease]);

  // Calculate progress
  const progress = useMemo(() => {
    const effectiveFrame = frame - delayFrames;
    if (effectiveFrame <= 0) return start;
    if (effectiveFrame >= durationFrames) return end;

    const t = interpolate(effectiveFrame, [0, durationFrames], [0, 1], {
      easing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return start + (end - start) * t;
  }, [frame, delayFrames, durationFrames, easing, start, end]);

  // Parse viewBox for dimensions
  const [vbX, vbY, vbWidth, vbHeight] = viewBox.split(" ").map(Number);

  // Calculate position (must be done inline, not in useMemo, to access ref)
  const position = getPointOnPath(
    pathRef.current,
    progress,
    autoRotate,
    rotateOffset,
    offset.x ?? 0,
    offset.y ?? 0,
    vbWidth,
    vbHeight,
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {/* SVG container - positions both path calculation and element */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Hidden path for calculations */}
        <path ref={pathRef} d={path} fill="none" stroke="transparent" />

        {/* Moving element positioned in SVG coordinate space */}
        <foreignObject
          x={vbX}
          y={vbY}
          width={vbWidth}
          height={vbHeight}
          style={{ overflow: "visible" }}
        >
          <div
            className={className}
            style={{
              position: "absolute",
              left: `${position.xPercent}%`,
              top: `${position.yPercent}%`,
              transform: `translate(-50%, -50%) ${autoRotate ? `rotate(${position.angle}deg)` : ""}`,
              ...style,
            }}
          >
            {children}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

/**
 * Props for MotionPathWithTrail component.
 */
export interface MotionPathWithTrailProps extends MotionPathProps {
  /** Show the path as a trail */
  showPath?: boolean;
  /** Trail stroke color */
  trailColor?: string;
  /** Trail stroke width */
  trailWidth?: number;
  /** Trail opacity */
  trailOpacity?: number;
  /** Draw trail as element moves */
  drawTrail?: boolean;
}

/**
 * Motion path with optional visible trail.
 *
 * @example
 * <MotionPathWithTrail
 *   path={curvePath}
 *   duration={2}
 *   showPath
 *   drawTrail
 *   trailColor="#3b82f6"
 * >
 *   <Dot />
 * </MotionPathWithTrail>
 */
export const MotionPathWithTrail: React.FC<MotionPathWithTrailProps> = ({
  children,
  path,
  duration: durationProp = 2,
  delay = 0,
  ease = "smooth",
  autoRotate = false,
  rotateOffset = 0,
  start = 0,
  end = 1,
  viewBox = "0 0 200 200",
  offset = {},
  showPath = true,
  trailColor = "#3b82f6",
  trailWidth = 2,
  trailOpacity = 0.5,
  drawTrail = false,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pathRef = useRef<SVGPathElement>(null);

  const duration = getDuration(durationProp);
  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.round(duration * fps);
  const easing = useMemo(() => toRemotionEasing(ease), [ease]);

  // Calculate progress
  const progress = useMemo(() => {
    const effectiveFrame = frame - delayFrames;
    if (effectiveFrame <= 0) return start;
    if (effectiveFrame >= durationFrames) return end;

    const t = interpolate(effectiveFrame, [0, durationFrames], [0, 1], {
      easing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return start + (end - start) * t;
  }, [frame, delayFrames, durationFrames, easing, start, end]);

  // Parse viewBox for dimensions
  const [vbX, vbY, vbWidth, vbHeight] = viewBox.split(" ").map(Number);

  // Calculate position
  const position = getPointOnPath(
    pathRef.current,
    progress,
    autoRotate,
    rotateOffset,
    offset.x ?? 0,
    offset.y ?? 0,
    vbWidth,
    vbHeight,
  );

  // Get path length for trail animation
  const pathLength = pathRef.current?.getTotalLength() ?? 0;
  const trailDashOffset = drawTrail ? pathLength * (1 - progress) : 0;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* SVG with path and element */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Visible path/trail */}
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke={showPath ? trailColor : "transparent"}
          strokeWidth={trailWidth}
          opacity={trailOpacity}
          strokeDasharray={drawTrail ? pathLength : undefined}
          strokeDashoffset={drawTrail ? trailDashOffset : undefined}
          strokeLinecap="round"
        />

        {/* Moving element positioned in SVG coordinate space */}
        <foreignObject
          x={vbX}
          y={vbY}
          width={vbWidth}
          height={vbHeight}
          style={{ overflow: "visible" }}
        >
          <div
            className={className}
            style={{
              position: "absolute",
              left: `${position.xPercent}%`,
              top: `${position.yPercent}%`,
              transform: `translate(-50%, -50%) ${autoRotate ? `rotate(${position.angle}deg)` : ""}`,
              ...style,
            }}
          >
            {children}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default MotionPath;
