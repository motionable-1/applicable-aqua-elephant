import type { Meta, StoryObj } from "@storybook/react";
import { AbsoluteFill } from "remotion";
import { BubbleMessage, ChatConversation } from "../../remotion/library/components/text/BubbleMessage";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof BubbleMessage> = {
  title: "Text/BubbleMessage",
  component: BubbleMessage,
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={180} backgroundColor="#f5f5f5">
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    type: { control: { type: "radio" }, options: ["sent", "received"] },
    platform: { control: { type: "select" }, options: ["ios", "android", "whatsapp", "generic"] },
    tail: { control: "boolean" },
    typing: { control: "boolean" },
    delay: { control: { type: "range", min: 0, max: 2, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof BubbleMessage>;

export const Default: Story = {
  args: {
    type: "sent",
    platform: "ios",
  },
  render: (args) => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ width: 400 }}>
        <BubbleMessage {...args}>Hey, how are you?</BubbleMessage>
      </div>
    </AbsoluteFill>
  ),
};

export const IOSConversation: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ width: 400, backgroundColor: "#fff", borderRadius: 20, padding: 20 }}>
        <ChatConversation
          platform="ios"
          messages={[
            { id: 1, text: "Hey! Are you coming tonight?", type: "received", delay: 0.5 },
            { id: 2, text: "Yes! What time?", type: "sent", delay: 0.8 },
            { id: 3, text: "8pm at the usual place", type: "received", delay: 0.6 },
            { id: 4, text: "Perfect, see you there!", type: "sent", delay: 0.5 },
          ]}
        />
      </div>
    </AbsoluteFill>
  ),
};

export const WhatsAppStyle: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={210} backgroundColor="#e5ddd5">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ width: 400 }}>
        <ChatConversation
          platform="whatsapp"
          messages={[
            { id: 1, text: "Check out this new feature!", type: "received", delay: 0.6 },
            { id: 2, text: "Wow, that looks amazing!", type: "sent", delay: 0.7 },
            { id: 3, text: "Right? Shipped it today", type: "received", delay: 0.5 },
          ]}
        />
      </div>
    </AbsoluteFill>
  ),
};

export const TypingIndicator: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ width: 400, display: "flex", flexDirection: "column", gap: 8 }}>
        <BubbleMessage type="sent" platform="ios">
          Hello?
        </BubbleMessage>
        <BubbleMessage type="received" platform="ios" typing delay={0.8} />
      </div>
    </AbsoluteFill>
  ),
};

export const WithTimestamps: Story = {
  render: () => (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ width: 400, display: "flex", flexDirection: "column", gap: 8 }}>
        <BubbleMessage type="received" platform="ios" time="9:41 AM" sender="Alex">
          Meeting at 3?
        </BubbleMessage>
        <BubbleMessage type="sent" platform="ios" time="9:42 AM" delay={0.6}>
          Works for me!
        </BubbleMessage>
      </div>
    </AbsoluteFill>
  ),
};
