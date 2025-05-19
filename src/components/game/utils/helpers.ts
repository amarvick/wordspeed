import _ from 'lodash';
import tiles from '../../../data/tiles.json';
import { Tile } from './types/Tile';
import { MAX_TILES_ALLOWED } from './consts.ts';

export const initializeTiles = (): [Tile[], Tile[]] => {
  let allTiles: Tile[] = [];

  tiles.forEach((tile) => {
    for (let i = 0; i < tile.count; i++) {
      allTiles.push({
        ...tile,
        id: `${tile.value}-${i}`,
      });
    }
  });

  allTiles = _.shuffle(allTiles);

  const flippedTiles: Tile[] = [];
  const initializedDeck: Tile[] = [];

  allTiles.forEach((tile, index) => {
    (index < allTiles.length - MAX_TILES_ALLOWED
      ? flippedTiles
      : initializedDeck
    ).push(tile);
  });

  return [flippedTiles, initializedDeck];
};

export const genTilesMap = (deckTiles: Tile[]): Map<string, Tile> => {
  const deckTilesMap = new Map<string, Tile>();
  deckTiles.forEach((tile) => deckTilesMap.set(tile.id, tile));

  return deckTilesMap;
};

export const setHighScores = (score: number): void => {
  const highScores: number[] = JSON.parse(
    localStorage.getItem('HighScores') || '[]',
  );
  let isScorePushed = false;

  for (let i = 0; i < highScores.length; i++) {
    const listScore = highScores[i];
    if (score > listScore) {
      highScores.splice(i, 0, score);
      isScorePushed = true;
      break;
    }
  }

  if (highScores.length < 5 && !isScorePushed) highScores.push(score);
  else if (highScores.length > 5) highScores.pop();
  localStorage.setItem('HighScores', JSON.stringify(highScores));
};
