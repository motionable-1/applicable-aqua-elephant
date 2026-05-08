import React, { useMemo, type CSSProperties, type ReactNode } from "react";
import { noise2D } from "@remotion/noise";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  AbsoluteFill,
} from "remotion";

/**
 * A keyframe for camera animation.
 */
export interface CameraKeyframe {
  /** Frame number for this keyframe */
  frame: number;
  /** X position (pixels or percentage string like "50%") */
  x?: number | string;
  /** Y position (pixels or percentage string like "50%") */
  y?: number | string;
  /** Scale/zoom level (1 = 100%, 2 = 200%, etc.) */
  scale?: number;
  /** Rotation in degrees (Z axis) */
  rotation?: number;
  /** Rotation X in degrees */
  rotateX?: number;
  /** Rotation Y in degrees */
  rotateY?: number;
  /** Easing function to use when transitioning TO this keyframe */
  easing?: (t: number) => number;
}

/**
 * Easing presets for camera movements.
 */
export const cameraEasings = {
  /** Smooth start and end - great for subtle movements */
  smooth: Easing.inOut(Easing.cubic),
  /** Quick start, slow end - cinematic push-in */
  pushIn: Easing.out(Easing.cubic),
  /** Slow start, quick end - dramatic pull-out */
  pullOut: Easing.in(Easing.cubic),
  /** Bouncy end - energetic movements */
  bounce: Easing.out(Easing.bounce),
  /** Elastic end - playful overshoots */
  elastic: Easing.out(Easing.elastic(1)),
  /** Linear - constant speed, mechanical feel */
  linear: Easing.linear,
  /** Dramatic slow-mo feel */
  dramatic: Easing.bezier(0.25, 0.1, 0.25, 1),
  /** Snappy, quick movements */
  snappy: Easing.bezier(0.68, -0.55, 0.265, 1.55),
  /** Very smooth, almost imperceptible start/end */
  gentle: Easing.bezier(0.4, 0, 0.2, 1),
};

/**
 * Props for Camera component.
 */
export interface CameraProps {
  /** Scene content to apply camera to */
  children: ReactNode;
  /** Array of keyframes defining camera movement */
  keyframes?: CameraKeyframe[];
  /** Static X position (if not using keyframes) */
  x?: number | string;
  /** Static Y position (if not using keyframes) */
  y?: number | string;
  /** Static scale/zoom (if not using keyframes) */
  scale?: number;
  /** Static rotation (Z) */
  rotation?: number;
  /** Static rotation X */
  rotateX?: number;
  /** Static rotation Y */
  rotateY?: number;
  /** Perspective depth (pixels) */
  perspective?: number;
  /** Transform origin for zoom (e.g., "center", "top left", "50% 30%") */
  origin?: string;
  /** Default easing for all keyframe transitions */
  defaultEasing?: (t: number) => number;
  /** Handheld camera motion intensity (0 = none, 1 = heavy) */
  wiggle?: number;
  /** Wiggle speed (default 1) */
  wiggleSpeed?: number;
  /** 
   * Constrain camera to content bounds to prevent showing areas outside the wrapped content.
   * When enabled, limits zoom-out and panning based on scale.
   * @default false
   */
  constrainToBounds?: boolean;
  /**
   * Minimum scale allowed (prevents zooming out too far).
   * Only applies when constrainToBounds is true.
   * @default 1
   */
  minScale?: number;
  /** Additional styles */
  style?: CSSProperties;
  className?: string;
}

/**
 * Parse position value to pixels.
 */
function parsePosition(
  value: number | string | undefined,
  dimension: number,
): number {
  if (value === undefined) return 0;
  if (typeof value === "number") return value;
  if (value.endsWith("%")) {
    return (parseFloat(value) / 100) * dimension;
  }
  return parseFloat(value) || 0;
}

/**
 * Calculate the maximum allowed pan distance for a given scale.
 * At scale 1.0, no panning is allowed (content exactly fills frame).
 * At scale 2.0, can pan up to 50% of dimension (seeing 50% of content).
 * 
 * Formula: maxPan = (1 - 1/scale) / 2 * dimension
 */
function calculateMaxPan(scale: number, dimension: number): number {
  if (scale <= 1) return 0;
  return ((1 - 1 / scale) / 2) * dimension;
}

/**
 * Clamp a value between min and max.
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Constrain camera values to keep content within bounds.
 */
function constrainCamera(
  x: number,
  y: number,
  scale: number,
  width: number,
  height: number,
  minScale: number,
): { x: number; y: number; scale: number } {
  // Enforce minimum scale
  const constrainedScale = Math.max(scale, minScale);
  
  // Calculate max pan based on current scale
  const maxPanX = calculateMaxPan(constrainedScale, width);
  const maxPanY = calculateMaxPan(constrainedScale, height);
  
  // Clamp x and y within allowed bounds
  const constrainedX = clamp(x, -maxPanX, maxPanX);
  const constrainedY = clamp(y, -maxPanY, maxPanY);
  
  return {
    x: constrainedX,
    y: constrainedY,
    scale: constrainedScale,
  };
}

/**
 * Interpolate between keyframes.
 */
function interpolateKeyframes(
  frame: number,
  keyframes: CameraKeyframe[],
  property: "x" | "y" | "scale" | "rotation" | "rotateX" | "rotateY",
  defaultValue: number,
  defaultEasing: (t: number) => number,
  dimension: number,
): number {
  if (keyframes.length === 0) return defaultValue;
  if (keyframes.length === 1) {
    const kf = keyframes[0];
    const value = kf[property];
    if (value === undefined) return defaultValue;
    if (property === "x" || property === "y") {
      return parsePosition(value as number | string, dimension);
    }
    return value as number;
  }

  // Sort keyframes by frame
  const sorted = [...keyframes].sort((a, b) => a.frame - b.frame);

  // Find surrounding keyframes
  let prevKf = sorted[0];
  let nextKf = sorted[sorted.length - 1];

  for (let i = 0; i < sorted.length - 1; i++) {
    if (frame >= sorted[i].frame && frame <= sorted[i + 1].frame) {
      prevKf = sorted[i];
      nextKf = sorted[i + 1];
      break;
    }
  }

  // If before first keyframe
  if (frame <= sorted[0].frame) {
    const value = sorted[0][property];
    if (value === undefined) return defaultValue;
    if (property === "x" || property === "y") {
      return parsePosition(value as number | string, dimension);
    }
    return value as number;
  }

  // If after last keyframe
  if (frame >= sorted[sorted.length - 1].frame) {
    const value = sorted[sorted.length - 1][property];
    if (value === undefined) return defaultValue;
    if (property === "x" || property === "y") {
      return parsePosition(value as number | string, dimension);
    }
    return value as number;
  }

  // Get values
  const prevValue = prevKf[property];
  const nextValue = nextKf[property];

  const prevParsed =
    prevValue !== undefined
      ? property === "x" || property === "y"
        ? parsePosition(prevValue as number | string, dimension)
        : (prevValue as number)
      : defaultValue;

  const nextParsed =
    nextValue !== undefined
      ? property === "x" || property === "y"
        ? parsePosition(nextValue as number | string, dimension)
        : (nextValue as number)
      : defaultValue;

  // Interpolate
  const easing = nextKf.easing || defaultEasing;
  return interpolate(
    frame,
    [prevKf.frame, nextKf.frame],
    [prevParsed, nextParsed],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing,
    },
  );
}

/**
 * Camera component that mimics After Effects' null object technique.
 * Wrap your scene content to apply zoom, pan, and rotation effects.
 *
 * @example
 * // Simple zoom in
 * <Camera scale={1.5} origin="center">
 *   <MyScene />
 * </Camera>
 *
 * @example
 * // Animated pan and zoom with keyframes
 * <Camera
 *   keyframes={[
 *     { frame: 0, x: 0, y: 0, scale: 1 },
 *     { frame: 30, x: -100, y: -50, scale: 1.5, easing: cameraEasings.pushIn },
 *     { frame: 90, x: 100, y: 0, scale: 1, easing: cameraEasings.smooth },
 *   ]}
 *   origin="center"
 * >
 *   <MyScene />
 * </Camera>
 *
 * @example
 * // Handheld feel
 * <Camera wiggle={1}>
 *   <MyScene />
 * </Camera>
 *
 * @example
 * // Constrained camera - prevents showing outside content bounds
 * <Camera
 *   keyframes={[
 *     { frame: 0, scale: 1.5, x: 100, y: 50 },
 *     { frame: 60, scale: 1, x: 0, y: 0 }, // Won't zoom out past minScale
 *   ]}
 *   constrainToBounds
 *   minScale={1.2}
 *   origin="center"
 * >
 *   <MyScene />
 * </Camera>
 */
export const Camera: React.FC<CameraProps> = ({
  children,
  keyframes = [],
  x: staticX,
  y: staticY,
  scale: staticScale,
  rotation: staticRotation,
  rotateX: staticRotateX,
  rotateY: staticRotateY,
  origin = "center",
  perspective = 1000,
  defaultEasing = cameraEasings.smooth,
  wiggle = 0,
  wiggleSpeed = 1,
  constrainToBounds = false,
  minScale = 1,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Calculate current values from keyframes
  const keyframeValues = useMemo(() => {
    if (keyframes.length === 0) {
      return {
        x: parsePosition(staticX, width),
        y: parsePosition(staticY, height),
        scale: staticScale ?? 1,
        rotation: staticRotation ?? 0,
        rotateX: staticRotateX ?? 0,
        rotateY: staticRotateY ?? 0,
      };
    }

    return {
      x: interpolateKeyframes(
        frame,
        keyframes,
        "x",
        parsePosition(staticX, width),
        defaultEasing,
        width,
      ),
      y: interpolateKeyframes(
        frame,
        keyframes,
        "y",
        parsePosition(staticY, height),
        defaultEasing,
        height,
      ),
      scale: interpolateKeyframes(
        frame,
        keyframes,
        "scale",
        staticScale ?? 1,
        defaultEasing,
        1,
      ),
      rotation: interpolateKeyframes(
        frame,
        keyframes,
        "rotation",
        staticRotation ?? 0,
        defaultEasing,
        1,
      ),
      rotateX: interpolateKeyframes(
        frame,
        keyframes,
        "rotateX",
        staticRotateX ?? 0,
        defaultEasing,
        1,
      ),
      rotateY: interpolateKeyframes(
        frame,
        keyframes,
        "rotateY",
        staticRotateY ?? 0,
        defaultEasing,
        1,
      ),
    };
  }, [
    frame,
    keyframes,
    staticX,
    staticY,
    staticScale,
    staticRotation,
    staticRotateX,
    staticRotateY,
    defaultEasing,
    width,
    height,
  ]);

  // Calculate handheld wiggle using Simplex noise
  const wiggleValues = useMemo(() => {
    if (wiggle <= 0) return { x: 0, y: 0, rotation: 0, rotateX: 0, rotateY: 0 };

    const time = (frame / fps) * wiggleSpeed;
    
    // Scale wiggle intensity relative to resolution
    const positionIntensity = wiggle * 10; 
    const rotationIntensity = wiggle * 0.5;

    // Use different seeds/offsets for each axis to avoid linear movement
    const x = noise2D('camera-x', time * 0.5, 0) * positionIntensity;
    const y = noise2D('camera-y', time * 0.5 + 100, 0) * positionIntensity;
    const rot = noise2D('camera-rot', time * 0.3 + 200, 0) * rotationIntensity;
    const rotX = noise2D('camera-rotX', time * 0.3 + 300, 0) * rotationIntensity;
    const rotY = noise2D('camera-rotY', time * 0.3 + 400, 0) * rotationIntensity;

    return { x, y, rotation: rot, rotateX: rotX, rotateY: rotY };
  }, [frame, fps, wiggle, wiggleSpeed]);

  // Combine values and optionally constrain to bounds
  const currentValues = useMemo(() => {
    let x = keyframeValues.x + wiggleValues.x;
    let y = keyframeValues.y + wiggleValues.y;
    let scale = keyframeValues.scale;
    
    if (constrainToBounds) {
      const constrained = constrainCamera(x, y, scale, width, height, minScale);
      x = constrained.x;
      y = constrained.y;
      scale = constrained.scale;
    }
    
    return {
      x,
      y,
      scale,
      rotation: keyframeValues.rotation + wiggleValues.rotation,
      rotateX: keyframeValues.rotateX + wiggleValues.rotateX,
      rotateY: keyframeValues.rotateY + wiggleValues.rotateY,
    };
  }, [keyframeValues, wiggleValues, constrainToBounds, minScale, width, height]);

  const transform = useMemo(() => {
    const parts: string[] = [];

    // Apply in order: perspective, translate, rotate, scale
    // Note: Perspective should be applied to parent or earlier in chain usually, 
    // but here we apply it to the element itself or we need a wrapper.
    // CSS perspective property on parent is better.
    // But we can use transform: perspective() too.
    
    if (currentValues.x !== 0 || currentValues.y !== 0) {
      parts.push(`translate3d(${-currentValues.x}px, ${-currentValues.y}px, 0)`);
    }
    if (currentValues.rotation !== 0) {
      parts.push(`rotateZ(${-currentValues.rotation}deg)`);
    }
    if (currentValues.rotateX !== 0) {
        parts.push(`rotateX(${-currentValues.rotateX}deg)`);
    }
    if (currentValues.rotateY !== 0) {
        parts.push(`rotateY(${-currentValues.rotateY}deg)`);
    }
    if (currentValues.scale !== 1) {
      parts.push(`scale(${currentValues.scale})`);
    }

    return parts.length > 0 ? parts.join(" ") : "none";
  }, [currentValues]);

  return (
    <AbsoluteFill
      className={className}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      <div style={{ 
          width: "100%", 
          height: "100%", 
          transform, 
          transformOrigin: origin,
          transformStyle: "preserve-3d" 
      }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// Preset Camera Components
// ============================================================================

export interface ZoomProps {
  children: ReactNode;
  /** Starting scale */
  from?: number;
  /** Ending scale */
  to?: number;
  /** Starting frame */
  startFrame?: number;
  /** Ending frame */
  endFrame?: number;
  /** Focal point for zoom */
  origin?: string;
  /** Easing function */
  easing?: (t: number) => number;
  /** Constrain to prevent showing outside content bounds */
  constrainToBounds?: boolean;
  /** Minimum scale when constrainToBounds is enabled */
  minScale?: number;
  style?: CSSProperties;
}

/**
 * Simple zoom effect (Ken Burns style).
 * 
 * @example
 * // Safe zoom that never shows edges
 * <Zoom from={1.2} to={1.5} constrainToBounds>
 *   <MyScene />
 * </Zoom>
 */
export const Zoom: React.FC<ZoomProps> = ({
  children,
  from = 1.2,
  to = 1.4,
  startFrame = 0,
  endFrame,
  origin = "center",
  easing = cameraEasings.linear,
  constrainToBounds = false,
  minScale = 1,
  style,
}) => {
  const { durationInFrames } = useVideoConfig();
  const effectiveEndFrame = endFrame ?? durationInFrames;

  return (
    <Camera
      keyframes={[
        { frame: startFrame, scale: from },
        { frame: effectiveEndFrame, scale: to, easing },
      ]}
      origin={origin}
      constrainToBounds={constrainToBounds}
      minScale={minScale}
      style={style}
    >
      {children}
    </Camera>
  );
};

export interface PanProps {
  children: ReactNode;
  /** Starting X position */
  fromX?: number | string;
  /** Starting Y position */
  fromY?: number | string;
  /** Ending X position */
  toX?: number | string;
  /** Ending Y position */
  toY?: number | string;
  /** 
   * Scale/zoom level during pan.
   * Must be > 1 to allow panning without showing edges.
   * @default 1.3
   */
  scale?: number;
  /** Starting frame */
  startFrame?: number;
  /** Ending frame */
  endFrame?: number;
  /** Focal point for zoom */
  origin?: string;
  /** Easing function */
  easing?: (t: number) => number;
  /** Constrain to prevent showing outside content bounds */
  constrainToBounds?: boolean;
  style?: CSSProperties;
}

/**
 * Simple pan effect with zoom.
 * Note: Panning requires scale > 1 to avoid showing edges.
 * 
 * @example
 * // Safe pan that stays within bounds
 * <Pan fromX={-50} toX={50} scale={1.3} constrainToBounds>
 *   <MyScene />
 * </Pan>
 */
export const Pan: React.FC<PanProps> = ({
  children,
  fromX = 0,
  fromY = 0,
  toX = 0,
  toY = 0,
  scale = 1.3,
  startFrame = 0,
  endFrame,
  origin = "center",
  easing = cameraEasings.smooth,
  constrainToBounds = false,
  style,
}) => {
  const { durationInFrames } = useVideoConfig();
  const effectiveEndFrame = endFrame ?? durationInFrames;

  return (
    <Camera
      keyframes={[
        { frame: startFrame, x: fromX, y: fromY, scale },
        { frame: effectiveEndFrame, x: toX, y: toY, scale, easing },
      ]}
      origin={origin}
      constrainToBounds={constrainToBounds}
      minScale={scale}
      style={style}
    >
      {children}
    </Camera>
  );
};

export interface PushInProps {
  children: ReactNode;
  /** 
   * Starting scale.
   * @default 1.1
   */
  startScale?: number;
  /** 
   * Target scale to push into.
   * @default 1.8
   */
  targetScale?: number;
  /** Target X position */
  targetX?: number | string;
  /** Target Y position */
  targetY?: number | string;
  /** Duration in seconds */
  duration?: number;
  /** Starting frame */
  startFrame?: number;
  /** Focal point */
  origin?: string;
  /** Easing function */
  easing?: (t: number) => number;
  /** Constrain to prevent showing outside content bounds */
  constrainToBounds?: boolean;
  /** Minimum scale when constrainToBounds is enabled */
  minScale?: number;
  style?: CSSProperties;
}

/**
 * Cinematic push-in effect (zoom + optional pan).
 *
 * @example
 * // Safe push-in that never shows edges
 * <PushIn targetScale={2} targetX={-100} targetY={-50} constrainToBounds>
 *   <MyScene />
 * </PushIn>
 */
export const PushIn: React.FC<PushInProps> = ({
  children,
  startScale = 1.1,
  targetScale = 1.8,
  targetX = 0,
  targetY = 0,
  duration = 2,
  startFrame = 0,
  origin = "center",
  easing = cameraEasings.pushIn,
  constrainToBounds = false,
  minScale = 1,
  style,
}) => {
  const { fps } = useVideoConfig();
  const durationFrames = Math.round(duration * fps);

  return (
    <Camera
      keyframes={[
        { frame: startFrame, x: 0, y: 0, scale: startScale },
        {
          frame: startFrame + durationFrames,
          x: targetX,
          y: targetY,
          scale: targetScale,
          easing,
        },
      ]}
      origin={origin}
      constrainToBounds={constrainToBounds}
      minScale={minScale}
      style={style}
    >
      {children}
    </Camera>
  );
};

export interface PullOutProps {
  children: ReactNode;
  /** 
   * Starting scale (zoomed in).
   * @default 2
   */
  startScale?: number;
  /**
   * Ending scale.
   * @default 1.1
   */
  endScale?: number;
  /** Starting X position */
  startX?: number | string;
  /** Starting Y position */
  startY?: number | string;
  /** Duration in seconds */
  duration?: number;
  /** Starting frame */
  startFrame?: number;
  /** Focal point */
  origin?: string;
  /** Easing function */
  easing?: (t: number) => number;
  /** Constrain to prevent showing outside content bounds */
  constrainToBounds?: boolean;
  /** Minimum scale when constrainToBounds is enabled */
  minScale?: number;
  style?: CSSProperties;
}

/**
 * Pull-out/reveal effect.
 *
 * @example
 * // Safe pull-out that never shows edges
 * <PullOut startScale={2.5} endScale={1.2} startX={50} constrainToBounds>
 *   <MyScene />
 * </PullOut>
 */
export const PullOut: React.FC<PullOutProps> = ({
  children,
  startScale = 2,
  endScale = 1.1,
  startX = 0,
  startY = 0,
  duration = 2,
  startFrame = 0,
  origin = "center",
  easing = cameraEasings.pullOut,
  constrainToBounds = false,
  minScale = 1,
  style,
}) => {
  const { fps } = useVideoConfig();
  const durationFrames = Math.round(duration * fps);

  return (
    <Camera
      keyframes={[
        { frame: startFrame, x: startX, y: startY, scale: startScale },
        { frame: startFrame + durationFrames, x: 0, y: 0, scale: endScale, easing },
      ]}
      origin={origin}
      constrainToBounds={constrainToBounds}
      minScale={minScale}
      style={style}
    >
      {children}
    </Camera>
  );
};

export interface ShakeProps {
  children: ReactNode;
  /** Intensity of shake (pixels) */
  intensity?: number;
  /** Speed of shake (frames per shake cycle) */
  speed?: number;
  /** Starting frame */
  startFrame?: number;
  /** Duration in seconds */
  duration?: number;
  style?: CSSProperties;
}

/**
 * Camera shake effect.
 */
export const Shake: React.FC<ShakeProps> = ({
  children,
  intensity = 5,
  speed = 3,
  startFrame = 0,
  duration = 1,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationFrames = Math.round(duration * fps);

  const isShaking = frame >= startFrame && frame < startFrame + durationFrames;

  const offsetX = useMemo(() => {
    if (!isShaking) return 0;
    const t = (frame - startFrame) / speed;
    return (
      Math.sin(t * Math.PI * 2) *
      intensity *
      (1 - (frame - startFrame) / durationFrames)
    );
  }, [frame, startFrame, isShaking, speed, intensity, durationFrames]);

  const offsetY = useMemo(() => {
    if (!isShaking) return 0;
    const t = (frame - startFrame) / speed;
    return (
      Math.cos(t * Math.PI * 2.5) *
      intensity *
      0.7 *
      (1 - (frame - startFrame) / durationFrames)
    );
  }, [frame, startFrame, isShaking, speed, intensity, durationFrames]);

  return (
    <AbsoluteFill
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export default Camera;
