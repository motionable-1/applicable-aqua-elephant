import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";

export type MorphShape = "circle" | "rounded";

export interface MorphProps extends Record<string, unknown> {
  shape: MorphShape;
  contract: number;
  blur: number;
}

function getClipPath(shape: MorphShape, insetPercent: number): string {
  const round = shape === "circle" ? "50%" : "24px";
  return `inset(${insetPercent}% round ${round})`;
}

const MorphComponent: React.FC<TransitionPresentationComponentProps<MorphProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps: { shape, contract, blur: peakBlur },
}) => {
  const t = presentationProgress;
  const isExiting = presentationDirection === "exiting";

  if (isExiting) {
    const clipInset = interpolate(t, [0, 0.5], [0, contract], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const scale = interpolate(t, [0, 0.5], [1, 0.92], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const opacity = interpolate(t, [0.3, 0.6], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const blurAmount = interpolate(t, [0, 0.3, 0.5], [0, peakBlur, peakBlur], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return (
      <AbsoluteFill
        style={{
          clipPath: getClipPath(shape, clipInset),
          transform: `scale(${scale})`,
          opacity,
          filter: blurAmount > 0.1 ? `blur(${blurAmount}px)` : undefined,
          zIndex: t < 0.5 ? 1 : 0,
        }}
      >
        {children}
      </AbsoluteFill>
    );
  }

  // Entering
  const clipInset = interpolate(t, [0.5, 1], [contract, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(t, [0.5, 1], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(t, [0.4, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blurAmount = interpolate(t, [0.5, 0.7, 1], [peakBlur, peakBlur, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        clipPath: getClipPath(shape, clipInset),
        transform: `scale(${scale})`,
        opacity,
        filter: blurAmount > 0.1 ? `blur(${blurAmount}px)` : undefined,
        zIndex: t >= 0.5 ? 1 : 0,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const morph = (props?: Partial<MorphProps>): TransitionPresentation<MorphProps> => {
  const shape = props?.shape ?? "circle";
  const contract = props?.contract ?? 25;
  const blur = props?.blur ?? 6;

  return {
    component: MorphComponent,
    props: { shape, contract, blur },
  };
};
