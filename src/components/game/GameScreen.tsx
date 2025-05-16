/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import FullGameBoard from './FullGameBoard.tsx';
import './GameScreen.css';
import { setHighScores } from './utils/helpers.ts';

type GameScreenProps = {
  setDisplayedScreen: (screen: string) => void;
};

const GameScreen = ({ setDisplayedScreen }: GameScreenProps): Element => {
  const [remainingTime, setRemainingTime] = useState(60);
  const [gameInProgress, setGameInProgress] = useState(true);

  useEffect(() => {
    if (!gameInProgress || remainingTime <= 0) {
      setGameInProgress(false);
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameInProgress, remainingTime]);

  useEffect(() => {
    if (remainingTime <= 0) {
      setGameInProgress(false);
    }
  }, [remainingTime]);

  return (
    <div className="GameScreen">
      <FullGameBoard
        setDisplayedScreen={setDisplayedScreen}
        gameInProgress={gameInProgress}
        remainingTime={remainingTime}
      />
    </div>
  );
};

export default GameScreen;
