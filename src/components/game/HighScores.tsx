import React from 'react';
// @ts-ignore
import Button from './Button.tsx';
// @ts-ignore
import { MAIN_MENU } from './utils/consts.ts';
// @ts-ignore
import BoxContainer from './BoxContainer.tsx';

type HighScoresProps = {
  highScores: number[],
  setDisplayedScreen: (menu: string) => void
}

const HighScores = ({ highScores, setDisplayedScreen }: HighScoresProps): JSX.Element => (
  <BoxContainer
    component={(
      <>
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
      </>
    )}
  />
);

export default HighScores;
