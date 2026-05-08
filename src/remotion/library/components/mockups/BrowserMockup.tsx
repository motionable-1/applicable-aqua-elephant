import React, { type CSSProperties, type ReactNode } from "react";

/**
 * Browser types.
 */
export type BrowserType = "chrome" | "safari" | "arc" | "minimal";

/**
 * Browser theme.
 */
export type BrowserTheme = "light" | "dark";

/**
 * Props for BrowserMockup component.
 */
export interface BrowserMockupProps {
  children?: ReactNode;
  /** URL to display in address bar */
  url?: string;
  /** Browser type */
  browser?: BrowserType;
  /** Color theme */
  theme?: BrowserTheme;
  /** Show address bar */
  showAddressBar?: boolean;
  /** Tab title (for Chrome) */
  tabTitle?: string;
  /** Show device shadow */
  shadow?: boolean;
  /** Border radius */
  borderRadius?: number;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Scale factor */
  scale?: number;
  /** Additional CSS styles */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
}

// ============================================
// Icons
// ============================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TrafficLights = ({ theme }: { theme: BrowserTheme }) => (
  <div style={{ display: "flex", gap: 8 }}>
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#ff5f57",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)",
      }}
    />
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#febc2e",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)",
      }}
    />
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#28c840",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)",
      }}
    />
  </div>
);

const ChevronLeft = ({ color }: { color: string }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = ({ color }: { color: string }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const RefreshIcon = ({ color }: { color: string }) => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 4v6h-6M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);

const LockIcon = ({ color }: { color: string }) => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill={color}>
    <path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4z" />
  </svg>
);

const ShareIcon = ({ color }: { color: string }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
  </svg>
);

const PlusIcon = ({ color }: { color: string }) => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const SidebarIcon = ({ color }: { color: string }) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x={4} y={4} width={16} height={16} rx={2} />
    <path d="M9 4v16" />
  </svg>
);

const StarIcon = ({ color }: { color: string }) => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// ============================================
// Theme configurations
// ============================================

const themes: Record<
  BrowserTheme,
  {
    bg: string;
    toolbar: string;
    text: string;
    textMuted: string;
    border: string;
    urlBg: string;
    tabBg: string;
    tabActiveBg: string;
    inputBorder?: string;
  }
> = {
  light: {
    bg: "#ffffff",
    toolbar: "#f3f4f6", // Zinc-100
    text: "#1f2937", // Zinc-800
    textMuted: "#6b7280", // Zinc-500
    border: "#e5e7eb", // Zinc-200
    urlBg: "#ffffff",
    tabBg: "#e5e7eb",
    tabActiveBg: "#ffffff",
    inputBorder: "#e5e7eb",
  },
  dark: {
    bg: "#18181b", // Zinc-900
    toolbar: "#27272a", // Zinc-800
    text: "#f4f4f5", // Zinc-100
    textMuted: "#a1a1aa", // Zinc-400
    border: "#3f3f46", // Zinc-700
    urlBg: "#18181b",
    tabBg: "#3f3f46",
    tabActiveBg: "#52525b",
    inputBorder: "#3f3f46",
  },
};

// ============================================
// Chrome Browser
// ============================================

const ChromeBrowser: React.FC<{
  children: ReactNode;
  url: string;
  tabTitle: string;
  theme: BrowserTheme;
  showAddressBar: boolean;
  colors: typeof themes.light;
}> = ({ children, url, tabTitle, theme, showAddressBar, colors }) => (
  <>
    {/* Tab bar */}
    <div
      style={{
        height: 42,
        background: colors.toolbar,
        display: "flex",
        alignItems: "flex-end",
        padding: "0 8px",
        gap: 6,
      }}
    >
      {/* Traffic lights */}
      <div style={{ padding: "0 12px 10px 8px" }}>
        <TrafficLights theme={theme} />
      </div>

      {/* Tab */}
      <div
        style={{
          height: 34,
          minWidth: 160,
          maxWidth: 240,
          background: colors.tabActiveBg,
          borderRadius: "10px 10px 0 0",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 8,
          fontSize: 12,
          color: colors.text,
          position: "relative",
          marginBottom: -1,
          boxShadow: theme === "light" ? "0 0 1px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme === "dark" ? "#4a4a4c" : "#e0e0e0"} 0%, ${theme === "dark" ? "#3a3a3c" : "#d0d0d0"} 100%)`,
          }}
        />
        <span
          style={{
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {tabTitle}
        </span>
        <span
          style={{
            color: colors.textMuted,
            fontSize: 14,
            cursor: "pointer",
            width: 16,
            height: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          ×
        </span>
      </div>

      {/* New tab button */}
      <div style={{ padding: "0 4px 8px 4px", opacity: 0.6 }}>
        <PlusIcon color={colors.text} />
      </div>
    </div>

    {/* Address bar */}
    {showAddressBar && (
      <div
        style={{
          height: 44,
          background: colors.tabActiveBg,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 12,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        {/* Navigation */}
        <div style={{ display: "flex", gap: 6, opacity: 0.6 }}>
          <ChevronLeft color={colors.text} />
          <ChevronRight color={colors.text} />
          <RefreshIcon color={colors.text} />
        </div>

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            height: 30,
            background: colors.toolbar,
            borderRadius: 99,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: 8,
            fontSize: 13,
            color: colors.textMuted,
            border: theme === "light" ? "none" : `1px solid ${colors.border}`,
          }}
        >
          <LockIcon color={colors.textMuted} />
          <div
            style={{
              flex: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ color: colors.text }}>
              {url.replace(/^https?:\/\//, "").split("/")[0]}
            </span>
            <span style={{ opacity: 0.6 }}>
              {url.replace(/^https?:\/\//, "").includes("/")
                ? "/" + url.replace(/^https?:\/\//, "").split("/").slice(1).join("/")
                : ""}
            </span>
          </div>
          <div style={{ opacity: 0.6 }}>
            <StarIcon color={colors.textMuted} />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, opacity: 0.6, paddingRight: 4 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme === "dark" ? "#6366f1" : "#818cf8"}, ${theme === "dark" ? "#a855f7" : "#c084fc"})`,
            }}
          />
        </div>
      </div>
    )}

    {/* Content */}
    <div style={{ flex: 1, overflow: "hidden", background: colors.bg }}>
      {children}
    </div>
  </>
);

// ============================================
// Safari Browser
// ============================================

const SafariBrowser: React.FC<{
  children: ReactNode;
  url: string;
  theme: BrowserTheme;
  showAddressBar: boolean;
  colors: typeof themes.light;
}> = ({ children, url, theme, showAddressBar, colors }) => (
  <>
    {/* Unified toolbar */}
    <div
      style={{
        height: 52,
        background: colors.toolbar,
        display: "flex",
        alignItems: "center",
        padding: "0 18px",
        gap: 16,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      {/* Traffic lights */}
      <TrafficLights theme={theme} />

      {/* Sidebar toggle */}
      <div style={{ opacity: 0.5, display: "flex" }}>
        <SidebarIcon color={colors.text} />
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: 14, opacity: 0.5 }}>
        <ChevronLeft color={colors.text} />
        <ChevronRight color={colors.text} />
      </div>

      {/* Centered URL bar */}
      {showAddressBar && (
        <div
          style={{
            flex: 1,
            maxWidth: 420,
            height: 32,
            margin: "0 auto",
            background: theme === "dark" ? "#1c1c1e" : "#e5e7eb",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 12px",
            gap: 6,
            fontSize: 13,
            color: colors.textMuted,
            boxShadow:
              theme === "light"
                ? "0 1px 2px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(0,0,0,0.05)"
                : "none",
          }}
        >
          <LockIcon color={colors.textMuted} />
          <span style={{ color: colors.text, fontWeight: 500 }}>
            {url.replace(/^https?:\/\//, "").split("/")[0]}
          </span>
        </div>
      )}

      {/* Right actions */}
      <div style={{ display: "flex", gap: 16, opacity: 0.5 }}>
        <ShareIcon color={colors.text} />
        <PlusIcon color={colors.text} />
        <div style={{ width: 16 }}>
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.text}
            strokeWidth={2}
          >
            <path d="M4 4h5v5H4zM15 4h5v5h-5zM4 15h5v5H4zM15 15h5v5h-5z" />
          </svg>
        </div>
      </div>
    </div>

    {/* Content */}
    <div style={{ flex: 1, overflow: "hidden", background: colors.bg }}>
      {children}
    </div>
  </>
);

// ============================================
// Arc Browser
// ============================================

const ArcBrowser: React.FC<{
  children: ReactNode;
  url: string;
  theme: BrowserTheme;
  showAddressBar: boolean;
  colors: typeof themes.light;
}> = ({ children, url, theme, showAddressBar, colors }) => {
  const arcAccent = theme === "dark" ? "#8b5cf6" : "#7c3aed";

  return (
    <div style={{ display: "flex", flex: 1 }}>
      {/* Sidebar */}
      <div
        style={{
          width: 72,
          background: theme === "dark" ? "#18181b" : "#f8f9fa",
          borderRight: `1px solid ${colors.border}`,
          display: "flex",
          flexDirection: "column",
          padding: "16px 0",
          gap: 12,
          alignItems: "center",
        }}
      >
        {/* Traffic lights (vertical in Arc) */}
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#febc2e",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#28c840",
            }}
          />
        </div>

        {/* URL Bar for Arc (Sidebar top) */}
        <div
           style={{
             width: 56,
             height: 36,
             borderRadius: 10,
             background: colors.tabBg,
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             marginBottom: 8,
             opacity: 0.8
           }}
        >
           <div style={{ width: 16, height: 2, background: colors.textMuted, borderRadius: 1 }} />
        </div>

        <div style={{ width: 40, height: 1, background: colors.border, margin: '4px 0' }} />

        {/* Space tabs */}
        {[arcAccent, "#3b82f6", "#22c55e"].map((color, i) => (
          <div
            key={i}
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: i === 0 ? color : 'transparent',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 600,
              color: i === 0 ? "#fff" : colors.textMuted,
              boxShadow: i === 0 ? "0 2px 5px rgba(0,0,0,0.15)" : "none",
            }}
          >
             {i === 0 ? "★" : i === 1 ? "●" : "▲"}
          </div>
        ))}

        <div style={{ flex: 1 }} />

        {/* Add button */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: colors.tabBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.7
          }}
        >
          <PlusIcon color={colors.textMuted} />
        </div>
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar (only if address bar enabled, though Arc often hides it) */}
        {showAddressBar && (
          <div
            style={{
              height: 44,
              background: colors.bg,
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              gap: 12,
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            {/* Navigation */}
            <div style={{ display: "flex", gap: 8, opacity: 0.4 }}>
              <ChevronLeft color={colors.text} />
              <ChevronRight color={colors.text} />
            </div>

            {/* URL Display */}
            <div
              style={{
                flex: 1,
                height: 28,
                background: colors.toolbar,
                border: `1px solid ${colors.border}`,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                gap: 8,
                fontSize: 12,
              }}
            >
              <LockIcon color={colors.textMuted} />
              <span style={{ color: colors.text }}>
                {url.replace(/^https?:\/\//, "")}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, opacity: 0.5 }}>
              <RefreshIcon color={colors.text} />
              <ShareIcon color={colors.text} />
            </div>
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, overflow: "hidden", background: colors.bg }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ============================================
// Minimal Browser
// ============================================

const MinimalBrowser: React.FC<{
  children: ReactNode;
  theme: BrowserTheme;
  colors: typeof themes.light;
}> = ({ children, theme, colors }) => (
  <>
    {/* Simple toolbar with traffic lights only */}
    <div
      style={{
        height: 36,
        background: colors.toolbar,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <TrafficLights theme={theme} />
    </div>

    {/* Content */}
    <div style={{ flex: 1, overflow: "hidden", background: colors.bg }}>
      {children}
    </div>
  </>
);

// ============================================
// Main Component
// ============================================

/**
 * Browser window mockup for website demos.
 *
 * @example
 * // Chrome browser
 * <BrowserMockup browser="chrome" url="https://example.com">
 *   <WebsiteContent />
 * </BrowserMockup>
 *
 * @example
 * // Safari dark theme
 * <BrowserMockup browser="safari" theme="dark" url="https://myapp.com">
 *   <AppContent />
 * </BrowserMockup>
 *
 * @example
 * // Arc browser
 * <BrowserMockup browser="arc" url="https://workspace.com">
 *   <Content />
 * </BrowserMockup>
 */
export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  children,
  url = "example.com",
  browser = "chrome",
  theme = "light",
  showAddressBar = true,
  tabTitle = "New Tab",
  shadow = true,
  borderRadius = 12,
  width = 800,
  height = 600,
  scale = 1,
  style,
  className,
}) => {
  const colors = themes[theme];

  const containerStyle: CSSProperties = {
    width,
    height,
    borderRadius,
    overflow: "hidden",
    background: colors.bg,
    border: `1px solid ${colors.border}`,
    boxShadow: shadow
      ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)"
      : undefined,
    display: "flex",
    flexDirection: "column",
    transform: scale !== 1 ? `scale(${scale})` : undefined,
    transformOrigin: "top left",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {browser === "chrome" && (
        <ChromeBrowser
          url={url}
          tabTitle={tabTitle}
          theme={theme}
          showAddressBar={showAddressBar}
          colors={colors}
        >
          {children}
        </ChromeBrowser>
      )}
      {browser === "safari" && (
        <SafariBrowser
          url={url}
          theme={theme}
          showAddressBar={showAddressBar}
          colors={colors}
        >
          {children}
        </SafariBrowser>
      )}
      {browser === "arc" && (
        <ArcBrowser
          url={url}
          theme={theme}
          showAddressBar={showAddressBar}
          colors={colors}
        >
          {children}
        </ArcBrowser>
      )}
      {browser === "minimal" && (
        <MinimalBrowser theme={theme} colors={colors}>
          {children}
        </MinimalBrowser>
      )}
    </div>
  );
};

export default BrowserMockup;
