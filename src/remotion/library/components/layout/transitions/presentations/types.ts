import type React from "react";

export type CustomProps = Record<string, never>;

export interface PresentationComponentProps {
  children: React.ReactNode;
  presentationDirection: "entering" | "exiting";
  presentationProgress: number;
  passedProps: CustomProps;
}
