import React from 'react';
// @ts-ignore
import Button from './Button.tsx';
// @ts-ignore
import { MAIN_MENU } from './utils/consts.ts';
// @ts-ignore
import BoxContainer from './BoxContainer.tsx';

type GameOverProps = {
  message: string,
  score: number,
  setDisplayedScreen: (screen: string) => void
}

const GameOver = ({ message, score, setDisplayedScreen }: GameOverProps): Element => (
  <BoxContainer
    component={(
      <>
        <h1>{message}</h1>
        <p>Score: {score}</p>
        <Button
          text="Home"
          onClick={() => setDisplayedScreen(MAIN_MENU)}
        />
      </>
    )}
  />
);

export default GameOver;
