import React from 'react';
import './HighScores.css';

type GameOverProps = {
  highScores: number[]
}

const HighScores = ({ highScores }: GameOverProps): Element => (
  <div className="high-scores">
    <div className="high-scores-container">
      <h1>High Scores</h1>
      <ol>
        {highScores.map(score => (
          <li>{score}</li>
        ))}
      </ol>
    </div>
  </div>
);

export default HighScores;
