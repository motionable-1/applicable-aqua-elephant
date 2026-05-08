import React, { type CSSProperties, type ReactNode } from "react";

/**
 * Phone device types.
 */
export type PhoneDevice = "iphone-15" | "iphone-14" | "pixel-8" | "generic";

/**
 * Phone color options.
 */
export type PhoneColor = "black" | "white" | "silver" | "gold" | "blue";

/**
 * Props for PhoneMockup component.
 */
export interface PhoneMockupProps {
  children?: ReactNode;
  /** Device type */
  device?: PhoneDevice;
  /** Device color */
  color?: PhoneColor;
  /** Show notch/dynamic island */
  showNotch?: boolean;
  /** Show device shadow */
  shadow?: boolean;
  /** Glass reflection intensity (0-1) */
  reflection?: number;
  /** Scale factor */
  scale?: number;
  /** Additional CSS styles */
  style?: CSSProperties;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Device dimensions.
 */
const deviceDimensions: Record<
  PhoneDevice,
  {
    width: number;
    height: number;
    borderRadius: number;
    notchWidth: number;
    notchHeight: number;
  }
> = {
  "iphone-15": {
    width: 393,
    height: 852,
    borderRadius: 55,
    notchWidth: 126,
    notchHeight: 37,
  },
  "iphone-14": {
    width: 390,
    height: 844,
    borderRadius: 47,
    notchWidth: 120,
    notchHeight: 35,
  },
  "pixel-8": {
    width: 412,
    height: 915,
    borderRadius: 40,
    notchWidth: 80,
    notchHeight: 25,
  },
  generic: {
    width: 375,
    height: 812,
    borderRadius: 40,
    notchWidth: 100,
    notchHeight: 30,
  },
};

/**
 * Color palettes.
 */
const colorPalettes: Record<PhoneColor, { frame: string; bezel: string }> = {
  black: { frame: "#1a1a1a", bezel: "#000000" },
  white: { frame: "#f5f5f5", bezel: "#e0e0e0" },
  silver: { frame: "#c0c0c0", bezel: "#a0a0a0" },
  gold: { frame: "#d4af37", bezel: "#c5a028" },
  blue: { frame: "#1e3a5f", bezel: "#152a45" },
};

/**
 * Phone mockup frame for screenshots and app demos.
 *
 * @example
 * // Basic phone mockup
 * <PhoneMockup>
 *   <AppScreenshot />
 * </PhoneMockup>
 *
 * @example
 * // iPhone 15 with styling
 * <PhoneMockup
 *   device="iphone-15"
 *   color="black"
 *   shadow
 *   reflection={0.15}
 * >
 *   <AppContent />
 * </PhoneMockup>
 */
export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  device = "iphone-15",
  color = "black",
  showNotch = true,
  shadow = true,
  reflection = 0,
  scale = 1,
  style,
  className,
}) => {
  const dimensions = deviceDimensions[device];
  const colors = colorPalettes[color];

  const frameWidth = dimensions.width + 20; // Add bezel
  const frameHeight = dimensions.height + 20;

  const scaledWidth = frameWidth * scale;
  const scaledHeight = frameHeight * scale;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`,
        ...style,
      }}
    >
      {/* Phone frame - Outer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: `${dimensions.borderRadius * scale}px`,
          background: colors.frame,
          boxShadow: shadow
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 
               0 0 0 1px rgba(0, 0, 0, 0.1),
               inset 0 0 0 2px rgba(255, 255, 255, 0.2)` // Highlight on metal edge
            : undefined,
        }}
      />
      
      {/* Phone frame - Inner Band (Antenna line area) */}
      <div
        style={{
          position: "absolute",
          inset: 3 * scale,
          borderRadius: `${(dimensions.borderRadius - 2) * scale}px`,
          background: colors.frame,
          boxShadow: `inset 0 0 4px rgba(0,0,0,0.3)`, // Inner shadow for depth
        }}
      />

      {/* Screen bezel (Black border) */}
      <div
        style={{
          position: "absolute",
          top: `${12 * scale}px`,
          left: `${12 * scale}px`,
          width: `${(dimensions.width - 4) * scale}px`, // Adjusted width
          height: `${(dimensions.height - 4) * scale}px`, // Adjusted height
          borderRadius: `${(dimensions.borderRadius - 10) * scale}px`,
          background: "black", // Always black bezel
          overflow: "hidden",
          boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.05)", // Subtle inner bezel highlight
        }}
      >
        {/* Screen content */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {children}
        </div>

        {/* Notch / Dynamic Island */}
        {showNotch && (
          <div
            style={{
              position: "absolute",
              top: `${12 * scale}px`,
              left: "50%",
              transform: "translateX(-50%)",
              width: `${dimensions.notchWidth * scale}px`,
              height: `${dimensions.notchHeight * scale}px`,
              borderRadius: `${20 * scale}px`,
              background: "#000",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: `0 ${8 * scale}px`,
            }}
          >
            {/* Camera lens reflection */}
             <div style={{
                 width: `${dimensions.notchHeight * 0.4 * scale}px`,
                 height: `${dimensions.notchHeight * 0.4 * scale}px`,
                 borderRadius: "50%",
                 background: "rgba(255,255,255,0.05)",
                 boxShadow: "inset 0 0 2px rgba(255,255,255,0.1)",
                 marginLeft: "auto"
             }} />
          </div>
        )}
      </div>

      {/* Glass reflection - outside bezel for proper layering */}
      {reflection > 0 && (
        <div
          style={{
            position: "absolute",
            top: `${10 * scale}px`,
            left: `${10 * scale}px`,
            width: `${dimensions.width * scale}px`,
            height: `${dimensions.height * scale}px`,
            borderRadius: `${(dimensions.borderRadius - 8) * scale}px`,
            background: `linear-gradient(135deg, rgba(255,255,255,${reflection * 0.8}) 0%, rgba(255,255,255,${reflection * 0.3}) 30%, transparent 60%)`,
            pointerEvents: "none",
            zIndex: 30,
          }}
        />
      )}

      {/* Side button (power) */}
      <div
        style={{
          position: "absolute",
          top: `${150 * scale}px`,
          right: 0,
          width: `${3 * scale}px`,
          height: `${60 * scale}px`,
          borderRadius: `${2 * scale}px`,
          background: colors.frame,
          transform: "translateX(50%)",
        }}
      />

      {/* Volume buttons */}
      <div
        style={{
          position: "absolute",
          top: `${120 * scale}px`,
          left: 0,
          width: `${3 * scale}px`,
          height: `${30 * scale}px`,
          borderRadius: `${2 * scale}px`,
          background: colors.frame,
          transform: "translateX(-50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: `${160 * scale}px`,
          left: 0,
          width: `${3 * scale}px`,
          height: `${30 * scale}px`,
          borderRadius: `${2 * scale}px`,
          background: colors.frame,
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
};

export default PhoneMockup;
