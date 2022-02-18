import React from 'react';

import './GameOver.css';

type GameOverProps = {
  score: number
}

const GameOver = ({ score }: GameOverProps): JSX.Element => (
  <div className="game-over">
    <div className="game-over-container">
      <h1>Game Over</h1>
      <p>Score: {score}</p>
    </div>
  </div>
);

export default GameOver;
