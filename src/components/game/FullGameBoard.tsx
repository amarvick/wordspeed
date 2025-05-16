import React, { useEffect } from 'react';
import FlippedTiles from './FlippedTiles.tsx';
import { StickyNote as TimerComponent, StickyNote as ScoreComponent } from './StickyNote.tsx';
import GameOver from './GameOver.tsx';
import UserStand from './UserStand.tsx';
import './FullGameBoard.css';
import { useGameLogic } from './utils/hooks/useGameLogic.ts';
import { setHighScores } from './utils/helpers.ts';

type FullGameBoardProps = {
  setDisplayedScreen: (screen: string) => void;
  gameInProgress: boolean;
  remainingTime: number;
};

const FullGameBoard = ({
  setDisplayedScreen,
  gameInProgress,
  remainingTime,
}: FullGameBoardProps): Element => {
  const {
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
    if (!gameInProgress || !flippedTiles.listSize && !deckTiles.listSize) {
      setHighScores(score);
    }
  })

  const getMessage = (): string => {
    if (!gameInProgress) return 'GAME OVER';
    if (!flippedTiles.listSize && !deckTiles.listSize) return 'BOARD COMPLETED';
    return '';
  };

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
      <ScoreComponent header="Score" text={`${score}`} />
      <TimerComponent header="Time" text={remainingTime.toString()} />;
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
