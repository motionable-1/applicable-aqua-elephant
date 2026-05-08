import React, { useMemo, type CSSProperties, type ReactNode } from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

/**
 * Cursor style presets.
 */
export type CursorStyle =
  | "default"
  | "pointer"
  | "text"
  | "grab"
  | "grabbing"
  | "crosshair"
  | "move";

/**
 * Point on a path.
 */
export interface CursorPoint {
  x: number;
  y: number;
  /** Frame at which to reach this point */
  frame: number;
  /** Optional: trigger click at this point */
  click?: boolean;
  /** Optional: cursor style at this point */
  cursor?: CursorStyle;
  /** Optional: easing to this point */
  ease?: "linear" | "smooth" | "snappy" | "slow";
}

/**
 * Props for Cursor component.
 */
export interface CursorProps {
  /** Array of points defining the cursor path */
  path: CursorPoint[];
  /** Cursor size */
  size?: number;
  /** Cursor color */
  color?: string;
  /** Show click ripple effect */
  showClickRipple?: boolean;
  /** Click ripple color */
  rippleColor?: string;
  /** Custom cursor element */
  children?: ReactNode;
  /** Shadow behind cursor */
  shadow?: boolean;
  /** Additional styles */
  style?: CSSProperties;
}

/**
 * macOS-style cursor SVGs - pixel-perfect recreation.
 */
const DefaultCursor = ({
  size,
  color,
  cursorStyle,
}: {
  size: number;
  color: string;
  cursorStyle: CursorStyle;
}) => {
  // Pointer / Hand cursor
  if (cursorStyle === "pointer") {
    return (
      <svg width={size} height={size * 1.2} viewBox="0 0 32 38" fill="none">
        {/* Shadow */}
        <path
          d="M17 8.5V5C17 3.34315 18.3431 2 20 2C21.6569 2 23 3.34315 23 5V15.5M23 12V8C23 6.34315 24.3431 5 26 5C27.6569 5 29 6.34315 29 8V24C29 31.1797 23.1797 37 16 37H14C8.47715 37 4 32.5228 4 27V22C4 20.3431 5.34315 19 7 19C8.65685 19 10 20.3431 10 22V21M10 21V11C10 9.34315 11.3431 8 13 8C14.6569 8 16 9.34315 16 11V19M10 21V19C10 17.3431 11.3431 16 13 16M16 19V16C16 14.3431 17.3431 13 19 13C20.6569 13 22 14.3431 22 16V19M22 19V17C22 15.3431 23.3431 14 25 14C26.6569 14 28 15.3431 28 17V19"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(0, 1)"
        />
        {/* White border */}
        <path
          d="M17 8.5V5C17 3.34315 18.3431 2 20 2C21.6569 2 23 3.34315 23 5V15.5M23 12V8C23 6.34315 24.3431 5 26 5C27.6569 5 29 6.34315 29 8V24C29 31.1797 23.1797 37 16 37H14C8.47715 37 4 32.5228 4 27V22C4 20.3431 5.34315 19 7 19C8.65685 19 10 20.3431 10 22V21M10 21V11C10 9.34315 11.3431 8 13 8C14.6569 8 16 9.34315 16 11V19M10 21V19C10 17.3431 11.3431 16 13 16M16 19V16C16 14.3431 17.3431 13 19 13C20.6569 13 22 14.3431 22 16V19M22 19V17C22 15.3431 23.3431 14 25 14C26.6569 14 28 15.3431 28 17V19"
          stroke="white"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Fill */}
        <path
          d="M17 8.5V5C17 3.34315 18.3431 2 20 2C21.6569 2 23 3.34315 23 5V15.5M23 12V8C23 6.34315 24.3431 5 26 5C27.6569 5 29 6.34315 29 8V24C29 31.1797 23.1797 37 16 37H14C8.47715 37 4 32.5228 4 27V22C4 20.3431 5.34315 19 7 19C8.65685 19 10 20.3431 10 22V21M10 21V11C10 9.34315 11.3431 8 13 8C14.6569 8 16 9.34315 16 11V19M10 21V19C10 17.3431 11.3431 16 13 16M16 19V16C16 14.3431 17.3431 13 19 13C20.6569 13 22 14.3431 22 16V19M22 19V17C22 15.3431 23.3431 14 25 14C26.6569 14 28 15.3431 28 17V19"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Text / I-beam cursor
  if (cursorStyle === "text") {
    return (
      <svg width={size * 0.6} height={size} viewBox="0 0 16 24" fill="none">
        {/* Shadow */}
        <path
          d="M8 3V21M5 3C5 3 6.5 3 8 3C9.5 3 11 3 11 3M5 21C5 21 6.5 21 8 21C9.5 21 11 21 11 21"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth={3}
          strokeLinecap="round"
          transform="translate(0, 1)"
        />
        {/* White border */}
        <path
          d="M8 3V21M5 3C5 3 6.5 3 8 3C9.5 3 11 3 11 3M5 21C5 21 6.5 21 8 21C9.5 21 11 21 11 21"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d="M8 3V21M5 3C5 3 6.5 3 8 3C9.5 3 11 3 11 3M5 21C5 21 6.5 21 8 21C9.5 21 11 21 11 21"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Grab cursor (open hand)
  if (cursorStyle === "grab") {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        {/* Shadow */}
        <path
          d="M10 13V8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8V13M14 10V6C14 4.89543 14.8954 4 16 4C17.1046 4 18 4.89543 18 6V13M18 10V7C18 5.89543 18.8954 5 20 5C21.1046 5 22 5.89543 22 7V17C22 21.4183 18.4183 25 14 25H12C7.58172 25 4 21.4183 4 17V15C4 13.8954 4.89543 13 6 13C7.10457 13 8 13.8954 8 15V13C8 11.8954 8.89543 11 10 11C11.1046 11 12 11.8954 12 13"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(0, 1)"
        />
        {/* White border */}
        <path
          d="M10 13V8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8V13M14 10V6C14 4.89543 14.8954 4 16 4C17.1046 4 18 4.89543 18 6V13M18 10V7C18 5.89543 18.8954 5 20 5C21.1046 5 22 5.89543 22 7V17C22 21.4183 18.4183 25 14 25H12C7.58172 25 4 21.4183 4 17V15C4 13.8954 4.89543 13 6 13C7.10457 13 8 13.8954 8 15V13C8 11.8954 8.89543 11 10 11C11.1046 11 12 11.8954 12 13"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Fill */}
        <path
          d="M10 13V8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8V13M14 10V6C14 4.89543 14.8954 4 16 4C17.1046 4 18 4.89543 18 6V13M18 10V7C18 5.89543 18.8954 5 20 5C21.1046 5 22 5.89543 22 7V17C22 21.4183 18.4183 25 14 25H12C7.58172 25 4 21.4183 4 17V15C4 13.8954 4.89543 13 6 13C7.10457 13 8 13.8954 8 15V13C8 11.8954 8.89543 11 10 11C11.1046 11 12 11.8954 12 13"
          stroke={color}
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Grabbing cursor (closed hand)
  if (cursorStyle === "grabbing") {
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        {/* Shadow */}
        <path
          d="M8 14V17C8 21.4183 11.5817 25 16 25H14C9.58172 25 6 21.4183 6 17V14C6 12.8954 6.89543 12 8 12M22 17V14C22 12.8954 21.1046 12 20 12H10C8.89543 12 8 12.8954 8 14V17C8 21.4183 11.5817 25 16 25C20.4183 25 24 21.4183 24 17V14C24 12.8954 23.1046 12 22 12M10 12V11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11V12M14 12V10C14 8.89543 14.8954 8 16 8C17.1046 8 18 8.89543 18 10V12M18 12V11C18 9.89543 18.8954 9 20 9C21.1046 9 22 9.89543 22 11V12"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(0, 1)"
        />
        {/* White border */}
        <path
          d="M8 14V17C8 21.4183 11.5817 25 16 25H14C9.58172 25 6 21.4183 6 17V14C6 12.8954 6.89543 12 8 12M22 17V14C22 12.8954 21.1046 12 20 12H10C8.89543 12 8 12.8954 8 14V17C8 21.4183 11.5817 25 16 25C20.4183 25 24 21.4183 24 17V14C24 12.8954 23.1046 12 22 12M10 12V11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11V12M14 12V10C14 8.89543 14.8954 8 16 8C17.1046 8 18 8.89543 18 10V12M18 12V11C18 9.89543 18.8954 9 20 9C21.1046 9 22 9.89543 22 11V12"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Fill */}
        <path
          d="M8 14V17C8 21.4183 11.5817 25 16 25H14C9.58172 25 6 21.4183 6 17V14C6 12.8954 6.89543 12 8 12M22 17V14C22 12.8954 21.1046 12 20 12H10C8.89543 12 8 12.8954 8 14V17C8 21.4183 11.5817 25 16 25C20.4183 25 24 21.4183 24 17V14C24 12.8954 23.1046 12 22 12M10 12V11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11V12M14 12V10C14 8.89543 14.8954 8 16 8C17.1046 8 18 8.89543 18 10V12M18 12V11C18 9.89543 18.8954 9 20 9C21.1046 9 22 9.89543 22 11V12"
          stroke={color}
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Crosshair cursor
  if (cursorStyle === "crosshair") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {/* Shadow */}
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth={2.5}
          transform="translate(0, 0.5)"
        />
        <path
          d="M12 2V7M12 17V22M2 12H7M17 12H22"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth={2.5}
          strokeLinecap="round"
          transform="translate(0, 0.5)"
        />
        {/* White border */}
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth={2} />
        <path
          d="M12 2V7M12 17V22M2 12H7M17 12H22"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
        />
        {/* Fill */}
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1} />
        <path
          d="M12 2V7M12 17V22M2 12H7M17 12H22"
          stroke={color}
          strokeWidth={1}
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="2" fill={color} />
      </svg>
    );
  }

  // Move cursor
  if (cursorStyle === "move") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {/* Shadow */}
        <path
          d="M12 3L16 7H13V11H17V8L21 12L17 16V13H13V17H16L12 21L8 17H11V13H7V16L3 12L7 8V11H11V7H8L12 3Z"
          fill="rgba(0,0,0,0.15)"
          transform="translate(0, 1)"
        />
        {/* White border */}
        <path
          d="M12 3L16 7H13V11H17V8L21 12L17 16V13H13V17H16L12 21L8 17H11V13H7V16L3 12L7 8V11H11V7H8L12 3Z"
          fill="white"
          stroke="white"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        {/* Fill */}
        <path
          d="M12 3L16 7H13V11H17V8L21 12L17 16V13H13V17H16L12 21L8 17H11V13H7V16L3 12L7 8V11H11V7H8L12 3Z"
          fill={color}
        />
      </svg>
    );
  }

  // Default arrow cursor (macOS style - pixel perfect)
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 19 28" fill="none">
      {/* Shadow */}
      <path
        d="M2 2L2 24L7.5 18.5L11.5 26L15 24.5L11 16.5L18 16.5L2 2Z"
        fill="rgba(0,0,0,0.2)"
        transform="translate(0, 1)"
      />
      {/* White border */}
      <path
        d="M2 2L2 24L7.5 18.5L11.5 26L15 24.5L11 16.5L18 16.5L2 2Z"
        fill="white"
      />
      {/* Black fill */}
      <path
        d="M4 5L4 20L7.8 16.2L11 22.5L13 21.5L9.8 15.2L15 15.2L4 5Z"
        fill={color}
      />
    </svg>
  );
};

/**
 * Click ripple effect - professional double-ring style.
 */
const ClickRipple = ({
  progress,
  color,
  size,
}: {
  progress: number;
  color: string;
  size: number;
}) => {
  const innerScale = 0.3 + progress * 1.5;
  const outerScale = 0.5 + progress * 2.5;
  const opacity = 1 - progress;

  return (
    <>
      {/* Inner ring */}
      <div
        style={{
          position: "absolute",
          top: 4,
          left: 4,
          width: size * 1.5,
          height: size * 1.5,
          borderRadius: "50%",
          border: `2px solid ${color}`,
          transform: `translate(-50%, -50%) scale(${innerScale})`,
          opacity: opacity * 0.8,
          pointerEvents: "none",
        }}
      />
      {/* Outer ring */}
      <div
        style={{
          position: "absolute",
          top: 4,
          left: 4,
          width: size * 2,
          height: size * 2,
          borderRadius: "50%",
          border: `1.5px solid ${color}`,
          transform: `translate(-50%, -50%) scale(${outerScale})`,
          opacity: opacity * 0.4,
          pointerEvents: "none",
        }}
      />
      {/* Center dot */}
      <div
        style={{
          position: "absolute",
          top: 4,
          left: 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
          transform: `translate(-50%, -50%) scale(${1 - progress * 0.5})`,
          opacity: opacity,
          pointerEvents: "none",
        }}
      />
    </>
  );
};

/**
 * Get easing function.
 */
function getEasing(ease: string): (t: number) => number {
  switch (ease) {
    case "linear":
      return (t) => t;
    case "smooth":
      return Easing.bezier(0.4, 0, 0.2, 1);
    case "snappy":
      return Easing.bezier(0.2, 0, 0, 1);
    case "slow":
      return Easing.bezier(0.4, 0, 0.6, 1);
    default:
      return Easing.bezier(0.4, 0, 0.2, 1);
  }
}

/**
 * Animated cursor component that follows a path with click effects.
 *
 * @example
 * // Basic path following
 * <Cursor
 *   path={[
 *     { x: 100, y: 100, frame: 0 },
 *     { x: 300, y: 200, frame: 30 },
 *     { x: 300, y: 200, frame: 45, click: true },
 *     { x: 500, y: 150, frame: 75 },
 *   ]}
 * />
 *
 * @example
 * // With different cursor styles
 * <Cursor
 *   path={[
 *     { x: 100, y: 100, frame: 0, cursor: "default" },
 *     { x: 200, y: 200, frame: 30, cursor: "pointer" },
 *     { x: 200, y: 200, frame: 45, click: true },
 *     { x: 300, y: 100, frame: 60, cursor: "text" },
 *   ]}
 *   size={28}
 *   color="#000"
 * />
 */
export const Cursor: React.FC<CursorProps> = ({
  path,
  size = 24,
  color = "#000000",
  showClickRipple = true,
  rippleColor = "rgba(0, 122, 255, 0.5)",
  children,
  shadow = true,
  style,
}) => {
  const frame = useCurrentFrame();

  // Sort path by frame
  const sortedPath = useMemo(
    () => [...path].sort((a, b) => a.frame - b.frame),
    [path],
  );

  // Find current position
  const { x, y, cursorStyle, isClicking, clickProgress } = useMemo(() => {
    if (sortedPath.length === 0) {
      return {
        x: 0,
        y: 0,
        cursorStyle: "default" as CursorStyle,
        isClicking: false,
        clickProgress: 0,
      };
    }

    // Find surrounding points
    let prevPoint = sortedPath[0];
    let nextPoint = sortedPath[0];
    let currentCursor: CursorStyle = sortedPath[0].cursor || "default";

    for (let i = 0; i < sortedPath.length; i++) {
      const point = sortedPath[i];
      if (point.frame <= frame) {
        prevPoint = point;
        if (point.cursor) currentCursor = point.cursor;
      }
      if (point.frame >= frame && sortedPath[i - 1]?.frame <= frame) {
        nextPoint = point;
        break;
      }
      if (point.frame > frame) {
        nextPoint = point;
        break;
      }
    }

    // If beyond last point, stay at last point
    if (frame >= sortedPath[sortedPath.length - 1].frame) {
      const lastPoint = sortedPath[sortedPath.length - 1];
      return {
        x: lastPoint.x,
        y: lastPoint.y,
        cursorStyle: lastPoint.cursor || currentCursor,
        isClicking: false,
        clickProgress: 0,
      };
    }

    // Interpolate between points
    const ease = nextPoint.ease || "smooth";
    const easing = getEasing(ease);
    const frameDiff = nextPoint.frame - prevPoint.frame;

    let progress = 0;
    if (frameDiff > 0) {
      progress = interpolate(
        frame,
        [prevPoint.frame, nextPoint.frame],
        [0, 1],
        {
          easing,
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      );
    }

    const currentX = prevPoint.x + (nextPoint.x - prevPoint.x) * progress;
    const currentY = prevPoint.y + (nextPoint.y - prevPoint.y) * progress;

    // Check for click at current point
    let clicking = false;
    let clickProg = 0;
    const clickDuration = 12; // frames

    for (const point of sortedPath) {
      if (point.click) {
        const clickStart = point.frame;
        const clickEnd = clickStart + clickDuration;
        if (frame >= clickStart && frame <= clickEnd) {
          clicking = true;
          clickProg = (frame - clickStart) / clickDuration;
          break;
        }
      }
    }

    return {
      x: currentX,
      y: currentY,
      cursorStyle: currentCursor,
      isClicking: clicking,
      clickProgress: clickProg,
    };
  }, [frame, sortedPath]);

  // Click scale animation
  const clickScale = isClicking
    ? 1 - Math.sin(clickProgress * Math.PI) * 0.15
    : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${clickScale})`,
        transformOrigin: "top left",
        pointerEvents: "none",
        zIndex: 9999,
        filter: shadow ? "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" : undefined,
        ...style,
      }}
    >
      {/* Click ripple */}
      {showClickRipple && isClicking && (
        <ClickRipple progress={clickProgress} color={rippleColor} size={size} />
      )}

      {/* Cursor */}
      {children || (
        <DefaultCursor size={size} color={color} cursorStyle={cursorStyle} />
      )}
    </div>
  );
};

export default Cursor;
