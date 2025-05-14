// FullGameBoard.tsx
import React, { useState } from 'react';
import FlippedTiles from './FlippedTiles.tsx';
import TimerComponent from './TimerComponent.tsx';
import StickyNote from './StickyNote.tsx';
import GameOver from './GameOver.tsx';
import UserStand from './UserStand.tsx';
import './FullGameBoard.css';
import { useGameLogic } from './utils/hooks/useGameLogic.ts'

type FullGameBoardProps = {
  setDisplayedScreen: (screen: string) => void;
};

const FullGameBoard = ({ setDisplayedScreen }: FullGameBoardProps): Element => {
    const [gameInProgress, setGameInProgress] = useState(true);
  
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

  const getMessage = (): string => {
    if (!gameInProgress) return 'GAME OVER';
    if (!flippedTiles.listSize && !deckTiles.listSize) return 'BOARD COMPLETED';
    return '';
  };

  return gameInProgress && (flippedTiles.listSize || deckTiles.listSize) ? (
    <div tabIndex={0} onKeyUp={(e) => onKeyUp(e.key)}>
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
      {/* TODO - get rid of as unknown as conversion */}
      <StickyNote header="Score" text={score as unknown as string} />
      <TimerComponent setGameInProgress={setGameInProgress} score={score} />
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
