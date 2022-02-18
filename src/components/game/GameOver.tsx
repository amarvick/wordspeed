import React from 'react';
// @ts-ignore
import Button from './Button.tsx';
import './GameOver.css';
// @ts-ignore
import { MAIN_MENU } from './utils/consts.ts';

type GameOverProps = {
  message: string,
  score: number,
  setDisplayedScreen: (screen: string) => void
}

const GameOver = ({ message, score, setDisplayedScreen }: GameOverProps): JSX.Element => (
  <div className="game-over">
    <div className="game-over-container">
      <h1>{message}</h1>
      <p>Score: {score}</p>
      <Button
        text="Home"
        onClick={() => setDisplayedScreen(MAIN_MENU)}
      />
    </div>
  </div>
);

export default GameOver;
