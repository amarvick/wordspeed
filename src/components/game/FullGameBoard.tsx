import React, { ReactElement, useEffect, useState } from 'react';
import FlippedTiles from './FlippedTiles.tsx';
import {
  StickyNote as TimerComponent,
  StickyNote as ScoreComponent,
} from './StickyNote.tsx';
import GameOver from './GameOver.tsx';
import UserStand from './UserStand.tsx';
import './FullGameBoard.css';
import { useGameLogic } from './utils/hooks/useGameLogic.ts';
import { setHighScores } from './utils/helpers.ts';

type FullGameBoardProps = {
  setDisplayedScreen: (_screen: string) => void;
};

const FullGameBoard = ({
  setDisplayedScreen,
}: FullGameBoardProps): ReactElement => {
  const [gameInProgress, setGameInProgress] = useState(true);
  const {
    remainingTime,
    setRemainingTime,
    score,
    error,
    flippedTiles,
    currWordTiles,
    deckTiles,
    allTiles,
    onKeyUp,
    toggleTile,
    submitWord,
    onSwap,
  } = useGameLogic();

  useEffect(() => {
    if (!gameInProgress || (!flippedTiles.listSize && !deckTiles.listSize)) {
      setHighScores(score);
    }
  }, [gameInProgress, flippedTiles, deckTiles, score]);

  const getMessage = (): string => {
    if (!gameInProgress) return 'GAME OVER';
    if (!flippedTiles.listSize && !deckTiles.listSize) return 'BOARD COMPLETED';
    return '';
  };

  useEffect(() => {
    if (!gameInProgress || remainingTime <= 0) {
      setGameInProgress(false);
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime((prevTime: number) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameInProgress, remainingTime]);

  useEffect(() => {
    if (remainingTime <= 0) {
      setGameInProgress(false);
    }
  }, [remainingTime]);

  return gameInProgress && (flippedTiles.listSize || deckTiles.listSize) ? (
    <div
      className="FullGameBoard"
      tabIndex={0}
      onKeyUp={(e) => onKeyUp(e.key)}
      aria-label={`Time remaining: ${remainingTime} seconds. Current score: ${score}.`}
    >
      <FlippedTiles tiles={flippedTiles} />
      <UserStand
        currWordTiles={currWordTiles}
        allTiles={allTiles}
        removeTile={(tileId) => toggleTile(tileId)}
        toggleTile={toggleTile}
        submitWord={submitWord}
        onSwap={onSwap}
        remainingTiles={flippedTiles.listSize}
        error={error}
      />
      <ScoreComponent header="Score" text={score.toString()} />
      <TimerComponent header="Time" text={remainingTime.toString()} />
    </div>
  ) : (
    <GameOver
      message={getMessage()}
      score={score}
      setDisplayedScreen={setDisplayedScreen}
    />
  );
};

export default FullGameBoard;
