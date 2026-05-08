import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { Window } from "../../remotion/library/components/ui/Window";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof Window> = {
  title: "UI/Window",
  component: Window,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#e5e7eb">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    dark: { control: "boolean" },
    controls: { control: "boolean" },
    radius: { control: { type: "range", min: 0, max: 24, step: 2 } },
    shadow: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Window>;

export const Default: Story = {
  args: {
    title: "My Application",
    dark: false,
    controls: true,
  },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 60 }}>
      <Window {...args} style={{ width: 500, height: 320 }}>
        <div style={{ padding: 20 }}>
          <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600 }}>Welcome</h2>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.7, lineHeight: 1.5 }}>
            This is a window component with OS-style chrome, traffic light controls, and a centered title.
          </p>
        </div>
      </Window>
    </AbsoluteFill>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0f0f23">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 60 }}>
      <Window title="Terminal" dark style={{ width: 500, height: 300 }}>
        <div style={{ padding: 16, fontFamily: "monospace", fontSize: 13, lineHeight: 1.6 }}>
          <div><span style={{ color: "#22c55e" }}>$</span> npm install remotion</div>
          <div style={{ opacity: 0.6 }}>added 142 packages in 3.2s</div>
          <div style={{ marginTop: 8 }}><span style={{ color: "#22c55e" }}>$</span> npm run dev</div>
          <div style={{ opacity: 0.6 }}>Server running at http://localhost:3000</div>
        </div>
      </Window>
    </AbsoluteFill>
  ),
};

export const BrowserMockup: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 60 }}>
      <Window title="https://example.com" style={{ width: 600, height: 380 }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center", fontFamily: "system-ui" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#1e293b" }}>Example Website</div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Your content here</div>
          </div>
        </div>
      </Window>
    </AbsoluteFill>
  ),
};

export const NoControls: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 60 }}>
      <Window title="Minimal" controls={false} radius={16} style={{ width: 400, height: 250 }}>
        <div style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <div style={{ fontSize: 16, opacity: 0.6, fontFamily: "system-ui" }}>No traffic lights</div>
        </div>
      </Window>
    </AbsoluteFill>
  ),
};
