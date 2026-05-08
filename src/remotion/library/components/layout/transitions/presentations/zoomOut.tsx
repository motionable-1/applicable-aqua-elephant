import { AbsoluteFill } from "remotion";
import type { TransitionPresentation } from "@remotion/transitions";
import type { CustomProps, PresentationComponentProps } from "./types";

const ZoomOutComponent: React.FC<PresentationComponentProps> = ({
  children,
  presentationDirection,
  presentationProgress,
}) => {
  const isEntering = presentationDirection === "entering";
  const progress = presentationProgress;
  const smoothProgress = progress * progress * (3 - 2 * progress);

  if (isEntering) {
    const scale = 1.5 - smoothProgress * 0.5;
    const blur = (1 - smoothProgress) * 5;
    return (
      <AbsoluteFill
        style={{
          opacity: smoothProgress,
          transform: `scale(${scale})`,
          filter: `blur(${blur}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
    );
  }

  const scale = 1 - smoothProgress * 0.5;
  const blur = smoothProgress * 5;
  return (
    <AbsoluteFill
      style={{
        opacity: 1 - smoothProgress,
        transform: `scale(${scale})`,
        filter: `blur(${blur}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export function zoomOut(): TransitionPresentation<CustomProps> {
  return {
    component: ZoomOutComponent,
    props: {} as CustomProps,
  };
}
