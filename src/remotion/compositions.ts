import { Main } from "./compositions/Main";

export type SceneMarker = {
  label: string;
  from: number;
  durationInFrames?: number;
};

export type CompositionConfig = {
  id: string;
  component: typeof Main;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  scenes?: SceneMarker[];
};

export const composition: CompositionConfig = {
  id: "Main",
  component: Main,
  durationInFrames: 465,
  fps: 30,
  width: 1280,
  height: 720,
  scenes: [
    { label: "Brand Reveal", from: 0, durationInFrames: 87 },
    { label: "Noise To Signal", from: 87, durationInFrames: 87 },
    { label: "Live Trace", from: 174, durationInFrames: 87 },
    { label: "Proof Metrics", from: 261, durationInFrames: 87 },
    { label: "Final CTA", from: 348, durationInFrames: 117 },
  ],
};
