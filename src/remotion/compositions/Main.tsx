import { AbsoluteFill, Artifact, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import type { CSSProperties, ReactNode } from "react";
import "./TracePilot.css";

const STATIC_RECONSTRUCTION = false;

const SCENES = [
  { label: "Brand Reveal", from: 0, duration: 87 },
  { label: "Noise To Signal", from: 87, duration: 87 },
  { label: "Live Trace", from: 174, duration: 87 },
  { label: "Proof Metrics", from: 261, duration: 87 },
  { label: "Final CTA", from: 348, duration: 117 },
] as const;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const smooth = Easing.bezier(0.16, 1, 0.3, 1);
const useFonts = () => {
  const inter = loadInter("normal", { weights: ["400", "500", "600", "700", "800", "900"] });
  const space = loadSpaceGrotesk("normal", { weights: ["400", "500", "600", "700"] });
  return { inter: inter.fontFamily, space: space.fontFamily };
};

const present = (value: number) => (STATIC_RECONSTRUCTION ? 1 : value);
const maybeZero = (value: number) => (STATIC_RECONSTRUCTION ? 0 : value);

const sceneOpacity = (frame: number, from: number, duration: number) => {
  if (STATIC_RECONSTRUCTION) return frame >= from && frame < from + duration ? 1 : 0;
  return interpolate(frame, [from - 12, from + 10, from + duration - 14, from + duration + 10], [0, 1, 1, 0], {
    ...clamp,
    easing: smooth,
  });
};

const foregroundOpacity = (local: number, duration: number) => {
  if (STATIC_RECONSTRUCTION) return 1;
  return interpolate(local, [8, 24, duration - 28, duration - 10], [0, 1, 1, 0], { ...clamp, easing: smooth });
};

const entrance = (frame: number, start: number, fps: number, stiffness = 112) => {
  if (STATIC_RECONSTRUCTION) return 1;
  if (frame < start) return 0;
  return spring({
    frame: frame - start,
    fps,
    config: { damping: 17, mass: 0.72, stiffness },
    durationInFrames: 24,
  });
};

const reveal = (frame: number, start: number, end: number) => {
  if (STATIC_RECONSTRUCTION) return 1;
  return interpolate(frame, [start, end], [0, 1], { ...clamp, easing: smooth });
};

const drift = (frame: number, amount: number, phase = 0) => maybeZero(Math.sin(frame / 48 + phase) * amount);

const textBase = (fontFamily: string): CSSProperties => ({
  fontFamily,
  letterSpacing: 0,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  textRendering: "geometricPrecision",
  backfaceVisibility: "hidden",
  transformStyle: "preserve-3d",
  willChange: "transform, opacity",
});

const CameraDrift: React.FC<{ frame: number; children: ReactNode; depth?: number; phase?: number }> = ({
  frame,
  children,
  depth = 1,
  phase = 0,
}) => {
  const x = drift(frame, 7 * depth, phase);
  const y = drift(frame, 4 * depth, phase + 1.3);
  const scale = 1.015 + maybeZero(Math.sin(frame / 86 + phase) * 0.005);
  return (
    <div className="tp-layer" style={{ transform: `translate3d(${x}px, ${y}px, 0) scale3d(${scale}, ${scale}, 1)` }}>
      {children}
    </div>
  );
};

const SceneLifecycle: React.FC<{
  frame: number;
  scene: (typeof SCENES)[number];
  children: (local: number, foreground: number) => ReactNode;
}> = ({ frame, scene, children }) => {
  const opacity = sceneOpacity(frame, scene.from, scene.duration);
  const local = frame - scene.from;
  const foreground = foregroundOpacity(local, scene.duration);
  return (
    <div className="tp-scene" style={{ opacity }}>
      {children(local, foreground)}
    </div>
  );
};

const SceneTransition: React.FC<{ frame: number }> = ({ frame }) => {
  const sweep = maybeZero((frame * 2.2) % 1500 - 180);
  return (
    <div
      className="tp-layer"
      style={{
        opacity: STATIC_RECONSTRUCTION ? 0.32 : 0.22 + Math.sin(frame / 37) * 0.05,
        transform: `translate3d(${sweep}px, 0, 0)`,
        background: "linear-gradient(102deg, transparent 0%, rgba(60, 190, 255, 0.08) 42%, transparent 64%)",
        mixBlendMode: "screen",
      }}
    />
  );
};

const AmbientBackground: React.FC<{ frame: number }> = ({ frame }) => (
  <div className="tp-background">
    <div className="tp-background-base" />
    <div className="tp-noise" style={{ transform: `translate3d(${drift(frame, 18, 1)}px, ${drift(frame, 14, 2)}px, 0)` }} />
    <div
      className="tp-perspective-grid"
      style={{ transform: `perspective(520px) rotateX(64deg) translate3d(0, ${drift(frame, 10, 3)}px, 0)` }}
    />
    <SceneTransition frame={frame} />
    <div className="tp-vignette" />
  </div>
);

const TraceLogo: React.FC<{ frame: number; start: number; x: number; y: number; scale?: number }> = ({ frame, start, x, y, scale = 1 }) => {
  const { fps } = useVideoConfig();
  const p = entrance(frame, start, fps, 126);
  const pulse = 1 + maybeZero(Math.sin(frame / 24) * 0.025);
  return (
    <div
      className="tp-logo-wrap"
      style={{
        left: x,
        top: y,
        opacity: p,
        transform: `translate3d(0, ${(1 - p) * 24}px, 0) scale3d(${scale * (0.72 + p * 0.28) * pulse}, ${scale * (0.72 + p * 0.28) * pulse}, 1)`,
      }}
    >
      <svg className="tp-logo-svg" viewBox="0 0 96 96">
        <path
          d="M17 17C35 9 62 10 80 18C86 21 86 28 80 31L64 40C57 44 53 50 51 58L46 80C45 86 38 89 33 85C30 82 29 78 31 73L39 45C41 39 37 34 30 34H17C9 34 6 25 12 20C13 19 15 18 17 17Z"
          fill="#159bff"
        />
        <path
          d="M55 20H80C86 20 88 27 83 31L61 46C55 50 52 56 51 63L48 76C47 81 42 83 38 80L43 57C46 45 53 36 64 30L55 20Z"
          fill="#65e8ff"
          opacity="0.82"
        />
        <path d="M15 19C33 12 59 12 75 19" fill="none" stroke="#8ff3ff" strokeWidth="3" strokeLinecap="round" opacity="0.52" />
      </svg>
    </div>
  );
};

const SplitHeadlineReveal: React.FC<{
  frame: number;
  start: number;
  x: number;
  y: number;
  lines: Array<{ text: string; color: string; size: number; weight?: number; width?: number }>;
  font: string;
  align?: "left" | "center";
  lineGap?: number;
}> = ({ frame, start, x, y, lines, font, align = "left", lineGap = 8 }) => {
  const { fps } = useVideoConfig();
  let top = y;
  return (
    <>
      {lines.map((line, index) => {
        const p = entrance(frame, start + index * 4, fps, 118);
        const height = line.size * 1.18;
        const width = line.width ?? 760;
        const lineTop = top;
        top += height + lineGap;
        return (
          <div key={`${line.text}-${index}`} className="tp-mask" style={{ left: x, top: lineTop, width, height }}>
            <div
              className="tp-text"
              style={{
                ...textBase(font),
                left: align === "center" ? 0 : 0,
                top: 0,
                width,
                color: line.color,
                fontSize: line.size,
                fontWeight: line.weight ?? 820,
                lineHeight: 1.04,
                textAlign: align,
                opacity: p,
                transform: `translate3d(0, ${(1 - p) * 72}px, 0) scale3d(${0.96 + p * 0.04}, ${0.96 + p * 0.04}, 1)`,
              }}
            >
              {line.text}
            </div>
          </div>
        );
      })}
    </>
  );
};

const BrandScene: React.FC<{ frame: number; fonts: ReturnType<typeof useFonts> }> = ({ frame, fonts }) => {
  const { fps } = useVideoConfig();
  const logo = entrance(frame, 18, fps, 126);
  const title = entrance(frame, 23, fps, 118);
  const subtitle = entrance(frame, 34, fps, 104);
  const arc = reveal(frame, 14, 58);
  return (
    <SceneLifecycle frame={frame} scene={SCENES[0]}>
      {(local, foreground) => (
        <>
          <AmbientBackground frame={frame} />
          <CameraDrift frame={frame} depth={0.45} phase={0.6}>
            <svg className="tp-arc-svg" width="1280" height="720" viewBox="0 0 1280 720" style={{ opacity: 0.9 }}>
              <path
                d="M70 655 C250 518 430 488 604 560 C838 692 1020 554 1184 382"
                fill="none"
                stroke="rgba(22, 167, 255, 0.22)"
                strokeWidth="18"
                strokeLinecap="round"
                style={{ filter: "blur(13px)", strokeDasharray: 1400, strokeDashoffset: (1 - arc) * 1400 }}
              />
              <path
                d="M70 655 C250 518 430 488 604 560 C838 692 1020 554 1184 382"
                fill="none"
                stroke="#22c3ff"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ strokeDasharray: 1400, strokeDashoffset: (1 - arc) * 1400 }}
              />
              <g opacity={arc} style={{ filter: "drop-shadow(0 0 26px rgba(117,234,255,0.95))" }}>
                <circle cx="1184" cy="382" r="46" fill="rgba(70, 214, 255, 0.14)" />
                <circle cx="1184" cy="382" r="27" fill="rgba(112, 231, 255, 0.22)" />
                <circle cx="1184" cy="382" r={10 + maybeZero(Math.sin(frame / 12) * 2)} fill="#c9fbff" />
              </g>
            </svg>
          </CameraDrift>
          <div className="tp-foreground" style={{ opacity: foreground }}>
            <TraceLogo frame={local} start={15} x={390} y={230} />
            <div
              className="tp-wordmark"
              style={{
                ...textBase(fonts.space),
                left: 492,
                top: 237,
                fontSize: 84,
                opacity: title * foreground,
                transform: `translate3d(${(1 - title) * -22}px, ${(1 - title) * 20}px, 0) scale3d(${0.94 + title * 0.06}, ${0.94 + title * 0.06}, 1)`,
              }}
            >
              TracePilot
            </div>
            <div
              className="tp-subtitle"
              style={{ ...textBase(fonts.inter), left: 0, right: 0, top: 346, fontSize: 29, opacity: subtitle * foreground, transform: `translate3d(0, ${(1 - subtitle) * 34}px, 0)` }}
            >
              AI Observability for
            </div>
            <div
              className="tp-subtitle"
              style={{ ...textBase(fonts.inter), left: 0, right: 0, top: 386, fontSize: 29, opacity: subtitle * foreground, transform: `translate3d(0, ${(1 - subtitle) * 44}px, 0)` }}
            >
              Production-Ready Intelligence
            </div>
            <div style={{ position: "absolute", left: 386, top: 220, width: 516, height: 126, borderRadius: 80, background: "rgba(22,167,255,0.08)", filter: "blur(48px)", opacity: logo * foreground }} />
          </div>
        </>
      )}
    </SceneLifecycle>
  );
};

const noiseDots = [
  [28, 42, "#e94c64"], [76, 78, "#d8e8ff"], [126, 46, "#1ca7ff"], [176, 92, "#6f7d92"], [54, 126, "#8796a8"], [118, 136, "#e9f4ff"], [188, 34, "#2ec7ff"], [154, 142, "#e84e64"], [94, 26, "#8c98aa"], [206, 120, "#f7fbff"],
];

const graphNodes = [
  [72, 116], [142, 72], [224, 110], [288, 54], [108, 206], [214, 210], [302, 170], [244, 278], [342, 238],
];

const graphEdges = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [2, 5], [5, 6], [5, 7], [6, 8], [7, 8]];

const NoiseScene: React.FC<{ frame: number; fonts: ReturnType<typeof useFonts> }> = ({ frame, fonts }) => {
  const { fps } = useVideoConfig();
  const panelIn = entrance(frame - SCENES[1].from, 20, fps, 110);
  const flow = reveal(frame - SCENES[1].from, 34, 66);
  return (
    <SceneLifecycle frame={frame} scene={SCENES[1]}>
      {(local, foreground) => (
        <>
          <AmbientBackground frame={frame} />
          <div className="tp-foreground" style={{ opacity: foreground }}>
            <SplitHeadlineReveal
              frame={local}
              start={12}
              x={92}
              y={86}
              font={fonts.space}
              lineGap={3}
              lines={[
                { text: "From noise", color: "#f8fbff", size: 70, width: 540 },
                { text: "to root cause.", color: "#147dff", size: 70, width: 650 },
              ]}
            />
            <div
              className="tp-glass-panel"
              style={{
                left: 102,
                top: 312,
                width: 246,
                height: 182,
                opacity: panelIn,
                transform: `translate3d(${(1 - panelIn) * -52}px, ${(1 - panelIn) * 18}px, 0) rotate3d(0, 0, 1, ${-2 + panelIn * 2}deg)`,
              }}
            >
              {noiseDots.map(([x, y, color], index) => (
                <div
                  key={`noise-${index}`}
                  className="tp-dot"
                  style={{
                    left: x as number,
                    top: y as number,
                    color: color as string,
                    background: color as string,
                    opacity: 0.58 + maybeZero(Math.sin(frame / 13 + index) * 0.18),
                    transform: `translate3d(${drift(frame, 5, index)}px, ${drift(frame, 5, index + 1)}px, 0) scale3d(${0.9 + maybeZero(Math.sin(frame / 17 + index) * 0.2)}, ${0.9 + maybeZero(Math.sin(frame / 17 + index) * 0.2)}, 1)`,
                  }}
                />
              ))}
            </div>
            <svg className="tp-flow-svg" width="430" height="190" viewBox="0 0 430 190" style={{ left: 362, top: 312, opacity: flow }}>
              {[0, 1, 2, 3].map((line) => (
                <path
                  key={line}
                  d={`M8 ${48 + line * 25} C116 ${18 + line * 28} 236 ${80 + line * 13} 418 ${45 + line * 25}`}
                  fill="none"
                  stroke={line % 2 === 0 ? "rgba(63, 197, 255, 0.42)" : "rgba(203, 225, 245, 0.18)"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ strokeDasharray: 520, strokeDashoffset: (1 - flow) * 520 }}
                />
              ))}
              {[68, 154, 245, 334].map((cx, index) => (
                <circle key={cx} cx={cx + maybeZero(Math.sin(frame / 15 + index) * 7)} cy={68 + index * 19} r="5" fill="#43d9ff" opacity={0.45 + maybeZero(Math.sin(frame / 12 + index) * 0.25)} />
              ))}
            </svg>
            <div
              className="tp-glass-panel"
              style={{
                left: 772,
                top: 218,
                width: 408,
                height: 318,
                opacity: panelIn,
                transform: `translate3d(${(1 - panelIn) * 56}px, ${(1 - panelIn) * 24}px, 0) scale3d(${0.94 + panelIn * 0.06}, ${0.94 + panelIn * 0.06}, 1)`,
              }}
            >
              <svg className="tp-graph-svg" width="408" height="318" viewBox="0 0 408 318" style={{ left: 0, top: 0 }}>
                {graphEdges.map(([a, b], index) => (
                  <line
                    key={`edge-${index}`}
                    x1={graphNodes[a][0]}
                    y1={graphNodes[a][1]}
                    x2={graphNodes[b][0]}
                    y2={graphNodes[b][1]}
                    stroke="rgba(91, 198, 255, 0.46)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity={reveal(local, 32 + index * 2, 56)}
                  />
                ))}
                {graphNodes.map(([x, y], index) => {
                  const active = index === 3;
                  const p = entrance(local, 30 + index * 3, fps, 110);
                  return (
                    <g key={`node-${index}`} opacity={p}>
                      {active && <circle cx={x} cy={y} r="34" fill="rgba(62, 211, 255, 0.2)" />}
                      {active && <circle cx={x} cy={y} r="22" fill="rgba(94, 232, 255, 0.26)" />}
                      <circle
                        cx={x}
                        cy={y}
                        r={active ? 12 + maybeZero(Math.sin(frame / 10) * 1.5) : 8}
                        fill={active ? "#7cf1ff" : index % 2 ? "#f6fbff" : "#1fb6ff"}
                        style={{ filter: active ? "drop-shadow(0 0 18px rgba(77, 228, 255, 0.88))" : "drop-shadow(0 0 9px rgba(38, 177, 255, 0.55))" }}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </>
      )}
    </SceneLifecycle>
  );
};

const traceRows = [
  ["User Request", "GET /api/search", "120ms"],
  ["Planner Agent", "gpt-4.1", "842ms"],
  ["Tool: Vector Search", "pinecone://products", "356ms"],
  ["Reranker", "bge-reranker-v2", "289ms"],
  ["Response", "200 OK", "98ms"],
];

const CursorClick: React.FC<{ frame: number; start: number; x: number; y: number }> = ({ frame, start, x, y }) => {
  const { fps } = useVideoConfig();
  const p = entrance(frame, start, fps, 120);
  const click = reveal(frame, start + 2, start + 12);
  return (
    <>
      {[0, 1, 2].map((ring) => {
        const size = 38 + ring * 28 + maybeZero(click * 26);
        return (
          <div
            key={`ripple-${ring}`}
            className="tp-ripple"
            style={{
              left: x + 17 - size / 2,
              top: y + 18 - size / 2,
              width: size,
              height: size,
              opacity: present(0.62 - ring * 0.16) * click,
              transform: `scale3d(${0.72 + click * 0.44 + ring * 0.06}, ${0.72 + click * 0.44 + ring * 0.06}, 1)`,
            }}
          />
        );
      })}
      <svg
        className="tp-cursor"
        viewBox="0 0 70 78"
        style={{ left: x, top: y, opacity: p, transform: `translate3d(${(1 - p) * 40}px, ${(1 - p) * 36}px, 0) rotate3d(0, 0, 1, ${-8 + p * 8}deg)` }}
      >
        <path d="M9 5L61 55L36 57L26 75L17 71L27 54L9 5Z" fill="#ffffff" stroke="#102033" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    </>
  );
};

const TracePanel: React.FC<{ frame: number; local: number; fonts: ReturnType<typeof useFonts> }> = ({ frame, local, fonts }) => {
  const { fps } = useVideoConfig();
  const panel = entrance(local, 18, fps, 118);
  return (
    <div
      className="tp-glass-panel"
      style={{
        left: 700,
        top: 98,
        width: 480,
        height: 526,
        opacity: panel,
        transform: `translate3d(${(1 - panel) * 52}px, ${(1 - panel) * 32}px, 0) scale3d(${0.94 + panel * 0.06}, ${0.94 + panel * 0.06}, 1)`,
      }}
    >
      <div className="tp-panel-sheen" style={{ transform: `translate3d(${maybeZero((frame * 2.4) % 680)}px, 0, 0) skewX(-18deg)` }} />
      <div className="tp-small-label" style={{ ...textBase(fonts.inter), left: 32, top: 25, color: "#f8fbff", fontSize: 24, fontWeight: 820 }}>Trace</div>
      <div className="tp-small-label" style={{ ...textBase(fonts.inter), right: 30, top: 30, color: "#38d9ff", fontSize: 15, fontWeight: 800 }}>Live</div>
      <div style={{ position: "absolute", left: 47, top: 92, width: 2, height: 358, background: "linear-gradient(#158bff, #5ee9ff, rgba(94, 233, 255, 0.16))", opacity: panel }} />
      {traceRows.map(([title, subtitle, time], index) => {
        const row = entrance(local, 28 + index * 4, fps, 112);
        const top = 76 + index * 78;
        return (
          <div key={title}>
            <div className="tp-node-check" style={{ top: top + 22, opacity: row, transform: `scale3d(${0.72 + row * 0.28}, ${0.72 + row * 0.28}, 1)` }} />
            <div
              className={`tp-trace-row${index === 2 ? " tp-trace-row-active" : ""}`}
              style={{ top, opacity: row, transform: `translate3d(${(1 - row) * 24}px, ${(1 - row) * 10}px, 0)` }}
            >
              <div className="tp-row-title" style={{ ...textBase(fonts.inter) }}>{title}</div>
              <div className="tp-row-subtitle" style={{ ...textBase(fonts.inter) }}>{subtitle}</div>
              <div className="tp-row-time" style={{ ...textBase(fonts.space) }}>{time}</div>
            </div>
          </div>
        );
      })}
      <CursorClick frame={local} start={38} x={298} y={284} />
    </div>
  );
};

const LiveTraceScene: React.FC<{ frame: number; fonts: ReturnType<typeof useFonts> }> = ({ frame, fonts }) => (
  <SceneLifecycle frame={frame} scene={SCENES[2]}>
    {(local, foreground) => (
      <>
        <AmbientBackground frame={frame} />
        <div className="tp-foreground" style={{ opacity: foreground }}>
          <SplitHeadlineReveal
            frame={local}
            start={12}
            x={86}
            y={223}
            font={fonts.space}
            lineGap={1}
            lines={[
              { text: "See every", color: "#f8fbff", size: 78, width: 520 },
              { text: "agent step.", color: "#20bdff", size: 78, width: 560 },
            ]}
          />
          <TracePanel frame={frame} local={local} fonts={fonts} />
        </div>
      </>
    )}
  </SceneLifecycle>
);

const chartPoints = [
  [[22, 24], [42, 31], [63, 28], [84, 39], [105, 35], [128, 50], [150, 46], [172, 58], [194, 54], [216, 68], [240, 63], [264, 73], [296, 80]],
  [[22, 22], [44, 28], [66, 25], [88, 35], [110, 31], [132, 45], [154, 42], [178, 55], [202, 52], [226, 64], [250, 60], [274, 72], [296, 78]],
  [[22, 20], [42, 26], [64, 30], [86, 41], [108, 37], [130, 52], [154, 48], [178, 59], [202, 56], [226, 68], [250, 64], [274, 75], [296, 80]],
];

const chartPaths = chartPoints.map((points) => points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" "));

const MetricCard: React.FC<{
  local: number;
  index: number;
  x: number;
  accent: string;
  title: string;
  value: string;
  subvalue: string;
  fonts: ReturnType<typeof useFonts>;
}> = ({ local, index, x, accent, title, value, subvalue, fonts }) => {
  const { fps } = useVideoConfig();
  const p = entrance(local, 24 + index * 5, fps, 116);
  const draw = reveal(local, 40 + index * 5, 67 + index * 3);
  return (
    <div
      className="tp-card"
      style={{ left: x, top: 286, opacity: p, transform: `translate3d(0, ${(1 - p) * 48}px, 0) scale3d(${0.93 + p * 0.07}, ${0.93 + p * 0.07}, 1)` }}
    >
      <div className="tp-card-title" style={{ ...textBase(fonts.inter) }}>{title}</div>
      <div className="tp-card-value" style={{ ...textBase(fonts.space), color: accent }}>{value}</div>
      <div className="tp-card-subvalue" style={{ ...textBase(fonts.inter), color: accent }}>{subvalue}</div>
      <svg className="tp-chart-svg" width="318" height="98" viewBox="0 0 318 98" style={{ left: 0, top: 132 }}>
        <path d="M20 82H298" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <path d="M20 52H298" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <path
          d={chartPaths[index]}
          fill="none"
          stroke={accent}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 520, strokeDashoffset: (1 - draw) * 520, filter: `drop-shadow(0 0 13px ${accent})` }}
        />
        {chartPoints[index].map(([cx, cy], pointIndex) => (
          <circle key={`point-${pointIndex}`} cx={cx} cy={cy} r="2.8" fill={accent} opacity={draw} />
        ))}
      </svg>
    </div>
  );
};

const ProofScene: React.FC<{ frame: number; fonts: ReturnType<typeof useFonts> }> = ({ frame, fonts }) => {
  const { fps } = useVideoConfig();
  const pill = entrance(frame - SCENES[3].from, 52, fps, 112);
  return (
    <SceneLifecycle frame={frame} scene={SCENES[3]}>
      {(local, foreground) => (
        <>
          <AmbientBackground frame={frame} />
          <div className="tp-foreground" style={{ opacity: foreground }}>
            {[
              { blue: "Faster", rest: "fixes.", top: 74, start: 10 },
              { blue: "Lower", rest: "spend.", top: 153, start: 16 },
            ].map((line) => {
              const p = entrance(local, line.start, fps, 118);
              return (
                <div key={line.blue} className="tp-mask" style={{ left: 250, top: line.top, width: 780, height: 80 }}>
                  <div
                    className="tp-text"
                    style={{
                      ...textBase(fonts.space),
                      left: 0,
                      top: 0,
                      width: 780,
                      color: "#f8fbff",
                      fontSize: 66,
                      fontWeight: 840,
                      lineHeight: 1.04,
                      textAlign: "center",
                      opacity: p * foreground,
                      transform: `translate3d(0, ${(1 - p) * 58}px, 0) scale3d(${0.96 + p * 0.04}, ${0.96 + p * 0.04}, 1)`,
                    }}
                  >
                    <span style={{ color: "#147dff" }}>{line.blue}</span> {line.rest}
                  </div>
                </div>
              );
            })}
            <MetricCard local={local} index={0} x={128} accent="#147dff" title="p95 Latency" value="-62%" subvalue="↓ 580ms" fonts={fonts} />
            <MetricCard local={local} index={1} x={481} accent="#3de0d5" title="Cost per 1K Traces" value="-47%" subvalue="↓ $1.42" fonts={fonts} />
            <MetricCard local={local} index={2} x={834} accent="#b26cff" title="Error Rate" value="-81%" subvalue="↓ 0.32%" fonts={fonts} />
            <div className="tp-status-pill" style={{ opacity: pill, transform: `translate3d(0, ${(1 - pill) * 24}px, 0) scale3d(${0.94 + pill * 0.06}, ${0.94 + pill * 0.06}, 1)` }}>
              <div className="tp-status-dot" />
              <div className="tp-status-text" style={{ ...textBase(fonts.inter) }}>All systems improving</div>
            </div>
          </div>
        </>
      )}
    </SceneLifecycle>
  );
};

const FinalScene: React.FC<{ frame: number; fonts: ReturnType<typeof useFonts> }> = ({ frame, fonts }) => {
  const { fps } = useVideoConfig();
  const local = frame - SCENES[4].from;
  const word = entrance(local, 19, fps, 118);
  const cta = entrance(local, 48, fps, 122);
  return (
    <SceneLifecycle frame={frame} scene={SCENES[4]}>
      {(sceneLocal, foreground) => (
        <>
          <AmbientBackground frame={frame} />
          <div className="tp-perspective-rays" style={{ transform: `perspective(520px) rotateX(62deg) translate3d(0, ${drift(frame, 8, 3)}px, 0)`, opacity: 0.42 }} />
          <svg className="tp-arc-svg" width="1280" height="720" viewBox="0 0 1280 720" style={{ left: 0, top: 0, opacity: 0.98 }}>
            <defs>
              <radialGradient id="tpHorizonGlow" cx="50%" cy="82%" r="42%">
                <stop stopColor="rgba(147, 245, 255, 0.95)" />
                <stop offset="0.34" stopColor="rgba(25, 166, 255, 0.42)" />
                <stop offset="1" stopColor="rgba(25, 166, 255, 0)" />
              </radialGradient>
              <linearGradient id="tpHorizonBody" x1="0" x2="0" y1="548" y2="720" gradientUnits="userSpaceOnUse">
                <stop stopColor="rgba(77, 218, 255, 0.34)" />
                <stop offset="0.42" stopColor="rgba(18, 109, 218, 0.2)" />
                <stop offset="1" stopColor="rgba(3, 8, 18, 0.82)" />
              </linearGradient>
            </defs>
            <path d="M0 720L0 624C298 538 982 538 1280 624L1280 720Z" fill="url(#tpHorizonBody)" />
            <ellipse cx="640" cy="598" rx="512" ry="88" fill="url(#tpHorizonGlow)" />
            <path d="M96 615 C350 536 930 536 1184 615" fill="none" stroke="rgba(70, 219, 255, 0.32)" strokeWidth="36" strokeLinecap="round" style={{ filter: "blur(16px)" }} />
            <path d="M96 615 C350 536 930 536 1184 615" fill="none" stroke="#77f0ff" strokeWidth="5" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 22px rgba(92, 224, 255, 1))" }} />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((ray) => {
              const x = 52 + ray * 107;
              return <line key={`ray-${ray}`} x1="640" y1="582" x2={x} y2="720" stroke="rgba(92, 217, 255, 0.36)" strokeWidth="1.6" />;
            })}
          </svg>
          <div style={{ position: "absolute", left: 502, top: 565, width: 276, height: 114, borderRadius: "50%", background: "rgba(47, 206, 255, 0.42)", filter: "blur(46px)", opacity: 0.88 }} />
          <div className="tp-foreground" style={{ opacity: foreground }}>
            <TraceLogo frame={sceneLocal} start={13} x={467} y={154} scale={0.62} />
            <div
              className="tp-wordmark"
              style={{
                ...textBase(fonts.space),
                left: 544,
                top: 171,
                fontSize: 48,
                opacity: word,
                transform: `translate3d(${(1 - word) * -18}px, ${(1 - word) * 14}px, 0)`,
              }}
            >
              TracePilot
            </div>
            <SplitHeadlineReveal
              frame={sceneLocal}
              start={28}
              x={260}
              y={270}
              font={fonts.space}
              align="center"
              lineGap={7}
              lines={[
                { text: "Launch your", color: "#f8fbff", size: 70, width: 760 },
                { text: "observability copilot.", color: "#20bdff", size: 70, width: 760 },
              ]}
            />
            <div className="tp-cta-button" style={{ opacity: cta, transform: `translate3d(0, ${(1 - cta) * 44}px, 0) scale3d(${0.9 + cta * 0.1}, ${0.9 + cta * 0.1}, 1)` }}>
              <div className="tp-panel-sheen" style={{ transform: `translate3d(${maybeZero((frame * 3.4) % 500)}px, 0, 0) skewX(-18deg)` }} />
              <div className="tp-cta-text" style={{ ...textBase(fonts.inter) }}>Get Started Now →</div>
            </div>
          </div>
        </>
      )}
    </SceneLifecycle>
  );
};

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const fonts = useFonts();

  return (
    <>
      {frame === 0 && <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />}
      <AbsoluteFill className="tracepilot-root">
        <BrandScene frame={frame} fonts={fonts} />
        <NoiseScene frame={frame} fonts={fonts} />
        <LiveTraceScene frame={frame} fonts={fonts} />
        <ProofScene frame={frame} fonts={fonts} />
        <FinalScene frame={frame} fonts={fonts} />
      </AbsoluteFill>
    </>
  );
};
