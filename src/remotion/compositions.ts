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

// Single composition configuration
export const composition: CompositionConfig = {
  id: "Main",
  component: Main,
  durationInFrames: 350,
  fps: 30,
  width: 1920,
  height: 1080,
  scenes: [],
};
