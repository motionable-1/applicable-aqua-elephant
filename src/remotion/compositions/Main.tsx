import { AbsoluteFill, Artifact, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceMono";

const fillCenter: React.CSSProperties = {
  alignItems: "center",
  background: "#0f1115",
  display: "flex",
  justifyContent: "center",
};

const gradientLayer: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.28), transparent 45%), radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.2), transparent 50%)",
};

const gridLayer: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  opacity: 0.4,
  background:
    "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(180deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
};

const copyWrap: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
  color: "#fff",
  textAlign: "center",
  filter: "drop-shadow(0 12px 32px rgba(0, 0, 0, 0.55))",
};

const LoaderDots = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dot = (index: number) => {
    const phase = (frame / fps) * 2 * Math.PI + index * 0.8;
    return 0.35 + Math.max(0, Math.sin(phase)) * 0.65;
  };

  return (
    <span style={{ display: "inline-flex", gap: 4 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{ display: "inline-block", color: "#7dd3fc", opacity: dot(i) }}
        >
          .
        </span>
      ))}
    </span>
  );
};

export const Main: React.FC = () => {
  const { fontFamily } = loadFont();
  const frame = useCurrentFrame();
  return (
    <>
      {/* Leave this here to generate a thumbnail */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}
      <AbsoluteFill style={fillCenter}>
        <div style={gradientLayer} />
        <div style={gridLayer} />
        <div
          style={{
            ...copyWrap,
            fontFamily,
            fontWeight: 700,
            letterSpacing: "0.01em",
          }}
        >
          <div style={{ fontSize: 48, fontWeight: 700 }}>
            <span style={{ color: "#7dd3fc", fontWeight: 800 }}>Motionabl</span> is
            building your video
            <LoaderDots />
          </div>
          <div style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 18 }}>
            Rendering scenes, timing transitions, and polishing frames.
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
};
