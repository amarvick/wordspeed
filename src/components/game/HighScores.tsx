import React from 'react';
import Button from './Button.tsx';
import { MAIN_MENU } from './utils/consts.ts';
import BoxContainer from './BoxContainer.tsx';

type HighScoresProps = {
  setDisplayedScreen: (menu: string) => void
}

const HighScores = ({ setDisplayedScreen }: HighScoresProps): Element => {
  const highScores = JSON.parse(localStorage.getItem("HighScores") || '[]')
  const sortedHighScores = highScores.sort((a, b) => b - a).slice(0, 10);

  return (
  <BoxContainer
    component={(
      <>
        <h1>High Scores</h1>
        { sortedHighScores.length ?
        <ol>
          {sortedHighScores.map((score, index) => (
            <li key={`score-${index}`}>{score}</li>
          ))}
        </ol> : <p>No scores recorded yet</p>}<br />
        <Button
          text="Back to Menu"
          onClick={() => setDisplayedScreen(MAIN_MENU)}
        />
      </>
    )}
  />
)};

export default HighScores;
