import gsap from "gsap";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  delayRender,
  continueRender,
} from "remotion";

export interface UseGsapTimelineOptions {
  /** Starting frame for the animation (default: 0) */
  startFrom?: number;
}

export const useGsapTimeline = <T extends HTMLElement>(
  gsapTimelineFactory: () => gsap.core.Timeline,
  deps: React.DependencyList = [],
  options: UseGsapTimelineOptions = {},
) => {
  const { startFrom = 0 } = options;
  const animationScopeRef = useRef<T>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const memoizedTimelineFactory = useCallback(gsapTimelineFactory, deps);

  // Create the timeline in useEffect (needs DOM mounted).
  // Use delayRender to prevent Remotion from capturing a frame
  // before the GSAP timeline is set up and seeked.
  useEffect(() => {
    const handle = delayRender("Waiting for GSAP timeline setup");
    const ctx = gsap.context(() => {
      timelineRef.current = memoizedTimelineFactory();
      timelineRef.current.pause();
    }, animationScopeRef);

    // Seek to the correct position immediately after creation
    if (timelineRef.current) {
      const effectiveFrame = Math.max(0, frame - startFrom);
      timelineRef.current.seek(effectiveFrame / fps);
    }

    continueRender(handle);
    return () => ctx.revert();
  }, [memoizedTimelineFactory]);

  // Seek the timeline before paint on every frame change.
  // useLayoutEffect fires synchronously after DOM mutations but before
  // the browser paints, preventing flash of unstyled content.
  useLayoutEffect(() => {
    if (timelineRef.current) {
      const effectiveFrame = Math.max(0, frame - startFrom);
      timelineRef.current.seek(effectiveFrame / fps);
    }
  }, [frame, fps, startFrom]);

  return animationScopeRef;
};
