import { useMemo } from "react";
import { getEasing, type EasingName } from "../presets/easings";

/**
 * Stagger pattern types for different animation sequences.
 */
export type StaggerPattern =
  | "start" // From the beginning
  | "end" // From the end
  | "center" // From the center outward
  | "edges" // From both edges toward center
  | "random" // Random order
  | "wave"; // Wave pattern (for grids)

/**
 * Configuration for stagger animations.
 */
export interface StaggerConfig {
  /** Total stagger amount in seconds (distributed across all items) */
  amount?: number;
  /** Stagger per item in seconds (alternative to amount) */
  each?: number;
  /** Stagger pattern */
  pattern?: StaggerPattern;
  /** Starting index for 'start' pattern or origin for 'center'/'edges' */
  from?: number | "start" | "end" | "center" | "edges" | "random";
  /** Easing for stagger distribution */
  ease?: EasingName | string;
  /** Grid dimensions [columns, rows] for wave pattern */
  grid?: [number, number];
  /** Direction for grid stagger: 'x', 'y', or 'both' */
  axis?: "x" | "y" | "both";
}

/**
 * Return type for useStagger hook.
 */
export interface UseStaggerReturn {
  /** Get the delay for a specific item index */
  getDelay: (index: number, total: number) => number;
  /** Generate GSAP stagger config object */
  toGsap: (total: number) => gsap.StaggerVars;
  /** Get all delays as an array */
  getDelays: (total: number) => number[];
}

/**
 * Hook for creating advanced stagger patterns.
 *
 * @example
 * // Basic stagger from start
 * const { getDelay } = useStagger({ amount: 0.5 });
 *
 * // Center-out stagger
 * const { getDelay } = useStagger({ amount: 0.8, pattern: 'center' });
 *
 * // Grid wave stagger
 * const { toGsap } = useStagger({
 *   amount: 1,
 *   pattern: 'wave',
 *   grid: [4, 3],
 *   axis: 'both'
 * });
 */
export function useStagger(config: StaggerConfig = {}): UseStaggerReturn {
  const {
    amount = 0.5,
    each,
    pattern = "start",
    from = "start",
    ease = "power1.out",
    grid,
    axis = "both",
  } = config;

  const gsapEase = getEasing(ease);

  // Calculate delay for a single item
  const getDelay = useMemo(() => {
    return (index: number, total: number): number => {
      if (total <= 1) return 0;

      const staggerEach = each ?? amount / (total - 1);

      // Calculate position factor (0-1) based on pattern
      let factor: number;

      switch (pattern) {
        case "start":
          factor = index / (total - 1);
          break;

        case "end":
          factor = (total - 1 - index) / (total - 1);
          break;

        case "center": {
          const center = (total - 1) / 2;
          const distance = Math.abs(index - center);
          factor = distance / center;
          break;
        }

        case "edges": {
          const center = (total - 1) / 2;
          const distance = Math.abs(index - center);
          factor = 1 - distance / center;
          break;
        }

        case "random":
          // Use a deterministic "random" based on index for consistency
          factor = Math.abs(Math.sin(index * 12.9898 + index * 78.233)) % 1;
          break;

        case "wave":
          if (grid) {
            const [cols] = grid;
            const row = Math.floor(index / cols);
            const col = index % cols;
            const maxRow = Math.floor((total - 1) / cols);
            const maxCol = cols - 1;

            if (axis === "x") {
              factor = col / maxCol;
            } else if (axis === "y") {
              factor = row / maxRow;
            } else {
              // Both - diagonal wave
              factor = (row / maxRow + col / maxCol) / 2;
            }
          } else {
            factor = index / (total - 1);
          }
          break;

        default:
          factor = index / (total - 1);
      }

      return factor * (each ? staggerEach * (total - 1) : amount);
    };
  }, [amount, each, pattern, grid, axis]);

  // Generate all delays as an array
  const getDelays = useMemo(() => {
    return (total: number): number[] => {
      return Array.from({ length: total }, (_, i) => getDelay(i, total));
    };
  }, [getDelay]);

  // Generate GSAP stagger config
  const toGsap = useMemo(() => {
    return (total: number): gsap.StaggerVars => {
      // For simple patterns, use GSAP's built-in stagger
      if (pattern === "start" && !grid) {
        return {
          amount,
          ease: gsapEase,
        };
      }

      if (pattern === "end" && !grid) {
        return {
          amount,
          from: "end",
          ease: gsapEase,
        };
      }

      if (pattern === "center" && !grid) {
        return {
          amount,
          from: "center",
          ease: gsapEase,
        };
      }

      if (pattern === "edges" && !grid) {
        return {
          amount,
          from: "edges",
          ease: gsapEase,
        };
      }

      if (pattern === "random" && !grid) {
        return {
          amount,
          from: "random",
          ease: gsapEase,
        };
      }

      if (pattern === "wave" && grid) {
        return {
          amount,
          from: "start",
          grid,
          axis: axis === "both" ? undefined : axis,
          ease: gsapEase,
        };
      }

      // Default fallback
      return {
        each: each ?? amount / Math.max(total - 1, 1),
        ease: gsapEase,
      };
    };
  }, [amount, each, pattern, from, gsapEase, grid, axis]);

  return {
    getDelay,
    toGsap,
    getDelays,
  };
}

/**
 * Create a stagger configuration object for GSAP.
 * Convenience function for one-off stagger needs.
 */
export function createStagger(config: StaggerConfig): gsap.StaggerVars {
  const {
    amount = 0.5,
    pattern = "start",
    ease = "power1.out",
    grid,
    axis = "both",
  } = config;

  const gsapEase = getEasing(ease);

  if (grid) {
    return {
      amount,
      from: pattern === "center" ? "center" : "start",
      grid,
      axis: axis === "both" ? undefined : axis,
      ease: gsapEase,
    };
  }

  const fromMap: Record<StaggerPattern, "start" | "end" | "center" | "edges" | "random"> = {
    start: "start",
    end: "end",
    center: "center",
    edges: "edges",
    random: "random",
    wave: "start",
  };

  return {
    amount,
    from: fromMap[pattern],
    ease: gsapEase,
  };
}
