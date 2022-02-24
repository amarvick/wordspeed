import React from 'react';
import './HighScores.css';
// @ts-ignore
import Button from './Button.tsx';
// @ts-ignore
import { MAIN_MENU } from './utils/consts.ts';

type HighScoresProps = {
  highScores: number[],
  setDisplayedScreen: (menu: string) => void
}

const HighScores = ({ highScores, setDisplayedScreen }: HighScoresProps): JSX.Element => (
  <div className="high-scores">
    <div className="high-scores-container">
      <h1>High Scores</h1>
      <ol>
        {highScores.map((score, index) => (
          <li key={`score-${index}`}>{score}</li>
        ))}
      </ol>
      <Button
        text="Back to Menu"
        onClick={() => setDisplayedScreen(MAIN_MENU)}
      />
    </div>
  </div>
);

export default HighScores;
