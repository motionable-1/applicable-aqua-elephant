import React, { ReactNode } from "react";

export interface WindowProps {
  children: ReactNode;
  /** Window title */
  title?: string;
  /** Dark mode */
  dark?: boolean;
  /** Show traffic light buttons */
  controls?: boolean;
  /** Background color override */
  background?: string;
  /** Border radius */
  radius?: number;
  /** Box shadow intensity (0-1) */
  shadow?: number;
  /** Additional CSS styles */
  style?: React.CSSProperties;
  /** Additional CSS class names */
  className?: string;
}

/**
 * A professional OS-style window container.
 * Perfect for showcasing websites, code, or UI mockups.
 * 
 * @example
 * <Window title="My App" dark controls>
 *   <div className="p-4">Content</div>
 * </Window>
 */
export const Window: React.FC<WindowProps> = ({
  children,
  title,
  dark = false,
  controls = true,
  background,
  radius = 12,
  shadow = 0.5,
  style,
  className,
}) => {
  const bgColor = background || (dark ? "#1e1e1e" : "#ffffff");
  const borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const textColor = dark ? "#ffffff" : "#000000";
  const titleBarColor = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  
  const shadowStyle = shadow > 0 
    ? `0 ${shadow * 20}px ${shadow * 50}px -${shadow * 10}px rgba(0,0,0,${shadow * 0.5})`
    : "none";

  return (
    <div
      className={className}
      style={{
        backgroundColor: bgColor,
        borderRadius: radius,
        boxShadow: shadowStyle,
        border: `1px solid ${borderColor}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        color: textColor,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        ...style,
      }}
    >
      {(title || controls) && (
        <div
          style={{
            height: 40,
            minHeight: 40,
            borderBottom: `1px solid ${borderColor}`,
            backgroundColor: titleBarColor,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            position: "relative",
          }}
        >
          {controls && (
            <div style={{ display: "flex", gap: 8, marginRight: 16 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F56", border: "1px solid rgba(0,0,0,0.1)" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FFBD2E", border: "1px solid rgba(0,0,0,0.1)" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27C93F", border: "1px solid rgba(0,0,0,0.1)" }} />
            </div>
          )}
          
          {title && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                textAlign: "center",
                fontSize: 13,
                fontWeight: 500,
                opacity: 0.7,
                pointerEvents: "none",
              }}
            >
              {title}
            </div>
          )}
        </div>
      )}
      
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
};

export default Window;
