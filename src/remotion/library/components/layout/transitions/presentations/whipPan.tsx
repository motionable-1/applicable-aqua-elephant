import { AbsoluteFill } from "remotion";
import type { TransitionPresentation } from "@remotion/transitions";
import type { CustomProps, PresentationComponentProps } from "./types";

const easeIn = (t: number) => t * t * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const WhipPanComponent: React.FC<PresentationComponentProps> = ({
  children,
  presentationDirection,
  presentationProgress,
}) => {
  const isEntering = presentationDirection === "entering";
  const progress = presentationProgress;

  const direction = 1;
  const width = 100;

  if (isEntering) {
      const t = easeOut(progress);
      const translateX = (1 - t) * width * direction;
      const speed = (1 - progress);
      const blurAmount = speed * 50;

      return (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
            <svg width="0" height="0">
                <filter id="whip-pan-blur-enter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={`${blurAmount},0`} />
                </filter>
            </svg>
            <AbsoluteFill
                style={{
                    transform: `translateX(${translateX}%)`,
                    filter: `url(#whip-pan-blur-enter)`,
                }}
            >
                {children}
            </AbsoluteFill>
        </AbsoluteFill>
      );
  } else {
      const t = easeIn(progress);
      const translateX = t * -width * direction;
      const speed = progress;
      const blurAmount = speed * 50;

       return (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
            <svg width="0" height="0">
                <filter id="whip-pan-blur-exit">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={`${blurAmount},0`} />
                </filter>
            </svg>
            <AbsoluteFill
                style={{
                    transform: `translateX(${translateX}%)`,
                    filter: `url(#whip-pan-blur-exit)`,
                }}
            >
                {children}
            </AbsoluteFill>
        </AbsoluteFill>
      );
  }
};

export function whipPan(): TransitionPresentation<CustomProps> {
  return {
    component: WhipPanComponent,
    props: {} as CustomProps,
  };
}
