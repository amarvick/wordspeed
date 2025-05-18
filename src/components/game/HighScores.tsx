import React, { ReactElement } from 'react';
import Button from './Button.tsx';
import { MAIN_MENU } from './utils/consts.ts';
import BoxContainer from './BoxContainer.tsx';

type HighScoresProps = {
  setDisplayedScreen: (_menu: string) => void;
};

const HighScores = ({ setDisplayedScreen }: HighScoresProps): ReactElement => {
  const highScores = JSON.parse(localStorage.getItem('HighScores') || '[]');
  const sortedHighScores = highScores
    .sort((a: number, b: number) => b - a)
    .slice(0, 10);

  return (
    <BoxContainer
      component={
        <>
          <h1>High Scores</h1>
          {sortedHighScores.length ? (
            <ol>
              {sortedHighScores.map((score: string, index: number) => (
                <li key={`score-${index}`}>{score}</li>
              ))}
            </ol>
          ) : (
            <p>No scores recorded yet</p>
          )}
          <br />
          <Button
            text="Back to Menu"
            onClick={() => setDisplayedScreen(MAIN_MENU)}
          />
        </>
      }
    />
  );
};

export default HighScores;
