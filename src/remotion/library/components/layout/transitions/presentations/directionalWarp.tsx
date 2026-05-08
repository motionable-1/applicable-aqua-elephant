import { AbsoluteFill } from "remotion";
import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";

interface DirectionalWarpProps extends Record<string, unknown> {
  direction: "left" | "right";
}

const DirectionalWarpComponent: React.FC<TransitionPresentationComponentProps<DirectionalWarpProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps: { direction },
}) => {
  const isEntering = presentationDirection === "entering";
  const progress = presentationProgress;

  const dirMult = direction === "left" ? 1 : -1;

  if (isEntering) {
    const inv = 1 - progress;
    const translateX = inv * 100 * dirMult;
    const scaleX = 1 + (inv * 4);
    const blur = inv * 20;

    return (
      <AbsoluteFill
        style={{
            transform: `translateX(${translateX}%) scaleX(${scaleX})`,
            transformOrigin: direction === "left" ? "right center" : "left center",
            filter: `blur(${blur}px)`,
            zIndex: 1,
        }}
      >
        <AbsoluteFill style={{ transform: `scaleX(${1/scaleX})` }}>
            {children}
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  const translateX = progress * -100 * dirMult;
  const scaleX = 1 + (progress * 4);
  const blur = progress * 20;

  return (
    <AbsoluteFill
        style={{
            transform: `translateX(${translateX}%) scaleX(${scaleX})`,
            transformOrigin: direction === "left" ? "left center" : "right center",
            filter: `blur(${blur}px)`,
        }}
    >
        <AbsoluteFill style={{ transform: `scaleX(${1/scaleX})` }}>
            {children}
        </AbsoluteFill>
    </AbsoluteFill>
  );
};

export function directionalWarp(
  direction: "left" | "right" = "left"
): TransitionPresentation<DirectionalWarpProps> {
  return {
    component: DirectionalWarpComponent,
    props: { direction },
  };
}
