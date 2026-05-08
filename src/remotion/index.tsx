import "../styles/global.css";
import { registerRoot, Composition } from "remotion";
import { composition } from "./compositions";

const RemotionRoot = () => {
  return (
    <Composition
      id={composition.id}
      component={composition.component}
      durationInFrames={composition.durationInFrames}
      fps={composition.fps}
      width={composition.width}
      height={composition.height}
    />
  );
};

registerRoot(RemotionRoot);
