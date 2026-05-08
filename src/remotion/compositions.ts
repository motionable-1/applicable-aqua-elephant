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
  durationInFrames: 540,
  fps: 30,
  width: 1280,
  height: 720,
  scenes: [
    { label: "Brand Reveal", from: 0, durationInFrames: 102 },
    { label: "Noise To Signal", from: 102, durationInFrames: 102 },
    { label: "Live Trace", from: 204, durationInFrames: 102 },
    { label: "Proof Metrics", from: 306, durationInFrames: 102 },
    { label: "Final CTA", from: 408, durationInFrames: 132 },
  ],
};
