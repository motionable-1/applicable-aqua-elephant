import { AbsoluteFill } from "remotion";
import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";

interface SlideOverProps extends Record<string, unknown> {
  direction: "left" | "right" | "top" | "bottom";
}

const SlideOverComponent: React.FC<TransitionPresentationComponentProps<SlideOverProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps: { direction },
}) => {
  const isEntering = presentationDirection === "entering";
  const progress = presentationProgress;
  const smoothProgress = progress;

  if (isEntering) {
    const xOffset = (1 - smoothProgress) * 100 * (direction === "left" ? 1 : direction === "right" ? -1 : 0);
    const yOffset = (1 - smoothProgress) * 100 * (direction === "top" ? 1 : direction === "bottom" ? -1 : 0);

    return (
      <AbsoluteFill
        style={{
          transform: `translate(${xOffset}%, ${yOffset}%)`,
          zIndex: 1,
          boxShadow: '0 0 40px rgba(0,0,0,0.5)',
        }}
      >
        {children}
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill
        style={{
            filter: `brightness(${1 - smoothProgress * 0.5})`,
            transform: `scale(${1 - smoothProgress * 0.05})`,
        }}
    >
      {children}
    </AbsoluteFill>
  );
};

export function slideOver(
  direction: "left" | "right" | "top" | "bottom"
): TransitionPresentation<SlideOverProps> {
  return {
    component: SlideOverComponent,
    props: { direction },
  };
}
