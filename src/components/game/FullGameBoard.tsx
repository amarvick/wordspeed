import React, { ReactElement, useEffect, useState, useMemo } from 'react';
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

  const flippedTileCount = useMemo(() => flippedTiles.length, [flippedTiles]);
  const deckTileCount = useMemo(() => deckTiles.length, [deckTiles]);

  useEffect(() => {
    if (!gameInProgress || (flippedTileCount === 0 && deckTileCount === 0)) {
      setHighScores(score);
    }
  }, [gameInProgress, flippedTileCount, deckTileCount, score]);

  const getMessage = (): string => {
    if (!gameInProgress) return 'GAME OVER';
    if (flippedTileCount === 0 && deckTileCount === 0) return 'BOARD COMPLETED';
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
  }, [gameInProgress, remainingTime, setRemainingTime]);

  useEffect(() => {
    if (remainingTime <= 0) {
      setGameInProgress(false);
    }
  }, [remainingTime]);

  return gameInProgress && (flippedTileCount > 0 || deckTileCount > 0) ? (
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
        deckTiles={deckTiles}
        removeTile={(tileId) => toggleTile(tileId)}
        toggleTile={toggleTile}
        submitWord={submitWord}
        onSwap={onSwap}
        remainingTiles={flippedTileCount}
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
