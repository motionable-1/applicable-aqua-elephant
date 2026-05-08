import { AbsoluteFill } from "remotion";
import type { TransitionPresentation } from "@remotion/transitions";
import type { CustomProps, PresentationComponentProps } from "./types";

const ClockWipeComponent: React.FC<PresentationComponentProps> = ({
  children,
  presentationDirection,
  presentationProgress,
}) => {
  const isEntering = presentationDirection === "entering";
  const progress = presentationProgress;

  if (isEntering) {
    const degrees = progress * 360;

    return (
      <AbsoluteFill
        style={{
          WebkitMaskImage: `conic-gradient(from 0deg at 50% 50%, black 0deg, black ${degrees}deg, transparent ${degrees}deg, transparent 360deg)`,
          maskImage: `conic-gradient(from 0deg at 50% 50%, black 0deg, black ${degrees}deg, transparent ${degrees}deg, transparent 360deg)`,
          zIndex: 1,
        }}
      >
        {children}
      </AbsoluteFill>
    );
  }

  return <AbsoluteFill>{children}</AbsoluteFill>;
};

export function clockWipe(): TransitionPresentation<CustomProps> {
  return {
    component: ClockWipeComponent,
    props: {} as CustomProps,
  };
}
