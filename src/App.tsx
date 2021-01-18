import React, { FC, useRef, useState } from "react";
import { load } from "@tensorflow-models/posenet";

import "./App.css";
import { posenetConfiguration as posenetConfig } from "./constants/model";
import { setupCamera } from "./utils/videoUtils";
import { detectPoseInRealTime } from "./utils/poseUtils";

const App: FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [fail, setFails] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  const initGui = async () => {
    console.log("Starting Game");
    setGameStarted(true);
    const video = await setupCamera(cameraRef.current);
    const net = await load({
      architecture: posenetConfig.input.architecture,
      inputResolution: posenetConfig.input.inputResolution,
      outputStride: posenetConfig.input.outputStride,
      multiplier: posenetConfig.input.multiplier,
      quantBytes: posenetConfig.input.quantBytes
    });
    if (canvasRef.current && cameraRef.current && video) {
      video.play();
      detectPoseInRealTime(
        canvasRef.current,
        video,
        net,
        () => setPoints((point) => point + 1),
        () => setFails((fail) => fail + 1),
        3
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
        <div className="intro-container">
          <h1 className="game-heading">Hole in the Wall</h1>
          <p>
            The game is an adaptation of the Japanese game show Nōkabe (脳カベ)
            in which players must contort themselves to match a unique pose
            coming towards them. The player scores points if they are able to
            accurately mimic the pose for the round. Otherwise, the player
            obtains a fail strike and receives no points for that round. After
            each round, the pose changes. If the player recieves three strikes,
            the game ends.
          </p>
          <button className="btn-start" onClick={() => initGui()}>
            Start
          </button>
        </div>
      ) : (
        <div className="game">
          <div className="HUD">
            {fail === 3 ? (
              <>
                <div className="game-over">
                  <p>You scored: {points} points</p>
                  <button className="btn-restart" onClick={restartGame}>
                    Restart
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="points-container">{`Points: ${points}`}</h2>
                <h2 className="fails-container">{`Fails: ${"X".repeat(
                  fail
                )}`}</h2>
              </>
            )}
          </div>
        </div>
      )}
      <div className="video">
        <video
          ref={cameraRef}
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
    </div>
  );
};

export default App;
