import React, { useRef, useState } from "react";
import { load } from "@tensorflow-models/posenet";
import { posenetConfiguration as posenetConfig, MAX_FAILS } from "./constants";
import { setupCamera } from "./utils/videoUtils";
import { detectPoseInRealTime } from "./utils/poseUtils";

import VideoContainer from "./components/VideoContainer";
import IntroContainer from "./components/IntroContainer";
import HUD from "./components/HUD";

import "./App.css";

const App = (): JSX.Element => {
  const [points, setPoints] = useState<number>(0);
  const [fail, setFails] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startGame = async () => {
    console.log("Starting Game");
    setGameStarted(true);
    const video = await setupCamera(videoRef.current);
    const net = await load({
      architecture: posenetConfig.input.architecture,
      inputResolution: posenetConfig.input.inputResolution,
      outputStride: posenetConfig.input.outputStride,
      multiplier: posenetConfig.input.multiplier,
      quantBytes: posenetConfig.input.quantBytes
    });
    if (videoRef.current && video) {
      video.play();
      detectPoseInRealTime(
        canvasRef.current,
        video,
        net,
        () => setPoints((point) => point + 1),
        () => setFails((fail) => fail + 1),
        MAX_FAILS
      );
    }
  };

  const restartGame = () => {
    setFails(0);
    setPoints(0);
    setGameStarted(false);
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <IntroContainer startGame={startGame} />
      ) : (
        <HUD points={points} fails={fail} restartGame={restartGame} />
      )}
      <VideoContainer
        gameStarted={gameStarted}
        canvasRef={canvasRef}
        videoRef={videoRef}
      />
    </div>
  );
};

export default App;
