import { AbsoluteFill } from "remotion";
import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";

interface PushProps extends Record<string, unknown> {
  direction: "left" | "right";
}

const PushComponent: React.FC<TransitionPresentationComponentProps<PushProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps: { direction },
}) => {
  const isEntering = presentationDirection === "entering";
  const progress = presentationProgress;
  const smoothProgress = progress * progress * (3 - 2 * progress);

  const multiplier = direction === "left" ? 1 : -1;

  if (isEntering) {
    const translateX = (1 - smoothProgress) * 100 * multiplier;
    return (
      <AbsoluteFill
        style={{
          transform: `translateX(${translateX}%) scale(${0.95 + smoothProgress * 0.05})`,
          filter: `brightness(${0.7 + smoothProgress * 0.3})`,
          zIndex: 1,
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        }}
      >
        {children}
      </AbsoluteFill>
    );
  }

  const translateX = smoothProgress * -100 * multiplier;
  return (
    <AbsoluteFill
      style={{
        transform: `translateX(${translateX}%) scale(${1 - smoothProgress * 0.05})`,
        filter: `brightness(${1 - smoothProgress * 0.3})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export function push(
  direction: "left" | "right"
): TransitionPresentation<PushProps> {
  return {
    component: PushComponent,
    props: { direction },
  };
}
