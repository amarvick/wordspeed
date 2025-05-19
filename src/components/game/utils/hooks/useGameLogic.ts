import { useState } from 'react';
import { ERR_NEEDS_MORE_CHARS, GAME_TIME, INVALID_WORD } from '../consts.ts';
import { wordBank } from '../../../../data/words.ts';
import { genTilesMap, initializeTiles } from '../helpers.ts';
import { Tile } from '../types/Tile';

export type GameLogic = {
  remainingTime: number;
  setRemainingTime: any;
  score: number;
  error: string;
  flippedTiles: Tile[];
  currWordTiles: string[];
  deckTiles: Tile[];
  allTiles: Map<string, Tile>;
  onKeyUp: (key: string) => void;
  toggleTile: (tileId: string) => void;
  submitWord: () => void;
  onSwap: () => void;
};

export const useGameLogic = (): GameLogic => {
  const [initTiles, initDeck]: [Tile[], Tile[]] = initializeTiles();

  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(GAME_TIME);
  const [error, setError] = useState('');

  const [flippedTiles, setFlippedTiles] = useState<Tile[]>(initTiles);
  const [currWordTiles, setCurrWordTiles] = useState<string[]>([]);
  const [deckTiles, setDeckTiles] = useState<Tile[]>(initDeck);

  const allTiles = genTilesMap([...flippedTiles, ...deckTiles]);

  const setTiles = (newFlippedTiles: Tile[], newDeckTiles: Tile[]): void => {
    setFlippedTiles(newFlippedTiles);
    setDeckTiles(newDeckTiles);
  };

  const onSwap = (): void => {
    setError('');
    const tilesToRemove = deckTiles.filter((tile) =>
      currWordTiles.includes(tile.id),
    );

    const updatedDeckTiles = deckTiles.filter(
      (tile) => !currWordTiles.includes(tile.id),
    );
    const updatedFlippedTiles = [
      ...tilesToRemove,
      ...flippedTiles.slice(0, -tilesToRemove.length),
    ];

    const newDeckTiles = [
      ...updatedDeckTiles,
      ...flippedTiles.slice(-tilesToRemove.length),
    ];

    setTiles(updatedFlippedTiles, newDeckTiles);
    setCurrWordTiles([]);
  };

  const acceptWord = (): void => {
    const tilesToRemove = deckTiles.filter((tile) =>
      currWordTiles.includes(tile.id),
    );

    const updatedDeckTiles = deckTiles.filter(
      (tile) => !currWordTiles.includes(tile.id),
    );
    const updatedFlippedTiles = flippedTiles.slice(0, -tilesToRemove.length);

    const newDeckTiles = [
      ...updatedDeckTiles,
      ...flippedTiles.slice(-tilesToRemove.length),
    ];

    setScore(
      score +
        tilesToRemove.reduce((acc, tile) => acc + tile.points, 0) *
          tilesToRemove.length,
    );

    setTiles(updatedFlippedTiles, newDeckTiles);
  };

  const submitWord = (): void => {
    const word = currWordTiles
      .map((tile) => allTiles.get(tile)?.value)
      .join('');

    if (word.length < 2) {
      setError(ERR_NEEDS_MORE_CHARS);
    } else if (wordBank.has(word)) {
      acceptWord();
      setCurrWordTiles([]);
    } else {
      setError(INVALID_WORD);
    }
  };

  const toggleTile = (tileId: string): void => {
    setError('');
    setCurrWordTiles((prev) =>
      prev.includes(tileId)
        ? prev.filter((id) => id !== tileId)
        : [...prev, tileId],
    );
  };

  const onKeyUp = (key: string): void => {
    setError('');
    if (key === 'Enter') {
      submitWord();
    } else if (key === 'Left') {
      onSwap();
    } else if (key === 'Backspace') {
      if (currWordTiles.length) setCurrWordTiles(currWordTiles.slice(0, -1));
    } else {
      const typedTile = deckTiles.find(
        (tile) =>
          key.toUpperCase() === tile.value && !currWordTiles.includes(tile.id),
      );

      if (typedTile) toggleTile(typedTile.id);
    }
  };

  return {
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
  };
};
