import React from "react";

interface HUDprops {
  fails: number;
  points: number;
  restartGame: () => void;
}
const HUD = ({ fails, points, restartGame }: HUDprops): JSX.Element => {
  return (
    <div className="HUD">
      {fails === 3 ? (
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
          <h2 className="fails-container">{`Fails: ${"X".repeat(fails)}`}</h2>
        </>
      )}
    </div>
  );
};

export default HUD;
