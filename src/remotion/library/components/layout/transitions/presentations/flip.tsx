import React from "react";
import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";

export type FlipDirection = "horizontal" | "vertical";

export interface FlipProps extends Record<string, unknown> {
  direction: FlipDirection;
  perspective: number;
}

const FlipComponent: React.FC<TransitionPresentationComponentProps<FlipProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps: { direction, perspective },
}) => {
  const finished = presentationDirection === "exiting";
  const t = presentationProgress;

  const rotationAxis = direction === "horizontal" ? "Y" : "X";

  const style: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    perspective: `${perspective}px`,
    transformStyle: "preserve-3d",
  };

  const innerStyle: React.CSSProperties = {
      width: "100%",
      height: "100%",
      backfaceVisibility: "hidden",
  }

  if (finished) {
      const rotation = -180 * t;

      return (
          <div style={style}>
              <div style={{
                  ...innerStyle,
                  transform: `rotate${rotationAxis}(${rotation}deg)`,
                  zIndex: t < 0.5 ? 2 : 0,
                  opacity: t < 0.5 ? 1 : 0
              }}>
                  {children}
              </div>
          </div>
      );
  } else {
       const rotation = 180 * (1 - t);
       return (
          <div style={style}>
              <div style={{
                  ...innerStyle,
                  transform: `rotate${rotationAxis}(${rotation}deg)`,
                  zIndex: t >= 0.5 ? 2 : 0,
                  opacity: t >= 0.5 ? 1 : 0
              }}>
                  {children}
              </div>
          </div>
      );
  }
};

export const flip = (props?: Partial<FlipProps>): TransitionPresentation<FlipProps> => {
  const direction = props?.direction ?? "horizontal";
  const perspective = props?.perspective ?? 1000;

  return {
    props: { direction, perspective },
    component: FlipComponent,
  };
};
