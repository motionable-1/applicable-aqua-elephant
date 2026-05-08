import { useMemo, useCallback } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene definition for sequencing animations.
 */
export interface SequenceScene {
  /** Unique identifier for this scene */
  id: string;
  /** Start time in seconds */
  at: number;
  /** Duration in seconds */
  duration: number;
}

/**
 * Beat marker for single-moment events in the sequence.
 */
export interface SequenceBeat {
  /** Unique identifier for this beat */
  id: string;
  /** Time in seconds when the beat occurs */
  at: number;
}

/**
 * Hook return type for useSequence.
 */
export interface UseSequenceReturn {
  /** Current time in seconds */
  currentTime: number;
  /** Check if a scene is currently active */
  isSceneActive: (sceneId: string) => boolean;
  /** Get the progress of a scene (0-1). Returns 0 before scene starts, 1 after it ends. */
  getSceneProgress: (sceneId: string) => number;
  /** Check if a beat has been reached */
  isBeatReached: (beatId: string) => boolean;
  /** Total duration of the sequence in seconds */
  totalDuration: number;
}

/**
 * Declarative hook to orchestrate multiple animations with labeled scenes and beats.
 * Integrates with Remotion's frame-based system.
 *
 * Scenes and beats are passed as static configuration. The hook returns
 * query functions that reflect the current frame.
 *
 * @example
 * const scenes = [
 *   { id: 'intro', at: 0, duration: 1 },
 *   { id: 'main', at: 1, duration: 2 },
 *   { id: 'outro', at: 3, duration: 1 },
 * ];
 *
 * const beats = [
 *   { id: 'impact', at: 1.5 },
 * ];
 *
 * const { isSceneActive, getSceneProgress, isBeatReached } = useSequence(scenes, beats);
 *
 * // Check if scene is active
 * if (isSceneActive('intro')) {
 *   // Render intro content
 * }
 *
 * // Get scene progress for animations
 * const progress = getSceneProgress('main'); // 0 before, 0-1 during, 1 after
 *
 * // Check beat
 * const impactHappened = isBeatReached('impact');
 */
export function useSequence(
  scenes: SequenceScene[],
  beats: SequenceBeat[] = [],
): UseSequenceReturn {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTime = frame / fps;

  // Build lookup maps once (stable across renders as long as array refs are stable)
  const sceneMap = useMemo(() => {
    const map = new Map<string, SequenceScene>();
    for (const scene of scenes) {
      map.set(scene.id, scene);
    }
    return map;
  }, [scenes]);

  const beatMap = useMemo(() => {
    const map = new Map<string, SequenceBeat>();
    for (const beat of beats) {
      map.set(beat.id, beat);
    }
    return map;
  }, [beats]);

  const isSceneActive = useCallback(
    (sceneId: string): boolean => {
      const scene = sceneMap.get(sceneId);
      if (!scene) return false;
      return currentTime >= scene.at && currentTime < scene.at + scene.duration;
    },
    [sceneMap, currentTime],
  );

  const getSceneProgress = useCallback(
    (sceneId: string): number => {
      const scene = sceneMap.get(sceneId);
      if (!scene) return 0;
      if (currentTime < scene.at) return 0;
      if (currentTime >= scene.at + scene.duration) return 1;
      return (currentTime - scene.at) / scene.duration;
    },
    [sceneMap, currentTime],
  );

  const isBeatReached = useCallback(
    (beatId: string): boolean => {
      const beat = beatMap.get(beatId);
      if (!beat) return false;
      return currentTime >= beat.at;
    },
    [beatMap, currentTime],
  );

  const totalDuration = useMemo(() => {
    let max = 0;
    for (const scene of scenes) {
      const end = scene.at + scene.duration;
      if (end > max) max = end;
    }
    for (const beat of beats) {
      if (beat.at > max) max = beat.at;
    }
    return max;
  }, [scenes, beats]);

  return {
    currentTime,
    isSceneActive,
    getSceneProgress,
    isBeatReached,
    totalDuration,
  };
}
