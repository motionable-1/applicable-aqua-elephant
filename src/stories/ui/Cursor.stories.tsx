import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Cursor } from "../../remotion/library/components/ui/Cursor";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Cursor> = {
  title: "UI/Cursor",
  component: Cursor,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#f8fafc">
        <Story />
      </RemotionWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Cursor>;

export const Default: Story = {
  render: () => (
    <AbsoluteFill>
      <Cursor
        path={[
          { x: 200, y: 300, frame: 0 },
          { x: 500, y: 200, frame: 30 },
          { x: 700, y: 350, frame: 60 },
          { x: 900, y: 250, frame: 90 },
        ]}
      />
    </AbsoluteFill>
  ),
};

export const WithClicks: Story = {
  render: () => (
    <AbsoluteFill>
      {/* Clickable targets */}
      <div style={{ position: "absolute", left: 400, top: 250, width: 120, height: 44, background: "#3b82f6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "system-ui", fontWeight: 600, fontSize: 14 }}>
        Sign Up
      </div>
      <div style={{ position: "absolute", left: 700, top: 350, width: 120, height: 44, background: "#22c55e", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "system-ui", fontWeight: 600, fontSize: 14 }}>
        Confirm
      </div>
      <Cursor
        path={[
          { x: 200, y: 300, frame: 0 },
          { x: 460, y: 272, frame: 30, cursor: "pointer" },
          { x: 460, y: 272, frame: 45, click: true },
          { x: 760, y: 372, frame: 75, cursor: "pointer" },
          { x: 760, y: 372, frame: 90, click: true },
        ]}
        rippleColor="rgba(59, 130, 246, 0.5)"
      />
    </AbsoluteFill>
  ),
};

export const CursorStyles: Story = {
  render: () => (
    <AbsoluteFill>
      {/* Labels */}
      <div style={{ position: "absolute", left: 180, top: 280, fontSize: 12, color: "#666", fontFamily: "system-ui" }}>default</div>
      <div style={{ position: "absolute", left: 380, top: 180, fontSize: 12, color: "#666", fontFamily: "system-ui" }}>pointer</div>
      <div style={{ position: "absolute", left: 580, top: 280, fontSize: 12, color: "#666", fontFamily: "system-ui" }}>text</div>
      <div style={{ position: "absolute", left: 780, top: 180, fontSize: 12, color: "#666", fontFamily: "system-ui" }}>crosshair</div>
      <div style={{ position: "absolute", left: 980, top: 280, fontSize: 12, color: "#666", fontFamily: "system-ui" }}>grab</div>
      <Cursor
        path={[
          { x: 200, y: 300, frame: 0, cursor: "default" },
          { x: 400, y: 200, frame: 25, cursor: "pointer" },
          { x: 600, y: 300, frame: 50, cursor: "text" },
          { x: 800, y: 200, frame: 75, cursor: "crosshair" },
          { x: 1000, y: 300, frame: 100, cursor: "grab" },
        ]}
        size={28}
      />
    </AbsoluteFill>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={150} backgroundColor="#0a0a0a">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 400, top: 280, width: 140, height: 44, background: "#6366f1", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "system-ui", fontWeight: 600, fontSize: 14 }}>
        Get Started
      </div>
      <Cursor
        path={[
          { x: 200, y: 350, frame: 0 },
          { x: 470, y: 302, frame: 40, cursor: "pointer" },
          { x: 470, y: 302, frame: 55, click: true },
          { x: 800, y: 250, frame: 90 },
        ]}
        color="#ffffff"
        rippleColor="rgba(99, 102, 241, 0.6)"
      />
    </AbsoluteFill>
  ),
};
