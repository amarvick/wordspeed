import { useState } from 'react';
import { ERR_NEEDS_MORE_CHARS, INVALID_WORD } from '../consts.ts';
import { wordBank } from '../../../../data/words.ts'
import { genTilesMap, initializeTiles } from '../helpers.ts';
import LinkedList from '../classes/LinkedList';
import { Tile } from '../types/Tile';

export type GameLogic = {
    score: number;
    error: string;
    flippedTiles: LinkedList;
    currWordTiles: string[];
    deckTiles: LinkedList;
    allTiles: Map<string, Tile>;
    onKeyUp: (key: string) => void;
    toggleTile: (tileId: string) => void;
    submitWord: () => void;
    onSwap: () => void;
}

export const useGameLogic = (): GameLogic => {
  const [initTiles, initDeck]: [LinkedList, LinkedList] = initializeTiles();

  const [score, setScore] = useState(0);
  const [error, setError] = useState('');

  const [flippedTiles, setFlippedTiles] = useState(initTiles);
  const [currWordTiles, setCurrWordTiles] = useState<string[]>([]);
  const [deckTiles, setDeckTiles] = useState(initDeck);

  const allTiles = genTilesMap(deckTiles);
  const allTileValues: Tile[] = Object.values(allTiles);

  const setTiles = (newFlippedTiles: LinkedList, newDeckTiles: LinkedList): void => {
    setFlippedTiles(newFlippedTiles);
    setDeckTiles(newDeckTiles);
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
      setError(ERR_NEEDS_MORE_CHARS);
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

  return {
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
  };
};