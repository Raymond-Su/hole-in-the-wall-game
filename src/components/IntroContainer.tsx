import React from "react";

interface IntroContainerProps {
  startGame: () => void;
}

const IntroContainer = ({ startGame }: IntroContainerProps): JSX.Element => {
  return (
    <div className="intro-container">
      <h1 className="game-heading">Hole in the Wall</h1>
      <p>
        The game is an adaptation of the Japanese game show Nōkabe (脳カベ) in
        which players must contort themselves to match a unique pose coming
        towards them. The player scores points if they are able to accurately
        mimic the pose for the round. Otherwise, the player obtains a fail
        strike and receives no points for that round. After each round, the pose
        changes. If the player recieves three strikes, the game ends.
      </p>
      <button className="btn-start" onClick={startGame}>
        Start
      </button>
    </div>
  );
};

export default IntroContainer;
