import React, { ReactElement } from 'react';
import Button from './Button.tsx';
import { MAIN_MENU } from './utils/consts.ts';
import BoxContainer from './BoxContainer.tsx';

type GameOverProps = {
  message: string;
  score: number;
  setDisplayedScreen: (_screen: string) => void;
};

const GameOver = ({
  message,
  score,
  setDisplayedScreen,
}: GameOverProps): ReactElement => (
  <BoxContainer
    component={
      <>
        <h1>{message}</h1>
        <p>Score: {score}</p>
        <Button text="Home" onClick={() => setDisplayedScreen(MAIN_MENU)} />
      </>
    }
  />
);

export default GameOver;
