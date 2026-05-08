import { useState, useEffect, useRef } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { composition, type SceneMarker } from "./remotion/compositions";

// Parse frame from URL hash (e.g., #frame=100)
const getFrameFromHash = (): number | null => {
  const hash = window.location.hash;
  if (!hash) return null;

  const params = new URLSearchParams(hash.slice(1));
  const frameParam = params.get("frame");

  if (frameParam) {
    const frame = parseInt(frameParam, 10);
    if (!isNaN(frame) && frame >= 0) {
      return frame;
    }
  }

  return null;
};

export const App = () => {
  const playerRef = useRef<PlayerRef>(null);
  const [playerSize, setPlayerSize] = useState<React.CSSProperties>({
    width: "100%",
    height: "100%",
  });
  const [currentFrame, setCurrentFrame] = useState(getFrameFromHash() ?? 0);

  const sceneMarkers = (composition.scenes ?? [])
    .filter((scene): scene is SceneMarker => Number.isFinite(scene.from))
    .map((scene, index) => ({
      ...scene,
      from: Math.max(0, Math.min(Math.round(scene.from), composition.durationInFrames - 1)),
      label: scene.label?.trim() || `Scene ${index + 1}`,
    }))
    .sort((a, b) => a.from - b.from);

  const scenes = sceneMarkers.map((scene, index) => {
    const nextScene = sceneMarkers[index + 1];
    const inferredEnd = nextScene?.from ?? composition.durationInFrames;
    const configuredEnd =
      typeof scene.durationInFrames === "number"
        ? scene.from + scene.durationInFrames
        : inferredEnd;

    return {
      ...scene,
      end: Math.max(scene.from + 1, Math.min(configuredEnd, composition.durationInFrames)),
    };
  });
  const hasSceneControls = scenes.length > 0;
  const activeSceneIndex = Math.max(
    0,
    scenes.findIndex((scene, index) => {
      const nextScene = scenes[index + 1];
      return currentFrame >= scene.from && currentFrame < (nextScene?.from ?? scene.end);
    }),
  );
  const activeScene = scenes[activeSceneIndex];
  const activeSceneProgress = activeScene
    ? Math.min(1, Math.max(0, (currentFrame - activeScene.from) / (activeScene.end - activeScene.from)))
    : 0;

  // Get initial frame from URL hash
  const initialFrame = getFrameFromHash();
  const shouldAutoPlay = initialFrame === null;

  // Calculate the player size based on composition aspect ratio
  const calculatePlayerSize = () => {
    if (typeof window === "undefined") return { width: "100%", height: "100%" };

    const aspectRatio = composition.width / composition.height;

    // Maximum available space
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * (hasSceneControls ? 0.72 : 0.85);

    let playerWidth = maxWidth;
    let playerHeight = playerWidth / aspectRatio;

    // If height exceeds max height, scale down
    if (playerHeight > maxHeight) {
      playerHeight = maxHeight;
      playerWidth = playerHeight * aspectRatio;
    }

    return {
      width: `${playerWidth}px`,
      height: `${playerHeight}px`,
      maxWidth: "100%",
      maxHeight: "100%",
    };
  };

  // Update player size on window resize
  useEffect(() => {
    const updateSize = () => {
      setPlayerSize(calculatePlayerSize());
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [hasSceneControls]);

  // Seek to frame from URL hash on mount
  useEffect(() => {
    if (initialFrame !== null && playerRef.current) {
      playerRef.current.seekTo(initialFrame);
    }
  }, [initialFrame]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const updateFrame = ({ detail }: { detail: { frame: number } }) => {
      setCurrentFrame(detail.frame);
    };

    setCurrentFrame(player.getCurrentFrame());
    player.addEventListener("frameupdate", updateFrame);
    player.addEventListener("timeupdate", updateFrame);
    player.addEventListener("seeked", updateFrame);

    return () => {
      player.removeEventListener("frameupdate", updateFrame);
      player.removeEventListener("timeupdate", updateFrame);
      player.removeEventListener("seeked", updateFrame);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const frameFromHash = getFrameFromHash();
      if (frameFromHash !== null) {
        const frame = Math.min(frameFromHash, composition.durationInFrames - 1);
        playerRef.current?.seekTo(frame);
        setCurrentFrame(frame);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const seekToScene = (scene: SceneMarker) => {
    playerRef.current?.seekTo(scene.from);
    setCurrentFrame(scene.from);
    window.history.replaceState(null, "", `#frame=${scene.from}`);
  };

  return (
    <div className="app-preview-shell">
      <div className="app-preview-backdrop" />
      <div className="app-preview-stage">
        <div className="app-preview-center">
          <div className="app-player-frame">
            <div className="app-player-highlight" />
            <Player
              ref={playerRef}
              component={composition.component}
              durationInFrames={composition.durationInFrames}
              fps={composition.fps}
              compositionHeight={composition.height}
              compositionWidth={composition.width}
              controls
              autoPlay={shouldAutoPlay}
              style={playerSize}
              allowFullscreen
              doubleClickToFullscreen
              initialFrame={initialFrame ?? 0}
              numberOfSharedAudioTags={10}
            />
          </div>
          {hasSceneControls && (
            <div className="scene-controls" aria-label="Scene navigation">
              <div className="scene-controls-header">
                <span>Scenes</span>
                <span>{activeScene?.label ?? "Scene"}</span>
              </div>
              <div className="scene-control-track">
                {scenes.map((scene, index) => {
                  const isActive = index === activeSceneIndex;
                  const progress = isActive ? activeSceneProgress : currentFrame >= scene.end ? 1 : 0;

                  return (
                    <button
                      key={`${scene.label}-${scene.from}`}
                      className={`scene-control-button${isActive ? " scene-control-button-active" : ""}`}
                      onClick={() => seekToScene(scene)}
                      type="button"
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className="scene-control-label">{scene.label}</span>
                      <span className="scene-control-time">{Math.round(scene.from / composition.fps)}s</span>
                      <span className="scene-control-progress" style={{ transform: `scaleX(${progress})` }} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
