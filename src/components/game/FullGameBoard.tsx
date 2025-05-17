import React, { useEffect, useState } from 'react';
import FlippedTiles from './FlippedTiles.tsx';
import {
  StickyNote as TimerComponent,
  StickyNote as ScoreComponent,
} from './StickyNote.tsx';
import GameOver from './GameOver.tsx';
import UserStand from './UserStand.tsx';
import './FullGameBoard.css';
import { useGameLogic } from './utils/hooks/useGameLogic.ts';
import {
  genTilesMap,
  initializeTiles,
  setHighScores,
} from './utils/helpers.ts';
import Game from './utils/classes/Game.ts';
import { GAME_TIME, MAX_TILES_ALLOWED } from './utils/consts.ts';
import LinkedList from './utils/classes/LinkedList.ts';
import { Tile } from './utils/types/Tile.ts';

type FullGameBoardProps = {
  setDisplayedScreen: (_screen: string) => void;
};

const FullGameBoard = ({ setDisplayedScreen }: FullGameBoardProps): Element => {
  const [gameInProgress, setGameInProgress] = useState(true);

  const [initTiles, initDeck]: [LinkedList, LinkedList] = initializeTiles();

  const allTiles = genTilesMap(initDeck);
  const allTileValues: Tile[] = Object.values(allTiles);

  const CurrentGame = new Game(
    GAME_TIME,
    MAX_TILES_ALLOWED,
    initTiles,
    initDeck,
  );

  useEffect(() => {
    if (
      !gameInProgress ||
      (!CurrentGame.flippedTiles.listSize && !CurrentGame.deckTiles.listSize)
    ) {
      setHighScores(CurrentGame.score);
    }
  }, [gameInProgress, CurrentGame]);

  const getMessage = (): string => {
    if (!gameInProgress) return 'GAME OVER';
    if (!CurrentGame.flippedTiles.listSize && !CurrentGame.deckTiles.listSize)
      return 'BOARD COMPLETED';
    return '';
  };

  useEffect(() => {
    if (!gameInProgress || CurrentGame.remainingTime <= 0) {
      setGameInProgress(false);
      return;
    }

    const timer = setInterval(() => {
      CurrentGame.setRemainingTime(CurrentGame.remainingTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [Game, gameInProgress]);

  useEffect(() => {
    if (CurrentGame.remainingTime <= 0) {
      setGameInProgress(false);
    }
  }, [Game]);

  const onKeyUp = (key: string): void => {
    CurrentGame.setErrorMessage('');
    if (key === 'Enter') {
      CurrentGame.onSubmitWord();
    } else if (key === 'Left') {
      CurrentGame.onSwapLetters();
    } else if (key === 'Backspace') {
      if (CurrentGame.currWordTiles.length)
        CurrentGame.removeTile(
          CurrentGame.currWordTiles[CurrentGame.currWordTiles.length - 1],
        );
    } else {
      let typedTileId;
      let isTileFound = false;
      let inc = 0;

      while (!isTileFound && inc < CurrentGame.deckTiles.listSize) {
        const tile = allTileValues[inc];
        if (
          key.toUpperCase() === tile.value &&
          !CurrentGame.currWordTiles.includes(tile.id)
        ) {
          typedTileId = tile.id;
          isTileFound = true;
        }
        inc++;
      }

      if (typedTileId) CurrentGame.addTile(typedTileId);
    }
  };

  return gameInProgress &&
    (CurrentGame.flippedTiles.listSize || CurrentGame.deckTiles.listSize) ? (
    <div
      className="FullGameBoard"
      tabIndex={0}
      onKeyUp={(e) => onKeyUp(e.key)}
      aria-label={`Time remaining: ${CurrentGame.remainingTime} seconds. Current score: ${CurrentGame.score}.`}
    >
      <FlippedTiles tiles={CurrentGame.flippedTiles} />
      <UserStand
        currWordTiles={CurrentGame.currWordTiles}
        allTiles={CurrentGame.allTiles}
        removeTile={(tileId) => CurrentGame.toggleTile(tileId)}
        toggleTile={CurrentGame.toggleTile}
        submitWord={CurrentGame.onSubmitWord}
        onSwap={CurrentGame.onSwapLetters}
        remainingTiles={CurrentGame.flippedTiles.listSize}
        error={CurrentGame.errorMessage}
      />
      <ScoreComponent header="Score" text={CurrentGame.score.toString()} />
      <TimerComponent
        header="Time"
        text={CurrentGame.remainingTime.toString()}
      />
    </div>
  ) : (
    <GameOver
      message={getMessage()}
      score={CurrentGame.score}
      setDisplayedScreen={setDisplayedScreen}
    />
  );
};

export default FullGameBoard;
