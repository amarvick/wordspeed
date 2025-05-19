import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import FlippedTiles from './FlippedTiles.tsx';
import {
  StickyNote as TimerComponent,
  StickyNote as ScoreComponent,
} from './StickyNote.tsx';
import GameOver from './GameOver.tsx';
import UserStand from './UserStand.tsx';
import './FullGameBoard.css';
import { setHighScores } from './utils/helpers.ts';
import Game from './utils/classes/Game.ts';

type FullGameBoardProps = {
  setDisplayedScreen: (_screen: string) => void;
};

const FullGameBoard = ({
  setDisplayedScreen,
}: FullGameBoardProps): ReactElement => {
  const [gameInProgress, setGameInProgress] = useState(true);
  const [game] = useState(
    () =>
      new Game(
        60, // Initial remaining time
        7, // Maximum tile count
        [], // Initial flipped tiles
        [], // Initial deck tiles
      ),
  );

  const flippedTileCount = useMemo(
    () => game.flippedTiles.length,
    [game.flippedTiles],
  );
  const deckTileCount = useMemo(() => game.deckTiles.length, [game.deckTiles]);

  useEffect(() => {
    if (!gameInProgress || (flippedTileCount === 0 && deckTileCount === 0)) {
      setHighScores(game.score);
    }
  }, [gameInProgress, flippedTileCount, deckTileCount, game.score]);

  const getMessage = (): string => {
    if (!gameInProgress) return 'GAME OVER';
    if (flippedTileCount === 0 && deckTileCount === 0) return 'BOARD COMPLETED';
    return '';
  };

  useEffect(() => {
    if (!gameInProgress || game.remainingTime <= 0) {
      setGameInProgress(false);
      return;
    }

    const timer = setInterval(() => {
      game.setRemainingTime(game.remainingTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameInProgress, game.remainingTime, game]);

  useEffect(() => {
    if (game.remainingTime <= 0) {
      setGameInProgress(false);
    }
  }, [game.remainingTime]);

  /** gameInProgress && (flippedTileCount > 0 || deckTileCount > 0) ? */
  return (
    <div
      className="FullGameBoard"
      tabIndex={0}
      onKeyUp={(e) => game.onKeyUp(e.key)}
      aria-label={`Time remaining: ${game.remainingTime} seconds. Current score: ${game.score}.`}
    >
      <FlippedTiles tiles={game.flippedTiles} />
      <UserStand
        currWordTiles={game.currWordTiles}
        allTiles={game.allTiles}
        deckTiles={game.deckTiles}
        removeTile={(tileId) => game.toggleTile(tileId)}
        toggleTile={(tileId) => game.toggleTile(tileId)}
        submitWord={() => game.onSubmitWord()}
        onSwap={() => game.onSwapLetters()}
        remainingTiles={flippedTileCount}
        error={game.errorMessage}
      />
      <ScoreComponent header="Score" text={game.score.toString()} />
      <TimerComponent header="Time" text={game.remainingTime.toString()} />
    </div>
  );
  // : (
  //   <GameOver
  //     message={getMessage()}
  //     score={game.score}
  //     setDisplayedScreen={setDisplayedScreen}
  //   />
  // );
};

export default FullGameBoard;
