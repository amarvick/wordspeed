import React, { useState } from 'react';

// @ts-ignore
import TileComponent from './TileComponent.tsx';
import './UserStand.css';
// @ts-ignore
import { wordBank } from '../../data/words.ts';
// @ts-ignore
import { genTilesMap } from './utils/helpers.ts';
// @ts-ignore
import { ERR_NEEDS_MORE_CHARS, INVALID_WORD } from './utils/consts.ts';
import { Tile } from './utils/types/Tile';
// @ts-ignore
import { LinkedList } from './utils/classes/LinkedList';

type UserStandProps = {
  tiles: LinkedList,
  acceptWord: (tiles) => LinkedList,
  swapTiles: (tiles) => LinkedList,
  setError: (error: string) => void,
  remainingTiles: number,
}

// TODO - should allTiles be a linkedlist itself? Or an array? I get the need to use a map here, so maybe not.
function UserStand({
  tiles, acceptWord, swapTiles, setError, remainingTiles,
}: UserStandProps): JSX.Element {
  const [currWordTiles, setCurrWordTiles] = useState([]);
  const [allTiles, setAllTiles] = useState(genTilesMap(tiles));

  const allTileValues: Tile[] = Object.values(allTiles);

  // TODO - in some cases, when you submit, ERR_NEEDS_MORE_CHARS error will show up. Debug
  const submitWord = (): void => {
    const word = currWordTiles.map((tile) => allTiles[tile].value).join('');

    if (word.length < 2) {
      setError(ERR_NEEDS_MORE_CHARS);
    } else if (wordBank.has(word)) {
      const newTiles: LinkedList = acceptWord(new Set(currWordTiles));
      setCurrWordTiles([]);
      setAllTiles(genTilesMap(newTiles));
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

  const onSwap = (): void => {
    setError('');
    const newTiles: LinkedList = swapTiles(new Set(currWordTiles));
    setAllTiles(genTilesMap(newTiles));
    setCurrWordTiles([]);
  };

  // TODO - Use keycode instead of "Enter/Left/Backspace"? if so, tile.value should be converted to a keycode
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

      while (!isTileFound && inc < allTileValues.length) {
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

  return (
    <div
      className="user-stand"
      tabIndex={0}
      onKeyUp={(e) => onKeyUp(e.key)}
    >
      Your Word:
      <div className="user-stand-tile-box user-word">
        {currWordTiles.map((tileId: string) => {
          const tile: Tile = allTiles[tileId];
          return (
            <TileComponent
              type={tile.type}
              value={tile.value}
              key={`${tile.id}-word-tile`}
              points={tile.points}
              isFlipped={false}
              onClick={() => removeTile(tileId)}
            />
          );
        })}
      </div>

      Your Tiles:
      <div className="user-stand-tile-box user-tiles">
        {allTileValues.map((tile) => (
          <TileComponent
            type={tile.type}
            value={tile.value}
            key={`${tile.id}-dash-tile`}
            points={tile.points}
            isFlipped={false}
            isSelected={currWordTiles.includes(tile.id)}
            onClick={() => toggleTile(tile.id)}
            isDeck
          />
        ))}
      </div>
      <button
        className="button"
        onClick={() => submitWord()}
      >
        Submit Word
      </button>
      <br />
      <button
        className="button"
        disabled={remainingTiles < currWordTiles.length}
        onClick={onSwap}
      >
        Swap Tiles
      </button>
    </div>
  );
}

export default UserStand;
