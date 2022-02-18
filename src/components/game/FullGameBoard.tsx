import React, { useState } from 'react';

// @ts-ignore
import FlippedTiles from './FlippedTiles.tsx';
// @ts-ignore
import TimerComponent from './TimerComponent.tsx';
// @ts-ignore
import GameOver from './GameOver.tsx';
// @ts-ignore
import UserStand from './UserStand.tsx';
// @ts-ignore
import { ERR_NEEDS_MORE_CHARS, INVALID_WORD } from './utils/consts.ts';
// @ts-ignore
import { wordBank } from '../../data/words.ts';
// @ts-ignore
import { genTilesMap } from './utils/helpers.ts';
import './FullGameBoard.css';

// @ts-ignore
import { initializeTiles } from './utils/helpers.ts';
import LinkedList from './utils/classes/LinkedList';
import { Tile } from './utils/types/Tile';

const FullGameBoard = (): JSX.Element => {
  const [initTiles, initDeck]: [LinkedList, LinkedList] = initializeTiles();

  const [gameInProgress, setGameInProgress] = useState(true);
  const [score, setScore] = useState(0);
  const [error, setError] = useState('');

  const [flippedTiles, setFlippedTiles] = useState(initTiles);
  const [currWordTiles, setCurrWordTiles] = useState([]);
  const [deckTiles, setDeckTiles] = useState(initDeck);

  const allTiles = genTilesMap(deckTiles);
  const allTileValues: Tile[] = Object.values(allTiles);

  const setTiles = (flippedTiles: LinkedList, deckTiles: LinkedList): void => {
    setFlippedTiles(flippedTiles);
    setDeckTiles(deckTiles);
  };

  const onSwap = (): void => {
    setError('');
    const tilesToRemove: Tile[] = deckTiles.deleteBulk(new Set(currWordTiles));

    tilesToRemove.forEach(tile => {
      flippedTiles.prepend(tile);
      const newTile = flippedTiles.deleteTail();
      if (newTile) deckTiles.append(newTile);
    });

    setTiles(flippedTiles, deckTiles);
    setCurrWordTiles([]);
  };

  const acceptWord = (): void => {
    const tilesToRemove: Tile[] = deckTiles.deleteBulk(new Set(currWordTiles));

    setScore(score + (
      tilesToRemove.reduce((acc: number, tile: Tile) => {
        const newTile = flippedTiles.deleteTail();
        if (newTile) deckTiles.append(newTile);

        return acc + tile.points;
      }, 0) * tilesToRemove.length
    ));

    setTiles(flippedTiles, deckTiles);
  };

  const submitWord = (): void => {
    const word = currWordTiles.map(tile => allTiles[tile].value).join('');

    if (word.length < 2) {
      setError(ERR_NEEDS_MORE_CHARS)
    } else if (wordBank.has(word)) {
      acceptWord();
      setCurrWordTiles([]);
    } else {
      setError(INVALID_WORD);
    }
  };

  const addTile = (tileId: string): void => {
    setError('');
    const wordTiles = [...currWordTiles];
    wordTiles.push(tileId);
    setCurrWordTiles(wordTiles);
  };

  const removeTile = (tileId: string): void => {
    setError('');
    const wordTiles = [...currWordTiles];
    wordTiles.splice(wordTiles.indexOf(tileId), 1);
    setCurrWordTiles(wordTiles);
  };

  const toggleTile = (tileId: string): void => {
    (!currWordTiles.includes(tileId) ? addTile : removeTile)(tileId);
  };

  const onKeyUp = (key: string): void => {
    setError('');
    if (key === 'Enter') {
      submitWord();
    } else if (key === 'Left') {
      onSwap();
    } else if (key === 'Backspace') {
      if (currWordTiles.length) removeTile(currWordTiles[currWordTiles.length - 1]);
    } else {
      // TODO - can this be cleaner?
      let typedTileId;
      let isTileFound = false;
      let inc = 0;

      while (!isTileFound && inc < deckTiles.listSize) {
        const tile = allTileValues[inc];
        if (key.toUpperCase() === tile.value && !currWordTiles.includes(tile.id)) {
          typedTileId = tile.id;
          isTileFound = true;
        }
        inc++;
      }

      if (typedTileId) addTile(typedTileId);
    }
  };

  return gameInProgress && (flippedTiles.listSize || deckTiles.listSize) ? (
    <div className="full-game-board"
      tabIndex={0}
      onKeyUp={e => onKeyUp(e.key)}>
      <FlippedTiles tiles={flippedTiles} />
      <UserStand
        currWordTiles={currWordTiles}
        allTiles={allTiles}
        removeTile={removeTile}
        toggleTile={toggleTile}
        submitWord={submitWord}
        onSwap={onSwap}
        remainingTiles={flippedTiles.listSize}
      />
      {error}
      <h3>
        Score: {score}
      </h3>
      <TimerComponent setGameInProgress={setGameInProgress} />
    </div>
  ) : <GameOver score={score} />;
}

export default FullGameBoard;
