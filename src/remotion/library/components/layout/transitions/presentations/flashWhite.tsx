import { AbsoluteFill } from "remotion";
import type { TransitionPresentation } from "@remotion/transitions";
import type { CustomProps, PresentationComponentProps } from "./types";

const FlashWhiteComponent: React.FC<PresentationComponentProps> = ({
  children,
  presentationDirection,
  presentationProgress,
}) => {
  const isEntering = presentationDirection === "entering";
  const progress = presentationProgress;

  const flashOpacity =
    progress < 0.5
        ? progress * 2
        : (1 - progress) * 2;

  if (isEntering) {
      return (
        <AbsoluteFill>
            <AbsoluteFill style={{ opacity: progress }}>
                {children}
            </AbsoluteFill>
            <AbsoluteFill
                style={{
                    backgroundColor: 'white',
                    opacity: flashOpacity,
                    pointerEvents: 'none',
                }}
            />
        </AbsoluteFill>
      );
  }

  return (
    <AbsoluteFill>
        <AbsoluteFill style={{ opacity: 1 - progress }}>
            {children}
        </AbsoluteFill>
    </AbsoluteFill>
  );
};

export function flashWhite(): TransitionPresentation<CustomProps> {
  return {
    component: FlashWhiteComponent,
    props: {} as CustomProps,
  };
}
