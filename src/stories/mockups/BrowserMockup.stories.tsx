import type { Meta, StoryObj } from "@storybook/react";
import { BrowserMockup } from "../../remotion/library/components/mockups";
import { RemotionWrapper } from "../helpers/RemotionWrapper";

const meta: Meta<typeof BrowserMockup> = {
  title: "Mockups/BrowserMockup",
  component: BrowserMockup,
  argTypes: {
    browser: {
      control: "select",
      options: ["chrome", "safari", "arc", "minimal"],
    },
    theme: { control: "select", options: ["light", "dark"] },
    url: { control: "text" },
    showAddressBar: { control: "boolean" },
    shadow: { control: "boolean" },
    scale: { control: { type: "range", min: 0.5, max: 1.5, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof BrowserMockup>;

const WebContent = ({ dark = false }: { dark?: boolean }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: dark
        ? "#09090b" // Zinc 950
        : "#f8fafc", // Slate 50
      padding: 24,
      fontFamily: "Inter, sans-serif",
    }}
  >
    {/* Header / Nav */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 32,
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: dark ? "#27272a" : "#cbd5e1",
          }}
        />
        <div
          style={{
            width: 80,
            height: 24,
            borderRadius: 4,
            background: dark ? "#27272a" : "#cbd5e1",
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 60,
              height: 16,
              borderRadius: 4,
              background: dark ? "#27272a" : "#cbd5e1",
              opacity: 0.5,
            }}
          />
        ))}
      </div>
    </div>

    {/* Hero Area */}
    <div
      style={{
        background: dark ? "#18181b" : "white",
        padding: 32,
        borderRadius: 16,
        marginBottom: 24,
        boxShadow: dark
          ? "0 0 0 1px #27272a"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          width: "40%",
          height: 32,
          borderRadius: 8,
          background: dark ? "#3f3f46" : "#e2e8f0",
        }}
      />
      <div
        style={{
          width: "80%",
          height: 16,
          borderRadius: 4,
          background: dark ? "#27272a" : "#f1f5f9",
        }}
      />
      <div
        style={{
          width: "60%",
          height: 16,
          borderRadius: 4,
          background: dark ? "#27272a" : "#f1f5f9",
        }}
      />

      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <div
          style={{
            width: 100,
            height: 36,
            borderRadius: 8,
            background: "#4f46e5",
          }}
        />
        <div
          style={{
            width: 100,
            height: 36,
            borderRadius: 8,
            background: dark ? "#27272a" : "#e2e8f0",
          }}
        />
      </div>
    </div>

    {/* Grid */}
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}
    >
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            background: dark ? "#18181b" : "white",
            height: 120,
            borderRadius: 12,
            boxShadow: dark
              ? "0 0 0 1px #27272a"
              : "0 1px 3px rgba(0,0,0,0.1)",
            padding: 16,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: dark ? "#27272a" : "#f1f5f9",
              marginBottom: 12,
            }}
          />
          <div
            style={{
              width: "60%",
              height: 16,
              borderRadius: 4,
              background: dark ? "#27272a" : "#e2e8f0",
              marginBottom: 8,
            }}
          />
          <div
            style={{
              width: "90%",
              height: 12,
              borderRadius: 4,
              background: dark ? "#27272a" : "#f1f5f9",
            }}
          />
        </div>
      ))}
    </div>
  </div>
);

const defaultDecorator = (Story: React.ComponentType) => (
  <RemotionWrapper durationInFrames={90} backgroundColor="#e5e7eb">
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Story />
    </div>
  </RemotionWrapper>
);

export const Chrome: Story = {
  decorators: [defaultDecorator],
  args: {
    browser: "chrome",
    theme: "light",
    url: "mywebsite.com/dashboard",
    tabTitle: "Dashboard - My Site",
    shadow: true,
    width: 720,
    height: 480,
  },
  render: (args) => (
    <BrowserMockup {...args}>
      <WebContent />
    </BrowserMockup>
  ),
};

export const ChromeDark: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#0f0f0f">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  args: {
    browser: "chrome",
    theme: "dark",
    url: "mywebsite.com/dashboard",
    tabTitle: "Dashboard - My Site",
    shadow: true,
    width: 720,
    height: 480,
  },
  render: (args) => (
    <BrowserMockup {...args}>
      <WebContent dark />
    </BrowserMockup>
  ),
};

export const Safari: Story = {
  decorators: [defaultDecorator],
  args: {
    browser: "safari",
    theme: "light",
    url: "apple.com/macbook-pro",
    shadow: true,
    width: 720,
    height: 480,
  },
  render: (args) => (
    <BrowserMockup {...args}>
      <WebContent />
    </BrowserMockup>
  ),
};

export const SafariDark: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#0f0f0f">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  args: {
    browser: "safari",
    theme: "dark",
    url: "apple.com/macbook-pro",
    shadow: true,
    width: 720,
    height: 480,
  },
  render: (args) => (
    <BrowserMockup {...args}>
      <WebContent dark />
    </BrowserMockup>
  ),
};

export const Arc: Story = {
  decorators: [defaultDecorator],
  args: {
    browser: "arc",
    theme: "light",
    url: "workspace.notion.so/projects",
    shadow: true,
    width: 800,
    height: 500,
  },
  render: (args) => (
    <BrowserMockup {...args}>
      <WebContent />
    </BrowserMockup>
  ),
};

export const ArcDark: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={90} backgroundColor="#0f0f0f">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  args: {
    browser: "arc",
    theme: "dark",
    url: "workspace.notion.so/projects",
    shadow: true,
    width: 800,
    height: 500,
  },
  render: (args) => (
    <BrowserMockup {...args}>
      <WebContent dark />
    </BrowserMockup>
  ),
};

export const Minimal: Story = {
  decorators: [defaultDecorator],
  args: {
    browser: "minimal",
    theme: "light",
    shadow: true,
    width: 720,
    height: 480,
  },
  render: (args) => (
    <BrowserMockup {...args}>
      <WebContent />
    </BrowserMockup>
  ),
};

export const AppShowcase: Story = {
  decorators: [defaultDecorator],
  args: {
    browser: "chrome",
    theme: "light",
    url: "myapp.io",
    tabTitle: "My App - Home",
    shadow: true,
    width: 720,
    height: 480,
  },
  render: (args) => (
    <BrowserMockup {...args}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 800, color: "white" }}>
          Welcome
        </div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>
          Build something amazing
        </div>
        <div
          style={{
            marginTop: 16,
            padding: "12px 32px",
            background: "white",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            color: "#667eea",
          }}
        >
          Get Started
        </div>
      </div>
    </BrowserMockup>
  ),
};

export const WithImage: Story = {
  decorators: [defaultDecorator],
  args: {
    browser: "safari",
    theme: "light",
    url: "unsplash.com",
    shadow: true,
    width: 720,
    height: 480,
  },
  render: (args) => (
    <BrowserMockup {...args}>
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop"
        alt="Content"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
        }}
      />
    </BrowserMockup>
  ),
};

// ============================================
// PROFESSIONAL COMPOSITIONS
// ============================================

export const SaaSLandingPage: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0f172a">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  args: {
    browser: "arc",
    theme: "dark",
    url: "acme.io/dashboard",
    shadow: true,
    width: 680,
    height: 420,
  },
  render: (args) => (
    <BrowserMockup {...args}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f0f12",
          display: "flex",
          fontFamily: "Inter, system-ui",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: 140,
            background: "#18181b",
            borderRight: "1px solid #27272a",
            padding: 12,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 20,
            }}
          >
            Acme
          </div>
          {["📊 Dashboard", "📁 Projects", "👥 Team", "⚙️ Settings"].map(
            (item, i) => (
              <div
                key={i}
                style={{
                  padding: "6px 8px",
                  borderRadius: 6,
                  background:
                    i === 0 ? "rgba(99, 102, 241, 0.15)" : "transparent",
                  color: i === 0 ? "#818cf8" : "#71717a",
                  fontSize: 10,
                  marginBottom: 2,
                }}
              >
                {item}
              </div>
            ),
          )}
        </div>
        {/* Main content */}
        <div style={{ flex: 1, padding: 14 }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
              Dashboard
            </div>
            <div style={{ fontSize: 10, color: "#71717a", marginTop: 2 }}>
              Welcome back!
            </div>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {[
              { label: "Revenue", value: "$45K", color: "#10b981" },
              { label: "Users", value: "2.3K", color: "#6366f1" },
              { label: "Orders", value: "1.2K", color: "#f59e0b" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: "#18181b",
                  borderRadius: 8,
                  padding: 10,
                  border: "1px solid #27272a",
                }}
              >
                <div style={{ fontSize: 9, color: "#71717a", marginBottom: 4 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
          {/* Chart placeholder */}
          <div
            style={{
              background: "#18181b",
              borderRadius: 8,
              padding: 12,
              border: "1px solid #27272a",
              height: 120,
              display: "flex",
              alignItems: "flex-end",
              gap: 4,
            }}
          >
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background:
                    "linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)",
                  borderRadius: 3,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </BrowserMockup>
  ),
};

export const PortfolioWebsite: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#fafafa">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  args: {
    browser: "safari",
    theme: "light",
    url: "alexchen.design",
    shadow: true,
    width: 680,
    height: 420,
  },
  render: (args) => (
    <BrowserMockup {...args}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fff",
          fontFamily: "Inter, system-ui",
        }}
      >
        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 24px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
            Alex Chen
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {["Work", "About", "Contact"].map((item, i) => (
              <div
                key={i}
                style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        {/* Hero */}
        <div style={{ padding: "32px 24px", maxWidth: 400 }}>
          <div
            style={{
              fontSize: 10,
              color: "#6366f1",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            PRODUCT DESIGNER
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            Crafting Digital
            <br />
            Experiences
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#64748b",
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            I help startups create beautiful, functional products.
          </div>
          <div
            style={{
              display: "inline-block",
              padding: "10px 20px",
              background: "#0f172a",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 11,
            }}
          >
            View My Work
          </div>
        </div>
      </div>
    </BrowserMockup>
  ),
};

export const EcommerceStore: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#f8fafc">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  args: {
    browser: "chrome",
    theme: "light",
    url: "store.example.com/products",
    tabTitle: "Shop - Premium Store",
    shadow: true,
    width: 680,
    height: 420,
  },
  render: (args) => (
    <BrowserMockup {...args}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fff",
          fontFamily: "Inter, system-ui",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
            STORE
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ fontSize: 12, color: "#64748b" }}>🔍</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>🛒</div>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #ec4899)",
              }}
            />
          </div>
        </div>
        {/* Products Grid */}
        <div style={{ padding: "14px 20px" }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 12,
            }}
          >
            New Arrivals
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
            }}
          >
            {[
              { name: "Jacket", price: "$299", color: "#6366f1" },
              { name: "Bag", price: "$189", color: "#ec4899" },
              { name: "Watch", price: "$399", color: "#10b981" },
              { name: "Glasses", price: "$149", color: "#f59e0b" },
            ].map((product, i) => (
              <div key={i}>
                <div
                  style={{
                    height: 100,
                    borderRadius: 8,
                    background: `linear-gradient(135deg, ${product.color}20, ${product.color}10)`,
                    marginBottom: 8,
                  }}
                />
                <div
                  style={{ fontSize: 10, fontWeight: 600, color: "#0f172a" }}
                >
                  {product.name}
                </div>
                <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>
                  {product.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserMockup>
  ),
};

export const DeveloperDocumentation: Story = {
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={120} backgroundColor="#0a0a0f">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
  args: {
    browser: "arc",
    theme: "dark",
    url: "docs.remotion.dev/getting-started",
    shadow: true,
    width: 680,
    height: 420,
  },
  render: (args) => (
    <BrowserMockup {...args}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f0f12",
          display: "flex",
          fontFamily: "Inter, system-ui",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: 150,
            background: "#0a0a0f",
            borderRight: "1px solid #1f1f23",
            padding: 12,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            📖 Docs
          </div>
          {[
            "Getting Started",
            "Installation",
            "Components",
            "API",
            "Examples",
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "5px 8px",
                fontSize: 10,
                color: i === 0 ? "#6366f1" : "#71717a",
                fontWeight: i === 0 ? 600 : 400,
              }}
            >
              {item}
            </div>
          ))}
        </div>
        {/* Content */}
        <div style={{ flex: 1, padding: 16, overflow: "hidden" }}>
          <div style={{ fontSize: 9, color: "#6366f1", marginBottom: 6 }}>
            GETTING STARTED
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 10,
            }}
          >
            Quick Start Guide
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#94a3b8",
              lineHeight: 1.6,
              marginBottom: 14,
            }}
          >
            Get up and running in minutes.
          </div>
          {/* Code block */}
          <div
            style={{
              background: "#18181b",
              borderRadius: 8,
              padding: 12,
              border: "1px solid #27272a",
            }}
          >
            <div style={{ fontSize: 9, color: "#71717a", marginBottom: 8 }}>
              Terminal
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#10b981",
              }}
            >
              $ npm install @remotion/base
            </div>
          </div>
        </div>
      </div>
    </BrowserMockup>
  ),
};
