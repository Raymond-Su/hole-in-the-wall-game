import React, { Ref } from "react";

interface VideoContainerProps {
  gameStarted: boolean;
  videoRef: Ref<HTMLVideoElement>;
  canvasRef: Ref<HTMLCanvasElement>;
}

const VideoContainer = ({
  gameStarted,
  videoRef,
  canvasRef
}: VideoContainerProps): JSX.Element => {
  return (
    <div className="video">
      <video
        ref={videoRef}
        id="video"
        playsInline
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        id="canvas"
        style={{ display: gameStarted ? "initial" : "none" }}
      />
    </div>
  );
};

export default VideoContainer;
