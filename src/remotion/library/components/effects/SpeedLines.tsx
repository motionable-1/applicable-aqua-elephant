import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, random } from "remotion";

export interface SpeedLinesProps {
  /** Number of lines */
  count?: number;
  /** Line color */
  color?: string;
  /** Line length (percentage of radius) */
  length?: number;
  /** Inner radius (percentage of screen size) */
  innerRadius?: number;
  /** Rotation speed */
  speed?: number;
  /** Random seed */
  seed?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Anime-style action speed lines (Manga effect).
 * Great for high-energy transitions or impacts.
 * 
 * @example
 * <SpeedLines color="#ffffff" count={40} speed={2} />
 */
export const SpeedLines: React.FC<SpeedLinesProps> = ({
  count = 30,
  color = "#000000",
  length = 0.5, // 0 to 1
  innerRadius = 0.2, // 0 to 1
  speed = 10,
  seed = "speedlines",
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const radius = Math.max(width, height) * 0.8;
  const cx = width / 2;
  const cy = height / 2;

  // Generate lines
  const lines = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = random(`${seed}-${i}`) * Math.PI * 2;
      const width = 1 + random(`${seed}-w-${i}`) * 4;
      const len = length * (0.8 + random(`${seed}-l-${i}`) * 0.4); // Variation
      return { angle, width, len };
    });
  }, [count, seed, length]);

  const rotation = frame * speed;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "center",
        }}
      >
        <defs>
          <mask id="center-mask">
             <rect x="0" y="0" width={width} height={height} fill="white" />
             <circle cx={cx} cy={cy} r={Math.min(width, height) * innerRadius} fill="black" />
          </mask>
        </defs>
        
        <g mask="url(#center-mask)">
            {lines.map((line, i) => {
                // End closer to center based on length
                // length 1 = touches center
                // length 0 = stays at edge
                const rEnd = radius * 2 * (1 - line.len);

                return (
                    <polygon
                        key={i}
                        points={`
                            ${cx + Math.cos(line.angle - 0.01 * line.width) * radius * 2},${cy + Math.sin(line.angle - 0.01 * line.width) * radius * 2}
                            ${cx + Math.cos(line.angle + 0.01 * line.width) * radius * 2},${cy + Math.sin(line.angle + 0.01 * line.width) * radius * 2}
                            ${cx + Math.cos(line.angle) * rEnd},${cy + Math.sin(line.angle) * rEnd}
                        `}
                        fill={color}
                    />
                );
            })}
        </g>
      </svg>
    </div>
  );
};

export default SpeedLines;
