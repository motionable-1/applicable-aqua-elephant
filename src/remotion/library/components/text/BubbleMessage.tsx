import React, { CSSProperties, ReactNode } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type BubbleType = "sent" | "received";
export type BubblePlatform = "ios" | "android" | "whatsapp" | "generic";

export interface BubbleMessageProps {
  children?: ReactNode;
  /** Message type: sent (right) or received (left) */
  type?: BubbleType;
  /** Platform style */
  platform?: BubblePlatform;
  /** Show tail */
  tail?: boolean;
  /** Show typing indicator */
  typing?: boolean;
  /** Typing speed (seconds per dot cycle) */
  typingSpeed?: number;
  /** Avatar image source */
  avatar?: string;
  /** Sender name */
  sender?: string;
  /** Time stamp */
  time?: string;
  /** Background color override */
  color?: string;
  /** Text color override */
  textColor?: string;
  /** Animation duration */
  duration?: number;
  /** Delay before appearing */
  delay?: number;
  style?: CSSProperties;
  className?: string;
}

// Tail paths for message bubbles (kept for reference, may be used in future)
// const tailPathSent = "M 0 0 L 20 0 L 0 20 Z";
// const tailPathReceived = "M 20 0 L 0 0 L 20 20 Z";

/**
 * Animated chat bubble message.
 * Supports iOS/Android styles, typing indicators, and entrance animations.
 * 
 * @example
 * <BubbleMessage type="sent" platform="ios">Hello there!</BubbleMessage>
 * <BubbleMessage type="received" typing />
 */
export const BubbleMessage: React.FC<BubbleMessageProps> = ({
  children,
  type = "sent",
  platform = "ios",
  tail = true,
  typing = false,
  typingSpeed = 1.5,
  avatar,
  sender,
  time,
  color,
  textColor,
  duration = 0.5,
  delay = 0,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Platform defaults
  const defaults = {
    ios: {
      sentBg: "#007AFF",
      sentText: "#FFFFFF",
      receivedBg: "#E9E9EB",
      receivedText: "#000000",
      radius: 20,
      font: "-apple-system, BlinkMacSystemFont, sans-serif",
    },
    android: {
      sentBg: "#1C2B33", // Dark mode default
      sentText: "#FFFFFF",
      receivedBg: "#1F2C34",
      receivedText: "#FFFFFF",
      radius: 16,
      font: "Roboto, sans-serif",
    },
    whatsapp: {
      sentBg: "#DCF8C6",
      sentText: "#000000",
      receivedBg: "#FFFFFF",
      receivedText: "#000000",
      radius: 8,
      font: "Helvetica, Arial, sans-serif",
    },
    generic: {
      sentBg: "#3B82F6",
      sentText: "#FFFFFF",
      receivedBg: "#F3F4F6",
      receivedText: "#1F2937",
      radius: 12,
      font: "sans-serif",
    },
  };

  const theme = defaults[platform];
  const bg = color || (type === "sent" ? theme.sentBg : theme.receivedBg);
  const text = textColor || (type === "sent" ? theme.sentText : theme.receivedText);
  
  // Animation
  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.round(duration * fps);
  
  const effectiveFrame = frame - delayFrames;
  
  const progress = interpolate(
    effectiveFrame,
    [0, durationFrames],
    [0, 1],
    {
      easing: Easing.out(Easing.back(1.5)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  
  const scale = progress;
  const opacity = Math.min(progress * 2, 1);
  const translateY = (1 - progress) * 20;

  // Typing indicator dots
  const renderTyping = () => {
    const dotSize = 8;
    const dotGap = 4;
    
    return (
      <div style={{ display: "flex", alignItems: "center", gap: dotGap, padding: "4px 8px" }}>
        {[0, 1, 2].map((i) => {
            const dotProgress = (frame / fps / typingSpeed) % 1;
            const offset = i * 0.2;
            const localP = (dotProgress + offset) % 1;
            const dotY = Math.sin(localP * Math.PI * 2) * 3;
            const dotOp = 0.5 + Math.sin(localP * Math.PI * 2) * 0.5;
            
            return (
                <div
                    key={i}
                    style={{
                        width: dotSize,
                        height: dotSize,
                        borderRadius: "50%",
                        backgroundColor: text,
                        opacity: dotOp,
                        transform: `translateY(${dotY}px)`,
                    }}
                />
            );
        })}
      </div>
    );
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: type === "sent" ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: 8,
        width: "100%",
        opacity: effectiveFrame < 0 ? 0 : opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: type === "sent" ? "bottom right" : "bottom left",
        fontFamily: theme.font,
        ...style,
      }}
    >
      {/* Avatar */}
      {avatar && (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundImage: `url(${avatar})`,
            backgroundSize: "cover",
            flexShrink: 0,
            marginBottom: 4,
          }}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", alignItems: type === "sent" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
        {/* Sender Name */}
        {sender && (
            <div style={{ fontSize: 11, color: "#888", marginBottom: 4, marginLeft: type === "received" ? 12 : 0, marginRight: type === "sent" ? 12 : 0 }}>
                {sender}
            </div>
        )}

        {/* Bubble */}
        <div
          style={{
            position: "relative",
            backgroundColor: bg,
            color: text,
            padding: "8px 12px",
            borderRadius: theme.radius,
            borderBottomRightRadius: type === "sent" && tail ? 4 : theme.radius,
            borderBottomLeftRadius: type === "received" && tail ? 4 : theme.radius,
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          {typing ? renderTyping() : children}
          
          {/* Time */}
          {time && (
             <div style={{ 
                 fontSize: 10, 
                 opacity: 0.6, 
                 textAlign: "right", 
                 marginTop: 4,
                 marginBottom: -4,
                 marginRight: -4 
             }}>
                 {time}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export interface ChatConversationProps {
  messages: Array<{
    id: string | number;
    text: ReactNode;
    type: BubbleType;
    avatar?: string;
    sender?: string;
    delay?: number; // Delay relative to previous message
  }>;
  /** Base delay */
  delay?: number;
  /** Speed of conversation (1 = normal) */
  speed?: number;
  platform?: BubblePlatform;
  className?: string;
  style?: CSSProperties;
}

/**
 * Orchestrates a sequence of chat messages.
 */
export const ChatConversation: React.FC<ChatConversationProps> = ({
  messages,
  delay = 0,
  speed = 1,
  platform = "ios",
  className,
  style,
}) => {
  let accumulatedDelay = delay;

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", ...style }}>
      {messages.map((msg) => {
        const msgDelay = accumulatedDelay;
        // Add delay for next message based on current message length or explicit delay
        const textLength = typeof msg.text === "string" ? msg.text.length : 20;
        const readTime = Math.max(1, textLength * 0.05); // 0.05s per char
        
        accumulatedDelay += (msg.delay ?? readTime) / speed;

        return (
          <BubbleMessage
            key={msg.id}
            type={msg.type}
            avatar={msg.avatar}
            sender={msg.sender}
            platform={platform}
            delay={msgDelay}
          >
            {msg.text}
          </BubbleMessage>
        );
      })}
    </div>
  );
};

export default BubbleMessage;
