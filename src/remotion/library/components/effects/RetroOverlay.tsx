import React, { useId } from "react";
import { useCurrentFrame, useVideoConfig, random } from "remotion";

export type RetroStyle = "vhs" | "crt" | "film" | "camcorder";

export interface RetroOverlayProps {
  /** Retro aesthetic style */
  retroStyle?: RetroStyle;
  /** Effect intensity 0-1 */
  intensity?: number;
  /** Animation speed */
  speed?: number;
  /** CSS blend mode */
  blend?: React.CSSProperties["mixBlendMode"];
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Retro / VHS / CRT / Film overlay effect.
 * Top trending motion design aesthetic in 2025-2026.
 *
 * @example
 * <RetroOverlay retroStyle="vhs" intensity={0.6} />
 */
export const RetroOverlay: React.FC<RetroOverlayProps> = ({
  retroStyle = "vhs",
  intensity = 0.5,
  speed = 1,
  blend = "normal",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const filterId = useId();
  const time = (frame / fps) * speed;

  // Deterministic glitch offset
  const seed = Math.floor(frame * speed);
  const glitchActive = random(`retro-glitch-${seed}`) > 0.92;
  const glitchOffset = glitchActive ? (random(`retro-goff-${seed}`) - 0.5) * 20 * intensity : 0;

  // Tracking line position
  const trackingY = ((time * 30) % (height + 40)) - 20;

  // Color bleed offset
  const colorBleed = intensity * 3;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: blend,
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Scan lines */}
      {(retroStyle === "vhs" || retroStyle === "crt") && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent ${retroStyle === "crt" ? "1px" : "2px"},
              rgba(0,0,0,${0.15 * intensity}) ${retroStyle === "crt" ? "1px" : "2px"},
              rgba(0,0,0,${0.15 * intensity}) ${retroStyle === "crt" ? "2px" : "4px"}
            )`,
            zIndex: 1,
          }}
        />
      )}

      {/* VHS tracking line */}
      {retroStyle === "vhs" && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: trackingY,
            width: "100%",
            height: 3 + intensity * 8,
            background: `linear-gradient(180deg, transparent, rgba(255,255,255,${0.15 * intensity}), transparent)`,
            zIndex: 2,
          }}
        />
      )}

      {/* Color separation / chromatic aberration */}
      {(retroStyle === "vhs" || retroStyle === "camcorder") && (
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, zIndex: 3 }}
        >
          <defs>
            <filter id={`${filterId}-chroma`}>
              <feOffset in="SourceGraphic" dx={colorBleed + glitchOffset} dy={0} result="red" />
              <feOffset in="SourceGraphic" dx={-colorBleed} dy={0} result="blue" />
              <feColorMatrix
                in="red"
                type="matrix"
                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.15 0"
                result="redOnly"
              />
              <feColorMatrix
                in="blue"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 0.12 0"
                result="blueOnly"
              />
              <feMerge>
                <feMergeNode in="redOnly" />
                <feMergeNode in="blueOnly" />
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" filter={`url(#${filterId}-chroma)`} fill="transparent" />
        </svg>
      )}

      {/* CRT curvature vignette */}
      {retroStyle === "crt" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: `inset 0 0 ${80 * intensity}px rgba(0,0,0,${0.5 * intensity})`,
            borderRadius: `${4 * intensity}%`,
            zIndex: 4,
          }}
        />
      )}

      {/* Film scratches */}
      {retroStyle === "film" && (
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, zIndex: 2 }}
        >
          {Array.from({ length: Math.ceil(3 * intensity) }).map((_, i) => {
            const x = random(`film-scratch-x-${seed}-${i}`) * width;
            const visible = random(`film-scratch-v-${seed}-${i}`) > 0.6;
            if (!visible) return null;
            return (
              <line
                key={i}
                x1={x}
                y1={0}
                x2={x + (random(`film-scratch-dx-${seed}-${i}`) - 0.5) * 3}
                y2={height}
                stroke={`rgba(255,255,255,${0.15 * intensity})`}
                strokeWidth={0.5 + random(`film-scratch-w-${seed}-${i}`) * 1}
              />
            );
          })}
        </svg>
      )}

      {/* Film dust */}
      {retroStyle === "film" && (
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, zIndex: 3 }}
        >
          {Array.from({ length: Math.ceil(8 * intensity) }).map((_, i) => {
            const visible = random(`film-dust-v-${seed}-${i}`) > 0.7;
            if (!visible) return null;
            const dx = random(`film-dust-x-${seed}-${i}`) * width;
            const dy = random(`film-dust-y-${seed}-${i}`) * height;
            const size = 0.5 + random(`film-dust-s-${seed}-${i}`) * 2;
            return (
              <circle
                key={i}
                cx={dx}
                cy={dy}
                r={size}
                fill={`rgba(255,255,255,${0.2 * intensity})`}
              />
            );
          })}
        </svg>
      )}

      {/* Camcorder date/REC overlay */}
      {retroStyle === "camcorder" && (
        <>
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
              zIndex: 5,
              opacity: intensity,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#ff0000",
                opacity: Math.sin(time * 3) > 0 ? 1 : 0.3,
              }}
            />
            <span
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontFamily: "monospace",
                fontWeight: 700,
                textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
              }}
            >
              REC
            </span>
          </div>
          {/* Viewfinder corners */}
          {[
            { top: 40, left: 20 },
            { top: 40, right: 20 },
            { bottom: 20, left: 20 },
            { bottom: 20, right: 20 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                ...pos,
                width: 20,
                height: 20,
                borderColor: `rgba(255,255,255,${0.5 * intensity})`,
                borderStyle: "solid",
                borderWidth: 0,
                ...(i === 0 ? { borderTopWidth: 1, borderLeftWidth: 1 } : {}),
                ...(i === 1 ? { borderTopWidth: 1, borderRightWidth: 1 } : {}),
                ...(i === 2 ? { borderBottomWidth: 1, borderLeftWidth: 1 } : {}),
                ...(i === 3 ? { borderBottomWidth: 1, borderRightWidth: 1 } : {}),
                zIndex: 5,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default RetroOverlay;
