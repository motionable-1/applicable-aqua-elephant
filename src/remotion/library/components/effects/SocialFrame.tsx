import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export type SocialPlatform = "instagram" | "tiktok" | "youtube" | "twitter" | "linkedin";

export interface SocialFrameProps {
  children?: React.ReactNode;
  /** Platform style */
  platform?: SocialPlatform;
  /** Username to display */
  username?: string;
  /** Secondary handle/name text */
  handle?: string;
  /** Like count text, e.g. "12.4K" */
  likes?: string;
  /** Comment count text */
  comments?: string;
  /** Share count text */
  shares?: string;
  /** Show verified badge */
  verified?: boolean;
  /** Show likes/comments/shares bar */
  showEngagement?: boolean;
  /** Animate entrance */
  animated?: boolean;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Override platform accent color */
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const COLORS: Record<SocialPlatform, string> = {
  instagram: "#E1306C", tiktok: "#00F2EA", youtube: "#FF0000",
  twitter: "#1DA1F2", linkedin: "#0A66C2",
};

const F: React.CSSProperties = { fontFamily: "system-ui, -apple-system, sans-serif" };
const SHADOW = "0 1px 3px rgba(0,0,0,0.6)";
const STAGGER = 0.05;

/* -- Shared style builders ----------------------------------------- */

const row = (gap: number): React.CSSProperties => ({ display: "flex", alignItems: "center", gap });
const abs = (pos: Partial<Record<"top" | "bottom" | "left" | "right", number>>): React.CSSProperties => ({
  position: "absolute", ...pos,
});
const label = (sz: number, fw = 600, c = "#fff"): React.CSSProperties => ({
  color: c, fontSize: sz, fontWeight: fw, textShadow: SHADOW,
});
const muted = (sz: number): React.CSSProperties => ({
  color: "rgba(255,255,255,0.7)", fontSize: sz, textShadow: SHADOW,
});

/* -- SVG Icons (minimal geometric paths) --------------------------- */

type IP = { size?: number; color?: string };
const sv = (s: number, c: string, fill: string, ch: React.ReactNode) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill}>{ch}</svg>
);
const Heart: React.FC<IP> = ({ size: s = 24, color: c = "#fff" }) =>
  sv(s, c, "none", <path d="M12 21s-7-4.35-7-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 7 5c0 5.65-7 10-7 10z" stroke={c} strokeWidth={2} strokeLinejoin="round" />);
const Comment: React.FC<IP> = ({ size: s = 24, color: c = "#fff" }) =>
  sv(s, c, "none", <path d="M21 12a9 9 0 0 1-9 9l-4 1 1-4a9 9 0 1 1 12-6z" stroke={c} strokeWidth={2} strokeLinejoin="round" />);
const Share: React.FC<IP> = ({ size: s = 24, color: c = "#fff" }) =>
  sv(s, c, "none", <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" stroke={c} strokeWidth={2} strokeLinejoin="round" />);
const Music: React.FC<IP> = ({ size: s = 24, color: c = "#fff" }) =>
  sv(s, c, "none", <><path d="M9 18V5l12-2v13" stroke={c} strokeWidth={2} /><circle cx={6} cy={18} r={3} stroke={c} strokeWidth={2} /><circle cx={18} cy={16} r={3} stroke={c} strokeWidth={2} /></>);
const Play: React.FC<IP> = ({ size: s = 24, color: c = "#fff" }) =>
  sv(s, c, c, <polygon points="5,3 19,12 5,21" />);
const Retweet: React.FC<IP> = ({ size: s = 24, color: c = "#fff" }) =>
  sv(s, c, "none", <path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" stroke={c} strokeWidth={2} />);
const Send: React.FC<IP> = ({ size: s = 24, color: c = "#fff" }) =>
  sv(s, c, "none", <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke={c} strokeWidth={2} strokeLinejoin="round" />);
const Verified: React.FC<{ color?: string }> = ({ color: c = "#1DA1F2" }) => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill={c}>
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 0 12 2.944a11.955 11.955 0 0 0-8.618 3.04A12.02 12.02 0 0 0 .944 12c0 2.357.68 4.554 1.856 6.413a11.955 11.955 0 0 0 7.2 4.644 11.955 11.955 0 0 0 7.2-4.644A12.02 12.02 0 0 0 23.056 12a12.02 12.02 0 0 0-3.438-8.016z" />
  </svg>
);

/* -- Animation helper ---------------------------------------------- */

function useAnim(frame: number, fps: number, on: boolean, dur: number, del: number, i: number) {
  if (!on) return { opacity: 1, y: 0 };
  const df = Math.round((del + i * STAGGER) * fps);
  const d = Math.max(1, Math.round(dur * fps));
  const p = interpolate(frame - df, [0, d], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  return { opacity: p, y: (1 - p) * 16 };
}

function anim(a: { opacity: number; y: number }): React.CSSProperties {
  return { opacity: a.opacity, transform: `translateY(${a.y}px)` };
}

/* -- Shared sub-components ----------------------------------------- */

const Avatar: React.FC<{ size: number; color: string; rounded?: boolean }> = ({ size, color, rounded = true }) => (
  <div style={{ width: size, height: size, borderRadius: rounded ? "50%" : 6, background: `linear-gradient(135deg, ${color}88, ${color})`, flexShrink: 0 }} />
);

const Stat: React.FC<{ icon: React.ReactNode; text: string; color?: string }> = ({ icon, text, color = "#fff" }) => (
  <span style={{ ...row(6), color, fontSize: 13, fontWeight: 600, textShadow: SHADOW }}>{icon}{text}</span>
);

/* -- Platform renderers -------------------------------------------- */

type RP = { u: string; h: string; v: boolean; eng: boolean; on: boolean; dur: number; del: number; lk: string; cm: string; sh: string };

function Instagram({ u, v, eng, on, dur, del, lk, cm, sh }: RP, ac: string, fr: number, fps: number) {
  const a0 = useAnim(fr, fps, on, dur, del, 0), a1 = useAnim(fr, fps, on, dur, del, 1), a2 = useAnim(fr, fps, on, dur, del, 2);
  return (<>
    <div style={{ ...abs({ top: 0, left: 0, right: 0, bottom: 0 }), borderRadius: 16, padding: 3,
      background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor",
      maskComposite: "exclude" as never, ...anim(a0) }} />
    <div style={{ ...abs({ top: 16, left: 16 }), right: 16, ...row(10), ...F, ...anim(a1) }}>
      <Avatar size={36} color={ac} />
      <span style={label(14)}>{u}</span>
      {v && <Verified color="#3897f0" />}
    </div>
    {eng && (
      <div style={{ ...abs({ bottom: 16, left: 16 }), right: 16, ...row(18), ...F, ...anim(a2) }}>
        <Stat icon={<Heart size={26} />} text={lk} />
        <Stat icon={<Comment size={24} />} text={cm} />
        <Stat icon={<Share size={22} />} text={sh} />
      </div>
    )}
  </>);
}

function Tiktok({ u, v, eng, on, dur, del, lk, cm, sh }: RP, ac: string, fr: number, fps: number) {
  const a0 = useAnim(fr, fps, on, dur, del, 0), a1 = useAnim(fr, fps, on, dur, del, 1), a2 = useAnim(fr, fps, on, dur, del, 2);
  const col: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 };
  const ct: React.CSSProperties = { color: "#fff", fontSize: 12, fontWeight: 600, textShadow: SHADOW };
  return (<>
    {eng && (
      <div style={{ ...abs({ right: 12, bottom: 120 }), display: "flex", flexDirection: "column", alignItems: "center", gap: 20, ...F, ...anim(a0) }}>
        <Avatar size={44} color={ac} />
        <div style={col}><Heart size={32} /><span style={ct}>{lk}</span></div>
        <div style={col}><Comment size={30} /><span style={ct}>{cm}</span></div>
        <div style={col}><Share size={28} /><span style={ct}>{sh}</span></div>
        <div style={col}><Music size={28} /></div>
      </div>
    )}
    <div style={{ ...abs({ bottom: 24, left: 16 }), right: 80, ...F, ...anim(a1) }}>
      <div style={row(6)}>
        <span style={label(16, 700)}>{u}</span>
        {v && <Verified color={ac} />}
      </div>
    </div>
    <div style={{ ...abs({ bottom: 8, left: 16 }), right: 80, ...row(8), ...F, ...anim(a2) }}>
      <Music size={14} />
      <span style={{ color: "#fff", fontSize: 12, textShadow: SHADOW, overflow: "hidden", whiteSpace: "nowrap" }}>
        Original Sound - {u}
      </span>
    </div>
  </>);
}

function Youtube({ u, eng, on, dur, del, lk }: RP, ac: string, fr: number, fps: number) {
  const a0 = useAnim(fr, fps, on, dur, del, 0), a1 = useAnim(fr, fps, on, dur, del, 1), a2 = useAnim(fr, fps, on, dur, del, 2);
  const { durationInFrames } = useVideoConfig();
  const pct = Math.min(100, (fr / Math.max(1, durationInFrames - 1)) * 100);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const cur = Math.round(fr / fps), total = Math.round(durationInFrames / fps);
  return (<>
    <div style={{ ...abs({ top: 16, right: 16 }), ...row(10), ...F, ...anim(a0) }}>
      <span style={label(14)}>{u}</span>
      <div style={{ backgroundColor: ac, color: "#fff", fontSize: 13, fontWeight: 700, padding: "6px 16px", borderRadius: 4 }}>SUBSCRIBE</div>
    </div>
    {eng && (
      <div style={{ ...abs({ top: 16, left: 16 }), ...row(6), ...F, ...anim(a1) }}>
        <Heart size={20} /><span style={label(13)}>{lk}</span>
      </div>
    )}
    <div style={{ ...abs({ bottom: 0, left: 0 }), right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "24px 16px 12px", display: "flex", flexDirection: "column", gap: 8, ...F, ...anim(a2) }}>
      <div style={{ width: "100%", height: 3, backgroundColor: "rgba(255,255,255,0.3)", borderRadius: 2 }}>
        <div style={{ width: `${pct}%`, height: "100%", backgroundColor: ac, borderRadius: 2 }} />
      </div>
      <div style={row(12)}><Play size={20} /><span style={{ color: "#fff", fontSize: 12 }}>{fmt(cur)} / {fmt(total)}</span></div>
    </div>
  </>);
}

function Twitter({ u, h, v, eng, on, dur, del, lk, cm, sh }: RP, ac: string, fr: number, fps: number) {
  const a0 = useAnim(fr, fps, on, dur, del, 0), a1 = useAnim(fr, fps, on, dur, del, 1);
  const m = "rgba(255,255,255,0.7)";
  return (<>
    <div style={{ ...abs({ top: 16, left: 16 }), right: 16, ...row(10), ...F, ...anim(a0) }}>
      <Avatar size={40} color={ac} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={row(4)}>
          <span style={label(15, 700)}>{h || u}</span>
          {v && <Verified color={ac} />}
        </div>
        <span style={muted(13)}>{u}</span>
      </div>
    </div>
    {eng && (
      <div style={{ ...abs({ bottom: 16, left: 16 }), right: 16, ...row(28), ...F, ...anim(a1) }}>
        <Stat icon={<Comment size={20} color={m} />} text={cm} color={m} />
        <Stat icon={<Retweet size={20} color={m} />} text={sh} color={m} />
        <Stat icon={<Heart size={20} color={m} />} text={lk} color={m} />
      </div>
    )}
  </>);
}

function Linkedin({ u, h, eng, on, dur, del, lk, cm, sh }: RP, ac: string, fr: number, fps: number) {
  const a0 = useAnim(fr, fps, on, dur, del, 0), a1 = useAnim(fr, fps, on, dur, del, 1);
  const m = "rgba(255,255,255,0.75)";
  const btn: React.CSSProperties = { ...row(4), color: m, fontSize: 12, fontWeight: 600 };
  return (<>
    <div style={{ ...abs({ top: 16, left: 16 }), right: 16, ...row(10), ...F, ...anim(a0) }}>
      <Avatar size={44} color={ac} rounded={false} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={label(14, 700)}>{h || u}</span>
        <span style={muted(12)}>{u}</span>
      </div>
    </div>
    {eng && (
      <div style={{ ...abs({ bottom: 0, left: 0 }), right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.6))", padding: "20px 16px 14px", display: "flex", justifyContent: "space-around", ...F, ...anim(a1) }}>
        <div style={btn}><Heart size={18} color={m} /><span>Like {lk}</span></div>
        <div style={btn}><Comment size={18} color={m} /><span>Comment {cm}</span></div>
        <div style={btn}><Retweet size={18} color={m} /><span>Repost {sh}</span></div>
        <div style={btn}><Send size={18} color={m} /><span>Send</span></div>
      </div>
    )}
  </>);
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

/**
 * Social media platform-styled frame overlay.
 * Renders platform-specific UI chrome (avatars, engagement bars, icons)
 * as a non-interactive overlay on top of children content.
 *
 * @example
 * <SocialFrame platform="instagram" username="@designstudio" likes="12.4K" verified>
 *   <Img src={myImage} />
 * </SocialFrame>
 */
export const SocialFrame: React.FC<SocialFrameProps> = ({
  children, platform = "instagram", username = "@username", handle,
  likes = "12.4K", comments = "842", shares = "1.2K",
  verified = false, showEngagement = true, animated = true,
  duration = 0.5, delay = 0, accentColor, className, style: st,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ac = accentColor || COLORS[platform];
  const p: RP = { u: username, h: handle || "", v: verified, eng: showEngagement, on: animated, dur: duration, del: delay, lk: likes, cm: comments, sh: shares };

  const overlay = () => {
    switch (platform) {
      case "instagram": return Instagram(p, ac, frame, fps);
      case "tiktok":    return Tiktok(p, ac, frame, fps);
      case "youtube":   return Youtube(p, ac, frame, fps);
      case "twitter":   return Twitter(p, ac, frame, fps);
      case "linkedin":  return Linkedin(p, ac, frame, fps);
    }
  };

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", ...st }}>
      {children}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>{overlay()}</div>
    </div>
  );
};

export default SocialFrame;
