import type { Meta, StoryObj } from "@storybook/react";
import { PhoneMockup } from "../../remotion/library/components/mockups";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof PhoneMockup> = {
  title: "Mockups/PhoneMockup",
  component: PhoneMockup,
  decorators: [
    (Story) => (
      <RemotionWrapper
        durationInFrames={90}
        backgroundColor="#1a1a2e"
        width={500}
        height={700}
      >
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    device: {
      control: "select",
      options: ["iphone-15", "iphone-14", "pixel-8", "generic"],
    },
    color: {
      control: "select",
      options: ["black", "white", "silver", "gold", "blue"],
    },
    showNotch: { control: "boolean" },
    shadow: { control: "boolean" },
    reflection: { control: { type: "range", min: 0, max: 0.5, step: 0.05 } },
    scale: { control: { type: "range", min: 0.5, max: 1.5, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof PhoneMockup>;

const AppScreen = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}
  >
    <div
      style={{ fontSize: 24, color: "white", fontWeight: 700, marginBottom: 8 }}
    >
      My App
    </div>
    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
      Welcome to the app
    </div>
  </div>
);

// Centering wrapper for phone mockups
const CenteredPhone = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    }}
  >
    {children}
  </div>
);

export const iPhone15Black: Story = {
  args: {
    device: "iphone-15",
    color: "black",
    shadow: true,
    scale: 0.75,
  },
  render: (args) => (
    <CenteredPhone>
      <PhoneMockup {...args}>
        <AppScreen />
      </PhoneMockup>
    </CenteredPhone>
  ),
};

export const iPhone15White: Story = {
  args: {
    device: "iphone-15",
    color: "white",
    shadow: true,
    reflection: 0.1,
    scale: 0.75,
  },
  render: (args) => (
    <CenteredPhone>
      <PhoneMockup {...args}>
        <AppScreen />
      </PhoneMockup>
    </CenteredPhone>
  ),
};

export const Pixel8: Story = {
  args: {
    device: "pixel-8",
    color: "black",
    shadow: true,
    scale: 0.7,
  },
  render: (args) => (
    <CenteredPhone>
      <PhoneMockup {...args}>
        <AppScreen />
      </PhoneMockup>
    </CenteredPhone>
  ),
};

export const GoldiPhone: Story = {
  args: {
    device: "iphone-14",
    color: "gold",
    shadow: true,
    reflection: 0.15,
    scale: 0.75,
  },
  render: (args) => (
    <CenteredPhone>
      <PhoneMockup {...args}>
        <AppScreen />
      </PhoneMockup>
    </CenteredPhone>
  ),
};

export const NoNotch: Story = {
  args: {
    device: "generic",
    color: "black",
    showNotch: false,
    shadow: true,
    scale: 0.75,
  },
  render: (args) => (
    <CenteredPhone>
      <PhoneMockup {...args}>
        <AppScreen />
      </PhoneMockup>
    </CenteredPhone>
  ),
};

export const WithReflection: Story = {
  args: {
    device: "iphone-15",
    color: "silver",
    shadow: true,
    reflection: 0.3,
    scale: 0.75,
  },
  render: (args) => (
    <CenteredPhone>
      <PhoneMockup {...args}>
        <AppScreen />
      </PhoneMockup>
    </CenteredPhone>
  ),
};

export const WithImage: Story = {
  args: {
    device: "iphone-15",
    color: "black",
    shadow: true,
    reflection: 0.15,
    scale: 0.75,
  },
  render: (args) => (
    <CenteredPhone>
      <PhoneMockup {...args}>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=800&fit=crop"
          alt="App screenshot"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </PhoneMockup>
    </CenteredPhone>
  ),
};

export const WithAppUI: Story = {
  args: {
    device: "iphone-15",
    color: "black",
    shadow: true,
    scale: 0.75,
  },
  render: (args) => (
    <CenteredPhone>
      <PhoneMockup {...args}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#f8fafc",
            display: "flex",
            flexDirection: "column",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {/* Status bar area */}
          <div style={{ height: 50, background: "#fff" }} />

          {/* Header */}
          <div
            style={{
              padding: "12px 16px",
              background: "#fff",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1e293b" }}>
              Messages
            </div>
          </div>

          {/* Message list */}
          <div style={{ flex: 1, padding: 16, overflow: "hidden" }}>
            {[
              {
                name: "Alice",
                message: "Hey! Are you free today?",
                time: "2m",
              },
              {
                name: "Bob",
                message: "The project looks great 👍",
                time: "15m",
              },
              { name: "Carol", message: "Meeting at 3pm", time: "1h" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    background: `hsl(${i * 90}, 70%, 60%)`,
                    marginRight: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  {item.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: 15, fontWeight: 600, color: "#1e293b" }}
                  >
                    {item.name}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>
                    {item.message}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                  {item.time}
                </div>
              </div>
            ))}
          </div>

          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "12px 0 24px",
              background: "#fff",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            {["💬", "📞", "⚙️"].map((icon, i) => (
              <div
                key={i}
                style={{
                  fontSize: 20,
                  opacity: i === 0 ? 1 : 0.5,
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </PhoneMockup>
    </CenteredPhone>
  ),
};

export const StrongReflection: Story = {
  args: {
    device: "iphone-15",
    color: "white",
    shadow: true,
    reflection: 0.4,
    scale: 0.75,
  },
  render: (args) => (
    <CenteredPhone>
      <PhoneMockup {...args}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌙</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Dark Mode</div>
          <div style={{ fontSize: 14, opacity: 0.7, marginTop: 8 }}>
            With glass reflection
          </div>
        </div>
      </PhoneMockup>
    </CenteredPhone>
  ),
};

// ============================================
// PROFESSIONAL COMPOSITIONS
// ============================================

export const AppLaunchHero: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0a0a0f">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gap: 60,
        padding: 40,
      }}
    >
      {/* Left: Phone */}
      <PhoneMockup device="iphone-15" color="black" shadow scale={0.55}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>✨</div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#fff",
              textAlign: "center",
            }}
          >
            Premium App
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.8)",
              marginTop: 6,
              textAlign: "center",
            }}
          >
            Your journey starts here
          </div>
        </div>
      </PhoneMockup>
      {/* Right: Text content */}
      <div style={{ maxWidth: 320 }}>
        <div
          style={{
            fontSize: 11,
            color: "#6366f1",
            fontWeight: 600,
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          MOBILE APP
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          The Future of
          <br />
          <span style={{ color: "#6366f1" }}>Productivity</span>
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#71717a",
            lineHeight: 1.6,
            marginBottom: 20,
          }}
        >
          Download now and experience the next generation of mobile apps.
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              padding: "10px 16px",
              background: "#fff",
              borderRadius: 8,
              color: "#0a0a0f",
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            🍎 App Store
          </div>
          <div
            style={{
              padding: "10px 16px",
              background: "transparent",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#fff",
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            🤖 Play Store
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FeatureShowcase: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#fafafa">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gap: 16,
        padding: 40,
      }}
    >
      {/* Three phones with different screens */}
      {[
        {
          screen: "Dashboard",
          icon: "📊",
          bg: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        },
        {
          screen: "Analytics",
          icon: "📈",
          bg: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
        },
        {
          screen: "Settings",
          icon: "⚙️",
          bg: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
        },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            transform: i === 1 ? "scale(1.05)" : "scale(0.9)",
            zIndex: i === 1 ? 2 : 1,
          }}
        >
          <PhoneMockup
            device="iphone-15"
            color={i === 1 ? "white" : "black"}
            shadow
            scale={0.45}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: item.bg,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                {item.screen}
              </div>
            </div>
          </PhoneMockup>
        </div>
      ))}
    </div>
  ),
};

export const DarkModeShowcase: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#000">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gap: 20,
        padding: 30,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "#6366f1",
          fontWeight: 600,
          letterSpacing: 3,
        }}
      >
        DARK MODE
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "#fff",
          textAlign: "center",
        }}
      >
        Beautiful in the Dark
      </div>
      <PhoneMockup
        device="iphone-15"
        color="black"
        shadow
        reflection={0.2}
        scale={0.5}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#0f0f0f",
            padding: 16,
            fontFamily: "Inter, system-ui",
          }}
        >
          {/* Dark mode UI */}
          <div style={{ marginTop: 30 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 14,
              }}
            >
              Good evening 👋
            </div>
            <div
              style={{
                background: "#1a1a1a",
                borderRadius: 12,
                padding: 14,
                marginBottom: 10,
              }}
            >
              <div style={{ fontSize: 10, color: "#6366f1", marginBottom: 6 }}>
                BALANCE
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>
                $24,580
              </div>
              <div style={{ fontSize: 10, color: "#10b981", marginTop: 4 }}>
                +12.5% this month
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Send", "Request", "More"].map((action, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: i === 0 ? "#6366f1" : "#1a1a1a",
                    borderRadius: 8,
                    padding: "8px 0",
                    textAlign: "center",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  {action}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PhoneMockup>
    </div>
  ),
};

export const SocialProofSection: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#f0f4ff">
        <Story />
      </RemotionWrapper>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 40,
        gap: 40,
      }}
    >
      <div style={{ maxWidth: 280 }}>
        <div style={{ display: "flex", marginBottom: 12 }}>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <span key={i} style={{ fontSize: 16 }}>
              ⭐
            </span>
          ))}
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#0f172a",
            lineHeight: 1.4,
            marginBottom: 16,
          }}
        >
          "This app completely changed how I manage my daily tasks!"
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            👩‍💻
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>
              Sarah Miller
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>
              Product Designer
            </div>
          </div>
        </div>
      </div>
      <PhoneMockup device="iphone-15" color="white" shadow scale={0.5}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            padding: 16,
            fontFamily: "Inter, system-ui",
          }}
        >
          <div style={{ marginTop: 30, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
              Task Complete!
            </div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 6 }}>
              You've finished 12 tasks today
            </div>
            <div
              style={{
                marginTop: 16,
                background: "#10b981",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 12,
                display: "inline-block",
              }}
            >
              Continue
            </div>
          </div>
        </div>
      </PhoneMockup>
    </div>
  ),
};
