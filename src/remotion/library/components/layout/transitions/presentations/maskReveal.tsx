import { AbsoluteFill } from "remotion";
import type { TransitionPresentation } from "@remotion/transitions";
import type { CustomProps, PresentationComponentProps } from "./types";

const MaskRevealComponent: React.FC<PresentationComponentProps> = ({
  children,
  presentationDirection,
  presentationProgress,
}) => {
  const isEntering = presentationDirection === "entering";
  const progress = presentationProgress;

  if (isEntering) {
    const t = progress;
    const radius = t * 150;

    return (
      <AbsoluteFill
        style={{
          clipPath: `circle(${radius}% at 50% 50%)`,
          zIndex: 1,
        }}
      >
        {children}
      </AbsoluteFill>
    );
  }

  return <AbsoluteFill>{children}</AbsoluteFill>;
};

export function maskReveal(): TransitionPresentation<CustomProps> {
  return {
    component: MaskRevealComponent,
    props: {} as CustomProps,
  };
}
